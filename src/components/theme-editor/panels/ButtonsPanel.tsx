import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, OptionPicker, NumberSlider, ToggleRow, SectionDivider } from '../EditorControls';
import { MousePointer } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ButtonsPanel() {
  const { draft, updateDraftSection } = useTheme();
  const b = draft.buttons;
  const set = (u: Partial<typeof b>) => updateDraftSection('buttons', u);

  return (
    <EditorSection icon={MousePointer} title="Botões" description="Personalize o estilo, tamanho e comportamento de todos os botões da loja">
      <SectionDivider label="Estilo Visual" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Define a aparência base de todos os botões. Afeta botões de navegação, formulários e ações.
      </p>
      <OptionPicker label="Estilo" value={b.style} onChange={v => set({ style: v })} options={[
        { value: 'filled', label: 'Sólido', description: 'Fundo preenchido com cor primária' },
        { value: 'outline', label: 'Contorno', description: 'Apenas borda, sem fundo' },
        { value: 'ghost', label: 'Fantasma', description: 'Sem fundo e sem borda' },
        { value: 'soft', label: 'Suave', description: 'Fundo translúcido e sutil' },
        { value: 'gradient', label: 'Gradiente', description: 'Fundo com efeito degradê' },
        { value: '3d', label: '3D', description: 'Com sombra de profundidade' },
        { value: 'neon', label: 'Neon', description: 'Borda com brilho luminoso' },
        { value: 'minimal', label: 'Minimal', description: 'Apenas texto sublinhado' },
      ]} />

      <SectionDivider label="Arredondamento" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Controla o arredondamento dos cantos dos botões.
      </p>
      <OptionPicker label="Arredondamento" value={b.radius} onChange={v => set({ radius: v })} options={[
        { value: 'none', label: 'Reto', description: 'Cantos retos (0px)' },
        { value: 'small', label: 'Pequeno', description: 'Levemente arredondado (4px)' },
        { value: 'medium', label: 'Médio', description: 'Arredondamento padrão (8px)' },
        { value: 'large', label: 'Grande', description: 'Bem arredondado (16px)' },
        { value: 'full', label: 'Pílula', description: 'Totalmente arredondado' },
      ]} />

      <SectionDivider label="Dimensões" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Controle o espaçamento interno e tamanho da fonte com precisão.
      </p>
      <NumberSlider label="Padding horizontal (px)" value={b.paddingX ?? 16} onChange={v => set({ paddingX: v })} min={4} max={48} step={2} suffix="px" />
      <NumberSlider label="Padding vertical (px)" value={b.paddingY ?? 10} onChange={v => set({ paddingY: v })} min={2} max={24} step={1} suffix="px" />
      <NumberSlider label="Tamanho da fonte (px)" value={b.fontSize ?? 14} onChange={v => set({ fontSize: v })} min={10} max={22} step={1} suffix="px" />

      <SectionDivider label="Tipografia e Efeitos" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Ajuste o peso da fonte, caixa alta e sombra dos botões.
      </p>
      <NumberSlider label="Peso da fonte" value={b.fontWeight} onChange={v => set({ fontWeight: v })} min={300} max={900} step={100} suffix="" />
      <ToggleRow label="Texto maiúsculo" hint="Transforma todo o texto dos botões em CAIXA ALTA" checked={b.uppercase} onChange={v => set({ uppercase: v })} />
      <ToggleRow label="Sombra" hint="Adiciona uma sombra sutil abaixo dos botões para dar profundidade" checked={b.shadow} onChange={v => set({ shadow: v })} />

      <SectionDivider label="Preview" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Pré-visualização dos estilos de botão com as configurações atuais.
      </p>
      <div className="p-4 bg-secondary/30 rounded-lg border border-border/30 space-y-3">
        <div className="flex gap-2 flex-wrap">
          <ButtonPreview config={b} label="Primário" styleOverride={b.style} />
          <ButtonPreview config={b} label="Contorno" styleOverride="outline" />
          <ButtonPreview config={b} label="Fantasma" styleOverride="ghost" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <ButtonPreview config={b} label="Comprar Agora" styleOverride={b.style} isBuy />
          <ButtonPreview config={b} label="Adicionar" styleOverride="outline" />
        </div>
      </div>
    </EditorSection>
  );
}

function ButtonPreview({ config, label, styleOverride, isBuy }: { config: any; label: string; styleOverride: string; isBuy?: boolean }) {
  const radiusMap: Record<string, string> = { none: '0px', small: '4px', medium: '8px', large: '16px', full: '9999px' };
  const styleMap: Record<string, string> = {
    filled: 'bg-foreground text-background',
    outline: 'border-2 border-foreground text-foreground',
    ghost: 'text-foreground hover:bg-secondary',
    soft: 'bg-foreground/10 text-foreground',
    gradient: 'bg-gradient-to-r from-foreground to-foreground/70 text-background',
    '3d': 'bg-foreground text-background shadow-[0_4px_0_0] shadow-foreground/50 translate-y-[-2px]',
    neon: 'border-2 border-foreground text-foreground shadow-[0_0_10px] shadow-foreground/50',
    minimal: 'text-foreground underline underline-offset-4',
  };

  return (
    <button
      className={cn(
        'transition-all',
        styleMap[styleOverride] || styleMap.filled,
        config.shadow && 'shadow-md',
      )}
      style={{
        borderRadius: radiusMap[config.radius] || '8px',
        fontWeight: config.fontWeight || 500,
        textTransform: config.uppercase ? 'uppercase' : 'none',
        letterSpacing: config.uppercase ? '0.05em' : 'normal',
        paddingLeft: `${config.paddingX ?? 16}px`,
        paddingRight: `${config.paddingX ?? 16}px`,
        paddingTop: `${config.paddingY ?? 10}px`,
        paddingBottom: `${config.paddingY ?? 10}px`,
        fontSize: `${config.fontSize ?? 14}px`,
      }}
    >
      {label}
    </button>
  );
}
