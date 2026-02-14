<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

echo "WEBSITE_HOST: " . env('WEBSITE_HOST') . PHP_EOL;

// Try App\Models\User first, then App\User
$userClass = class_exists('App\Models\User') ? 'App\Models\User' : 'App\User';

$users = $userClass::where('status', 1)->take(5)->get();
foreach($users as $u) {
    // Get user basic settings if relation exists
    $theme = $u->theme ?? 'N/A';
    // Actually theme is in UserBasicSetting usually or in User table?
    // In many Gentle CMS versions, it is in `basic_settings` table joined or relation.
    // Let's check relation if possible, or just dump u->theme if it exists on User model.
    // Wait, layout.blade.php uses $userBs->theme. $userBs is UserBasicSetting.
    // Let's try to fetch UserBasicSetting.
    // Use DB facade to avoid model issues
    $bs = Illuminate\Support\Facades\DB::table('user_basic_settings')->where('user_id', $u->id)->first();
    $userTheme = $bs ? $bs->theme : 'No BS';
    
    // Check membership
    $membership = Illuminate\Support\Facades\DB::table('memberships')
        ->where('user_id', $u->id)
        ->where('status', 1)
        ->orderBy('id', 'desc')
        ->first();
        
    $memStatus = $membership ? 'Active' : 'None/Inactive';
    $memExpire = $membership ? $membership->expire_date : 'N/A';

    // Check Appearance
    $appSet = Illuminate\Support\Facades\DB::table('user_appearance_settings')
        ->where('user_id', $u->id)
        ->first();
    $hasApp = $appSet ? 'Yes' : 'NO';

    echo $u->id . ' | ' . $u->username . ' | Theme: ' . $userTheme . ' | Status: ' . $u->status . ' | Online: ' . ($u->online_status ?? 'NULL') . ' | Mem: ' . $memStatus . ' | AppSet: ' . $hasApp . PHP_EOL;
}
