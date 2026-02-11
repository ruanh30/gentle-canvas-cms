import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, SelectField, NumberSlider, OptionPicker, SectionDivider } from '../EditorControls';
import { Grid3X3 } from 'lucide-react';

export function CategoryPanel() {
  const { draft, updateDraftSection } = useTheme();
  const c = draft.category;
  const set = (u: Partial<typeof c>) => updateDraftSection('category', u);

  return (
    <EditorSection icon={Grid3X3} title="Categoria / Busca" description="Página de listagem de produtos">
      <SelectField label="Layout" value={c.layout} onChange={v => set({ layout: v })} options={[
        { value: 'sidebar-left', label: 'Sidebar esquerda' }, { value: 'sidebar-right', label: 'Sidebar direita' },
        { value: 'top-filters', label: 'Filtros no topo' }, { value: 'no-filters', label: 'Sem filtros' },
      ]} />

      <SectionDivider label="Modo de Exibição" />
      <OptionPicker label="Visualização" value={c.displayMode} onChange={v => set({ displayMode: v })} options={[
        { value: 'grid', label: 'Grade', description: 'Cards em grid' },
        { value: 'list', label: 'Lista', description: 'Linha a linha' },
        { value: 'masonry', label: 'Masonry', description: 'Alturas variadas' },
        { value: 'carousel', label: 'Carrossel', description: 'Deslizar horizontal' },
        { value: 'compact-grid', label: 'Compacto', description: 'Grid sem espaço' },
      ]} />

      {c.displayMode === 'carousel' && (
        <>
          <ToggleRow label="Autoplay" checked={c.carouselAutoplay} onChange={v => set({ carouselAutoplay: v })} />
          <NumberSlider label="Velocidade" value={c.carouselSpeed} onChange={v => set({ carouselSpeed: v })} min={2} max={10} suffix="s" />
        </>
      )}

      <SectionDivider label="Grid" />
      <NumberSlider label="Colunas (desktop)" value={c.columnsDesktop} onChange={v => set({ columnsDesktop: v as 2 | 3 | 4 | 5 })} min={2} max={5} />
      <NumberSlider label="Colunas (mobile)" value={c.columnsMobile} onChange={v => set({ columnsMobile: v as 1 | 2 })} min={1} max={2} />
      <NumberSlider label="Produtos por página" value={c.productsPerPage} onChange={v => set({ productsPerPage: v })} min={8} max={48} step={4} />

      <SectionDivider label="Filtros" />
      <SelectField label="Estilo dos filtros" value={c.filterStyle} onChange={v => set({ filterStyle: v })} options={[
        { value: 'checkbox', label: 'Checkbox' }, { value: 'chips', label: 'Chips' }, { value: 'accordion', label: 'Accordion' },
      ]} />
      <ToggleRow label="Mostrar contagem" checked={c.showFilterCount} onChange={v => set({ showFilterCount: v })} />

      <SectionDivider label="Ações na Listagem" />
      <ToggleRow label="Botão comprar na listagem" description="Mostra botão de adicionar ao carrinho nos cards" checked={c.showAddToCartOnListing} onChange={v => set({ showAddToCartOnListing: v })} />

      <SectionDivider label="Paginação" />
      <OptionPicker label="Tipo" value={c.pagination} onChange={v => set({ pagination: v })} options={[
        { value: 'classic', label: 'Clássica' }, { value: 'infinite-scroll', label: 'Infinita' }, { value: 'load-more', label: 'Carregar mais' },
      ]} />

      <SectionDivider label="Extras" />
      <ToggleRow label="Banner de categoria" checked={c.showBanner} onChange={v => set({ showBanner: v })} />
      <ToggleRow label="Breadcrumb" checked={c.showBreadcrumb} onChange={v => set({ showBreadcrumb: v })} />
      <ToggleRow label="Contagem de produtos" checked={c.showProductCount} onChange={v => set({ showProductCount: v })} />
    </EditorSection>
  );
}
