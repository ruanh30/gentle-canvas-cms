<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class CustomizationController extends Controller
{
    public function index()
    {
        // Load the full theme JSON from settings
        $themeJson = Setting::get('theme_draft', '{}');
        $theme = json_decode($themeJson, true) ?: [];

        // Load published too for comparison
        $publishedJson = Setting::get('theme_published', '{}');

        $isDirty = $themeJson !== $publishedJson;

        return view('customization.index', compact('theme', 'isDirty'));
    }

    public function update(Request $request)
    {
        $action = $request->input('action', 'save_draft');

        if ($action === 'publish') {
            $draft = Setting::get('theme_draft', '{}');
            Setting::set('theme_published', $draft, 'theme');
            return redirect()->route('admin.customization.index')->with('success', 'Tema publicado com sucesso!');
        }

        if ($action === 'discard') {
            $published = Setting::get('theme_published', '{}');
            Setting::set('theme_draft', $published, 'theme');
            return redirect()->route('admin.customization.index')->with('success', 'Alterações descartadas.');
        }

        if ($action === 'reset') {
            Setting::set('theme_draft', '{}', 'theme');
            Setting::set('theme_published', '{}', 'theme');
            return redirect()->route('admin.customization.index')->with('success', 'Tema restaurado ao padrão.');
        }

        // Default: save draft — merge incoming fields into existing draft
        $themeJson = Setting::get('theme_draft', '{}');
        $theme = json_decode($themeJson, true) ?: [];

        // The form sends dot-notation keys like "colors.primary", "hero.slides.0.title"
        $inputs = $request->except(['_token', 'action', 'active_section']);

        foreach ($inputs as $key => $value) {
            data_set($theme, $key, $value);
        }

        // Handle homepageSections toggles
        if ($request->has('section_toggle')) {
            $sections = $theme['homepageSections'] ?? [];
            foreach ($request->input('section_toggle', []) as $sectionId => $enabled) {
                foreach ($sections as &$s) {
                    if (($s['id'] ?? '') === $sectionId) {
                        $s['enabled'] = (bool) $enabled;
                    }
                }
            }
            $theme['homepageSections'] = $sections;
        }

        Setting::set('theme_draft', json_encode($theme), 'theme');

        if ($request->ajax() || $request->wantsJson()) {
            return response()->json(['success' => true]);
        }

        return redirect()->route('admin.customization.index')
            ->with('success', 'Rascunho salvo!')
            ->withInput(['active_section' => $request->input('active_section', 'colors')]);
    }
}
