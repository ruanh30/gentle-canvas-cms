import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, SelectField, TextField, OptionPicker, SectionDivider } from '../EditorControls';
import { ShoppingBag } from 'lucide-react';

export function ProductPagePanel() {
  const { draft, updateDraftSection } = useTheme();
  const p = draft.productPage;
  const set = (u: Partial<typeof p>) => updateDraftSection('productPage', u);

  return (
    <EditorSection icon={ShoppingBag} title="Página de Produto" description="Layout e funcionalidades da PDP">
      <SectionDivider label="Galeria" />
      <SelectField label="Layout da galeria" value={p.galleryLayout} onChange={v => set({ galleryLayout: v })} options={[
        { value: 'side-by-side', label: 'Lado a lado' }, { value: 'slider', label: 'Slider' },
        { value: 'grid', label: 'Grade' }, { value: 'vertical-thumbs', label: 'Thumbs verticais' },
      ]} />
      <OptionPicker label="Posição" value={p.galleryPosition} onChange={v => set({ galleryPosition: v })} options={[
        { value: 'left', label: 'Esquerda' }, { value: 'right', label: 'Direita' },
      ]} />
      <ToggleRow label="Zoom na imagem" checked={p.imageZoom} onChange={v => set({ imageZoom: v })} />
      <ToggleRow label="Galeria fixa (sticky)" checked={p.stickyGallery} onChange={v => set({ stickyGallery: v })} />

      <SectionDivider label="Informações" />
      <ToggleRow label="Breadcrumb" checked={p.showBreadcrumb} onChange={v => set({ showBreadcrumb: v })} />
      <ToggleRow label="SKU" checked={p.showSKU} onChange={v => set({ showSKU: v })} />
      <ToggleRow label="Marca" checked={p.showBrand} onChange={v => set({ showBrand: v })} />
      <ToggleRow label="Avaliação" checked={p.showRating} onChange={v => set({ showRating: v })} />
      <ToggleRow label="Estoque" checked={p.showStock} onChange={v => set({ showStock: v })} />
      <ToggleRow label="Compartilhar" checked={p.showShareButtons} onChange={v => set({ showShareButtons: v })} />

      <SectionDivider label="Variações" />
      <SelectField label="Estilo" value={p.variantStyle} onChange={v => set({ variantStyle: v })} options={[
        { value: 'dropdown', label: 'Dropdown' }, { value: 'buttons', label: 'Botões' }, { value: 'swatches', label: 'Swatches' },
      ]} />
      <SelectField label="Quantidade" value={p.quantityStyle} onChange={v => set({ quantityStyle: v })} options={[
        { value: 'input', label: 'Campo numérico' }, { value: 'stepper', label: 'Stepper (+/-)' },
      ]} />

      <SectionDivider label="CTA" />
      <OptionPicker label="Layout do CTA" value={p.ctaLayout} onChange={v => set({ ctaLayout: v })} options={[
        { value: 'stacked', label: 'Empilhado' }, { value: 'side-by-side', label: 'Lado a lado' },
      ]} />
      <ToggleRow label="CTA sticky no mobile" checked={p.ctaStickyMobile} onChange={v => set({ ctaStickyMobile: v })} />

      <SectionDivider label="Confiança" />
      <ToggleRow label="Selos de confiança" checked={p.showTrustBadges} onChange={v => set({ showTrustBadges: v })} />
      <ToggleRow label="Guia de tamanhos" checked={p.sizeGuideEnabled} onChange={v => set({ sizeGuideEnabled: v })} />
      <ToggleRow label="Estimativa de frete" checked={p.shippingEstimate} onChange={v => set({ shippingEstimate: v })} />

      <SectionDivider label="Conteúdo" />
      <SelectField label="Estilo das abas" value={p.tabsStyle} onChange={v => set({ tabsStyle: v })} options={[
        { value: 'tabs', label: 'Abas' }, { value: 'accordion', label: 'Accordion' }, { value: 'inline', label: 'Inline' },
      ]} />
      <ToggleRow label="Produtos relacionados" checked={p.showRelated} onChange={v => set({ showRelated: v })} />
      {p.showRelated && <TextField label="Título" value={p.relatedTitle} onChange={v => set({ relatedTitle: v })} />}
      <ToggleRow label="Vistos recentemente" checked={p.showRecentlyViewed} onChange={v => set({ showRecentlyViewed: v })} />
    </EditorSection>
  );
}
