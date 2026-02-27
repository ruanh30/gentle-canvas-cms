{{-- Home Sections Panel — mirrors HomeSectionsPanel.tsx --}}
<div class="space-y-4">
    <div class="flex items-center gap-2">
        <div class="p-1.5 rounded-md bg-gray-100"><svg class="h-3.5 w-3.5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></div>
        <div><h3 class="text-sm font-semibold">Seções da Home</h3><p class="text-[11px] text-gray-400">Ative ou desative blocos da página inicial</p></div>
    </div>

    <div class="space-y-2">
        @foreach(($homeSections ?? []) as $section)
            @php
                $label = $section['title'] ?? ucfirst(str_replace('-', ' ', $section['type'] ?? 'Seção'));
                $sectionId = $section['id'] ?? '';
                $enabled = (bool) ($section['enabled'] ?? false);
            @endphp
            @if($sectionId)
                <div class="toggle-row border border-gray-200 rounded-lg px-3 py-2">
                    <div>
                        <label class="text-sm font-medium text-gray-900">{{ $label }}</label>
                        <p class="hint">Tipo: {{ $section['type'] ?? 'custom' }}</p>
                    </div>
                    <input
                        type="checkbox"
                        name="section_toggle[{{ $sectionId }}]"
                        value="1"
                        {{ $enabled ? 'checked' : '' }}
                        class="rounded"
                    >
                </div>
            @endif
        @endforeach
    </div>

    <p class="text-[11px] text-gray-400">A ordem permanece a mesma do tema base. Este painel controla visibilidade.</p>
</div>
