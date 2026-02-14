@extends('user-front.layout')

@section('meta-description', !empty($seo) ? $seo->signup_meta_description : '')
@section('meta-keywords', !empty($seo) ? $seo->signup_meta_keywords : '')
@section('breadcrumb_title', $pageHeading->signup_page ?? __('Signup'))
@section('page-title', $pageHeading->signup_page ?? __('Signup'))
@section('content')
  
  @php
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
    .pm-signup-wrap{
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 16px;
      background: {{ $bg }};
      font-family: '{{ $bodyFont }}', sans-serif;
      color: {{ $fg }};
    }
    .pm-signup-card{
      width: 100%;
      max-width: 420px;
      background: {{ $bg }};
      border: 1px solid {{ $border }};
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 4px 24px rgba(0,0,0,.04);
    }
    .pm-signup-card__header{ text-align:center; margin-bottom: 22px; }
    .pm-signup-card__title{ font-family:'{{ $headingFont }}', serif; font-size:24px; font-weight:700; margin:0 0 8px; }
    .pm-signup-card__desc{ font-size:14px; color:{{ $mutedFg }}; margin:0; }
    .pm-signup-field{ margin-bottom: 16px; }
    .pm-signup-field label{ display:block; font-size:13px; font-weight:500; margin-bottom:6px; }
    .pm-signup-field input{ width:100%; padding:10px 14px; font-size:14px; border:1px solid {{ $border }}; border-radius:8px; outline:none; background: {{ $bg }}; color: {{ $fg }}; }
    .pm-signup-field input:focus{ border-color: {{ $primary }}; box-shadow: 0 0 0 3px {{ $primary }}15; }
    .pm-signup-btn{ width:100%; padding:12px; font-size:15px; font-weight:600; background: {{ $primary }}; color: {{ $primaryFg }}; border:none; border-radius:8px; cursor:pointer; margin-top: 6px; }
    .pm-signup-btn:hover{ opacity:.92 }
  </style>

  <div class="pm-signup-wrap">
    <div class="pm-signup-card">
      <div class="pm-signup-card__header">
        @if (!empty($logoImg))
          <img src="{{ $logoImg }}" alt="{{ $shopName }}" style="max-height:56px;max-width:220px;object-fit:contain;margin:0 auto 14px;display:block">
        @endif
        <h1 class="pm-signup-card__title">{{ $keywords['Signup'] ?? __('Criar conta') }}</h1>
        <p class="pm-signup-card__desc">{{ __('Preencha os dados para se cadastrar') }}</p>
      </div>

      @if (Session::has('warning'))
        <div style="padding:10px 14px;border-radius:8px;font-size:13px;margin-bottom:16px;background:#fef2f2;color:#dc2626;border:1px solid #fecaca">{{ Session::get('warning') }}</div>
      @endif
      @if (Session::has('sendmail'))
        <div style="padding:10px 14px;border-radius:8px;font-size:13px;margin-bottom:16px;background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0">{{ __(Session::get('sendmail')) }}</div>
      @endif

      <form action="{{ route('customer.signup.submit', getParam()) }}" method="POST">
        @csrf

        <div class="pm-signup-field">
          <label>{{ $keywords['Username'] ?? __('Nome') }}</label>
          <input type="text" name="username" value="{{ old('username') }}" placeholder="{{ __('Seu nome') }}">
          @error('username')<p style="color:#dc2626;font-size:12px;margin:4px 0 0">{{ $message }}</p>@enderror
        </div>

        <div class="pm-signup-field">
          <label>{{ $keywords['Email_Address'] ?? __('E-mail') }}</label>
          <input type="email" name="email" value="{{ old('email') }}" placeholder="email@exemplo.com" required>
          @error('email')<p style="color:#dc2626;font-size:12px;margin:4px 0 0">{{ $message }}</p>@enderror
        </div>

        <div class="pm-signup-field">
          <label>{{ $keywords['Enter Password'] ?? __('Senha') }}</label>
          <input type="password" name="password" placeholder="••••••••" required>
          @error('password')<p style="color:#dc2626;font-size:12px;margin:4px 0 0">{{ $message }}</p>@enderror
        </div>

        <div class="pm-signup-field">
          <label>{{ $keywords['Enter Confirm Password'] ?? __('Confirmar senha') }}</label>
          <input type="password" name="password_confirmation" placeholder="••••••••" required>
        </div>

        @if ($userBs->is_recaptcha == 1 && in_array('Google Recaptcha', $packagePermissions))
          <div class="pm-signup-field">
            {!! NoCaptcha::renderJs() !!}
            {!! NoCaptcha::display() !!}
            @if ($errors->has('g-recaptcha-response'))
              <p style="color:#dc2626;font-size:12px;margin:4px 0 0">{{ __($errors->first('g-recaptcha-response')) }}</p>
            @endif
          </div>
        @endif

        <button type="submit" class="pm-signup-btn">{{ $keywords['Signup'] ?? __('Cadastrar') }}</button>

        <div style="margin-top:16px;text-align:center">
          <a href="{{ route('customer.login', getParam()) }}" style="font-size:13px;color:{{ $mutedFg }};text-decoration:none">
            {{ __('Já tem conta? Entrar') }}
          </a>
        </div>
      </form>
    </div>
  </div>

  @else
