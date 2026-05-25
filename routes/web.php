<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\BuilderController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\LeadsController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\SeoController;
use App\Http\Controllers\Admin\AIController;
use App\Http\Controllers\Admin\BlogCommentController;
use App\Http\Controllers\Admin\SubscriberController;

// Public site routes
Route::get('/', [SiteController::class, 'home'])->name('home');
Route::get('/services', [SiteController::class, 'page'])->defaults('slug', 'services');
Route::get('/about', [SiteController::class, 'page'])->defaults('slug', 'about');
Route::get('/pricing', [SiteController::class, 'page'])->defaults('slug', 'pricing');
Route::get('/contact', [SiteController::class, 'page'])->defaults('slug', 'contact');
Route::get('/blog', [SiteController::class, 'blog']);
Route::get('/blog/{slug}', [SiteController::class, 'blogPost']);
Route::post('/blog/{post}/comment', [SiteController::class, 'storeComment'])->name('blog.comment.store');
Route::post('/subscribe', [SubscriberController::class, 'store'])->name('subscribe');
Route::get('/privacy', fn() => Inertia::render('Privacy'));
Route::get('/terms', fn() => Inertia::render('Terms'));
Route::get('/sitemap.xml', [SiteController::class, 'sitemap'])->name('sitemap');
// Lead submission
Route::post('/leads', [\App\Http\Controllers\Site\LeadController::class, 'store'])->name('leads.store');

