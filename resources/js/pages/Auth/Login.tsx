import { useForm, Link, usePage } from '@inertiajs/react';
import { Sparkles, Loader2 } from 'lucide-react';

export default function Login() {
  const { errors } = usePage<{ errors: Record<string, string> }>().props;
  const signinForm = useForm({ email: '', password: '' });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2 text-primary-foreground">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-gold">
            <Sparkles className="h-5 w-5 text-emerald-deep" />
          </div>
          <span className="font-display text-2xl font-bold">
            DigiFalah<span className="text-gold">.</span>
          </span>
        </Link>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-elegant">
          <div className="mb-8 text-center">
            <h1 className="font-display text-2xl font-bold">Admin Login</h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to manage your website.</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); signinForm.post('/login'); }} className="space-y-4">
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <input type="email" required placeholder="admin@digifalah.com" value={signinForm.data.email}
                onChange={e => signinForm.setData('email', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <input type="password" required value={signinForm.data.password}
                onChange={e => signinForm.setData('password', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button type="submit" disabled={signinForm.processing}
              className="flex w-full items-center justify-center rounded-lg bg-gradient-emerald px-4 py-2 font-semibold text-primary-foreground shadow-soft hover:opacity-90 disabled:opacity-60">
              {signinForm.processing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in…</> : 'Sign in'}
            </button>
          </form>
        </div>

        <Link href="/" className="mt-6 block text-center text-sm text-primary-foreground/70 hover:text-gold">
          ← Back to website
        </Link>
      </div>
    </div>
  );
}
