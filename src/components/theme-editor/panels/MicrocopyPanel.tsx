import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, TextField, SectionDivider } from '../EditorControls';
import { Type } from 'lucide-react';

export function MicrocopyPanel() {
  const { draft, updateDraftSection } = useTheme();
  const m = draft.microcopy ?? {} as any;
  const set = (u: Partial<typeof m>) => updateDraftSection('microcopy', u as any);

  return (
    <EditorSection icon={Type} title="Textos do Tema (Microcopy)" description="Personalize todos os textos padrão da loja: botões, mensagens, labels e placeholders">
      <SectionDivider label="Botões" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Textos exibidos nos botões de ação em toda a loja.
      </p>
      <TextField label="Botão Comprar" value={m.buyButton || ''} onChange={v => set({ buyButton: v })} placeholder="Comprar Agora" />
      <TextField label="Botão Adicionar ao Carrinho" value={m.addToCartButton || ''} onChange={v => set({ addToCartButton: v })} placeholder="Adicionar ao Carrinho" />
      <TextField label="Botão Finalizar Compra" value={m.checkoutButton || ''} onChange={v => set({ checkoutButton: v })} placeholder="Finalizar Compra" />
      <TextField label="Botão Continuar Comprando" value={m.continueShoppingButton || ''} onChange={v => set({ continueShoppingButton: v })} placeholder="Continuar Comprando" />

      <SectionDivider label="Estoque" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Mensagens exibidas sobre disponibilidade de estoque. Use {'{count}'} para o número.
      </p>
      <TextField label="Sem estoque" value={m.outOfStockMessage || ''} onChange={v => set({ outOfStockMessage: v })} placeholder="Produto indisponível" />
      <TextField label="Estoque baixo" value={m.lowStockMessage || ''} onChange={v => set({ lowStockMessage: v })} placeholder="Restam {count} unidades" />

      <SectionDivider label="Frete e Cupom" />
      <TextField label="Frete grátis" value={m.freeShippingMessage || ''} onChange={v => set({ freeShippingMessage: v })} placeholder="Frete grátis acima de R$ {value}" />
      <TextField label="Label calcular frete" value={m.shippingEstimateLabel || ''} onChange={v => set({ shippingEstimateLabel: v })} placeholder="Calcular frete" />
      <TextField label="Placeholder cupom" value={m.couponPlaceholder || ''} onChange={v => set({ couponPlaceholder: v })} placeholder="Código do cupom" />
      <TextField label="Botão aplicar cupom" value={m.couponApplyButton || ''} onChange={v => set({ couponApplyButton: v })} placeholder="Aplicar" />
      <TextField label="Erro de cupom" value={m.couponErrorMessage || ''} onChange={v => set({ couponErrorMessage: v })} placeholder="Cupom inválido ou expirado" />

      <SectionDivider label="Variações" />
      <TextField label="Label de Cor" value={m.variationColorLabel || ''} onChange={v => set({ variationColorLabel: v })} placeholder="Cor" />
      <TextField label="Label de Tamanho" value={m.variationSizeLabel || ''} onChange={v => set({ variationSizeLabel: v })} placeholder="Tamanho" />

      <SectionDivider label="Busca" />
      <TextField label="Placeholder de busca" value={m.searchPlaceholder || ''} onChange={v => set({ searchPlaceholder: v })} placeholder="Buscar produtos..." />
      <TextField label="Busca sem resultados" value={m.emptySearchMessage || ''} onChange={v => set({ emptySearchMessage: v })} placeholder="Nenhum produto encontrado" />

      <SectionDivider label="Outros" />
      <TextField label="Título de relacionados" value={m.relatedProductsTitle || ''} onChange={v => set({ relatedProductsTitle: v })} placeholder="Você também pode gostar" />
      <TextField label="Erro no checkout" value={m.checkoutErrorMessage || ''} onChange={v => set({ checkoutErrorMessage: v })} placeholder="Erro ao processar. Tente novamente." />
    </EditorSection>
  );
}
