import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, SelectField, TextField, OptionPicker, SectionDivider } from '../EditorControls';
import { ShoppingBag } from 'lucide-react';

export function ProductPagePanel() {
  const { draft, updateDraftSection } = useTheme();
  const p = draft.productPage;
  const set = (u: Partial<typeof p>) => updateDraftSection('productPage', u);

  return (
    <EditorSection icon={ShoppingBag} title="Página de Produto" description="Configure o layout e funcionalidades da página de detalhe do produto (PDP)">
      <SectionDivider label="Galeria de Imagens" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Define como as fotos do produto são exibidas na página de detalhe.
      </p>
      <SelectField label="Layout da galeria" value={p.galleryLayout} onChange={v => set({ galleryLayout: v })} options={[
        { value: 'side-by-side', label: 'Lado a lado — imagem e info na mesma linha' },
        { value: 'slider', label: 'Slider — carrossel horizontal de fotos' },
        { value: 'grid', label: 'Grade — todas as fotos em grid' },
        { value: 'vertical-thumbs', label: 'Thumbs verticais — miniaturas ao lado' },
      ]} />
      <OptionPicker label="Posição da galeria" value={p.galleryPosition} onChange={v => set({ galleryPosition: v })} options={[
        { value: 'left', label: 'Esquerda', description: 'Imagens à esquerda, info à direita' },
        { value: 'right', label: 'Direita', description: 'Imagens à direita, info à esquerda' },
      ]} />
      <ToggleRow label="Zoom na imagem" hint="Permite ampliar a imagem ao passar o mouse ou tocar, para ver detalhes do produto" checked={p.imageZoom} onChange={v => set({ imageZoom: v })} />
      <ToggleRow label="Galeria fixa (sticky)" hint="A galeria acompanha a rolagem da página, ficando visível enquanto o usuário lê as informações" checked={p.stickyGallery} onChange={v => set({ stickyGallery: v })} />

      <SectionDivider label="Informações do Produto" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Controle quais informações são exibidas na página do produto.
      </p>
      <ToggleRow label="Breadcrumb" hint="Mostra o caminho de navegação no topo (ex: Home > Camisetas > Produto)" checked={p.showBreadcrumb} onChange={v => set({ showBreadcrumb: v })} />
      <ToggleRow label="Código SKU" hint="Exibe o código de referência do produto (útil para lojas com estoque)" checked={p.showSKU} onChange={v => set({ showSKU: v })} />
      <ToggleRow label="Marca" hint="Mostra o nome do fabricante/marca do produto" checked={p.showBrand} onChange={v => set({ showBrand: v })} />
      <ToggleRow label="Avaliação" hint="Exibe estrelas de avaliação e quantidade de reviews dos clientes" checked={p.showRating} onChange={v => set({ showRating: v })} />
      <ToggleRow label="Estoque disponível" hint="Mostra a quantidade de unidades disponíveis em estoque" checked={p.showStock} onChange={v => set({ showStock: v })} />
      <ToggleRow label="Botões de compartilhar" hint="Exibe ícones para compartilhar o produto em redes sociais (WhatsApp, Facebook, etc)" checked={p.showShareButtons} onChange={v => set({ showShareButtons: v })} />

      <SectionDivider label="Variações e Quantidade" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Como o cliente seleciona tamanho, cor e quantidade do produto.
      </p>
      <SelectField label="Seletor de variação" value={p.variantStyle} onChange={v => set({ variantStyle: v })} options={[
        { value: 'dropdown', label: 'Dropdown — menu suspenso' },
        { value: 'buttons', label: 'Botões — opções clicáveis lado a lado' },
        { value: 'swatches', label: 'Swatches — amostras visuais de cor/textura' },
      ]} />
      <SelectField label="Seletor de quantidade" value={p.quantityStyle} onChange={v => set({ quantityStyle: v })} options={[
        { value: 'input', label: 'Campo numérico — o cliente digita a quantidade' },
        { value: 'stepper', label: 'Stepper (+/-) — botões para incrementar/decrementar' },
      ]} />

      <SectionDivider label="Botão de Compra (CTA)" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Layout e comportamento dos botões "Comprar" e "Adicionar ao Carrinho" na página do produto.
      </p>
      <OptionPicker label="Layout do CTA" value={p.ctaLayout} onChange={v => set({ ctaLayout: v })} options={[
        { value: 'stacked', label: 'Empilhado', description: 'Botões um abaixo do outro' },
        { value: 'side-by-side', label: 'Lado a lado', description: 'Botões na mesma linha' },
      ]} />
      <ToggleRow label="CTA fixo no mobile" hint="O botão de compra fica fixo na parte inferior da tela em dispositivos móveis" checked={p.ctaStickyMobile} onChange={v => set({ ctaStickyMobile: v })} />

      <SectionDivider label="Confiança e Extras" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Elementos que aumentam a confiança do cliente e facilitam a decisão de compra.
      </p>
      <ToggleRow label="Selos de confiança" hint="Exibe badges como 'Compra Segura', 'Troca Grátis' e 'Frete Rápido' abaixo do botão de compra" checked={p.showTrustBadges} onChange={v => set({ showTrustBadges: v })} />
      
      <ToggleRow label="Estimativa de frete" hint="Permite que o cliente insira o CEP e veja o prazo e custo de entrega" checked={p.shippingEstimate} onChange={v => set({ shippingEstimate: v })} />

      <SectionDivider label="Conteúdo Adicional" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Seções extras abaixo da área principal do produto.
      </p>
      <SelectField label="Estilo do conteúdo" value={p.tabsStyle} onChange={v => set({ tabsStyle: v })} options={[
        { value: 'tabs', label: 'Abas — alterna entre descrição, avaliações, etc' },
        { value: 'accordion', label: 'Accordion — seções expansíveis' },
        { value: 'inline', label: 'Inline — tudo visível em sequência' },
      ]} />
      <ToggleRow label="Produtos relacionados" hint="Exibe uma seção com produtos similares ou complementares ao final da página" checked={p.showRelated} onChange={v => set({ showRelated: v })} />
      {p.showRelated && <TextField label="Título da seção" value={p.relatedTitle} onChange={v => set({ relatedTitle: v })} />}
      <ToggleRow label="Vistos recentemente" hint="Exibe os últimos produtos que o cliente visualizou para facilitar a navegação" checked={p.showRecentlyViewed} onChange={v => set({ showRecentlyViewed: v })} />
    </EditorSection>
  );
}
