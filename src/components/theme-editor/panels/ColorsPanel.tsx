import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { ColorInput, EditorSection, SectionDivider } from '../EditorControls';
import { Palette } from 'lucide-react';

export function ColorsPanel() {
  const { draft, updateDraftSection } = useTheme();
  const c = draft.colors;
  const set = (updates: Partial<typeof c>) => updateDraftSection('colors', updates);

  return (
    <EditorSection icon={Palette} title="Paleta de Cores" description="Defina todas as cores da sua loja">
      <SectionDivider label="Principais" />
      <div className="grid grid-cols-2 gap-3">
        <ColorInput label="Primária" value={c.primary} onChange={v => set({ primary: v })} />
        <ColorInput label="Texto sobre primária" value={c.primaryForeground} onChange={v => set({ primaryForeground: v })} />
        <ColorInput label="Secundária" value={c.secondary} onChange={v => set({ secondary: v })} />
        <ColorInput label="Texto sobre secundária" value={c.secondaryForeground} onChange={v => set({ secondaryForeground: v })} />
      </div>
      <SectionDivider label="Superfícies" />
      <div className="grid grid-cols-2 gap-3">
        <ColorInput label="Fundo" value={c.background} onChange={v => set({ background: v })} />
        <ColorInput label="Texto" value={c.foreground} onChange={v => set({ foreground: v })} />
        <ColorInput label="Destaque" value={c.accent} onChange={v => set({ accent: v })} />
        <ColorInput label="Texto destaque" value={c.accentForeground} onChange={v => set({ accentForeground: v })} />
        <ColorInput label="Suave (muted)" value={c.muted} onChange={v => set({ muted: v })} />
        <ColorInput label="Texto suave" value={c.mutedForeground} onChange={v => set({ mutedForeground: v })} />
        <ColorInput label="Bordas" value={c.border} onChange={v => set({ border: v })} />
      </div>
      <SectionDivider label="Status" />
      <div className="grid grid-cols-2 gap-3">
        <ColorInput label="Sucesso" value={c.success} onChange={v => set({ success: v })} />
        <ColorInput label="Alerta" value={c.warning} onChange={v => set({ warning: v })} />
        <ColorInput label="Erro" value={c.error} onChange={v => set({ error: v })} />
      </div>
      <SectionDivider label="Ação de Compra" />
      <div className="grid grid-cols-2 gap-3">
        <ColorInput label="Botão Comprar" value={c.buyNow} onChange={v => set({ buyNow: v })} />
        <ColorInput label="Hover Comprar" value={c.buyNowHover} onChange={v => set({ buyNowHover: v })} />
      </div>
    </EditorSection>
  );
}
