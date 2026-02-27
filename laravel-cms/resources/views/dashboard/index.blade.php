@extends('layout.app')
@section('title', 'Dashboard')
@section('content')
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    <div class="bg-white rounded-xl border border-gray-200 p-6">
        <p class="text-sm text-gray-500">Produtos</p>
        <p class="text-3xl font-bold mt-1">{{ $stats['total_products'] }}</p>
    </div>
    <div class="bg-white rounded-xl border border-gray-200 p-6">
        <p class="text-sm text-gray-500">Pedidos</p>
        <p class="text-3xl font-bold mt-1">{{ $stats['total_orders'] }}</p>
        @if($stats['pending_orders'] > 0)
            <span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full mt-2 inline-block">{{ $stats['pending_orders'] }} pendentes</span>
        @endif
    </div>
    <div class="bg-white rounded-xl border border-gray-200 p-6">
        <p class="text-sm text-gray-500">Clientes</p>
        <p class="text-3xl font-bold mt-1">{{ $stats['total_customers'] }}</p>
    </div>
    <div class="bg-white rounded-xl border border-gray-200 p-6">
        <p class="text-sm text-gray-500">Receita Total</p>
        <p class="text-3xl font-bold mt-1 text-green-600">R$ {{ number_format($stats['total_revenue'], 2, ',', '.') }}</p>
    </div>
    <div class="bg-white rounded-xl border border-gray-200 p-6">
        <p class="text-sm text-gray-500">Posts do Blog</p>
        <p class="text-3xl font-bold mt-1">{{ $stats['total_posts'] }}</p>
    </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="bg-white rounded-xl border border-gray-200 p-6">
        <h3 class="font-semibold mb-4">Pedidos Recentes</h3>
        @if($recent_orders->isEmpty())
            <p class="text-sm text-gray-500">Nenhum pedido ainda.</p>
        @else
            <div class="space-y-3">
                @foreach($recent_orders as $order)
                    <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div>
                            <p class="text-sm font-medium">{{ $order->order_number }}</p>
                            <p class="text-xs text-gray-500">{{ $order->customer_name }}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-sm font-medium">R$ {{ number_format($order->total, 2, ',', '.') }}</p>
                            <span class="text-xs px-2 py-0.5 rounded-full {{ $order->status === 'delivered' ? 'bg-green-100 text-green-700' : ($order->status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700') }}">
                                {{ ucfirst($order->status) }}
                            </span>
                        </div>
                    </div>
                @endforeach
            </div>
        @endif
    </div>

    <div class="bg-white rounded-xl border border-gray-200 p-6">
        <h3 class="font-semibold mb-4">Produtos Recentes</h3>
        @if($recent_products->isEmpty())
            <p class="text-sm text-gray-500">Nenhum produto ainda.</p>
        @else
            <div class="space-y-3">
                @foreach($recent_products as $product)
                    <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div>
                            <p class="text-sm font-medium">{{ $product->name }}</p>
                            <p class="text-xs text-gray-500">{{ $product->sku ?? 'Sem SKU' }}</p>
                        </div>
                        <p class="text-sm font-medium">R$ {{ number_format($product->price, 2, ',', '.') }}</p>
                    </div>
                @endforeach
            </div>
        @endif
    </div>
</div>
@endsection
