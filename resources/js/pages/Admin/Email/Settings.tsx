import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import { Save, Loader2, Mail, Shield, Server, User } from 'lucide-react';

interface Settings {
  mail_mailer: string;
  mail_host: string;
  mail_port: string;
  mail_username: string;
  mail_password: string;
  mail_encryption: string;
  mail_from_address: string;
  mail_from_name: string;
}

export default function EmailSettings({ settings }: { settings: Settings }) {
  const form = useForm(settings);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post('/admin/email/settings');
  };

  return (
    <AdminLayout title="Email Configuration">
      <div className="mx-auto max-w-4xl space-y-8 pb-20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900">SMTP Settings</h2>
            <p className="text-sm text-gray-500">Configure your global mail server for outgoing promotional emails.</p>
          </div>
          <Link href="/admin/email/campaigns" className="text-sm font-bold text-primary hover:underline">
            Manage Campaigns →
          </Link>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* SMTP Server Info */}
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <Server className="h-5 w-5" />
                <h3 className="font-display text-lg font-bold text-gray-900">Server Configuration</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Mail Driver</label>
                  <select value={form.data.mail_mailer} onChange={e => form.setData('mail_mailer', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                    <option value="smtp">SMTP</option>
                    <option value="mailgun">Mailgun</option>
                    <option value="ses">AWS SES</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">SMTP Host</label>
                  <input type="text" value={form.data.mail_host} onChange={e => form.setData('mail_host', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="smtp.mailtrap.io" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Port</label>
                    <input type="text" value={form.data.mail_port} onChange={e => form.setData('mail_port', e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="587" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Encryption</label>
                    <select value={form.data.mail_encryption} onChange={e => form.setData('mail_encryption', e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                      <option value="tls">TLS</option>
                      <option value="ssl">SSL</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Authentication & From */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <Shield className="h-5 w-5" />
                  <h3 className="font-display text-lg font-bold text-gray-900">Authentication</h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Username</label>
                    <input type="text" value={form.data.mail_username} onChange={e => form.setData('mail_username', e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Password</label>
                    <input type="password" value={form.data.mail_password} onChange={e => form.setData('mail_password', e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <User className="h-5 w-5" />
                  <h3 className="font-display text-lg font-bold text-gray-900">Sender Info</h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">From Address</label>
                    <input type="email" value={form.data.mail_from_address} onChange={e => form.setData('mail_from_address', e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="hello@digifalah.com" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">From Name</label>
                    <input type="text" value={form.data.mail_from_name} onChange={e => form.setData('mail_from_name', e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="DigiFalah Team" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" disabled={form.processing}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-emerald-600 px-6 py-4 font-bold text-white shadow-lg shadow-primary/30 hover:opacity-90 disabled:opacity-60 transition-all">
            {form.processing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            Save Configuration
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
