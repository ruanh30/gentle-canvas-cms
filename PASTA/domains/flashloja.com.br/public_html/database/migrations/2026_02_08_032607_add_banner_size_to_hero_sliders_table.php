<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('user_hero_sliders', function (Blueprint $table) {
            $table->string('banner_size', 20)->default('870x590')->after('img');
        });
    }

    public function down(): void
    {
        Schema::table('user_hero_sliders', function (Blueprint $table) {
            $table->dropColumn('banner_size');
        });
    }
};
