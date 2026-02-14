<?php
require __DIR__ . '/vendor/autoload.php';
ini_set('display_errors', 1);
error_reporting(E_ALL);
$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "Bootstrapped.\n";

use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

try {
    echo "Starting...\n";
    
    $username = 'agent_test_3';
    $user = DB::table('users')->where('username', $username)->first();
    echo "User query done.\n";

    if (!$user) {
        echo "User $username not found!\n";
        exit;
    }

    echo "Fixing user {$user->id} ({$user->username})...\n";

    // 1. Fix Membership
    $mem = DB::table('memberships')->where('user_id', $user->id)->first();
    // Get valid package ID
    $package = DB::table('packages')->first();
    $packageId = $package ? $package->id : 1; 
    
    if (!$mem) {
        echo "Creating membership with package {$packageId}...\n";
        DB::table('memberships')->insert([
            'user_id' => $user->id,
            'package_id' => $packageId,
            'payment_method' => 'manual',
            'status' => 1,
            'currency' => 'BRL',
            'currency_symbol' => 'R$',
            'price' => 0,
            'start_date' => Carbon::now()->format('Y-m-d'),
            'expire_date' => Carbon::now()->addYear()->format('Y-m-d'),
            'is_trial' => 0,
            'trial_days' => 0,
            'receipt' => null,
            'transaction_details' => null,
            'transaction_id' => uniqid(),
            'settings' => null,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    } else {
        echo "Updating existing membership with package {$packageId}...\n";
        DB::table('memberships')->where('id', $mem->id)->update([
            'status' => 1,
            'package_id' => $packageId,
            'expire_date' => Carbon::now()->addYear()->format('Y-m-d'),
        ]);
    }

    // 2. Fix Appearance
    $appSet = DB::table('user_appearance_settings')->where('user_id', $user->id)->first();
    if (!$appSet) {
        echo "Creating appearance settings...\n";
        $defaults = json_encode([
            'colors' => ['primary' => '#6366f1'],
            'global' => ['containerWidth' => '1280px'],
            'homeSections' => [
                ['type' => 'hero', 'enabled' => true, 'id' => 'hero-1'],
                ['type' => 'featured-products', 'enabled' => true, 'id' => 'feat-1']
            ]
        ]);
        
        DB::table('user_appearance_settings')->insert([
            'user_id' => $user->id,
            'theme' => 'premium',
            'settings' => $defaults,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    } else {
        echo "Appearance settings already exist.\n";
    }

    // 3. Ensure Online Status
    if ($user->online_status != 1) {
        echo "Setting online_status to 1...\n";
        DB::table('users')->where('id', $user->id)->update(['online_status' => 1]);
    }

    // 4. Fix Language
    $lang = DB::table('user_languages')->where('user_id', $user->id)->where('is_default', 1)->first();
    if (!$lang) {
        echo "Creating default language...\n";
        DB::table('user_languages')->insert([
            'user_id' => $user->id,
            'name' => 'Portuguese',
            'code' => 'pt_BR',
            'is_default' => 1,
            'rtl' => 0,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    } else {
        echo "Default language already exists: {$lang->code}\n";
    }

    // 5. Fix User Shop Settings
    $shopSet = DB::table('user_shop_settings')->where('user_id', $user->id)->first();
    if (!$shopSet) {
        echo "Creating shop settings...\n";
        DB::table('user_shop_settings')->insert([
            'user_id' => $user->id,
            // 'is_shop' => 1, // caused error
            // 'catalog_mode' => 0, // removed to be safe
            // 'item_count' => 8, // unknown column
            'flash_item_count' => 8,
            // 'latest_item_count' => 8, // might be unknown too
            // 'email_to_admin' => 0, // removed to be safe
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    } else {
        echo "Shop settings already exist.\n";
    }


    // 6. Fix User Permissions
    $perm = DB::table('user_permissions')->where('user_id', $user->id)->first();
    if (!$perm) {
        echo "Creating user permissions...\n";
        $features = $package ? $package->features : '[]';
        DB::table('user_permissions')->insert([
            'user_id' => $user->id,
            'package_id' => $packageId,
            'permissions' => $features,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    } else {
        echo "User permissions already exist.\n";
    }

    // 7. Fix User Currency
    $curr = DB::table('user_currencies')->where('user_id', $user->id)->where('is_default', 1)->first();
    if (!$curr) {
        echo "Creating default currency...\n";
        
        // Fetch language id
        $langId = DB::table('user_languages')->where('user_id', $user->id)->where('code', 'pt_BR')->value('id');

        DB::table('user_currencies')->insert([
            'user_id' => $user->id,
            'language_id' => $langId,
            'text' => 'BRL',
            'symbol' => 'R$',
            'text_position' => 'left',
            'symbol_position' => 'left',
            'value' => 1,
            'is_default' => 1
        ]);
    } else {
        echo "Default currency already exists.\n";
    }

    echo "Done.\n";

} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString() . "\n";
}
