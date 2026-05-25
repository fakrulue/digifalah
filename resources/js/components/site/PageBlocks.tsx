import { Link } from "@inertiajs/react";
import { CheckCircle2, Star, User } from "lucide-react";
import { LeadForm } from "./LeadForm";


interface Block {
  id: string;
  block_type: string;
  position: number;
  content: any;
  is_visible: boolean;
}

export function PageBlocks({ 
  blocks: initialBlocks,
  activeBlockId,
  onBlockClick,
  services,
  pricing_plans,
  team_members,
  clients,
  portfolios,
  case_studies
}: { 
  blocks?: Block[];
  activeBlockId?: string | null;
  onBlockClick?: (id: string) => void;
  services?: any[];
  pricing_plans?: any[];
  team_members?: any[];
  clients?: any[];
  portfolios?: any[];
  case_studies?: any[];
}) {
  const blocks = initialBlocks ?? [];
  if (blocks.length === 0) return null;

  return (
    <>
      {blocks.map((b) => (
        <div
          key={b.id}
          onClick={(e) => { if (onBlockClick) { e.stopPropagation(); onBlockClick(b.id); } }}
          className={cn(
            onBlockClick && "relative cursor-pointer transition-all outline-none hover:ring-2 hover:ring-primary/40 hover:ring-offset-1",
            activeBlockId === b.id && "ring-2 ring-primary ring-offset-2"
          )}
        >
          {onBlockClick && activeBlockId === b.id && (
            <div className="absolute -top-3 left-4 z-50 rounded bg-primary px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
              {b.block_type}
            </div>
          )}
          <BlockRenderer 
            block={b} 
            services={services} 
            pricing_plans={pricing_plans}
            team_members={team_members}
            clients={clients}
            portfolios={portfolios}
            case_studies={case_studies}
          />
        </div>
      ))}
    </>
  );
}

function cn(...classes: any[]) { return classes.filter(Boolean).join(" "); }

