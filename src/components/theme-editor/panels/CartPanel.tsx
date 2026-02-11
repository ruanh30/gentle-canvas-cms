import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, SelectField, TextField, NumberSlider, SectionDivider } from '../EditorControls';
import { ShoppingBag } from 'lucide-react';

export function CartPanel() {
  const { draft, updateDraftSection } = useTheme();
  const c = draft.cart;
  const set = (u: Partial<typeof c>) => updateDraftSection('cart', u);

  return (
    <EditorSection icon={ShoppingBag} title="Carrinho" description="Estilo e funcionalidades do carrinho">
      <SelectField label="Tipo" value={c.style} onChange={v => set({ style: v })} options={[
        { value: 'page', label: 'Página inteira' }, { value: 'drawer', label: 'Drawer lateral' }, { value: 'dropdown', label: 'Dropdown' },
      ]} />
      <SectionDivider label="Funcionalidades" />
      <ToggleRow label="Thumbnails" checked={c.showThumbnails} onChange={v => set({ showThumbnails: v })} />
      <ToggleRow label="Alterar quantidade" checked={c.showQuantity} onChange={v => set({ showQuantity: v })} />
      <ToggleRow label="Campo de cupom" checked={c.showCoupon} onChange={v => set({ showCoupon: v })} />
      <ToggleRow label="Estimativa de frete" checked={c.showShippingEstimate} onChange={v => set({ showShippingEstimate: v })} />
      <ToggleRow label="Continuar comprando" checked={c.showContinueShopping} onChange={v => set({ showContinueShopping: v })} />

      <SectionDivider label="Frete Grátis" />
      <ToggleRow label="Barra de frete grátis" checked={c.showFreeShippingBar} onChange={v => set({ showFreeShippingBar: v })} />
      {c.showFreeShippingBar && (
        <>
          <NumberSlider label="Valor mínimo" value={c.freeShippingThreshold} onChange={v => set({ freeShippingThreshold: v })} min={50} max={1000} step={10} suffix="" />
          <TextField label="Mensagem" value={c.freeShippingMessage} onChange={v => set({ freeShippingMessage: v })} />
        </>
      )}

      <SectionDivider label="Recomendações" />
      <ToggleRow label="Mostrar recomendações" checked={c.showRecommendations} onChange={v => set({ showRecommendations: v })} />
      {c.showRecommendations && <TextField label="Título" value={c.recommendationsTitle} onChange={v => set({ recommendationsTitle: v })} />}

      <SectionDivider label="Textos" />
      <TextField label="Carrinho vazio" value={c.emptyCartMessage} onChange={v => set({ emptyCartMessage: v })} />
      <TextField label="CTA carrinho vazio" value={c.emptyCartCta} onChange={v => set({ emptyCartCta: v })} />
    </EditorSection>
  );
}
