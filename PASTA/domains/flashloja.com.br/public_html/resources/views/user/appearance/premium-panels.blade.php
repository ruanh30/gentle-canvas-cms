{{-- ============================================ --}}
{{-- PRESETS PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel active" id="panel-presets">
  <div class="pe-section">
    <div class="pe-section-title"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l1.5 4.5H18l-3.5 2.5L16 14.5 12 12l-4 2.5L9.5 10 6 7.5h4.5z"/></svg></div><div><h3>Temas Prontos</h3><p>Comece com um preset e personalize</p></div></div>
    @php
    $presetMeta = [
      'minimal' => ['emoji' => '⬜', 'desc' => 'Design clean e elegante com foco no produto'],
      'modern' => ['emoji' => '🔵', 'desc' => 'Linhas arredondadas, sombras suaves e cores vibrantes'],
      'elegant' => ['emoji' => '🟤', 'desc' => 'Sofisticado com tipografia serifada e tons quentes'],
      'fashion' => ['emoji' => '🖤', 'desc' => 'Tipografia bold, imagens grandes e alto contraste'],
      'luxury' => ['emoji' => '✨', 'desc' => 'Dourado, escuro e premium'],
      'ocean' => ['emoji' => '🌊', 'desc' => 'Tons azuis calmos e refrescantes'],
      'rose' => ['emoji' => '🌸', 'desc' => 'Delicado e feminino com tons de rosa'],
      'nature' => ['emoji' => '🌿', 'desc' => 'Tons verdes e orgânicos para lojas sustentáveis'],
      'dark' => ['emoji' => '🌙', 'desc' => 'Tema escuro moderno e elegante'],
      'brutalist' => ['emoji' => '🟥', 'desc' => 'Estilo ousado com bordas duras e cores fortes'],
      'candy' => ['emoji' => '🍬', 'desc' => 'Colorido e divertido, ideal para lojas jovens'],
      'vintage' => ['emoji' => '📜', 'desc' => 'Retrô com tons sépia e tipografia clássica'],
      'neon' => ['emoji' => '💜', 'desc' => 'Escuro com acentos neon vibrantes'],
      'earth' => ['emoji' => '🏔️', 'desc' => 'Tons terrosos e naturais para marcas artesanais'],
    ];
    @endphp
    @foreach($presets as $key => $preset)
    <button class="pe-preset" onclick="PE.applyPreset('{{ $key }}')">
      <span class="pe-preset-emoji">{{ $presetMeta[$key]['emoji'] ?? '🎨' }}</span>
      <div class="pe-preset-info">
        <div class="pe-preset-name">{{ $preset['label'] }}</div>
        <div class="pe-preset-desc">{{ $presetMeta[$key]['desc'] ?? '' }}</div>
      </div>
      <div class="pe-preset-colors">
        <div class="pe-preset-dot" style="background:{{ $preset['colors']['primary'] ?? '#000' }}"></div>
        <div class="pe-preset-dot" style="background:{{ $preset['colors']['accent'] ?? '#666' }}"></div>
        <div class="pe-preset-dot" style="background:{{ $preset['colors']['buyNow'] ?? '#333' }}"></div>
      </div>
    </button>
    @endforeach
  </div>
</div>

{{-- ============================================ --}}
{{-- COLORS PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-colors">
  <div class="pe-section">
    <div class="pe-section-title"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 0 0 0 14h7"/></svg></div><div><h3>Paleta de Cores</h3><p>Defina todas as cores da sua loja</p></div></div>
  </div>

  <div class="pe-divider"><span>Principais</span></div>
  <div class="pe-color-grid">
    @foreach([
      'colors.primary' => 'Primária',
      'colors.primaryForeground' => 'Texto sobre primária',
      'colors.secondary' => 'Secundária',
      'colors.secondaryForeground' => 'Texto sobre secundária',
    ] as $path => $label)
    <div class="pe-field">
      <label class="pe-label">{{ $label }}</label>
      <div class="pe-color-field">
        <div class="pe-color-swatch"><input type="color" data-bind="{{ $path }}" oninput="PE.set('{{ $path }}',this.value)" onchange="PE.set('{{ $path }}',this.value)"></div>
        <input type="text" class="pe-input pe-color-hex" data-bind="{{ $path }}" oninput="PE.set('{{ $path }}',this.value)" onchange="PE.set('{{ $path }}',this.value)" maxlength="7">
      </div>
    </div>
    @endforeach
  </div>

  <div class="pe-divider"><span>Superfícies</span></div>
  <div class="pe-color-grid">
    @foreach([
      'colors.background' => 'Fundo',
      'colors.foreground' => 'Texto',
      'colors.accent' => 'Destaque',
      'colors.accentForeground' => 'Texto destaque',
      'colors.muted' => 'Suave (muted)',
      'colors.mutedForeground' => 'Texto suave',
      'colors.border' => 'Bordas',
    ] as $path => $label)
    <div class="pe-field">
      <label class="pe-label">{{ $label }}</label>
      <div class="pe-color-field">
        <div class="pe-color-swatch"><input type="color" data-bind="{{ $path }}" oninput="PE.set('{{ $path }}',this.value)" onchange="PE.set('{{ $path }}',this.value)"></div>
        <input type="text" class="pe-input pe-color-hex" data-bind="{{ $path }}" oninput="PE.set('{{ $path }}',this.value)" onchange="PE.set('{{ $path }}',this.value)" maxlength="7">
      </div>
    </div>
    @endforeach
  </div>

  <div class="pe-divider"><span>Status</span></div>
  <div class="pe-color-grid">
    @foreach([
      'colors.success' => 'Sucesso',
      'colors.warning' => 'Alerta',
      'colors.error' => 'Erro',
    ] as $path => $label)
    <div class="pe-field">
      <label class="pe-label">{{ $label }}</label>
      <div class="pe-color-field">
        <div class="pe-color-swatch"><input type="color" data-bind="{{ $path }}" oninput="PE.set('{{ $path }}',this.value)" onchange="PE.set('{{ $path }}',this.value)"></div>
        <input type="text" class="pe-input pe-color-hex" data-bind="{{ $path }}" oninput="PE.set('{{ $path }}',this.value)" onchange="PE.set('{{ $path }}',this.value)" maxlength="7">
      </div>
    </div>
    @endforeach
  </div>

  <div class="pe-divider"><span>Ação de Compra</span></div>
  <div class="pe-color-grid">
    @foreach([
      'colors.buyNow' => 'Botão Comprar',
      'colors.buyNowHover' => 'Hover Comprar',
    ] as $path => $label)
    <div class="pe-field">
      <label class="pe-label">{{ $label }}</label>
      <div class="pe-color-field">
        <div class="pe-color-swatch"><input type="color" data-bind="{{ $path }}" oninput="PE.set('{{ $path }}',this.value)" onchange="PE.set('{{ $path }}',this.value)"></div>
        <input type="text" class="pe-input pe-color-hex" data-bind="{{ $path }}" oninput="PE.set('{{ $path }}',this.value)" onchange="PE.set('{{ $path }}',this.value)" maxlength="7">
      </div>
    </div>
    @endforeach
  </div>
</div>

{{-- ============================================ --}}
{{-- TYPOGRAPHY PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-typography">
  <div class="pe-section">
    <div class="pe-section-title"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg></div><div><h3>Tipografia</h3><p>Fontes, tamanhos e espaçamentos</p></div></div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Fonte dos títulos</label>
    <select class="pe-input pe-select" data-bind="typography.headingFont" onchange="PE.set('typography.headingFont',this.value)">
      @foreach(['Playfair Display','Poppins','Montserrat','Lora','Merriweather','Raleway','Oswald','Cormorant Garamond','DM Serif Display','Libre Baskerville'] as $f)
      <option value="{{ $f }}">{{ $f }}</option>
      @endforeach
    </select>
  </div>
  <div class="pe-field">
    <label class="pe-label">Fonte do corpo</label>
    <select class="pe-input pe-select" data-bind="typography.bodyFont" onchange="PE.set('typography.bodyFont',this.value)">
      @foreach(['Inter','Roboto','Open Sans','Lato','Nunito','Work Sans','DM Sans','Source Sans 3','Rubik','Manrope'] as $f)
      <option value="{{ $f }}">{{ $f }}</option>
      @endforeach
    </select>
  </div>
  <div class="pe-divider"><span>Ajustes</span></div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Tamanho base</label><span class="pe-slider-value">16px</span></div>
    <input type="range" class="pe-slider" data-bind="typography.baseFontSize" data-suffix="px" min="12" max="20" step="1" oninput="PE.set('typography.baseFontSize',+this.value)">
  </div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Peso dos títulos</label><span class="pe-slider-value">700</span></div>
    <input type="range" class="pe-slider" data-bind="typography.headingWeight" min="300" max="900" step="100" oninput="PE.set('typography.headingWeight',+this.value)">
  </div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Peso do corpo</label><span class="pe-slider-value">400</span></div>
    <input type="range" class="pe-slider" data-bind="typography.bodyWeight" min="300" max="700" step="100" oninput="PE.set('typography.bodyWeight',+this.value)">
  </div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Altura da linha</label><span class="pe-slider-value">1.6</span></div>
    <input type="range" class="pe-slider" data-bind="typography.lineHeight" min="1" max="2" step="0.05" oninput="PE.set('typography.lineHeight',+this.value)">
  </div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Espaço entre letras</label><span class="pe-slider-value">0em</span></div>
    <input type="range" class="pe-slider" data-bind="typography.letterSpacing" data-suffix="em" min="-0.05" max="0.2" step="0.01" oninput="PE.set('typography.letterSpacing',+this.value)">
  </div>
  <div class="pe-divider"><span>Preview</span></div>
  <div class="pe-preview-box" id="typography-preview">
    <p class="pe-preview-heading" style="font-size:20px;font-weight:700">Título de exemplo</p>
    <p class="pe-preview-body" style="font-size:14px">Este é um texto de corpo para visualizar como fica a tipografia selecionada.</p>
  </div>
</div>

{{-- ============================================ --}}
{{-- GLOBAL PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-global">
  <div class="pe-section">
    <div class="pe-section-title"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg></div><div><h3>Layout Global</h3><p>Container, espaçamento, bordas e efeitos</p></div></div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Largura do container</label>
    <select class="pe-input pe-select" data-bind="global.containerWidth" onchange="PE.set('global.containerWidth',this.value)">
      <option value="narrow">Estreito (1200px)</option>
      <option value="default">Padrão (1400px)</option>
      <option value="wide">Largo (1600px)</option>
      <option value="full">Tela cheia</option>
    </select>
  </div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Largura máx.</label><span class="pe-slider-value">1400px</span></div>
    <input type="range" class="pe-slider" data-bind="global.containerMaxPx" data-suffix="px" min="960" max="1920" step="20" oninput="PE.set('global.containerMaxPx',+this.value)">
  </div>
  <div class="pe-divider"><span>Espaçamento</span></div>
  <div class="pe-field">
    <label class="pe-label">Espaço entre seções</label>
    <div class="pe-options" style="grid-template-columns:repeat(3,1fr)">
      @foreach(['compact'=>'Compacto','normal'=>'Normal','spacious'=>'Espaçoso'] as $v => $l)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('global.sectionSpacing','{{ $v }}');PE.activateOpt(this)" data-optgroup="spacing"><div class="pe-option-label">{{ $l }}</div></div>
      @endforeach
    </div>
  </div>
  <div class="pe-divider"><span>Bordas e Sombras</span></div>
  <div class="pe-field">
    <label class="pe-label">Arredondamento</label>
    <div class="pe-options" style="grid-template-columns:repeat(5,1fr)">
      @foreach(['none'=>'Nenhum','small'=>'Pequeno','medium'=>'Médio','large'=>'Grande','full'=>'Máximo'] as $v => $l)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('global.borderRadius','{{ $v }}');PE.activateOpt(this)" data-optgroup="radius"><div class="pe-option-label" style="font-size:9px">{{ $l }}</div></div>
      @endforeach
    </div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Sombras</label>
    <div class="pe-options" style="grid-template-columns:repeat(4,1fr)">
      @foreach(['none'=>'Nenhuma','subtle'=>'Suave','medium'=>'Média','strong'=>'Forte'] as $v => $l)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('global.shadowLevel','{{ $v }}');PE.activateOpt(this)" data-optgroup="shadow"><div class="pe-option-label" style="font-size:9px">{{ $l }}</div></div>
      @endforeach
    </div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Bordas</label>
    <div class="pe-options" style="grid-template-columns:repeat(4,1fr)">
      @foreach(['none'=>'Nenhuma','thin'=>'Fina','medium'=>'Média','thick'=>'Grossa'] as $v => $l)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('global.borderStyle','{{ $v }}');PE.activateOpt(this)" data-optgroup="bstyle"><div class="pe-option-label" style="font-size:9px">{{ $l }}</div></div>
      @endforeach
    </div>
  </div>
  <div class="pe-divider"><span>Animações</span></div>
  <div class="pe-toggle">
    <div><div class="pe-toggle-label">Animações habilitadas</div></div>
    <label class="pe-switch"><input type="checkbox" data-bind="global.animationsEnabled" onchange="PE.set('global.animationsEnabled',this.checked)"><span class="slider"></span></label>
  </div>
  <div class="pe-field">
    <label class="pe-label">Velocidade</label>
    <div class="pe-options" style="grid-template-columns:repeat(3,1fr)">
      @foreach(['slow'=>'Lenta','normal'=>'Normal','fast'=>'Rápida'] as $v => $l)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('global.animationSpeed','{{ $v }}');PE.activateOpt(this)"><div class="pe-option-label">{{ $l }}</div></div>
      @endforeach
    </div>
  </div>
</div>

{{-- ============================================ --}}
{{-- BUTTONS PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-buttons">
  <div class="pe-section">
    <div class="pe-section-title"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M9 12h6"/></svg></div><div><h3>Botões</h3><p>Estilo global dos botões</p></div></div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Estilo</label>
    <div class="pe-options" style="grid-template-columns:repeat(4,1fr)">
      @foreach([
        'filled'=>['Sólido','Fundo preenchido'],
        'outline'=>['Contorno','Apenas borda'],
        'ghost'=>['Fantasma','Sem fundo/borda'],
        'soft'=>['Suave','Fundo translúcido'],
        'gradient'=>['Gradiente','Fundo degradê'],
        '3d'=>['3D','Com profundidade'],
        'neon'=>['Neon','Brilho luminoso'],
        'minimal'=>['Minimal','Apenas texto sublinhado'],
      ] as $v => $info)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('buttons.style','{{ $v }}');PE.activateOpt(this)" data-optgroup="bstyle">
        <div class="pe-option-label" style="font-size:9px">{{ $info[0] }}</div>
        <div class="pe-option-desc">{{ $info[1] }}</div>
      </div>
      @endforeach
    </div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Arredondamento</label>
    <div class="pe-options" style="grid-template-columns:repeat(5,1fr)">
      @foreach(['none'=>'Nenhum','small'=>'Pequeno','medium'=>'Médio','large'=>'Grande','full'=>'Pílula'] as $v => $l)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('buttons.radius','{{ $v }}');PE.activateOpt(this)"><div class="pe-option-label" style="font-size:9px">{{ $l }}</div></div>
      @endforeach
    </div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Tamanho</label>
    <div class="pe-options" style="grid-template-columns:repeat(3,1fr)">
      @foreach(['small'=>'Pequeno','medium'=>'Médio','large'=>'Grande'] as $v => $l)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('buttons.size','{{ $v }}');PE.activateOpt(this)"><div class="pe-option-label">{{ $l }}</div></div>
      @endforeach
    </div>
  </div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Peso da fonte</label><span class="pe-slider-value">600</span></div>
    <input type="range" class="pe-slider" data-bind="buttons.fontWeight" min="400" max="800" step="100" oninput="PE.set('buttons.fontWeight',+this.value)">
  </div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Texto maiúsculo</div></div><label class="pe-switch"><input type="checkbox" data-bind="buttons.uppercase" onchange="PE.set('buttons.uppercase',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Sombra</div></div><label class="pe-switch"><input type="checkbox" data-bind="buttons.shadow" onchange="PE.set('buttons.shadow',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-divider"><span>Preview</span></div>
  <div class="pe-preview-box" id="buttons-preview" style="display:flex;gap:8px;flex-wrap:wrap">
    <button class="pe-preview-btn pe-preview-btn-primary">Primário</button>
    <button class="pe-preview-btn pe-preview-btn-outline">Contorno</button>
    <button class="pe-preview-btn pe-preview-btn-ghost">Fantasma</button>
  </div>
</div>

{{-- ============================================ --}}
{{-- INPUTS PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-inputs">
  <div class="pe-section">
    <div class="pe-section-title"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="7" y1="12" x2="7" y2="12.01"/></svg></div><div><h3>Formulários</h3><p>Estilo dos campos de entrada</p></div></div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Estilo</label>
    <div class="pe-options" style="grid-template-columns:repeat(3,1fr)">
      @foreach(['default'=>'Padrão','filled'=>'Preenchido','underline'=>'Sublinhado'] as $v => $l)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('inputs.style','{{ $v }}');PE.activateOpt(this)"><div class="pe-option-label">{{ $l }}</div></div>
      @endforeach
    </div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Arredondamento</label>
    <div class="pe-options" style="grid-template-columns:repeat(4,1fr)">
      @foreach(['none'=>'Nenhum','small'=>'Pequeno','medium'=>'Médio','large'=>'Grande'] as $v => $l)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('inputs.radius','{{ $v }}');PE.activateOpt(this)"><div class="pe-option-label">{{ $l }}</div></div>
      @endforeach
    </div>
  </div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Anel de foco</div><div class="pe-toggle-desc">Mostrar anel ao focar no campo</div></div><label class="pe-switch"><input type="checkbox" data-bind="inputs.focusRing" onchange="PE.set('inputs.focusRing',this.checked)"><span class="slider"></span></label></div>
</div>

{{-- ============================================ --}}
{{-- LOGO PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-logo">
  <div class="pe-section">
    <div class="pe-section-title"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div><div><h3>Logo</h3><p>Configure o logo da sua loja</p></div></div>
  </div>
  <div class="pe-field"><label class="pe-label">Nome da loja</label><input type="text" class="pe-input" data-bind="logo.text" onchange="PE.set('logo.text',this.value)" placeholder="Minha Loja"></div>
  <div class="pe-field"><label class="pe-label">URL da imagem</label><input type="text" class="pe-input" data-bind="logo.imageUrl" onchange="PE.set('logo.imageUrl',this.value)" placeholder="https://..."></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Mostrar nome como texto</div></div><label class="pe-switch"><input type="checkbox" data-bind="logo.showText" onchange="PE.set('logo.showText',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Altura máx. do logo</label><span class="pe-slider-value">48px</span></div>
    <input type="range" class="pe-slider" data-bind="logo.maxHeight" data-suffix="px" min="24" max="80" step="2" oninput="PE.set('logo.maxHeight',+this.value)">
  </div>
  <div class="pe-field">
    <label class="pe-label">Posição</label>
    <div class="pe-options" style="grid-template-columns:repeat(2,1fr)">
      <div class="pe-option" data-optval="left" onclick="PE.set('logo.position','left');PE.activateOpt(this)"><div class="pe-option-label">Esquerda</div></div>
      <div class="pe-option" data-optval="center" onclick="PE.set('logo.position','center');PE.activateOpt(this)"><div class="pe-option-label">Centro</div></div>
    </div>
  </div>
  <div class="pe-divider"><span>Preview</span></div>
  <div class="pe-preview-box" id="logo-preview" style="display:flex;align-items:center;gap:8px">
    <span class="pe-preview-logo-text" style="font-size:18px;font-weight:700">MODA STORE</span>
  </div>
</div>

{{-- ============================================ --}}
{{-- HEADER PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-header">
  <div class="pe-section">
    <div class="pe-section-title"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="8" rx="1"/><rect x="3" y="13" width="18" height="8" rx="1"/></svg></div><div><h3>Cabeçalho</h3><p>Layout, menu, busca e barra de anúncio</p></div></div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Layout</label>
    <div class="pe-options" style="grid-template-columns:repeat(3,1fr)">
      @foreach([
        'classic'=>['Clássico','Logo esq., nav dir.'],
        'centered'=>['Centralizado','Logo centro, nav abaixo'],
        'minimal'=>['Minimalista','Limpo e simples'],
        'logo-center-nav-left'=>['Nav Esq.','Nav esq., logo centro'],
        'hamburger-only'=>['Hambúrguer','Menu recolhido sempre'],
        'top-bar-split'=>['Dividido','Nav esq. + ações dir.'],
        'double-row'=>['Duas Linhas','Logo em cima, nav embaixo'],
        'sidebar-nav'=>['Nav Lateral','Menu lateral deslizante'],
        'transparent'=>['Transparente','Sobre o hero/banner'],
      ] as $v => $info)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('header.layout','{{ $v }}');PE.activateOpt(this)">
        <div class="pe-option-label" style="font-size:9px">{{ $info[0] }}</div>
        <div class="pe-option-desc">{{ $info[1] }}</div>
      </div>
      @endforeach
    </div>
  </div>
  <div class="pe-divider"><span>Comportamento</span></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Header fixo (sticky)</div><div class="pe-toggle-desc">Mantém o cabeçalho visível ao rolar a página</div></div><label class="pe-switch"><input type="checkbox" data-bind="header.sticky" onchange="PE.set('header.sticky',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Encolher ao rolar</div><div class="pe-toggle-desc">O cabeçalho diminui de tamanho ao rolar para baixo</div></div><label class="pe-switch"><input type="checkbox" data-bind="header.shrinkOnScroll" onchange="PE.set('header.shrinkOnScroll',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Sombra ao rolar</div><div class="pe-toggle-desc">Adiciona sombra ao cabeçalho quando a página é rolada</div></div><label class="pe-switch"><input type="checkbox" data-bind="header.shadowOnScroll" onchange="PE.set('header.shadowOnScroll',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Borda inferior</div><div class="pe-toggle-desc">Linha sutil na parte inferior do cabeçalho</div></div><label class="pe-switch"><input type="checkbox" data-bind="header.borderBottom" onchange="PE.set('header.borderBottom',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Altura</label><span class="pe-slider-value">72px</span></div>
    <input type="range" class="pe-slider" data-bind="header.height" data-suffix="px" min="48" max="96" step="2" oninput="PE.set('header.height',+this.value)">
  </div>
  <div class="pe-divider"><span>Menu</span></div>
  <div class="pe-field">
    <label class="pe-label">Estilo do menu</label>
    <select class="pe-input pe-select" data-bind="header.menuStyle" onchange="PE.set('header.menuStyle',this.value)">
      <option value="horizontal">Horizontal</option><option value="dropdown">Dropdown</option><option value="mega-menu">Mega Menu</option>
    </select>
  </div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Tamanho da fonte</label><span class="pe-slider-value">14px</span></div>
    <input type="range" class="pe-slider" data-bind="header.menuFontSize" data-suffix="px" min="10" max="18" step="1" oninput="PE.set('header.menuFontSize',+this.value)">
  </div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Maiúsculas</div><div class="pe-toggle-desc">Transforma o texto do menu em letras maiúsculas</div></div><label class="pe-switch"><input type="checkbox" data-bind="header.menuUppercase" onchange="PE.set('header.menuUppercase',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-divider"><span>Ícones e Ações</span></div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Tamanho dos ícones</label><span class="pe-slider-value">20px</span></div>
    <input type="range" class="pe-slider" data-bind="header.iconSize" data-suffix="px" min="16" max="28" step="1" oninput="PE.set('header.iconSize',+this.value)">
  </div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Busca</div><div class="pe-toggle-desc">Exibe o ícone de busca no cabeçalho</div></div><label class="pe-switch"><input type="checkbox" data-bind="header.showSearch" onchange="PE.set('header.showSearch',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field">
    <label class="pe-label">Estilo da busca</label>
    <select class="pe-input pe-select" data-bind="header.searchStyle" onchange="PE.set('header.searchStyle',this.value)">
      <option value="inline">Inline</option><option value="modal">Modal</option><option value="drawer">Drawer</option>
    </select>
  </div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Conta</div><div class="pe-toggle-desc">Exibe ícone de login/conta do usuário</div></div><label class="pe-switch"><input type="checkbox" data-bind="header.showAccount" onchange="PE.set('header.showAccount',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Wishlist</div><div class="pe-toggle-desc">Exibe ícone de lista de desejos</div></div><label class="pe-switch"><input type="checkbox" data-bind="header.showWishlist" onchange="PE.set('header.showWishlist',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Carrinho</div><div class="pe-toggle-desc">Exibe ícone do carrinho de compras</div></div><label class="pe-switch"><input type="checkbox" data-bind="header.showCart" onchange="PE.set('header.showCart',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field">
    <label class="pe-label">Badge do carrinho</label>
    <select class="pe-input pe-select" data-bind="header.cartBadgeStyle" onchange="PE.set('header.cartBadgeStyle',this.value)">
      <option value="count">Contador</option><option value="dot">Ponto</option><option value="none">Nenhum</option>
    </select>
  </div>

  <div class="pe-divider"><span>Barra de Anúncio (Topo)</span></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Ativar barra</div><div class="pe-toggle-desc">Barra no topo do site com mensagens promocionais (ex: Frete Grátis)</div></div><label class="pe-switch"><input type="checkbox" data-bind="header.announcement.enabled" onchange="PE.set('header.announcement.enabled',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field">
    <label class="pe-label">Estilo</label>
    <div class="pe-options" style="grid-template-columns:repeat(3,1fr)">
      @foreach([
        'static'=>['Estático','Mensagem fixa'],
        'carousel'=>['Carrossel','Rotação de msgs'],
        'ticker'=>['Ticker','Texto corrido'],
      ] as $v => $info)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('header.announcement.style','{{ $v }}');PE.activateOpt(this)">
        <div class="pe-option-label">{{ $info[0] }}</div>
        <div class="pe-option-desc">{{ $info[1] }}</div>
      </div>
      @endforeach
    </div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Direção</label>
    <div class="pe-options" style="grid-template-columns:repeat(2,1fr)">
      @foreach([
        'rtl'=>['← Esq.','Direita para esquerda'],
        'ltr'=>['Dir. →','Esquerda para direita'],
      ] as $v => $info)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('header.announcement.direction','{{ $v }}');PE.activateOpt(this)">
        <div class="pe-option-label">{{ $info[0] }}</div>
        <div class="pe-option-desc">{{ $info[1] }}</div>
      </div>
      @endforeach
    </div>
  </div>
  <div class="pe-field"><label class="pe-label">Mensagem 1</label><input type="text" class="pe-input" data-bind="header.announcement.messages.0" onchange="var m=PE.get('header.announcement.messages')||[];m[0]=this.value;PE.set('header.announcement.messages',m)" placeholder="Frete grátis acima de R$ 299"></div>
  <div class="pe-field"><label class="pe-label">Mensagem 2</label><input type="text" class="pe-input" data-bind="header.announcement.messages.1" onchange="var m=PE.get('header.announcement.messages')||[];m[1]=this.value;PE.set('header.announcement.messages',m)" placeholder="Parcele em até 12x"></div>
  <div class="pe-field"><label class="pe-label">Mensagem 3</label><input type="text" class="pe-input" data-bind="header.announcement.messages.2" onchange="var m=PE.get('header.announcement.messages')||[];m[2]=this.value;PE.set('header.announcement.messages',m)" placeholder="Troca grátis em 30 dias"></div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Velocidade</label><span class="pe-slider-value">5s</span></div>
    <input type="range" class="pe-slider" data-bind="header.announcement.speed" data-suffix="s" min="2" max="10" step="1" oninput="PE.set('header.announcement.speed',+this.value)">
  </div>
  <div class="pe-color-grid">
    <div class="pe-field">
      <label class="pe-label">Fundo</label>
      <div class="pe-color-field">
        <div class="pe-color-swatch"><input type="color" data-bind="header.announcement.backgroundColor" onchange="PE.set('header.announcement.backgroundColor',this.value)"></div>
        <input type="text" class="pe-input pe-color-hex" data-bind="header.announcement.backgroundColor" onchange="PE.set('header.announcement.backgroundColor',this.value)">
      </div>
    </div>
    <div class="pe-field">
      <label class="pe-label">Texto</label>
      <div class="pe-color-field">
        <div class="pe-color-swatch"><input type="color" data-bind="header.announcement.textColor" onchange="PE.set('header.announcement.textColor',this.value)"></div>
        <input type="text" class="pe-input pe-color-hex" data-bind="header.announcement.textColor" onchange="PE.set('header.announcement.textColor',this.value)">
      </div>
    </div>
  </div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Pausar no hover</div><div class="pe-toggle-desc">Pausa a animação quando o mouse está sobre a barra</div></div><label class="pe-switch"><input type="checkbox" data-bind="header.announcement.pauseOnHover" onchange="PE.set('header.announcement.pauseOnHover',this.checked)"><span class="slider"></span></label></div>

  <div class="pe-divider"><span>Banner abaixo do Cabeçalho</span></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Ativar banner</div><div class="pe-toggle-desc">Exibe um banner com imagem logo abaixo do cabeçalho</div></div><label class="pe-switch"><input type="checkbox" data-bind="header.bannerBelow.enabled" onchange="PE.set('header.bannerBelow.enabled',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field"><label class="pe-label">URL da imagem principal</label><input type="text" class="pe-input" data-bind="header.bannerBelow.imageUrl" onchange="PE.set('header.bannerBelow.imageUrl',this.value)" placeholder="https://..."></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Carrossel de imagens</div><div class="pe-toggle-desc">Ativa rotação automática entre múltiplas imagens no banner</div></div><label class="pe-switch"><input type="checkbox" data-bind="header.bannerBelow.carousel" onchange="PE.set('header.bannerBelow.carousel',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field"><label class="pe-label">Imagem 2</label><input type="text" class="pe-input" data-bind="header.bannerBelow.images.0" onchange="var imgs=PE.get('header.bannerBelow.images')||[];imgs[0]=this.value;PE.set('header.bannerBelow.images',imgs.filter(Boolean))" placeholder="https://..."></div>
  <div class="pe-field"><label class="pe-label">Imagem 3</label><input type="text" class="pe-input" data-bind="header.bannerBelow.images.1" onchange="var imgs=PE.get('header.bannerBelow.images')||[];imgs[1]=this.value;PE.set('header.bannerBelow.images',imgs.filter(Boolean))" placeholder="https://..."></div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Velocidade do carrossel</label><span class="pe-slider-value">5s</span></div>
    <input type="range" class="pe-slider" data-bind="header.bannerBelow.carouselSpeed" data-suffix="s" min="2" max="10" step="1" oninput="PE.set('header.bannerBelow.carouselSpeed',+this.value)">
  </div>
  <div class="pe-field"><label class="pe-label">Link</label><input type="text" class="pe-input" data-bind="header.bannerBelow.link" onchange="PE.set('header.bannerBelow.link',this.value)" placeholder="/products"></div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Altura</label><span class="pe-slider-value">60px</span></div>
    <input type="range" class="pe-slider" data-bind="header.bannerBelow.height" data-suffix="px" min="40" max="200" step="10" oninput="PE.set('header.bannerBelow.height',+this.value)">
  </div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Largura total</div><div class="pe-toggle-desc">Banner ocupa toda a largura da tela</div></div><label class="pe-switch"><input type="checkbox" data-bind="header.bannerBelow.fullWidth" onchange="PE.set('header.bannerBelow.fullWidth',this.checked)"><span class="slider"></span></label></div>
</div>

{{-- ============================================ --}}
{{-- HERO PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-hero">
  <div class="pe-section">
    <div class="pe-section-title"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg></div><div><h3>Hero / Banner</h3><p>Banner principal da home</p></div></div>
  </div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Exibir hero</div></div><label class="pe-switch"><input type="checkbox" data-bind="hero.enabled" onchange="PE.set('hero.enabled',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field">
    <label class="pe-label">Altura</label>
    <div class="pe-options" style="grid-template-columns:repeat(4,1fr)">
      @foreach(['small'=>'Pequeno','medium'=>'Médio','large'=>'Grande','fullscreen'=>'Tela cheia'] as $v => $l)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('hero.height','{{ $v }}');PE.activateOpt(this)"><div class="pe-option-label" style="font-size:9px">{{ $l }}</div></div>
      @endforeach
    </div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Transição</label>
    <select class="pe-input pe-select" data-bind="hero.transition" onchange="PE.set('hero.transition',this.value)">
      <option value="fade">Fade</option><option value="slide">Slide</option><option value="zoom">Zoom</option>
    </select>
  </div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Autoplay</div></div><label class="pe-switch"><input type="checkbox" data-bind="hero.autoplay" onchange="PE.set('hero.autoplay',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Velocidade</label><span class="pe-slider-value">5s</span></div>
    <input type="range" class="pe-slider" data-bind="hero.autoplaySpeed" data-suffix="s" min="2" max="10" step="1" oninput="PE.set('hero.autoplaySpeed',+this.value)">
  </div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Dots</div></div><label class="pe-switch"><input type="checkbox" data-bind="hero.showDots" onchange="PE.set('hero.showDots',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Setas</div></div><label class="pe-switch"><input type="checkbox" data-bind="hero.showArrows" onchange="PE.set('hero.showArrows',this.checked)"><span class="slider"></span></label></div>

  <div class="pe-divider"><span>Slides do Hero</span></div>
  @foreach([0,1,2] as $i)
  <div class="pe-slide-group" style="border:1px solid var(--pe-border);border-radius:6px;padding:10px;margin-bottom:10px;background:#f8fafc">
    <div class="pe-slide-title" style="font-size:12px;font-weight:600;margin-bottom:8px">Slide {{ $i + 1 }}</div>
    <div class="pe-field"><label class="pe-label">Imagem de Fundo</label><input type="text" class="pe-input" data-bind="hero.slides.{{ $i }}.backgroundImage" onchange="PE.set('hero.slides.{{ $i }}.backgroundImage',this.value)" placeholder="https://..."></div>
    <div class="pe-field"><label class="pe-label">Título</label><textarea class="pe-input pe-textarea" data-bind="hero.slides.{{ $i }}.title" onchange="PE.set('hero.slides.{{ $i }}.title',this.value)"></textarea></div>
    <div class="pe-field"><label class="pe-label">Subtítulo</label><input type="text" class="pe-input" data-bind="hero.slides.{{ $i }}.subtitle" onchange="PE.set('hero.slides.{{ $i }}.subtitle',this.value)"></div>
    <div class="pe-field"><label class="pe-label">Descrição</label><textarea class="pe-input pe-textarea" data-bind="hero.slides.{{ $i }}.description" onchange="PE.set('hero.slides.{{ $i }}.description',this.value)"></textarea></div>
    <div class="pe-field"><label class="pe-label">Botão (Texto)</label><input type="text" class="pe-input" data-bind="hero.slides.{{ $i }}.ctaText" onchange="PE.set('hero.slides.{{ $i }}.ctaText',this.value)"></div>
    <div class="pe-field"><label class="pe-label">Botão (Link)</label><input type="text" class="pe-input" data-bind="hero.slides.{{ $i }}.ctaLink" onchange="PE.set('hero.slides.{{ $i }}.ctaLink',this.value)"></div>
    <div class="pe-field">
      <label class="pe-label">Alinhamento</label>
      <div class="pe-options" style="grid-template-columns:repeat(3,1fr)">
        @foreach(['left'=>'Esq','center'=>'Cen','right'=>'Dir'] as $v => $l)
        <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('hero.slides.{{ $i }}.contentAlign','{{ $v }}');PE.activateOpt(this)"><div class="pe-option-label">{{ $l }}</div></div>
        @endforeach
      </div>
    </div>
    <div class="pe-field">
        <label class="pe-label">Cor do Texto</label>
        <div class="pe-color-field">
            <div class="pe-color-swatch"><input type="color" data-bind="hero.slides.{{ $i }}.textColor" onchange="PE.set('hero.slides.{{ $i }}.textColor',this.value)"></div>
            <input type="text" class="pe-input pe-color-hex" data-bind="hero.slides.{{ $i }}.textColor" onchange="PE.set('hero.slides.{{ $i }}.textColor',this.value)">
        </div>
    </div>
    <div class="pe-field">
      <label class="pe-label">Overlay (Cor/Opacidade)</label>
      <div style="display:flex;gap:8px;align-items:center">
         <div class="pe-color-field" style="flex:1">
            <div class="pe-color-swatch"><input type="color" data-bind="hero.slides.{{ $i }}.overlayColor" onchange="PE.set('hero.slides.{{ $i }}.overlayColor',this.value)"></div>
            <input type="text" class="pe-input pe-color-hex" data-bind="hero.slides.{{ $i }}.overlayColor" onchange="PE.set('hero.slides.{{ $i }}.overlayColor',this.value)">
         </div>
         <input type="range" class="pe-slider" style="flex:1" data-bind="hero.slides.{{ $i }}.overlayOpacity" min="0" max="1" step="0.05" oninput="PE.set('hero.slides.{{ $i }}.overlayOpacity',+this.value)">
      </div>
    </div>
  </div>
  @endforeach
</div>

{{-- ============================================ --}}
{{-- HOME SECTIONS PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-homeSections">
  <div class="pe-section">
    <div class="pe-section-title"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></div><div><h3>Seções da Home</h3><p>Ative, desative, renomeie e reordene as seções</p></div></div>
  </div>
  <p style="font-size:11px;color:var(--pe-muted);margin-bottom:10px">Use as setas para reordenar. Clique no lápis para renomear. Toggle para ativar/desativar.</p>
  <div id="homeSectionsList"></div>
  <div id="homeSectionAdd" style="display:none;border:1px solid var(--pe-border);border-radius:8px;padding:10px;margin-top:8px">
    <select id="newSectionType" class="pe-input pe-select" style="margin-bottom:6px">
      <option value="hero">Hero Banner</option>
      <option value="categories">Categorias</option>
      <option value="featured-products">Produtos em Destaque</option>
      <option value="banner">Banner Promocional</option>
      <option value="benefits">Benefícios</option>
      <option value="testimonials">Depoimentos</option>
      <option value="brands">Marcas</option>
      <option value="newsletter">Newsletter</option>
      <option value="trust-bar">Selos de Confiança</option>
      <option value="custom-html">HTML Customizado</option>
    </select>
    <input type="text" id="newSectionTitle" class="pe-input" placeholder="Nome da seção" style="margin-bottom:6px">
    <div style="display:flex;gap:6px">
      <button class="pe-btn pe-btn-sm" style="flex:1" onclick="PE.addHomeSection()">Adicionar</button>
      <button class="pe-btn pe-btn-sm" style="opacity:.7" onclick="document.getElementById('homeSectionAdd').style.display='none'">Cancelar</button>
    </div>
  </div>
  <button class="pe-btn pe-btn-sm" id="btnAddSection" style="width:100%;margin-top:8px" onclick="document.getElementById('homeSectionAdd').style.display='block';this.style.display='none'">+ Adicionar seção</button>
  <script>
  PE.renderHomeSections = function() {
    const sections = PE.get('homepageSections') || PE.get('homeSections') || [];
    const el = document.getElementById('homeSectionsList');
    if(!el) return;
    el.innerHTML = sections.map((s,i) => {
      const editId = 'edit-section-' + i;
      return `
      <div class="pe-sortable-item ${s.enabled?'':'disabled'}">
        <span class="pe-grip">⠿</span>
        <span class="pe-sortable-name" id="name-${i}" ondblclick="PE.startEditSection(${i})">${s.title}</span>
        <input type="text" id="${editId}" class="pe-input" style="display:none;flex:1;height:24px;font-size:11px" value="${s.title}" onkeydown="if(event.key==='Enter')PE.saveEditSection(${i})" onblur="PE.saveEditSection(${i})">
        <button class="pe-btn pe-btn-sm" style="padding:2px 4px;font-size:10px" onclick="PE.startEditSection(${i})" title="Renomear">✏️</button>
        <button class="pe-btn pe-btn-sm" style="padding:2px 4px" onclick="PE.toggleSectionTitle(${i})" title="${(s.showTitle!==false)?'Ocultar título':'Mostrar título'}">${(s.showTitle!==false)?'👁':'🙈'}</button>
        <button class="pe-btn pe-btn-sm" style="padding:2px 6px" onclick="PE.moveSection(${i},-1)" ${i===0?'disabled':''}>↑</button>
        <button class="pe-btn pe-btn-sm" style="padding:2px 6px" onclick="PE.moveSection(${i},1)" ${i===sections.length-1?'disabled':''}>↓</button>
        <label class="pe-switch" style="margin:0"><input type="checkbox" ${s.enabled?'checked':''} onchange="PE.toggleHomeSection(${i},this.checked)"><span class="slider"></span></label>
        <button class="pe-btn pe-btn-sm" style="padding:2px 6px;color:#ef4444" onclick="PE.removeSection(${i})">✕</button>
      </div>
      ${(['categories','featured-products'].includes(s.type) && s.enabled) ? `
      <div style="margin-left:24px;margin-top:4px;margin-bottom:8px;padding:6px 8px;background:rgba(0,0,0,.03);border-radius:6px">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
          <label style="font-size:11px;color:var(--pe-muted)">Exibição:</label>
          <select class="pe-input pe-select" style="height:24px;font-size:11px;padding:0 4px" onchange="PE.setSectionSetting(${i},'displayMode',this.value)">
            <option value="grid" ${(s.settings?.displayMode||'grid')==='grid'?'selected':''}>Grade</option>
            <option value="carousel" ${s.settings?.displayMode==='carousel'?'selected':''}>Carrossel</option>
          </select>
        </div>
        ${s.settings?.displayMode==='carousel' ? `
        <div style="display:flex;align-items:center;gap:6px">
          <label style="font-size:11px;color:var(--pe-muted)">Velocidade:</label>
          <input type="range" min="1" max="10" value="${s.settings?.carouselSpeed||4}" onchange="PE.setSectionSetting(${i},'carouselSpeed',+this.value)" style="flex:1;height:4px">
          <span style="font-size:11px;color:var(--pe-muted)">${s.settings?.carouselSpeed||4}s</span>
        </div>` : ''}
      </div>` : ''}
      ${(['benefits','trust-bar'].includes(s.type) && s.enabled) ? `
      <div style="margin-left:24px;margin-top:4px;margin-bottom:8px">
        <button class="pe-btn pe-btn-sm pe-btn-outline" style="width:100%" onclick="PE.showSection('${s.type}')">Gerenciar Itens</button>
      </div>` : ''}
    `;}).join('');
  };
  PE.startEditSection = function(i) {
    document.getElementById('name-'+i).style.display='none';
    var el = document.getElementById('edit-section-'+i);
    el.style.display='inline-block'; el.focus(); el.select();
  };
  PE.saveEditSection = function(i) {
    var key = PE.get('homepageSections') ? 'homepageSections' : 'homeSections';
    var s = PE.get(key);
    var el = document.getElementById('edit-section-'+i);
    if(el && el.value.trim()) { s[i].title = el.value.trim(); PE.set(key,s); }
    PE.renderHomeSections();
  };
  PE.toggleSectionTitle = function(i) {
    var key = PE.get('homepageSections') ? 'homepageSections' : 'homeSections';
    var s = PE.get(key); s[i].showTitle = !(s[i].showTitle !== false); PE.set(key,s); PE.renderHomeSections();
  };
  PE.setSectionSetting = function(i, k, v) {
    var key = PE.get('homepageSections') ? 'homepageSections' : 'homeSections';
    var s = PE.get(key); if(!s[i].settings) s[i].settings={}; s[i].settings[k]=v; PE.set(key,s); PE.renderHomeSections();
  };
  PE.moveSection = function(i, dir) {
    var key = PE.get('homepageSections') ? 'homepageSections' : 'homeSections';
    var s=PE.get(key),t=s.splice(i,1)[0];s.splice(i+dir,0,t);PE.set(key,s);PE.renderHomeSections();
  };
  PE.toggleHomeSection = function(i,v) {
    var key = PE.get('homepageSections') ? 'homepageSections' : 'homeSections';
    var s=PE.get(key);s[i].enabled=v;PE.set(key,s);PE.renderHomeSections();
  };
  PE.removeSection = function(i) {
    var key = PE.get('homepageSections') ? 'homepageSections' : 'homeSections';
    var s=PE.get(key);s.splice(i,1);PE.set(key,s);PE.renderHomeSections();
  };
  PE.addHomeSection = function() {
    var key = PE.get('homepageSections') ? 'homepageSections' : 'homeSections';
    var title = document.getElementById('newSectionTitle').value.trim();
    var type = document.getElementById('newSectionType').value;
    if(!title) return;
    var s=PE.get(key);
    s.push({id:'custom-'+Date.now(),type:type,enabled:true,title:title,showTitle:true,settings:{}});
    PE.set(key,s);
    document.getElementById('newSectionTitle').value='';
    document.getElementById('homeSectionAdd').style.display='none';
    document.getElementById('btnAddSection').style.display='block';
    PE.renderHomeSections();
  };
  setTimeout(PE.renderHomeSections, 100);
  </script>
</div>

{{-- ============================================ --}}
{{-- PRODUCT CARD PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-productCard">
  <div class="pe-section">
    <div class="pe-section-title"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg></div><div><h3>Card de Produto</h3><p>Visual e comportamento dos cards de produto nas listagens e destaques</p></div></div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Layout</label>
    <div class="pe-options" style="grid-template-columns:repeat(3,1fr)">
      @foreach([
        'standard'=>['Padrão','Imagem em cima e info embaixo'],
        'minimal'=>['Minimal','Apenas imagem, nome e preço'],
        'detailed'=>['Detalhado','Inclui descrição e mais info'],
        'horizontal'=>['Horizontal','Imagem ao lado do conteúdo'],
        'overlay'=>['Overlay','Texto sobreposto à imagem'],
        'magazine'=>['Magazine','Estilo editorial sofisticado'],
      ] as $v => $info)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('productCard.layout','{{ $v }}');PE.activateOpt(this)">
        <div class="pe-option-label" style="font-size:9px">{{ $info[0] }}</div>
        <div class="pe-option-desc">{{ $info[1] }}</div>
      </div>
      @endforeach
    </div>
  </div>

  <div class="pe-divider"><span>Imagem</span></div>
  <div class="pe-field">
    <label class="pe-label">Proporção da imagem</label>
    <select class="pe-input pe-select" data-bind="productCard.imageAspect" onchange="PE.set('productCard.imageAspect',this.value)">
      <option value="1:1">1:1 Quadrado — altura igual à largura</option>
      <option value="3:4">3:4 Retrato — levemente vertical</option>
      <option value="4:5">4:5 Instagram — formato de post</option>
      <option value="2:3">2:3 Alto — imagem mais alongada</option>
      <option value="16:9">16:9 Paisagem — formato widescreen</option>
    </select>
  </div>
  <div class="pe-field">
    <label class="pe-label">Efeito ao passar o mouse</label>
    <select class="pe-input pe-select" data-bind="productCard.imageHover" onchange="PE.set('productCard.imageHover',this.value)">
      <option value="none">Nenhum — sem efeito na imagem</option>
      <option value="zoom">Zoom — amplia levemente a imagem</option>
      <option value="swap">Trocar — mostra a 2ª foto do produto</option>
      <option value="slide">Slide — desliza a imagem suavemente</option>
    </select>
  </div>
  <div class="pe-field">
    <label class="pe-label">Borda da imagem</label>
    <select class="pe-input pe-select" data-bind="productCard.imageBorderRadius" onchange="PE.set('productCard.imageBorderRadius',this.value)">
      <option value="none">Nenhuma — cantos totalmente retos</option>
      <option value="small">Pequena — cantos levemente arredondados (4px)</option>
      <option value="medium">Média — arredondamento moderado (8px)</option>
      <option value="large">Grande — cantos bem arredondados (12px)</option>
    </select>
  </div>

  <div class="pe-divider"><span>Informações exibidas</span></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Categoria</div><div class="pe-toggle-desc">Mostra a categoria do produto acima do nome</div></div><label class="pe-switch"><input type="checkbox" data-bind="productCard.showCategory" onchange="PE.set('productCard.showCategory',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Marca</div><div class="pe-toggle-desc">Exibe o nome da marca/fabricante do produto no card</div></div><label class="pe-switch"><input type="checkbox" data-bind="productCard.showBrand" onchange="PE.set('productCard.showBrand',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Avaliação</div><div class="pe-toggle-desc">Mostra as estrelas de avaliação e número de reviews</div></div><label class="pe-switch"><input type="checkbox" data-bind="productCard.showRating" onchange="PE.set('productCard.showRating',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Linhas do título</label><span class="pe-slider-value">2</span></div>
    <input type="range" class="pe-slider" data-bind="productCard.titleLines" min="1" max="3" step="1" oninput="PE.set('productCard.titleLines',+this.value)">
  </div>
  <div class="pe-field">
    <label class="pe-label">Alinhamento do conteúdo</label>
    <div class="pe-options" style="grid-template-columns:repeat(2,1fr)">
      @foreach([
        'left'=>['Esquerda','Texto alinhado à esquerda'],
        'center'=>['Centro','Texto centralizado no card'],
      ] as $v => $info)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('productCard.contentAlign','{{ $v }}');PE.activateOpt(this)">
        <div class="pe-option-label">{{ $info[0] }}</div>
        <div class="pe-option-desc">{{ $info[1] }}</div>
      </div>
      @endforeach
    </div>
  </div>

  <div class="pe-divider"><span>Preço</span></div>
  <div class="pe-field">
    <label class="pe-label">Tamanho do preço</label>
    <div class="pe-options" style="grid-template-columns:repeat(3,1fr)">
      @foreach([
        'small'=>['Pequeno','Preço discreto e compacto'],
        'medium'=>['Médio','Tamanho padrão equilibrado'],
        'large'=>['Grande','Preço em destaque, bem visível'],
      ] as $v => $info)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('productCard.priceSize','{{ $v }}');PE.activateOpt(this)">
        <div class="pe-option-label">{{ $info[0] }}</div>
        <div class="pe-option-desc">{{ $info[1] }}</div>
      </div>
      @endforeach
    </div>
  </div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Preço comparativo</div><div class="pe-toggle-desc">Mostra o preço original riscado ao lado do preço com desconto</div></div><label class="pe-switch"><input type="checkbox" data-bind="productCard.showComparePrice" onchange="PE.set('productCard.showComparePrice',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Badge de desconto</div><div class="pe-toggle-desc">Exibe o selo/badge de desconto sobre a imagem do produto</div></div><label class="pe-switch"><input type="checkbox" data-bind="productCard.showDiscount" onchange="PE.set('productCard.showDiscount',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field">
    <label class="pe-label">Formato do desconto</label>
    <select class="pe-input pe-select" data-bind="productCard.discountStyle" onchange="PE.set('productCard.discountStyle',this.value)">
      <option value="percentage">Porcentagem — ex: -30%</option>
      <option value="amount">Valor em reais — ex: -R$ 40,00</option>
      <option value="badge">Badge com texto — exibe "OFERTA"</option>
    </select>
  </div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Parcelas</div><div class="pe-toggle-desc">Mostra o valor parcelado abaixo do preço</div></div><label class="pe-switch"><input type="checkbox" data-bind="productCard.showInstallments" onchange="PE.set('productCard.showInstallments',this.checked)"><span class="slider"></span></label></div>

  <div class="pe-divider"><span>Botões de Ação</span></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Botão Comprar Agora</div><div class="pe-toggle-desc">Exibe o botão de compra rápida. A cor é configurada em Cores > Ação de Compra</div></div><label class="pe-switch"><input type="checkbox" data-bind="productCard.showBuyNow" onchange="PE.set('productCard.showBuyNow',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field"><label class="pe-label">Texto do botão Comprar</label><input type="text" class="pe-input" data-bind="productCard.buyNowText" onchange="PE.set('productCard.buyNowText',this.value)" placeholder="Comprar Agora"></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Botão Adicionar ao Carrinho</div><div class="pe-toggle-desc">Exibe o botão para adicionar o produto ao carrinho sem sair da página</div></div><label class="pe-switch"><input type="checkbox" data-bind="productCard.showAddToCart" onchange="PE.set('productCard.showAddToCart',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field"><label class="pe-label">Texto do botão Carrinho</label><input type="text" class="pe-input" data-bind="productCard.addToCartText" onchange="PE.set('productCard.addToCartText',this.value)" placeholder="Adicionar ao Carrinho"></div>
  <div class="pe-field">
    <label class="pe-label">Visibilidade dos botões</label>
    <select class="pe-input pe-select" data-bind="productCard.buttonVisibility" onchange="PE.set('productCard.buttonVisibility',this.value)">
      <option value="both">Ambos — mostra Comprar e Adicionar</option>
      <option value="add-only">Só Adicionar — oculta Comprar Agora</option>
      <option value="buy-only">Só Comprar — oculta Adicionar ao Carrinho</option>
    </select>
  </div>
  <div class="pe-field">
    <label class="pe-label">Layout dos botões</label>
    <div class="pe-options" style="grid-template-columns:repeat(2,1fr)">
      @foreach([
        'stacked'=>['Empilhado','Um embaixo do outro'],
        'side-by-side'=>['Lado a lado','Na mesma linha'],
      ] as $v => $info)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('productCard.buttonLayout','{{ $v }}');PE.activateOpt(this)">
        <div class="pe-option-label">{{ $info[0] }}</div>
        <div class="pe-option-desc">{{ $info[1] }}</div>
      </div>
      @endforeach
    </div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Estilo visual dos botões</label>
    <div class="pe-options" style="grid-template-columns:repeat(4,1fr)">
      @foreach([
        'solid'=>['Sólido','Fundo preenchido padrão'],
        'outline'=>['Contorno','Apenas borda, sem fundo'],
        'pill'=>['Pílula','Totalmente arredondado'],
        'rounded'=>['Arredondado','Cantos bem suaves'],
        'sharp'=>['Reto','Cantos 100% retos'],
        'gradient'=>['Gradiente','Degradê de cores'],
        'underline'=>['Sublinhado','Apenas linha embaixo'],
      ] as $v => $info)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('productCard.buttonStyle','{{ $v }}');PE.activateOpt(this)">
        <div class="pe-option-label" style="font-size:9px">{{ $info[0] }}</div>
        <div class="pe-option-desc">{{ $info[1] }}</div>
      </div>
      @endforeach
    </div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Tamanho do botão carrinho</label>
    <select class="pe-input pe-select" data-bind="productCard.addToCartStyle" onchange="PE.set('productCard.addToCartStyle',this.value)">
      <option value="icon">Ícone — pequeno ícone no canto da imagem</option>
      <option value="button">Botão compacto — tamanho reduzido</option>
      <option value="full-width">Largura total — ocupa toda a largura do card</option>
    </select>
  </div>

  <div class="pe-divider"><span>Interação</span></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Quick View (Pré-visualização)</div><div class="pe-toggle-desc">Permite ver detalhes do produto em um popup sem sair da listagem</div></div><label class="pe-switch"><input type="checkbox" data-bind="productCard.showQuickView" onchange="PE.set('productCard.showQuickView',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field">
    <label class="pe-label">Estilo do Quick View</label>
    <select class="pe-input pe-select" data-bind="productCard.quickViewStyle" onchange="PE.set('productCard.quickViewStyle',this.value)">
      <option value="modal">Modal — janela central sobre a página</option>
      <option value="drawer">Drawer — painel que desliza da lateral</option>
      <option value="expand">Expandir — abre detalhes no próprio card</option>
      <option value="side-panel">Painel lateral — abre ao lado da listagem</option>
    </select>
  </div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Lista de Desejos (Wishlist)</div><div class="pe-toggle-desc">Exibe ícone de coração para o cliente salvar o produto como favorito</div></div><label class="pe-switch"><input type="checkbox" data-bind="productCard.showWishlist" onchange="PE.set('productCard.showWishlist',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field">
    <label class="pe-label">Clique no card</label>
    <select class="pe-input pe-select" data-bind="productCard.clickBehavior" onchange="PE.set('productCard.clickBehavior',this.value)">
      <option value="navigate">Navegar — abre a página completa do produto</option>
      <option value="modal">Modal — abre Quick View ao clicar no card</option>
    </select>
  </div>

  <div class="pe-divider"><span>Badges de Desconto</span></div>
  <div class="pe-field">
    <label class="pe-label">Posição do badge</label>
    <select class="pe-input pe-select" data-bind="productCard.badgePosition" onchange="PE.set('productCard.badgePosition',this.value)">
      <option value="top-left">Topo esquerdo — canto superior esquerdo da imagem</option>
      <option value="top-right">Topo direito — canto superior direito da imagem</option>
      <option value="bottom-left">Inferior esquerdo — canto inferior esquerdo</option>
    </select>
  </div>
  <div class="pe-field">
    <label class="pe-label">Formato do badge</label>
    <select class="pe-input pe-select" data-bind="productCard.badgeStyle" onchange="PE.set('productCard.badgeStyle',this.value)">
      <option value="square">Quadrado — cantos totalmente retos</option>
      <option value="rounded">Arredondado — cantos levemente suaves</option>
      <option value="pill">Pílula — formato totalmente arredondado</option>
    </select>
  </div>

  <div class="pe-divider"><span>Aparência Geral</span></div>
  <div class="pe-field">
    <label class="pe-label">Espaçamento interno</label>
    <div class="pe-options" style="grid-template-columns:repeat(3,1fr)">
      @foreach([
        'compact'=>['Compacto','Menos espaço entre elementos'],
        'normal'=>['Normal','Espaçamento padrão equilibrado'],
        'spacious'=>['Espaçoso','Mais ar entre os elementos'],
      ] as $v => $info)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('productCard.spacing','{{ $v }}');PE.activateOpt(this)">
        <div class="pe-option-label">{{ $info[0] }}</div>
        <div class="pe-option-desc">{{ $info[1] }}</div>
      </div>
      @endforeach
    </div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Sombra do card</label>
    <select class="pe-input pe-select" data-bind="productCard.shadow" onchange="PE.set('productCard.shadow',this.value)">
      <option value="none">Nenhuma — card sem sombra</option>
      <option value="subtle">Suave — sombra sutil e discreta</option>
      <option value="medium">Média — sombra moderada</option>
      <option value="strong">Forte — sombra bem destacada</option>
    </select>
  </div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Sombra ao passar o mouse</div><div class="pe-toggle-desc">Adiciona uma sombra elevada quando o cursor passa sobre o card</div></div><label class="pe-switch"><input type="checkbox" data-bind="productCard.hoverShadow" onchange="PE.set('productCard.hoverShadow',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Borda ao redor do card</div><div class="pe-toggle-desc">Adiciona uma borda sutil ao redor de cada card de produto</div></div><label class="pe-switch"><input type="checkbox" data-bind="productCard.border" onchange="PE.set('productCard.border',this.checked)"><span class="slider"></span></label></div>
</div>

{{-- ============================================ --}}
{{-- PRODUCT PAGE PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-productPage">
  <div class="pe-section">
    <div class="pe-section-title"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg></div><div><h3>Página de Produto</h3><p>Layout e funcionalidades da PDP</p></div></div>
  </div>
  <div class="pe-divider"><span>Galeria</span></div>
  <div class="pe-field">
    <label class="pe-label">Layout da galeria</label>
    <select class="pe-input pe-select" data-bind="productPage.galleryLayout" onchange="PE.set('productPage.galleryLayout',this.value)">
      <option value="side-by-side">Lado a lado</option><option value="slider">Slider</option><option value="grid">Grade</option><option value="vertical-thumbs">Thumbs verticais</option>
    </select>
  </div>
  <div class="pe-field">
    <label class="pe-label">Posição</label>
    <div class="pe-options" style="grid-template-columns:repeat(2,1fr)">
      <div class="pe-option" data-optval="left" onclick="PE.set('productPage.galleryPosition','left');PE.activateOpt(this)"><div class="pe-option-label">Esquerda</div></div>
      <div class="pe-option" data-optval="right" onclick="PE.set('productPage.galleryPosition','right');PE.activateOpt(this)"><div class="pe-option-label">Direita</div></div>
    </div>
  </div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Zoom na imagem</div></div><label class="pe-switch"><input type="checkbox" data-bind="productPage.imageZoom" onchange="PE.set('productPage.imageZoom',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Galeria fixa (sticky)</div></div><label class="pe-switch"><input type="checkbox" data-bind="productPage.stickyGallery" onchange="PE.set('productPage.stickyGallery',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-divider"><span>Informações</span></div>
  @foreach(['showBreadcrumb'=>'Breadcrumb','showSKU'=>'SKU','showBrand'=>'Marca','showRating'=>'Avaliação','showStock'=>'Estoque','showShareButtons'=>'Compartilhar'] as $k => $l)
  <div class="pe-toggle"><div><div class="pe-toggle-label">{{ $l }}</div></div><label class="pe-switch"><input type="checkbox" data-bind="productPage.{{ $k }}" onchange="PE.set('productPage.{{ $k }}',this.checked)"><span class="slider"></span></label></div>
  @endforeach
  <div class="pe-divider"><span>Variações</span></div>
  <div class="pe-field">
    <label class="pe-label">Estilo</label>
    <select class="pe-input pe-select" data-bind="productPage.variantStyle" onchange="PE.set('productPage.variantStyle',this.value)">
      <option value="dropdown">Dropdown</option><option value="buttons">Botões</option><option value="swatches">Swatches</option>
    </select>
  </div>
  <div class="pe-field">
    <label class="pe-label">Quantidade</label>
    <select class="pe-input pe-select" data-bind="productPage.quantityStyle" onchange="PE.set('productPage.quantityStyle',this.value)">
      <option value="input">Campo numérico</option><option value="stepper">Stepper (+/-)</option>
    </select>
  </div>
  <div class="pe-divider"><span>CTA</span></div>
  <div class="pe-field">
    <label class="pe-label">Layout do CTA</label>
    <div class="pe-options" style="grid-template-columns:repeat(2,1fr)">
      <div class="pe-option" data-optval="stacked" onclick="PE.set('productPage.ctaLayout','stacked');PE.activateOpt(this)"><div class="pe-option-label">Empilhado</div></div>
      <div class="pe-option" data-optval="side-by-side" onclick="PE.set('productPage.ctaLayout','side-by-side');PE.activateOpt(this)"><div class="pe-option-label">Lado a lado</div></div>
    </div>
  </div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">CTA sticky no mobile</div></div><label class="pe-switch"><input type="checkbox" data-bind="productPage.ctaStickyMobile" onchange="PE.set('productPage.ctaStickyMobile',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-divider"><span>Confiança</span></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Selos de confiança</div></div><label class="pe-switch"><input type="checkbox" data-bind="productPage.showTrustBadges" onchange="PE.set('productPage.showTrustBadges',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Guia de tamanhos</div></div><label class="pe-switch"><input type="checkbox" data-bind="productPage.sizeGuideEnabled" onchange="PE.set('productPage.sizeGuideEnabled',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Estimativa de frete</div></div><label class="pe-switch"><input type="checkbox" data-bind="productPage.shippingEstimate" onchange="PE.set('productPage.shippingEstimate',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-divider"><span>Conteúdo</span></div>
  <div class="pe-field">
    <label class="pe-label">Estilo das abas</label>
    <select class="pe-input pe-select" data-bind="productPage.tabsStyle" onchange="PE.set('productPage.tabsStyle',this.value)">
      <option value="tabs">Abas</option><option value="accordion">Accordion</option><option value="inline">Inline</option>
    </select>
  </div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Produtos relacionados</div></div><label class="pe-switch"><input type="checkbox" data-bind="productPage.showRelated" onchange="PE.set('productPage.showRelated',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field"><label class="pe-label">Título relacionados</label><input type="text" class="pe-input" data-bind="productPage.relatedTitle" onchange="PE.set('productPage.relatedTitle',this.value)"></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Vistos recentemente</div></div><label class="pe-switch"><input type="checkbox" data-bind="productPage.showRecentlyViewed" onchange="PE.set('productPage.showRecentlyViewed',this.checked)"><span class="slider"></span></label></div>
</div>

{{-- ============================================ --}}
{{-- CATEGORY PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-category">
  <div class="pe-section">
    <div class="pe-section-title"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></div><div><h3>Categoria / Busca</h3><p>Página de listagem de produtos</p></div></div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Layout</label>
    <select class="pe-input pe-select" data-bind="category.layout" onchange="PE.set('category.layout',this.value)">
      <option value="sidebar-left">Sidebar esquerda</option><option value="sidebar-right">Sidebar direita</option><option value="top-filters">Filtros no topo</option><option value="no-filters">Sem filtros</option>
    </select>
  </div>
  <div class="pe-divider"><span>Modo de Exibição</span></div>
  <div class="pe-field">
    <label class="pe-label">Visualização</label>
    <div class="pe-options" style="grid-template-columns:repeat(3,1fr)">
      @foreach([
        'grid'=>['Grade','Cards em grid'],
        'list'=>['Lista','Linha a linha'],
        'masonry'=>['Masonry','Alturas variadas'],
        'carousel'=>['Carrossel','Deslizar horizontal'],
        'compact-grid'=>['Compacto','Grid sem espaço'],
      ] as $v => $info)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('category.displayMode','{{ $v }}');PE.activateOpt(this)">
        <div class="pe-option-label" style="font-size:9px">{{ $info[0] }}</div>
        <div class="pe-option-desc">{{ $info[1] }}</div>
      </div>
      @endforeach
    </div>
  </div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Autoplay (carrossel)</div></div><label class="pe-switch"><input type="checkbox" data-bind="category.carouselAutoplay" onchange="PE.set('category.carouselAutoplay',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Velocidade (carrossel)</label><span class="pe-slider-value">4s</span></div>
    <input type="range" class="pe-slider" data-bind="category.carouselSpeed" data-suffix="s" min="2" max="10" step="1" oninput="PE.set('category.carouselSpeed',+this.value)">
  </div>
  <div class="pe-divider"><span>Grid</span></div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Colunas (desktop)</label><span class="pe-slider-value">4</span></div>
    <input type="range" class="pe-slider" data-bind="category.columnsDesktop" min="2" max="5" step="1" oninput="PE.set('category.columnsDesktop',+this.value)">
  </div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Colunas (mobile)</label><span class="pe-slider-value">2</span></div>
    <input type="range" class="pe-slider" data-bind="category.columnsMobile" min="1" max="2" step="1" oninput="PE.set('category.columnsMobile',+this.value)">
  </div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Produtos por página</label><span class="pe-slider-value">24</span></div>
    <input type="range" class="pe-slider" data-bind="category.productsPerPage" min="8" max="48" step="4" oninput="PE.set('category.productsPerPage',+this.value)">
  </div>
  <div class="pe-divider"><span>Filtros</span></div>
  <div class="pe-field">
    <label class="pe-label">Estilo dos filtros</label>
    <select class="pe-input pe-select" data-bind="category.filterStyle" onchange="PE.set('category.filterStyle',this.value)">
      <option value="checkbox">Checkbox</option><option value="chips">Chips</option><option value="accordion">Accordion</option>
    </select>
  </div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Mostrar contagem</div></div><label class="pe-switch"><input type="checkbox" data-bind="category.showFilterCount" onchange="PE.set('category.showFilterCount',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-divider"><span>Ações na Listagem</span></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Botão comprar na listagem</div><div class="pe-toggle-desc">Mostra botão de adicionar ao carrinho nos cards</div></div><label class="pe-switch"><input type="checkbox" data-bind="category.showAddToCartOnListing" onchange="PE.set('category.showAddToCartOnListing',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-divider"><span>Paginação</span></div>
  <div class="pe-field">
    <label class="pe-label">Tipo</label>
    <div class="pe-options" style="grid-template-columns:repeat(3,1fr)">
      @foreach(['classic'=>'Clássica','infinite-scroll'=>'Infinita','load-more'=>'Carregar mais'] as $v => $l)
      <div class="pe-option" data-optval="{{ $v }}" onclick="PE.set('category.pagination','{{ $v }}');PE.activateOpt(this)"><div class="pe-option-label" style="font-size:9px">{{ $l }}</div></div>
      @endforeach
    </div>
  </div>
  <div class="pe-divider"><span>Extras</span></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Banner de categoria</div></div><label class="pe-switch"><input type="checkbox" data-bind="category.showBanner" onchange="PE.set('category.showBanner',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Breadcrumb</div></div><label class="pe-switch"><input type="checkbox" data-bind="category.showBreadcrumb" onchange="PE.set('category.showBreadcrumb',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Contagem de produtos</div></div><label class="pe-switch"><input type="checkbox" data-bind="category.showProductCount" onchange="PE.set('category.showProductCount',this.checked)"><span class="slider"></span></label></div>
</div>

{{-- ============================================ --}}
{{-- CART PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-cart">
  <div class="pe-section">
    <div class="pe-section-title"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg></div><div><h3>Carrinho</h3><p>Estilo e funcionalidades do carrinho</p></div></div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Tipo</label>
    <select class="pe-input pe-select" data-bind="cart.style" onchange="PE.set('cart.style',this.value)">
      <option value="page">Página inteira</option><option value="drawer">Drawer lateral</option><option value="dropdown">Dropdown</option>
    </select>
  </div>
  <div class="pe-divider"><span>Funcionalidades</span></div>
  @foreach(['showThumbnails'=>'Thumbnails','showQuantity'=>'Alterar quantidade','showCoupon'=>'Campo de cupom','showShippingEstimate'=>'Estimativa de frete','showContinueShopping'=>'Continuar comprando'] as $k => $l)
  <div class="pe-toggle"><div><div class="pe-toggle-label">{{ $l }}</div></div><label class="pe-switch"><input type="checkbox" data-bind="cart.{{ $k }}" onchange="PE.set('cart.{{ $k }}',this.checked)"><span class="slider"></span></label></div>
  @endforeach
  <div class="pe-divider"><span>Frete Grátis</span></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Barra de frete grátis</div></div><label class="pe-switch"><input type="checkbox" data-bind="cart.showFreeShippingBar" onchange="PE.set('cart.showFreeShippingBar',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Valor mínimo</label><span class="pe-slider-value">299</span></div>
    <input type="range" class="pe-slider" data-bind="cart.freeShippingThreshold" min="50" max="1000" step="10" oninput="PE.set('cart.freeShippingThreshold',+this.value)">
  </div>
  <div class="pe-field"><label class="pe-label">Mensagem</label><input type="text" class="pe-input" data-bind="cart.freeShippingMessage" onchange="PE.set('cart.freeShippingMessage',this.value)"></div>
  <div class="pe-divider"><span>Recomendações</span></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Mostrar recomendações</div></div><label class="pe-switch"><input type="checkbox" data-bind="cart.showRecommendations" onchange="PE.set('cart.showRecommendations',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field"><label class="pe-label">Título</label><input type="text" class="pe-input" data-bind="cart.recommendationsTitle" onchange="PE.set('cart.recommendationsTitle',this.value)"></div>
  <div class="pe-divider"><span>Textos</span></div>
  <div class="pe-field"><label class="pe-label">Carrinho vazio</label><input type="text" class="pe-input" data-bind="cart.emptyCartMessage" onchange="PE.set('cart.emptyCartMessage',this.value)"></div>
  <div class="pe-field"><label class="pe-label">CTA carrinho vazio</label><input type="text" class="pe-input" data-bind="cart.emptyCartCta" onchange="PE.set('cart.emptyCartCta',this.value)"></div>
</div>

{{-- ============================================ --}}
{{-- CHECKOUT PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-checkout">
  <div class="pe-section">
    <div class="pe-section-title"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></div><div><h3>Checkout</h3><p>Configurações da página de finalização</p></div></div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Layout</label>
    <div class="pe-options" style="grid-template-columns:repeat(2,1fr)">
      <div class="pe-option" data-optval="one-column" onclick="PE.set('checkout.layout','one-column');PE.activateOpt(this)"><div class="pe-option-label">1 Coluna</div></div>
      <div class="pe-option" data-optval="two-columns" onclick="PE.set('checkout.layout','two-columns');PE.activateOpt(this)"><div class="pe-option-label">2 Colunas</div></div>
    </div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Estilo dos passos</label>
    <select class="pe-input pe-select" data-bind="checkout.stepsStyle" onchange="PE.set('checkout.stepsStyle',this.value)">
      <option value="numbered">Numerados</option><option value="progress-bar">Barra de progresso</option><option value="tabs">Abas</option>
    </select>
  </div>
  <div class="pe-divider"><span>Funcionalidades</span></div>
  @foreach(['showOrderSummary'=>'Resumo do pedido','showCouponField'=>'Campo de cupom','showTrustBadges'=>'Selos de confiança'] as $k => $l)
  <div class="pe-toggle"><div><div class="pe-toggle-label">{{ $l }}</div></div><label class="pe-switch"><input type="checkbox" data-bind="checkout.{{ $k }}" onchange="PE.set('checkout.{{ $k }}',this.checked)"><span class="slider"></span></label></div>
  @endforeach
  <div class="pe-toggle"><div><div class="pe-toggle-label">Aceitar termos</div></div><label class="pe-switch"><input type="checkbox" data-bind="checkout.termsRequired" onchange="PE.set('checkout.termsRequired',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field"><label class="pe-label">Texto dos termos</label><input type="text" class="pe-input" data-bind="checkout.termsText" onchange="PE.set('checkout.termsText',this.value)"></div>
  <div class="pe-divider"><span>Sucesso</span></div>
  <div class="pe-field"><label class="pe-label">Título</label><input type="text" class="pe-input" data-bind="checkout.successTitle" onchange="PE.set('checkout.successTitle',this.value)"></div>
  <div class="pe-field"><label class="pe-label">Mensagem</label><textarea class="pe-input pe-textarea" data-bind="checkout.successMessage" onchange="PE.set('checkout.successMessage',this.value)"></textarea></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Confetti 🎉</div></div><label class="pe-switch"><input type="checkbox" data-bind="checkout.showConfetti" onchange="PE.set('checkout.showConfetti',this.checked)"><span class="slider"></span></label></div>
</div>

{{-- ============================================ --}}
{{-- FOOTER PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-footer">
  <div class="pe-section">
    <div class="pe-section-title"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="13" width="18" height="8" rx="1"/><rect x="3" y="3" width="18" height="8" rx="1"/></svg></div><div><h3>Rodapé</h3><p>Colunas, links, newsletter e redes sociais</p></div></div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Layout</label>
    <select class="pe-input pe-select" data-bind="footer.layout" onchange="PE.set('footer.layout',this.value)">
      <option value="4-columns">4 Colunas</option><option value="3-columns">3 Colunas</option><option value="2-columns">2 Colunas</option><option value="simple">Simples</option><option value="centered">Centralizado</option>
    </select>
  </div>
  <div class="pe-color-grid">
    <div class="pe-field">
      <label class="pe-label">Fundo</label>
      <div class="pe-color-field">
        <div class="pe-color-swatch"><input type="color" data-bind="footer.backgroundColor" onchange="PE.set('footer.backgroundColor',this.value)"></div>
        <input type="text" class="pe-input pe-color-hex" data-bind="footer.backgroundColor" onchange="PE.set('footer.backgroundColor',this.value)">
      </div>
    </div>
    <div class="pe-field">
      <label class="pe-label">Texto</label>
      <div class="pe-color-field">
        <div class="pe-color-swatch"><input type="color" data-bind="footer.textColor" onchange="PE.set('footer.textColor',this.value)"></div>
        <input type="text" class="pe-input pe-color-hex" data-bind="footer.textColor" onchange="PE.set('footer.textColor',this.value)">
      </div>
    </div>
  </div>

  <div class="pe-divider"><span>Colunas</span></div>
  <div id="footerColumnsList"></div>
  <script>
  PE.renderFooterColumns = function() {
    var cols = PE.get('footer.columns') || [];
    var el = document.getElementById('footerColumnsList');
    if(!el) return;
    el.innerHTML = cols.map((c,i) => `
      <div class="pe-toggle">
        <div><div class="pe-toggle-label">${c.title}</div><div class="pe-toggle-desc">${(c.links||[]).length} links</div></div>
        <label class="pe-switch"><input type="checkbox" ${c.enabled?'checked':''} onchange="var cols=PE.get('footer.columns');cols[${i}].enabled=this.checked;PE.set('footer.columns',cols)"><span class="slider"></span></label>
      </div>
    `).join('');
  };
  setTimeout(PE.renderFooterColumns, 150);
  </script>

  <div class="pe-divider"><span>Newsletter</span></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Newsletter</div></div><label class="pe-switch"><input type="checkbox" data-bind="footer.showNewsletter" onchange="PE.set('footer.showNewsletter',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field"><label class="pe-label">Título</label><input type="text" class="pe-input" data-bind="footer.newsletterTitle" onchange="PE.set('footer.newsletterTitle',this.value)"></div>
  <div class="pe-field"><label class="pe-label">Descrição</label><input type="text" class="pe-input" data-bind="footer.newsletterDescription" onchange="PE.set('footer.newsletterDescription',this.value)"></div>
  <div class="pe-divider"><span>Extras</span></div>
  @foreach(['showSocial'=>'Redes sociais','showPaymentIcons'=>'Ícones de pagamento','showTrustSeals'=>'Selos de confiança','showBackToTop'=>'Voltar ao topo'] as $k => $l)
  <div class="pe-toggle"><div><div class="pe-toggle-label">{{ $l }}</div></div><label class="pe-switch"><input type="checkbox" data-bind="footer.{{ $k }}" onchange="PE.set('footer.{{ $k }}',this.checked)"><span class="slider"></span></label></div>
  @endforeach
  <div class="pe-field"><label class="pe-label">Copyright</label><input type="text" class="pe-input" data-bind="footer.copyrightText" onchange="PE.set('footer.copyrightText',this.value)"></div>
</div>

{{-- ============================================ --}}
{{-- WHATSAPP PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-whatsapp">
  <div class="pe-section">
    <div class="pe-section-title"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg></div><div><h3>WhatsApp</h3><p>Botão flutuante de WhatsApp</p></div></div>
  </div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Ativar botão</div></div><label class="pe-switch"><input type="checkbox" data-bind="whatsapp.enabled" onchange="PE.set('whatsapp.enabled',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field"><label class="pe-label">Número (com DDD)</label><input type="text" class="pe-input" data-bind="whatsapp.number" onchange="PE.set('whatsapp.number',this.value)" placeholder="5511999990000"></div>
  <div class="pe-field"><label class="pe-label">Mensagem padrão</label><textarea class="pe-input pe-textarea" data-bind="whatsapp.message" onchange="PE.set('whatsapp.message',this.value)"></textarea></div>
  <div class="pe-field">
    <label class="pe-label">Posição</label>
    <div class="pe-options" style="grid-template-columns:repeat(2,1fr)">
      <div class="pe-option" data-optval="bottom-left" onclick="PE.set('whatsapp.position','bottom-left');PE.activateOpt(this)"><div class="pe-option-label">Inferior esq.</div></div>
      <div class="pe-option" data-optval="bottom-right" onclick="PE.set('whatsapp.position','bottom-right');PE.activateOpt(this)"><div class="pe-option-label">Inferior dir.</div></div>
    </div>
  </div>
  <div class="pe-field">
    <label class="pe-label">Cor de fundo</label>
    <div class="pe-color-field">
      <div class="pe-color-swatch"><input type="color" data-bind="whatsapp.backgroundColor" onchange="PE.set('whatsapp.backgroundColor',this.value)"></div>
      <input type="text" class="pe-input pe-color-hex" data-bind="whatsapp.backgroundColor" onchange="PE.set('whatsapp.backgroundColor',this.value)">
    </div>
  </div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Mostrar texto</div></div><label class="pe-switch"><input type="checkbox" data-bind="whatsapp.showLabel" onchange="PE.set('whatsapp.showLabel',this.checked)"><span class="slider"></span></label></div>
  <div class="pe-field"><label class="pe-label">Texto</label><input type="text" class="pe-input" data-bind="whatsapp.label" onchange="PE.set('whatsapp.label',this.value)"></div>
  <div class="pe-field pe-slider-field">
    <div class="pe-slider-header"><label class="pe-label">Delay de exibição</label><span class="pe-slider-value">3s</span></div>
    <input type="range" class="pe-slider" data-bind="whatsapp.delay" data-suffix="s" min="0" max="30" step="1" oninput="PE.set('whatsapp.delay',+this.value)">
  </div>
</div>

{{-- ============================================ --}}
{{-- SEO PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-seo">
  <div class="pe-section">
    <div class="pe-section-title"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg></div><div><h3>SEO</h3><p>Otimização para mecanismos de busca</p></div></div>
  </div>
  <div class="pe-field"><label class="pe-label">Template do título</label><input type="text" class="pe-input" data-bind="seo.titleTemplate" onchange="PE.set('seo.titleTemplate',this.value)" placeholder="{page} | {storeName}"></div>
  <p style="font-size:9px;color:var(--pe-muted);margin-top:-6px;margin-bottom:10px">Use {page} e {storeName} como variáveis</p>
  <div class="pe-field"><label class="pe-label">Descrição padrão</label><textarea class="pe-input pe-textarea" data-bind="seo.defaultDescription" onchange="PE.set('seo.defaultDescription',this.value)"></textarea></div>
  <div class="pe-field"><label class="pe-label">OG Image URL</label><input type="text" class="pe-input" data-bind="seo.ogImage" onchange="PE.set('seo.ogImage',this.value)" placeholder="https://..."></div>
  <div class="pe-toggle"><div><div class="pe-toggle-label">Breadcrumbs</div></div><label class="pe-switch"><input type="checkbox" data-bind="seo.showBreadcrumbs" onchange="PE.set('seo.showBreadcrumbs',this.checked)"><span class="slider"></span></label></div>
</div>

{{-- ============================================ --}}
{{-- CUSTOM CODE PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-customCode">
  <div class="pe-section">
    <div class="pe-section-title"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div><div><h3>Código Custom</h3><p>CSS e scripts personalizados (avançado)</p></div></div>
  </div>
  <div class="pe-field">
    <label class="pe-label">CSS personalizado</label>
    <textarea class="pe-input pe-textarea" style="font-family:monospace;min-height:120px" data-bind="customCode.css" onchange="PE.set('customCode.css',this.value)" placeholder="/* Seu CSS aqui */"></textarea>
    <p style="font-size:9px;color:var(--pe-muted);margin-top:4px">Adicionado ao final do &lt;head&gt;</p>
  </div>
  <div class="pe-divider"></div>
  <div class="pe-field">
    <label class="pe-label">Scripts (head)</label>
    <textarea class="pe-input pe-textarea" style="font-family:monospace;min-height:120px" data-bind="customCode.headScripts" onchange="PE.set('customCode.headScripts',this.value)" placeholder="<!-- Scripts aqui -->"></textarea>
    <p style="font-size:9px;color:var(--pe-muted);margin-top:4px">⚠️ Use com cuidado. Scripts maliciosos podem comprometer sua loja.</p>
  </div>
</div>

<script>
// Helper to activate option in group
PE.activateOpt = PE.activateOpt || function(el) {
  var parent = el.closest('.pe-options');
  if(parent) parent.querySelectorAll('.pe-option').forEach(function(o){ o.classList.remove('active'); });
  el.classList.add('active');
};

// Initialize data-bind values on load
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    document.querySelectorAll('[data-bind]').forEach(function(el) {
      var path = el.dataset.bind;
      var val = PE.get(path);
      if (el.type === 'checkbox') el.checked = !!val;
      else if (el.type === 'color') el.value = val || '#000000';
      else if (el.type === 'range') {
        el.value = val;
        var display = el.parentElement.querySelector('.pe-slider-value');
        if (display) display.textContent = val + (el.dataset.suffix || '');
      }
      else el.value = val ?? '';
    });
    // Activate option pickers
    document.querySelectorAll('.pe-option[data-optval]').forEach(function(el) {
      var parent = el.closest('.pe-field, .pe-options');
      if (!parent) return;
      var path = el.getAttribute('onclick');
      if (!path) return;
      var m = path.match(/PE\.set\('([^']+)','([^']+)'\)/);
      if (m) {
        var val = PE.get(m[1]);
        if (val === m[2]) el.classList.add('active');
      }
    });
    // Update typography preview
    PE._updateTypoPreview = function() {
      var box = document.getElementById('typography-preview');
      if(!box) return;
      var hf = PE.get('typography.headingFont') || 'Playfair Display';
      var bf = PE.get('typography.bodyFont') || 'Inter';
      var hw = PE.get('typography.headingWeight') || 700;
      var bw = PE.get('typography.bodyWeight') || 400;
      var lh = PE.get('typography.lineHeight') || 1.6;
      var ls = PE.get('typography.letterSpacing') || 0;
      var h = box.querySelector('.pe-preview-heading');
      var b = box.querySelector('.pe-preview-body');
      if(h) { h.style.fontFamily = hf; h.style.fontWeight = hw; }
      if(b) { b.style.fontFamily = bf; b.style.fontWeight = bw; b.style.lineHeight = lh; b.style.letterSpacing = ls+'em'; }
    };
    PE._updateTypoPreview();
  }, 200);
});
</script>

{{-- ============================================ --}}
{{-- BENEFITS PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-benefits">
  <div class="pe-section">
    <div class="pe-section-title">
      <div class="icon">✨</div>
      <div><h3>Benefícios</h3><p>Ícones de destaque (frete, parcelamento...)</p></div>
    </div>
  </div>
  <div id="benefitsList"></div>
  <button class="pe-btn pe-btn-outline" style="width:100%;margin-top:10px" onclick="PE.addBenefit()">+ Adicionar Item</button>
  
  <script>
    PE.renderBenefits = function() {
      var items = PE.get('benefits.items') || [];
      var el = document.getElementById('benefitsList');
      if(!el) return;
      el.innerHTML = items.map((item, i) => `
        <div class="pe-card" style="margin-bottom:10px">
          <div class="pe-card-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-weight:600">Item ${i+1}</span>
            <button class="pe-btn-icon" onclick="PE.removeBenefit(${i})" title="Remover"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
          </div>
          <div class="pe-field">
            <label class="pe-label">Título</label>
            <input type="text" class="pe-input" value="${item.title||''}" onchange="PE.updateBenefit(${i}, 'title', this.value)">
          </div>
          <div class="pe-field">
            <label class="pe-label">Descrição</label>
            <input type="text" class="pe-input" value="${item.description||''}" onchange="PE.updateBenefit(${i}, 'description', this.value)">
          </div>
          <div class="pe-field">
            <label class="pe-label">Ícone (SVG)</label>
            <textarea class="pe-input pe-textarea" style="height:60px;font-family:monospace" onchange="PE.updateBenefit(${i}, 'icon', this.value)">${item.icon||''}</textarea>
          </div>
        </div>
      `).join('');
    };
    PE.addBenefit = function() {
      var items = PE.get('benefits.items') || [];
      items.push({ title: 'Novo Benefício', description: 'Descrição aqui', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><circle cx="12" cy="12" r="10"/></svg>' });
      PE.set('benefits.items', items);
      PE.renderBenefits();
    };
    PE.removeBenefit = function(i) {
      var items = PE.get('benefits.items') || [];
      items.splice(i, 1);
      PE.set('benefits.items', items);
      PE.renderBenefits();
    };
    PE.updateBenefit = function(i, key, val) {
      var items = PE.get('benefits.items') || [];
      if(items[i]) { items[i][key] = val; PE.set('benefits.items', items); }
    };
    document.addEventListener('pe-panel-open', function(e) {
      if(e.detail === 'panel-benefits') PE.renderBenefits();
    });
  </script>
</div>

{{-- ============================================ --}}
{{-- TRUST BAR PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-trust-bar">
  <div class="pe-section">
    <div class="pe-section-title">
      <div class="icon">🔒</div>
      <div><h3>Selos de Confiança</h3><p>Exibidos abaixo do banner principal</p></div>
    </div>
  </div>
  <div id="trustBarList"></div>
  <button class="pe-btn pe-btn-outline" style="width:100%;margin-top:10px" onclick="PE.addTrustItem()">+ Adicionar Item</button>
  
  <script>
    PE.renderTrustBar = function() {
      var items = PE.get('trustBar.items') || [];
      var el = document.getElementById('trustBarList');
      if(!el) return;
      el.innerHTML = items.map((item, i) => `
        <div class="pe-card" style="margin-bottom:10px">
          <div class="pe-card-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-weight:600">Item ${i+1}</span>
            <button class="pe-btn-icon" onclick="PE.removeTrustItem(${i})" title="Remover"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
          </div>
          <div class="pe-field">
            <label class="pe-label">Texto</label>
            <input type="text" class="pe-input" value="${item.text||''}" onchange="PE.updateTrustItem(${i}, 'text', this.value)">
          </div>
          <div class="pe-field">
            <label class="pe-label">Ícone (SVG)</label>
            <textarea class="pe-input pe-textarea" style="height:60px;font-family:monospace" onchange="PE.updateTrustItem(${i}, 'icon', this.value)">${item.icon||''}</textarea>
          </div>
        </div>
      `).join('');
    };
    PE.addTrustItem = function() {
      var items = PE.get('trustBar.items') || [];
      items.push({ text: 'Compra Segura', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/></svg>' });
      PE.set('trustBar.items', items);
      PE.renderTrustBar();
    };
    PE.removeTrustItem = function(i) {
      var items = PE.get('trustBar.items') || [];
      items.splice(i, 1);
      PE.set('trustBar.items', items);
      PE.renderTrustBar();
    };
    PE.updateTrustItem = function(i, key, val) {
      var items = PE.get('trustBar.items') || [];
      if(items[i]) { items[i][key] = val; PE.set('trustBar.items', items); }
    };
    document.addEventListener('pe-panel-open', function(e) {
      if(e.detail === 'panel-trust-bar') PE.renderTrustBar();
    });
  </script>
</div>

{{-- ============================================ --}}
{{-- BENEFITS PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-benefits">
  <div class="pe-section">
    <div class="pe-section-title">
      <div class="icon">✨</div>
      <div><h3>Benefícios</h3><p>Ícones de destaque (frete, parcelamento...)</p></div>
    </div>
  </div>
  <div id="benefitsList"></div>
  <button class="pe-btn pe-btn-outline" style="width:100%;margin-top:10px" onclick="PE.addBenefit()">+ Adicionar Item</button>
  
  <script>
    PE.renderBenefits = function() {
      var items = PE.get('benefits.items') || [];
      var el = document.getElementById('benefitsList');
      if(!el) return;
      el.innerHTML = items.map((item, i) => `
        <div class="pe-card" style="margin-bottom:10px">
          <div class="pe-card-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-weight:600">Item ${i+1}</span>
            <button class="pe-btn-icon" onclick="PE.removeBenefit(${i})" title="Remover"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
          </div>
          <div class="pe-field">
            <label class="pe-label">Título</label>
            <input type="text" class="pe-input" value="${item.title||''}" onchange="PE.updateBenefit(${i}, 'title', this.value)">
          </div>
          <div class="pe-field">
            <label class="pe-label">Descrição</label>
            <input type="text" class="pe-input" value="${item.description||''}" onchange="PE.updateBenefit(${i}, 'description', this.value)">
          </div>
          <div class="pe-field">
            <label class="pe-label">Ícone (SVG)</label>
            <textarea class="pe-input pe-textarea" style="height:60px;font-family:monospace" onchange="PE.updateBenefit(${i}, 'icon', this.value)">${item.icon||''}</textarea>
          </div>
        </div>
      `).join('');
    };
    PE.addBenefit = function() {
      var items = PE.get('benefits.items') || [];
      items.push({ title: 'Novo Benefício', description: 'Descrição aqui', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><circle cx="12" cy="12" r="10"/></svg>' });
      PE.set('benefits.items', items);
      PE.renderBenefits();
    };
    PE.removeBenefit = function(i) {
      var items = PE.get('benefits.items') || [];
      items.splice(i, 1);
      PE.set('benefits.items', items);
      PE.renderBenefits();
    };
    PE.updateBenefit = function(i, key, val) {
      var items = PE.get('benefits.items') || [];
      if(items[i]) { items[i][key] = val; PE.set('benefits.items', items); }
    };
    document.addEventListener('pe-panel-open', function(e) {
      if(e.detail === 'panel-benefits') PE.renderBenefits();
    });
  </script>
</div>

{{-- ============================================ --}}
{{-- TRUST BAR PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-trust-bar">
  <div class="pe-section">
    <div class="pe-section-title">
      <div class="icon">🔒</div>
      <div><h3>Selos de Confiança</h3><p>Exibidos abaixo do banner principal</p></div>
    </div>
  </div>
  <div id="trustBarList"></div>
  <button class="pe-btn pe-btn-outline" style="width:100%;margin-top:10px" onclick="PE.addTrustItem()">+ Adicionar Item</button>
  
  <script>
    PE.renderTrustBar = function() {
      var items = PE.get('trustBar.items') || [];
      var el = document.getElementById('trustBarList');
      if(!el) return;
      el.innerHTML = items.map((item, i) => `
        <div class="pe-card" style="margin-bottom:10px">
          <div class="pe-card-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-weight:600">Item ${i+1}</span>
            <button class="pe-btn-icon" onclick="PE.removeTrustItem(${i})" title="Remover"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
          </div>
          <div class="pe-field">
            <label class="pe-label">Texto</label>
            <input type="text" class="pe-input" value="${item.text||''}" onchange="PE.updateTrustItem(${i}, 'text', this.value)">
          </div>
          <div class="pe-field">
            <label class="pe-label">Ícone (SVG)</label>
            <textarea class="pe-input pe-textarea" style="height:60px;font-family:monospace" onchange="PE.updateTrustItem(${i}, 'icon', this.value)">${item.icon||''}</textarea>
          </div>
        </div>
      `).join('');
    };
    PE.addTrustItem = function() {
      var items = PE.get('trustBar.items') || [];
      items.push({ text: 'Compra Segura', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/></svg>' });
      PE.set('trustBar.items', items);
      PE.renderTrustBar();
    };
    PE.removeTrustItem = function(i) {
      var items = PE.get('trustBar.items') || [];
      items.splice(i, 1);
      PE.set('trustBar.items', items);
      PE.renderTrustBar();
    };
    PE.updateTrustItem = function(i, key, val) {
      var items = PE.get('trustBar.items') || [];
      if(items[i]) { items[i][key] = val; PE.set('trustBar.items', items); }
    };
    document.addEventListener('pe-panel-open', function(e) {
      if(e.detail === 'panel-trust-bar') PE.renderTrustBar();
    });
  </script>
</div>

{{-- ============================================ --}}
{{-- BENEFITS PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-benefits">
  <div class="pe-section">
    <div class="pe-section-title">
      <div class="icon">✨</div>
      <div><h3>Benefícios</h3><p>Ícones de destaque (frete, parcelamento...)</p></div>
    </div>
  </div>
  <div id="benefitsList"></div>
  <button class="pe-btn pe-btn-outline" style="width:100%;margin-top:10px" onclick="PE.addBenefit()">+ Adicionar Item</button>
  
  <script>
    PE.renderBenefits = function() {
      var items = PE.get('benefits.items') || [];
      var el = document.getElementById('benefitsList');
      if(!el) return;
      el.innerHTML = items.map((item, i) => `
        <div class="pe-card" style="margin-bottom:10px">
          <div class="pe-card-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-weight:600">Item ${i+1}</span>
            <button class="pe-btn-icon" onclick="PE.removeBenefit(${i})" title="Remover"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
          </div>
          <div class="pe-field">
            <label class="pe-label">Título</label>
            <input type="text" class="pe-input" value="${item.title||''}" onchange="PE.updateBenefit(${i}, 'title', this.value)">
          </div>
          <div class="pe-field">
            <label class="pe-label">Descrição</label>
            <input type="text" class="pe-input" value="${item.description||''}" onchange="PE.updateBenefit(${i}, 'description', this.value)">
          </div>
          <div class="pe-field">
            <label class="pe-label">Ícone (SVG)</label>
            <textarea class="pe-input pe-textarea" style="height:60px;font-family:monospace" onchange="PE.updateBenefit(${i}, 'icon', this.value)">${item.icon||''}</textarea>
          </div>
        </div>
      `).join('');
    };
    PE.addBenefit = function() {
      var items = PE.get('benefits.items') || [];
      items.push({ title: 'Novo Benefício', description: 'Descrição aqui', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><circle cx="12" cy="12" r="10"/></svg>' });
      PE.set('benefits.items', items);
      PE.renderBenefits();
    };
    PE.removeBenefit = function(i) {
      var items = PE.get('benefits.items') || [];
      items.splice(i, 1);
      PE.set('benefits.items', items);
      PE.renderBenefits();
    };
    PE.updateBenefit = function(i, key, val) {
      var items = PE.get('benefits.items') || [];
      if(items[i]) { items[i][key] = val; PE.set('benefits.items', items); }
    };
    document.addEventListener('pe-panel-open', function(e) {
      if(e.detail === 'panel-benefits') PE.renderBenefits();
    });
  </script>
</div>

{{-- ============================================ --}}
{{-- TRUST BAR PANEL --}}
{{-- ============================================ --}}
<div class="pe-panel" id="panel-trust-bar">
  <div class="pe-section">
    <div class="pe-section-title">
      <div class="icon">🔒</div>
      <div><h3>Selos de Confiança</h3><p>Exibidos abaixo do banner principal</p></div>
    </div>
  </div>
  <div id="trustBarList"></div>
  <button class="pe-btn pe-btn-outline" style="width:100%;margin-top:10px" onclick="PE.addTrustItem()">+ Adicionar Item</button>
  
  <script>
    PE.renderTrustBar = function() {
      var items = PE.get('trustBar.items') || [];
      var el = document.getElementById('trustBarList');
      if(!el) return;
      el.innerHTML = items.map((item, i) => `
        <div class="pe-card" style="margin-bottom:10px">
          <div class="pe-card-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-weight:600">Item ${i+1}</span>
            <button class="pe-btn-icon" onclick="PE.removeTrustItem(${i})" title="Remover"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
          </div>
          <div class="pe-field">
            <label class="pe-label">Texto</label>
            <input type="text" class="pe-input" value="${item.text||''}" onchange="PE.updateTrustItem(${i}, 'text', this.value)">
          </div>
          <div class="pe-field">
            <label class="pe-label">Ícone (SVG)</label>
            <textarea class="pe-input pe-textarea" style="height:60px;font-family:monospace" onchange="PE.updateTrustItem(${i}, 'icon', this.value)">${item.icon||''}</textarea>
          </div>
        </div>
      `).join('');
    };
    PE.addTrustItem = function() {
      var items = PE.get('trustBar.items') || [];
      items.push({ text: 'Compra Segura', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/></svg>' });
      PE.set('trustBar.items', items);
      PE.renderTrustBar();
    };
    PE.removeTrustItem = function(i) {
      var items = PE.get('trustBar.items') || [];
      items.splice(i, 1);
      PE.set('trustBar.items', items);
      PE.renderTrustBar();
    };
    PE.updateTrustItem = function(i, key, val) {
      var items = PE.get('trustBar.items') || [];
      if(items[i]) { items[i][key] = val; PE.set('trustBar.items', items); }
    };
    document.addEventListener('pe-panel-open', function(e) {
      if(e.detail === 'panel-trust-bar') PE.renderTrustBar();
    });
  </script>
</div>