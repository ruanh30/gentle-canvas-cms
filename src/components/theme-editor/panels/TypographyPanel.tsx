import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, FontPicker, NumberSlider, SectionDivider } from '../EditorControls';
import { Type } from 'lucide-react';

export function TypographyPanel() {
  const { draft, updateDraftSection } = useTheme();
  const t = draft.typography;
  const set = (u: Partial<typeof t>) => updateDraftSection('typography', u);

  return (
    <EditorSection icon={Type} title="Tipografia" description="Configure as fontes, tamanhos e espaçamentos de texto em toda a loja">
      <SectionDivider label="Fontes" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Escolha a fonte dos títulos (H1, H2, H3...) e a fonte do corpo de texto (parágrafos, botões, menus).
      </p>
      <FontPicker label="Fonte dos títulos" value={t.headingFont} onChange={v => set({ headingFont: v })} type="heading" />
      <FontPicker label="Fonte do corpo" value={t.bodyFont} onChange={v => set({ bodyFont: v })} type="body" />

      <SectionDivider label="Tamanhos e Pesos" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Ajuste o tamanho base do texto e o peso (espessura) das fontes de título e corpo.
      </p>
      <NumberSlider label="Tamanho base" value={t.baseFontSize} onChange={v => set({ baseFontSize: v })} min={12} max={20} suffix="px" />
      <NumberSlider label="Peso dos títulos" value={t.headingWeight} onChange={v => set({ headingWeight: v })} min={300} max={900} step={100} />
      <NumberSlider label="Peso do corpo" value={t.bodyWeight} onChange={v => set({ bodyWeight: v })} min={300} max={700} step={100} />

      <SectionDivider label="Espaçamento" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Controla a altura entre linhas e o espaço entre letras para melhor legibilidade.
      </p>
      <NumberSlider label="Altura da linha" value={t.lineHeight} onChange={v => set({ lineHeight: v })} min={1} max={2} step={0.05} />
      <NumberSlider label="Espaço entre letras" value={t.letterSpacing} onChange={v => set({ letterSpacing: v })} min={-0.05} max={0.2} step={0.01} suffix="em" />

      <SectionDivider label="Preview" />
      <div className="p-3 bg-secondary/30 rounded-lg border border-border/30 space-y-2">
        <p className="text-xl font-bold" style={{ fontFamily: t.headingFont, fontWeight: t.headingWeight }}>Título de exemplo</p>
        <p className="text-sm" style={{ fontFamily: t.bodyFont, fontWeight: t.bodyWeight, lineHeight: t.lineHeight, letterSpacing: `${t.letterSpacing}em` }}>
          Este é um texto de corpo para visualizar como fica a tipografia selecionada na sua loja.
        </p>
      </div>
    </EditorSection>
  );
}
