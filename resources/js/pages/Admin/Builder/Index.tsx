import { AdminLayout } from '@/components/admin/AdminLayout';
import { Link, useForm, router } from '@inertiajs/react';
import { PenSquare, Plus, Trash2 } from 'lucide-react';

const CORE_PAGES = ['home','services','about','pricing','contact','blog'];

export default function BuilderIndex({ pages }: { pages: string[] }) {
  const allPages = [...new Set([...CORE_PAGES, ...pages])];
  
  const { data, setData, post, processing, reset, errors } = useForm({
    slug: ''
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/builder/create', {
      onSuccess: () => reset()
    });
  };

  const deletePage = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`Are you sure you want to permanently delete the "${slug}" page?`)) {
      router.delete(`/admin/builder/${slug}`);
    }
  };

  return (
    <AdminLayout title="Visual Builder">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Create New Page */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-lg font-bold mb-4">Create New Custom Page</h2>
          <form onSubmit={submit} className="flex gap-4 items-start">
            <div className="flex-1 max-w-md">
              <input type="text" value={data.slug} onChange={e => setData('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} required placeholder="Page Slug (e.g. promotional-offer)"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
              {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug}</p>}
              <p className="mt-1 text-xs text-muted-foreground">Only lowercase letters, numbers, and hyphens.</p>
            </div>
            <button type="submit" disabled={processing} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
              <Plus className="h-4 w-4" /> Create Page
            </button>
          </form>
        </div>

        <div>
          <p className="mb-4 text-muted-foreground">Select a page to open the visual editor.</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allPages.map(slug => {
              const isCore = CORE_PAGES.includes(slug);
              return (
                <div key={slug} className="flex items-center justify-between rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:border-primary/30 hover:shadow-elegant">
                  <Link href={`/admin/builder/${slug}`} className="flex-1 block">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-lg font-bold capitalize">{slug}</span>
                      {isCore && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Core</span>}
                    </div>
                    <div className="text-sm text-muted-foreground">/{slug === 'home' ? '' : slug}</div>
                  </Link>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Link href={`/admin/builder/${slug}`} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Edit Page">
                      <PenSquare className="h-5 w-5" />
                    </Link>
                    {!isCore && (
                      <button 
                        onClick={(e) => deletePage(slug, e)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Custom Page"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
