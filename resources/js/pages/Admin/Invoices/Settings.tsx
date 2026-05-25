import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save, Loader2, Building2, FileText, DollarSign, Palette } from 'lucide-react';

interface InvoiceSettings {
  company_name: string;
  company_address: string;
  company_email: string;
  company_phone: string;
  company_website: string;
  company_logo: string;
  invoice_prefix: string;
  invoice_footer: string;
  default_tax_rate: string;
  currency_symbol: string;
  payment_terms: string;
}

export default function InvoiceSettings({ settings }: { settings: InvoiceSettings }) {
  const { data, setData, post, processing } = useForm({ ...settings });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/invoices/settings');
  };

  const inputCls = 'w-full rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all';
  const labelCls = 'block mb-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground';

  return (
    <AdminLayout title="Invoice Settings">
      <div className="mx-auto max-w-4xl pb-20 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/invoices" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Invoices
            </Link>
          </div>
          <Link href="/admin/invoices/create" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90">
            New Invoice
          </Link>
        </div>

        <div>
          <h1 className="font-display text-2xl font-bold">Invoice Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure your company information and invoice defaults. These appear on all generated invoices.</p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">

              {/* Company Information */}
              <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-lg font-bold">Company Information</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className={labelCls}>Company Name *</label>
                    <input type="text" value={data.company_name} onChange={e => setData('company_name', e.target.value)} className={inputCls} placeholder="e.g. DigiFalah" />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelCls}>Email</label>
                    <input type="email" value={data.company_email} onChange={e => setData('company_email', e.target.value)} className={inputCls} placeholder="billing@yourcompany.com" />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelCls}>Phone</label>
                    <input type="text" value={data.company_phone} onChange={e => setData('company_phone', e.target.value)} className={inputCls} placeholder="+880 1700 000000" />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelCls}>Website</label>
                    <input type="text" value={data.company_website} onChange={e => setData('company_website', e.target.value)} className={inputCls} placeholder="https://digifalah.com" />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelCls}>Logo URL</label>
                    <input type="text" value={data.company_logo} onChange={e => setData('company_logo', e.target.value)} className={inputCls} placeholder="https://..." />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className={labelCls}>Address</label>
                    <textarea rows={3} value={data.company_address} onChange={e => setData('company_address', e.target.value)} className={inputCls} placeholder="123 Main Street&#10;Dhaka, Bangladesh" />
                  </div>
                </div>
              </div>

              {/* Invoice Defaults */}
              <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-lg font-bold">Invoice Defaults</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className={labelCls}>Invoice Number Prefix</label>
                    <input type="text" value={data.invoice_prefix} onChange={e => setData('invoice_prefix', e.target.value)} className={inputCls} placeholder="INV-" />
                    <p className="text-[11px] text-muted-foreground">Used when auto-generating invoice numbers</p>
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelCls}>Default Tax Rate (%)</label>
                    <input type="number" min="0" max="100" step="0.1" value={data.default_tax_rate} onChange={e => setData('default_tax_rate', e.target.value)} className={inputCls} placeholder="0" />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelCls}>Currency Symbol</label>
                    <input type="text" value={data.currency_symbol} onChange={e => setData('currency_symbol', e.target.value)} className={inputCls} placeholder="৳" />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelCls}>Payment Terms</label>
                    <input type="text" value={data.payment_terms} onChange={e => setData('payment_terms', e.target.value)} className={inputCls} placeholder="e.g. Net 30 days" />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className={labelCls}>Invoice Footer / Notes</label>
                    <textarea rows={3} value={data.invoice_footer} onChange={e => setData('invoice_footer', e.target.value)} className={inputCls} placeholder="Thank you for your business! Payment via bKash, Nagad, or bank transfer." />
                  </div>
                </div>
              </div>
            </div>

            {/* Preview sidebar */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <h3 className="font-display text-base font-bold mb-4">Preview</h3>
                <div className="rounded-2xl border border-gray-100 bg-white p-5 text-sm shadow-inner">
                  {data.company_logo && (
                    <img src={data.company_logo} alt="Logo" className="h-10 mb-3 object-contain" />
                  )}
                  <div className="font-bold text-gray-900 text-base">{data.company_name || 'Your Company'}</div>
                  {data.company_address && <div className="text-gray-500 text-xs mt-1 whitespace-pre-wrap">{data.company_address}</div>}
                  {data.company_email && <div className="text-gray-500 text-xs mt-1">{data.company_email}</div>}
                  {data.company_phone && <div className="text-gray-500 text-xs">{data.company_phone}</div>}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Sample Invoice No.</div>
                    <div className="font-bold text-gray-700">{data.invoice_prefix || 'INV-'}XXXXXX</div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 text-[11px] text-gray-400">
                    {data.invoice_footer || 'Thank you for your business!'}
                  </div>
                </div>
              </div>

              <button type="submit" disabled={processing}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-emerald-600 px-6 py-4 font-bold text-white shadow-lg shadow-primary/30 hover:opacity-90 disabled:opacity-60 transition-all">
                {processing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                Save Settings
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
