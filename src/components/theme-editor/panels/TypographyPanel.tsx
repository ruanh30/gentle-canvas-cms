import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, FontPicker, NumberSlider, SectionDivider } from '../EditorControls';
import { Type } from 'lucide-react';

export function TypographyPanel() {
  const { draft, updateDraftSection } = useTheme();
  const t = draft.typography;
  const set = (u: Partial<typeof t>) => updateDraftSection('typography', u);

  return (
    <EditorSection icon={Type} title="Tipografia" description="Fontes, tamanhos e espaçamentos">
      <FontPicker label="Fonte dos títulos" value={t.headingFont} onChange={v => set({ headingFont: v })} type="heading" />
      <FontPicker label="Fonte do corpo" value={t.bodyFont} onChange={v => set({ bodyFont: v })} type="body" />
      <SectionDivider label="Ajustes" />
      <NumberSlider label="Tamanho base" value={t.baseFontSize} onChange={v => set({ baseFontSize: v })} min={12} max={20} suffix="px" />
      <NumberSlider label="Peso dos títulos" value={t.headingWeight} onChange={v => set({ headingWeight: v })} min={300} max={900} step={100} />
      <NumberSlider label="Peso do corpo" value={t.bodyWeight} onChange={v => set({ bodyWeight: v })} min={300} max={700} step={100} />
      <NumberSlider label="Altura da linha" value={t.lineHeight} onChange={v => set({ lineHeight: v })} min={1} max={2} step={0.05} />
      <NumberSlider label="Espaço entre letras" value={t.letterSpacing} onChange={v => set({ letterSpacing: v })} min={-0.05} max={0.2} step={0.01} suffix="em" />
      <SectionDivider label="Preview" />
      <div className="p-3 bg-secondary rounded-lg space-y-2">
        <p className="text-xl font-bold" style={{ fontFamily: t.headingFont, fontWeight: t.headingWeight }}>Título de exemplo</p>
        <p className="text-sm" style={{ fontFamily: t.bodyFont, fontWeight: t.bodyWeight, lineHeight: t.lineHeight, letterSpacing: `${t.letterSpacing}em` }}>
          Este é um texto de corpo para visualizar como fica a tipografia selecionada.
        </p>
      </div>
    </EditorSection>
  );
}
