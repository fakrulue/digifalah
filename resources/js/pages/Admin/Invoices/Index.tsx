import { AdminLayout } from '@/components/admin/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { Plus, Search, Eye, Trash2, CheckCircle2, Clock, AlertCircle, Pencil, Settings } from 'lucide-react';

export default function InvoicesIndex({ invoices, currency = '৳' }: { invoices: any[]; currency?: string }) {
  const deleteInvoice = (id: number) => {
    if (confirm('Delete this invoice?')) {
      router.delete(`/admin/invoices/${id}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid': return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700"><CheckCircle2 className="h-3 w-3" /> Paid</span>;
      case 'sent': return <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700"><Search className="h-3 w-3" /> Sent</span>;
      case 'overdue': return <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700"><AlertCircle className="h-3 w-3" /> Overdue</span>;
      default: return <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700"><Clock className="h-3 w-3" /> Draft</span>;
    }
  };

  return (
    <AdminLayout title="Invoices">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900">Invoices</h2>
            <p className="text-sm text-gray-500">Manage client billing and custom invoices.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/invoices/settings" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="h-4 w-4" /> Settings
            </Link>
            <Link href="/admin/invoices/create" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
              <Plus className="h-4 w-4" /> Create Invoice
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Invoice No.</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Issue Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">No invoices found.</td>
                </tr>
              ) : (
                invoices.map((invoice) => (
                  <tr key={invoice.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-gray-900">{invoice.invoice_number}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{invoice.client_name}</div>
                      <div className="text-xs text-gray-500">{invoice.client_email}</div>
                    </td>
                    <td className="px-6 py-4">{new Date(invoice.issue_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-bold">{currency}{parseFloat(invoice.total).toFixed(2)}</td>
                    <td className="px-6 py-4">{getStatusBadge(invoice.status)}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link href={`/admin/invoices/${invoice.id}`} className="inline-flex items-center justify-center rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 transition-colors">
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link href={`/admin/invoices/${invoice.id}/edit`} className="inline-flex items-center justify-center rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-500 hover:text-white transition-colors">
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button onClick={() => deleteInvoice(invoice.id)} className="inline-flex items-center justify-center rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-500 hover:text-white transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
