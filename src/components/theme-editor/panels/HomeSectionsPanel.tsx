import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, TextField, SectionDivider, HintTooltip, SelectField, NumberSlider } from '../EditorControls';
import { Grid3X3, GripVertical, ChevronUp, ChevronDown, Plus, Trash2, Pencil, Check, X, Eye, EyeOff, Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThemeHomepageSection } from '@/types/theme';
import { mockCollections } from '@/data/mock';

const sectionTypes: { value: ThemeHomepageSection['type']; label: string }[] = [
  { value: 'hero', label: 'Hero Banner' },
  { value: 'categories', label: 'Categorias' },
  { value: 'featured-products', label: 'Produtos em Destaque' },
  { value: 'collections', label: '📦 Coleção de Produtos' },
  { value: 'banner', label: 'Banner Promocional' },
  { value: 'benefits', label: 'Benefícios' },
  { value: 'testimonials', label: 'Depoimentos' },
  { value: 'brands', label: 'Marcas' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'trust-bar', label: 'Selos de Confiança' },
  { value: 'custom-html', label: 'HTML Customizado' },
];

const carouselSections = ['categories', 'featured-products'];

export function HomeSectionsPanel() {
  const { draft, toggleSection, reorderSections, updateDraft } = useTheme();
  const sections = draft.homepageSections;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newType, setNewType] = useState<ThemeHomepageSection['type']>('banner');
  const [newTitle, setNewTitle] = useState('');

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

  const [newCollectionId, setNewCollectionId] = useState<string>('');

  const addSection = () => {
    if (!newTitle.trim()) return;
    const newSection: ThemeHomepageSection = {
      id: `custom-${Date.now()}`,
      type: newType,
      enabled: true,
      title: newTitle.trim(),
      showTitle: true,
      settings: newType === 'collections' && newCollectionId ? { collectionId: newCollectionId } : {},
    };
    updateDraft({
      homepageSections: [...sections, newSection],
    });
    setNewTitle('');
    setNewCollectionId('');
    setShowAdd(false);
  };

  return (
    <EditorSection icon={Grid3X3} title="Seções da Home" description="Ative, desative, renomeie e reordene as seções">
      <p className="text-[11px] text-muted-foreground">Use as setas para reordenar. Clique no lápis para renomear.<HintTooltip text="Cada seção pode ser ativada/desativada, renomeada, reordenada ou removida. Adicione novas seções com o botão +" /></p>
      <div className="space-y-1">
        {sections.map((section, idx) => (
          <React.Fragment key={section.id}>
            <div
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
        {/* Collection linking */}
            {section.type === 'collections' && section.enabled && (
              <div className="ml-6 mt-1 mb-2 p-2 bg-muted/30 rounded-md space-y-2">
                <div className="flex items-center gap-2">
                  <Link2 className="h-3 w-3 text-muted-foreground shrink-0" />
                  <label className="text-[11px] text-muted-foreground">Coleção vinculada:</label>
                </div>
                <select
                  value={(section.settings?.collectionId as string) || ''}
                  onChange={e => setSetting(section.id, 'collectionId', e.target.value)}
                  className="w-full h-7 text-[11px] rounded border border-border bg-background px-1.5"
                >
                  <option value="">Selecionar coleção...</option>
                  {mockCollections.map(col => (
                    <option key={col.id} value={col.id}>{col.name} ({col.productIds.length} produtos)</option>
                  ))}
                </select>
                {!(section.settings?.collectionId) && (
                  <p className="text-[10px] text-warning">⚠ Vincule uma coleção criada em Produtos &gt; Coleções</p>
                )}
                <div className="flex items-center gap-2">
                  <label className="text-[11px] text-muted-foreground">Exibição:</label>
                  <select
                    value={(section.settings?.displayMode as string) || 'carousel'}
                    onChange={e => setSetting(section.id, 'displayMode', e.target.value)}
                    className="h-6 text-[11px] rounded border border-border bg-background px-1.5"
                  >
                    <option value="grid">Grade</option>
                    <option value="carousel">Carrossel</option>
                  </select>
                </div>
              </div>
            )}
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
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {showAdd ? (
        <div className="border border-border rounded-lg p-3 space-y-2">
          <Select value={newType} onValueChange={v => setNewType(v as ThemeHomepageSection['type'])}>
            <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              {sectionTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
            </SelectContent>
          </Select>
          {newType === 'collections' && (
            <Select value={newCollectionId} onValueChange={setNewCollectionId}>
              <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Vincular coleção..." /></SelectTrigger>
              <SelectContent>
                {mockCollections.map(col => (
                  <SelectItem key={col.id} value={col.id}>{col.name} ({col.productIds.length} produtos)</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Input
            placeholder="Nome da seção na home"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            className="h-8 text-xs"
            onKeyDown={e => e.key === 'Enter' && addSection()}
          />
          <div className="flex gap-2">
            <Button size="sm" className="h-7 text-xs flex-1" onClick={addSection}>Adicionar</Button>
            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setShowAdd(false)}>Cancelar</Button>
          </div>
        </div>
      ) : (
        <Button size="sm" variant="outline" className="w-full h-8 text-xs" onClick={() => setShowAdd(true)}>
          <Plus className="h-3.5 w-3.5 mr-1" /> Adicionar seção
        </Button>
      )}
    </EditorSection>
  );
}
