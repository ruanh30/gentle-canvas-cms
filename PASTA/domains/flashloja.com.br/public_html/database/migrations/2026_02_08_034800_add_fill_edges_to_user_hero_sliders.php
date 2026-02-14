<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('user_hero_sliders', function (Blueprint $table) {
            $table->boolean('fill_edges')->default(0)->after('banner_size');
        });
    }

    public function down(): void
    {
        Schema::table('user_hero_sliders', function (Blueprint $table) {
            $table->dropColumn('fill_edges');
        });
    }
};
