{{-- ═══ WishlistPage — exact mirror of src/pages/WishlistPage.tsx ═══ --}}
@extends('layout.store')
@section('title', 'Meus Favoritos')
@section('content')
<div class="container mx-auto px-4 py-20 flex justify-center">
    <div class="w-full max-w-md rounded-lg border bg-background shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 text-center">
            <div class="flex justify-center mb-2">
                <svg class="h-10 w-10 text-muted-foreground" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
            <h1 class="text-2xl font-display font-semibold leading-none tracking-tight">Meus Favoritos</h1>
            <p class="text-sm text-muted-foreground font-body">Seus produtos favoritos aparecerão aqui</p>
        </div>
        <div class="p-6 pt-0">
            @if($items->isEmpty())
                <p class="text-center text-sm text-muted-foreground font-body">
                    Você ainda não adicionou nenhum produto aos favoritos. Navegue pela loja e clique no ❤️ para salvar.
                </p>
            @else
                <div class="grid grid-cols-2 gap-4">
                    @foreach($items as $product)
                        @include('store.partials.product-card', ['product' => $product])
                    @endforeach
                </div>
            @endif
        </div>
    </div>
</div>
@endsection