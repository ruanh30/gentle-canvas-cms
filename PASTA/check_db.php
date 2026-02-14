#!/usr/bin/env php
<?php
// Check DB state and test save flow
require '/home/u324811576/domains/flashloja.com.br/public_html/vendor/autoload.php';
$app = require_once '/home/u324811576/domains/flashloja.com.br/public_html/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(Illuminate\Http\Request::capture());

use App\Models\User\UserAppearanceSetting;

echo "=== ALL APPEARANCE ROWS ===\n";
$rows = UserAppearanceSetting::all();
foreach ($rows as $r) {
    echo "ID={$r->id} user_id={$r->user_id} theme={$r->theme} settings_len=" . strlen(json_encode($r->settings)) . "\n";
}

echo "\n=== ANNOUNCEMENT BAR STATE ===\n";
$prem = UserAppearanceSetting::where('theme', 'premium')->first();
if ($prem) {
    $settings = $prem->settings;
    $ann = $settings['header']['announcement'] ?? ($settings['header']['announcementBar'] ?? 'NOT_SET');
    echo "header.announcement = " . json_encode($ann) . "\n";
    echo "header.announcementBar = " . json_encode($settings['header']['announcementBar'] ?? 'NOT_SET') . "\n";

    echo "\n=== HOME SECTIONS ===\n";
    $sections = $settings['homeSections'] ?? 'NOT_SET';
    if (is_array($sections)) {
        echo "sections count = " . count($sections) . "\n";
        foreach ($sections as $s) {
            echo "  - type={$s['type']} enabled=" . ($s['enabled'] ?? 'true') . "\n";
        }
    }
    else {
        echo $sections . "\n";
    }
}
else {
    echo "No premium appearance row found!\n";

    // Check if there's a row with different query
    $any = UserAppearanceSetting::first();
    if ($any) {
        echo "Found row with theme={$any->theme}\n";
        $settings = $any->settings;
        $ann = $settings['header']['announcement'] ?? ($settings['header']['announcementBar'] ?? 'NOT_SET');
        echo "header.announcement = " . json_encode($ann) . "\n";
    }
}

echo "\n=== CONTROLLER firstOrCreate BEHAVIOR ===\n";
// Simulate what the controller does
$ubs = App\Models\User\BasicSetting::first();
if ($ubs) {
    echo "UBS user_id = {$ubs->user_id}\n";
    $app2 = UserAppearanceSetting::where('user_id', $ubs->user_id)->first();
    if ($app2) {
        echo "Found by user_id: ID={$app2->id} theme={$app2->theme}\n";
    }
    else {
        echo "No row found for user_id={$ubs->user_id}\n";
    }
}
