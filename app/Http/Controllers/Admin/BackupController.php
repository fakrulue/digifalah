<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Artisan;
use ZipArchive;
use File;

class BackupController extends Controller
{
    public function index()
    {
        $backups = [];
        if (File::exists(storage_path('app/backups'))) {
            $files = File::files(storage_path('app/backups'));
            foreach ($files as $file) {
                $backups[] = [
                    'name' => $file->getFilename(),
                    'size' => round($file->getSize() / 1024 / 1024, 2) . ' MB',
                    'date' => date('Y-m-d H:i:s', $file->getMTime()),
                ];
            }
        }
        
        // Sort by date desc
        usort($backups, function($a, $b) {
            return strcmp($b['date'], $a['date']);
        });

        return inertia('Admin/Settings/Backup', [
            'backups' => $backups
        ]);
    }

    public function create()
    {
        try {
            $backupDir = storage_path('app/backups');
            if (!File::exists($backupDir)) {
                File::makeDirectory($backupDir, 0755, true);
            }

            $fileName = 'backup-' . date('Y-m-d-H-i-s') . '.zip';
            $zipPath = $backupDir . '/' . $fileName;

            $zip = new ZipArchive;
            if ($zip->open($zipPath, ZipArchive::CREATE) === TRUE) {
                // Add database
                if (File::exists(database_path('database.sqlite'))) {
                    $zip->addFile(database_path('database.sqlite'), 'database.sqlite');
                }

                // Add .env (for configuration)
                if (File::exists(base_path('.env'))) {
                    $zip->addFile(base_path('.env'), '.env');
                }

                // Add public storage media
                $mediaDir = storage_path('app/public/media');
                if (File::exists($mediaDir)) {
                    $files = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($mediaDir));
                    foreach ($files as $name => $file) {
                        if (!$file->isDir()) {
                            $filePath = $file->getRealPath();
                            $relativePath = 'storage/media/' . substr($filePath, strlen($mediaDir) + 1);
                            $zip->addFile($filePath, $relativePath);
                        }
                    }
                }

                $zip->close();
                return back()->with('success', 'Full backup created successfully.');
            } else {
                return back()->with('error', 'Could not create zip file.');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Backup failed: ' . $e->getMessage());
        }
    }

    public function download($name)
    {
        $path = storage_path('app/backups/' . $name);
        if (File::exists($path)) {
            return response()->download($path);
        }
        return back()->with('error', 'File not found.');
    }

    public function destroy($name)
    {
        $path = storage_path('app/backups/' . $name);
        if (File::exists($path)) {
            File::delete($path);
            return back()->with('success', 'Backup deleted.');
        }
        return back()->with('error', 'File not found.');
    }
}
