@extends('layout.store')
@section('title', 'Favoritos')
@section('content')
<div class="container mx-auto px-4 py-12 max-w-3xl">
    <a href="{{ route('store.account') }}" class="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">← Voltar</a>
    <h1 class="text-xl font-bold mb-6">Meus Favoritos</h1>
    @if($items->isEmpty())
        <div class="text-center py-16"><p class="text-gray-500">Nenhum favorito ainda.</p><a href="{{ route('store.products') }}" class="mt-4 inline-block bg-primary text-white px-6 py-2 rounded-lg text-sm">Explorar Produtos</a></div>
    @else
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
            @foreach($items as $product)
                @include('store.partials.product-card', ['product' => $product])
            @endforeach
        </div>
    @endif
</div>
@endsection
