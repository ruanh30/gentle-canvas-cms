{{-- SEO Panel — mirrors SEOPanel.tsx --}}
<div class="space-y-4">
    <div class="flex items-center gap-2">
        <div class="p-1.5 rounded-md bg-gray-100"><svg class="h-3.5 w-3.5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg></div>
        <div><h3 class="text-sm font-semibold">SEO</h3><p class="text-[11px] text-gray-400">Otimização para mecanismos de busca</p></div>
    </div>
    <div><label class="ctrl-label">Template do título</label><input type="text" name="seo_titleTemplate" value="{{ $t['seo_titleTemplate'] }}" class="ctrl-input" placeholder="{page} | {storeName}"></div>
    <p class="text-[10px] text-gray-400">Use {page} e {storeName} como variáveis</p>
    <div><label class="ctrl-label">Descrição padrão</label><textarea name="seo_defaultDescription" class="ctrl-textarea" rows="3">{{ $t['seo_defaultDescription'] }}</textarea></div>
    <div><label class="ctrl-label">OG Image URL</label><input type="text" name="seo_ogImage" value="{{ $t['seo_ogImage'] }}" class="ctrl-input" placeholder="https://..."></div>
    <div class="toggle-row"><label>Breadcrumbs</label><input type="checkbox" name="seo_showBreadcrumbs" value="1" {{ $t['seo_showBreadcrumbs']?'checked':'' }} class="rounded"></div>
</div>
