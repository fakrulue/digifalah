import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import React, { useState } from 'react';
import { MediaPicker } from '@/components/admin/MediaPicker';

export default function Seo({ metas, custom_pages = [], static_pages = [] }: { metas: any[], custom_pages?: string[], static_pages?: string[] }) {
  const CORE_PAGES = ['home','services','about','pricing','contact','blog'];
  const ALL_PAGES = [...CORE_PAGES, ...custom_pages, ...static_pages];
  
  const [page, setPage] = useState('home');
  const existing = metas.find(m => m.page_slug === page) ?? {};
  
  const form = useForm({ 
    page_slug: page, 
    title: existing.title ?? '', 
    description: existing.description ?? '', 
    og_image: existing.og_image ?? '', 
    no_index: existing.no_index ?? false 
  });

  // CRITICAL: Update form data when tab changes
  React.useEffect(() => {
    const data = metas.find(m => m.page_slug === page) ?? {};
    form.setData({
      page_slug: page,
      title: data.title ?? '',
      description: data.description ?? '',
      og_image: data.og_image ?? '',
      no_index: data.no_index ?? false
    });
  }, [page, metas]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    form.setData('page_slug', page);
    form.post('/admin/seo');
  };

  return (
    <AdminLayout title="SEO">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex gap-2 flex-wrap">
          {ALL_PAGES.map(p => (
            <button key={p} onClick={() => setPage(p)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${page === p ? 'bg-primary text-primary-foreground' : 'border border-border bg-card hover:bg-muted'}`}>
              {p}
            </button>
          ))}
        </div>
        
        <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 space-y-6 shadow-soft">
          <h2 className="font-display text-lg font-bold capitalize">{page} — Search Engine Optimization</h2>
          
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Meta Title</label>
              <input type="text" value={form.data.title} onChange={e => form.setData('title', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Meta Description</label>
              <textarea rows={3} value={form.data.description} onChange={e => form.setData('description', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>

            <MediaPicker value={form.data.og_image} onChange={url => form.setData('og_image', url)} label="Open Graph (OG) Image" />
          </div>

          <button type="submit" disabled={form.processing} className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-soft hover:opacity-90 transition-all">
            <Save className="h-4 w-4" /> Save SEO Settings
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
