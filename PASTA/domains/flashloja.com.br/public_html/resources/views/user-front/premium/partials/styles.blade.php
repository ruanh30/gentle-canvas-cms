{{-- Premium Theme Global Styles & Fonts --}}
@php
  // Fetch settings again to ensure availability in Layout/Global scope
  $appearance = $userBs->appearance ?? null;
  $settings = [];
  if ($appearance && !empty($appearance->settings)) {
      $settings = is_array($appearance->settings) ? $appearance->settings : (json_decode($appearance->settings, true) ?: []);
  }

  $pmColors  = $settings['colors']  ?? [];
  $pmTypo    = $settings['typography'] ?? [];
  $pmGlobal  = $settings['global'] ?? [];
  $pmCustom  = $settings['customCode'] ?? [];

  // Google Fonts Logic
  $gFonts = [];
  if (!empty($pmTypo['headingFont'])) $gFonts[] = urlencode($pmTypo['headingFont']) . ':wght@400;600;700;800;900';
  if (!empty($pmTypo['bodyFont']) && ($pmTypo['bodyFont'] ?? '') !== ($pmTypo['headingFont'] ?? '')) $gFonts[] = urlencode($pmTypo['bodyFont']) . ':wght@300;400;500;600;700';
@endphp

{{-- Google Fonts Links --}}
@if(!empty($gFonts))
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?{{ implode('&', array_map(fn($f) => 'family=' . $f, $gFonts)) }}&display=swap" rel="stylesheet">
@endif

{{-- Common styles needed for Premium Theme --}}
<link rel="stylesheet" href="{{ asset('assets/user-front/css/plugins.css') }}">
<link rel="stylesheet" href="{{ asset('assets/user-front/css/aos.min.css') }}">
<link rel="stylesheet" href="{{ asset('assets/user-front/fonts/fontawesome/css/all.min.css') }}">
{{-- Note: We exclude common/header-1.css as Premium has its own header --}}
<link rel="stylesheet" href="{{ asset('assets/user-front/css/common/style.css') }}">
<link rel="stylesheet" href="{{ asset('assets/user-front/css/tinymce-content.css') }}">

<style>
/* === Premium Theme Global Variables === */
:root {
  --pm-primary: {{ $pmColors['primary'] ?? '#1a1a1a' }};
  --pm-primary-fg: {{ $pmColors['primaryForeground'] ?? '#fafafa' }};
  --pm-secondary: {{ $pmColors['secondary'] ?? '#f5f5f5' }};
  --pm-secondary-fg: {{ $pmColors['secondaryForeground'] ?? '#1a1a1a' }};
  --pm-accent: {{ $pmColors['accent'] ?? '#f5f5f5' }};
  --pm-accent-fg: {{ $pmColors['accentForeground'] ?? '#1a1a1a' }};
  --pm-bg: {{ $pmColors['background'] ?? '#ffffff' }};
  --pm-fg: {{ $pmColors['foreground'] ?? '#1a1a1a' }};
  --pm-muted: {{ $pmColors['muted'] ?? '#f5f5f5' }};
  --pm-muted-fg: {{ $pmColors['mutedForeground'] ?? '#737373' }};
  --pm-border: {{ $pmColors['border'] ?? '#e5e5e5' }};
  --pm-success: {{ $pmColors['success'] ?? '#16a34a' }};
  --pm-warning: {{ $pmColors['warning'] ?? '#eab308' }};
  --pm-error: {{ $pmColors['error'] ?? '#dc2626' }};
  --pm-buy-now: {{ $pmColors['buyNow'] ?? '#dc2626' }};
  --pm-buy-now-hover: {{ $pmColors['buyNowHover'] ?? '#b91c1c' }};

  --pm-heading-font: '{{ $pmTypo['headingFont'] ?? 'Playfair Display' }}', serif;
  --pm-body-font: '{{ $pmTypo['bodyFont'] ?? 'Inter' }}', sans-serif;
  --pm-base-font-size: {{ $pmTypo['baseFontSize'] ?? 16 }}px;
  --pm-heading-weight: {{ $pmTypo['headingWeight'] ?? 700 }};
  --pm-body-weight: {{ $pmTypo['bodyWeight'] ?? 400 }};
  --pm-line-height: {{ $pmTypo['lineHeight'] ?? 1.6 }};
  
  --pm-container-width: {{ $pmGlobal['containerMaxPx'] ?? 1400 }}px;
}

