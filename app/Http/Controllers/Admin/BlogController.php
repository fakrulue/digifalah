<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogController extends Controller {
    public function index() {
        return Inertia::render('Admin/Blog/Index', [
            'posts' => BlogPost::with('category')->orderByDesc('created_at')->get()
        ]);
    }

    public function create() {
        return Inertia::render('Admin/Blog/New', [
            'categories' => BlogCategory::all()
        ]);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'excerpt' => 'nullable|string',
            'status' => 'in:draft,published',
            'category_id' => 'nullable|exists:blog_categories,id',
            'cover_image' => 'nullable|string',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'og_image' => 'nullable|string',
            'ai_generated' => 'boolean',
        ]);
        $data['slug'] = Str::slug($data['title']) . '-' . time();
        $data['author_id'] = auth()->id();
        if (($data['status'] ?? 'draft') === 'published') $data['published_at'] = now();
        BlogPost::create($data);
        return redirect()->route('admin.blog')->with('success', 'Post created.');
    }

    public function edit(BlogPost $post) {
        return Inertia::render('Admin/Blog/Edit', [
            'post' => $post,
            'categories' => BlogCategory::all()
        ]);
    }

    public function update(Request $request, BlogPost $post) {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'excerpt' => 'nullable|string',
            'status' => 'in:draft,published',
            'category_id' => 'nullable|exists:blog_categories,id',
            'cover_image' => 'nullable|string',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'og_image' => 'nullable|string',
        ]);
        if ($data['status'] === 'published' && !$post->published_at) $data['published_at'] = now();
        $post->update($data);
        return redirect()->route('admin.blog')->with('success', 'Post updated.');
    }

    public function destroy(BlogPost $post) {
        $post->delete();
        return redirect()->route('admin.blog')->with('success', 'Post deleted.');
    }
}
