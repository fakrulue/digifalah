<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Keyword;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KeywordController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/SEO/KeywordTracker', [
            'keywords' => Keyword::orderBy('keyword')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'keyword' => 'required|string|max:255',
            'target_url' => 'nullable|url',
            'current_rank' => 'nullable|integer|min:1',
            'search_volume' => 'nullable|integer|min:0',
            'difficulty' => 'nullable|integer|min:0|max:100',
        ]);

        Keyword::create($validated);

        return back()->with('success', 'Keyword added to tracker.');
    }

    public function update(Request $request, Keyword $keyword)
    {
        $validated = $request->validate([
            'keyword' => 'required|string|max:255',
            'target_url' => 'nullable|url',
            'current_rank' => 'nullable|integer|min:1',
            'search_volume' => 'nullable|integer|min:0',
            'difficulty' => 'nullable|integer|min:0|max:100',
        ]);

        if ($keyword->current_rank !== (int)($validated['current_rank'] ?? 0)) {
            $validated['previous_rank'] = $keyword->current_rank;
        }

        $keyword->update($validated);

        return back()->with('success', 'Keyword updated.');
    }

    public function destroy(Keyword $keyword)
    {
        $keyword->delete();
        return back()->with('success', 'Keyword removed.');
    }
}