// Auth
Route::get('/login', [LoginController::class, 'show'])->name('login');
Route::post('/login', [LoginController::class, 'login'])->name('login.post');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// Admin (protected)
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Visual Builder
    Route::get('/builder', [BuilderController::class, 'index'])->name('builder');
    Route::post('/builder/create', [BuilderController::class, 'create'])->name('builder.create');
    Route::get('/builder/{slug}', [BuilderController::class, 'edit'])->name('builder.edit');
    Route::post('/builder/{slug}', [BuilderController::class, 'save'])->name('builder.save');
    Route::delete('/builder/{slug}', [BuilderController::class, 'destroy'])->name('builder.destroy');

    // Blog
    Route::get('/blog', [BlogController::class, 'index'])->name('blog');
    Route::get('/blog/new', [BlogController::class, 'create'])->name('blog.new');
    Route::post('/blog', [BlogController::class, 'store'])->name('blog.store');
    Route::get('/blog/{post}/edit', [BlogController::class, 'edit'])->name('blog.edit');
    Route::post('/blog/{post}', [BlogController::class, 'update'])->name('blog.update');
    Route::delete('/blog/{post}', [BlogController::class, 'destroy'])->name('blog.destroy');
    Route::get('/blog-comments', [BlogCommentController::class, 'index'])->name('blog.comments');
    Route::post('/blog-comments/{comment}', [BlogCommentController::class, 'update'])->name('blog.comments.update');
    Route::delete('/blog-comments/{comment}', [BlogCommentController::class, 'destroy'])->name('blog.comments.destroy');
    Route::get('/subscribers', [SubscriberController::class, 'index'])->name('admin.subscribers');
    Route::delete('/subscribers/{subscriber}', [SubscriberController::class, 'destroy'])->name('admin.subscribers.destroy');

    // Blog Categories
    Route::get('/blog/categories', [\App\Http\Controllers\Admin\BlogCategoryController::class, 'index'])->name('blog.categories');
    Route::post('/blog/categories', [\App\Http\Controllers\Admin\BlogCategoryController::class, 'store'])->name('blog.categories.store');
    Route::delete('/blog/categories/{category}', [\App\Http\Controllers\Admin\BlogCategoryController::class, 'destroy'])->name('blog.categories.destroy');

    // Services
    Route::get('/services', [\App\Http\Controllers\Admin\ServiceController::class, 'index'])->name('services');
    Route::get('/services/new', [\App\Http\Controllers\Admin\ServiceController::class, 'create'])->name('services.new');
    Route::post('/services', [\App\Http\Controllers\Admin\ServiceController::class, 'store'])->name('services.store');
    Route::get('/services/{service}/edit', [\App\Http\Controllers\Admin\ServiceController::class, 'edit'])->name('services.edit');
    Route::post('/services/{service}', [\App\Http\Controllers\Admin\ServiceController::class, 'update'])->name('services.update');
    Route::delete('/services/{service}', [\App\Http\Controllers\Admin\ServiceController::class, 'destroy'])->name('services.destroy');

    // Pricing
    Route::get('/pricing', [\App\Http\Controllers\Admin\PricingController::class, 'index'])->name('pricing');
    Route::get('/pricing/new', [\App\Http\Controllers\Admin\PricingController::class, 'create'])->name('pricing.new');
    Route::post('/pricing', [\App\Http\Controllers\Admin\PricingController::class, 'store'])->name('pricing.store');
    Route::get('/pricing/{plan}/edit', [\App\Http\Controllers\Admin\PricingController::class, 'edit'])->name('pricing.edit');
    Route::post('/pricing/{plan}', [\App\Http\Controllers\Admin\PricingController::class, 'update'])->name('pricing.update');
    Route::delete('/pricing/{plan}', [\App\Http\Controllers\Admin\PricingController::class, 'destroy'])->name('pricing.destroy');

    // Email & Marketing
    Route::get('/email/settings', [\App\Http\Controllers\Admin\EmailController::class, 'settings'])->name('email.settings');
    Route::post('/email/settings', [\App\Http\Controllers\Admin\EmailController::class, 'updateSettings'])->name('email.settings.update');
    Route::get('/email/campaigns', [\App\Http\Controllers\Admin\EmailController::class, 'campaigns'])->name('email.campaigns');
    Route::get('/email/campaigns/new', [\App\Http\Controllers\Admin\EmailController::class, 'createCampaign'])->name('email.campaigns.new');
    Route::post('/email/campaigns', [\App\Http\Controllers\Admin\EmailController::class, 'storeCampaign'])->name('email.campaigns.store');
    Route::post('/email/campaigns/{campaign}/send', [\App\Http\Controllers\Admin\EmailController::class, 'sendCampaign'])->name('email.campaigns.send');
    Route::delete('/email/campaigns/{campaign}', [\App\Http\Controllers\Admin\EmailController::class, 'destroyCampaign'])->name('email.campaigns.destroy');

    // Invoices
    Route::get('/invoices/settings', [\App\Http\Controllers\Admin\InvoiceController::class, 'invoiceSettings'])->name('invoices.settings');
    Route::post('/invoices/settings', [\App\Http\Controllers\Admin\InvoiceController::class, 'updateInvoiceSettings'])->name('invoices.settings.update');
    Route::get('/invoices/create', [\App\Http\Controllers\Admin\InvoiceController::class, 'create'])->name('invoices.create');
    Route::post('/invoices', [\App\Http\Controllers\Admin\InvoiceController::class, 'store'])->name('invoices.store');
    Route::get('/invoices/{invoice}/edit', [\App\Http\Controllers\Admin\InvoiceController::class, 'edit'])->name('invoices.edit');
    Route::put('/invoices/{invoice}', [\App\Http\Controllers\Admin\InvoiceController::class, 'update'])->name('invoices.update');
    Route::get('/invoices/{invoice}', [\App\Http\Controllers\Admin\InvoiceController::class, 'show'])->name('invoices.show');
    Route::delete('/invoices/{invoice}', [\App\Http\Controllers\Admin\InvoiceController::class, 'destroy'])->name('invoices.destroy');
    Route::get('/invoices', [\App\Http\Controllers\Admin\InvoiceController::class, 'index'])->name('invoices.index');

    // Leads
    Route::get('/leads', [LeadsController::class, 'index'])->name('leads');

    // Media
    Route::get('/media', [MediaController::class, 'index'])->name('media');
    Route::get('/media/json', [MediaController::class, 'json'])->name('media.json');

    Route::post('/media/upload', [MediaController::class, 'upload'])->name('media.upload');
    Route::post('/media/optimize-all', [MediaController::class, 'optimizeAll'])->name('media.optimize-all');
    Route::delete('/media/{file}', [MediaController::class, 'destroy'])->name('media.destroy');

    // Users & Roles
    Route::get('/users', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('users.index');
    Route::post('/users/{user}/role', [\App\Http\Controllers\Admin\UserController::class, 'assignRole'])->name('users.role');
    Route::get('/roles', [\App\Http\Controllers\Admin\UserController::class, 'roles'])->name('roles.index');
    Route::post('/roles', [\App\Http\Controllers\Admin\UserController::class, 'storeRole'])->name('roles.store');
    Route::delete('/roles/{role}', [\App\Http\Controllers\Admin\UserController::class, 'destroyRole'])->name('roles.destroy');
    Route::put('/roles/{role}/permissions', [\App\Http\Controllers\Admin\UserController::class, 'syncPermissions'])->name('roles.permissions');

    // Profile Settings
    Route::get('/profile', [\App\Http\Controllers\Admin\ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [\App\Http\Controllers\Admin\ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/password', [\App\Http\Controllers\Admin\ProfileController::class, 'updatePassword'])->name('profile.password');

    // Data Export
    Route::get('/export/blogs', [\App\Http\Controllers\Admin\ExportController::class, 'exportBlogs'])->name('export.blogs');
    Route::get('/export/leads', [\App\Http\Controllers\Admin\ExportController::class, 'exportLeads'])->name('export.leads');
    Route::get('/export/subscribers', [\App\Http\Controllers\Admin\ExportController::class, 'exportSubscribers'])->name('export.subscribers');

    // Settings
    Route::get('/settings/website', [SettingsController::class, 'website'])->name('settings.website');
    Route::post('/settings/website', [SettingsController::class, 'update'])->name('settings.website.update');
    Route::post('/settings/sitemap/generate', [SettingsController::class, 'generateSitemap'])->name('settings.sitemap.generate');
    Route::post('/settings/sitemap/delete', [SettingsController::class, 'deleteSitemap'])->name('settings.sitemap.delete');
    Route::get('/settings/panel', [SettingsController::class, 'panel'])->name('settings.panel');
    Route::post('/settings/panel', [SettingsController::class, 'update'])->name('settings.panel.update');
    Route::post('/settings/optimize', [SettingsController::class, 'optimize'])->name('settings.optimize');
    Route::get('/settings/backup', [\App\Http\Controllers\Admin\BackupController::class, 'index'])->name('settings.backup');
    Route::post('/settings/backup', [\App\Http\Controllers\Admin\BackupController::class, 'create'])->name('settings.backup.create');
    Route::get('/settings/backup/download/{name}', [\App\Http\Controllers\Admin\BackupController::class, 'download'])->name('settings.backup.download');
    Route::delete('/settings/backup/{name}', [\App\Http\Controllers\Admin\BackupController::class, 'destroy'])->name('settings.backup.destroy');

    // SEO
    Route::get('/seo', [SeoController::class, 'index'])->name('seo');
    Route::post('/seo', [SeoController::class, 'update'])->name('seo.update');
    Route::get('/seo/keywords', [\App\Http\Controllers\Admin\KeywordController::class, 'index'])->name('seo.keywords');
    Route::post('/seo/keywords', [\App\Http\Controllers\Admin\KeywordController::class, 'store'])->name('seo.keywords.store');
    Route::put('/seo/keywords/{keyword}', [\App\Http\Controllers\Admin\KeywordController::class, 'update'])->name('seo.keywords.update');
    Route::delete('/seo/keywords/{keyword}', [\App\Http\Controllers\Admin\KeywordController::class, 'destroy'])->name('seo.keywords.destroy');
    // AI
    Route::get('/ai/models', [AIController::class, 'models'])->name('ai.models');
    Route::post('/ai/generate', [AIController::class, 'generateBlogPost'])->name('ai.generate');
    // Content Management
    Route::get('/team', [\App\Http\Controllers\Admin\TeamController::class, 'index'])->name('team.index');
    Route::post('/team', [\App\Http\Controllers\Admin\TeamController::class, 'store'])->name('team.store');
    Route::put('/team/{member}', [\App\Http\Controllers\Admin\TeamController::class, 'update'])->name('team.update');
    Route::delete('/team/{member}', [\App\Http\Controllers\Admin\TeamController::class, 'destroy'])->name('team.destroy');

    Route::get('/clients', [\App\Http\Controllers\Admin\ClientController::class, 'index'])->name('clients.index');
    Route::post('/clients', [\App\Http\Controllers\Admin\ClientController::class, 'store'])->name('clients.store');
    Route::put('/clients/{client}', [\App\Http\Controllers\Admin\ClientController::class, 'update'])->name('clients.update');
    Route::delete('/clients/{client}', [\App\Http\Controllers\Admin\ClientController::class, 'destroy'])->name('clients.destroy');

    Route::get('/portfolio', [\App\Http\Controllers\Admin\PortfolioController::class, 'index'])->name('portfolio.index');
    Route::post('/portfolio', [\App\Http\Controllers\Admin\PortfolioController::class, 'store'])->name('portfolio.store');
    Route::put('/portfolio/{portfolio}', [\App\Http\Controllers\Admin\PortfolioController::class, 'update'])->name('portfolio.update');
    Route::delete('/portfolio/{portfolio}', [\App\Http\Controllers\Admin\PortfolioController::class, 'destroy'])->name('portfolio.destroy');

    Route::get('/case-studies', [\App\Http\Controllers\Admin\CaseStudyController::class, 'index'])->name('case-studies.index');
    Route::post('/case-studies', [\App\Http\Controllers\Admin\CaseStudyController::class, 'store'])->name('case-studies.store');
    Route::put('/case-studies/{study}', [\App\Http\Controllers\Admin\CaseStudyController::class, 'update'])->name('case-studies.update');
    Route::delete('/case-studies/{study}', [\App\Http\Controllers\Admin\CaseStudyController::class, 'destroy'])->name('case-studies.destroy');

    // Analytics
    Route::get('/analytics', [\App\Http\Controllers\Admin\AnalyticsController::class, 'index'])->name('analytics');

    // Terminal
    Route::get('/terminal', [\App\Http\Controllers\Admin\TerminalController::class, 'index'])->name('terminal');
    Route::post('/terminal/run', [\App\Http\Controllers\Admin\TerminalController::class, 'run'])->name('terminal.run');
});
