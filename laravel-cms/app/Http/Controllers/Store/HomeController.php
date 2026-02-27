<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Http\Controllers\CustomizationController;
use App\Models\Product;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Setting;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $isThemePreview = $request->boolean('theme-preview');
        $themeKey = $isThemePreview ? 'theme_draft' : 'theme_published';

        $themeJson = Setting::get($themeKey, '{}');
        $theme = json_decode($themeJson, true) ?: [];

        // If flat format was saved, convert via controller
        if (isset($theme['colors_primary']) || isset($theme['hero_title'])) {
            $fallback = json_decode(Setting::get('theme_published', '{}'), true) ?: [];
            if (!empty($fallback) && !isset($fallback['colors_primary'])) {
                $theme = $fallback;
            }
        }

        // Merge with canonical defaults from CustomizationController
        $defaults = CustomizationController::nestedDefaults();
        $theme = array_replace_recursive($defaults, $theme);

        // Data for sections
        $featured = Product::where('is_published', true)->where('is_featured', true)->take(8)->get();
        $latest = Product::where('is_published', true)->latest()->take(8)->get();
        $categories = Category::where('is_active', true)->withCount('products')->take(6)->get();
        $collections = Collection::where('is_active', true)->orderBy('order')->with('products')->get();

        return view('store.home', compact('theme', 'featured', 'latest', 'categories', 'collections'));
    }
}
