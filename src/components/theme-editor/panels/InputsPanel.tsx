import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, OptionPicker, ToggleRow } from '../EditorControls';
import { FormInput } from 'lucide-react';

export function InputsPanel() {
  const { draft, updateDraftSection } = useTheme();
  const i = draft.inputs;
  const set = (u: Partial<typeof i>) => updateDraftSection('inputs', u);

  return (
    <EditorSection icon={FormInput} title="Formulários" description="Estilo dos campos de entrada">
      <OptionPicker label="Estilo" value={i.style} onChange={v => set({ style: v })} options={[
        { value: 'default', label: 'Padrão' }, { value: 'filled', label: 'Preenchido' }, { value: 'underline', label: 'Sublinhado' },
      ]} />
      <OptionPicker label="Arredondamento" value={i.radius} onChange={v => set({ radius: v })} options={[
        { value: 'none', label: 'Nenhum' }, { value: 'small', label: 'Pequeno' },
        { value: 'medium', label: 'Médio' }, { value: 'large', label: 'Grande' },
      ]} />
      <ToggleRow label="Anel de foco" description="Mostrar anel ao focar no campo" checked={i.focusRing} onChange={v => set({ focusRing: v })} />
    </EditorSection>
  );
}
