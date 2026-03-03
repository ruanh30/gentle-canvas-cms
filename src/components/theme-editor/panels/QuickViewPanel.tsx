import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, SelectField, TextField, OptionPicker, SectionDivider, NumberSlider } from '../EditorControls';
import { Eye, Layout, Image, Layers, MousePointer, Palette, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = 'modelo' | 'estrutura' | 'galeria' | 'variacoes' | 'ctas' | 'aparencia' | 'animacao';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'modelo', label: 'Modelo', icon: Layout },
  { id: 'estrutura', label: 'Estrutura', icon: Layers },
  { id: 'galeria', label: 'Galeria', icon: Image },
  { id: 'variacoes', label: 'Variações', icon: Layers },
  { id: 'ctas', label: 'CTAs', icon: MousePointer },
  { id: 'aparencia', label: 'Aparência', icon: Palette },
  { id: 'animacao', label: 'Animação', icon: Sparkles },
];

export function QuickViewPanel() {
  const { draft, updateDraftSection } = useTheme();
  const qv = draft.quickView;
  const set = (u: Partial<typeof qv>) => updateDraftSection('quickView', u);
  const [activeTab, setActiveTab] = useState<Tab>('modelo');

  return (
    <EditorSection icon={Eye} title="Quick View (Produto)" description="Configure o mini-PDP que abre ao clicar no produto sem sair da página">

      <ToggleRow
        label="Ativar Quick View"
        hint="Quando ativado, o clique no produto abre um painel com detalhes, variações e compra"
        checked={qv.enabled}
        onChange={v => set({ enabled: v })}
      />

      {qv.enabled && (
        <>
          {/* Tab navigation */}
          <div className="flex flex-wrap gap-1 mt-2 mb-3">
            {tabs.map(t => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={cn(
                    'px-2.5 py-1.5 text-[11px] font-medium rounded-md transition-colors inline-flex items-center gap-1',
                    activeTab === t.id
                      ? 'bg-foreground text-background'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted',
                  )}
                >
                  <Icon className="h-3 w-3" />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Tab 1 — Modelo */}
          {activeTab === 'modelo' && (
            <>
              <OptionPicker label="Tipo de Quick View" value={qv.model || 'drawer-right'} onChange={v => set({ model: v as any })} options={[
                { value: 'drawer-right', label: 'Painel Lateral', description: 'Abre um painel pela direita com overlay — ideal para navegação rápida' },
                { value: 'modal-center', label: 'Janela Central', description: 'Modal centralizado com galeria + informações lado a lado' },
              ]} />

              {qv.model !== 'modal-center' && (
                <NumberSlider label="Largura do painel (px)" value={qv.drawerWidth || 480} onChange={v => set({ drawerWidth: v })} min={420} max={520} />
              )}
              {qv.model === 'modal-center' && (
                <NumberSlider label="Largura do modal (px)" value={qv.modalWidth || 860} onChange={v => set({ modalWidth: v })} min={720} max={920} />
              )}

              <SectionDivider label="Overlay" />
              <NumberSlider label="Opacidade do overlay" value={Math.round((qv.overlayOpacity || 0.5) * 100)} onChange={v => set({ overlayOpacity: v / 100 })} min={35} max={65} />
              <OptionPicker label="Blur do overlay" value={qv.overlayBlur || 'off'} onChange={v => set({ overlayBlur: v as any })} options={[
                { value: 'off', label: 'Desligado', description: 'Sem efeito de desfoque' },
                { value: 'low', label: 'Leve', description: 'Blur sutil no fundo' },
                { value: 'medium', label: 'Médio', description: 'Desfoque moderado' },
              ]} />
            </>
          )}

          {/* Tab 2 — Estrutura */}
          {activeTab === 'estrutura' && (
            <>
              <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-1 mb-2">
                Controle quais informações aparecem no Quick View.
              </p>
              <ToggleRow label="Avaliação (rating)" hint="Estrelas de avaliação do produto no header" checked={qv.showRating ?? true} onChange={v => set({ showRating: v })} />
              <ToggleRow label="Compartilhar" hint="Ícone para compartilhar o produto" checked={qv.showShare ?? false} onChange={v => set({ showShare: v })} />
              <ToggleRow label="SKU (código)" hint="Mostra o código do produto discretamente" checked={qv.showSKU ?? false} onChange={v => set({ showSKU: v })} />
              <ToggleRow label="Parcelamento no footer" hint="Mostra parcelas abaixo dos botões" checked={qv.showInstallments ?? false} onChange={v => set({ showInstallments: v })} />
              <ToggleRow label="Ver página do produto" hint="Link para a página completa" checked={qv.showViewProduct ?? true} onChange={v => set({ showViewProduct: v })} />
              <ToggleRow label="Simulação de frete" hint="Accordion com input de CEP e cálculo" checked={qv.showShipping ?? true} onChange={v => set({ showShipping: v })} />
              <ToggleRow label="Descrição" hint="Accordion com a descrição do produto" checked={qv.showDescription ?? true} onChange={v => set({ showDescription: v })} />
              
            </>
          )}

          {/* Tab 3 — Galeria */}
          {activeTab === 'galeria' && (
            <>
              <OptionPicker label="Layout das miniaturas" value={qv.galleryThumbsLayout || 'left'} onChange={v => set({ galleryThumbsLayout: v as any })} options={[
                { value: 'left', label: 'Lateral esquerda', description: 'Coluna de thumbs à esquerda' },
                { value: 'bottom', label: 'Abaixo', description: 'Mini grid horizontal abaixo da imagem' },
                { value: 'hidden', label: 'Oculto', description: 'Sem miniaturas, apenas dots' },
              ]} />
              <OptionPicker label="Altura máxima" value={qv.galleryMaxHeight || '55vh'} onChange={v => set({ galleryMaxHeight: v as any })} options={[
                { value: '45vh', label: '45vh', description: 'Compacta — mais espaço para info' },
                { value: '55vh', label: '55vh', description: 'Balanceada — padrão recomendado' },
                { value: '60vh', label: '60vh', description: 'Grande — destaque para fotos' },
              ]} />
              <ToggleRow label="Setas de navegação" checked={qv.galleryShowArrows ?? true} onChange={v => set({ galleryShowArrows: v })} />
              <OptionPicker label="Zoom" value={qv.galleryZoom || 'off'} onChange={v => set({ galleryZoom: v as any })} options={[
                { value: 'off', label: 'Desligado', description: 'Sem zoom ao clicar' },
                { value: 'basic', label: 'Básico', description: 'Zoom simples na imagem' },
              ]} />
              <OptionPicker label="Fit da imagem" value={qv.galleryFit || 'cover'} onChange={v => set({ galleryFit: v as any })} options={[
                { value: 'cover', label: 'Cover', description: 'Preenche todo o espaço (pode cortar)' },
                { value: 'contain', label: 'Contain', description: 'Mostra a imagem inteira (pode ter espaço)' },
              ]} />
            </>
          )}

          {/* Tab 4 — Variações */}
          {activeTab === 'variacoes' && (
            <>
              <OptionPicker label="Estilo das variações" value={qv.variationStyle || 'chips'} onChange={v => set({ variationStyle: v as any })} options={[
                { value: 'chips', label: 'Chips', description: 'Botões clicáveis por atributo (recomendado)' },
                { value: 'list-compact', label: 'Lista Compacta', description: 'Cada variação em linha com stepper (+/-)' },
                { value: 'dropdown', label: 'Dropdown', description: 'Ultra simples — seletor suspensa' },
              ]} />
              <ToggleRow label="Mostrar estoque" hint="Indica se a variação está disponível" checked={qv.showStock ?? false} onChange={v => set({ showStock: v })} />
              <ToggleRow label="Multivariantes" hint="Permite combinar cor + tamanho" checked={qv.allowMultiVariant ?? true} onChange={v => set({ allowMultiVariant: v })} />
              <OptionPicker label="Estilo do stepper" value={qv.stepperStyle || 'compact'} onChange={v => set({ stepperStyle: v as any })} options={[
                { value: 'compact', label: 'Compacto', description: 'Botões menores' },
                { value: 'default', label: 'Padrão', description: 'Botões maiores e mais visíveis' },
              ]} />
            </>
          )}

          {/* Tab 5 — CTAs */}
          {activeTab === 'ctas' && (
            <>
              <TextField label="Texto do botão principal" value={qv.ctaText || 'Adicionar ao Carrinho'} onChange={v => set({ ctaText: v })} />
              <ToggleRow label="Botão secundário" hint="Exibe um segundo botão (Comprar Agora) abaixo do principal" checked={qv.showSecondaryCta ?? true} onChange={v => set({ showSecondaryCta: v })} />
              {qv.showSecondaryCta !== false && (
                <TextField label="Texto do botão secundário" value={qv.ctaSecondaryText || 'Comprar Agora'} onChange={v => set({ ctaSecondaryText: v })} />
              )}
              <OptionPicker label="Tamanho dos botões" value={qv.ctaSize || 'normal'} onChange={v => set({ ctaSize: v as any })} options={[
                { value: 'normal', label: 'Normal', description: 'Tamanho padrão h-11' },
                { value: 'large', label: 'Grande', description: 'Maior destaque h-12' },
              ]} />
              <p className="text-[10px] text-muted-foreground/50 italic mt-1">
                O footer sticky está sempre ativo para garantir acessibilidade do CTA.
              </p>
            </>
          )}

          {/* Tab 6 — Aparência */}
          {activeTab === 'aparencia' && (
            <>
              <OptionPicker label="Radius do container" value={qv.containerRadius || 'md'} onChange={v => set({ containerRadius: v as any })} options={[
                { value: 'sm', label: 'Pequeno', description: '8px — mais reto' },
                { value: 'md', label: 'Médio', description: '12px — balanceado' },
                { value: 'lg', label: 'Grande', description: '16px — mais suave' },
              ]} />
              <OptionPicker label="Sombra" value={qv.containerShadow || 'md'} onChange={v => set({ containerShadow: v as any })} options={[
                { value: 'sm', label: 'Sutil', description: 'Sombra leve' },
                { value: 'md', label: 'Média', description: 'Sombra com mais presença' },
              ]} />
              <ToggleRow label="Borda" hint="Adiciona borda sutil ao container" checked={qv.containerBorder ?? false} onChange={v => set({ containerBorder: v })} />
              <OptionPicker label="Padding interno" value={String(qv.containerPadding || 20)} onChange={v => set({ containerPadding: Number(v) as any })} options={[
                { value: '16', label: '16px', description: 'Compacto' },
                { value: '20', label: '20px', description: 'Padrão' },
                { value: '24', label: '24px', description: 'Espaçoso' },
              ]} />
              <OptionPicker label="Espaçamento entre seções" value={String(qv.sectionSpacing || 16)} onChange={v => set({ sectionSpacing: Number(v) as any })} options={[
                { value: '12', label: '12px', description: 'Compacto' },
                { value: '16', label: '16px', description: 'Padrão' },
                { value: '20', label: '20px', description: 'Espaçoso' },
              ]} />
            </>
          )}

          {/* Tab 7 — Animação */}
          {activeTab === 'animacao' && (
            <>
              <OptionPicker label="Tipo de animação" value={qv.animationType || 'slide'} onChange={v => set({ animationType: v as any })} options={[
                { value: 'slide', label: 'Slide', description: 'Desliza para entrar (padrão)' },
                { value: 'fade', label: 'Fade', description: 'Aparece com opacidade' },
                { value: 'none', label: 'Nenhuma', description: 'Sem animação' },
              ]} />
              <NumberSlider
                label="Duração (ms)"
                value={qv.animationDuration || 200}
                onChange={v => set({ animationDuration: v })}
                min={150}
                max={300}
              />
            </>
          )}
        </>
      )}
    </EditorSection>
  );
}
