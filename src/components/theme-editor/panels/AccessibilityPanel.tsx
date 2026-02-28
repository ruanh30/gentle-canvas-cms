import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, NumberSlider, SectionDivider } from '../EditorControls';
import { Accessibility } from 'lucide-react';

export function AccessibilityPanel() {
  const { draft, updateDraftSection } = useTheme();
  const a = draft.accessibility;
  const set = (u: Partial<typeof a>) => updateDraftSection('accessibility', u);

  return (
    <EditorSection icon={Accessibility} title="Acessibilidade" description="Garanta que sua loja seja acessível para todos os visitantes, incluindo pessoas com deficiência">
      <SectionDivider label="Contraste" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Taxa mínima de contraste entre texto e fundo. O WCAG recomenda pelo menos 4.5:1 para texto normal e 3:1 para texto grande.
      </p>
      <NumberSlider label="Contraste mínimo" value={a.minContrastRatio} onChange={v => set({ minContrastRatio: v })} min={3} max={7} step={0.5} suffix=":1" />

      <SectionDivider label="Navegação por Teclado" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Indicadores visuais para usuários que navegam usando teclado (Tab, Enter, etc). Essencial para acessibilidade.
      </p>
      <ToggleRow label="Anel de foco visível" hint="Exibe uma borda colorida ao redor de botões, links e campos quando navegados pelo teclado. Desativar prejudica a acessibilidade" checked={a.focusVisible} onChange={v => set({ focusVisible: v })} />

      <SectionDivider label="Toque e Interação" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Tamanho mínimo dos alvos de toque em dispositivos móveis. O recomendado pelo WCAG é 44px ou mais para garantir que todos consigam interagir.
      </p>
      <NumberSlider label="Área mín. de toque" value={a.minTouchTarget} onChange={v => set({ minTouchTarget: v })} min={32} max={56} step={4} suffix="px" />

      <SectionDivider label="Movimento e Animação" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Respeita a preferência do sistema operacional do usuário por menos movimento. Importante para pessoas com sensibilidade a animações.
      </p>
      <ToggleRow label="Respeitar 'reduced motion'" hint="Quando ativado, desabilita animações automaticamente para visitantes que configuraram 'reduzir movimento' no sistema operacional (iOS, Android, Windows, macOS)" checked={a.reducedMotion} onChange={v => set({ reducedMotion: v })} />

      <SectionDivider label="Dicas" />
      <div className="p-3 bg-secondary/30 rounded-lg border border-border/30 space-y-1.5">
        <p className="text-[10px] text-muted-foreground/70 leading-relaxed">
          💡 <strong>Contraste:</strong> Textos pequenos precisam de contraste 4.5:1. Textos grandes (18px+) precisam de 3:1.
        </p>
        <p className="text-[10px] text-muted-foreground/70 leading-relaxed">
          💡 <strong>Foco:</strong> Nunca desative o anel de foco se sua loja precisa atender WCAG 2.1 AA.
        </p>
        <p className="text-[10px] text-muted-foreground/70 leading-relaxed">
          💡 <strong>Toque:</strong> Botões menores que 44px são difíceis de acertar em celulares.
        </p>
      </div>
    </EditorSection>
  );
}
