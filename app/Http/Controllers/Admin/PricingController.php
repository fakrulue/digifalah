<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PricingPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PricingController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Pricing/Index', [
            'plans' => PricingPlan::orderBy('position')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Pricing/Form');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|string',
            'period' => 'required|string',
            'features' => 'required|array',
            'highlight' => 'boolean',
            'is_active' => 'boolean',
        ]);

        PricingPlan::create($data);

        return redirect()->route('admin.pricing')->with('success', 'Pricing plan created successfully.');
    }

    public function edit(PricingPlan $plan)
    {
        return Inertia::render('Admin/Pricing/Form', [
            'plan' => $plan
        ]);
    }

    public function update(Request $request, PricingPlan $plan)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|string',
            'period' => 'required|string',
            'features' => 'required|array',
            'highlight' => 'boolean',
            'is_active' => 'boolean',
        ]);

        $plan->update($data);

        return redirect()->route('admin.pricing')->with('success', 'Pricing plan updated successfully.');
    }

    public function destroy(PricingPlan $plan)
    {
        $plan->delete();
        return back()->with('success', 'Pricing plan deleted successfully.');
    }
}
