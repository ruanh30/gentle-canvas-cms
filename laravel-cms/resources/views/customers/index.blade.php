@extends('layout.app')
@section('title', 'Clientes')
@section('content')
<div class="mb-6">
    <form action="{{ route('admin.customers.index') }}" method="GET" class="flex gap-3">
        <input type="text" name="search" value="{{ request('search') }}" placeholder="Buscar cliente..." class="px-4 py-2 border border-gray-200 rounded-lg text-sm w-64">
        <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">Buscar</button>
    </form>
</div>
<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <table class="w-full">
        <thead class="bg-gray-50 border-b"><tr>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Nome</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">E-mail</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Pedidos</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Desde</th>
            <th class="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Ações</th>
        </tr></thead>
        <tbody class="divide-y divide-gray-100">
            @forelse($customers as $c)
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 text-sm font-medium">{{ $c->name }}</td>
                    <td class="px-6 py-4 text-sm text-gray-500">{{ $c->email }}</td>
                    <td class="px-6 py-4 text-sm">{{ $c->orders_count }}</td>
                    <td class="px-6 py-4 text-sm text-gray-500">{{ $c->created_at->format('d/m/Y') }}</td>
                    <td class="px-6 py-4 text-right">
                        <a href="{{ route('admin.customers.show', $c) }}" class="text-primary text-sm hover:underline mr-3">Ver</a>
                        <form action="{{ route('admin.customers.destroy', $c) }}" method="POST" class="inline" onsubmit="return confirm('Excluir?')">
                            @csrf @method('DELETE')
                            <button class="text-red-600 text-sm hover:underline">Excluir</button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr><td colspan="5" class="px-6 py-12 text-center text-gray-500">Nenhum cliente.</td></tr>
            @endforelse
        </tbody>
    </table>
</div>
<div class="mt-4">{{ $customers->withQueryString()->links() }}</div>
@endsection
