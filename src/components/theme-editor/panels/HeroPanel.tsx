import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, TextField, ImageField, ToggleRow, NumberSlider, OptionPicker, SelectField, ColorInput, SectionDivider, AdminLink } from '../EditorControls';
import { Layers, ImageIcon } from 'lucide-react';

export function HeroPanel() {
  const { draft, updateDraftSection, setDraftDeep } = useTheme();
  const h = draft.hero;
  const set = (u: Partial<typeof h>) => updateDraftSection('hero', u);
  const slide = h.slides[0];
  const setSlide = (u: Partial<typeof slide>) => {
    setDraftDeep('hero.slides', [{ ...slide, ...u }]);
  };

  return (
    <EditorSection icon={Layers} title="Hero / Banner" description="Configure o banner principal que aparece no topo da página inicial da loja">
      <ToggleRow label="Exibir hero" hint="Ativa ou desativa o banner principal da home. Quando desativado, a página inicia direto no conteúdo" checked={h.enabled} onChange={v => set({ enabled: v })} />
      {h.enabled && (
        <>
          <SectionDivider label="Tamanho e Transição" />
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
            Define a altura do banner e o efeito de transição entre slides (quando houver mais de um).
          </p>
          <OptionPicker label="Altura" value={h.height} onChange={v => set({ height: v })} options={[
            { value: 'small', label: 'Pequeno', description: 'Banner compacto (~300px)' },
            { value: 'medium', label: 'Médio', description: 'Tamanho padrão (~450px)' },
            { value: 'large', label: 'Grande', description: 'Banner alto (~600px)' },
            { value: 'fullscreen', label: 'Tela cheia', description: 'Ocupa toda a tela do navegador' },
          ]} />
          <SelectField label="Transição" value={h.transition} onChange={v => set({ transition: v })} options={[
            { value: 'fade', label: 'Fade — transição suave com opacidade' },
            { value: 'slide', label: 'Slide — desliza horizontalmente' },
            { value: 'zoom', label: 'Zoom — efeito de aproximação' },
          ]} />

          <SectionDivider label="Autoplay e Controles" />
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
            Controles de navegação e reprodução automática do carrossel de slides.
          </p>
          <ToggleRow label="Autoplay" hint="Avança automaticamente entre os slides do hero em intervalos regulares" checked={h.autoplay} onChange={v => set({ autoplay: v })} />
          {h.autoplay && (
            <NumberSlider label="Velocidade do autoplay" value={h.autoplaySpeed} onChange={v => set({ autoplaySpeed: v })} min={2} max={10} suffix="s" />
          )}
          <ToggleRow label="Indicadores (dots)" hint="Exibe pontos de navegação abaixo do banner para indicar o slide atual" checked={h.showDots} onChange={v => set({ showDots: v })} />
          <ToggleRow label="Setas de navegação" hint="Exibe setas laterais para avançar ou voltar entre slides" checked={h.showArrows} onChange={v => set({ showArrows: v })} />

          <SectionDivider label="Conteúdo do Slide" />
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
            Textos, botão e alinhamento do conteúdo exibido no banner principal.
          </p>
          <TextField label="Subtítulo" value={slide?.subtitle || ''} onChange={v => setSlide({ subtitle: v })} />
          <TextField label="Título" value={slide?.title || ''} onChange={v => setSlide({ title: v })} multiline />
          <TextField label="Descrição" value={slide?.description || ''} onChange={v => setSlide({ description: v })} multiline />
          <TextField label="Texto do botão" value={slide?.ctaText || ''} onChange={v => setSlide({ ctaText: v })} />
          <TextField label="Link do botão" value={slide?.ctaLink || ''} onChange={v => setSlide({ ctaLink: v })} />
          <OptionPicker label="Alinhamento do conteúdo" value={slide?.contentAlign || 'left'} onChange={v => setSlide({ contentAlign: v })} options={[
            { value: 'left', label: 'Esquerda', description: 'Texto alinhado à esquerda' },
            { value: 'center', label: 'Centro', description: 'Texto centralizado no banner' },
            { value: 'right', label: 'Direita', description: 'Texto alinhado à direita' },
          ]} />

          <SectionDivider label="Imagem de Fundo" />
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
            Imagem de fundo do slide. Use o overlay para escurecer e melhorar a legibilidade do texto.
          </p>
          <ImageField label="URL da imagem" value={slide?.backgroundImage || ''} onChange={v => setSlide({ backgroundImage: v })} />
          {slide?.backgroundImage && (
            <>
              <ColorInput label="Cor do overlay" value={slide.overlayColor} onChange={v => setSlide({ overlayColor: v })} />
              <NumberSlider label="Opacidade do overlay" value={slide.overlayOpacity} onChange={v => setSlide({ overlayOpacity: v })} min={0} max={1} step={0.05} />
            </>
          )}
        </>
      )}
      
      <SectionDivider label="Atalhos" />
      <AdminLink to="/admin/media" label="Abrir Biblioteca de Mídia" icon={ImageIcon} />
    </EditorSection>
  );
}