/* Global Base Styles */
body {
  font-family: var(--pm-body-font);
  font-size: var(--pm-base-font-size);
  font-weight: var(--pm-body-weight);
  line-height: var(--pm-line-height);
  color: var(--pm-fg);
  background: var(--pm-bg);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--pm-heading-font);
  font-weight: var(--pm-heading-weight);
  color: var(--pm-fg);
}

.pm-container { 
  max-width: var(--pm-container-width); 
  margin: 0 auto; 
  padding: 0 1rem; 
}

/* Common Components */
.pm-btn { 
  padding: 0.5rem 1rem; 
  border-radius: 0.375rem; 
  font-size: 0.8rem; 
  font-weight: 600; 
  border: none; 
  cursor: pointer; 
  transition: all .2s; 
  text-align: center; 
  display: inline-block; 
  text-decoration: none; 
}
.pm-btn--primary { background: var(--pm-primary); color: var(--pm-primary-fg); }
.pm-btn--primary:hover { opacity: .9; }
.pm-btn--buy { background: var(--pm-buy-now); color: #fff; }
.pm-btn--buy:hover { background: var(--pm-buy-now-hover); }
.pm-btn--outline { background: transparent; border: 1px solid var(--pm-border); color: var(--pm-fg); }
.pm-btn--block { display: block; width: 100%; }

/* Section Title */
.pm-section-title { font-size: 1.5rem; font-weight: var(--pm-heading-weight); text-align: center; margin-bottom: 2rem; }

/* Hero */
.pm-hero { position: relative; background: var(--pm-secondary); }
.pm-hero__overlay { position: absolute; inset: 0; }
.pm-hero__inner { position: relative; z-index: 1; padding: 5rem 1rem; }
.pm-hero__inner.pm-hero--large { padding: 6rem 1rem; }
.pm-hero__inner.pm-hero--medium { padding: 4rem 1rem; }
.pm-hero__inner.pm-hero--small { padding: 3rem 1rem; }
.pm-hero__content { max-width: 36rem; }
.pm-hero__content--left { text-align: left; }
.pm-hero__content--center { text-align: center; margin: 0 auto; }
.pm-hero__content--right { text-align: right; margin-left: auto; }
.pm-hero__subtitle { font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.3em; color: var(--pm-muted-fg); margin-bottom: 1rem; }
.pm-hero__title { font-size: clamp(2rem, 5vw, 3.75rem); font-weight: var(--pm-heading-weight); line-height: 1.1; margin-bottom: 1.5rem; white-space: pre-line; }
.pm-hero__desc { color: var(--pm-muted-fg); font-size: 1.125rem; margin-bottom: 2rem; }
.pm-hero__cta { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 2rem; border-radius: 9999px; font-weight: 600; transition: all .2s; }
.pm-hero__cta--filled { background: var(--pm-primary); color: var(--pm-primary-fg); }
.pm-hero__cta--outline { border: 2px solid var(--pm-primary); color: var(--pm-primary); background: transparent; }
.pm-hero__cta:hover { opacity: .9; transform: translateY(-1px); }

/* Hero Slider */
.pm-hero-slider { position: relative; overflow: hidden; }
.pm-hero-slide { display: none; }
.pm-hero-slide.active { display: block; }
.pm-hero-dots { display: flex; justify-content: center; gap: 0.5rem; padding: 1rem 0; position: absolute; bottom: 0; left: 0; right: 0; z-index: 5; }
.pm-hero-dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.5); border: none; cursor: pointer; }
.pm-hero-dot.active { background: var(--pm-primary); }
.pm-hero-arrow { position: absolute; top: 50%; transform: translateY(-50%); z-index: 5; background: rgba(255,255,255,0.8); border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 1.25rem; display: flex; align-items: center; justify-content: center; }
.pm-hero-arrow--prev { left: 1rem; }
.pm-hero-arrow--next { right: 1rem; }

