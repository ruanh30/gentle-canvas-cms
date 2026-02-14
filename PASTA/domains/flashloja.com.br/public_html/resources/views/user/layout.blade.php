<!DOCTYPE html>
<html lang="ar">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport' />
  <title>{{ $bs->website_title }} - {{  __('User Dashboard') }}</title>
  <link rel="icon" href="{{ !empty($userBs->favicon) ? asset('assets/front/img/user/' . $userBs->favicon) : '' }}">
  @includeif('user.partials.styles')
  @php
    $selLang = App\Models\Language::where('code', request()->input('language'))->first();
    $themeCookieKey = 'user-theme-' . (Auth::guard('web')->id() ?? 'guest');
  @endphp

  @yield('styles')

</head>

<body class="fl-dashboard-body" @if (request()->cookie($themeCookieKey) == 'dark') data-background-color="dark" @endif
  data-form-language="{{ @$selLang->rtl == 1 ? 'rtl' : '' }}"
  data-dashboard-language="{{ $dashboard_language->rtl == 1 ? 'rtl' : '' }}">

  <div class="fl-dashboard">
    @includeif('user.partials.side-navbar')

    <div class="fl-main">
      @includeif('user.partials.top-navbar')

      <main class="fl-content">
        @yield('content')
      </main>

      <footer class="fl-footer">
        <p>© 2026 FlashLoja. Todos os direitos reservados.</p>
      </footer>
    </div>
  </div>

  @includeif('user.partials.scripts')

  {{-- Loader --}}
  <div class="request-loader">
    <img src="{{ asset('assets/admin/img/loader.gif') }}" alt="">
  </div>
  {{-- Loader --}}
  @yield("scripts")
</body>

</html>
