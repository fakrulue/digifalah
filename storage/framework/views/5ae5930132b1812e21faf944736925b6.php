<?php
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
?>
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo e($__title); ?></title>
    <meta name="description" content="<?php echo e($__description); ?>" />
    <?php if($__canonical): ?><link rel="canonical" href="<?php echo e($__canonical); ?>" /><?php endif; ?>
    <?php if($__noIndex): ?><meta name="robots" content="noindex" /><?php endif; ?>
    <meta property="og:title" content="<?php echo e($__title); ?>" />
    <meta property="og:description" content="<?php echo e($__description); ?>" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="<?php echo e(url()->current()); ?>" />
    <?php if($__ogImage): ?><meta property="og:image" content="<?php echo e($__ogImage); ?>" /><?php endif; ?>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="<?php echo e($__title); ?>" />
    <meta name="twitter:description" content="<?php echo e($__description); ?>" />
    <?php if($__ogImage): ?><meta name="twitter:image" content="<?php echo e($__ogImage); ?>" /><?php endif; ?>
    <?php if($__siteIcon): ?>
        <link rel="icon" href="<?php echo e($__siteIcon); ?>" />
    <?php endif; ?>
    <?php if($__customCss): ?>
        <style>
            <?php echo $__customCss; ?>

        </style>
    <?php endif; ?>
    <?php $__inertiaSsrResponse = app(\Inertia\Ssr\SsrState::class)->setPage($page)->dispatch();  if ($__inertiaSsrResponse) { echo $__inertiaSsrResponse->head; } ?>
    <?php echo app('Illuminate\Foundation\Vite')->reactRefresh(); ?>
    <?php echo app('Illuminate\Foundation\Vite')(['resources/js/app.tsx']); ?>
</head>
<body>
    <?php $__inertiaSsrResponse = app(\Inertia\Ssr\SsrState::class)->setPage($page)->dispatch();  if ($__inertiaSsrResponse) { echo $__inertiaSsrResponse->body; } else { ?><script data-page="app" type="application/json"><?php echo json_encode($page); ?></script><div id="app"></div><?php } ?>

    <?php if(\App\Models\SiteSetting::get('custom_js')): ?>
        <script>
            <?php echo \App\Models\SiteSetting::get('custom_js'); ?>

        </script>
    <?php endif; ?>
</body>
</html>
<?php /**PATH /www/wwwroot/digifalah.com/resources/views/app.blade.php ENDPATH**/ ?>