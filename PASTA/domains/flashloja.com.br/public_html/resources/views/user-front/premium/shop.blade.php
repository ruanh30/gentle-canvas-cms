@extends('user-front.layout')
@section('meta-description', !empty($seo) ? $seo->home_meta_description : '')
@section('meta-keywords', !empty($seo) ? $seo->home_meta_keywords : '')
@section('page-title', $keywords['Products'] ?? __('Produtos'))

@php
  $pmAppearance = \App\Models\User\UserAppearanceSetting::where('user_id', $user->id)->where('theme','premium')->first();
  $pmSettings = [];
  if ($pmAppearance) {
    $pmSettings = is_array($pmAppearance->settings) ? $pmAppearance->settings : (json_decode($pmAppearance->settings, true) ?? []);
  }
  $pmCardConfig = $pmSettings['productCard'] ?? [];
  $pmColors = $pmSettings['colors'] ?? [];
  $pmCat = $pmSettings['category'] ?? [];

  $columns = $pmCat['columnsDesktop'] ?? 4;
  $gridClass = match((int)$columns) {
    2 => 'pm-product-grid--2',
    3 => 'pm-product-grid--3',
    5 => 'pm-product-grid--5',
    default => 'pm-product-grid--4',
  };

  $shopItems = $items ?? collect();
  $cats = $categories ?? collect();
  $currentCategory = request('category', '');
  $currentSort = request('sort', '');
  $currentView = request('view', 'grid');
  $totalCount = method_exists($shopItems, 'total') ? $shopItems->total() : $shopItems->count();
@endphp

@section('content')
<div class="pm-theme">
  <section class="pm-section">
    <div class="pm-container">

      {{-- Category Filter Pills --}}
      @if ($cats->count() > 0)
        <div class="pm-shop__filters">
          <a href="{{ route('front.user.shop', getParam()) }}"
             class="pm-shop__filter-pill {{ empty($currentCategory) ? 'pm-shop__filter-pill--active' : '' }}">
            Todos
          </a>
          @foreach ($cats as $cat)
            <a href="{{ route('front.user.shop', array_merge([getParam()], ['category' => $cat->slug])) }}"
               class="pm-shop__filter-pill {{ $currentCategory === $cat->slug ? 'pm-shop__filter-pill--active' : '' }}">
              {{ $cat->name }}
            </a>
          @endforeach
        </div>
      @endif

      {{-- Toolbar: count, sort, view toggle --}}
      <div class="pm-shop__toolbar">
        <span class="pm-shop__count">{{ $totalCount }} {{ $totalCount === 1 ? 'produto' : 'produtos' }}</span>
        <div class="pm-shop__controls">
          <select class="pm-shop__sort" onchange="window.location=this.value">
            <option value="{{ request()->fullUrlWithQuery(['sort' => '']) }}" {{ empty($currentSort) ? 'selected' : '' }}>Destaques</option>
            <option value="{{ request()->fullUrlWithQuery(['sort' => 'newest']) }}" {{ $currentSort === 'newest' ? 'selected' : '' }}>Mais recentes</option>
            <option value="{{ request()->fullUrlWithQuery(['sort' => 'price_asc']) }}" {{ $currentSort === 'price_asc' ? 'selected' : '' }}>Menor preço</option>
            <option value="{{ request()->fullUrlWithQuery(['sort' => 'price_desc']) }}" {{ $currentSort === 'price_desc' ? 'selected' : '' }}>Maior preço</option>
          </select>
          <a href="{{ request()->fullUrlWithQuery(['view' => 'grid']) }}"
             class="pm-shop__view-btn {{ $currentView === 'grid' ? 'pm-shop__view-btn--active' : '' }}" title="Grade">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          </a>
          <a href="{{ request()->fullUrlWithQuery(['view' => 'list']) }}"
             class="pm-shop__view-btn {{ $currentView === 'list' ? 'pm-shop__view-btn--active' : '' }}" title="Lista">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </a>
          <a href="{{ request()->fullUrlWithQuery(['view' => 'compact']) }}"
             class="pm-shop__view-btn {{ $currentView === 'compact' ? 'pm-shop__view-btn--active' : '' }}" title="Compacto">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="12" y1="3" x2="12" y2="21"/></svg>
          </a>
        </div>
      </div>

      {{-- Product Grid --}}
      <div class="{{ $currentView === 'list' ? 'pm-product-list' : ($currentView === 'compact' ? 'pm-product-grid pm-product-grid--compact ' . $gridClass : 'pm-product-grid ' . $gridClass) }}">
        @foreach ($shopItems as $item)
          @include('user-front.premium.partials.product-card', ['item' => $item, 'pmCardConfig' => $pmCardConfig, 'pmColors' => $pmColors])
        @endforeach
      </div>

      {{-- Pagination --}}
      @if (method_exists($shopItems, 'links'))
        <div class="pm-pagination">
          {{ $shopItems->appends(request()->query())->links() }}
        </div>
      @endif

    </div>
  </section>
</div>
@endsection
