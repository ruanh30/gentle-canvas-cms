import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, TextField, ColorInput, NumberSlider, OptionPicker, SectionDivider } from '../EditorControls';
import { MessageCircle } from 'lucide-react';

export function WhatsAppPanel() {
  const { draft, updateDraftSection } = useTheme();
  const w = draft.whatsapp;
  const set = (u: Partial<typeof w>) => updateDraftSection('whatsapp', u);

  return (
    <EditorSection icon={MessageCircle} title="WhatsApp" description="Configure o botão flutuante de WhatsApp para atendimento rápido com seus clientes">
      <ToggleRow label="Ativar botão de WhatsApp" hint="Exibe um botão flutuante na loja que abre uma conversa direta no WhatsApp" checked={w.enabled} onChange={v => set({ enabled: v })} />
      {w.enabled && (
        <>
          <SectionDivider label="Configuração" />
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
            Número de destino e mensagem pré-preenchida que o cliente enviará.
          </p>
          <TextField label="Número (com DDD e código do país)" value={w.number} onChange={v => set({ number: v })} placeholder="5511999990000" />
          <TextField label="Mensagem padrão" value={w.message} onChange={v => set({ message: v })} multiline />

          <SectionDivider label="Aparência" />
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
            Posição, cor e texto do botão flutuante na tela.
          </p>
          <OptionPicker label="Posição na tela" value={w.position} onChange={v => set({ position: v })} options={[
            { value: 'bottom-left', label: 'Inferior esquerdo', description: 'Canto inferior esquerdo da tela' },
            { value: 'bottom-right', label: 'Inferior direito', description: 'Canto inferior direito da tela' },
          ]} />
          <ColorInput label="Cor de fundo do botão" value={w.backgroundColor} onChange={v => set({ backgroundColor: v })} />
          <ToggleRow label="Mostrar texto ao lado do ícone" hint="Exibe um rótulo de texto ao lado do ícone do WhatsApp (ex: 'Precisa de ajuda?')" checked={w.showLabel} onChange={v => set({ showLabel: v })} />
          {w.showLabel && <TextField label="Texto do rótulo" value={w.label} onChange={v => set({ label: v })} />}

          <SectionDivider label="Comportamento" />
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
            Tempo de espera antes de exibir o botão após o carregamento da página.
          </p>
          <NumberSlider label="Delay de exibição" value={w.delay} onChange={v => set({ delay: v })} min={0} max={30} suffix="s" />
        </>
      )}
    </EditorSection>
  );
}
