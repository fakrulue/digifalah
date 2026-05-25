<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PortfolioController extends Controller {
    public function index() {
        return Inertia::render('Admin/Portfolio/Index', ['items' => Portfolio::orderBy('position')->get()]);
    }
    public function store(Request $request) {
        $data = $request->validate([
            'title' => 'required|string',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
            'category' => 'nullable|string',
            'link' => 'nullable|string',
            'position' => 'integer'
        ]);
        $data['slug'] = Str::slug($data['title']) . '-' . time();
        Portfolio::create($data);
        return back()->with('success', 'Project added.');
    }
    public function update(Request $request, Portfolio $portfolio) {
        $data = $request->validate([
            'title' => 'required|string',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
            'category' => 'nullable|string',
            'link' => 'nullable|string',
            'position' => 'integer'
        ]);
        $portfolio->update($data);
        return back()->with('success', 'Project updated.');
    }
    public function destroy(Portfolio $portfolio) {
        $portfolio->delete();
        return back()->with('success', 'Project removed.');
    }
}
