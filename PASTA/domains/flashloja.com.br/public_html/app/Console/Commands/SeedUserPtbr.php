<?php

namespace App\Console\Commands;

use App\Services\UserLanguageSeeder;
use Illuminate\Console\Command;
use App\Models\User;

class SeedUserPtbr extends Command
{
    protected $signature = "user:seed-ptbr {--user_id=} {--all} {--source=en} {--target=pt-BR} {--no-default}";

    protected $description = "Copy EN language content to PT-BR for a user (or all users) so the site does not lose products when switching language.";

    public function handle(UserLanguageSeeder $seeder)
    {
        $source = (string) $this->option("source");
        $target = (string) $this->option("target");
        $makeDefault = !$this->option("no-default");

        if ($this->option("all")) {
            $users = User::query()->select("id")->orderBy("id")->cursor();
            $ok = 0;
            $skipped = 0;
            foreach ($users as $u) {
                $res = $seeder->seed((int) $u->id, $source, $target, $makeDefault);
                if (!($res["ok"] ?? false)) {
                    $skipped++;
                    continue;
                }
                $ok++;
                $this->line("user {$u->id}: ok");
            }
            $this->info("done. ok={$ok} skipped={$skipped}");
            return 0;
        }

        $userId = (int) ($this->option("user_id") ?? 0);
        if ($userId <= 0) {
            $this->error("Provide --user_id=<id> or use --all");
            return 1;
        }

        $res = $seeder->seed($userId, $source, $target, $makeDefault);
        if (!($res["ok"] ?? false)) {
            $this->error("failed: " . json_encode($res));
            return 2;
        }

        $this->info("ok: " . json_encode($res));
        return 0;
    }
}
