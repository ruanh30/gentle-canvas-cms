import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, TextField, ColorInput, SelectField, SectionDivider } from '../EditorControls';
import { PanelBottom } from 'lucide-react';

export function FooterPanel() {
  const { draft, updateDraftSection } = useTheme();
  const f = draft.footer;
  const set = (u: Partial<typeof f>) => updateDraftSection('footer', u);

  return (
    <EditorSection icon={PanelBottom} title="Rodapé" description="Colunas, links, newsletter e redes sociais">
      <SelectField label="Layout" value={f.layout} onChange={v => set({ layout: v })} options={[
        { value: '4-columns', label: '4 Colunas' }, { value: '3-columns', label: '3 Colunas' },
        { value: '2-columns', label: '2 Colunas' }, { value: 'simple', label: 'Simples' }, { value: 'centered', label: 'Centralizado' },
      ]} />
      <div className="grid grid-cols-2 gap-3">
        <ColorInput label="Fundo" value={f.backgroundColor} onChange={v => set({ backgroundColor: v })} />
        <ColorInput label="Texto" value={f.textColor} onChange={v => set({ textColor: v })} />
      </div>

      <SectionDivider label="Colunas" />
      {f.columns.map((col, idx) => (
        <ToggleRow key={idx} label={col.title} description={`${col.links.length} links`} checked={col.enabled} onChange={v => {
          const cols = [...f.columns];
          cols[idx] = { ...cols[idx], enabled: v };
          set({ columns: cols });
        }} />
      ))}

      <SectionDivider label="Newsletter" />
      <ToggleRow label="Newsletter" checked={f.showNewsletter} onChange={v => set({ showNewsletter: v })} />
      {f.showNewsletter && (
        <>
          <TextField label="Título" value={f.newsletterTitle} onChange={v => set({ newsletterTitle: v })} />
          <TextField label="Descrição" value={f.newsletterDescription} onChange={v => set({ newsletterDescription: v })} />
        </>
      )}

      <SectionDivider label="Extras" />
      <ToggleRow label="Redes sociais" checked={f.showSocial} onChange={v => set({ showSocial: v })} />
      <ToggleRow label="Ícones de pagamento" checked={f.showPaymentIcons} onChange={v => set({ showPaymentIcons: v })} />
      <ToggleRow label="Selos de confiança" checked={f.showTrustSeals} onChange={v => set({ showTrustSeals: v })} />
      <ToggleRow label="Voltar ao topo" checked={f.showBackToTop} onChange={v => set({ showBackToTop: v })} />
      <TextField label="Copyright" value={f.copyrightText} onChange={v => set({ copyrightText: v })} />
    </EditorSection>
  );
}
