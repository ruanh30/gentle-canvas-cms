import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, SelectField, SectionDivider } from '../EditorControls';
import { LayoutList } from 'lucide-react';

export function ProductListingPanel() {
  const { draft, updateDraftSection } = useTheme();
  const pl = draft.productListing || { limitDesktop: 0, limitMobile: 0 };
  const set = (u: Partial<typeof pl>) => updateDraftSection('productListing', u);

  const options = [
    { value: '0', label: 'Todos' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '6', label: '6' },
    { value: '8', label: '8' },
    { value: '10', label: '10' },
    { value: '12', label: '12' },
  ];

  return (
    <EditorSection
      icon={LayoutList}
      title="Listagem de Produtos"
      description="Controle quantos produtos aparecem nas coleções e destaques da Home"
    >
      <SectionDivider label="Limite por dispositivo" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-1 mb-2">
        Define a quantidade máxima de produtos exibidos em cada coleção na página inicial.
        Aplica-se ao modo Grade — no Carrossel todos os produtos são exibidos.
      </p>

      <SelectField
        label="Desktop"
        value={String(pl.limitDesktop || 0)}
        onChange={v => set({ limitDesktop: Number(v) })}
        options={options}
      />

      <SelectField
        label="Mobile"
        value={String(pl.limitMobile || 0)}
        onChange={v => set({ limitMobile: Number(v) })}
        options={options.filter(o => Number(o.value) <= 8)}
      />
    </EditorSection>
  );
}
