import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, SelectField, NumberSlider, OptionPicker, SectionDivider } from '../EditorControls';
import { Grid3X3 } from 'lucide-react';

export function CategoryPanel() {
  const { draft, updateDraftSection } = useTheme();
  const c = draft.category;
  const set = (u: Partial<typeof c>) => updateDraftSection('category', u);

  const pl = draft.productListing || { limitDesktop: 0, limitMobile: 0 };
  const setListing = (u: Partial<typeof pl>) => updateDraftSection('productListing', u);

  const limitOptions = [
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
    <EditorSection icon={Grid3X3} title="Vitrine de Produtos" description="Configure colunas, espaçamento, filtros e limites de exibição da vitrine">

      <SectionDivider label="Colunas e Espaçamento" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Número de colunas por dispositivo e espaçamento entre os cards.
      </p>
      <NumberSlider label="Colunas no desktop" value={c.columnsDesktop} onChange={v => set({ columnsDesktop: v as 2 | 3 | 4 | 5 })} min={2} max={5} />
      <NumberSlider label="Colunas no tablet" value={c.columnsTablet ?? 3} onChange={v => set({ columnsTablet: v as 2 | 3 | 4 })} min={2} max={4} />
      <NumberSlider label="Colunas no mobile" value={c.columnsMobile} onChange={v => set({ columnsMobile: v as 1 | 2 })} min={1} max={2} />
      <NumberSlider label="Espaçamento (gap)" value={c.gridGap ?? 24} onChange={v => set({ gridGap: v })} min={0} max={32} step={4} suffix="px" />

      <SectionDivider label="Limite de Produtos na Home" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Define a quantidade máxima de produtos exibidos em cada coleção na página inicial.
        Aplica-se ao modo Grade — no Carrossel todos os produtos são exibidos.
      </p>
      <SelectField
        label="Desktop"
        value={String(pl.limitDesktop || 0)}
        onChange={v => setListing({ limitDesktop: Number(v) })}
        options={limitOptions}
      />
      <SelectField
        label="Mobile"
        value={String(pl.limitMobile || 0)}
        onChange={v => setListing({ limitMobile: Number(v) })}
        options={limitOptions.filter(o => Number(o.value) <= 8)}
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

      <SectionDivider label="Modo de Exibição" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Escolha como os produtos são apresentados na listagem.
      </p>
      <OptionPicker label="Visualização" value={c.displayMode} onChange={v => set({ displayMode: v })} options={[
        { value: 'grid', label: 'Grade', description: 'Cards organizados em colunas e linhas' },
        { value: 'list', label: 'Lista', description: 'Produtos exibidos linha a linha' },
        { value: 'masonry', label: 'Masonry', description: 'Grade com alturas variadas (estilo Pinterest)' },
        { value: 'carousel', label: 'Carrossel', description: 'Deslizar horizontal entre produtos' },
        { value: 'compact-grid', label: 'Compacto', description: 'Grade densa sem espaçamento entre cards' },
      ]} />
      {c.displayMode === 'carousel' && (
        <>
          <ToggleRow label="Autoplay" hint="Avança automaticamente entre os produtos do carrossel" checked={c.carouselAutoplay} onChange={v => set({ carouselAutoplay: v })} />
          <NumberSlider label="Velocidade" value={c.carouselSpeed} onChange={v => set({ carouselSpeed: v })} min={2} max={10} suffix="s" />
        </>
      )}

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
