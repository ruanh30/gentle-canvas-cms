{{-- Header Panel — mirrors HeaderPanel.tsx --}}
<div class="space-y-4">
    <div class="flex items-center gap-2">
        <div class="p-1.5 rounded-md bg-gray-100"><svg class="h-3.5 w-3.5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg></div>
        <div><h3 class="text-sm font-semibold">Cabeçalho</h3><p class="text-[11px] text-gray-400">Layout, menu, busca e barra de anúncio</p></div>
    </div>
    <div><label class="ctrl-label">Layout</label><div class="option-picker" data-option-group="header_layout"><input type="hidden" name="header_layout" value="{{ $t['header_layout'] }}">
        @foreach(['classic'=>['Clássico','Logo esq., nav dir.'],'centered'=>['Centralizado','Logo centro, nav abaixo'],'minimal'=>['Minimalista','Limpo e simples'],'logo-center-nav-left'=>['Nav Esq.','Nav esq., logo centro'],'hamburger-only'=>['Hambúrguer','Menu recolhido sempre'],'top-bar-split'=>['Dividido','Nav esq. + ações dir.'],'double-row'=>['Duas Linhas','Logo em cima, nav embaixo'],'sidebar-nav'=>['Nav Lateral','Menu lateral deslizante'],'transparent'=>['Transparente','Sobre o hero/banner']] as $v=>$d)
        <button type="button" class="option-btn {{ $t['header_layout']==$v?'active':'' }}" data-value="{{ $v }}" onclick="selectOption('header_layout','{{ $v }}')">{{ $d[0] }}<span class="desc">{{ $d[1] }}</span></button>
        @endforeach
    </div></div>
    <div class="panel-section-title">Comportamento</div>
    <div class="toggle-row"><label>Header fixo (sticky)</label><input type="checkbox" name="header_sticky" value="1" {{ $t['header_sticky']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Encolher ao rolar</label><input type="checkbox" name="header_shrinkOnScroll" value="1" {{ $t['header_shrinkOnScroll']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Sombra ao rolar</label><input type="checkbox" name="header_shadowOnScroll" value="1" {{ $t['header_shadowOnScroll']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Borda inferior</label><input type="checkbox" name="header_borderBottom" value="1" {{ $t['header_borderBottom']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Altura</label><div class="slider-wrap"><input type="range" name="header_height" min="48" max="96" value="{{ $t['header_height'] }}" oninput="this.nextElementSibling.textContent=this.value+'px'"><span class="slider-val">{{ $t['header_height'] }}px</span></div></div>
    <div class="panel-section-title">Menu</div>
    <div><label class="ctrl-label">Estilo do menu</label><select name="header_menuStyle" class="ctrl-select">
        <option value="horizontal" {{ $t['header_menuStyle']=='horizontal'?'selected':'' }}>Horizontal</option>
        <option value="dropdown" {{ $t['header_menuStyle']=='dropdown'?'selected':'' }}>Dropdown</option>
        <option value="mega-menu" {{ $t['header_menuStyle']=='mega-menu'?'selected':'' }}>Mega Menu</option>
    </select></div>
    <div><label class="ctrl-label">Tamanho da fonte</label><div class="slider-wrap"><input type="range" name="header_menuFontSize" min="10" max="18" value="{{ $t['header_menuFontSize'] }}" oninput="this.nextElementSibling.textContent=this.value+'px'"><span class="slider-val">{{ $t['header_menuFontSize'] }}px</span></div></div>
    <div class="toggle-row"><label>Maiúsculas</label><input type="checkbox" name="header_menuUppercase" value="1" {{ $t['header_menuUppercase']?'checked':'' }} class="rounded"></div>
    <div class="panel-section-title">Ícones e Ações</div>
    <div><label class="ctrl-label">Tamanho dos ícones</label><div class="slider-wrap"><input type="range" name="header_iconSize" min="16" max="28" value="{{ $t['header_iconSize'] }}" oninput="this.nextElementSibling.textContent=this.value+'px'"><span class="slider-val">{{ $t['header_iconSize'] }}px</span></div></div>
    <div class="toggle-row"><label>Busca</label><input type="checkbox" name="header_showSearch" value="1" {{ $t['header_showSearch']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Estilo da busca</label><select name="header_searchStyle" class="ctrl-select">
        <option value="inline" {{ $t['header_searchStyle']=='inline'?'selected':'' }}>Inline</option>
        <option value="modal" {{ $t['header_searchStyle']=='modal'?'selected':'' }}>Modal</option>
        <option value="drawer" {{ $t['header_searchStyle']=='drawer'?'selected':'' }}>Drawer</option>
    </select></div>
    <div class="toggle-row"><label>Conta</label><input type="checkbox" name="header_showAccount" value="1" {{ $t['header_showAccount']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Wishlist</label><input type="checkbox" name="header_showWishlist" value="1" {{ $t['header_showWishlist']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Carrinho</label><input type="checkbox" name="header_showCart" value="1" {{ $t['header_showCart']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Badge do carrinho</label><select name="header_cartBadgeStyle" class="ctrl-select">
        <option value="count" {{ $t['header_cartBadgeStyle']=='count'?'selected':'' }}>Contador</option>
        <option value="dot" {{ $t['header_cartBadgeStyle']=='dot'?'selected':'' }}>Ponto</option>
        <option value="none" {{ $t['header_cartBadgeStyle']=='none'?'selected':'' }}>Nenhum</option>
    </select></div>
    <div class="panel-section-title">Barra de Anúncio (Topo)</div>
    <div class="toggle-row"><label>Ativar barra</label><input type="checkbox" name="ann_enabled" value="1" {{ $t['ann_enabled']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Estilo</label><div class="option-picker" data-option-group="ann_style"><input type="hidden" name="ann_style" value="{{ $t['ann_style'] }}">
        @foreach(['static'=>['Estático','Mensagem fixa'],'carousel'=>['Carrossel','Rotação de msgs'],'ticker'=>['Ticker','Texto corrido']] as $v=>$d)
        <button type="button" class="option-btn {{ $t['ann_style']==$v?'active':'' }}" data-value="{{ $v }}" onclick="selectOption('ann_style','{{ $v }}')">{{ $d[0] }}<span class="desc">{{ $d[1] }}</span></button>
        @endforeach
    </div></div>
    <div><label class="ctrl-label">Mensagem 1</label><input type="text" name="ann_msg1" value="{{ $t['ann_msg1'] }}" class="ctrl-input" placeholder="Frete grátis acima de R$ 299"></div>
    <div><label class="ctrl-label">Mensagem 2</label><input type="text" name="ann_msg2" value="{{ $t['ann_msg2'] }}" class="ctrl-input" placeholder="Parcele em até 12x"></div>
    <div><label class="ctrl-label">Mensagem 3</label><input type="text" name="ann_msg3" value="{{ $t['ann_msg3'] }}" class="ctrl-input" placeholder="Troca grátis em 30 dias"></div>
    <div><label class="ctrl-label">Velocidade</label><div class="slider-wrap"><input type="range" name="ann_speed" min="2" max="10" value="{{ $t['ann_speed'] }}" oninput="this.nextElementSibling.textContent=this.value+'s'"><span class="slider-val">{{ $t['ann_speed'] }}s</span></div></div>
    <div class="grid grid-cols-2 gap-3">
        <div><label class="ctrl-label">Fundo</label><div class="color-input-wrap"><input type="color" name="ann_backgroundColor" value="{{ $t['ann_backgroundColor'] }}" class="color-swatch"><input type="text" value="{{ $t['ann_backgroundColor'] }}" class="color-hex"></div></div>
        <div><label class="ctrl-label">Texto</label><div class="color-input-wrap"><input type="color" name="ann_textColor" value="{{ $t['ann_textColor'] }}" class="color-swatch"><input type="text" value="{{ $t['ann_textColor'] }}" class="color-hex"></div></div>
    </div>
    <div class="toggle-row"><label>Pausar no hover</label><input type="checkbox" name="ann_pauseOnHover" value="1" {{ $t['ann_pauseOnHover']?'checked':'' }} class="rounded"></div>
    <div class="panel-section-title">Banner abaixo do Cabeçalho</div>
    <div class="toggle-row"><label>Ativar banner</label><input type="checkbox" name="bannerBelow_enabled" value="1" {{ $t['bannerBelow_enabled']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">URL da imagem principal</label><input type="text" name="bannerBelow_imageUrl" value="{{ $t['bannerBelow_imageUrl'] }}" class="ctrl-input" placeholder="https://..."></div>
    <div class="toggle-row"><label>Carrossel de imagens</label><input type="checkbox" name="bannerBelow_carousel" value="1" {{ $t['bannerBelow_carousel']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Imagem 2</label><input type="text" name="bannerBelow_img2" value="{{ $t['bannerBelow_img2'] }}" class="ctrl-input" placeholder="https://..."></div>
    <div><label class="ctrl-label">Imagem 3</label><input type="text" name="bannerBelow_img3" value="{{ $t['bannerBelow_img3'] }}" class="ctrl-input" placeholder="https://..."></div>
    <div><label class="ctrl-label">Velocidade do carrossel</label><div class="slider-wrap"><input type="range" name="bannerBelow_carouselSpeed" min="2" max="10" value="{{ $t['bannerBelow_carouselSpeed'] }}" oninput="this.nextElementSibling.textContent=this.value+'s'"><span class="slider-val">{{ $t['bannerBelow_carouselSpeed'] }}s</span></div></div>
    <div><label class="ctrl-label">Link</label><input type="text" name="bannerBelow_link" value="{{ $t['bannerBelow_link'] }}" class="ctrl-input" placeholder="/products"></div>
    <div><label class="ctrl-label">Altura</label><div class="slider-wrap"><input type="range" name="bannerBelow_height" min="40" max="200" value="{{ $t['bannerBelow_height'] }}" oninput="this.nextElementSibling.textContent=this.value+'px'"><span class="slider-val">{{ $t['bannerBelow_height'] }}px</span></div></div>
    <div class="toggle-row"><label>Largura total</label><input type="checkbox" name="bannerBelow_fullWidth" value="1" {{ $t['bannerBelow_fullWidth']?'checked':'' }} class="rounded"></div>
</div>
