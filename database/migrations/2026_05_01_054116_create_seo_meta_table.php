<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('seo_metas', function (Blueprint $table) {
            $table->id();
            $table->string('page_slug')->unique();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('og_image')->nullable();
            $table->string('canonical_url')->nullable();
            $table->boolean('no_index')->default(false);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('seo_metas'); }
};
