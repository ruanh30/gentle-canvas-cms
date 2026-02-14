<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
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

    public function down(): void
    {
        Schema::dropIfExists('user_theme_states');
    }
};
