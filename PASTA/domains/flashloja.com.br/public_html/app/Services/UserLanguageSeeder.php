<?php

namespace App\Services;

use App\Models\User\Language as UserLanguage;
use Illuminate\Support\Facades\DB;

class UserLanguageSeeder
{
    /**
     * Copy per-language content from one user language to another.
     * Conservative: only creates missing rows on target language.
     */
    public function seed(int $userId, string $sourceCode = "en", string $targetCode = "pt-BR", bool $makeTargetDefault = true): array
    {
        $sourceLang = UserLanguage::where("user_id", $userId)->where("code", $sourceCode)->first();
        $targetLang = UserLanguage::where("user_id", $userId)->where("code", $targetCode)->first();

        if (!$sourceLang || !$targetLang) {
            return [
                "ok" => false,
                "reason" => "missing_language",
                "source_exists" => (bool) $sourceLang,
                "target_exists" => (bool) $targetLang,
            ];
        }

        if ($makeTargetDefault) {
            UserLanguage::where("user_id", $userId)->update([
                "is_default" => 0,
                "dashboard_default" => 0,
            ]);
            $targetLang->is_default = 1;
            $targetLang->dashboard_default = 1;
            $targetLang->save();
        }

        $stats = [
            "ok" => true,
            "user_id" => $userId,
            "source_language_id" => (int) $sourceLang->id,
            "target_language_id" => (int) $targetLang->id,
            "created" => [],
        ];

        DB::transaction(function () use ($userId, $sourceLang, $targetLang, &$stats) {
            $catMap = $this->copyCategories($userId, (int) $sourceLang->id, (int) $targetLang->id, $stats);
            $subMap = $this->copySubCategories($userId, (int) $sourceLang->id, (int) $targetLang->id, $catMap, $stats);
            $this->copyItemContents($userId, (int) $sourceLang->id, (int) $targetLang->id, $catMap, $subMap, $stats);

            $simpleTables = [
                "user_menus",
                "user_headers",
                "user_footers",
                "user_banners",
                "user_hero_sliders",
                "user_sections",
                "user_seos",
                "user_tabs",
                "user_contacts",
                "user_page_contents",
                "user_blog_categories",
                "user_blog_contents",
                "user_faqs",
                "user_call_to_actions",
                "user_counter_sections",
                "user_counter_information",
                "user_shipping_charges",
                "user_ulinks",
                "labels",
            ];

            foreach ($simpleTables as $table) {
                $this->copySimpleTable($table, $userId, (int) $sourceLang->id, (int) $targetLang->id, $stats);
            }
        });

        return $stats;
    }

    private function copyCategories(int $userId, int $sourceLangId, int $targetLangId, array &$stats): array
    {
        $src = DB::table("user_item_categories")
            ->where("user_id", $userId)
            ->where("language_id", $sourceLangId)
            ->get();

        $existing = DB::table("user_item_categories")
            ->where("user_id", $userId)
            ->where("language_id", $targetLangId)
            ->pluck("id", "unique_id")
            ->toArray();

        $map = [];
        $created = 0;

        foreach ($src as $row) {
            $u = $row->unique_id ?? null;

            if ($u && isset($existing[$u])) {
                $map[(int) $row->id] = (int) $existing[$u];
                continue;
            }

            $data = (array) $row;
            unset($data["id"]);
            $data["language_id"] = $targetLangId;
            $data["created_at"] = now();
            $data["updated_at"] = now();

            $newId = DB::table("user_item_categories")->insertGetId($data);
            $created++;
            $map[(int) $row->id] = (int) $newId;
            if ($u) {
                $existing[$u] = (int) $newId;
            }
        }

        $stats["created"]["user_item_categories"] = $created;
        return $map;
    }

