@extends('layout.app')
@section('title', 'Produtos')
@section('content')
<div class="flex items-center justify-between mb-6">
    <div>
        <form action="{{ route('admin.products.index') }}" method="GET" class="flex gap-3">
            <input type="text" name="search" value="{{ request('search') }}" placeholder="Buscar produtos..." class="px-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary outline-none">
            <select name="category" class="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option value="">Todas categorias</option>
                @foreach($categories as $cat)
                    <option value="{{ $cat->id }}" {{ request('category') == $cat->id ? 'selected' : '' }}>{{ $cat->name }}</option>
                @endforeach
            </select>
            <select name="status" class="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option value="">Todos</option>
                <option value="published" {{ request('status') === 'published' ? 'selected' : '' }}>Publicados</option>
                <option value="draft" {{ request('status') === 'draft' ? 'selected' : '' }}>Rascunho</option>
            </select>
            <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300">Filtrar</button>
        </form>
    </div>
    <a href="{{ route('admin.products.create') }}" class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">+ Novo Produto</a>
</div>

<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
                <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Produto</th>
                <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Categoria</th>
                <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Preço</th>
                <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Estoque</th>
                <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th class="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Ações</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
            @forelse($products as $product)
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-3">
                            @if($product->featured_image)
                                <img src="{{ $product->featured_image }}" class="w-10 h-10 rounded-lg object-cover">
                            @else
                                <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">IMG</div>
                            @endif
                            <div>
                                <p class="text-sm font-medium">{{ $product->name }}</p>
                                <p class="text-xs text-gray-500">{{ $product->sku ?? '' }}</p>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">{{ $product->category->name ?? '—' }}</td>
                    <td class="px-6 py-4 text-sm font-medium">R$ {{ number_format($product->price, 2, ',', '.') }}</td>
                    <td class="px-6 py-4 text-sm">{{ $product->stock }}</td>
                    <td class="px-6 py-4">
                        <span class="text-xs px-2 py-1 rounded-full {{ $product->is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600' }}">
                            {{ $product->is_published ? 'Publicado' : 'Rascunho' }}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-right">
                        <a href="{{ route('admin.products.edit', $product) }}" class="text-primary text-sm hover:underline mr-3">Editar</a>
                        <form action="{{ route('admin.products.destroy', $product) }}" method="POST" class="inline" onsubmit="return confirm('Excluir este produto?')">
                            @csrf @method('DELETE')
                            <button class="text-red-600 text-sm hover:underline">Excluir</button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr><td colspan="6" class="px-6 py-12 text-center text-gray-500">Nenhum produto encontrado.</td></tr>
            @endforelse
        </tbody>
    </table>
</div>
<div class="mt-4">{{ $products->withQueryString()->links() }}</div>
@endsection
