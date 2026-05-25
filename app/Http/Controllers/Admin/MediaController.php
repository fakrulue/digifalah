<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\MediaFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MediaController extends Controller {
    public function index() {
        return Inertia::render('Admin/Media', ['files' => MediaFile::orderByDesc('created_at')->get()]);
    }

    public function json() {
        return response()->json(MediaFile::orderByDesc('created_at')->get());
    }

    public function upload(Request $request) {
        \Illuminate\Support\Facades\Log::info('Upload started');
        try {
            $request->validate(['file' => 'required|file|max:10240']);
            $file = $request->file('file');
            $mime = $file->getMimeType();
            \Illuminate\Support\Facades\Log::info('File MIME: ' . $mime);
            
            // Optimization path
            if (str_starts_with($mime, 'image/') && $mime !== 'image/svg+xml') {
                if ($mime === 'image/webp' && $file->getSize() < 204800) {
                    \Illuminate\Support\Facades\Log::info('Small WebP, skipping optimization');
                } else {
                    \Illuminate\Support\Facades\Log::info('Attempting optimization');
                    try {
                        $info = @getimagesize($file->getRealPath());
                        if ($info) {
                            $img = null;
                            switch ($info['mime']) {
                                case 'image/jpeg': $img = @imagecreatefromjpeg($file->getRealPath()); break;
                                case 'image/png': $img = @imagecreatefrompng($file->getRealPath()); break;
                                case 'image/webp': $img = @imagecreatefromwebp($file->getRealPath()); break;
                                case 'image/gif': $img = @imagecreatefromgif($file->getRealPath()); break;
                            }
                            if ($img) {
                                \Illuminate\Support\Facades\Log::info('Image resource created');
                                $width = imagesx($img);
                                $height = imagesy($img);
                                $maxWidth = 1600;
                                if ($width > $maxWidth) {
                                    $newWidth = $maxWidth;
                                    $newHeight = floor($height * ($newWidth / $width));
                                    $newImg = imagecreatetruecolor($newWidth, $newHeight);
                                    if ($newImg) {
                                        imagealphablending($newImg, false);
                                        imagesavealpha($newImg, true);
                                        $transparent = imagecolorallocatealpha($newImg, 255, 255, 255, 127);
                                        imagefilledrectangle($newImg, 0, 0, $newWidth, $newHeight, $transparent);
                                        imagecopyresampled($newImg, $img, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
                                        imagedestroy($img);
                                        $img = $newImg;
                                        \Illuminate\Support\Facades\Log::info('Image resized');
                                    }
                                }
                                
                                $filenameWithoutExt = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                                $newFilename = $filenameWithoutExt . '-' . uniqid() . '.webp';
                                $newStoragePath = 'media/' . $newFilename;
                                $absolutePath = Storage::disk('public')->path($newStoragePath);
                                
                                if (!file_exists(dirname($absolutePath))) {
                                    @mkdir(dirname($absolutePath), 0755, true);
                                }
                                
                                if (@imagewebp($img, $absolutePath, 70)) {
                                    imagedestroy($img);
                                    \Illuminate\Support\Facades\Log::info('WebP saved: ' . $absolutePath);
                                    
                                    MediaFile::create([
                                        'filename' => $newFilename,
                                        'storage_path' => $newStoragePath,
                                        'url' => Storage::disk('public')->url($newStoragePath),
                                        'mime_type' => 'image/webp',
                                        'size_bytes' => filesize($absolutePath),
                                        'uploader_id' => auth()->id(),
                                    ]);
                                    \Illuminate\Support\Facades\Log::info('Media record created');
                                    return back()->with('success', 'File uploaded and optimized to WebP.');
                                }
                                if ($img) imagedestroy($img);
                                \Illuminate\Support\Facades\Log::warning('imagewebp failed');
                            } else {
                                \Illuminate\Support\Facades\Log::warning('imagecreatefrom... failed');
                            }
                        }
                    } catch (\Throwable $et) {
                        \Illuminate\Support\Facades\Log::error('Optimization error: ' . $et->getMessage());
                    }
                }
            }

            // Fallback path
            \Illuminate\Support\Facades\Log::info('Falling back to normal upload');
            $path = $file->store('media', 'public');
            MediaFile::create([
                'filename' => $file->getClientOriginalName(),
                'storage_path' => $path,
                'url' => Storage::disk('public')->url($path),
                'mime_type' => $file->getMimeType(),
                'size_bytes' => $file->getSize(),
                'uploader_id' => auth()->id(),
            ]);
            \Illuminate\Support\Facades\Log::info('Fallback success');
            return back()->with('success', 'File uploaded.');
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('CRITICAL UPLOAD ERROR: ' . $e->getMessage() . "\n" . $e->getTraceAsString());
            return back()->with('error', 'Upload failed: ' . $e->getMessage());
        }
    }

    public function optimizeAll() {
        \Illuminate\Support\Facades\Artisan::call('image:optimize');
        return back()->with('success', 'Images have been optimized to WebP successfully.');
    }

    public function destroy(MediaFile $file) {
        Storage::disk('public')->delete($file->storage_path);
        $file->delete();
        return back()->with('success', 'File deleted.');
    }
}
