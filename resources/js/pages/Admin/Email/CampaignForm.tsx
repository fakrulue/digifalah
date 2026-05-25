import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Loader2, Save, Send } from 'lucide-react';
import { RichEditor } from '@/components/admin/RichEditor';

export default function CampaignForm() {
  const form = useForm({
    title: '',
    subject: '',
    content: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post('/admin/email/campaigns');
  };

  return (
    <AdminLayout title="New Campaign">
      <div className="mx-auto max-w-4xl space-y-8 pb-20">
        <Link href="/admin/email/campaigns" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Campaigns
        </Link>

        <form onSubmit={submit} className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-8 space-y-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">Campaign Details</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Internal Campaign Title *</label>
                <input type="text" required value={form.data.title} onChange={e => form.setData('title', e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. June Newsletter 2024" />
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">This is for your reference only</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email Subject Line *</label>
                <input type="text" required value={form.data.subject} onChange={e => form.setData('subject', e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" placeholder="e.g. Get 20% off our elite SEO services!" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email Content (HTML) *</label>
                <div className="min-h-[400px]">
                  <RichEditor 
                    value={form.data.content} 
                    onChange={val => form.setData('content', val)} 
                    placeholder="Write your professional marketing message here..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" disabled={form.processing}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-bold text-white shadow-lg shadow-primary/30 hover:opacity-90 disabled:opacity-60 transition-all">
              {form.processing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              Save as Draft
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
