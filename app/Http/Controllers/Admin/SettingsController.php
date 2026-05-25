<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller {
    private function getSettings() {
        return SiteSetting::all()->mapWithKeys(function($item) {
            return [$item->key => SiteSetting::get($item->key)];
        });
    }

    public function website() {
        return Inertia::render('Admin/Settings/Website', [
            'settings' => $this->getSettings()
        ]);
    }

    public function panel() {
        return Inertia::render('Admin/Settings/Panel', [
            'settings' => $this->getSettings()
        ]);
    }

    public function update(Request $request) {
        foreach ($request->all() as $key => $value) {
            $isPublic = !in_array($key, ['gemini_api_key']);
            \App\Models\SiteSetting::updateOrCreate(
                ['key' => $key],
                ['value' => json_encode(['value' => $value]), 'is_public' => $isPublic]
            );
        }
        return back()->with('success', 'Settings saved.');
    }

    public function generateSitemap() {
        try {
            $siteController = new \App\Http\Controllers\SiteController();
            $response = $siteController->sitemap();
            $xml = $response->getContent();
            
            \Illuminate\Support\Facades\File::put(public_path('sitemap.xml'), $xml);
            
            return back()->with('success', 'Sitemap generated successfully at /sitemap.xml');
        } catch (\Exception $e) {
            return back()->with('error', 'Sitemap generation failed: ' . $e->getMessage());
        }
    }

    public function deleteSitemap() {
        try {
            $path = public_path('sitemap.xml');
            if (\Illuminate\Support\Facades\File::exists($path)) {
                \Illuminate\Support\Facades\File::delete($path);
                return back()->with('success', 'Physical sitemap.xml file deleted. System will now use dynamic sitemap.');
            }
            return back()->with('info', 'No physical sitemap.xml file found.');
        } catch (\Exception $e) {
            return back()->with('error', 'Sitemap deletion failed: ' . $e->getMessage());
        }
    }

    public function optimize() {
        try {
            \Illuminate\Support\Facades\Artisan::call('optimize:clear');
            \Illuminate\Support\Facades\Artisan::call('optimize');
            \Illuminate\Support\Facades\Artisan::call('view:cache');
            return back()->with('success', 'Website optimization completed successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Optimization failed: ' . $e->getMessage());
        }
    }
}
