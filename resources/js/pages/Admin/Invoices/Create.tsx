import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Plus, Trash2, Save, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function InvoiceCreate({ next_invoice_number, settings }: { next_invoice_number: string; settings?: any }) {
  const { data, setData, post, processing, errors } = useForm({
    invoice_number: next_invoice_number,
    client_name: '',
    client_email: '',
    client_address: '',
    issue_date: new Date().toISOString().split('T')[0],
    due_date: '',
    status: 'draft',
    tax_rate: 0,
    notes: '',
    items: [{ description: '', quantity: 1, unit_price: 0 }]
  });

  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const sum = data.items.reduce((acc, item) => acc + (item.quantity * item.unit_price), 0);
    setSubtotal(sum);
  }, [data.items]);

  const taxAmount = subtotal * (data.tax_rate / 100);
  const total = subtotal + taxAmount;

  const addItem = () => setData('items', [...data.items, { description: '', quantity: 1, unit_price: 0 }]);
  const removeItem = (index: number) => {
    const newItems = [...data.items];
    newItems.splice(index, 1);
    setData('items', newItems);
  };
  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...data.items];
    (newItems[index] as any)[field] = value;
    setData('items', newItems);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/invoices');
  };

  return (
    <AdminLayout title="Create Invoice">
      <div className="mx-auto max-w-5xl pb-20 space-y-6">
        <Link href="/admin/invoices" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" /> Back to Invoices
        </Link>

        <form onSubmit={submit} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                <h3 className="mb-6 font-display text-lg font-bold">Client Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Client Name *</label>
                    <input type="text" required value={data.client_name} onChange={e => setData('client_name', e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20" />
                    {errors.client_name && <div className="text-red-500 text-xs">{errors.client_name}</div>}
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Client Email *</label>
                    <input type="email" required value={data.client_email} onChange={e => setData('client_email', e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20" />
                    {errors.client_email && <div className="text-red-500 text-xs">{errors.client_email}</div>}
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Client Address</label>
                    <textarea rows={2} value={data.client_address} onChange={e => setData('client_address', e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"></textarea>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold">Invoice Items</h3>
                  <button type="button" onClick={addItem} className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/20">
                    <Plus className="h-3 w-3" /> Add Item
                  </button>
                </div>

                <div className="space-y-3">
                  {data.items.map((item, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="flex-1 space-y-1">
                        <input type="text" required placeholder="Description" value={item.description} onChange={e => updateItem(index, 'description', e.target.value)} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div className="w-24 space-y-1">
                        <input type="number" required min="1" placeholder="Qty" value={item.quantity} onChange={e => updateItem(index, 'quantity', parseInt(e.target.value) || 0)} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div className="w-32 space-y-1">
                        <input type="number" required min="0" step="0.01" placeholder="Price" value={item.unit_price} onChange={e => updateItem(index, 'unit_price', parseFloat(e.target.value) || 0)} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div className="w-24 pt-2 text-right font-semibold text-sm">
                        {settings?.currency_symbol ?? '৳'}{(item.quantity * item.unit_price).toFixed(2)}
                      </div>
                      <button type="button" onClick={() => removeItem(index)} className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-50" disabled={data.items.length === 1}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {errors.items && <div className="text-red-500 text-xs">{errors.items}</div>}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-display text-lg font-bold">Details</h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Invoice No.</label>
                    <input type="text" required value={data.invoice_number} onChange={e => setData('invoice_number', e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                    {errors.invoice_number && <div className="text-red-500 text-xs">{errors.invoice_number}</div>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Issue Date</label>
                    <input type="date" required value={data.issue_date} onChange={e => setData('issue_date', e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Due Date</label>
                    <input type="date" value={data.due_date} onChange={e => setData('due_date', e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Status</label>
                    <select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20">
                      <option value="draft">Draft</option>
                      <option value="sent">Sent</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold">{settings?.currency_symbol ?? '৳'}{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Tax Rate (%)</span>
                  <input type="number" min="0" max="100" step="0.1" value={data.tax_rate} onChange={e => setData('tax_rate', parseFloat(e.target.value) || 0)} className="w-20 rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-right outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax Amount</span>
                  <span className="font-semibold">{settings?.currency_symbol ?? '৳'}{taxAmount.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-primary">{settings?.currency_symbol ?? '৳'}{total.toFixed(2)}</span>
                </div>
              </div>

              <button type="submit" disabled={processing} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-emerald-600 px-6 py-4 font-bold text-white shadow-lg shadow-primary/30 hover:opacity-90 disabled:opacity-60 transition-all">
                {processing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />} Save Invoice
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
