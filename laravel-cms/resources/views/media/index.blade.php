@extends('layout.app')
@section('title', 'Mídia')
@section('content')
<div class="mb-6">
    <form action="{{ route('admin.media.store') }}" method="POST" enctype="multipart/form-data" class="bg-white rounded-xl border border-gray-200 p-6">
        @csrf
        <label class="block text-sm font-medium text-gray-700 mb-2">Upload de arquivos</label>
        <div class="flex gap-3">
            <input type="file" name="files[]" multiple class="text-sm">
            <button type="submit" class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Enviar</button>
        </div>
    </form>
</div>
<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
    @forelse($media as $m)
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden group relative">
            @if(str_starts_with($m->mime_type, 'image/'))
                <img src="{{ asset('storage/' . $m->path) }}" alt="{{ $m->original_name }}" class="w-full h-32 object-cover">
            @else
                <div class="w-full h-32 bg-gray-100 flex items-center justify-center text-2xl">📄</div>
            @endif
            <div class="p-2">
                <p class="text-xs text-gray-600 truncate">{{ $m->original_name }}</p>
                <p class="text-xs text-gray-400">{{ number_format($m->size / 1024, 1) }} KB</p>
            </div>
            <form action="{{ route('admin.media.destroy', $m) }}" method="POST" class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition" onsubmit="return confirm('Excluir?')">
                @csrf @method('DELETE')
                <button class="bg-red-600 text-white rounded-full w-6 h-6 text-xs hover:bg-red-700">✕</button>
            </form>
        </div>
    @empty
        <div class="col-span-6 py-12 text-center text-gray-500">Nenhum arquivo enviado.</div>
    @endforelse
</div>
<div class="mt-4">{{ $media->links() }}</div>
@endsection
