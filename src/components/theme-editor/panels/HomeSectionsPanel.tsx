import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, SectionDivider, HintTooltip } from '../EditorControls';
import { Grid3X3, GripVertical, ChevronUp, ChevronDown, Trash2, Pencil, Check, X, Eye, EyeOff, FolderTree, Plus } from 'lucide-react';
import { ThemeHomepageSection } from '@/types/theme';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { mockCategories, mockCollections } from '@/data/mock';

const carouselSections = ['categories', 'featured-products', 'collections'];

const availableSectionTypes: { type: ThemeHomepageSection['type']; label: string }[] = [
  { type: 'collections', label: 'Coleção de Produtos' },
  { type: 'banner', label: 'Banner' },
  { type: 'double-banner', label: 'Banner Duplo' },
  { type: 'triple-banner', label: 'Banner Triplo' },
  { type: 'image-text', label: 'Imagem + Texto' },
  { type: 'video', label: 'Vídeo' },
  { type: 'countdown', label: 'Contagem Regressiva' },
  { type: 'benefits', label: 'Benefícios' },
  { type: 'trust-bar', label: 'Barra de Confiança' },
  { type: 'faq', label: 'FAQ' },
  { type: 'categories', label: 'Categorias' },
  { type: 'featured-products', label: 'Produtos em Destaque' },
];

