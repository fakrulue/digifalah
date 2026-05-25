<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'title' => 'SEO & Local Search',
                'short_line' => 'We rank Bangladeshi businesses for the searches that actually drive revenue.',
                'icon' => 'Search',
                'points' => ['Technical audit & Core Web Vitals fix', 'Bangla + English keyword research', 'Google Business Profile optimization', 'Local citations & link building']
            ],
            [
                'title' => 'AI Blog Writing',
                'short_line' => 'Publish 4–20 SEO articles per month, written by AI, polished by humans.',
                'icon' => 'PenSquare',
                'points' => ['Bangla, English, or bilingual posts', 'On-brand tone, edited by experts', 'Optimized for keyword + intent', 'Featured images included']
            ],
            [
                'title' => 'Social Media Management',
                'short_line' => 'Daily posting, community management, and creative that converts.',
                'icon' => 'Users',
                'points' => ['Facebook, Instagram, TikTok', 'Bangla-first creative direction', 'Reels & short-form video', 'Monthly performance reports']
            ],
            [
                'title' => 'Paid Advertising',
                'short_line' => 'Meta Ads & Google Ads built for Bangladesh CPMs and conversion patterns.',
                'icon' => 'TrendingUp',
                'points' => ['Full-funnel campaign architecture', 'Server-side conversion tracking', 'Creative testing framework', 'Weekly optimization & reports']
            ],
            [
                'title' => 'Web Design & Development',
                'short_line' => 'Fast, mobile-first sites that work on 3G and convert visitors to customers.',
                'icon' => 'Layout',
                'points' => ['Mobile-first responsive design', '<2s load time on 3G', 'bKash & SSLCommerz integration', 'SEO-ready out of the box']
            ],
            [
                'title' => 'Analytics & Tracking',
                'short_line' => 'Know exactly what\'s working. Real attribution, real ROI, real reports.',
                'icon' => 'BarChart',
                'points' => ['GA4 + Meta Pixel setup', 'Server-side / Conversions API', 'Custom dashboards (Looker Studio)', 'Monthly insight reports']
            ],
        ];

        foreach ($services as $s) {
            Service::updateOrCreate(
                ['slug' => Str::slug($s['title'])],
                [
                    'title' => $s['title'],
                    'short_line' => $s['short_line'],
                    'points' => $s['points'],
                    'details' => '', // Cleaned out to ensure design match
                    'icon' => $s['icon'],
                    'is_active' => true,
                ]
            );
        }
    }
}
