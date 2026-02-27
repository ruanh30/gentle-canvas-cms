@extends('layout.app')
@section('title', 'Depoimentos')
@section('content')
<div class="flex items-center justify-between mb-6">
    <h3 class="text-lg font-semibold">{{ $testimonials->total() }} depoimentos</h3>
    <a href="{{ route('admin.testimonials.create') }}" class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">+ Novo</a>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    @forelse($testimonials as $t)
        <div class="bg-white rounded-xl border border-gray-200 p-5">
            <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">{{ strtoupper(substr($t->author_name,0,1)) }}</div>
                <div>
                    <p class="text-sm font-medium">{{ $t->author_name }}</p>
                    <p class="text-xs text-gray-500">{{ $t->author_role ?? '' }}</p>
                </div>
            </div>
            <div class="mb-2">@for($i=1;$i<=5;$i++)<span class="{{ $i<=$t->rating?'text-yellow-400':'text-gray-300' }}">★</span>@endfor</div>
            <p class="text-sm text-gray-600 mb-3">{{ Str::limit($t->content, 100) }}</p>
            <div class="flex gap-2">
                <a href="{{ route('admin.testimonials.edit', $t) }}" class="text-primary text-xs hover:underline">Editar</a>
                <form action="{{ route('admin.testimonials.destroy', $t) }}" method="POST" onsubmit="return confirm('Excluir?')">@csrf @method('DELETE')<button class="text-red-600 text-xs hover:underline">Excluir</button></form>
            </div>
        </div>
    @empty
        <div class="col-span-3 py-12 text-center text-gray-500">Nenhum depoimento.</div>
    @endforelse
</div>
<div class="mt-4">{{ $testimonials->links() }}</div>
@endsection
