import { AdminLayout } from '@/components/admin/AdminLayout';
import { router } from '@inertiajs/react';
import { Users, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function UsersIndex({ users }: { users: any[] }) {
  const [roleInput, setRoleInput] = useState<{ [key: number]: string }>({});

  const assignRole = (userId: number, role: string) => {
    if (!role) return;
    router.post(`/admin/users/${userId}/role`, { role }, {
      preserveScroll: true,
      onSuccess: () => setRoleInput({ ...roleInput, [userId]: '' })
    });
  };

  return (
    <AdminLayout title="User Management">
      <div className="mx-auto max-w-6xl space-y-6">
        
        <div className="flex items-center gap-2 text-primary">
          <Users className="h-6 w-6" />
          <h2 className="font-display text-2xl font-bold">Manage Users</h2>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">User</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Email</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Current Roles</th>
                <th className="px-6 py-4 text-right font-semibold uppercase tracking-wider text-xs">Assign Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-foreground">{user.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 flex-wrap">
                      {user.roles && user.roles.length > 0 ? (
                        user.roles.map((r: any) => (
                          <span key={r.id} className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                            <ShieldCheck className="h-3 w-3" /> {r.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground">No role</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <input 
                        type="text" 
                        placeholder="Role name..." 
                        value={roleInput[user.id] || ''}
                        onChange={e => setRoleInput({ ...roleInput, [user.id]: e.target.value })}
                        className="w-32 rounded-lg border border-input bg-background px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      <button 
                        onClick={() => assignRole(user.id, roleInput[user.id])}
                        disabled={!roleInput[user.id]}
                        className="rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground disabled:opacity-50"
                      >
                        Assign
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
}
