import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, NumberSlider, OptionPicker, SectionDivider } from '../EditorControls';
import { Smartphone } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

export function ResponsivePanel() {
  const { draft, updateDraftSection } = useTheme();
  const r = draft.responsive ?? {} as any;
  const set = (u: Partial<typeof r>) => updateDraftSection('responsive', u as any);

  const sections = draft.homepageSections || [];
  const hiddenIds = r.hideSectionsMobile || [];

  const toggleHide = (id: string) => {
    const newIds = hiddenIds.includes(id)
      ? hiddenIds.filter((i: string) => i !== id)
      : [...hiddenIds, id];
    set({ hideSectionsMobile: newIds });
  };

  return (
    <EditorSection icon={Smartphone} title="Responsivo / Mobile" description="Configure comportamentos específicos para dispositivos móveis">
      <SectionDivider label="Hero" />
      <NumberSlider label="Tamanho do título no mobile" value={r.heroTitleSizeMobile ?? 28} onChange={v => set({ heroTitleSizeMobile: v })} min={18} max={48} suffix="px" />

      <SectionDivider label="Grid" />
      <OptionPicker label="Colunas no mobile" value={String(r.columnsMobile ?? 2)} onChange={v => set({ columnsMobile: Number(v) })} options={[
        { value: '1', label: '1 coluna' },
        { value: '2', label: '2 colunas' },
      ]} />

      <SectionDivider label="Espaçamento" />
      <OptionPicker label="Espaçamento mobile" value={r.spacingMobile || 'compact'} onChange={v => set({ spacingMobile: v })} options={[
        { value: 'compact', label: 'Compacto', description: 'Menos espaço entre seções' },
        { value: 'normal', label: 'Normal' },
        { value: 'spacious', label: 'Espaçoso', description: 'Mais respiro entre seções' },
      ]} />

      <SectionDivider label="Cabeçalho" />
      <ToggleRow label="Busca no mobile" hint="Exibe ícone de busca no cabeçalho mobile" checked={r.showSearchMobile ?? true} onChange={v => set({ showSearchMobile: v })} />
      <ToggleRow label="Header fixo no mobile" hint="Mantém o cabeçalho fixo ao rolar no mobile" checked={r.stickyHeaderMobile ?? true} onChange={v => set({ stickyHeaderMobile: v })} />

      <SectionDivider label="Ocultar Seções no Mobile" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Marque seções que não devem aparecer em dispositivos móveis.
      </p>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {sections.map(s => (
          <label
            key={s.id}
            className={cn(
              'flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors text-xs',
              hiddenIds.includes(s.id) ? 'bg-destructive/10 text-foreground' : 'hover:bg-muted/50 text-muted-foreground'
            )}
          >
            <Checkbox
              checked={hiddenIds.includes(s.id)}
              onCheckedChange={() => toggleHide(s.id)}
            />
            <span>{s.title}</span>
            {hiddenIds.includes(s.id) && <span className="text-[9px] text-destructive ml-auto">Oculto</span>}
          </label>
        ))}
      </div>
    </EditorSection>
  );
}
