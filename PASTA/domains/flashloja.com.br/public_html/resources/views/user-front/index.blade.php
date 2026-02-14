@extends('user-front.layout')
@section('meta-description', !empty($seo) ? $seo->home_meta_description : '')
@section('meta-keywords', !empty($seo) ? $seo->home_meta_keywords : '')
@section('page-title', $keywords['Home'] ?? __('Home'))
@section('og-meta')
  <meta property="og:title" content="{{ $user->username }}">
  <meta property="og:image" content="{{ !empty($userBs->favicon) ? asset('assets/front/img/user/' . $userBs->favicon) : '' }}">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1024">
  <meta property="og:image:height" content="1024">
@endsection

@php
  $pmAppearance = \App\Models\User\UserAppearanceSetting::where('user_id', $user->id)->where('theme','premium')->first();
  $pmSettings = [];
  if ($pmAppearance) {
    $pmSettings = is_array($pmAppearance->settings) ? $pmAppearance->settings : (json_decode($pmAppearance->settings, true) ?? []);
  }
  $pmHero = $pmSettings['hero'] ?? [];
  $pmCardConfig = $pmSettings['productCard'] ?? [];
  $pmColors = $pmSettings['colors'] ?? [];
  $pmCategory = $pmSettings['category'] ?? [];
  $pmHomeSections = $pmSettings['homepageSections'] ?? ($pmSettings['homeSections'] ?? []);
  $pmWhatsapp = $pmSettings['whatsapp'] ?? [];

  // Default sections if none configured
  if (empty($pmHomeSections)) {
    $pmHomeSections = [
      ['id'=>'hero','type'=>'hero','enabled'=>true,'title'=>'Hero Banner','showTitle'=>false,'settings'=>[]],
      ['id'=>'categories','type'=>'categories','enabled'=>true,'title'=>'Categorias','showTitle'=>true,'settings'=>[]],
      ['id'=>'featured','type'=>'featured-products','enabled'=>true,'title'=>'Destaques','showTitle'=>true,'settings'=>[]],
      ['id'=>'banner','type'=>'banner','enabled'=>true,'title'=>'Banner Promocional','showTitle'=>false,'settings'=>['title'=>'Cadastre-se e ganhe 15% OFF','description'=>'Use o cupom BEMVINDO na sua primeira compra.']],
      ['id'=>'benefits','type'=>'benefits','enabled'=>false,'title'=>'Benefícios','showTitle'=>false,'settings'=>[]],
      ['id'=>'trust-bar','type'=>'trust-bar','enabled'=>false,'title'=>'Selos de Confiança','showTitle'=>false,'settings'=>[]],
    ];
  }

  $columns = $pmCategory['columnsDesktop'] ?? 4;
  $gridClass = match((int)$columns) {
    2 => 'pm-product-grid--2',
    3 => 'pm-product-grid--3',
    5 => 'pm-product-grid--5',
    default => 'pm-product-grid--4',
  };

  // Featured items (use $latestItems or $items)
  $featuredItems = $items ?? ($latestItems ?? collect());
  $cats = $categories ?? collect();
@endphp

@section('content')
<div class="pm-theme">

