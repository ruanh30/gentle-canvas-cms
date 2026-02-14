@extends('user.layout')
@section('pagename')
 - Personalização Premium
@endsection
@section('meta-keywords', 'personalização, tema premium')
@section('meta-description', 'Editor de tema premium')

@section('styles')
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700;800&family=Montserrat:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700&family=Lora:wght@400;500;600;700&family=Merriweather:wght@300;400;700&family=Raleway:wght@300;400;500;600;700&family=Oswald:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Serif+Display&family=Libre+Baskerville:wght@400;700&family=Roboto:wght@300;400;500;700&family=Open+Sans:wght@300;400;500;600;700&family=Lato:wght@300;400;700&family=Nunito:wght@300;400;500;600;700&family=Work+Sans:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&family=Rubik:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
/* ======== PREMIUM EDITOR LAYOUT ======== */
:root {
  --pe-bg: #f8fafc;
  --pe-sidebar: #ffffff;
  --pe-border: #e2e8f0;
  --pe-text: #0f172a;
  --pe-muted: #64748b;
  --pe-active: #6366f1;
  --pe-active-bg: #eef2ff;
  --pe-radius: 8px;
}
.pe-wrap { display:flex; flex-direction:column; height:calc(100vh - 60px); background:var(--pe-bg); margin:-24px; font-family:'Inter',sans-serif; }
.pe-topbar { display:flex; align-items:center; justify-content:space-between; padding:8px 16px; background:#fff; border-bottom:1px solid var(--pe-border); flex-shrink:0; z-index:10; }
.pe-topbar h1 { font-size:14px; font-weight:700; color:var(--pe-text); margin:0; }
.pe-topbar .pe-badge { font-size:10px; background:#fef3c7; color:#92400e; padding:2px 8px; border-radius:99px; margin-left:8px; }
.pe-topbar-actions { display:flex; gap:6px; }
.pe-btn { padding:6px 14px; font-size:12px; font-weight:500; border-radius:6px; border:1px solid var(--pe-border); background:#fff; color:var(--pe-text); cursor:pointer; transition:all .15s; display:inline-flex; align-items:center; gap:4px; }
.pe-btn:hover { background:#f1f5f9; }
.pe-btn-primary { background:var(--pe-active); color:#fff; border-color:var(--pe-active); }
.pe-btn-primary:hover { background:#4f46e5; }
.pe-btn-sm { padding:4px 10px; font-size:11px; }

.pe-main { display:flex; flex:1; min-height:0; }

/* Col 1: sections nav */
.pe-nav { width:200px; background:var(--pe-sidebar); border-right:1px solid var(--pe-border); display:flex; flex-direction:column; flex-shrink:0; }
.pe-nav-search { padding:8px; border-bottom:1px solid var(--pe-border); }
.pe-nav-search input { width:100%; padding:6px 10px; font-size:12px; border:1px solid var(--pe-border); border-radius:6px; outline:none; }
.pe-nav-search input:focus { border-color:var(--pe-active); }
.pe-nav-list { flex:1; overflow-y:auto; padding:4px; }
.pe-nav-group { font-size:9px; text-transform:uppercase; letter-spacing:1px; color:var(--pe-muted); padding:8px 8px 4px; font-weight:600; }
.pe-nav-item { display:flex; align-items:center; gap:8px; padding:7px 10px; border-radius:6px; cursor:pointer; font-size:12px; color:var(--pe-muted); transition:all .15s; border:none; background:none; width:100%; text-align:left; }
.pe-nav-item:hover { background:#f1f5f9; color:var(--pe-text); }
.pe-nav-item.active { background:var(--pe-active); color:#fff; font-weight:500; }
.pe-nav-item svg { width:14px; height:14px; flex-shrink:0; }

/* Col 2: properties */
.pe-props { width:320px; background:var(--pe-sidebar); border-right:1px solid var(--pe-border); display:flex; flex-direction:column; flex-shrink:0; }
.pe-props-header { padding:10px 14px; border-bottom:1px solid var(--pe-border); font-size:13px; font-weight:600; color:var(--pe-text); }
.pe-props-body { flex:1; overflow-y:auto; padding:14px; }

/* Col 3: preview */
.pe-preview { flex:1; background:#e2e8f0; display:flex; flex-direction:column; min-width:0; }
.pe-preview-toolbar { display:flex; align-items:center; justify-content:center; gap:8px; padding:8px; background:rgba(255,255,255,.8); border-bottom:1px solid var(--pe-border); }
.pe-device-btn { padding:4px 8px; border:none; background:none; cursor:pointer; border-radius:6px; color:var(--pe-muted); }
.pe-device-btn.active { background:var(--pe-active); color:#fff; }
.pe-preview-frame { flex:1; display:flex; align-items:flex-start; justify-content:center; padding:16px; overflow:auto; }
.pe-preview-frame iframe { border:none; background:#fff; border-radius:8px; box-shadow:0 4px 24px rgba(0,0,0,.1); transition:width .3s; }

/* ======== FORM CONTROLS ======== */
.pe-section { margin-bottom:20px; }
.pe-section-title { display:flex; align-items:center; gap:6px; margin-bottom:12px; }
.pe-section-title .icon { width:28px; height:28px; background:#f1f5f9; border-radius:6px; display:flex; align-items:center; justify-content:center; }
.pe-section-title .icon svg { width:14px; height:14px; color:var(--pe-muted); }
.pe-section-title h3 { font-size:13px; font-weight:600; margin:0; }
.pe-section-title p { font-size:10px; color:var(--pe-muted); margin:0; }

.pe-divider { display:flex; align-items:center; gap:8px; margin:14px 0 10px; }
.pe-divider span { font-size:9px; text-transform:uppercase; letter-spacing:1px; color:var(--pe-muted); font-weight:500; white-space:nowrap; }
.pe-divider::before,.pe-divider::after { content:''; flex:1; height:1px; background:var(--pe-border); }

.pe-field { margin-bottom:10px; }
.pe-label { display:block; font-size:11px; color:var(--pe-muted); margin-bottom:4px; font-weight:500; }
.pe-input { width:100%; padding:6px 10px; font-size:12px; border:1px solid var(--pe-border); border-radius:6px; outline:none; background:#fff; font-family:inherit; }
.pe-input:focus { border-color:var(--pe-active); }
.pe-textarea { min-height:70px; resize:vertical; }
.pe-select { appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 8px center; padding-right:28px; }

.pe-color-field { display:flex; align-items:center; gap:8px; }
.pe-color-swatch { width:32px; height:32px; border-radius:6px; border:1px solid var(--pe-border); cursor:pointer; padding:0; overflow:hidden; }
.pe-color-swatch input[type=color] { width:48px; height:48px; border:none; padding:0; margin:-8px; cursor:pointer; }
.pe-color-hex { width:80px; font-family:'SF Mono',monospace; text-transform:uppercase; }

.pe-toggle { display:flex; align-items:center; justify-content:space-between; padding:6px 0; }
.pe-toggle-label { font-size:12px; color:var(--pe-text); }
.pe-toggle-desc { font-size:10px; color:var(--pe-muted); }
.pe-switch { position:relative; width:36px; height:20px; flex-shrink:0; }
.pe-switch input { opacity:0; width:0; height:0; }
.pe-switch .slider { position:absolute; inset:0; background:#cbd5e1; border-radius:20px; cursor:pointer; transition:.2s; }
.pe-switch .slider::before { content:''; position:absolute; width:16px; height:16px; left:2px; top:2px; background:#fff; border-radius:50%; transition:.2s; }
.pe-switch input:checked + .slider { background:var(--pe-active); }
.pe-switch input:checked + .slider::before { transform:translateX(16px); }

.pe-options { display:grid; gap:6px; }
.pe-option { padding:8px; border:2px solid var(--pe-border); border-radius:8px; cursor:pointer; text-align:center; transition:all .15s; background:#fff; }
.pe-option:hover { border-color:#94a3b8; }
.pe-option.active { border-color:var(--pe-active); background:var(--pe-active-bg); }
.pe-option-label { font-size:11px; font-weight:500; }
.pe-option-desc { font-size:9px; color:var(--pe-muted); }

.pe-slider-field { }
.pe-slider-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:4px; }
.pe-slider-value { font-size:11px; font-family:'SF Mono',monospace; color:var(--pe-muted); }
.pe-slider { width:100%; height:4px; -webkit-appearance:none; appearance:none; border-radius:2px; background:#e2e8f0; outline:none; }
.pe-slider::-webkit-slider-thumb { -webkit-appearance:none; width:14px; height:14px; border-radius:50%; background:var(--pe-active); cursor:pointer; }

/* Preset cards */
.pe-preset { display:flex; align-items:center; gap:10px; padding:10px; border:1px solid var(--pe-border); border-radius:8px; cursor:pointer; transition:all .15s; background:#fff; margin-bottom:6px; width:100%; text-align:left; }
.pe-preset:hover { border-color:var(--pe-active); }
.pe-preset-emoji { font-size:24px; }
.pe-preset-info { flex:1; min-width:0; }
.pe-preset-name { font-size:12px; font-weight:500; }
.pe-preset-desc { font-size:10px; color:var(--pe-muted); }
.pe-color-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.pe-preview-box { padding:12px; background:var(--pe-bg-secondary, #f5f5f5); border-radius:8px; }
.pe-preview-heading { margin:0 0 4px 0; }
.pe-preview-body { margin:0; }
.pe-preview-btn { padding:8px 16px; font-size:13px; border-radius:6px; border:none; cursor:pointer; }
.pe-preview-btn-primary { background:var(--pe-fg, #1a1a1a); color:var(--pe-bg, #fff); }
.pe-preview-btn-outline { background:transparent; border:2px solid var(--pe-fg, #1a1a1a); color:var(--pe-fg, #1a1a1a); }
.pe-preview-btn-ghost { background:transparent; color:var(--pe-fg, #1a1a1a); }
.pe-preset-colors { display:flex; gap:2px; }
.pe-preset-dot { width:16px; height:16px; border-radius:50%; border:1px solid rgba(0,0,0,.1); }

/* Home sections sortable */
.pe-sortable-item { display:flex; align-items:center; gap:6px; padding:8px 10px; border:1px solid var(--pe-border); border-radius:8px; margin-bottom:4px; background:#fff; }
.pe-sortable-item.disabled { opacity:.5; }
.pe-grip { cursor:grab; color:var(--pe-muted); }
.pe-sortable-name { flex:1; font-size:12px; }

/* Panel visibility */
.pe-panel { display:none; }
.pe-panel.active { display:block; }
</style>
@endsection

@section('content')
<div class="pe-wrap" id="premiumEditor">
  <!-- TOP BAR -->
  <div class="pe-topbar">
    <div style="display:flex;align-items:center">
      <h1>Editor de Tema Premium</h1>
      <span class="pe-badge" id="draftBadge" style="display:none">Rascunho não publicado</span>
    </div>
    <div class="pe-topbar-actions">
      <button class="pe-btn pe-btn-sm" onclick="PE.showVersions()">🕐 Versões</button>
      <button class="pe-btn pe-btn-sm" onclick="PE.resetToDefault()">↺ Restaurar</button>
      <button class="pe-btn pe-btn-sm" id="btnDiscard" style="display:none" onclick="PE.discard()">↩ Descartar</button>
      <button class="pe-btn pe-btn-sm pe-btn-primary" id="btnPublish" onclick="PE.publish()">📤 Publicar</button>
    </div>
  </div>

  <!-- MAIN 3-COL -->
  <div class="pe-main">
    <!-- COL 1: NAV -->
    <div class="pe-nav">
      <div class="pe-nav-search">
        <input type="text" placeholder="Buscar seção..." id="navSearch" oninput="PE.filterNav(this.value)">
      </div>
      <div class="pe-nav-list" id="navList">
        <div class="pe-nav-group">Sistema</div>
        <button class="pe-nav-item active" data-section="presets" onclick="PE.showSection('presets',this)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l1.5 4.5H18l-3.5 2.5L16 14.5 12 12l-4 2.5L9.5 10 6 7.5h4.5z"/></svg>
          Temas Prontos
        </button>
        <button class="pe-nav-item" data-section="colors" onclick="PE.showSection('colors',this)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20"/></svg>
          Cores
        </button>
        <button class="pe-nav-item" data-section="typography" onclick="PE.showSection('typography',this)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>
          Tipografia
        </button>
        <button class="pe-nav-item" data-section="global" onclick="PE.showSection('global',this)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>
          Layout Global
        </button>
        <button class="pe-nav-item" data-section="buttons" onclick="PE.showSection('buttons',this)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 15l6 6m-11-4a7 7 0 110-14 7 7 0 010 14z"/></svg>
          Botões
        </button>
        <button class="pe-nav-item" data-section="inputs" onclick="PE.showSection('inputs',this)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 12h.01"/></svg>
          Formulários
        </button>

        <div class="pe-nav-group">Componentes</div>
        <button class="pe-nav-item" data-section="logo" onclick="PE.showSection('logo',this)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
          Logo
        </button>
        <button class="pe-nav-item" data-section="header" onclick="PE.showSection('header',this)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
          Cabeçalho
        </button>
        <button class="pe-nav-item" data-section="hero" onclick="PE.showSection('hero',this)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M2 12h20"/></svg>
          Hero / Banner
        </button>
        <button class="pe-nav-item" data-section="homeSections" onclick="PE.showSection('homeSections',this)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          Seções da Home
        </button>
        <button class="pe-nav-item" data-section="productCard" onclick="PE.showSection('productCard',this)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
          Card de Produto
        </button>
        <button class="pe-nav-item" data-section="productPage" onclick="PE.showSection('productPage',this)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 01-8 0"/></svg>
          Página de Produto
        </button>
        <button class="pe-nav-item" data-section="category" onclick="PE.showSection('category',this)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          Categoria / Busca
        </button>
        <button class="pe-nav-item" data-section="cart" onclick="PE.showSection('cart',this)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
          Carrinho
        </button>
        <button class="pe-nav-item" data-section="checkout" onclick="PE.showSection('checkout',this)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>
          Checkout
        </button>
        <button class="pe-nav-item" data-section="footer" onclick="PE.showSection('footer',this)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 15h18"/></svg>
          Rodapé
        </button>

        <div class="pe-nav-group">Extras</div>
        <button class="pe-nav-item" data-section="whatsapp" onclick="PE.showSection('whatsapp',this)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
          WhatsApp
        </button>
        <button class="pe-nav-item" data-section="seo" onclick="PE.showSection('seo',this)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
          SEO
        </button>
        <button class="pe-nav-item" data-section="customCode" onclick="PE.showSection('customCode',this)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Código Custom
        </button>
      </div>
    </div>

    <!-- COL 2: PROPERTIES -->
    <div class="pe-props">
      <div class="pe-props-header" id="propsTitle">Temas Prontos</div>
      <div class="pe-props-body" id="propsBody">

<script>
window.PE = (function(){
  // State
  let settings = @json($appearance->settings);
  let published = JSON.parse(JSON.stringify(settings));
  const defaults = @json($defaults);
  const presets = @json($presets);
  const csrfToken = '{{ csrf_token() }}';
  const updateUrl = '{{ route("user.appearance.premium.update") }}';
  const presetUrl = '{{ route("user.appearance.premium.preset") }}';
  const versionsUrl = '{{ route("user.appearance.premium.versions") }}';
  const rollbackUrl = '{{ route("user.appearance.premium.rollback") }}';

  function isDirty() {
    return JSON.stringify(settings) !== JSON.stringify(published);
  }

  function updateUI() {
    document.getElementById('draftBadge').style.display = isDirty() ? '' : 'none';
    document.getElementById('btnDiscard').style.display = isDirty() ? '' : 'none';
    sendToPreview();
  }

  function sendToPreview() {
    const iframe = document.getElementById('previewIframe');
    if (iframe && iframe.contentWindow) {
      console.log('[PE-EDITOR] sendToPreview → announcement:', JSON.stringify(settings.header?.announcement || 'N/A'));
      iframe.contentWindow.postMessage({ type:'theme-preview-update', theme:settings }, '*');
    }
  }

  function get(path) {
    return path.split('.').reduce((o,k) => o && o[k], settings);
  }

  function set(path, value) {
    const parts = path.split('.');
    let obj = settings;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!obj[parts[i]]) obj[parts[i]] = {};
      obj = obj[parts[i]];
    }
    obj[parts[parts.length-1]] = value;
    updateUI();
    renderActivePanel();
  }

  // Nav
  function showSection(id, btn) {
    document.querySelectorAll('.pe-nav-item').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');
    document.querySelectorAll('.pe-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('panel-'+id);
    if(panel) panel.classList.add('active');
    const labels = {
      presets:'Temas Prontos',colors:'Cores',typography:'Tipografia',global:'Layout Global',
      buttons:'Botões',inputs:'Formulários',logo:'Logo',header:'Cabeçalho',hero:'Hero / Banner',
      homeSections:'Seções da Home',productCard:'Card de Produto',productPage:'Página de Produto',
      category:'Categoria / Busca',cart:'Carrinho',checkout:'Checkout',footer:'Rodapé',
      whatsapp:'WhatsApp',seo:'SEO',customCode:'Código Custom',
      benefits:'Benefícios', 'trust-bar':'Selos de confiança'
    };
    document.getElementById('propsTitle').textContent = labels[id] || id;
    window._activeSection = id;
    document.dispatchEvent(new CustomEvent('pe-panel-open', { detail: 'panel-'+id }));
  }

  function filterNav(q) {
    q = q.toLowerCase();
    document.querySelectorAll('.pe-nav-item').forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  }

  function renderActivePanel() {
    // Re-render dynamic values in current panel
    document.querySelectorAll('[data-bind]').forEach(el => {
      const path = el.dataset.bind;
      const val = get(path);
      if (el.type === 'checkbox') el.checked = !!val;
      else if (el.type === 'color') el.value = val || '#000000';
      else if (el.type === 'range') { el.value = val; const display = el.parentElement.querySelector('.pe-slider-value'); if(display) display.textContent = val + (el.dataset.suffix||''); }
      else el.value = val ?? '';
    });
  }

  // Device preview
  function setDevice(device, btn) {
    document.querySelectorAll('.pe-device-btn').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');
    const iframe = document.getElementById('previewIframe');
    const widths = { desktop:'100%', tablet:'768px', mobile:'390px' };
    iframe.style.width = widths[device];
  }

  // Save/Publish
  async function publish() {
    try {
      const res = await fetch(updateUrl, {
        method:'POST',
        headers:{'Content-Type':'application/json','X-CSRF-TOKEN':csrfToken,'Accept':'application/json'},
        body: JSON.stringify({ settings: settings })
      });
      const data = await res.json();
      if(data.ok) {
        published = JSON.parse(JSON.stringify(settings));
        updateUI();
        alert('Tema publicado com sucesso!');
      }
    } catch(e) { alert('Erro ao salvar: '+e.message); }
  }

  function discard() {
    settings = JSON.parse(JSON.stringify(published));
    updateUI();
    renderActivePanel();
  }

  function resetToDefault() {
    if(!confirm('Restaurar todas as configurações para o padrão?')) return;
    settings = JSON.parse(JSON.stringify(defaults));
    updateUI();
    renderActivePanel();
  }

  async function applyPreset(key) {
    try {
      const res = await fetch(presetUrl, {
        method:'POST',
        headers:{'Content-Type':'application/json','X-CSRF-TOKEN':csrfToken,'Accept':'application/json'},
        body: JSON.stringify({ preset: key })
      });
      const data = await res.json();
      if(data.ok && data.settings) {
        settings = data.settings;
        updateUI();
        renderActivePanel();
      }
    } catch(e) { alert('Erro: '+e.message); }
  }

  // Versions
  async function showVersions() {
    const modal = document.getElementById('versionsModal');
    modal.style.display = 'flex';
    const list = document.getElementById('versionsList');
    list.innerHTML = '<p style="text-align:center;color:#64748b;padding:32px 0;font-size:13px;">Carregando...</p>';

    try {
      const res = await fetch(versionsUrl, {
        headers: { 'Accept': 'application/json', 'X-CSRF-TOKEN': csrfToken }
      });
      const data = await res.json();
      if (data.ok && data.versions && data.versions.length > 0) {
        list.innerHTML = data.versions.map(v => {
          const d = new Date(v.publishedAt);
          const dateStr = d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', {hour:'2-digit',minute:'2-digit'});
          const note = v.note ? ' — ' + v.note : '';
          return `<div style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:#f8fafc;border-radius:8px;margin-bottom:6px;">
            <div>
              <p style="margin:0;font-size:13px;font-weight:600;color:#0f172a;">Versão ${v.version}</p>
              <p style="margin:2px 0 0;font-size:11px;color:#64748b;">${dateStr}${note}</p>
            </div>
            <button class="pe-btn pe-btn-sm" onclick="PE.rollbackVersion(${v.version})">Restaurar</button>
          </div>`;
        }).join('');
      } else {
        list.innerHTML = '<p style="text-align:center;color:#64748b;padding:32px 0;font-size:13px;">Nenhuma versão publicada ainda.</p>';
      }
    } catch(e) {
      list.innerHTML = '<p style="text-align:center;color:#ef4444;padding:32px 0;font-size:13px;">Erro ao carregar versões.</p>';
    }
  }

  function closeVersions() {
    document.getElementById('versionsModal').style.display = 'none';
  }

  async function rollbackVersion(version) {
    if (!confirm('Restaurar versão ' + version + ' como rascunho?')) return;
    try {
      const res = await fetch(rollbackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken, 'Accept': 'application/json' },
        body: JSON.stringify({ version: version })
      });
      const data = await res.json();
      if (data.ok && data.settings) {
        settings = data.settings;
        updateUI();
        renderActivePanel();
        closeVersions();
        alert('Versão ' + version + ' restaurada como rascunho. Publique para aplicar.');
      } else {
        alert('Versão não encontrada.');
      }
    } catch(e) { alert('Erro: ' + e.message); }
  }


  // --- Preview debug + unified apply patch (minimal hotfix) ---
  const debugState = {
    themeVersion: 1,
    themeHash: '',
    lastPreviewApply: null,
    lastPublish: null,
    lastPreviewAckHash: null
  };

  function stableStringify(obj) {
    if (obj === null || typeof obj !== 'object') return JSON.stringify(obj);
    if (Array.isArray(obj)) return '[' + obj.map(stableStringify).join(',') + ']';
    return '{' + Object.keys(obj).sort().map(k => JSON.stringify(k)+':'+stableStringify(obj[k])).join(',') + '}';
  }
  function hashTheme(obj) {
    const str = stableStringify(obj);
    let h = 0;
    for (let i = 0; i < str.length; i++) { h = ((h << 5) - h) + str.charCodeAt(i); h |= 0; }
    return String(h >>> 0);
  }

  const _setOriginal = set;
  set = function(path, value) {
    _setOriginal(path, value);
    debugState.themeVersion += 1;
    debugState.themeHash = hashTheme(settings);
  }

  const _publishOriginal = publish;
  publish = async function(){
    const res = await _publishOriginal();
    debugState.lastPublish = Date.now();
    debugState.themeHash = hashTheme(settings);
    console.log('[PE-DEBUG] publish', { lastPublish: debugState.lastPublish, themeHash: debugState.themeHash, previewHashEqPublishHash: debugState.lastPreviewAckHash === debugState.themeHash });
    return res;
  }

  sendToPreview = function(){
    const iframe = document.getElementById('previewIframe');
    if (iframe && iframe.contentWindow) {
      const payload = {
        type:'theme-preview-update',
        theme: settings,
        meta: {
          themeVersion: debugState.themeVersion,
          themeHash: debugState.themeHash || hashTheme(settings),
          lastPreviewApply: Date.now(),
          lastPublish: debugState.lastPublish
        }
      };
      debugState.lastPreviewApply = payload.meta.lastPreviewApply;
      iframe.contentWindow.postMessage(payload, '*');
      console.log('[PE-DEBUG] sendToPreview', payload.meta);
    }
  }

  window.addEventListener('message', function(e){
    if (!e.data || !e.data.type) return;
    if (e.data.type === 'PREVIEW_READY') {
      console.log('[PE-DEBUG] PREVIEW_READY');
      sendToPreview();
    }
    if (e.data.type === 'THEME_APPLIED') {
      debugState.lastPreviewAckHash = e.data.meta && e.data.meta.themeHash ? e.data.meta.themeHash : null;
      console.log('[PE-DEBUG] THEME_APPLIED', e.data.meta || {});
    }
  });

  // Init
  setTimeout(() => { updateUI(); }, 500);

  return { showSection, filterNav, setDevice, publish, discard, resetToDefault, applyPreset, showVersions, closeVersions, rollbackVersion, get, set, settings: () => settings, presets };
})();
</script>

        @include('user.appearance.premium-panels')
      </div>
    </div>

    <!-- COL 3: PREVIEW -->
    <div class="pe-preview">
      <div class="pe-preview-toolbar">
        <button class="pe-device-btn active" data-device="desktop" onclick="PE.setDevice('desktop',this)">🖥️</button>
        <button class="pe-device-btn" data-device="tablet" onclick="PE.setDevice('tablet',this)">📱</button>
        <button class="pe-device-btn" data-device="mobile" onclick="PE.setDevice('mobile',this)">📲</button>
      </div>
      <div class="pe-preview-frame">
        <iframe id="previewIframe" style="width:100%;height:100%;" src="/{{ Auth::guard('web')->user()->username }}?theme-preview=true" sandbox="allow-same-origin allow-scripts allow-forms"></iframe>
      </div>
    </div>
  </div>
  <!-- VERSIONS MODAL -->
  <div id="versionsModal" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.5);display:none;align-items:center;justify-content:center;">
    <div style="background:#fff;border-radius:12px;width:500px;max-width:90vw;max-height:80vh;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.3);">
      <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;">
        <div>
          <h2 style="margin:0;font-size:16px;font-weight:700;color:#0f172a;">Histórico de Versões</h2>
          <p style="margin:2px 0 0;font-size:12px;color:#64748b;">Restaure uma versão anterior do tema</p>
        </div>
        <button onclick="PE.closeVersions()" style="background:none;border:none;font-size:20px;cursor:pointer;color:#64748b;padding:4px 8px;">✕</button>
      </div>
      <div id="versionsList" style="padding:12px 20px;max-height:400px;overflow-y:auto;">
        <p style="text-align:center;color:#64748b;padding:32px 0;font-size:13px;">Carregando...</p>
      </div>
    </div>
  </div>
</div>
@endsection


