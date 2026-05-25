<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller {
    public function index() {
        return Inertia::render('Admin/Team/Index', ['members' => TeamMember::orderBy('position')->get()]);
    }
    public function store(Request $request) {
        $data = $request->validate([
            'name' => 'required|string',
            'role' => 'required|string',
            'image' => 'nullable|string',
            'bio' => 'nullable|string',
            'social_links' => 'nullable|array',
            'position' => 'integer'
        ]);
        TeamMember::create($data);
        return back()->with('success', 'Member added.');
    }
    public function update(Request $request, TeamMember $member) {
        $data = $request->validate([
            'name' => 'required|string',
            'role' => 'required|string',
            'image' => 'nullable|string',
            'bio' => 'nullable|string',
            'social_links' => 'nullable|array',
            'position' => 'integer'
        ]);
        $member->update($data);
        return back()->with('success', 'Member updated.');
    }
    public function destroy(TeamMember $member) {
        $member->delete();
        return back()->with('success', 'Member removed.');
    }
}
