@extends('layout.store')
@section('title', 'Dados Pessoais')
@section('content')
<div class="container mx-auto px-4 py-12 max-w-lg">
    <a href="{{ route('store.account') }}" class="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">← Voltar</a>
    <h1 class="text-xl font-bold mb-6">Dados Pessoais</h1>
    <form action="{{ route('store.personal-data.update') }}" method="POST" class="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        @csrf
        <div><label class="block text-sm mb-1">Nome completo</label><input type="text" name="name" value="{{ old('name', auth()->user()->name) }}" class="w-full px-4 py-2 border rounded-lg text-sm"></div>
        <div><label class="block text-sm mb-1">E-mail</label><input type="email" name="email" value="{{ old('email', auth()->user()->email) }}" class="w-full px-4 py-2 border rounded-lg text-sm"></div>
        <div><label class="block text-sm mb-1">Telefone</label><input type="text" name="phone" value="{{ old('phone', auth()->user()->phone) }}" placeholder="(00) 00000-0000" class="w-full px-4 py-2 border rounded-lg text-sm"></div>
        <button type="submit" class="w-full bg-primary text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">Salvar Alterações</button>
    </form>
</div>
@endsection
