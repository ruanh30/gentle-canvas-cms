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
  .cms-cat-cell{display:flex;align-items:center;gap:0.5rem;font-weight:500;color:#111}
  .cms-actions{display:flex;gap:0.25rem}
  .cms-empty{text-align:center;padding:3rem 1rem;color:#9ca3af}
  .cms-pagination{padding:1rem 1.5rem;display:flex;justify-content:center}
  .cms-pagination .pagination{margin:0}
  .cms-modal .modal-content{border-radius:0.75rem;border:none}
  .cms-modal .modal-header{border-bottom:1px solid #e5e7eb;padding:1.25rem 1.5rem}
  .cms-modal .modal-header .modal-title{font-weight:600;font-size:1.125rem}
  .cms-modal .modal-body{padding:1.5rem}
  .cms-modal .modal-footer{border-top:1px solid #e5e7eb;padding:1rem 1.5rem}
  .cms-form-group{margin-bottom:1rem}
  .cms-form-group label{display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:0.375rem}
  .cms-form-group input,.cms-form-group select,.cms-form-group textarea{width:100%;padding:0.5rem 0.75rem;border:1px solid #e5e7eb;border-radius:0.5rem;font-size:0.875rem;outline:none;transition:border 0.2s}
  .cms-form-group input:focus,.cms-form-group select:focus,.cms-form-group textarea:focus{border-color:#6366f1}
  .cms-btn-secondary{display:inline-flex;align-items:center;gap:0.375rem;padding:0.5rem 1rem;background:#f3f4f6;color:#374151;border:none;border-radius:0.5rem;font-size:0.875rem;font-weight:500;cursor:pointer}
  .cms-btn-secondary:hover{background:#e5e7eb}
</style>
@endsection

@php
  $user = Auth::guard('web')->user();
  $defaultLang = \App\Models\User\Language::where('user_id', $user->id)->where('is_default', 1)->first();
  $langCode = $defaultLang ? $defaultLang->code : 'pt';
@endphp

@section('content')
<div class="mt-2 mb-4">
  <h2 class="pb-2" style="font-size:1.5rem;font-weight:700;">Categorias</h2>
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
      <form action="{{ route('user.itemcategory.index', ['language' => $langCode]) }}" method="GET" class="cms-search">
        <i data-lucide="search" class="s-icon"></i>
        <input type="text" name="search" placeholder="Buscar categorias..." value="{{ request('search') }}">
        <input type="hidden" name="language" value="{{ $langCode }}">
      </form>
    </div>
    <button class="cms-btn-primary" data-toggle="modal" data-target="#addCategoryModal">
      <i data-lucide="plus" style="width:16px;height:16px"></i> Nova Categoria
    </button>
  </div>

  <div class="cms-table-wrap">
    <table class="cms-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Slug</th>
          <th>Status</th>
          <th style="text-align:right">Ações</th>
        </tr>
      </thead>
      <tbody>
        @if(isset($itemcategories) && count($itemcategories) > 0)
          @foreach($itemcategories as $cat)
          <tr>
            <td>
              <div class="cms-cat-cell">
                <i data-lucide="folder-tree" style="width:16px;height:16px;color:#6366f1"></i>
                {{ $cat->name }}
              </div>
            </td>
            <td style="color:#6b7280">{{ $cat->slug }}</td>
            <td>
              @if($cat->status == 1)
                <span style="display:inline-block;padding:0.125rem 0.625rem;border-radius:9999px;font-size:0.75rem;font-weight:500;background:#dcfce7;color:#166534">Ativo</span>
              @else
                <span style="display:inline-block;padding:0.125rem 0.625rem;border-radius:9999px;font-size:0.75rem;font-weight:500;background:#f3f4f6;color:#6b7280">Inativo</span>
              @endif
            </td>
            <td>
              <div class="cms-actions" style="justify-content:flex-end">
                <button class="cms-btn-ghost editCatBtn" title="Editar"
                  data-id="{{ $cat->id }}" data-name="{{ $cat->name }}" data-slug="{{ $cat->slug }}" data-status="{{ $cat->status }}"
                  data-toggle="modal" data-target="#editCategoryModal">
                  <i data-lucide="edit" style="width:16px;height:16px"></i>
                </button>
                <button class="cms-btn-ghost deleteCatBtn" title="Excluir" data-id="{{ $cat->id }}" data-name="{{ $cat->name }}">
                    <i data-lucide="trash-2" style="width:16px;height:16px;color:#ef4444"></i>
                  </button>
              </div>
            </td>
          </tr>
          @endforeach
        @else
          <tr>
            <td colspan="4" class="cms-empty">
              <i data-lucide="folder-tree" style="width:48px;height:48px;margin-bottom:0.5rem"></i>
              <p>Nenhuma categoria encontrada</p>
            </td>
          </tr>
        @endif
      </tbody>
    </table>
  </div>

  @if(isset($itemcategories) && $itemcategories->hasPages())
  <div class="cms-pagination">
    {{ $itemcategories->appends(['language' => $langCode])->links() }}
  </div>
  @endif
</div>

{{-- Add Category Modal --}}
<div class="modal fade cms-modal" id="addCategoryModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <form action="{{ route('user.itemcategory.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <input type="hidden" name="user_language_id" value="{{ $lang_id ?? ($defaultLang ? $defaultLang->id : '') }}">
        <div class="modal-header">
          <h5 class="modal-title">Nova Categoria</h5>
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        </div>
        <div class="modal-body">
          <div class="cms-form-group">
            <label>Nome *</label>
            <input type="text" name="{{ $langCode }}_name" required>
          </div>
          <div class="cms-form-group">
            <label>Número de Ordem *</label>
            <input type="number" name="serial_number" value="0" required>
          </div>
          <div class="cms-form-group">
            <label>Status *</label>
            <select name="status">
              <option value="1">Ativo</option>
              <option value="0">Inativo</option>
            </select>
          </div>
          <div class="cms-form-group">
            <label>Imagem *</label>
            <input type="file" name="image" accept="image/*" required>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="cms-btn-secondary" data-dismiss="modal">Cancelar</button>
          <button type="submit" class="cms-btn-primary">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</div>

{{-- Edit Category Modal --}}
<div class="modal fade cms-modal" id="editCategoryModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <form action="{{ route('user.itemcategory.update') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <input type="hidden" name="category_id" id="editCatId">
        <input type="hidden" name="user_language_id" value="{{ $lang_id ?? ($defaultLang ? $defaultLang->id : '') }}">
        <div class="modal-header">
          <h5 class="modal-title">Editar Categoria</h5>
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        </div>
        <div class="modal-body">
          <div class="cms-form-group">
            <label>Nome *</label>
            <input type="text" name="name" id="editCatName" required>
          </div>
          <div class="cms-form-group">
            <label>Status *</label>
            <select name="status" id="editCatStatus">
              <option value="1">Ativo</option>
              <option value="0">Inativo</option>
            </select>
          </div>
          <div class="cms-form-group">
            <label>Imagem (opcional)</label>
            <input type="file" name="image" accept="image/*">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="cms-btn-secondary" data-dismiss="modal">Cancelar</button>
          <button type="submit" class="cms-btn-primary">Atualizar</button>
        </div>
      </form>
    </div>
  </div>
</div>
@endsection

@section('scripts')
<!-- Delete Confirmation Modal -->
<div class="modal fade cms-modal" id="deleteCategoryModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header" style="background:#fef2f2;border-bottom:1px solid #fecaca">
        <h5 class="modal-title" style="color:#991b1b">
          <i data-lucide="alert-triangle" style="width:20px;height:20px;display:inline-block;vertical-align:middle;margin-right:0.5rem"></i>
          Confirmar Exclusão
        </h5>
        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
      </div>
      <div class="modal-body">
        <p id="deleteConfirmMessage" style="font-size:0.9375rem;color:#374151;margin:0"></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="cms-btn-secondary" data-dismiss="modal">Cancelar</button>
        <form id="forceDeleteForm" method="POST" action="" style="display:inline">
          @csrf
          <input type="hidden" name="category_id" id="forceDeleteCatId">
          <input type="hidden" name="force_delete" value="1">
          <button type="submit" class="cms-btn-primary" style="background:#ef4444">
            <i data-lucide="trash-2" style="width:14px;height:14px"></i> Sim, Excluir
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

<script>
  if(typeof lucide !== 'undefined') lucide.createIcons();

  $(document).on('click', '.editCatBtn', function(){
    $('#editCatId').val($(this).data('id'));
    $('#editCatName').val($(this).data('name'));
    $('#editCatStatus').val($(this).data('status'));
  });

  $(document).on('click', '.deleteCatBtn', function(){
    var catId = $(this).data('id');
    var catName = $(this).data('name');

    // First try AJAX to check if has items
    $.ajax({
      url: "{{ route('user.itemcategory.delete') }}",
      method: 'POST',
      data: { _token: '{{ csrf_token() }}', category_id: catId },
      headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json' },
      success: function(response) {
        if (response.needs_confirm) {
          // Has items - show confirmation modal
          $('#deleteConfirmMessage').html(response.message);
          $('#forceDeleteCatId').val(catId);
          $('#forceDeleteForm').attr('action', "{{ route('user.itemcategory.delete') }}");
          $('#deleteCategoryModal').modal('show');
          if(typeof lucide !== 'undefined') lucide.createIcons();
        } else {
          // Deleted or redirect - reload
          location.reload();
        }
      },
      error: function() {
        // Fallback: simple confirm
        if (confirm('Tem certeza que deseja excluir a categoria "' + catName + '"?')) {
          var form = $('<form method="POST" action="{{ route("user.itemcategory.delete") }}"><input type="hidden" name="_token" value="{{ csrf_token() }}"><input type="hidden" name="category_id" value="' + catId + '"><input type="hidden" name="force_delete" value="1"></form>');
          $('body').append(form);
          form.submit();
        }
      }
    });
  });
</script>
@endsection
