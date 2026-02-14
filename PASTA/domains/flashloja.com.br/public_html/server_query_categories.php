<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$userId = (int)($argv[1] ?? 0);
$cats = Illuminate\Support\Facades\DB::table('user_item_categories')
  ->where('user_id',$userId)
  ->orderBy('id')
  ->limit(10)
  ->get();

header('Content-Type: application/json');
echo json_encode($cats, JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
