{{-- Buttons Panel — mirrors ButtonsPanel.tsx --}}
<div class="space-y-4">
    <div class="flex items-center gap-2">
        <div class="p-1.5 rounded-md bg-gray-100"><svg class="h-3.5 w-3.5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51z"/></svg></div>
        <div><h3 class="text-sm font-semibold">Botões</h3><p class="text-[11px] text-gray-400">Aparência e comportamento dos botões em toda a loja</p></div>
    </div>
    <div><label class="ctrl-label">Estilo</label><div class="option-picker" data-option-group="btn_style"><input type="hidden" name="btn_style" value="{{ $t['btn_style'] }}">
        @foreach(['filled'=>['Sólido','Fundo preenchido'],'outline'=>['Contorno','Apenas borda'],'ghost'=>['Fantasma','Sem fundo/borda'],'soft'=>['Suave','Fundo translúcido'],'gradient'=>['Gradiente','Fundo degradê'],'3d'=>['3D','Com profundidade'],'neon'=>['Neon','Brilho luminoso'],'minimal'=>['Minimal','Apenas texto sublinhado']] as $v=>$d)
        <button type="button" class="option-btn {{ $t['btn_style']==$v?'active':'' }}" data-value="{{ $v }}" onclick="selectOption('btn_style','{{ $v }}')">{{ $d[0] }}<span class="desc">{{ $d[1] }}</span></button>
        @endforeach
    </div></div>
    <div><label class="ctrl-label">Arredondamento</label><div class="option-picker" data-option-group="btn_radius"><input type="hidden" name="btn_radius" value="{{ $t['btn_radius'] }}">
        @foreach(['none'=>['Reto','Sem curva'],'small'=>['Pequeno','4px'],'medium'=>['Médio','8px'],'large'=>['Grande','16px'],'full'=>['Pílula','Totalmente arredondado']] as $v=>$d)
        <button type="button" class="option-btn {{ $t['btn_radius']==$v?'active':'' }}" data-value="{{ $v }}" onclick="selectOption('btn_radius','{{ $v }}')">{{ $d[0] }}<span class="desc">{{ $d[1] }}</span></button>
        @endforeach
    </div></div>
    <div><label class="ctrl-label">Tamanho</label><div class="option-picker" data-option-group="btn_size"><input type="hidden" name="btn_size" value="{{ $t['btn_size'] }}">
        @foreach(['small'=>['Pequeno','Compacto'],'medium'=>['Médio','Padrão'],'large'=>['Grande','Destaque']] as $v=>$d)
        <button type="button" class="option-btn {{ $t['btn_size']==$v?'active':'' }}" data-value="{{ $v }}" onclick="selectOption('btn_size','{{ $v }}')">{{ $d[0] }}<span class="desc">{{ $d[1] }}</span></button>
        @endforeach
    </div></div>
    <div><label class="ctrl-label">Peso da fonte</label><div class="slider-wrap"><input type="range" name="btn_fontWeight" min="400" max="800" step="100" value="{{ $t['btn_fontWeight'] }}" oninput="this.nextElementSibling.textContent=this.value"><span class="slider-val">{{ $t['btn_fontWeight'] }}</span></div></div>
    <div class="toggle-row"><label>Texto maiúsculo</label><input type="checkbox" name="btn_uppercase" value="1" {{ $t['btn_uppercase']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Sombra</label><input type="checkbox" name="btn_shadow" value="1" {{ $t['btn_shadow']?'checked':'' }} class="rounded"></div>
    <div class="panel-section-title">Preview</div>
    <div class="flex gap-2 flex-wrap p-3 bg-gray-100 rounded-lg">
        <button type="button" class="px-4 py-2 text-sm rounded-md bg-gray-900 text-white">Primário</button>
        <button type="button" class="px-4 py-2 text-sm rounded-md border-2 border-gray-900 text-gray-900">Contorno</button>
        <button type="button" class="px-4 py-2 text-sm rounded-md text-gray-900 hover:bg-gray-100">Fantasma</button>
    </div>
</div>
