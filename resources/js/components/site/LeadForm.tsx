import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Loader2, Send } from "lucide-react";

export function LeadForm({ source = "website" }: { source?: string }) {
  const { data, setData, post, processing, reset, wasSuccessful } = useForm({
    name: "",
    phone: "",
    email: "",
    business_type: "",
    message: "",
    source: source,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/leads', {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };

  const BUSINESS_TYPES = [
    "E-commerce",
    "Restaurant / Food",
    "Real Estate",
    "Education",
    "Healthcare",
    "Fashion / Retail",
    "B2B Services",
    "Other",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {wasSuccessful && (
        <div className="rounded-lg bg-emerald-500/10 p-4 text-sm font-medium text-emerald-600">
          Thanks! We'll be in touch within 24 hours.
        </div>
      )}
      
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Your name *</label>
          <input required type="text" value={data.name} onChange={e => setData('name', e.target.value)}
            placeholder="Rahim Khan" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone *</label>
          <input required type="tel" value={data.phone} onChange={e => setData('phone', e.target.value)}
            placeholder="+880 17XX XXXXXX" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email (optional)</label>
          <input type="email" value={data.email} onChange={e => setData('email', e.target.value)}
            placeholder="you@business.com" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Business type</label>
          <select value={data.business_type} onChange={e => setData('business_type', e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20">
            <option value="">Select</option>
            {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">How can we help?</label>
        <textarea rows={4} value={data.message} onChange={e => setData('message', e.target.value)}
          placeholder="Tell us about your goals…" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
      </div>

      <button type="submit" disabled={processing}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-emerald py-3 font-semibold text-primary-foreground shadow-soft hover:opacity-95 disabled:opacity-50">
        {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Get My Free Audit
      </button>
    </form>
  );
}
