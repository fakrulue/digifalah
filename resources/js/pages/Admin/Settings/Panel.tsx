import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Save, Shield, LayoutDashboard } from 'lucide-react';
import { MediaPicker } from '@/components/admin/MediaPicker';

export default function PanelSettings({ settings }: { settings: Record<string, any> }) {
  const form = useForm({
    gemini_api_key: settings.gemini_api_key ?? '',
    panel_name: settings.panel_name ?? 'DigiFalah',
    panel_title: settings.panel_title ?? 'Admin Dashboard',
    site_icon: settings.site_icon ?? '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post('/admin/settings/panel');
  };

  return (
    <AdminLayout title="Panel Settings">
      <form onSubmit={submit} className="mx-auto max-w-4xl space-y-8 pb-20">
        <div className="grid gap-8 md:grid-cols-2">
          
          {/* Panel Identity */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <LayoutDashboard className="h-5 w-5" />
              <h2 className="font-display text-lg font-bold">Panel Identity</h2>
            </div>
            
            <MediaPicker value={form.data.site_icon} onChange={url => form.setData('site_icon', url)} label="Site Icon (Favicon / Admin Icon)" />
            
            <div>
              <label className="mb-1.5 block text-sm font-medium">Panel Name (Sidebar)</label>
              <input type="text" value={form.data.panel_name} onChange={e => form.setData('panel_name', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Panel Default Title</label>
              <input type="text" value={form.data.panel_title} onChange={e => form.setData('panel_title', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
          
          {/* API Keys */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
            <div className="flex items-center gap-2 text-purple-600">
              <Shield className="h-5 w-5" />
              <h2 className="font-display text-lg font-bold">API & Security</h2>
            </div>
            
            <div>
              <label className="mb-1.5 block text-sm font-medium">Gemini AI API Key</label>
              <input type="password" value={form.data.gemini_api_key} onChange={e => form.setData('gemini_api_key', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500/20" />
              <p className="mt-1 text-[10px] text-muted-foreground">Used for AI Blog Writer generation.</p>
            </div>
          </div>

        </div>

        <button type="submit" disabled={form.processing}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-emerald py-4 font-bold text-primary-foreground shadow-soft hover:opacity-90 transition-all disabled:opacity-50">
          {form.processing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
          Update Panel Settings
        </button>
      </form>
    </AdminLayout>
  );
}

function Loader2({ className }: { className?: string }) {
  return <Save className={className} />;
}
