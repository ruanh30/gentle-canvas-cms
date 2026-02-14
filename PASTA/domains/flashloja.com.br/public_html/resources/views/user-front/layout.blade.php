<!DOCTYPE html>
<html lang="{{ $userCurrentLang->code }}" dir="{{ $userCurrentLang->rtl == 1 ? 'rtl' : '' }}">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport' />

  <title>@yield('page-title') | {{ $user->username }} </title>
  <link rel="icon" href="{{ !empty($userBs->favicon) ? asset('assets/front/img/user/' . $userBs->favicon) : '' }}">

  <meta name="description" content="@yield('meta-description')">
  <meta name="keywords" content="@yield('meta-keywords')">
  <link rel="canonical" href="{{ canonicalUrl() }}">
  @yield('og-meta')
  <!-- DEBUG THEME: '{{ $userBs->theme }}' -->
  {{-- Conditionally include global styles. 'premium' has its own dedicated styles partial to avoid conflicts --}}
  @if($userBs->theme != 'premium')
    <!-- ENTERED IF BLOCK -->
    @includeif('user-front.styles')
  @endif
  @php
    $selLang = App\Models\Language::where('code', request()->input('language'))->first();
  @endphp

  <style>
    :root {
      --color-primary: #{{ $userBs->base_color }};
      --color-primary-rgb: {{ hexToRgba($userBs->base_color) }}
    }
  </style>


  @php
    $appearance = null;
    if ($userBs->theme == 'premium' || $userBs->theme == 'premium_legacy_never_match' /* legacy */) {
      $appearance = \App\Models\User\UserAppearanceSetting::where('user_id', $user->id)->first();
    }
  @endphp

  @if ($userBs->theme == 'premium' && $appearance)
        @php
      $as = is_array($appearance->settings) ? $appearance->settings : [];
      $previewDraft = null;
      if (request()->get('preview') == 1) {
        $draftPath = storage_path('app/appearance_drafts/' . $user->id . '.json');
        if (file_exists($draftPath)) {
          $previewDraft = json_decode(file_get_contents($draftPath), true);
        }
      }
      if (is_array($previewDraft)) {
        $as = $previewDraft;
      }
      $ac = $as['colors'] ?? [];
      $af = $as['fonts'] ?? [];
      $am = $as['menu'] ?? [];
      $acat = $as['catalog'] ?? [];
      $afs = $as['font_sizes'] ?? [];

    $mfFontHeading = (($af['heading'] ?? 'system') == 'system')
      ? "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial"
      : "'" . ($af['heading'] ?? 'system') . "', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial";

    $mfFontBody = (($af['body'] ?? 'system') == 'system')
      ? "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial"
      : "'" . ($af['body'] ?? 'system') . "', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial";

    $mfFontMenu = (($af['menu'] ?? 'system') == 'system')
      ? "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial"
      : "'" . ($af['menu'] ?? 'system') . "', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial";

    $mfFontButton = (($af['button'] ?? 'system') == 'system')
      ? "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial"
      : "'" . ($af['button'] ?? 'system') . "', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial";

    $mfMenuSpacing = $am['spacing'] ?? 'normal';
    $mfMenuGapMap = ['compact' => '12px', 'normal' => '18px', 'relaxed' => '28px'];
    $mfMenuGap = $mfMenuGapMap[$mfMenuSpacing] ?? '18px';
    $mfMenuStyle = $am['style'] ?? 'default';
    $mfMenuWeight = $mfMenuStyle === 'bold' ? '800' : ($mfMenuStyle === 'minimal' ? '600' : '700');
    $mfMenuTransform = !empty($am['uppercase']) ? 'uppercase' : 'none';

    $mfPrimary = $ac['primary'] ?? ('#' . $userBs->base_color);
    $mfSecondary = $ac['secondary'] ?? '#111827';
    $mfPrimaryHex = (is_string($mfPrimary) && str_starts_with($mfPrimary, '#')) ? substr($mfPrimary, 1) : null;
    $mfPrimaryRgb = $mfPrimaryHex ? hexToRgba($mfPrimaryHex) : null;
    $mfFontSizeBase = (int)($afs['base'] ?? 12);    $mfFontSizeHeading = (int)($afs['heading'] ?? 28);    $mfFontSizeMenu = (int)($afs['menu'] ?? 14);    $mfFontSizeButton = (int)($afs['button'] ?? 14);
    $mfProductsDesktop = (int)($acat['products_per_row_desktop'] ?? 4);
    $mfFontSizeBase = (int)($afs['base'] ?? 12);    $mfFontSizeHeading = (int)($afs['heading'] ?? 28);    $mfFontSizeMenu = (int)($afs['menu'] ?? 14);    $mfFontSizeButton = (int)($afs['button'] ?? 14);
    $mfProductsDesktop = $mfProductsDesktop >= 2 ? $mfProductsDesktop : 4;
    $mfProductsMobile = (int)($acat['products_per_row_mobile'] ?? 2);
    $mfProductsMobile = $mfProductsMobile >= 1 ? $mfProductsMobile : 2;
    $mfCardStyle = $acat['card_style'] ?? 'bordered';
    $mfCardShadow = $mfCardStyle === 'elevated' ? '0 12px 30px rgba(0,0,0,.12)' : 'none';
    $mfCardBorder = $mfCardStyle === 'flat' ? 'transparent' : ($ac['card_border'] ?? '#e5e7eb');
    @endphp

    @php
      $googleFontAllow = ['Montserrat','Raleway','Playfair Display','Lato','Open Sans','Bebas Neue','Inter','DM Sans','Manrope','Poppins','Nunito','Source Sans 3'];
      $fontCandidates = [($af['heading'] ?? null), ($af['body'] ?? null), ($af['menu'] ?? null), ($af['button'] ?? null)];
      $googleFontsToLoad = [];
      foreach ($fontCandidates as $fname) {
        if (!empty($fname) && in_array($fname, $googleFontAllow)) {
          $googleFontsToLoad[] = $fname;
        }
      }
      $googleFontsToLoad = array_values(array_unique($googleFontsToLoad));
    @endphp

    @if (count($googleFontsToLoad) > 0)
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      @php
        $families = array_map(function($f){
          return 'family=' . str_replace(' ', '+', $f) . ':wght@300;400;500;600;700;800';
        }, $googleFontsToLoad);
        $gfUrl = 'https://fonts.googleapis.com/css2?' . implode('&', $families) . '&display=swap';
      @endphp
      <link href="{{ $gfUrl }}" rel="stylesheet">
    @endif

        <style>
      :root{
        --mf-page-bg: {{ $ac['page_bg'] ?? '#f5f5f7' }};
        --mf-topbar-bg: {{ $ac['topbar_bg'] ?? '#ffffff' }};
        --mf-topbar-text: {{ $ac['topbar_text'] ?? '#111827' }};
        --mf-font-size-base: {{ $mfFontSizeBase }}px;        --mf-font-size-heading: {{ $mfFontSizeHeading }}px;        --mf-font-size-menu: {{ $mfFontSizeMenu }}px;        --mf-font-size-button: {{ $mfFontSizeButton }}px;
        --mf-header-bg: {{ $ac['header_bg'] ?? '#ffffff' }};
        --mf-menu-text: {{ $ac['menu_text'] ?? '#111827' }};
        --mf-menu-left-bg: {{ $ac['menu_left_bg'] ?? '#ffffff' }};
        --mf-footer-text: {{ $ac['footer_text'] ?? 'rgba(17,24,39,.75)' }};
        --mf-footer-bg: {{ $ac['footer_bg'] ?? '#111827' }};
        --mf-primary: {{ $mfPrimary }};
        --mf-secondary: {{ $mfSecondary }};
        --mf-button-bg: {{ $ac['button_bg'] ?? $mfPrimary }};
        --mf-button-text: {{ $ac['button_text'] ?? '#ffffff' }};
        --mf-card-bg: {{ $ac['card_bg'] ?? '#ffffff' }};
        --mf-card-border: {{ $mfCardBorder }};
        --mf-card-shadow: {{ $mfCardShadow }};
    $mfFontSizeBase = (int)($afs['base'] ?? 12);    $mfFontSizeHeading = (int)($afs['heading'] ?? 28);    $mfFontSizeMenu = (int)($afs['menu'] ?? 14);    $mfFontSizeButton = (int)($afs['button'] ?? 14);
        --mf-products-per-row-desktop: {{ $mfProductsDesktop }};
        --mf-products-per-row-mobile: {{ $mfProductsMobile }};
        --mf-section-title: {{ $ac['section_title'] ?? '#111827' }};
        --mf-price: {{ $ac['price'] ?? $mfPrimary }};
        --mf-menu-transform: {{ $mfMenuTransform }};
        --mf-menu-gap: {{ $mfMenuGap }};
        --mf-menu-weight: {{ $mfMenuWeight }};

        --mf-font-heading: {!! $mfFontHeading !!};
        --mf-font-body: {!! $mfFontBody !!};
        --mf-font-menu: {!! $mfFontMenu !!};
        --mf-font-button: {!! $mfFontButton !!};
        --color-primary: {{ $mfPrimary }};
        --color-primary-rgb: {{ $mfPrimaryRgb ?? hexToRgba($userBs->base_color) }};
      }
      body{ background: var(--mf-page-bg) !important; font-family: var(--mf-font-body) !important; }
      h1,h2,h3,h4,h5,h6{ font-family: var(--mf-font-heading) !important; }
    </style>

    @if (!empty($appearance->custom_css))
      <style>
        {!! $appearance->custom_css !!}
      </style>
    @endif
  @endif


  @if ($userBs->theme == 'premium')
    @php
      $pmAppRec = \App\Models\User\UserAppearanceSetting::where('user_id', $user->id)->where('theme','premium')->first();
      $pmS = [];
      if ($pmAppRec) {
        $pmS = is_array($pmAppRec->settings) ? $pmAppRec->settings : (json_decode($pmAppRec->settings, true) ?? []);
      }
      $pmColors = $pmS['colors'] ?? [];
      $pmTypo = $pmS['typography'] ?? [];
      $pmGlobal = $pmS['global'] ?? [];
      $pmHeader = $pmS['header'] ?? [];
      $pmFooter = $pmS['footer'] ?? [];
      $pmCard = $pmS['productCard'] ?? [];

      $pmRadiusMap = ['none'=>'0','small'=>'4px','medium'=>'8px','large'=>'12px','full'=>'9999px'];
      $pmRadius = $pmRadiusMap[$pmGlobal['borderRadius'] ?? 'medium'] ?? '8px';

      $pmFontHeading = !empty($pmTypo['headingFont']) ? "'" . $pmTypo['headingFont'] . "', sans-serif" : "'Playfair Display', serif";
      $pmFontBody = !empty($pmTypo['bodyFont']) ? "'" . $pmTypo['bodyFont'] . "', sans-serif" : "'Inter', sans-serif";

      // Google Fonts
      $pmGoogleFonts = [];
      foreach ([$pmTypo['headingFont'] ?? null, $pmTypo['bodyFont'] ?? null] as $f) {
        if (!empty($f) && $f !== 'system') $pmGoogleFonts[] = $f;
      }
      $pmGoogleFonts = array_unique($pmGoogleFonts);

      // Aspect ratio
      $pmAspectParts = explode(':', $pmCard['imageAspect'] ?? '3:4');
      $pmAspect = count($pmAspectParts) === 2 ? ($pmAspectParts[0] . '/' . $pmAspectParts[1]) : '3/4';

      $pmCardRadiusMap = ['none'=>'0','small'=>'4px','medium'=>'8px','large'=>'12px'];
      $pmCardRadius = $pmCardRadiusMap[$pmCard['imageBorderRadius'] ?? 'medium'] ?? '8px';

      $pmPriceSizeMap = ['small'=>'14px','medium'=>'16px','large'=>'20px'];
      $pmPriceSize = $pmPriceSizeMap[$pmCard['priceSize'] ?? 'medium'] ?? '16px';

      $pmSpacingMap = ['compact'=>'8px 10px','normal'=>'12px 14px','relaxed'=>'16px 18px'];
      $pmCardPadding = $pmSpacingMap[$pmCard['spacing'] ?? 'normal'] ?? '12px 14px';
    @endphp

    @if (count($pmGoogleFonts) > 0)
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      @php
        $pmFamilies = array_map(function($f){ return 'family=' . str_replace(' ', '+', $f) . ':wght@300;400;500;600;700;800'; }, $pmGoogleFonts);
        $pmGfUrl = 'https://fonts.googleapis.com/css2?' . implode('&', $pmFamilies) . '&display=swap';
      @endphp
      <link href="{{ $pmGfUrl }}" rel="stylesheet">
    @endif

    <style>
      :root {
        --pm-primary: {{ $pmColors['primary'] ?? '#6366f1' }};
        --pm-primary-fg: {{ $pmColors['primaryForeground'] ?? '#ffffff' }};
        --pm-secondary: {{ $pmColors['secondary'] ?? '#f1f5f9' }};
        --pm-secondary-fg: {{ $pmColors['secondaryForeground'] ?? '#0f172a' }};
        --pm-accent: {{ $pmColors['accent'] ?? '#f1f5f9' }};
        --pm-accent-fg: {{ $pmColors['accentForeground'] ?? '#0f172a' }};
        --pm-background: {{ $pmColors['background'] ?? '#ffffff' }};
        --pm-foreground: {{ $pmColors['foreground'] ?? '#0f172a' }};
        --pm-muted: {{ $pmColors['muted'] ?? '#f1f5f9' }};
        --pm-muted-fg: {{ $pmColors['mutedForeground'] ?? '#64748b' }};
        --pm-border: {{ $pmColors['border'] ?? '#e2e8f0' }};
        --pm-buy-now: {{ $pmColors['buyNow'] ?? '#dc2626' }};
        --pm-buy-now-hover: {{ $pmColors['buyNowHover'] ?? '#b91c1c' }};

        --pm-font-heading: {!! $pmFontHeading !!};
        --pm-font-body: {!! $pmFontBody !!};
        --pm-font-size-base: {{ ($pmTypo['baseFontSize'] ?? 16) }}px;
        --pm-heading-weight: {{ $pmTypo['headingWeight'] ?? 700 }};
        --pm-body-weight: {{ $pmTypo['bodyWeight'] ?? 400 }};
        --pm-line-height: {{ $pmTypo['lineHeight'] ?? 1.6 }};
        --pm-letter-spacing: {{ ($pmTypo['letterSpacing'] ?? 0) }}px;

        --pm-radius: {{ $pmRadius }};
        --pm-container-width: {{ $pmGlobal['containerWidth'] ?? '1280px' }};

        --pm-header-height: {{ ($pmHeader['height'] ?? 64) }}px;
        --pm-icon-size: {{ ($pmHeader['iconSize'] ?? 20) }}px;
        --pm-menu-font-size: {{ ($pmHeader['menuFontSize'] ?? 14) }}px;
        --pm-menu-transform: {{ !empty($pmHeader['menuUppercase']) ? 'uppercase' : 'none' }};
        --pm-menu-letter-spacing: {{ ($pmHeader['menuLetterSpacing'] ?? '0.05') }}em;

        --pm-footer-bg: {{ $pmFooter['backgroundColor'] ?? '#0f172a' }};
        --pm-footer-text: {{ $pmFooter['textColor'] ?? '#94a3b8' }};

        --pm-card-aspect: {{ $pmAspect }};
        --pm-card-radius: {{ $pmCardRadius }};
        --pm-card-padding: {{ $pmCardPadding }};
        --pm-title-lines: {{ $pmCard['titleLines'] ?? 2 }};
        --pm-price-size: {{ $pmPriceSize }};
        --pm-card-border: {{ !empty($pmCard['border']) ? '1px solid var(--pm-border)' : 'none' }};
        --pm-card-hover-shadow: {{ !empty($pmCard['hoverShadow']) ? '0 8px 30px rgba(0,0,0,.1)' : 'none' }};

        --color-primary: {{ $pmColors['primary'] ?? '#6366f1' }};
      }

        .pm-page,
        .pm-page * {
          font-family: var(--pm-font-body, var(--font-body, 'Inter', sans-serif));
        }

        .pm-page h1,
        .pm-page h2,
        .pm-page h3,
        .pm-page h4,
        .pm-page h5,
        .pm-page h6,
        .pm-hero__title,
        .pm-section__title,
        .pm-product-card__title {
          font-family: var(--pm-font-heading, var(--font-display, 'Playfair Display', serif)) !important;
        }

        .pm-header__logo img {
          max-height: {{ ($pmS['logo']['maxHeight'] ?? 48) }}px;
          height: {{ ($pmS['logo']['maxHeight'] ?? 48) }}px;
        }

        .pm-header__logo {
          justify-content: {{ (($pmS['logo']['position'] ?? 'left') === 'center') ? 'center' : 'flex-start' }};
        }

        .pm-product-card {
          text-align: {{ ($pmCard['contentAlign'] ?? 'left') === 'center' ? 'center' : 'left' }};
        }

        .pm-footer__grid {
          grid-template-columns: repeat({{ ['4-columns'=>4,'3-columns'=>3,'2-columns'=>2,'simple'=>1,'centered'=>1][($pmFooter['layout'] ?? '4-columns')] ?? 4 }}, minmax(0, 1fr));
        }

        @php $pmBtnStyle = $pmCard['buttonStyle'] ?? 'solid'; @endphp
        .pm-btn-buy, .pm-btn-cart {
          @if($pmBtnStyle==='outline')
            background: transparent !important; border: 2px solid currentColor;
          @elseif($pmBtnStyle==='pill')
            border-radius: 9999px !important;
          @elseif($pmBtnStyle==='rounded')
            border-radius: 12px !important;
          @elseif($pmBtnStyle==='sharp')
            border-radius: 0 !important;
          @endif
        }
      </style>

    @includeIf('user-front.premium.styles')

      <script>
      (function(){
        function applyPdpLayout(){
          try {
            var pp = @json($pmS['productPage'] ?? []);
            if (pp && pp.galleryPosition) {
              var pd = document.querySelector('.product-single-default');
              if (pd) {
                pd.style.display = 'flex';
                pd.style.flexDirection = (pp.galleryPosition === 'right') ? 'row-reverse' : 'row';
              }
            }
          } catch (e) {}
        }
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', applyPdpLayout);
        } else {
          applyPdpLayout();
        }
        window.addEventListener('load', applyPdpLayout);
      })();
      </script>

    {{-- Theme Preview Live Update --}}
    @if (request()->get('theme-preview') == 'true')
  <script>
  (function(){
    function stableStringify(obj){ if(obj===null||typeof obj!=='object') return JSON.stringify(obj); if(Array.isArray(obj)) return '['+obj.map(stableStringify).join(',')+']'; return '{'+Object.keys(obj).sort().map(function(k){ return JSON.stringify(k)+':'+stableStringify(obj[k]); }).join(',')+'}'; }
    function hashTheme(obj){ var str=stableStringify(obj||{}), h=0; for(var i=0;i<str.length;i++){ h=((h<<5)-h)+str.charCodeAt(i); h|=0; } return String(h>>>0); }
    function upsertStyle(id, css){ var st=document.getElementById(id); if(!st){ st=document.createElement('style'); st.id=id; document.head.appendChild(st); } st.textContent=css||''; }
    function applyTheme(themeJSON, meta){
      var theme = themeJSON || {};
      var root = document.documentElement;
      function setVar(name,val){ if(val!==undefined && val!==null && val!=='') root.style.setProperty(name, val); }
      function setText(sel,val){ if(val!==undefined && val!==null) document.querySelectorAll(sel).forEach(function(el){ el.textContent = val; }); }
      function setImg(sel,val){ if(val) document.querySelectorAll(sel).forEach(function(el){ el.src = val; }); }
      function toggle(sel,val){ document.querySelectorAll(sel).forEach(function(el){ el.style.display = val ? '' : 'none'; }); }

      var c = theme.colors || {};
      setVar('--pm-primary', c.primary); setVar('--pm-primary-fg', c.primaryForeground);
      setVar('--pm-secondary', c.secondary); setVar('--pm-secondary-fg', c.secondaryForeground);
      setVar('--pm-accent', c.accent); setVar('--pm-accent-fg', c.accentForeground);
      setVar('--pm-background', c.background); setVar('--pm-foreground', c.foreground);
      setVar('--pm-muted', c.muted); setVar('--pm-muted-fg', c.mutedForeground);
      setVar('--pm-border', c.border); setVar('--pm-success', c.success); setVar('--pm-warning', c.warning); setVar('--pm-error', c.error);
      setVar('--pm-buy-now', c.buyNow); setVar('--pm-buy-now-hover', c.buyNowHover); setVar('--color-primary', c.primary);

      var ty = theme.typography || {};
      if(ty.headingFont){
        setVar('--pm-font-heading', "'"+ty.headingFont+"', serif");
          setVar('--font-display', "'"+ty.headingFont+"', serif");
        var hId='pm-font-h', oldH=document.getElementById(hId); if(oldH) oldH.remove();
        var lh=document.createElement('link'); lh.id=hId; lh.rel='stylesheet';
        lh.href='https://fonts.googleapis.com/css2?family='+encodeURIComponent(ty.headingFont)+':wght@400;500;600;700&display=swap';
        document.head.appendChild(lh);
      }
      if(ty.bodyFont){
        setVar('--pm-font-body', "'"+ty.bodyFont+"', sans-serif");
          setVar('--font-body', "'"+ty.bodyFont+"', sans-serif");
        var bId='pm-font-b', oldB=document.getElementById(bId); if(oldB) oldB.remove();
        var lb=document.createElement('link'); lb.id=bId; lb.rel='stylesheet';
        lb.href='https://fonts.googleapis.com/css2?family='+encodeURIComponent(ty.bodyFont)+':wght@300;400;500;600;700&display=swap';
        document.head.appendChild(lb);
      }
      setVar('--pm-font-size-base', ty.baseFontSize ? ty.baseFontSize+'px' : null);
      setVar('--pm-heading-weight', ty.headingWeight); setVar('--pm-body-weight', ty.bodyWeight);
      setVar('--pm-line-height', ty.lineHeight); setVar('--pm-letter-spacing', (ty.letterSpacing!==undefined&&ty.letterSpacing!==null) ? ty.letterSpacing+'px' : null);

      var g = theme.global || {};
      setVar('--pm-container-width', g.containerWidth || (g.containerMaxPx ? g.containerMaxPx+'px' : null));
      var rMap={none:'0',small:'4px',medium:'8px',large:'12px',full:'9999px'};
      setVar('--pm-radius', g.borderRadius ? (rMap[g.borderRadius] || g.borderRadius+'px') : null);

      var h = theme.header || {};
      setVar('--pm-header-height', h.height ? (h.height + (typeof h.height==='number'?'px':'')) : null);
      setVar('--pm-icon-size', h.iconSize ? (h.iconSize + (typeof h.iconSize==='number'?'px':'')) : null);
      setVar('--pm-menu-font-size', h.menuFontSize ? (h.menuFontSize + (typeof h.menuFontSize==='number'?'px':'')) : null);
      setVar('--pm-menu-transform', h.menuUppercase ? 'uppercase' : 'none');
      setVar('--pm-menu-letter-spacing', h.menuLetterSpacing ? h.menuLetterSpacing+'em' : null);
      var header=document.querySelector('.pm-header');
      if(header){ if(h.layout) header.setAttribute('data-pm-layout', h.layout); header.classList.toggle('pm-header--sticky', !!h.sticky); header.classList.toggle('pm-header--border', !!h.borderBottom); header.classList.toggle('pm-header--shadow-scroll', !!h.shadowOnScroll); toggle('.pm-header__search-wrap', h.showSearch); toggle('.pm-header__action--wishlist', h.showWishlist); toggle('.pm-header__action--account', h.showAccount); toggle('.pm-header__action--cart', h.showCart); }
      var ann=h.announcement||{}; var annWrap=document.querySelector('.pm-announce-wrapper');
      if(annWrap){ annWrap.style.display = ann.enabled===false ? 'none' : ''; if(ann.backgroundColor) annWrap.style.background=ann.backgroundColor; if(ann.textColor) annWrap.style.color=ann.textColor; var msgs=ann.messages||[]; var items=annWrap.querySelectorAll('.pm-announce__item'); if(items.length>0 && msgs.length>0) items.forEach(function(item,i){ item.textContent=msgs[i%msgs.length]; }); else { var sm=annWrap.querySelector('.pm-announce'); if(sm&&msgs[0]) sm.textContent=msgs[0]; }}
      var bb=h.bannerBelow||{}; var bbWrap=document.querySelector('.pm-banner-below-wrapper');
      if(bbWrap){ bbWrap.style.display = bb.enabled===false ? 'none' : ''; if(bb.imageUrl){ var img=bbWrap.querySelector('img'); if(img) img.src=bb.imageUrl; } if(bb.height){ bbWrap.style.height=bb.height+'px'; var i2=bbWrap.querySelector('img'); if(i2) i2.style.height=bb.height+'px'; } }

      var b=theme.buttons||{};
      var btnRadiusMap={none:'0',small:'4px',medium:'8px',large:'12px',full:'9999px',pill:'9999px'};
      setVar('--pm-btn-radius', b.borderRadius ? b.borderRadius+'px' : (b.radius ? btnRadiusMap[b.radius] : null));
      setVar('--pm-btn-transform', b.uppercase ? 'uppercase' : (b.textTransform || 'none'));
      setVar('--pm-btn-font-weight', b.fontWeight);
      if(b.size){ setVar('--pm-btn-size', b.size); }
      if(b.style){ root.setAttribute('data-pm-btn-style', b.style); }
      if(b.shadow!==undefined){ root.setAttribute('data-pm-btn-shadow', b.shadow ? '1':'0'); }

      var i=theme.inputs||{};
      setVar('--pm-input-radius', i.borderRadius ? i.borderRadius+'px' : (i.radius ? ({none:'0',small:'4px',medium:'8px',large:'12px',pill:'9999px'})[i.radius] : null));
      setVar('--pm-input-border', i.borderColor); setVar('--pm-input-focus-border', i.focusBorderColor);
      if(i.style){ root.setAttribute('data-pm-input-style', i.style); } if(i.focusRing!==undefined){ root.setAttribute('data-pm-focus-ring', i.focusRing ? '1':'0'); }

      var pc=theme.productCard||{};
      if(pc.imageAspect){ var p=String(pc.imageAspect).split(':'); if(p.length===2) setVar('--pm-card-aspect', p[0]+'/'+p[1]); }
      setVar('--pm-card-radius', pc.imageBorderRadius ? rMap[pc.imageBorderRadius] : null);
      setVar('--pm-price-size', pc.priceSize ? ({small:'14px',medium:'16px',large:'20px'})[pc.priceSize] : null);
        if(pc.layout){ root.setAttribute('data-pm-card-layout', pc.layout); }
        if(pc.contentAlign){ root.setAttribute('data-pm-card-align', pc.contentAlign); document.querySelectorAll('.pm-product-card').forEach(function(card){ card.style.textAlign=(pc.contentAlign==='center'?'center':'left'); }); }
        if(pc.buttonStyle){ root.setAttribute('data-pm-card-btn-style', pc.buttonStyle); }
      document.querySelectorAll('.pm-btn-buy').forEach(function(el){ if(pc.buttonStyle){ el.className=el.className.replace(/pm-btn-buy--\w+/g,'').trim()+' pm-btn-buy--'+pc.buttonStyle; } });
        document.querySelectorAll('.pm-btn-cart').forEach(function(el){ if(pc.buttonStyle){ el.className=el.className.replace(/pm-btn-cart--\w+/g,'').trim()+' pm-btn-cart--'+pc.buttonStyle; } });
        toggle('.pm-product-card__badge', pc.showDiscount); toggle('.pm-product-card__category', pc.showCategory); toggle('.pm-btn-buy', pc.showBuyNow); toggle('.pm-btn-cart-icon', pc.showAddToCart); toggle('.pm-product-card__action--wishlist', pc.showWishlist); toggle('.pm-product-card__action--quickview', pc.showQuickView);

      var f=theme.footer||{};
      if(f.backgroundColor){ setVar('--pm-footer-bg',f.backgroundColor); var ft=document.querySelector('.pm-footer'); if(ft) ft.style.background=f.backgroundColor; }
      if(f.textColor){ setVar('--pm-footer-text',f.textColor); var ft2=document.querySelector('.pm-footer'); if(ft2) ft2.style.color=f.textColor; }
      toggle('.pm-footer-newsletter', f.showNewsletter);
      setText('.pm-footer__copyright-text', f.copyrightText); setText('.pm-footer__newsletter-title', f.newsletterTitle); setText('.pm-footer__newsletter-desc', f.newsletterDescription);

      var lg=theme.logo||{};
      if(lg.text!==undefined) setText('.pm-header__logo-text,.pm-logo__text,.site-logo-text,.navbar-brand-text', lg.text);
      if(lg.imageUrl) setImg('.pm-header__logo img,.pm-logo img,.site-logo img,.navbar-brand img', lg.imageUrl);
      if(lg.maxHeight) setVar('--pm-logo-max-height', (typeof lg.maxHeight==='number'?lg.maxHeight+'px':lg.maxHeight));
      if(lg.showText!==undefined){ toggle('.pm-header__logo-text,.pm-logo__text,.site-logo-text,.navbar-brand-text', !!lg.showText); }
        if(lg.position){ root.setAttribute('data-pm-logo-position', lg.position); }
        if(lg.maxHeight){ document.querySelectorAll('.pm-header__logo img').forEach(function(im){ var mh=(typeof lg.maxHeight==='number'?lg.maxHeight+'px':lg.maxHeight); im.style.maxHeight=mh; im.style.height=mh; }); }

      var hero=theme.hero||{};
      if(hero.enabled!==undefined) toggle('.pm-hero,.hero-section,.pm-section--hero', !!hero.enabled);
      if(hero.slides&&hero.slides.length){ hero.slides.forEach(function(slide, idx){ var i=idx+1; var base='.pm-hero-slide:nth-child('+i+')'; if(slide.title) setText(base+' .pm-hero__title', slide.title); if(slide.subtitle) setText(base+' .pm-hero__subtitle', slide.subtitle); if(slide.description) setText(base+' .pm-hero__desc', slide.description); if(slide.ctaText) setText(base+' .pm-hero__cta', slide.ctaText); if(slide.backgroundImage){ document.querySelectorAll(base).forEach(function(el){ el.style.backgroundImage='url('+slide.backgroundImage+')'; }); } if(slide.textColor){ document.querySelectorAll(base+' .pm-hero__content,'+base+' .pm-hero__title,'+base+' .pm-hero__subtitle,'+base+' .pm-hero__desc').forEach(function(el){ el.style.color=slide.textColor; }); } }); }

      var fcols={ '4-columns':4,'3-columns':3,'2-columns':2,'simple':1,'centered':1 };
        if(f.layout && fcols[f.layout]){ setVar('--pm-footer-cols', String(fcols[f.layout])); }

        var pp=theme.productPage||{};
        if(pp.galleryLayout){ root.setAttribute('data-pm-pdp-gallery-layout', pp.galleryLayout); }
        if(pp.galleryPosition){ root.setAttribute('data-pm-pdp-gallery-position', pp.galleryPosition); var pd=document.querySelector('.product-single-default'); if(pd){ pd.style.display='flex'; pd.style.flexDirection=(pp.galleryPosition==='right'?'row-reverse':'row'); } }

        var cc=theme.customCode||{};
      upsertStyle('custom-css', cc.customCSS||'');
      if(cc.customJS!==undefined){ var jh=hashTheme({js:String(cc.customJS||'')}); if(window.__peCustomJsHash!==jh){ window.__peCustomJsHash=jh; try{ (new Function(String(cc.customJS||'')))(); }catch(err){ console.warn('custom JS error', err); } } }

      var applyHash = hashTheme(theme);
      root.setAttribute('data-theme-hash', applyHash);
      upsertStyle('theme-dynamic', ':root[data-theme-hash="'+applyHash+'"]{outline-color:transparent;} .pm-header__logo img{max-height:var(--pm-logo-max-height,48px);height:var(--pm-logo-max-height,48px);} :root[data-pm-logo-position=\"center\"] .pm-header__logo{justify-content:center;margin:0 auto;} :root[data-pm-card-layout=\"horizontal\"] .pm-product-card{display:flex;gap:12px;align-items:flex-start;} :root[data-pm-card-layout=\"horizontal\"] .pm-product-card__image{width:45%;flex:0 0 45%;} :root[data-pm-card-align=\"center\"] .pm-product-card{text-align:center;} .pm-footer__grid{grid-template-columns:repeat(var(--pm-footer-cols,4),minmax(0,1fr));}');

      var appliedMeta={ themeHash: (meta&&meta.themeHash) ? meta.themeHash : applyHash, themeVersion:(meta&&meta.themeVersion)||null, lastPreviewApply:Date.now(), lastPublish:(meta&&meta.lastPublish)||null };
      try{ window.parent && window.parent.postMessage({type:'THEME_APPLIED', meta:appliedMeta}, '*'); }catch(_e){}
    }

    window.addEventListener('message', function(e){ if(!e.data || e.data.type!=='theme-preview-update') return; applyTheme(e.data.theme||{}, e.data.meta||{}); });
    try{ window.parent && window.parent.postMessage({type:'PREVIEW_READY', ts:Date.now()}, '*'); }catch(_e){}
  })();
  </script>
