@extends('layout.app')
@section('title', 'Novo Menu')
@section('content')
<div class="max-w-xl">
    <a href="{{ route('admin.menus.index') }}" class="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">← Voltar</a>
    <form action="{{ route('admin.menus.store') }}" method="POST" class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        @csrf
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Nome *</label><input type="text" name="name" value="{{ old('name') }}" required class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Localização</label><select name="location" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"><option value="">Nenhuma</option><option value="header">Header</option><option value="footer">Footer</option><option value="sidebar">Sidebar</option></select></div>
        <label class="flex items-center gap-2 text-sm"><input type="checkbox" name="is_active" value="1" checked class="rounded border-gray-300">Ativo</label>
        <button type="submit" class="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">Salvar</button>
    </form>
</div>
@endsection
