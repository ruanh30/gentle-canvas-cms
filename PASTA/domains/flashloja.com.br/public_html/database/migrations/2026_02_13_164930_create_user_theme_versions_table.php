<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
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

    public function down(): void
    {
        Schema::dropIfExists('user_theme_versions');
    }
};
