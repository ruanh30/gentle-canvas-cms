{{-- ═══ CartPage — exact mirror of src/pages/CartPage.tsx ═══ --}}
@extends('layout.store')
@section('title', 'Carrinho')
@section('content')
@php
    $subtotal = collect($items)->sum('subtotal');
    $shipping = $subtotal >= 299 ? 0 : 15.90;
    $total = $subtotal + $shipping;
    $itemCount = collect($items)->sum('quantity');
@endphp

@if(empty($items))
    <div class="container mx-auto px-4 py-20 text-center">
        <svg class="h-16 w-16 mx-auto text-muted-foreground mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <h1 class="text-2xl font-display font-bold mb-2">Carrinho vazio</h1>
        <p class="text-muted-foreground mb-6 font-body">Adicione produtos para continuar.</p>
        <a href="{{ route('store.products') }}" class="inline-flex items-center justify-center rounded-full px-8 py-2.5 bg-foreground text-background text-sm font-medium font-body hover:opacity-90 transition">Explorar produtos</a>
    </div>
@else
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-display font-bold mb-8">Carrinho ({{ $itemCount }})</h1>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div class="lg:col-span-2 space-y-4">
                @foreach($items as $item)
                    <div class="flex gap-4 p-4 border rounded-xl">
                        <a href="{{ route('store.product', $item['product']->slug) }}" class="shrink-0">
                            <img src="{{ $item['product']->featured_image ?? '/placeholder.svg' }}" alt="{{ $item['product']->name }}" class="w-24 h-28 object-cover rounded-lg">
                        </a>
                        <div class="flex-1 min-w-0">
                            <div class="flex justify-between items-start">
                                <div>
                                    <a href="{{ route('store.product', $item['product']->slug) }}" class="font-medium text-sm hover:underline line-clamp-1">{{ $item['product']->name }}</a>
                                </div>
                                <form action="{{ route('store.cart.remove') }}" method="POST">
                                    @csrf
                                    <input type="hidden" name="product_id" value="{{ $item['product']->id }}">
                                    <button type="submit" class="text-muted-foreground hover:text-foreground p-1">
                                        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                    </button>
                                </form>
                            </div>
                            <div class="flex items-center justify-between mt-3">
                                <form action="{{ route('store.cart.update') }}" method="POST" class="flex items-center border rounded-lg">
                                    @csrf
                                    <input type="hidden" name="product_id" value="{{ $item['product']->id }}">
                                    <input type="hidden" name="action" value="decrease">
                                    <button type="submit" class="p-2 hover:bg-secondary transition-colors">
                                        <svg class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>
                                    </button>
                                </form>
                                <span class="px-3 text-sm">{{ $item['quantity'] }}</span>
                                <form action="{{ route('store.cart.update') }}" method="POST" class="flex items-center">
                                    @csrf
                                    <input type="hidden" name="product_id" value="{{ $item['product']->id }}">
                                    <input type="hidden" name="action" value="increase">
                                    <button type="submit" class="p-2 hover:bg-secondary transition-colors border rounded-r-lg">
                                        <svg class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                                    </button>
                                </form>
                                <span class="font-semibold text-sm ml-auto">R$ {{ number_format($item['subtotal'], 2, ',', '.') }}</span>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>

            <div class="lg:col-span-1">
                <div class="border rounded-xl p-6 sticky top-24 space-y-4">
                    <h2 class="font-semibold text-lg">Resumo</h2>
                    <div class="space-y-2 text-sm font-body">
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">Subtotal</span>
                            <span>R$ {{ number_format($subtotal, 2, ',', '.') }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">Frete</span>
                            <span>{{ $shipping === 0 ? 'Grátis' : 'R$ ' . number_format($shipping, 2, ',', '.') }}</span>
                        </div>
                        <div class="border-t pt-2 flex justify-between font-semibold text-base">
                            <span>Total</span>
                            <span>R$ {{ number_format($total, 2, ',', '.') }}</span>
                        </div>
                    </div>
                    <a href="{{ route('store.checkout') }}" class="w-full inline-flex items-center justify-center gap-2 rounded-lg font-body h-11 px-8 text-white text-sm font-medium" style="background-color:hsl(0, 72%, 51%)">
                        Finalizar Compra
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </a>
                    <a href="{{ route('store.products') }}" class="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                        Continuar comprando
                    </a>
                </div>
            </div>
        </div>
    </div>
@endif
@endsection