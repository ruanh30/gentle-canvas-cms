<?php
require __DIR__ . "/../vendor/autoload.php";
$app = require __DIR__ . "/../bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

$DEEPL_KEY = getenv('DEEPL_KEY');
if (!$DEEPL_KEY) { fwrite(STDERR,"Missing DEEPL_KEY\n"); exit(1);} 

function deepl_translate(string $authKey, array $texts, bool $html=false): array {
  if (!$texts) return [];
  $parts = [ 'target_lang=PT-BR' ];
  if ($html) $parts[] = 'tag_handling=html';
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

function looks_portuguese(string $s): bool {
  // If it already has common PT characters/words, assume PT
  if (preg_match('/[áàâãéêíóôõúç]/iu', $s)) return true;
  if (preg_match('/\b(de|da|do|para|com|sem|mais|oferta|promo)\b/iu', $s)) return true;
  return false;
}

function translate_row_fields($table, $where, $fields, $deeplKey, $htmlFields=[]): int {
  $row = DB::table($table)->where($where)->first();
  if (!$row) return 0;

  $todo=[]; $names=[]; $todoHtml=[]; $namesHtml=[];
  foreach ($fields as $f) {
    $v = $row->$f ?? null;
    if (!is_string($v) || trim($v)==='') continue;
    if (looks_portuguese($v)) continue;
    $todo[]=$v; $names[]=$f;
  }
  foreach ($htmlFields as $f) {
    $v = $row->$f ?? null;
    if (!is_string($v) || trim($v)==='') continue;
    if (looks_portuguese($v)) continue;
    $todoHtml[]=$v; $namesHtml[]=$f;
  }

  $updates=[];
  if ($todo) {
    $outs = deepl_translate($deeplKey, $todo, false);
    foreach ($outs as $i=>$o) $updates[$names[$i]]=$o;
    usleep(150000);
  }
  if ($todoHtml) {
    $outs = deepl_translate($deeplKey, $todoHtml, true);
    foreach ($outs as $i=>$o) $updates[$namesHtml[$i]]=$o;
    usleep(150000);
  }

  if ($updates) {
    DB::table($table)->where($where)->update($updates);
    return count($updates);
  }
  return 0;
}

$users = DB::table('users')->select('id','username')->orderBy('id')->get();
$langs = DB::table('user_languages')->select('user_id','code','id')->get();
$langMap=[]; foreach ($langs as $l) $langMap[$l->user_id][$l->code]=(int)$l->id;

$stats=['sections'=>0,'headers'=>0,'footers'=>0,'tabs'=>0,'cta'=>0];

foreach ($users as $u) {
  $uid=(int)$u->id;
  $pt = $langMap[$uid]['pt-BR'] ?? null;
  if (!$pt) continue;

  // user_sections (single row per language)
  $stats['sections'] += translate_row_fields('user_sections', ['user_id'=>$uid,'language_id'=>$pt], [
    'category_section_title','featured_section_title','category_section_subtitle','flash_section_title','flash_section_subtitle',
    'tab_section_title','tab_section_subtitle','bottom_section_title','bottom_section_subtitle','testimonial_section_title','testimonial_section_subtitle',
    'top_selling_product_section_title','top_rated_product_section_title','top_rated_product_section_subtitle','latest_product_section_title',
    'video_section_subtitle','video_section_button_name','video_section_text','features_section_title','call_to_action_section_title',
    'video_section_title','call_to_action_section_text','call_to_action_section_button_text'
  ], $DEEPL_KEY);

  // call-to-action table if exists
  if (DB::getSchemaBuilder()->hasTable('user_call_to_actions')) {
    $stats['cta'] += translate_row_fields('user_call_to_actions', ['user_id'=>$uid,'language_id'=>$pt], ['title','text','button_text'], $DEEPL_KEY, []);
  }

  // user_tabs: translate name if english
  if (DB::getSchemaBuilder()->hasTable('user_tabs')) {
    $tabs = DB::table('user_tabs')->where('user_id',$uid)->where('language_id',$pt)->get(['id','name']);
    foreach ($tabs as $t) {
      if (!is_string($t->name) || trim($t->name)==='' || looks_portuguese($t->name)) continue;
      $out = deepl_translate($DEEPL_KEY, [$t->name], false)[0] ?? $t->name;
      DB::table('user_tabs')->where('id',$t->id)->update(['name'=>$out]);
      $stats['tabs']++;
      usleep(120000);
    }
  }

  // headers/footers (single row per language)
  $stats['headers'] += translate_row_fields('user_headers', ['user_id'=>$uid,'language_id'=>$pt], ['header_text','header_middle_text','useful_links_title'], $DEEPL_KEY, ['copyright_text']);
  $stats['footers'] += translate_row_fields('user_footers', ['user_id'=>$uid,'language_id'=>$pt], ['footer_text','useful_links_title','subscriber_title','subscriber_text'], $DEEPL_KEY, ['copyright_text']);

  echo "user $uid ({$u->username}): ok\n";
}

echo "DONE " . json_encode($stats, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES) . "\n";
