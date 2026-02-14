<?php
require __DIR__ . "/../vendor/autoload.php";
$app = require __DIR__ . "/../bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

$DEEPL_KEY = getenv("DEEPL_KEY");
if (!$DEEPL_KEY) {
  fwrite(STDERR, "Missing DEEPL_KEY env\n");
  exit(1);
}

$KEEP_VALUES = array_fill_keys([
  'Flutterwave','Razorpay','Paytm','Paystack','Instamojo','Stripe','Paypal','Mollie','Mercadopago','Authorize.net',
  'Midtrans','Iyzico','Toyyibpay','Phonepe','Yoco','Xendit','Myfatoorah','Paytabs','Perfect money','SKU','OFF','OR','USD','BRL','R$'
], true);

$OVERRIDES = [
  'Cart' => 'Carrinho',
  'Wishlist' => 'Lista de desejos',
  'Compare' => 'Comparar',
  'Dashboard' => 'Painel',
  'Home' => 'Início',
  'Shop' => 'Loja',
  'Pages' => 'Páginas',
  'Search' => 'Pesquisar',
];

function deepl_translate_batch(string $authKey, array $texts, bool $html=false): array {
  if (count($texts) === 0) return [];
  $post = ['target_lang' => 'PT-BR'];
  if ($html) $post['tag_handling'] = 'html';

  $parts = [];
  foreach ($post as $k => $v) {
    $parts[] = rawurlencode($k) . '=' . rawurlencode($v);
  }
  foreach ($texts as $t) {
    $parts[] = 'text=' . rawurlencode((string)$t);
  }
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
  if ($resp === false) {
    $err = curl_error($ch);
    curl_close($ch);
    throw new Exception("DeepL curl error: $err");
  }
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  if ($code !== 200) {
    throw new Exception("DeepL HTTP $code: $resp");
  }
  $json = json_decode($resp, true);
  if (!is_array($json) || !isset($json['translations'])) {
    throw new Exception("DeepL bad response: $resp");
  }
  return array_map(fn($x) => $x['text'] ?? '', $json['translations']);
}

function translate_keywords(array $en, array $pt, array $KEEP_VALUES, array $OVERRIDES, string $DEEPL_KEY): array {
  $toTranslate = [];
  $keys = [];

  foreach ($en as $k => $enVal) {
    if (!is_string($enVal) || trim($enVal) === '') {
      if (!array_key_exists($k, $pt)) $pt[$k] = $enVal;
      continue;
    }

    $ptVal = $pt[$k] ?? null;
    if (is_string($ptVal) && trim($ptVal) !== '' && $ptVal !== $enVal) {
      continue; // preserve existing PT
    }

    if (isset($KEEP_VALUES[$enVal])) {
      $pt[$k] = $enVal;
      continue;
    }

    $toTranslate[] = $enVal;
    $keys[] = $k;
  }

  $BATCH = 40;
  for ($i=0; $i<count($toTranslate); $i+=$BATCH) {
    $chunk = array_slice($toTranslate, $i, $BATCH);
    $outs = deepl_translate_batch($DEEPL_KEY, $chunk, false);
    foreach ($outs as $j => $out) {
      $pt[$keys[$i+$j]] = $out;
    }
    usleep(200000);
  }

  foreach ($OVERRIDES as $k => $v) {
    if (array_key_exists($k, $pt)) $pt[$k] = $v;
  }

  return $pt;
}

