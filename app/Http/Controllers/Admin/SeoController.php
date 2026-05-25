<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\SeoMeta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeoController extends Controller {
    public function index() {
        $core = ['home','services','about','pricing','contact','blog','privacy','terms'];
        $custom = \App\Models\PageBlock::whereNotIn('page_slug', $core)->distinct()->pluck('page_slug');
        $staticPages = ['privacy', 'terms'];
        
        return Inertia::render('Admin/Seo', [
            'metas' => SeoMeta::all(),
            'custom_pages' => $custom,
            'static_pages' => $staticPages,
        ]);
    }

    public function update(Request $request) {
        $data = $request->validate([
            'page_slug' => 'required|string',
            'title' => 'nullable|string',
            'description' => 'nullable|string',
            'og_image' => 'nullable|string',
            'no_index' => 'boolean',
        ]);
        SeoMeta::updateOrCreate(['page_slug' => $data['page_slug']], $data);
        return back()->with('success', 'SEO meta saved.');
    }
}
