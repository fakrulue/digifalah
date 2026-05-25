import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { WhatsAppButton } from './WhatsAppButton';
import { ReactNode } from 'react';
import { Head, usePage } from '@inertiajs/react';

export function SiteLayout({ children }: { children: ReactNode }) {
  const { url } = usePage();
  const { settings, seo } = usePage().props as { settings: any, seo?: any };
  
  // Extract a readable page name from the URL slug if SEO title is missing
  const path = (url || '/').split('?')[0].split('/').filter(Boolean).pop() || 'Home';
  const pageLabel = path.charAt(0).toUpperCase() + path.slice(1);
  
  const siteName = settings?.site_name || 'DigiFalah';
  const displayTitle = seo?.title || (path === 'Home' ? siteName : `${pageLabel} | ${siteName}`);
  
  const description = seo?.description || settings?.footer_about_text || '';
  const image = seo?.og_image || settings?.site_logo || '';

  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>{displayTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={displayTitle} />
        <meta property="og:description" content={description} />
        {image && <meta property="og:image" content={image} />}
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
