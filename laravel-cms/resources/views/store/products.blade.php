{{-- ═══ ProductsPage — exact mirror of src/pages/ProductsPage.tsx ═══ --}}
@extends('layout.store')
@section('title', $activeCategory->name ?? 'Todos os Produtos')
@section('content')
@php
    $cat = $__t['category'] ?? [];
    $colsDesktop = $cat['columnsDesktop'] ?? 4;
    $gridCols = match((int)$colsDesktop) {
        2 => 'grid-cols-1 md:grid-cols-2',
        3 => 'grid-cols-2 md:grid-cols-3',
        5 => 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
        default => 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    };
    $currentSort = request('sort', 'featured');
    $currentCategory = request('category');
@endphp
<div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
            <h1 class="text-3xl font-display font-bold">{{ $activeCategory->name ?? 'Todos os Produtos' }}</h1>
            <p class="text-sm text-muted-foreground mt-1">{{ $products->total() }} produtos</p>
        </div>
        <div class="flex items-center gap-3">
            {{-- Display mode toggle --}}
            <div class="hidden md:flex items-center gap-1 border border-border rounded-md p-0.5">
                <a href="{{ route('store.products', array_merge(request()->query(), ['display' => 'grid'])) }}"
                   class="p-1.5 rounded {{ (request('display', 'grid') === 'grid') ? 'bg-foreground text-background' : '' }}">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                </a>
                <a href="{{ route('store.products', array_merge(request()->query(), ['display' => 'list'])) }}"
                   class="p-1.5 rounded {{ request('display') === 'list' ? 'bg-foreground text-background' : '' }}">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                </a>
                <a href="{{ route('store.products', array_merge(request()->query(), ['display' => 'compact-grid'])) }}"
                   class="p-1.5 rounded {{ request('display') === 'compact-grid' ? 'bg-foreground text-background' : '' }}">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>
                </a>
            </div>

            {{-- Category pills --}}
            <div class="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                <a href="{{ route('store.products', array_merge(request()->except('category'), [])) }}"
                   class="inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium font-body transition-colors {{ !$currentCategory ? 'bg-foreground text-background' : 'border border-border hover:bg-secondary' }}">
                    Todos
                </a>
                @foreach($categories as $catItem)
                    <a href="{{ route('store.products', array_merge(request()->query(), ['category' => $catItem->slug])) }}"
                       class="inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium font-body transition-colors {{ $currentCategory === $catItem->slug ? 'bg-foreground text-background' : 'border border-border hover:bg-secondary' }}">
                        {{ $catItem->name }}
                    </a>
                @endforeach
            </div>

            {{-- Sort dropdown --}}
            <select onchange="window.location.href=this.value" class="h-10 rounded-md border border-border bg-background px-3 py-2 text-sm w-[160px]">
                <option value="{{ route('store.products', array_merge(request()->query(), ['sort' => 'featured'])) }}" {{ $currentSort === 'featured' ? 'selected' : '' }}>Destaques</option>
                <option value="{{ route('store.products', array_merge(request()->query(), ['sort' => 'newest'])) }}" {{ $currentSort === 'newest' ? 'selected' : '' }}>Mais recentes</option>
                <option value="{{ route('store.products', array_merge(request()->query(), ['sort' => 'price_asc'])) }}" {{ $currentSort === 'price_asc' ? 'selected' : '' }}>Menor preço</option>
                <option value="{{ route('store.products', array_merge(request()->query(), ['sort' => 'price_desc'])) }}" {{ $currentSort === 'price_desc' ? 'selected' : '' }}>Maior preço</option>
            </select>
        </div>
    </div>

    @if($products->isEmpty())
        <div class="text-center py-20">
            <p class="text-muted-foreground">Nenhum produto encontrado.</p>
        </div>
    @elseif(request('display') === 'list')
        <div class="space-y-4">
            @foreach($products as $product)
                <a href="{{ route('store.product', $product->slug) }}" class="flex gap-4 border border-border rounded-lg p-3 hover:shadow-md transition-shadow">
                    <div class="w-24 h-24 flex-shrink-0">
                        <img src="{{ $product->featured_image ?? '/placeholder.svg' }}" alt="{{ $product->name }}" class="w-full h-full object-cover rounded-md">
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-sm font-medium truncate">{{ $product->name }}</h3>
                        <p class="text-xs text-muted-foreground mt-1">{{ Str::limit($product->short_description ?? $product->description, 80) }}</p>
                        <p class="text-sm font-semibold mt-2">R$ {{ number_format($product->price, 2, ',', '.') }}</p>
                    </div>
                </a>
            @endforeach
        </div>
    @elseif(request('display') === 'compact-grid')
        <div class="grid gap-1 {{ $gridCols }}">
            @foreach($products as $product)
                @include('store.partials.product-card', ['product' => $product])
            @endforeach
        </div>
    @else
        <div class="grid gap-6 {{ $gridCols }}">
            @foreach($products as $product)
                @include('store.partials.product-card', ['product' => $product])
            @endforeach
        </div>
    @endif

    <div class="mt-8">{{ $products->withQueryString()->links() }}</div>
</div>
@endsection