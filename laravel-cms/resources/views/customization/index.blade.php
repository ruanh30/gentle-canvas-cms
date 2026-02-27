@extends('layout.app')
@section('title', 'Personalização')
@section('content')
<form action="{{ route('admin.customization.update') }}" method="POST" class="max-w-xl bg-white rounded-xl border border-gray-200 p-6 space-y-4">
    @csrf
    <div><label class="block text-sm font-medium text-gray-700 mb-1">Cor primária</label><input type="color" name="theme_primary_color" value="{{ $theme['primary_color'] }}" class="w-16 h-10 border border-gray-200 rounded"></div>
    <div><label class="block text-sm font-medium text-gray-700 mb-1">Nome da Loja</label><input type="text" name="store_name" value="{{ $theme['store_name'] }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
    <div><label class="block text-sm font-medium text-gray-700 mb-1">Logo (URL)</label><input type="text" name="logo_url" value="{{ $theme['logo_url'] }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
    <div><label class="block text-sm font-medium text-gray-700 mb-1">Título do Hero</label><input type="text" name="hero_title" value="{{ $theme['hero_title'] }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
    <div><label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo do Hero</label><input type="text" name="hero_subtitle" value="{{ $theme['hero_subtitle'] }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
    <div><label class="block text-sm font-medium text-gray-700 mb-1">Imagem do Hero (URL)</label><input type="text" name="hero_image" value="{{ $theme['hero_image'] }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
    <div><label class="block text-sm font-medium text-gray-700 mb-1">CTA Texto</label><input type="text" name="hero_cta_text" value="{{ $theme['hero_cta_text'] }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
    <div><label class="block text-sm font-medium text-gray-700 mb-1">CTA Link</label><input type="text" name="hero_cta_link" value="{{ $theme['hero_cta_link'] }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
    <button type="submit" class="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">Salvar</button>
</form>
@endsection
