import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Trash2, MessageSquare, CheckCircle, Reply, XCircle } from 'lucide-react';
import { useState } from 'react';

interface Comment {
  id: number;
  name: string;
  email: string;
  comment: string;
  reply: string | null;
  is_approved: boolean;
  created_at: string;
  post?: { title: string; slug: string };
}

export default function BlogComments({ comments }: { comments: Comment[] }) {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const form = useForm({
    reply: '',
    is_approved: true,
  });

  const updateComment = (id: number, data: any) => {
    form.setData({ ...form.data, ...data });
    form.post(`/admin/blog-comments/${id}`, {
      onSuccess: () => {
        setReplyingTo(null);
        form.reset();
      }
    });
  };

  const deleteComment = (id: number) => {
    if (confirm('Delete this comment?')) {
      useForm({}).delete(`/admin/blog-comments/${id}`);
    }
  };

  return (
    <AdminLayout title="Blog Comments">
      <div className="mb-6">
        <p className="text-muted-foreground">{comments.length} total comments</p>
      </div>

      <div className="space-y-4">
        {comments.map(c => (
          <div key={c.id} className={`rounded-2xl border bg-card p-6 shadow-soft transition-all ${!c.is_approved ? 'border-amber-200 bg-amber-50/30' : 'border-border'}`}>
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-foreground">{c.name}</h4>
                    <span className="text-xs text-muted-foreground">{c.email}</span>
                    <span className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleString()}</span>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    On post: <span className="font-medium text-primary">{c.post?.title}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">{c.comment}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!c.is_approved ? (
                  <button onClick={() => updateComment(c.id, { is_approved: true })} className="flex items-center gap-1 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600 hover:bg-emerald-500/20">
                    <CheckCircle className="h-3.5 w-3.5" /> Approve
                  </button>
                ) : (
                  <button onClick={() => updateComment(c.id, { is_approved: false })} className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-200">
                    <XCircle className="h-3.5 w-3.5" /> Unapprove
                  </button>
                )}
                <button onClick={() => { setReplyingTo(replyingTo === c.id ? null : c.id); form.setData('reply', c.reply || ''); }} className="rounded-lg p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary">
                  <Reply className="h-4 w-4" />
                </button>
                <button onClick={() => deleteComment(c.id)} className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Reply Box */}
            {replyingTo === c.id && (
              <div className="mt-6 border-t border-border pt-6 animate-in fade-in slide-in-from-top-2">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Admin Reply</label>
                <textarea 
                  rows={3} 
                  value={form.data.reply} 
                  onChange={e => form.setData('reply', e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Write your response..."
                />
                <div className="mt-3 flex justify-end gap-2">
                  <button onClick={() => setReplyingTo(null)} className="rounded-lg px-4 py-2 text-xs font-bold text-muted-foreground hover:bg-muted">Cancel</button>
                  <button 
                    onClick={() => updateComment(c.id, { reply: form.data.reply })}
                    disabled={form.processing}
                    className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-90 disabled:opacity-50"
                  >
                    {form.processing ? 'Saving...' : 'Save Reply'}
                  </button>
                </div>
              </div>
            )}

            {/* Existing Reply Display */}
            {c.reply && replyingTo !== c.id && (
              <div className="mt-4 flex gap-3 rounded-xl bg-primary/5 p-4 border-l-2 border-primary">
                <Reply className="h-4 w-4 shrink-0 text-primary" />
                <div className="text-sm">
                  <span className="font-bold text-primary block mb-1">Admin Response</span>
                  <p className="text-muted-foreground italic">{c.reply}</p>
                </div>
              </div>
            )}
          </div>
        ))}
        {comments.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-20 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/20" />
            <h3 className="mt-4 text-lg font-bold">No comments yet</h3>
            <p className="text-sm text-muted-foreground">Engagement will show up here as users interact with your blog.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
