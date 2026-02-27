@extends('layout.app')
@section('title', 'Novo Depoimento')
@section('content')
<div class="max-w-xl">
    <a href="{{ route('admin.testimonials.index') }}" class="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">← Voltar</a>
    <form action="{{ route('admin.testimonials.store') }}" method="POST" class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        @csrf
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Autor *</label><input type="text" name="author_name" value="{{ old('author_name') }}" required class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Cargo/Função</label><input type="text" name="author_role" value="{{ old('author_role') }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Depoimento *</label><textarea name="content" rows="4" required class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm">{{ old('content') }}</textarea></div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Avaliação (1-5)</label><input type="number" name="rating" value="{{ old('rating', 5) }}" min="1" max="5" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
        <div class="flex gap-4">
            <label class="flex items-center gap-2 text-sm"><input type="checkbox" name="is_featured" value="1" class="rounded border-gray-300">Destaque</label>
            <label class="flex items-center gap-2 text-sm"><input type="checkbox" name="is_active" value="1" checked class="rounded border-gray-300">Ativo</label>
        </div>
        <button type="submit" class="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">Salvar</button>
    </form>
</div>
@endsection
