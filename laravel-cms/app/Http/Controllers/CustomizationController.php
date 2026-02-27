<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class CustomizationController extends Controller
{
    // All theme setting keys grouped by section — mirrors React ThemeConfig exactly
    private static array $themeKeys = [
        // Colors
        'colors_primary', 'colors_primaryForeground', 'colors_secondary', 'colors_secondaryForeground',
        'colors_accent', 'colors_accentForeground', 'colors_background', 'colors_foreground',
        'colors_muted', 'colors_mutedForeground', 'colors_border', 'colors_success', 'colors_warning',
        'colors_error', 'colors_buyNow', 'colors_buyNowHover',
        // Typography
        'typo_headingFont', 'typo_bodyFont', 'typo_baseFontSize', 'typo_headingWeight',
        'typo_bodyWeight', 'typo_lineHeight', 'typo_letterSpacing',
        // Global
        'global_containerWidth', 'global_containerMaxPx', 'global_sectionSpacing', 'global_borderRadius',
        'global_shadowLevel', 'global_borderStyle', 'global_animationsEnabled', 'global_animationSpeed',
        // Buttons
        'btn_style', 'btn_radius', 'btn_size', 'btn_uppercase', 'btn_fontWeight', 'btn_shadow',
        // Inputs
        'input_radius', 'input_borderWidth', 'input_focusRing', 'input_style',
        // Logo
        'logo_text', 'logo_imageUrl', 'logo_showText', 'logo_maxHeight', 'logo_position',
        // Header
        'header_layout', 'header_sticky', 'header_shrinkOnScroll', 'header_shadowOnScroll',
        'header_backgroundColor', 'header_borderBottom', 'header_height',
        'header_menuStyle', 'header_menuFontSize', 'header_menuUppercase', 'header_menuLetterSpacing',
        'header_iconSize', 'header_showSearch', 'header_searchStyle', 'header_showAccount',
        'header_showWishlist', 'header_showCart', 'header_cartBadgeStyle',
        // Announcement bar
        'ann_enabled', 'ann_style', 'ann_direction', 'ann_msg1', 'ann_msg2', 'ann_msg3',
        'ann_speed', 'ann_backgroundColor', 'ann_textColor', 'ann_pauseOnHover',
        // Banner below
        'bannerBelow_enabled', 'bannerBelow_imageUrl', 'bannerBelow_img2', 'bannerBelow_img3',
        'bannerBelow_link', 'bannerBelow_height', 'bannerBelow_fullWidth', 'bannerBelow_carousel',
        'bannerBelow_carouselSpeed',
        // Hero
        'hero_enabled', 'hero_height', 'hero_autoplay', 'hero_autoplaySpeed', 'hero_showDots',
        'hero_showArrows', 'hero_transition', 'hero_subtitle', 'hero_title', 'hero_description',
        'hero_ctaText', 'hero_ctaLink', 'hero_contentAlign', 'hero_backgroundImage',
        'hero_overlayColor', 'hero_overlayOpacity',
        // Product Card
        'card_layout', 'card_imageAspect', 'card_imageHover', 'card_imageBorderRadius',
        'card_showCategory', 'card_showBrand', 'card_showRating', 'card_titleLines',
        'card_contentAlign', 'card_priceSize', 'card_showComparePrice', 'card_showDiscount',
        'card_discountStyle', 'card_showInstallments', 'card_showBuyNow', 'card_buyNowText',
        'card_showAddToCart', 'card_addToCartText', 'card_buttonVisibility', 'card_buttonLayout',
        'card_buttonStyle', 'card_addToCartStyle', 'card_showQuickView', 'card_quickViewStyle',
        'card_showWishlist', 'card_clickBehavior', 'card_badgePosition', 'card_badgeStyle',
        'card_spacing', 'card_shadow', 'card_hoverShadow', 'card_border',
        // Product Page
        'pdp_galleryLayout', 'pdp_galleryPosition', 'pdp_imageZoom', 'pdp_stickyGallery',
        'pdp_showBreadcrumb', 'pdp_showSKU', 'pdp_showBrand', 'pdp_showRating', 'pdp_showStock',
        'pdp_showShareButtons', 'pdp_variantStyle', 'pdp_quantityStyle', 'pdp_ctaLayout',
        'pdp_ctaStickyMobile', 'pdp_showTrustBadges', 'pdp_sizeGuideEnabled', 'pdp_shippingEstimate',
        'pdp_tabsStyle', 'pdp_showRelated', 'pdp_relatedTitle', 'pdp_showRecentlyViewed',
        // Category
        'cat_layout', 'cat_displayMode', 'cat_columnsDesktop', 'cat_columnsMobile', 'cat_filterStyle',
        'cat_showFilterCount', 'cat_sortStyle', 'cat_pagination', 'cat_productsPerPage',
        'cat_showBanner', 'cat_bannerHeight', 'cat_showBreadcrumb', 'cat_showProductCount',
        'cat_carouselAutoplay', 'cat_carouselSpeed', 'cat_carouselDirection',
        'cat_showAddToCartOnListing',
        // Cart
        'cart_style', 'cart_showThumbnails', 'cart_showQuantity', 'cart_showCoupon',
        'cart_showShippingEstimate', 'cart_showRecommendations', 'cart_recommendationsTitle',
        'cart_showFreeShippingBar', 'cart_freeShippingThreshold', 'cart_freeShippingMessage',
        'cart_emptyCartMessage', 'cart_emptyCartCta', 'cart_showContinueShopping',
        // Checkout
        'checkout_layout', 'checkout_stepsStyle', 'checkout_showOrderSummary',
        'checkout_showCouponField', 'checkout_showTrustBadges', 'checkout_termsRequired',
        'checkout_termsText', 'checkout_successTitle', 'checkout_successMessage', 'checkout_showConfetti',
        // Footer
        'footer_layout', 'footer_backgroundColor', 'footer_textColor', 'footer_showNewsletter',
        'footer_newsletterTitle', 'footer_newsletterDescription', 'footer_showSocial',
        'footer_showPaymentIcons', 'footer_showTrustSeals', 'footer_copyrightText',
        'footer_showBackToTop',
        // WhatsApp
        'wa_enabled', 'wa_number', 'wa_message', 'wa_position', 'wa_showLabel', 'wa_label',
        'wa_backgroundColor', 'wa_delay',
        // SEO
        'seo_titleTemplate', 'seo_defaultDescription', 'seo_ogImage', 'seo_showBreadcrumbs',
        // Custom Code
        'code_css', 'code_headScripts',
    ];

    private static array $defaults = [
        'colors_primary' => '#3b82f6', 'colors_primaryForeground' => '#ffffff',
        'colors_secondary' => '#f1f5f9', 'colors_secondaryForeground' => '#0f172a',
        'colors_accent' => '#f59e0b', 'colors_accentForeground' => '#ffffff',
        'colors_background' => '#ffffff', 'colors_foreground' => '#0f172a',
        'colors_muted' => '#f1f5f9', 'colors_mutedForeground' => '#64748b',
        'colors_border' => '#e2e8f0', 'colors_success' => '#22c55e', 'colors_warning' => '#f59e0b',
        'colors_error' => '#ef4444', 'colors_buyNow' => '#22c55e', 'colors_buyNowHover' => '#16a34a',
        'typo_headingFont' => 'Playfair Display', 'typo_bodyFont' => 'Inter', 'typo_baseFontSize' => '16',
        'typo_headingWeight' => '700', 'typo_bodyWeight' => '400', 'typo_lineHeight' => '1.6',
        'typo_letterSpacing' => '0',
        'global_containerWidth' => 'default', 'global_containerMaxPx' => '1400',
        'global_sectionSpacing' => 'normal', 'global_borderRadius' => 'medium',
        'global_shadowLevel' => 'subtle', 'global_borderStyle' => 'thin',
        'global_animationsEnabled' => '1', 'global_animationSpeed' => 'normal',
        'btn_style' => 'filled', 'btn_radius' => 'medium', 'btn_size' => 'medium',
        'btn_uppercase' => '0', 'btn_fontWeight' => '600', 'btn_shadow' => '0',
        'input_radius' => 'medium', 'input_borderWidth' => '1', 'input_focusRing' => '1',
        'input_style' => 'default',
        'logo_text' => 'Minha Loja', 'logo_imageUrl' => '', 'logo_showText' => '1',
        'logo_maxHeight' => '40', 'logo_position' => 'left',
        'header_layout' => 'classic', 'header_sticky' => '1', 'header_shrinkOnScroll' => '0',
        'header_shadowOnScroll' => '1', 'header_backgroundColor' => '#ffffff',
        'header_borderBottom' => '1', 'header_height' => '64',
        'header_menuStyle' => 'horizontal', 'header_menuFontSize' => '14',
        'header_menuUppercase' => '0', 'header_menuLetterSpacing' => '0', 'header_iconSize' => '20',
        'header_showSearch' => '1', 'header_searchStyle' => 'modal', 'header_showAccount' => '1',
        'header_showWishlist' => '1', 'header_showCart' => '1', 'header_cartBadgeStyle' => 'count',
        'ann_enabled' => '0', 'ann_style' => 'static', 'ann_direction' => 'rtl',
        'ann_msg1' => '', 'ann_msg2' => '', 'ann_msg3' => '', 'ann_speed' => '5',
        'ann_backgroundColor' => '#1a1a1a', 'ann_textColor' => '#fafafa', 'ann_pauseOnHover' => '1',
        'bannerBelow_enabled' => '0', 'bannerBelow_imageUrl' => '', 'bannerBelow_img2' => '',
        'bannerBelow_img3' => '', 'bannerBelow_link' => '', 'bannerBelow_height' => '60',
        'bannerBelow_fullWidth' => '1', 'bannerBelow_carousel' => '0', 'bannerBelow_carouselSpeed' => '5',
        'hero_enabled' => '1', 'hero_height' => 'medium', 'hero_autoplay' => '1',
        'hero_autoplaySpeed' => '5', 'hero_showDots' => '1', 'hero_showArrows' => '1',
        'hero_transition' => 'fade', 'hero_subtitle' => '', 'hero_title' => 'Bem-vindo',
        'hero_description' => '', 'hero_ctaText' => 'Ver Produtos', 'hero_ctaLink' => '/store/products',
        'hero_contentAlign' => 'left', 'hero_backgroundImage' => '', 'hero_overlayColor' => '#000000',
        'hero_overlayOpacity' => '0.4',
        'card_layout' => 'standard', 'card_imageAspect' => '3:4', 'card_imageHover' => 'zoom',
        'card_imageBorderRadius' => 'medium', 'card_showCategory' => '0', 'card_showBrand' => '0',
        'card_showRating' => '1', 'card_titleLines' => '2', 'card_contentAlign' => 'left',
        'card_priceSize' => 'medium', 'card_showComparePrice' => '1', 'card_showDiscount' => '1',
        'card_discountStyle' => 'percentage', 'card_showInstallments' => '1',
        'card_showBuyNow' => '1', 'card_buyNowText' => 'Comprar Agora',
        'card_showAddToCart' => '1', 'card_addToCartText' => 'Adicionar ao Carrinho',
        'card_buttonVisibility' => 'both', 'card_buttonLayout' => 'stacked',
        'card_buttonStyle' => 'solid', 'card_addToCartStyle' => 'full-width',
        'card_showQuickView' => '1', 'card_quickViewStyle' => 'modal', 'card_showWishlist' => '1',
        'card_clickBehavior' => 'navigate', 'card_badgePosition' => 'top-left',
        'card_badgeStyle' => 'rounded', 'card_spacing' => 'normal', 'card_shadow' => 'subtle',
        'card_hoverShadow' => '1', 'card_border' => '0',
        'pdp_galleryLayout' => 'side-by-side', 'pdp_galleryPosition' => 'left', 'pdp_imageZoom' => '1',
        'pdp_stickyGallery' => '1', 'pdp_showBreadcrumb' => '1', 'pdp_showSKU' => '0',
        'pdp_showBrand' => '1', 'pdp_showRating' => '1', 'pdp_showStock' => '1',
        'pdp_showShareButtons' => '1', 'pdp_variantStyle' => 'buttons', 'pdp_quantityStyle' => 'stepper',
        'pdp_ctaLayout' => 'stacked', 'pdp_ctaStickyMobile' => '1', 'pdp_showTrustBadges' => '1',
        'pdp_sizeGuideEnabled' => '0', 'pdp_shippingEstimate' => '1', 'pdp_tabsStyle' => 'tabs',
        'pdp_showRelated' => '1', 'pdp_relatedTitle' => 'Produtos Relacionados',
        'pdp_showRecentlyViewed' => '0',
        'cat_layout' => 'sidebar-left', 'cat_displayMode' => 'grid', 'cat_columnsDesktop' => '4',
        'cat_columnsMobile' => '2', 'cat_filterStyle' => 'checkbox', 'cat_showFilterCount' => '1',
        'cat_sortStyle' => 'dropdown', 'cat_pagination' => 'classic', 'cat_productsPerPage' => '24',
        'cat_showBanner' => '0', 'cat_bannerHeight' => '200', 'cat_showBreadcrumb' => '1',
        'cat_showProductCount' => '1', 'cat_carouselAutoplay' => '0', 'cat_carouselSpeed' => '5',
        'cat_carouselDirection' => 'ltr', 'cat_showAddToCartOnListing' => '1',
        'cart_style' => 'page', 'cart_showThumbnails' => '1', 'cart_showQuantity' => '1',
        'cart_showCoupon' => '1', 'cart_showShippingEstimate' => '1', 'cart_showRecommendations' => '1',
        'cart_recommendationsTitle' => 'Você também pode gostar', 'cart_showFreeShippingBar' => '1',
        'cart_freeShippingThreshold' => '299', 'cart_freeShippingMessage' => 'Frete grátis acima de R$ {value}',
        'cart_emptyCartMessage' => 'Seu carrinho está vazio', 'cart_emptyCartCta' => 'Continuar Comprando',
        'cart_showContinueShopping' => '1',
        'checkout_layout' => 'two-columns', 'checkout_stepsStyle' => 'numbered',
        'checkout_showOrderSummary' => '1', 'checkout_showCouponField' => '1',
        'checkout_showTrustBadges' => '1', 'checkout_termsRequired' => '0', 'checkout_termsText' => '',
        'checkout_successTitle' => 'Pedido Confirmado!',
        'checkout_successMessage' => 'Seu pedido foi realizado com sucesso.',
        'checkout_showConfetti' => '1',
        'footer_layout' => '4-columns', 'footer_backgroundColor' => '#0f172a',
        'footer_textColor' => '#94a3b8', 'footer_showNewsletter' => '1',
        'footer_newsletterTitle' => 'Receba novidades', 'footer_newsletterDescription' => 'Cadastre-se para receber promoções.',
        'footer_showSocial' => '1', 'footer_showPaymentIcons' => '1', 'footer_showTrustSeals' => '0',
        'footer_copyrightText' => '© 2024 Minha Loja', 'footer_showBackToTop' => '1',
        'wa_enabled' => '0', 'wa_number' => '', 'wa_message' => 'Olá! Gostaria de mais informações.',
        'wa_position' => 'bottom-right', 'wa_showLabel' => '0', 'wa_label' => 'Fale Conosco',
        'wa_backgroundColor' => '#25d366', 'wa_delay' => '3',
        'seo_titleTemplate' => '{page} | {storeName}', 'seo_defaultDescription' => '',
        'seo_ogImage' => '', 'seo_showBreadcrumbs' => '1',
        'code_css' => '', 'code_headScripts' => '',
    ];

    public function index()
    {
        $theme = [];
        foreach (self::$defaults as $key => $default) {
            $theme[$key] = Setting::get('theme_' . $key, $default);
        }
        return view('customization.index', compact('theme'));
    }

    public function update(Request $request)
    {
        foreach (self::$defaults as $key => $default) {
            if ($request->has($key)) {
                Setting::set('theme_' . $key, $request->input($key), 'theme');
            }
        }

        return redirect()->route('admin.customization.index')->with('success', 'Personalização salva!');
    }
}
