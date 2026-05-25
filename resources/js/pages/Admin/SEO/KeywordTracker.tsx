import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm, router } from '@inertiajs/react';
import { Target, TrendingUp, TrendingDown, Minus, Plus, Trash2, Search, ExternalLink, Activity, Pencil } from 'lucide-react';
import React, { useState } from 'react';

interface Keyword {
  id: number;
  keyword: string;
  target_url: string | null;
  current_rank: number | null;
  previous_rank: number | null;
  search_volume: number | null;
  difficulty: number | null;
  created_at: string;
}

export default function KeywordTracker({ keywords }: { keywords: Keyword[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data, setData, post, put, processing, reset, errors } = useForm({
    keyword: '',
    target_url: '',
    current_rank: '',
    search_volume: '',
    difficulty: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean data: convert empty strings to null for numeric fields
    const submissionData = {
      ...data,
      current_rank: data.current_rank === '' ? null : data.current_rank,
      search_volume: data.search_volume === '' ? null : data.search_volume,
      difficulty: data.difficulty === '' ? null : data.difficulty,
    };

    if (editingId) {
      router.put(`/admin/seo/keywords/${editingId}`, submissionData, {
        onSuccess: () => {
          setEditingId(null);
          reset();
        }
      });
    } else {
      router.post('/admin/seo/keywords', submissionData, {
        onSuccess: () => {
          setIsAdding(false);
          reset();
        }
      });
    }
  };

  const startEdit = (k: Keyword) => {
    setEditingId(k.id);
    setData({
      keyword: k.keyword,
      target_url: k.target_url || '',
      current_rank: k.current_rank?.toString() || '',
      search_volume: k.search_volume?.toString() || '',
      difficulty: k.difficulty?.toString() || '',
    });
  };

  const deleteKeyword = (id: number) => {
    if (confirm('Remove this keyword from tracking?')) {
      router.delete(`/admin/seo/keywords/${id}`);
    }
  };

  return (
    <AdminLayout title="SEO Keyword Tracker">
      <div className="space-y-6">
        
        {/* Header Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-3 text-primary mb-1">
              <Target className="h-5 w-5" />
              <span className="text-sm font-medium text-muted-foreground">Tracked Keywords</span>
            </div>
            <div className="text-2xl font-bold">{keywords.length}</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-3 text-emerald-500 mb-1">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium text-muted-foreground">Top 10 Rankings</span>
            </div>
            <div className="text-2xl font-bold">
              {keywords.filter(k => k.current_rank && k.current_rank <= 10).length}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-3 text-blue-500 mb-1">
              <Activity className="h-5 w-5" />
              <span className="text-sm font-medium text-muted-foreground">Avg. Difficulty</span>
            </div>
            <div className="text-2xl font-bold">
              {keywords.length > 0 
                ? Math.round(keywords.reduce((acc, k) => acc + (k.difficulty || 0), 0) / keywords.length) 
                : 0}%
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground text-sm">Monitor your search engine performance for target keywords.</p>
          <button 
            onClick={() => { setIsAdding(true); setEditingId(null); reset(); }}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" /> Add Keyword
          </button>
        </div>

        {/* Add/Edit Form */}
        {(isAdding || editingId) && (
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-soft animate-in fade-in slide-in-from-top-4">
            <h3 className="font-display font-bold mb-4">{editingId ? 'Edit Keyword' : 'Add New Keyword to Track'}</h3>
            <form onSubmit={submit} className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div className="lg:col-span-1">
                <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Keyword</label>
                <input type="text" value={data.keyword} onChange={e => setData('keyword', e.target.value)} required placeholder="e.g. digital marketing dhaka"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="lg:col-span-1">
                <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Target URL</label>
                <input type="url" value={data.target_url} onChange={e => setData('target_url', e.target.value)} placeholder="https://..."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Current Rank</label>
                <input type="number" value={data.current_rank} onChange={e => setData('current_rank', e.target.value)} placeholder="Pos # (1-100)"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Monthly Volume</label>
                <input type="number" value={data.search_volume} onChange={e => setData('search_volume', e.target.value)} placeholder="e.g. 1200"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Difficulty %</label>
                <input type="number" value={data.difficulty} onChange={e => setData('difficulty', e.target.value)} placeholder="0-100"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="md:col-span-2 lg:col-span-5 flex justify-end gap-3 mt-2">
                <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="px-4 py-2 text-sm font-medium hover:bg-black/5 rounded-lg">Cancel</button>
                <button type="submit" disabled={processing} className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-bold shadow-soft hover:opacity-90">
                  {editingId ? 'Update Tracking' : 'Start Tracking'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Keywords Table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <table className="w-full text-left border-collapse">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground">Keyword / URL</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground">Rank</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground">Change</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground text-center">Volume</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground text-center">KD %</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {keywords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    <Search className="h-10 w-10 mx-auto mb-3 opacity-20" />
                    <p>No keywords being tracked yet. Add your first keyword to start monitoring.</p>
                  </td>
                </tr>
              ) : keywords.map(k => {
                const diff = k.previous_rank && k.current_rank ? k.previous_rank - k.current_rank : 0;
                return (
                  <tr key={k.id} className="group hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">{k.keyword}</div>
                      {k.target_url && (
                        <a href={k.target_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] text-primary hover:underline mt-0.5">
                          {new URL(k.target_url).pathname} <ExternalLink className="h-2 w-2" />
                        </a>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {k.current_rank ? (
                        <div className="flex items-center gap-2">
                          <span className={`flex h-8 w-8 items-center justify-center rounded-lg font-bold ${k.current_rank <= 3 ? 'bg-gold/20 text-gold-dark' : k.current_rank <= 10 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                            {k.current_rank}
                          </span>
                        </div>
                      ) : <span className="text-muted-foreground italic text-xs">Unranked</span>}
                    </td>
                    <td className="px-6 py-4">
                      {diff !== 0 ? (
                        <div className={`flex items-center gap-1 text-sm font-bold ${diff > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                          {diff > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          {Math.abs(diff)}
                        </div>
                      ) : <Minus className="h-4 w-4 text-muted-foreground/30" />}
                    </td>
                    <td className="px-6 py-4 text-center font-medium">
                      {k.search_volume?.toLocaleString() || '-'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {k.difficulty ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-12 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div className={`h-full rounded-full ${k.difficulty > 70 ? 'bg-red-500' : k.difficulty > 40 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${k.difficulty}%` }} />
                          </div>
                          <span className="text-xs font-bold text-muted-foreground">{k.difficulty}%</span>
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => startEdit(k)} className="p-2 text-primary hover:bg-primary/10 rounded-lg">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => deleteKeyword(k.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
