<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Lead;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ExportController extends Controller
{
    public function exportBlogs()
    {
        return $this->downloadCsv('blogs_export.csv', ['ID', 'Title', 'Slug', 'Created At'], function($handle) {
            BlogPost::chunk(100, function($blogs) use ($handle) {
                foreach ($blogs as $blog) {
                    fputcsv($handle, [$blog->id, $blog->title, $blog->slug, $blog->created_at]);
                }
            });
        });
    }

    public function exportLeads()
    {
        return $this->downloadCsv('leads_export.csv', ['ID', 'Name', 'Email', 'Phone', 'Service', 'Created At'], function($handle) {
            Lead::chunk(100, function($leads) use ($handle) {
                foreach ($leads as $lead) {
                    fputcsv($handle, [$lead->id, $lead->name, $lead->email, $lead->phone, $lead->service, $lead->created_at]);
                }
            });
        });
    }

    public function exportSubscribers()
    {
        return $this->downloadCsv('subscribers_export.csv', ['ID', 'Email', 'Created At'], function($handle) {
            Subscriber::chunk(100, function($subscribers) use ($handle) {
                foreach ($subscribers as $sub) {
                    fputcsv($handle, [$sub->id, $sub->email, $sub->created_at]);
                }
            });
        });
    }

    private function downloadCsv($filename, $headers, $callback)
    {
        $response = new StreamedResponse(function() use ($headers, $callback) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, $headers);
            $callback($handle);
            fclose($handle);
        });

        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', 'attachment; filename="' . $filename . '"');

        return $response;
    }
}