@foreach ($pmHomeSections as $section)
  @if (!($section['enabled'] ?? true)) @continue @endif
  @php
    $sType = $section['type'] ?? $section['id'];
    $sSettings = $section['settings'] ?? [];
    $isCarousel = ($sSettings['displayMode'] ?? '') === 'carousel';
    $carouselSpeed = $sSettings['carouselSpeed'] ?? 4;
  @endphp

  @switch($sType)

  {{-- ═══ HERO ═══ --}}
  @case('hero')
    @php
      $heroEnabled = $pmHero['enabled'] ?? true;
      $heroSlides = $pmHero['slides'] ?? [];
      $slide = $heroSlides[0] ?? null;
    @endphp

    @if ($heroEnabled && $slide)
      <section id="pm-section-{{ $section['id'] ?? ($section['type'] . '-' . $loop->index) }}" data-section-type="{{ $sType }}" class="pm-hero"
        @if (!empty($slide['backgroundImage']))
          style="background-image:url('{{ $slide['backgroundImage'] }}');background-size:cover;background-position:center"
        @endif
      >
        @if (!empty($slide['backgroundImage']))
          <div class="pm-hero__overlay" style="background-color:{{ $slide['overlayColor'] ?? '#000' }};opacity:{{ $slide['overlayOpacity'] ?? 0.3 }}"></div>
        @endif
        <div class="pm-hero__inner">
          <div class="pm-container">
            <div class="pm-hero__content pm-hero__content--{{ $slide['contentAlign'] ?? 'left' }}">
              @if (!empty($slide['subtitle']))
                <p class="pm-hero__subtitle pm-font-body">{{ $slide['subtitle'] }}</p>
              @endif
              @if (!empty($slide['title']))
                <h1 class="pm-hero__title pm-font-display" @if(!empty($slide['textColor'])) style="color:{{ $slide['textColor'] }}" @endif>{{ $slide['title'] }}</h1>
              @endif
              @if (!empty($slide['description']))
                <p class="pm-hero__desc pm-font-body">{{ $slide['description'] }}</p>
              @endif
              @if (!empty($slide['ctaText']))
                <a href="{{ $slide['ctaLink'] ?? route('front.user.shop', getParam()) }}" class="pm-hero__cta">
                  {{ $slide['ctaText'] }}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
              @endif
            </div>
          </div>
        </div>
      </section>
    @else
      {{-- Hero placeholder --}}
      <section id="pm-section-{{ $section['id'] ?? ($section['type'] . '-' . $loop->index) }}" data-section-type="{{ $sType }}" class="pm-hero--placeholder">
        <div class="pm-container" style="text-align:center">
          <h1 class="pm-font-display" style="font-size:2.5rem;font-weight:700;margin-bottom:16px">{{ $userBs->shop_name ?? 'Sua Loja' }}</h1>
          <p class="pm-font-body" style="color:var(--pm-muted-fg);font-size:18px">Configure o hero no editor de tema</p>
        </div>
      </section>
    @endif
    @break

  {{-- ═══ CATEGORIES ═══ --}}
  @case('categories')
    <section id="pm-section-{{ $section['id'] ?? ($section['type'] . '-' . $loop->index) }}" data-section-type="{{ $sType }}" class="pm-section">
      <div class="pm-container">
        @if (($section['showTitle'] ?? true) !== false && !empty($section['title']))
          <h2 class="pm-section__title pm-font-display">{{ $section['title'] }}</h2>
        @endif

        @if ($isCarousel)
          <div class="pm-carousel" data-pm-carousel data-speed="{{ $carouselSpeed }}">
            <button class="pm-carousel__btn pm-carousel__btn--left" data-dir="left">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div class="pm-carousel__track">
              @foreach ($cats as $cat)
                <a href="{{ route('front.user.shop', [getParam(), 'category' => $cat->slug]) }}"
                   class="pm-carousel__item pm-carousel__item--category pm-category-card">
                  @if (!empty($cat->image))
                    <img src="{{ asset('assets/front/img/user/category/' . $cat->image) }}" alt="{{ $cat->name }}" class="pm-category-card__img">
                  @endif
                  <p class="pm-category-card__name">{{ $cat->name }}</p>
                </a>
              @endforeach
            </div>
            <button class="pm-carousel__btn pm-carousel__btn--right" data-dir="right">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        @else
          <div class="pm-categories-grid">
            @foreach ($cats as $cat)
              <a href="{{ route('front.user.shop', [getParam(), 'category' => $cat->slug]) }}" class="pm-category-card">
                @if (!empty($cat->image))
                  <img src="{{ asset('assets/front/img/user/category/' . $cat->image) }}" alt="{{ $cat->name }}" class="pm-category-card__img">
                @endif
                <p class="pm-category-card__name">{{ $cat->name }}</p>
              </a>
            @endforeach
          </div>
        @endif
      </div>
    </section>
    @break

  {{-- ═══ FEATURED PRODUCTS ═══ --}}
  @case('featured-products')
    <section id="pm-section-{{ $section['id'] ?? ($section['type'] . '-' . $loop->index) }}" data-section-type="{{ $sType }}" class="pm-section">
      <div class="pm-container">
        <div class="pm-section__header">
          @if (($section['showTitle'] ?? true) !== false && !empty($section['title']))
            <h2 class="pm-font-display">{{ $section['title'] }}</h2>
          @endif
          <a href="{{ route('front.user.shop', getParam()) }}" class="pm-section__viewall">
            Ver todos
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>

        @if ($isCarousel)
          <div class="pm-carousel" data-pm-carousel data-speed="{{ $carouselSpeed }}">
            <button class="pm-carousel__btn pm-carousel__btn--left" data-dir="left">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div class="pm-carousel__track">
              @foreach ($featuredItems as $item)
                <div class="pm-carousel__item pm-carousel__item--product">
                  @include('user-front.premium.partials.product-card', ['item' => $item, 'pmCardConfig' => $pmCardConfig, 'pmColors' => $pmColors])
                </div>
              @endforeach
            </div>
            <button class="pm-carousel__btn pm-carousel__btn--right" data-dir="right">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        @else
          <div class="pm-product-grid {{ $gridClass }}">
            @foreach ($featuredItems as $item)
              @include('user-front.premium.partials.product-card', ['item' => $item, 'pmCardConfig' => $pmCardConfig, 'pmColors' => $pmColors])
            @endforeach
          </div>
        @endif
      </div>
    </section>
    @break

  {{-- ═══ BANNER ═══ --}}
  @case('banner')
    @php
      $bannerTitle = $sSettings['title'] ?? 'Cadastre-se e ganhe 15% OFF';
      $bannerDesc = $sSettings['description'] ?? 'Use o cupom BEMVINDO na sua primeira compra.';
    @endphp
    <section id="pm-section-{{ $section['id'] ?? ($section['type'] . '-' . $loop->index) }}" data-section-type="{{ $sType }}" class="pm-section--sm">
      <div class="pm-container">
        <div class="pm-banner">
          <h2 class="pm-banner__title pm-font-display">{{ $bannerTitle }}</h2>
          <p class="pm-banner__desc pm-font-body">{{ $bannerDesc }}</p>
          <a href="{{ route('customer.login', getParam()) }}" class="pm-banner__btn pm-font-body">Criar conta</a>
        </div>
      </div>
    </section>
    @break

  {{-- ═══ BENEFITS ═══ --}}
  @case('benefits')
    @php
      $benefitsItems = $pmSettings['benefits']['items'] ?? [];
      if (empty($benefitsItems)) {
        $benefitsItems = [
          ['icon'=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>', 'title'=>'Frete Grátis', 'description'=>'Para todo o Brasil'],
          ['icon'=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>', 'title'=>'Troca Fácil', 'description'=>'Até 30 dias'],
          ['icon'=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>', 'title'=>'Compra Segura', 'description'=>'100% protegida'],
          ['icon'=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>', 'title'=>'12x sem juros', 'description'=>'No cartão de crédito']
        ];
      }
    @endphp
    <section id="pm-section-{{ $section['id'] ?? ($section['type'] . '-' . $loop->index) }}" data-section-type="{{ $sType }}" class="pm-section">
      <div class="pm-container">
        @if (($section['showTitle'] ?? true) !== false && !empty($section['title']))
          <h2 class="pm-section__title pm-font-display">{{ $section['title'] }}</h2>
        @endif
        <div class="pm-benefits-grid">
          @foreach($benefitsItems as $bItem)
          <div class="pm-benefit">
            <div class="pm-benefit__icon">{!! $bItem['icon'] !!}</div>
            <p class="pm-benefit__label">{{ $bItem['title'] }}</p>
            <p class="pm-benefit__desc">{{ $bItem['description'] }}</p>
          </div>
          @endforeach
        </div>
      </div>
    </section>
    @break

  {{-- ═══ TRUST BAR ═══ --}}
  @case('trust-bar')
    @php
      $trustItems = $pmSettings['trustBar']['items'] ?? [];
      if (empty($trustItems)) {
        $trustItems = [
          ['icon'=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>', 'text'=>'Compra Segura'],
          ['icon'=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>', 'text'=>'Dados Protegidos'],
          ['icon'=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><polyline points="9 10 11 12 15 8"/></svg>', 'text'=>'Entrega Garantida']
        ];
      }
    @endphp
    <section id="pm-section-{{ $section['id'] ?? ($section['type'] . '-' . $loop->index) }}" data-section-type="{{ $sType }}" class="pm-section--sm">
      <div class="pm-container">
        <div class="pm-trust-bar">
          @foreach($trustItems as $tItem)
          <span class="pm-trust-bar__item">
            {!! $tItem['icon'] !!}
            {{ $tItem['text'] }}
          </span>
          @endforeach
        </div>
      </div>
    </section>
    @break

  @endswitch
@endforeach

{{-- WhatsApp Button --}}
@if (!empty($pmWhatsapp['enabled']) && !empty($pmWhatsapp['number']))
  @php
    $waNumber = preg_replace('/\D/', '', $pmWhatsapp['number']);
    $waMsg = urlencode($pmWhatsapp['message'] ?? 'Olá! Gostaria de saber mais sobre os produtos.');
    $waPos = ($pmWhatsapp['position'] ?? 'bottom-right') === 'bottom-left' ? 'pm-whatsapp--bl' : 'pm-whatsapp--br';
    $waBg = $pmWhatsapp['backgroundColor'] ?? '#25d366';
    $waDelay = ($pmWhatsapp['delay'] ?? 3) * 1000;
  @endphp
  <a href="https://wa.me/{{ $waNumber }}?text={{ $waMsg }}" target="_blank" rel="noopener"
     class="pm-whatsapp {{ $waPos }}" id="pmWhatsapp"
     style="background:{{ $waBg }};display:none">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
    @if (!empty($pmWhatsapp['showLabel']))
      <span class="pm-whatsapp__label">{{ $pmWhatsapp['label'] ?? 'Precisa de ajuda?' }}</span>
    @endif
  </a>
  <script>setTimeout(function(){var e=document.getElementById('pmWhatsapp');if(e)e.style.display='flex'},{{ $waDelay }});</script>
@endif

</div>

{{-- Carousel JS --}}
<script>
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('[data-pm-carousel]').forEach(function(el){
    var track = el.querySelector('.pm-carousel__track');
    if(!track) return;
    var speed = parseInt(el.dataset.speed || '4') * 1000;
    // Auto-scroll
    var interval = setInterval(function(){
      if(track.scrollLeft + track.clientWidth >= track.scrollWidth - 10){
        track.scrollTo({left:0,behavior:'smooth'});
      } else {
        track.scrollBy({left:280,behavior:'smooth'});
      }
    }, speed);
    // Manual buttons
    el.querySelectorAll('[data-dir]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var dir = btn.dataset.dir === 'left' ? -300 : 300;
        track.scrollBy({left:dir,behavior:'smooth'});
      });
    });
  });
});
</script>
@endsection
