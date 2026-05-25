import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm, router } from '@inertiajs/react';
import { Plus, Trash2, Edit2, BookOpen, User, Trophy, Save, X, FileText } from 'lucide-react';
import React, { useState } from 'react';
import { MediaPicker } from '@/components/admin/MediaPicker';

interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  client_name: string | null;
  results: string | null;
  position: number;
}

export default function CaseStudyIndex({ studies }: { studies: CaseStudy[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data, setData, post, put, processing, reset } = useForm({
    title: '',
    image: '',
    content: '',
    client_name: '',
    results: '',
    position: 0
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      put(`/admin/case-studies/${editingId}`, { onSuccess: () => { setEditingId(null); reset(); } });
    } else {
      post('/admin/case-studies', { onSuccess: () => { setIsAdding(false); reset(); } });
    }
  };

  const startEdit = (study: any) => {
    setEditingId(study.id);
    setData({
      title: study.title,
      image: study.image || '',
      content: study.content || '',
      client_name: study.client_name || '',
      results: study.results || '',
      position: study.position
    });
  };

  return (
    <AdminLayout title="Work Studies / Case Studies">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground text-sm">Document your success stories and detailed project impact.</p>
          <button onClick={() => { setIsAdding(true); setEditingId(null); reset(); }} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" /> New Case Study
          </button>
        </div>

        {(isAdding || editingId) && (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft animate-in fade-in slide-in-from-top-4">
            <h3 className="font-display font-bold mb-4">{editingId ? 'Edit Case Study' : 'Create Case Study'}</h3>
            <form onSubmit={submit} className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Study Title</label>
                  <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} required className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Client Name</label>
                  <input type="text" value={data.client_name} onChange={e => setData('client_name', e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <MediaPicker value={data.image} onChange={url => setData('image', url)} label="Cover Image" />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Key Results (Short Summary)</label>
                  <input type="text" value={data.results} onChange={e => setData('results', e.target.value)} placeholder="e.g. 50% Revenue Increase" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Detailed Content (HTML allowed)</label>
                  <textarea value={data.content} onChange={e => setData('content', e.target.value)} rows={5} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end gap-3 border-t border-border pt-4">
                <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="px-4 py-2 text-sm font-medium hover:bg-black/5 rounded-lg">Cancel</button>
                <button type="submit" disabled={processing} className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-bold shadow-soft flex items-center gap-2">
                  <Save className="h-4 w-4" /> Save Study
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {studies.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground bg-muted/20 rounded-2xl border border-dashed border-border">
              <BookOpen className="h-10 w-10 mx-auto mb-2 opacity-20" />
              <p>No case studies written yet.</p>
            </div>
          ) : studies.map(s => (
            <div key={s.id} className="group flex items-center gap-6 rounded-2xl border border-border bg-card p-4 shadow-soft hover:shadow-elegant transition-all">
              <div className="h-20 w-28 overflow-hidden rounded-xl bg-muted border border-border hidden sm:block">
                 {s.image ? <img src={s.image} alt={s.title} className="h-full w-full object-cover" /> : <FileText className="h-full w-full p-4 text-muted-foreground/30" />}
              </div>
              <div className="flex-1 min-w-0">
                 <div className="flex items-center gap-2 mb-1">
                    <User className="h-3 w-3 text-primary" />
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">{s.client_name || 'Client Unnamed'}</span>
                 </div>
                 <h4 className="font-bold text-foreground truncate">{s.title}</h4>
                 {s.results && (
                    <div className="mt-1 flex items-center gap-2 text-emerald-600">
                       <Trophy className="h-3 w-3" />
                       <span className="text-xs font-medium">{s.results}</span>
                    </div>
                 )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(s)} className="p-2 text-primary hover:bg-primary/10 rounded-lg"><Edit2 className="h-4 w-4" /></button>
                <button onClick={() => confirm('Delete this study?') && router.delete(`/admin/case-studies/${s.id}`)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
