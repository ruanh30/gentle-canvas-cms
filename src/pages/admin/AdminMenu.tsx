import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Menu, Plus, Trash2, ChevronDown, ChevronRight, GripVertical, Palette, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { ThemeMenuItem } from '@/types/theme';
import { toast } from 'sonner';

/* ------------------------------------------------------------------ */
/*  Menu Item Editor (recursive, 2 levels)                             */
/* ------------------------------------------------------------------ */

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
    <div className={cn('border border-border rounded-lg', depth > 0 && 'ml-6 border-dashed')}>
      <div className="flex items-center gap-2 p-3">
        <GripVertical className="h-4 w-4 text-muted-foreground/40 cursor-grab shrink-0" />
        {item.children.length > 0 || depth === 0 ? (
          <button onClick={() => setExpanded(!expanded)} className="p-0.5">
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        ) : <div className="w-5" />}
        <Input value={item.label} onChange={e => onUpdate({ ...item, label: e.target.value })} className="h-9 text-sm flex-1" placeholder="Nome do item" />
        <Input value={item.link} onChange={e => onUpdate({ ...item, link: e.target.value })} className="h-9 text-sm w-36" placeholder="/link" />
        {item.badge && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: item.badgeColor, color: '#fff' }}>
            {item.badge}
          </span>
        )}
        <button onClick={onDelete} className="p-1.5 text-destructive hover:bg-destructive/10 rounded-md transition-colors">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      {expanded && (
        <div className="px-3 pb-3 space-y-3 border-t border-border pt-3">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground">Badge (ex: Novo, -30%)</label>
              <Input value={item.badge} onChange={e => onUpdate({ ...item, badge: e.target.value })} className="h-9 text-sm mt-1" placeholder="Badge" />
            </div>
            <div className="w-20">
              <label className="text-xs font-medium text-muted-foreground">Cor do badge</label>
              <input type="color" value={item.badgeColor} onChange={e => onUpdate({ ...item, badgeColor: e.target.value })} className="h-9 w-full rounded-md border border-border cursor-pointer mt-1" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" checked={item.openNewTab} onChange={e => onUpdate({ ...item, openNewTab: e.target.checked })} className="rounded" />
            Abrir em nova aba
          </label>
          {depth === 0 && (
            <>
              <div className="space-y-2 mt-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subitens</p>
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
              <Button size="sm" variant="ghost" className="w-full text-xs" onClick={addChild}>
                <Plus className="h-3.5 w-3.5 mr-1" /> Adicionar subitem
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Admin Menu Page                                               */
/* ------------------------------------------------------------------ */

export default function AdminMenu() {
  const { draft, updateDraftSection, publish, isDirty } = useTheme();
  const navigate = useNavigate();
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

  const handleSave = () => {
    publish('Atualização do menu');
    toast.success('Menu salvo e publicado!');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Menu de Navegação</h1>
          <p className="text-sm text-muted-foreground">Organize os links do menu principal com subitens, badges e links externos</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => navigate('/admin/customization')}>
            <Palette className="h-4 w-4" />
            Estilo do Menu
          </Button>
          {isDirty && (
            <Button size="sm" className="gap-1.5" onClick={handleSave}>
              <Save className="h-4 w-4" />
              Publicar
            </Button>
          )}
        </div>
      </div>

      {/* Settings */}
      <div className="border border-border rounded-lg p-4 bg-card space-y-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Configurações</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Exibir ícones</p>
              <p className="text-xs text-muted-foreground">Mostra ícones ao lado dos itens</p>
            </div>
            <Switch checked={mm.showIcons} onCheckedChange={v => set({ showIcons: v })} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Exibir badges</p>
              <p className="text-xs text-muted-foreground">Etiquetas como 'Novo', 'Promo'</p>
            </div>
            <Switch checked={mm.showBadges} onCheckedChange={v => set({ showBadges: v })} />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground mb-2">Menu mobile</p>
          <div className="flex gap-2">
            {([
              { value: 'accordion', label: 'Accordion' },
              { value: 'list', label: 'Lista' },
            ] as const).map(opt => (
              <button
                key={opt.value}
                onClick={() => set({ mobileGroupStyle: opt.value })}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium border transition-colors',
                  mm.mobileGroupStyle === opt.value
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-card text-muted-foreground border-border hover:bg-muted/50'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">Itens do Menu</p>
          <span className="text-xs text-muted-foreground">{mm.items.length} itens</span>
        </div>

        {mm.items.length === 0 && (
          <div className="border-2 border-dashed border-border rounded-lg py-10 text-center">
            <Menu className="h-8 w-8 text-muted-foreground/25 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Nenhum item no menu</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Se vazio, o menu padrão será usado.</p>
          </div>
        )}

        {mm.items.map((item, idx) => (
          <MenuItemEditor
            key={item.id}
            item={item}
            onUpdate={updated => updateItem(idx, updated)}
            onDelete={() => removeItem(idx)}
          />
        ))}

        <Button variant="outline" className="w-full" onClick={addItem}>
          <Plus className="h-4 w-4 mr-2" /> Adicionar item de menu
        </Button>
      </div>

      <p className="text-xs text-muted-foreground/60 text-center">
        Arraste os itens para reordenar. As alterações são sincronizadas com o Editor de Tema automaticamente.
      </p>
    </div>
  );
}