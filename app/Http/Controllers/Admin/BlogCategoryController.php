<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogCategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Blog/Categories', [
            'categories' => BlogCategory::orderBy('name')->get()
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100|unique:blog_categories',
        ]);

        BlogCategory::create([
            'name' => $data['name'],
            'slug' => Str::slug($data['name']),
        ]);

        return back()->with('success', 'Category created.');
    }

    public function destroy(BlogCategory $category)
    {
        $category->delete();
        return back()->with('success', 'Category deleted.');
    }
}
