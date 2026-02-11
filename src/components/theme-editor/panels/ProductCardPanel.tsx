import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, OptionPicker, ToggleRow, SelectField, NumberSlider, SectionDivider } from '../EditorControls';
import { Package } from 'lucide-react';

export function ProductCardPanel() {
  const { draft, updateDraftSection } = useTheme();
  const c = draft.productCard;
  const set = (u: Partial<typeof c>) => updateDraftSection('productCard', u);

  return (
    <EditorSection icon={Package} title="Card de Produto" description="Visual e comportamento dos cards de produto">
      <OptionPicker label="Layout" value={c.layout} onChange={v => set({ layout: v })} options={[
        { value: 'standard', label: 'Padrão' }, { value: 'minimal', label: 'Minimal' },
        { value: 'detailed', label: 'Detalhado' }, { value: 'horizontal', label: 'Horizontal' },
        { value: 'overlay', label: 'Overlay' }, { value: 'magazine', label: 'Magazine' },
      ]} />
      <SectionDivider label="Imagem" />
      <SelectField label="Proporção" value={c.imageAspect} onChange={v => set({ imageAspect: v })} options={[
        { value: '1:1', label: '1:1 Quadrado' }, { value: '3:4', label: '3:4' },
        { value: '4:5', label: '4:5' }, { value: '2:3', label: '2:3' }, { value: '16:9', label: '16:9' },
      ]} />
      <SelectField label="Hover" value={c.imageHover} onChange={v => set({ imageHover: v })} options={[
        { value: 'none', label: 'Nenhum' }, { value: 'zoom', label: 'Zoom' },
        { value: 'swap', label: 'Trocar imagem' }, { value: 'slide', label: 'Slide' },
      ]} />
      <SelectField label="Borda da imagem" value={c.imageBorderRadius} onChange={v => set({ imageBorderRadius: v })} options={[
        { value: 'none', label: 'Nenhuma' }, { value: 'small', label: 'Pequena' },
        { value: 'medium', label: 'Média' }, { value: 'large', label: 'Grande' },
      ]} />

      <SectionDivider label="Informações" />
      <ToggleRow label="Categoria" checked={c.showCategory} onChange={v => set({ showCategory: v })} />
      <ToggleRow label="Marca" checked={c.showBrand} onChange={v => set({ showBrand: v })} />
      <ToggleRow label="Avaliação" checked={c.showRating} onChange={v => set({ showRating: v })} />
      <NumberSlider label="Linhas do título" value={c.titleLines} onChange={v => set({ titleLines: v as 1 | 2 | 3 })} min={1} max={3} />
      <OptionPicker label="Alinhamento" value={c.contentAlign} onChange={v => set({ contentAlign: v })} options={[
        { value: 'left', label: 'Esquerda' }, { value: 'center', label: 'Centro' },
      ]} />

      <SectionDivider label="Preço" />
      <OptionPicker label="Tamanho" value={c.priceSize} onChange={v => set({ priceSize: v })} options={[
        { value: 'small', label: 'Pequeno' }, { value: 'medium', label: 'Médio' }, { value: 'large', label: 'Grande' },
      ]} />
      <ToggleRow label="Preço comparativo" checked={c.showComparePrice} onChange={v => set({ showComparePrice: v })} />
      <ToggleRow label="Desconto" checked={c.showDiscount} onChange={v => set({ showDiscount: v })} />
      {c.showDiscount && (
        <SelectField label="Estilo desconto" value={c.discountStyle} onChange={v => set({ discountStyle: v })} options={[
          { value: 'percentage', label: 'Porcentagem' }, { value: 'amount', label: 'Valor' }, { value: 'badge', label: 'Badge' },
        ]} />
      )}
      <ToggleRow label="Parcelas" checked={c.showInstallments} onChange={v => set({ showInstallments: v })} />

      <SectionDivider label="Ações" />
      <ToggleRow label="Botão Comprar Agora" hint="Exibe o botão vermelho de compra rápida nos cards de produto" checked={c.showBuyNow} onChange={v => set({ showBuyNow: v })} />
      <ToggleRow label="Adicionar ao carrinho" hint="Exibe o botão de adicionar ao carrinho nos cards" checked={c.showAddToCart} onChange={v => set({ showAddToCart: v })} />
      {c.showAddToCart && (
        <SelectField label="Estilo" value={c.addToCartStyle} onChange={v => set({ addToCartStyle: v })} options={[
          { value: 'icon', label: 'Ícone' }, { value: 'button', label: 'Botão' }, { value: 'full-width', label: 'Largura total' },
        ]} />
      )}
      <ToggleRow label="Quick View" checked={c.showQuickView} onChange={v => set({ showQuickView: v })} />
      {c.showQuickView && (
        <SelectField label="Estilo do Quick View" value={c.quickViewStyle} onChange={v => set({ quickViewStyle: v })} options={[
          { value: 'modal', label: 'Modal' }, { value: 'drawer', label: 'Drawer lateral' },
          { value: 'expand', label: 'Expandir card' }, { value: 'side-panel', label: 'Painel lateral' },
        ]} />
      )}
      <ToggleRow label="Wishlist" checked={c.showWishlist} onChange={v => set({ showWishlist: v })} />

      <SectionDivider label="Badges" />
      <SelectField label="Posição" value={c.badgePosition} onChange={v => set({ badgePosition: v })} options={[
        { value: 'top-left', label: 'Topo esquerdo' }, { value: 'top-right', label: 'Topo direito' }, { value: 'bottom-left', label: 'Inferior esquerdo' },
      ]} />
      <SelectField label="Estilo" value={c.badgeStyle} onChange={v => set({ badgeStyle: v })} options={[
        { value: 'square', label: 'Quadrado' }, { value: 'rounded', label: 'Arredondado' }, { value: 'pill', label: 'Pílula' },
      ]} />

      <SectionDivider label="Visual" />
      <OptionPicker label="Espaçamento" value={c.spacing} onChange={v => set({ spacing: v })} options={[
        { value: 'compact', label: 'Compacto' }, { value: 'normal', label: 'Normal' }, { value: 'spacious', label: 'Espaçoso' },
      ]} />
      <SelectField label="Sombra" value={c.shadow} onChange={v => set({ shadow: v })} options={[
        { value: 'none', label: 'Nenhuma' }, { value: 'subtle', label: 'Suave' },
        { value: 'medium', label: 'Média' }, { value: 'strong', label: 'Forte' },
      ]} />
      <ToggleRow label="Sombra no hover" checked={c.hoverShadow} onChange={v => set({ hoverShadow: v })} />
      <ToggleRow label="Borda" checked={c.border} onChange={v => set({ border: v })} />
    </EditorSection>
  );
}
