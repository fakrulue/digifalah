import { useState, useEffect } from "react";
import { Loader2, Upload, Image as ImageIcon, Search, X } from "lucide-react";
import axios from "axios";

interface MediaFile { id: number; url: string; filename: string; mime_type?: string; }

export function MediaPicker({
  value,
  onChange,
  label = "Image",
}: {
  value?: string | null;
  onChange: (url: string) => void;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/admin/media/json');
      setFiles(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) load();
  }, [open]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const response = await axios.post('/admin/media/upload', fd);
      // Laravel returns a redirect back usually, but we might want JSON for picker
      // For now, let's just reload the list
      await load();
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">{label}</div>
      <div className="flex items-start gap-3">
        {value ? (
          <div className="relative group">
            <img src={value} alt="" className="h-20 w-20 rounded-lg border border-border object-cover shadow-soft" />
            <button onClick={() => onChange('')} className="absolute -top-2 -right-2 hidden group-hover:flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white shadow-soft">
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
            <ImageIcon className="h-6 w-6 text-muted-foreground/30" />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <button type="button" onClick={() => setOpen(true)}
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold shadow-soft hover:bg-muted transition-colors">
            Choose from library
          </button>
          <input type="text" placeholder="Or paste image URL" value={value ?? ""} onChange={(e) => onChange(e.target.value)}
            className="w-64 rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="flex h-full max-h-[80vh] w-full max-w-4xl flex-col rounded-2xl border border-border bg-card shadow-elegant animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h3 className="font-display text-lg font-bold">Media Library</h3>
              <button onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-6 flex items-center gap-4">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-90">
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  Upload New
                  <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
                </label>
              </div>

              {loading ? (
                <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
              ) : (
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
                  {files.map(f => (
                    <button key={f.id} type="button" onClick={() => { onChange(f.url); setOpen(false); }}
                      className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted hover:ring-2 hover:ring-primary transition-all">
                      <img src={f.url} alt={f.filename} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                    </button>
                  ))}
                  {files.length === 0 && (
                    <div className="col-span-full py-20 text-center text-muted-foreground">No files found.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
