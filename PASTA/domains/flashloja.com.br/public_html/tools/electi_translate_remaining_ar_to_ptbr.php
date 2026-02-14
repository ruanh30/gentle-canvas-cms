<?php
require __DIR__ . "/../vendor/autoload.php";
$app = require __DIR__ . "/../bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

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

function translate_simple_rows(string $table, array $textCols, array $htmlCols, int $userId, int $langId, string $deeplKey, array &$stats): void {
  if (!Schema::hasTable($table)) return;
  $cols = cols_exist($table, array_merge(['id'], $textCols, $htmlCols));
  if (!in_array('id',$cols,true)) return;

  $rows = DB::table($table)->where('user_id',$userId)->where('language_id',$langId)->get($cols);
  foreach ($rows as $r) {
    $updates=[];

    foreach ($textCols as $c) {
      if (!Schema::hasColumn($table,$c)) continue;
      $v = $r->$c ?? null;
      if (!is_string($v) || trim($v)==='') continue;
      if (!is_arabic($v)) continue;
      $updates[$c] = deepl_translate_batch($deeplKey, [$v], false)[0] ?? $v;
      usleep(80000);
    }

    foreach ($htmlCols as $c) {
      if (!Schema::hasColumn($table,$c)) continue;
      $v = $r->$c ?? null;
      if (!is_string($v) || trim($v)==='') continue;
      if (!is_arabic($v)) continue;
      $updates[$c] = deepl_translate_batch($deeplKey, [$v], true)[0] ?? $v;
      usleep(80000);
    }

    if ($updates) {
      DB::table($table)->where('id',$r->id)->update($updates);
      $stats[$table] = ($stats[$table] ?? 0) + count($updates);
      usleep(120000);
    }
  }
}

function translate_user_menus(int $userId, int $langId, string $deeplKey, array &$stats): void {
  if (!Schema::hasTable('user_menus') || !Schema::hasColumn('user_menus','menus')) return;
  $menus = DB::table('user_menus')->where('user_id',$userId)->where('language_id',$langId)->value('menus');
  if (!$menus) return;
  $arr = json_decode($menus,true);
  if (!is_array($arr)) return;

  $changed=false;
  foreach ($arr as $i=>$item) {
    if (!is_array($item)) continue;
    foreach (['text','title'] as $f) {
      $v = $item[$f] ?? null;
      if (!is_string($v) || trim($v)==='') continue;
      if (!is_arabic($v)) continue;
      $out = deepl_translate_batch($deeplKey, [$v], false)[0] ?? $v;
      $arr[$i][$f] = $out;
      $changed=true;
      $stats['user_menus'] = ($stats['user_menus'] ?? 0) + 1;
      usleep(80000);
    }
  }

  if ($changed) {
    DB::table('user_menus')->where('user_id',$userId)->where('language_id',$langId)->update([
      'menus' => json_encode($arr, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES)
    ]);
  }
}

$stats=[];

// Headers/Footers/Sections
translate_simple_rows('user_headers', ['header_text','header_middle_text','useful_links_title'], ['copyright_text'], $USER_ID, $LANG_ID, $DEEPL_KEY, $stats);
translate_simple_rows('user_footers', ['footer_text','useful_links_title','subscriber_title','subscriber_text'], ['copyright_text'], $USER_ID, $LANG_ID, $DEEPL_KEY, $stats);
translate_simple_rows('user_sections', [
  'category_section_title','featured_section_title','category_section_subtitle','flash_section_title','flash_section_subtitle',
  'tab_section_title','tab_section_subtitle','bottom_section_title','bottom_section_subtitle','testimonial_section_title','testimonial_section_subtitle',
  'top_selling_product_section_title','top_rated_product_section_title','top_rated_product_section_subtitle','latest_product_section_title',
  'video_section_subtitle','video_section_button_name','video_section_text','features_section_title','call_to_action_section_title',
  'video_section_title','call_to_action_section_text','call_to_action_section_button_text'
], [], $USER_ID, $LANG_ID, $DEEPL_KEY, $stats);

// Tabs
translate_simple_rows('user_tabs', ['name','slug'], [], $USER_ID, $LANG_ID, $DEEPL_KEY, $stats);

// Menus JSON
translate_user_menus($USER_ID, $LANG_ID, $DEEPL_KEY, $stats);

echo "DONE " . json_encode($stats, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES) . "\n";
