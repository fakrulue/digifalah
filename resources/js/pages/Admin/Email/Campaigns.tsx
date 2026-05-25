import { AdminLayout } from '@/components/admin/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { Plus, Send, Trash2, Calendar, Users, Mail, Settings } from 'lucide-react';

interface Campaign {
  id: number;
  title: string;
  subject: string;
  status: 'draft' | 'sent';
  sent_at: string | null;
  total_sent: number;
}

export default function Campaigns({ campaigns }: { campaigns: Campaign[] }) {
  const sendCampaign = (id: number) => {
    if (confirm('Are you sure you want to send this campaign to all subscribers?')) {
      router.post(`/admin/email/campaigns/${id}/send`);
    }
  };

  const deleteCampaign = (id: number) => {
    if (confirm('Delete this campaign?')) {
      router.delete(`/admin/email/campaigns/${id}`);
    }
  };

  return (
    <AdminLayout title="Email Marketing">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900">Campaigns</h2>
            <p className="text-sm text-gray-500">Create and send professional promotional emails to your audience.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/email/settings" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-600 transition-all hover:bg-gray-50">
              <Settings className="h-4 w-4" /> Settings
            </Link>
            <Link href="/admin/email/campaigns/new" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
              <Plus className="h-4 w-4" /> New Campaign
            </Link>
          </div>
        </div>

        <div className="grid gap-6">
          {campaigns.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 text-gray-400 mb-4">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No campaigns yet</h3>
              <p className="text-sm text-gray-500 max-w-xs mx-auto">Start your first marketing campaign to engage with your subscribers.</p>
              <Link href="/admin/email/campaigns/new" className="mt-6 text-sm font-bold text-primary hover:underline">Create Campaign →</Link>
            </div>
          ) : (
            campaigns.map((c) => (
              <div key={c.id} className="group relative flex items-center justify-between rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-6">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${c.status === 'sent' ? 'bg-green-50 text-green-600' : 'bg-primary/10 text-primary'}`}>
                    {c.status === 'sent' ? <Send className="h-6 w-6" /> : <Mail className="h-6 w-6" />}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-gray-900">{c.title}</h3>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" /> {c.total_sent} sent
                      </div>
                      {c.sent_at && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" /> {new Date(c.sent_at).toLocaleDateString()}
                        </div>
                      )}
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${c.status === 'sent' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {c.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {c.status === 'draft' && (
                    <button onClick={() => sendCampaign(c.id)} className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-600 transition-all hover:bg-emerald-600 hover:text-white">
                      <Send className="h-3.5 w-3.5" /> Send Now
                    </button>
                  )}
                  <button onClick={() => deleteCampaign(c.id)} className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
