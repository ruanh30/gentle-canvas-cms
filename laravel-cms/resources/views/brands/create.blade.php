@extends('layout.app')
@section('title', 'Nova Marca')
@section('content')
<div class="max-w-xl">
    <a href="{{ route('admin.brands.index') }}" class="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">← Voltar</a>
    <form action="{{ route('admin.brands.store') }}" method="POST" class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        @csrf
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Nome *</label><input type="text" name="name" value="{{ old('name') }}" required class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label><textarea name="description" rows="3" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm">{{ old('description') }}</textarea></div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Logo (URL)</label><input type="text" name="logo" value="{{ old('logo') }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Website</label><input type="url" name="website" value="{{ old('website') }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
        <label class="flex items-center gap-2 text-sm"><input type="checkbox" name="is_active" value="1" checked class="rounded border-gray-300">Ativa</label>
        <button type="submit" class="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">Salvar</button>
    </form>
</div>
@endsection
