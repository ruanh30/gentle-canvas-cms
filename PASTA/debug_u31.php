<?php
require '/home/u324811576/domains/flashloja.com.br/public_html/vendor/autoload.php';
$app = require_once '/home/u324811576/domains/flashloja.com.br/public_html/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(Illuminate\Http\Request::capture());

$u = App\Models\User\UserAppearanceSetting::where('user_id', 31)->where('theme','premium')->first();
if ($u) {
    if (isset($u->settings['homeSections'])) {
        print_r($u->settings['homeSections']);
    } else {
        echo "homeSections key missing\n";
    }
} else {
    echo "User 31 premium row not found\n";
}
