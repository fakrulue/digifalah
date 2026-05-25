<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('page_blocks', function (Blueprint $table) {
            $table->id();
            $table->string('page_slug');
            $table->string('block_type');
            $table->json('content')->nullable();
            $table->integer('position')->default(0);
            $table->boolean('is_visible')->default(true);
            $table->timestamps();
            $table->index('page_slug');
        });
    }
    public function down(): void { Schema::dropIfExists('page_blocks'); }
};
