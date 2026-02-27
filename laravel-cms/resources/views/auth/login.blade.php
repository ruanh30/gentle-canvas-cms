@extends('layout.auth')
@section('title', 'Login')
@section('content')
<div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
    <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Entrar</h1>
        <p class="text-sm text-gray-500 mt-1">Acesse sua conta para continuar</p>
    </div>
    <form action="{{ route('login') }}" method="POST" class="space-y-4">
        @csrf
        <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input type="email" name="email" id="email" value="{{ old('email') }}" required autofocus
                class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition">
        </div>
        <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input type="password" name="password" id="password" required
                class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition">
        </div>
        <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" name="remember" class="rounded border-gray-300">
                Lembrar-me
            </label>
        </div>
        <button type="submit" class="w-full bg-primary text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            Entrar
        </button>
    </form>
    <p class="text-center text-sm text-gray-500 mt-6">
        Não tem conta? <a href="{{ route('register') }}" class="text-primary hover:underline">Criar conta</a>
    </p>
</div>
@endsection
