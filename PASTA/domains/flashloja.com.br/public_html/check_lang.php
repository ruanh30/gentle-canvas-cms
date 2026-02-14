<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

$user = DB::table('users')->where('username', 'agent_test_3')->first();
if (!$user) { echo "User not found\n"; exit; }

echo "User ID: $user->id\n";

$langs = DB::table('user_languages')->where('user_id', $user->id)->get();
echo "Languages count: " . $langs->count() . "\n";
foreach($langs as $l) {
    echo "Lang: {$l->code} | Default: {$l->is_default}\n";
}

$default = DB::table('user_languages')->where('user_id', $user->id)->where('is_default', 1)->first();
if ($default) {
    echo "Default OK: {$default->code}\n";
} else {
    echo "NO DEFAULT LANGUAGE FOUND!\n";
}
