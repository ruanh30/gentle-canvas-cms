{{-- Inputs Panel — mirrors InputsPanel.tsx --}}
<div class="space-y-4">
    <div class="flex items-center gap-2">
        <div class="p-1.5 rounded-md bg-gray-100"><svg class="h-3.5 w-3.5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10v4"/></svg></div>
        <div><h3 class="text-sm font-semibold">Formulários</h3><p class="text-[11px] text-gray-400">Estilo dos campos de entrada</p></div>
    </div>
    <div class="p-3 bg-white border border-gray-200 rounded-lg space-y-2">
        <span class="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Preview</span>
        <input type="text" placeholder="Digite seu email..." class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300">
    </div>
    <div class="panel-section-title">Configurações</div>
    <div><label class="ctrl-label">Estilo</label><div class="option-picker" data-option-group="input_style"><input type="hidden" name="input_style" value="{{ $t['input_style'] }}">
        @foreach(['default'=>'Padrão','filled'=>'Preenchido','underline'=>'Sublinhado'] as $v=>$l)
        <button type="button" class="option-btn {{ $t['input_style']==$v?'active':'' }}" data-value="{{ $v }}" onclick="selectOption('input_style','{{ $v }}')">{{ $l }}</button>
        @endforeach
    </div></div>
    <div><label class="ctrl-label">Arredondamento</label><div class="option-picker" data-option-group="input_radius"><input type="hidden" name="input_radius" value="{{ $t['input_radius'] }}">
        @foreach(['none'=>'Nenhum','small'=>'Pequeno','medium'=>'Médio','large'=>'Grande'] as $v=>$l)
        <button type="button" class="option-btn {{ $t['input_radius']==$v?'active':'' }}" data-value="{{ $v }}" onclick="selectOption('input_radius','{{ $v }}')">{{ $l }}</button>
        @endforeach
    </div></div>
    <div class="toggle-row"><label>Anel de foco</label><span class="hint">Mostrar anel ao focar no campo</span><input type="checkbox" name="input_focusRing" value="1" {{ $t['input_focusRing']?'checked':'' }} class="rounded ml-auto"></div>
</div>
