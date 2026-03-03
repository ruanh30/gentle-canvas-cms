import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, SelectField, NumberSlider, OptionPicker, SectionDivider } from '../EditorControls';
import { Grid3X3 } from 'lucide-react';

export function CategoryPanel() {
  const { draft, updateDraftSection } = useTheme();
  const c = draft.category;
  const set = (u: Partial<typeof c>) => updateDraftSection('category', u);

  return (
    <EditorSection icon={Grid3X3} title="Categoria / Busca" description="Configure o layout e funcionalidades da página de listagem de produtos por categoria ou busca">
      <SectionDivider label="Layout da Página" />
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

      <SectionDivider label="Colunas e Quantidade" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Número de colunas na grade e quantidade de produtos por página.
      </p>
      <NumberSlider label="Colunas no desktop" value={c.columnsDesktop} onChange={v => set({ columnsDesktop: v as 2 | 3 | 4 | 5 })} min={2} max={5} />
      <NumberSlider label="Colunas no mobile" value={c.columnsMobile} onChange={v => set({ columnsMobile: v as 1 | 2 })} min={1} max={2} />
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
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Ações rápidas disponíveis diretamente na listagem de produtos.
      </p>
      <ToggleRow label="Botão comprar na listagem" hint="Exibe o botão 'Adicionar ao Carrinho' diretamente nos cards da listagem sem precisar abrir o produto" checked={c.showAddToCartOnListing} onChange={v => set({ showAddToCartOnListing: v })} />

      <SectionDivider label="Paginação" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Como o usuário carrega mais produtos ao chegar ao final da lista.
      </p>
      <OptionPicker label="Tipo de paginação" value={c.pagination} onChange={v => set({ pagination: v })} options={[
        { value: 'classic', label: 'Clássica', description: 'Páginas numeradas (1, 2, 3...)' },
        { value: 'infinite-scroll', label: 'Scroll infinito', description: 'Carrega automaticamente ao rolar' },
        { value: 'load-more', label: 'Carregar mais', description: 'Botão para carregar mais produtos' },
      ]} />

    </EditorSection>
  );
}
