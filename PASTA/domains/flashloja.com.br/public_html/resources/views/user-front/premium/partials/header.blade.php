{{-- Premium Theme Header Partial --}}
@php
  $appearance = $userBs->appearance ?? null;
  $settings = [];
  if ($appearance && !empty($appearance->settings)) {
      $settings = is_array($appearance->settings) ? $appearance->settings : (json_decode($appearance->settings, true) ?: []);
  }
  $pmHeader  = $settings['header'] ?? [];
  $pmLogo    = $settings['logo'] ?? [];
  $pmColors  = $settings['colors'] ?? [];

  $h            = $pmHeader;
  $announce     = $h['announcement'] ?? [];
  $bannerBelow  = $h['bannerBelow'] ?? [];
  $isSticky     = !empty($h['sticky']);
  $borderBot    = !empty($h['borderBottom']);
  $height       = $h['height'] ?? 64;
  $layout       = $h['layout'] ?? 'classic';
  $isMinimal    = in_array($layout, ['minimal', 'hamburger-only']);
  $isCentered   = in_array($layout, ['centered', 'logo-center-nav-left']);
  $menuFontSize = $h['menuFontSize'] ?? 13;
  $menuUpper    = !empty($h['menuUppercase']);
  $menuSpacing  = $h['menuLetterSpacing'] ?? 0.1;
  $iconSize     = $h['iconSize'] ?? 20;
  $showSearch   = $h['showSearch'] ?? true;
  $showAccount  = $h['showAccount'] ?? true;
  $showWishlist = $h['showWishlist'] ?? false;
  $showCart     = $h['showCart'] ?? true;
  $cartBadge   = $h['cartBadgeStyle'] ?? 'count';
  $shrinkOnScroll = !empty($h['shrinkOnScroll']);
  $shadowOnScroll = !empty($h['shadowOnScroll']);

  // Categories for menu
  $menuCats = \App\Models\User\UserItemCategory::where('user_id', $userBs->user_id)
                ->where('status', 1)->orderBy('serial_number', 'asc')->take(6)->get();

  // Routes
  $shopUrl = route('front.user.shop', getParam());
  $cartUrl = route('front.user.cart', getParam());
  try { $dashUrl = route('customer.dashboard', getParam()); } catch (Exception $e) { $dashUrl = '#'; }
  try { $loginUrl = route('customer.login', getParam()); } catch (\Exception $e) { $loginUrl = '#'; }
@endphp

<style>
/* Announcement Bar */
.pm-announce { text-align: center; font-size: 0.75rem; padding: 6px 0; font-family: var(--pm-body-font, sans-serif); }
.pm-announce--ticker { overflow: hidden; white-space: nowrap; }
.pm-announce__scroll { display: inline-block; animation: pm-ticker var(--pm-ticker-dur, 20s) linear infinite; }
.pm-announce--ticker:hover .pm-announce__scroll { animation-play-state: paused; }
@keyframes pm-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.pm-announce__scroll span { margin: 0 2rem; }
.pm-announce--carousel { position: relative; height: 28px; overflow: hidden; }
.pm-announce__slide { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; transition: all .5s; opacity: 0; transform: translateY(4px); }
.pm-announce__slide.active { opacity: 1; transform: translateY(0); }

