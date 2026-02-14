<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$userId = (int)($argv[1] ?? 0);
$states = Illuminate\Support\Facades\DB::table('user_theme_states')->where('user_id',$userId)->where('theme','premium')->get();
$versions = Illuminate\Support\Facades\DB::table('user_theme_versions')->where('user_id',$userId)->where('theme','premium')->orderByDesc('id')->limit(10)->get(['id','channel','version','label','created_at']);

header('Content-Type: application/json');
echo json_encode(['state'=>$states,'versions'=>$versions], JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
