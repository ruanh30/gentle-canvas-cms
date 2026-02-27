{{-- Colors Panel — mirrors ColorsPanel.tsx exactly --}}
<div class="space-y-4">
    <div class="flex items-center gap-2">
        <div class="p-1.5 rounded-md bg-gray-100"><svg class="h-3.5 w-3.5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="15.5" r="2.5"/><circle cx="8.5" cy="8.5" r="2.5"/><circle cx="6.5" cy="15.5" r="2.5"/></svg></div>
        <div><h3 class="text-sm font-semibold">Paleta de Cores</h3><p class="text-[11px] text-gray-400">Defina todas as cores da sua loja</p></div>
    </div>
    <div class="panel-section-title">Principais</div>
    <div class="grid grid-cols-2 gap-3">
        <div><label class="ctrl-label">Primária</label><div class="color-input-wrap"><input type="color" name="colors_primary" value="{{ $t['colors_primary'] }}" class="color-swatch"><input type="text" value="{{ $t['colors_primary'] }}" class="color-hex" oninput="this.previousElementSibling.value=this.value" onchange="this.previousElementSibling.value=this.value"></div></div>
        <div><label class="ctrl-label">Texto sobre primária</label><div class="color-input-wrap"><input type="color" name="colors_primaryForeground" value="{{ $t['colors_primaryForeground'] }}" class="color-swatch"><input type="text" value="{{ $t['colors_primaryForeground'] }}" class="color-hex"></div></div>
        <div><label class="ctrl-label">Secundária</label><div class="color-input-wrap"><input type="color" name="colors_secondary" value="{{ $t['colors_secondary'] }}" class="color-swatch"><input type="text" value="{{ $t['colors_secondary'] }}" class="color-hex"></div></div>
        <div><label class="ctrl-label">Texto sobre secundária</label><div class="color-input-wrap"><input type="color" name="colors_secondaryForeground" value="{{ $t['colors_secondaryForeground'] }}" class="color-swatch"><input type="text" value="{{ $t['colors_secondaryForeground'] }}" class="color-hex"></div></div>
    </div>
    <div class="panel-section-title">Superfícies</div>
    <div class="grid grid-cols-2 gap-3">
        <div><label class="ctrl-label">Fundo</label><div class="color-input-wrap"><input type="color" name="colors_background" value="{{ $t['colors_background'] }}" class="color-swatch"><input type="text" value="{{ $t['colors_background'] }}" class="color-hex"></div></div>
        <div><label class="ctrl-label">Texto</label><div class="color-input-wrap"><input type="color" name="colors_foreground" value="{{ $t['colors_foreground'] }}" class="color-swatch"><input type="text" value="{{ $t['colors_foreground'] }}" class="color-hex"></div></div>
        <div><label class="ctrl-label">Destaque</label><div class="color-input-wrap"><input type="color" name="colors_accent" value="{{ $t['colors_accent'] }}" class="color-swatch"><input type="text" value="{{ $t['colors_accent'] }}" class="color-hex"></div></div>
        <div><label class="ctrl-label">Texto destaque</label><div class="color-input-wrap"><input type="color" name="colors_accentForeground" value="{{ $t['colors_accentForeground'] }}" class="color-swatch"><input type="text" value="{{ $t['colors_accentForeground'] }}" class="color-hex"></div></div>
        <div><label class="ctrl-label">Suave (muted)</label><div class="color-input-wrap"><input type="color" name="colors_muted" value="{{ $t['colors_muted'] }}" class="color-swatch"><input type="text" value="{{ $t['colors_muted'] }}" class="color-hex"></div></div>
        <div><label class="ctrl-label">Texto suave</label><div class="color-input-wrap"><input type="color" name="colors_mutedForeground" value="{{ $t['colors_mutedForeground'] }}" class="color-swatch"><input type="text" value="{{ $t['colors_mutedForeground'] }}" class="color-hex"></div></div>
        <div><label class="ctrl-label">Bordas</label><div class="color-input-wrap"><input type="color" name="colors_border" value="{{ $t['colors_border'] }}" class="color-swatch"><input type="text" value="{{ $t['colors_border'] }}" class="color-hex"></div></div>
    </div>
    <div class="panel-section-title">Status</div>
    <div class="grid grid-cols-2 gap-3">
        <div><label class="ctrl-label">Sucesso</label><div class="color-input-wrap"><input type="color" name="colors_success" value="{{ $t['colors_success'] }}" class="color-swatch"><input type="text" value="{{ $t['colors_success'] }}" class="color-hex"></div></div>
        <div><label class="ctrl-label">Alerta</label><div class="color-input-wrap"><input type="color" name="colors_warning" value="{{ $t['colors_warning'] }}" class="color-swatch"><input type="text" value="{{ $t['colors_warning'] }}" class="color-hex"></div></div>
        <div><label class="ctrl-label">Erro</label><div class="color-input-wrap"><input type="color" name="colors_error" value="{{ $t['colors_error'] }}" class="color-swatch"><input type="text" value="{{ $t['colors_error'] }}" class="color-hex"></div></div>
    </div>
    <div class="panel-section-title">Ação de Compra</div>
    <div class="grid grid-cols-2 gap-3">
        <div><label class="ctrl-label">Botão Comprar</label><div class="color-input-wrap"><input type="color" name="colors_buyNow" value="{{ $t['colors_buyNow'] }}" class="color-swatch"><input type="text" value="{{ $t['colors_buyNow'] }}" class="color-hex"></div></div>
        <div><label class="ctrl-label">Hover Comprar</label><div class="color-input-wrap"><input type="color" name="colors_buyNowHover" value="{{ $t['colors_buyNowHover'] }}" class="color-swatch"><input type="text" value="{{ $t['colors_buyNowHover'] }}" class="color-hex"></div></div>
    </div>
</div>
