import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, SelectField, NumberSlider, OptionPicker, SectionDivider } from '../EditorControls';
import { Grid3X3 } from 'lucide-react';
import { Input } from '@/components/ui/input';

const PRESET_VALUES = [0, 2, 3, 4, 6, 8, 10, 12];

function LimitField({ label, value, onChange, maxPreset }: { label: string; value: number; onChange: (v: number) => void; maxPreset?: number }) {
  const isCustom = value > 0 && !PRESET_VALUES.includes(value);
  const [showCustom, setShowCustom] = useState(isCustom);
  const filteredPresets = maxPreset ? PRESET_VALUES.filter(v => v <= maxPreset) : PRESET_VALUES;

  const options = [
    ...filteredPresets.map(v => ({ value: String(v), label: v === 0 ? 'Todos' : String(v) })),
    { value: 'custom', label: 'Personalizado' },
  ];

  const selectValue = showCustom || isCustom ? 'custom' : String(value);

  return (
    <div className="space-y-1.5">
      <SelectField
        label={label}
        value={selectValue}
        onChange={v => {
          if (v === 'custom') {
            setShowCustom(true);
            if (value === 0) onChange(16);
          } else {
            setShowCustom(false);
            onChange(Number(v));
          }
        }}
        options={options}
      />
      {(showCustom || isCustom) && (
        <div className="ml-[calc(40%+4px)]">
          <Input
            type="number"
            min={1}
            max={100}
            value={value || 16}
            onChange={e => {
              const n = Math.max(1, Math.min(100, Number(e.target.value) || 1));
              onChange(n);
            }}
            className="h-7 text-xs w-20"
          />
        </div>
      )}
    </div>
  );
}

export function CategoryPanel() {
  const { draft, updateDraftSection } = useTheme();
  const c = draft.category;
  const set = (u: Partial<typeof c>) => updateDraftSection('category', u);
  const pl = draft.productListing || { limitDesktop: 0, limitMobile: 0 };
  const setListing = (u: Partial<typeof pl>) => updateDraftSection('productListing', u);

  return (
    <EditorSection icon={Grid3X3} title="Vitrine de Produtos" description="Configure colunas, espaçamento, filtros e limites de exibição da vitrine">

      <SectionDivider label="Container da Vitrine" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Define a largura máxima do conteúdo da vitrine em telas grandes.
      </p>
      <NumberSlider label="Largura máxima" value={c.containerMaxWidth ?? 1400} onChange={v => set({ containerMaxWidth: v })} min={960} max={1920} step={20} suffix="px" />


      <SectionDivider label="Colunas e Espaçamento" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Número de colunas por dispositivo e espaçamento entre os cards.
      </p>
      <NumberSlider label="Colunas no desktop" value={c.columnsDesktop} onChange={v => set({ columnsDesktop: v as 2 | 3 | 4 | 5 | 6 | 7 | 8 })} min={2} max={8} />
      <NumberSlider label="Colunas no tablet" value={c.columnsTablet ?? 3} onChange={v => set({ columnsTablet: v as 2 | 3 | 4 })} min={2} max={4} />
      <NumberSlider label="Colunas no mobile" value={c.columnsMobile} onChange={v => set({ columnsMobile: v as 1 | 2 })} min={1} max={2} />
      <NumberSlider label="Espaçamento (gap)" value={c.gridGap ?? 24} onChange={v => set({ gridGap: v })} min={0} max={32} step={4} suffix="px" />

      <SectionDivider label="Limite de Produtos na Home" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Define a quantidade máxima de produtos exibidos em cada coleção na página inicial.
        Aplica-se ao modo Grade — no Carrossel todos os produtos são exibidos.
      </p>
      <LimitField
        label="Desktop"
        value={pl.limitDesktop || 0}
        onChange={v => setListing({ limitDesktop: v })}
      />
      <LimitField
        label="Mobile"
        value={pl.limitMobile || 0}
        onChange={v => setListing({ limitMobile: v })}
        maxPreset={8}
      />

      <SectionDivider label="Layout da Página de Categoria" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Define a estrutura geral da página de categoria e onde ficam os filtros.
      </p>
      <SelectField label="Layout" value={c.layout} onChange={v => set({ layout: v })} options={[
        { value: 'sidebar-left', label: 'Sidebar à esquerda — filtros ao lado' },
        { value: 'sidebar-right', label: 'Sidebar à direita — filtros ao lado' },
        { value: 'top-filters', label: 'Filtros no topo — acima dos produtos' },
        { value: 'no-filters', label: 'Sem filtros — apenas listagem limpa' },
      ]} />

      <SectionDivider label="Produtos por Página" />
      <NumberSlider label="Produtos por página" value={c.productsPerPage} onChange={v => set({ productsPerPage: v })} min={8} max={48} step={4} />

      <SectionDivider label="Filtros" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Estilo e aparência dos filtros de busca (tamanho, cor, preço, etc).
      </p>
      <SelectField label="Estilo dos filtros" value={c.filterStyle} onChange={v => set({ filterStyle: v })} options={[
        { value: 'checkbox', label: 'Checkbox — caixas de seleção tradicionais' },
        { value: 'chips', label: 'Chips — botões compactos e clicáveis' },
        { value: 'accordion', label: 'Accordion — seções expansíveis por categoria' },
      ]} />
      <ToggleRow label="Mostrar contagem nos filtros" hint="Exibe a quantidade de produtos disponíveis ao lado de cada opção de filtro (ex: Azul (12))" checked={c.showFilterCount} onChange={v => set({ showFilterCount: v })} />

      <SectionDivider label="Ações na Listagem" />
      <ToggleRow label="Botão comprar na listagem" hint="Exibe o botão 'Adicionar ao Carrinho' diretamente nos cards da listagem sem precisar abrir o produto" checked={c.showAddToCartOnListing} onChange={v => set({ showAddToCartOnListing: v })} />

      <SectionDivider label="Paginação" />
      <OptionPicker label="Tipo de paginação" value={c.pagination} onChange={v => set({ pagination: v })} options={[
        { value: 'classic', label: 'Clássica', description: 'Páginas numeradas (1, 2, 3...)' },
        { value: 'infinite-scroll', label: 'Scroll infinito', description: 'Carrega automaticamente ao rolar' },
        { value: 'load-more', label: 'Carregar mais', description: 'Botão para carregar mais produtos' },
      ]} />

    </EditorSection>
  );
}
