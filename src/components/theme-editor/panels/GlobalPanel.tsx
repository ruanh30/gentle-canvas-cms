import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, OptionPicker, NumberSlider, ToggleRow, SelectField, SectionDivider } from '../EditorControls';
import { Layout } from 'lucide-react';

export function GlobalPanel() {
  const { draft, updateDraftSection } = useTheme();
  const g = draft.global;
  const set = (u: Partial<typeof g>) => updateDraftSection('global', u);

  return (
    <EditorSection icon={Layout} title="Layout Global" description="Container, espaçamento, bordas e efeitos">
      <SelectField label="Largura do container" value={g.containerWidth} onChange={v => set({ containerWidth: v })} options={[
        { value: 'narrow', label: 'Estreito (1200px)' }, { value: 'default', label: 'Padrão (1400px)' },
        { value: 'wide', label: 'Largo (1600px)' }, { value: 'full', label: 'Tela cheia' },
      ]} />
      {g.containerWidth !== 'full' && (
        <NumberSlider label="Largura máx." value={g.containerMaxPx} onChange={v => set({ containerMaxPx: v })} min={960} max={1920} step={20} suffix="px" />
      )}
      <SectionDivider label="Espaçamento" />
      <OptionPicker label="Espaço entre seções" value={g.sectionSpacing} onChange={v => set({ sectionSpacing: v })} options={[
        { value: 'compact', label: 'Compacto' }, { value: 'normal', label: 'Normal' }, { value: 'spacious', label: 'Espaçoso' },
      ]} />
      <SectionDivider label="Bordas e Sombras" />
      <OptionPicker label="Arredondamento" value={g.borderRadius} onChange={v => set({ borderRadius: v })} options={[
        { value: 'none', label: 'Nenhum' }, { value: 'small', label: 'Pequeno' }, { value: 'medium', label: 'Médio' },
        { value: 'large', label: 'Grande' }, { value: 'full', label: 'Máximo' },
      ]} />
      <OptionPicker label="Sombras" value={g.shadowLevel} onChange={v => set({ shadowLevel: v })} options={[
        { value: 'none', label: 'Nenhuma' }, { value: 'subtle', label: 'Suave' },
        { value: 'medium', label: 'Média' }, { value: 'strong', label: 'Forte' },
      ]} />
      <OptionPicker label="Bordas" value={g.borderStyle} onChange={v => set({ borderStyle: v })} options={[
        { value: 'none', label: 'Nenhuma' }, { value: 'thin', label: 'Fina' },
        { value: 'medium', label: 'Média' }, { value: 'thick', label: 'Grossa' },
      ]} />
      <SectionDivider label="Animações" />
      <ToggleRow label="Animações habilitadas" checked={g.animationsEnabled} onChange={v => set({ animationsEnabled: v })} />
      {g.animationsEnabled && (
        <OptionPicker label="Velocidade" value={g.animationSpeed} onChange={v => set({ animationSpeed: v })} options={[
          { value: 'slow', label: 'Lenta' }, { value: 'normal', label: 'Normal' }, { value: 'fast', label: 'Rápida' },
        ]} />
      )}
    </EditorSection>
  );
}
