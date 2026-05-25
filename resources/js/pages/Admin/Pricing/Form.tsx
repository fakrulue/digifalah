import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Loader2, Save, CreditCard, CheckCircle2 } from 'lucide-react';

interface Plan {
  id: number;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  highlight: boolean;
  is_active: boolean;
}

export default function PricingForm({ plan }: { plan?: Plan }) {
  const form = useForm({
    name: plan?.name || '',
    description: plan?.description || '',
    price: plan?.price || '',
    period: plan?.period || '/mo',
    features: plan?.features || ['', '', '', ''],
    highlight: plan?.highlight ?? false,
    is_active: Boolean(plan?.is_active ?? true),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (plan) {
      form.post(`/admin/pricing/${plan.id}`);
    } else {
      form.post('/admin/pricing');
    }
  };

  return (
    <AdminLayout title={plan ? 'Edit Pricing Plan' : 'New Pricing Plan'}>
      <div className="mx-auto max-w-4xl space-y-8 pb-20">
        <Link href="/admin/pricing" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Pricing
        </Link>

        <form onSubmit={submit} className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-soft">
            <h3 className="font-display text-lg font-bold">Plan Details</h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Plan Name *</label>
                <input type="text" required value={form.data.name} onChange={e => form.setData('name', e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Professional SEO" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Tagline / Short Line *</label>
                <input type="text" required value={form.data.description} onChange={e => form.setData('description', e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Perfect for growing businesses" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Price (with symbol) *</label>
                <input type="text" required value={form.data.price} onChange={e => form.setData('price', e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. ৳15,000" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Period</label>
                <input type="text" required value={form.data.period} onChange={e => form.setData('period', e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. /mo, /project" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold">Plan Features *</label>
                <button type="button" onClick={() => form.setData('features', [...form.data.features, ''])}
                  className="text-xs font-bold text-primary hover:underline">+ Add Feature</button>
              </div>
              <div className="space-y-3">
                {form.data.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <input type="text" value={feature} onChange={e => {
                      const newFeatures = [...form.data.features];
                      newFeatures[idx] = e.target.value;
                      form.setData('features', newFeatures);
                    }} className="flex-1 rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. 5 Keywords, Weekly Reports" />
                    <button type="button" onClick={() => {
                      const newFeatures = form.data.features.filter((_, i) => i !== idx);
                      form.setData('features', newFeatures);
                    }} className="text-red-400 hover:text-red-600">×</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={form.data.highlight} onChange={e => form.setData('highlight', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" id="highlight" />
                <label htmlFor="highlight" className="text-sm font-medium text-gray-700">Highlight as "Most Popular"</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={form.data.is_active} onChange={e => form.setData('is_active', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" id="is_active" />
                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Display this plan on the live site</label>
              </div>
            </div>
          </div>

          <button type="submit" disabled={form.processing}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-emerald-600 px-6 py-4 font-bold text-white shadow-lg shadow-primary/30 hover:opacity-90 disabled:opacity-60 transition-all">
            {form.processing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            {plan ? 'Update Pricing Plan' : 'Launch New Plan'}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
