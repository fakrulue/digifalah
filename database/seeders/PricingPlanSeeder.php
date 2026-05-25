<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PricingPlan;

class PricingPlanSeeder extends Seeder
{
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Starter',
                'price' => '৳15,000',
                'period' => '/month',
                'description' => 'For small businesses getting started online.',
                'features' => ['4 AI-written blog posts', 'Basic SEO optimization', '12 social media posts', 'Monthly performance report', 'Email support'],
                'highlight' => false,
            ],
            [
                'name' => 'Growth',
                'price' => '৳40,000',
                'period' => '/month',
                'description' => 'Most popular — for businesses ready to scale.',
                'features' => ['12 AI + human-edited posts', 'Full SEO (technical + on-page)', '30 social posts + Reels', 'Meta Ads management (up to ৳50k spend)', 'Bi-weekly strategy calls', 'Priority WhatsApp support'],
                'highlight' => true,
            ],
            [
                'name' => 'Scale',
                'price' => 'Custom',
                'period' => '',
                'description' => 'For brands with serious growth ambitions.',
                'features' => ['Unlimited content production', 'Full SEO + technical dev', 'Daily social + paid creative', 'Multi-channel paid ads', 'Dedicated account manager', '24/7 priority support'],
                'highlight' => false,
            ],
        ];

        foreach ($plans as $p) {
            PricingPlan::updateOrCreate(
                ['name' => $p['name']],
                $p
            );
        }
    }
}
