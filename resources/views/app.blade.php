@php
    $__seo = $page['props']['seo'] ?? [];
    $__settings = $page['props']['settings'] ?? [];
    $__siteName = $__settings['site_name'] ?? 'DigiFalah';
    $__siteIcon = $__settings['site_icon'] ?? \App\Models\SiteSetting::get('site_icon');
    $__title = $__seo['title'] ?? $__siteName;
    $__description = $__seo['description'] ?? $__settings['footer_about_text'] ?? '';
    $__ogImage = $__seo['og_image'] ?? $__settings['site_logo'] ?? '';
    $__canonical = $__seo['canonical_url'] ?? null;
    $__noIndex = $__seo['no_index'] ?? false;
    $__customCss = $__settings['custom_css'] ?? \App\Models\SiteSetting::get('custom_css');
@endphp
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ $__title }}</title>
    <meta name="description" content="{{ $__description }}" />
    @if($__canonical)<link rel="canonical" href="{{ $__canonical }}" />@endif
    @if($__noIndex)<meta name="robots" content="noindex" />@endif
    <meta property="og:title" content="{{ $__title }}" />
    <meta property="og:description" content="{{ $__description }}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ url()->current() }}" />
    @if($__ogImage)<meta property="og:image" content="{{ $__ogImage }}" />@endif
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{{ $__title }}" />
    <meta name="twitter:description" content="{{ $__description }}" />
    @if($__ogImage)<meta name="twitter:image" content="{{ $__ogImage }}" />@endif
    @if($__siteIcon)
        <link rel="icon" href="{{ $__siteIcon }}" />
    @endif
    @if($__customCss)
        <style>
            {!! $__customCss !!}
        </style>
    @endif
    @inertiaHead
    @viteReactRefresh
    @vite(['resources/js/app.tsx'])
</head>
<body>
    @inertia

    @if(\App\Models\SiteSetting::get('custom_js'))
        <script>
            {!! \App\Models\SiteSetting::get('custom_js') !!}
        </script>
    @endif
</body>
</html>
