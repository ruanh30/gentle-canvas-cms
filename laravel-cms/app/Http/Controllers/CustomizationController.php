<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class CustomizationController extends Controller
{
    /**
     * All theme keys with their default values.
     * Templates access $t['key'] directly, so every key must exist.
     */
    private function defaults(): array
    {
        return [
            // Colors
            'colors_primary' => '#0f172a',
            'colors_primaryForeground' => '#ffffff',
            'colors_secondary' => '#f1f5f9',
            'colors_secondaryForeground' => '#0f172a',
            'colors_background' => '#ffffff',
            'colors_foreground' => '#0f172a',
            'colors_accent' => '#93c5fd',
            'colors_accentForeground' => '#0f172a',
            'colors_muted' => '#f1f5f9',
            'colors_mutedForeground' => '#64748b',
            'colors_border' => '#e2e8f0',
            'colors_success' => '#22c55e',
            'colors_warning' => '#eab308',
            'colors_error' => '#ef4444',
            'colors_buyNow' => '#0f172a',
            'colors_buyNowHover' => '#1e293b',

            // Typography
            'typo_headingFont' => 'Playfair Display',
            'typo_bodyFont' => 'Inter',
            'typo_baseFontSize' => '16',
            'typo_headingWeight' => '700',
            'typo_bodyWeight' => '400',
            'typo_lineHeight' => '1.5',
            'typo_letterSpacing' => '0',

            // Global
            'global_containerWidth' => 'default',
            'global_containerMaxPx' => '1400',
            'global_sectionSpacing' => 'normal',
            'global_borderRadius' => 'medium',
            'global_shadowLevel' => 'subtle',
            'global_borderStyle' => 'thin',
            'global_animationsEnabled' => true,
            'global_animationSpeed' => 'normal',

            // Buttons
            'btn_style' => 'filled',
            'btn_radius' => 'medium',
            'btn_size' => 'medium',
            'btn_fontWeight' => '600',
            'btn_uppercase' => false,
            'btn_shadow' => false,

            // Inputs
            'input_style' => 'default',
            'input_radius' => 'medium',
            'input_focusRing' => true,

            // Logo
            'logo_text' => 'Gentle Canvas',
            'logo_imageUrl' => '',
            'logo_showText' => true,
            'logo_maxHeight' => '40',
            'logo_position' => 'left',

            // Header
            'header_layout' => 'classic',
            'header_sticky' => true,
            'header_shrinkOnScroll' => false,
            'header_shadowOnScroll' => true,
            'header_borderBottom' => true,
            'header_height' => '64',
            'header_menuStyle' => 'horizontal',
            'header_menuFontSize' => '14',
            'header_menuUppercase' => false,
            'header_iconSize' => '20',
            'header_showSearch' => true,
            'header_searchStyle' => 'inline',
            'header_showAccount' => true,
            'header_showWishlist' => true,
            'header_showCart' => true,
            'header_cartBadgeStyle' => 'count',
            'ann_enabled' => false,
            'ann_style' => 'static',
            'ann_msg1' => 'Frete grátis acima de R$ 299',
            'ann_msg2' => 'Parcele em até 12x',
            'ann_msg3' => 'Troca grátis em 30 dias',
            'ann_speed' => '5',
            'ann_backgroundColor' => '#0f172a',
            'ann_textColor' => '#ffffff',
            'ann_pauseOnHover' => true,
            'bannerBelow_enabled' => false,
            'bannerBelow_imageUrl' => '',
            'bannerBelow_carousel' => false,
            'bannerBelow_img2' => '',
            'bannerBelow_img3' => '',
            'bannerBelow_carouselSpeed' => '5',
            'bannerBelow_link' => '',
            'bannerBelow_height' => '80',
            'bannerBelow_fullWidth' => true,

            // Hero
            'hero_enabled' => true,
            'hero_height' => 'medium',
            'hero_transition' => 'fade',
            'hero_autoplay' => true,
            'hero_autoplaySpeed' => '5',
            'hero_showDots' => true,
            'hero_showArrows' => true,
            'hero_subtitle' => '',
            'hero_title' => 'Bem-vindo à Gentle Canvas',
            'hero_description' => 'Encontre produtos incríveis com os melhores preços',
            'hero_ctaText' => 'Ver Produtos',
            'hero_ctaLink' => '/products',
            'hero_contentAlign' => 'center',
            'hero_backgroundImage' => '',
            'hero_overlayColor' => '#000000',
            'hero_overlayOpacity' => '0.4',

            // Product Card
            'card_layout' => 'standard',
            'card_imageAspect' => '3:4',
            'card_imageHover' => 'zoom',
            'card_imageBorderRadius' => 'medium',
            'card_showCategory' => false,
            'card_showBrand' => false,
            'card_showRating' => true,
            'card_titleLines' => '2',
            'card_contentAlign' => 'left',
            'card_priceSize' => 'medium',
            'card_showComparePrice' => true,
            'card_showDiscount' => true,
            'card_discountStyle' => 'percentage',
            'card_showInstallments' => true,
            'card_showBuyNow' => true,
            'card_buyNowText' => 'Comprar Agora',
            'card_showAddToCart' => true,
            'card_addToCartText' => 'Adicionar ao Carrinho',
            'card_buttonVisibility' => 'both',
            'card_buttonLayout' => 'stacked',
            'card_buttonStyle' => 'solid',
            'card_addToCartStyle' => 'full-width',
            'card_showQuickView' => false,
            'card_quickViewStyle' => 'modal',
            'card_showWishlist' => true,
            'card_clickBehavior' => 'navigate',
            'card_badgePosition' => 'top-left',
            'card_badgeStyle' => 'rounded',
            'card_spacing' => 'normal',
            'card_shadow' => 'subtle',
            'card_hoverShadow' => true,
            'card_border' => true,

            // Product Page
            'pdp_galleryLayout' => 'side-by-side',
            'pdp_galleryPosition' => 'left',
            'pdp_imageZoom' => true,
            'pdp_stickyGallery' => true,
            'pdp_showBreadcrumb' => true,
            'pdp_showSKU' => false,
            'pdp_showBrand' => true,
            'pdp_showRating' => true,
            'pdp_showStock' => true,
            'pdp_showShareButtons' => true,
            'pdp_variantStyle' => 'buttons',
            'pdp_quantityStyle' => 'stepper',
            'pdp_ctaLayout' => 'stacked',
            'pdp_ctaStickyMobile' => true,
            'pdp_showTrustBadges' => true,
            'pdp_sizeGuideEnabled' => false,
            'pdp_shippingEstimate' => true,
            'pdp_tabsStyle' => 'tabs',
            'pdp_showRelated' => true,
            'pdp_relatedTitle' => 'Produtos Relacionados',
            'pdp_showRecentlyViewed' => false,

            // Category
            'cat_layout' => 'sidebar-left',
            'cat_displayMode' => 'grid',
            'cat_columnsDesktop' => '4',
            'cat_columnsMobile' => '2',
            'cat_productsPerPage' => '24',
            'cat_filterStyle' => 'checkbox',
            'cat_showFilterCount' => true,
            'cat_showAddToCartOnListing' => true,
            'cat_pagination' => 'classic',
            'cat_showBanner' => false,
            'cat_showBreadcrumb' => true,
            'cat_showProductCount' => true,

            // Cart
            'cart_style' => 'page',
            'cart_showThumbnails' => true,
            'cart_showQuantity' => true,
            'cart_showCoupon' => true,
            'cart_showShippingEstimate' => true,
            'cart_showContinueShopping' => true,
            'cart_showFreeShippingBar' => true,
            'cart_freeShippingThreshold' => '299',
            'cart_freeShippingMessage' => 'Frete grátis acima de R$ 299!',
            'cart_showRecommendations' => false,
            'cart_recommendationsTitle' => 'Você também pode gostar',
            'cart_emptyCartMessage' => 'Seu carrinho está vazio',
            'cart_emptyCartCta' => 'Continuar Comprando',

            // Checkout
            'checkout_layout' => 'two-columns',
            'checkout_stepsStyle' => 'numbered',
            'checkout_showOrderSummary' => true,
            'checkout_showCouponField' => true,
            'checkout_showTrustBadges' => true,
            'checkout_termsRequired' => false,
            'checkout_termsText' => '',
            'checkout_successTitle' => 'Pedido Confirmado!',
            'checkout_successMessage' => 'Obrigado pela sua compra. Você receberá um e-mail com os detalhes do pedido.',
            'checkout_showConfetti' => true,

            // Footer
            'footer_layout' => '4-columns',
            'footer_backgroundColor' => '#0f172a',
            'footer_textColor' => '#94a3b8',
            'footer_showNewsletter' => true,
            'footer_newsletterTitle' => 'Fique por dentro',
            'footer_newsletterDescription' => 'Receba novidades e ofertas exclusivas',
            'footer_showSocial' => true,
            'footer_showPaymentIcons' => true,
            'footer_showTrustSeals' => false,
            'footer_showBackToTop' => true,
            'footer_copyrightText' => '© 2024 Gentle Canvas. Todos os direitos reservados.',

            // WhatsApp
            'wa_enabled' => false,
            'wa_number' => '',
            'wa_message' => 'Olá! Gostaria de mais informações.',
            'wa_position' => 'bottom-right',
            'wa_backgroundColor' => '#25d366',
            'wa_showLabel' => false,
            'wa_label' => 'Fale conosco',
            'wa_delay' => '3',

            // SEO
            'seo_titleTemplate' => '{page} | {storeName}',
            'seo_defaultDescription' => '',
            'seo_ogImage' => '',
            'seo_showBreadcrumbs' => true,

            // Custom Code
            'code_css' => '',
            'code_headScripts' => '',
        ];
    }

    public function index()
    {
        $themeJson = Setting::get('theme_draft', '{}');
        $theme = json_decode($themeJson, true) ?: [];

        // Merge defaults with saved values — saved values override defaults
        $theme = array_merge($this->defaults(), $theme);

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
