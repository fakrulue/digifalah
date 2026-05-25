import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm, router } from '@inertiajs/react';
import { Database, Download, Trash2, Plus, Calendar, HardDrive } from 'lucide-react';
import React from 'react';

interface Backup {
  name: string;
  size: string;
  date: string;
}

export default function BackupSettings({ backups }: { backups: Backup[] }) {
  const { post, processing } = useForm();

  const handleCreate = () => {
    post('/admin/settings/backup');
  };

  const handleDelete = (name: string) => {
    if (confirm('Are you sure you want to delete this backup?')) {
      router.delete(`/admin/settings/backup/${name}`);
    }
  };

  return (
    <AdminLayout title="System Backups">
      <div className="mx-auto max-w-5xl space-y-8 pb-20">
        
        {/* Header Section */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="font-display text-2xl font-bold">Proper Backup Management</h1>
            <p className="text-sm text-muted-foreground">Download full site backups including your database and media files.</p>
          </div>
          <button
            onClick={handleCreate}
            disabled={processing}
            className="flex items-center gap-2 rounded-xl bg-gradient-emerald px-6 py-3 font-bold text-primary-foreground shadow-soft hover:opacity-90 transition-all disabled:opacity-50"
          >
            <Plus className="h-5 w-5" />
            Create Full Backup
          </button>
        </div>

        {/* Backups List */}
        <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
          <div className="border-b border-border bg-muted/50 px-6 py-4">
            <div className="flex items-center gap-2 text-primary">
              <Database className="h-5 w-5" />
              <h2 className="font-display font-bold">Existing Backups</h2>
            </div>
          </div>
          
          <div className="divide-y divide-border">
            {backups.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 rounded-full bg-muted p-4">
                  <HardDrive className="h-8 w-8 text-muted-foreground/30" />
                </div>
                <h3 className="font-semibold">No backups found</h3>
                <p className="text-sm text-muted-foreground">Create your first backup to secure your data.</p>
              </div>
            ) : (
              backups.map((b) => (
                <div key={b.name} className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600">
                      <Database className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-mono text-sm font-medium">{b.name}</div>
                      <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {b.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <HardDrive className="h-3 w-3" /> {b.size}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <a
                      href={`/admin/settings/backup/download/${b.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                      title="Download"
                    >
                      <Download className="h-5 w-5" />
                    </a>
                    <button
                      onClick={() => handleDelete(b.name)}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-destructive/30 hover:bg-destructive/5 hover:text-destructive"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6 text-sm text-blue-700">
          <div className="flex gap-3">
            <Database className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-bold">What's included in a "Proper Backup"?</p>
              <ul className="mt-2 list-inside list-disc space-y-1 opacity-80">
                <li>SQLite Database (All site content, users, and settings)</li>
                <li>Environment Configuration (.env file)</li>
                <li>All Uploaded Media (Images, logos, and icons)</li>
              </ul>
              <p className="mt-4 italic opacity-70 text-xs">Note: Backups are stored on the server. We recommend downloading them to your local computer for extra safety.</p>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
