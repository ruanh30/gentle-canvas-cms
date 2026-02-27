@extends('layout.app')
@section('title', 'Blog')
@section('content')
<div class="flex items-center justify-between mb-6">
    <h3 class="text-lg font-semibold">{{ $posts->total() }} posts</h3>
    <a href="{{ route('admin.blog.create') }}" class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">+ Novo Post</a>
</div>
<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <table class="w-full">
        <thead class="bg-gray-50 border-b"><tr>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Título</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Autor</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Data</th>
            <th class="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Ações</th>
        </tr></thead>
        <tbody class="divide-y divide-gray-100">
            @forelse($posts as $post)
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 text-sm font-medium">{{ $post->title }}</td>
                    <td class="px-6 py-4 text-sm text-gray-500">{{ $post->user->name ?? '—' }}</td>
                    <td class="px-6 py-4"><span class="text-xs px-2 py-1 rounded-full {{ $post->is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600' }}">{{ $post->is_published ? 'Publicado' : 'Rascunho' }}</span></td>
                    <td class="px-6 py-4 text-sm text-gray-500">{{ $post->created_at->format('d/m/Y') }}</td>
                    <td class="px-6 py-4 text-right">
                        <a href="{{ route('admin.blog.edit', $post) }}" class="text-primary text-sm hover:underline mr-3">Editar</a>
                        <form action="{{ route('admin.blog.destroy', $post) }}" method="POST" class="inline" onsubmit="return confirm('Excluir?')">@csrf @method('DELETE')<button class="text-red-600 text-sm hover:underline">Excluir</button></form>
                    </td>
                </tr>
            @empty
                <tr><td colspan="5" class="px-6 py-12 text-center text-gray-500">Nenhum post.</td></tr>
            @endforelse
        </tbody>
    </table>
</div>
<div class="mt-4">{{ $posts->links() }}</div>
@endsection
