@extends('user.layout')

@section('styles')
<style>
  .cms-card{background:#fff;border:1px solid #e5e7eb;border-radius:0.75rem;overflow:hidden}
  .cms-card-header{padding:1.25rem 1.5rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.75rem}
  .cms-card-header h2{font-size:1.25rem;font-weight:600;margin:0;color:#111}
  .cms-search{position:relative;width:280px}
  .cms-search input{width:100%;padding:0.5rem 0.75rem 0.5rem 2.25rem;border:1px solid #e5e7eb;border-radius:0.5rem;font-size:0.875rem;outline:none;transition:border 0.2s}
  .cms-search input:focus{border-color:#6366f1}
  .cms-search .s-icon{position:absolute;left:0.65rem;top:50%;transform:translateY(-50%);color:#9ca3af;width:16px;height:16px}
  .cms-btn-primary{display:inline-flex;align-items:center;gap:0.375rem;padding:0.5rem 1rem;background:#6366f1;color:#fff;border:none;border-radius:0.5rem;font-size:0.875rem;font-weight:500;cursor:pointer;transition:background 0.2s}
  .cms-btn-primary:hover{background:#4f46e5;color:#fff;text-decoration:none}
  .cms-btn-ghost{display:inline-flex;align-items:center;justify-content:center;padding:0.375rem;background:transparent;border:none;border-radius:0.375rem;color:#6b7280;cursor:pointer;transition:background 0.2s}
  .cms-btn-ghost:hover{background:#f3f4f6;color:#111}
  .cms-table-wrap{overflow-x:auto}
  .cms-table{width:100%;border-collapse:collapse;font-size:0.875rem}
  .cms-table thead th{padding:0.75rem 1rem;text-align:left;font-weight:500;color:#6b7280;border-bottom:1px solid #e5e7eb;white-space:nowrap}
  .cms-table tbody td{padding:0.75rem 1rem;border-bottom:1px solid #f3f4f6;vertical-align:middle}
  .cms-table tbody tr:hover{background:#fafafa}
  .cms-badge{display:inline-block;padding:0.125rem 0.625rem;border-radius:9999px;font-size:0.75rem;font-weight:500}
  .cms-badge-green{background:#dcfce7;color:#166534}
  .cms-badge-gray{background:#f3f4f6;color:#6b7280}
  .cms-prod-cell{display:flex;align-items:center;gap:0.75rem}
  .cms-prod-img{width:40px;height:40px;border-radius:0.375rem;object-fit:cover;background:#f3f4f6}
  .cms-prod-name{font-weight:500;color:#111}
  .cms-actions{display:flex;gap:0.25rem}
  .cms-empty{text-align:center;padding:3rem 1rem;color:#9ca3af}
  .cms-pagination{padding:1rem 1.5rem;display:flex;justify-content:center}
  .cms-pagination .pagination{margin:0}

  /* Modal overrides for clean look */
  .cms-modal .modal-content{border-radius:0.75rem;border:none}
  .cms-modal .modal-header{border-bottom:1px solid #e5e7eb;padding:1.25rem 1.5rem}
  .cms-modal .modal-header .modal-title{font-weight:600;font-size:1.125rem}
  .cms-modal .modal-body{padding:1.5rem}
  .cms-modal .modal-footer{border-top:1px solid #e5e7eb;padding:1rem 1.5rem}
  .cms-form-group{margin-bottom:1rem}
  .cms-form-group label{display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:0.375rem}
  .cms-form-group input,.cms-form-group select,.cms-form-group textarea{width:100%;padding:0.5rem 0.75rem;border:1px solid #e5e7eb;border-radius:0.5rem;font-size:0.875rem;outline:none;transition:border 0.2s}
  .cms-form-group input:focus,.cms-form-group select:focus,.cms-form-group textarea:focus{border-color:#6366f1}
</style>
@endsection

@php
  $user = Auth::guard('web')->user();
  $defaultLang = \App\Models\User\Language::where('user_id', $user->id)->where('is_default', 1)->first();
  $langCode = $defaultLang ? $defaultLang->code : 'pt';
@endphp

@section('content')
<div class="mt-2 mb-4">
  <h2 class="pb-2" style="font-size:1.5rem;font-weight:700;">Produtos</h2>
</div>

@if(session('success'))
<div class="alert alert-success" style="margin-bottom:1rem;padding:0.75rem 1rem;border-radius:0.5rem;background:#dcfce7;color:#166534;border:1px solid #bbf7d0">
  {{ session('success') }}
</div>
@endif
@if(session('warning'))
<div class="alert alert-warning" style="margin-bottom:1rem;padding:0.75rem 1rem;border-radius:0.5rem;background:#fef9c3;color:#854d0e;border:1px solid #fde68a">
  {{ session('warning') }}
</div>
@endif
@if(session('error'))
<div class="alert alert-danger" style="margin-bottom:1rem;padding:0.75rem 1rem;border-radius:0.5rem;background:#fee2e2;color:#991b1b;border:1px solid #fecaca">
  {{ session('error') }}
</div>
@endif
<div class="cms-card">
  <div class="cms-card-header">
    <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
      <form action="{{ route('user.item.index', ['language' => $langCode]) }}" method="GET" class="cms-search">
        <i data-lucide="search" class="s-icon"></i>
        <input type="text" name="title" placeholder="Buscar produtos..." value="{{ request('title') }}">
        <input type="hidden" name="language" value="{{ $langCode }}">
      </form>
    </div>
    <a href="{{ route('user.item.create', ['language' => $langCode]) }}" class="cms-btn-primary">
      <i data-lucide="plus" style="width:16px;height:16px"></i> Novo Produto
    </a>
  </div>

  <div class="cms-table-wrap">
    <table class="cms-table">
      <thead>
        <tr>
          <th>Produto</th>
          <th>SKU</th>
          <th>Preço</th>
          <th>Estoque</th>
          <th>Status</th>
          <th style="text-align:right">Ações</th>
        </tr>
      </thead>
      <tbody>
        @if(isset($items) && count($items) > 0)
          @foreach($items as $item)
          <tr>
            <td>
              <div class="cms-prod-cell">
                @if(!empty($item->thumbnail))
                  <img src="{{ asset('assets/front/img/user/items/' . $item->thumbnail) }}" class="cms-prod-img" alt="">
                @else
                  <div class="cms-prod-img" style="display:flex;align-items:center;justify-content:center;"><i data-lucide="package" style="width:20px;height:20px;color:#ccc"></i></div>
                @endif
                <span class="cms-prod-name">{{ $item->title }}</span>
              </div>
            </td>
            <td style="color:#6b7280">{{ $item->sku ?? '—' }}</td>
            <td>{{ isset($currency) && $currency ? $currency->symbol : 'R$' }} {{ number_format($item->current_price ?? $item->price ?? 0, 2, ',', '.') }}</td>
            <td>{{ $item->stock ?? 0 }}</td>
            <td>
              @if($item->status == 1)
                <span class="cms-badge cms-badge-green">Ativo</span>
              @else
                <span class="cms-badge cms-badge-gray">Inativo</span>
              @endif
            </td>
            <td>
              <div class="cms-actions" style="justify-content:flex-end">
                <a href="{{ route('user.item.edit', ['id' => $item->item_id, 'language' => $langCode]) }}" class="cms-btn-ghost" title="Editar">
                  <i data-lucide="edit" style="width:16px;height:16px"></i>
                </a>
                <form class="deleteform" action="{{ route('user.item.delete') }}" method="POST" style="display:inline">
                  @csrf
                  <input type="hidden" name="item_id" value="{{ $item->item_id }}">
                  <button type="submit" class="cms-btn-ghost" title="Excluir" onclick="return confirm('Tem certeza?')">
                    <i data-lucide="trash-2" style="width:16px;height:16px;color:#ef4444"></i>
                  </button>
                </form>
              </div>
            </td>
          </tr>
          @endforeach
        @else
          <tr>
            <td colspan="6" class="cms-empty">
              <i data-lucide="package" style="width:48px;height:48px;margin-bottom:0.5rem"></i>
              <p>Nenhum produto encontrado</p>
            </td>
          </tr>
        @endif
      </tbody>
    </table>
  </div>

  @if(isset($items) && $items->hasPages())
  <div class="cms-pagination">
    {{ $items->appends(['language' => $langCode, 'title' => request('title')])->links() }}
  </div>
  @endif
</div>

@endsection

@section('scripts')
<script>
  if(typeof lucide !== 'undefined') lucide.createIcons();
</script>
@endsection
