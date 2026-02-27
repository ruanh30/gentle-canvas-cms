@extends('layout.app')
@section('title', 'Configurações')
@section('content')
<form action="{{ route('admin.settings.update') }}" method="POST" class="max-w-xl bg-white rounded-xl border border-gray-200 p-6 space-y-4">
    @csrf
    <div><label class="block text-sm font-medium text-gray-700 mb-1">Nome da Loja</label><input type="text" name="store_name" value="{{ \App\Models\Setting::get('store_name', 'Minha Loja') }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
    <div><label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label><textarea name="store_description" rows="2" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm">{{ \App\Models\Setting::get('store_description', '') }}</textarea></div>
    <div><label class="block text-sm font-medium text-gray-700 mb-1">E-mail de contato</label><input type="email" name="contact_email" value="{{ \App\Models\Setting::get('contact_email', '') }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
    <div><label class="block text-sm font-medium text-gray-700 mb-1">Telefone</label><input type="text" name="contact_phone" value="{{ \App\Models\Setting::get('contact_phone', '') }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
    <div><label class="block text-sm font-medium text-gray-700 mb-1">Moeda</label><input type="text" name="currency" value="{{ \App\Models\Setting::get('currency', 'BRL') }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
    <button type="submit" class="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">Salvar</button>
</form>
@endsection
