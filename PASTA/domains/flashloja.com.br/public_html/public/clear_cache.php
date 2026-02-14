<?php
require __DIR__ . '/../bootstrap/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Artisan;

echo "Starting cache clear...<br>";

try {
    Artisan::call('optimize:clear');
    echo "Output:<br>";
    echo nl2br(Artisan::output());
    echo "<br>Done.";
} catch (\Throwable $e) {
    echo "Error: " . $e->getMessage();
}
