{{-- ═══ OrdersPage — exact mirror of src/pages/OrdersPage.tsx ═══ --}}
@extends('layout.store')
@section('title', 'Meus Pedidos')
@section('content')
<div class="container mx-auto px-4 py-20 flex justify-center">
    <div class="w-full max-w-lg rounded-lg border bg-background shadow-sm">
        <div class="p-6">
            <div class="flex items-center gap-3">
                <a href="{{ route('store.account') }}" class="inline-flex items-center justify-center rounded-md h-10 w-10 border border-input bg-background hover:bg-secondary transition-colors">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                </a>
                <h1 class="text-xl font-display font-semibold leading-none tracking-tight">Meus Pedidos</h1>
            </div>
        </div>
        <div class="p-6 pt-0">
            @if($orders->isEmpty())
                <div class="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div class="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                        <svg class="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                    </div>
                    <div>
                        <p class="font-body text-foreground font-medium">Nenhum pedido ainda</p>
                        <p class="font-body text-sm text-muted-foreground mt-1">Quando você fizer uma compra, seus pedidos aparecerão aqui.</p>
                    </div>
                    <a href="{{ route('store.products') }}" class="mt-2 inline-flex items-center justify-center rounded-md h-10 px-4 py-2 bg-foreground text-background text-sm font-medium hover:opacity-90 transition gap-2">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                        Explorar Produtos
                    </a>
                </div>
            @else
                <div class="space-y-4">
                    @foreach($orders as $order)
                        <div class="border rounded-lg p-4">
                            <div class="flex justify-between items-center mb-2">
                                <span class="font-medium text-sm">{{ $order->order_number }}</span>
                                <span class="text-xs px-2 py-1 rounded-full bg-secondary">{{ ucfirst($order->status) }}</span>
                            </div>
                            @foreach($order->items as $item)
                                <p class="text-sm text-muted-foreground">{{ $item->product_name }} x{{ $item->quantity }}</p>
                            @endforeach
                            <div class="mt-3 pt-3 border-t flex justify-between">
                                <span class="text-xs text-muted-foreground">{{ $order->created_at->format('d/m/Y') }}</span>
                                <span class="font-semibold text-sm">R$ {{ number_format($order->total, 2, ',', '.') }}</span>
                            </div>
                        </div>
                    @endforeach
                </div>
                <div class="mt-6">{{ $orders->links() }}</div>
            @endif
        </div>
    </div>
</div>
@endsection