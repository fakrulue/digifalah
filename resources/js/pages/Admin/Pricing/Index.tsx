import { AdminLayout } from '@/components/admin/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { Plus, Edit2, Trash2, CreditCard, CheckCircle, XCircle, Star } from 'lucide-react';

interface Plan {
  id: number;
  name: string;
  price: string;
  period: string;
  highlight: boolean;
  is_active: boolean;
}

export default function PricingIndex({ plans }: { plans: Plan[] }) {
  const deletePlan = (id: number) => {
    if (confirm('Are you sure you want to delete this pricing plan?')) {
      router.delete(`/admin/pricing/${id}`);
    }
  };

  return (
    <AdminLayout title="Pricing Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900">Pricing Tiers</h2>
            <p className="text-sm text-gray-500">Manage the elite investment plans for your clients.</p>
          </div>
          <Link href="/admin/pricing/new" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
            <Plus className="h-4 w-4" /> Add New Plan
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => (
            <div key={p.id} className={`group relative rounded-3xl border p-6 shadow-sm transition-all hover:shadow-xl ${p.highlight ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-100 bg-white'}`}>
              <div className="mb-4 flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${p.highlight ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-primary/10 text-primary'}`}>
                  <CreditCard className="h-6 w-6" />
                </div>
                <div className="flex gap-2">
                  {p.highlight && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gold/10 px-2 py-1 text-[10px] font-bold text-gold uppercase tracking-widest border border-gold/20">
                      <Star className="h-3 w-3 fill-current" /> Popular
                    </span>
                  )}
                  {p.is_active ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-[10px] font-bold text-green-600 uppercase tracking-widest border border-green-100">
                      <CheckCircle className="h-3 w-3" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600 uppercase tracking-widest border border-red-100">
                      <XCircle className="h-3 w-3" /> Inactive
                    </span>
                  )}
                </div>
              </div>
              
              <h3 className="font-display text-lg font-bold text-gray-900 mb-1">{p.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-gray-900">{p.price}</span>
                <span className="text-sm text-gray-500 font-medium">{p.period}</span>
              </div>
              
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <Link href={`/admin/pricing/${p.id}/edit`} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-50 px-4 py-2 text-xs font-bold text-gray-600 transition-all hover:bg-primary hover:text-white">
                  <Edit2 className="h-3.5 w-3.5" /> Edit
                </Link>
                <button onClick={() => deletePlan(p.id)} className="inline-flex items-center justify-center h-8 w-8 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