function BlockRenderer({ 
  block, 
  services, 
  pricing_plans,
  team_members,
  clients,
  portfolios,
  case_studies
}: { 
  block: Block; 
  services?: any[]; 
  pricing_plans?: any[];
  team_members?: any[];
  clients?: any[];
  portfolios?: any[];
  case_studies?: any[];
}) {
  const c = block.content || {};
  switch (block.block_type) {

    case "hero":
      return (
        <section className="relative overflow-hidden bg-gradient-hero py-24 text-primary-foreground">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep/40 via-transparent to-emerald-deep" aria-hidden />
          <div className="container relative mx-auto max-w-4xl px-4 text-center">
            {c.eyebrow && (
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-gold backdrop-blur">
                {c.eyebrow}
              </span>
            )}
            <h1
              className="mt-4 font-display text-5xl font-bold leading-tight md:text-6xl"
              dangerouslySetInnerHTML={{ __html: c.title ?? "" }}
            />
            {c.subtitle && <p className="mx-auto mt-5 max-w-2xl text-lg text-primary-foreground/80">{c.subtitle}</p>}
            {c.bangla_text && <p className="mt-2 font-bangla text-base text-gold">{c.bangla_text}</p>}
            {c.cta_label && c.cta_url && (
              <Link href={c.cta_url} className="mt-8 inline-block rounded-lg bg-gradient-gold px-8 py-3 font-semibold text-emerald-deep shadow-gold hover:opacity-90">
                {c.cta_label}
              </Link>
            )}
          </div>
        </section>
      );

    case "stats":
      return (
        <section className="border-y border-border bg-surface">
          <div className="container mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 md:grid-cols-4">
            {(c.items ?? []).map((s: any) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-4xl font-bold text-primary md:text-5xl">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      );

    case "features":
      return (
        <section className="container mx-auto max-w-7xl px-4 py-24">
          <div className="mx-auto max-w-2xl text-center">
            {c.eyebrow && <span className="text-xs font-bold uppercase tracking-wider text-primary">{c.eyebrow}</span>}
            {c.heading && <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">{c.heading}</h2>}
            {c.subtitle && <p className="mt-4 text-muted-foreground">{c.subtitle}</p>}
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(c.items ?? []).map((s: any, i: number) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-elegant">
                <h3 className="font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case "split_features":
      return (
        <section className="bg-emerald-deep text-primary-foreground">
          <div className="container mx-auto grid max-w-7xl gap-12 px-4 py-24 lg:grid-cols-2">
            <div>
              {c.eyebrow && <span className="text-xs font-bold uppercase tracking-wider text-gold">{c.eyebrow}</span>}
              {c.heading && <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl" dangerouslySetInnerHTML={{ __html: c.heading }} />}
              {c.body && <p className="mt-6 text-primary-foreground/70">{c.body}</p>}
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {(c.items ?? []).map((t: any, i: number) => (
                <li key={i} className="flex items-start gap-3 rounded-xl bg-white/5 p-4 backdrop-blur">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-sm">{t.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      );

    case "testimonials":
      return (
        <section className="container mx-auto max-w-7xl px-4 py-24">
          <div className="text-center">
            {c.eyebrow && <span className="text-xs font-bold uppercase tracking-wider text-primary">{c.eyebrow}</span>}
            {c.heading && <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">{c.heading}</h2>}
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {(c.items ?? []).map((t: any, i: number) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-8 shadow-soft">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-foreground">"{t.text}"</p>
                <div className="mt-6 border-t border-border pt-4">
                  <div className="font-bold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      );

    case "services_grid":
      const displayServices = (services && services.length > 0) ? services : (c.items ?? []);
      return (
        <section className="container mx-auto max-w-7xl px-4 py-20">
          {(c.heading || c.subtitle) && (
            <div className="mx-auto mb-14 max-w-2xl text-center">
              {c.heading && <h2 className="font-display text-4xl font-bold md:text-5xl">{c.heading}</h2>}
              {c.subtitle && <p className="mt-4 text-muted-foreground">{c.subtitle}</p>}
            </div>
          )}
          <div className="grid gap-8 lg:grid-cols-2">
            {displayServices.map((s: any, i: number) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-8 shadow-soft">
                <h2 className="font-display text-2xl font-bold">{s.title}</h2>
                <p className="mt-2 text-muted-foreground">{s.short_line || s.description}</p>
                <ul className="mt-6 space-y-2">
                  {(s.points ?? []).map((p: string, j: number) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {c.cta_title && (
            <div className="mt-16 rounded-2xl bg-gradient-emerald p-12 text-center text-primary-foreground shadow-elegant">
              <h2 className="font-display text-3xl font-bold md:text-4xl">{c.cta_title}</h2>
              {c.cta_subtitle && <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">{c.cta_subtitle}</p>}
              {c.cta_label && c.cta_url && (
                <Link href={c.cta_url} className="mt-6 inline-block rounded-lg bg-gradient-gold px-8 py-3 font-semibold text-emerald-deep shadow-gold hover:opacity-90">
                  {c.cta_label}
                </Link>
              )}
            </div>
          )}
        </section>
      );

    case "pricing_grid":
      const displayPlans = (pricing_plans && pricing_plans.length > 0) ? pricing_plans : (c.items ?? []);
      return (
        <section className="container mx-auto max-w-7xl px-4 py-20">
          <div className="grid gap-6 lg:grid-cols-3">
            {displayPlans.map((plan: any, i: number) => (
              <div key={i} className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-8",
                plan.highlight ? "border-primary shadow-elegant ring-2 ring-primary/20" : "border-border shadow-soft"
              )}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-gold px-3 py-1 text-xs font-bold text-emerald-deep shadow-gold">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {(plan.features ?? []).map((f: string, j: number) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="mt-8 block rounded-lg bg-gradient-emerald py-3 text-center font-semibold text-primary-foreground shadow-soft hover:opacity-90">
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-sm text-muted-foreground">
            All plans include a free 30-day cancellation window. No setup fees.
          </p>
        </section>
      );

    case "values":
      return (
        <section className="container mx-auto max-w-5xl px-4 py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {(c.items ?? []).map((v: any, i: number) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case "text":
      return (
        <section className="py-12">
          <div className="container mx-auto max-w-3xl px-4">
            {c.title && <h2 className="font-display text-3xl font-bold">{c.title}</h2>}
            {c.heading && <h2 className="font-display text-3xl font-bold">{c.heading}</h2>}
            {c.body && <div className="prose prose-lg mt-4 max-w-none whitespace-pre-wrap text-foreground/90">{c.body}</div>}
          </div>
        </section>
      );

    case "image":
      return (
        <section className="py-8">
          <div className="container mx-auto px-4">
            {c.url && <img src={c.url} alt={c.alt ?? ""} className="mx-auto rounded-2xl" />}
            {c.caption && <p className="mt-2 text-center text-sm text-muted-foreground">{c.caption}</p>}
          </div>
        </section>
      );

    case "cta":
      return (
        <section className="container mx-auto max-w-7xl px-4 pb-24">
          <div className="overflow-hidden rounded-3xl bg-gradient-emerald p-12 text-center text-primary-foreground shadow-elegant md:p-20">
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold md:text-5xl" dangerouslySetInnerHTML={{ __html: c.title ?? "" }} />
            {c.subtitle && <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">{c.subtitle}</p>}
            {c.cta_label && c.cta_url && (
              <Link href={c.cta_url} className="mt-8 inline-block rounded-lg bg-gradient-gold px-8 py-3 font-semibold text-emerald-deep shadow-gold hover:opacity-90">
                {c.cta_label}
              </Link>
            )}
          </div>
        </section>
      );

    case "blog_posts":
      return (
        <section className="container mx-auto max-w-4xl px-4 py-24 text-center">
          {c.heading && <h2 className="font-display text-3xl font-bold">{c.heading}</h2>}
          <p className="mt-3 text-muted-foreground">Articles coming soon. Want to be notified?</p>
          <Link href="/contact" className="mt-6 inline-block rounded-lg bg-gradient-emerald px-8 py-3 font-semibold text-primary-foreground shadow-soft hover:opacity-90">
            Notify me
          </Link>
        </section>
      );

    case "html":
      return (
        <section className="py-8">
          <div className="container mx-auto px-4" dangerouslySetInnerHTML={{ __html: c.html ?? "" }} />
        </section>
      );

    case "lead_form":
      return (
        <section className="container mx-auto max-w-4xl px-4 py-16">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-elegant md:p-12">
            <div className="mb-8 text-center">
              {c.heading && <h2 className="font-display text-3xl font-bold">{c.heading}</h2>}
              {c.subheading && <p className="mt-2 text-muted-foreground">{c.subheading}</p>}
            </div>
            <LeadForm source={c.source ?? "website"} />
          </div>
        </section>
      );

    case "team_grid":
      const displayTeam = (team_members && team_members.length > 0) ? team_members : (c.items ?? []);
      return (
        <section className="container mx-auto max-w-7xl px-4 py-24">
          <div className="mx-auto max-w-2xl text-center mb-16">
            {c.heading && <h2 className="font-display text-4xl font-bold">{c.heading}</h2>}
            {c.subtitle && <p className="mt-4 text-muted-foreground">{c.subtitle}</p>}
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {displayTeam.map((m: any, i: number) => (
              <div key={i} className="group text-center">
                <div className="relative mx-auto mb-6 h-48 w-48 overflow-hidden rounded-2xl bg-muted grayscale transition-all group-hover:grayscale-0">
                  {m.image ? <img src={m.image} alt={m.name} className="h-full w-full object-cover" /> : <div className="h-full w-full flex items-center justify-center text-muted-foreground/30"><User className="h-12 w-12" /></div>}
                </div>
                <h3 className="font-display text-xl font-bold">{m.name}</h3>
                <p className="text-sm text-primary font-medium">{m.role}</p>
                {m.bio && <p className="mt-3 text-xs text-muted-foreground line-clamp-2 px-4">{m.bio}</p>}
              </div>
            ))}
          </div>
        </section>
      );

    case "client_logos":
      const rawClients = Array.isArray(clients) ? clients : [];
      const rawItems = Array.isArray(c.items) ? c.items : [];
      const displayClients = rawClients.length > 0 ? rawClients : rawItems;
      
      return (
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto max-w-7xl px-4 overflow-hidden">
            {c.heading && <h3 className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-10">{c.heading}</h3>}
            {displayClients.length === 0 ? (
               <div className="text-center text-sm text-muted-foreground py-8">Client logos will appear here once you add them in the Clients module.</div>
            ) : c.enable_slider === 'true' || c.enable_slider === true ? (
              <div className="relative flex w-full overflow-hidden mask-horizontal">
                <div className="flex animate-marquee items-center w-max">
                  {[...displayClients, ...displayClients].map((cl: any, i: number) => (
                    <div key={i} className="mx-8 h-12 w-32 flex shrink-0 items-center justify-center opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                      {cl?.logo ? <img src={cl.logo} alt={cl?.name || 'Client'} className="max-h-full max-w-full object-contain" /> : <span className="font-bold text-muted-foreground/50">{cl?.name || 'Client'}</span>}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                {displayClients.map((cl: any, i: number) => (
                  <div key={i} className="h-12 w-32 flex shrink-0 items-center justify-center">
                    {cl?.logo ? <img src={cl.logo} alt={cl?.name || 'Client'} className="max-h-full max-w-full object-contain" /> : <span className="font-bold text-muted-foreground/50">{cl?.name || 'Client'}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      );

    case "portfolio_grid":
      const displayPortfolio = (portfolios && portfolios.length > 0) ? portfolios : (c.items ?? []);
      return (
        <section className="container mx-auto max-w-7xl px-4 py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              {c.heading && <h2 className="font-display text-4xl font-bold">{c.heading}</h2>}
              {c.subtitle && <p className="mt-3 text-muted-foreground">{c.subtitle}</p>}
            </div>
            {c.cta_url && (
               <Link href={c.cta_url} className="text-sm font-bold text-primary hover:underline flex items-center gap-2">
                 VIEW ALL PROJECTS <CheckCircle2 className="h-4 w-4" />
               </Link>
            )}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayPortfolio.map((p: any, i: number) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-elegant transition-all">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                   {p.image ? <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" /> : <div className="h-full w-full" />}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                   <span className="text-[10px] font-bold text-gold uppercase tracking-widest">{p.category}</span>
                   <h3 className="text-xl font-bold text-white mt-1">{p.title}</h3>
                   {p.link && <a href={p.link} target="_blank" className="mt-3 text-xs text-white/80 hover:text-white flex items-center gap-1">Visit Project <CheckCircle2 className="h-3 w-3" /></a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      );

    case "case_studies":
      const displayStudies = (case_studies && case_studies.length > 0) ? case_studies : (c.items ?? []);
      return (
        <section className="container mx-auto max-w-7xl px-4 py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              {c.heading && <h2 className="font-display text-4xl font-bold">{c.heading}</h2>}
              {c.subtitle && <p className="mt-4 text-muted-foreground text-lg">{c.subtitle}</p>}
              <div className="mt-12 space-y-8">
                {displayStudies.map((s: any, i: number) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-display font-bold">
                      0{i+1}
                    </div>
                    <div>
                       <h4 className="font-bold text-xl">{s.title}</h4>
                       {s.results && <p className="text-emerald-600 text-sm font-bold mt-1 uppercase tracking-wider">{s.results}</p>}
                       <Link href={`/blog/${s.slug}`} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                          Read Case Study <CheckCircle2 className="h-4 w-4" />
                       </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
               <div className="aspect-[3/4] overflow-hidden rounded-3xl shadow-elegant">
                  {c.main_image ? <img src={c.main_image} alt="Success Stories" className="h-full w-full object-cover" /> : <div className="h-full w-full bg-muted" />}
               </div>
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
}
