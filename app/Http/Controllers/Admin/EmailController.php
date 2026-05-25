<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\Subscriber;
use App\Models\SiteSetting;
use App\Mail\PromotionalEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Config;
use Inertia\Inertia;

class EmailController extends Controller
{
    public function settings()
    {
        return Inertia::render('Admin/Email/Settings', [
            'settings' => [
                'mail_mailer' => SiteSetting::get('mail_mailer', 'smtp'),
                'mail_host' => SiteSetting::get('mail_host', ''),
                'mail_port' => SiteSetting::get('mail_port', '587'),
                'mail_username' => SiteSetting::get('mail_username', ''),
                'mail_password' => SiteSetting::get('mail_password', ''),
                'mail_encryption' => SiteSetting::get('mail_encryption', 'tls'),
                'mail_from_address' => SiteSetting::get('mail_from_address', ''),
                'mail_from_name' => SiteSetting::get('mail_from_name', ''),
            ]
        ]);
    }

    public function updateSettings(Request $request)
    {
        $data = $request->validate([
            'mail_mailer' => 'required|string',
            'mail_host' => 'required|string',
            'mail_port' => 'required|string',
            'mail_username' => 'required|string',
            'mail_password' => 'required|string',
            'mail_encryption' => 'required|string',
            'mail_from_address' => 'required|email',
            'mail_from_name' => 'required|string',
        ]);

        foreach ($data as $key => $value) {
            SiteSetting::set($key, $value);
        }

        return back()->with('success', 'Email configuration updated successfully.');
    }

    public function campaigns()
    {
        return Inertia::render('Admin/Email/Campaigns', [
            'campaigns' => Campaign::orderByDesc('created_at')->get()
        ]);
    }

    public function createCampaign()
    {
        return Inertia::render('Admin/Email/CampaignForm');
    }

    public function storeCampaign(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        Campaign::create($data);

        return redirect()->route('admin.email.campaigns')->with('success', 'Campaign created.');
    }

    public function sendCampaign(Campaign $campaign)
    {
        // Apply mail settings at runtime
        $this->applyMailConfig();

        $subscribers = Subscriber::all();
        $count = 0;

        foreach ($subscribers as $subscriber) {
            try {
                Mail::to($subscriber->email)->send(new PromotionalEmail($campaign));
                $count++;
            } catch (\Exception $e) {
                // Log error or continue
            }
        }

        $campaign->update([
            'status' => 'sent',
            'sent_at' => now(),
            'total_sent' => $count
        ]);

        return back()->with('success', "Campaign sent to $count subscribers.");
    }

    private function applyMailConfig()
    {
        Config::set('mail.mailers.smtp.host', SiteSetting::get('mail_host'));
        Config::set('mail.mailers.smtp.port', SiteSetting::get('mail_port'));
        Config::set('mail.mailers.smtp.encryption', SiteSetting::get('mail_encryption'));
        Config::set('mail.mailers.smtp.username', SiteSetting::get('mail_username'));
        Config::set('mail.mailers.smtp.password', SiteSetting::get('mail_password'));
        Config::set('mail.from.address', SiteSetting::get('mail_from_address'));
        Config::set('mail.from.name', SiteSetting::get('mail_from_name'));
    }

    public function destroyCampaign(Campaign $campaign)
    {
        $campaign->delete();
        return back()->with('success', 'Campaign deleted.');
    }
}
