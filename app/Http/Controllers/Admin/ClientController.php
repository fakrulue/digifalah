<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller {
    public function index() {
        return Inertia::render('Admin/Clients/Index', ['clients' => Client::orderBy('position')->get()]);
    }
    public function store(Request $request) {
        $data = $request->validate([
            'name' => 'required|string',
            'logo' => 'nullable|string',
            'website' => 'nullable|string',
            'position' => 'integer'
        ]);
        Client::create($data);
        return back()->with('success', 'Client added.');
    }
    public function update(Request $request, Client $client) {
        $data = $request->validate([
            'name' => 'required|string',
            'logo' => 'nullable|string',
            'website' => 'nullable|string',
            'position' => 'integer'
        ]);
        $client->update($data);
        return back()->with('success', 'Client updated.');
    }
    public function destroy(Client $client) {
        $client->delete();
        return back()->with('success', 'Client removed.');
    }
}
