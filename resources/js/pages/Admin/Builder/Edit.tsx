import { PageBlocks } from '@/components/site/PageBlocks';
import { router, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Save, Plus, Trash2, Eye, ArrowLeft, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';

interface Block { id: number; block_type: string; content: any; position: number; is_visible: boolean; }

const BLOCK_TYPES = [
  { type: 'hero', label: 'Hero Section' },
  { type: 'stats', label: 'Stats / Numbers' },
  { type: 'features', label: 'Feature Grid' },
  { type: 'team_grid', label: 'Team Members' },
  { type: 'client_logos', label: 'Client Logos' },
  { type: 'portfolio_grid', label: 'Portfolio Grid' },
  { type: 'case_studies', label: 'Case Studies' },
  { type: 'split_features', label: 'Split Features' },
  { type: 'testimonials', label: 'Testimonials' },
  { type: 'cta', label: 'Call to Action' },
  { type: 'services_grid', label: 'Services Grid' },
  { type: 'text', label: 'Text Block' },
  { type: 'image', label: 'Image Block' },
  { type: 'lead_form', label: 'Lead Form / Booking' },
  { type: 'html', label: 'Raw HTML' },
];

export default function BuilderEdit({ 
  slug, 
  initialBlocks,
  team_members,
  clients,
  portfolios,
  case_studies,
  services,
  pricing_plans
}: { 
  slug: string; 
  initialBlocks: Block[];
  team_members?: any[];
  clients?: any[];
  portfolios?: any[];
  case_studies?: any[];
  services?: any[];
  pricing_plans?: any[];
}) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  const activeBlock = blocks.find(b => b.id === activeId);

  const save = () => {
    setSaving(true);
    router.post(`/admin/builder/${slug}`, { blocks }, { preserveScroll: true, onFinish: () => setSaving(false) });
  };

  const addBlock = (type: string) => {
    const newBlock = { id: Date.now(), block_type: type, content: {}, position: blocks.length, is_visible: true };
    setBlocks([...blocks, newBlock]);
    setActiveId(newBlock.id);
  };

  const updateContent = (id: number, key: string, value: any) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content: { ...b.content, [key]: value } } : b));
  };

  const removeBlock = (id: number) => {
    setBlocks(blocks.filter(b => b.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const moveBlock = (id: number, dir: -1 | 1) => {
    const idx = blocks.findIndex(b => b.id === id);
    if (idx + dir < 0 || idx + dir >= blocks.length) return;
    const next = [...blocks];
    [next[idx], next[idx + dir]] = [next[idx + dir], next[idx]];
    setBlocks(next);
  };

  const CONTENT_FIELDS: Record<string, { key: string; label: string; type?: string }[]> = {
    hero: [{ key: 'eyebrow', label: 'Eyebrow' }, { key: 'title', label: 'Title (HTML ok)' }, { key: 'subtitle', label: 'Subtitle', type: 'textarea' }, { key: 'bangla_text', label: 'Bangla Text' }, { key: 'cta_label', label: 'CTA Label' }, { key: 'cta_url', label: 'CTA URL' }],
    team_grid: [{ key: 'heading', label: 'Section Heading' }, { key: 'subtitle', label: 'Section Subtitle', type: 'textarea' }],
    client_logos: [{ key: 'heading', label: 'Section Heading' }, { key: 'enable_slider', label: 'Enable Marquee Slider', type: 'checkbox' }],
    portfolio_grid: [{ key: 'heading', label: 'Section Heading' }, { key: 'subtitle', label: 'Section Subtitle', type: 'textarea' }, { key: 'cta_url', label: 'View All Link' }],
    case_studies: [{ key: 'heading', label: 'Section Heading' }, { key: 'subtitle', label: 'Intro Text', type: 'textarea' }, { key: 'main_image', label: 'Showcase Image URL' }],
    cta: [{ key: 'title', label: 'Title (HTML ok)' }, { key: 'subtitle', label: 'Subtitle', type: 'textarea' }, { key: 'cta_label', label: 'CTA Label' }, { key: 'cta_url', label: 'CTA URL' }],
    text: [{ key: 'title', label: 'Title' }, { key: 'heading', label: 'Heading' }, { key: 'body', label: 'Body', type: 'textarea' }],
    image: [{ key: 'url', label: 'Image URL' }, { key: 'alt', label: 'Alt Text' }, { key: 'caption', label: 'Caption' }],
    features: [{ key: 'eyebrow', label: 'Eyebrow' }, { key: 'heading', label: 'Heading' }, { key: 'subtitle', label: 'Subtitle' }],
    split_features: [{ key: 'eyebrow', label: 'Eyebrow' }, { key: 'heading', label: 'Heading (HTML ok)' }, { key: 'body', label: 'Body', type: 'textarea' }],
    testimonials: [{ key: 'eyebrow', label: 'Eyebrow' }, { key: 'heading', label: 'Heading' }],
    html: [{ key: 'html', label: 'Raw HTML', type: 'textarea' }],
    lead_form: [{ key: 'heading', label: 'Heading' }, { key: 'subheading', label: 'Subheading', type: 'textarea' }, { key: 'source', label: 'Source Label' }],
    services_grid: [{ key: 'heading', label: 'Section Heading' }, { key: 'subtitle', label: 'Section Subtitle', type: 'textarea' }, { key: 'cta_title', label: 'CTA Title (bottom card)' }, { key: 'cta_subtitle', label: 'CTA Subtitle', type: 'textarea' }, { key: 'cta_label', label: 'CTA Button Label' }, { key: 'cta_url', label: 'CTA Button URL' }],
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-80 flex-col border-r border-border bg-card shadow-elegant">
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <Link href="/admin/builder" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Pages
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={() => setPreview(!preview)} title="Toggle Preview" className={`rounded-lg p-1.5 text-sm ${preview ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
              <Eye className="h-4 w-4" />
            </button>
            <button onClick={save} disabled={saving}
              className="flex items-center gap-1.5 rounded-lg bg-gradient-emerald px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-soft hover:opacity-90">
              <Save className="h-3.5 w-3.5" /> {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Block list */}
          <div className="p-3 space-y-1">
            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Page Blocks</div>
            {blocks.map(b => (
              <div key={b.id} onClick={() => setActiveId(b.id)}
                className={`group flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer transition-all ${activeId === b.id ? 'border-primary bg-primary/5 text-primary' : 'border-transparent hover:border-border hover:bg-muted/50'}`}>
                <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="flex-1 text-sm font-medium truncate">{b.block_type}</span>
                <div className="hidden group-hover:flex items-center gap-1">
                  <button onClick={(e) => { e.stopPropagation(); moveBlock(b.id, -1); }} className="p-0.5 hover:text-primary"><ChevronUp className="h-3.5 w-3.5" /></button>
                  <button onClick={(e) => { e.stopPropagation(); moveBlock(b.id, 1); }} className="p-0.5 hover:text-primary"><ChevronDown className="h-3.5 w-3.5" /></button>
                  <button onClick={(e) => { e.stopPropagation(); removeBlock(b.id); }} className="p-0.5 hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            ))}
          </div>

          {/* Active block editor */}
          {activeBlock && CONTENT_FIELDS[activeBlock.block_type] && (
            <div className="border-t border-border p-3">
              <div className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Edit: {activeBlock.block_type}</div>
              <div className="space-y-3">
                {CONTENT_FIELDS[activeBlock.block_type].map(f => (
                  <div key={f.key}>
                    {f.type !== 'checkbox' && <label className="mb-1 block text-xs font-medium text-muted-foreground">{f.label}</label>}
                    {f.type === 'textarea' ? (
                      <textarea rows={3} value={activeBlock.content?.[f.key] ?? ''} onChange={e => updateContent(activeBlock.id, f.key, e.target.value)}
                        className="w-full rounded-lg border border-input bg-background px-2 py-1.5 text-xs outline-none focus:ring-1 focus:ring-ring" />
                    ) : f.type === 'checkbox' ? (
                      <label className="flex items-center gap-2 cursor-pointer mt-2">
                        <input type="checkbox" checked={activeBlock.content?.[f.key] === true || activeBlock.content?.[f.key] === 'true'} onChange={e => updateContent(activeBlock.id, f.key, e.target.checked)} className="h-4 w-4 rounded border-input" />
                        <span className="text-xs font-medium text-foreground">{f.label}</span>
                      </label>
                    ) : (
                      <input type="text" value={activeBlock.content?.[f.key] ?? ''} onChange={e => updateContent(activeBlock.id, f.key, e.target.value)}
                        className="w-full rounded-lg border border-input bg-background px-2 py-1.5 text-xs outline-none focus:ring-1 focus:ring-ring" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add block */}
          <div className="border-t border-border p-3">
            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Add Block</div>
            <div className="space-y-1">
              {BLOCK_TYPES.map(bt => (
                <button key={bt.type} onClick={() => addBlock(bt.type)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                  <Plus className="h-3.5 w-3.5 shrink-0" /> {bt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Preview */}
      <div className="ml-80 flex-1 overflow-auto bg-background">
        <div className="min-h-screen">
          <PageBlocks 
            blocks={blocks} 
            activeBlockId={activeId} 
            onBlockClick={id => setActiveId(id as any)}
            team_members={team_members}
            clients={clients}
            portfolios={portfolios}
            case_studies={case_studies}
            services={services}
            pricing_plans={pricing_plans}
          />
        </div>
      </div>
    </div>
  );
}
