<?php
// Inject version routes into user.php
$path = '/home/u324811576/domains/flashloja.com.br/public_html/routes/user.php';
$content = file_get_contents($path);

if (strpos($content, 'premium.versions') !== false) {
    echo "Routes already exist\n";
    exit(0);
}

// Find the preset route line and add after it
$presetRoute = "Route::post('/appearance-premium/preset', 'User\\PremiumAppearanceController@applyPreset')->name('user.appearance.premium.preset');";
$newRoutes = $presetRoute . "\n" .
    "        Route::get('/appearance-premium/versions', 'User\\PremiumAppearanceController@versions')->name('user.appearance.premium.versions');\n" .
    "        Route::post('/appearance-premium/rollback', 'User\\PremiumAppearanceController@rollback')->name('user.appearance.premium.rollback');";

$content = str_replace($presetRoute, $newRoutes, $content);
file_put_contents($path, $content);
echo "Routes patched successfully\n";
