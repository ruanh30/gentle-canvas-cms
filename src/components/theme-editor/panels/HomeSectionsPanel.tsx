import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, TextField, SectionDivider, HintTooltip } from '../EditorControls';
import { Grid3X3, GripVertical, ChevronUp, ChevronDown, Plus, Trash2, Pencil, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThemeHomepageSection } from '@/types/theme';

const sectionTypes: { value: ThemeHomepageSection['type']; label: string }[] = [
  { value: 'hero', label: 'Hero Banner' },
  { value: 'categories', label: 'Categorias' },
  { value: 'featured-products', label: 'Produtos em Destaque' },
  { value: 'banner', label: 'Banner Promocional' },
  { value: 'benefits', label: 'Benefícios' },
  { value: 'testimonials', label: 'Depoimentos' },
  { value: 'brands', label: 'Marcas' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'trust-bar', label: 'Selos de Confiança' },
  { value: 'custom-html', label: 'HTML Customizado' },
];

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

  const addSection = () => {
    if (!newTitle.trim()) return;
    const newSection: ThemeHomepageSection = {
      id: `custom-${Date.now()}`,
      type: newType,
      enabled: true,
      title: newTitle.trim(),
      settings: {},
    };
    updateDraft({
      homepageSections: [...sections, newSection],
    });
    setNewTitle('');
    setShowAdd(false);
  };

  return (
    <EditorSection icon={Grid3X3} title="Seções da Home" description="Ative, desative, renomeie e reordene as seções">
      <p className="text-[11px] text-muted-foreground">Use as setas para reordenar. Clique no lápis para renomear.<HintTooltip text="Cada seção pode ser ativada/desativada, renomeada, reordenada ou removida. Adicione novas seções com o botão +" /></p>
      <div className="space-y-1">
        {sections.map((section, idx) => (
          <div
            key={section.id}
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

      {showAdd ? (
        <div className="border border-border rounded-lg p-3 space-y-2">
          <Select value={newType} onValueChange={v => setNewType(v as ThemeHomepageSection['type'])}>
            <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              {sectionTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Input
            placeholder="Nome da seção"
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
