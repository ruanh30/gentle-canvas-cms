<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Helpers\Uploader;
use App\Models\User\BasicSetting;
use App\Models\User\UserAppearanceSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PremiumAppearanceController extends Controller
{
    private function ensurePremium(): BasicSetting
    {
        $ubs = BasicSetting::where('user_id', Auth::guard('web')->user()->id)->firstOrFail();
        if ($ubs->theme !== 'premium') {
            abort(404);
        }
        return $ubs;
    }

    public static function defaults(): array
    {
        return [
            'colors' => [
                'primary' => '#6366f1',
                'primaryForeground' => '#ffffff',
                'secondary' => '#f1f5f9',
                'secondaryForeground' => '#0f172a',
                'accent' => '#f59e0b',
                'accentForeground' => '#ffffff',
                'background' => '#ffffff',
                'foreground' => '#0f172a',
                'muted' => '#f1f5f9',
                'mutedForeground' => '#64748b',
                'border' => '#e2e8f0',
                'success' => '#22c55e',
                'warning' => '#f59e0b',
                'error' => '#ef4444',
                'buyNow' => '#6366f1',
                'buyNowHover' => '#4f46e5',
            ],
            'typography' => [
                'headingFont' => 'Poppins',
                'bodyFont' => 'Inter',
                'baseFontSize' => 16,
                'headingWeight' => '700',
                'bodyWeight' => '400',
                'lineHeight' => 1.6,
                'letterSpacing' => 0,
            ],
            'buttons' => [
                'style' => 'filled',
                'radius' => 'medium',
                'size' => 'medium',
                'uppercase' => false,
                'fontWeight' => '600',
                'shadow' => false,
            ],
            'inputs' => [
                'radius' => 'medium',
                'borderWidth' => 1,
                'focusRing' => true,
                'style' => 'default',
            ],
            'global' => [
                'containerWidth' => 'default',
                'containerMaxPx' => 1280,
                'sectionSpacing' => 'normal',
                'borderRadius' => 'medium',
                'shadowLevel' => 'medium',
                'borderStyle' => 'thin',
                'animationsEnabled' => true,
                'animationSpeed' => 'normal',
                'scrollBehavior' => 'smooth',
            ],
            'logo' => [
                'text' => 'Minha Loja',
                'imageUrl' => '',
                'showText' => true,
                'maxHeight' => 48,
                'position' => 'left',
            ],
            'header' => [
                'layout' => 'classic',
                'sticky' => true,
                'shrinkOnScroll' => false,
                'shadowOnScroll' => true,
                'backgroundColor' => '#ffffff',
                'borderBottom' => true,
                'height' => 72,
                'menuStyle' => 'horizontal',
                'menuFontSize' => 14,
                'menuUppercase' => false,
                'menuLetterSpacing' => 0,
                'iconSize' => 20,
                'showSearch' => true,
                'searchStyle' => 'modal',
                'showAccount' => true,
                'showWishlist' => true,
                'showCart' => true,
                'cartBadgeStyle' => 'dot',
                'announcement' => [
                    'enabled' => false,
                    'messages' => ['Frete grátis acima de R$ 299'],
                    'speed' => 30,
                    'backgroundColor' => '#0f172a',
                    'textColor' => '#ffffff',
                    'showIcon' => false,
                    'icon' => 'truck',
                    'link' => '',
                    'pauseOnHover' => true,
                    'style' => 'static',
                    'direction' => 'left',
                ],
                'bannerBelow' => [
                    'enabled' => false,
                    'imageUrl' => '',
                    'images' => [],
                    'link' => '',
                    'height' => 300,
                    'fullWidth' => true,
                    'carousel' => false,
                    'carouselSpeed' => 5000,
                ],
            ],
            'hero' => [
                'enabled' => true,
                'height' => 'large',
                'autoplay' => true,
                'autoplaySpeed' => 5,
                'showDots' => true,
                'showArrows' => true,
                'transition' => 'slide',
                'slides' => [
                    [
                        'id' => 'slide-1',
                        'title' => "Estilo que\ndefine você",
                        'subtitle' => 'NOVA COLEÇÃO',
                        'description' => 'Descubra peças únicas com design atemporal e qualidade premium.',
                        'ctaText' => 'Ver coleção',
                        'ctaLink' => '/shop',
                        'ctaStyle' => 'filled',
                        'backgroundImage' => '',
                        'backgroundVideo' => '',
                        'overlayColor' => '#000000',
                        'overlayOpacity' => 0.3,
                        'contentAlign' => 'center',
                        'textColor' => '#ffffff',
                    ],
                ],
            ],
            'productCard' => [
                'layout' => 'standard',
                'imageAspect' => '3:4',
                'imageHover' => 'zoom',
                'imageBorderRadius' => 'medium',
                'showCategory' => false,
                'showBrand' => false,
                'showRating' => true,
                'showQuickView' => true,
                'quickViewStyle' => 'modal',
                'showWishlist' => true,
                'showAddToCart' => true,
                'showBuyNow' => false,
                'buyNowText' => 'Comprar Agora',
                'addToCartText' => 'Adicionar',
                'buttonVisibility' => 'both',
                'buttonLayout' => 'stacked',
                'buttonStyle' => 'solid',
                'addToCartStyle' => 'icon',
                'clickBehavior' => 'navigate',
                'badgePosition' => 'top-left',
                'badgeStyle' => 'rounded',
                'priceSize' => 'medium',
                'showComparePrice' => true,
                'showDiscount' => true,
                'discountStyle' => 'percentage',
                'showInstallments' => true,
                'titleLines' => 2,
                'contentAlign' => 'left',
                'spacing' => 'normal',
                'shadow' => 'subtle',
                'hoverShadow' => false,
                'border' => true,
            ],
            'productPage' => [
                'galleryLayout' => 'side-by-side',
                'galleryPosition' => 'left',
                'imageZoom' => true,
                'stickyGallery' => true,
                'showBreadcrumb' => true,
                'showSKU' => true,
                'showBrand' => true,
                'showRating' => true,
                'showStock' => true,
                'showShareButtons' => true,
                'variantStyle' => 'buttons',
                'quantityStyle' => 'stepper',
                'ctaLayout' => 'stacked',
                'ctaStickyMobile' => true,
                'showTrustBadges' => true,
                'trustBadges' => ['Pagamento Seguro', 'Entrega Garantida', 'Troca Fácil'],
                'tabsStyle' => 'tabs',
                'showRelated' => true,
                'relatedTitle' => 'Produtos Relacionados',
                'showRecentlyViewed' => true,
                'sizeGuideEnabled' => false,
                'shippingEstimate' => true,
            ],
            'category' => [
                'layout' => 'sidebar-left',
                'displayMode' => 'grid',
                'columnsDesktop' => 4,
                'columnsMobile' => 2,
                'filterStyle' => 'accordion',
                'showFilterCount' => true,
                'sortStyle' => 'dropdown',
                'pagination' => 'load-more',
                'productsPerPage' => 24,
                'showBanner' => true,
                'bannerHeight' => 200,
                'showBreadcrumb' => true,
                'showProductCount' => true,
                'carouselAutoplay' => false,
                'carouselSpeed' => 4,
                'carouselDirection' => 'ltr',
                'showAddToCartOnListing' => true,
            ],
            'cart' => [
                'style' => 'drawer',
                'showThumbnails' => true,
                'showQuantity' => true,
                'showCoupon' => true,
                'showShippingEstimate' => true,
                'showRecommendations' => true,
                'recommendationsTitle' => 'Você também pode gostar',
                'showFreeShippingBar' => true,
                'freeShippingThreshold' => 299,
                'freeShippingMessage' => 'Frete grátis acima de R$ {value}',
                'emptyCartMessage' => 'Seu carrinho está vazio',
                'emptyCartCta' => 'Continuar Comprando',
                'showContinueShopping' => true,
            ],
            'checkout' => [
                'layout' => 'two-columns',
                'stepsStyle' => 'numbered',
                'showOrderSummary' => true,
                'showCouponField' => true,
                'showTrustBadges' => true,
                'termsRequired' => false,
                'termsText' => '',
                'successTitle' => 'Pedido Confirmado!',
                'successMessage' => 'Obrigado pela sua compra.',
                'showConfetti' => true,
            ],
            'footer' => [
                'layout' => '4-columns',
                'backgroundColor' => '#0f172a',
                'textColor' => '#cbd5e1',
                'showNewsletter' => true,
                'newsletterTitle' => 'Receba nossas novidades',
                'newsletterDescription' => 'Cadastre-se e ganhe 10% de desconto na primeira compra.',
                'showSocial' => true,
                'socialLinks' => [
                    ['platform' => 'instagram', 'url' => ''],
                    ['platform' => 'facebook', 'url' => ''],
                    ['platform' => 'tiktok', 'url' => ''],
                ],
                'showPaymentIcons' => true,
                'showTrustSeals' => false,
                'copyrightText' => '© {year} {store}. Todos os direitos reservados.',
                'showBackToTop' => true,
                'columns' => [
                    ['title' => 'Institucional', 'links' => [['label' => 'Sobre Nós', 'url' => '/about'], ['label' => 'Contato', 'url' => '/contact']]],
                    ['title' => 'Ajuda', 'links' => [['label' => 'FAQ', 'url' => '/faq'], ['label' => 'Trocas e Devoluções', 'url' => '/trocas']]],
                    ['title' => 'Políticas', 'links' => [['label' => 'Privacidade', 'url' => '/privacidade'], ['label' => 'Termos de Uso', 'url' => '/termos']]],
                ],
                'bottomLinks' => [],
            ],
            'homepageSections' => [
                ['type' => 'hero', 'enabled' => true, 'title' => 'Banner Principal', 'showTitle' => false, 'settings' => []],
                ['type' => 'benefits', 'enabled' => true, 'title' => 'Benefícios', 'showTitle' => false, 'settings' => []],
                ['type' => 'categories', 'enabled' => true, 'title' => 'Categorias', 'showTitle' => true, 'settings' => ['displayMode' => 'carousel', 'carouselSpeed' => 3000]],
                ['type' => 'featured-products', 'enabled' => true, 'title' => 'Produtos em Destaque', 'showTitle' => true, 'settings' => ['displayMode' => 'grid']],
                ['type' => 'banner', 'enabled' => true, 'title' => 'Banner Promocional', 'showTitle' => false, 'settings' => []],
                ['type' => 'collections', 'enabled' => true, 'title' => 'Coleções', 'showTitle' => true, 'settings' => ['displayMode' => 'grid']],
                ['type' => 'testimonials', 'enabled' => false, 'title' => 'Depoimentos', 'showTitle' => true, 'settings' => []],
                ['type' => 'brands', 'enabled' => false, 'title' => 'Marcas', 'showTitle' => true, 'settings' => ['displayMode' => 'carousel']],
                ['type' => 'newsletter', 'enabled' => true, 'title' => 'Newsletter', 'showTitle' => false, 'settings' => []],
            ],
            'whatsapp' => [
                'enabled' => false,
                'number' => '',
                'message' => 'Olá! Gostaria de mais informações.',
                'position' => 'bottom-right',
                'showLabel' => true,
                'label' => 'Fale Conosco',
                'backgroundColor' => '#25D366',
                'delay' => 3,
            ],
            'seo' => [
                'titleTemplate' => '{title} | {store}',
                'defaultDescription' => '',
                'ogImage' => '',
                'showBreadcrumbs' => true,
            ],
            'accessibility' => [
                'minContrastRatio' => 4.5,
                'focusVisible' => true,
                'minTouchTarget' => 44,
                'reducedMotion' => false,
            ],
            'customCode' => [
                'css' => '',
                'headScripts' => '',
            ],
        ];
    }

    public static function presets(): array
    {
        return [
            'premium_legacy' => [ // kept for reference
                'label' => 'Minimalista',
                'colors' => ['primary'=>'#0f172a','primaryForeground'=>'#ffffff','secondary'=>'#f8fafc','secondaryForeground'=>'#0f172a','accent'=>'#0f172a','accentForeground'=>'#ffffff','background'=>'#ffffff','foreground'=>'#0f172a','muted'=>'#f1f5f9','mutedForeground'=>'#64748b','border'=>'#e2e8f0','success'=>'#22c55e','warning'=>'#f59e0b','error'=>'#ef4444','buyNow'=>'#0f172a','buyNowHover'=>'#1e293b'],
                'typography' => ['headingFont'=>'Inter','bodyFont'=>'Inter'],
            ],
            'moderno' => [
                'label' => 'Moderno',
                'colors' => ['primary'=>'#6366f1','primaryForeground'=>'#ffffff','secondary'=>'#f1f5f9','secondaryForeground'=>'#0f172a','accent'=>'#f59e0b','accentForeground'=>'#ffffff','background'=>'#ffffff','foreground'=>'#0f172a','muted'=>'#f1f5f9','mutedForeground'=>'#64748b','border'=>'#e2e8f0','success'=>'#22c55e','warning'=>'#f59e0b','error'=>'#ef4444','buyNow'=>'#6366f1','buyNowHover'=>'#4f46e5'],
                'typography' => ['headingFont'=>'Poppins','bodyFont'=>'Inter'],
            ],
            'elegante' => [
                'label' => 'Elegante',
                'colors' => ['primary'=>'#1a1a2e','primaryForeground'=>'#ffffff','secondary'=>'#f5f0eb','secondaryForeground'=>'#1a1a2e','accent'=>'#c9a96e','accentForeground'=>'#ffffff','background'=>'#faf8f5','foreground'=>'#1a1a2e','muted'=>'#f5f0eb','mutedForeground'=>'#6b6b6b','border'=>'#e8e0d8','success'=>'#22c55e','warning'=>'#f59e0b','error'=>'#ef4444','buyNow'=>'#1a1a2e','buyNowHover'=>'#2a2a3e'],
                'typography' => ['headingFont'=>'Playfair Display','bodyFont'=>'Lato'],
            ],
            'fashion' => [
                'label' => 'Fashion',
                'colors' => ['primary'=>'#000000','primaryForeground'=>'#ffffff','secondary'=>'#f5f5f5','secondaryForeground'=>'#000000','accent'=>'#e11d48','accentForeground'=>'#ffffff','background'=>'#ffffff','foreground'=>'#000000','muted'=>'#f5f5f5','mutedForeground'=>'#737373','border'=>'#e5e5e5','success'=>'#22c55e','warning'=>'#f59e0b','error'=>'#ef4444','buyNow'=>'#000000','buyNowHover'=>'#262626'],
                'typography' => ['headingFont'=>'Montserrat','bodyFont'=>'DM Sans'],
            ],
            'luxo' => [
                'label' => 'Luxo',
                'colors' => ['primary'=>'#1c1917','primaryForeground'=>'#fafaf9','secondary'=>'#f5f5f4','secondaryForeground'=>'#1c1917','accent'=>'#b8860b','accentForeground'=>'#ffffff','background'=>'#fafaf9','foreground'=>'#1c1917','muted'=>'#f5f5f4','mutedForeground'=>'#78716c','border'=>'#d6d3d1','success'=>'#22c55e','warning'=>'#f59e0b','error'=>'#ef4444','buyNow'=>'#b8860b','buyNowHover'=>'#996f09'],
                'typography' => ['headingFont'=>'Cormorant Garamond','bodyFont'=>'Lato'],
            ],
            'oceano' => [
                'label' => 'Oceano',
                'colors' => ['primary'=>'#0284c7','primaryForeground'=>'#ffffff','secondary'=>'#f0f9ff','secondaryForeground'=>'#0c4a6e','accent'=>'#06b6d4','accentForeground'=>'#ffffff','background'=>'#ffffff','foreground'=>'#0c4a6e','muted'=>'#f0f9ff','mutedForeground'=>'#64748b','border'=>'#bae6fd','success'=>'#22c55e','warning'=>'#f59e0b','error'=>'#ef4444','buyNow'=>'#0284c7','buyNowHover'=>'#0369a1'],
                'typography' => ['headingFont'=>'Raleway','bodyFont'=>'Open Sans'],
            ],
            'rose' => [
                'label' => 'Rosé',
                'colors' => ['primary'=>'#be185d','primaryForeground'=>'#ffffff','secondary'=>'#fff1f2','secondaryForeground'=>'#881337','accent'=>'#f43f5e','accentForeground'=>'#ffffff','background'=>'#fffbfb','foreground'=>'#881337','muted'=>'#fff1f2','mutedForeground'=>'#9f1239','border'=>'#fecdd3','success'=>'#22c55e','warning'=>'#f59e0b','error'=>'#ef4444','buyNow'=>'#be185d','buyNowHover'=>'#9f1239'],
                'typography' => ['headingFont'=>'DM Serif Display','bodyFont'=>'Nunito'],
            ],
            'natureza' => [
                'label' => 'Natureza',
                'colors' => ['primary'=>'#166534','primaryForeground'=>'#ffffff','secondary'=>'#f0fdf4','secondaryForeground'=>'#14532d','accent'=>'#84cc16','accentForeground'=>'#ffffff','background'=>'#fafdf7','foreground'=>'#14532d','muted'=>'#f0fdf4','mutedForeground'=>'#4d7c0f','border'=>'#bbf7d0','success'=>'#22c55e','warning'=>'#f59e0b','error'=>'#ef4444','buyNow'=>'#166534','buyNowHover'=>'#14532d'],
                'typography' => ['headingFont'=>'Lora','bodyFont'=>'Work Sans'],
            ],
            'dark_mode' => [
                'label' => 'Dark Mode',
                'colors' => ['primary'=>'#818cf8','primaryForeground'=>'#0f172a','secondary'=>'#1e293b','secondaryForeground'=>'#e2e8f0','accent'=>'#f59e0b','accentForeground'=>'#0f172a','background'=>'#0f172a','foreground'=>'#e2e8f0','muted'=>'#1e293b','mutedForeground'=>'#94a3b8','border'=>'#334155','success'=>'#22c55e','warning'=>'#f59e0b','error'=>'#ef4444','buyNow'=>'#818cf8','buyNowHover'=>'#6366f1'],
                'typography' => ['headingFont'=>'Poppins','bodyFont'=>'Inter'],
            ],
            'brutalist' => [
                'label' => 'Brutalist',
                'colors' => ['primary'=>'#000000','primaryForeground'=>'#ffffff','secondary'=>'#ffff00','secondaryForeground'=>'#000000','accent'=>'#ff0000','accentForeground'=>'#ffffff','background'=>'#ffffff','foreground'=>'#000000','muted'=>'#f5f5f5','mutedForeground'=>'#666666','border'=>'#000000','success'=>'#00ff00','warning'=>'#ffff00','error'=>'#ff0000','buyNow'=>'#000000','buyNowHover'=>'#333333'],
                'typography' => ['headingFont'=>'Oswald','bodyFont'=>'Roboto'],
            ],
            'candy_pop' => [
                'label' => 'Candy Pop',
                'colors' => ['primary'=>'#e879f9','primaryForeground'=>'#ffffff','secondary'=>'#fdf4ff','secondaryForeground'=>'#701a75','accent'=>'#38bdf8','accentForeground'=>'#ffffff','background'=>'#fffbfe','foreground'=>'#701a75','muted'=>'#fdf4ff','mutedForeground'=>'#a21caf','border'=>'#f0abfc','success'=>'#22c55e','warning'=>'#f59e0b','error'=>'#ef4444','buyNow'=>'#e879f9','buyNowHover'=>'#d946ef'],
                'typography' => ['headingFont'=>'Poppins','bodyFont'=>'Nunito'],
            ],
            'vintage' => [
                'label' => 'Vintage',
                'colors' => ['primary'=>'#78350f','primaryForeground'=>'#fefce8','secondary'=>'#fef3c7','secondaryForeground'=>'#78350f','accent'=>'#b45309','accentForeground'=>'#fefce8','background'=>'#fefce8','foreground'=>'#422006','muted'=>'#fef3c7','mutedForeground'=>'#92400e','border'=>'#fde68a','success'=>'#22c55e','warning'=>'#f59e0b','error'=>'#ef4444','buyNow'=>'#78350f','buyNowHover'=>'#92400e'],
                'typography' => ['headingFont'=>'Libre Baskerville','bodyFont'=>'Source Sans 3'],
            ],
            'neon_night' => [
                'label' => 'Neon Night',
                'colors' => ['primary'=>'#a855f7','primaryForeground'=>'#ffffff','secondary'=>'#1e1b4b','secondaryForeground'=>'#e0e7ff','accent'=>'#06b6d4','accentForeground'=>'#ffffff','background'=>'#0f0a1a','foreground'=>'#e0e7ff','muted'=>'#1e1b4b','mutedForeground'=>'#a5b4fc','border'=>'#312e81','success'=>'#22c55e','warning'=>'#f59e0b','error'=>'#ef4444','buyNow'=>'#a855f7','buyNowHover'=>'#9333ea'],
                'typography' => ['headingFont'=>'Montserrat','bodyFont'=>'Rubik'],
            ],
            'terra' => [
                'label' => 'Terra',
                'colors' => ['primary'=>'#9a3412','primaryForeground'=>'#ffffff','secondary'=>'#fef2f2','secondaryForeground'=>'#7c2d12','accent'=>'#d97706','accentForeground'=>'#ffffff','background'=>'#faf5f0','foreground'=>'#431407','muted'=>'#fed7aa','mutedForeground'=>'#9a3412','border'=>'#fdba74','success'=>'#22c55e','warning'=>'#f59e0b','error'=>'#ef4444','buyNow'=>'#9a3412','buyNowHover'=>'#7c2d12'],
                'typography' => ['headingFont'=>'Merriweather','bodyFont'=>'Manrope'],
            ],
        ];
    }

    public function index()
    {
        $ubs = $this->ensurePremium();

        $appearance = UserAppearanceSetting::firstOrCreate(
            ['user_id' => $ubs->user_id, 'theme' => 'premium'],
            [
                'settings' => self::defaults(),
                'custom_css' => null,
            ]
        );

        $settings = is_array($appearance->settings) ? $appearance->settings : [];
        $settings = array_replace_recursive(self::defaults(), $settings);
        $appearance->settings = $settings;

        return view('user.appearance.premium', [
            'ubs' => $ubs,
            'appearance' => $appearance,
            'presets' => self::presets(),
            'defaults' => self::defaults(),
        ]);
    }

    public function update(Request $request)
    {
        $ubs = $this->ensurePremium();

        $appearance = UserAppearanceSetting::firstOrCreate(
            ['user_id' => $ubs->user_id, 'theme' => 'premium'],
            ['settings' => self::defaults()]
        );

        $incoming = $request->input('settings', []);
        if (is_string($incoming)) {
            $incoming = json_decode($incoming, true) ?: [];
        }

        $settings = is_array($appearance->settings) ? $appearance->settings : [];
        $settings = array_replace_recursive(self::defaults(), $settings, $incoming);

        // Handle logo uploads
        $dir = public_path('assets/front/img/user/');
        if ($request->hasFile('logo_image')) {
            $settings['logo']['imageUrl'] = 'assets/front/img/user/' . Uploader::upload_picture($dir, $request->file('logo_image'));
        }
        if ($request->hasFile('seo_og_image')) {
            $settings['seo']['ogImage'] = 'assets/front/img/user/' . Uploader::upload_picture($dir, $request->file('seo_og_image'));
        }

        // Handle hero slide images
        if ($request->hasFile('hero_slides')) {
            foreach ($request->file('hero_slides') as $idx => $file) {
                if ($file && isset($settings['hero']['slides'][$idx])) {
                    $settings['hero']['slides'][$idx]['backgroundImage'] = 'assets/front/img/user/' . Uploader::upload_picture($dir, $file);
                }
            }
        }

        $appearance->settings = $settings;
        $appearance->custom_css = $request->input('custom_css', $appearance->custom_css);
        $appearance->save();

        if ($request->expectsJson()) {
            return response()->json(['ok' => true, 'settings' => $settings]);
        }

        return back()->with('success', 'Aparência atualizada com sucesso!');
    }

    public function preview(Request $request)
    {
        $ubs = $this->ensurePremium();

        $incoming = $request->input('settings', []);
        if (is_string($incoming)) {
            $incoming = json_decode($incoming, true) ?: [];
        }

        $settings = array_replace_recursive(self::defaults(), $incoming);

        $dir = storage_path('app/appearance_drafts');
        if (!is_dir($dir)) {
            @mkdir($dir, 0775, true);
        }
        file_put_contents($dir . '/premium_' . $ubs->user_id . '.json', json_encode($settings));

        return response()->json(['ok' => true, 'settings' => $settings]);
    }

    public function applyPreset(Request $request)
    {
        $ubs = $this->ensurePremium();
        $presetKey = $request->input('preset');
        $presets = self::presets();

        if (!isset($presets[$presetKey])) {
            return response()->json(['error' => 'Preset não encontrado'], 404);
        }

        $preset = $presets[$presetKey];
        $defaults = self::defaults();

        if (isset($preset['colors'])) {
            $defaults['colors'] = array_merge($defaults['colors'], $preset['colors']);
        }
        if (isset($preset['typography'])) {
            $defaults['typography'] = array_merge($defaults['typography'], $preset['typography']);
        }

        return response()->json(['ok' => true, 'settings' => $defaults]);
    }

    public function versions(Request $request)
    {
        $ubs = $this->ensurePremium();

        $appearance = UserAppearanceSetting::where('user_id', $ubs->user_id)
            ->where('theme', 'premium')
            ->first();

        if (!$appearance || !is_array($appearance->settings)) {
            return response()->json([]);
        }

        $versions = $appearance->settings['_versions'] ?? [];
        if (!is_array($versions)) {
            return response()->json([]);
        }

        $mapped = collect($versions)->reverse()->values()->map(function ($v, $i) {
            return [
                'version' => $i + 1,
                'channel' => 'published',
                'label' => $v['label'] ?? null,
                'publishedAt' => $v['created_at'] ?? null,
                'note' => $v['label'] ?? 'Versão ' . ($i + 1),
                'config' => $v['config'] ?? $v,
            ];
        });

        return response()->json($mapped);
    }

    public function rollback(Request $request)
    {
        $ubs = $this->ensurePremium();

        $version = (int) $request->input('version', 0);

        $appearance = UserAppearanceSetting::where('user_id', $ubs->user_id)
            ->where('theme', 'premium')
            ->first();

        if (!$appearance || !is_array($appearance->settings)) {
            return back()->with('error', 'Nenhuma versão encontrada');
        }

        $versions = $appearance->settings['_versions'] ?? [];
        $reversed = array_reverse($versions);

        $idx = $version - 1;
        if (!isset($reversed[$idx])) {
            return back()->with('error', 'Versão não encontrada');
        }

        $config = $reversed[$idx]['config'] ?? $reversed[$idx];
        if (!is_array($config)) {
            return back()->with('error', 'Configuração inválida');
        }

        $settings = array_replace_recursive(self::defaults(), $config);
        $appearance->settings = $settings;
        $appearance->save();

        if ($request->expectsJson()) {
            return response()->json(['ok' => true, 'settings' => $settings]);
        }

        return back()->with('success', 'Versão restaurada com sucesso');
    }
}
