import { AdminLayout } from '@/components/admin/AdminLayout';
import { Activity, Eye, Users, Smartphone, Globe, History, Monitor, Tablet, Globe2, ArrowUpRight, Clock, Shield } from 'lucide-react';
import React from 'react';

interface Stats {
  today_visits: number;
  total_visits: number;
  unique_visitors: number;
  top_pages: { url: string; count: number }[];
  devices: { device: string; count: number }[];
  browsers: { browser: string; count: number }[];
  platforms: { platform: string; count: number }[];
  recent_visits: any[];
  daily_stats: { date: string; count: number }[];
}

export default function AnalyticsIndex({ stats }: { stats: Stats }) {
  const maxDaily = Math.max(...stats.daily_stats.map(d => d.count), 1);

  return (
    <AdminLayout title="Visitor Analytics">
      <div className="space-y-6">
        
        {/* Main Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-3 text-primary mb-1">
              <Eye className="h-5 w-5" />
              <span className="text-sm font-medium text-muted-foreground">Today's Page Views</span>
            </div>
            <div className="text-2xl font-bold">{stats.today_visits.toLocaleString()}</div>
            <div className="mt-2 text-xs text-emerald-500 font-medium">Real-time tracking active</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-3 text-emerald-500 mb-1">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium text-muted-foreground">Unique Visitors</span>
            </div>
            <div className="text-2xl font-bold">{stats.unique_visitors.toLocaleString()}</div>
            <div className="mt-2 text-xs text-muted-foreground">Based on unique IP addresses</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-3 text-blue-500 mb-1">
              <Activity className="h-5 w-5" />
              <span className="text-sm font-medium text-muted-foreground">Total Page Views</span>
            </div>
            <div className="text-2xl font-bold">{stats.total_visits.toLocaleString()}</div>
            <div className="mt-2 text-xs text-muted-foreground">All-time traffic history</div>
          </div>
        </div>

        {/* Traffic Chart (Simple Bar Visualization) */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-display font-bold mb-6 flex items-center gap-2">
             <Activity className="h-5 w-5 text-primary" /> Traffic Trends (Last 14 Days)
          </h3>
          <div className="flex items-end gap-2 h-32 w-full">
            {stats.daily_stats.map((d, i) => (
              <div key={i} className="flex-1 group relative">
                <div 
                  className="bg-primary/20 hover:bg-primary/40 rounded-t transition-all cursor-help"
                  style={{ height: `${(d.count / maxDaily) * 100}%` }}
                />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-10">
                  {d.date}: {d.count} visits
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-muted-foreground uppercase font-bold px-1">
             <span>{stats.daily_stats[0]?.date}</span>
             <span>Last 14 Days</span>
             <span>Today</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Pages */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
            <div className="p-4 bg-muted/50 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Globe className="h-4 w-4" /> Top Content
              </h3>
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Views</span>
            </div>
            <div className="divide-y divide-border">
              {stats.top_pages.map((p, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground w-4">#{i+1}</span>
                      {p.url.replace(window.location.origin, '') || '/'}
                    </div>
                  </div>
                  <div className="text-sm font-bold ml-4">{p.count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Device & Tech */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <Smartphone className="h-4 w-4" /> Device Breakdown
              </h3>
              <div className="space-y-4">
                {stats.devices.map((d, i) => {
                    const Icon = d.device === 'mobile' ? Smartphone : d.device === 'tablet' ? Tablet : Monitor;
                    const total = stats.devices.reduce((acc, curr) => acc + curr.count, 0);
                    const percent = Math.round((d.count / total) * 100);
                    return (
                        <div key={i} className="space-y-1">
                            <div className="flex items-center justify-between text-xs font-medium">
                                <span className="flex items-center gap-2 capitalize"><Icon className="h-3 w-3" /> {d.device}</span>
                                <span>{percent}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: `${percent}%` }} />
                            </div>
                        </div>
                    );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <Globe2 className="h-4 w-4" /> Browser & OS
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Browsers</span>
                    {stats.browsers.slice(0, 5).map((b, i) => (
                        <div key={i} className="text-xs flex items-center justify-between">
                            <span className="truncate">{b.browser}</span>
                            <span className="font-bold">{b.count}</span>
                        </div>
                    ))}
                </div>
                <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Operating Systems</span>
                    {stats.platforms.slice(0, 5).map((p, i) => (
                        <div key={i} className="text-xs flex items-center justify-between">
                            <span className="truncate">{p.platform}</span>
                            <span className="font-bold">{p.count}</span>
                        </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Traffic Log */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
          <div className="p-4 bg-muted/50 border-b border-border flex items-center justify-between">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <History className="h-4 w-4" /> Real-time Traffic Feed
            </h3>
            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-500">
               <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase text-muted-foreground">Visitor Info</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase text-muted-foreground">Page / Referrer</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase text-muted-foreground text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {stats.recent_visits.map((v, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-xs font-bold">
                           <Shield className="h-3 w-3 text-slate-400" /> {v.ip.substring(0, 15)}...
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-1 flex items-center gap-2">
                           {v.device} • {v.browser} • {v.platform}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col max-w-xs">
                        <span className="text-xs font-medium truncate text-primary">{v.url.replace(window.location.origin, '') || '/'}</span>
                        {v.referer && (
                           <span className="text-[10px] text-muted-foreground truncate mt-0.5">from: {v.referer.replace('https://', '').replace('http://', '')}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs text-muted-foreground whitespace-nowrap">
                       <div className="flex items-center justify-end gap-1.5">
                          <Clock className="h-3 w-3" /> {v.time_formatted || new Date(v.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
