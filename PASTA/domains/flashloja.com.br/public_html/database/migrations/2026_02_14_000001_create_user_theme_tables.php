<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('user_theme_states')) {
            Schema::create('user_theme_states', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('user_id')->index();
                $table->string('theme')->default('premium')->index();
                $table->longText('draft')->nullable();
                $table->longText('published')->nullable();
                $table->unsignedBigInteger('draft_version')->default(0);
                $table->unsignedBigInteger('published_version')->default(0);
                $table->timestamps();

                $table->unique(['user_id', 'theme']);
            });
        }

        if (!Schema::hasTable('user_theme_versions')) {
            Schema::create('user_theme_versions', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('user_id')->index();
                $table->string('theme')->default('premium')->index();
                $table->enum('channel', ['draft', 'published'])->index();
                $table->unsignedBigInteger('version')->index();
                $table->longText('config');
                $table->string('label')->nullable();
                $table->timestamps();

                $table->index(['user_id', 'theme', 'channel', 'version']);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('user_theme_versions');
        Schema::dropIfExists('user_theme_states');
    }
};
