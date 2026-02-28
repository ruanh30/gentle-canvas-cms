import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, TextField, OptionPicker, SectionDivider } from '../EditorControls';
import { Menu, Plus, Trash2, ChevronDown, ChevronRight, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ThemeMenuItem } from '@/types/theme';

function MenuItemEditor({ item, onUpdate, onDelete, depth = 0 }: {
  item: ThemeMenuItem;
  onUpdate: (updated: ThemeMenuItem) => void;
  onDelete: () => void;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const addChild = () => {
    const child: ThemeMenuItem = {
      id: `mi-${Date.now()}`,
      label: 'Subitem',
      link: '',
      openNewTab: false,
      badge: '',
      badgeColor: '#ef4444',
      icon: '',
      children: [],
    };
    onUpdate({ ...item, children: [...item.children, child] });
  };

  const updateChild = (idx: number, updated: ThemeMenuItem) => {
    const children = [...item.children];
    children[idx] = updated;
    onUpdate({ ...item, children });
  };

  const removeChild = (idx: number) => {
    onUpdate({ ...item, children: item.children.filter((_, i) => i !== idx) });
  };

  return (
    <div className={cn('border border-border rounded-lg', depth > 0 && 'ml-4 border-dashed')}>
      <div className="flex items-center gap-1.5 p-2">
        <GripVertical className="h-3 w-3 text-muted-foreground cursor-grab shrink-0" />
        {item.children.length > 0 || depth === 0 ? (
          <button onClick={() => setExpanded(!expanded)} className="p-0.5">
            {expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </button>
        ) : <div className="w-4" />}
        <Input value={item.label} onChange={e => onUpdate({ ...item, label: e.target.value })} className="h-6 text-xs flex-1" placeholder="Label" />
        <Input value={item.link} onChange={e => onUpdate({ ...item, link: e.target.value })} className="h-6 text-xs w-24" placeholder="/link" />
        {item.badge && (
          <span className="text-[9px] font-bold px-1 py-0.5 rounded" style={{ backgroundColor: item.badgeColor, color: '#fff' }}>
            {item.badge}
          </span>
        )}
        <button onClick={onDelete} className="p-0.5 text-destructive hover:bg-destructive/10 rounded">
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
      {expanded && (
        <div className="px-2 pb-2 space-y-1.5">
          <div className="flex gap-2">
            <Input value={item.badge} onChange={e => onUpdate({ ...item, badge: e.target.value })} className="h-6 text-xs flex-1" placeholder="Badge (ex: Novo, -30%)" />
            <input type="color" value={item.badgeColor} onChange={e => onUpdate({ ...item, badgeColor: e.target.value })} className="h-6 w-8 rounded border cursor-pointer" />
          </div>
          <label className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <input type="checkbox" checked={item.openNewTab} onChange={e => onUpdate({ ...item, openNewTab: e.target.checked })} className="rounded" />
            Abrir em nova aba
          </label>
          {depth === 0 && (
            <>
              <div className="space-y-1">
                {item.children.map((child, idx) => (
                  <MenuItemEditor
                    key={child.id}
                    item={child}
                    onUpdate={updated => updateChild(idx, updated)}
                    onDelete={() => removeChild(idx)}
                    depth={1}
                  />
                ))}
              </div>
              <Button size="sm" variant="ghost" className="h-6 text-[10px] w-full" onClick={addChild}>
                <Plus className="h-3 w-3 mr-1" /> Adicionar subitem
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function MegaMenuPanel() {
  const { draft, updateDraftSection } = useTheme();
  const mm = draft.megaMenu ?? { items: [], mobileGroupStyle: 'accordion', showIcons: false, showBadges: true };
  const set = (u: Partial<typeof mm>) => updateDraftSection('megaMenu', u as any);

  const addItem = () => {
    const newItem: ThemeMenuItem = {
      id: `mi-${Date.now()}`,
      label: 'Novo item',
      link: '',
      openNewTab: false,
      badge: '',
      badgeColor: '#ef4444',
      icon: '',
      children: [],
    };
    set({ items: [...mm.items, newItem] });
  };

  const updateItem = (idx: number, updated: ThemeMenuItem) => {
    const items = [...mm.items];
    items[idx] = updated;
    set({ items });
  };

  const removeItem = (idx: number) => {
    set({ items: mm.items.filter((_, i) => i !== idx) });
  };

  return (
    <EditorSection icon={Menu} title="Mega Menu" description="Configure o menu de navegação com 2 níveis, badges e links externos">
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed">
        Crie itens de menu com subcategorias, etiquetas visuais e links personalizados. Se vazio, o menu padrão será usado.
      </p>

      <ToggleRow label="Exibir ícones" hint="Mostra ícones ao lado dos itens do menu" checked={mm.showIcons} onChange={v => set({ showIcons: v })} />
      <ToggleRow label="Exibir badges" hint="Mostra etiquetas como 'Novo', 'Promo' nos itens do menu" checked={mm.showBadges} onChange={v => set({ showBadges: v })} />
      <OptionPicker label="Menu mobile" value={mm.mobileGroupStyle} onChange={v => set({ mobileGroupStyle: v })} options={[
        { value: 'accordion', label: 'Accordion', description: 'Subitens expandem ao tocar' },
        { value: 'list', label: 'Lista', description: 'Subitens sempre visíveis' },
      ]} />

      <SectionDivider label="Itens do Menu" />
      <div className="space-y-1.5">
        {mm.items.map((item, idx) => (
          <MenuItemEditor
            key={item.id}
            item={item}
            onUpdate={updated => updateItem(idx, updated)}
            onDelete={() => removeItem(idx)}
          />
        ))}
      </div>

      <Button size="sm" variant="outline" className="w-full h-8 text-xs" onClick={addItem}>
        <Plus className="h-3.5 w-3.5 mr-1" /> Adicionar item de menu
      </Button>
    </EditorSection>
  );
}
