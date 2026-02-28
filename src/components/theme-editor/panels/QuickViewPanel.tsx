import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, SelectField, TextField, OptionPicker, SectionDivider, NumberSlider } from '../EditorControls';
import { Eye } from 'lucide-react';

export function QuickViewPanel() {
  const { draft, updateDraftSection } = useTheme();
  const qv = draft.quickView;
  const set = (u: Partial<typeof qv>) => updateDraftSection('quickView', u);
  const setSocial = (u: Partial<typeof qv.socialActions>) =>
    set({ socialActions: { ...qv.socialActions, ...u } });

  return (
    <EditorSection icon={Eye} title="Visualização Rápida" description="Configure o Quick View — modal que abre ao clicar no produto sem sair da página de listagem">

      <ToggleRow
        label="Ativar Quick View"
        hint="Quando ativado, ao clicar no produto abre um modal com detalhes, variações e opções de compra, sem sair da página"
        checked={qv.enabled}
        onChange={v => set({ enabled: v })}
      />

      {qv.enabled && (
        <>
          <SectionDivider label="Estilo e Layout" />
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
            Como o Quick View é exibido na tela.
          </p>
          <OptionPicker label="Tipo de exibição" value={qv.style} onChange={v => set({ style: v })} options={[
            { value: 'modal', label: 'Modal', description: 'Abre centralizado sobre a página (como a referência Duetto)' },
            { value: 'drawer', label: 'Drawer', description: 'Abre como painel lateral da direita' },
            { value: 'side-panel', label: 'Painel lateral', description: 'Similar ao drawer mas com largura maior' },
          ]} />

          <SectionDivider label="Galeria de Imagens" />
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
            Controle da galeria de fotos no Quick View.
          </p>
          <ToggleRow label="Miniaturas da galeria" hint="Mostra thumbnails das imagens ao lado da foto principal para navegação rápida" checked={qv.showGalleryThumbs} onChange={v => set({ showGalleryThumbs: v })} />
          <ToggleRow label="Botão download da imagem" hint="Exibe um botão para o cliente baixar a foto do produto" checked={qv.showDownloadImage} onChange={v => set({ showDownloadImage: v })} />

          <SectionDivider label="Variações e Quantidade" />
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
            Como o cliente escolhe tamanho, cor e quantidade diretamente no Quick View.
          </p>
          <ToggleRow label="Exibir variações" hint="Mostra as opções de cor, tamanho, etc. com seletor de quantidade individual" checked={qv.showVariations} onChange={v => set({ showVariations: v })} />
          {qv.showVariations && (
            <>
              <SelectField label="Estilo das variações" value={qv.variationStyle} onChange={v => set({ variationStyle: v })} options={[
                { value: 'list', label: 'Lista — cada variação em linha com stepper (+/-)' },
                { value: 'buttons', label: 'Botões — opções clicáveis lado a lado' },
                { value: 'swatches', label: 'Swatches — amostras visuais de cor/textura' },
              ]} />
              <ToggleRow label="Quantidade por variação" hint="Permite definir quantidade individual para cada variação (ex: 2 do P + 1 do M)" checked={qv.showQuantityPerVariation} onChange={v => set({ showQuantityPerVariation: v })} />
            </>
          )}
          <ToggleRow label="Exibir SKU" hint="Mostra o código de referência de cada variação" checked={qv.showSKU} onChange={v => set({ showSKU: v })} />

          <SectionDivider label="Informações do Produto" />
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
            Quais informações adicionais aparecem no Quick View.
          </p>
          <ToggleRow label="Tags/Categorias" hint="Exibe as tags ou categorias do produto (ex: 'Tons Neutros')" checked={qv.showTags} onChange={v => set({ showTags: v })} />
          <ToggleRow label="Quantidade vendida" hint="Mostra o número de vendas do produto (ex: '6 vendas')" checked={qv.showSalesCount} onChange={v => set({ showSalesCount: v })} />
          <ToggleRow label="Avaliação" hint="Exibe estrelas de avaliação do produto" checked={qv.showRating} onChange={v => set({ showRating: v })} />

          <SectionDivider label="Descrição" />
          <ToggleRow label="Exibir descrição" hint="Mostra a descrição do produto no Quick View" checked={qv.showDescription} onChange={v => set({ showDescription: v })} />
          {qv.showDescription && (
            <OptionPicker label="Estilo da descrição" value={qv.descriptionStyle} onChange={v => set({ descriptionStyle: v })} options={[
              { value: 'accordion', label: 'Accordion', description: 'Seção expansível — começa fechada' },
              { value: 'inline', label: 'Inline', description: 'Sempre visível abaixo das ações' },
            ]} />
          )}

          <SectionDivider label="Frete" />
          <ToggleRow label="Simulação de frete" hint="Permite o cliente inserir o CEP e calcular o frete diretamente no Quick View" checked={qv.showShippingEstimate} onChange={v => set({ showShippingEstimate: v })} />

          <SectionDivider label="Botão de Compra" />
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
            Configure os botões de ação do Quick View.
          </p>
          <TextField label="Texto do botão principal" value={qv.ctaText} onChange={v => set({ ctaText: v })} />
          <OptionPicker label="Estilo do botão" value={qv.ctaStyle} onChange={v => set({ ctaStyle: v })} options={[
            { value: 'filled', label: 'Preenchido', description: 'Fundo sólido com cor primária' },
            { value: 'outline', label: 'Contorno', description: 'Apenas borda, sem fundo' },
          ]} />
          <ToggleRow label="Botão Comprar Agora" hint="Adiciona um segundo botão que leva direto ao carrinho/checkout" checked={qv.showBuyNow} onChange={v => set({ showBuyNow: v })} />
          {qv.showBuyNow && (
            <TextField label="Texto do Comprar Agora" value={qv.buyNowText} onChange={v => set({ buyNowText: v })} />
          )}

          <SectionDivider label="Ações Sociais" />
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
            Ícones de ação abaixo do botão de compra.
          </p>
          <ToggleRow label="Exibir ações sociais" hint="Mostra ícones de favorito, chat, compartilhar e WhatsApp" checked={qv.showSocialActions} onChange={v => set({ showSocialActions: v })} />
          {qv.showSocialActions && (
            <>
              <ToggleRow label="❤️ Favoritar" checked={qv.socialActions.wishlist} onChange={v => setSocial({ wishlist: v })} />
              <ToggleRow label="💬 Chat" checked={qv.socialActions.chat} onChange={v => setSocial({ chat: v })} />
              <ToggleRow label="🔗 Compartilhar" checked={qv.socialActions.share} onChange={v => setSocial({ share: v })} />
              <ToggleRow label="📱 WhatsApp" checked={qv.socialActions.whatsapp} onChange={v => setSocial({ whatsapp: v })} />
            </>
          )}

          <SectionDivider label="Produtos Relacionados" />
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
            Carrossel de produtos similares na parte inferior do Quick View.
          </p>
          <ToggleRow label="Exibir relacionados" hint="Mostra um carrossel de produtos da mesma categoria" checked={qv.showRelatedProducts} onChange={v => set({ showRelatedProducts: v })} />
          {qv.showRelatedProducts && (
            <>
              <TextField label="Título da seção" value={qv.relatedTitle} onChange={v => set({ relatedTitle: v })} />
              <NumberSlider label="Quantidade de produtos" value={qv.relatedCount} onChange={v => set({ relatedCount: v })} min={2} max={12} />
            </>
          )}
        </>
      )}
    </EditorSection>
  );
}
