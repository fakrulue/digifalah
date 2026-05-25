import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm, router } from '@inertiajs/react';
import { Shield, Plus, Trash2, CheckSquare, Square } from 'lucide-react';
import React, { useState } from 'react';

export default function RolesIndex({ roles, permissions }: { roles: any[], permissions: any[] }) {
  const { data, setData, post, processing, reset, errors } = useForm({
    name: '',
  });

  const [expandedRole, setExpandedRole] = useState<number | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/roles', {
      onSuccess: () => reset(),
    });
  };

  const deleteRole = (id: number) => {
    if (confirm('Are you sure you want to delete this role?')) {
      useForm({}).delete(`/admin/roles/${id}`);
    }
  };

  const togglePermission = (role: any, permissionName: string) => {
    const currentPerms = role.permissions.map((p: any) => p.name);
    const newPerms = currentPerms.includes(permissionName) 
      ? currentPerms.filter((p: string) => p !== permissionName)
      : [...currentPerms, permissionName];

    router.put(`/admin/roles/${role.id}/permissions`, { permissions: newPerms }, { preserveScroll: true });
  };

  // Group permissions for easier viewing
  const groupedPermissions = permissions.reduce((acc: any, curr: any) => {
    const [action, entity] = curr.name.split('_');
    if (!acc[entity]) acc[entity] = [];
    acc[entity].push(curr);
    return acc;
  }, {});

  return (
    <AdminLayout title="Roles & Permissions">
      <div className="mx-auto max-w-5xl space-y-6">
        
        {/* Create Role */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-2 text-primary mb-4">
            <Shield className="h-5 w-5" />
            <h2 className="font-display text-lg font-bold">Create New Role</h2>
          </div>
          <form onSubmit={submit} className="flex gap-4 items-start">
            <div className="flex-1">
              <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} required placeholder="Role Name (e.g. Editor)"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>
            <button type="submit" disabled={processing} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
              <Plus className="h-4 w-4" /> Add Role
            </button>
          </form>
        </div>

        {/* Roles List */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Role Name</th>
                <th className="px-6 py-4 text-right font-semibold uppercase tracking-wider text-xs">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {roles.map(role => (
                <React.Fragment key={role.id}>
                  <tr className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-semibold text-foreground text-base">{role.name}</span>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {role.permissions?.length || 0} permissions assigned
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => setExpandedRole(expandedRole === role.id ? null : role.id)} className="mr-4 text-primary font-semibold text-xs uppercase tracking-wider hover:underline">
                        {expandedRole === role.id ? 'Hide Permissions' : 'Edit Permissions'}
                      </button>
                      {role.name !== 'super_admin' && (
                        <button onClick={() => deleteRole(role.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                  
                  {expandedRole === role.id && (
                    <tr>
                      <td colSpan={2} className="bg-muted/20 px-6 py-6 border-t border-border">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          {Object.entries(groupedPermissions).map(([entity, perms]: [string, any]) => (
                            <div key={entity} className="space-y-2">
                              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 border-b border-border pb-1">{entity}</h4>
                              <div className="space-y-1">
                                {perms.map((p: any) => {
                                  const isChecked = role.permissions.some((rp: any) => rp.name === p.name);
                                  return (
                                    <label key={p.id} className="flex items-center gap-2 cursor-pointer group">
                                      <div onClick={() => role.name !== 'super_admin' && togglePermission(role, p.name)}>
                                        {isChecked ? (
                                          <CheckSquare className="h-4 w-4 text-emerald-600" />
                                        ) : (
                                          <Square className="h-4 w-4 text-slate-300 group-hover:text-slate-400" />
                                        )}
                                      </div>
                                      <span className="text-xs text-slate-700 capitalize select-none">{p.name.split('_')[0]}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {roles.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-6 py-8 text-center text-muted-foreground">No custom roles created.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
}
