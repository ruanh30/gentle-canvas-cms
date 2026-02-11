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
        { value: 'standard', label: 'Padrão', description: 'Card clássico com imagem em cima e info embaixo' },
        { value: 'minimal', label: 'Minimal', description: 'Apenas imagem, nome e preço' },
        { value: 'detailed', label: 'Detalhado', description: 'Inclui descrição e mais informações' },
        { value: 'horizontal', label: 'Horizontal', description: 'Imagem ao lado do conteúdo' },
        { value: 'overlay', label: 'Overlay', description: 'Texto sobreposto à imagem' },
        { value: 'magazine', label: 'Magazine', description: 'Estilo editorial sofisticado' },
      ]} />
      <SectionDivider label="Imagem" />
      <SelectField label="Proporção" value={c.imageAspect} onChange={v => set({ imageAspect: v })} options={[
        { value: '1:1', label: '1:1 Quadrado' }, { value: '3:4', label: '3:4 Retrato' },
        { value: '4:5', label: '4:5 Instagram' }, { value: '2:3', label: '2:3 Alto' }, { value: '16:9', label: '16:9 Paisagem' },
      ]} />
      <SelectField label="Hover da imagem" value={c.imageHover} onChange={v => set({ imageHover: v })} options={[
        { value: 'none', label: 'Nenhum' }, { value: 'zoom', label: 'Zoom — amplia a imagem' },
        { value: 'swap', label: 'Trocar — mostra 2ª imagem' }, { value: 'slide', label: 'Slide — desliza levemente' },
      ]} />
      <SelectField label="Borda da imagem" value={c.imageBorderRadius} onChange={v => set({ imageBorderRadius: v })} options={[
        { value: 'none', label: 'Nenhuma — cantos retos' }, { value: 'small', label: 'Pequena — 4px' },
        { value: 'medium', label: 'Média — 8px' }, { value: 'large', label: 'Grande — 12px' },
      ]} />

      <SectionDivider label="Informações" />
      <ToggleRow label="Categoria" hint="Mostra a categoria do produto acima do nome (ex: Jeans, Básico)" checked={c.showCategory} onChange={v => set({ showCategory: v })} />
      <ToggleRow label="Marca" hint="Exibe o nome da marca do produto no card" checked={c.showBrand} onChange={v => set({ showBrand: v })} />
      <ToggleRow label="Avaliação" hint="Mostra as estrelas de avaliação dos clientes" checked={c.showRating} onChange={v => set({ showRating: v })} />
      <NumberSlider label="Linhas do título" value={c.titleLines} onChange={v => set({ titleLines: v as 1 | 2 | 3 })} min={1} max={3} />
      <OptionPicker label="Alinhamento" value={c.contentAlign} onChange={v => set({ contentAlign: v })} options={[
        { value: 'left', label: 'Esquerda', description: 'Texto alinhado à esquerda' },
        { value: 'center', label: 'Centro', description: 'Texto centralizado no card' },
      ]} />

      <SectionDivider label="Preço" />
      <OptionPicker label="Tamanho do preço" value={c.priceSize} onChange={v => set({ priceSize: v })} options={[
        { value: 'small', label: 'Pequeno', description: 'Preço discreto' },
        { value: 'medium', label: 'Médio', description: 'Tamanho padrão' },
        { value: 'large', label: 'Grande', description: 'Preço em destaque' },
      ]} />
      <ToggleRow label="Preço comparativo" hint="Mostra o preço original riscado ao lado do preço com desconto" checked={c.showComparePrice} onChange={v => set({ showComparePrice: v })} />
      <ToggleRow label="Desconto" hint="Exibe o badge de desconto na imagem do produto (ex: -30%)" checked={c.showDiscount} onChange={v => set({ showDiscount: v })} />
      {c.showDiscount && (
        <SelectField label="Estilo desconto" value={c.discountStyle} onChange={v => set({ discountStyle: v })} options={[
          { value: 'percentage', label: 'Porcentagem — ex: -30%' }, { value: 'amount', label: 'Valor — ex: -R$ 40' }, { value: 'badge', label: 'Badge — texto OFERTA' },
        ]} />
      )}
      <ToggleRow label="Parcelas" hint="Mostra valor parcelado abaixo do preço (ex: até 12x de R$ 16,66)" checked={c.showInstallments} onChange={v => set({ showInstallments: v })} />

      <SectionDivider label="Ações" />
      <ToggleRow label="Botão Comprar Agora" hint="Exibe o botão vermelho de compra rápida que leva direto ao carrinho" checked={c.showBuyNow} onChange={v => set({ showBuyNow: v })} />
      <ToggleRow label="Adicionar ao carrinho" hint="Exibe o botão para adicionar o produto ao carrinho sem sair da página" checked={c.showAddToCart} onChange={v => set({ showAddToCart: v })} />
      {(c.showBuyNow || c.showAddToCart) && (
        <SelectField label="Visibilidade" value={c.buttonVisibility} onChange={v => set({ buttonVisibility: v })} options={[
          { value: 'both', label: 'Ambos os botões' }, { value: 'add-only', label: 'Só Adicionar' }, { value: 'buy-only', label: 'Só Comprar' },
        ]} />
      )}
      {c.showAddToCart && (
        <SelectField label="Estilo do carrinho" value={c.addToCartStyle} onChange={v => set({ addToCartStyle: v })} options={[
          { value: 'icon', label: 'Ícone — pequeno no canto' }, { value: 'button', label: 'Botão — compacto' }, { value: 'full-width', label: 'Largura total — botão grande' },
        ]} />
      )}
      <ToggleRow label="Quick View" hint="Permite pré-visualizar o produto sem sair da listagem" checked={c.showQuickView} onChange={v => set({ showQuickView: v })} />
      {c.showQuickView && (
        <SelectField label="Estilo do Quick View" value={c.quickViewStyle} onChange={v => set({ quickViewStyle: v })} options={[
          { value: 'modal', label: 'Modal — janela central' }, { value: 'drawer', label: 'Drawer — painel lateral' },
          { value: 'expand', label: 'Expandir — abre no próprio card' }, { value: 'side-panel', label: 'Painel — abre ao lado' },
        ]} />
      )}
      <ToggleRow label="Wishlist" hint="Exibe ícone de coração para salvar o produto na lista de desejos" checked={c.showWishlist} onChange={v => set({ showWishlist: v })} />

      <SectionDivider label="Badges" />
      <SelectField label="Posição do badge" value={c.badgePosition} onChange={v => set({ badgePosition: v })} options={[
        { value: 'top-left', label: 'Topo esquerdo' }, { value: 'top-right', label: 'Topo direito' }, { value: 'bottom-left', label: 'Inferior esquerdo' },
      ]} />
      <SelectField label="Estilo do badge" value={c.badgeStyle} onChange={v => set({ badgeStyle: v })} options={[
        { value: 'square', label: 'Quadrado — cantos retos' }, { value: 'rounded', label: 'Arredondado — cantos suaves' }, { value: 'pill', label: 'Pílula — totalmente arredondado' },
      ]} />

      <SectionDivider label="Visual" />
      <OptionPicker label="Espaçamento" value={c.spacing} onChange={v => set({ spacing: v })} options={[
        { value: 'compact', label: 'Compacto', description: 'Menos espaço entre elementos' },
        { value: 'normal', label: 'Normal', description: 'Espaçamento equilibrado' },
        { value: 'spacious', label: 'Espaçoso', description: 'Mais ar entre os elementos' },
      ]} />
      <SelectField label="Sombra" value={c.shadow} onChange={v => set({ shadow: v })} options={[
        { value: 'none', label: 'Nenhuma' }, { value: 'subtle', label: 'Suave — sutil' },
        { value: 'medium', label: 'Média — moderada' }, { value: 'strong', label: 'Forte — destacada' },
      ]} />
      <ToggleRow label="Sombra no hover" hint="Adiciona sombra quando o mouse passa sobre o card" checked={c.hoverShadow} onChange={v => set({ hoverShadow: v })} />
      <ToggleRow label="Borda" hint="Adiciona uma borda sutil ao redor de cada card" checked={c.border} onChange={v => set({ border: v })} />
    </EditorSection>
  );
}
