<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$like = $argv[1] ?? '';
$db = Illuminate\Support\Facades\DB::connection()->getDatabaseName();
$rows = Illuminate\Support\Facades\DB::select('SELECT table_name FROM information_schema.tables WHERE table_schema = ? AND table_name LIKE ? ORDER BY table_name', [$db, '%'.$like.'%']);
header('Content-Type: application/json');
echo json_encode(['db'=>$db,'like'=>$like,'tables'=>array_map(fn($r)=>$r->table_name,$rows)], JSON_PRETTY_PRINT);
