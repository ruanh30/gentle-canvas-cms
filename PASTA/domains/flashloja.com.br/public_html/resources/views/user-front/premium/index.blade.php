@extends('user-front.layout')

@section('meta-description', !empty($seo['description']) ? $seo['description'] : '')
@section('meta-keywords', !empty($seo['keywords']) ? $seo['keywords'] : '')

@section('page-title', $userBs->website_title ?? '')

@section('breadcrumb-title', 'Home')
@section('breadcrumb-link', '')

@php
  /* ─────── Safe defaults ─────── */
  $appearance = $userBs->appearance ?? \App\Models\User\UserAppearanceSetting::where('user_id', $user->id)->first();
  $settings   = [];
  if ($appearance && !empty($appearance->settings)) {
      $settings = is_array($appearance->settings)
          ? $appearance->settings
          : (json_decode($appearance->settings, true) ?: []);
  }
  // Pull each section with safe defaults
  $pmColors  = $settings['colors']  ?? [];
  $pmTypo    = $settings['typography'] ?? [];
  $pmGlobal  = $settings['global'] ?? [];
  $pmLogo    = $settings['logo'] ?? [];
  $pmHeader  = $settings['header'] ?? [];
  $pmHero    = $settings['hero'] ?? ['enabled' => true, 'slides' => []];
  $pmPC      = $settings['productCard'] ?? [];
  $pmPP      = $settings['productPage'] ?? [];
  $pmCat     = $settings['category'] ?? [];
  $pmCart    = $settings['cart'] ?? [];
  $pmCheckout = $settings['checkout'] ?? [];
  $pmFooter  = $settings['footer'] ?? [];
  $pmWhatsapp = $settings['whatsapp'] ?? [];
  $pmSeo     = $settings['seo'] ?? [];
  $pmCustom  = $settings['customCode'] ?? [];
  $pmButtons = $settings['buttons'] ?? [];
  $pmInputs  = $settings['inputs'] ?? [];
  $pmAccess  = $settings['accessibility'] ?? [];

  // Homepage sections — support both keys
  $homeSections = $settings['homepageSections']
      ?? $settings['homeSections']
      ?? [
           ['type' => 'hero', 'enabled' => true, 'title' => 'Hero Banner', 'showTitle' => false, 'settings' => []],
           ['type' => 'categories', 'enabled' => true, 'title' => 'Categorias', 'showTitle' => true, 'settings' => []],
           ['type' => 'featured-products', 'enabled' => true, 'title' => 'Destaques', 'showTitle' => true, 'settings' => []],
         ];
@endphp

@section('content')
<div class="pm-page">

