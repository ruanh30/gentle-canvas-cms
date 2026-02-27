@extends('layout.store')
@section('title', 'Meus Pedidos')
@section('content')
<div class="container mx-auto px-4 py-12 max-w-2xl">
    <a href="{{ route('store.account') }}" class="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">← Voltar</a>
    <h1 class="text-xl font-bold mb-6">Meus Pedidos</h1>
    @if($orders->isEmpty())
        <div class="text-center py-16"><p class="text-gray-500">Nenhum pedido ainda.</p><a href="{{ route('store.products') }}" class="mt-4 inline-block bg-primary text-white px-6 py-2 rounded-lg text-sm">Explorar Produtos</a></div>
    @else
        <div class="space-y-4">
            @foreach($orders as $order)
                <div class="bg-white border border-gray-200 rounded-xl p-5">
                    <div class="flex justify-between items-center mb-3">
                        <span class="font-medium text-sm">{{ $order->order_number }}</span>
                        <span class="text-xs px-2 py-1 rounded-full bg-gray-100">{{ ucfirst($order->status) }}</span>
                    </div>
                    @foreach($order->items as $item)<p class="text-sm text-gray-600">{{ $item->product_name }} x{{ $item->quantity }}</p>@endforeach
                    <div class="mt-3 pt-3 border-t flex justify-between"><span class="text-xs text-gray-400">{{ $order->created_at->format('d/m/Y') }}</span><span class="font-bold text-sm">R$ {{ number_format($order->total, 2, ',', '.') }}</span></div>
                </div>
            @endforeach
        </div>
        <div class="mt-6">{{ $orders->links() }}</div>
    @endif
</div>
@endsection
