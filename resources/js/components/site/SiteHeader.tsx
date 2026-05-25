import { Link, usePage } from '@inertiajs/react';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

const NAV = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { settings } = usePage().props as { settings?: Record<string, any> };
  const siteLogo = settings?.site_logo;
  const siteName = settings?.site_name || 'DigiFalah';

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          {siteLogo ? (
            <img src={siteLogo} alt="Logo" className="h-8 w-8 rounded-lg object-cover" />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-gold">
              <Sparkles className="h-4 w-4 text-emerald-deep" />
            </div>
          )}
          <span className="font-display text-xl font-bold">
            {siteName}<span className="text-gradient-gold">.</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {n.label}
            </Link>
          ))}
          <Link href="/contact" className="rounded-lg bg-gradient-emerald px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-90">
            Get Free Audit
          </Link>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} className="block py-2 text-sm font-medium" onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
          <Link href="/contact" className="mt-2 block rounded-lg bg-gradient-emerald px-4 py-2 text-center text-sm font-semibold text-primary-foreground">
            Get Free Audit
          </Link>
        </div>
      )}
    </header>
  );
}
