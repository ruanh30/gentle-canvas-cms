<?php
require __DIR__ . "/../vendor/autoload.php";
$app = require __DIR__ . "/../bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

$DEEPL_KEY = getenv('DEEPL_KEY');
if (!$DEEPL_KEY) { fwrite(STDERR,"Missing DEEPL_KEY env\n"); exit(1);} 

$USER_ID = 13;
$LANG_ID = 61;

function is_arabic($s): bool {
  if (!is_string($s)) return false;
  return preg_match('/\p{Arabic}/u', $s) === 1;
}

function deepl_translate_batch(string $authKey, array $texts, bool $html=false): array {
  if (!$texts) return [];
  $parts = ['target_lang=PT-BR','source_lang=AR'];
  if ($html) $parts[]='tag_handling=html';
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
    CURLOPT_TIMEOUT => 90,
  ]);
  $resp = curl_exec($ch);
  if ($resp === false) { $err=curl_error($ch); curl_close($ch); throw new Exception($err); }
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  if ($code !== 200) throw new Exception("DeepL HTTP $code: $resp");
  $j = json_decode($resp,true);
  if (!isset($j['translations'])) throw new Exception("DeepL bad resp: $resp");
  return array_map(fn($x)=>$x['text']??'', $j['translations']);
}

function cols_exist(string $table, array $cols): array {
  $out=[];
  foreach ($cols as $c) if (Schema::hasColumn($table,$c)) $out[]=$c;
  return $out;
}

$stats=[];

if (Schema::hasTable('user_item_contents')) {
  $cols = cols_exist('user_item_contents', ['id','title','slug','summary','description','meta_keywords','meta_description']);
  $rows = DB::table('user_item_contents')->where('user_id',$USER_ID)->where('language_id',$LANG_ID)->get($cols);
  foreach ($rows as $r) {
    $updates=[];
    if (isset($r->title) && is_arabic($r->title)) {
      $updates['title'] = deepl_translate_batch($DEEPL_KEY, [$r->title], false)[0] ?? $r->title;
    }
    foreach (['summary'=>false,'description'=>true,'meta_keywords'=>false,'meta_description'=>false] as $field=>$isHtml) {
      if (!isset($r->$field) || !is_string($r->$field) || trim($r->$field)==='') continue;
      if (!is_arabic($r->$field)) continue;
      $updates[$field] = deepl_translate_batch($DEEPL_KEY, [$r->$field], $isHtml)[0] ?? $r->$field;
    }
    if (Schema::hasColumn('user_item_contents','slug') && isset($r->slug) && is_arabic($r->slug)) {
      $base = $updates['title'] ?? $r->title ?? $r->slug;
      $updates['slug'] = Str::slug($base);
    }
    if ($updates) {
      DB::table('user_item_contents')->where('id',$r->id)->update($updates);
      $stats['user_item_contents'] = ($stats['user_item_contents'] ?? 0) + count($updates);
      usleep(120000);
    }
  }
}

if (Schema::hasTable('user_hero_sliders')) {
  $cols = cols_exist('user_hero_sliders', ['id','title','subtitle','text','btn_name','video_button_text']);
  $rows = DB::table('user_hero_sliders')->where('user_id',$USER_ID)->where('language_id',$LANG_ID)->get($cols);
  foreach ($rows as $r) {
    $updates=[];
    foreach (['title'=>false,'subtitle'=>false,'text'=>false,'btn_name'=>false,'video_button_text'=>false] as $field=>$isHtml) {
      if (!isset($r->$field) || !is_string($r->$field) || trim($r->$field)==='') continue;
      if (!is_arabic($r->$field)) continue;
      $updates[$field] = deepl_translate_batch($DEEPL_KEY, [$r->$field], $isHtml)[0] ?? $r->$field;
    }
    if ($updates) {
      DB::table('user_hero_sliders')->where('id',$r->id)->update($updates);
      $stats['user_hero_sliders'] = ($stats['user_hero_sliders'] ?? 0) + count($updates);
      usleep(120000);
    }
  }
}

if (Schema::hasTable('user_banners')) {
  $cols = cols_exist('user_banners', ['id','title','subtitle','btn_name','text']);
  $rows = DB::table('user_banners')->where('user_id',$USER_ID)->where('language_id',$LANG_ID)->get($cols);
  foreach ($rows as $r) {
    $updates=[];
    foreach (['title'=>false,'subtitle'=>false,'text'=>false,'btn_name'=>false] as $field=>$isHtml) {
      if (!isset($r->$field) || !is_string($r->$field) || trim($r->$field)==='') continue;
      if (!is_arabic($r->$field)) continue;
      $updates[$field] = deepl_translate_batch($DEEPL_KEY, [$r->$field], $isHtml)[0] ?? $r->$field;
    }
    if ($updates) {
      DB::table('user_banners')->where('id',$r->id)->update($updates);
      $stats['user_banners'] = ($stats['user_banners'] ?? 0) + count($updates);
      usleep(120000);
    }
  }
}

echo "DONE " . json_encode($stats, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES) . "\n";
