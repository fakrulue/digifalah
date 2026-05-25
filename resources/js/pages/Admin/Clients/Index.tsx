import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm, router } from '@inertiajs/react';
import { Plus, Trash2, Edit2, Globe, Building2, Save, X } from 'lucide-react';
import React, { useState } from 'react';
import { MediaPicker } from '@/components/admin/MediaPicker';

interface Client {
  id: number;
  name: string;
  logo: string | null;
  website: string | null;
  position: number;
}

export default function ClientIndex({ clients }: { clients: Client[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data, setData, post, put, processing, reset } = useForm({
    name: '',
    logo: '',
    website: '',
    position: 0
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      put(`/admin/clients/${editingId}`, { onSuccess: () => { setEditingId(null); reset(); } });
    } else {
      post('/admin/clients', { onSuccess: () => { setIsAdding(false); reset(); } });
    }
  };

  const startEdit = (c: Client) => {
    setEditingId(c.id);
    setData({
      name: c.name,
      logo: c.logo || '',
      website: c.website || '',
      position: c.position
    });
  };

  return (
    <AdminLayout title="Client Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground text-sm">Manage your trusted clients and their logos.</p>
          <button onClick={() => { setIsAdding(true); setEditingId(null); reset(); }} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" /> Add Client
          </button>
        </div>

        {(isAdding || editingId) && (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft animate-in fade-in slide-in-from-top-4">
            <h3 className="font-display font-bold mb-4">{editingId ? 'Edit Client' : 'Add New Client'}</h3>
            <form onSubmit={submit} className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Client Name</label>
                  <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} required className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Website URL (Optional)</label>
                  <input type="url" value={data.website} onChange={e => setData('website', e.target.value)} placeholder="https://..." className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
              <div className="space-y-4">
                <MediaPicker value={data.logo} onChange={url => setData('logo', url)} label="Client Logo" />
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Display Order</label>
                  <input type="number" value={data.position} onChange={e => setData('position', parseInt(e.target.value))} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end gap-3 border-t border-border pt-4">
                <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="px-4 py-2 text-sm font-medium hover:bg-black/5 rounded-lg">Cancel</button>
                <button type="submit" disabled={processing} className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-bold shadow-soft flex items-center gap-2">
                  <Save className="h-4 w-4" /> {editingId ? 'Update Client' : 'Save Client'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {clients.length === 0 ? (
            <div className="md:col-span-4 py-12 text-center text-muted-foreground bg-muted/20 rounded-2xl border border-dashed border-border">
              <Building2 className="h-10 w-10 mx-auto mb-2 opacity-20" />
              <p>No clients added yet.</p>
            </div>
          ) : clients.map(c => (
            <div key={c.id} className="group relative rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elegant transition-all flex flex-col items-center text-center">
              <div className="h-20 w-full flex items-center justify-center p-2 mb-4 bg-muted/30 rounded-xl">
                {c.logo ? <img src={c.logo} alt={c.name} className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all" /> : <Building2 className="h-10 w-10 text-muted-foreground/30" />}
              </div>
              <h4 className="font-bold text-sm text-foreground truncate w-full">{c.name}</h4>
              {c.website && <a href={c.website} target="_blank" className="text-[10px] text-primary hover:underline mt-1 truncate w-full">{c.website}</a>}
              
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => startEdit(c)} className="p-1.5 bg-white shadow-soft text-primary hover:bg-primary/5 rounded-md"><Edit2 className="h-3 w-3" /></button>
                <button onClick={() => confirm('Remove this client?') && router.delete(`/admin/clients/${c.id}`)} className="p-1.5 bg-white shadow-soft text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="h-3 w-3" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
