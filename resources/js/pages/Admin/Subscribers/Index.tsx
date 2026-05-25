import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Trash2, Mail, Download, Users } from 'lucide-react';

interface Subscriber {
  id: number;
  email: string;
  created_at: string;
}

export default function SubscriberIndex({ subscribers }: { subscribers: Subscriber[] }) {
  const deleteForm = useForm({});

  const removeSubscriber = (id: number) => {
    if (confirm('Are you sure you want to remove this subscriber?')) {
      deleteForm.delete(`/admin/subscribers/${id}`);
    }
  };

  const exportCSV = () => {
    const headers = ['Email', 'Subscribed At'];
    const rows = subscribers.map(s => [s.email, s.created_at]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "subscribers_list.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout title="Email Subscribers">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Users className="h-5 w-5" />
          <span>{subscribers.length} total subscribers</span>
        </div>
        <button 
          onClick={exportCSV}
          className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted transition-all"
        >
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Joined On</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {subscribers.map(s => (
              <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Mail className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-foreground">{s.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(s.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => removeSubscriber(s.id)}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-20 text-center">
                  <Mail className="mx-auto h-12 w-12 text-muted-foreground/20" />
                  <h3 className="mt-4 text-lg font-bold">No subscribers yet</h3>
                  <p className="text-sm text-muted-foreground">Your email list will grow as users sign up on your blog.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
