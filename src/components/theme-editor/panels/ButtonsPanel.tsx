import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, OptionPicker, NumberSlider, ToggleRow, SectionDivider } from '../EditorControls';
import { MousePointer } from 'lucide-react';

export function ButtonsPanel() {
  const { draft, updateDraftSection } = useTheme();
  const b = draft.buttons;
  const set = (u: Partial<typeof b>) => updateDraftSection('buttons', u);

  return (
    <EditorSection icon={MousePointer} title="Botões" description="Estilo global dos botões">
      <OptionPicker label="Estilo" value={b.style} onChange={v => set({ style: v })} options={[
        { value: 'filled', label: 'Sólido' }, { value: 'outline', label: 'Contorno' },
        { value: 'ghost', label: 'Fantasma' }, { value: 'soft', label: 'Suave' },
      ]} />
      <OptionPicker label="Arredondamento" value={b.radius} onChange={v => set({ radius: v })} options={[
        { value: 'none', label: 'Nenhum' }, { value: 'small', label: 'Pequeno' },
        { value: 'medium', label: 'Médio' }, { value: 'large', label: 'Grande' }, { value: 'full', label: 'Pílula' },
      ]} />
      <OptionPicker label="Tamanho" value={b.size} onChange={v => set({ size: v })} options={[
        { value: 'small', label: 'Pequeno' }, { value: 'medium', label: 'Médio' }, { value: 'large', label: 'Grande' },
      ]} />
      <NumberSlider label="Peso da fonte" value={b.fontWeight} onChange={v => set({ fontWeight: v })} min={400} max={800} step={100} />
      <ToggleRow label="Texto maiúsculo" checked={b.uppercase} onChange={v => set({ uppercase: v })} />
      <ToggleRow label="Sombra" checked={b.shadow} onChange={v => set({ shadow: v })} />
      <SectionDivider label="Preview" />
      <div className="flex gap-2 flex-wrap p-3 bg-secondary rounded-lg">
        <button className="px-4 py-2 bg-foreground text-background text-sm rounded-md">Primário</button>
        <button className="px-4 py-2 border border-foreground text-foreground text-sm rounded-md">Contorno</button>
        <button className="px-4 py-2 text-foreground text-sm rounded-md hover:bg-secondary">Fantasma</button>
      </div>
    </EditorSection>
  );
}
