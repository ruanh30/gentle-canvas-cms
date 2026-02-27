@extends('layout.app')
@section('title', 'Editar Cupom')
@section('content')
<div class="max-w-xl">
    <a href="{{ route('admin.coupons.index') }}" class="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">← Voltar</a>
    <form action="{{ route('admin.coupons.update', $coupon) }}" method="POST" class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        @csrf @method('PUT')
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Código *</label><input type="text" name="code" value="{{ old('code', $coupon->code) }}" required class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm uppercase font-mono"></div>
        <div class="grid grid-cols-2 gap-4">
            <div><label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label><select name="type" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"><option value="percentage" {{ $coupon->type==='percentage'?'selected':'' }}>Percentual</option><option value="fixed" {{ $coupon->type==='fixed'?'selected':'' }}>Valor fixo</option></select></div>
            <div><label class="block text-sm font-medium text-gray-700 mb-1">Valor *</label><input type="number" name="value" value="{{ old('value', $coupon->value) }}" step="0.01" required class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
        </div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Compra mínima</label><input type="number" name="min_purchase" value="{{ old('min_purchase', $coupon->min_purchase) }}" step="0.01" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Máximo de usos</label><input type="number" name="max_uses" value="{{ old('max_uses', $coupon->max_uses) }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
        <div class="grid grid-cols-2 gap-4">
            <div><label class="block text-sm font-medium text-gray-700 mb-1">Início</label><input type="date" name="starts_at" value="{{ old('starts_at', $coupon->starts_at?->format('Y-m-d')) }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
            <div><label class="block text-sm font-medium text-gray-700 mb-1">Expiração</label><input type="date" name="expires_at" value="{{ old('expires_at', $coupon->expires_at?->format('Y-m-d')) }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"></div>
        </div>
        <label class="flex items-center gap-2 text-sm"><input type="checkbox" name="is_active" value="1" {{ $coupon->is_active?'checked':'' }} class="rounded border-gray-300">Ativo</label>
        <button type="submit" class="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">Salvar</button>
    </form>
</div>
@endsection
