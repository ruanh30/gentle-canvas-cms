@extends('layout.app')
@section('title', 'FAQ')
@section('content')
<div class="flex items-center justify-between mb-6">
    <h3 class="text-lg font-semibold">{{ $faqs->total() }} perguntas</h3>
    <a href="{{ route('admin.faq.create') }}" class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">+ Nova FAQ</a>
</div>
<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <table class="w-full">
        <thead class="bg-gray-50 border-b"><tr>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Pergunta</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Categoria</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
            <th class="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Ações</th>
        </tr></thead>
        <tbody class="divide-y divide-gray-100">
            @forelse($faqs as $faq)
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 text-sm">{{ Str::limit($faq->question, 60) }}</td>
                    <td class="px-6 py-4 text-sm text-gray-500">{{ $faq->category ?? '—' }}</td>
                    <td class="px-6 py-4"><span class="text-xs px-2 py-1 rounded-full {{ $faq->is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600' }}">{{ $faq->is_active ? 'Ativa' : 'Inativa' }}</span></td>
                    <td class="px-6 py-4 text-right">
                        <a href="{{ route('admin.faq.edit', $faq) }}" class="text-primary text-sm hover:underline mr-3">Editar</a>
                        <form action="{{ route('admin.faq.destroy', $faq) }}" method="POST" class="inline" onsubmit="return confirm('Excluir?')">@csrf @method('DELETE')<button class="text-red-600 text-sm hover:underline">Excluir</button></form>
                    </td>
                </tr>
            @empty
                <tr><td colspan="4" class="px-6 py-12 text-center text-gray-500">Nenhuma FAQ.</td></tr>
            @endforelse
        </tbody>
    </table>
</div>
<div class="mt-4">{{ $faqs->links() }}</div>
@endsection
