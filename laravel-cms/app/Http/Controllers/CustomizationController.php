<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class CustomizationController extends Controller
{
    /**
     * All flat theme keys used by Blade panels.
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
            'global_scrollBehavior' => 'smooth',

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
            'input_borderWidth' => '1',

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
            'header_menuLetterSpacing' => '0',
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
            'ann_showIcon' => false,
            'ann_icon' => 'sparkles',
            'ann_link' => '',
            'ann_pauseOnHover' => true,
            'ann_direction' => 'ltr',

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
            'cat_sortStyle' => 'dropdown',
            'cat_showFilterCount' => true,
            'cat_showAddToCartOnListing' => true,
            'cat_pagination' => 'classic',
            'cat_showBanner' => false,
            'cat_bannerHeight' => '220',
            'cat_showBreadcrumb' => true,
            'cat_showProductCount' => true,
            'cat_carouselAutoplay' => false,
            'cat_carouselSpeed' => '4',
            'cat_carouselDirection' => 'ltr',

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

    private function defaultHomepageSections(): array
    {
        return [
            ['id' => 'hero', 'type' => 'hero', 'enabled' => true, 'title' => 'Hero Banner', 'showTitle' => false, 'settings' => []],
            ['id' => 'categories', 'type' => 'categories', 'enabled' => true, 'title' => 'Categorias', 'showTitle' => true, 'settings' => []],
            ['id' => 'featured', 'type' => 'featured-products', 'enabled' => true, 'title' => 'Destaques', 'showTitle' => true, 'settings' => []],
            ['id' => 'banner', 'type' => 'banner', 'enabled' => true, 'title' => 'Banner Promocional', 'showTitle' => false, 'settings' => ['title' => 'Cadastre-se e ganhe 15% OFF', 'description' => 'Use o cupom BEMVINDO na sua primeira compra.']],
            ['id' => 'benefits', 'type' => 'benefits', 'enabled' => false, 'title' => 'Benefícios', 'showTitle' => false, 'settings' => []],
            ['id' => 'testimonials', 'type' => 'testimonials', 'enabled' => false, 'title' => 'Depoimentos', 'showTitle' => true, 'settings' => []],
            ['id' => 'brands', 'type' => 'brands', 'enabled' => false, 'title' => 'Marcas', 'showTitle' => true, 'settings' => []],
            ['id' => 'newsletter', 'type' => 'newsletter', 'enabled' => false, 'title' => 'Newsletter', 'showTitle' => true, 'settings' => []],
            ['id' => 'trust-bar', 'type' => 'trust-bar', 'enabled' => false, 'title' => 'Selos de Confiança', 'showTitle' => false, 'settings' => []],
        ];
    }

    private function isFlatTheme(array $theme): bool
    {
        return isset($theme['colors_primary']) || isset($theme['hero_title']) || isset($theme['header_layout']);
    }

    private function boolValue(mixed $value): bool
    {
        return in_array($value, [true, 1, '1', 'on', 'true'], true);
    }

    private function nestedToFlat(array $nested): array
    {
        $flat = [];

        foreach (($nested['colors'] ?? []) as $k => $v) {
            $flat['colors_' . $k] = $v;
        }

        foreach (($nested['typography'] ?? []) as $k => $v) {
            $flat['typo_' . $k] = $v;
        }

        foreach (($nested['global'] ?? []) as $k => $v) {
            $flat['global_' . $k] = $v;
        }

        foreach (($nested['buttons'] ?? []) as $k => $v) {
            $flat['btn_' . $k] = $v;
        }

        foreach (($nested['inputs'] ?? []) as $k => $v) {
            $flat['input_' . $k] = $v;
        }

        foreach (($nested['logo'] ?? []) as $k => $v) {
            $flat['logo_' . $k] = $v;
        }

        foreach (($nested['header'] ?? []) as $k => $v) {
            if (in_array($k, ['announcement', 'bannerBelow'], true)) {
                continue;
            }
            $flat['header_' . $k] = $v;
        }

        $announcement = $nested['header']['announcement'] ?? [];
        $messages = $announcement['messages'] ?? [];
        $flat['ann_enabled'] = $announcement['enabled'] ?? null;
        $flat['ann_style'] = $announcement['style'] ?? null;
        $flat['ann_speed'] = $announcement['speed'] ?? null;
        $flat['ann_backgroundColor'] = $announcement['backgroundColor'] ?? null;
        $flat['ann_textColor'] = $announcement['textColor'] ?? null;
        $flat['ann_showIcon'] = $announcement['showIcon'] ?? null;
        $flat['ann_icon'] = $announcement['icon'] ?? null;
        $flat['ann_link'] = $announcement['link'] ?? null;
        $flat['ann_pauseOnHover'] = $announcement['pauseOnHover'] ?? null;
        $flat['ann_direction'] = $announcement['direction'] ?? null;
        $flat['ann_msg1'] = $messages[0] ?? '';
        $flat['ann_msg2'] = $messages[1] ?? '';
        $flat['ann_msg3'] = $messages[2] ?? '';

        $banner = $nested['header']['bannerBelow'] ?? [];
        $images = $banner['images'] ?? [];
        $flat['bannerBelow_enabled'] = $banner['enabled'] ?? null;
        $flat['bannerBelow_imageUrl'] = $banner['imageUrl'] ?? '';
        $flat['bannerBelow_carousel'] = $banner['carousel'] ?? null;
        $flat['bannerBelow_img2'] = $images[1] ?? '';
        $flat['bannerBelow_img3'] = $images[2] ?? '';
        $flat['bannerBelow_carouselSpeed'] = $banner['carouselSpeed'] ?? null;
        $flat['bannerBelow_link'] = $banner['link'] ?? '';
        $flat['bannerBelow_height'] = $banner['height'] ?? null;
        $flat['bannerBelow_fullWidth'] = $banner['fullWidth'] ?? null;

        foreach (($nested['hero'] ?? []) as $k => $v) {
            if ($k === 'slides') {
                continue;
            }
            $flat['hero_' . $k] = $v;
        }

        $slide = ($nested['hero']['slides'] ?? [])[0] ?? [];
        foreach (['subtitle', 'title', 'description', 'ctaText', 'ctaLink', 'contentAlign', 'backgroundImage', 'overlayColor', 'overlayOpacity'] as $k) {
            $flat['hero_' . $k] = $slide[$k] ?? ($flat['hero_' . $k] ?? null);
        }

        foreach (($nested['productCard'] ?? []) as $k => $v) {
            $flat['card_' . $k] = $v;
        }

        foreach (($nested['productPage'] ?? []) as $k => $v) {
            $flat['pdp_' . $k] = $v;
        }

        foreach (($nested['category'] ?? []) as $k => $v) {
            $flat['cat_' . $k] = $v;
        }

        foreach (($nested['cart'] ?? []) as $k => $v) {
            $flat['cart_' . $k] = $v;
        }

        foreach (($nested['checkout'] ?? []) as $k => $v) {
            $flat['checkout_' . $k] = $v;
        }

        foreach (($nested['footer'] ?? []) as $k => $v) {
            if (in_array($k, ['columns', 'socialLinks', 'bottomLinks'], true)) {
                continue;
            }
            $flat['footer_' . $k] = $v;
        }

        foreach (($nested['whatsapp'] ?? []) as $k => $v) {
            $flat['wa_' . $k] = $v;
        }

        foreach (($nested['seo'] ?? []) as $k => $v) {
            $flat['seo_' . $k] = $v;
        }

        foreach (($nested['customCode'] ?? []) as $k => $v) {
            $flat['code_' . $k] = $v;
        }

        return array_filter($flat, static fn($v) => $v !== null);
    }

    private function flatToNested(array $flat, array $baseNested = []): array
    {
        $theme = $baseNested;

        $theme['colors'] = [
            'primary' => $flat['colors_primary'],
            'primaryForeground' => $flat['colors_primaryForeground'],
            'secondary' => $flat['colors_secondary'],
            'secondaryForeground' => $flat['colors_secondaryForeground'],
            'accent' => $flat['colors_accent'],
            'accentForeground' => $flat['colors_accentForeground'],
            'background' => $flat['colors_background'],
            'foreground' => $flat['colors_foreground'],
            'muted' => $flat['colors_muted'],
            'mutedForeground' => $flat['colors_mutedForeground'],
            'border' => $flat['colors_border'],
            'success' => $flat['colors_success'],
            'warning' => $flat['colors_warning'],
            'error' => $flat['colors_error'],
            'buyNow' => $flat['colors_buyNow'],
            'buyNowHover' => $flat['colors_buyNowHover'],
        ];

        $theme['typography'] = [
            'headingFont' => $flat['typo_headingFont'],
            'bodyFont' => $flat['typo_bodyFont'],
            'baseFontSize' => (int) $flat['typo_baseFontSize'],
            'headingWeight' => (int) $flat['typo_headingWeight'],
            'bodyWeight' => (int) $flat['typo_bodyWeight'],
            'lineHeight' => (float) $flat['typo_lineHeight'],
            'letterSpacing' => (float) $flat['typo_letterSpacing'],
        ];

        $theme['global'] = [
            'containerWidth' => $flat['global_containerWidth'],
            'containerMaxPx' => (int) $flat['global_containerMaxPx'],
            'sectionSpacing' => $flat['global_sectionSpacing'],
            'borderRadius' => $flat['global_borderRadius'],
            'shadowLevel' => $flat['global_shadowLevel'],
            'borderStyle' => $flat['global_borderStyle'],
            'animationsEnabled' => $this->boolValue($flat['global_animationsEnabled']),
            'animationSpeed' => $flat['global_animationSpeed'],
            'scrollBehavior' => $flat['global_scrollBehavior'],
        ];

        $theme['buttons'] = [
            'style' => $flat['btn_style'],
            'radius' => $flat['btn_radius'],
            'size' => $flat['btn_size'],
            'fontWeight' => (int) $flat['btn_fontWeight'],
            'uppercase' => $this->boolValue($flat['btn_uppercase']),
            'shadow' => $this->boolValue($flat['btn_shadow']),
        ];

        $theme['inputs'] = [
            'style' => $flat['input_style'],
            'radius' => $flat['input_radius'],
            'focusRing' => $this->boolValue($flat['input_focusRing']),
            'borderWidth' => (int) $flat['input_borderWidth'],
        ];

        $theme['logo'] = [
            'text' => $flat['logo_text'],
            'imageUrl' => $flat['logo_imageUrl'],
            'showText' => $this->boolValue($flat['logo_showText']),
            'maxHeight' => (int) $flat['logo_maxHeight'],
            'position' => $flat['logo_position'],
        ];

        $theme['header'] = [
            'layout' => $flat['header_layout'],
            'sticky' => $this->boolValue($flat['header_sticky']),
            'shrinkOnScroll' => $this->boolValue($flat['header_shrinkOnScroll']),
            'shadowOnScroll' => $this->boolValue($flat['header_shadowOnScroll']),
            'borderBottom' => $this->boolValue($flat['header_borderBottom']),
            'height' => (int) $flat['header_height'],
            'menuStyle' => $flat['header_menuStyle'],
            'menuFontSize' => (int) $flat['header_menuFontSize'],
            'menuUppercase' => $this->boolValue($flat['header_menuUppercase']),
            'menuLetterSpacing' => (float) $flat['header_menuLetterSpacing'],
            'iconSize' => (int) $flat['header_iconSize'],
            'showSearch' => $this->boolValue($flat['header_showSearch']),
            'searchStyle' => $flat['header_searchStyle'],
            'showAccount' => $this->boolValue($flat['header_showAccount']),
            'showWishlist' => $this->boolValue($flat['header_showWishlist']),
            'showCart' => $this->boolValue($flat['header_showCart']),
            'cartBadgeStyle' => $flat['header_cartBadgeStyle'],
            'announcement' => [
                'enabled' => $this->boolValue($flat['ann_enabled']),
                'messages' => array_values(array_filter([$flat['ann_msg1'], $flat['ann_msg2'], $flat['ann_msg3']], static fn($m) => trim((string) $m) !== '')),
                'speed' => (int) $flat['ann_speed'],
                'backgroundColor' => $flat['ann_backgroundColor'],
                'textColor' => $flat['ann_textColor'],
                'showIcon' => $this->boolValue($flat['ann_showIcon']),
                'icon' => $flat['ann_icon'],
                'link' => $flat['ann_link'],
                'pauseOnHover' => $this->boolValue($flat['ann_pauseOnHover']),
                'style' => $flat['ann_style'],
                'direction' => $flat['ann_direction'],
            ],
            'bannerBelow' => [
                'enabled' => $this->boolValue($flat['bannerBelow_enabled']),
                'imageUrl' => $flat['bannerBelow_imageUrl'],
                'images' => array_values(array_filter([$flat['bannerBelow_imageUrl'], $flat['bannerBelow_img2'], $flat['bannerBelow_img3']], static fn($m) => trim((string) $m) !== '')),
                'link' => $flat['bannerBelow_link'],
                'height' => (int) $flat['bannerBelow_height'],
                'fullWidth' => $this->boolValue($flat['bannerBelow_fullWidth']),
                'carousel' => $this->boolValue($flat['bannerBelow_carousel']),
                'carouselSpeed' => (int) $flat['bannerBelow_carouselSpeed'],
            ],
        ];

        $theme['hero'] = [
            'enabled' => $this->boolValue($flat['hero_enabled']),
            'height' => $flat['hero_height'],
            'autoplay' => $this->boolValue($flat['hero_autoplay']),
            'autoplaySpeed' => (int) $flat['hero_autoplaySpeed'],
            'showDots' => $this->boolValue($flat['hero_showDots']),
            'showArrows' => $this->boolValue($flat['hero_showArrows']),
            'transition' => $flat['hero_transition'],
            'slides' => [[
                'id' => 'hero-slide-1',
                'title' => $flat['hero_title'],
                'subtitle' => $flat['hero_subtitle'],
                'description' => $flat['hero_description'],
                'ctaText' => $flat['hero_ctaText'],
                'ctaLink' => $flat['hero_ctaLink'],
                'ctaStyle' => 'filled',
                'backgroundImage' => $flat['hero_backgroundImage'],
                'backgroundVideo' => '',
                'overlayColor' => $flat['hero_overlayColor'],
                'overlayOpacity' => (float) $flat['hero_overlayOpacity'],
                'contentAlign' => $flat['hero_contentAlign'],
                'textColor' => '#ffffff',
            ]],
        ];

        $theme['productCard'] = [
            'layout' => $flat['card_layout'],
            'imageAspect' => $flat['card_imageAspect'],
            'imageHover' => $flat['card_imageHover'],
            'imageBorderRadius' => $flat['card_imageBorderRadius'],
            'showCategory' => $this->boolValue($flat['card_showCategory']),
            'showBrand' => $this->boolValue($flat['card_showBrand']),
            'showRating' => $this->boolValue($flat['card_showRating']),
            'showQuickView' => $this->boolValue($flat['card_showQuickView']),
            'quickViewStyle' => $flat['card_quickViewStyle'],
            'showWishlist' => $this->boolValue($flat['card_showWishlist']),
            'showAddToCart' => $this->boolValue($flat['card_showAddToCart']),
            'showBuyNow' => $this->boolValue($flat['card_showBuyNow']),
            'buyNowText' => $flat['card_buyNowText'],
            'addToCartText' => $flat['card_addToCartText'],
            'buttonVisibility' => $flat['card_buttonVisibility'],
            'buttonLayout' => $flat['card_buttonLayout'],
            'buttonStyle' => $flat['card_buttonStyle'],
            'addToCartStyle' => $flat['card_addToCartStyle'],
            'clickBehavior' => $flat['card_clickBehavior'],
            'badgePosition' => $flat['card_badgePosition'],
            'badgeStyle' => $flat['card_badgeStyle'],
            'priceSize' => $flat['card_priceSize'],
            'showComparePrice' => $this->boolValue($flat['card_showComparePrice']),
            'showDiscount' => $this->boolValue($flat['card_showDiscount']),
            'discountStyle' => $flat['card_discountStyle'],
            'showInstallments' => $this->boolValue($flat['card_showInstallments']),
            'titleLines' => (int) $flat['card_titleLines'],
            'contentAlign' => $flat['card_contentAlign'],
            'spacing' => $flat['card_spacing'],
            'shadow' => $flat['card_shadow'],
            'hoverShadow' => $this->boolValue($flat['card_hoverShadow']),
            'border' => $this->boolValue($flat['card_border']),
        ];

        $theme['productPage'] = [
            'galleryLayout' => $flat['pdp_galleryLayout'],
            'galleryPosition' => $flat['pdp_galleryPosition'],
            'imageZoom' => $this->boolValue($flat['pdp_imageZoom']),
            'stickyGallery' => $this->boolValue($flat['pdp_stickyGallery']),
            'showBreadcrumb' => $this->boolValue($flat['pdp_showBreadcrumb']),
            'showSKU' => $this->boolValue($flat['pdp_showSKU']),
            'showBrand' => $this->boolValue($flat['pdp_showBrand']),
            'showRating' => $this->boolValue($flat['pdp_showRating']),
            'showStock' => $this->boolValue($flat['pdp_showStock']),
            'showShareButtons' => $this->boolValue($flat['pdp_showShareButtons']),
            'variantStyle' => $flat['pdp_variantStyle'],
            'quantityStyle' => $flat['pdp_quantityStyle'],
            'ctaLayout' => $flat['pdp_ctaLayout'],
            'ctaStickyMobile' => $this->boolValue($flat['pdp_ctaStickyMobile']),
            'showTrustBadges' => $this->boolValue($flat['pdp_showTrustBadges']),
            'tabsStyle' => $flat['pdp_tabsStyle'],
            'showRelated' => $this->boolValue($flat['pdp_showRelated']),
            'relatedTitle' => $flat['pdp_relatedTitle'],
            'showRecentlyViewed' => $this->boolValue($flat['pdp_showRecentlyViewed']),
            'sizeGuideEnabled' => $this->boolValue($flat['pdp_sizeGuideEnabled']),
            'shippingEstimate' => $this->boolValue($flat['pdp_shippingEstimate']),
            'trustBadges' => $theme['productPage']['trustBadges'] ?? ['Compra 100% segura'],
        ];

        $theme['category'] = [
            'layout' => $flat['cat_layout'],
            'displayMode' => $flat['cat_displayMode'],
            'columnsDesktop' => (int) $flat['cat_columnsDesktop'],
            'columnsMobile' => (int) $flat['cat_columnsMobile'],
            'filterStyle' => $flat['cat_filterStyle'],
            'showFilterCount' => $this->boolValue($flat['cat_showFilterCount']),
            'sortStyle' => $flat['cat_sortStyle'],
            'pagination' => $flat['cat_pagination'],
            'productsPerPage' => (int) $flat['cat_productsPerPage'],
            'showBanner' => $this->boolValue($flat['cat_showBanner']),
            'bannerHeight' => (int) $flat['cat_bannerHeight'],
            'showBreadcrumb' => $this->boolValue($flat['cat_showBreadcrumb']),
            'showProductCount' => $this->boolValue($flat['cat_showProductCount']),
            'carouselAutoplay' => $this->boolValue($flat['cat_carouselAutoplay']),
            'carouselSpeed' => (int) $flat['cat_carouselSpeed'],
            'carouselDirection' => $flat['cat_carouselDirection'],
            'showAddToCartOnListing' => $this->boolValue($flat['cat_showAddToCartOnListing']),
        ];

        $theme['cart'] = [
            'style' => $flat['cart_style'],
            'showThumbnails' => $this->boolValue($flat['cart_showThumbnails']),
            'showQuantity' => $this->boolValue($flat['cart_showQuantity']),
            'showCoupon' => $this->boolValue($flat['cart_showCoupon']),
            'showShippingEstimate' => $this->boolValue($flat['cart_showShippingEstimate']),
            'showRecommendations' => $this->boolValue($flat['cart_showRecommendations']),
            'recommendationsTitle' => $flat['cart_recommendationsTitle'],
            'showFreeShippingBar' => $this->boolValue($flat['cart_showFreeShippingBar']),
            'freeShippingThreshold' => (float) $flat['cart_freeShippingThreshold'],
            'freeShippingMessage' => $flat['cart_freeShippingMessage'],
            'emptyCartMessage' => $flat['cart_emptyCartMessage'],
            'emptyCartCta' => $flat['cart_emptyCartCta'],
            'showContinueShopping' => $this->boolValue($flat['cart_showContinueShopping']),
        ];

        $theme['checkout'] = [
            'layout' => $flat['checkout_layout'],
            'stepsStyle' => $flat['checkout_stepsStyle'],
            'showOrderSummary' => $this->boolValue($flat['checkout_showOrderSummary']),
            'showCouponField' => $this->boolValue($flat['checkout_showCouponField']),
            'showTrustBadges' => $this->boolValue($flat['checkout_showTrustBadges']),
            'termsRequired' => $this->boolValue($flat['checkout_termsRequired']),
            'termsText' => $flat['checkout_termsText'],
            'successTitle' => $flat['checkout_successTitle'],
            'successMessage' => $flat['checkout_successMessage'],
            'showConfetti' => $this->boolValue($flat['checkout_showConfetti']),
        ];

        $theme['footer'] = array_merge($theme['footer'] ?? [], [
            'layout' => $flat['footer_layout'],
            'backgroundColor' => $flat['footer_backgroundColor'],
            'textColor' => $flat['footer_textColor'],
            'showNewsletter' => $this->boolValue($flat['footer_showNewsletter']),
            'newsletterTitle' => $flat['footer_newsletterTitle'],
            'newsletterDescription' => $flat['footer_newsletterDescription'],
            'showSocial' => $this->boolValue($flat['footer_showSocial']),
            'showPaymentIcons' => $this->boolValue($flat['footer_showPaymentIcons']),
            'showTrustSeals' => $this->boolValue($flat['footer_showTrustSeals']),
            'copyrightText' => $flat['footer_copyrightText'],
            'showBackToTop' => $this->boolValue($flat['footer_showBackToTop']),
        ]);

        $theme['whatsapp'] = [
            'enabled' => $this->boolValue($flat['wa_enabled']),
            'number' => $flat['wa_number'],
            'message' => $flat['wa_message'],
            'position' => $flat['wa_position'],
            'showLabel' => $this->boolValue($flat['wa_showLabel']),
            'label' => $flat['wa_label'],
            'backgroundColor' => $flat['wa_backgroundColor'],
            'delay' => (int) $flat['wa_delay'],
        ];

        $theme['seo'] = [
            'titleTemplate' => $flat['seo_titleTemplate'],
            'defaultDescription' => $flat['seo_defaultDescription'],
            'ogImage' => $flat['seo_ogImage'],
            'showBreadcrumbs' => $this->boolValue($flat['seo_showBreadcrumbs']),
        ];

        $theme['customCode'] = [
            'css' => $flat['code_css'],
            'headScripts' => $flat['code_headScripts'],
        ];

        if (!isset($theme['homepageSections']) || !is_array($theme['homepageSections'])) {
            $theme['homepageSections'] = $this->defaultHomepageSections();
        }

        return $theme;
    }

    private function getBooleanFieldsBySection(string $section): array
    {
        return match ($section) {
            'global' => ['global_animationsEnabled'],
            'buttons' => ['btn_uppercase', 'btn_shadow'],
            'inputs' => ['input_focusRing'],
            'logo' => ['logo_showText'],
            'header' => [
                'header_sticky', 'header_shrinkOnScroll', 'header_shadowOnScroll', 'header_borderBottom',
                'header_menuUppercase', 'header_showSearch', 'header_showAccount', 'header_showWishlist',
                'header_showCart', 'ann_enabled', 'ann_showIcon', 'ann_pauseOnHover',
                'bannerBelow_enabled', 'bannerBelow_carousel', 'bannerBelow_fullWidth',
            ],
            'hero' => ['hero_enabled', 'hero_autoplay', 'hero_showDots', 'hero_showArrows'],
            'product-card' => [
                'card_showCategory', 'card_showBrand', 'card_showRating', 'card_showComparePrice', 'card_showDiscount',
                'card_showInstallments', 'card_showBuyNow', 'card_showAddToCart', 'card_showQuickView',
                'card_showWishlist', 'card_hoverShadow', 'card_border',
            ],
            'product-page' => [
                'pdp_imageZoom', 'pdp_stickyGallery', 'pdp_showBreadcrumb', 'pdp_showSKU', 'pdp_showBrand',
                'pdp_showRating', 'pdp_showStock', 'pdp_showShareButtons', 'pdp_ctaStickyMobile',
                'pdp_showTrustBadges', 'pdp_sizeGuideEnabled', 'pdp_shippingEstimate',
                'pdp_showRelated', 'pdp_showRecentlyViewed',
            ],
            'category' => ['cat_showFilterCount', 'cat_showAddToCartOnListing', 'cat_showBanner', 'cat_showBreadcrumb', 'cat_showProductCount', 'cat_carouselAutoplay'],
            'cart' => ['cart_showThumbnails', 'cart_showQuantity', 'cart_showCoupon', 'cart_showShippingEstimate', 'cart_showContinueShopping', 'cart_showFreeShippingBar', 'cart_showRecommendations'],
            'checkout' => ['checkout_showOrderSummary', 'checkout_showCouponField', 'checkout_showTrustBadges', 'checkout_termsRequired', 'checkout_showConfetti'],
            'footer' => ['footer_showNewsletter', 'footer_showSocial', 'footer_showPaymentIcons', 'footer_showTrustSeals', 'footer_showBackToTop'],
            'whatsapp' => ['wa_enabled', 'wa_showLabel'],
            'seo' => ['seo_showBreadcrumbs'],
            default => [],
        };
    }

    public function index()
    {
        $draftRaw = json_decode(Setting::get('theme_draft', '{}'), true) ?: [];
        $publishedRaw = json_decode(Setting::get('theme_published', '{}'), true) ?: [];

        $draftFlat = $this->isFlatTheme($draftRaw)
            ? $draftRaw
            : $this->nestedToFlat($draftRaw);

        $publishedFlat = $this->isFlatTheme($publishedRaw)
            ? $publishedRaw
            : $this->nestedToFlat($publishedRaw);

        $theme = array_merge($this->defaults(), $draftFlat);
        $isDirty = md5(json_encode($draftFlat)) !== md5(json_encode($publishedFlat));

        $draftNested = $this->isFlatTheme($draftRaw)
            ? $this->flatToNested(array_merge($this->defaults(), $draftRaw))
            : $draftRaw;

        $homeSections = $draftNested['homepageSections'] ?? $this->defaultHomepageSections();

        return view('customization.index', compact('theme', 'isDirty', 'homeSections'));
    }

    public function update(Request $request)
    {
        $action = $request->input('action', 'save_draft');

        if ($action === 'reset') {
            Setting::set('theme_draft', '{}', 'theme');
            Setting::set('theme_published', '{}', 'theme');

            return redirect()->route('admin.customization.index')->with('success', 'Tema restaurado ao padrão.');
        }

        $draftRaw = json_decode(Setting::get('theme_draft', '{}'), true) ?: [];
        $draftFlat = $this->isFlatTheme($draftRaw)
            ? array_merge($this->defaults(), $draftRaw)
            : array_merge($this->defaults(), $this->nestedToFlat($draftRaw));

        $inputs = $request->except(['_token', 'action', 'active_section']);
        $activeSection = (string) $request->input('active_section', 'colors');

        foreach ($inputs as $key => $value) {
            if ($key === 'section_toggle') {
                continue;
            }
            $draftFlat[$key] = $value;
        }

        foreach ($this->getBooleanFieldsBySection($activeSection) as $boolField) {
            if (!$request->has($boolField)) {
                $draftFlat[$boolField] = false;
            }
        }

        $baseNested = $this->isFlatTheme($draftRaw)
            ? []
            : $draftRaw;

        $nestedTheme = $this->flatToNested($draftFlat, $baseNested);

        if ($request->has('section_toggle')) {
            $sections = $nestedTheme['homepageSections'] ?? $this->defaultHomepageSections();
            $toggles = $request->input('section_toggle', []);

            foreach ($sections as &$section) {
                $sectionId = $section['id'] ?? '';
                if ($sectionId !== '') {
                    $section['enabled'] = isset($toggles[$sectionId]);
                }
            }

            $nestedTheme['homepageSections'] = $sections;
        }

        Setting::set('theme_draft', json_encode($nestedTheme), 'theme');

        // Sem botão de publicar no Blade atual: salvar já precisa refletir em /
        Setting::set('theme_published', json_encode($nestedTheme), 'theme');

        if ($request->ajax() || $request->wantsJson()) {
            return response()->json(['success' => true]);
        }

        return redirect()->route('admin.customization.index')
            ->with('success', 'Tema salvo e aplicado com sucesso!')
            ->withInput(['active_section' => $activeSection]);
    }
}
