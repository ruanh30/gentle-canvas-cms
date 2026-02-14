<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title inertia>{{ config('app.name', 'FlashLoja') }}</title>
  @viteReactRefresh
  @vite(['resources/js/inertia/app.tsx'])
  @inertiaHead
</head>
<body>
  @inertia
</body>
</html>
