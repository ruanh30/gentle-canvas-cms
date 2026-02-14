<?php
require '/home/u324811576/domains/flashloja.com.br/public_html/vendor/autoload.php';
$app = require_once '/home/u324811576/domains/flashloja.com.br/public_html/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;

echo "--- Top 10 Users ---\n";
$users = User::limit(10)->get();
foreach ($users as $user) {
    echo "ID: " . $user->id . " | Username: " . $user->username . "\n";
}

echo "\n--- Specific IDs ---\n";
$ids = [31, 32, 33];
foreach ($ids as $id) {
    $u = User::find($id);
    if ($u) {
        echo "User ID $id: " . $u->username . " (Email: " . $u->email . ")\n";
    } else {
        echo "User ID $id: NOT FOUND\n";
    }
}
