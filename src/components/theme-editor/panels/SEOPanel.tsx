import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, TextField, ToggleRow, SectionDivider } from '../EditorControls';
import { Globe } from 'lucide-react';

export function SEOPanel() {
  const { draft, updateDraftSection } = useTheme();
  const s = draft.seo;
  const set = (u: Partial<typeof s>) => updateDraftSection('seo', u);

  return (
    <EditorSection icon={Globe} title="SEO" description="Otimização para mecanismos de busca">
      <TextField label="Template do título" value={s.titleTemplate} onChange={v => set({ titleTemplate: v })} placeholder="{page} | {storeName}" />
      <p className="text-[10px] text-muted-foreground">Use {'{page}'} e {'{storeName}'} como variáveis</p>
      <TextField label="Descrição padrão" value={s.defaultDescription} onChange={v => set({ defaultDescription: v })} multiline />
      <TextField label="OG Image URL" value={s.ogImage} onChange={v => set({ ogImage: v })} placeholder="https://..." />
      <ToggleRow label="Breadcrumbs" checked={s.showBreadcrumbs} onChange={v => set({ showBreadcrumbs: v })} />
    </EditorSection>
  );
}
