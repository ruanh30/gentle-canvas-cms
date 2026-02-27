@extends('layout.store')
@section('title', 'Carrinho')
@section('content')
<div class="container mx-auto px-4 py-12 max-w-3xl">
    <h1 class="text-2xl font-bold mb-8">Carrinho</h1>
    @if(empty($items))
        <div class="text-center py-16"><p class="text-gray-500">Seu carrinho está vazio.</p><a href="{{ route('store.products') }}" class="mt-4 inline-block bg-primary text-white px-6 py-2 rounded-lg text-sm">Ver Produtos</a></div>
    @else
        <div class="space-y-4 mb-8">
            @foreach($items as $item)
                <div class="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
                    @if($item['product']->featured_image)<img src="{{ $item['product']->featured_image }}" class="w-16 h-16 rounded-lg object-cover">@endif
                    <div class="flex-1">
                        <p class="font-medium text-sm">{{ $item['product']->name }}</p>
                        <p class="text-sm text-gray-500">R$ {{ number_format($item['product']->price, 2, ',', '.') }}</p>
                    </div>
                    <form action="{{ route('store.cart.update') }}" method="POST" class="flex items-center gap-2">@csrf<input type="hidden" name="product_id" value="{{ $item['product']->id }}"><input type="number" name="quantity" value="{{ $item['quantity'] }}" min="0" class="w-16 px-2 py-1 border rounded text-sm text-center"><button class="text-primary text-xs">Atualizar</button></form>
                    <p class="font-medium text-sm">R$ {{ number_format($item['subtotal'], 2, ',', '.') }}</p>
                    <form action="{{ route('store.cart.remove') }}" method="POST">@csrf<input type="hidden" name="product_id" value="{{ $item['product']->id }}"><button class="text-red-500 text-sm">✕</button></form>
                </div>
            @endforeach
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between">
            <span class="text-lg font-bold">Total: R$ {{ number_format($total, 2, ',', '.') }}</span>
            <a href="{{ route('store.checkout') }}" class="bg-primary text-white px-8 py-2.5 rounded-lg font-medium hover:bg-blue-700">Finalizar Compra</a>
        </div>
    @endif
</div>
@endsection
