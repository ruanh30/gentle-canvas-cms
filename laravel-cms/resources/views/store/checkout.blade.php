@extends('layout.store')
@section('title', 'Checkout')
@section('content')
<div class="container mx-auto px-4 py-12 max-w-3xl">
    <h1 class="text-2xl font-bold mb-8">Finalizar Compra</h1>
    <form action="{{ route('store.checkout.process') }}" method="POST" class="space-y-6">
        @csrf
        <div class="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <h2 class="font-semibold">Dados Pessoais</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label class="block text-sm mb-1">Nome *</label><input type="text" name="customer_name" value="{{ old('customer_name', auth()->user()->name ?? '') }}" required class="w-full px-4 py-2 border rounded-lg text-sm"></div>
                <div><label class="block text-sm mb-1">E-mail *</label><input type="email" name="customer_email" value="{{ old('customer_email', auth()->user()->email ?? '') }}" required class="w-full px-4 py-2 border rounded-lg text-sm"></div>
                <div><label class="block text-sm mb-1">Telefone</label><input type="text" name="customer_phone" value="{{ old('customer_phone') }}" class="w-full px-4 py-2 border rounded-lg text-sm"></div>
            </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <h2 class="font-semibold">Endereço de Entrega</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2"><label class="block text-sm mb-1">Rua *</label><input type="text" name="address_street" value="{{ old('address_street') }}" required class="w-full px-4 py-2 border rounded-lg text-sm"></div>
                <div><label class="block text-sm mb-1">Número *</label><input type="text" name="address_number" value="{{ old('address_number') }}" required class="w-full px-4 py-2 border rounded-lg text-sm"></div>
                <div><label class="block text-sm mb-1">Complemento</label><input type="text" name="address_complement" value="{{ old('address_complement') }}" class="w-full px-4 py-2 border rounded-lg text-sm"></div>
                <div><label class="block text-sm mb-1">Bairro *</label><input type="text" name="address_neighborhood" value="{{ old('address_neighborhood') }}" required class="w-full px-4 py-2 border rounded-lg text-sm"></div>
                <div><label class="block text-sm mb-1">Cidade *</label><input type="text" name="address_city" value="{{ old('address_city') }}" required class="w-full px-4 py-2 border rounded-lg text-sm"></div>
                <div><label class="block text-sm mb-1">Estado *</label><input type="text" name="address_state" value="{{ old('address_state') }}" required maxlength="2" class="w-full px-4 py-2 border rounded-lg text-sm"></div>
                <div><label class="block text-sm mb-1">CEP *</label><input type="text" name="address_zip" value="{{ old('address_zip') }}" required class="w-full px-4 py-2 border rounded-lg text-sm"></div>
            </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <h2 class="font-semibold">Pagamento</h2>
            <select name="payment_method" required class="w-full px-4 py-2 border rounded-lg text-sm"><option value="pix">PIX</option><option value="boleto">Boleto</option><option value="credit_card">Cartão de Crédito</option></select>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-6">
            <h2 class="font-semibold mb-3">Resumo</h2>
            @foreach($items as $item)<div class="flex justify-between text-sm py-1"><span>{{ $item['product']->name }} x{{ $item['quantity'] }}</span><span>R$ {{ number_format($item['subtotal'], 2, ',', '.') }}</span></div>@endforeach
            <div class="border-t mt-3 pt-3 flex justify-between font-bold"><span>Total</span><span>R$ {{ number_format($total, 2, ',', '.') }}</span></div>
        </div>
        <button type="submit" class="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition text-lg">Confirmar Pedido</button>
    </form>
</div>
@endsection
