@extends('layout.store')
@section('title', 'Endereços')
@section('content')
<div class="container mx-auto px-4 py-12 max-w-2xl">
    <a href="{{ route('store.account') }}" class="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">← Voltar</a>
    <div class="flex items-center justify-between mb-6"><h1 class="text-xl font-bold">Endereços</h1></div>
    <form action="{{ route('store.addresses.store') }}" method="POST" class="bg-white border border-gray-200 rounded-xl p-6 space-y-4 mb-6">
        @csrf
        <h2 class="font-semibold text-sm">Novo Endereço</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label class="block text-sm mb-1">Rótulo</label><input type="text" name="label" placeholder="Casa, Trabalho..." class="w-full px-3 py-2 border rounded-lg text-sm"></div>
            <div><label class="block text-sm mb-1">CEP *</label><input type="text" name="zip_code" required class="w-full px-3 py-2 border rounded-lg text-sm"></div>
            <div class="md:col-span-2"><label class="block text-sm mb-1">Rua *</label><input type="text" name="street" required class="w-full px-3 py-2 border rounded-lg text-sm"></div>
            <div><label class="block text-sm mb-1">Número *</label><input type="text" name="number" required class="w-full px-3 py-2 border rounded-lg text-sm"></div>
            <div><label class="block text-sm mb-1">Complemento</label><input type="text" name="complement" class="w-full px-3 py-2 border rounded-lg text-sm"></div>
            <div><label class="block text-sm mb-1">Bairro *</label><input type="text" name="neighborhood" required class="w-full px-3 py-2 border rounded-lg text-sm"></div>
            <div><label class="block text-sm mb-1">Cidade *</label><input type="text" name="city" required class="w-full px-3 py-2 border rounded-lg text-sm"></div>
            <div><label class="block text-sm mb-1">Estado *</label><input type="text" name="state" required maxlength="2" class="w-full px-3 py-2 border rounded-lg text-sm"></div>
        </div>
        <button type="submit" class="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Salvar</button>
    </form>
    @if($addresses->count())
        <div class="space-y-3">
            @foreach($addresses as $addr)
                <div class="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-start">
                    <div>
                        <p class="font-medium text-sm">{{ $addr->label ?? 'Endereço' }} @if($addr->is_default)<span class="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-1">Padrão</span>@endif</p>
                        <p class="text-sm text-gray-600">{{ $addr->street }}, {{ $addr->number }} {{ $addr->complement }}</p>
                        <p class="text-sm text-gray-600">{{ $addr->neighborhood }} - {{ $addr->city }}/{{ $addr->state }} - {{ $addr->zip_code }}</p>
                    </div>
                    <form action="{{ route('store.addresses.destroy', $addr) }}" method="POST" onsubmit="return confirm('Remover?')">@csrf @method('DELETE')<button class="text-red-500 text-sm">Remover</button></form>
                </div>
            @endforeach
        </div>
    @else
        <p class="text-center text-gray-500 py-8">Nenhum endereço salvo.</p>
    @endif
</div>
@endsection
