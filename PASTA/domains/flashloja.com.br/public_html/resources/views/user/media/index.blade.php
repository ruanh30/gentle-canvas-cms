@extends('user.layout')

@section('styles')
<style>
  .cms-card{background:#fff;border:1px solid #e5e7eb;border-radius:0.75rem;overflow:hidden}
  .cms-card-header{padding:1.25rem 1.5rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.75rem}
  .cms-search{position:relative;width:280px}
  .cms-search input{width:100%;padding:0.5rem 0.75rem 0.5rem 2.25rem;border:1px solid #e5e7eb;border-radius:0.5rem;font-size:0.875rem;outline:none;transition:border 0.2s}
  .cms-search input:focus{border-color:#6366f1}
  .cms-search .s-icon{position:absolute;left:0.65rem;top:50%;transform:translateY(-50%);color:#9ca3af;width:16px;height:16px}
  .cms-btn-primary{display:inline-flex;align-items:center;gap:0.375rem;padding:0.5rem 1rem;background:#6366f1;color:#fff;border:none;border-radius:0.5rem;font-size:0.875rem;font-weight:500;cursor:pointer}
  .cms-btn-primary:hover{background:#4f46e5;color:#fff;text-decoration:none}
  .cms-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;padding:1.5rem}
  @media(min-width:768px){.cms-grid{grid-template-columns:repeat(3,1fr)}}
  @media(min-width:1024px){.cms-grid{grid-template-columns:repeat(4,1fr)}}
  .cms-media-card{border:1px solid #e5e7eb;border-radius:0.5rem;overflow:hidden;position:relative;transition:box-shadow 0.2s}
  .cms-media-card:hover{box-shadow:0 4px 12px rgba(0,0,0,0.08)}
  .cms-media-card .img-wrap{aspect-ratio:1;overflow:hidden;position:relative;background:#f3f4f6}
  .cms-media-card img{width:100%;height:100%;object-fit:cover}
  .cms-media-card .overlay{position:absolute;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;gap:0.5rem;opacity:0;transition:opacity 0.2s}
  .cms-media-card:hover .overlay{opacity:1}
  .cms-media-card .overlay button,.cms-media-card .overlay a{padding:0.5rem;background:#fff;border:none;border-radius:0.375rem;cursor:pointer;color:#374151;display:inline-flex;align-items:center;justify-content:center}
  .cms-media-card .overlay button:hover,.cms-media-card .overlay a:hover{background:#f3f4f6}
  .cms-media-info{padding:0.75rem}
  .cms-media-info .name{font-size:0.875rem;font-weight:500;color:#111;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .cms-media-info .date{font-size:0.75rem;color:#9ca3af}
  .cms-empty{text-align:center;padding:4rem 1rem;color:#9ca3af}
  .cms-modal .modal-content{border-radius:0.75rem;border:none}
  .cms-modal .modal-header{border-bottom:1px solid #e5e7eb;padding:1.25rem 1.5rem}
  .cms-modal .modal-header .modal-title{font-weight:600;font-size:1.125rem}
  .cms-modal .modal-body{padding:1.5rem}
  .cms-modal .modal-footer{border-top:1px solid #e5e7eb;padding:1rem 1.5rem}
  .cms-form-group{margin-bottom:1rem}
  .cms-form-group label{display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:0.375rem}
  .cms-form-group input{width:100%;padding:0.5rem 0.75rem;border:1px solid #e5e7eb;border-radius:0.5rem;font-size:0.875rem;outline:none}
  .cms-form-group input:focus{border-color:#6366f1}
  .cms-btn-secondary{display:inline-flex;align-items:center;gap:0.375rem;padding:0.5rem 1rem;background:#f3f4f6;color:#374151;border:none;border-radius:0.5rem;font-size:0.875rem;font-weight:500;cursor:pointer}
  .cms-btn-secondary:hover{background:#e5e7eb}
  .cms-toast{position:fixed;bottom:1.5rem;right:1.5rem;background:#111;color:#fff;padding:0.75rem 1.25rem;border-radius:0.5rem;font-size:0.875rem;z-index:9999;display:none}
</style>
@endsection

@section('content')
<div class="mt-2 mb-4">
  <h2 class="pb-2" style="font-size:1.5rem;font-weight:700;">Mídia</h2>
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
      <div class="cms-search">
        <i data-lucide="search" class="s-icon"></i>
        <input type="text" id="mediaSearch" placeholder="Buscar mídia..." oninput="filterMedia()">
      </div>
    </div>
    <button class="cms-btn-primary" data-toggle="modal" data-target="#addMediaModal">
      <i data-lucide="plus" style="width:16px;height:16px"></i> Adicionar Imagem
    </button>
  </div>

  @if(isset($medias) && count($medias) > 0)
  <div class="cms-grid">
    @foreach($medias as $media)
    <div class="cms-media-card" data-name="{{ strtolower($media->name ?? '') }}">
      <div class="img-wrap">
        <img src="{{ $media->url }}" alt="{{ $media->name ?? '' }}" loading="lazy" onerror="this.style.display='none'">
        <div class="overlay">
          <button type="button" onclick="copyUrl('{{ $media->url }}')" title="Copiar URL">
            <i data-lucide="copy" style="width:16px;height:16px"></i>
          </button>
          <form action="{{ route('user.media.delete') }}" method="POST" style="display:inline" onsubmit="return confirm('Excluir esta mídia?')">
            @csrf
            <input type="hidden" name="media_id" value="{{ $media->id }}">
            <button type="submit" title="Excluir" style="color:#ef4444">
              <i data-lucide="trash-2" style="width:16px;height:16px"></i>
            </button>
          </form>
        </div>
      </div>
      <div class="cms-media-info">
        <div class="name">{{ $media->name ?? 'Sem nome' }}</div>
        <div class="date">{{ $media->created_at ? $media->created_at->format('d/m/Y') : '' }}</div>
      </div>
    </div>
    @endforeach
  </div>
  @else
  <div class="cms-empty">
    <i data-lucide="image" style="width:64px;height:64px;margin-bottom:0.75rem"></i>
    <p style="font-size:1rem;margin-bottom:0.25rem">Nenhuma mídia encontrada</p>
    <p style="font-size:0.875rem">Adicione imagens para usar em sua loja</p>
  </div>
  @endif
</div>

{{-- Add Media Modal --}}
<div class="modal fade cms-modal" id="addMediaModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <form action="{{ route('user.media.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="modal-header">
          <h5 class="modal-title">Adicionar Imagem</h5>
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        </div>
        <div class="modal-body">
          <div class="cms-form-group">
            <label>Upload de Imagem</label>
            <input type="file" name="image" accept="image/*">
          </div>
          <div style="text-align:center;color:#9ca3af;margin:0.75rem 0;font-size:0.875rem">— ou —</div>
          <div class="cms-form-group">
            <label>URL da Imagem</label>
            <input type="url" name="image_url" placeholder="https://...">
          </div>
          <div class="cms-form-group">
            <label>Nome (opcional)</label>
            <input type="text" name="name" placeholder="Nome da imagem">
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

<div class="cms-toast" id="copyToast">URL copiada!</div>
@endsection

@section('scripts')
<script>
  if(typeof lucide !== 'undefined') lucide.createIcons();

  function copyUrl(url){
    navigator.clipboard.writeText(url).then(function(){
      var t = document.getElementById('copyToast');
      t.style.display='block';
      setTimeout(function(){ t.style.display='none'; }, 2000);
    });
  }

  function filterMedia(){
    var q = document.getElementById('mediaSearch').value.toLowerCase();
    document.querySelectorAll('.cms-media-card').forEach(function(c){
      c.style.display = c.dataset.name.includes(q) ? '' : 'none';
    });
  }
</script>
@endsection
