<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Setting;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        // Preview iframe must read draft; storefront route / reads published
        $isThemePreview = $request->boolean('theme-preview');
        $themeKey = $isThemePreview ? 'theme_draft' : 'theme_published';

        $themeJson = Setting::get($themeKey, '{}');
        $theme = json_decode($themeJson, true) ?: [];

        // Backward compatibility: if a legacy flat payload was saved, fallback to published nested
        if (isset($theme['colors_primary']) || isset($theme['hero_title'])) {
            $fallback = json_decode(Setting::get('theme_published', '{}'), true) ?: [];
            if (!empty($fallback) && !isset($fallback['colors_primary'])) {
                $theme = $fallback;
            }
        }

        // Merge with defaults (mirrors theme-presets.ts defaultThemeConfig)
        $defaults = $this->getDefaults();
        $theme = array_replace_recursive($defaults, $theme);

        // Data for sections
        $featured = Product::where('is_published', true)->where('is_featured', true)->take(8)->get();
        $latest = Product::where('is_published', true)->latest()->take(8)->get();
        $categories = Category::where('is_active', true)->withCount('products')->take(6)->get();
        $collections = Collection::where('is_active', true)->orderBy('order')->with('products')->get();

        return view('store.home', compact('theme', 'featured', 'latest', 'categories', 'collections'));
    }

    private function getDefaults(): array
    {
        return [
            'hero' => [
                'enabled' => true,
                'slides' => [[
                    'title' => "Estilo que\ndefine você",
                    'subtitle' => 'Nova Coleção',
                    'description' => 'Descubra peças únicas com design atemporal e qualidade premium.',
                    'ctaText' => 'Ver coleção',
                    'ctaLink' => '/products',
                    'backgroundImage' => '',
                    'overlayColor' => '#000000',
                    'overlayOpacity' => 0,
                    'contentAlign' => 'left',
                ]],
            ],
            'logo' => ['text' => 'MODA STORE', 'showText' => true, 'imageUrl' => '', 'maxHeight' => 40],
            'header' => [
                'layout' => 'classic', 'sticky' => true, 'borderBottom' => true, 'height' => 64,
                'menuFontSize' => 13, 'menuUppercase' => true, 'menuLetterSpacing' => 0.1,
                'iconSize' => 20, 'showSearch' => true, 'showAccount' => true, 'showWishlist' => false,
                'showCart' => true, 'cartBadgeStyle' => 'count',
                'announcement' => [
                    'enabled' => true, 'messages' => ['Frete grátis acima de R$ 299'],
                    'speed' => 5, 'backgroundColor' => '#1a1a1a', 'textColor' => '#fafafa',
                    'style' => 'static', 'direction' => 'rtl',
                ],
                'bannerBelow' => ['enabled' => false, 'imageUrl' => '', 'images' => [], 'link' => '', 'height' => 60],
            ],
            'homepageSections' => [
                ['id' => 'hero', 'type' => 'hero', 'enabled' => true, 'title' => 'Hero Banner', 'showTitle' => false, 'settings' => []],
                ['id' => 'categories', 'type' => 'categories', 'enabled' => true, 'title' => 'Categorias', 'showTitle' => true, 'settings' => []],
                ['id' => 'featured', 'type' => 'featured-products', 'enabled' => true, 'title' => 'Destaques', 'showTitle' => true, 'settings' => []],
                ['id' => 'banner', 'type' => 'banner', 'enabled' => true, 'title' => 'Banner Promocional', 'showTitle' => false, 'settings' => ['title' => 'Cadastre-se e ganhe 15% OFF', 'description' => 'Use o cupom BEMVINDO na sua primeira compra.']],
                ['id' => 'benefits', 'type' => 'benefits', 'enabled' => false, 'title' => 'Benefícios', 'showTitle' => false, 'settings' => []],
                ['id' => 'testimonials', 'type' => 'testimonials', 'enabled' => false, 'title' => 'Depoimentos', 'showTitle' => true, 'settings' => []],
                ['id' => 'brands', 'type' => 'brands', 'enabled' => false, 'title' => 'Marcas', 'showTitle' => true, 'settings' => []],
                ['id' => 'newsletter', 'type' => 'newsletter', 'enabled' => false, 'title' => 'Newsletter', 'showTitle' => true, 'settings' => []],
                ['id' => 'trust-bar', 'type' => 'trust-bar', 'enabled' => false, 'title' => 'Selos de Confiança', 'showTitle' => false, 'settings' => []],
            ],
            'footer' => [
                'backgroundColor' => '#1a1a1a', 'textColor' => '#fafafa',
                'showNewsletter' => false, 'newsletterDescription' => 'Cadastre-se e fique por dentro.',
                'showSocial' => true, 'socialLinks' => [['platform' => 'instagram', 'url' => '#'], ['platform' => 'facebook', 'url' => '#']],
                'copyrightText' => '© 2024 {storeName}. Todos os direitos reservados.',
                'showBackToTop' => true,
                'columns' => [
                    ['title' => 'Institucional', 'links' => [['label' => 'Sobre nós', 'url' => '/about'], ['label' => 'Contato', 'url' => '/contact'], ['label' => 'FAQ', 'url' => '/faq']], 'enabled' => true],
                    ['title' => 'Ajuda', 'links' => [['label' => 'Entregas', 'url' => '/shipping'], ['label' => 'Trocas', 'url' => '/returns'], ['label' => 'Privacidade', 'url' => '/privacy']], 'enabled' => true],
                    ['title' => 'Contato', 'links' => [['label' => 'contato@loja.com', 'url' => 'mailto:contato@loja.com'], ['label' => '(11) 99999-0000', 'url' => 'tel:+5511999990000']], 'enabled' => true],
                ],
                'bottomLinks' => [['label' => 'Termos de Uso', 'url' => '/terms'], ['label' => 'Política de Privacidade', 'url' => '/privacy']],
            ],
            'whatsapp' => ['enabled' => false, 'number' => '', 'message' => 'Olá!', 'position' => 'bottom-right', 'showLabel' => false, 'label' => 'Precisa de ajuda?', 'backgroundColor' => '#25d366', 'delay' => 3],
            'colors' => [
                'primary' => '#1a1a1a', 'primaryForeground' => '#fafafa',
                'secondary' => '#f5f5f5', 'secondaryForeground' => '#1a1a1a',
                'accent' => '#f5f5f5', 'accentForeground' => '#1a1a1a',
                'background' => '#ffffff', 'foreground' => '#1a1a1a',
                'muted' => '#f5f5f5', 'mutedForeground' => '#737373',
                'border' => '#e5e5e5', 'buyNow' => '#dc2626', 'buyNowHover' => '#b91c1c',
            ],
            'typography' => ['headingFont' => 'Playfair Display', 'bodyFont' => 'Inter', 'baseFontSize' => 16],
            'productCard' => ['showDiscount' => true, 'showComparePrice' => true, 'showInstallments' => false, 'showAddToCart' => true, 'showBuyNow' => true],
            'category' => ['columnsDesktop' => 4],
        ];
    }
}
