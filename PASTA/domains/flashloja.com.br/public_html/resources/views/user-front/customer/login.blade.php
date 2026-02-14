@extends('user-front.layout')
@section('meta-description', !empty($seo) ? $seo->login_meta_description : '')
@section('meta-keywords', !empty($seo) ? $seo->login_meta_keywords : '')
@section('breadcrumb_title', $pageHeading->login_page ?? __('Login'))
@section('page-title', $pageHeading->login_page ?? __('Login'))

@section('content')
  @php
    $input = request()->input('redirected');

    // Load premium theme settings for consistent styling
    $pmAppearance = \App\Models\User\UserAppearanceSetting::where('user_id', $user->id)->where('theme','premium')->first();
    $pmSettings = [];
    if ($pmAppearance) {
      $pmSettings = is_array($pmAppearance->settings) ? $pmAppearance->settings : (json_decode($pmAppearance->settings, true) ?? []);
    }
    $pmColors = $pmSettings['colors'] ?? [];
    $pmTypo = $pmSettings['typography'] ?? [];
    $headingFont = $pmTypo['headingFont'] ?? 'Playfair Display';
    $bodyFont = $pmTypo['bodyFont'] ?? 'Inter';
    $bg = $pmColors['background'] ?? '#ffffff';
    $fg = $pmColors['foreground'] ?? '#1a1a1a';
    $secondary = $pmColors['secondary'] ?? '#f5f5f5';
    $mutedFg = $pmColors['mutedForeground'] ?? '#737373';
    $border = $pmColors['border'] ?? '#e5e5e5';
    $primary = $pmColors['primary'] ?? '#1a1a1a';
    $primaryFg = $pmColors['primaryForeground'] ?? '#fafafa';
    $isPremium = !empty($pmAppearance) || (($user->theme ?? '') === 'premium');
    $logoImg = !empty($userBs->logo) ? asset('assets/front/img/user/' . $userBs->logo) : '';
    $shopName = $userBs->shop_name ?? $user->username;

  @endphp

  @if ($isPremium)
  <link href="https://fonts.googleapis.com/css2?family={{ urlencode($headingFont) }}:wght@400;500;600;700&family={{ urlencode($bodyFont) }}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
    .pm-login-wrap{
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 16px;
      background: {{ $bg }};
      font-family: '{{ $bodyFont }}', sans-serif;
      color: {{ $fg }};
    }
    .pm-login-card{
      width: 100%;
      max-width: 420px;
      background: {{ $bg }};
      border: 1px solid {{ $border }};
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 4px 24px rgba(0,0,0,.04);
    }
    .pm-login-card__header{
      text-align: center;
      margin-bottom: 28px;
    }
    .pm-login-card__title{
      font-family: '{{ $headingFont }}', serif;
      font-size: 24px;
      font-weight: 700;
      color: {{ $fg }};
      margin: 0 0 8px;
      line-height: 1.2;
    }
    .pm-login-card__desc{
      font-size: 14px;
      color: {{ $mutedFg }};
      margin: 0;
    }
    .pm-login-field{
      margin-bottom: 18px;
    }
    .pm-login-field label{
      display: block;
      font-size: 13px;
      font-weight: 500;
      color: {{ $fg }};
      margin-bottom: 6px;
    }
    .pm-login-field input{
      width: 100%;
      padding: 10px 14px;
      font-size: 14px;
      font-family: '{{ $bodyFont }}', sans-serif;
      border: 1px solid {{ $border }};
      border-radius: 8px;
      outline: none;
      color: {{ $fg }};
      background: {{ $bg }};
      transition: border-color .2s;
    }
    .pm-login-field input:focus{
      border-color: {{ $primary }};
      box-shadow: 0 0 0 3px {{ $primary }}15;
    }
    .pm-login-btn{
      width: 100%;
      padding: 12px;
      font-size: 15px;
      font-weight: 600;
      font-family: '{{ $bodyFont }}', sans-serif;
      background: {{ $primary }};
      color: {{ $primaryFg }};
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: opacity .2s;
      margin-top: 8px;
    }
    .pm-login-btn:hover{ opacity: .9 }
    .pm-login-links{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 18px;
      font-size: 13px;
    }
    .pm-login-links a{
      color: {{ $mutedFg }};
      text-decoration: none;
      transition: color .2s;
    }
    .pm-login-links a:hover{ color: {{ $fg }} }
    .pm-login-alert{
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 13px;
      margin-bottom: 16px;
    }
    .pm-login-alert--error{ background: #fef2f2; color: #dc2626; border: 1px solid #fecaca }
    .pm-login-alert--success{ background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0 }
    .pm-login-divider{
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 18px 0;
      font-size: 12px;
      color: {{ $mutedFg }};
    }
    .pm-login-divider::before,.pm-login-divider::after{
      content:'';
      flex:1;
      height:1px;
      background: {{ $border }};
    }
    .pm-login-google{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      padding: 10px;
      font-size: 14px;
      font-weight: 500;
      font-family: '{{ $bodyFont }}', sans-serif;
      background: #fff;
      color: {{ $fg }};
      border: 1px solid {{ $border }};
      border-radius: 8px;
      cursor: pointer;
      transition: background .2s;
      text-decoration: none;
    }
    .pm-login-google:hover{ background: {{ $secondary }}; color: {{ $fg }} }
    .pm-login-guest{
      text-align: center;
      margin-bottom: 20px;
    }
    .pm-login-guest a{
      font-size: 14px;
      color: {{ $primary }};
      text-decoration: underline;
      font-weight: 500;
    }
    .pm-login-guest-or{
      text-align: center;
      font-size: 14px;
      font-weight: 600;
      color: {{ $mutedFg }};
      margin-bottom: 16px;
    }
  </style>

  <div class="pm-login-wrap">
    <div class="pm-login-card">
      @if (!onlyDigitalItemsInCart())
        @if ($input == 'checkout')
          <div class="pm-login-guest">
            <a href="{{ route('front.user.checkout', [getParam(), 'type' => 'guest']) }}">{{ $keywords['Checkout as Guest'] ?? __('Checkout as Guest') }}</a>
          </div>
          <div class="pm-login-guest-or">{{ $keywords['OR'] ?? __('OR') }}</div>
        @endif
      @endif

      <div class="pm-login-card__header">
        @if (!empty($logoImg))
          <img class="pm-login-card__logo" src="{{ $logoImg }}" alt="{{ $shopName }}" style="max-height:56px;max-width:220px;object-fit:contain;margin:0 auto 14px;display:block">
        @endif
        <h1 class="pm-login-card__title">{{ $keywords['Login'] ?? __('Entrar') }}</h1>
        <p class="pm-login-card__desc">{{ __('Entre com seu e-mail e senha para continuar') }}</p>
      </div>

      @if (Session::has('error'))
        <div class="pm-login-alert pm-login-alert--error">{{ Session::get('error') }}</div>
      @endif
      @if (Session::has('success'))
        <div class="pm-login-alert pm-login-alert--success">{{ Session::get('success') }}</div>
      @endif

      <form action="{{ route('customer.login_submit', getParam()) }}" method="POST">
        @csrf
        <input type="hidden" name="user_id" value="{{ $user->id }}">

        <div class="pm-login-field">
          <label>{{ $keywords['Email'] ?? __('E-mail') }}</label>
          <input type="email" name="email" placeholder="{{ $keywords['Enter_Email_Address'] ?? __('seu@email.com') }}" required>
          @error('email')<p style="color:#dc2626;font-size:12px;margin:4px 0 0">{{ $message }}</p>@enderror
        </div>

        <div class="pm-login-field">
          <label>{{ $keywords['Password'] ?? __('Senha') }}</label>
          <input type="password" name="password" placeholder="{{ $keywords['Enter Password'] ?? __('••••••••') }}" required>
          @error('password')<p style="color:#dc2626;font-size:12px;margin:4px 0 0">{{ $message }}</p>@enderror
        </div>

        @if ($userBs->is_recaptcha == 1 && in_array('Google Recaptcha', $packagePermissions))
          <div class="pm-login-field">
            {!! NoCaptcha::renderJs() !!}
            {!! NoCaptcha::display() !!}
            @if ($errors->has('g-recaptcha-response'))
              <p style="color:#dc2626;font-size:12px;margin:4px 0 0">{{ __($errors->first('g-recaptcha-response')) }}</p>
            @endif
          </div>
        @endif

        <button type="submit" class="pm-login-btn">{{ $keywords['Login'] ?? __('Entrar') }}</button>
      </form>

      @if (in_array('Google Login', $packagePermissions) && $userBs->is_google_login == 1)
        <div class="pm-login-divider">ou</div>
        <a href="{{ route('customer.google.login', getParam()) }}" class="pm-login-google">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
            <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
            <path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
            <path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
            <path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
          </svg>
          {{ $keywords['Login with Google'] ?? __('Entrar com Google') }}
        </a>
      @endif
      <div style="margin-top:16px;display:flex;justify-content:center">
        <a href="{{ route('customer.signup', getParam()) }}" style="font-size:13px;color:{{ $mutedFg }};text-decoration:none">
          {{ __('Não tem conta? Cadastrar') }}
        </a>
      </div>
      <div style="margin-top:14px;padding:12px;border:1px solid {{ $border }};background:{{ $secondary }};border-radius:10px;font-size:12px;color:{{ $mutedFg }};text-align:center">
        {{ __('Digite sua senha') }}
      </div>

      <div style="margin-top:14px;text-align:center">
        <a href="{{ route('customer.forget_password', getParam()) }}" style="font-size:12px;color:{{ $mutedFg }};text-decoration:underline">{{ __('Esqueceu a senha?') }}</a>
      </div>
    </div>
  </div>

  @else
  {{-- Non-premium: fallback to original login layout --}}
  <div class="authentication-area ptb-100">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-xl-5">
          @if (!onlyDigitalItemsInCart())
            @if ($input == 'checkout')
              <div class="form-group">
                <h3 class="text-center text-muted mb-20">
                  <a href="{{ route('front.user.checkout', [getParam(), 'type' => 'guest']) }}" class="underline checkout-guest">{{ $keywords['Checkout as Guest'] ?? __('Checkout as Guest') }}</a>
                </h3>
              </div>
              <div class="mt-4 mb-3 text-center">
                <h3 class="mb-0"><strong>{{ $keywords['OR'] ?? __('OR') }},</strong></h3>
              </div>
            @endif
          @endif
          <div class="auth-form p-30 border radius-md">
            @if (Session::has('error'))
              <div class="alert alert-danger text-danger">{{ Session::get('error') }}</div>
            @endif
            @if (Session::has('success'))
              <div class="alert alert-success">{{ Session::get('success') }}</div>
            @endif
            <form action="{{ route('customer.login_submit', getParam()) }}" method="POST">
              @csrf
              <input type="hidden" name="user_id" value="{{ $user->id }}">
              <div class="title"><h3 class="mb-20">{{ $keywords['Login'] ?? __('Log In') }}</h3></div>
              <div class="form-group mb-30">
                <input type="email" placeholder="{{ $keywords['Enter_Email_Address'] ?? __('Enter Email Address') }}" class="form-control" name="email" required>
                @error('email')<p class="text-danger">{{ $message }}</p>@enderror
              </div>
              <div class="form-group mb-30">
                <input type="password" class="form-control" name="password" placeholder="{{ $keywords['Enter Password'] ?? __('Enter Password') }}" required>
                @error('password')<p class="text-danger">{{ $message }}</p>@enderror
              </div>
              @if ($userBs->is_recaptcha == 1 && in_array('Google Recaptcha', $packagePermissions))
                <div class="form-group mb-30">
                  <div class="d-block mb-4">
                    {!! NoCaptcha::renderJs() !!}
                    {!! NoCaptcha::display() !!}
                    @if ($errors->has('g-recaptcha-response'))
                      <p class="text-danger mb-0 mt-2">{{ __($errors->first('g-recaptcha-response')) }}</p>
                    @endif
                  </div>
                </div>
              @endif
              <div class="row align-items-center mb-20">
                <div class="col-5 col-xs-12">
                  <div class="link">
                    <a href="{{ route('customer.forget_password', getParam()) }}">{{ $keywords['Forgot your password'] ?? __('Forgot your password') }}?</a>
                  </div>
                </div>
                <div class="col-7 col-xs-12">
                  <div class="link go-signup">
                    {{ $keywords['Dont_have_an_account'] ?? __('Dont have an account') }}? <a href="{{ route('customer.signup', getParam()) }}">{{ $keywords['Signup'] ?? __('Signup') }}</a>
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-lg btn-primary radius-md w-100 mb-2">{{ $keywords['Login'] ?? __('Login') }}</button>
              @if (in_array('Google Login', $packagePermissions) && $userBs->is_google_login == 1)
                <p class="text-center login_or mb-2">{{ $keywords['or'] ?? __('OR') }}</p>
                <div class="login_google_area text-center">
                  <a href="{{ route('customer.google.login', getParam()) }}" class="login_google radius-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
                    {{ $keywords['Login with Google'] ?? __('Login with Google') }}
                  </a>
                </div>
              @endif
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  @endif
@endsection
