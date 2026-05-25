import { AdminLayout } from '@/components/admin/AdminLayout';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Terminal as TerminalIcon, TriangleAlert, ChevronRight } from 'lucide-react';

interface HistoryEntry {
  command: string;
  output: string;
  exitCode: number;
  timestamp: string;
}

export default function Terminal({ cwd }: { cwd: string }) {
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: '',
      output: `Connected to ${cwd}\nType a command and press Enter. Type "clear" to clear the terminal.`,
      exitCode: 0,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIndex, setCmdHistoryIndex] = useState(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    setCmdHistory(prev => [cmd, ...prev]);
    setCmdHistoryIndex(-1);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('/admin/terminal/run', { command: cmd });
      setHistory(prev => [
        ...prev,
        {
          command: cmd,
          output: res.data.output,
          exitCode: res.data.exit_code,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (err: any) {
      setHistory(prev => [
        ...prev,
        {
          command: cmd,
          output: err?.response?.data?.message ?? 'Error executing command.',
          exitCode: 1,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      const newIndex = Math.min(cmdHistoryIndex + 1, cmdHistory.length - 1);
      setCmdHistoryIndex(newIndex);
      setInput(cmdHistory[newIndex] ?? '');
    } else if (e.key === 'ArrowDown') {
      const newIndex = Math.max(cmdHistoryIndex - 1, -1);
      setCmdHistoryIndex(newIndex);
      setInput(newIndex === -1 ? '' : cmdHistory[newIndex]);
    }
  };

  return (
    <AdminLayout title="Server Terminal">
      <div className="mx-auto max-w-5xl space-y-4">

        {/* Warning */}
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <strong>Admin Only — Use with caution.</strong> Commands run directly on the server. Some dangerous commands are blocked automatically.
          </div>
        </div>

        {/* Terminal Window */}
        <div
          className="overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-950 shadow-2xl"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
            </div>
            <div className="mx-auto flex items-center gap-2 text-xs text-zinc-400">
              <TerminalIcon className="h-3.5 w-3.5" />
              <span>Server Terminal — {cwd}</span>
            </div>
          </div>

          {/* Output */}
          <div className="h-[60vh] overflow-y-auto p-5 font-mono text-sm leading-relaxed custom-scrollbar">
            {history.map((entry, i) => (
              <div key={i} className="mb-4">
                {entry.command && (
                  <div className="flex items-center gap-2 text-emerald-400">
                    <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                    <span>{entry.command}</span>
                    <span className="ml-auto text-xs text-zinc-600">{entry.timestamp}</span>
                  </div>
                )}
                <pre
                  className={`mt-1 whitespace-pre-wrap break-all ${
                    entry.exitCode !== 0 ? 'text-red-400' : 'text-zinc-300'
                  } ${!entry.command ? 'text-zinc-500 italic' : ''}`}
                >
                  {entry.output}
                </pre>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-amber-400 animate-pulse">
                <span className="font-mono text-xs">Running...</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={runCommand} className="border-t border-zinc-800 bg-zinc-900 px-4 py-3">
            <div className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 shrink-0 text-emerald-400" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter command... (↑↓ for history)"
                disabled={loading}
                className="flex-1 bg-transparent font-mono text-sm text-white placeholder-zinc-600 outline-none disabled:opacity-50"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-md bg-emerald-600 px-3 py-1 text-xs font-bold text-white transition-opacity hover:bg-emerald-500 disabled:opacity-40"
              >
                Run
              </button>
            </div>
          </form>
        </div>

        {/* Quick Commands */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="mb-3 text-sm font-bold text-foreground">Quick Commands</p>
          <div className="flex flex-wrap gap-2">
            {[
              'php artisan optimize:clear',
              'php artisan optimize',
              'php artisan migrate --force',
              'php artisan storage:link',
              'php artisan config:clear',
              'php artisan cache:clear',
              'php artisan view:clear',
              'php artisan route:clear',
              'npm run build',
              'composer dump-autoload',
              'df -h',
              'free -h',
              'php -v',
              'ls -la storage/app/public',
            ].map(cmd => (
              <button
                key={cmd}
                onClick={() => setInput(cmd)}
                className="rounded-lg bg-muted px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
