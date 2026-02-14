@php
  $appearance = null;
  if ($userBs->theme === 'premium') {
    $appearance = \Illuminate\Support\Facades\DB::table('user_appearance_settings')
      ->where('user_id', $user->id)
      ->first();
    $appearanceSettings = $appearance && $appearance->settings ? json_decode($appearance->settings, true) : [];
  }
@endphp

<!--====== Favicon Icon ======-->
<link rel="shortcut icon" href="{{ (!empty($appearanceSettings['logos']['favicon']) ? asset('assets/front/img/user/' . $appearanceSettings['logos']['favicon']) : (!empty($userBs->favicon) ? asset('assets/front/img/user/' . $userBs->favicon) : '')) }}" type="image/png" />


<link rel="stylesheet" href="{{ asset('assets/user-front/css/plugins.css') }}">
<link rel="stylesheet" href="{{ asset('assets/user-front/css/aos.min.css') }}">


<link rel="stylesheet" href="{{ asset('assets/user-front/fonts/fontawesome/css/all.min.css') }}">
<!-- Main Style CSS -->
<link rel="stylesheet" href="{{ asset('assets/user-front/css/common/style.css') }}">
<link rel="stylesheet" href="{{ asset('assets/user-front/css/common/header-1.css') }}">
<link rel="stylesheet" href="{{ asset('assets/user-front/css/tinymce-content.css') }}">

@if ($userBs->theme == 'vegetables')
  <link rel="stylesheet" href="{{ asset('assets/user-front/css/grocery/home-1.css') }}">
