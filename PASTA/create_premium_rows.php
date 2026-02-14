#!/usr/bin/env php
<?php
require '/home/u324811576/domains/flashloja.com.br/public_html/vendor/autoload.php';
$app = require_once '/home/u324811576/domains/flashloja.com.br/public_html/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(Illuminate\Http\Request::capture());

use App\Models\User\UserAppearanceSetting;

// Get the existing premium row's settings as source
$source = UserAppearanceSetting::where('theme', 'premium')->first();
$sourceSettings = $source ? $source->settings : App\Http\Controllers\User\PremiumAppearanceController::defaults();

// Create premium rows for users 31 and 33
foreach ([31, 33] as $uid) {
    $exists = UserAppearanceSetting::where('user_id', $uid)->where('theme', 'premium')->exists();
    if (!$exists) {
        UserAppearanceSetting::create([
            'user_id' => $uid,
            'theme' => 'premium',
            'settings' => $sourceSettings,
            'custom_css' => null,
        ]);
        echo "Created premium row for user_id={$uid}\n";
    } else {
        echo "Premium row already exists for user_id={$uid}\n";
    }
}

echo "\n=== FINAL STATE ===\n";
$all = UserAppearanceSetting::all();
foreach ($all as $r) {
    $hs = $r->settings['homeSections'] ?? [];
    echo "ID={$r->id} user_id={$r->user_id} theme={$r->theme} homeSections=" . count($hs) . "\n";
}
echo "\nDone! Only premium rows exist now.\n";
