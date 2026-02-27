@extends('layout.app')
@section('title', 'Cupons')
@section('content')
<div class="flex items-center justify-between mb-6">
    <h3 class="text-lg font-semibold">{{ $coupons->total() }} cupons</h3>
    <a href="{{ route('admin.coupons.create') }}" class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">+ Novo Cupom</a>
</div>
<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <table class="w-full">
        <thead class="bg-gray-50 border-b"><tr>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Código</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Tipo</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Valor</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Usos</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Validade</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
            <th class="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Ações</th>
        </tr></thead>
        <tbody class="divide-y divide-gray-100">
            @forelse($coupons as $coupon)
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 text-sm font-mono font-medium">{{ $coupon->code }}</td>
                    <td class="px-6 py-4 text-sm">{{ $coupon->type === 'percentage' ? 'Percentual' : 'Fixo' }}</td>
                    <td class="px-6 py-4 text-sm">{{ $coupon->type === 'percentage' ? $coupon->value . '%' : 'R$ ' . number_format($coupon->value, 2, ',', '.') }}</td>
                    <td class="px-6 py-4 text-sm">{{ $coupon->used_count }}/{{ $coupon->max_uses ?? '∞' }}</td>
                    <td class="px-6 py-4 text-sm text-gray-500">{{ $coupon->expires_at ? $coupon->expires_at->format('d/m/Y') : '—' }}</td>
                    <td class="px-6 py-4"><span class="text-xs px-2 py-1 rounded-full {{ $coupon->is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600' }}">{{ $coupon->is_active ? 'Ativo' : 'Inativo' }}</span></td>
                    <td class="px-6 py-4 text-right">
                        <a href="{{ route('admin.coupons.edit', $coupon) }}" class="text-primary text-sm hover:underline mr-3">Editar</a>
                        <form action="{{ route('admin.coupons.destroy', $coupon) }}" method="POST" class="inline" onsubmit="return confirm('Excluir?')">@csrf @method('DELETE')<button class="text-red-600 text-sm hover:underline">Excluir</button></form>
                    </td>
                </tr>
            @empty
                <tr><td colspan="7" class="px-6 py-12 text-center text-gray-500">Nenhum cupom.</td></tr>
            @endforelse
        </tbody>
    </table>
</div>
<div class="mt-4">{{ $coupons->links() }}</div>
@endsection
