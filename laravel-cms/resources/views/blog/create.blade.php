@extends('layout.app')
@section('title', 'Novo Post')
@section('content')
<div class="max-w-3xl">
    <a href="{{ route('admin.blog.index') }}" class="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">← Voltar</a>
    <form action="{{ route('admin.blog.store') }}" method="POST" class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        @csrf
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Título *</label><input type="text" name="title" value="{{ old('title') }}" required class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Resumo</label><textarea name="excerpt" rows="2" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm">{{ old('excerpt') }}</textarea></div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label><textarea name="content" rows="10" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-mono">{{ old('content') }}</textarea></div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Imagem destaque (URL)</label><input type="text" name="featured_image" value="{{ old('featured_image') }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
        <label class="flex items-center gap-2 text-sm"><input type="checkbox" name="is_published" value="1" {{ old('is_published') ? 'checked' : '' }} class="rounded border-gray-300">Publicar</label>
        <button type="submit" class="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">Salvar</button>
    </form>
</div>
@endsection
