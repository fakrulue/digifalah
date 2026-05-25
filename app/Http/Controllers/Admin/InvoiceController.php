<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Invoice;
use Inertia\Inertia;
use Illuminate\Support\Str;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::with('items')->latest()->get();
        $settings = $this->getInvoiceSettings();
        return Inertia::render('Admin/Invoices/Index', [
            'invoices' => $invoices,
            'currency' => $settings['currency_symbol'] ?? '৳',
        ]);
    }

    public function create()
    {
        $settings = $this->getInvoiceSettings();
        return Inertia::render('Admin/Invoices/Create', [
            'next_invoice_number' => ($settings['invoice_prefix'] ?: 'INV-') . strtoupper(Str::random(6)),
            'settings' => $settings,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'invoice_number' => 'required|string|unique:invoices,invoice_number',
            'client_name' => 'required|string',
            'client_email' => 'required|email',
            'client_address' => 'nullable|string',
            'issue_date' => 'required|date',
            'due_date' => 'nullable|date',
            'status' => 'required|string|in:draft,sent,paid,overdue',
            'tax_rate' => 'numeric|min:0|max:100',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.description' => 'required|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
        ]);

        $subtotal = collect($validated['items'])->sum(function($item) {
            return $item['quantity'] * $item['unit_price'];
        });

        $tax_amount = $subtotal * ($validated['tax_rate'] / 100);
        $total = $subtotal + $tax_amount;

        $invoice = Invoice::create([
            'invoice_number' => $validated['invoice_number'],
            'client_name' => $validated['client_name'],
            'client_email' => $validated['client_email'],
            'client_address' => $validated['client_address'],
            'issue_date' => $validated['issue_date'],
            'due_date' => $validated['due_date'],
            'status' => $validated['status'],
            'tax_rate' => $validated['tax_rate'],
            'subtotal' => $subtotal,
            'tax_amount' => $tax_amount,
            'total' => $total,
            'notes' => $validated['notes'],
        ]);

        foreach ($validated['items'] as $item) {
            $invoice->items()->create([
                'description' => $item['description'],
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
                'total' => $item['quantity'] * $item['unit_price']
            ]);
        }

        return redirect()->route('admin.invoices.index')->with('success', 'Invoice created successfully.');
    }

    public function show(Invoice $invoice)
    {
        $invoice->load('items');
        $settings = $this->getInvoiceSettings();
        return Inertia::render('Admin/Invoices/Show', ['invoice' => $invoice, 'settings' => $settings]);
    }

    public function edit(Invoice $invoice)
    {
        $invoice->load('items');
        $settings = $this->getInvoiceSettings();
        return Inertia::render('Admin/Invoices/Edit', ['invoice' => $invoice, 'settings' => $settings]);
    }

    public function update(Request $request, Invoice $invoice)
    {
        $validated = $request->validate([
            'invoice_number' => 'required|string|unique:invoices,invoice_number,' . $invoice->id,
            'client_name' => 'required|string',
            'client_email' => 'required|email',
            'client_address' => 'nullable|string',
            'issue_date' => 'required|date',
            'due_date' => 'nullable|date',
            'status' => 'required|string|in:draft,sent,paid,overdue',
            'tax_rate' => 'numeric|min:0|max:100',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.description' => 'required|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
        ]);

        $subtotal = collect($validated['items'])->sum(function($item) {
            return $item['quantity'] * $item['unit_price'];
        });

        $tax_amount = $subtotal * ($validated['tax_rate'] / 100);
        $total = $subtotal + $tax_amount;

        $invoice->update([
            'invoice_number' => $validated['invoice_number'],
            'client_name' => $validated['client_name'],
            'client_email' => $validated['client_email'],
            'client_address' => $validated['client_address'],
            'issue_date' => $validated['issue_date'],
            'due_date' => $validated['due_date'],
            'status' => $validated['status'],
            'tax_rate' => $validated['tax_rate'],
            'subtotal' => $subtotal,
            'tax_amount' => $tax_amount,
            'total' => $total,
            'notes' => $validated['notes'],
        ]);

        // Sync items: delete old, re-create
        $invoice->items()->delete();
        foreach ($validated['items'] as $item) {
            $invoice->items()->create([
                'description' => $item['description'],
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
                'total' => $item['quantity'] * $item['unit_price']
            ]);
        }

        return redirect()->route('admin.invoices.show', $invoice)->with('success', 'Invoice updated successfully.');
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();
        return redirect()->route('admin.invoices.index')->with('success', 'Invoice deleted successfully.');
    }

    public function invoiceSettings()
    {
        $settings = $this->getInvoiceSettings();
        return Inertia::render('Admin/Invoices/Settings', ['settings' => $settings]);
    }

    public function updateInvoiceSettings(Request $request)
    {
        $fields = [
            'company_name', 'company_address', 'company_email',
            'company_phone', 'company_website', 'company_logo',
            'invoice_prefix', 'invoice_footer', 'default_tax_rate',
            'currency_symbol', 'payment_terms',
        ];

        foreach ($fields as $field) {
            \DB::table('site_settings')->updateOrInsert(
                ['key' => 'invoice_' . $field],
                ['value' => json_encode(['value' => $request->input($field)]), 'is_public' => false, 'updated_at' => now(), 'created_at' => now()]
            );
        }

        return back()->with('success', 'Invoice settings saved.');
    }

    private function getInvoiceSettings(): array
    {
        $keys = [
            'company_name', 'company_address', 'company_email',
            'company_phone', 'company_website', 'company_logo',
            'invoice_prefix', 'invoice_footer', 'default_tax_rate',
            'currency_symbol', 'payment_terms',
        ];

        $settings = [];
        $rows = \DB::table('site_settings')
            ->whereIn('key', array_map(fn($k) => 'invoice_' . $k, $keys))
            ->get()
            ->keyBy('key');

        foreach ($keys as $key) {
            $row = $rows->get('invoice_' . $key);
            $settings[$key] = $row ? (json_decode($row->value, true)['value'] ?? '') : '';
        }

        // Defaults
        $settings['company_name'] = $settings['company_name'] ?: 'DigiFalah';
        $settings['invoice_prefix'] = $settings['invoice_prefix'] ?: 'INV-';

        // Pull global currency from site_settings (overrides invoice-specific currency_symbol if set)
        $globalCurrency = \DB::table('site_settings')->where('key', 'currency')->first();
        $globalCurrencyValue = $globalCurrency ? (json_decode($globalCurrency->value, true)['value'] ?? '') : '';
        $settings['currency_symbol'] = $globalCurrencyValue ?: ($settings['currency_symbol'] ?: '৳');

        return $settings;
    }
}
