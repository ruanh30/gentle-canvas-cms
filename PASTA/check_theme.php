<?php
require __DIR__ . '/domains/flashloja.com.br/public_html/vendor/autoload.php';
$app = require_once __DIR__ . '/domains/flashloja.com.br/public_html/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = \App\Models\User::where('email', 'agent_test_3@example.com')->first();
if (!$user) {
    echo "User not found\n";
    exit;
}
echo "User ID: " . $user->id . "\n";
echo "Status: " . $user->status . "\n";

$bs = \App\Models\User\BasicSetting::where('user_id', $user->id)->first();
if ($bs) {
    echo "Theme: " . $bs->theme . "\n";
    if ($bs->theme !== 'premium') {
        $bs->theme = 'premium';
        $bs->save();
        echo "Updated theme to premium\n";
    }
} else {
    echo "No BasicSetting found. Creating...\n";
    $bs = new \App\Models\User\BasicSetting();
    $bs->user_id = $user->id;
    $bs->theme = 'premium';
    $bs->save();
    echo "Created BasicSetting with premium theme\n";
}
