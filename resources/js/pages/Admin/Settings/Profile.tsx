import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import { User, Lock, Mail, ShieldCheck } from 'lucide-react';
import React from 'react';

export default function Profile() {
  const user = usePage().props.auth.user as any;

  const profileForm = useForm({
    name: user.name,
    email: user.email,
  });

  const passwordForm = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const updateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    profileForm.post('/admin/profile');
  };

  const updatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    passwordForm.post('/admin/profile/password', {
      onSuccess: () => passwordForm.reset(),
    });
  };

  return (
    <AdminLayout title="User Profile Settings">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Profile Information */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-2 text-primary mb-6">
            <User className="h-5 w-5" />
            <h2 className="font-display text-lg font-bold">Profile Information</h2>
          </div>
          
          <form onSubmit={updateProfile} className="space-y-4 max-w-md">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="text" value={profileForm.data.name} onChange={e => profileForm.setData('name', e.target.value)}
                  className="w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              {profileForm.errors.name && <p className="mt-1 text-xs text-red-500">{profileForm.errors.name}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="email" value={profileForm.data.email} onChange={e => profileForm.setData('email', e.target.value)}
                  className="w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              {profileForm.errors.email && <p className="mt-1 text-xs text-red-500">{profileForm.errors.email}</p>}
            </div>

            <button type="submit" disabled={profileForm.processing} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
              Save Changes
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-2 text-primary mb-6">
            <Lock className="h-5 w-5" />
            <h2 className="font-display text-lg font-bold">Change Password</h2>
          </div>
          
          <form onSubmit={updatePassword} className="space-y-4 max-w-md">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Current Password</label>
              <input type="password" value={passwordForm.data.current_password} onChange={e => passwordForm.setData('current_password', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
              {passwordForm.errors.current_password && <p className="mt-1 text-xs text-red-500">{passwordForm.errors.current_password}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">New Password</label>
              <input type="password" value={passwordForm.data.password} onChange={e => passwordForm.setData('password', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
              {passwordForm.errors.password && <p className="mt-1 text-xs text-red-500">{passwordForm.errors.password}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Confirm Password</label>
              <input type="password" value={passwordForm.data.password_confirmation} onChange={e => passwordForm.setData('password_confirmation', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>

            <button type="submit" disabled={passwordForm.processing} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
              Update Password
            </button>
          </form>
        </div>

      </div>
    </AdminLayout>
  );
}
