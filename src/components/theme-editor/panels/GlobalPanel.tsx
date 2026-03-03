import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, OptionPicker, NumberSlider, ToggleRow, SelectField, SectionDivider } from '../EditorControls';
import { Layout } from 'lucide-react';

export function GlobalPanel() {
  const { draft, updateDraftSection } = useTheme();
  const g = draft.global;
  const set = (u: Partial<typeof g>) => updateDraftSection('global', u);

  return (
    <EditorSection icon={Layout} title="Layout Global" description="Controle o container, espaçamentos, arredondamentos e efeitos visuais de toda a loja">
      <SectionDivider label="Container" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Define a largura máxima do conteúdo em telas grandes. Tela cheia ocupa 100% da largura.
      </p>
      <SelectField label="Largura do container" value={g.containerWidth} onChange={v => {
        const pxMap = { narrow: 1200, default: 1400, wide: 1600, full: 1920 } as const;
        set({ containerWidth: v, containerMaxPx: pxMap[v] });
      }} options={[
        { value: 'narrow', label: 'Estreito (1200px)' }, { value: 'default', label: 'Padrão (1400px)' },
        { value: 'wide', label: 'Largo (1600px)' }, { value: 'full', label: 'Tela cheia' },
      ]} />
      {g.containerWidth !== 'full' && (
        <NumberSlider label="Largura máx." value={g.containerMaxPx} onChange={v => set({ containerMaxPx: v })} min={960} max={1920} step={20} suffix="px" />
      )}

      <SectionDivider label="Espaçamento entre seções" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Controla o espaço vertical entre as seções da página (hero, produtos, banners, etc).
      </p>
      <OptionPicker label="Espaço entre seções" value={g.sectionSpacing} onChange={v => set({ sectionSpacing: v })} options={[
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
      <OptionPicker label="Nível de sombra" value={g.shadowLevel} onChange={v => set({ shadowLevel: v })} options={[
        { value: 'none', label: 'Nenhuma', description: 'Sem sombra, visual plano' },
        { value: 'subtle', label: 'Suave', description: 'Sombra leve e discreta' },
        { value: 'medium', label: 'Média', description: 'Sombra moderada com profundidade' },
        { value: 'strong', label: 'Forte', description: 'Sombra intensa e marcante' },
      ]} />

      <SectionDivider label="Bordas" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Controla a espessura das bordas em cards, inputs e containers.
      </p>
      <OptionPicker label="Estilo de borda" value={g.borderStyle} onChange={v => set({ borderStyle: v })} options={[
        { value: 'none', label: 'Nenhuma', description: 'Sem bordas visíveis' },
        { value: 'thin', label: 'Fina', description: 'Borda sutil de 1px' },
        { value: 'medium', label: 'Média', description: 'Borda de 2px' },
        { value: 'thick', label: 'Grossa', description: 'Borda marcante de 3px' },
      ]} />

      <SectionDivider label="Animações" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Animações de entrada e transição ao rolar a página e interagir com elementos.
      </p>
      <ToggleRow label="Animações habilitadas" hint="Ativa/desativa todas as animações da loja (fade-in, slide, hover, etc)" checked={g.animationsEnabled} onChange={v => set({ animationsEnabled: v })} />
      {g.animationsEnabled && (
        <OptionPicker label="Velocidade" value={g.animationSpeed} onChange={v => set({ animationSpeed: v })} options={[
          { value: 'slow', label: 'Lenta', description: 'Transições de 0.5s' },
          { value: 'normal', label: 'Normal', description: 'Transições de 0.3s' },
          { value: 'fast', label: 'Rápida', description: 'Transições de 0.15s' },
        ]} />
      )}

      <SectionDivider label="Rolagem" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Comportamento ao clicar em links internos ou botões "voltar ao topo".
      </p>
      <OptionPicker label="Rolagem da página" value={g.scrollBehavior} onChange={v => set({ scrollBehavior: v })} options={[
        { value: 'smooth', label: 'Suave', description: 'Rolagem com animação' },
        { value: 'auto', label: 'Instantânea', description: 'Pula direto sem animação' },
      ]} />
    </EditorSection>
  );
}
