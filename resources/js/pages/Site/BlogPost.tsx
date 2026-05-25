import { useForm, Link } from '@inertiajs/react';
import { SiteLayout } from '@/components/site/SiteLayout';

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  cover_image: string | null;
  published_at: string;
  excerpt: string;
  category?: { name: string };
  comments?: any[];
}

function CommentForm({ postId }: { postId: number }) {
  const { data, setData, post, processing, reset, errors, wasSuccessful } = useForm({
    name: '',
    email: '',
    comment: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(`/blog/${postId}/comment`, {
      onSuccess: () => reset(),
      preserveScroll: true,
    });
  };

  return (
    <form onSubmit={submit} className="mt-8 mb-12 space-y-4 rounded-2xl bg-gray-50 p-8 border border-gray-100">
      <h4 className="font-bold text-gray-900 text-lg">Leave a Reply</h4>
      <div className="grid gap-4 sm:grid-cols-2">
        <input type="text" placeholder="Name" required value={data.name} onChange={e => setData('name', e.target.value)}
          className="w-full rounded-xl border-gray-200 bg-white px-4 py-3 text-sm focus:border-primary focus:ring-primary shadow-sm" />
        <input type="email" placeholder="Email" required value={data.email} onChange={e => setData('email', e.target.value)}
          className="w-full rounded-xl border-gray-200 bg-white px-4 py-3 text-sm focus:border-primary focus:ring-primary shadow-sm" />
      </div>
      <textarea rows={4} placeholder="Your comment..." required value={data.comment} onChange={e => setData('comment', e.target.value)}
        className="w-full rounded-xl border-gray-200 bg-white px-4 py-3 text-sm focus:border-primary focus:ring-primary shadow-sm" />
      <button type="submit" disabled={processing}
        className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-primary shadow-lg disabled:opacity-50">
        {processing ? 'Submitting...' : 'Post Comment'}
      </button>
      {wasSuccessful && <p className="text-sm font-medium text-primary mt-2">✓ Your comment is awaiting approval!</p>}
    </form>
  );
}

export default function BlogPost({ post }: { post: Post }) {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-white">
        {/* Simple Title Area */}
        <header className="container mx-auto max-w-4xl px-6 pt-16 pb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl leading-tight">
                {post.title}
            </h1>
            
            {/* Cover Image - Now after H1 */}
            {post.cover_image && (
              <div className="mt-8">
                <img 
                  src={post.cover_image} 
                  alt={post.title} 
                  className="w-full rounded-2xl object-cover shadow-sm max-h-[500px]" 
                />
              </div>
            )}
        </header>

        {/* Clean Main Content Area - No Sidebars */}
        <main className="container mx-auto max-w-4xl px-6 pb-24">
          <article className="prose prose-emerald max-w-none">
            {/* The core content container matched EXACTLY to the screenshot */}
            <div 
                className="bg-white"
                dangerouslySetInnerHTML={{ __html: post.content || '' }} 
            />
          </article>
          
          {/* Simple Comments Area */}
          <section className="mt-20 pt-10 border-t border-gray-100">
             <h3 className="text-2xl font-bold text-gray-900 mb-8">Comments ({post.comments?.length || 0})</h3>
             
             {/* Comment Form - Restored */}
             <CommentForm postId={post.id} />

             <div className="space-y-8">
                  {post.comments?.map((c: any) => (
                    <div key={c.id} className="flex gap-4 p-6 rounded-2xl bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <h5 className="font-bold text-gray-900">{c.name}</h5>
                            <span className="text-xs text-gray-400">{new Date(c.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-600">{c.comment}</p>
                        {c.reply && (
                            <div className="mt-4 rounded-xl bg-primary/5 p-4 border-l-4 border-primary">
                                <span className="text-xs font-bold text-primary uppercase block mb-1">Reply</span>
                                <p className="italic text-gray-800">"{c.reply}"</p>
                            </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
          </section>
        </main>
      </div>

      <style>{`
        /* Screenshot Accurate Styles */
        .prose h2 { font-size: 1.875rem; font-weight: 800; margin-top: 2.5rem; margin-bottom: 1.25rem; color: #111827; }
        .prose h3 { font-size: 1.5rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; color: #111827; }
        .prose p { margin-bottom: 1.5rem; line-height: 1.7; color: #374151; font-size: 1.05rem; }
        
        .blog-tip { 
            background: #f0fdf4 !important; 
            border-left: 4px solid #10b981 !important; 
            padding: 1.5rem !important; 
            border-radius: 0.5rem !important; 
            margin: 2rem 0 !important; 
        }
        .blog-tip h4 { color: #065f46 !important; font-weight: 700 !important; margin-bottom: 0.5rem !important; margin-top: 0 !important; }
        
        .blog-grid { 
            display: grid !important; 
            grid-template-columns: 1fr 1fr !important; 
            gap: 1.5rem !important; 
            margin: 2.5rem 0 !important; 
        }
        @media (max-width: 768px) { .blog-grid { grid-template-columns: 1fr !important; } }
        
        .blog-card { 
            border: 1px solid #f3f4f6 !important; 
            padding: 1.5rem !important; 
            border-radius: 0.75rem !important; 
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05) !important; 
            background: white !important;
        }
        .blog-card h4 { font-weight: 700 !important; margin-bottom: 0.5rem !important; margin-top: 0 !important; color: #111827 !important; }
        
        .blog-cta { 
            background: #10b981 !important; 
            color: white !important; 
            padding: 2.5rem !important; 
            border-radius: 0.75rem !important; 
            text-align: center !important; 
            margin: 3rem 0 !important; 
        }
        .blog-cta h3 { color: white !important; font-weight: 800 !important; margin-bottom: 1rem !important; margin-top: 0 !important; }
        .blog-cta a { 
            display: inline-block !important; 
            background: white !important; 
            color: #10b981 !important; 
            padding: 0.75rem 2rem !important; 
            border-radius: 0.5rem !important; 
            font-weight: 700 !important; 
            text-decoration: none !important; 
            margin-top: 1rem !important; 
        }
      `}</style>
    </SiteLayout>
  );
}
