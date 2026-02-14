@extends('user.layout')

@section('styles')
<style>
  .cms-card{background:#fff;border:1px solid #e5e7eb;border-radius:0.75rem;overflow:hidden;margin-bottom:1.5rem}
  .cms-card-header{padding:1.25rem 1.5rem;border-bottom:1px solid #e5e7eb}
  .cms-card-header h2{font-size:1.125rem;font-weight:600;margin:0;color:#111;display:flex;align-items:center;gap:0.5rem}
  .cms-card-body{padding:1.5rem}
  .cms-menu-item{display:flex;align-items:center;gap:0.75rem;padding:0.75rem;background:#fafafa;border:1px solid #e5e7eb;border-radius:0.5rem;margin-bottom:0.5rem}
  .cms-menu-item .grip{color:#9ca3af;cursor:grab;flex-shrink:0}
  .cms-menu-item input,.cms-menu-item select{padding:0.4rem 0.6rem;border:1px solid #e5e7eb;border-radius:0.375rem;font-size:0.875rem;outline:none}
  .cms-menu-item input:focus,.cms-menu-item select:focus{border-color:#6366f1}
  .cms-menu-item .label-input{flex:1;min-width:120px}
  .cms-menu-item .url-input{flex:2;min-width:160px}
  .cms-menu-item .type-select{width:140px}
  .cms-btn-primary{display:inline-flex;align-items:center;gap:0.375rem;padding:0.5rem 1rem;background:#6366f1;color:#fff;border:none;border-radius:0.5rem;font-size:0.875rem;font-weight:500;cursor:pointer}
  .cms-btn-primary:hover{background:#4f46e5;color:#fff;text-decoration:none}
  .cms-btn-outline{display:inline-flex;align-items:center;gap:0.375rem;padding:0.5rem 1rem;background:transparent;color:#6366f1;border:1px solid #6366f1;border-radius:0.5rem;font-size:0.875rem;font-weight:500;cursor:pointer}
  .cms-btn-outline:hover{background:#eef2ff}
  .cms-btn-ghost{display:inline-flex;align-items:center;justify-content:center;padding:0.375rem;background:transparent;border:none;border-radius:0.375rem;color:#6b7280;cursor:pointer}
  .cms-btn-ghost:hover{background:#f3f4f6;color:#111}
  .cms-save-row{display:flex;justify-content:flex-end;margin-top:1rem}
</style>
@endsection

@section('content')
<div class="mt-2 mb-4">
  <h2 class="pb-2" style="font-size:1.5rem;font-weight:700;">Menus</h2>
</div>

<form action="{{ route('user.menu.save') }}" method="POST">
  @csrf

  {{-- Header Menu --}}
  <div class="cms-card">
    <div class="cms-card-header">
      <h2><i data-lucide="external-link" style="width:18px;height:18px"></i> Menu do Cabeçalho</h2>
    </div>
    <div class="cms-card-body">
      <div id="headerMenuItems">
        @if(isset($headerMenus) && count($headerMenus) > 0)
          @foreach($headerMenus as $i => $m)
          <div class="cms-menu-item">
            <i data-lucide="grip-vertical" class="grip" style="width:16px;height:16px"></i>
            <input type="text" name="header[{{ $i }}][label]" class="label-input" placeholder="Label" value="{{ $m['label'] ?? '' }}">
            <input type="text" name="header[{{ $i }}][url]" class="url-input" placeholder="URL" value="{{ $m['url'] ?? '' }}">
            <select name="header[{{ $i }}][type]" class="type-select">
              <option value="link" {{ ($m['type'] ?? '') == 'link' ? 'selected' : '' }}>Link</option>
              <option value="categoria" {{ ($m['type'] ?? '') == 'categoria' ? 'selected' : '' }}>Categoria</option>
              <option value="pagina" {{ ($m['type'] ?? '') == 'pagina' ? 'selected' : '' }}>Página</option>
              <option value="customizado" {{ ($m['type'] ?? '') == 'customizado' ? 'selected' : '' }}>Customizado</option>
            </select>
            <button type="button" class="cms-btn-ghost removeMenuItem"><i data-lucide="trash-2" style="width:16px;height:16px;color:#ef4444"></i></button>
          </div>
          @endforeach
        @endif
      </div>
      <button type="button" class="cms-btn-outline" onclick="addMenuItem('headerMenuItems','header')">
        <i data-lucide="plus" style="width:16px;height:16px"></i> Adicionar item
      </button>
    </div>
  </div>

  {{-- Footer Menu --}}
  <div class="cms-card">
    <div class="cms-card-header">
      <h2><i data-lucide="external-link" style="width:18px;height:18px"></i> Menu do Rodapé</h2>
    </div>
    <div class="cms-card-body">
      <div id="footerMenuItems">
        @if(isset($footerMenus) && count($footerMenus) > 0)
          @foreach($footerMenus as $i => $m)
          <div class="cms-menu-item">
            <i data-lucide="grip-vertical" class="grip" style="width:16px;height:16px"></i>
            <input type="text" name="footer[{{ $i }}][label]" class="label-input" placeholder="Label" value="{{ $m['label'] ?? '' }}">
            <input type="text" name="footer[{{ $i }}][url]" class="url-input" placeholder="URL" value="{{ $m['url'] ?? '' }}">
            <select name="footer[{{ $i }}][type]" class="type-select">
              <option value="link" {{ ($m['type'] ?? '') == 'link' ? 'selected' : '' }}>Link</option>
              <option value="categoria" {{ ($m['type'] ?? '') == 'categoria' ? 'selected' : '' }}>Categoria</option>
              <option value="pagina" {{ ($m['type'] ?? '') == 'pagina' ? 'selected' : '' }}>Página</option>
              <option value="customizado" {{ ($m['type'] ?? '') == 'customizado' ? 'selected' : '' }}>Customizado</option>
            </select>
            <button type="button" class="cms-btn-ghost removeMenuItem"><i data-lucide="trash-2" style="width:16px;height:16px;color:#ef4444"></i></button>
          </div>
          @endforeach
        @endif
      </div>
      <button type="button" class="cms-btn-outline" onclick="addMenuItem('footerMenuItems','footer')">
        <i data-lucide="plus" style="width:16px;height:16px"></i> Adicionar item
      </button>
    </div>
  </div>

  <div class="cms-save-row">
    <button type="submit" class="cms-btn-primary" style="padding:0.625rem 1.5rem;font-size:1rem">
      Salvar Menus
    </button>
  </div>
</form>
@endsection

@section('scripts')
<script>
  var headerIdx = {{ isset($headerMenus) ? count($headerMenus) : 0 }};
  var footerIdx = {{ isset($footerMenus) ? count($footerMenus) : 0 }};

  function addMenuItem(containerId, prefix){
    var idx = prefix === 'header' ? headerIdx++ : footerIdx++;
    var html = '<div class="cms-menu-item">' +
      '<i data-lucide="grip-vertical" class="grip" style="width:16px;height:16px"></i>' +
      '<input type="text" name="'+prefix+'['+idx+'][label]" class="label-input" placeholder="Label">' +
      '<input type="text" name="'+prefix+'['+idx+'][url]" class="url-input" placeholder="URL">' +
      '<select name="'+prefix+'['+idx+'][type]" class="type-select">' +
        '<option value="link">Link</option><option value="categoria">Categoria</option>' +
        '<option value="pagina">Página</option><option value="customizado">Customizado</option>' +
      '</select>' +
      '<button type="button" class="cms-btn-ghost removeMenuItem"><i data-lucide="trash-2" style="width:16px;height:16px;color:#ef4444"></i></button>' +
      '</div>';
    document.getElementById(containerId).insertAdjacentHTML('beforeend', html);
    if(typeof lucide !== 'undefined') lucide.createIcons();
  }

  $(document).on('click', '.removeMenuItem', function(){ $(this).closest('.cms-menu-item').remove(); });

  if(typeof lucide !== 'undefined') lucide.createIcons();
</script>
@endsection
