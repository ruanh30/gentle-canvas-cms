{{-- Product Card Panel — mirrors ProductCardPanel.tsx --}}
<div class="space-y-4">
    <div class="flex items-center gap-2">
        <div class="p-1.5 rounded-md bg-gray-100"><svg class="h-3.5 w-3.5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg></div>
        <div><h3 class="text-sm font-semibold">Card de Produto</h3><p class="text-[11px] text-gray-400">Visual e comportamento dos cards de produto nas listagens e destaques</p></div>
    </div>
    <div><label class="ctrl-label">Layout</label><div class="option-picker" data-option-group="card_layout"><input type="hidden" name="card_layout" value="{{ $t['card_layout'] }}">
        @foreach(['standard'=>['Padrão','Imagem em cima e info embaixo'],'minimal'=>['Minimal','Apenas imagem, nome e preço'],'detailed'=>['Detalhado','Inclui descrição e mais info'],'horizontal'=>['Horizontal','Imagem ao lado do conteúdo'],'overlay'=>['Overlay','Texto sobreposto à imagem'],'magazine'=>['Magazine','Estilo editorial sofisticado']] as $v=>$d)
        <button type="button" class="option-btn {{ $t['card_layout']==$v?'active':'' }}" data-value="{{ $v }}" onclick="selectOption('card_layout','{{ $v }}')">{{ $d[0] }}<span class="desc">{{ $d[1] }}</span></button>
        @endforeach
    </div></div>
    <div class="panel-section-title">Imagem</div>
    <div><label class="ctrl-label">Proporção da imagem</label><select name="card_imageAspect" class="ctrl-select">
        @foreach(['1:1'=>'1:1 Quadrado','3:4'=>'3:4 Retrato','4:5'=>'4:5 Instagram','2:3'=>'2:3 Alto','16:9'=>'16:9 Paisagem'] as $v=>$l)
        <option value="{{ $v }}" {{ $t['card_imageAspect']==$v?'selected':'' }}>{{ $l }}</option>
        @endforeach
    </select></div>
    <div><label class="ctrl-label">Efeito ao passar o mouse</label><select name="card_imageHover" class="ctrl-select">
        @foreach(['none'=>'Nenhum','zoom'=>'Zoom','swap'=>'Trocar','slide'=>'Slide'] as $v=>$l)
        <option value="{{ $v }}" {{ $t['card_imageHover']==$v?'selected':'' }}>{{ $l }}</option>
        @endforeach
    </select></div>
    <div><label class="ctrl-label">Borda da imagem</label><select name="card_imageBorderRadius" class="ctrl-select">
        @foreach(['none'=>'Nenhuma','small'=>'Pequena (4px)','medium'=>'Média (8px)','large'=>'Grande (12px)'] as $v=>$l)
        <option value="{{ $v }}" {{ $t['card_imageBorderRadius']==$v?'selected':'' }}>{{ $l }}</option>
        @endforeach
    </select></div>
    <div class="panel-section-title">Informações exibidas</div>
    <div class="toggle-row"><label>Categoria</label><input type="checkbox" name="card_showCategory" value="1" {{ $t['card_showCategory']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Marca</label><input type="checkbox" name="card_showBrand" value="1" {{ $t['card_showBrand']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Avaliação</label><input type="checkbox" name="card_showRating" value="1" {{ $t['card_showRating']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Linhas do título</label><div class="slider-wrap"><input type="range" name="card_titleLines" min="1" max="3" value="{{ $t['card_titleLines'] }}" oninput="this.nextElementSibling.textContent=this.value"><span class="slider-val">{{ $t['card_titleLines'] }}</span></div></div>
    <div><label class="ctrl-label">Alinhamento do conteúdo</label><div class="option-picker" data-option-group="card_contentAlign"><input type="hidden" name="card_contentAlign" value="{{ $t['card_contentAlign'] }}">
        <button type="button" class="option-btn {{ $t['card_contentAlign']=='left'?'active':'' }}" data-value="left" onclick="selectOption('card_contentAlign','left')">Esquerda</button>
        <button type="button" class="option-btn {{ $t['card_contentAlign']=='center'?'active':'' }}" data-value="center" onclick="selectOption('card_contentAlign','center')">Centro</button>
    </div></div>
    <div class="panel-section-title">Preço</div>
    <div><label class="ctrl-label">Tamanho do preço</label><div class="option-picker" data-option-group="card_priceSize"><input type="hidden" name="card_priceSize" value="{{ $t['card_priceSize'] }}">
        @foreach(['small'=>'Pequeno','medium'=>'Médio','large'=>'Grande'] as $v=>$l)
        <button type="button" class="option-btn {{ $t['card_priceSize']==$v?'active':'' }}" data-value="{{ $v }}" onclick="selectOption('card_priceSize','{{ $v }}')">{{ $l }}</button>
        @endforeach
    </div></div>
    <div class="toggle-row"><label>Preço comparativo</label><input type="checkbox" name="card_showComparePrice" value="1" {{ $t['card_showComparePrice']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Badge de desconto</label><input type="checkbox" name="card_showDiscount" value="1" {{ $t['card_showDiscount']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Formato do desconto</label><select name="card_discountStyle" class="ctrl-select">
        <option value="percentage" {{ $t['card_discountStyle']=='percentage'?'selected':'' }}>Porcentagem — ex: -30%</option>
        <option value="amount" {{ $t['card_discountStyle']=='amount'?'selected':'' }}>Valor em reais — ex: -R$ 40,00</option>
        <option value="badge" {{ $t['card_discountStyle']=='badge'?'selected':'' }}>Badge com texto — exibe "OFERTA"</option>
    </select></div>
    <div class="toggle-row"><label>Parcelas</label><input type="checkbox" name="card_showInstallments" value="1" {{ $t['card_showInstallments']?'checked':'' }} class="rounded"></div>
    <div class="panel-section-title">Botões de Ação</div>
    <div class="toggle-row"><label>Botão Comprar Agora</label><input type="checkbox" name="card_showBuyNow" value="1" {{ $t['card_showBuyNow']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Texto do botão Comprar</label><input type="text" name="card_buyNowText" value="{{ $t['card_buyNowText'] }}" class="ctrl-input" placeholder="Comprar Agora"></div>
    <div class="toggle-row"><label>Botão Adicionar ao Carrinho</label><input type="checkbox" name="card_showAddToCart" value="1" {{ $t['card_showAddToCart']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Texto do botão Carrinho</label><input type="text" name="card_addToCartText" value="{{ $t['card_addToCartText'] }}" class="ctrl-input" placeholder="Adicionar ao Carrinho"></div>
    <div><label class="ctrl-label">Visibilidade dos botões</label><select name="card_buttonVisibility" class="ctrl-select">
        <option value="both" {{ $t['card_buttonVisibility']=='both'?'selected':'' }}>Ambos</option>
        <option value="add-only" {{ $t['card_buttonVisibility']=='add-only'?'selected':'' }}>Só Adicionar</option>
        <option value="buy-only" {{ $t['card_buttonVisibility']=='buy-only'?'selected':'' }}>Só Comprar</option>
    </select></div>
    <div><label class="ctrl-label">Layout dos botões</label><div class="option-picker" data-option-group="card_buttonLayout"><input type="hidden" name="card_buttonLayout" value="{{ $t['card_buttonLayout'] }}">
        <button type="button" class="option-btn {{ $t['card_buttonLayout']=='stacked'?'active':'' }}" data-value="stacked" onclick="selectOption('card_buttonLayout','stacked')">Empilhado</button>
        <button type="button" class="option-btn {{ $t['card_buttonLayout']=='side-by-side'?'active':'' }}" data-value="side-by-side" onclick="selectOption('card_buttonLayout','side-by-side')">Lado a lado</button>
    </div></div>
    <div><label class="ctrl-label">Estilo visual dos botões</label><div class="option-picker" data-option-group="card_buttonStyle"><input type="hidden" name="card_buttonStyle" value="{{ $t['card_buttonStyle'] }}">
        @foreach(['solid'=>'Sólido','outline'=>'Contorno','pill'=>'Pílula','rounded'=>'Arredondado','sharp'=>'Reto','gradient'=>'Gradiente','underline'=>'Sublinhado'] as $v=>$l)
        <button type="button" class="option-btn {{ $t['card_buttonStyle']==$v?'active':'' }}" data-value="{{ $v }}" onclick="selectOption('card_buttonStyle','{{ $v }}')">{{ $l }}</button>
        @endforeach
    </div></div>
    <div><label class="ctrl-label">Tamanho do botão carrinho</label><select name="card_addToCartStyle" class="ctrl-select">
        <option value="icon" {{ $t['card_addToCartStyle']=='icon'?'selected':'' }}>Ícone</option>
        <option value="button" {{ $t['card_addToCartStyle']=='button'?'selected':'' }}>Botão compacto</option>
        <option value="full-width" {{ $t['card_addToCartStyle']=='full-width'?'selected':'' }}>Largura total</option>
    </select></div>
    <div class="panel-section-title">Interação</div>
    <div class="toggle-row"><label>Quick View</label><input type="checkbox" name="card_showQuickView" value="1" {{ $t['card_showQuickView']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Estilo do Quick View</label><select name="card_quickViewStyle" class="ctrl-select">
        <option value="modal" {{ $t['card_quickViewStyle']=='modal'?'selected':'' }}>Modal</option>
        <option value="drawer" {{ $t['card_quickViewStyle']=='drawer'?'selected':'' }}>Drawer</option>
        <option value="expand" {{ $t['card_quickViewStyle']=='expand'?'selected':'' }}>Expandir</option>
        <option value="side-panel" {{ $t['card_quickViewStyle']=='side-panel'?'selected':'' }}>Painel lateral</option>
    </select></div>
    <div class="toggle-row"><label>Lista de Desejos</label><input type="checkbox" name="card_showWishlist" value="1" {{ $t['card_showWishlist']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Clique no card</label><select name="card_clickBehavior" class="ctrl-select">
        <option value="navigate" {{ $t['card_clickBehavior']=='navigate'?'selected':'' }}>Navegar</option>
        <option value="modal" {{ $t['card_clickBehavior']=='modal'?'selected':'' }}>Modal</option>
    </select></div>
    <div class="panel-section-title">Badges de Desconto</div>
    <div><label class="ctrl-label">Posição do badge</label><select name="card_badgePosition" class="ctrl-select">
        <option value="top-left" {{ $t['card_badgePosition']=='top-left'?'selected':'' }}>Topo esquerdo</option>
        <option value="top-right" {{ $t['card_badgePosition']=='top-right'?'selected':'' }}>Topo direito</option>
        <option value="bottom-left" {{ $t['card_badgePosition']=='bottom-left'?'selected':'' }}>Inferior esquerdo</option>
    </select></div>
    <div><label class="ctrl-label">Formato do badge</label><select name="card_badgeStyle" class="ctrl-select">
        <option value="square" {{ $t['card_badgeStyle']=='square'?'selected':'' }}>Quadrado</option>
        <option value="rounded" {{ $t['card_badgeStyle']=='rounded'?'selected':'' }}>Arredondado</option>
        <option value="pill" {{ $t['card_badgeStyle']=='pill'?'selected':'' }}>Pílula</option>
    </select></div>
    <div class="panel-section-title">Aparência Geral</div>
    <div><label class="ctrl-label">Espaçamento interno</label><div class="option-picker" data-option-group="card_spacing"><input type="hidden" name="card_spacing" value="{{ $t['card_spacing'] }}">
        @foreach(['compact'=>'Compacto','normal'=>'Normal','spacious'=>'Espaçoso'] as $v=>$l)
        <button type="button" class="option-btn {{ $t['card_spacing']==$v?'active':'' }}" data-value="{{ $v }}" onclick="selectOption('card_spacing','{{ $v }}')">{{ $l }}</button>
        @endforeach
    </div></div>
    <div><label class="ctrl-label">Sombra do card</label><select name="card_shadow" class="ctrl-select">
        @foreach(['none'=>'Nenhuma','subtle'=>'Suave','medium'=>'Média','strong'=>'Forte'] as $v=>$l)
        <option value="{{ $v }}" {{ $t['card_shadow']==$v?'selected':'' }}>{{ $l }}</option>
        @endforeach
    </select></div>
    <div class="toggle-row"><label>Sombra ao passar o mouse</label><input type="checkbox" name="card_hoverShadow" value="1" {{ $t['card_hoverShadow']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Borda ao redor do card</label><input type="checkbox" name="card_border" value="1" {{ $t['card_border']?'checked':'' }} class="rounded"></div>
</div>