    private function copySubCategories(int $userId, int $sourceLangId, int $targetLangId, array $catMap, array &$stats): array
    {
        $src = DB::table("user_item_sub_categories")
            ->where("user_id", $userId)
            ->where("language_id", $sourceLangId)
            ->get();

        $existing = DB::table("user_item_sub_categories")
            ->where("user_id", $userId)
            ->where("language_id", $targetLangId)
            ->pluck("id", "unique_id")
            ->toArray();

        $map = [];
        $created = 0;

        foreach ($src as $row) {
            $u = $row->unique_id ?? null;

            if ($u && isset($existing[$u])) {
                $map[(int) $row->id] = (int) $existing[$u];
                continue;
            }

            $data = (array) $row;
            unset($data["id"]);
            $data["language_id"] = $targetLangId;

            if (!empty($data["category_id"]) && isset($catMap[(int) $data["category_id"]])) {
                $data["category_id"] = $catMap[(int) $data["category_id"]];
            }

            $data["created_at"] = now();
            $data["updated_at"] = now();

            $newId = DB::table("user_item_sub_categories")->insertGetId($data);
            $created++;
            $map[(int) $row->id] = (int) $newId;
            if ($u) {
                $existing[$u] = (int) $newId;
            }
        }

        $stats["created"]["user_item_sub_categories"] = $created;
        return $map;
    }

    private function copyItemContents(int $userId, int $sourceLangId, int $targetLangId, array $catMap, array $subMap, array &$stats): void
    {
        $src = DB::table("user_item_contents")
            ->where("user_id", $userId)
            ->where("language_id", $sourceLangId)
            ->get();

        $existing = DB::table("user_item_contents")
            ->where("user_id", $userId)
            ->where("language_id", $targetLangId)
            ->pluck("id", "item_id")
            ->toArray();

        $created = 0;

        foreach ($src as $row) {
            if (isset($existing[(int) $row->item_id])) {
                continue;
            }

            $data = (array) $row;
            unset($data["id"]);
            $data["language_id"] = $targetLangId;

            if (!empty($data["category_id"]) && isset($catMap[(int) $data["category_id"]])) {
                $data["category_id"] = $catMap[(int) $data["category_id"]];
            } else {
                $data["category_id"] = $data["category_id"] ?: null;
            }

            if (!empty($data["subcategory_id"]) && isset($subMap[(int) $data["subcategory_id"]])) {
                $data["subcategory_id"] = $subMap[(int) $data["subcategory_id"]];
            } else {
                $data["subcategory_id"] = $data["subcategory_id"] ?: null;
            }

            $data["created_at"] = now();
            $data["updated_at"] = now();

            DB::table("user_item_contents")->insert($data);
            $created++;
        }

        $stats["created"]["user_item_contents"] = $created;
    }

    private function copySimpleTable(string $table, int $userId, int $sourceLangId, int $targetLangId, array &$stats): void
    {
        if (!DB::getSchemaBuilder()->hasTable($table)) {
            return;
        }

        $columns = DB::getSchemaBuilder()->getColumnListing($table);
        $hasCreatedAt = in_array("created_at", $columns, true);
        $hasUpdatedAt = in_array("updated_at", $columns, true);

        $src = DB::table($table)
            ->where("user_id", $userId)
            ->where("language_id", $sourceLangId)
            ->get();

        if ($src->isEmpty()) {
            $stats["created"][$table] = 0;
            return;
        }

        $tgtCount = DB::table($table)
            ->where("user_id", $userId)
            ->where("language_id", $targetLangId)
            ->count();

        if ($tgtCount > 0) {
            $stats["created"][$table] = 0;
            return;
        }

        $created = 0;
        foreach ($src as $row) {
            $data = (array) $row;
            unset($data["id"]);
            $data["language_id"] = $targetLangId;

            if ($hasCreatedAt) {
                $data["created_at"] = now();
            } else {
                unset($data["created_at"]);
            }

            if ($hasUpdatedAt) {
                $data["updated_at"] = now();
            } else {
                unset($data["updated_at"]);
            }

            DB::table($table)->insert($data);
            $created++;
        }

        $stats["created"][$table] = $created;
    }
}
