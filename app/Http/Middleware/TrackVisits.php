<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackVisits
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only track successful GET requests for non-admin pages and non-static files
        $isPage = !$request->ajax() || $request->hasHeader('X-Inertia');
        
        if ($request->isMethod('GET') && 
            !$request->is('admin*') && 
            !$request->is('api*') && 
            $isPage &&
            $response->getStatusCode() === 200) {

            try {
                $ua = $request->userAgent();
                
                // Basic bot filter
                if (preg_match('/bot|crawl|spider|slurp|facebookexternalhit|bingpreview/i', $ua)) {
                    return $response;
                }
                
                \App\Models\Visit::create([
                    'ip' => $request->ip(),
                    'url' => $request->fullUrl(),
                    'referer' => $request->header('referer'),
                    'user_agent' => $ua,
                    'device' => $this->getDevice($ua),
                    'browser' => $this->getBrowser($ua),
                    'platform' => $this->getPlatform($ua),
                ]);
            } catch (\Exception $e) {
                // Ignore tracking errors to not break the site
            }
        }

        return $response;
    }

    private function getDevice($ua) {
        if (preg_match('/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i', $ua)) return 'tablet';
        if (preg_match('/(up.browser|up.link|mmp|symbian|smartphone|midp|wap|phone|android|iemobile)/i', $ua)) return 'mobile';
        return 'desktop';
    }

    private function getBrowser($ua) {
        if (strpos($ua, 'MSIE') !== false || strpos($ua, 'Trident') !== false) return 'Internet Explorer';
        if (strpos($ua, 'Edge') !== false) return 'Edge';
        if (strpos($ua, 'Chrome') !== false) return 'Chrome';
        if (strpos($ua, 'Safari') !== false) return 'Safari';
        if (strpos($ua, 'Firefox') !== false) return 'Firefox';
        if (strpos($ua, 'Opera') !== false || strpos($ua, 'OPR') !== false) return 'Opera';
        return 'Unknown';
    }

    private function getPlatform($ua) {
        if (strpos($ua, 'Windows') !== false) return 'Windows';
        if (strpos($ua, 'iPhone') !== false || strpos($ua, 'iPad') !== false) return 'iOS';
        if (strpos($ua, 'Android') !== false) return 'Android';
        if (strpos($ua, 'Macintosh') !== false || strpos($ua, 'Mac OS X') !== false) return 'MacOS';
        if (strpos($ua, 'Linux') !== false) return 'Linux';
        return 'Unknown';
    }
}