function translate_user_menus(int $userId, int $enLangId, int $ptLangId, array $KEEP_VALUES, string $DEEPL_KEY): int {
  $src = DB::table('user_menus')->where('user_id',$userId)->where('language_id',$enLangId)->value('menus');
  $tgt = DB::table('user_menus')->where('user_id',$userId)->where('language_id',$ptLangId)->value('menus');
  if (!$src) return 0;

  $srcArr = json_decode($src, true);
  if (!is_array($srcArr)) return 0;
  $tgtArr = $tgt ? json_decode($tgt, true) : null;
  if (!is_array($tgtArr)) $tgtArr = $srcArr;

  $changed = false;
  foreach ($srcArr as $i => $item) {
    if (!is_array($item)) continue;
    if (!isset($tgtArr[$i]) || !is_array($tgtArr[$i])) {
      $tgtArr[$i] = $item;
      $changed = true;
    }
    foreach (['text','title'] as $field) {
      $s = $item[$field] ?? null;
      $t = $tgtArr[$i][$field] ?? null;
      if (!is_string($s) || trim($s)==='') continue;
      if (is_string($t) && trim($t) !== '' && $t !== $s) continue; // preserve existing pt
      if (isset($KEEP_VALUES[$s])) {
        $tgtArr[$i][$field] = $s;
        continue;
      }
      $out = deepl_translate_batch($DEEPL_KEY, [$s], false)[0] ?? $s;
      $tgtArr[$i][$field] = $out;
      $changed = true;
      usleep(120000);
    }
  }

  if ($changed) {
    $outJson = json_encode($tgtArr, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
    DB::table('user_menus')->where('user_id',$userId)->where('language_id',$ptLangId)->update(['menus'=>$outJson]);
    return 1;
  }
  return 0;
}

function translate_table(string $table, int $userId, int $enLangId, int $ptLangId, array $keyCols, array $plainCols, array $htmlCols, string $DEEPL_KEY): int {
  $cols = array_values(array_unique(array_merge($keyCols, $plainCols, $htmlCols)));

  $srcRows = DB::table($table)->where('user_id',$userId)->where('language_id',$enLangId)->get($cols);
  if ($srcRows->isEmpty()) return 0;
  $tgtRows = DB::table($table)->where('user_id',$userId)->where('language_id',$ptLangId)->get($cols);
  if ($tgtRows->isEmpty()) return 0;

  $srcMap = [];
  foreach ($srcRows as $r) {
    $k=[]; foreach ($keyCols as $c) { $k[] = $r->$c; }
    $srcMap[json_encode($k)] = $r;
  }

  $updated = 0;
  foreach ($tgtRows as $tr) {
    $k=[]; foreach ($keyCols as $c) { $k[] = $tr->$c; }
    $key = json_encode($k);
    if (!isset($srcMap[$key])) continue;
    $sr = $srcMap[$key];

    $plainTodo=[]; $plainNames=[];
    foreach ($plainCols as $c) {
      $tVal = $tr->$c ?? null;
      $sVal = $sr->$c ?? null;
      if (!is_string($sVal) || trim($sVal)==='') continue;
      if (is_string($tVal) && trim($tVal) !== '' && $tVal !== $sVal) continue; // preserve
      $plainTodo[] = $sVal;
      $plainNames[] = $c;
    }

    $htmlTodo=[]; $htmlNames=[];
    foreach ($htmlCols as $c) {
      $tVal = $tr->$c ?? null;
      $sVal = $sr->$c ?? null;
      if (!is_string($sVal) || trim($sVal)==='') continue;
      if (is_string($tVal) && trim($tVal) !== '' && $tVal !== $sVal) continue;
      $htmlTodo[] = $sVal;
      $htmlNames[] = $c;
    }

    if (!$plainTodo && !$htmlTodo) continue;

    $updates=[];
    if ($plainTodo) {
      $outs = deepl_translate_batch($DEEPL_KEY, $plainTodo, false);
      foreach ($outs as $i => $out) {
        $updates[$plainNames[$i]] = $out;
      }
      usleep(150000);
    }
    if ($htmlTodo) {
      $outs = deepl_translate_batch($DEEPL_KEY, $htmlTodo, true);
      foreach ($outs as $i => $out) {
        $updates[$htmlNames[$i]] = $out;
      }
      usleep(150000);
    }

    if ($updates) {
      $q = DB::table($table)->where('user_id',$userId)->where('language_id',$ptLangId);
      foreach ($keyCols as $i=>$c) { $q->where($c, $k[$i]); }
      $q->update($updates);
      $updated++;
    }
  }

  return $updated;
}

$users = DB::table('users')->select('id','username')->orderBy('id')->get();
$langs = DB::table('user_languages')->select('user_id','code','id')->get();
$langMap = [];
foreach ($langs as $l) {
  $langMap[$l->user_id][$l->code] = (int)$l->id;
}

echo "users=" . count($users) . "\n";

$stats = [
  'keywords_users'=>0,
  'page_contents_rows'=>0,
  'headers_rows'=>0,
  'footers_rows'=>0,
  'sections_rows'=>0,
  'menus_users'=>0,
  'deleted_en_users'=>0,
];

foreach ($users as $u) {
  $userId = (int)$u->id;
  $ptId = $langMap[$userId]['pt-BR'] ?? null;
  if (!$ptId) {
    echo "user {$userId}: missing pt-BR, skip\n";
    continue;
  }
  $enId = $langMap[$userId]['en'] ?? null;

  DB::table('user_languages')->where('user_id',$userId)->update(['is_default'=>0,'dashboard_default'=>0]);
  DB::table('user_languages')->where('user_id',$userId)->where('code','pt-BR')->update(['is_default'=>1,'dashboard_default'=>1]);

  if (!$enId) {
    echo "user {$userId} ({$u->username}): no en (defaults set)\n";
    continue;
  }

  $enKw = DB::table('user_languages')->where('user_id',$userId)->where('code','en')->value('keywords');
  $ptKw = DB::table('user_languages')->where('user_id',$userId)->where('code','pt-BR')->value('keywords');
  $enJson = json_decode($enKw ?? "{}", true); if (!is_array($enJson)) $enJson=[];
  $ptJson = json_decode($ptKw ?? "{}", true); if (!is_array($ptJson)) $ptJson=[];

  if ($enJson) {
    $ptJson = translate_keywords($enJson, $ptJson, $KEEP_VALUES, $OVERRIDES, $DEEPL_KEY);
    DB::table('user_languages')->where('user_id',$userId)->where('code','pt-BR')->update([
      'keywords' => json_encode($ptJson, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES)
    ]);
    $stats['keywords_users']++;
  }

  $stats['page_contents_rows'] += translate_table('user_page_contents', $userId, $enId, $ptId, ['page_id'], ['title','slug'], ['body'], $DEEPL_KEY);
  $stats['headers_rows'] += translate_table('user_headers', $userId, $enId, $ptId, ['id'], ['header_text','header_middle_text','useful_links_title'], ['copyright_text'], $DEEPL_KEY);
  $stats['footers_rows'] += translate_table('user_footers', $userId, $enId, $ptId, ['id'], ['footer_text','useful_links_title','subscriber_title','subscriber_text'], ['copyright_text'], $DEEPL_KEY);
  $stats['sections_rows'] += translate_table('user_sections', $userId, $enId, $ptId, ['id'], [
    'category_section_title','featured_section_title','category_section_subtitle','flash_section_title','flash_section_subtitle',
    'tab_section_title','tab_section_subtitle','bottom_section_title','bottom_section_subtitle','testimonial_section_title','testimonial_section_subtitle',
    'top_selling_product_section_title','top_rated_product_section_title','top_rated_product_section_subtitle','latest_product_section_title',
    'video_section_subtitle','video_section_button_name','video_section_text','features_section_title','call_to_action_section_title',
    'video_section_title','call_to_action_section_text','call_to_action_section_button_text'
  ], [], $DEEPL_KEY);
  $stats['menus_users'] += translate_user_menus($userId, $enId, $ptId, $KEEP_VALUES, $DEEPL_KEY);

  echo "user {$userId} ({$u->username}): translated\n";
}

DB::table('user_currencies')->where('text','USD')->update(['text'=>'BRL']);
DB::table('user_currencies')->whereIn('symbol',['$','USD','US$'])->update(['symbol'=>'R$']);
DB::table('user_currencies')->where('text','BRL')->update(['value'=>0]);

foreach ($users as $u) {
  $uid=(int)$u->id;
  DB::table('user_currencies')->where('user_id',$uid)->update(['is_default'=>0]);
  $first = DB::table('user_currencies')->where('user_id',$uid)->orderBy('id')->value('id');
  if ($first) {
    DB::table('user_currencies')->where('id',$first)->update(['is_default'=>1,'text'=>'BRL','symbol'=>'R$','value'=>0]);
  }
}

$langs = DB::table('user_languages')->select('user_id','code','id')->get();
$langMap=[]; foreach ($langs as $l) { $langMap[$l->user_id][$l->code]=(int)$l->id; }

$tables = [
  'user_page_contents','user_headers','user_footers','user_menus','user_sections','user_tabs','user_banners','user_hero_sliders','user_seos','user_contacts',
  'user_blog_categories','user_blog_contents','user_faqs','user_call_to_actions','user_counter_sections','user_counter_information','user_shipping_charges','user_ulinks',
  'labels','user_item_categories','user_item_sub_categories','user_item_contents','user_howit_work_sections','user_additional_sections','user_additional_section_contents','user_product_hero_sliders'
];

foreach ($users as $u) {
  $uid=(int)$u->id;
  $enId = $langMap[$uid]['en'] ?? null;
  if (!$enId) continue;
  foreach ($tables as $t) {
    if (!DB::getSchemaBuilder()->hasTable($t)) continue;
    if (!DB::getSchemaBuilder()->hasColumn($t,'language_id')) continue;
    if (!DB::getSchemaBuilder()->hasColumn($t,'user_id')) continue;
    DB::table($t)->where('user_id',$uid)->where('language_id',$enId)->delete();
  }
  DB::table('user_languages')->where('user_id',$uid)->where('code','en')->delete();
  $stats['deleted_en_users']++;
  echo "user {$uid} ({$u->username}): deleted en\n";
}

echo "DONE " . json_encode($stats, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES) . "\n";
