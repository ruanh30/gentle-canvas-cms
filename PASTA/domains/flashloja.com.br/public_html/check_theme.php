<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

$user = DB::table('users')->where('username', 'agent_test_3')->first();
if (!$user) { echo "User not found\n"; exit; }

$ubs = DB::table('user_basic_settings')->where('user_id', $user->id)->first();
echo "Basic Settings Theme: " . ($ubs->theme ?? 'NULL') . "\n";

$uas = DB::table('user_appearance_settings')->where('user_id', $user->id)->first();
echo "Appearance Settings Theme: " . ($uas->theme ?? 'NULL') . "\n";