/* Header */
.pm-header { z-index: 50; background: rgba(255,255,255,0.95); backdrop-filter: blur(8px); transition: box-shadow .3s, height .3s; }
.pm-header--sticky { position: sticky; top: 0; }
.pm-header--border { border-bottom: 1px solid var(--pm-border, #e5e5e5); }
.pm-header--shadow { box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
.pm-header--shrunk .pm-header__inner { height: 48px !important; }
.pm-header__inner { display: flex; align-items: center; justify-content: space-between; transition: height .3s; }
.pm-header__inner--centered { justify-content: center; position: relative; }
.pm-header__logo { display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: var(--pm-fg, #1a1a1a); }
.pm-header__logo img { object-fit: contain; }
.pm-header__logo-text { font-family: var(--pm-heading-font, serif); font-size: 1.25rem; font-weight: 700; letter-spacing: -0.02em; }
@media (min-width: 768px) { .pm-header__logo-text { font-size: 1.5rem; } }

/* Desktop nav */
.pm-header__nav { display: none; align-items: center; gap: 2rem; }
@media (min-width: 1024px) { .pm-header__nav { display: flex; } }
.pm-header__nav a { font-weight: 500; color: var(--pm-muted-fg, #737373); text-decoration: none; transition: color .2s; letter-spacing: {{ $menuSpacing }}em; }
.pm-header__nav a:hover { color: var(--pm-fg, #1a1a1a); }

/* Icons */
.pm-header__icons { display: flex; align-items: center; gap: 2px; }
.pm-header__icons--abs { position: absolute; right: 0; }
.pm-header__icon-btn { background: none; border: none; padding: 8px; cursor: pointer; color: var(--pm-fg, #1a1a1a); border-radius: 0.375rem; transition: background .2s; display: inline-flex; position: relative; text-decoration: none; }
.pm-header__icon-btn:hover { background: var(--pm-secondary, #f5f5f5); }
.pm-header__badge { position: absolute; top: 0; right: 0; background: var(--pm-fg, #1a1a1a); color: var(--pm-bg, #fff); font-size: 10px; font-weight: 700; border-radius: 9999px; min-width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; }

/* Mobile menu toggle */
.pm-mobile-toggle { display: flex; }
@media (min-width: 1024px) { .pm-mobile-toggle { display: none; } }

/* Centered nav (below logo) */
.pm-header__nav-below { display: none; justify-content: center; gap: 2rem; padding-bottom: 0.75rem; }
@media (min-width: 1024px) { .pm-header__nav-below { display: flex; } }

/* Search bar */
.pm-search { padding: 0 1rem 1rem; animation: pm-slideDown .2s; }
.pm-search input { width: 100%; padding: 0.5rem 1rem 0.5rem 2.5rem; border: none; background: var(--pm-secondary, #f5f5f5); border-radius: 0.375rem; font-size: 0.875rem; }
@keyframes pm-slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }

/* Banner Below */
.pm-banner-below { position: relative; overflow: hidden; }
.pm-banner-below img { width: 100%; object-fit: cover; }
.pm-bb-slide { position: absolute; inset: 0; transition: opacity .7s; opacity: 0; }
.pm-bb-slide.active { opacity: 1; position: relative; }
</style>

{{-- ═══ Announcement Bar ═══ --}}
@if(!empty($announce['enabled']) && !empty($announce['messages']))
  @php
    $msgs = array_filter($announce['messages']);
    $aBg = $announce['backgroundColor'] ?? '#1a1a1a';
    $aColor = $announce['textColor'] ?? '#fafafa';
    $aStyle = $announce['style'] ?? 'static';
    $aSpeed = $announce['speed'] ?? 5;
    $aDir = $announce['direction'] ?? 'rtl';
  @endphp

  @if($aStyle === 'ticker')
    <div class="pm-announce pm-announce--ticker" style="background:{{ $aBg }};color:{{ $aColor }}">
      <div class="pm-announce__scroll" style="--pm-ticker-dur:{{ $aSpeed * count($msgs) * 3 }}s">
        @foreach($msgs as $m) <span>{{ $m }}</span> @endforeach
        @foreach($msgs as $m) <span>{{ $m }}</span> @endforeach
      </div>
    </div>
  @elseif($aStyle === 'carousel' && count($msgs) > 1)
    <div class="pm-announce pm-announce--carousel" style="background:{{ $aBg }};color:{{ $aColor }}" id="pmAnnounceCarousel" data-speed="{{ $aSpeed }}">
      @foreach($msgs as $i => $m)
        <div class="pm-announce__slide {{ $i === 0 ? 'active' : '' }}">{{ $m }}</div>
      @endforeach
    </div>
    <script>
    (function(){
      var c = document.getElementById('pmAnnounceCarousel');
      if(!c) return;
      var slides = c.querySelectorAll('.pm-announce__slide');
      var cur = 0;
      setInterval(function(){
        slides[cur].classList.remove('active');
        cur = (cur + 1) % slides.length;
        slides[cur].classList.add('active');
      }, (parseInt(c.dataset.speed) || 5) * 1000);
    })();
    </script>
  @else
    <div class="pm-announce" style="background:{{ $aBg }};color:{{ $aColor }}">
      {{ $msgs[0] ?? '' }}
    </div>
  @endif
@endif

{{-- ═══ Main Header ═══ --}}
<header class="pm-header {{ $isSticky ? 'pm-header--sticky' : '' }} {{ $borderBot ? 'pm-header--border' : '' }}"
        id="pmHeader"
        @if(!empty($h['backgroundColor'])) style="background:{{ $h['backgroundColor'] }}" @endif>
  <div class="pm-container">
    <div class="pm-header__inner {{ $isCentered ? 'pm-header__inner--centered' : '' }}" style="height:{{ $height }}px">

      {{-- Mobile Toggle --}}
      <button class="pm-header__icon-btn pm-mobile-toggle {{ $isCentered ? 'pm-header__icons--abs' : '' }}" style="{{ $isCentered ? 'left:0;right:auto' : '' }}" onclick="document.getElementById('pmMobileMenu').classList.toggle('active')">
        <svg width="{{ $iconSize }}" height="{{ $iconSize }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>

      {{-- Logo --}}
      <a href="{{ route('front.user.detail.view', getParam()) }}" class="pm-header__logo">
        @if(!empty($pmLogo['imageUrl']))
          <img src="{{ asset($pmLogo['imageUrl']) }}" alt="Logo" style="max-height:{{ $pmLogo['maxHeight'] ?? 40 }}px">
        @endif
        @if(!empty($pmLogo['showText']))
          <span class="pm-header__logo-text">{{ $pmLogo['text'] ?? $userBs->website_title ?? 'Loja' }}</span>
        @endif
      </a>

      {{-- Desktop Nav (classic / standard layouts) --}}
      @if(!$isMinimal && !$isCentered)
        <nav class="pm-header__nav">
          @foreach($menuCats as $cat)
            <a href="{{ $shopUrl }}?category={{ $cat->slug }}"
               style="font-size:{{ $menuFontSize }}px;{{ $menuUpper ? 'text-transform:uppercase;' : '' }}">
              {{ $cat->name }}
            </a>
          @endforeach
        </nav>
      @endif

      {{-- Action Icons --}}
      <div class="pm-header__icons {{ $isCentered ? 'pm-header__icons--abs' : '' }}">
        @if($showSearch)
          <button class="pm-header__icon-btn" onclick="var s=document.getElementById('pmSearchBar');s.style.display=s.style.display==='none'?'block':'none'">
            <svg width="{{ $iconSize }}" height="{{ $iconSize }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
        @endif
        @if($showWishlist)
          <a class="pm-header__icon-btn" href="{{ $shopUrl }}">
            <svg width="{{ $iconSize }}" height="{{ $iconSize }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </a>
        @endif
        @if($showAccount)
          <a class="pm-header__icon-btn" href="{{ Auth::guard('customer')->check() ? $dashUrl : $loginUrl }}">
            <svg width="{{ $iconSize }}" height="{{ $iconSize }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </a>
        @endif
        @if($showCart)
          <a class="pm-header__icon-btn" href="{{ $cartUrl }}">
            <svg width="{{ $iconSize }}" height="{{ $iconSize }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            @if($cartBadge !== 'none')
              <span class="pm-header__badge" id="pmCartBadge" style="display:none"></span>
            @endif
          </a>
        @endif
      </div>
    </div>

    {{-- Centered Nav (below logo) --}}
    @if($isCentered)
      <nav class="pm-header__nav-below">
        @foreach($menuCats as $cat)
          <a href="{{ $shopUrl }}?category={{ $cat->slug }}"
             style="font-size:{{ $menuFontSize }}px;{{ $menuUpper ? 'text-transform:uppercase;' : '' }}font-weight:500;color:var(--pm-muted-fg);text-decoration:none;">
            {{ $cat->name }}
          </a>
        @endforeach
      </nav>
    @endif

    {{-- Search Bar --}}
    <div class="pm-search" id="pmSearchBar" style="display:none">
      <form action="{{ $shopUrl }}" method="GET">
        <div style="position:relative">
          <svg style="position:absolute;left:0.75rem;top:50%;transform:translateY(-50%)" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" name="search" placeholder="Buscar produtos..." autofocus>
        </div>
      </form>
    </div>
  </div>
</header>

{{-- ═══ Banner Below Header ═══ --}}
@if(!empty($bannerBelow['enabled']))
  @php
    $bbImages = array_filter(array_merge(
      [!empty($bannerBelow['imageUrl']) ? $bannerBelow['imageUrl'] : null],
      $bannerBelow['images'] ?? []
    ));
    $bbHeight = $bannerBelow['height'] ?? 60;
    $bbLink = $bannerBelow['link'] ?? '';
    $bbCarousel = !empty($bannerBelow['carousel']) && count($bbImages) > 1;
    $bbSpeed = $bannerBelow['carouselSpeed'] ?? 5;
  @endphp

  @if($bbCarousel)
    <div class="pm-banner-below" style="height:{{ $bbHeight }}px" id="pmBannerBelow" data-speed="{{ $bbSpeed }}">
      @foreach($bbImages as $i => $img)
        <div class="pm-bb-slide {{ $i === 0 ? 'active' : '' }}">
          <img src="{{ asset($img) }}" alt="Banner" style="height:{{ $bbHeight }}px">
        </div>
      @endforeach
    </div>
    <script>
    (function(){
      var c = document.getElementById('pmBannerBelow');
      if(!c) return;
      var slides = c.querySelectorAll('.pm-bb-slide');
      var cur = 0;
      setInterval(function(){
        slides[cur].classList.remove('active');
        cur = (cur + 1) % slides.length;
        slides[cur].classList.add('active');
      }, (parseInt(c.dataset.speed) || 5) * 1000);
    })();
    </script>
  @elseif(!empty($bbImages))
    @if($bbLink)
      <a href="{{ $bbLink }}" class="pm-banner-below" style="display:block">
        <img src="{{ asset($bbImages[0]) }}" alt="Banner" style="height:{{ $bbHeight }}px">
      </a>
    @else
      <div class="pm-banner-below">
        <img src="{{ asset($bbImages[0]) }}" alt="Banner" style="height:{{ $bbHeight }}px">
      </div>
    @endif
  @endif
@endif

{{-- Mobile Menu Overlay --}}
<style>
.pm-mobile-menu { position: fixed; top: 0; left: -100%; width: 280px; height: 100vh; background: var(--pm-bg, #fff); z-index: 100; transition: left .3s; padding: 2rem 1.5rem; overflow-y: auto; box-shadow: 4px 0 20px rgba(0,0,0,0.1); }
.pm-mobile-menu.active { left: 0; }
.pm-mobile-menu__close { position: absolute; top: 1rem; right: 1rem; background: none; border: none; cursor: pointer; padding: 0.5rem; }
.pm-mobile-menu a { display: block; padding: 0.75rem 0; font-size: 1rem; text-decoration: none; color: var(--pm-fg, #1a1a1a); border-bottom: 1px solid var(--pm-border, #e5e5e5); }
.pm-mobile-menu a:first-child { font-weight: 700; font-family: var(--pm-heading-font, serif); }
.pm-mobile-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 99; display: none; }
.pm-mobile-menu.active ~ .pm-mobile-overlay { display: block; }
</style>

<nav class="pm-mobile-menu" id="pmMobileMenu">
  <button class="pm-mobile-menu__close" onclick="document.getElementById('pmMobileMenu').classList.remove('active')">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  </button>
  <a href="{{ route('front.user.detail.view', getParam()) }}">Início</a>
  @foreach($menuCats as $cat)
    <a href="{{ $shopUrl }}?category={{ $cat->slug }}">{{ $cat->name }}</a>
  @endforeach
</nav>
<div class="pm-mobile-overlay" onclick="document.getElementById('pmMobileMenu').classList.remove('active')"></div>

{{-- ShrinkOnScroll / ShadowOnScroll JS --}}
@if($shrinkOnScroll || $shadowOnScroll)
<script>
(function(){
  var header = document.getElementById('pmHeader');
  if (!header) return;
  var shrink = {{ $shrinkOnScroll ? 'true' : 'false' }};
  var shadow = {{ $shadowOnScroll ? 'true' : 'false' }};
  var last = 0;
  window.addEventListener('scroll', function(){
    var y = window.scrollY;
    if (shrink) { header.classList.toggle('pm-header--shrunk', y > 80); }
    if (shadow) { header.classList.toggle('pm-header--shadow', y > 10); }
    last = y;
  });
})();
</script>
@endif
