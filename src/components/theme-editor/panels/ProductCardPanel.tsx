import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, OptionPicker, ToggleRow, SelectField, NumberSlider, SectionDivider, TextField } from '../EditorControls';
import { Package } from 'lucide-react';

export function ProductCardPanel() {
  const { draft, updateDraftSection } = useTheme();
  const c = draft.productCard;
  const set = (u: Partial<typeof c>) => updateDraftSection('productCard', u);

  return (
    <EditorSection icon={Package} title="Card de Produto" description="Visual e comportamento dos cards de produto nas listagens e destaques">
      <OptionPicker label="Layout" value={c.layout} onChange={v => set({ layout: v })} options={[
        { value: 'standard', label: 'Padrão', description: 'Imagem em cima e info embaixo' },
        { value: 'minimal', label: 'Minimal', description: 'Apenas imagem, nome e preço' },
        { value: 'detailed', label: 'Detalhado', description: 'Inclui descrição e mais info' },
        { value: 'horizontal', label: 'Horizontal', description: 'Imagem ao lado do conteúdo' },
        { value: 'overlay', label: 'Overlay', description: 'Texto sobreposto à imagem' },
        { value: 'magazine', label: 'Magazine', description: 'Estilo editorial sofisticado' },
      ]} />

      <SectionDivider label="Imagem" />
      <SelectField label="Proporção da imagem" value={c.imageAspect} onChange={v => set({ imageAspect: v })} options={[
        { value: '1:1', label: '1:1 Quadrado — altura igual à largura' },
        { value: '3:4', label: '3:4 Retrato — levemente vertical' },
        { value: '4:5', label: '4:5 Instagram — formato de post' },
        { value: '2:3', label: '2:3 Alto — imagem mais alongada' },
        { value: '16:9', label: '16:9 Paisagem — formato widescreen' },
      ]} />
      <SelectField label="Efeito ao passar o mouse" value={c.imageHover} onChange={v => set({ imageHover: v })} options={[
        { value: 'none', label: 'Nenhum — sem efeito na imagem' },
        { value: 'zoom', label: 'Zoom — amplia levemente a imagem' },
        { value: 'swap', label: 'Trocar — mostra a 2ª foto do produto' },
        { value: 'slide', label: 'Slide — desliza a imagem suavemente' },
      ]} />
      <SelectField label="Borda da imagem" value={c.imageBorderRadius} onChange={v => set({ imageBorderRadius: v })} options={[
        { value: 'none', label: 'Nenhuma — cantos totalmente retos' },
        { value: 'small', label: 'Pequena — cantos levemente arredondados (4px)' },
        { value: 'medium', label: 'Média — arredondamento moderado (8px)' },
        { value: 'large', label: 'Grande — cantos bem arredondados (12px)' },
      ]} />

      <SectionDivider label="Informações exibidas" />
      <ToggleRow label="Categoria" hint="Mostra a categoria do produto acima do nome (ex: Jeans, Acessórios)" checked={c.showCategory} onChange={v => set({ showCategory: v })} />
      <ToggleRow label="Marca" hint="Exibe o nome da marca/fabricante do produto no card" checked={c.showBrand} onChange={v => set({ showBrand: v })} />
      <ToggleRow label="Avaliação" hint="Mostra as estrelas de avaliação e número de reviews dos clientes" checked={c.showRating} onChange={v => set({ showRating: v })} />
      <NumberSlider label="Linhas do título" value={c.titleLines} onChange={v => set({ titleLines: v as 1 | 2 | 3 })} min={1} max={3} />
      <OptionPicker label="Alinhamento do conteúdo" value={c.contentAlign} onChange={v => set({ contentAlign: v })} options={[
        { value: 'left', label: 'Esquerda', description: 'Texto alinhado à esquerda' },
        { value: 'center', label: 'Centro', description: 'Texto centralizado no card' },
      ]} />

      <SectionDivider label="Preço" />
      <OptionPicker label="Tamanho do preço" value={c.priceSize} onChange={v => set({ priceSize: v })} options={[
        { value: 'small', label: 'Pequeno', description: 'Preço discreto e compacto' },
        { value: 'medium', label: 'Médio', description: 'Tamanho padrão equilibrado' },
        { value: 'large', label: 'Grande', description: 'Preço em destaque, bem visível' },
      ]} />
      <ToggleRow label="Preço comparativo" hint="Mostra o preço original riscado ao lado do preço com desconto (ex: de R$ 199 por R$ 149)" checked={c.showComparePrice} onChange={v => set({ showComparePrice: v })} />
      <ToggleRow label="Badge de desconto" hint="Exibe o selo/badge de desconto sobre a imagem do produto (ex: -30%)" checked={c.showDiscount} onChange={v => set({ showDiscount: v })} />
      {c.showDiscount && (
        <SelectField label="Formato do desconto" value={c.discountStyle} onChange={v => set({ discountStyle: v })} options={[
          { value: 'percentage', label: 'Porcentagem — ex: -30%' },
          { value: 'amount', label: 'Valor em reais — ex: -R$ 40,00' },
          { value: 'badge', label: 'Badge com texto — exibe "OFERTA"' },
        ]} />
      )}
      <ToggleRow label="Parcelas" hint="Mostra o valor parcelado abaixo do preço (ex: até 12x de R$ 16,58)" checked={c.showInstallments} onChange={v => set({ showInstallments: v })} />

      <SectionDivider label="Botões de Ação" />
      <ToggleRow label="Botão Comprar Agora" hint="Exibe o botão de compra rápida que leva direto ao carrinho. A cor é configurada em Cores > Ação de Compra" checked={c.showBuyNow} onChange={v => set({ showBuyNow: v })} />
      {c.showBuyNow && (
        <TextField label="Texto do botão Comprar" value={c.buyNowText || 'Comprar Agora'} onChange={v => set({ buyNowText: v })} placeholder="Comprar Agora" />
      )}
      <ToggleRow label="Botão Adicionar ao Carrinho" hint="Exibe o botão para adicionar o produto ao carrinho sem sair da página atual" checked={c.showAddToCart} onChange={v => set({ showAddToCart: v })} />
      {c.showAddToCart && (
        <TextField label="Texto do botão Carrinho" value={c.addToCartText || 'Adicionar ao Carrinho'} onChange={v => set({ addToCartText: v })} placeholder="Adicionar ao Carrinho" />
      )}
      {(c.showBuyNow || c.showAddToCart) && (
        <>
          <SelectField label="Visibilidade dos botões" value={c.buttonVisibility} onChange={v => set({ buttonVisibility: v })} options={[
            { value: 'both', label: 'Ambos — mostra Comprar e Adicionar' },
            { value: 'add-only', label: 'Só Adicionar — oculta Comprar Agora' },
            { value: 'buy-only', label: 'Só Comprar — oculta Adicionar ao Carrinho' },
          ]} />
          <OptionPicker label="Layout dos botões" value={c.buttonLayout || 'stacked'} onChange={v => set({ buttonLayout: v })} options={[
            { value: 'stacked', label: 'Empilhado', description: 'Um embaixo do outro' },
            { value: 'side-by-side', label: 'Lado a lado', description: 'Na mesma linha' },
          ]} />
        </>
      )}
      {c.showAddToCart && c.buttonLayout !== 'side-by-side' && (
        <SelectField label="Estilo do botão carrinho" value={c.addToCartStyle} onChange={v => set({ addToCartStyle: v })} options={[
          { value: 'icon', label: 'Ícone — pequeno ícone no canto da imagem' },
          { value: 'button', label: 'Botão compacto — tamanho reduzido' },
          { value: 'full-width', label: 'Largura total — ocupa toda a largura do card' },
        ]} />
      )}

      <SectionDivider label="Interação" />
      <ToggleRow label="Quick View (Pré-visualização)" hint="Permite ver detalhes do produto em um popup sem sair da listagem" checked={c.showQuickView} onChange={v => set({ showQuickView: v })} />
      {c.showQuickView && (
        <SelectField label="Estilo do Quick View" value={c.quickViewStyle} onChange={v => set({ quickViewStyle: v })} options={[
          { value: 'modal', label: 'Modal — janela central sobre a página' },
          { value: 'drawer', label: 'Drawer — painel que desliza da lateral' },
          { value: 'expand', label: 'Expandir — abre detalhes no próprio card' },
          { value: 'side-panel', label: 'Painel lateral — abre ao lado da listagem' },
        ]} />
      )}
      <ToggleRow label="Lista de Desejos (Wishlist)" hint="Exibe ícone de coração para o cliente salvar o produto como favorito" checked={c.showWishlist} onChange={v => set({ showWishlist: v })} />
      <SelectField label="Clique no card" value={c.clickBehavior} onChange={v => set({ clickBehavior: v })} options={[
        { value: 'navigate', label: 'Navegar — abre a página completa do produto' },
        { value: 'modal', label: 'Modal — abre Quick View ao clicar no card' },
      ]} />

      <SectionDivider label="Badges de Desconto" />
      <SelectField label="Posição do badge" value={c.badgePosition} onChange={v => set({ badgePosition: v })} options={[
        { value: 'top-left', label: 'Topo esquerdo — canto superior esquerdo da imagem' },
        { value: 'top-right', label: 'Topo direito — canto superior direito da imagem' },
        { value: 'bottom-left', label: 'Inferior esquerdo — canto inferior esquerdo' },
      ]} />
      <SelectField label="Formato do badge" value={c.badgeStyle} onChange={v => set({ badgeStyle: v })} options={[
        { value: 'square', label: 'Quadrado — cantos totalmente retos' },
        { value: 'rounded', label: 'Arredondado — cantos levemente suaves' },
        { value: 'pill', label: 'Pílula — formato totalmente arredondado' },
      ]} />

      <SectionDivider label="Aparência Geral" />
      <OptionPicker label="Espaçamento interno" value={c.spacing} onChange={v => set({ spacing: v })} options={[
        { value: 'compact', label: 'Compacto', description: 'Menos espaço entre elementos' },
        { value: 'normal', label: 'Normal', description: 'Espaçamento padrão equilibrado' },
        { value: 'spacious', label: 'Espaçoso', description: 'Mais ar entre os elementos' },
      ]} />
      <SelectField label="Sombra do card" value={c.shadow} onChange={v => set({ shadow: v })} options={[
        { value: 'none', label: 'Nenhuma — card sem sombra' },
        { value: 'subtle', label: 'Suave — sombra sutil e discreta' },
        { value: 'medium', label: 'Média — sombra moderada' },
        { value: 'strong', label: 'Forte — sombra bem destacada' },
      ]} />
      <ToggleRow label="Sombra ao passar o mouse" hint="Adiciona uma sombra elevada quando o cursor passa sobre o card, criando efeito de profundidade" checked={c.hoverShadow} onChange={v => set({ hoverShadow: v })} />
      <ToggleRow label="Borda ao redor do card" hint="Adiciona uma borda sutil ao redor de cada card de produto para delimitá-lo visualmente" checked={c.border} onChange={v => set({ border: v })} />
    </EditorSection>
  );
}
