<?php
require '/home/u324811576/domains/flashloja.com.br/public_html/vendor/autoload.php';
$app = require_once '/home/u324811576/domains/flashloja.com.br/public_html/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User\UserAppearanceSetting;

$s = UserAppearanceSetting::where('user_id', 32)->where('theme', 'premium')->first();
if ($s) {
    $settings = is_array($s->settings) ? $s->settings : json_decode($s->settings, true);
    
    // Force Carousel
    $settings['header']['announcement']['enabled'] = true;
    $settings['header']['announcement']['style'] = 'carousel';
    $settings['header']['announcement']['messages'] = ['Teste Carrossel 1', 'Teste Carrossel 2', 'Teste Carrossel 3'];
    $settings['header']['announcement']['speed'] = 3;
    
    $s->settings = $settings;
    $s->save();
    echo "Updated user 32 to Carousel mode.\n";
} else {
    echo "User 32 settings not found.\n";
}
