import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Loader2, Sparkles, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MediaPicker } from '@/components/admin/MediaPicker';
import { RichEditor } from '@/components/admin/RichEditor';


interface Category { id: number; name: string; }

export default function BlogNew({ categories }: { categories: Category[] }) {
  const [generating, setGenerating] = useState(false);
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const [model, setModel] = useState('gemini-1.5-flash');
  const [availableModels, setAvailableModels] = useState<{id:string, name:string}[]>([]);
  const [view, setView] = useState<'edit' | 'preview'>('edit');

  useEffect(() => {
    axios.get('/admin/ai/models').then(res => {
      setAvailableModels(res.data);
      if (res.data.length > 0 && !res.data.find((m:any) => m.id === 'gemini-1.5-flash')) {
        setModel(res.data[0].id);
      }
    });
  }, []);
  
  const form = useForm({ 
    title: '', 
    excerpt: '', 
    content: '', 
    status: 'draft', 
    category_id: '', 
    cover_image: '', 
    seo_title: '', 
    seo_description: '',
    og_image: '',
    ai_generated: false 
  });

  const generate = async () => {
    if (!topic.trim()) return;
    setGenerating(true);
    try {
      const response = await axios.post('/admin/ai/generate', { topic, language, model, tone: 'professional, helpful' });
      const data = response.data;
      form.setData({
        ...form.data,
        title: data.title || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        seo_title: data.seo_title || '',
        seo_description: data.seo_description || '',
        og_image: data.og_image || '',
        ai_generated: true
      });
    } catch (e: any) {
      const msg = e.response?.data?.error || e.message || 'Generation failed';
      alert(msg);
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <AdminLayout title="New Post">
      <div className="mx-auto max-w-4xl space-y-8 pb-20">
        <div className="flex items-center justify-between">
          <Link href="/admin/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </div>

        {/* AI Writer Tool */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-soft">
          <div className="mb-4 flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5" />
            <h2 className="font-display text-lg font-bold">AI Blog Writer</h2>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <input type="text" placeholder="Topic: Why digital marketing is important in BD..." value={topic} onChange={e => setTopic(e.target.value)}
              className="flex-1 rounded-lg border border-input bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            <select value={model} onChange={e => setModel(e.target.value)}
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20">
              {availableModels.length > 0 ? (
                availableModels.map(m => <option key={m.id} value={m.id}>{m.name}</option>)
              ) : (
                <>
                  <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                  <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                  <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
                </>
              )}
            </select>
            <select value={language} onChange={e => setLanguage(e.target.value as any)}
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20">
              <option value="en">English</option>
              <option value="bn">Bangla</option>
            </select>
            <button type="button" onClick={generate} disabled={generating || !topic.trim()}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground shadow-soft hover:opacity-90 disabled:opacity-50 transition-all">
              {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {generating ? 'Writing...' : 'Generate with AI'}
            </button>
          </div>
        </div>

        {/* Manual Editor */}
        <form onSubmit={e => { e.preventDefault(); form.post('/admin/blog'); }} className="space-y-6">
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
                    value={form.data.content} 
                    onChange={val => form.setData('content', val)} 
                    placeholder="AI will write your story here, or you can start typing..."
                  />
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
            {form.data.status === 'published' ? 'Publish Blog Post' : 'Save as Draft'}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
