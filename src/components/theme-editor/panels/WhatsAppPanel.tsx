import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, TextField, ColorInput, NumberSlider, OptionPicker, SectionDivider } from '../EditorControls';
import { MessageCircle } from 'lucide-react';

export function WhatsAppPanel() {
  const { draft, updateDraftSection } = useTheme();
  const w = draft.whatsapp;
  const set = (u: Partial<typeof w>) => updateDraftSection('whatsapp', u);

  return (
    <EditorSection icon={MessageCircle} title="WhatsApp" description="Botão flutuante de WhatsApp">
      <ToggleRow label="Ativar botão" checked={w.enabled} onChange={v => set({ enabled: v })} />
      {w.enabled && (
        <>
          <TextField label="Número (com DDD)" value={w.number} onChange={v => set({ number: v })} placeholder="5511999990000" />
          <TextField label="Mensagem padrão" value={w.message} onChange={v => set({ message: v })} multiline />
          <OptionPicker label="Posição" value={w.position} onChange={v => set({ position: v })} options={[
            { value: 'bottom-left', label: 'Inferior esq.' }, { value: 'bottom-right', label: 'Inferior dir.' },
          ]} />
          <ColorInput label="Cor de fundo" value={w.backgroundColor} onChange={v => set({ backgroundColor: v })} />
          <ToggleRow label="Mostrar texto" checked={w.showLabel} onChange={v => set({ showLabel: v })} />
          {w.showLabel && <TextField label="Texto" value={w.label} onChange={v => set({ label: v })} />}
          <NumberSlider label="Delay de exibição" value={w.delay} onChange={v => set({ delay: v })} min={0} max={30} suffix="s" />
        </>
      )}
    </EditorSection>
  );
}
