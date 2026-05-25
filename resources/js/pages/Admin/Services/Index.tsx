import { AdminLayout } from '@/components/admin/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { Plus, Edit2, Trash2, Layout, CheckCircle, XCircle } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  short_line: string;
  is_active: boolean;
}

export default function ServicesIndex({ services }: { services: Service[] }) {
  const deleteService = (id: number) => {
    if (confirm('Are you sure you want to delete this service?')) {
      router.delete(`/admin/services/${id}`);
    }
  };

  return (
    <AdminLayout title="Services Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900">Our Services</h2>
            <p className="text-sm text-gray-500">Manage the elite services offered by DigiFalah.</p>
          </div>
          <Link href="/admin/services/new" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
            <Plus className="h-4 w-4" /> Add New Service
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.id} className="group relative rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Layout className="h-6 w-6" />
                </div>
                {s.is_active ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-[10px] font-bold text-green-600 uppercase tracking-widest border border-green-100">
                    <CheckCircle className="h-3 w-3" /> Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600 uppercase tracking-widest border border-red-100">
                    <XCircle className="h-3 w-3" /> Inactive
                  </span>
                )}
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-1">{s.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-6">{s.short_line}</p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <Link href={`/admin/services/${s.id}/edit`} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-50 px-4 py-2 text-xs font-bold text-gray-600 transition-all hover:bg-primary hover:text-white">
                  <Edit2 className="h-3.5 w-3.5" /> Edit
                </Link>
                <button onClick={() => deleteService(s.id)} className="inline-flex items-center justify-center h-8 w-8 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all">
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