/* Categories */
.pm-categories-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
@media (min-width: 768px) { .pm-categories-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .pm-categories-grid { grid-template-columns: repeat(6, 1fr); } }
.pm-cat-card { text-align: center; padding: 1.5rem; border-radius: 0.75rem; background: var(--pm-secondary); transition: background .2s; text-decoration: none; color: var(--pm-fg); }
.pm-cat-card:hover { background: var(--pm-accent); }
.pm-cat-card__name { font-size: 0.875rem; font-weight: 500; }
.pm-cat-card__img { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; margin: 0 auto 0.75rem; }

/* Products Grid */
.pm-products-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
@media (min-width: 768px) { .pm-products-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .pm-products-grid { grid-template-columns: repeat({{ $pmCat['columnsDesktop'] ?? 4 }}, 1fr); } }
.pm-section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; }
.pm-section-header a { font-size: 0.875rem; color: var(--pm-muted-fg); text-decoration: none; display: flex; align-items: center; gap: 0.25rem; }
.pm-section-header a:hover { color: var(--pm-fg); }

/* Product Card */
.pm-product-card { border-radius: 0.5rem; overflow: hidden; transition: all .3s; text-decoration: none; color: var(--pm-fg); display: block; }
.pm-product-card:hover { transform: translateY(-2px); }
.pm-product-card__img-wrap { position: relative; overflow: hidden; background: var(--pm-secondary); }
.pm-product-card__img { width: 100%; aspect-ratio: 3/4; object-fit: cover; transition: transform .5s; }
.pm-product-card:hover .pm-product-card__img { transform: scale(1.05); }
.pm-product-card__badge { position: absolute; top: 0.5rem; left: 0.5rem; background: var(--pm-error); color: #fff; font-size: 0.75rem; padding: 0.15rem 0.5rem; border-radius: 0.25rem; }
.pm-product-card__body { padding: 0.75rem 0; }
.pm-product-card__category { font-size: 0.7rem; color: var(--pm-muted-fg); text-transform: uppercase; letter-spacing: 0.05em; }
.pm-product-card__title { font-size: 0.875rem; font-weight: 500; margin: 0.25rem 0; display: -webkit-box; -webkit-line-clamp: {{ $pmPC['titleLines'] ?? 2 }}; -webkit-box-orient: vertical; overflow: hidden; }
.pm-product-card__prices { display: flex; align-items: center; gap: 0.5rem; }
.pm-product-card__price { font-weight: 700; color: var(--pm-fg); }
.pm-product-card__old-price { text-decoration: line-through; color: var(--pm-muted-fg); font-size: 0.8rem; }
.pm-product-card__discount { color: var(--pm-success); font-size: 0.75rem; font-weight: 600; }
.pm-product-card__actions { margin-top: 0.5rem; display: flex; gap: 0.5rem; }

/* Banner */
.pm-banner { background: var(--pm-secondary); border-radius: 1rem; padding: 2rem; text-align: center; }
@media (min-width: 768px) { .pm-banner { padding: 4rem; } }
.pm-banner__title { font-size: clamp(1.5rem, 3vw, 2.5rem); font-weight: var(--pm-heading-weight); margin-bottom: 1rem; }
.pm-banner__desc { color: var(--pm-muted-fg); margin-bottom: 1.5rem; }

/* Benefits */
.pm-benefits-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
@media (min-width: 768px) { .pm-benefits-grid { grid-template-columns: repeat(4, 1fr); } }
.pm-benefit { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 1.5rem; border-radius: 0.75rem; background: var(--pm-secondary); }
.pm-benefit__icon { width: 2.5rem; height: 2.5rem; margin-bottom: 0.75rem; padding: 0.5rem; border-radius: 9999px; background: rgba(0,0,0,0.05); display: flex; align-items: center; justify-content: center; }
.pm-benefit__label { font-size: 0.875rem; font-weight: 600; }
.pm-benefit__desc { font-size: 0.75rem; color: var(--pm-muted-fg); margin-top: 0.25rem; }

/* Trust Bar */
.pm-trust-bar { display: flex; align-items: center; justify-content: center; gap: 2.5rem; flex-wrap: wrap; color: var(--pm-muted-fg); font-size: 0.875rem; }
.pm-trust-bar__item { display: flex; align-items: center; gap: 0.5rem; }
.pm-trust-bar__item svg { width: 1rem; height: 1rem; }

/* Testimonials */
.pm-testimonials-grid { display: grid; grid-template-columns: repeat(1, 1fr); gap: 1.5rem; }
@media (min-width: 768px) { .pm-testimonials-grid { grid-template-columns: repeat(3, 1fr); } }
.pm-testimonial { background: var(--pm-secondary); border-radius: 0.75rem; padding: 1.5rem; }
.pm-testimonial__text { font-style: italic; color: var(--pm-fg); margin-bottom: 1rem; font-size: 0.9rem; line-height: 1.6; }
.pm-testimonial__author { font-weight: 600; font-size: 0.875rem; }
.pm-testimonial__stars { color: #f59e0b; margin-bottom: 0.5rem; }

/* Brands */
.pm-brands { display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap; }
.pm-brands img { height: 40px; object-fit: contain; opacity: 0.6; transition: opacity .2s; }
.pm-brands img:hover { opacity: 1; }

/* Newsletter */
.pm-newsletter { background: var(--pm-secondary); border-radius: 1rem; padding: 2rem; text-align: center; }
@media (min-width: 768px) { .pm-newsletter { padding: 3rem; } }
.pm-newsletter__title { font-size: 1.5rem; font-weight: var(--pm-heading-weight); margin-bottom: 0.5rem; }
.pm-newsletter__desc { color: var(--pm-muted-fg); margin-bottom: 1.5rem; font-size: 0.9rem; }
.pm-newsletter__form { display: flex; gap: 0.5rem; max-width: 400px; margin: 0 auto; }
.pm-newsletter__form input { flex: 1; padding: 0.625rem 1rem; border: 1px solid var(--pm-border); border-radius: 0.375rem; font-size: 0.875rem; }
.pm-newsletter__form button { white-space: nowrap; }

/* Collections */
.pm-collections-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
@media (min-width: 768px) { .pm-collections-grid { grid-template-columns: repeat(3, 1fr); } }
.pm-collection-card { position: relative; border-radius: 0.75rem; overflow: hidden; aspect-ratio: 16/9; display: flex; align-items: flex-end; text-decoration: none; color: #fff; }
.pm-collection-card__overlay { position: absolute; inset: 0; background: linear-gradient(transparent 40%, rgba(0,0,0,0.7)); }
.pm-collection-card__title { position: relative; z-index: 1; padding: 1rem; font-weight: 600; font-size: 1rem; }

/* Carousel */
.pm-carousel { position: relative; }
.pm-carousel__track { display: flex; gap: 1rem; overflow-x: auto; scroll-behavior: smooth; padding: 0 2rem 1rem; -ms-overflow-style: none; scrollbar-width: none; }
.pm-carousel__track::-webkit-scrollbar { display: none; }
.pm-carousel__item { min-width: 260px; max-width: 280px; flex-shrink: 0; }
.pm-carousel__btn { position: absolute; top: 50%; transform: translateY(-50%); z-index: 5; background: rgba(255,255,255,0.9); border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; }
.pm-carousel__btn--prev { left: 0; }
.pm-carousel__btn--next { right: 0; }

/* WhatsApp */
.pm-whatsapp { position: fixed; bottom: 1.5rem; z-index: 50; display: none; align-items: center; gap: 0.5rem; padding: 0.75rem; border-radius: 9999px; color: #fff; text-decoration: none; box-shadow: 0 4px 14px rgba(0,0,0,0.2); transition: transform .2s; }
.pm-whatsapp:hover { transform: scale(1.05); color: #fff; }
.pm-whatsapp--br { right: 1.5rem; }
.pm-whatsapp--bl { left: 1.5rem; }
.pm-whatsapp svg { width: 24px; height: 24px; }
.pm-whatsapp__label { font-size: 0.875rem; font-weight: 500; padding-right: 0.5rem; }

/* Section spacing */
.pm-section { padding: 4rem 0; }
.pm-section--compact { padding: 2rem 0; }

/* Custom CSS from Settings */
{!! $pmCustom['css'] ?? '' !!}
</style>

{{-- Custom Head Scripts --}}
{!! $pmCustom['headScripts'] ?? '' !!}
