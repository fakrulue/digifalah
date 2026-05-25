import { AdminLayout } from '@/components/admin/AdminLayout';
import { MessageSquare, Phone, Mail, User } from 'lucide-react';

interface Lead { id: number; name: string; phone: string; email?: string; business_type?: string; message?: string; status: string; source?: string; created_at: string; }

export default function Leads({ leads }: { leads: Lead[] }) {
  return (
    <AdminLayout title="Leads">
      <p className="mb-6 text-muted-foreground">{leads.length} total leads</p>
      {leads.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-16 text-center">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <h2 className="mt-4 font-display text-2xl font-bold">No leads yet</h2>
          <p className="mt-2 text-muted-foreground">Leads from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map(l => (
            <div key={l.id} className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-semibold"><User className="h-4 w-4 text-primary" />{l.name}</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground"><Phone className="h-3.5 w-3.5" />{l.phone}</div>
                  {l.email && <div className="flex items-center gap-2 text-sm text-muted-foreground"><Mail className="h-3.5 w-3.5" />{l.email}</div>}
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <div className={`mb-1 inline-block rounded-full px-2 py-0.5 font-medium ${l.status === 'new' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>{l.status}</div>
                  <div>{l.created_at}</div>
                </div>
              </div>
              {l.message && <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">{l.message}</p>}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
