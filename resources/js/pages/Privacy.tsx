import { SiteLayout } from '@/components/site/SiteLayout';
export default function Privacy() {
  return (
    <SiteLayout>
      <section className="container mx-auto max-w-3xl px-4 py-20">
        <h1 className="font-display text-4xl font-bold">Privacy Policy</h1>
        <div className="prose prose-lg mt-8 max-w-none text-muted-foreground">
          <p>DigiFalah collects information you voluntarily provide, such as your name and contact details when you use our contact form.</p>
          <p>We use this information solely to respond to your enquiries and deliver our services. We do not sell or share your personal data with third parties.</p>
          <p>For questions, contact us at hello@digifalah.com.</p>
        </div>
      </section>
    </SiteLayout>
  );
}
