<?php
require __DIR__ . "/../vendor/autoload.php";
$app = require __DIR__ . "/../bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

$DEEPL_KEY = getenv('DEEPL_KEY');
if (!$DEEPL_KEY) { fwrite(STDERR,"Missing DEEPL_KEY\n"); exit(1);} 

function deepl_translate(string $authKey, array $texts): array {
  if (!$texts) return [];
  $parts = ['target_lang=PT-BR'];
  foreach ($texts as $t) $parts[] = 'text=' . rawurlencode((string)$t);
  $body = implode('&', $parts);

  $ch = curl_init();
  curl_setopt_array($ch, [
    CURLOPT_URL => 'https://api-free.deepl.com/v2/translate',
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $body,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
      'Authorization: DeepL-Auth-Key ' . $authKey,
      'Content-Type: application/x-www-form-urlencoded',
    ],
    CURLOPT_TIMEOUT => 60,
  ]);
  $resp = curl_exec($ch);
  if ($resp === false) { $err=curl_error($ch); curl_close($ch); throw new Exception($err); }
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  if ($code !== 200) throw new Exception("DeepL HTTP $code: $resp");
  $j = json_decode($resp,true);
  return array_map(fn($x)=>$x['text']??'', $j['translations'] ?? []);
}

$enId = DB::table('languages')->where('code','en')->value('id');
$ptId = DB::table('languages')->where('code','pt-BR')->value('id');
if (!$enId || !$ptId) { fwrite(STDERR,"Missing language ids\n"); exit(2);} 

$existingPt = DB::table('user_categories')->where('language_id',$ptId)->count();
if ($existingPt > 0) {
  echo "pt-BR already has {$existingPt} categories, skipping\n";
  exit(0);
}

$rows = DB::table('user_categories')->where('language_id',$enId)->orderBy('serial_number')->get();
if ($rows->isEmpty()) {
  fwrite(STDERR,"No EN categories found\n");
  exit(3);
}

$names = [];
foreach ($rows as $r) $names[] = (string)$r->name;
$translated = deepl_translate($DEEPL_KEY, $names);
if (count($translated) !== count($names)) {
  fwrite(STDERR,"Translation count mismatch\n");
  exit(4);
}

foreach ($rows as $i => $r) {
  DB::table('user_categories')->insert([
    'unique_id' => $r->unique_id,
    'language_id' => $ptId,
    'name' => $translated[$i],
    'slug' => $r->slug,
    'serial_number' => $r->serial_number,
    'status' => $r->status,
    'created_at' => now(),
    'updated_at' => now(),
  ]);
}

echo "Inserted " . count($rows) . " pt-BR categories\n";
