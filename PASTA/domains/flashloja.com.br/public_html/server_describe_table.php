<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$table = $argv[1] ?? '';
$db = Illuminate\Support\Facades\DB::connection()->getDatabaseName();
$cols = Illuminate\Support\Facades\DB::select('SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_schema = ? AND table_name = ? ORDER BY ordinal_position', [$db, $table]);
header('Content-Type: application/json');
echo json_encode($cols, JSON_PRETTY_PRINT);
