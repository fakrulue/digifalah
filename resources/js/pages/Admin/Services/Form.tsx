import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Loader2, Save, Layout, CheckCircle2 } from 'lucide-react';
import { RichEditor } from '@/components/admin/RichEditor';
import { IconPicker } from '@/components/admin/IconPicker';

interface Service {
  id: number;
  title: string;
  short_line: string;
  details: string;
  points: string[];
  icon?: string;
  is_active: boolean;
}

export default function ServiceForm({ service }: { service?: Service }) {
  const form = useForm({
    title: service?.title || '',
    short_line: service?.short_line || '',
    points: service?.points || ['', '', '', ''],
    details: service?.details || '',
    icon: service?.icon || 'Layout',
    is_active: Boolean(service?.is_active ?? true),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (service) {
      form.post(`/admin/services/${service.id}`);
    } else {
      form.post('/admin/services');
    }
  };

  return (
    <AdminLayout title={service ? 'Edit Service' : 'New Service'}>
      <div className="mx-auto max-w-4xl space-y-8 pb-20">
        <Link href="/admin/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Services
        </Link>

        <form onSubmit={submit} className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-soft">
            <h3 className="font-display text-lg font-bold">Service Essentials</h3>
            
            <div className="space-y-2">
                <label className="text-sm font-semibold">Service Title *</label>
                <input type="text" required value={form.data.title} onChange={e => form.setData('title', e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Local SEO Dominance" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold">Select Service Icon</label>
                <IconPicker value={form.data.icon} onChange={icon => form.setData('icon', icon)} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Short Line (Tagline) *</label>
              <input type="text" required value={form.data.short_line} onChange={e => form.setData('short_line', e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="A one-sentence impact statement..." />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold">Service Features / Points *</label>
                <button type="button" onClick={() => form.setData('points', [...form.data.points, ''])}
                  className="text-xs font-bold text-primary hover:underline">+ Add Point</button>
              </div>
              <div className="space-y-3">
                {form.data.points.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <input type="text" value={point} onChange={e => {
                      const newPoints = [...form.data.points];
                      newPoints[idx] = e.target.value;
                      form.setData('points', newPoints);
                    }} className="flex-1 rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. 24/7 Priority Support" />
                    <button type="button" onClick={() => {
                      const newPoints = form.data.points.filter((_, i) => i !== idx);
                      form.setData('points', newPoints);
                    }} className="text-red-400 hover:text-red-600">×</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Internal Service Details (Optional)</label>
              <RichEditor 
                value={form.data.details} 
                onChange={val => form.setData('details', val)} 
                placeholder="Describe your elite service in detail..."
              />
              {form.errors.details && <p className="text-xs text-red-500">{form.errors.details}</p>}
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" checked={form.data.is_active} onChange={e => form.setData('is_active', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" id="is_active" />
              <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Display this service on the live site</label>
            </div>
          </div>

          <button type="submit" disabled={form.processing}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-emerald-600 px-6 py-4 font-bold text-white shadow-lg shadow-primary/30 hover:opacity-90 disabled:opacity-60 transition-all">
            {form.processing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            {service ? 'Update Service Offering' : 'Launch New Service'}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
