<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$deleted = Illuminate\Support\Facades\DB::table('user_theme_versions')
    ->where('theme', 'premium')
    ->where('channel', 'draft')
    ->whereNull('label')
    ->whereNotIn('id', function ($q) {
        $q->select('id')
          ->from(Illuminate\Support\Facades\DB::raw('(SELECT id FROM user_theme_versions WHERE theme = "premium" AND channel = "draft" ORDER BY id DESC LIMIT 20) AS keep_rows'));
    })
    ->delete();

echo "Deleted $deleted excess draft version rows\n";
