<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AIController extends Controller
{
    public function models()
    {
        $apiKey = SiteSetting::get('gemini_api_key') ?? config('services.gemini.key');
        if (!$apiKey) return response()->json([]);

        try {
            $response = Http::timeout(5)->get("https://generativelanguage.googleapis.com/v1beta/models?key={$apiKey}");
            if ($response->successful()) {
                $models = $response->json()['models'] ?? [];
                return response()->json(collect($models)
                    ->filter(fn($m) => in_array('generateContent', $m['supportedGenerationMethods'] ?? []))
                    ->map(fn($m) => [
                        'id' => str_replace('models/', '', $m['name']),
                        'name' => $m['displayName'] ?? str_replace('models/', '', $m['name'])
                    ])->values());
            }
        } catch (\Exception $e) {}
        return response()->json([]);
    }

    const PREFERRED_MODELS = [
        "gemini-1.5-flash",
        "gemini-1.5-pro",
        "gemini-2.0-flash",
    ];

    public function generateBlogPost(Request $request)
    {
        $data = $request->validate([
            'topic' => 'required|string|min:3|max:300',
            'tone' => 'nullable|string',
            'language' => 'required|in:en,bn',
            'keywords' => 'nullable|string',
            'model' => 'nullable|string',
        ]);

        $apiKey = SiteSetting::get('gemini_api_key') ?? config('services.gemini.key');

        if (!$apiKey) {
            return response()->json(['error' => 'Gemini API Key missing. Please add it in Settings.'], 400);
        }

        $model = $data['model'] ?? $this->resolveModel($apiKey);

        $langInstruction = $data['language'] === 'bn'
            ? "Write in natural, professional Bangla."
            : "Write in clear, engaging English.";

        $prompt = "You are a World-Class Visual Storyteller and SEO Strategist for DigiFalah. Your goal is to create a 'Live, Attractive, and Elite' blog post. Do not just write text; design a visual reading experience.

CRITICAL RULES:
- Return ONLY a valid JSON object.
- Exact JSON Structure required:
{
  \"title\": \"High-impact blog title\",
  \"slug\": \"seo-friendly-slug\",
  \"excerpt\": \"A 1-2 sentence compelling summary for the blog list\",
  \"content\": \"The full designed HTML content...\",
  \"seo_title\": \"SEO Optimized Title\",
  \"seo_description\": \"Search engine description\"
}

Content MUST follow this 'Elite Design Pattern':
  1. HIGH-IMPACT IMAGE: Start with a professional image <img src=\"https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80\" alt=\"Digital Marketing Strategy\" />
  2. HERO INTRODUCTION: A punchy H2 and a short, engaging opening paragraph.
  3. AUTHORITY QUOTE: An inspiring or strategic quote using <div class=\"blog-tip\"><h4>💡 Strategic Insight</h4><p>Key quote or takeaway here...</p></div>
  4. DEEP CONTENT: Use frequent H3 headers (every 2-3 paragraphs) to keep it easy to read. 
  5. FEATURE GRID: Use <div class=\"blog-grid\"> with <div class=\"blog-card\"> to list benefits or steps visually.
  6. TIP BOX: Use <div class=\"blog-tip\"> for actionable 'Expert Tips'.
  7. FAQ SECTION: A dedicated H2 'Frequently Asked Questions' with H3 questions.
  8. CTA BANNER: A professional <div class=\"blog-cta\"> at the end.

Style Guide (Humanize):
- Use short, punchy paragraphs (max 3-4 sentences).
- Use varied sentence lengths to create rhythm.
- Use bold text for emphasis but don't overdo it.
- Content must be at least 1200 words and feel authoritative.

Blog Post Request:
Topic: {$data['topic']}
Tone: " . ($data['tone'] ?? "Elite, authoritative, yet deeply human and engaging");

        try {
            $apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$apiKey}";
            $response = Http::timeout(120)->post($apiUrl, [
                'contents' => [
                    ['parts' => [['text' => $prompt]]]
                ],
                'generationConfig' => [
                    'temperature' => 0.8,
                    'maxOutputTokens' => 8192, // Increased for longer content
                ]
            ]);

            if ($response->failed()) {
                $errorMsg = $response->json()['error']['message'] ?? 'Gemini API connection failed';
                Log::error("Gemini API Error ({$response->status()}): " . $errorMsg);
                return response()->json(['error' => "AI Error: " . $errorMsg], 400);
            }

            $json = $response->json();
            
            if (empty($json['candidates'])) {
                Log::error("Gemini returned no candidates: " . json_encode($json));
                return response()->json(['error' => 'AI failed to generate content. Please try a different topic.'], 400);
            }

            $contentText = $json['candidates'][0]['content']['parts'][0]['text'] ?? "{}";

            // Ultimate JSON extraction: Find first '{' and last '}'
            $firstBrace = strpos($contentText, '{');
            $lastBrace = strrpos($contentText, '}');

            if ($firstBrace !== false && $lastBrace !== false) {
                $contentText = substr($contentText, $firstBrace, $lastBrace - $firstBrace + 1);
            }

            // Remove control characters except newline and tab
            $contentText = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $contentText);

            $result = json_decode($contentText, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                Log::error("Failed to parse AI response JSON. Error: " . json_last_error_msg() . "\nContent Sample: " . substr($contentText, 0, 500));
                return response()->json(['error' => 'AI returned malformed data. The content might be too long. Please try again.'], 500);
            }

            return response()->json($result);

        } catch (\Exception $e) {
            Log::error("AI Generation Exception: " . $e->getMessage());
            return response()->json(['error' => 'Generation failed: ' . $e->getMessage()], 500);
        }
    }

    private function resolveModel($apiKey)
    {
        try {
            $response = Http::timeout(5)->get("https://generativelanguage.googleapis.com/v1beta/models?key={$apiKey}");
            if ($response->successful()) {
                $models = $response->json()['models'] ?? [];
                $available = collect($models)
                    ->filter(fn($m) => in_array('generateContent', $m['supportedGenerationMethods'] ?? []))
                    ->map(fn($m) => str_replace('models/', '', $m['name']))
                    ->toArray();

                foreach (self::PREFERRED_MODELS as $pref) {
                    if (in_array($pref, $available)) return $pref;
                }
                if (!empty($available)) return $available[0];
            }
        } catch (\Exception $e) {
            Log::warning("Model resolution failed, using fallback: " . $e->getMessage());
        }
        return "gemini-1.5-flash"; // Confirmed stable fallback
    }
}
