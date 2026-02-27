{{-- Checkout Panel — mirrors CheckoutPanel.tsx --}}
<div class="space-y-4">
    <div class="flex items-center gap-2">
        <div class="p-1.5 rounded-md bg-gray-100"><svg class="h-3.5 w-3.5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg></div>
        <div><h3 class="text-sm font-semibold">Checkout</h3><p class="text-[11px] text-gray-400">Configurações da página de finalização</p></div>
    </div>
    <div><label class="ctrl-label">Layout</label><div class="option-picker" data-option-group="checkout_layout"><input type="hidden" name="checkout_layout" value="{{ $t['checkout_layout'] }}">
        <button type="button" class="option-btn {{ $t['checkout_layout']=='one-column'?'active':'' }}" data-value="one-column" onclick="selectOption('checkout_layout','one-column')">1 Coluna</button>
        <button type="button" class="option-btn {{ $t['checkout_layout']=='two-columns'?'active':'' }}" data-value="two-columns" onclick="selectOption('checkout_layout','two-columns')">2 Colunas</button>
    </div></div>
    <div><label class="ctrl-label">Estilo dos passos</label><select name="checkout_stepsStyle" class="ctrl-select">
        <option value="numbered" {{ $t['checkout_stepsStyle']=='numbered'?'selected':'' }}>Numerados</option>
        <option value="progress-bar" {{ $t['checkout_stepsStyle']=='progress-bar'?'selected':'' }}>Barra de progresso</option>
        <option value="tabs" {{ $t['checkout_stepsStyle']=='tabs'?'selected':'' }}>Abas</option>
    </select></div>
    <div class="panel-section-title">Funcionalidades</div>
    <div class="toggle-row"><label>Resumo do pedido</label><input type="checkbox" name="checkout_showOrderSummary" value="1" {{ $t['checkout_showOrderSummary']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Campo de cupom</label><input type="checkbox" name="checkout_showCouponField" value="1" {{ $t['checkout_showCouponField']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Selos de confiança</label><input type="checkbox" name="checkout_showTrustBadges" value="1" {{ $t['checkout_showTrustBadges']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Aceitar termos</label><input type="checkbox" name="checkout_termsRequired" value="1" {{ $t['checkout_termsRequired']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Texto dos termos</label><input type="text" name="checkout_termsText" value="{{ $t['checkout_termsText'] }}" class="ctrl-input"></div>
    <div class="panel-section-title">Sucesso</div>
    <div><label class="ctrl-label">Título</label><input type="text" name="checkout_successTitle" value="{{ $t['checkout_successTitle'] }}" class="ctrl-input"></div>
    <div><label class="ctrl-label">Mensagem</label><textarea name="checkout_successMessage" class="ctrl-textarea" rows="3">{{ $t['checkout_successMessage'] }}</textarea></div>
    <div class="toggle-row"><label>Confetti 🎉</label><input type="checkbox" name="checkout_showConfetti" value="1" {{ $t['checkout_showConfetti']?'checked':'' }} class="rounded"></div>
</div>
