import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, TextField, ColorInput, SelectField, SectionDivider } from '../EditorControls';
import { PanelBottom } from 'lucide-react';

export function FooterPanel() {
  const { draft, updateDraftSection } = useTheme();
  const f = draft.footer;
  const set = (u: Partial<typeof f>) => updateDraftSection('footer', u);

  return (
    <EditorSection icon={PanelBottom} title="Rodapé" description="Configure as colunas, links, newsletter e redes sociais do rodapé da loja">
      <SectionDivider label="Layout e Cores" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Estrutura de colunas e cores de fundo do rodapé.
      </p>
      <SelectField label="Layout do rodapé" value={f.layout} onChange={v => set({ layout: v })} options={[
        { value: '4-columns', label: '4 Colunas — layout completo com todos os links' },
        { value: '3-columns', label: '3 Colunas — layout equilibrado' },
        { value: '2-columns', label: '2 Colunas — layout compacto' },
        { value: 'simple', label: 'Simples — apenas links e copyright' },
        { value: 'centered', label: 'Centralizado — tudo alinhado ao centro' },
      ]} />
      <div className="grid grid-cols-2 gap-3">
        <ColorInput label="Cor do fundo" value={f.backgroundColor} onChange={v => set({ backgroundColor: v })} />
        <ColorInput label="Cor do texto" value={f.textColor} onChange={v => set({ textColor: v })} />
      </div>

      <SectionDivider label="Colunas de Links" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Ative ou desative cada coluna de links do rodapé. Cada coluna possui título e links editáveis.
      </p>
      {f.columns.map((col, idx) => (
        <ToggleRow key={idx} label={col.title} hint={`Exibe a coluna "${col.title}" com ${col.links.length} links no rodapé`} checked={col.enabled} onChange={v => {
          const cols = [...f.columns];
          cols[idx] = { ...cols[idx], enabled: v };
          set({ columns: cols });
        }} />
      ))}

      <SectionDivider label="Newsletter" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Formulário de captura de email para enviar novidades e promoções ao cliente.
      </p>
      <ToggleRow label="Formulário de newsletter" hint="Exibe um campo de email no rodapé para o visitante se inscrever e receber novidades" checked={f.showNewsletter} onChange={v => set({ showNewsletter: v })} />
      {f.showNewsletter && (
        <>
          <TextField label="Título" value={f.newsletterTitle} onChange={v => set({ newsletterTitle: v })} />
          <TextField label="Descrição" value={f.newsletterDescription} onChange={v => set({ newsletterDescription: v })} />
        </>
      )}

      <SectionDivider label="Extras" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Elementos adicionais exibidos no rodapé da loja.
      </p>
      <ToggleRow label="Redes sociais" hint="Exibe ícones de redes sociais (Instagram, Facebook, etc) com links para os perfis da loja" checked={f.showSocial} onChange={v => set({ showSocial: v })} />
      <ToggleRow label="Ícones de pagamento" hint="Exibe logos das bandeiras de cartão e métodos de pagamento aceitos (Visa, Mastercard, Pix, etc)" checked={f.showPaymentIcons} onChange={v => set({ showPaymentIcons: v })} />
      <ToggleRow label="Selos de confiança" hint="Exibe selos como Google Safe Browsing, Reclame Aqui, etc para transmitir credibilidade" checked={f.showTrustSeals} onChange={v => set({ showTrustSeals: v })} />
      <ToggleRow label="Botão voltar ao topo" hint="Exibe um botão flutuante para rolar rapidamente ao topo da página" checked={f.showBackToTop} onChange={v => set({ showBackToTop: v })} />
      <TextField label="Texto de copyright" value={f.copyrightText} onChange={v => set({ copyrightText: v })} />
    </EditorSection>
  );
}
