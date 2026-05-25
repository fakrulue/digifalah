import { SiteLayout } from '@/components/site/SiteLayout';
export default function Terms() {
  return (
    <SiteLayout>
      <section className="container mx-auto max-w-3xl px-4 py-20">
        <h1 className="font-display text-4xl font-bold">Terms of Service</h1>
        <div className="prose prose-lg mt-8 max-w-none text-muted-foreground">
          <p>By using DigiFalah services, you agree to engage with us in good faith and provide accurate information about your business needs.</p>
          <p>Our services are provided on a monthly basis with a 30-day cancellation window. No long-term contracts are required.</p>
          <p>For enquiries, contact us at hello@digifalah.com.</p>
        </div>
      </section>
    </SiteLayout>
  );
}
