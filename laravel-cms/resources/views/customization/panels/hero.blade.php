{{-- Hero Panel — mirrors HeroPanel.tsx --}}
<div class="space-y-4">
    <div class="flex items-center gap-2">
        <div class="p-1.5 rounded-md bg-gray-100"><svg class="h-3.5 w-3.5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>
        <div><h3 class="text-sm font-semibold">Hero / Banner</h3><p class="text-[11px] text-gray-400">Banner principal da home</p></div>
    </div>
    <div class="toggle-row"><label>Exibir hero</label><input type="checkbox" name="hero_enabled" value="1" {{ $t['hero_enabled']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Altura</label><div class="option-picker" data-option-group="hero_height"><input type="hidden" name="hero_height" value="{{ $t['hero_height'] }}">
        @foreach(['small'=>'Pequeno','medium'=>'Médio','large'=>'Grande','fullscreen'=>'Tela cheia'] as $v=>$l)
        <button type="button" class="option-btn {{ $t['hero_height']==$v?'active':'' }}" data-value="{{ $v }}" onclick="selectOption('hero_height','{{ $v }}')">{{ $l }}</button>
        @endforeach
    </div></div>
    <div><label class="ctrl-label">Transição</label><select name="hero_transition" class="ctrl-select">
        <option value="fade" {{ $t['hero_transition']=='fade'?'selected':'' }}>Fade</option>
        <option value="slide" {{ $t['hero_transition']=='slide'?'selected':'' }}>Slide</option>
        <option value="zoom" {{ $t['hero_transition']=='zoom'?'selected':'' }}>Zoom</option>
    </select></div>
    <div class="toggle-row"><label>Autoplay</label><input type="checkbox" name="hero_autoplay" value="1" {{ $t['hero_autoplay']?'checked':'' }} class="rounded"></div>
    <div><label class="ctrl-label">Velocidade</label><div class="slider-wrap"><input type="range" name="hero_autoplaySpeed" min="2" max="10" value="{{ $t['hero_autoplaySpeed'] }}" oninput="this.nextElementSibling.textContent=this.value+'s'"><span class="slider-val">{{ $t['hero_autoplaySpeed'] }}s</span></div></div>
    <div class="toggle-row"><label>Dots</label><input type="checkbox" name="hero_showDots" value="1" {{ $t['hero_showDots']?'checked':'' }} class="rounded"></div>
    <div class="toggle-row"><label>Setas</label><input type="checkbox" name="hero_showArrows" value="1" {{ $t['hero_showArrows']?'checked':'' }} class="rounded"></div>
    <div class="panel-section-title">Conteúdo do Slide</div>
    <div><label class="ctrl-label">Subtítulo</label><input type="text" name="hero_subtitle" value="{{ $t['hero_subtitle'] }}" class="ctrl-input"></div>
    <div><label class="ctrl-label">Título</label><textarea name="hero_title" class="ctrl-textarea" rows="2">{{ $t['hero_title'] }}</textarea></div>
    <div><label class="ctrl-label">Descrição</label><textarea name="hero_description" class="ctrl-textarea" rows="2">{{ $t['hero_description'] }}</textarea></div>
    <div><label class="ctrl-label">Texto do botão</label><input type="text" name="hero_ctaText" value="{{ $t['hero_ctaText'] }}" class="ctrl-input"></div>
    <div><label class="ctrl-label">Link do botão</label><input type="text" name="hero_ctaLink" value="{{ $t['hero_ctaLink'] }}" class="ctrl-input"></div>
    <div><label class="ctrl-label">Alinhamento</label><div class="option-picker" data-option-group="hero_contentAlign"><input type="hidden" name="hero_contentAlign" value="{{ $t['hero_contentAlign'] }}">
        @foreach(['left'=>'Esquerda','center'=>'Centro','right'=>'Direita'] as $v=>$l)
        <button type="button" class="option-btn {{ $t['hero_contentAlign']==$v?'active':'' }}" data-value="{{ $v }}" onclick="selectOption('hero_contentAlign','{{ $v }}')">{{ $l }}</button>
        @endforeach
    </div></div>
    <div class="panel-section-title">Imagem</div>
    <div><label class="ctrl-label">URL da imagem</label><input type="text" name="hero_backgroundImage" value="{{ $t['hero_backgroundImage'] }}" class="ctrl-input" placeholder="https://..."></div>
    <div><label class="ctrl-label">Cor do overlay</label><div class="color-input-wrap"><input type="color" name="hero_overlayColor" value="{{ $t['hero_overlayColor'] }}" class="color-swatch"><input type="text" value="{{ $t['hero_overlayColor'] }}" class="color-hex"></div></div>
    <div><label class="ctrl-label">Opacidade overlay</label><div class="slider-wrap"><input type="range" name="hero_overlayOpacity" min="0" max="1" step="0.05" value="{{ $t['hero_overlayOpacity'] }}" oninput="this.nextElementSibling.textContent=this.value"><span class="slider-val">{{ $t['hero_overlayOpacity'] }}</span></div></div>
</div>
