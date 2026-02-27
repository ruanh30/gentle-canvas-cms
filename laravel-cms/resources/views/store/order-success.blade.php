@extends('layout.store')
@section('title', 'Pedido Confirmado')
@section('content')
<div class="container mx-auto px-4 py-20 text-center max-w-lg">
    <div class="text-6xl mb-6">✅</div>
    <h1 class="text-3xl font-bold mb-3">Pedido Confirmado!</h1>
    <p class="text-gray-600 mb-2">Número: <strong>{{ $order->order_number }}</strong></p>
    <p class="text-gray-500 text-sm mb-8">Você receberá um e-mail com os detalhes do pedido.</p>
    <div class="flex gap-3 justify-center">
        <a href="{{ route('store.home') }}" class="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700">Voltar à Loja</a>
        @auth<a href="{{ route('store.orders') }}" class="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-300">Meus Pedidos</a>@endauth
    </div>
</div>
@endsection