@foreach($homeSections as $section)
  @if(empty($section['enabled'])) @continue @endif

  @switch($section['type'])

    {{-- ═══ HERO ═══ --}}
    @case('hero')
      @if(!empty($pmHero['enabled']) && !empty($pmHero['slides']))
        @php $slides = $pmHero['slides']; @endphp
        @if(count($slides) === 1)
          @php $slide = $slides[0]; @endphp
          <section class="pm-hero" @if(!empty($slide['backgroundImage']))
            style="background-image:url('{{ asset($slide['backgroundImage']) }}');background-size:cover;background-position:center" @endif>
            @if(!empty($slide['backgroundImage']))
              <div class="pm-hero__overlay" style="background:{{ $slide['overlayColor'] ?? '#000' }};opacity:{{ $slide['overlayOpacity'] ?? 0 }}"></div>
            @endif
            <div class="pm-container pm-hero__inner pm-hero--{{ $pmHero['height'] ?? 'large' }}">
              <div class="pm-hero__content pm-hero__content--{{ $slide['contentAlign'] ?? 'left' }}" @if(!empty($slide['textColor'])) style="color:{{ $slide['textColor'] }}" @endif>
                @if(!empty($slide['subtitle']))
                  <p class="pm-hero__subtitle">{{ $slide['subtitle'] }}</p>
                @endif
                <h1 class="pm-hero__title">{!! nl2br(e($slide['title'] ?? '')) !!}</h1>
                @if(!empty($slide['description']))
                  <p class="pm-hero__desc">{{ $slide['description'] }}</p>
                @endif
                @if(!empty($slide['ctaText']))
                  <a href="{{ $slide['ctaLink'] ?? '#' }}" class="pm-hero__cta pm-hero__cta--{{ $slide['ctaStyle'] ?? 'filled' }}">
                    {{ $slide['ctaText'] }}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </a>
                @endif
              </div>
            </div>
          </section>
        @else
          {{-- Multi-slide hero --}}
          <div class="pm-hero-slider" id="pmHeroSlider">
            @foreach($slides as $idx => $slide)
              <div class="pm-hero-slide {{ $idx === 0 ? 'active' : '' }}">
                <section class="pm-hero" @if(!empty($slide['backgroundImage']))
                  style="background-image:url('{{ asset($slide['backgroundImage']) }}');background-size:cover;background-position:center" @endif>
                  @if(!empty($slide['backgroundImage']))
                    <div class="pm-hero__overlay" style="background:{{ $slide['overlayColor'] ?? '#000' }};opacity:{{ $slide['overlayOpacity'] ?? 0 }}"></div>
                  @endif
                  <div class="pm-container pm-hero__inner pm-hero--{{ $pmHero['height'] ?? 'large' }}">
                    <div class="pm-hero__content pm-hero__content--{{ $slide['contentAlign'] ?? 'left' }}" @if(!empty($slide['textColor'])) style="color:{{ $slide['textColor'] }}" @endif>
                      @if(!empty($slide['subtitle']))
                        <p class="pm-hero__subtitle">{{ $slide['subtitle'] }}</p>
                      @endif
                      <h1 class="pm-hero__title">{!! nl2br(e($slide['title'] ?? '')) !!}</h1>
                      @if(!empty($slide['description']))
                        <p class="pm-hero__desc">{{ $slide['description'] }}</p>
                      @endif
                      @if(!empty($slide['ctaText']))
                        <a href="{{ $slide['ctaLink'] ?? '#' }}" class="pm-hero__cta pm-hero__cta--{{ $slide['ctaStyle'] ?? 'filled' }}">
                          {{ $slide['ctaText'] }}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </a>
                      @endif
                    </div>
                  </div>
                </section>
              </div>
            @endforeach
            @if(!empty($pmHero['showArrows']))
              <button class="pm-hero-arrow pm-hero-arrow--prev" onclick="pmHeroNav(-1)">&#8249;</button>
              <button class="pm-hero-arrow pm-hero-arrow--next" onclick="pmHeroNav(1)">&#8250;</button>
            @endif
            @if(!empty($pmHero['showDots']))
              <div class="pm-hero-dots">
                @foreach($slides as $idx => $s)
                  <button class="pm-hero-dot {{ $idx === 0 ? 'active' : '' }}" onclick="pmHeroGo({{ $idx }})"></button>
                @endforeach
              </div>
            @endif
          </div>
        @endif
      @endif
      @break

    {{-- ═══ CATEGORIES ═══ --}}
    @case('categories')
      <section class="pm-section">
        <div class="pm-container">
          @if(!empty($section['showTitle']))
            <h2 class="pm-section-title">{{ $section['title'] ?? 'Categorias' }}</h2>
          @endif
          @php
            $cats = \App\Models\User\UserItemCategory::where('user_id', $userBs->user_id)
                      ->where('status', 1)->orderBy('serial_number', 'asc')->get();
            $isCarousel = ($section['settings']['displayMode'] ?? '') === 'carousel';
            $carSpeed = $section['settings']['carouselSpeed'] ?? 4;
          @endphp
          @if($isCarousel)
            <div class="pm-carousel" data-pm-carousel data-speed="{{ $carSpeed }}">
              <button class="pm-carousel__btn pm-carousel__btn--prev" data-dir="left">&#8249;</button>
              <div class="pm-carousel__track">
                @foreach($cats as $cat)
                  <a href="{{ route('front.user.shop', getParam()) }}?category={{ $cat->slug }}" class="pm-cat-card pm-carousel__item" style="min-width:160px">
                    @if(!empty($cat->image))
                      <img class="pm-cat-card__img lazyload" data-src="{{ asset('assets/front/img/user/items/categories/' . $cat->image) }}" src="{{ asset('assets/front/images/placeholder.png') }}" alt="{{ $cat->name }}">
                    @endif
                    <p class="pm-cat-card__name">{{ $cat->name }}</p>
                  </a>
                @endforeach
              </div>
              <button class="pm-carousel__btn pm-carousel__btn--next" data-dir="right">&#8250;</button>
            </div>
          @else
            <div class="pm-categories-grid">
              @foreach($cats as $cat)
                <a href="{{ route('front.user.shop', getParam()) }}?category={{ $cat->slug }}" class="pm-cat-card">
                  @if(!empty($cat->image))
                    <img class="pm-cat-card__img lazyload" data-src="{{ asset('assets/front/img/user/items/categories/' . $cat->image) }}" src="{{ asset('assets/front/images/placeholder.png') }}" alt="{{ $cat->name }}">
                  @endif
                  <p class="pm-cat-card__name">{{ $cat->name }}</p>
                </a>
              @endforeach
            </div>
          @endif
        </div>
      </section>
      @break

    {{-- ═══ FEATURED PRODUCTS ═══ --}}
    @case('featured-products')
      <section class="pm-section">
        <div class="pm-container">
          <div class="pm-section-header">
            @if(!empty($section['showTitle']))
              <h2 class="pm-section-title" style="margin-bottom:0;text-align:left">{{ $section['title'] ?? 'Destaques' }}</h2>
            @endif
            <a href="{{ route('front.user.shop', getParam()) }}">
              Ver todos
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
          @php
            $isCarousel = ($section['settings']['displayMode'] ?? '') === 'carousel';
            $carSpeed = $section['settings']['carouselSpeed'] ?? 4;
            $featuredProducts = \App\Models\User\UserItem::where('user_id', $userBs->user_id)
                                  ->where('is_feature', 1)->where('status', 1)
                                  ->orderBy('id', 'desc')->take(12)->get();
          @endphp
          @if($isCarousel)
            <div class="pm-carousel" data-pm-carousel data-speed="{{ $carSpeed }}">
              <button class="pm-carousel__btn pm-carousel__btn--prev" data-dir="left">&#8249;</button>
              <div class="pm-carousel__track">
                @foreach($featuredProducts as $product)
                  <div class="pm-carousel__item">
                    @include('user-front.premium.partials.product-card', ['item' => $product])
                  </div>
                @endforeach
              </div>
              <button class="pm-carousel__btn pm-carousel__btn--next" data-dir="right">&#8250;</button>
            </div>
          @else
            <div class="pm-products-grid">
              @foreach($featuredProducts as $product)
                @include('user-front.premium.partials.product-card', ['item' => $product])
              @endforeach
            </div>
          @endif
        </div>
      </section>
      @break

    {{-- ═══ BANNER ═══ --}}
    @case('banner')
      <section class="pm-section--compact">
        <div class="pm-container">
          <div class="pm-banner">
            <h2 class="pm-banner__title">{{ $section['settings']['title'] ?? 'Banner Promocional' }}</h2>
            <p class="pm-banner__desc">{{ $section['settings']['description'] ?? '' }}</p>
            @php
              try { $loginUrl = route('customer.signup', getParam()); } catch (\Exception $e) { $loginUrl = '#'; }
            @endphp
            <a href="{{ $loginUrl }}" class="pm-btn pm-btn--outline">Criar conta</a>
          </div>
        </div>
      </section>
      @break

    {{-- ═══ BENEFITS ═══ --}}
    @case('benefits')
      <section class="pm-section">
        <div class="pm-container">
          @if(!empty($section['showTitle']))
            <h2 class="pm-section-title">{{ $section['title'] ?? 'Benefícios' }}</h2>
          @endif
          @php
            $benefits = [
              ['icon' => '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>', 'label' => 'Frete Grátis', 'desc' => 'Para todo o Brasil'],
              ['icon' => '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>', 'label' => 'Troca Fácil', 'desc' => 'Até 30 dias'],
              ['icon' => '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 12 15 16 10"/></svg>', 'label' => 'Compra Segura', 'desc' => '100% protegida'],
              ['icon' => '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>', 'label' => '12x sem juros', 'desc' => 'No cartão de crédito'],
            ];
          @endphp
          <div class="pm-benefits-grid">
            @foreach($benefits as $b)
              <div class="pm-benefit">
                <div class="pm-benefit__icon">{!! $b['icon'] !!}</div>
                <p class="pm-benefit__label">{{ $b['label'] }}</p>
                <p class="pm-benefit__desc">{{ $b['desc'] }}</p>
              </div>
            @endforeach
          </div>
        </div>
      </section>
      @break

    {{-- ═══ TESTIMONIALS ═══ --}}
    @case('testimonials')
      <section class="pm-section">
        <div class="pm-container">
          @if(!empty($section['showTitle']))
            <h2 class="pm-section-title">{{ $section['title'] ?? 'Depoimentos' }}</h2>
          @endif
          @php
            $testimonials = [];
            try {
              $testimonials = \App\Models\User\UserTestimonial::where('user_id', $userBs->user_id)
                                ->where('status', 1)->orderBy('serial_number', 'asc')->take(6)->get();
            } catch (\Exception $e) { $testimonials = collect(); }
          @endphp
          @if($testimonials->count() > 0)
            <div class="pm-testimonials-grid">
              @foreach($testimonials as $tst)
                <div class="pm-testimonial">
                  @if(!empty($tst->rating))
                    <div class="pm-testimonial__stars">
                      @for($i = 0; $i < ($tst->rating ?? 5); $i++) ★ @endfor
                    </div>
                  @endif
                  <p class="pm-testimonial__text">"{{ $tst->comment ?? $tst->content ?? '' }}"</p>
                  <p class="pm-testimonial__author">{{ $tst->name ?? '' }}</p>
                </div>
              @endforeach
            </div>
          @else
            <div class="pm-testimonials-grid">
              @php
                $fallback = [
                  ['text' => 'Loja incrível! Produtos de qualidade e entrega rápida.', 'author' => 'Maria S.', 'rating' => 5],
                  ['text' => 'Atendimento excelente, super recomendo!', 'author' => 'João P.', 'rating' => 5],
                  ['text' => 'Comprei e recebi antes do prazo. Muito satisfeito!', 'author' => 'Ana L.', 'rating' => 5],
                ];
              @endphp
              @foreach($fallback as $fb)
                <div class="pm-testimonial">
                  <div class="pm-testimonial__stars">@for($i = 0; $i < $fb['rating']; $i++) ★ @endfor</div>
                  <p class="pm-testimonial__text">"{{ $fb['text'] }}"</p>
                  <p class="pm-testimonial__author">{{ $fb['author'] }}</p>
                </div>
              @endforeach
            </div>
          @endif
        </div>
      </section>
      @break

    {{-- ═══ BRANDS ═══ --}}
    @case('brands')
      <section class="pm-section">
        <div class="pm-container">
          @if(!empty($section['showTitle']))
            <h2 class="pm-section-title">{{ $section['title'] ?? 'Marcas' }}</h2>
          @endif
          @php
            $brands = [];
            try {
              $brands = \App\Models\User\UserItemBrand::where('user_id', $userBs->user_id)
                          ->where('status', 1)->orderBy('serial_number', 'asc')->get();
            } catch (\Exception $e) { $brands = collect(); }
            $isBrandCarousel = ($section['settings']['displayMode'] ?? '') === 'carousel';
          @endphp
          @if($isBrandCarousel && $brands->count() > 0)
            <div class="pm-carousel" data-pm-carousel data-speed="{{ $section['settings']['carouselSpeed'] ?? 4 }}">
              <button class="pm-carousel__btn pm-carousel__btn--prev" data-dir="left">&#8249;</button>
              <div class="pm-carousel__track" style="align-items:center">
                @foreach($brands as $brand)
                  @if(!empty($brand->image))
                    <img src="{{ asset('assets/front/img/user/items/brands/' . $brand->image) }}" alt="{{ $brand->name }}" style="height:40px;object-fit:contain;min-width:100px;opacity:0.6">
                  @else
                    <span style="min-width:100px;text-align:center;font-weight:600;opacity:0.6">{{ $brand->name }}</span>
                  @endif
                @endforeach
              </div>
              <button class="pm-carousel__btn pm-carousel__btn--next" data-dir="right">&#8250;</button>
            </div>
          @else
            <div class="pm-brands">
              @foreach($brands as $brand)
                @if(!empty($brand->image))
                  <img src="{{ asset('assets/front/img/user/items/brands/' . $brand->image) }}" alt="{{ $brand->name }}">
                @else
                  <span style="font-weight:600;opacity:0.6">{{ $brand->name }}</span>
                @endif
              @endforeach
            </div>
          @endif
        </div>
      </section>
      @break

    {{-- ═══ NEWSLETTER ═══ --}}
    @case('newsletter')
      <section class="pm-section--compact">
        <div class="pm-container">
          <div class="pm-newsletter">
            <h2 class="pm-newsletter__title">{{ $pmFooter['newsletterTitle'] ?? 'Receba novidades' }}</h2>
            <p class="pm-newsletter__desc">{{ $pmFooter['newsletterDescription'] ?? 'Cadastre-se e fique por dentro das promoções.' }}</p>
            <form class="pm-newsletter__form" action="{{ (\Illuminate\Support\Facades\Route::has('front.user.subscriber') ? route('front.user.subscriber', getParam()) : '#') }}" method="POST">
              @csrf
              <input type="email" name="email" placeholder="Seu e-mail" required>
              <button type="submit" class="pm-btn pm-btn--primary">Inscrever</button>
            </form>
          </div>
        </div>
      </section>
      @break

    {{-- ═══ COLLECTIONS ═══ --}}
    @case('collections')
      <section class="pm-section">
        <div class="pm-container">
          @if(!empty($section['showTitle']))
            <h2 class="pm-section-title">{{ $section['title'] ?? 'Coleções' }}</h2>
          @endif
          @php
            $cats = \App\Models\User\UserItemCategory::where('user_id', $userBs->user_id)
                      ->where('status', 1)->where('is_feature', 1)->orderBy('serial_number', 'asc')->take(6)->get();
            if ($cats->isEmpty()) {
              $cats = \App\Models\User\UserItemCategory::where('user_id', $userBs->user_id)
                        ->where('status', 1)->orderBy('serial_number', 'asc')->take(6)->get();
            }
          @endphp
          <div class="pm-collections-grid">
            @foreach($cats as $cat)
              <a href="{{ route('front.user.shop', getParam()) }}?category={{ $cat->slug }}" class="pm-collection-card" @if(!empty($cat->image)) style="background:url('{{ asset('assets/front/img/user/items/categories/' . $cat->image) }}') center/cover" @else style="background:var(--pm-secondary)" @endif>
                <div class="pm-collection-card__overlay"></div>
                <span class="pm-collection-card__title">{{ $cat->name }}</span>
              </a>
            @endforeach
          </div>
        </div>
      </section>
      @break

    {{-- ═══ TRUST BAR ═══ --}}
    @case('trust-bar')
      <section class="pm-section--compact">
        <div class="pm-container">
          <div class="pm-trust-bar">
            @php
              $trustItems = [
                ['icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>', 'text' => 'Compra Segura'],
                ['icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>', 'text' => 'Dados Protegidos'],
                ['icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10"/><polyline points="9 11 12 14 22 4"/></svg>', 'text' => 'Entrega Garantida'],
              ];
            @endphp
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

