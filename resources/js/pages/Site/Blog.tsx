import { SiteLayout } from '@/components/site/SiteLayout';
import { PageBlocks } from '@/components/site/PageBlocks';
import { Link } from '@inertiajs/react';
import { BookOpen, ArrowRight } from 'lucide-react';

interface Block { id: number; block_type: string; content: any; position: number; is_visible: boolean; }
interface Post { id: number; title: string; slug: string; excerpt: string; cover_image: string; published_at: string; }

export default function Blog({ 
  blocks, 
  posts,
  services,
  pricing_plans,
  team_members,
  clients,
  portfolios,
  case_studies
}: { 
  blocks: Block[]; 
  posts: Post[];
  services?: any[];
  pricing_plans?: any[];
  team_members?: any[];
  clients?: any[];
  portfolios?: any[];
  case_studies?: any[];
}) {
  return (
    <SiteLayout>
      <PageBlocks 
        blocks={blocks} 
        services={services}
        pricing_plans={pricing_plans}
        team_members={team_members}
        clients={clients}
        portfolios={portfolios}
        case_studies={case_studies}
      />
      {posts.length > 0 ? (
        <section className="container mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(p => (
              <Link key={p.id} href={`/blog/${p.slug}`} className="group rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-elegant transition-all">
                {p.cover_image && <img src={p.cover_image} alt={p.title} className="h-48 w-full object-cover" />}
                <div className="p-6">
                  <h2 className="font-display text-xl font-bold group-hover:text-primary transition-colors">{p.title}</h2>
                  {p.excerpt && <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>}
                  <div className="mt-4 text-xs text-muted-foreground">{p.published_at}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="container mx-auto max-w-4xl px-4 py-24 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-emerald text-primary-foreground shadow-soft">
            <BookOpen className="h-7 w-7" />
          </div>
          <h2 className="mt-6 font-display text-3xl font-bold">Articles coming soon</h2>
          <p className="mt-3 text-muted-foreground">We're publishing our first batch of AI-assisted, expert-edited guides.</p>
          <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-emerald px-8 py-3 font-semibold text-primary-foreground shadow-soft hover:opacity-90">
            Notify me <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      )}
    </SiteLayout>
  );
}
