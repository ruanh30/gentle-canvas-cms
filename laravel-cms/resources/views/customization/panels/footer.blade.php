{{-- Footer Panel — mirrors FooterPanel.tsx --}}
<div class="space-y-4">
    <div class="flex items-center gap-2">
        <div class="p-1.5 rounded-md bg-gray-100"><svg class="h-3.5 w-3.5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 15h18"/></svg></div>
        <div><h3 class="text-sm font-semibold">Rodapé</h3><p class="text-[11px] text-gray-400">Colunas, links, newsletter e redes sociais</p></div>
    </div>
    <div><label class="ctrl-label">Layout</label><select name="footer_layout" class="ctrl-select">
        <option value="4-columns" {{ $t['footer_layout']=='4-columns'?'selected':'' }}>4 Colunas</option>
        <option value="3-columns" {{ $t['footer_layout']=='3-columns'?'selected':'' }}>3 Colunas</option>
        <option value="2-columns" {{ $t['footer_layout']=='2-columns'?'selected':'' }}>2 Colunas</option>
        <option value="simple" {{ $t['footer_layout']=='simple'?'selected':'' }}>Simples</option>
        <option value="centered" {{ $t['footer_layout']=='centered'?'selected':'' }}>Centralizado</option>
    </select></div>
    <div class="grid grid-cols-2 gap-3">
        <div><label class="ctrl-label">Fundo</label><div class="color-input-wrap"><input type="color" name="footer_backgroundColor" value="{{ $t['footer_backgroundColor'] }}" class="color-swatch"><input type="text" value="{{ $t['footer_backgroundColor'] }}" class="color-hex"></div></div>
        <div><label class="ctrl-label">Texto</label><div class="color-input-wrap"><input type="color" name="footer_textColor" value="{{ $t['footer_textColor'] }}" class="color-swatch"><input type="text" value="{{ $t['footer_textColor'] }}" class="color-hex"></div></div>
    </div>
    <div class="panel-section-title">Newsletter</div>
    <div class="toggle-row"><label>Newsletter</label><input type="checkbox" name="footer_showNewsletter" value="1" {{ $t['footer_showNewsletter']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Título</label><input type="text" name="footer_newsletterTitle" value="{{ $t['footer_newsletterTitle'] }}" class="ctrl-input"></div>
    <div><label class="ctrl-label">Descrição</label><input type="text" name="footer_newsletterDescription" value="{{ $t['footer_newsletterDescription'] }}" class="ctrl-input"></div>
    <div class="panel-section-title">Extras</div>
    <div class="toggle-row"><label>Redes sociais</label><input type="checkbox" name="footer_showSocial" value="1" {{ $t['footer_showSocial']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Ícones de pagamento</label><input type="checkbox" name="footer_showPaymentIcons" value="1" {{ $t['footer_showPaymentIcons']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Selos de confiança</label><input type="checkbox" name="footer_showTrustSeals" value="1" {{ $t['footer_showTrustSeals']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Voltar ao topo</label><input type="checkbox" name="footer_showBackToTop" value="1" {{ $t['footer_showBackToTop']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Copyright</label><input type="text" name="footer_copyrightText" value="{{ $t['footer_copyrightText'] }}" class="ctrl-input"></div>
</div>
