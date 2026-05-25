<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TerminalController extends Controller
{
    // Blocked dangerous commands for safety
    private array $blocked = [
        'rm -rf /',
        'rm -rf /*',
        'dd if=',
        'mkfs',
        'shutdown',
        'reboot',
        'halt',
        'poweroff',
        ':(){:|:&};:',
    ];

    public function index()
    {
        return Inertia::render('Admin/Terminal', [
            'cwd' => base_path(),
        ]);
    }

    public function run(Request $request)
    {
        $request->validate(['command' => 'required|string|max:1000']);

        $command = trim($request->input('command'));

        // Check for blocked commands
        foreach ($this->blocked as $blocked) {
            if (str_contains(strtolower($command), strtolower($blocked))) {
                return response()->json([
                    'output' => "⛔ Command blocked for safety: contains '{$blocked}'",
                    'exit_code' => 1,
                ]);
            }
        }

        $cwd = base_path();

        // Use proc_open which is available even when shell_exec is disabled
        $descriptors = [
            0 => ['pipe', 'r'],  // stdin
            1 => ['pipe', 'w'],  // stdout
            2 => ['pipe', 'w'],  // stderr
        ];

        $process = \proc_open($command, $descriptors, $pipes, $cwd, null);

        if (!is_resource($process)) {
            return response()->json([
                'output'    => 'Failed to start process.',
                'exit_code' => 1,
            ]);
        }

        fclose($pipes[0]);
        $stdout   = stream_get_contents($pipes[1]);
        $stderr   = stream_get_contents($pipes[2]);
        fclose($pipes[1]);
        fclose($pipes[2]);
        $exitCode = \proc_close($process);

        $output = trim($stdout . ($stderr ? "\n[stderr]: " . $stderr : ''));

        return response()->json([
            'output'    => $output ?: '(no output)',
            'exit_code' => $exitCode,
            'cwd'       => $cwd,
        ]);
    }
}
