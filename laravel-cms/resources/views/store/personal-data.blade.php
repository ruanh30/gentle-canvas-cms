{{-- ═══ PersonalDataPage — exact mirror of src/pages/PersonalDataPage.tsx ═══ --}}
@extends('layout.store')
@section('title', 'Dados Pessoais')
@section('content')
<div class="container mx-auto px-4 py-20 flex justify-center">
    <div class="w-full max-w-lg rounded-lg border bg-background shadow-sm">
        <div class="p-6">
            <div class="flex items-center gap-3">
                <a href="{{ route('store.account') }}" class="inline-flex items-center justify-center rounded-md h-10 w-10 border border-input bg-background hover:bg-secondary transition-colors">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                </a>
                <h1 class="text-xl font-display font-semibold leading-none tracking-tight">Dados Pessoais</h1>
            </div>
        </div>
        <div class="p-6 pt-0 space-y-4">
            <form action="{{ route('store.personal-data.update') }}" method="POST" class="space-y-4">
                @csrf
                <div class="space-y-2">
                    <label class="text-sm font-medium leading-none font-body">Nome completo</label>
                    <input type="text" name="name" value="{{ old('name', auth()->user()->name) }}" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                </div>
                <div class="space-y-2">
                    <label class="text-sm font-medium leading-none font-body">E-mail</label>
                    <input type="email" name="email" value="{{ old('email', auth()->user()->email) }}" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                </div>
                <div class="space-y-2">
                    <label class="text-sm font-medium leading-none font-body">Telefone</label>
                    <input type="text" name="phone" value="{{ old('phone', auth()->user()->phone ?? '') }}" placeholder="(00) 00000-0000" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                </div>
                <button type="submit" class="w-full mt-4 inline-flex items-center justify-center gap-2 rounded-md h-10 px-4 py-2 bg-foreground text-background text-sm font-medium hover:opacity-90 transition">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                    Salvar Alterações
                </button>
            </form>
        </div>
    </div>
</div>
@endsection