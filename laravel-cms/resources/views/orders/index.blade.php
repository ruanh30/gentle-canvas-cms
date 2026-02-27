@extends('layout.app')
@section('title', 'Pedidos')
@section('content')
<div class="flex items-center justify-between mb-6">
    <form action="{{ route('admin.orders.index') }}" method="GET" class="flex gap-3">
        <input type="text" name="search" value="{{ request('search') }}" placeholder="Buscar pedido..." class="px-4 py-2 border border-gray-200 rounded-lg text-sm w-64">
        <select name="status" class="px-3 py-2 border border-gray-200 rounded-lg text-sm">
            <option value="">Todos</option>
            @foreach(['pending','confirmed','processing','shipped','delivered','cancelled','refunded'] as $s)
                <option value="{{ $s }}" {{ request('status') === $s ? 'selected' : '' }}>{{ ucfirst($s) }}</option>
            @endforeach
        </select>
        <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">Filtrar</button>
    </form>
</div>
<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
                <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Pedido</th>
                <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Cliente</th>
                <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Total</th>
                <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Data</th>
                <th class="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Ações</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
            @forelse($orders as $order)
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 text-sm font-medium">{{ $order->order_number }}</td>
                    <td class="px-6 py-4 text-sm">{{ $order->customer_name }}</td>
                    <td class="px-6 py-4 text-sm font-medium">R$ {{ number_format($order->total, 2, ',', '.') }}</td>
                    <td class="px-6 py-4">
                        @php
                            $colors = ['pending'=>'yellow','confirmed'=>'blue','processing'=>'indigo','shipped'=>'purple','delivered'=>'green','cancelled'=>'red','refunded'=>'gray'];
                            $c = $colors[$order->status] ?? 'gray';
                        @endphp
                        <span class="text-xs px-2 py-1 rounded-full bg-{{ $c }}-100 text-{{ $c }}-700">{{ ucfirst($order->status) }}</span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">{{ $order->created_at->format('d/m/Y H:i') }}</td>
                    <td class="px-6 py-4 text-right">
                        <a href="{{ route('admin.orders.show', $order) }}" class="text-primary text-sm hover:underline mr-3">Ver</a>
                        <form action="{{ route('admin.orders.destroy', $order) }}" method="POST" class="inline" onsubmit="return confirm('Excluir pedido?')">
                            @csrf @method('DELETE')
                            <button class="text-red-600 text-sm hover:underline">Excluir</button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr><td colspan="6" class="px-6 py-12 text-center text-gray-500">Nenhum pedido.</td></tr>
            @endforelse
        </tbody>
    </table>
</div>
<div class="mt-4">{{ $orders->withQueryString()->links() }}</div>
@endsection
