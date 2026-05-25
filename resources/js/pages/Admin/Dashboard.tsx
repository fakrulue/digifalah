import { AdminLayout } from '@/components/admin/AdminLayout';
import { FileText, MessageSquare, Image, TrendingUp, Eye, Users } from 'lucide-react';

interface Stats { 
  posts: number; 
  leads: number; 
  media: number; 
  published: number; 
  visits_today: number; 
  visitors_total: number;
}

export default function Dashboard({ stats }: { stats: Stats }) {
  const cards = [
    { label: 'Today\'s Visits', value: stats.visits_today, icon: Eye, sub: 'Real-time views' },
    { label: 'Total Visitors', value: stats.visitors_total, icon: Users, sub: 'Unique users' },
    { label: 'Blog Posts', value: stats.posts, icon: FileText, sub: `${stats.published} published` },
    { label: 'Leads', value: stats.leads, icon: MessageSquare, sub: 'Total inquiries' },
  ];
  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map(c => (
          <div key={c.label} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">{c.label}</div>
              <c.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-3 font-display text-4xl font-bold">{c.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{c.sub}</div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