<!-- Authentication Start -->
  <div class="authentication-area ptb-100">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-xl-5">
          <div class="auth-form p-30 border radius-md">
            @if (Session::has('warning'))
              <div class="alert alert-danger text-danger">{{ Session::get('warning') }}</div>
            @endif
            @if (Session::has('sendmail'))
              <div class="alert alert-success mb-4">
                <p>{{ __(Session::get('sendmail')) }}</p>
              </div>
            @endif

            <form action="{{ route('customer.signup.submit', getParam()) }}" method="POST">
              @csrf
              <div class="title">
                <h3 class="mb-20">{{ $keywords['Signup'] ?? __('Signup') }}</h3>
              </div>
              <div class="form-group mb-30">
                <input type="text" placeholder="{{ $keywords['Username'] ?? __('Username') }}" class="form-control"
                  name="username" value="{{ old('username') }}">
                @error('username')
                  <p class="text-danger">{{ $message }}</p>
                @enderror
              </div>
              <div class="form-group mb-30">
                <input type="email" placeholder="{{ $keywords['Email_Address'] ?? __('Email Address') }}"
                  class="form-control" name="email" value="{{ old('email') }}" required>
                @error('email')
                  <p class="text-danger">{{ $message }}</p>
                @enderror
              </div>
              <div class="form-group mb-30">
                <input required type="password" placeholder="{{ $keywords['Enter Password'] ?? __('Enter Password') }}"
                  class="form-control" name="password" value="{{ old('password') }}" required>
                @error('password')
                  <p class="text-danger">{{ $message }}</p>
                @enderror
              </div>
              <div class="form-group mb-30">
                <input type="password"
                  placeholder="{{ $keywords['Enter Confirm Password'] ?? __('Enter Confirm Password') }}"
                  class="form-control" name="password_confirmation" value="{{ old('password_confirmation') }}" required>
              </div>
              @if ($userBs->is_recaptcha == 1 && in_array('Google Recaptcha', $packagePermissions))
                <div class="form-group mb-30">
                  <div class="d-block mb-4">
                    {!! NoCaptcha::renderJs() !!}
                    {!! NoCaptcha::display() !!}
                    @if ($errors->has('g-recaptcha-response'))
                      @php
                        $errmsg = $errors->first('g-recaptcha-response');
                      @endphp
                      <p class="text-danger mb-0 mt-2">{{ __("$errmsg") }}</p>
                    @endif
                  </div>
                </div>
              @endif

              <div class="row align-items-center mb-20">
                <div class="col-8 col-xs-12">
                  <div class="link go-signup">
                    {{ $keywords['Already_have_an_account'] ?? __('Already have an account') }}? <a
                      href="{{ route('customer.login', getParam()) }}">{{ $keywords['Click_Here'] ?? __('Click here ') }}</a>
                    {{ $keywords['to Login'] ?? __('to Login') }}
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-lg btn-primary radius-md w-100">
                {{ $keywords['Signup'] ?? __('Sign up!') }} </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Authentication End -->
  @endif
@endsection
