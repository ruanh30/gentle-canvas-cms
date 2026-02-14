#!/usr/bin/env php
<?php
require '/home/u324811576/domains/flashloja.com.br/public_html/vendor/autoload.php';
$app = require_once '/home/u324811576/domains/flashloja.com.br/public_html/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(Illuminate\Http\Request::capture());

use App\Models\User\UserAppearanceSetting;

echo "=== BEFORE ===\n";
$all = UserAppearanceSetting::all();
foreach ($all as $r) {
    echo "ID={$r->id} user_id={$r->user_id} theme={$r->theme}\n";
}

// Delete all minimalista rows
$deleted = UserAppearanceSetting::where('theme', 'minimalista')->delete();
echo "\nDeleted {$deleted} minimalista row(s)\n";

// For any user that has BasicSetting theme=premium but NO premium UAS row, create one
$usersWithPremiumBS = DB::table('basic_settings')->where('theme', 'premium')->pluck('user_id');
foreach ($usersWithPremiumBS as $uid) {
    $exists = UserAppearanceSetting::where('user_id', $uid)->where('theme', 'premium')->exists();
    if (!$exists) {
        // Copy settings from user_id=32's premium row if exists, otherwise use defaults
        $source = UserAppearanceSetting::where('theme', 'premium')->first();
        $defaults = $source ? $source->settings : [];
        
        UserAppearanceSetting::create([
            'user_id' => $uid,
            'theme' => 'premium',
            'settings' => $defaults,
            'custom_css' => null,
        ]);
        echo "Created premium row for user_id={$uid}\n";
    }
}

echo "\n=== AFTER ===\n";
$all = UserAppearanceSetting::all();
foreach ($all as $r) {
    echo "ID={$r->id} user_id={$r->user_id} theme={$r->theme}\n";
}
