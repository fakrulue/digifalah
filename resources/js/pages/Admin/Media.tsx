import { AdminLayout } from '@/components/admin/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Image, Upload, Trash2, Loader2, FileText, Link as LinkIcon, Check, Zap } from 'lucide-react';
import { useState } from 'react';

interface MediaFile { id: number; filename: string; url: string; mime_type?: string; size_bytes?: number; created_at: string; }

export default function Media({ files }: { files: MediaFile[] }) {
  const uploadForm = useForm({ file: null as any });
  const deleteForm = useForm({});
  const optimizeForm = useForm({});
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyLink = (id: number, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOptimizeAll = () => {
    if (confirm('Are you sure you want to optimize all images to WebP? This will resize large images to < 200kb and replace database links. This action may take a while if you have many images.')) {
      optimizeForm.post('/admin/media/optimize-all', { preserveScroll: true });
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);
    
    import('@inertiajs/react').then(({ router }) => {
      router.post('/admin/media/upload', formData, {
        forceFormData: true,
        onSuccess: () => {
          e.target.value = '';
          uploadForm.reset();
        },
      });
    });
  };

  return (
    <AdminLayout title="Media Library">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-stretch">
        <label className="group relative flex min-h-[160px] flex-1 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card transition-all hover:border-primary/50 hover:bg-muted/50">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <Upload className="h-6 w-6" />
            </div>
            <div className="text-center">
              <span className="block text-sm font-semibold">Click to upload files</span>
              <span className="text-xs text-muted-foreground">Images or PDFs up to 10MB (Images auto-optimized to WebP)</span>
            </div>
          </div>
          {uploadForm.processing && (
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-card/80 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="text-xs font-medium">Uploading & Optimizing...</span>
              </div>
            </div>
          )}
          <input type="file" className="hidden" onChange={handleUpload} disabled={uploadForm.processing} />
        </label>
        
        <div className="flex w-full shrink-0 flex-col md:w-72">
          <div className="flex h-full flex-col justify-center rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Zap className="h-4 w-4" />
              </div>
              <h3 className="font-semibold">Bulk Optimize</h3>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">
              Compress all existing images to highly optimized WebP format (under 200KB) and update database links.
            </p>
            <button 
              onClick={handleOptimizeAll} 
              disabled={optimizeForm.processing} 
              className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-primary/90 disabled:opacity-50"
            >
              {optimizeForm.processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
              Optimize All to WebP
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {files.map(f => (
          <div key={f.id} className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-all hover:shadow-elegant">
            <div className="aspect-video relative overflow-hidden bg-muted/30">
              {f.mime_type?.startsWith('image/') ? (
                <img src={f.url} alt={f.filename} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <FileText className="h-10 w-10 text-muted-foreground/20" />
                </div>
              )}
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <button onClick={() => copyLink(f.id, f.url)}
                  className="rounded-lg bg-primary p-2 text-white shadow-soft hover:bg-primary/90">
                  {copiedId === f.id ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
                </button>
                <button onClick={() => { if(confirm('Delete this file?')) deleteForm.delete(`/admin/media/${f.id}`); }}
                  className="rounded-lg bg-destructive p-2 text-white shadow-soft hover:bg-destructive/90">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="p-3">
              <div className="truncate text-[11px] font-bold" title={f.filename}>{f.filename}</div>
              <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground uppercase tracking-wider">
                <span>{f.size_bytes ? `${(f.size_bytes / 1024).toFixed(1)} KB` : 'N/A'}</span>
                <span>{f.mime_type?.split('/')[1] || 'File'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {files.length === 0 && (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-border bg-card/50 text-center">
          <Image className="h-12 w-12 text-muted-foreground/20" />
          <h3 className="mt-4 font-display text-lg font-bold">No media found</h3>
          <p className="text-sm text-muted-foreground">Upload your first image to get started.</p>
        </div>
      )}
    </AdminLayout>
  );
}
