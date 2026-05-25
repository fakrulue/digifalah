import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Loader2, Save, ExternalLink } from 'lucide-react';
import { MediaPicker } from '@/components/admin/MediaPicker';
import { useState } from 'react';
import { RichEditor } from '@/components/admin/RichEditor';

interface Category { id: number; name: string; }
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  status: string;
  category_id: number | null;
  cover_image: string | null;
  seo_title: string | null;
  seo_description: string | null;
}

export default function BlogEdit({ post, categories }: { post: BlogPost; categories: Category[] }) {
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const form = useForm({
    title: post.title || '',
    excerpt: post.excerpt || '',
    content: post.content || '',
    status: post.status || 'draft',
    category_id: post.category_id || '',
    cover_image: post.cover_image || '',
    seo_title: post.seo_title || '',
    seo_description: post.seo_description || '',
    og_image: (post as any).og_image || '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post(`/admin/blog/${post.id}`);
  };

  return (
    <AdminLayout title="Edit Post">
      <div className="mx-auto max-w-4xl space-y-8 pb-20">
        <div className="flex items-center justify-between">
          <Link href="/admin/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <ExternalLink className="h-4 w-4" /> View on Site
          </a>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-soft">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Post Content</h3>
              <div className="flex rounded-lg border border-border p-1 bg-muted/50">
                <button type="button" onClick={() => setView('edit')} className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${view === 'edit' ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}>Editor</button>
                <button type="button" onClick={() => setView('preview')} className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${view === 'preview' ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}>Preview</button>
              </div>
            </div>
            
            {view === 'edit' ? (
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Title *</label>
                  <input type="text" required value={form.data.title} onChange={e => form.setData('title', e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Excerpt</label>
                  <textarea rows={2} value={form.data.excerpt} onChange={e => form.setData('excerpt', e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div className="space-y-2">
                  <label className="mb-1.5 block text-sm font-medium">Content</label>
                  <RichEditor 
                    value={form.data.content || ''} 
                    onChange={val => form.setData('content', val)} 
                    placeholder="Start writing..."
                  />
                  {form.errors.content && <p className="text-sm text-destructive">{form.errors.content}</p>}
                </div>
                <MediaPicker value={form.data.cover_image} onChange={url => form.setData('cover_image', url)} label="Cover Image" />
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border p-8 bg-white/50">
                <article className="prose max-w-none">
                  <h1>{form.data.title || 'Untitled Post'}</h1>
                  {form.data.cover_image && <img src={form.data.cover_image} alt="Cover" className="rounded-xl" />}
                  <div dangerouslySetInnerHTML={{ __html: form.data.content || '<p class="text-muted-foreground">No content yet...</p>' }} />
                </article>
              </div>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-soft">
              <h3 className="font-display text-lg font-bold">Settings</h3>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Status</label>
                <select value={form.data.status} onChange={e => form.setData('status', e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Category</label>
                <select value={form.data.category_id} onChange={e => form.setData('category_id', e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-soft">
              <h3 className="font-display text-lg font-bold">SEO & Sharing</h3>
              <div>
                <label className="mb-1.5 block text-sm font-medium">SEO Title</label>
                <input type="text" value={form.data.seo_title} onChange={e => form.setData('seo_title', e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">SEO Description</label>
                <textarea rows={2} value={form.data.seo_description} onChange={e => form.setData('seo_description', e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <MediaPicker value={form.data.og_image} onChange={url => form.setData('og_image', url)} label="Social Share (OG) Image" />
            </div>
          </div>

          <button type="submit" disabled={form.processing}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-emerald px-6 py-4 font-semibold text-primary-foreground shadow-soft hover:opacity-90 disabled:opacity-60">
            {form.processing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            Update Blog Post
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
