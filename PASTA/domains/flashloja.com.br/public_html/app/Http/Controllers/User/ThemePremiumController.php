<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\UserThemeState;
use App\Models\UserThemeVersion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ThemePremiumController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $theme = 'premium';

        $state = UserThemeState::firstOrCreate(
            ['user_id' => $user->id, 'theme' => $theme],
            ['draft' => null, 'published' => null, 'draft_version' => 0, 'published_version' => 0]
        );

        // Preview should open the tenant storefront, not the FlashLoja marketing homepage.
        // (Path-based tenancy is /{username}/...)
        $previewUrl = route('front.user.detail.view', ['username' => $user->username]) . '?theme-preview=true';

        return Inertia::render('User/PremiumAppearance/Editor', [
            'theme' => $theme,
            'initialDraft' => $state->draft ? json_decode($state->draft, true) : null,
            'initialPublished' => $state->published ? json_decode($state->published, true) : null,
            'draftVersion' => $state->draft_version,
            'publishedVersion' => $state->published_version,
            'previewUrl' => $previewUrl,
        ])->withViewData(['pageTitle' => 'Editor Premium']);
    }

    public function save(Request $request)
    {
        $user = Auth::user();
        $theme = 'premium';

        $payload = $request->validate([
            'config' => ['required', 'array'],
            'label' => ['nullable', 'string', 'max:255'],
        ]);

        $state = UserThemeState::firstOrCreate(['user_id' => $user->id, 'theme' => $theme]);
        $nextVersion = (int) $state->draft_version + 1;

        $json = json_encode($payload['config'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        $state->draft = $json;
        $state->draft_version = $nextVersion;
        $state->save();

        // Only create a version snapshot when user provides a label (explicit save).
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

        return back()->with('success', 'Rascunho salvo');
    }

    public function publish(Request $request)
    {
        $user = Auth::user();
        $theme = 'premium';

        $state = UserThemeState::firstOrCreate(['user_id' => $user->id, 'theme' => $theme]);
        $draft = $state->draft;

        if (!$draft) {
            return back()->with('error', 'Nenhum rascunho para publicar');
        }

        $nextVersion = (int) $state->published_version + 1;

        $state->published = $draft;
        $state->published_version = $nextVersion;
        $state->save();

        UserThemeVersion::create([
            'user_id' => $user->id,
            'theme' => $theme,
            'channel' => 'published',
            'version' => $nextVersion,
            'config' => $draft,
            'label' => $request->input('label'),
        ]);

        return back()->with('success', 'Tema publicado');
    }

    public function versions(Request $request)
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
    }
}
