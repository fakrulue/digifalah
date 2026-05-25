<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Lead;
use Inertia\Inertia;

class LeadsController extends Controller {
    public function index() {
        return Inertia::render('Admin/Leads', [
            'leads' => Lead::orderByDesc('created_at')->get()
        ]);
    }
}
