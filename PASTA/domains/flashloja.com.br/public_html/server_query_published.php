<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$userId = (int)($argv[1] ?? 0);
$pub = Illuminate\Support\Facades\DB::table('user_theme_versions')
  ->where('user_id',$userId)->where('theme','premium')->where('channel','published')
  ->orderByDesc('id')->limit(20)->get(['id','version','label','created_at']);

$state = Illuminate\Support\Facades\DB::table('user_theme_states')
  ->where('user_id',$userId)->where('theme','premium')->first(['published_version','draft_version','updated_at']);

header('Content-Type: application/json');
echo json_encode(['state'=>$state,'published_versions'=>$pub], JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
