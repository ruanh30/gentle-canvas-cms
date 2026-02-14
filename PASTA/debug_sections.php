<?php
require '/home/u324811576/domains/flashloja.com.br/public_html/vendor/autoload.php';
$app = require_once '/home/u324811576/domains/flashloja.com.br/public_html/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User\UserAppearanceSetting;

$user_id = 32;
$row = UserAppearanceSetting::where('user_id', $user_id)->first();

if ($row) {
    echo "Settings for User $user_id:\n";
    $settings = is_array($row->settings) ? $row->settings : json_decode($row->settings, true);
    
    $sections = $settings['homepageSections'] ?? ($settings['homeSections'] ?? []);
    echo "Home Sections:\n";
    echo json_encode($sections, JSON_PRETTY_PRINT) . "\n";
    
    // Check if hero is different here vs hero key?
    // The hero key stores CONTENT (slides).
    // The section key stores CONFIG (enabled, title).
    
    echo "Hero Key:\n";
    echo json_encode($settings['hero'] ?? [], JSON_PRETTY_PRINT) . "\n";
}
