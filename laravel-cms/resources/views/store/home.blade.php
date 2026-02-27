@extends('layout.store')
@section('title', 'Início')
@section('content')
@if($hero['show'] === '1')
<section class="relative bg-slate-900 text-white">
    @if($hero['image'])<img src="{{ $hero['image'] }}" class="absolute inset-0 w-full h-full object-cover opacity-40">@endif
    <div class="relative container mx-auto px-4 py-24 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ $hero['title'] }}</h1>
        <p class="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">{{ $hero['subtitle'] }}</p>
        <a href="{{ $hero['cta_link'] }}" class="inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition">{{ $hero['cta_text'] }}</a>
    </div>
</section>
@endif
@if($categories->count())
<section class="container mx-auto px-4 py-16">
    <h2 class="text-2xl font-bold mb-8">Categorias</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        @foreach($categories as $cat)
            <a href="{{ route('store.products', ['category' => $cat->slug]) }}" class="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition">
                <p class="font-medium text-sm">{{ $cat->name }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ $cat->products_count }} produtos</p>
            </a>
        @endforeach
    </div>
</section>
@endif
@if($featured->count())
<section class="container mx-auto px-4 py-16">
    <h2 class="text-2xl font-bold mb-8">Destaques</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        @foreach($featured as $product)
            @include('store.partials.product-card', ['product' => $product])
        @endforeach
    </div>
</section>
@endif
@if($latest->count())
<section class="container mx-auto px-4 py-16">
    <h2 class="text-2xl font-bold mb-8">Novidades</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        @foreach($latest as $product)
            @include('store.partials.product-card', ['product' => $product])
        @endforeach
    </div>
</section>
@endif
@endsection
