<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class CustomizationController extends Controller
{
    public function index()
    {
        $theme = [
            'primary_color' => Setting::get('theme_primary_color', '#3b82f6'),
            'store_name' => Setting::get('store_name', 'Minha Loja'),
            'store_description' => Setting::get('store_description', ''),
            'logo_url' => Setting::get('logo_url', ''),
            'favicon_url' => Setting::get('favicon_url', ''),
            'header_style' => Setting::get('header_style', 'default'),
            'footer_text' => Setting::get('footer_text', ''),
            'show_hero' => Setting::get('show_hero', '1'),
            'hero_title' => Setting::get('hero_title', 'Bem-vindo'),
            'hero_subtitle' => Setting::get('hero_subtitle', ''),
            'hero_image' => Setting::get('hero_image', ''),
            'hero_cta_text' => Setting::get('hero_cta_text', 'Ver Produtos'),
            'hero_cta_link' => Setting::get('hero_cta_link', '/store/products'),
        ];
        return view('customization.index', compact('theme'));
    }

    public function update(Request $request)
    {
        $fields = [
            'theme_primary_color', 'store_name', 'store_description', 'logo_url',
            'favicon_url', 'header_style', 'footer_text', 'show_hero',
            'hero_title', 'hero_subtitle', 'hero_image', 'hero_cta_text', 'hero_cta_link',
        ];

        foreach ($fields as $field) {
            if ($request->has($field)) {
                Setting::set($field, $request->input($field), 'theme');
            }
        }

        return redirect()->route('admin.customization.index')->with('success', 'Personalização salva!');
    }
}
