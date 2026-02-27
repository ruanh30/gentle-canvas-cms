{{-- WhatsApp Panel — mirrors WhatsAppPanel.tsx --}}
<div class="space-y-4">
    <div class="flex items-center gap-2">
        <div class="p-1.5 rounded-md bg-gray-100"><svg class="h-3.5 w-3.5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg></div>
        <div><h3 class="text-sm font-semibold">WhatsApp</h3><p class="text-[11px] text-gray-400">Botão flutuante de WhatsApp</p></div>
    </div>
    <div class="toggle-row"><label>Ativar botão</label><input type="checkbox" name="wa_enabled" value="1" {{ $t['wa_enabled']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Número (com DDD)</label><input type="text" name="wa_number" value="{{ $t['wa_number'] }}" class="ctrl-input" placeholder="5511999990000"></div>
    <div><label class="ctrl-label">Mensagem padrão</label><textarea name="wa_message" class="ctrl-textarea" rows="3">{{ $t['wa_message'] }}</textarea></div>
    <div><label class="ctrl-label">Posição</label><div class="option-picker" data-option-group="wa_position"><input type="hidden" name="wa_position" value="{{ $t['wa_position'] }}">
        <button type="button" class="option-btn {{ $t['wa_position']=='bottom-left'?'active':'' }}" data-value="bottom-left" onclick="selectOption('wa_position','bottom-left')">Inferior esq.</button>
        <button type="button" class="option-btn {{ $t['wa_position']=='bottom-right'?'active':'' }}" data-value="bottom-right" onclick="selectOption('wa_position','bottom-right')">Inferior dir.</button>
    </div></div>
    <div><label class="ctrl-label">Cor de fundo</label><div class="color-input-wrap"><input type="color" name="wa_backgroundColor" value="{{ $t['wa_backgroundColor'] }}" class="color-swatch"><input type="text" value="{{ $t['wa_backgroundColor'] }}" class="color-hex"></div></div>
    <div class="toggle-row"><label>Mostrar texto</label><input type="checkbox" name="wa_showLabel" value="1" {{ $t['wa_showLabel']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Texto</label><input type="text" name="wa_label" value="{{ $t['wa_label'] }}" class="ctrl-input"></div>
    <div><label class="ctrl-label">Delay de exibição</label><div class="slider-wrap"><input type="range" name="wa_delay" min="0" max="30" value="{{ $t['wa_delay'] }}" oninput="this.nextElementSibling.textContent=this.value+'s'"><span class="slider-val">{{ $t['wa_delay'] }}s</span></div></div>
</div>
