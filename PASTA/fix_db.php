#!/usr/bin/env php
<?php
// Fix the key issues
require '/home/u324811576/domains/flashloja.com.br/public_html/vendor/autoload.php';
$app = require_once '/home/u324811576/domains/flashloja.com.br/public_html/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(Illuminate\Http\Request::capture());

use App\Models\User\UserAppearanceSetting;
use App\Models\User\BasicSetting;

echo "=== DEBUG: BasicSetting rows ===\n";
$allUbs = BasicSetting::all();
foreach ($allUbs as $ubs) {
    echo "BS id={$ubs->id} user_id={$ubs->user_id} theme={$ubs->theme}\n";
}

echo "\n=== DEBUG: UserAppearanceSetting rows ===\n";
$allApp = UserAppearanceSetting::all();
foreach ($allApp as $app2) {
    echo "UAS id={$app2->id} user_id={$app2->user_id} theme={$app2->theme}\n";
}

echo "\n=== DEBUG: Users table ===\n";
$users = DB::table('users')->select('id', 'username', 'email')->get();
foreach ($users as $u) {
    echo "User id={$u->id} username={$u->username} email={$u->email}\n";
}

echo "\n=== FIX 1: Normalize announcement key ===\n";
$premRow = UserAppearanceSetting::where('theme', 'premium')->first();
if ($premRow) {
    $settings = $premRow->settings;

    // Merge announcementBar into announcement (announcement has the user's actual edits)
    $announcement = $settings['header']['announcement'] ?? [];
    $announcementBar = $settings['header']['announcementBar'] ?? [];

    // announcement has the real user data, delete the stale announcementBar
    if (!empty($announcement)) {
        $settings['header']['announcementBar'] = $announcement; // sync both keys
    }

    $premRow->settings = $settings;
    $premRow->save();
    echo "Fixed: announcementBar now synced with announcement data\n";
    echo "announcement.enabled = " . json_encode($settings['header']['announcement']['enabled'] ?? 'NOT SET') . "\n";
    echo "announcementBar.enabled = " . json_encode($settings['header']['announcementBar']['enabled'] ?? 'NOT SET') . "\n";
}
else {
    echo "No premium row found to fix\n";
}
