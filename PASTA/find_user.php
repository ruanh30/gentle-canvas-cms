<?php
require '/home/u324811576/domains/flashloja.com.br/public_html/vendor/autoload.php';
$app = require_once '/home/u324811576/domains/flashloja.com.br/public_html/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;

$username = 'mu-store';
$user = User::where('username', $username)->first();

if ($user) {
    echo "User ID: " . $user->id . "\n";
    echo "Username: " . $user->username . "\n";
} else {
    echo "User not found: $username\n";
}
