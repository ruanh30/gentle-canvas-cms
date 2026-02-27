{{-- ═══ AddressesPage — exact mirror of src/pages/AddressesPage.tsx ═══ --}}
@extends('layout.store')
@section('title', 'Endereços')
@section('content')
<div class="container mx-auto px-4 py-20 flex justify-center">
    <div class="w-full max-w-lg rounded-lg border bg-background shadow-sm">
        <div class="p-6">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <a href="{{ route('store.account') }}" class="inline-flex items-center justify-center rounded-md h-10 w-10 border border-input bg-background hover:bg-secondary transition-colors">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                    </a>
                    <h1 class="text-xl font-display font-semibold leading-none tracking-tight">Endereços</h1>
                </div>
                <button onclick="document.getElementById('address-form').classList.toggle('hidden')" class="inline-flex items-center justify-center rounded-md h-9 px-3 text-sm border border-input bg-background hover:bg-secondary transition-colors">
                    <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    Novo
                </button>
            </div>
        </div>
        <div class="p-6 pt-0">
            {{-- Address form (hidden by default) --}}
            <form id="address-form" action="{{ route('store.addresses.store') }}" method="POST" class="hidden space-y-4 mb-6 p-4 border rounded-lg">
                @csrf
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label class="text-sm font-medium leading-none">Rótulo</label><input type="text" name="label" placeholder="Casa, Trabalho..." class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"></div>
                    <div><label class="text-sm font-medium leading-none">CEP</label><input type="text" name="zip_code" required class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"></div>
                    <div class="md:col-span-2"><label class="text-sm font-medium leading-none">Rua</label><input type="text" name="street" required class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"></div>
                    <div><label class="text-sm font-medium leading-none">Número</label><input type="text" name="number" required class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"></div>
                    <div><label class="text-sm font-medium leading-none">Complemento</label><input type="text" name="complement" class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"></div>
                    <div><label class="text-sm font-medium leading-none">Bairro</label><input type="text" name="neighborhood" required class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"></div>
                    <div><label class="text-sm font-medium leading-none">Cidade</label><input type="text" name="city" required class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"></div>
                    <div><label class="text-sm font-medium leading-none">Estado</label><input type="text" name="state" required maxlength="2" class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"></div>
                </div>
                <button type="submit" class="inline-flex items-center justify-center rounded-md h-10 px-4 py-2 bg-foreground text-background text-sm font-medium hover:opacity-90 transition">Salvar</button>
            </form>

            @if(!isset($addresses) || $addresses->isEmpty())
                <div class="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div class="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                        <svg class="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div>
                        <p class="font-body text-foreground font-medium">Nenhum endereço salvo</p>
                        <p class="font-body text-sm text-muted-foreground mt-1">Adicione um endereço para agilizar suas compras.</p>
                    </div>
                </div>
            @else
                <div class="space-y-3">
                    @foreach($addresses as $addr)
                        <div class="border rounded-lg p-4 flex justify-between items-start">
                            <div>
                                <p class="font-medium text-sm">{{ $addr->label ?? 'Endereço' }} @if($addr->is_default)<span class="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-1">Padrão</span>@endif</p>
                                <p class="text-sm text-muted-foreground">{{ $addr->street }}, {{ $addr->number }} {{ $addr->complement }}</p>
                                <p class="text-sm text-muted-foreground">{{ $addr->neighborhood }} - {{ $addr->city }}/{{ $addr->state }} - {{ $addr->zip_code }}</p>
                            </div>
                            <form action="{{ route('store.addresses.destroy', $addr) }}" method="POST" onsubmit="return confirm('Remover?')">@csrf @method('DELETE')<button class="text-red-500 text-sm">Remover</button></form>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </div>
</div>
@endsection