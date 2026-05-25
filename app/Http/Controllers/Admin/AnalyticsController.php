<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Visit;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index()
    {
        $today = now()->startOfDay();

        $stats = [
            'today_visits' => Visit::where('created_at', '>=', $today)->count(),
            'total_visits' => Visit::count(),
            'unique_visitors' => Visit::distinct('ip')->count(),
            
            'top_pages' => Visit::select('url', DB::raw('count(*) as count'))
                ->groupBy('url')
                ->orderByDesc('count')
                ->limit(10)
                ->get(),

            'devices' => Visit::select('device', DB::raw('count(*) as count'))
                ->groupBy('device')
                ->get(),

            'browsers' => Visit::select('browser', DB::raw('count(*) as count'))
                ->groupBy('browser')
                ->orderByDesc('count')
                ->get(),

            'platforms' => Visit::select('platform', DB::raw('count(*) as count'))
                ->groupBy('platform')
                ->orderByDesc('count')
                ->get(),

            'recent_visits' => Visit::orderByDesc('created_at')
                ->limit(20)
                ->get()
                ->map(function($visit) {
                    $visit->time_formatted = $visit->created_at->format('h:i A');
                    return $visit;
                }),

            'daily_stats' => Visit::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
                ->groupBy('date')
                ->orderByDesc('date')
                ->limit(14)
                ->get()
                ->reverse()
                ->values(),
        ];

        return Inertia::render('Admin/Analytics/Index', ['stats' => $stats]);
    }
}
