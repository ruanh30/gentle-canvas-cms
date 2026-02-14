<?php
require '/home/u324811576/domains/flashloja.com.br/public_html/vendor/autoload.php';
$app = require_once '/home/u324811576/domains/flashloja.com.br/public_html/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User\UserAppearanceSetting;

$s = UserAppearanceSetting::where('user_id', 32)->where('theme', 'premium')->first();
if ($s) {
    echo "Settings found.\n";
    $data = is_array($s->settings) ? $s->settings : json_decode($s->settings, true);
    print_r($data['header']['announcement'] ?? 'No announcement settings');
} else {
    echo "No settings found for user 32.\n";
}