@endif
  @endif


  @if ($userBs->theme == 'premium')
    @includeIf('user-front.premium.partials.styles')
  @endif

  @yield('styles')

  @if ($userBs->is_analytics == 1 && in_array('Google Analytics', $packagePermissions))
    <script async src="//www.googletagmanager.com/gtag/js?id={{ $userBs->measurement_id }}"></script>
    <script>
      "use strict";
      window.dataLayer = window.dataLayer || [];

      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());

      gtag('config', '{{ $userBs->measurement_id }}');
    </script>
  @endif

</head>

<body @if (request()->cookie('user-theme') == 'dark') data-background-color="dark" @endif>
  {{-- Loader --}}
  <div class="request-loader">
    <img class="lazyload" src="{{ asset('assets/front/images/placeholder.png') }}"
      data-src="{{ asset('assets/admin/img/loader.gif') }}" alt="">
  </div>
  {{-- Loader --}}

  <!-- Preloader Start -->
  @if ($userBs->preloader_status == 1)
    <div class="preloader">
      <div class="preloader-wrapper">
        <img class="lazyload" src="{{ asset('assets/front/images/placeholder.png') }}"
          data-src="{{ !is_null($userBs->preloader) ? asset('assets/front/img/user/' . $userBs->preloader) : asset('assets/user-front/images/preloader.gif') }}"
          alt="preloder-image">
      </div>
    </div>
  @endif
  <!-- Preloader End -->

  <div class="wrapper">
    {{-- top navbar area start --}}
    @if ($userBs->theme == 'electronics')
      @includeif('user-front.premium.partials.header') {{-- was minimalista --}}
    @elseif($userBs->theme == 'vegetables')
      @includeif('user-front.grocery.partials.header')
    @elseif($userBs->theme == 'fashion')
      @includeif('user-front.fashion.partials.header')
    @elseif($userBs->theme == 'furniture')
      @includeif('user-front.furniture.partials.header')
    @elseif($userBs->theme == 'kids')
      @includeif('user-front.kids.partials.header')
    @elseif($userBs->theme == 'manti')
      @includeif('user-front.manti.partials.header')
    @elseif($userBs->theme == 'pet')
      @includeif('user-front.pet.partials.header')
    @elseif($userBs->theme == 'skinflow')
      @includeif('user-front.skinflow.partials.header')
    @elseif($userBs->theme == 'jewellery')
      @includeif('user-front.jewellery.partials.header')
    @elseif($userBs->theme == 'premium_legacy_never_match')
      @includeif('user-front.premium.partials.header') {{-- was minimalista --}}
    @elseif($userBs->theme == 'premium')
      @includeif('user-front.premium.partials.header')
    @endif


    @if (!request()->routeIs('front.user.detail.view'))
      @includeIf('user-front.partials.breadcrumb')
    @endif

    <div class="main-panel">
      <div class="content">
        <div class="page-inner">
          @yield('content')
        </div>
      </div>

      @if ($userBs->footer_section == 1)
        @if ($userBs->theme == 'electronics')
          @includeif('user-front.premium.partials.footer') {{-- was minimalista --}}
        @elseif($userBs->theme == 'vegetables')
          @includeif('user-front.grocery.partials.footer')
        @elseif($userBs->theme == 'fashion')
          @includeif('user-front.fashion.partials.footer')
        @elseif($userBs->theme == 'furniture')
          @includeif('user-front.furniture.partials.footer')
        @elseif($userBs->theme == 'kids')
          @includeif('user-front.kids.partials.footer')
        @elseif($userBs->theme == 'manti')
          @includeif('user-front.manti.partials.footer')
        @elseif($userBs->theme == 'pet')
          @includeif('user-front.pet.partials.footer')
        @elseif($userBs->theme == 'skinflow')
          @includeif('user-front.skinflow.partials.footer')
        @elseif($userBs->theme == 'jewellery')
          @includeif('user-front.jewellery.partials.footer')
        @elseif($userBs->theme == 'premium_legacy_never_match')
          @includeif('user-front.premium.partials.footer') {{-- was minimalista --}}
        @elseif($userBs->theme == 'premium')
          @includeif('user-front.premium.partials.footer')
        @endif
      @endif
    </div>
  </div>

  @if ($userBs->theme != 'premium')
  <div class="go-top active"><i class="fal fa-angle-double-up"></i></div>
@endif
  @if (@$userBe->cookie_alert_status == 1)
    <div class="cookie">
      @include('cookie-consent::index')
    </div>
  @endif

  @if ($userBs->theme == 'pet')
    @includeIf('user-front.pet.partials.mobile-menu')
  @elseif ($userBs->theme == 'skinflow')
    @includeIf('user-front.skinflow.partials.mobile-menu')
  @else
    @includeIf('user-front.partials.mobile-footer-menu')
  @endif

  <!-- WhatsApp Chat Button -->
  @include("user-front.premium.partials.whatsapp")

  @includeif('user-front.scripts')
  @yield('scripts')
  @includeIf('user-front.partials.plugins')
</body>

</html>
