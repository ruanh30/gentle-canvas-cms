@extends('layout.auth')
@section('title', 'Criar Conta')
@section('content')
<div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
    <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Criar Conta</h1>
        <p class="text-sm text-gray-500 mt-1">Preencha seus dados para começar</p>
    </div>
    <form action="{{ route('register') }}" method="POST" class="space-y-4">
        @csrf
        <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
            <input type="text" name="name" id="name" value="{{ old('name') }}" required
                class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition">
        </div>
        <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input type="email" name="email" id="email" value="{{ old('email') }}" required
                class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition">
        </div>
        <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input type="password" name="password" id="password" required
                class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition">
        </div>
        <div>
            <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
            <input type="password" name="password_confirmation" id="password_confirmation" required
                class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition">
        </div>
        <button type="submit" class="w-full bg-primary text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            Criar Conta
        </button>
    </form>
    <p class="text-center text-sm text-gray-500 mt-6">
        Já tem conta? <a href="{{ route('login') }}" class="text-primary hover:underline">Entrar</a>
    </p>
</div>
@endsection
