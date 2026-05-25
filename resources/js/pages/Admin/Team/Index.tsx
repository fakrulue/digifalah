import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm, router } from '@inertiajs/react';
import { Plus, Trash2, Edit2, Move, User, Briefcase, Link as LinkIcon, Save, X } from 'lucide-react';
import React, { useState } from 'react';
import { MediaPicker } from '@/components/admin/MediaPicker';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string | null;
  bio: string | null;
  social_links: any;
  position: number;
}

export default function TeamIndex({ members }: { members: TeamMember[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data, setData, post, put, processing, reset } = useForm({
    name: '',
    role: '',
    image: '',
    bio: '',
    social_links: { facebook: '', linkedin: '', twitter: '' },
    position: 0
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      put(`/admin/team/${editingId}`, { onSuccess: () => { setEditingId(null); reset(); } });
    } else {
      post('/admin/team', { onSuccess: () => { setIsAdding(false); reset(); } });
    }
  };

  const startEdit = (m: TeamMember) => {
    setEditingId(m.id);
    setData({
      name: m.name,
      role: m.role,
      image: m.image || '',
      bio: m.bio || '',
      social_links: m.social_links || { facebook: '', linkedin: '', twitter: '' },
      position: m.position
    });
  };

  return (
    <AdminLayout title="Team Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground text-sm">Manage your team members and their public profiles.</p>
          <button onClick={() => { setIsAdding(true); setEditingId(null); reset(); }} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" /> Add Member
          </button>
        </div>

        {(isAdding || editingId) && (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft animate-in fade-in slide-in-from-top-4">
            <h3 className="font-display font-bold mb-4">{editingId ? 'Edit Member' : 'Add New Member'}</h3>
            <form onSubmit={submit} className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Name</label>
                  <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} required className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Role / Designation</label>
                  <input type="text" value={data.role} onChange={e => setData('role', e.target.value)} required className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <MediaPicker value={data.image} onChange={url => setData('image', url)} label="Profile Image" />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Short Bio</label>
                  <textarea value={data.bio} onChange={e => setData('bio', e.target.value)} rows={3} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Display Order</label>
                    <input type="number" value={data.position} onChange={e => setData('position', parseInt(e.target.value))} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end gap-3 border-t border-border pt-4">
                <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="px-4 py-2 text-sm font-medium hover:bg-black/5 rounded-lg">Cancel</button>
                <button type="submit" disabled={processing} className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-bold shadow-soft flex items-center gap-2">
                  <Save className="h-4 w-4" /> {editingId ? 'Update Member' : 'Save Member'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {members.length === 0 ? (
            <div className="md:col-span-3 py-12 text-center text-muted-foreground bg-muted/20 rounded-2xl border border-dashed border-border">
              <User className="h-10 w-10 mx-auto mb-2 opacity-20" />
              <p>No team members added yet.</p>
            </div>
          ) : members.map(m => (
            <div key={m.id} className="group relative rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elegant transition-all">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-xl bg-muted border border-border">
                  {m.image ? <img src={m.image} alt={m.name} className="h-full w-full object-cover" /> : <User className="h-full w-full p-4 text-muted-foreground" />}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{m.name}</h4>
                  <p className="text-xs text-primary font-medium">{m.role}</p>
                </div>
              </div>
              {m.bio && <p className="mt-3 text-xs text-muted-foreground line-clamp-2">{m.bio}</p>}
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Order: {m.position}</span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => startEdit(m)} className="p-1.5 text-primary hover:bg-primary/10 rounded-md"><Edit2 className="h-3.5 w-3.5" /></button>
                  <button onClick={() => confirm('Delete this member?') && router.delete(`/admin/team/${m.id}`)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
