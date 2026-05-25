<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriberController extends Controller {
    public function index() {
        return Inertia::render('Admin/Subscribers/Index', [
            'subscribers' => Subscriber::orderByDesc('created_at')->get()
        ]);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'email' => 'required|email|unique:subscribers,email'
        ], [
            'email.unique' => 'You are already subscribed!'
        ]);
        
        Subscriber::create($data);
        
        return back()->with('success', 'Thank you for subscribing!');
    }

    public function destroy(Subscriber $subscriber) {
        $subscriber->delete();
        return back()->with('success', 'Subscriber removed.');
    }
}
