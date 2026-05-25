<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Lead;
use App\Models\MediaFile;
use Inertia\Inertia;

class DashboardController extends Controller {
    public function index() {
        $today = now()->startOfDay();
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'posts' => BlogPost::count(),
                'leads' => Lead::count(),
                'media' => MediaFile::count(),
                'published' => BlogPost::where('status','published')->count(),
                'visits_today' => \App\Models\Visit::where('created_at', '>=', $today)->count(),
                'visitors_total' => \App\Models\Visit::distinct('ip')->count(),
            ]
        ]);
    }
}
