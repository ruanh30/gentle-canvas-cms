{{-- Typography Panel — mirrors TypographyPanel.tsx --}}
<div class="space-y-4">
    <div class="flex items-center gap-2">
        <div class="p-1.5 rounded-md bg-gray-100"><svg class="h-3.5 w-3.5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg></div>
        <div><h3 class="text-sm font-semibold">Tipografia</h3><p class="text-[11px] text-gray-400">Fontes, tamanhos e espaçamentos</p></div>
    </div>
    <div><label class="ctrl-label">Fonte dos títulos</label>
        <select name="typo_headingFont" class="ctrl-select">
            @foreach(['Playfair Display','Poppins','Montserrat','Lora','Merriweather','Raleway','Oswald','Cormorant Garamond','DM Serif Display','Libre Baskerville','Bebas Neue','Archivo Black','Quicksand','Josefin Sans','Cinzel','Abril Fatface','Righteous','Alfa Slab One','Bitter','Crimson Text'] as $f)
            <option value="{{ $f }}" {{ $t['typo_headingFont'] == $f ? 'selected' : '' }}>{{ $f }}</option>
            @endforeach
        </select>
    </div>
    <div><label class="ctrl-label">Fonte do corpo</label>
        <select name="typo_bodyFont" class="ctrl-select">
            @foreach(['Inter','Roboto','Open Sans','Lato','Nunito','Work Sans','DM Sans','Source Sans 3','Rubik','Manrope','Poppins','Outfit','Plus Jakarta Sans','Mulish','Karla','Figtree','Albert Sans','Lexend','Urbanist','Sora'] as $f)
            <option value="{{ $f }}" {{ $t['typo_bodyFont'] == $f ? 'selected' : '' }}>{{ $f }}</option>
            @endforeach
        </select>
    </div>
    <div class="panel-section-title">Ajustes</div>
    <div><label class="ctrl-label">Tamanho base</label><div class="slider-wrap"><input type="range" name="typo_baseFontSize" min="12" max="20" value="{{ $t['typo_baseFontSize'] }}" oninput="this.nextElementSibling.textContent=this.value+'px'"><span class="slider-val">{{ $t['typo_baseFontSize'] }}px</span></div></div>
    <div><label class="ctrl-label">Peso dos títulos</label><div class="slider-wrap"><input type="range" name="typo_headingWeight" min="300" max="900" step="100" value="{{ $t['typo_headingWeight'] }}" oninput="this.nextElementSibling.textContent=this.value"><span class="slider-val">{{ $t['typo_headingWeight'] }}</span></div></div>
    <div><label class="ctrl-label">Peso do corpo</label><div class="slider-wrap"><input type="range" name="typo_bodyWeight" min="300" max="700" step="100" value="{{ $t['typo_bodyWeight'] }}" oninput="this.nextElementSibling.textContent=this.value"><span class="slider-val">{{ $t['typo_bodyWeight'] }}</span></div></div>
    <div><label class="ctrl-label">Altura da linha</label><div class="slider-wrap"><input type="range" name="typo_lineHeight" min="1" max="2" step="0.05" value="{{ $t['typo_lineHeight'] }}" oninput="this.nextElementSibling.textContent=this.value"><span class="slider-val">{{ $t['typo_lineHeight'] }}</span></div></div>
    <div><label class="ctrl-label">Espaço entre letras</label><div class="slider-wrap"><input type="range" name="typo_letterSpacing" min="-0.05" max="0.2" step="0.01" value="{{ $t['typo_letterSpacing'] }}" oninput="this.nextElementSibling.textContent=this.value+'em'"><span class="slider-val">{{ $t['typo_letterSpacing'] }}em</span></div></div>
    <div class="panel-section-title">Preview</div>
    <div class="p-3 bg-gray-100 rounded-lg space-y-2">
        <p class="text-xl font-bold">Título de exemplo</p>
        <p class="text-sm text-gray-600">Este é um texto de corpo para visualizar como fica a tipografia selecionada.</p>
    </div>
</div>