{{-- Hero Slider JS --}}
<script>
(function(){
  var slider = document.getElementById('pmHeroSlider');
  if (!slider) return;
  var slides = slider.querySelectorAll('.pm-hero-slide');
  var dots = slider.querySelectorAll('.pm-hero-dot');
  var current = 0;
  var autoplay = {{ !empty($pmHero['autoplay']) ? 'true' : 'false' }};
  var speed = {{ ($pmHero['autoplaySpeed'] ?? 5) * 1000 }};
  var timer;

  window.pmHeroGo = function(idx) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = idx;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
    if (autoplay) { clearInterval(timer); timer = setInterval(function(){ window.pmHeroNav(1); }, speed); }
  };
  window.pmHeroNav = function(dir) {
    var next = (current + dir + slides.length) % slides.length;
    window.pmHeroGo(next);
  };
  if (autoplay && slides.length > 1) {
    timer = setInterval(function(){ window.pmHeroNav(1); }, speed);
  }
})();
</script>

{{-- Carousel JS --}}
<script>
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('[data-pm-carousel]').forEach(function(el){
    var track = el.querySelector('.pm-carousel__track');
    if(!track) return;
    var speed = parseInt(el.dataset.speed || '4') * 1000;
    var interval = setInterval(function(){
      if(track.scrollLeft + track.clientWidth >= track.scrollWidth - 10){
        track.scrollTo({left:0,behavior:'smooth'});
      } else {
        track.scrollBy({left:280,behavior:'smooth'});
      }
    }, speed);
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
