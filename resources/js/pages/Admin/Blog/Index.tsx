import { AdminLayout } from '@/components/admin/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { Plus, Trash2, FileText, PenLine, ExternalLink } from 'lucide-react';

interface Post { id: number; title: string; slug: string; status: string; created_at: string; category?: { name: string }; }

export default function BlogIndex({ posts }: { posts: Post[] }) {
  const deleteForm = useForm({});
  return (
    <AdminLayout title="Blog">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-muted-foreground">{posts.length} total posts</p>
        <div className="flex gap-2">
          <Link href="/admin/blog/categories" className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors">
            Manage Categories
          </Link>
          <Link href="/admin/blog/new" className="flex items-center gap-2 rounded-lg bg-gradient-emerald px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-90">
            <Plus className="h-4 w-4" /> New Post
          </Link>
        </div>
      </div>
      {posts.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-16 text-center">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <h2 className="mt-4 font-display text-2xl font-bold">No posts yet</h2>
          <p className="mt-2 text-muted-foreground">Create your first blog post to get started.</p>
          <Link href="/admin/blog/new" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-emerald px-6 py-2.5 text-sm font-semibold text-primary-foreground">
            <Plus className="h-4 w-4" /> Create Post
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map(p => (
            <div key={p.id} className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 shadow-soft">
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className={`rounded-full px-2 py-0.5 font-medium ${p.status === 'published' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>{p.status}</span>
                  <span>{p.created_at}</span>
                  {p.category && <span>{p.category.name}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 text-muted-foreground hover:text-primary hover:bg-primary/10">
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">View</span>
                </a>
                <Link href={`/admin/blog/${p.id}/edit`} className="rounded-lg p-2 text-muted-foreground hover:text-primary hover:bg-primary/10">
                  <PenLine className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Link>
                <form onSubmit={e => { if(confirm('Delete this post?')) { e.preventDefault(); deleteForm.delete(`/admin/blog/${p.id}`); } }}>
                  <button type="submit" className="rounded-lg p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
