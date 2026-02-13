<?php
/**
 * ============================================================
 * Migration: Migrar dados de UserAppearanceSetting → UserThemeState
 * ============================================================
 * 
 * Execute esta migration para copiar os dados existentes de
 * user_appearance_settings (modelo antigo) para user_theme_states
 * (modelo novo usado pelo Editor Premium Inertia).
 * 
 * COPIE para: database/migrations/xxxx_xx_xx_migrate_appearance_to_theme_states.php
 * Execute: php artisan migrate
 */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Ensure user_theme_states table exists
        if (!Schema::hasTable('user_theme_states')) {
            Schema::create('user_theme_states', function ($table) {
                $table->id();
                $table->unsignedBigInteger('user_id');
                $table->string('theme')->default('premium');
                $table->json('draft')->nullable();
                $table->json('published')->nullable();
                $table->integer('draft_version')->default(1);
                $table->integer('published_version')->default(1);
                $table->timestamps();
                $table->unique(['user_id', 'theme']);
            });
        }

        // Ensure user_theme_versions table exists
        if (!Schema::hasTable('user_theme_versions')) {
            Schema::create('user_theme_versions', function ($table) {
                $table->id();
                $table->unsignedBigInteger('user_id');
                $table->string('theme')->default('premium');
                $table->integer('version');
                $table->json('config');
                $table->string('note')->nullable();
                $table->string('published_by')->default('admin');
                $table->timestamps();
                $table->index(['user_id', 'theme', 'version']);
            });
        }

        // Migrate existing appearance settings to theme states
        $appearances = DB::table('user_appearance_settings')
            ->where('theme', 'premium')
            ->get();

        foreach ($appearances as $app) {
            $settings = is_string($app->settings) 
                ? json_decode($app->settings, true) 
                : (array) $app->settings;

            if (!is_array($settings)) continue;

            DB::table('user_theme_states')->updateOrInsert(
                ['user_id' => $app->user_id, 'theme' => 'premium'],
                [
                    'draft' => json_encode($settings),
                    'published' => json_encode($settings),
                    'draft_version' => 1,
                    'published_version' => 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }

    public function down(): void
    {
        // Don't drop tables on rollback, just clear migrated data
    }
};
