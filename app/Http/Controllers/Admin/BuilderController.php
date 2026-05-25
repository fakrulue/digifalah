<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\PageBlock;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class BuilderController extends Controller {
    public function index() {
        $pages = PageBlock::select('page_slug')->distinct()->pluck('page_slug');
        $allPages = collect(['home','services','about','pricing','contact','blog'])->merge($pages)->unique()->values();
        return Inertia::render('Admin/Builder/Index', ['pages' => $allPages]);
    }

    public function edit(string $slug) {
        $blocks = PageBlock::where('page_slug', $slug)->orderBy('position')->get();
        return Inertia::render('Admin/Builder/Edit', [
            'slug' => $slug, 
            'initialBlocks' => $blocks,
            'team_members' => \App\Models\TeamMember::orderBy('position')->get(),
            'clients' => \App\Models\Client::orderBy('position')->get(),
            'portfolios' => \App\Models\Portfolio::orderBy('position')->get(),
            'case_studies' => \App\Models\CaseStudy::orderBy('position')->get(),
            'services' => \App\Models\Service::where('is_active', true)->orderBy('position')->get(),
            'pricing_plans' => \App\Models\PricingPlan::where('is_active', true)->orderBy('position')->get(),
        ]);
    }

    public function save(Request $request, string $slug) {
        $blocks = $request->input('blocks', []);
        
        if (!is_array($blocks)) {
            return back()->with('error', 'Invalid block data received.');
        }

        $existingCount = PageBlock::where('page_slug', $slug)->count();

        if (empty($blocks) && $existingCount > 0) {
            \Illuminate\Support\Facades\Log::warning('Builder save called with empty blocks while existing blocks exist', [
                'slug' => $slug,
                'existing_count' => $existingCount,
                'request_data' => $request->all(),
            ]);
            return back()->with('error', 'Save aborted: no block data received. If you intend to clear the page, remove blocks individually or delete the page.');
        }

        try {
            DB::transaction(function () use ($slug, $blocks) {
                PageBlock::where('page_slug', $slug)->delete();
                foreach ($blocks as $i => $b) {
                    if (!isset($b['block_type'])) continue;
                    PageBlock::create([
                        'page_slug' => $slug,
                        'block_type' => $b['block_type'],
                        'position' => $i,
                        'content' => $b['content'] ?? [],
                        'is_visible' => $b['is_visible'] ?? true,
                    ]);
                }
            });
            return back()->with('success', 'Page saved.');
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Builder save failed: ' . $e->getMessage(), [
                'slug' => $slug,
                'trace' => $e->getTraceAsString(),
            ]);
            return back()->with('error', 'Failed to save page: ' . $e->getMessage());
        }
    }
    public function create(Request $request) {
        $request->validate(['slug' => 'required|string|regex:/^[a-z0-9-]+$/']);
        $slug = $request->slug;
        
        // Ensure it doesn't already exist
        if (PageBlock::where('page_slug', $slug)->exists() || in_array($slug, ['home','services','about','pricing','contact','blog'])) {
            return back()->withErrors(['slug' => 'Page already exists.']);
        }
        
        // Create an empty block to initialize the page
        PageBlock::create([
            'page_slug' => $slug,
            'block_type' => 'Hero',
            'position' => 0,
                'content' => ['title' => 'New Page'],
            'is_visible' => true,
        ]);
        
        return back()->with('success', 'Page created.');
    }

    public function destroy(string $slug) {
        $corePages = ['home','services','about','pricing','contact','blog'];
        if (in_array($slug, $corePages)) {
            return back()->withErrors(['error' => 'Core pages cannot be deleted.']);
        }
        
        PageBlock::where('page_slug', $slug)->delete();
        return back()->with('success', 'Page deleted successfully.');
    }
}
