import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { ColorInput, EditorSection, SectionDivider } from '../EditorControls';
import { Palette } from 'lucide-react';

export function ColorsPanel() {
  const { draft, updateDraftSection } = useTheme();
  const c = draft.colors;
  const set = (updates: Partial<typeof c>) => updateDraftSection('colors', updates);

  return (
    <EditorSection icon={Palette} title="Paleta de Cores" description="Defina todas as cores da sua loja. As alterações se aplicam em tempo real no preview.">
      <SectionDivider label="Cores Principais" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Cores de identidade da marca. A primária é usada em botões, links e elementos de destaque.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <ColorInput label="Primária" value={c.primary} onChange={v => set({ primary: v })} />
        <ColorInput label="Texto sobre primária" value={c.primaryForeground} onChange={v => set({ primaryForeground: v })} />
        <ColorInput label="Secundária" value={c.secondary} onChange={v => set({ secondary: v })} />
        <ColorInput label="Texto sobre secundária" value={c.secondaryForeground} onChange={v => set({ secondaryForeground: v })} />
      </div>

      <SectionDivider label="Superfícies e Fundo" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Cores de fundo, texto principal, destaques e bordas que compõem a base visual.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <ColorInput label="Fundo da página" value={c.background} onChange={v => set({ background: v })} />
        <ColorInput label="Texto principal" value={c.foreground} onChange={v => set({ foreground: v })} />
        <ColorInput label="Destaque (accent)" value={c.accent} onChange={v => set({ accent: v })} />
        <ColorInput label="Texto destaque" value={c.accentForeground} onChange={v => set({ accentForeground: v })} />
        <ColorInput label="Fundo suave (muted)" value={c.muted} onChange={v => set({ muted: v })} />
        <ColorInput label="Texto suave" value={c.mutedForeground} onChange={v => set({ mutedForeground: v })} />
        <ColorInput label="Cor das bordas" value={c.border} onChange={v => set({ border: v })} />
      </div>

      <SectionDivider label="Cores de Status" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Cores para feedbacks visuais: confirmações, alertas e mensagens de erro.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <ColorInput label="Sucesso" value={c.success} onChange={v => set({ success: v })} />
        <ColorInput label="Alerta" value={c.warning} onChange={v => set({ warning: v })} />
        <ColorInput label="Erro" value={c.error} onChange={v => set({ error: v })} />
      </div>

      <SectionDivider label="Botão de Compra" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Cores específicas do botão "Comprar Agora" — o elemento mais importante para conversão.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <ColorInput label="Cor do botão" value={c.buyNow} onChange={v => set({ buyNow: v })} />
        <ColorInput label="Cor no hover" value={c.buyNowHover} onChange={v => set({ buyNowHover: v })} />
      </div>

      {/* Live preview */}
      <SectionDivider label="Preview da Paleta" />
      <div className="p-3 rounded-lg border border-border/30 space-y-2">
        <div className="flex gap-1.5">
          {[c.primary, c.secondary, c.accent, c.muted, c.background].map((color, i) => (
            <div key={i} className="flex-1 h-8 rounded-md border border-border/20 shadow-sm" style={{ backgroundColor: color }} />
          ))}
        </div>
        <div className="flex gap-1.5">
          {[c.success, c.warning, c.error, c.buyNow, c.foreground].map((color, i) => (
            <div key={i} className="flex-1 h-6 rounded-md border border-border/20" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>
    </EditorSection>
  );
}
