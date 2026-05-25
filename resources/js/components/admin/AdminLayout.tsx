import { Link, useForm, usePage, Head } from '@inertiajs/react';
import { LayoutDashboard, Activity, FileText, MessageSquare, Image, Settings, Search, Sparkles, LogOut, PenSquare, MessageCircle, Users, User, Target, Layout, CreditCard, Mail, Receipt, Globe, Shield, Menu, X, BookOpen, TerminalSquare } from 'lucide-react';
import React, { ReactNode, useState, useEffect } from 'react';

const MENU = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/analytics', label: 'Visitor Analytics', icon: Activity },
  { href: '/admin/builder', label: 'Visual Builder', icon: PenSquare },
  { href: '/admin/blog/new', label: 'AI Writer', icon: Sparkles },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/blog-comments', label: 'Comments', icon: MessageCircle },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Users },
  { href: '/admin/leads', label: 'Leads', icon: MessageSquare },
  { href: '/admin/email/campaigns', label: 'Email Marketing', icon: Mail },
  { href: '/admin/invoices', label: 'Invoices', icon: Receipt },
  { href: '/admin/pricing', label: 'Pricing', icon: CreditCard },
  { href: '/admin/services', label: 'Services', icon: Layout },
  { href: '/admin/team', label: 'Team Members', icon: Users },
  { href: '/admin/clients', label: 'Clients', icon: Globe },
  { href: '/admin/portfolio', label: 'Portfolio', icon: Layout },
  { href: '/admin/case-studies', label: 'Work Studies', icon: BookOpen },
  { href: '/admin/media', label: 'Media', icon: Image },
  { href: '/admin/seo', label: 'SEO Settings', icon: Search },
  { href: '/admin/seo/keywords', label: 'Keyword Tracker', icon: Target },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/roles', label: 'Roles', icon: Shield },
  { href: '/admin/profile', label: 'Profile Settings', icon: User },
  { href: '/admin/settings/website', label: 'Website Settings', icon: Globe },
  { href: '/admin/settings/panel', label: 'Panel Settings', icon: Settings },
  { href: '/admin/terminal', label: 'Server Terminal', icon: TerminalSquare },
];

export function AdminLayout({ children, title }: { children: ReactNode; title?: string }) {
  const logoutForm = useForm({});
  const { settings, url } = usePage().props as { settings?: Record<string, any>, url: string };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const panelName = settings?.panel_name || 'DigiFalah';
  const siteIcon = settings?.site_icon;
  const displayTitle = title ? `${title} - ${panelName}` : (settings?.panel_title || 'Admin Dashboard');

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [url]);

  return (
    <div className="flex min-h-screen bg-background">
      <Head title={displayTitle} />
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between gap-2.5 px-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            {siteIcon ? (
              <img src={siteIcon} alt="Icon" className="h-8 w-8 rounded-lg object-cover" />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-gold">
                <Sparkles className="h-4 w-4 text-emerald-deep" />
              </div>
            )}
            <span className="font-display text-lg font-bold">{panelName}</span>
          </div>
          <button className="lg:hidden p-1 text-sidebar-foreground/50 hover:text-sidebar-foreground" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto custom-scrollbar">
          {MENU.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${url === href ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'}`}>
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-sidebar-border p-4">
          <form onSubmit={e => { e.preventDefault(); logoutForm.post('/logout'); }}>
            <button type="submit" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:ml-64 transition-all duration-300">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 md:px-6 backdrop-blur">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-foreground/70 hover:bg-accent rounded-lg" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="font-display text-lg md:text-xl font-bold truncate max-w-[200px] md:max-w-none">
              {title || settings?.panel_title || 'Admin Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 md:px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
              <Globe className="h-4 w-4" /> <span className="hidden md:inline">Visit Site</span>
            </a>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
