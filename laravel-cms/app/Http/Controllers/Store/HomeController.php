<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Setting;

class HomeController extends Controller
{
    public function index()
    {
        $featured = Product::where('is_published', true)->where('is_featured', true)->take(8)->get();
        $latest = Product::where('is_published', true)->latest()->take(8)->get();
        $categories = Category::where('is_active', true)->withCount('products')->take(6)->get();

        $hero = [
            'title' => Setting::get('hero_title', 'Bem-vindo à nossa loja'),
            'subtitle' => Setting::get('hero_subtitle', 'Encontre os melhores produtos'),
            'image' => Setting::get('hero_image', ''),
            'cta_text' => Setting::get('hero_cta_text', 'Ver Produtos'),
            'cta_link' => Setting::get('hero_cta_link', '/store/products'),
            'show' => Setting::get('show_hero', '1'),
        ];

        return view('store.home', compact('featured', 'latest', 'categories', 'hero'));
    }
}
