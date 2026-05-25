import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import { Trash2, Plus, ArrowLeft, Loader2 } from 'lucide-react';

interface Category { id: number; name: string; slug: string; }

export default function BlogCategories({ categories }: { categories: Category[] }) {
  const form = useForm({ name: '' });
  const deleteForm = useForm({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post('/admin/blog/categories', {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <AdminLayout title="Blog Categories">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/admin/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="mb-4 font-display text-lg font-bold">Add New Category</h2>
          <form onSubmit={submit} className="flex gap-3">
            <input type="text" placeholder="e.g. SEO, Marketing, News" required value={form.data.name} onChange={e => form.setData('name', e.target.value)}
              className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            <button type="submit" disabled={form.processing || !form.data.name}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-90 disabled:opacity-50">
              {form.processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Add Category
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
          <div className="divide-y divide-border">
            {categories.map(c => (
              <div key={c.id} className="flex items-center justify-between p-4 transition-colors hover:bg-muted/30">
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">/{c.slug}</div>
                </div>
                <button onClick={() => { if(confirm('Delete this category?')) deleteForm.delete(`/admin/blog/categories/${c.id}`); }}
                  className="rounded-lg p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            {categories.length === 0 && (
              <div className="p-10 text-center text-sm text-muted-foreground">
                No categories created yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
