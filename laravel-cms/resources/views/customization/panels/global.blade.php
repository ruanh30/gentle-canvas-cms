{{-- Global Panel — mirrors GlobalPanel.tsx --}}
<div class="space-y-4">
    <div class="flex items-center gap-2">
        <div class="p-1.5 rounded-md bg-gray-100"><svg class="h-3.5 w-3.5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></div>
        <div><h3 class="text-sm font-semibold">Layout Global</h3><p class="text-[11px] text-gray-400">Container, espaçamento, bordas e efeitos</p></div>
    </div>
    <div><label class="ctrl-label">Largura do container</label>
        <select name="global_containerWidth" class="ctrl-select">
            <option value="narrow" {{ $t['global_containerWidth']=='narrow'?'selected':'' }}>Estreito (1200px)</option>
            <option value="default" {{ $t['global_containerWidth']=='default'?'selected':'' }}>Padrão (1400px)</option>
            <option value="wide" {{ $t['global_containerWidth']=='wide'?'selected':'' }}>Largo (1600px)</option>
            <option value="full" {{ $t['global_containerWidth']=='full'?'selected':'' }}>Tela cheia</option>
        </select>
    </div>
    <div><label class="ctrl-label">Largura máx.</label><div class="slider-wrap"><input type="range" name="global_containerMaxPx" min="960" max="1920" step="20" value="{{ $t['global_containerMaxPx'] }}" oninput="this.nextElementSibling.textContent=this.value+'px'"><span class="slider-val">{{ $t['global_containerMaxPx'] }}px</span></div></div>
    <div class="panel-section-title">Espaçamento</div>
    <div><label class="ctrl-label">Espaço entre seções</label><div class="option-picker" data-option-group="global_sectionSpacing"><input type="hidden" name="global_sectionSpacing" value="{{ $t['global_sectionSpacing'] }}">
        @foreach(['compact' => 'Compacto', 'normal' => 'Normal', 'spacious' => 'Espaçoso'] as $v => $l)
        <button type="button" class="option-btn {{ $t['global_sectionSpacing']==$v?'active':'' }}" data-value="{{ $v }}" onclick="selectOption('global_sectionSpacing','{{ $v }}')">{{ $l }}</button>
        @endforeach
    </div></div>
    <div class="panel-section-title">Bordas e Sombras</div>
    <div><label class="ctrl-label">Arredondamento</label><div class="option-picker" data-option-group="global_borderRadius"><input type="hidden" name="global_borderRadius" value="{{ $t['global_borderRadius'] }}">
        @foreach(['none'=>'Nenhum','small'=>'Pequeno','medium'=>'Médio','large'=>'Grande','full'=>'Máximo'] as $v=>$l)
        <button type="button" class="option-btn {{ $t['global_borderRadius']==$v?'active':'' }}" data-value="{{ $v }}" onclick="selectOption('global_borderRadius','{{ $v }}')">{{ $l }}</button>
        @endforeach
    </div></div>
    <div><label class="ctrl-label">Sombras</label><div class="option-picker" data-option-group="global_shadowLevel"><input type="hidden" name="global_shadowLevel" value="{{ $t['global_shadowLevel'] }}">
        @foreach(['none'=>'Nenhuma','subtle'=>'Suave','medium'=>'Média','strong'=>'Forte'] as $v=>$l)
        <button type="button" class="option-btn {{ $t['global_shadowLevel']==$v?'active':'' }}" data-value="{{ $v }}" onclick="selectOption('global_shadowLevel','{{ $v }}')">{{ $l }}</button>
        @endforeach
    </div></div>
    <div><label class="ctrl-label">Bordas</label><div class="option-picker" data-option-group="global_borderStyle"><input type="hidden" name="global_borderStyle" value="{{ $t['global_borderStyle'] }}">
        @foreach(['none'=>'Nenhuma','thin'=>'Fina','medium'=>'Média','thick'=>'Grossa'] as $v=>$l)
        <button type="button" class="option-btn {{ $t['global_borderStyle']==$v?'active':'' }}" data-value="{{ $v }}" onclick="selectOption('global_borderStyle','{{ $v }}')">{{ $l }}</button>
        @endforeach
    </div></div>
    <div class="panel-section-title">Animações</div>
    <div class="toggle-row"><label>Animações habilitadas</label><input type="checkbox" name="global_animationsEnabled" value="1" {{ $t['global_animationsEnabled']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Velocidade</label><div class="option-picker" data-option-group="global_animationSpeed"><input type="hidden" name="global_animationSpeed" value="{{ $t['global_animationSpeed'] }}">
        @foreach(['slow'=>'Lenta','normal'=>'Normal','fast'=>'Rápida'] as $v=>$l)
        <button type="button" class="option-btn {{ $t['global_animationSpeed']==$v?'active':'' }}" data-value="{{ $v }}" onclick="selectOption('global_animationSpeed','{{ $v }}')">{{ $l }}</button>
        @endforeach
    </div></div>
</div>
