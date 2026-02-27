@extends('layout.app')
@section('title', 'Pedido ' . $order->order_number)
@section('content')
<a href="{{ route('admin.orders.index') }}" class="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">← Voltar</a>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-xl border border-gray-200 p-6">
            <h3 class="font-semibold mb-4">Itens do Pedido</h3>
            <table class="w-full">
                <thead><tr class="border-b"><th class="text-left py-2 text-sm text-gray-500">Produto</th><th class="text-right py-2 text-sm text-gray-500">Qtd</th><th class="text-right py-2 text-sm text-gray-500">Preço</th><th class="text-right py-2 text-sm text-gray-500">Subtotal</th></tr></thead>
                <tbody>
                    @foreach($order->items as $item)
                        <tr class="border-b border-gray-100">
                            <td class="py-3 text-sm">{{ $item->product_name }}</td>
                            <td class="py-3 text-sm text-right">{{ $item->quantity }}</td>
                            <td class="py-3 text-sm text-right">R$ {{ number_format($item->price, 2, ',', '.') }}</td>
                            <td class="py-3 text-sm text-right font-medium">R$ {{ number_format($item->price * $item->quantity, 2, ',', '.') }}</td>
                        </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr><td colspan="3" class="py-3 text-right font-semibold">Total:</td><td class="py-3 text-right font-bold text-lg">R$ {{ number_format($order->total, 2, ',', '.') }}</td></tr>
                </tfoot>
            </table>
        </div>
        @if($order->shipping_address)
            <div class="bg-white rounded-xl border border-gray-200 p-6">
                <h3 class="font-semibold mb-3">Endereço de Entrega</h3>
                @php $addr = $order->shipping_address; @endphp
                <p class="text-sm text-gray-600">{{ $addr['street'] ?? '' }}, {{ $addr['number'] ?? '' }} {{ $addr['complement'] ?? '' }}</p>
                <p class="text-sm text-gray-600">{{ $addr['neighborhood'] ?? '' }} - {{ $addr['city'] ?? '' }}/{{ $addr['state'] ?? '' }}</p>
                <p class="text-sm text-gray-600">CEP: {{ $addr['zip_code'] ?? '' }}</p>
            </div>
        @endif
    </div>
    <div class="space-y-6">
        <div class="bg-white rounded-xl border border-gray-200 p-6">
            <h3 class="font-semibold mb-3">Cliente</h3>
            <p class="text-sm">{{ $order->customer_name }}</p>
            <p class="text-sm text-gray-500">{{ $order->customer_email }}</p>
            <p class="text-sm text-gray-500">{{ $order->customer_phone ?? '—' }}</p>
        </div>
        <div class="bg-white rounded-xl border border-gray-200 p-6">
            <h3 class="font-semibold mb-3">Atualizar Status</h3>
            <form action="{{ route('admin.orders.update', $order) }}" method="POST" class="space-y-3">
                @csrf @method('PUT')
                <select name="status" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                    @foreach(['pending','confirmed','processing','shipped','delivered','cancelled','refunded'] as $s)
                        <option value="{{ $s }}" {{ $order->status === $s ? 'selected' : '' }}>{{ ucfirst($s) }}</option>
                    @endforeach
                </select>
                <select name="payment_status" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                    @foreach(['pending','paid','refunded'] as $ps)
                        <option value="{{ $ps }}" {{ $order->payment_status === $ps ? 'selected' : '' }}>{{ ucfirst($ps) }}</option>
                    @endforeach
                </select>
                <textarea name="notes" rows="2" placeholder="Observações..." class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">{{ $order->notes }}</textarea>
                <button class="w-full bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Atualizar</button>
            </form>
        </div>
    </div>
</div>
@endsection
