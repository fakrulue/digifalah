<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;

echo "Testing storage...\n";
$dummy = "hello world";
$path = "media/test.txt";
Storage::disk('public')->put($path, $dummy);

echo "File saved at: " . Storage::disk('public')->path($path) . "\n";
echo "URL generated: " . Storage::disk('public')->url($path) . "\n";

if (file_exists(public_path('storage/' . $path))) {
    echo "SYMLINK WORKING! File accessible at public/storage/" . $path . "\n";
} else {
    echo "SYMLINK FAILED! public/storage/" . $path . " does not exist.\n";
}
