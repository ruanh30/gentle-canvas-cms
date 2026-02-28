import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, SelectField, TextField, OptionPicker, SectionDivider } from '../EditorControls';
import { CreditCard } from 'lucide-react';

export function CheckoutPanel() {
  const { draft, updateDraftSection } = useTheme();
  const c = draft.checkout;
  const set = (u: Partial<typeof c>) => updateDraftSection('checkout', u);

  return (
    <EditorSection icon={CreditCard} title="Checkout" description="Configure o layout, passos e funcionalidades da página de finalização de compra">
      <SectionDivider label="Layout e Passos" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Estrutura visual da página de checkout e como os passos são apresentados.
      </p>
      <OptionPicker label="Layout do checkout" value={c.layout} onChange={v => set({ layout: v })} options={[
        { value: 'one-column', label: '1 Coluna', description: 'Formulário em coluna única, mais simples' },
        { value: 'two-columns', label: '2 Colunas', description: 'Formulário à esquerda, resumo à direita' },
      ]} />
      <SelectField label="Estilo dos passos" value={c.stepsStyle} onChange={v => set({ stepsStyle: v })} options={[
        { value: 'numbered', label: 'Numerados — passos com números (1, 2, 3)' },
        { value: 'progress-bar', label: 'Barra de progresso — indicador contínuo' },
        { value: 'tabs', label: 'Abas — navegação entre etapas' },
      ]} />

      <SectionDivider label="Funcionalidades" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Recursos adicionais exibidos durante a finalização da compra.
      </p>
      <ToggleRow label="Resumo do pedido" hint="Exibe um painel lateral ou seção com os itens, subtotal e total do pedido" checked={c.showOrderSummary} onChange={v => set({ showOrderSummary: v })} />
      <ToggleRow label="Campo de cupom" hint="Permite que o cliente aplique um código de desconto durante o checkout" checked={c.showCouponField} onChange={v => set({ showCouponField: v })} />
      <ToggleRow label="Selos de confiança" hint="Exibe badges de segurança (SSL, Compra Segura, etc) para transmitir confiança" checked={c.showTrustBadges} onChange={v => set({ showTrustBadges: v })} />
      <ToggleRow label="Aceitar termos de uso" hint="Exige que o cliente aceite os termos e condições antes de finalizar a compra" checked={c.termsRequired} onChange={v => set({ termsRequired: v })} />
      {c.termsRequired && <TextField label="Texto dos termos" value={c.termsText} onChange={v => set({ termsText: v })} />}

      <SectionDivider label="Página de Sucesso" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Mensagem e efeitos exibidos após a compra ser finalizada com sucesso.
      </p>
      <TextField label="Título de sucesso" value={c.successTitle} onChange={v => set({ successTitle: v })} />
      <TextField label="Mensagem de sucesso" value={c.successMessage} onChange={v => set({ successMessage: v })} multiline />
      <ToggleRow label="Animação de confetti 🎉" hint="Exibe uma chuva de confetti colorido ao completar a compra, celebrando o pedido" checked={c.showConfetti} onChange={v => set({ showConfetti: v })} />
    </EditorSection>
  );
}
