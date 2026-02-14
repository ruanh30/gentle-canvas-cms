<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('user_appearance_settings')) {
            return;
        }

        $appearances = DB::table('user_appearance_settings')->get();

        foreach ($appearances as $app) {
            $settings = is_string($app->settings)
                ? json_decode($app->settings, true)
                : (array) $app->settings;

            if (!is_array($settings)) continue;

            // Remove _versions key from settings JSON (cleanup bloat)
            $versions = $settings['_versions'] ?? [];
            unset($settings['_versions']);

            $json = json_encode($settings, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            $theme = $app->theme ?? 'premium';

            // Insert into user_theme_states
            DB::table('user_theme_states')->updateOrInsert(
                ['user_id' => $app->user_id, 'theme' => $theme],
                [
                    'draft' => $json,
                    'published' => $json,
                    'draft_version' => 1,
                    'published_version' => 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );

            // Migrate _versions history if present
            if (is_array($versions)) {
                foreach ($versions as $i => $v) {
                    $vConfig = $v['config'] ?? $v;
                    DB::table('user_theme_versions')->insert([
                        'user_id' => $app->user_id,
                        'theme' => $theme,
                        'channel' => 'published',
                        'version' => $i + 1,
                        'config' => json_encode($vConfig, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                        'label' => $v['label'] ?? null,
                        'created_at' => $v['created_at'] ?? now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
    }

    public function down(): void
    {
        // Não apaga dados no rollback
    }
};
