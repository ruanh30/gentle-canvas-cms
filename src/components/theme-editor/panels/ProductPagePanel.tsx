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


      <SectionDivider label="Confiança e Extras" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Elementos que aumentam a confiança do cliente e facilitam a decisão de compra.
      </p>
      <ToggleRow label="Selos de confiança" hint="Exibe badges como 'Compra Segura', 'Troca Grátis' e 'Frete Rápido' abaixo do botão de compra" checked={p.showTrustBadges} onChange={v => set({ showTrustBadges: v })} />
      <ToggleRow label="Estimativa de frete" hint="Permite que o cliente insira o CEP e veja o prazo e custo de entrega" checked={p.shippingEstimate} onChange={v => set({ shippingEstimate: v })} />
    </EditorSection>
  );
}
