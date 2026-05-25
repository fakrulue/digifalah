<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:150',
            'business_type' => 'nullable|string|max:100',
            'message' => 'nullable|string|max:1000',
            'source' => 'nullable|string|max:50',
        ]);

        Lead::create($data);

        return back()->with('success', "Thanks! We'll be in touch within 24 hours.");
    }
}
