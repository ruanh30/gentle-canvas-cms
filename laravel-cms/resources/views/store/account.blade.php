@extends('layout.store')
@section('title', 'Minha Conta')
@section('content')
<div class="container mx-auto px-4 py-12 max-w-md">
    <div class="bg-white border border-gray-200 rounded-xl p-6 text-center">
        <div class="w-20 h-20 rounded-full bg-primary/10 text-primary text-2xl font-bold flex items-center justify-center mx-auto mb-4">{{ strtoupper(substr(auth()->user()->name,0,2)) }}</div>
        <h1 class="text-xl font-bold">{{ auth()->user()->name }}</h1>
        <p class="text-sm text-gray-500">{{ auth()->user()->email }}</p>
    </div>
    <nav class="mt-6 space-y-2">
        <a href="{{ route('store.wishlist') }}" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-sm">❤️ Meus Favoritos</a>
        <a href="{{ route('store.orders') }}" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-sm">📦 Meus Pedidos</a>
        <a href="{{ route('store.addresses') }}" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-sm">📍 Endereços</a>
        <a href="{{ route('store.personal-data') }}" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-sm">👤 Dados Pessoais</a>
        <form action="{{ route('logout') }}" method="POST" class="border-t border-gray-200 pt-2 mt-2">@csrf<button class="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-sm text-red-600 w-full">🚪 Sair</button></form>
    </nav>
</div>
@endsection
