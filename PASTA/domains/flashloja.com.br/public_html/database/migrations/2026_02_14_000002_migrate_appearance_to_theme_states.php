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

            // Normalize legacy keys to match React editor schema
            // homeSections → homepageSections
            if (isset($settings['homeSections']) && !isset($settings['homepageSections'])) {
                $settings['homepageSections'] = $settings['homeSections'];
                unset($settings['homeSections']);
            }
            // header.announcementBar → header.announcement
            if (isset($settings['header']['announcementBar']) && !isset($settings['header']['announcement'])) {
                $settings['header']['announcement'] = $settings['header']['announcementBar'];
                unset($settings['header']['announcementBar']);
            }
            // Fix legacy numeric/string type mismatches
            if (isset($settings['global']['borderRadius']) && is_numeric($settings['global']['borderRadius'])) {
                $r = (int) $settings['global']['borderRadius'];
                $map = [0 => 'none', 4 => 'small', 8 => 'medium', 12 => 'large'];
                $settings['global']['borderRadius'] = $map[$r] ?? 'medium';
            }
            if (isset($settings['global']['borderStyle']) && $settings['global']['borderStyle'] === 'solid') {
                $settings['global']['borderStyle'] = 'thin';
            }
            if (isset($settings['hero']['height']) && is_numeric($settings['hero']['height'])) {
                $h = (int) $settings['hero']['height'];
                $settings['hero']['height'] = $h <= 300 ? 'small' : ($h <= 450 ? 'medium' : ($h <= 600 ? 'large' : 'fullscreen'));
            }
            if (isset($settings['hero']['autoplaySpeed']) && $settings['hero']['autoplaySpeed'] > 100) {
                $settings['hero']['autoplaySpeed'] = round($settings['hero']['autoplaySpeed'] / 1000);
            }
            if (isset($settings['productCard']['imageBorderRadius']) && is_numeric($settings['productCard']['imageBorderRadius'])) {
                $r = (int) $settings['productCard']['imageBorderRadius'];
                $settings['productCard']['imageBorderRadius'] = $r <= 0 ? 'none' : ($r <= 4 ? 'small' : ($r <= 8 ? 'medium' : 'large'));
            }
            if (isset($settings['productCard']['shadow']) && $settings['productCard']['shadow'] === 'small') {
                $settings['productCard']['shadow'] = 'subtle';
            }
            if (isset($settings['productCard']['hoverShadow']) && is_string($settings['productCard']['hoverShadow'])) {
                $settings['productCard']['hoverShadow'] = $settings['productCard']['hoverShadow'] !== 'none';
            }
            if (isset($settings['productPage']['galleryLayout']) && $settings['productPage']['galleryLayout'] === 'thumbnails-left') {
                $settings['productPage']['galleryLayout'] = 'side-by-side';
            }
            if (isset($settings['category']['layout']) && $settings['category']['layout'] === 'sidebar') {
                $settings['category']['layout'] = 'sidebar-left';
            }
            if (isset($settings['category']['filterStyle']) && $settings['category']['filterStyle'] === 'sidebar') {
                $settings['category']['filterStyle'] = 'accordion';
            }
            if (isset($settings['category']['pagination']) && $settings['category']['pagination'] === 'numbered') {
                $settings['category']['pagination'] = 'classic';
            }
            if (isset($settings['category']['carouselSpeed']) && $settings['category']['carouselSpeed'] > 100) {
                $settings['category']['carouselSpeed'] = round($settings['category']['carouselSpeed'] / 1000);
            }
            if (isset($settings['category']['carouselDirection']) && $settings['category']['carouselDirection'] === 'horizontal') {
                $settings['category']['carouselDirection'] = 'ltr';
            }
            if (isset($settings['checkout']['layout']) && $settings['checkout']['layout'] === 'two-column') {
                $settings['checkout']['layout'] = 'two-columns';
            }
            if (isset($settings['checkout']['stepsStyle']) && $settings['checkout']['stepsStyle'] === 'progress') {
                $settings['checkout']['stepsStyle'] = 'progress-bar';
            }
            if (isset($settings['productCard']['buttonVisibility']) && $settings['productCard']['buttonVisibility'] === 'hover') {
                $settings['productCard']['buttonVisibility'] = 'both';
            }
            if (isset($settings['productCard']['buttonLayout']) && $settings['productCard']['buttonLayout'] === 'full') {
                $settings['productCard']['buttonLayout'] = 'stacked';
            }

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
