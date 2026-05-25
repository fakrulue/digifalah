import { AdminLayout } from '@/components/admin/AdminLayout';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Printer, Pencil } from 'lucide-react';

export default function InvoiceShow({ invoice, settings }: { invoice: any; settings: any }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <AdminLayout title="View Invoice">
      <div className="mx-auto max-w-4xl pb-20 space-y-6">
        <div className="flex items-center justify-between print:hidden">
          <Link href="/admin/invoices" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" /> Back to Invoices
          </Link>
          <div className="flex gap-3">
            <Link href={`/admin/invoices/${invoice.id}/edit`} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              <Pencil className="h-4 w-4" /> Edit
            </Link>
            <button onClick={handlePrint} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              <Printer className="h-4 w-4" /> Print
            </button>
          </div>
        </div>

        {/* Invoice Printable Area */}
        <div className="rounded-3xl border border-gray-100 bg-white p-12 shadow-sm print:m-0 print:border-none print:shadow-none print:p-0">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b border-gray-100 pb-8">
            <div>
              <h1 className="font-display text-4xl font-bold text-gray-900 tracking-tight">INVOICE</h1>
              <p className="mt-2 text-gray-500 font-medium">#{invoice.invoice_number}</p>
            </div>
            <div className="text-right">
              {settings?.company_logo && (
                <img src={settings.company_logo} alt={settings.company_name} className="h-10 ml-auto mb-2 object-contain" />
              )}
              <div className="font-display text-xl font-bold text-primary">{settings?.company_name || 'DigiFalah'}</div>
              {settings?.company_address && <p className="text-sm text-gray-500 mt-1 whitespace-pre-wrap">{settings.company_address}</p>}
              {settings?.company_email && <p className="text-sm text-gray-500 mt-1">{settings.company_email}</p>}
              {settings?.company_phone && <p className="text-sm text-gray-500">{settings.company_phone}</p>}
            </div>
          </div>

          {/* Client & Dates */}
          <div className="grid grid-cols-2 gap-12 mt-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Billed To</h3>
              <p className="font-bold text-gray-900 text-lg">{invoice.client_name}</p>
              <p className="text-gray-500">{invoice.client_email}</p>
              {invoice.client_address && <p className="text-gray-500 mt-1 whitespace-pre-wrap">{invoice.client_address}</p>}
            </div>
            <div className="text-right space-y-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Issue Date</h3>
                <p className="font-semibold text-gray-900">{new Date(invoice.issue_date).toLocaleDateString()}</p>
              </div>
              {invoice.due_date && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Due Date</h3>
                  <p className="font-semibold text-gray-900">{new Date(invoice.due_date).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="mt-12">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Description</th>
                  <th className="px-4 py-3 text-right">Qty</th>
                  <th className="px-4 py-3 text-right">Unit Price</th>
                  <th className="px-4 py-3 text-right rounded-r-lg">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {invoice.items.map((item: any, i: number) => (
                  <tr key={i}>
                    <td className="px-4 py-4 font-medium text-gray-900">{item.description}</td>
                    <td className="px-4 py-4 text-right text-gray-600">{item.quantity}</td>
                    <td className="px-4 py-4 text-right text-gray-600">{settings?.currency_symbol ?? '৳'}{parseFloat(item.unit_price).toFixed(2)}</td>
                    <td className="px-4 py-4 text-right font-bold text-gray-900">{settings?.currency_symbol ?? '৳'}{parseFloat(item.total).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mt-8 flex justify-end">
            <div className="w-64 space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">{settings?.currency_symbol ?? '৳'}{parseFloat(invoice.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax ({parseFloat(invoice.tax_rate)}%)</span>
                <span className="font-semibold">{settings?.currency_symbol ?? '৳'}{parseFloat(invoice.tax_amount).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                <span className="font-bold text-gray-900">Total Due</span>
                <span className="font-display text-2xl font-bold text-primary">{settings?.currency_symbol ?? '৳'}{parseFloat(invoice.total).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="mt-12 border-t border-gray-100 pt-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Notes</h3>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{invoice.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-16 text-center text-sm text-gray-400">
            {settings?.invoice_footer || 'Thank you for doing business with us!'}
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .bg-primary { background-color: #047857 !important; color: white !important; }
          .text-primary { color: #047857 !important; }
        }
      `}} />
    </AdminLayout>
  );
}
