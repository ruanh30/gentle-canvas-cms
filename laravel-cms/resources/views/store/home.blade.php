@extends('layout.store')
@section('title', 'Início')
@section('content')
{{-- Render homepage sections in order, exactly like React HomePage.tsx --}}
@php
    $sections = $theme['homepageSections'] ?? [];
    $slide = ($theme['hero']['slides'] ?? [])[0] ?? null;
    $heroEnabled = $theme['hero']['enabled'] ?? true;
@endphp

@foreach($sections as $section)
    @if(!($section['enabled'] ?? false))
        @continue
    @endif

    @switch($section['type'] ?? '')
        {{-- ═══ HERO — mirrors HomePage.tsx hero case ═══ --}}
        @case('hero')
            @if($heroEnabled && $slide)
                @php
                    $bgImg = $slide['backgroundImage'] ?? '';
                    $align = $slide['contentAlign'] ?? 'left';
                    $alignClass = match($align) {
                        'center' => 'text-center items-center mx-auto',
                        'right' => 'text-right items-end ml-auto',
                        default => 'text-left items-start',
                    };
                @endphp
                <section class="relative bg-secondary"
                    @if($bgImg) style="background-image:url('{{ $bgImg }}');background-size:cover;background-position:center" @endif>
                    @if($bgImg)
                        <div class="absolute inset-0" style="background-color:{{ $slide['overlayColor'] ?? '#000' }};opacity:{{ $slide['overlayOpacity'] ?? 0 }}"></div>
                    @endif
                    <div class="container mx-auto px-4 py-20 md:py-32 relative z-10">
                        <div class="max-w-xl flex flex-col {{ $alignClass }}">
                            <p class="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 font-body">{{ $slide['subtitle'] ?? '' }}</p>
                            <h1 class="text-4xl md:text-6xl font-display font-bold leading-tight mb-6 whitespace-pre-line">{{ $slide['title'] ?? '' }}</h1>
                            <p class="text-muted-foreground mb-8 text-lg font-body">{{ $slide['description'] ?? '' }}</p>
                            <div class="flex gap-3">
                                <a href="{{ $slide['ctaLink'] ?? '/products' }}" class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:opacity-90 transition font-body">
                                    {{ $slide['ctaText'] ?? 'Ver coleção' }}
                                    <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            @endif
            @break

        {{-- ═══ CATEGORIES — mirrors HomePage.tsx categories case ═══ --}}
        @case('categories')
            @if($categories->count())
                <section class="container mx-auto px-4 py-16">
                    @if($section['showTitle'] ?? true)
                        <h2 class="text-2xl font-display font-bold mb-8 text-center">{{ $section['title'] ?? 'Categorias' }}</h2>
                    @endif
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        @foreach($categories as $cat)
                            <a href="{{ route('store.products', ['category' => $cat->slug]) }}"
                               class="group text-center p-6 rounded-xl bg-secondary hover:bg-accent transition-colors">
                                <p class="text-sm font-medium group-hover:text-foreground transition-colors">{{ $cat->name }}</p>
                            </a>
                        @endforeach
                    </div>
                </section>
            @endif
            @break

        {{-- ═══ FEATURED PRODUCTS — mirrors HomePage.tsx featured-products case ═══ --}}
        @case('featured-products')
            @if($featured->count())
                <section class="container mx-auto px-4 py-16">
                    <div class="flex items-center justify-between mb-8">
                        @if($section['showTitle'] ?? true)
                            <h2 class="text-2xl font-display font-bold">{{ $section['title'] ?? 'Destaques' }}</h2>
                        @endif
                        <a href="{{ route('store.products') }}" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 ml-auto">
                            Ver todos
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </a>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-{{ $theme['category']['columnsDesktop'] ?? 4 }} gap-6">
                        @foreach($featured as $product)
                            @include('store.partials.product-card', ['product' => $product])
                        @endforeach
                    </div>
                </section>
            @endif
            @break

        {{-- ═══ BANNER — mirrors HomePage.tsx banner case ═══ --}}
        @case('banner')
            @php
                $bannerSettings = $section['settings'] ?? [];
                $bannerTitle = $bannerSettings['title'] ?? 'Banner';
                $bannerDesc = $bannerSettings['description'] ?? '';
            @endphp
            <section class="container mx-auto px-4 py-8">
                <div class="bg-secondary rounded-2xl p-8 md:p-16 text-center">
                    <h2 class="text-3xl md:text-4xl font-display font-bold mb-4">{{ $bannerTitle }}</h2>
                    <p class="text-muted-foreground mb-6 font-body">{{ $bannerDesc }}</p>
                    <a href="/login" class="inline-block border border-foreground text-foreground px-8 py-3 rounded-full font-medium hover:bg-foreground hover:text-background transition font-body">Criar conta</a>
                </div>
            </section>
            @break

        {{-- ═══ BENEFITS — mirrors HomePage.tsx benefits case ═══ --}}
        @case('benefits')
            <section class="container mx-auto px-4 py-16">
                @if($section['showTitle'] ?? false)
                    <h2 class="text-2xl font-display font-bold mb-8 text-center">{{ $section['title'] ?? 'Benefícios' }}</h2>
                @endif
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    @php
                        $benefits = [
                            ['icon' => '<svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg>', 'label' => 'Frete Grátis', 'desc' => 'Para todo o Brasil'],
                            ['icon' => '<svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>', 'label' => 'Troca Fácil', 'desc' => 'Até 30 dias'],
                            ['icon' => '<svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>', 'label' => 'Compra Segura', 'desc' => '100% protegida'],
                            ['icon' => '<svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>', 'label' => '12x sem juros', 'desc' => 'No cartão de crédito'],
                        ];
                    @endphp
                    @foreach($benefits as $b)
                        <div class="flex flex-col items-center text-center p-6 rounded-xl bg-secondary/50">
                            <div class="p-3 rounded-full bg-foreground/5 mb-3">{!! $b['icon'] !!}</div>
                            <p class="text-sm font-semibold">{{ $b['label'] }}</p>
                            <p class="text-xs text-muted-foreground mt-0.5">{{ $b['desc'] }}</p>
                        </div>
                    @endforeach
                </div>
            </section>
            @break

        {{-- ═══ TRUST BAR — mirrors HomePage.tsx trust-bar case ═══ --}}
        @case('trust-bar')
            <section class="container mx-auto px-4 py-8">
                <div class="flex items-center justify-center gap-10 text-muted-foreground text-sm">
                    <span class="flex items-center gap-2">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                        Compra Segura
                    </span>
                    <span class="flex items-center gap-2">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
                        Dados Protegidos
                    </span>
                    <span class="flex items-center gap-2">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/><path d="M16 6h4v4"/></svg>
                        Entrega Garantida
                    </span>
                </div>
            </section>
            @break

        @default
            @break
    @endswitch
@endforeach

{{-- ═══ COLLECTIONS — mirrors HomePage.tsx collections block ═══ --}}
@foreach($collections as $collection)
    @if($collection->products->count())
        <section class="container mx-auto px-4 py-16">
            <div class="flex items-center justify-between mb-8">
                <h2 class="text-2xl font-display font-bold">{{ $collection->name }}</h2>
                <a href="{{ route('store.products') }}" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 ml-auto">
                    Ver todos
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
            </div>
            <div class="flex gap-4 overflow-x-auto scroll-smooth pb-4 px-8 snap-x snap-mandatory" style="scrollbar-width:none">
                @foreach($collection->products as $product)
                    <div class="min-w-[260px] max-w-[280px] snap-start flex-shrink-0">
                        @include('store.partials.product-card', ['product' => $product])
                    </div>
                @endforeach
            </div>
        </section>
    @endif
@endforeach
@endsection
