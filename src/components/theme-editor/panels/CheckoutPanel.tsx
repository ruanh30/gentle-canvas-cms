import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, SelectField, TextField, OptionPicker, SectionDivider } from '../EditorControls';
import { CreditCard } from 'lucide-react';

export function CheckoutPanel() {
  const { draft, updateDraftSection } = useTheme();
  const c = draft.checkout;
  const set = (u: Partial<typeof c>) => updateDraftSection('checkout', u);

  return (
    <EditorSection icon={CreditCard} title="Checkout" description="Configurações da página de finalização">
      <OptionPicker label="Layout" value={c.layout} onChange={v => set({ layout: v })} options={[
        { value: 'one-column', label: '1 Coluna' }, { value: 'two-columns', label: '2 Colunas' },
      ]} />
      <SelectField label="Estilo dos passos" value={c.stepsStyle} onChange={v => set({ stepsStyle: v })} options={[
        { value: 'numbered', label: 'Numerados' }, { value: 'progress-bar', label: 'Barra de progresso' }, { value: 'tabs', label: 'Abas' },
      ]} />
      <SectionDivider label="Funcionalidades" />
      <ToggleRow label="Resumo do pedido" checked={c.showOrderSummary} onChange={v => set({ showOrderSummary: v })} />
      <ToggleRow label="Campo de cupom" checked={c.showCouponField} onChange={v => set({ showCouponField: v })} />
      <ToggleRow label="Selos de confiança" checked={c.showTrustBadges} onChange={v => set({ showTrustBadges: v })} />
      <ToggleRow label="Aceitar termos" checked={c.termsRequired} onChange={v => set({ termsRequired: v })} />
      {c.termsRequired && <TextField label="Texto dos termos" value={c.termsText} onChange={v => set({ termsText: v })} />}

      <SectionDivider label="Sucesso" />
      <TextField label="Título" value={c.successTitle} onChange={v => set({ successTitle: v })} />
      <TextField label="Mensagem" value={c.successMessage} onChange={v => set({ successMessage: v })} multiline />
      <ToggleRow label="Confetti 🎉" checked={c.showConfetti} onChange={v => set({ showConfetti: v })} />
    </EditorSection>
  );
}
