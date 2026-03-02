import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, ChevronDown, ChevronRight, GripVertical, Palette, Save, Menu, ExternalLink, Tag, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ThemeMenuItem } from '@/types/theme';
import { toast } from 'sonner';
import { mockCategories } from '@/data/mock';

/* ------------------------------------------------------------------ */
/*  Destination options for the link dropdown                          */
/* ------------------------------------------------------------------ */

const FIXED_PAGES = [
  { value: '/', label: 'Início' },
  { value: '/products', label: 'Todos os Produtos' },
  { value: '/cart', label: 'Carrinho' },
  { value: '/wishlist', label: 'Lista de Desejos' },
  { value: '/login', label: 'Login / Conta' },
  { value: '/orders', label: 'Meus Pedidos' },
];

function DestinationSelect({ value, onChange, className }: { value: string; onChange: (v: string) => void; className?: string }) {
  const categoryOptions = mockCategories.map(cat => ({
    value: `/products?category=${cat.slug}`,
    label: cat.name,
  }));

  // Check if current value matches a known option
  const allOptions = [...FIXED_PAGES, ...categoryOptions];
  const isCustom = value && !allOptions.some(o => o.value === value);

  return (
    <Select value={isCustom ? '__custom__' : value} onValueChange={v => { if (v !== '__custom__') onChange(v); }}>
      <SelectTrigger className={cn("h-8 text-xs", className)}>
        <SelectValue placeholder="Escolha o destino" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-[10px]">Páginas</SelectLabel>
          {FIXED_PAGES.map(p => (
            <SelectItem key={p.value} value={p.value} className="text-xs">{p.label}</SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel className="text-[10px]">Categorias</SelectLabel>
          {categoryOptions.map(c => (
            <SelectItem key={c.value} value={c.value} className="text-xs">{c.label}</SelectItem>
          ))}
        </SelectGroup>
        {isCustom && (
          <SelectGroup>
            <SelectLabel className="text-[10px]">Personalizado</SelectLabel>
            <SelectItem value="__custom__" className="text-xs font-mono">{value}</SelectItem>
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
}

/* ------------------------------------------------------------------ */
/*  Subitem Editor (depth = 1, simplified)                             */
/* ------------------------------------------------------------------ */

function SubitemEditor({ item, onUpdate, onDelete }: {
  item: ThemeMenuItem;
  onUpdate: (updated: ThemeMenuItem) => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-dashed border-border rounded-md bg-muted/20">
      <div className="flex items-center gap-2 px-3 py-2">
        <GripVertical className="h-3.5 w-3.5 text-muted-foreground/30 shrink-0" />
        <Input
          value={item.label}
          onChange={e => onUpdate({ ...item, label: e.target.value })}
          className="h-8 text-xs flex-1"
          placeholder="Nome do subitem"
        />
        <DestinationSelect
          value={item.link}
          onChange={v => onUpdate({ ...item, link: v })}
          className="w-36"
        />
        <button onClick={() => setOpen(!open)} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
          {open ? <ChevronDown className="h-3.5 w-3.5" /> : <Settings2 className="h-3.5 w-3.5" />}
        </button>
        <button onClick={onDelete} className="p-1 text-destructive/60 hover:text-destructive transition-colors">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
      {open && (
        <div className="px-3 pb-3 pt-1 space-y-2 border-t border-border/50">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Badge</label>
              <Input value={item.badge} onChange={e => onUpdate({ ...item, badge: e.target.value })} className="h-7 text-xs mt-0.5" placeholder="Ex: Novo, -30%" />
            </div>
            <div>
              <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Cor</label>
              <input type="color" value={item.badgeColor} onChange={e => onUpdate({ ...item, badgeColor: e.target.value })} className="h-7 w-10 rounded border border-border cursor-pointer mt-0.5 block" />
            </div>
          </div>
          <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
            <input type="checkbox" checked={item.openNewTab} onChange={e => onUpdate({ ...item, openNewTab: e.target.checked })} className="rounded" />
            Abrir em nova aba
          </label>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Menu Item Editor (depth = 0)                                  */
/* ------------------------------------------------------------------ */

function MenuItemEditor({ item, onUpdate, onDelete }: {
  item: ThemeMenuItem;
  onUpdate: (updated: ThemeMenuItem) => void;
  onDelete: () => void;
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
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      {/* Item header row */}
      <div className="flex items-center gap-2 p-3 bg-card">
        <GripVertical className="h-4 w-4 text-muted-foreground/30 cursor-grab shrink-0" />
        <button onClick={() => setExpanded(!expanded)} className="p-0.5 text-muted-foreground hover:text-foreground transition-colors">
          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        <Input
          value={item.label}
          onChange={e => onUpdate({ ...item, label: e.target.value })}
          className="h-9 text-sm font-medium flex-1"
          placeholder="Nome do item"
        />
        <DestinationSelect
          value={item.link}
          onChange={v => onUpdate({ ...item, link: v })}
          className="w-40"
        />
        {item.badge && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0" style={{ backgroundColor: item.badgeColor, color: '#fff' }}>
            {item.badge}
          </span>
        )}
        {item.children.length > 0 && (
          <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded shrink-0">
            {item.children.length} sub
          </span>
        )}
        <button onClick={onDelete} className="p-1.5 text-destructive/60 hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-border bg-muted/20 p-4 space-y-4">
          {/* Badge & Options */}
          <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
            <div>
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Tag className="h-3 w-3" /> Badge promocional
              </label>
              <Input value={item.badge} onChange={e => onUpdate({ ...item, badge: e.target.value })} className="h-8 text-sm mt-1" placeholder="Ex: Novo, Promo, -30%" />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Cor</label>
              <input type="color" value={item.badgeColor} onChange={e => onUpdate({ ...item, badgeColor: e.target.value })} className="h-8 w-12 rounded border border-border cursor-pointer mt-1 block" />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input type="checkbox" checked={item.openNewTab} onChange={e => onUpdate({ ...item, openNewTab: e.target.checked })} className="rounded" />
            <ExternalLink className="h-3.5 w-3.5" />
            Abrir em nova aba
          </label>

          {/* Subitems */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Subitens ({item.children.length})
              </p>
            </div>
            {item.children.map((child, idx) => (
              <SubitemEditor
                key={child.id}
                item={child}
                onUpdate={updated => updateChild(idx, updated)}
                onDelete={() => removeChild(idx)}
              />
            ))}
            <Button size="sm" variant="ghost" className="w-full text-xs h-8 text-muted-foreground" onClick={addChild}>
              <Plus className="h-3 w-3 mr-1" /> Adicionar subitem
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
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
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Menu className="h-5 w-5" />
            Menu Principal
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Gerencie os links exibidos na barra de navegação da loja.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => navigate('/admin/customization')}>
            <Palette className="h-3.5 w-3.5" />
            Estilo Visual
          </Button>
          {isDirty && (
            <Button size="sm" className="gap-1.5 text-xs" onClick={handleSave}>
              <Save className="h-3.5 w-3.5" />
              Publicar
            </Button>
          )}
        </div>
      </div>

      {/* Settings Card */}
      <div className="border border-border rounded-lg bg-card">
        <div className="px-4 py-3 border-b border-border">
          <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <Settings2 className="h-3.5 w-3.5" />
            Preferências do Menu
          </p>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Badges promocionais</p>
              <p className="text-[11px] text-muted-foreground">Exibe etiquetas como "Novo" ou "-30%" ao lado dos itens.</p>
            </div>
            <Switch checked={mm.showBadges} onCheckedChange={v => set({ showBadges: v })} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Ícones nos itens</p>
              <p className="text-[11px] text-muted-foreground">Adiciona um ícone à esquerda de cada item do menu.</p>
            </div>
            <Switch checked={mm.showIcons} onCheckedChange={v => set({ showIcons: v })} />
          </div>
          <div className="border-t border-border pt-4">
            <p className="text-sm font-medium text-foreground mb-2">Estilo no celular</p>
            <p className="text-[11px] text-muted-foreground mb-2">Como os subitens são exibidos em telas pequenas.</p>
            <div className="flex gap-2">
              {([
                { value: 'accordion', label: 'Acordeão', hint: 'Expande ao tocar' },
                { value: 'list', label: 'Lista', hint: 'Tudo visível' },
              ] as const).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => set({ mobileGroupStyle: opt.value })}
                  className={cn(
                    'flex-1 px-3 py-2 rounded-md text-sm font-medium border transition-colors text-center',
                    mm.mobileGroupStyle === opt.value
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-card text-muted-foreground border-border hover:bg-muted/50'
                  )}
                >
                  <span className="block">{opt.label}</span>
                  <span className="block text-[10px] font-normal opacity-70">{opt.hint}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">Itens do Menu</p>
            <p className="text-[11px] text-muted-foreground">Clique na seta para expandir e configurar subitens e badges.</p>
          </div>
          <span className="text-xs text-muted-foreground tabular-nums">{mm.items.length} {mm.items.length === 1 ? 'item' : 'itens'}</span>
        </div>

        {mm.items.length === 0 && (
          <div className="border-2 border-dashed border-border rounded-lg py-10 text-center">
            <Menu className="h-7 w-7 text-muted-foreground/20 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Nenhum item adicionado</p>
            <p className="text-[11px] text-muted-foreground/60 mt-1">Quando vazio, a loja usará o menu padrão com categorias automáticas.</p>
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
          <Plus className="h-4 w-4 mr-2" /> Adicionar item
        </Button>
      </div>

      <p className="text-[11px] text-muted-foreground/50 text-center">
        Alterações refletem no preview do Editor de Tema em tempo real.
      </p>
    </div>
  );
}
