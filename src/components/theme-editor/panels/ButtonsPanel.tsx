import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, OptionPicker, NumberSlider, ToggleRow, SectionDivider } from '../EditorControls';
import { MousePointer } from 'lucide-react';

export function ButtonsPanel() {
  const { draft, updateDraftSection } = useTheme();
  const b = draft.buttons;
  const set = (u: Partial<typeof b>) => updateDraftSection('buttons', u);

  return (
    <EditorSection icon={MousePointer} title="Botões" description="Aparência e comportamento dos botões em toda a loja">
      <OptionPicker label="Estilo" value={b.style} onChange={v => set({ style: v })} options={[
        { value: 'filled', label: 'Sólido', description: 'Fundo preenchido' },
        { value: 'outline', label: 'Contorno', description: 'Apenas borda' },
        { value: 'ghost', label: 'Fantasma', description: 'Sem fundo/borda' },
        { value: 'soft', label: 'Suave', description: 'Fundo translúcido' },
        { value: 'gradient', label: 'Gradiente', description: 'Fundo degradê' },
        { value: '3d', label: '3D', description: 'Com profundidade' },
        { value: 'neon', label: 'Neon', description: 'Brilho luminoso' },
        { value: 'minimal', label: 'Minimal', description: 'Apenas texto sublinhado' },
      ]} />
      <OptionPicker label="Arredondamento" value={b.radius} onChange={v => set({ radius: v })} options={[
        { value: 'none', label: 'Reto', description: 'Sem curva' }, { value: 'small', label: 'Pequeno', description: '4px' },
        { value: 'medium', label: 'Médio', description: '8px' }, { value: 'large', label: 'Grande', description: '16px' }, { value: 'full', label: 'Pílula', description: 'Totalmente arredondado' },
      ]} />
      <OptionPicker label="Tamanho" value={b.size} onChange={v => set({ size: v })} options={[
        { value: 'small', label: 'Pequeno', description: 'Compacto' }, { value: 'medium', label: 'Médio', description: 'Padrão' }, { value: 'large', label: 'Grande', description: 'Destaque' },
      ]} />
      <NumberSlider label="Peso da fonte" value={b.fontWeight} onChange={v => set({ fontWeight: v })} min={400} max={800} step={100} suffix="" />
      <ToggleRow label="Texto maiúsculo" hint="Transforma todo o texto dos botões em CAIXA ALTA" checked={b.uppercase} onChange={v => set({ uppercase: v })} />
      <ToggleRow label="Sombra" hint="Adiciona uma sombra sutil abaixo dos botões para dar profundidade" checked={b.shadow} onChange={v => set({ shadow: v })} />
      <SectionDivider label="Preview" />
      <div className="flex gap-2 flex-wrap p-3 bg-secondary rounded-lg">
        <ButtonPreview style={b.style} label="Primário" />
        <ButtonPreview style="outline" label="Contorno" />
        <ButtonPreview style="ghost" label="Fantasma" />
      </div>
    </EditorSection>
  );
}

function ButtonPreview({ style, label }: { style: string; label: string }) {
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
    <button className={`px-4 py-2 text-sm rounded-md transition-all ${styleMap[style] || styleMap.filled}`}>
      {label}
    </button>
  );
}
