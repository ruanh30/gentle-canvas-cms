import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, TextField, ImageField, ToggleRow, NumberSlider, OptionPicker, SelectField, ColorInput, SectionDivider, AdminLink } from '../EditorControls';
import { Layers, ImageIcon, Plus, Trash2 } from 'lucide-react';
import { mockCategories } from '@/data/mock';
import { ThemeHeroSlide } from '@/types/theme';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

function makeSlideId() {
  return 'slide-' + Math.random().toString(36).slice(2, 8);
}

const emptySlide: ThemeHeroSlide = {
  id: '',
  title: '',
  subtitle: '',
  description: '',
  ctaText: 'Ver coleção',
  ctaLink: '/products',
  ctaLinkType: 'url',
  ctaCategory: '',
  ctaStyle: 'filled',
  backgroundImage: '',
  backgroundVideo: '',
  overlayColor: '#000000',
  overlayOpacity: 0,
  contentAlign: 'left',
  textColor: '#1a1a1a',
  showText: true,
  showButton: true,
  contentOffsetX: 0,
  contentOffsetY: 0,
  buttonOffsetX: 0,
  buttonOffsetY: 0,
};

export function HeroPanel() {
  const { draft, updateDraftSection, setDraftDeep } = useTheme();
  const h = draft.hero;
  const set = (u: Partial<typeof h>) => updateDraftSection('hero', u);

  const slides = h.slides || [];
  const [activeIdx, setActiveIdx] = React.useState(0);
  const slide = slides[activeIdx] || slides[0];

  const setSlide = (u: Partial<ThemeHeroSlide>) => {
    const updated = slides.map((s, i) => i === activeIdx ? { ...s, ...u } : s);
    setDraftDeep('hero.slides', updated);
  };

  const addSlide = () => {
    const newSlide = { ...emptySlide, id: makeSlideId() };
    setDraftDeep('hero.slides', [...slides, newSlide]);
    setActiveIdx(slides.length);
  };

  const removeSlide = (idx: number) => {
    if (slides.length <= 1) return;
    const updated = slides.filter((_, i) => i !== idx);
    setDraftDeep('hero.slides', updated);
    setActiveIdx(Math.min(activeIdx, updated.length - 1));
  };

  return (
    <EditorSection icon={Layers} title="Hero / Banner" description="Configure o banner principal que aparece no topo da página inicial da loja">
      <ToggleRow label="Exibir hero" hint="Ativa ou desativa o banner principal da home" checked={h.enabled} onChange={v => set({ enabled: v })} />
      {h.enabled && (
        <>
          <SectionDivider label="Tamanho e Transição" />
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
            Define a altura do banner e o efeito de transição entre slides.
          </p>
          <OptionPicker label="Altura" value={h.height} onChange={v => set({ height: v })} options={[
            { value: '200', label: '200px', description: 'Extra compacto' },
            { value: '300', label: '300px', description: 'Compacto' },
            { value: '400', label: '400px', description: 'Médio' },
            { value: '500', label: '500px', description: 'Grande' },
            { value: 'fullscreen', label: 'Tela cheia', description: 'Ocupa toda a tela' },
          ]} />
          <SelectField label="Transição" value={h.transition} onChange={v => set({ transition: v })} options={[
            { value: 'fade', label: 'Fade — transição suave com opacidade' },
            { value: 'slide', label: 'Slide — desliza horizontalmente' },
            { value: 'zoom', label: 'Zoom — efeito de aproximação' },
          ]} />

          <SectionDivider label="Autoplay e Controles" />
          <ToggleRow label="Autoplay" hint="Avança automaticamente entre os slides" checked={h.autoplay} onChange={v => set({ autoplay: v })} />
          {h.autoplay && (
            <NumberSlider label="Velocidade do autoplay" value={h.autoplaySpeed} onChange={v => set({ autoplaySpeed: v })} min={2} max={10} suffix="s" />
          )}
          <ToggleRow label="Indicadores (dots)" hint="Exibe pontos de navegação abaixo do banner" checked={h.showDots} onChange={v => set({ showDots: v })} />
          <ToggleRow label="Setas de navegação" hint="Exibe setas laterais para avançar ou voltar" checked={h.showArrows} onChange={v => set({ showArrows: v })} />

          {/* ── Slide Tabs ── */}
          <SectionDivider label="Slides" />
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
            Adicione múltiplas imagens/slides ao banner. Clique para editar cada um.
          </p>
          <div className="flex items-center gap-1.5 flex-wrap">
            {slides.map((s, i) => (
              <div key={s.id || i} className="flex items-center">
                <button
                  onClick={() => setActiveIdx(i)}
                  className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all border ${
                    activeIdx === i
                      ? 'bg-foreground text-background border-foreground shadow-sm'
                      : 'bg-secondary/50 text-muted-foreground border-border/50 hover:bg-secondary'
                  }`}
                >
                  Slide {i + 1}
                </button>
                {slides.length > 1 && activeIdx === i && (
                  <button onClick={() => removeSlide(i)} className="ml-1 p-1 rounded hover:bg-destructive/10 text-destructive/60 hover:text-destructive transition-colors">
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addSlide} className="h-7 px-2 text-[11px] gap-1">
              <Plus className="h-3 w-3" /> Adicionar
            </Button>
          </div>

          {slide && (
            <>
              {/* ── Imagem de Fundo ── */}
              <SectionDivider label="Imagem de Fundo" />
              <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
                Imagem de fundo do slide. Use o overlay para melhorar a legibilidade.
              </p>
              <ImageField label="URL da imagem" value={slide.backgroundImage || ''} onChange={v => setSlide({ backgroundImage: v })} />
              {slide.backgroundImage && (
                <>
                  <ColorInput label="Cor do overlay" value={slide.overlayColor || '#000000'} onChange={v => setSlide({ overlayColor: v })} />
                  <NumberSlider label="Opacidade do overlay" value={slide.overlayOpacity ?? 0} onChange={v => setSlide({ overlayOpacity: v })} min={0} max={1} step={0.05} />
                </>
              )}

              {/* ── Visibilidade ── */}
              <SectionDivider label="Visibilidade" />
              <ToggleRow label="Exibir textos" hint="Mostra ou oculta subtítulo, título e descrição do slide" checked={slide.showText !== false} onChange={v => setSlide({ showText: v })} />
              <ToggleRow label="Exibir botão" hint="Mostra ou oculta o botão de ação (CTA) do slide" checked={slide.showButton !== false} onChange={v => setSlide({ showButton: v })} />

              {/* ── Conteúdo do Slide ── */}
              {slide.showText !== false && (
                <>
                  <SectionDivider label="Conteúdo do Slide" />
                  <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
                    Textos exibidos sobre o banner.
                  </p>
                  <TextField label="Subtítulo" value={slide.subtitle || ''} onChange={v => setSlide({ subtitle: v })} />
                  <TextField label="Título" value={slide.title || ''} onChange={v => setSlide({ title: v })} multiline />
                  <TextField label="Descrição" value={slide.description || ''} onChange={v => setSlide({ description: v })} multiline />
                </>
              )}

              {/* ── Alinhamento e Posição do Texto ── */}
              <SectionDivider label="Alinhamento e Posição" />
              <OptionPicker label="Alinhamento do conteúdo" value={slide.contentAlign || 'left'} onChange={v => setSlide({ contentAlign: v })} options={[
                { value: 'left', label: 'Esquerda', description: 'Texto alinhado à esquerda' },
                { value: 'center', label: 'Centro', description: 'Texto centralizado no banner' },
                { value: 'right', label: 'Direita', description: 'Texto alinhado à direita' },
              ]} />

              {slide.showText !== false && (
                <>
                  <p className="text-[10px] text-muted-foreground/60 leading-relaxed mt-1">
                    Ajuste fino da posição dos textos dentro do banner. Use os sliders para mover horizontal e verticalmente.
                  </p>
                  <NumberSlider
                    label="Posição horizontal do texto"
                    value={slide.contentOffsetX ?? 0}
                    onChange={v => setSlide({ contentOffsetX: v })}
                    min={-50} max={50} step={1} suffix="%"
                  />
                  <NumberSlider
                    label="Posição vertical do texto"
                    value={slide.contentOffsetY ?? 0}
                    onChange={v => setSlide({ contentOffsetY: v })}
                    min={-50} max={50} step={1} suffix="%"
                  />
                </>
              )}

              {/* ── Botão (CTA) ── */}
              {slide.showButton !== false && (
                <>
                  <SectionDivider label="Botão de Ação (CTA)" />
                  <TextField label="Texto do botão" value={slide.ctaText || ''} onChange={v => setSlide({ ctaText: v })} />

                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Destino do botão</Label>
                    <Select value={slide.ctaLinkType || 'url'} onValueChange={v => setSlide({ ctaLinkType: v as 'url' | 'category' })}>
                      <SelectTrigger className="h-9 text-sm bg-secondary/30 border-border/50"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="url">URL personalizada</SelectItem>
                        <SelectItem value="category">Abrir categoria</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(slide.ctaLinkType || 'url') === 'url' ? (
                    <TextField label="Link do botão" value={slide.ctaLink || ''} onChange={v => setSlide({ ctaLink: v })} placeholder="/products" />
                  ) : (
                    <div className="space-y-1.5">
                      <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Categoria</Label>
                      <Select value={slide.ctaCategory || ''} onValueChange={v => setSlide({ ctaCategory: v, ctaLink: `/products?category=${mockCategories.find(c => c.id === v)?.slug || ''}` })}>
                        <SelectTrigger className="h-9 text-sm bg-secondary/30 border-border/50"><SelectValue placeholder="Selecione uma categoria" /></SelectTrigger>
                        <SelectContent>
                          {mockCategories.map(cat => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <p className="text-[10px] text-muted-foreground/60 leading-relaxed mt-1">
                    Ajuste fino da posição do botão dentro do banner.
                  </p>
                  <NumberSlider
                    label="Posição horizontal do botão"
                    value={slide.buttonOffsetX ?? 0}
                    onChange={v => setSlide({ buttonOffsetX: v })}
                    min={-50} max={50} step={1} suffix="%"
                  />
                  <NumberSlider
                    label="Posição vertical do botão"
                    value={slide.buttonOffsetY ?? 0}
                    onChange={v => setSlide({ buttonOffsetY: v })}
                    min={-50} max={50} step={1} suffix="%"
                  />
                </>
              )}
            </>
          )}
        </>
      )}

      <SectionDivider label="Atalhos" />
      <AdminLink to="/admin/media" label="Abrir Biblioteca de Mídia" icon={ImageIcon} />
    </EditorSection>
  );
}
