<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\CaseStudy;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CaseStudyController extends Controller {
    public function index() {
        return Inertia::render('Admin/CaseStudies/Index', ['studies' => CaseStudy::orderBy('position')->get()]);
    }
    public function store(Request $request) {
        $data = $request->validate([
            'title' => 'required|string',
            'image' => 'nullable|string',
            'content' => 'nullable|string',
            'client_name' => 'nullable|string',
            'results' => 'nullable|string',
            'position' => 'integer'
        ]);
        $data['slug'] = Str::slug($data['title']) . '-' . time();
        CaseStudy::create($data);
        return back()->with('success', 'Case study added.');
    }
    public function update(Request $request, CaseStudy $study) {
        $data = $request->validate([
            'title' => 'required|string',
            'image' => 'nullable|string',
            'content' => 'nullable|string',
            'client_name' => 'nullable|string',
            'results' => 'nullable|string',
            'position' => 'integer'
        ]);
        $study->update($data);
        return back()->with('success', 'Case study updated.');
    }
    public function destroy(CaseStudy $study) {
        $study->delete();
        return back()->with('success', 'Case study removed.');
    }
}
