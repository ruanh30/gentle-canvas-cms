{{-- Category Panel — mirrors CategoryPanel.tsx --}}
<div class="space-y-4">
    <div class="flex items-center gap-2">
        <div class="p-1.5 rounded-md bg-gray-100"><svg class="h-3.5 w-3.5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></div>
        <div><h3 class="text-sm font-semibold">Categoria / Busca</h3><p class="text-[11px] text-gray-400">Página de listagem de produtos</p></div>
    </div>
    <div><label class="ctrl-label">Layout</label><select name="cat_layout" class="ctrl-select">
        <option value="sidebar-left" {{ $t['cat_layout']=='sidebar-left'?'selected':'' }}>Sidebar esquerda</option>
        <option value="sidebar-right" {{ $t['cat_layout']=='sidebar-right'?'selected':'' }}>Sidebar direita</option>
        <option value="top-filters" {{ $t['cat_layout']=='top-filters'?'selected':'' }}>Filtros no topo</option>
        <option value="no-filters" {{ $t['cat_layout']=='no-filters'?'selected':'' }}>Sem filtros</option>
    </select></div>
    <div class="panel-section-title">Modo de Exibição</div>
    <div><label class="ctrl-label">Visualização</label><div class="option-picker" data-option-group="cat_displayMode"><input type="hidden" name="cat_displayMode" value="{{ $t['cat_displayMode'] }}">
        @foreach(['grid'=>['Grade','Cards em grid'],'list'=>['Lista','Linha a linha'],'masonry'=>['Masonry','Alturas variadas'],'carousel'=>['Carrossel','Deslizar horizontal'],'compact-grid'=>['Compacto','Grid sem espaço']] as $v=>$d)
        <button type="button" class="option-btn {{ $t['cat_displayMode']==$v?'active':'' }}" data-value="{{ $v }}" onclick="selectOption('cat_displayMode','{{ $v }}')">{{ $d[0] }}<span class="desc">{{ $d[1] }}</span></button>
        @endforeach
    </div></div>
    <div class="panel-section-title">Grid</div>
    <div><label class="ctrl-label">Colunas (desktop)</label><div class="slider-wrap"><input type="range" name="cat_columnsDesktop" min="2" max="5" value="{{ $t['cat_columnsDesktop'] }}" oninput="this.nextElementSibling.textContent=this.value"><span class="slider-val">{{ $t['cat_columnsDesktop'] }}</span></div></div>
    <div><label class="ctrl-label">Colunas (mobile)</label><div class="slider-wrap"><input type="range" name="cat_columnsMobile" min="1" max="2" value="{{ $t['cat_columnsMobile'] }}" oninput="this.nextElementSibling.textContent=this.value"><span class="slider-val">{{ $t['cat_columnsMobile'] }}</span></div></div>
    <div><label class="ctrl-label">Produtos por página</label><div class="slider-wrap"><input type="range" name="cat_productsPerPage" min="8" max="48" step="4" value="{{ $t['cat_productsPerPage'] }}" oninput="this.nextElementSibling.textContent=this.value"><span class="slider-val">{{ $t['cat_productsPerPage'] }}</span></div></div>
    <div class="panel-section-title">Filtros</div>
    <div><label class="ctrl-label">Estilo dos filtros</label><select name="cat_filterStyle" class="ctrl-select">
        <option value="checkbox" {{ $t['cat_filterStyle']=='checkbox'?'selected':'' }}>Checkbox</option>
        <option value="chips" {{ $t['cat_filterStyle']=='chips'?'selected':'' }}>Chips</option>
        <option value="accordion" {{ $t['cat_filterStyle']=='accordion'?'selected':'' }}>Accordion</option>
    </select></div>
    <div class="toggle-row"><label>Mostrar contagem</label><input type="checkbox" name="cat_showFilterCount" value="1" {{ $t['cat_showFilterCount']?'checked':'' }} class="rounded"></div>
    <div class="panel-section-title">Ações na Listagem</div>
    <div class="toggle-row"><label>Botão comprar na listagem</label><input type="checkbox" name="cat_showAddToCartOnListing" value="1" {{ $t['cat_showAddToCartOnListing']?'checked':'' }} class="rounded"></div>
    <div class="panel-section-title">Paginação</div>
    <div><label class="ctrl-label">Tipo</label><div class="option-picker" data-option-group="cat_pagination"><input type="hidden" name="cat_pagination" value="{{ $t['cat_pagination'] }}">
        @foreach(['classic'=>'Clássica','infinite-scroll'=>'Infinita','load-more'=>'Carregar mais'] as $v=>$l)
        <button type="button" class="option-btn {{ $t['cat_pagination']==$v?'active':'' }}" data-value="{{ $v }}" onclick="selectOption('cat_pagination','{{ $v }}')">{{ $l }}</button>
        @endforeach
    </div></div>
    <div class="panel-section-title">Extras</div>
    <div class="toggle-row"><label>Banner de categoria</label><input type="checkbox" name="cat_showBanner" value="1" {{ $t['cat_showBanner']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Breadcrumb</label><input type="checkbox" name="cat_showBreadcrumb" value="1" {{ $t['cat_showBreadcrumb']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Contagem de produtos</label><input type="checkbox" name="cat_showProductCount" value="1" {{ $t['cat_showProductCount']?'checked':'' }} class="rounded"></div>
</div>
