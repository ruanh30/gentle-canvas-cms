import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, FontPicker, NumberSlider, SectionDivider } from '../EditorControls';
import { Type, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TypographyPanel() {
  const { draft, updateDraftSection } = useTheme();
  const t = draft.typography;
  const set = (u: Partial<typeof t>) => updateDraftSection('typography', u);
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <EditorSection icon={Type} title="Tipografia" description="Configure as fontes e tamanhos de texto da loja">
      <SectionDivider label="Fonte dos títulos" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Usada em títulos de seção, nome de produtos e destaques.
      </p>
      <FontPicker label="Fonte" value={t.headingFont} onChange={v => set({ headingFont: v })} type="heading" />
      <NumberSlider
        label="Escala dos títulos"
        value={t.headingScale ?? 100}
        onChange={v => set({ headingScale: v })}
        min={75}
        max={150}
        step={5}
        suffix="%"
      />

      <SectionDivider label="Fonte do corpo" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Usada em descrições, menus, botões e textos gerais.
      </p>
      <FontPicker label="Fonte" value={t.bodyFont} onChange={v => set({ bodyFont: v })} type="body" />
      <NumberSlider
        label="Escala do corpo"
        value={t.bodyScale ?? 100}
        onChange={v => set({ bodyScale: v })}
        min={75}
        max={150}
        step={5}
        suffix="%"
      />

      {/* Live preview */}
      <SectionDivider label="Preview" />
      <div className="p-4 bg-secondary/30 rounded-lg border border-border/30 space-y-3">
        <p
          className="text-2xl leading-tight"
          style={{
            fontFamily: `'${t.headingFont}', serif`,
            fontWeight: t.headingWeight,
            fontSize: `${24 * ((t.headingScale ?? 100) / 100)}px`,
            lineHeight: t.headingLineHeight ?? 1.2,
          }}
        >
          Título principal
        </p>
        <p
          className="text-lg leading-tight"
          style={{
            fontFamily: `'${t.headingFont}', serif`,
            fontWeight: Math.min(t.headingWeight, 600),
            fontSize: `${18 * ((t.headingScale ?? 100) / 100)}px`,
          }}
        >
          Subtítulo da seção
        </p>
        <p
          className="leading-relaxed text-muted-foreground"
          style={{
            fontFamily: `'${t.bodyFont}', sans-serif`,
            fontWeight: t.bodyWeight,
            fontSize: `${14 * ((t.bodyScale ?? 100) / 100)}px`,
            lineHeight: t.lineHeight,
            letterSpacing: `${t.letterSpacing}em`,
          }}
        >
          Este é um texto de corpo para visualizar como fica a tipografia selecionada na sua loja. Aqui mostra legibilidade e espaçamento.
        </p>
        <p
          className="font-bold"
          style={{
            fontFamily: `'${t.bodyFont}', sans-serif`,
            fontSize: `${16 * ((t.bodyScale ?? 100) / 100)}px`,
          }}
        >
          R$ 149,90
        </p>
      </div>

      {/* Advanced section (collapsible) */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full flex items-center gap-2 py-2.5 px-3 rounded-lg bg-secondary/30 border border-border/30 hover:bg-secondary/50 transition-colors"
      >
        {showAdvanced ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Avançado</span>
      </button>

      {showAdvanced && (
        <div className="space-y-4 pl-1">
          <NumberSlider label="Tamanho base (px)" value={t.baseFontSize} onChange={v => set({ baseFontSize: v })} min={12} max={20} suffix="px" />
          <NumberSlider label="Peso dos títulos" value={t.headingWeight} onChange={v => set({ headingWeight: v })} min={300} max={900} step={100} />
          <NumberSlider label="Peso do corpo" value={t.bodyWeight} onChange={v => set({ bodyWeight: v })} min={300} max={700} step={100} />
          <NumberSlider label="Altura da linha (títulos)" value={t.headingLineHeight ?? 1.2} onChange={v => set({ headingLineHeight: v })} min={0.8} max={1.8} step={0.05} />
          <NumberSlider label="Altura da linha (corpo)" value={t.lineHeight} onChange={v => set({ lineHeight: v })} min={1} max={2} step={0.05} />
          <NumberSlider label="Espaço entre letras" value={t.letterSpacing} onChange={v => set({ letterSpacing: v })} min={-0.05} max={0.2} step={0.01} suffix="em" />
        </div>
      )}
    </EditorSection>
  );
}
