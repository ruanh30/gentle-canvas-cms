{{-- Cart Panel — mirrors CartPanel.tsx --}}
<div class="space-y-4">
    <div class="flex items-center gap-2">
        <div class="p-1.5 rounded-md bg-gray-100"><svg class="h-3.5 w-3.5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18"/><path d="M16 10a4 4 0 01-8 0"/></svg></div>
        <div><h3 class="text-sm font-semibold">Carrinho</h3><p class="text-[11px] text-gray-400">Estilo e funcionalidades do carrinho</p></div>
    </div>
    <div><label class="ctrl-label">Tipo</label><select name="cart_style" class="ctrl-select">
        <option value="page" {{ $t['cart_style']=='page'?'selected':'' }}>Página inteira</option>
        <option value="drawer" {{ $t['cart_style']=='drawer'?'selected':'' }}>Drawer lateral</option>
        <option value="dropdown" {{ $t['cart_style']=='dropdown'?'selected':'' }}>Dropdown</option>
    </select></div>
    <div class="panel-section-title">Funcionalidades</div>
    <div class="toggle-row"><label>Thumbnails</label><input type="checkbox" name="cart_showThumbnails" value="1" {{ $t['cart_showThumbnails']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Alterar quantidade</label><input type="checkbox" name="cart_showQuantity" value="1" {{ $t['cart_showQuantity']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Campo de cupom</label><input type="checkbox" name="cart_showCoupon" value="1" {{ $t['cart_showCoupon']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Estimativa de frete</label><input type="checkbox" name="cart_showShippingEstimate" value="1" {{ $t['cart_showShippingEstimate']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Continuar comprando</label><input type="checkbox" name="cart_showContinueShopping" value="1" {{ $t['cart_showContinueShopping']?'checked':'' }} class="rounded"></div>
    <div class="panel-section-title">Frete Grátis</div>
    <div class="toggle-row"><label>Barra de frete grátis</label><input type="checkbox" name="cart_showFreeShippingBar" value="1" {{ $t['cart_showFreeShippingBar']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Valor mínimo</label><div class="slider-wrap"><input type="range" name="cart_freeShippingThreshold" min="50" max="1000" step="10" value="{{ $t['cart_freeShippingThreshold'] }}" oninput="this.nextElementSibling.textContent=this.value"><span class="slider-val">{{ $t['cart_freeShippingThreshold'] }}</span></div></div>
    <div><label class="ctrl-label">Mensagem</label><input type="text" name="cart_freeShippingMessage" value="{{ $t['cart_freeShippingMessage'] }}" class="ctrl-input"></div>
    <div class="panel-section-title">Recomendações</div>
    <div class="toggle-row"><label>Mostrar recomendações</label><input type="checkbox" name="cart_showRecommendations" value="1" {{ $t['cart_showRecommendations']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Título</label><input type="text" name="cart_recommendationsTitle" value="{{ $t['cart_recommendationsTitle'] }}" class="ctrl-input"></div>
    <div class="panel-section-title">Textos</div>
    <div><label class="ctrl-label">Carrinho vazio</label><input type="text" name="cart_emptyCartMessage" value="{{ $t['cart_emptyCartMessage'] }}" class="ctrl-input"></div>
    <div><label class="ctrl-label">CTA carrinho vazio</label><input type="text" name="cart_emptyCartCta" value="{{ $t['cart_emptyCartCta'] }}" class="ctrl-input"></div>
</div>
