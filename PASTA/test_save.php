#!/usr/bin/env php
<?php
// Test save flow: read current sections count, verify the fix is in the controller
require '/home/u324811576/domains/flashloja.com.br/public_html/vendor/autoload.php';
$app = require_once '/home/u324811576/domains/flashloja.com.br/public_html/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(Illuminate\Http\Request::capture());

use App\Models\User\UserAppearanceSetting;

// Check all premium rows
$premRows = UserAppearanceSetting::where('theme', 'premium')->get();
echo "=== Premium rows ===\n";
foreach ($premRows as $r) {
    $s = $r->settings;
    $hs = $s['homeSections'] ?? $s['homepageSections'] ?? [];
    echo "ID={$r->id} user_id={$r->user_id} homeSections_count=" . count($hs) . "\n";
    foreach ($hs as $i => $sec) {
        echo "  [{$i}] type={$sec['type']} enabled=" . ($sec['enabled'] ? 'true' : 'false') . " title={$sec['title']}\n";
    }
}

// Check announcement state
$row = UserAppearanceSetting::where('theme', 'premium')->first();
if ($row) {
    $s = $row->settings;
    $ann = $s['header']['announcement'] ?? 'N/A';
    echo "\n=== Announcement ===\n";
    echo json_encode($ann, JSON_PRETTY_PRINT) . "\n";
    
    // Check if announcementBar also exists
    $annBar = $s['header']['announcementBar'] ?? 'NOT_SET';
    echo "\n=== AnnouncementBar ===\n";
    echo json_encode($annBar, JSON_PRETTY_PRINT) . "\n";
}

echo "\n=== Controller file check ===\n";
$ctrl = file_get_contents('/home/u324811576/domains/flashloja.com.br/public_html/app/Http/Controllers/User/PremiumAppearanceController.php');
echo "Has arrayKeys fix: " . (strpos($ctrl, 'arrayKeys') !== false ? 'YES' : 'NO') . "\n";
echo "Has theme=>premium in firstOrCreate: " . (substr_count($ctrl, "'theme' => 'premium'") >= 2 ? 'YES (2+)' : 'PARTIAL') . "\n";