@elseif ($userBs->theme == 'premium')
  @php $dawnBase = asset('assets/user-front/premium_dawn'); @endphp
  <link rel="stylesheet" href="{{ $dawnBase }}/css/dart-style-critical-8b3a5994e35cb076c302aad5e8090b45.css">
  <link rel="stylesheet" href="{{ $dawnBase }}/css/dart-style-colors-6a987287cbc4fb6992becf2f8dea05ad.css">
  <link rel="stylesheet" href="{{ $dawnBase }}/css/dart-style-async-eb7324a1d2909fc071ac721c5ace17f7.css" media="print" onload="this.media='all'">
  <link rel="stylesheet" href="{{ asset('assets/user-front/css/premium/premium.css') }}">
  <style>
    .mf-dawn-adbar{background:#000;color:#fff;font-size:7px;padding:6px 0;text-align:center;}
    body{font-size:var(--mf-font-size-base,12px);}
    .mf-dawn-top{background:#fff;border-bottom:1px solid rgba(0,0,0,.08);}
    .mf-dawn-top__inner{display:flex;align-items:center;gap:16px;padding:14px 0;}

    .mf-dawn-topmenu{display:flex;justify-content:center;align-items:center;gap:var(--mf-menu-gap,18px);margin:-4px 0 10px;flex:1;}        
      .mf-dawn-topmenu li{display:flex;align-items:center;}
      .mf-dawn-topmenu a{display:inline-flex;align-items:center;line-height:1;padding:8px 6px;transform:translateY(3px);text-transform:var(--mf-menu-transform,none);font-weight:var(--mf-menu-weight,700);font-family:var(--mf-font-menu, var(--mf-font-heading));}
    .mf-dawn-topmenu a{color:var(--mf-menu-text, inherit);text-decoration:none;opacity:.85;}
    .mf-dawn-topmenu a,
    .mf-dawn-action,
    .mf-dawn-menu__body a{font-size:var(--mf-font-size-menu,14px);}
    .mf-dawn-topmenu a:hover{opacity:1;text-decoration:underline;}
    .mf-dawn-logo img{height:40px;width:auto;display:block;}
    .mf-dawn-search{flex:1;display:flex;align-items:center;border:1px solid rgba(0,0,0,.10);border-radius:999px;overflow:hidden;}
    .mf-dawn-search input{flex:1;border:0;outline:0;padding:10px 14px;}
    .mf-dawn-search button{border:0;background:transparent;color:var(--mf-menu-text, inherit);padding:0 14px;height:40px;display:flex;align-items:center;}
    .mf-dawn-actions{display:flex;align-items:center;gap:14px;}
    .mf-dawn-action{text-decoration:none;color:var(--mf-menu-text, #111827);font-weight:var(--mf-menu-weight,700);font-family:var(--mf-font-menu, var(--mf-font-heading));display:flex;align-items:center;gap:8px;}
    .mf-dawn-burger{width:42px;height:42px;border:1px solid rgba(0,0,0,.12);border-radius:10px;background:#fff;display:flex;flex-direction:column;justify-content:center;gap:5px;padding:0 11px;}
    .mf-dawn-burger span{height:2px;background:var(--mf-menu-text, #111827);display:block;}

    .mf-dawn-menu{position:fixed;inset:0;pointer-events:none;z-index:200;display:block;}
    .mf-dawn-menu__overlay{position:absolute;inset:0;background:rgba(0,0,0,.45);opacity:0;transition:.2s;z-index:1;}
    .mf-dawn-menu__panel{position:absolute;top:0;left:0;height:100%;width:min(360px, 92vw);background:var(--mf-menu-left-bg, #fff);transform:translateX(-105%);transition:.25s;display:flex;flex-direction:column;z-index:2;}
    .mf-dawn-menu__head{display:flex;justify-content:space-between;align-items:center;padding:16px;border-bottom:1px solid rgba(0,0,0,.08);}
    .mf-dawn-menu__close{border:0;background:transparent;font-size:26px;line-height:1;}
    .mf-dawn-menu__body{display:flex;flex-direction:column;padding:10px 16px;gap:var(--mf-menu-gap,18px);}
    .mf-dawn-menu__body a{padding:10px 6px;border-radius:10px;text-decoration:none;color:var(--mf-menu-text, #111827);font-weight:var(--mf-menu-weight,700);text-transform:var(--mf-menu-transform,none);font-family:var(--mf-font-menu, var(--mf-font-heading));}
    .mf-dawn-menu__body a:hover{background:rgba(0,0,0,.06);}
    body.mf-menu-open .mf-dawn-menu{pointer-events:auto;}
    body.mf-menu-open .mf-dawn-menu__overlay{opacity:1;}
    body.mf-menu-open .mf-dawn-menu__panel{transform:translateX(0);}

    body.mf-menu-open{overflow:hidden;}


    .mf-dawn-footer{background:var(--mf-footer-bg, #fff);color:var(--mf-footer-text, rgba(17,24,39,.75));border-top:1px solid rgba(0,0,0,.08);padding:40px 0;}
    .mf-dawn-footer__cols{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
    .mf-dawn-footer__title{display:block;margin-bottom:10px;font-weight:900;}
    .mf-dawn-footer a{display:block;color:var(--mf-footer-text, rgba(17,24,39,.75));text-decoration:none;margin:6px 0;}
    .mf-dawn-footer__muted{color:rgba(0,0,0,.65);margin:0;}
    .mf-dawn-footer__bottom{margin-top:22px;padding-top:14px;border-top:1px solid rgba(0,0,0,.08);color:rgba(0,0,0,.65);font-weight:700;}


    .btn-primary,
    .btn-primary,
    .main-btn,
    .theme-btn{font-size:var(--mf-font-size-button,14px);}
    .main-btn,
    .theme-btn{
      background: var(--mf-button-bg, var(--mf-primary));
      border-color: var(--mf-button-bg, var(--mf-primary));
      color: var(--mf-button-text, #fff);
      font-family: var(--mf-font-button, var(--mf-font-body));
    }
    .btn-primary:hover,
    .main-btn:hover,
    .theme-btn:hover{
      filter: brightness(0.95);
      color: var(--mf-button-text, #fff);
    }
    .section-title h2,
    h1,h2,h3,h4,h5,h6{font-size:var(--mf-font-size-heading,28px);}
    .section-title .title{
      color: var(--mf-section-title, #111827);
    }
    .price,
    .product-price,
    .product-default .price{
      color: var(--mf-price, var(--mf-primary));
    }
    .product-default,
    .product-card,
    .mf-card{
      background: var(--mf-card-bg, #fff);
      border: 1px solid var(--mf-card-border, #e5e7eb);
    }

    .mf-grid{
      display:grid;
      grid-template-columns:repeat(var(--mf-products-per-row-desktop, 4), minmax(0,1fr));
      gap:24px;
    }
    .mf-grid > [class*="col-"]{width:auto;max-width:none;flex:0 0 auto;padding-left:0;padding-right:0;}
    @media (max-width: 991px){
      .mf-grid{grid-template-columns:repeat(var(--mf-products-per-row-mobile, 2), minmax(0,1fr));}
    }
    .product-default,
    .product-card,
    .mf-card{
      box-shadow: var(--mf-card-shadow, none);
    }
    @media (max-width: 991px){
      .mf-dawn-search{display:none;}
      .mf-dawn-footer__cols{grid-template-columns:1fr;}
    }
  </style>
@elseif ($userBs->theme == 'furniture')
@elseif ($userBs->theme == 'furniture')
  <link rel="stylesheet" href="{{ asset('assets/user-front/css/furniture/home-2.css') }}">
@elseif ($userBs->theme == 'fashion')
  <link rel="stylesheet" href="{{ asset('assets/user-front/css/fashion/home-3.css') }}">
@elseif ($userBs->theme == 'electronics')
  <link rel="stylesheet" href="{{ asset('assets/user-front/css/electronics/home-4.css') }}">
@elseif ($userBs->theme == 'kids')
  <link rel="stylesheet" href="{{ asset('assets/user-front/css/kids/home-5.css') }}">
@elseif ($userBs->theme == 'manti')
  <link rel="stylesheet" href="{{ asset('assets/user-front/css/manti/home-6.css') }}">
@elseif ($userBs->theme == 'pet')
  <style>
    :root {
      --font-family-base: "Nunito", sans-serif !important;
      --font-family-body: 'Nunito', sans-serif !important;
    }
  </style>
  <link rel="stylesheet" href="{{ asset('assets/user-front/css/pet/home-7.css') }}">
@elseif ($userBs->theme == 'skinflow')
  <style>
    :root {
      --font-family-base: "Jost", sans-serif;
      --font-family-body: "Jost", sans-serif;
    }
  </style>
  <link rel="stylesheet" href="{{ asset('assets/user-front/css/skinflow/home-8.css') }}">
@elseif ($userBs->theme == 'jewellery')

  <style>
    :root {
      --font-family-base: "Merriweather", serif !important;
      --font-family-body: "Jost", sans-serif !important;
    }
  </style>
  <link rel="stylesheet" href="{{ asset('assets/user-front/css/jewellery/jewellery.css') }}">
@endif
<!--====== Style css ======-->

<!--====== RTL css ======-->
@if ($userCurrentLang->rtl == 1)
  <link rel="stylesheet" href="{{ asset('assets/front/css/rtl.css') }}">
@endif
@if ($userCurrentLang->rtl == 1 & ($userBs->theme == 'pet'))
  <link rel="stylesheet" href="{{ asset('assets/user-front/css/pet/home-7-rtl.css') }}">
@endif
@if ($userCurrentLang->rtl == 1 & ($userBs->theme == 'skinflow'))
  <link rel="stylesheet" href="{{ asset('assets/user-front/css/skinflow/home-8-rtl.css') }}">
@endif
@if ($userCurrentLang->rtl == 1 & ($userBs->theme == 'jewellery'))
  <link rel="stylesheet" href="{{ asset('assets/user-front/css/jewellery/jewellery-rtl.css') }}">
@endif

@yield('styles')
