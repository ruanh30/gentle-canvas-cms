{{-- Logo Panel — mirrors LogoPanel.tsx --}}
<div class="space-y-4">
    <div class="flex items-center gap-2">
        <div class="p-1.5 rounded-md bg-gray-100"><svg class="h-3.5 w-3.5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg></div>
        <div><h3 class="text-sm font-semibold">Logo</h3><p class="text-[11px] text-gray-400">Configure o logo da sua loja</p></div>
    </div>
    <div><label class="ctrl-label">Nome da loja</label><input type="text" name="logo_text" value="{{ $t['logo_text'] }}" class="ctrl-input" placeholder="Minha Loja"></div>
    <div><label class="ctrl-label">URL da imagem</label><input type="text" name="logo_imageUrl" value="{{ $t['logo_imageUrl'] }}" class="ctrl-input" placeholder="https://..."></div>
    <div class="toggle-row"><label>Mostrar nome como texto</label><input type="checkbox" name="logo_showText" value="1" {{ $t['logo_showText']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Altura máx. do logo</label><div class="slider-wrap"><input type="range" name="logo_maxHeight" min="24" max="80" value="{{ $t['logo_maxHeight'] }}" oninput="this.nextElementSibling.textContent=this.value+'px'"><span class="slider-val">{{ $t['logo_maxHeight'] }}px</span></div></div>
    <div><label class="ctrl-label">Posição</label><div class="option-picker" data-option-group="logo_position"><input type="hidden" name="logo_position" value="{{ $t['logo_position'] }}">
        <button type="button" class="option-btn {{ $t['logo_position']=='left'?'active':'' }}" data-value="left" onclick="selectOption('logo_position','left')">Esquerda</button>
        <button type="button" class="option-btn {{ $t['logo_position']=='center'?'active':'' }}" data-value="center" onclick="selectOption('logo_position','center')">Centro</button>
    </div></div>
    <div class="panel-section-title">Preview</div>
    <div class="p-4 bg-gray-100 rounded-lg flex items-center gap-2">
        @if($t['logo_imageUrl'])<img src="{{ $t['logo_imageUrl'] }}" alt="Logo" style="max-height: {{ $t['logo_maxHeight'] }}px" class="object-contain">@endif
        @if($t['logo_showText'])<span class="text-lg font-bold">{{ $t['logo_text'] }}</span>@endif
    </div>
</div>