export function HomeSectionsPanel() {
  const { draft, toggleSection, reorderSections, updateDraft } = useTheme();
  const sections = draft.homepageSections;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const [showAddMenu, setShowAddMenu] = useState(false);
  const [newSectionType, setNewSectionType] = useState(availableSectionTypes[0].type);
  const [newSectionName, setNewSectionName] = useState('');

  const startEdit = (id: string, title: string) => {
    setEditingId(id);
    setEditTitle(title);
  };

  const saveEdit = (id: string) => {
    updateDraft({
      homepageSections: sections.map(s => s.id === id ? { ...s, title: editTitle } : s),
    });
    setEditingId(null);
  };

  const removeSection = (id: string) => {
    updateDraft({
      homepageSections: sections.filter(s => s.id !== id),
    });
  };

  const setSetting = (id: string, key: string, value: unknown) => {
    updateDraft({
      homepageSections: sections.map(s =>
        s.id === id ? { ...s, settings: { ...s.settings, [key]: value } } : s
      ),
    });
  };

  // Auto-sync: ensure all active collections from catalog exist in home sections
  useEffect(() => {
    const activeCollections = mockCollections.filter(c => c.active);
    const missing = activeCollections.filter(col =>
      !sections.some(s =>
        s.id === col.id ||
        s.id === `col-section-${col.id}` ||
        (s.type === 'collections' && (s.settings?.collectionId as string) === col.id)
      )
    );
    if (missing.length > 0) {
      const newSections: ThemeHomepageSection[] = missing.map(col => ({
        id: col.id,
        type: 'collections' as const,
        enabled: true,
        title: col.name,
        showTitle: true,
        settings: { collectionId: col.id },
      }));
      updateDraft({ homepageSections: [...sections, ...newSections] });
    }
  }, []); // Run once on mount


  return (
    <EditorSection icon={Grid3X3} title="Seções da Home" description="Ative, desative, renomeie e reordene as seções">
      <p className="text-[11px] text-muted-foreground">Use as setas para reordenar. Clique no lápis para renomear. Novas categorias e coleções aparecem aqui automaticamente.<HintTooltip text="Cada seção pode ser ativada/desativada, renomeada, reordenada ou removida. Categorias e coleções são adicionadas automaticamente quando criadas." /></p>
      <div className="space-y-1">
        {sections.map((section, idx) => (
          <React.Fragment key={section.id}>
            <div
              id={`section-${section.id}`}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors',
                section.enabled ? 'bg-secondary border-border' : 'bg-muted/30 border-transparent opacity-60'
              )}
            >
              <GripVertical className="h-3.5 w-3.5 text-muted-foreground shrink-0 cursor-grab" />
              {editingId === section.id ? (
                <div className="flex-1 flex items-center gap-1">
                  <Input
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    className="h-7 text-xs flex-1"
                    autoFocus
                    onKeyDown={e => e.key === 'Enter' && saveEdit(section.id)}
                  />
                  <button onClick={() => saveEdit(section.id)} className="p-0.5 hover:bg-background rounded text-green-600">
                    <Check className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => setEditingId(null)} className="p-0.5 hover:bg-background rounded">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-sm font-medium flex-1">{section.title}</span>
                  <button onClick={() => startEdit(section.id, section.title)} className="p-0.5 hover:bg-background rounded opacity-60 hover:opacity-100">
                    <Pencil className="h-3 w-3" />
                  </button>
                </>
              )}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => idx > 0 && reorderSections(idx, idx - 1)}
                  className="p-0.5 hover:bg-background rounded"
                  disabled={idx === 0}
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => idx < sections.length - 1 && reorderSections(idx, idx + 1)}
                  className="p-0.5 hover:bg-background rounded"
                  disabled={idx === sections.length - 1}
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                onClick={() => {
                  updateDraft({
                    homepageSections: sections.map(s => s.id === section.id ? { ...s, showTitle: !(s.showTitle ?? true) } : s),
                  });
                }}
                className="p-0.5 hover:bg-background rounded opacity-60 hover:opacity-100"
                title={section.showTitle !== false ? 'Ocultar título da seção' : 'Mostrar título da seção'}
              >
                {section.showTitle !== false ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
              </button>
              <button onClick={() => removeSection(section.id)} className="p-0.5 hover:bg-background rounded text-destructive opacity-60 hover:opacity-100">
                <Trash2 className="h-3 w-3" />
              </button>
              <input
                type="checkbox"
                checked={section.enabled}
                onChange={() => toggleSection(section.id)}
                className="rounded"
              />
            </div>
            {carouselSections.includes(section.type) && section.enabled && (
              <div className="ml-6 mt-1 mb-2 p-2 bg-muted/30 rounded-md space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-[11px] text-muted-foreground">Exibição:</label>
                  <select
                    value={(section.settings?.displayMode as string) || 'grid'}
                    onChange={e => setSetting(section.id, 'displayMode', e.target.value)}
                    className="h-6 text-[11px] rounded border border-border bg-background px-1.5"
                  >
                    <option value="grid">Grade</option>
                    <option value="carousel">Carrossel</option>
                  </select>
                  <HintTooltip text="Escolha se esta seção exibe os itens em grade ou carrossel horizontal" />
                </div>
                {(section.settings?.displayMode as string) === 'carousel' && (
                  <>
                    <div className="flex items-center gap-2">
                      <label className="text-[11px] text-muted-foreground">Velocidade:</label>
                      <input
                        type="range"
                        min={1}
                        max={10}
                        value={(section.settings?.carouselSpeed as number) || 4}
                        onChange={e => setSetting(section.id, 'carouselSpeed', Number(e.target.value))}
                        className="flex-1 h-1"
                      />
                      <span className="text-[11px] text-muted-foreground w-6 text-right">{(section.settings?.carouselSpeed as number) || 4}s</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-[11px] text-muted-foreground">Mostrar setas:</label>
                      <input
                        type="checkbox"
                        checked={(section.settings?.showArrows as boolean) ?? true}
                        onChange={e => setSetting(section.id, 'showArrows', e.target.checked)}
                        className="rounded"
                      />
                      <HintTooltip text="Exibe ou oculta as setas de navegação (esquerda/direita) do carrossel" />
                    </div>
                    {section.type === 'categories' && (
                      <div className="flex items-center gap-2">
                        <label className="text-[11px] text-muted-foreground">Espaçamento:</label>
                        <input
                          type="range"
                          min={0}
                          max={32}
                          step={4}
                          value={(section.settings?.carouselGap as number) ?? 16}
                          onChange={e => setSetting(section.id, 'carouselGap', Number(e.target.value))}
                          className="flex-1 h-1"
                        />
                        <span className="text-[11px] text-muted-foreground w-8 text-right">{(section.settings?.carouselGap as number) ?? 16}px</span>
                      </div>
                    )}
                  </>
                )}
                {(section.settings?.displayMode as string) !== 'carousel' && section.type === 'categories' && (
                  <div className="flex items-center gap-2">
                    <label className="text-[11px] text-muted-foreground">Espaçamento da grade:</label>
                    <input
                      type="range"
                      min={0}
                      max={32}
                      step={4}
                      value={(section.settings?.gridGap as number) ?? 16}
                      onChange={e => setSetting(section.id, 'gridGap', Number(e.target.value))}
                      className="flex-1 h-1"
                    />
                    <span className="text-[11px] text-muted-foreground w-8 text-right">{(section.settings?.gridGap as number) ?? 16}px</span>
                  </div>
                )}
                {section.type === 'categories' && (
                  <>
                    <SectionDivider label="Aparência das Categorias" />
                    <div className="flex items-center gap-2">
                      <label className="text-[11px] text-muted-foreground">Mostrar imagem:</label>
                      <input
                        type="checkbox"
                        checked={(section.settings?.showImage as boolean) ?? true}
                        onChange={e => setSetting(section.id, 'showImage', e.target.checked)}
                        className="rounded"
                      />
                      <HintTooltip text="Exibe a imagem da categoria acima do nome, como nos sites de referência" />
                    </div>
                    {(section.settings?.showImage as boolean) !== false && (
                      <>
                        <div className="flex items-center gap-2">
                          <label className="text-[11px] text-muted-foreground">Formato:</label>
                          <select
                            value={(section.settings?.imageShape as string) || 'circle'}
                            onChange={e => setSetting(section.id, 'imageShape', e.target.value)}
                            className="h-6 text-[11px] rounded border border-border bg-background px-1.5"
                          >
                            <option value="circle">Circular</option>
                            <option value="rounded">Arredondado</option>
                            <option value="square">Quadrado</option>
                          </select>
                          <HintTooltip text="Formato do contêiner da imagem da categoria" />
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-[11px] text-muted-foreground">Tamanho:</label>
                          <input
                            type="range"
                            min={60}
                            max={140}
                            step={10}
                            value={(section.settings?.imageSize as number) || 80}
                            onChange={e => setSetting(section.id, 'imageSize', Number(e.target.value))}
                            className="flex-1 h-1"
                          />
                          <span className="text-[11px] text-muted-foreground w-8 text-right">{(section.settings?.imageSize as number) || 80}px</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-[11px] text-muted-foreground">Borda na imagem:</label>
                          <input
                            type="checkbox"
                            checked={(section.settings?.imageBorder as boolean) ?? false}
                            onChange={e => setSetting(section.id, 'imageBorder', e.target.checked)}
                            className="rounded"
                          />
                          <HintTooltip text="Adiciona uma borda colorida ao redor da imagem da categoria" />
                        </div>
                        {(section.settings?.imageBorder as boolean) && (
                          <>
                            <div className="flex items-center gap-2">
                              <label className="text-[11px] text-muted-foreground">Largura da borda:</label>
                              <input
                                type="range"
                                min={1}
                                max={6}
                                step={1}
                                value={(section.settings?.imageBorderWidth as number) || 2}
                                onChange={e => setSetting(section.id, 'imageBorderWidth', Number(e.target.value))}
                                className="flex-1 h-1"
                              />
                              <span className="text-[11px] text-muted-foreground w-6 text-right">{(section.settings?.imageBorderWidth as number) || 2}px</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <label className="text-[11px] text-muted-foreground">Cor da borda:</label>
                              <input
                                type="color"
                                value={(section.settings?.imageBorderColor as string) || '#e91e8c'}
                                onChange={e => setSetting(section.id, 'imageBorderColor', e.target.value)}
                                className="h-6 w-8 rounded border border-border cursor-pointer"
                              />
                            </div>
                          </>
                        )}
                      </>
                    )}
                    <SectionDivider label="Categorias em destaque" />
                    <p className="text-[10px] text-muted-foreground">Selecione quais categorias aparecem nesta seção da home:</p>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {mockCategories.map(cat => {
                        const selectedIds = (section.settings?.selectedCategoryIds as string[]) || [];
                        const isSelected = selectedIds.includes(cat.id);
                        return (
                          <label
                            key={cat.id}
                            className={cn(
                              'flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors text-xs',
                              isSelected ? 'bg-primary/10 text-foreground' : 'hover:bg-muted/50 text-muted-foreground'
                            )}
                          >
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => {
                                const newIds = checked
                                  ? [...selectedIds, cat.id]
                                  : selectedIds.filter(id => id !== cat.id);
                                setSetting(section.id, 'selectedCategoryIds', newIds);
                              }}
                            />
                            {cat.image && (
                              <img src={cat.image} alt={cat.name} className="h-5 w-5 rounded-full object-cover shrink-0" />
                            )}
                            <FolderTree className="h-3 w-3 shrink-0" />
                            <span>{cat.name}</span>
                          </label>
                        );
                      })}
                    </div>
                    {((section.settings?.selectedCategoryIds as string[]) || []).length === 0 && (
                      <p className="text-[10px] text-amber-500">Nenhuma selecionada — todas serão exibidas por padrão.</p>
                    )}
                  </>
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-3">
        {!showAddMenu ? (
          <button
            onClick={() => {
              setShowAddMenu(true);
              setNewSectionType(availableSectionTypes[0].type);
              setNewSectionName('');
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Adicionar seção
          </button>
        ) : (
          <div className="space-y-2 p-3 rounded-lg border border-border bg-background">
            <select
              value={newSectionType}
              onChange={e => {
                setNewSectionType(e.target.value as ThemeHomepageSection['type']);
                const found = availableSectionTypes.find(s => s.type === e.target.value);
                if (found && !newSectionName) setNewSectionName(found.label);
              }}
              className="w-full h-8 text-sm rounded border border-border bg-background px-2"
            >
              {availableSectionTypes.map(st => (
                <option key={st.type} value={st.type}>{st.label}</option>
              ))}
            </select>
            <Input
              value={newSectionName}
              onChange={e => setNewSectionName(e.target.value)}
              placeholder="Nome da seção"
              className="h-8 text-sm"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const label = newSectionName.trim() || availableSectionTypes.find(s => s.type === newSectionType)?.label || 'Nova seção';
                  const newSection: ThemeHomepageSection = {
                    id: `${newSectionType}-${Date.now()}`,
                    type: newSectionType,
                    enabled: true,
                    title: label,
                    showTitle: true,
                    settings: {},
                  };
                  updateDraft({ homepageSections: [...sections, newSection] });
                  setShowAddMenu(false);
                  setNewSectionName('');
                  setTimeout(() => {
                    const el = document.getElementById(`section-${newSection.id}`);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }, 150);
                }}
                className="flex-1 h-8 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Adicionar
              </button>
              <button
                onClick={() => {
                  setShowAddMenu(false);
                  setNewSectionName('');
                }}
                className="flex-1 h-8 rounded-lg border border-border text-sm font-medium hover:bg-muted/50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

    </EditorSection>
  );
}
