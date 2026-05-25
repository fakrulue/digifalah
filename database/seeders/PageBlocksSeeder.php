<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\PageBlock;

class PageBlocksSeeder extends Seeder {
    public function run(): void {
        PageBlock::truncate();

        $blocks = [
            // HOME
            ['page_slug'=>'home','block_type'=>'hero','position'=>0,'content'=>['eyebrow'=>"Bangladesh's AI marketing partner",'title'=>'Grow your business with <span class="text-gradient-gold">Digital Falah.</span>','subtitle'=>'We help Bangladeshi businesses win online with AI-powered SEO, Bangla-first content, and high-ROI paid ads. From Dhaka to the world.','bangla_text'=>'বাংলাদেশের ব্যবসার জন্য তৈরি ডিজিটাল মার্কেটিং','cta_label'=>'Get Free Audit','cta_url'=>'/contact']],
            ['page_slug'=>'home','block_type'=>'stats','position'=>1,'content'=>['items'=>[['value'=>'120+','label'=>'Clients served'],['value'=>'4.2x','label'=>'Avg. ROAS'],['value'=>'৳18Cr+','label'=>'Revenue generated'],['value'=>'97%','label'=>'Client retention']]]],
            ['page_slug'=>'home','block_type'=>'features','position'=>2,'content'=>['eyebrow'=>'What we do','heading'=>'Everything you need to grow online.','subtitle'=>'Six core services. One bilingual team. Built for the Bangladesh market.','items'=>[['title'=>'SEO & Local Search','description'=>'Rank for Dhaka and English keywords. Technical + on-page + Google Business.'],['title'=>'AI Blog Writing','description'=>'Bangla & English content at scale, edited by humans, optimized for search.'],['title'=>'Social Media','description'=>'Facebook, Instagram & TikTok management with locally-relevant creative.'],['title'=>'Paid Ads','description'=>'Meta Ads & Google Ads optimized for Bangladesh CPM and conversion rates.'],['title'=>'Web Design','description'=>'Fast, mobile-first sites that load on 3G and convert visitors into customers.'],['title'=>'Analytics','description'=>'GA4, Meta Pixel, server-side tracking. Know exactly what\'s working.']]]],
            ['page_slug'=>'home','block_type'=>'split_features','position'=>3,'content'=>['eyebrow'=>'Why DigiFalah','heading'=>'Built for Bangladesh. Trusted worldwide.','body'=>"We're not a generic global agency. We understand bKash funnels, Bangla search behavior, Dhaka delivery realities, and what makes a Bangladeshi customer actually click Buy.",'items'=>[['title'=>'bKash & Nagad billing accepted'],['title'=>'Bangla-first AI content engine'],['title'=>'Dhaka-based bilingual team'],['title'=>'Transparent monthly reporting'],['title'=>'No long-term contracts'],['title'=>'Free initial audit, no strings']]]],
            ['page_slug'=>'home','block_type'=>'testimonials','position'=>4,'content'=>['eyebrow'=>'What clients say','heading'=>'Real businesses. Real growth.','items'=>[['name'=>'Tahmina A.','role'=>'Founder, Dhaka Boutique','text'=>'Our online sales doubled in 4 months. The Bangla content actually sounds like us, not a robot.'],['name'=>'Imran H.','role'=>'CEO, EduBangla','text'=>'Finally an agency that understands the Bangladesh market. Real reports, real results.'],['name'=>'Sadia R.','role'=>'Marketing Lead, FoodHub BD','text'=>'Their paid ads team cut our CPA by 60%. Transparent, professional, fast.']]]],
            ['page_slug'=>'home','block_type'=>'cta','position'=>5,'content'=>['title'=>'Ready to grow with DigiFalah?','subtitle'=>"Let's talk. 15 minutes, no pitch deck, just honest advice for your business.",'cta_label'=>'Book Your Free Audit','cta_url'=>'/contact']],

            // SERVICES
            ['page_slug'=>'services','block_type'=>'hero','position'=>0,'content'=>['eyebrow'=>'Our Services','title'=>'Marketing that <span class="text-gradient-gold">moves the needle.</span>','subtitle'=>'Six core services. One bilingual team. Built specifically for the Bangladesh market and global ambition.','cta_label'=>'Talk to a Strategist','cta_url'=>'/contact']],
            ['page_slug'=>'services','block_type'=>'services_grid','position'=>1,'content'=>['items'=>[['title'=>'SEO & Local Search','description'=>'We rank Bangladeshi businesses for the searches that actually drive revenue.','points'=>['Technical audit & Core Web Vitals fix','Bangla + English keyword research','Google Business Profile optimization','Local citations & link building']],['title'=>'AI Blog Writing','description'=>'Publish 4–20 SEO articles per month, written by AI, polished by humans.','points'=>['Bangla, English, or bilingual posts','On-brand tone, edited by experts','Optimized for keyword + intent','Featured images included']],['title'=>'Social Media Management','description'=>'Daily posting, community management, and creative that converts.','points'=>['Facebook, Instagram, TikTok','Bangla-first creative direction','Reels & short-form video','Monthly performance reports']],['title'=>'Paid Advertising','description'=>'Meta Ads & Google Ads built for Bangladesh CPMs and conversion patterns.','points'=>['Full-funnel campaign architecture','Server-side conversion tracking','Creative testing framework','Weekly optimization & reports']],['title'=>'Web Design & Development','description'=>'Fast, mobile-first sites that work on 3G and convert visitors to customers.','points'=>['Mobile-first responsive design','<2s load time on 3G','bKash & SSLCommerz integration','SEO-ready out of the box']],['title'=>'Analytics & Tracking','description'=>"Know exactly what's working. Real attribution, real ROI, real reports.",'points'=>['GA4 + Meta Pixel setup','Server-side / Conversions API','Custom dashboards (Looker Studio)','Monthly insight reports']]],'cta_title'=>'Not sure which service fits?','cta_subtitle'=>"Tell us your goal. We'll recommend the right mix.",'cta_label'=>'Talk to a Strategist','cta_url'=>'/contact']],

            // ABOUT
            ['page_slug'=>'about','block_type'=>'hero','position'=>0,'content'=>['eyebrow'=>'About Us','title'=>"We're builders, not <span class=\"text-gradient-gold\">consultants.</span>",'subtitle'=>'DigiFalah was founded in Dhaka in 2024 by a small team that was tired of agencies that over-promise and under-deliver.','cta_label'=>'Work with us','cta_url'=>'/contact']],
            ['page_slug'=>'about','block_type'=>'text','position'=>1,'content'=>['title'=>'Our story','body'=>'"Falah" means success in many languages spoken across South Asia. Our mission is simple: digital success for Bangladeshi businesses of every size.']],
            ['page_slug'=>'about','block_type'=>'values','position'=>2,'content'=>['items'=>[['title'=>'Bangla-first','description'=>'We write, design and report in the language your customers actually use.'],['title'=>'Globally aware','description'=>'We borrow the best playbooks from Silicon Valley and adapt them for Dhaka.'],['title'=>'Transparent','description'=>'Real reports, no jargon, no inflated metrics. You see exactly what we do.'],['title'=>'AI-augmented','description'=>'We use AI to scale output 10x — but every word ships through human editors.']]]],

            // PRICING
            ['page_slug'=>'pricing','block_type'=>'hero','position'=>0,'content'=>['eyebrow'=>'Pricing','title'=>'Simple, transparent pricing.','subtitle'=>'Pay monthly. No long-term contracts. bKash, Nagad and bank transfer accepted.']],
            ['page_slug'=>'pricing','block_type'=>'pricing_grid','position'=>1,'content'=>['items'=>[['name'=>'Starter','price'=>'৳15,000','period'=>'/month','description'=>'For small businesses getting started online.','features'=>['4 AI-written blog posts','Basic SEO optimization','12 social media posts','Monthly performance report','Email support'],'highlight'=>false],['name'=>'Growth','price'=>'৳40,000','period'=>'/month','description'=>'Most popular — for businesses ready to scale.','features'=>['12 AI + human-edited posts','Full SEO (technical + on-page)','30 social posts + Reels','Meta Ads management (up to ৳50k spend)','Bi-weekly strategy calls','Priority WhatsApp support'],'highlight'=>true],['name'=>'Scale','price'=>'Custom','period'=>'','description'=>'For brands with serious growth ambitions.','features'=>['Unlimited content production','Full SEO + technical dev','Daily social + paid creative','Multi-channel paid ads','Dedicated account manager','24/7 priority support'],'highlight'=>false]]]],

            // CONTACT
            ['page_slug'=>'contact','block_type'=>'hero','position'=>0,'content'=>['eyebrow'=>"Get in touch",'title'=>"Let's grow your business.",'subtitle'=>"Tell us about your goals. We'll get back within 24 hours with honest, actionable advice."]],
            ['page_slug'=>'contact','block_type'=>'lead_form','position'=>1,'content'=>['heading'=>'Book Your Free 15-Minute Audit','subheading'=>"Tell us a bit about your business and we'll show you where the growth opportunities are.",'source'=>'contact_page']],

            // BLOG
            ['page_slug'=>'blog','block_type'=>'hero','position'=>0,'content'=>['eyebrow'=>'Insights','title'=>'The <span class="text-gradient-gold">DigiFalah</span> Blog','subtitle'=>'Practical digital marketing playbooks for Bangladeshi businesses.']],
            ['page_slug'=>'blog','block_type'=>'blog_posts','position'=>1,'content'=>['heading'=>'Real knowledge for real growth.']],
        ];

        foreach ($blocks as $b) {
            PageBlock::create([
                'page_slug' => $b['page_slug'],
                'block_type' => $b['block_type'],
                'position' => $b['position'],
                'content' => $b['content'],
                'is_visible' => true,
            ]);
        }
    }
}
