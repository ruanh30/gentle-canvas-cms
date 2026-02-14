<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$email = $argv[1] ?? '';
$user = Illuminate\Support\Facades\DB::table('users')->where('email', $email)->first(['id','username','email']);

header('Content-Type: application/json');
echo json_encode([
  'user' => $user,
  'tables' => [
    'user_item_categories' => Illuminate\Support\Facades\Schema::hasTable('user_item_categories'),
    'user_item_category_contents' => Illuminate\Support\Facades\Schema::hasTable('user_item_category_contents'),
    'user_item_contents' => Illuminate\Support\Facades\Schema::hasTable('user_item_contents'),
  ],
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
