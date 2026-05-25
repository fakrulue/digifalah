<?php
namespace App\Http\Controllers;
use App\Models\Lead;
use Illuminate\Http\Request;

class LeadFormController extends Controller {
    public function store(Request $request) {
        $data = $request->validate([
            'name' => 'required|string|max:150',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:150',
            'business_type' => 'nullable|string|max:100',
            'message' => 'nullable|string|max:1000',
            'source' => 'nullable|string|max:100',
        ]);
        Lead::create($data);
        return back()->with('success', 'Thank you! We will contact you shortly.');
    }
}
