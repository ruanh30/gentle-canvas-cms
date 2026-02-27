@extends('layout.app')
@section('title', 'Menus')
@section('content')
<div class="flex items-center justify-between mb-6">
    <h3 class="text-lg font-semibold">{{ $menus->total() }} menus</h3>
    <a href="{{ route('admin.menus.create') }}" class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">+ Novo Menu</a>
</div>
<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <table class="w-full"><thead class="bg-gray-50 border-b"><tr>
        <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Nome</th>
        <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Localização</th>
        <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Itens</th>
        <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
        <th class="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Ações</th>
    </tr></thead>
    <tbody class="divide-y divide-gray-100">
        @forelse($menus as $menu)
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm font-medium">{{ $menu->name }}</td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ $menu->location ?? '—' }}</td>
                <td class="px-6 py-4 text-sm">{{ $menu->all_items_count }}</td>
                <td class="px-6 py-4"><span class="text-xs px-2 py-1 rounded-full {{ $menu->is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600' }}">{{ $menu->is_active ? 'Ativo' : 'Inativo' }}</span></td>
                <td class="px-6 py-4 text-right">
                    <a href="{{ route('admin.menus.edit', $menu) }}" class="text-primary text-sm hover:underline mr-3">Editar</a>
                    <form action="{{ route('admin.menus.destroy', $menu) }}" method="POST" class="inline" onsubmit="return confirm('Excluir?')">@csrf @method('DELETE')<button class="text-red-600 text-sm hover:underline">Excluir</button></form>
                </td>
            </tr>
        @empty
            <tr><td colspan="5" class="px-6 py-12 text-center text-gray-500">Nenhum menu.</td></tr>
        @endforelse
    </tbody></table>
</div>
@endsection
