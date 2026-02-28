import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, OptionPicker, ToggleRow, SectionDivider } from '../EditorControls';
import { FormInput } from 'lucide-react';

function InputPreview({ style, radius, focusRing }: { style: string; radius: string; focusRing: boolean }) {
  const [focused, setFocused] = useState(false);
  const radiusMap: Record<string, string> = { none: '0px', small: '4px', medium: '8px', large: '12px' };
  const r = radiusMap[radius] || '8px';

  const base: React.CSSProperties = {
    width: '100%', padding: '8px 12px', fontSize: '13px', outline: 'none',
    transition: 'all 0.2s ease', borderRadius: r, fontFamily: 'inherit',
  };
  const styleMap: Record<string, React.CSSProperties> = {
    default: { border: '1px solid hsl(var(--border))', background: 'transparent' },
    filled: { border: '1px solid transparent', background: 'hsl(var(--muted))' },
    underline: { border: 'none', borderBottom: '2px solid hsl(var(--border))', borderRadius: '0px', background: 'transparent' },
  };
  const focusStyle: React.CSSProperties = focused ? {
    ...(style === 'underline' ? { borderBottomColor: 'hsl(var(--primary))' } : { borderColor: 'hsl(var(--primary))' }),
    ...(focusRing ? { boxShadow: '0 0 0 2px hsl(var(--ring) / 0.3)' } : {}),
  } : {};

  return (
    <div className="space-y-2 rounded-lg border border-border/30 bg-secondary/30 p-3">
      <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Preview</span>
      <input
        type="text" placeholder="Digite seu email..."
        style={{ ...base, ...styleMap[style], ...focusStyle }}
        className="text-foreground placeholder:text-muted-foreground"
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      />
    </div>
  );
}

export function InputsPanel() {
  const { draft, updateDraftSection } = useTheme();
  const i = draft.inputs;
  const set = (u: Partial<typeof i>) => updateDraftSection('inputs', u);

  return (
    <EditorSection icon={FormInput} title="Formulários" description="Personalize a aparência dos campos de entrada em formulários, busca e checkout">
      <InputPreview style={i.style} radius={i.radius} focusRing={i.focusRing} />

      <SectionDivider label="Estilo" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Define a aparência base de todos os inputs (campos de texto, email, senha, etc).
      </p>
      <OptionPicker label="Estilo do campo" value={i.style} onChange={v => set({ style: v })} options={[
        { value: 'default', label: 'Padrão', description: 'Borda fina ao redor do campo' },
        { value: 'filled', label: 'Preenchido', description: 'Fundo colorido sem borda visível' },
        { value: 'underline', label: 'Sublinhado', description: 'Apenas linha na parte inferior' },
      ]} />

      <SectionDivider label="Arredondamento" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Controla o arredondamento dos cantos dos campos de formulário.
      </p>
      <OptionPicker label="Arredondamento" value={i.radius} onChange={v => set({ radius: v })} options={[
        { value: 'none', label: 'Nenhum', description: 'Cantos retos (0px)' },
        { value: 'small', label: 'Pequeno', description: 'Levemente arredondado (4px)' },
        { value: 'medium', label: 'Médio', description: 'Arredondamento padrão (8px)' },
        { value: 'large', label: 'Grande', description: 'Bem arredondado (12px)' },
      ]} />

      <SectionDivider label="Foco" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Comportamento visual quando o usuário clica ou foca em um campo.
      </p>
      <ToggleRow label="Anel de foco (focus ring)" hint="Exibe um anel colorido ao redor do campo quando ele está em foco, melhorando a acessibilidade" checked={i.focusRing} onChange={v => set({ focusRing: v })} />
    </EditorSection>
  );
}
