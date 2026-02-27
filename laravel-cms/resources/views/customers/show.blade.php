@extends('layout.app')
@section('title', $customer->name)
@section('content')
<a href="{{ route('admin.customers.index') }}" class="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">← Voltar</a>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div class="bg-white rounded-xl border border-gray-200 p-6">
        <h3 class="font-semibold mb-3">Dados</h3>
        <p class="text-sm"><strong>Nome:</strong> {{ $customer->name }}</p>
        <p class="text-sm"><strong>E-mail:</strong> {{ $customer->email }}</p>
        <p class="text-sm"><strong>Telefone:</strong> {{ $customer->phone ?? '—' }}</p>
        <p class="text-sm"><strong>Desde:</strong> {{ $customer->created_at->format('d/m/Y') }}</p>
    </div>
    <div class="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
        <h3 class="font-semibold mb-3">Pedidos ({{ $customer->orders->count() }})</h3>
        @if($customer->orders->isEmpty())
            <p class="text-sm text-gray-500">Nenhum pedido.</p>
        @else
            <div class="space-y-2">
                @foreach($customer->orders as $order)
                    <div class="flex justify-between items-center py-2 border-b border-gray-100">
                        <span class="text-sm font-medium">{{ $order->order_number }}</span>
                        <span class="text-sm">R$ {{ number_format($order->total, 2, ',', '.') }}</span>
                        <span class="text-xs px-2 py-0.5 rounded-full bg-gray-100">{{ $order->status }}</span>
                    </div>
                @endforeach
            </div>
        @endif
    </div>
</div>
@endsection
