<?php
require '/home/u324811576/domains/flashloja.com.br/public_html/vendor/autoload.php';
$app = require_once '/home/u324811576/domains/flashloja.com.br/public_html/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User\UserAppearanceSetting;
use App\Models\User;

$settings = UserAppearanceSetting::where('theme', 'premium')->get();
foreach ($settings as $s) {
    $u = User::find($s->user_id);
    if ($u) {
        echo "User: " . $u->username . " (ID: $s->user_id)\n";
    }
}
