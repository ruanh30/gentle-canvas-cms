@php
  $themeCookieKey = 'user-theme-' . (Auth::guard('web')->id() ?? 'guest');
@endphp

<!-- CSS Files -->
{{-- fontawesome css --}}
<link rel="stylesheet" href="{{ asset('assets/front/css/all.min.css') }}">
{{-- fontawesome icon picker css --}}
<link rel="stylesheet" href="{{ asset('assets/admin/css/fontawesome-iconpicker.min.css') }}">
{{-- bootstrap css --}}
<link rel="stylesheet" href="{{ asset('assets/admin/css/bootstrap.min.css') }}">
<link rel="stylesheet" href="{{ asset('assets/admin/css/dropzone.css') }}">
<link rel="stylesheet" href="{{ asset('assets/admin/css/bootstrap-tagsinput.css') }}">
<link rel="stylesheet" href="{{ asset('assets/admin/css/jquery-ui.min.css') }}">
<link rel="stylesheet" href="{{ asset('assets/admin/css/flatpickr.min.css') }}">
<link rel="stylesheet" href="{{ asset('assets/admin/css/select2.min.css') }}">
<link rel="stylesheet" href="{{ asset('assets/admin/css/choose-color.css') }}">
<link rel="stylesheet" href="{{ asset('assets/admin/css/atlantis.css') }}">
<link rel="stylesheet" href="{{ asset('assets/admin/css/flashloja-dashboard.css') }}">

{{-- Lucide Icons (reference uses lucide-react; CDN used here) --}}
<script src="https://unpkg.com/lucide@latest"></script>
<link rel="stylesheet" href="{{ asset('assets/admin/css/custom.css') }}?v={{ filemtime(public_path('assets/admin/css/custom.css')) }}">
<link rel="stylesheet" href="{{ asset('assets/admin/css/tinymce-content.css') }}">

@if (request()->cookie($themeCookieKey) == 'dark')
  <link rel="stylesheet" href="{{ asset('assets/admin/css/dark.css') }}">
@endif


@if ($dashboard_language->rtl == 1)
  <link rel="stylesheet" href="{{ asset('assets/admin/css/rtl-style.css') }}">
@endif


@yield('styles')
