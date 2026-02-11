import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, TextField, ToggleRow, NumberSlider, OptionPicker, SectionDivider } from '../EditorControls';
import { Image } from 'lucide-react';

export function LogoPanel() {
  const { draft, updateDraftSection } = useTheme();
  const l = draft.logo;
  const set = (u: Partial<typeof l>) => updateDraftSection('logo', u);

  return (
    <EditorSection icon={Image} title="Logo" description="Configure o logo da sua loja">
      <TextField label="Nome da loja" value={l.text} onChange={v => set({ text: v })} placeholder="Minha Loja" />
      <TextField label="URL da imagem" value={l.imageUrl} onChange={v => set({ imageUrl: v })} placeholder="https://..." />
      <ToggleRow label="Mostrar nome como texto" checked={l.showText} onChange={v => set({ showText: v })} />
      <NumberSlider label="Altura máx. do logo" value={l.maxHeight} onChange={v => set({ maxHeight: v })} min={24} max={80} suffix="px" />
      <OptionPicker label="Posição" value={l.position} onChange={v => set({ position: v })} options={[
        { value: 'left', label: 'Esquerda' }, { value: 'center', label: 'Centro' },
      ]} />
      <SectionDivider label="Preview" />
      <div className="p-4 bg-secondary rounded-lg flex items-center gap-2">
        {l.imageUrl && <img src={l.imageUrl} alt="Logo" style={{ maxHeight: l.maxHeight }} className="object-contain" />}
        {l.showText && <span className="text-lg font-bold" style={{ fontFamily: draft.typography.headingFont }}>{l.text}</span>}
      </div>
    </EditorSection>
  );
}
