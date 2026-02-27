{{-- ═══ OrderSuccessPage — exact mirror of src/pages/OrderSuccessPage.tsx ═══ --}}
@extends('layout.store')
@section('title', 'Pedido Realizado')
@section('content')
<div class="container mx-auto px-4 py-20 text-center max-w-md">
    <svg class="h-16 w-16 mx-auto text-green-600 mb-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
    <h1 class="text-3xl font-display font-bold mb-3">Pedido realizado!</h1>
    <p class="text-muted-foreground mb-8 font-body">
        Obrigado pela sua compra. Você receberá um e-mail com os detalhes do pedido.
    </p>
    <div class="flex flex-col gap-3">
        <a href="{{ route('store.products') }}" class="w-full inline-flex items-center justify-center rounded-full px-8 py-2.5 bg-foreground text-background text-sm font-medium font-body hover:opacity-90 transition">Continuar comprando</a>
        <a href="{{ route('store.home') }}" class="w-full inline-flex items-center justify-center rounded-full px-8 py-2.5 border border-border bg-background text-foreground text-sm font-medium font-body hover:bg-secondary transition">Voltar ao início</a>
    </div>
</div>
@endsection