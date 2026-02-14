<?php
// Connect to DB and dump settings for User 32 (or the user in question)
require '/home/u324811576/domains/flashloja.com.br/public_html/vendor/autoload.php';
$app = require_once '/home/u324811576/domains/flashloja.com.br/public_html/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User\UserAppearanceSetting;

$user_id = 32; // Assuming this is the user logged in via SSH user u324811576? 
// No, u324811576 is the system user. The app user ID is 32 (based on previous logs).

echo "Checking UserAppearanceSetting for user_id $user_id...\n";

$rows = UserAppearanceSetting::where('user_id', $user_id)->get();

foreach ($rows as $row) {
    echo "ID: " . $row->id . "\n";
    echo "Theme: " . $row->theme . "\n";
    echo "Updated At: " . $row->updated_at . "\n";
    
    $settings = is_array($row->settings) ? $row->settings : json_decode($row->settings, true);
    
    echo "Settings Keys: " . implode(', ', array_keys($settings)) . "\n";
    
    if (isset($settings['colors'])) {
        echo "Colors: " . json_encode($settings['colors']) . "\n";
    }
    if (isset($settings['hero'])) {
        echo "Hero: " . json_encode($settings['hero']) . "\n";
    }
    if (isset($settings['_versions'])) {
        echo "Versions Count: " . count($settings['_versions']) . "\n";
    }
    
    echo "--------------------------------------------------\n";
}
