@extends('layout.app')
@section('title', 'Editar Categoria')
@section('content')
<div class="max-w-xl">
    <a href="{{ route('admin.categories.index') }}" class="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">← Voltar</a>
    <form action="{{ route('admin.categories.update', $category) }}" method="POST" class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        @csrf @method('PUT')
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
            <input type="text" name="name" value="{{ old('name', $category->name) }}" required class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none">
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea name="description" rows="3" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none">{{ old('description', $category->description) }}</textarea>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Categoria Pai</label>
            <select name="parent_id" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm">
                <option value="">Nenhuma (raiz)</option>
                @foreach($parents as $p)
                    <option value="{{ $p->id }}" {{ old('parent_id', $category->parent_id) == $p->id ? 'selected' : '' }}>{{ $p->name }}</option>
                @endforeach
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Ordem</label>
            <input type="number" name="sort_order" value="{{ old('sort_order', $category->sort_order) }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm">
        </div>
        <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" name="is_active" value="1" {{ old('is_active', $category->is_active) ? 'checked' : '' }} class="rounded border-gray-300">
            Ativa
        </label>
        <button type="submit" class="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">Salvar</button>
    </form>
</div>
@endsection
