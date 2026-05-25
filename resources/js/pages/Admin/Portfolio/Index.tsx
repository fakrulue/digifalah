import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm, router } from '@inertiajs/react';
import { Plus, Trash2, Edit2, Layout, ExternalLink, Save, X, Folder } from 'lucide-react';
import React, { useState } from 'react';
import { MediaPicker } from '@/components/admin/MediaPicker';

interface PortfolioItem {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  description: string | null;
  category: string | null;
  link: string | null;
  position: number;
}

export default function PortfolioIndex({ items }: { items: PortfolioItem[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data, setData, post, put, processing, reset } = useForm({
    title: '',
    image: '',
    description: '',
    category: '',
    link: '',
    position: 0
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      put(`/admin/portfolio/${editingId}`, { onSuccess: () => { setEditingId(null); reset(); } });
    } else {
      post('/admin/portfolio', { onSuccess: () => { setIsAdding(false); reset(); } });
    }
  };

  const startEdit = (item: PortfolioItem) => {
    setEditingId(item.id);
    setData({
      title: item.title,
      image: item.image || '',
      description: item.description || '',
      category: item.category || '',
      link: item.link || '',
      position: item.position
    });
  };

  return (
    <AdminLayout title="Portfolio Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground text-sm">Showcase your best projects and creative works.</p>
          <button onClick={() => { setIsAdding(true); setEditingId(null); reset(); }} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" /> Add Project
          </button>
        </div>

        {(isAdding || editingId) && (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft animate-in fade-in slide-in-from-top-4">
            <h3 className="font-display font-bold mb-4">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
            <form onSubmit={submit} className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Project Title</label>
                  <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} required className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Category</label>
                  <input type="text" value={data.category} onChange={e => setData('category', e.target.value)} placeholder="e.g. Web Development, UI/UX" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <MediaPicker value={data.image} onChange={url => setData('image', url)} label="Project Thumbnail" />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Project Link (Optional)</label>
                  <input type="url" value={data.link} onChange={e => setData('link', e.target.value)} placeholder="https://..." className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Short Description</label>
                  <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={3} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Display Order</label>
                  <input type="number" value={data.position} onChange={e => setData('position', parseInt(e.target.value))} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end gap-3 border-t border-border pt-4">
                <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="px-4 py-2 text-sm font-medium hover:bg-black/5 rounded-lg">Cancel</button>
                <button type="submit" disabled={processing} className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-bold shadow-soft flex items-center gap-2">
                  <Save className="h-4 w-4" /> {editingId ? 'Update Project' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.length === 0 ? (
            <div className="md:col-span-3 py-12 text-center text-muted-foreground bg-muted/20 rounded-2xl border border-dashed border-border">
              <Folder className="h-10 w-10 mx-auto mb-2 opacity-20" />
              <p>No portfolio projects added yet.</p>
            </div>
          ) : items.map(p => (
            <div key={p.id} className="group relative rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-elegant transition-all">
              <div className="aspect-video bg-muted border-b border-border">
                {p.image ? <img src={p.image} alt={p.title} className="h-full w-full object-cover" /> : <Layout className="h-full w-full p-8 text-muted-foreground/30" />}
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-foreground leading-tight">{p.title}</h4>
                    {p.category && <span className="text-[10px] text-primary font-bold uppercase">{p.category}</span>}
                  </div>
                </div>
                {p.description && <p className="text-xs text-muted-foreground line-clamp-2 mt-2">{p.description}</p>}
                <div className="mt-4 flex items-center justify-between">
                  {p.link ? (
                    <a href={p.link} target="_blank" className="text-[10px] flex items-center gap-1 text-primary hover:underline font-bold">
                       VIEW PROJECT <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  ) : <div />}
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(p)} className="p-1.5 text-primary hover:bg-primary/10 rounded-md"><Edit2 className="h-3.5 w-3.5" /></button>
                    <button onClick={() => confirm('Delete this project?') && router.delete(`/admin/portfolio/${p.id}`)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
