<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$userId = (int)($argv[1] ?? 0);
$slug = $argv[2] ?? '';

$row = Illuminate\Support\Facades\DB::table('user_items')
  ->join('user_item_contents','user_items.id','=','user_item_contents.item_id')
  ->where('user_items.user_id',$userId)
  ->where('user_item_contents.slug',$slug)
  ->select('user_items.*','user_item_contents.title','user_item_contents.slug')
  ->first();

$imgs = [];
if ($row) {
  $imgs = Illuminate\Support\Facades\DB::table('user_item_images')->where('item_id',$row->id)->pluck('image');
}

header('Content-Type: application/json');
echo json_encode(['item'=>$row,'images'=>$imgs], JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
