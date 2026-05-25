import { AdminLayout } from '@/components/admin/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { Save, Globe, MessageCircle, Share2, ShieldCheck, Download, FileText, Users, MessageSquare, Sparkles, Database, Trash2 } from 'lucide-react';
import { MediaPicker } from '@/components/admin/MediaPicker';
import React from 'react';

export default function WebsiteSettings({ settings }: { settings: Record<string, any> }) {
  const form = useForm({
    site_name: settings.site_name ?? 'DigiFalah',
    site_email: settings.site_email ?? '',
    site_phone: settings.site_phone ?? '',
    whatsapp_number: settings.whatsapp_number ?? '',
    business_address: settings.business_address ?? '',
    facebook_url: settings.facebook_url ?? '',
    instagram_url: settings.instagram_url ?? '',
    linkedin_url: settings.linkedin_url ?? '',
    site_logo: settings.site_logo ?? '',
    custom_css: settings.custom_css ?? '',
    custom_js: settings.custom_js ?? '',
    footer_copyright_text: settings.footer_copyright_text ?? '',
    footer_about_text: settings.footer_about_text ?? '',
    footer_tagline_bangla: settings.footer_tagline_bangla ?? '',
    currency: settings.currency ?? '৳',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post('/admin/settings/website');
  };

  return (
    <AdminLayout title="Website Settings">
      <form onSubmit={submit} className="mx-auto max-w-4xl space-y-8 pb-20">
        <div className="grid gap-8 md:grid-cols-2">
          
          {/* General Settings */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Globe className="h-5 w-5" />
              <h2 className="font-display text-lg font-bold">Brand & Identity</h2>
            </div>
            
            <MediaPicker value={form.data.site_logo} onChange={url => form.setData('site_logo', url)} label="Site Logo" />
            
            <div>
              <label className="mb-1.5 block text-sm font-medium">Site Name</label>
              <input type="text" value={form.data.site_name} onChange={e => form.setData('site_name', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Footer Copyright Text</label>
              <input type="text" placeholder={`© ${new Date().getFullYear()} My Company. All rights reserved.`} value={form.data.footer_copyright_text} onChange={e => form.setData('footer_copyright_text', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Footer About Text</label>
              <textarea rows={3} value={form.data.footer_about_text} onChange={e => form.setData('footer_about_text', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Footer Tagline (Bangla)</label>
              <input type="text" value={form.data.footer_tagline_bangla} onChange={e => form.setData('footer_tagline_bangla', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>

          {/* Contact Information */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
            <div className="flex items-center gap-2 text-emerald-600">
              <MessageCircle className="h-5 w-5" />
              <h2 className="font-display text-lg font-bold">Communication</h2>
            </div>
            
            <div>
              <label className="mb-1.5 block text-sm font-medium">WhatsApp Number</label>
              <input type="text" placeholder="+88017XXXXXXXX" value={form.data.whatsapp_number} onChange={e => form.setData('whatsapp_number', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
              <p className="mt-1 text-[10px] text-muted-foreground italic">Include country code without + (e.g. 88017...)</p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Support Email</label>
              <input type="email" value={form.data.site_email} onChange={e => form.setData('site_email', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Mobile Number</label>
              <input type="text" placeholder="+880 1XXX-XXXXXX" value={form.data.site_phone} onChange={e => form.setData('site_phone', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Business Address</label>
              <textarea rows={2} value={form.data.business_address} onChange={e => form.setData('business_address', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
            </div>
          </div>

          {/* Social Media */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
            <div className="flex items-center gap-2 text-blue-600">
              <Share2 className="h-5 w-5" />
              <h2 className="font-display text-lg font-bold">Social Presence</h2>
            </div>
            
            <div>
              <label className="mb-1.5 block text-sm font-medium">Facebook URL</label>
              <input type="url" value={form.data.facebook_url} onChange={e => form.setData('facebook_url', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Instagram URL</label>
              <input type="url" value={form.data.instagram_url} onChange={e => form.setData('instagram_url', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">LinkedIn URL</label>
              <input type="url" value={form.data.linkedin_url} onChange={e => form.setData('linkedin_url', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>

          {/* Currency Setting */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
            <div className="flex items-center gap-2 text-yellow-600">
              <span className="text-xl font-bold">₿</span>
              <h2 className="font-display text-lg font-bold">Currency</h2>
            </div>
            <p className="text-sm text-muted-foreground">Select the default currency used across invoices and billing.</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩' },
                { label: 'US Dollar', symbol: '$', flag: '🇺🇸' },
              ].map(opt => (
                <button
                  key={opt.symbol}
                  type="button"
                  onClick={() => form.setData('currency', opt.symbol)}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${
                    form.data.currency === opt.symbol
                      ? 'border-primary bg-primary/5 text-primary shadow-sm'
                      : 'border-border bg-background hover:border-primary/30 hover:bg-muted/30'
                  }`}
                >
                  <span className="text-2xl">{opt.flag}</span>
                  <div>
                    <div className="font-bold text-sm">{opt.symbol} — {opt.label}</div>
                    <div className="text-[11px] text-muted-foreground">{opt.label}</div>
                  </div>
                  {form.data.currency === opt.symbol && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* SEO & Sitemap */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4 md:col-span-2">
            <div className="flex items-center gap-2 text-primary">
              <Globe className="h-5 w-5" />
              <h2 className="font-display text-lg font-bold">SEO & Sitemap</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Generate a physical sitemap.xml file for search engines. The system also generates a dynamic sitemap at /sitemap.xml by default.</p>
            <div className="flex flex-wrap gap-4">
              <button 
                type="button"
                onClick={() => {
                  form.post('/admin/settings/sitemap/generate');
                }}
                disabled={form.processing}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/20 disabled:opacity-50"
              >
                <Globe className="h-4 w-4" /> Generate Sitemap.xml
              </button>
              <button 
                type="button"
                onClick={() => {
                  if (confirm('Delete the physical sitemap.xml file?')) {
                    form.post('/admin/settings/sitemap/delete');
                  }
                }}
                disabled={form.processing}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-500/10 px-6 py-3 text-sm font-semibold text-red-600 transition-all hover:bg-red-500/20 disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" /> Delete Physical Sitemap
              </button>
              <a href="/sitemap.xml" target="_blank" className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-sm font-semibold transition-all hover:bg-muted/30">
                 View Current Sitemap
              </a>
            </div>
          </div>

          {/* Advanced & Scripts */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck className="h-5 w-5" />
              <h2 className="font-display text-lg font-bold">Advanced & Scripts</h2>
            </div>
            
            <div>
              <label className="mb-1.5 block text-sm font-medium">Custom CSS</label>
              <textarea rows={4} value={form.data.custom_css} onChange={e => form.setData('custom_css', e.target.value)} placeholder=".my-class { color: red; }"
                className="w-full font-mono rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Custom JS</label>
              <textarea rows={4} value={form.data.custom_js} onChange={e => form.setData('custom_js', e.target.value)} placeholder="console.log('Hello');"
                className="w-full font-mono rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>

          {/* System Performance & Optimization */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4 md:col-span-2">
            <div className="flex items-center gap-2 text-amber-600">
              <Sparkles className="h-5 w-5" />
              <h2 className="font-display text-lg font-bold">System Optimization</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Improve website speed by clearing cached configurations, routes, and views. Recommended after major updates.</p>
            <div className="flex flex-wrap gap-4">
              <button 
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to optimize the website? This will clear and rebuild all caches.')) {
                    form.post('/admin/settings/optimize');
                  }
                }}
                disabled={form.processing}
                className="flex items-center justify-center gap-2 rounded-xl bg-amber-500/10 px-6 py-3 text-sm font-semibold text-amber-600 transition-all hover:bg-amber-500/20 disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" /> Optimize Website Now
              </button>
              <button 
                type="button"
                onClick={() => {
                   if (confirm('Clear application cache?')) {
                      form.post('/admin/settings/optimize');
                   }
                }}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear Cache Only
              </button>
            </div>
          </div>
          {/* Data Export & Backup */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4 md:col-span-2">
            <div className="flex items-center gap-2 text-primary">
              <Download className="h-5 w-5" />
              <h2 className="font-display text-lg font-bold">Data & Backups</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Export specific data to CSV or create a full system backup (Database + Files).</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a href="/admin/export/blogs" className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background p-4 text-sm font-semibold transition-all hover:border-primary/30 hover:bg-primary/5">
                <FileText className="h-4 w-4 text-primary" /> Export Blogs
              </a>
              <a href="/admin/export/leads" className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background p-4 text-sm font-semibold transition-all hover:border-primary/30 hover:bg-primary/5">
                <MessageSquare className="h-4 w-4 text-primary" /> Export Leads
              </a>
              <a href="/admin/export/subscribers" className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background p-4 text-sm font-semibold transition-all hover:border-primary/30 hover:bg-primary/5">
                <Users className="h-4 w-4 text-primary" /> Export Subscribers
              </a>
              <Link href="/admin/settings/backup" className="flex items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-700 transition-all hover:bg-amber-100 md:col-span-3">
                <Database className="h-4 w-4" /> Go to Full System Backup (Database & Files)
              </Link>
            </div>
          </div>

        </div>

        <button type="submit" disabled={form.processing}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-emerald py-4 font-bold text-primary-foreground shadow-soft hover:opacity-90 transition-all disabled:opacity-50">
          <Save className="h-5 w-5" />
          Update Website Settings
        </button>
      </form>
    </AdminLayout>
  );
}
