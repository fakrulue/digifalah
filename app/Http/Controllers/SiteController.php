<?php
namespace App\Http\Controllers;
use App\Models\PageBlock;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteController extends Controller
{
    public function home()
    {
        $blocks = PageBlock::where('page_slug', 'home')->where('is_visible', true)->orderBy('position')->get();
        $pricing_plans = \App\Models\PricingPlan::where('is_active', true)->orderBy('position')->get();
        return Inertia::render('Site/Home', [
            'blocks' => $blocks, 
            'pricing_plans' => $pricing_plans,
            'seo' => $this->getSeo('home'),
            'services' => \App\Models\Service::where('is_active', true)->orderBy('position')->get(),
            'team_members' => \App\Models\TeamMember::orderBy('position')->get(),
            'clients' => \App\Models\Client::orderBy('position')->get(),
            'portfolios' => \App\Models\Portfolio::orderBy('position')->get(),
            'case_studies' => \App\Models\CaseStudy::orderBy('position')->get(),
        ]);
    }

    public function page(string $slug)
    {
        $blocks = PageBlock::where('page_slug', $slug)->where('is_visible', true)->orderBy('position')->get();
        $data = [
            'blocks' => $blocks, 
            'slug' => $slug,
            'seo' => $this->getSeo($slug),
            'pricing_plans' => \App\Models\PricingPlan::where('is_active', true)->orderBy('position')->get(),
            'services' => \App\Models\Service::where('is_active', true)->orderBy('position')->get(),
            'team_members' => \App\Models\TeamMember::orderBy('position')->get(),
            'clients' => \App\Models\Client::orderBy('position')->get(),
            'portfolios' => \App\Models\Portfolio::orderBy('position')->get(),
            'case_studies' => \App\Models\CaseStudy::orderBy('position')->get(),
        ];

        return Inertia::render('Site/Page', $data);
    }

    public function blog()
    {
        $posts = BlogPost::where('status', 'published')->orderByDesc('published_at')->get();
        $blocks = PageBlock::where('page_slug', 'blog')->where('is_visible', true)->orderBy('position')->get();
        return Inertia::render('Site/Blog', [
            'posts' => $posts, 
            'blocks' => $blocks,
            'seo' => $this->getSeo('blog'),
            'services' => \App\Models\Service::where('is_active', true)->orderBy('position')->get(),
            'pricing_plans' => \App\Models\PricingPlan::where('is_active', true)->orderBy('position')->get(),
            'team_members' => \App\Models\TeamMember::orderBy('position')->get(),
            'clients' => \App\Models\Client::orderBy('position')->get(),
            'portfolios' => \App\Models\Portfolio::orderBy('position')->get(),
            'case_studies' => \App\Models\CaseStudy::orderBy('position')->get(),
        ]);
    }

    public function blogPost(string $slug)
    {
        $query = BlogPost::where('slug', $slug);

        if (!auth()->check()) {
            $query->where('status', 'published');
        }

        $post = $query->with(['comments' => fn($q) => $q->where('is_approved', true)])->firstOrFail();
        
        return Inertia::render('Site/BlogPost', [
            'post' => $post,
            'seo' => [
                'title' => $post->seo_title ?: $post->title,
                'description' => $post->seo_description ?: $post->excerpt,
                'og_image' => $post->og_image ?: $post->cover_image
            ]
        ]);
    }

    private function getSeo($slug)
    {
        return \App\Models\SeoMeta::where('page_slug', $slug)->first();
    }

    public function storeComment(Request $request, BlogPost $post)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'comment' => 'required|string|min:5',
        ]);

        $post->comments()->create($data);

        return back()->with('success', 'Your comment has been submitted and is awaiting approval.');
    }

    public function sitemap()
    {
        // Get unique page slugs from PageBlock
        $pages = PageBlock::select('page_slug')->distinct()->where('is_visible', true)->get();
        $urls = $pages->pluck('page_slug')->map(function($slug) {
            return $slug === 'home' ? '/' : '/' . $slug;
        })->toArray();

        // Add standard static pages if not in database
        $staticDefaults = ['/blog', '/privacy', '/terms'];
        foreach ($staticDefaults as $default) {
            if (!in_array($default, $urls)) {
                $urls[] = $default;
            }
        }

        $posts = BlogPost::where('status', 'published')->get();

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        // Add static URLs
        foreach ($urls as $url) {
            $xml .= '<url>';
            $xml .= '<loc>' . url($url) . '</loc>';
            $xml .= '<lastmod>' . date('Y-m-d\TH:i:sP') . '</lastmod>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '<priority>' . ($url === '/' ? '1.0' : '0.8') . '</priority>';
            $xml .= '</url>';
        }

        // Add dynamic blog posts
        foreach ($posts as $post) {
            $xml .= '<url>';
            $xml .= '<loc>' . url('/blog/' . $post->slug) . '</loc>';
            $xml .= '<lastmod>' . $post->updated_at->toAtomString() . '</lastmod>';
            $xml .= '<changefreq>monthly</changefreq>';
            $xml .= '<priority>0.6</priority>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return response($xml, 200)->header('Content-Type', 'text/xml');
    }
}
