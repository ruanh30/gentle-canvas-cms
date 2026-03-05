import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, OptionPicker, NumberSlider, ToggleRow, SelectField, SectionDivider } from '../EditorControls';
import { Layout } from 'lucide-react';
import { sendPreviewHighlight } from '@/hooks/use-preview-highlight';

export function GlobalPanel() {
  const { draft, updateDraftSection } = useTheme();
  const g = draft.global;
  const set = (u: Partial<typeof g>) => updateDraftSection('global', u);

  return (
    <EditorSection icon={Layout} title="Layout Global" description="Controle espaçamentos, arredondamentos e efeitos visuais de toda a loja">

      <SectionDivider label="Espaçamento entre seções" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Controla o espaço vertical entre as seções da página (hero, produtos, banners, etc).
      </p>
      <OptionPicker label="Espaço entre seções" value={g.sectionSpacing} onChange={v => {
        set({ sectionSpacing: v });
        sendPreviewHighlight('sections');
      }} options={[
        { value: 'minimal', label: 'Mínimo', description: 'Quase colado (8px)' },
        { value: 'compact', label: 'Compacto', description: 'Pouco espaço (16px)' },
        { value: 'normal', label: 'Normal', description: 'Espaço padrão (32px)' },
        { value: 'spacious', label: 'Espaçoso', description: 'Muito espaço (64px)' },
      ]} />

      <SectionDivider label="Arredondamento de bordas" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Define o arredondamento padrão de cards, inputs, botões e outros elementos da loja.
      </p>
      <OptionPicker label="Arredondamento" value={g.borderRadius} onChange={v => set({ borderRadius: v })} options={[
        { value: 'none', label: 'Nenhum', description: 'Cantos retos (0px)' },
        { value: 'small', label: 'Pequeno', description: 'Levemente arredondado (4px)' },
        { value: 'medium', label: 'Médio', description: 'Arredondamento padrão (8px)' },
        { value: 'large', label: 'Grande', description: 'Bem arredondado (12px)' },
        { value: 'full', label: 'Máximo', description: 'Totalmente arredondado (pílula)' },
      ]} />

      <SectionDivider label="Sombras" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Sombras adicionam profundidade e destaque aos cards e elementos elevados.
      </p>
      <OptionPicker label="Nível de sombra" value={g.shadowLevel} onChange={v => {
        set({ shadowLevel: v });
        sendPreviewHighlight('sections');
      }} options={[
        { value: 'none', label: 'Nenhuma', description: 'Sem sombra, visual plano' },
        { value: 'subtle', label: 'Suave', description: 'Sombra leve e discreta' },
        { value: 'medium', label: 'Média', description: 'Sombra moderada com profundidade' },
        { value: 'strong', label: 'Forte', description: 'Sombra intensa e marcante' },
      ]} />

      <SectionDivider label="Bordas" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Controla a espessura das bordas em cards, inputs e containers.
      </p>
      <OptionPicker label="Estilo de borda" value={g.borderStyle} onChange={v => {
        set({ borderStyle: v });
        sendPreviewHighlight('sections');
      }} options={[
        { value: 'none', label: 'Nenhuma', description: 'Sem bordas visíveis' },
        { value: 'thin', label: 'Fina', description: 'Borda sutil de 1px' },
        { value: 'medium', label: 'Média', description: 'Borda de 2px' },
        { value: 'thick', label: 'Grossa', description: 'Borda marcante de 3px' },
      ]} />

    </EditorSection>
  );
}
