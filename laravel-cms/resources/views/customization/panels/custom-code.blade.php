{{-- Custom Code Panel — mirrors CustomCodePanel.tsx --}}
<div class="space-y-4">
    <div class="flex items-center gap-2">
        <div class="p-1.5 rounded-md bg-gray-100"><svg class="h-3.5 w-3.5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
        <div><h3 class="text-sm font-semibold">Código Custom</h3><p class="text-[11px] text-gray-400">CSS e scripts personalizados (avançado)</p></div>
    </div>
    <div><label class="ctrl-label">CSS personalizado</label><textarea name="code_css" class="ctrl-textarea" rows="6" placeholder="/* Seu CSS aqui */">{{ $t['code_css'] }}</textarea><p class="text-[10px] text-gray-400">Adicionado ao final do &lt;head&gt;</p></div>
    <hr class="border-gray-200">
    <div><label class="ctrl-label">Scripts (head)</label><textarea name="code_headScripts" class="ctrl-textarea" rows="6" placeholder="<!-- Scripts aqui -->">{{ $t['code_headScripts'] }}</textarea><p class="text-[10px] text-gray-400">⚠️ Use com cuidado. Scripts maliciosos podem comprometer sua loja.</p></div>
</div>
