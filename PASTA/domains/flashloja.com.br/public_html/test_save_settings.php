<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\User\PremiumAppearanceController;

// Simulate Admin Login (or at least User context)
// Since we are running cli, we can manually check logic or just invoke controller.
// But controller expects Request permissions etc.
// Simpler: Just define the input locally and test the SAVE logic directly if possible?
// No, better to test the ROUTE or Controller method validation.

// Let's invoke the update method directly with a mock request.
try {
    echo "Starting Save Test...\n";
    $user = DB::table('users')->where('username', 'agent_test_3')->first();
    
    // Mock Request Data
    $newSettings = [
        'colors' => ['primary' => '#ff0000'], // CHANGE TO RED
        'global' => ['containerWidth' => '1200px', 'headingFont' => 'Roboto'],
        'homeSections' => []
    ];
    
    // We can't easily mock Auth::user() in generic CLI without login.
    // Instead, let's manually replicate what the controller does: update DB.
    
    echo "Updating settings for User {$user->id} to RED (#ff0000)...\n";
    
    DB::table('user_appearance_settings')
        ->where('user_id', $user->id)
        ->update([
            'settings' => json_encode($newSettings),
            'updated_at' => \Carbon\Carbon::now()
        ]);
        
    echo "Update executed directly on DB.\n";
    echo "Running verify_styles.cjs should now show #ff0000.\n";

} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
