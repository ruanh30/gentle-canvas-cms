{{-- Product Page Panel — mirrors ProductPagePanel.tsx --}}
<div class="space-y-4">
    <div class="flex items-center gap-2">
        <div class="p-1.5 rounded-md bg-gray-100"><svg class="h-3.5 w-3.5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18"/><path d="M16 10a4 4 0 01-8 0"/></svg></div>
        <div><h3 class="text-sm font-semibold">Página de Produto</h3><p class="text-[11px] text-gray-400">Layout e funcionalidades da PDP</p></div>
    </div>
    <div class="panel-section-title">Galeria</div>
    <div><label class="ctrl-label">Layout da galeria</label><select name="pdp_galleryLayout" class="ctrl-select">
        <option value="side-by-side" {{ $t['pdp_galleryLayout']=='side-by-side'?'selected':'' }}>Lado a lado</option>
        <option value="slider" {{ $t['pdp_galleryLayout']=='slider'?'selected':'' }}>Slider</option>
        <option value="grid" {{ $t['pdp_galleryLayout']=='grid'?'selected':'' }}>Grade</option>
        <option value="vertical-thumbs" {{ $t['pdp_galleryLayout']=='vertical-thumbs'?'selected':'' }}>Thumbs verticais</option>
    </select></div>
    <div><label class="ctrl-label">Posição</label><div class="option-picker" data-option-group="pdp_galleryPosition"><input type="hidden" name="pdp_galleryPosition" value="{{ $t['pdp_galleryPosition'] }}">
        <button type="button" class="option-btn {{ $t['pdp_galleryPosition']=='left'?'active':'' }}" data-value="left" onclick="selectOption('pdp_galleryPosition','left')">Esquerda</button>
        <button type="button" class="option-btn {{ $t['pdp_galleryPosition']=='right'?'active':'' }}" data-value="right" onclick="selectOption('pdp_galleryPosition','right')">Direita</button>
    </div></div>
    <div class="toggle-row"><label>Zoom na imagem</label><input type="checkbox" name="pdp_imageZoom" value="1" {{ $t['pdp_imageZoom']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Galeria fixa (sticky)</label><input type="checkbox" name="pdp_stickyGallery" value="1" {{ $t['pdp_stickyGallery']?'checked':'' }} class="rounded"></div>
    <div class="panel-section-title">Informações</div>
    <div class="toggle-row"><label>Breadcrumb</label><input type="checkbox" name="pdp_showBreadcrumb" value="1" {{ $t['pdp_showBreadcrumb']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>SKU</label><input type="checkbox" name="pdp_showSKU" value="1" {{ $t['pdp_showSKU']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Marca</label><input type="checkbox" name="pdp_showBrand" value="1" {{ $t['pdp_showBrand']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Avaliação</label><input type="checkbox" name="pdp_showRating" value="1" {{ $t['pdp_showRating']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Estoque</label><input type="checkbox" name="pdp_showStock" value="1" {{ $t['pdp_showStock']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Compartilhar</label><input type="checkbox" name="pdp_showShareButtons" value="1" {{ $t['pdp_showShareButtons']?'checked':'' }} class="rounded"></div>
    <div class="panel-section-title">Variações</div>
    <div><label class="ctrl-label">Estilo</label><select name="pdp_variantStyle" class="ctrl-select">
        <option value="dropdown" {{ $t['pdp_variantStyle']=='dropdown'?'selected':'' }}>Dropdown</option>
        <option value="buttons" {{ $t['pdp_variantStyle']=='buttons'?'selected':'' }}>Botões</option>
        <option value="swatches" {{ $t['pdp_variantStyle']=='swatches'?'selected':'' }}>Swatches</option>
    </select></div>
    <div><label class="ctrl-label">Quantidade</label><select name="pdp_quantityStyle" class="ctrl-select">
        <option value="input" {{ $t['pdp_quantityStyle']=='input'?'selected':'' }}>Campo numérico</option>
        <option value="stepper" {{ $t['pdp_quantityStyle']=='stepper'?'selected':'' }}>Stepper (+/-)</option>
    </select></div>
    <div class="panel-section-title">CTA</div>
    <div><label class="ctrl-label">Layout do CTA</label><div class="option-picker" data-option-group="pdp_ctaLayout"><input type="hidden" name="pdp_ctaLayout" value="{{ $t['pdp_ctaLayout'] }}">
        <button type="button" class="option-btn {{ $t['pdp_ctaLayout']=='stacked'?'active':'' }}" data-value="stacked" onclick="selectOption('pdp_ctaLayout','stacked')">Empilhado</button>
        <button type="button" class="option-btn {{ $t['pdp_ctaLayout']=='side-by-side'?'active':'' }}" data-value="side-by-side" onclick="selectOption('pdp_ctaLayout','side-by-side')">Lado a lado</button>
    </div></div>
    <div class="toggle-row"><label>CTA sticky no mobile</label><input type="checkbox" name="pdp_ctaStickyMobile" value="1" {{ $t['pdp_ctaStickyMobile']?'checked':'' }} class="rounded"></div>
    <div class="panel-section-title">Confiança</div>
    <div class="toggle-row"><label>Selos de confiança</label><input type="checkbox" name="pdp_showTrustBadges" value="1" {{ $t['pdp_showTrustBadges']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Guia de tamanhos</label><input type="checkbox" name="pdp_sizeGuideEnabled" value="1" {{ $t['pdp_sizeGuideEnabled']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Estimativa de frete</label><input type="checkbox" name="pdp_shippingEstimate" value="1" {{ $t['pdp_shippingEstimate']?'checked':'' }} class="rounded"></div>
    <div class="panel-section-title">Conteúdo</div>
    <div><label class="ctrl-label">Estilo das abas</label><select name="pdp_tabsStyle" class="ctrl-select">
        <option value="tabs" {{ $t['pdp_tabsStyle']=='tabs'?'selected':'' }}>Abas</option>
        <option value="accordion" {{ $t['pdp_tabsStyle']=='accordion'?'selected':'' }}>Accordion</option>
        <option value="inline" {{ $t['pdp_tabsStyle']=='inline'?'selected':'' }}>Inline</option>
    </select></div>
    <div class="toggle-row"><label>Produtos relacionados</label><input type="checkbox" name="pdp_showRelated" value="1" {{ $t['pdp_showRelated']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Título</label><input type="text" name="pdp_relatedTitle" value="{{ $t['pdp_relatedTitle'] }}" class="ctrl-input"></div>
    <div class="toggle-row"><label>Vistos recentemente</label><input type="checkbox" name="pdp_showRecentlyViewed" value="1" {{ $t['pdp_showRecentlyViewed']?'checked':'' }} class="rounded"></div>
</div>
