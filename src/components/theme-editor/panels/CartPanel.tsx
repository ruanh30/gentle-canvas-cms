import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, SelectField, TextField, NumberSlider, SectionDivider } from '../EditorControls';
import { ShoppingBag } from 'lucide-react';

export function CartPanel() {
  const { draft, updateDraftSection } = useTheme();
  const c = draft.cart;
  const set = (u: Partial<typeof c>) => updateDraftSection('cart', u);

  return (
    <EditorSection icon={ShoppingBag} title="Carrinho" description="Configure o estilo, funcionalidades e textos do carrinho de compras da loja">
      <SectionDivider label="Estilo do Carrinho" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Define como o carrinho é exibido: em página própria, painel lateral ou dropdown.
      </p>
      <SelectField label="Tipo de exibição" value={c.style} onChange={v => set({ style: v })} options={[
        { value: 'page', label: 'Página inteira — abre em rota /cart' },
        { value: 'drawer', label: 'Drawer lateral — painel que desliza da direita' },
        { value: 'dropdown', label: 'Dropdown — mini carrinho sob o ícone' },
      ]} />

      <SectionDivider label="Funcionalidades" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Recursos adicionais disponíveis no carrinho de compras.
      </p>
      <ToggleRow label="Thumbnails dos produtos" hint="Exibe a miniatura da imagem de cada produto no carrinho" checked={c.showThumbnails} onChange={v => set({ showThumbnails: v })} />
      <ToggleRow label="Alterar quantidade" hint="Permite que o cliente altere a quantidade de cada item diretamente no carrinho" checked={c.showQuantity} onChange={v => set({ showQuantity: v })} />
      <ToggleRow label="Campo de cupom" hint="Exibe um campo para o cliente digitar um código de desconto/cupom" checked={c.showCoupon} onChange={v => set({ showCoupon: v })} />
      <ToggleRow label="Estimativa de frete" hint="Permite calcular o frete pelo CEP diretamente no carrinho, antes de ir ao checkout" checked={c.showShippingEstimate} onChange={v => set({ showShippingEstimate: v })} />
      <ToggleRow label="Continuar comprando" hint="Exibe um link/botão para voltar à loja e continuar adicionando produtos" checked={c.showContinueShopping} onChange={v => set({ showContinueShopping: v })} />

      <SectionDivider label="Barra de Frete Grátis" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Barra de progresso que mostra quanto falta para o cliente ganhar frete grátis.
      </p>
      <ToggleRow label="Ativar barra de frete grátis" hint="Exibe uma barra mostrando quanto falta para atingir o valor mínimo de frete grátis" checked={c.showFreeShippingBar} onChange={v => set({ showFreeShippingBar: v })} />
      {c.showFreeShippingBar && (
        <>
          <NumberSlider label="Valor mínimo (R$)" value={c.freeShippingThreshold} onChange={v => set({ freeShippingThreshold: v })} min={50} max={1000} step={10} suffix="" />
          <TextField label="Mensagem" value={c.freeShippingMessage} onChange={v => set({ freeShippingMessage: v })} />
        </>
      )}

      <SectionDivider label="Recomendações" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Seção de produtos sugeridos para aumentar o ticket médio.
      </p>
      <ToggleRow label="Mostrar recomendações" hint="Exibe produtos sugeridos no carrinho para incentivar compras adicionais" checked={c.showRecommendations} onChange={v => set({ showRecommendations: v })} />
      {c.showRecommendations && <TextField label="Título da seção" value={c.recommendationsTitle} onChange={v => set({ recommendationsTitle: v })} />}

      <SectionDivider label="Textos Personalizáveis" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Mensagens exibidas quando o carrinho está vazio.
      </p>
      <TextField label="Mensagem de carrinho vazio" value={c.emptyCartMessage} onChange={v => set({ emptyCartMessage: v })} />
      <TextField label="Texto do botão (carrinho vazio)" value={c.emptyCartCta} onChange={v => set({ emptyCartCta: v })} />
    </EditorSection>
  );
}
