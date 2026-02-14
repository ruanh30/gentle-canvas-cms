"""
Patch ThemePremiumController:
1) save() - don't create UserThemeVersion on auto-save (only when label is provided)
2) versions() - include config + created_at for rollback support
3) Add rollback() method
4) Clean up excess draft version rows
"""
from pathlib import Path
import json

base = Path('~/domains/flashloja.com.br/public_html').expanduser()

# ============================================================
# 1) Patch ThemePremiumController
# ============================================================
ctrl = base / 'app/Http/Controllers/User/ThemePremiumController.php'
s = ctrl.read_text('utf-8')

# 1a) save() - only create UserThemeVersion when label is provided
old_save_block = """        UserThemeVersion::create([
            'user_id' => $user->id,
            'theme' => $theme,
            'channel' => 'draft',
            'version' => $nextVersion,
            'config' => $json,
            'label' => $payload['label'] ?? null,
        ]);

        return back()->with('success', 'Rascunho salvo');"""

new_save_block = """        // Only create a version snapshot when user provides a label (explicit save).
        // Auto-saves (no label) just update user_theme_states without flooding versions table.
        if (!empty($payload['label'])) {
            UserThemeVersion::create([
                'user_id' => $user->id,
                'theme' => $theme,
                'channel' => 'draft',
                'version' => $nextVersion,
                'config' => $json,
                'label' => $payload['label'],
            ]);
        }

        return back()->with('success', 'Rascunho salvo');"""

if old_save_block in s:
    s = s.replace(old_save_block, new_save_block)
    print('[1a] save() patched - no more version flooding')
else:
    print('[1a] save() block not found (may already be patched)')

# 1b) versions() - include config for rollback
old_versions = """    public function versions(Request $request)
    {
        $user = Auth::user();
        $theme = 'premium';

        $versions = UserThemeVersion::query()
            ->where('user_id', $user->id)
            ->where('theme', $theme)
            ->orderByDesc('id')
            ->limit(50)
            ->get(['id', 'channel', 'version', 'label', 'created_at']);

        return response()->json($versions);
    }"""

new_versions = """    public function versions(Request $request)
    {
        $user = Auth::user();
        $theme = 'premium';

        // Return published versions with config (for rollback) + recent labeled drafts
        $versions = UserThemeVersion::query()
            ->where('user_id', $user->id)
            ->where('theme', $theme)
            ->where(function ($q) {
                $q->where('channel', 'published')
                  ->orWhereNotNull('label');
            })
            ->orderByDesc('id')
            ->limit(50)
            ->get(['id', 'channel', 'version', 'label', 'config', 'created_at']);

        // Map to format expected by ThemeEditorLayout
        $mapped = $versions->map(function ($v) {
            return [
                'version' => $v->version,
                'channel' => $v->channel,
                'label' => $v->label,
                'publishedAt' => $v->created_at->toISOString(),
                'note' => $v->label ?? ($v->channel === 'published' ? 'Publicação' : 'Rascunho'),
                'config' => $v->config ? json_decode($v->config, true) : null,
            ];
        });

        return response()->json($mapped);
    }

    public function rollback(Request $request)
    {
        $user = Auth::user();
        $theme = 'premium';

        $payload = $request->validate([
            'version' => ['required', 'integer'],
        ]);

        $v = UserThemeVersion::where('user_id', $user->id)
            ->where('theme', $theme)
            ->where('version', $payload['version'])
            ->first();

        if (!$v || !$v->config) {
            return back()->with('error', 'Versão não encontrada');
        }

        $state = UserThemeState::firstOrCreate(['user_id' => $user->id, 'theme' => $theme]);
        $state->draft = $v->config;
        $state->draft_version = (int) $state->draft_version + 1;
        $state->save();

        return back()->with('success', 'Versão restaurada como rascunho');
    }"""

if old_versions in s:
    s = s.replace(old_versions, new_versions)
    print('[1b] versions() patched + rollback() added')
elif 'public function rollback' not in s:
    # Try to find just the closing brace and insert before it
    print('[1b] versions() block not found exactly - skipping')
else:
    print('[1b] rollback() already exists')

ctrl.write_text(s, 'utf-8')

# ============================================================
# 2) Add rollback route if missing
# ============================================================
routes = base / 'routes/user.php'
r = routes.read_text('utf-8')
if 'appearance-premium/rollback' not in r:
    # Find the publish route and add rollback after it
    publish_route = "Route::post('/site-settings/appearance-premium/publish'"
    if publish_route in r:
        idx = r.find(publish_route)
        end = r.find(';', idx) + 1
        rollback_line = "\n    Route::post('/site-settings/appearance-premium/rollback', [App\\Http\\Controllers\\User\\ThemePremiumController::class, 'rollback'])->name('user.appearance.premium.rollback');"
        r = r[:end] + rollback_line + r[end:]
        routes.write_text(r, 'utf-8')
        print('[2] rollback route added')
    else:
        print('[2] publish route not found - skipping rollback route')
else:
    print('[2] rollback route already exists')

# ============================================================
# 3) Clean up excess draft version rows (keep last 20 drafts + all published)
# ============================================================
import subprocess
cleanup_sql = """
DELETE FROM user_theme_versions 
WHERE theme = 'premium' 
  AND channel = 'draft' 
  AND label IS NULL
  AND id NOT IN (
    SELECT id FROM (
      SELECT id FROM user_theme_versions 
      WHERE theme = 'premium' AND channel = 'draft'
      ORDER BY id DESC LIMIT 20
    ) AS keep_rows
  );
"""

# Write cleanup script
cleanup_php = base / 'cleanup_draft_versions.php'
cleanup_php.write_text(f"""<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\\Contracts\\Console\\Kernel::class);
$kernel->bootstrap();

$deleted = Illuminate\\Support\\Facades\\DB::table('user_theme_versions')
    ->where('theme', 'premium')
    ->where('channel', 'draft')
    ->whereNull('label')
    ->whereNotIn('id', function ($q) {{
        $q->select('id')
          ->from(Illuminate\\Support\\Facades\\DB::raw('(SELECT id FROM user_theme_versions WHERE theme = "premium" AND channel = "draft" ORDER BY id DESC LIMIT 20) AS keep_rows'));
    }})
    ->delete();

echo "Deleted $deleted excess draft version rows\\n";
""", 'utf-8')
print('[3] cleanup script written')

print('\\nAll server patches applied. Run cleanup_draft_versions.php to clean DB.')
