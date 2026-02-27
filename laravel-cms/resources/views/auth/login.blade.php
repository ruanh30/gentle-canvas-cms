{{-- ═══ LoginPage — exact mirror of src/pages/LoginPage.tsx ═══ --}}
{{-- Uses store layout like React (StoreLayout wraps LoginPage) --}}
@extends('layout.store')
@section('title', 'Entrar')
@section('content')
<div class="container mx-auto px-4 py-20 flex justify-center">
    <div class="w-full max-w-md rounded-lg border bg-background shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 text-center">
            <h1 class="text-2xl font-display font-semibold leading-none tracking-tight" id="form-title">Entrar</h1>
            <p class="text-sm text-muted-foreground font-body" id="form-desc">Entre com seu e-mail e senha</p>
        </div>
        <div class="p-6 pt-0">
            <form action="{{ route('login') }}" method="POST" class="space-y-4">
                @csrf
                <div id="name-field" style="display:none">
                    <label class="text-sm font-medium leading-none">Nome</label>
                    <input type="text" name="name" placeholder="Seu nome" class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                </div>
                <div>
                    <label class="text-sm font-medium leading-none">E-mail</label>
                    <input type="email" name="email" required value="{{ old('email') }}" placeholder="email@exemplo.com" class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                </div>
                <div>
                    <label class="text-sm font-medium leading-none">Senha</label>
                    <input type="password" name="password" required placeholder="••••••••" class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                </div>
                <button type="submit" class="w-full inline-flex items-center justify-center rounded-lg h-10 px-4 py-2 bg-foreground text-background text-sm font-medium font-body hover:opacity-90 transition" id="submit-btn">Entrar</button>
            </form>
            @if($errors->any())
                <div class="mt-4 p-3 bg-red-100 text-red-800 rounded-lg text-xs">{{ $errors->first() }}</div>
            @endif
            <div class="mt-4 text-center">
                <a href="{{ route('register') }}" class="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                    Não tem conta? Cadastrar
                </a>
            </div>
            <div class="mt-4 p-3 bg-secondary rounded-lg text-xs text-muted-foreground font-body text-center">
                Admin: admin@modastore.com (qualquer senha)
            </div>
        </div>
    </div>
</div>
@endsection