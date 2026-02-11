import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, TextField, ToggleRow, NumberSlider, OptionPicker, SelectField, ColorInput, SectionDivider } from '../EditorControls';
import { Layers } from 'lucide-react';

export function HeroPanel() {
  const { draft, updateDraftSection, setDraftDeep } = useTheme();
  const h = draft.hero;
  const set = (u: Partial<typeof h>) => updateDraftSection('hero', u);
  const slide = h.slides[0];
  const setSlide = (u: Partial<typeof slide>) => {
    setDraftDeep('hero.slides', [{ ...slide, ...u }]);
  };

  return (
    <EditorSection icon={Layers} title="Hero / Banner" description="Banner principal da home">
      <ToggleRow label="Exibir hero" checked={h.enabled} onChange={v => set({ enabled: v })} />
      {h.enabled && (
        <>
          <OptionPicker label="Altura" value={h.height} onChange={v => set({ height: v })} options={[
            { value: 'small', label: 'Pequeno' }, { value: 'medium', label: 'Médio' },
            { value: 'large', label: 'Grande' }, { value: 'fullscreen', label: 'Tela cheia' },
          ]} />
          <SelectField label="Transição" value={h.transition} onChange={v => set({ transition: v })} options={[
            { value: 'fade', label: 'Fade' }, { value: 'slide', label: 'Slide' }, { value: 'zoom', label: 'Zoom' },
          ]} />
          <ToggleRow label="Autoplay" checked={h.autoplay} onChange={v => set({ autoplay: v })} />
          {h.autoplay && (
            <NumberSlider label="Velocidade" value={h.autoplaySpeed} onChange={v => set({ autoplaySpeed: v })} min={2} max={10} suffix="s" />
          )}
          <ToggleRow label="Dots" checked={h.showDots} onChange={v => set({ showDots: v })} />
          <ToggleRow label="Setas" checked={h.showArrows} onChange={v => set({ showArrows: v })} />

          <SectionDivider label="Conteúdo do Slide" />
          <TextField label="Subtítulo" value={slide?.subtitle || ''} onChange={v => setSlide({ subtitle: v })} />
          <TextField label="Título" value={slide?.title || ''} onChange={v => setSlide({ title: v })} multiline />
          <TextField label="Descrição" value={slide?.description || ''} onChange={v => setSlide({ description: v })} multiline />
          <TextField label="Texto do botão" value={slide?.ctaText || ''} onChange={v => setSlide({ ctaText: v })} />
          <TextField label="Link do botão" value={slide?.ctaLink || ''} onChange={v => setSlide({ ctaLink: v })} />
          <OptionPicker label="Alinhamento" value={slide?.contentAlign || 'left'} onChange={v => setSlide({ contentAlign: v })} options={[
            { value: 'left', label: 'Esquerda' }, { value: 'center', label: 'Centro' }, { value: 'right', label: 'Direita' },
          ]} />

          <SectionDivider label="Imagem" />
          <TextField label="URL da imagem" value={slide?.backgroundImage || ''} onChange={v => setSlide({ backgroundImage: v })} placeholder="https://..." />
          {slide?.backgroundImage && (
            <>
              <ColorInput label="Cor do overlay" value={slide.overlayColor} onChange={v => setSlide({ overlayColor: v })} />
              <NumberSlider label="Opacidade overlay" value={slide.overlayOpacity} onChange={v => setSlide({ overlayOpacity: v })} min={0} max={1} step={0.05} />
            </>
          )}
        </>
      )}
    </EditorSection>
  );
}
