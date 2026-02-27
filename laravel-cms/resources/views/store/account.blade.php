{{-- ═══ AccountPage — exact mirror of src/pages/AccountPage.tsx ═══ --}}
@extends('layout.store')
@section('title', 'Minha Conta')
@section('content')
@php
    $user = auth()->user();
    $initials = collect(explode(' ', $user->name))->map(fn($n) => strtoupper(mb_substr($n, 0, 1)))->join('');
@endphp
<div class="container mx-auto px-4 py-20 flex justify-center">
    <div class="w-full max-w-md rounded-lg border bg-background shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 text-center">
            <div class="flex justify-center mb-4">
                <div class="h-20 w-20 rounded-full bg-primary flex items-center justify-center">
                    <span class="text-2xl font-display text-primary-foreground">{{ $initials }}</span>
                </div>
            </div>
            <h1 class="text-2xl font-display font-semibold leading-none tracking-tight">{{ $user->name }}</h1>
            <p class="text-sm text-muted-foreground font-body">{{ $user->email }}</p>
        </div>
        <div class="p-6 pt-0 space-y-3">
            <a href="{{ route('store.wishlist') }}" class="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors font-body text-sm">
                <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                Meus Favoritos
            </a>
            <a href="{{ route('store.orders') }}" class="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors font-body text-sm">
                <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                Meus Pedidos
            </a>
            <a href="{{ route('store.addresses') }}" class="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors font-body text-sm">
                <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Endereços
            </a>
            <a href="{{ route('store.personal-data') }}" class="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors font-body text-sm">
                <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Dados Pessoais
            </a>
            <div class="pt-3 border-t">
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors font-body text-sm text-red-600 justify-start">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                        Sair da conta
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection