@extends('layout.store')
@section('title', $product->name)
@section('content')
<div class="container mx-auto px-4 py-12">
    <a href="{{ route('store.products') }}" class="text-sm text-gray-500 hover:text-gray-700 mb-6 inline-block">← Voltar</a>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
            @if($product->featured_image)
                <img src="{{ $product->featured_image }}" alt="{{ $product->name }}" class="w-full rounded-xl">
            @else
                <div class="w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">Sem imagem</div>
            @endif
        </div>
        <div>
            <h1 class="text-3xl font-bold mb-2">{{ $product->name }}</h1>
            @if($product->category)<p class="text-sm text-gray-500 mb-4">{{ $product->category->name }}</p>@endif
            <div class="flex items-center gap-3 mb-6">
                @if($product->compare_price)<span class="text-lg text-gray-400 line-through">R$ {{ number_format($product->compare_price, 2, ',', '.') }}</span>@endif
                <span class="text-3xl font-bold text-primary">R$ {{ number_format($product->price, 2, ',', '.') }}</span>
            </div>
            @if($product->short_description)<p class="text-gray-600 mb-6">{{ $product->short_description }}</p>@endif
            <form action="{{ route('store.cart.add') }}" method="POST" class="flex gap-3 mb-6">
                @csrf
                <input type="hidden" name="product_id" value="{{ $product->id }}">
                <input type="number" name="quantity" value="1" min="1" class="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm text-center">
                <button type="submit" class="bg-primary text-white px-8 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition flex-1">Adicionar ao Carrinho</button>
            </form>
            @auth
                <form action="{{ route('store.wishlist.toggle') }}" method="POST"><@csrf<input type="hidden" name="product_id" value="{{ $product->id }}"><button class="text-sm text-gray-500 hover:text-red-500">❤️ Favoritar</button></form>
            @endauth
            @if($product->sku)<p class="text-xs text-gray-400 mt-4">SKU: {{ $product->sku }}</p>@endif
            @if($product->stock > 0)<p class="text-xs text-green-600 mt-1">{{ $product->stock }} em estoque</p>@else<p class="text-xs text-red-500 mt-1">Esgotado</p>@endif
        </div>
    </div>
    @if($product->description)
        <div class="mt-12 prose max-w-none">{!! nl2br(e($product->description)) !!}</div>
    @endif
    @if($related->count())
        <div class="mt-16">
            <h2 class="text-2xl font-bold mb-6">Produtos Relacionados</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                @foreach($related as $p) @include('store.partials.product-card', ['product' => $p]) @endforeach
            </div>
        </div>
    @endif
</div>
@endsection
