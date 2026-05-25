import { Link, usePage } from '@inertiajs/react';
import { Sparkles, MapPin, Phone, Mail, Share2 } from 'lucide-react';

export function SiteFooter() {
  const { settings } = usePage().props as { settings?: Record<string, any> };
  const siteName = settings?.site_name || 'DigiFalah';
  const siteLogo = settings?.site_logo;
  const email = settings?.site_email || 'hello@digifalah.com';
  const phone = settings?.site_phone || '+880 1700-000000';
  const address = settings?.business_address || 'Gulshan, Dhaka, Bangladesh';
  const aboutText = settings?.footer_about_text || "Bangladesh's digital marketing partner. AI-powered SEO, content, and paid growth — built for local businesses going global.";
  const taglineBangla = settings?.footer_tagline_bangla || 'ডিজিটাল মার্কেটিং এজেন্সি - ঢাকা';

  return (
    <footer className="bg-emerald-deep text-primary-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          
          {/* Brand & About */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              {siteLogo ? (
                <img src={siteLogo} alt="Logo" className="h-8 w-8 rounded-lg object-cover" />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-gold">
                  <Sparkles className="h-4 w-4 text-emerald-deep" />
                </div>
              )}
              <span className="font-display text-2xl font-bold">
                {siteName}<span className="text-gold">.</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/80">
              {aboutText}
            </p>
            <div className="flex gap-3">
              {[
                { 
                  name: 'Facebook', 
                  href: settings?.facebook_url,
                  path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" 
                },
                { 
                  name: 'Linkedin', 
                  href: settings?.linkedin_url,
                  path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2" 
                },
                { 
                  name: 'Instagram', 
                  href: settings?.instagram_url,
                  svg: (
                    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </g>
                  )
                },
              ].map((s, i) => s.href ? (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" 
                   className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-primary-foreground/70 transition-all hover:bg-gold hover:text-emerald-deep"
                   title={s.name}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {s.svg ? s.svg : <path d={s.path} />}
                  </svg>
                </a>
              ) : null)}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-gold">Services</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              {['SEO & Local Search', 'AI Blog Writing', 'Social Media', 'Paid Ads', 'Web Design'].map(s => (
                <li key={s}><Link href="/services" className="hover:text-gold transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-gold">Company</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              {[
                ['About Us', '/about'],
                ['Blog', '/blog'],
                ['Pricing', '/pricing'],
                ['Contact', '/contact'],
                ['Privacy', '/privacy'],
                ['Terms', '/terms']
              ].map(([l, h]) => (
                <li key={h}><Link href={h} className="hover:text-gold transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-gold">Get In Touch</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-gold" />
                <span>{address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 shrink-0 text-gold" />
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-gold">{phone}</a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 shrink-0 text-gold" />
                <a href={`mailto:${email}`} className="hover:text-gold">{email}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-primary-foreground/50">
            {settings?.footer_copyright_text || `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`}
          </p>
          <div className="font-bangla text-sm text-primary-foreground/40">
            {taglineBangla}
          </div>
        </div>
      </div>
    </footer>
  );
}
