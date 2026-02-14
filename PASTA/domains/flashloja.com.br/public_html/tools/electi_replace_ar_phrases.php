<?php
require __DIR__ . "/../vendor/autoload.php";
$app = require __DIR__ . "/../bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

$USER_ID = 13;
$LANG_ID = 61;

$map = [
  'تسوق الآن' => 'Compre agora',
  'احصل على العرض' => 'Aproveite a oferta',
  'سياسة الخصوصية' => 'Política de Privacidade',
  'معلومات عنا' => 'Sobre nós',
  'اتصل بنا' => 'Fale conosco',
  'جديد' => 'Novo',
  'حار' => 'Em alta',
];

$tables = [
  'user_hero_sliders',
  'user_banners',
  'user_page_contents',
  'user_sections',
  'user_headers',
  'user_footers',
  'user_menus',
  'user_item_contents',
  'labels',
];

$stats = [];

foreach ($tables as $t) {
  if (!Schema::hasTable($t)) continue;
  if (!Schema::hasColumn($t, 'user_id')) continue;
  if (!Schema::hasColumn($t, 'language_id')) continue;

  $cols = DB::select("SELECT column_name,data_type FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = ?", [$t]);
  $textCols = [];
  foreach ($cols as $c) {
    $dt = strtolower($c->data_type);
    if (in_array($dt, ['varchar','text','longtext','mediumtext'], true)) {
      if (!in_array($c->column_name, ['id','created_at','updated_at'], true)) {
        $textCols[] = $c->column_name;
      }
    }
  }
  if (!$textCols) continue;

  $whereParts = [];
  $bindings = [$USER_ID, $LANG_ID];
  foreach ($textCols as $col) {
    foreach (array_keys($map) as $needle) {
      $whereParts[] = "`$col` LIKE ?";
      $bindings[] = '%' . $needle . '%';
    }
  }
  $whereSql = implode(' OR ', $whereParts);

  $countSql = "SELECT COUNT(*) as c FROM `$t` WHERE user_id=? AND language_id=? AND ($whereSql)";
  $c = (int) (DB::selectOne($countSql, $bindings)->c ?? 0);
  if ($c === 0) continue;

  $setParts = [];
  foreach ($textCols as $col) {
    $expr = "`$col`";
    foreach ($map as $needle => $repl) {
      $expr = "REPLACE($expr, " . DB::getPdo()->quote($needle) . ", " . DB::getPdo()->quote($repl) . ")";
    }
    $setParts[] = "`$col` = $expr";
  }
  $setSql = implode(', ', $setParts);

  DB::statement("UPDATE `$t` SET $setSql WHERE user_id=? AND language_id=?", [$USER_ID, $LANG_ID]);
  $stats[$t] = $c;
}

echo "DONE " . json_encode($stats, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES) . "\n";
