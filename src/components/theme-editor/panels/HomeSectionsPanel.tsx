import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, SectionDivider, HintTooltip } from '../EditorControls';
import { Grid3X3, GripVertical, ChevronUp, ChevronDown, Trash2, Pencil, Check, X, Eye, EyeOff, FolderTree, Plus, Maximize2 } from 'lucide-react';
import { ThemeHomepageSection } from '@/types/theme';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { mockCategories, mockCollections } from '@/data/mock';
import { HomeSectionsDialog } from './HomeSectionsDialog';

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
  const [selectedCollectionId, setSelectedCollectionId] = useState('');
  const [showDialog, setShowDialog] = useState(false);

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
      <p className="text-[11px] text-muted-foreground">
        Use as setas para reordenar. Clique no lápis para renomear.
        <HintTooltip text="Cada seção pode ser ativada/desativada, renomeada, reordenada ou removida." />
      </p>

      {/* Compact section list */}
      <div className="space-y-1">
        {sections.map((section, idx) => (
          <div
            key={section.id}
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
                <span className="text-sm font-medium flex-1 truncate">{section.title}</span>
                <button onClick={() => startEdit(section.id, section.title)} className="p-0.5 hover:bg-background rounded opacity-60 hover:opacity-100">
                  <Pencil className="h-3 w-3" />
                </button>
              </>
            )}
            <div className="flex items-center gap-1">
              <button onClick={() => idx > 0 && reorderSections(idx, idx - 1)} className="p-0.5 hover:bg-background rounded" disabled={idx === 0}>
                <ChevronUp className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => idx < sections.length - 1 && reorderSections(idx, idx + 1)} className="p-0.5 hover:bg-background rounded" disabled={idx === sections.length - 1}>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              onClick={() => updateDraft({
                homepageSections: sections.map(s => s.id === section.id ? { ...s, showTitle: !(s.showTitle ?? true) } : s),
              })}
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
        ))}
      </div>

      {/* Open full editor dialog */}
      <button
        onClick={() => setShowDialog(true)}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors mt-2"
      >
        <Maximize2 className="h-4 w-4" />
        Abrir editor completo das seções
      </button>
      <p className="text-[10px] text-muted-foreground text-center -mt-1">
        Edite conteúdo, imagens, vídeos e configurações de cada seção em tela ampla
      </p>

      {/* Add section */}
      <div className="mt-2">
        {!showAddMenu ? (
          <button
            onClick={() => {
              setShowAddMenu(true);
              setNewSectionType(availableSectionTypes[0].type);
              setNewSectionName('');
              setSelectedCollectionId('');
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
                const type = e.target.value as ThemeHomepageSection['type'];
                setNewSectionType(type);
                setSelectedCollectionId('');
                if (type !== 'collections') {
                  const found = availableSectionTypes.find(s => s.type === type);
                  if (found && !newSectionName) setNewSectionName(found.label);
                } else {
                  setNewSectionName('');
                }
              }}
              className="w-full h-8 text-sm rounded border border-border bg-background px-2"
            >
              {availableSectionTypes.map(st => (
                <option key={st.type} value={st.type}>{st.label}</option>
              ))}
            </select>
            {newSectionType === 'collections' ? (
              <>
                <p className="text-[10px] text-muted-foreground">Selecione a coleção:</p>
                <select
                  value={selectedCollectionId}
                  onChange={e => {
                    setSelectedCollectionId(e.target.value);
                    const col = mockCollections.find(c => c.id === e.target.value);
                    if (col) setNewSectionName(col.name);
                  }}
                  className="w-full h-8 text-sm rounded border border-border bg-background px-2"
                >
                  <option value="">— Escolha uma coleção —</option>
                  {mockCollections.filter(c => c.active).map(col => (
                    <option key={col.id} value={col.id}>{col.name}</option>
                  ))}
                </select>
              </>
            ) : (
              <Input
                value={newSectionName}
                onChange={e => setNewSectionName(e.target.value)}
                placeholder="Nome da seção"
                className="h-8 text-sm"
              />
            )}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (newSectionType === 'collections' && !selectedCollectionId) return;
                  const label = newSectionName.trim() || availableSectionTypes.find(s => s.type === newSectionType)?.label || 'Nova seção';
                  const newSection: ThemeHomepageSection = {
                    id: newSectionType === 'collections' ? selectedCollectionId : `${newSectionType}-${Date.now()}`,
                    type: newSectionType,
                    enabled: true,
                    title: label,
                    showTitle: true,
                    settings: newSectionType === 'collections' ? { collectionId: selectedCollectionId } : {},
                  };
                  updateDraft({ homepageSections: [...sections, newSection] });
                  setShowAddMenu(false);
                  setNewSectionName('');
                  setSelectedCollectionId('');
                  setTimeout(() => {
                    const el = document.getElementById(`section-${newSection.id}`);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }, 150);
                }}
                disabled={newSectionType === 'collections' && !selectedCollectionId}
                className="flex-1 h-8 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
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

      <HomeSectionsDialog open={showDialog} onOpenChange={setShowDialog} />
    </EditorSection>
  );
}
