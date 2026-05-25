<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SeedContentCommand extends Command
{
    protected $signature = 'seed:content';
    protected $description = 'Seed the database with professional bulk data for Team, Clients, Portfolio, and Case Studies';

    public function handle()
    {
        // 1. Team Members
        $team = [
            ['name' => 'John Doe', 'role' => 'CEO & Founder', 'bio' => 'Visionary leader with 15+ years experience in digital strategy.', 'image' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'],
            ['name' => 'Sarah Smith', 'role' => 'Creative Director', 'bio' => 'Award-winning designer focusing on user-centric experiences.', 'image' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'],
            ['name' => 'Michael Chen', 'role' => 'Lead Developer', 'bio' => 'Full-stack wizard specialized in scalable architecture.', 'image' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'],
            ['name' => 'Aisha Khan', 'role' => 'Marketing Head', 'bio' => 'Expert in growth hacking and brand positioning.', 'image' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha'],
        ];
        foreach ($team as $m) \App\Models\TeamMember::create($m);

        // 2. Clients
        $clients = [
            ['name' => 'TechCorp', 'logo' => 'https://img.logo.dev/techcorp.com?token=pk_sw063W9ZRH6S9Z6S9Z6S9Z'],
            ['name' => 'GlobalLogistics', 'logo' => 'https://img.logo.dev/fedex.com?token=pk_sw063W9ZRH6S9Z6S9Z6S9Z'],
            ['name' => 'CloudScale', 'logo' => 'https://img.logo.dev/digitalocean.com?token=pk_sw063W9ZRH6S9Z6S9Z6S9Z'],
            ['name' => 'EcoEnergy', 'logo' => 'https://img.logo.dev/tesla.com?token=pk_sw063W9ZRH6S9Z6S9Z6S9Z'],
            ['name' => 'FutureFin', 'logo' => 'https://img.logo.dev/stripe.com?token=pk_sw063W9ZRH6S9Z6S9Z6S9Z'],
        ];
        foreach ($clients as $c) \App\Models\Client::create($c);

        // 3. Portfolio
        $portfolio = [
            ['title' => 'E-commerce Platform', 'category' => 'Web Dev', 'description' => 'A full-scale online store with integrated payments.', 'image' => 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80', 'slug' => 'ecom-1'],
            ['title' => 'Healthcare App', 'category' => 'Mobile', 'description' => 'Telemedicine app connecting doctors and patients.', 'image' => 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80', 'slug' => 'health-1'],
            ['title' => 'Financial Dashboard', 'category' => 'UI/UX', 'description' => 'Real-time data visualization for stock market analytics.', 'image' => 'https://images.unsplash.com/photo-1551288049-bbbda536339a?w=800&q=80', 'slug' => 'fin-1'],
            ['title' => 'Real Estate Portal', 'category' => 'Web Dev', 'description' => 'Advanced property search and virtual tour system.', 'image' => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80', 'slug' => 'real-1'],
            ['title' => 'Educational SaaS', 'category' => 'EdTech', 'description' => 'LMS platform for corporate training and certification.', 'image' => 'https://images.unsplash.com/photo-1501504905992-1c051d9d9929?w=800&q=80', 'slug' => 'ed-1'],
            ['title' => 'Fitness Tracker', 'category' => 'Mobile', 'description' => 'Wearable-integrated fitness and nutrition companion.', 'image' => 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80', 'slug' => 'fit-1'],
        ];
        foreach ($portfolio as $p) \App\Models\Portfolio::create($p);

        // 4. Case Studies
        $studies = [
            ['title' => 'Boosting Sales by 150%', 'client_name' => 'RetailBrand', 'results' => '150% Increase in ROI', 'content' => 'We transformed their legacy system into a high-converting shop.', 'slug' => 'boost-1'],
            ['title' => 'Modernizing Infrastructure', 'client_name' => 'DataSys', 'results' => '99.9% Uptime Achieved', 'content' => 'Migrated 50+ servers to a distributed cloud environment.', 'slug' => 'modern-1'],
            ['title' => 'Brand Identity Relaunch', 'client_name' => 'GlobalCo', 'results' => '40% Higher Awareness', 'content' => 'Comprehensive rebranding across 12 countries.', 'slug' => 'brand-1'],
        ];
        foreach ($studies as $s) \App\Models\CaseStudy::create($s);

        $this->info('Content seeded successfully!');
    }
}
