<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\MediaFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class OptimizeImages extends Command
{
    protected $signature = 'image:optimize {--all : Optimize all images, regardless of current format}';
    protected $description = 'Optimize images by converting them to highly compressed WebP format (under 200kb)';

    public function handle()
    {
        $this->info('Starting image optimization...');
        $files = MediaFile::all();
        $count = 0;

        foreach ($files as $media) {
            if (!str_starts_with($media->mime_type, 'image/')) {
                continue;
            }
            if ($media->mime_type === 'image/webp' && !$this->option('all')) {
                continue; // Already webp
            }

            $disk = Storage::disk('public');
            $originalPath = $media->storage_path;
            
            if (!$disk->exists($originalPath)) {
                continue;
            }

            $absolutePath = $disk->path($originalPath);
            $this->info("Processing: {$media->filename}");

            // Load Image
            $info = @getimagesize($absolutePath);
            if (!$info) continue;

            $mime = $info['mime'];
            $img = null;
            switch ($mime) {
                case 'image/jpeg': $img = @imagecreatefromjpeg($absolutePath); break;
                case 'image/png': $img = @imagecreatefrompng($absolutePath); break;
                case 'image/webp': $img = @imagecreatefromwebp($absolutePath); break;
                case 'image/gif': $img = @imagecreatefromgif($absolutePath); break;
            }

            if (!$img) {
                $this->warn("Failed to load image: {$media->filename}");
                continue;
            }

            $width = imagesx($img);
            $height = imagesy($img);
            
            // Resize if too large (to keep size < 200kb)
            $maxWidth = 1600;
            if ($width > $maxWidth) {
                $newWidth = $maxWidth;
                $newHeight = floor($height * ($newWidth / $width));
                $newImg = imagecreatetruecolor($newWidth, $newHeight);
                imagealphablending($newImg, false);
                imagesavealpha($newImg, true);
                $transparent = imagecolorallocatealpha($newImg, 255, 255, 255, 127);
                imagefilledrectangle($newImg, 0, 0, $newWidth, $newHeight, $transparent);
                imagecopyresampled($newImg, $img, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
                imagedestroy($img);
                $img = $newImg;
            } else {
                imagealphablending($img, false);
                imagesavealpha($img, true);
            }

            // Path for new WebP
            $dir = dirname($originalPath);
            $dir = $dir === '.' ? '' : $dir . '/';
            $filenameWithoutExt = pathinfo($media->filename, PATHINFO_FILENAME);
            
            $newFilename = $filenameWithoutExt . '-' . uniqid() . '.webp';
            $newStoragePath = $dir . $newFilename;
            $newAbsolutePath = $disk->path($newStoragePath);

            // Save WebP (Quality 70 to ensure small size)
            imagewebp($img, $newAbsolutePath, 70);
            imagedestroy($img);

            $newSize = filesize($newAbsolutePath);
            $newUrl = $disk->url($newStoragePath);
            $oldUrl = $media->url;

            // Update Media Record
            $media->update([
                'filename' => $newFilename,
                'storage_path' => $newStoragePath,
                'url' => $newUrl,
                'mime_type' => 'image/webp',
                'size_bytes' => $newSize,
            ]);

            // Delete old file
            if ($originalPath !== $newStoragePath) {
                $disk->delete($originalPath);
            }

            // Global Search and Replace old URL to new URL
            $this->replaceInDatabase($oldUrl, $newUrl);

            $this->info("Optimized to WebP: {$newFilename} (" . round($newSize / 1024, 2) . " KB)");
            $count++;
        }

        $this->info("Successfully optimized {$count} images!");
    }

    protected function replaceInDatabase($oldUrl, $newUrl)
    {
        try {
            $tables = array_map(fn($t) => $t['name'], Schema::getTables());
            foreach ($tables as $table) {
                if ($table === 'migrations' || $table === 'sessions') continue;
                $columns = array_map(fn($c) => $c['name'], Schema::getColumns($table));
                
                foreach ($columns as $column) {
                    try {
                        DB::statement("UPDATE \"{$table}\" SET \"{$column}\" = REPLACE(\"{$column}\", ?, ?) WHERE \"{$column}\" LIKE ?", [$oldUrl, $newUrl, "%{$oldUrl}%"]);
                    } catch (\Exception $e) {
                        // Ignore column types that don't support REPLACE or LIKE
                    }
                }
            }
        } catch (\Exception $e) {
            $this->error("Failed to replace URLs in database: " . $e->getMessage());
        }
    }
}
