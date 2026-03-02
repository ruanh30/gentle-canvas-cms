import React, { useState, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Trash2, ChevronDown, ChevronRight, GripVertical, Palette, Save,
  Menu, ExternalLink, Tag, Settings2, PanelTop, Megaphone, ImageIcon,
  Eye, EyeOff, Search, User, Heart, ShoppingBag, LayoutGrid, Smartphone,
  Monitor, Type, MousePointer, Columns3, Box, Sparkles, RotateCcw,
  Copy, ChevronLeft, Grip, AlignVerticalJustifyCenter, SlidersHorizontal,
  Layers, Navigation, Zap
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ThemeMenuItem, ThemeHeaderStateStyle } from '@/types/theme';
import { toast } from 'sonner';
import { mockCategories } from '@/data/mock';
import { ScrollArea } from '@/components/ui/scroll-area';

/* ================================================================== */
/*  SHARED CONTROLS                                                    */
/* ================================================================== */

type SectionKey =
  | 'presets' | 'layout' | 'states' | 'container' | 'menu-style'
  | 'mega-menu' | 'icons' | 'search' | 'mobile' | 'items'
  | 'announcement' | 'banner';

interface SidebarItem {
  key: SectionKey;
  label: string;
  icon: React.ElementType;
  group: string;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { key: 'presets', label: 'Presets', icon: Sparkles, group: 'Início Rápido' },
  { key: 'layout', label: 'Layout', icon: LayoutGrid, group: 'Estrutura' },
  { key: 'states', label: 'Estados', icon: Layers, group: 'Estrutura' },
  { key: 'container', label: 'Container', icon: Columns3, group: 'Estrutura' },
  { key: 'menu-style', label: 'Menu Desktop', icon: Navigation, group: 'Navegação' },
  { key: 'mega-menu', label: 'Mega Menu', icon: LayoutGrid, group: 'Navegação' },
  { key: 'icons', label: 'Ícones & Ações', icon: MousePointer, group: 'Navegação' },
  { key: 'search', label: 'Busca', icon: Search, group: 'Navegação' },
  { key: 'mobile', label: 'Menu Mobile', icon: Smartphone, group: 'Navegação' },
  { key: 'items', label: 'Itens do Menu', icon: Menu, group: 'Conteúdo' },
  { key: 'announcement', label: 'Barra de Anúncio', icon: Megaphone, group: 'Extras' },
  { key: 'banner', label: 'Banner', icon: ImageIcon, group: 'Extras' },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 pt-2">{children}</p>;
}

function SectionHeader({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="pb-4 border-b border-border/50 mb-5">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="text-[11px] text-muted-foreground leading-tight">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, hint, checked, onChange }: {
  label: string; hint?: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="pr-3">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function NumberSlider({ label, value, onChange, min, max, suffix = '', step = 1 }: {
  label: string; value: number; onChange: (v: number) => void; min: number; max: number; suffix?: string; step?: number;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <span className="text-xs text-muted-foreground tabular-nums">{value}{suffix}</span>
      </div>
      <Slider value={[value]} onValueChange={v => onChange(v[0])} min={min} max={max} step={step} className="w-full" />
    </div>
  );
}

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2">
        <input type="color" value={value || '#ffffff'} onChange={e => onChange(e.target.value)}
          className="w-8 h-8 rounded-md border border-border cursor-pointer" />
        <Input value={value} onChange={e => onChange(e.target.value)} className="font-mono text-xs h-8 w-24 uppercase" maxLength={7} />
      </div>
    </div>
  );
}

function OptionPicker({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string; description?: string }[];
}) {
  const isLong = options.some(o => o.label.length > 10) || options.length > 4;
  if (isLong) {
    return (
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <div className="space-y-1">
          {options.map(o => (
            <button key={o.value} onClick={() => onChange(o.value)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-md text-sm border transition-colors',
                value === o.value
                  ? 'bg-foreground text-background border-foreground font-medium'
                  : 'bg-card text-muted-foreground border-border hover:bg-muted/50'
              )}>
              <span className="block">{o.label}</span>
              {o.description && <span className="block text-[10px] opacity-70">{o.description}</span>}
            </button>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <div className="flex gap-1.5 flex-wrap">
        {options.map(o => (
          <button key={o.value} onClick={() => onChange(o.value)}
            className={cn(
              'px-3 py-1.5 rounded-md text-xs border transition-colors',
              value === o.value
                ? 'bg-foreground text-background border-foreground font-medium'
                : 'bg-card text-muted-foreground border-border hover:bg-muted/50'
            )}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  DESTINATION SELECT                                                 */
/* ================================================================== */

const FIXED_PAGES = [
  { value: '/', label: 'Início' },
  { value: '/products', label: 'Todos os Produtos' },
  { value: '/cart', label: 'Carrinho' },
  { value: '/wishlist', label: 'Lista de Desejos' },
  { value: '/login', label: 'Login / Conta' },
  { value: '/orders', label: 'Meus Pedidos' },
];

function DestinationSelect({ value, onChange, className }: { value: string; onChange: (v: string) => void; className?: string }) {
  const categoryOptions = mockCategories.map(cat => ({ value: `/products?category=${cat.slug}`, label: cat.name }));
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
          {FIXED_PAGES.map(p => <SelectItem key={p.value} value={p.value} className="text-xs">{p.label}</SelectItem>)}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel className="text-[10px]">Categorias</SelectLabel>
          {categoryOptions.map(c => <SelectItem key={c.value} value={c.value} className="text-xs">{c.label}</SelectItem>)}
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

/* ================================================================== */
/*  SUBITEM EDITOR                                                     */
/* ================================================================== */

function SubitemEditor({ item, onUpdate, onDelete }: {
  item: ThemeMenuItem; onUpdate: (u: ThemeMenuItem) => void; onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-dashed border-border rounded-md bg-muted/20">
      <div className="flex items-center gap-2 px-3 py-2">
        <GripVertical className="h-3.5 w-3.5 text-muted-foreground/30 shrink-0" />
        <Input value={item.label} onChange={e => onUpdate({ ...item, label: e.target.value })} className="h-8 text-xs flex-1" placeholder="Nome do subitem" />
        <DestinationSelect value={item.link} onChange={v => onUpdate({ ...item, link: v })} className="w-36" />
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

/* ================================================================== */
/*  MENU ITEM EDITOR                                                   */
/* ================================================================== */

function MenuItemEditor({ item, onUpdate, onDelete }: {
  item: ThemeMenuItem; onUpdate: (u: ThemeMenuItem) => void; onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const addChild = () => {
    onUpdate({ ...item, children: [...item.children, { id: `mi-${Date.now()}`, label: 'Subitem', link: '', openNewTab: false, badge: '', badgeColor: '#ef4444', icon: '', children: [] }] });
  };
  const updateChild = (idx: number, u: ThemeMenuItem) => { const c = [...item.children]; c[idx] = u; onUpdate({ ...item, children: c }); };
  const removeChild = (idx: number) => { onUpdate({ ...item, children: item.children.filter((_, i) => i !== idx) }); };

  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      <div className="flex items-center gap-2 p-3">
        <GripVertical className="h-4 w-4 text-muted-foreground/30 cursor-grab shrink-0" />
        <button onClick={() => setExpanded(!expanded)} className="p-0.5 text-muted-foreground hover:text-foreground transition-colors">
          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        <Input value={item.label} onChange={e => onUpdate({ ...item, label: e.target.value })} className="h-9 text-sm font-medium flex-1" placeholder="Nome do item" />
        <DestinationSelect value={item.link} onChange={v => onUpdate({ ...item, link: v })} className="w-40" />
        {item.badge && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0" style={{ backgroundColor: item.badgeColor, color: '#fff' }}>{item.badge}</span>}
        {item.children.length > 0 && <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded shrink-0">{item.children.length} sub</span>}
        <button onClick={onDelete} className="p-1.5 text-destructive/60 hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      {expanded && (
        <div className="border-t border-border bg-muted/20 p-4 space-y-4">
          <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
            <div>
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><Tag className="h-3 w-3" /> Badge promocional</label>
              <Input value={item.badge} onChange={e => onUpdate({ ...item, badge: e.target.value })} className="h-8 text-sm mt-1" placeholder="Ex: Novo, Promo, -30%" />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Cor</label>
              <input type="color" value={item.badgeColor} onChange={e => onUpdate({ ...item, badgeColor: e.target.value })} className="h-8 w-12 rounded border border-border cursor-pointer mt-1 block" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input type="checkbox" checked={item.openNewTab} onChange={e => onUpdate({ ...item, openNewTab: e.target.checked })} className="rounded" />
            <ExternalLink className="h-3.5 w-3.5" /> Abrir em nova aba
          </label>
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Subitens ({item.children.length})</p>
            {item.children.map((child, idx) => (
              <SubitemEditor key={child.id} item={child} onUpdate={u => updateChild(idx, u)} onDelete={() => removeChild(idx)} />
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

/* ================================================================== */
/*  HEADER PRESET PREVIEWS                                              */
/* ================================================================== */

interface HeaderPresetConfig {
  id: string;
  name: string;
  description: string;
  config: Record<string, any>;
}

const HEADER_PRESETS: HeaderPresetConfig[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, leve, sem ruído visual',
    config: {
      layout: 'classic', menuStyle: 'horizontal', menuUppercase: false, menuFontWeight: 400,
      menuFontSize: 13, menuHoverStyle: 'underline', menuSeparator: 'none', menuItemGap: 24,
      headerSurface: false, borderBottom: true, shadowOnScroll: false, iconStrokeWidth: 1.5,
      height: 56, sticky: true, shrinkOnScroll: false,
      states: {
        normal: { backgroundColor: '#ffffff', textColor: '#1a1a1a', borderBottom: true, borderColor: '#f0f0f0', shadow: 'none', blur: false, height: 56 },
        sticky: { backgroundColor: '#ffffff', textColor: '#1a1a1a', borderBottom: true, borderColor: '#e5e7eb', shadow: 'subtle', blur: true, height: 52 },
        transparent: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 56 },
      },
    },
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Sofisticado com sombras e profundidade',
    config: {
      layout: 'classic', menuStyle: 'dropdown', menuUppercase: true, menuFontWeight: 500,
      menuFontSize: 12, menuHoverStyle: 'both', menuSeparator: 'dot', menuItemGap: 16,
      headerSurface: true, dropdownElevated: true, borderBottom: true, shadowOnScroll: true,
      iconStrokeWidth: 1.5, height: 64, sticky: true, shrinkOnScroll: true,
      states: {
        normal: { backgroundColor: '#ffffff', textColor: '#1a1a1a', borderBottom: true, borderColor: '#e5e7eb', shadow: 'subtle', blur: false, height: 64 },
        sticky: { backgroundColor: '#ffffff', textColor: '#1a1a1a', borderBottom: true, borderColor: '#e5e7eb', shadow: 'medium', blur: true, height: 56 },
        transparent: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 64 },
      },
    },
  },
  {
    id: 'fashion',
    name: 'Fashion',
    description: 'Bold, contraste alto, tipografia forte',
    config: {
      layout: 'centered', menuStyle: 'horizontal', menuUppercase: true, menuFontWeight: 700,
      menuFontSize: 11, menuHoverStyle: 'underline', menuSeparator: 'none', menuItemGap: 32,
      menuLetterSpacing: 0.15, headerSurface: false, borderBottom: false, shadowOnScroll: false,
      iconStrokeWidth: 2, height: 72, sticky: true, shrinkOnScroll: true,
      states: {
        normal: { backgroundColor: '#000000', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 72 },
        sticky: { backgroundColor: '#000000', textColor: '#ffffff', borderBottom: true, borderColor: '#333333', shadow: 'subtle', blur: false, height: 52 },
        transparent: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 72 },
      },
    },
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Moderno, busca inline, duas linhas',
    config: {
      layout: 'double-row', menuStyle: 'mega-menu', menuUppercase: false, menuFontWeight: 500,
      menuFontSize: 14, menuHoverStyle: 'background', menuSeparator: 'none', menuItemGap: 8,
      headerSurface: true, dropdownElevated: true, borderBottom: true, shadowOnScroll: true,
      iconStrokeWidth: 1.5, height: 64, sticky: true, shrinkOnScroll: true,
      searchStyle: 'inline', showSearch: true,
      states: {
        normal: { backgroundColor: '#ffffff', textColor: '#0f172a', borderBottom: true, borderColor: '#e2e8f0', shadow: 'none', blur: false, height: 64 },
        sticky: { backgroundColor: '#f8fafc', textColor: '#0f172a', borderBottom: true, borderColor: '#e2e8f0', shadow: 'subtle', blur: true, height: 56 },
        transparent: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 64 },
      },
    },
  },
];

function PresetMiniPreview({ preset, isActive }: { preset: HeaderPresetConfig; isActive: boolean }) {
  const p = preset.config;
  const normalState = p.states?.normal;
  const bg = normalState?.backgroundColor || '#ffffff';
  const text = normalState?.textColor || '#1a1a1a';
  const isCentered = p.layout === 'centered';
  const isDoubleRow = p.layout === 'double-row';

  return (
    <button
      onClick={() => {}}
      className={cn(
        'relative w-full rounded-xl border-2 transition-all duration-200 overflow-hidden group',
        isActive
          ? 'border-primary ring-2 ring-primary/20 shadow-md'
          : 'border-border/60 hover:border-primary/40 hover:shadow-sm'
      )}
    >
      {/* Mini SVG preview */}
      <div className="p-2.5">
        <svg viewBox="0 0 200 60" className="w-full" style={{ height: isDoubleRow ? 48 : 36 }}>
          {/* Background */}
          <rect width="200" height={isDoubleRow ? 60 : 36} rx="4" fill={bg} stroke={normalState?.borderBottom ? (normalState.borderColor || '#e5e7eb') : 'none'} strokeWidth="1" />

          {isCentered ? (
            <>
              {/* Centered: icons left, logo center, icons right */}
              <rect x="12" y="10" width="16" height="4" rx="2" fill={text} opacity="0.2" />
              <rect x="85" y="8" width="30" height="6" rx="2" fill={text} opacity="0.7" />
              <circle cx="180" cy="12" r="4" fill={text} opacity="0.25" />
              <circle cx="170" cy="12" r="4" fill={text} opacity="0.25" />
              {/* Nav below */}
              {[50, 80, 110, 140].map((x, i) => (
                <rect key={i} x={x} y="24" width="20" height="3" rx="1" fill={text} opacity={i === 0 ? 0.6 : 0.25} />
              ))}
            </>
          ) : isDoubleRow ? (
            <>
              {/* Row 1: logo + search + icons */}
              <rect x="12" y="6" width="30" height="6" rx="2" fill={text} opacity="0.7" />
              <rect x="60" y="5" width="80" height="8" rx="4" fill={text} opacity="0.08" />
              <circle cx="160" cy="10" r="4" fill={text} opacity="0.25" />
              <circle cx="175" cy="10" r="4" fill={text} opacity="0.25" />
              {/* Row 2: nav */}
              <line x1="0" y1="24" x2="200" y2="24" stroke={text} strokeOpacity="0.08" />
              {[30, 65, 100, 135, 165].map((x, i) => (
                <rect key={i} x={x} y="30" width="22" height="3" rx="1" fill={text} opacity={i === 0 ? 0.6 : 0.25} />
              ))}
            </>
          ) : (
            <>
              {/* Classic: logo left, nav center, icons right */}
              <rect x="12" y="12" width="30" height="6" rx="2" fill={text} opacity="0.7" />
              {[60, 90, 115, 140].map((x, i) => (
                <rect key={i} x={x} y="14" width="20" height="3" rx="1" fill={text} opacity={i === 0 ? 0.6 : 0.25} />
              ))}
              <circle cx="175" cy="15" r="4" fill={text} opacity="0.25" />
              <circle cx="188" cy="15" r="4" fill={text} opacity="0.25" />
            </>
          )}
        </svg>
      </div>

      {/* Label */}
      <div className={cn(
        'px-3 py-2 border-t',
        isActive ? 'bg-primary/5 border-primary/20' : 'bg-muted/30 border-border/40'
      )}>
        <p className={cn('text-xs font-semibold', isActive ? 'text-primary' : 'text-foreground')}>{preset.name}</p>
        <p className="text-[10px] text-muted-foreground">{preset.description}</p>
      </div>

      {isActive && (
        <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      )}
    </button>
  );
}

/* ================================================================== */
/*  STATE STYLE EDITOR                                                  */
/* ================================================================== */

function StateStyleEditor({ label, state, onChange, onCopyFrom }: {
  label: string;
  state: ThemeHeaderStateStyle;
  onChange: (u: Partial<ThemeHeaderStateStyle>) => void;
  onCopyFrom?: () => void;
}) {
  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between bg-muted/20">
        <div className="flex items-center gap-2">
          <div className={cn(
            'h-2.5 w-2.5 rounded-full',
            label === 'Normal' && 'bg-emerald-500',
            label === 'Sticky' && 'bg-amber-500',
            label === 'Transparente' && 'bg-sky-500',
          )} />
          <p className="text-xs font-semibold text-foreground">{label}</p>
        </div>
        {onCopyFrom && (
          <button onClick={onCopyFrom} className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            <Copy className="h-3 w-3" /> Copiar do Normal
          </button>
        )}
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <ColorInput label="Cor de fundo" value={state.backgroundColor} onChange={v => onChange({ backgroundColor: v })} />
          <ColorInput label="Cor do texto" value={state.textColor} onChange={v => onChange({ textColor: v })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <ToggleRow label="Borda inferior" checked={state.borderBottom} onChange={v => onChange({ borderBottom: v })} />
          <ToggleRow label="Blur de fundo" checked={state.blur} onChange={v => onChange({ blur: v })} />
        </div>
        {state.borderBottom && (
          <ColorInput label="Cor da borda" value={state.borderColor} onChange={v => onChange({ borderColor: v })} />
        )}
        <OptionPicker label="Sombra" value={state.shadow} onChange={v => onChange({ shadow: v as any })} options={[
          { value: 'none', label: 'Nenhuma' },
          { value: 'subtle', label: 'Sutil' },
          { value: 'medium', label: 'Média' },
          { value: 'strong', label: 'Forte' },
        ]} />
        <NumberSlider label="Altura" value={state.height} onChange={v => onChange({ height: v })} min={40} max={96} suffix="px" />

        {/* Live mini-preview */}
        <div className="mt-2 rounded-lg overflow-hidden border border-border/40">
          <div
            className={cn(
              'flex items-center justify-between px-4 transition-all',
              state.blur && 'backdrop-blur-md',
              state.borderBottom && 'border-b',
              state.shadow === 'subtle' && 'shadow-sm',
              state.shadow === 'medium' && 'shadow-md',
              state.shadow === 'strong' && 'shadow-lg',
            )}
            style={{
              backgroundColor: state.backgroundColor === 'transparent' ? 'rgba(0,0,0,0.02)' : state.backgroundColor,
              color: state.textColor,
              borderColor: state.borderColor,
              height: Math.min(state.height * 0.6, 40),
            }}
          >
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: state.textColor, opacity: 0.6 }} />
              <div className="w-10 h-2 rounded" style={{ backgroundColor: state.textColor, opacity: 0.5 }} />
            </div>
            <div className="flex items-center gap-3">
              {['Início', 'Loja', 'Sobre'].map((t, i) => (
                <span key={i} className="text-[9px] font-medium" style={{ color: state.textColor, opacity: i === 0 ? 0.9 : 0.5 }}>{t}</span>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: state.textColor, opacity: 0.3 }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: state.textColor, opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  SECTION PANELS                                                      */
/* ================================================================== */

function PresetsSection() {
  const { draft, updateDraftSection } = useTheme();
  const h = draft.header ?? {} as any;

  const applyPreset = (preset: HeaderPresetConfig) => {
    updateDraftSection('header', { ...preset.config, preset: preset.id });
    toast.success(`Preset "${preset.name}" aplicado!`);
  };

  const resetToDefault = () => {
    updateDraftSection('header', { preset: 'custom' });
    toast.success('Configurações restauradas ao padrão');
  };

  return (
    <div className="space-y-5">
      <SectionHeader icon={Sparkles} title="Presets de Cabeçalho" description="Aplique um estilo pronto e depois personalize os detalhes." />
      <div className="grid grid-cols-2 gap-3">
        {HEADER_PRESETS.map(p => (
          <div key={p.id} onClick={() => applyPreset(p)}>
            <PresetMiniPreview preset={p} isActive={h.preset === p.id} />
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs mt-4" onClick={resetToDefault}>
        <RotateCcw className="h-3.5 w-3.5" /> Restaurar Padrão
      </Button>
    </div>
  );
}

function LayoutSection() {
  const { draft, updateDraftSection } = useTheme();
  const h = draft.header ?? {} as any;
  const set = (u: Partial<typeof h>) => updateDraftSection('header', u);

  return (
    <div className="space-y-5">
      <SectionHeader icon={LayoutGrid} title="Layout do Cabeçalho" description="Define como logo, menu e ícones são organizados no cabeçalho." />
      <OptionPicker label="Layout" value={h.layout} onChange={v => set({ layout: v })} options={[
        { value: 'classic', label: 'Clássico', description: 'Logo à esquerda, menu e ícones à direita' },
        { value: 'centered', label: 'Centralizado', description: 'Logo no centro, navegação abaixo' },
        { value: 'minimal', label: 'Minimalista', description: 'Apenas logo e ícones essenciais' },
        { value: 'logo-center-nav-left', label: 'Logo Centro + Nav', description: 'Menu à esquerda, logo centralizada' },
        { value: 'hamburger-only', label: 'Hambúrguer', description: 'Menu sempre recolhido em ícone' },
        { value: 'top-bar-split', label: 'Dividido', description: 'Navegação à esquerda, ações à direita' },
        { value: 'double-row', label: 'Duas Linhas', description: 'Linha 1: logo + busca. Linha 2: menu' },
        { value: 'sidebar-nav', label: 'Nav Lateral', description: 'Menu abre como painel lateral' },
        { value: 'transparent', label: 'Transparente', description: 'Sem fundo, sobrepõe o hero' },
      ]} />

      <SectionLabel>Comportamento</SectionLabel>
      <ToggleRow label="Header fixo (sticky)" hint="Mantém o cabeçalho visível ao rolar" checked={h.sticky} onChange={v => set({ sticky: v })} />
      <ToggleRow label="Encolher ao rolar" hint="Diminui de tamanho ao rolar para baixo" checked={h.shrinkOnScroll} onChange={v => set({ shrinkOnScroll: v })} />
      <ToggleRow label="Sombra ao rolar" hint="Sombra sutil quando a página é rolada" checked={h.shadowOnScroll} onChange={v => set({ shadowOnScroll: v })} />

      <SectionLabel>Profundidade</SectionLabel>
      <ToggleRow label="Superfície elevada" hint="Sombra e borda permanentes" checked={h.headerSurface ?? true} onChange={v => set({ headerSurface: v })} />
      <ToggleRow label="Dropdown elevado" hint="Submenus com sombra forte e seta" checked={h.dropdownElevated ?? true} onChange={v => set({ dropdownElevated: v })} />
      <ToggleRow label="Área clicável ampla" hint="Links com padding maior e fundo no hover" checked={h.menuItemPadding ?? true} onChange={v => set({ menuItemPadding: v })} />
    </div>
  );
}

function StatesSection() {
  const { draft, updateDraftSection } = useTheme();
  const h = draft.header ?? {} as any;
  const states = h.states ?? {
    normal: { backgroundColor: '#ffffff', textColor: '#1a1a1a', borderBottom: true, borderColor: '#e5e7eb', shadow: 'none', blur: false, height: 64 },
    sticky: { backgroundColor: '#ffffff', textColor: '#1a1a1a', borderBottom: true, borderColor: '#e5e7eb', shadow: 'subtle', blur: true, height: 56 },
    transparent: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 64 },
  };

  const setState = (key: 'normal' | 'sticky' | 'transparent', u: Partial<ThemeHeaderStateStyle>) => {
    updateDraftSection('header', { states: { ...states, [key]: { ...states[key], ...u } } });
  };

  const copyNormalTo = (key: 'sticky' | 'transparent') => {
    updateDraftSection('header', { states: { ...states, [key]: { ...states.normal } } });
    toast.success(`Estilos do Normal copiados para ${key === 'sticky' ? 'Sticky' : 'Transparente'}`);
  };

  return (
    <div className="space-y-5">
      <SectionHeader icon={Layers} title="Estados do Cabeçalho" description="Defina estilos independentes para cada estado: topo normal, ao rolar (sticky) e sobre o hero (transparente)." />
      <StateStyleEditor
        label="Normal"
        state={states.normal}
        onChange={u => setState('normal', u)}
      />
      <StateStyleEditor
        label="Sticky"
        state={states.sticky}
        onChange={u => setState('sticky', u)}
        onCopyFrom={() => copyNormalTo('sticky')}
      />
      <StateStyleEditor
        label="Transparente"
        state={states.transparent}
        onChange={u => setState('transparent', u)}
        onCopyFrom={() => copyNormalTo('transparent')}
      />
    </div>
  );
}

function ContainerSection() {
  const { draft, updateDraftSection } = useTheme();
  const h = draft.header ?? {} as any;
  const container = h.container ?? { width: 'container', maxWidth: 1400, paddingX: 16, gap: 16, verticalAlign: 'center' };
  const setContainer = (u: Partial<typeof container>) => updateDraftSection('header', { container: { ...container, ...u } });

  return (
    <div className="space-y-5">
      <SectionHeader icon={Columns3} title="Container & Grid" description="Largura, padding e espaçamento entre blocos do cabeçalho." />
      <OptionPicker label="Largura" value={container.width} onChange={v => setContainer({ width: v as any })} options={[
        { value: 'full', label: 'Full', description: 'Largura total da tela' },
        { value: 'container', label: 'Container', description: 'Limitado por largura máxima' },
      ]} />
      {container.width === 'container' && (
        <NumberSlider label="Largura máxima" value={container.maxWidth} onChange={v => setContainer({ maxWidth: v })} min={1000} max={1920} suffix="px" step={20} />
      )}
      <NumberSlider label="Padding lateral" value={container.paddingX} onChange={v => setContainer({ paddingX: v })} min={8} max={48} suffix="px" />
      <NumberSlider label="Gap entre blocos" value={container.gap} onChange={v => setContainer({ gap: v })} min={0} max={48} suffix="px" />
      <OptionPicker label="Alinhamento vertical" value={container.verticalAlign} onChange={v => setContainer({ verticalAlign: v as any })} options={[
        { value: 'start', label: 'Topo' },
        { value: 'center', label: 'Centro' },
        { value: 'end', label: 'Base' },
      ]} />
    </div>
  );
}

function MenuStyleSection() {
  const { draft, updateDraftSection } = useTheme();
  const h = draft.header ?? {} as any;
  const set = (u: Partial<typeof h>) => updateDraftSection('header', u);

  return (
    <div className="space-y-5">
      <SectionHeader icon={Navigation} title="Menu Desktop" description="Estilo, tipografia e interações dos links de navegação." />
      <OptionPicker label="Tipo" value={h.menuStyle} onChange={v => set({ menuStyle: v })} options={[
        { value: 'horizontal', label: 'Horizontal' },
        { value: 'dropdown', label: 'Dropdown' },
        { value: 'mega-menu', label: 'Mega Menu' },
      ]} />

      <SectionLabel>Tipografia</SectionLabel>
      <NumberSlider label="Tamanho da fonte" value={h.menuFontSize} onChange={v => set({ menuFontSize: v })} min={10} max={18} suffix="px" />
      <NumberSlider label="Peso da fonte" value={h.menuFontWeight || 500} onChange={v => set({ menuFontWeight: v })} min={300} max={700} suffix="" step={100} />
      <ToggleRow label="Texto em maiúsculas" hint="Transforma os links em letras maiúsculas" checked={h.menuUppercase} onChange={v => set({ menuUppercase: v })} />
      <NumberSlider label="Espaçamento entre letras" value={(h.menuLetterSpacing ?? 0.05) * 100} onChange={v => set({ menuLetterSpacing: v / 100 })} min={0} max={20} suffix="" />

      <SectionLabel>Interação</SectionLabel>
      <OptionPicker label="Efeito de hover" value={h.menuHoverStyle || 'underline'} onChange={v => set({ menuHoverStyle: v })} options={[
        { value: 'underline', label: 'Sublinhado' },
        { value: 'background', label: 'Fundo' },
        { value: 'both', label: 'Ambos' },
      ]} />
      <NumberSlider label="Espaçamento entre itens" value={h.menuItemGap ?? 8} onChange={v => set({ menuItemGap: v })} min={0} max={80} suffix="px" />
      <OptionPicker label="Separador" value={h.menuSeparator || 'none'} onChange={v => set({ menuSeparator: v })} options={[
        { value: 'none', label: 'Nenhum' },
        { value: 'line', label: '| Linha' },
        { value: 'dot', label: '• Ponto' },
        { value: 'slash', label: '/ Barra' },
      ]} />
    </div>
  );
}

function MegaMenuSection() {
  const { draft, updateDraftSection } = useTheme();
  const h = draft.header ?? {} as any;
  const mm = h.megaMenuConfig ?? { columns: 4, width: 'container', showImages: false, showBanner: false, bannerImageUrl: '', bannerLink: '' };
  const setMM = (u: Partial<typeof mm>) => updateDraftSection('header', { megaMenuConfig: { ...mm, ...u } });

  return (
    <div className="space-y-5">
      <SectionHeader icon={LayoutGrid} title="Mega Menu" description="Configurações do painel expandido do mega menu." />
      {h.menuStyle !== 'mega-menu' && (
        <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-3">
          <p className="text-xs text-amber-700">Ative o tipo "Mega Menu" na seção Menu Desktop para usar estas opções.</p>
        </div>
      )}
      <NumberSlider label="Colunas" value={mm.columns} onChange={v => setMM({ columns: v as any })} min={2} max={6} suffix="" />
      <OptionPicker label="Largura" value={mm.width} onChange={v => setMM({ width: v as any })} options={[
        { value: 'auto', label: 'Automática', description: 'Ajusta ao conteúdo' },
        { value: 'container', label: 'Container', description: 'Mesma largura do header' },
        { value: 'full', label: 'Full', description: 'Toda a largura da tela' },
      ]} />
      <ToggleRow label="Imagens por categoria" hint="Exibe thumbnail ao lado de cada grupo" checked={mm.showImages} onChange={v => setMM({ showImages: v })} />
      <ToggleRow label="Banner promocional" hint="Slot para banner/imagem dentro do mega menu" checked={mm.showBanner} onChange={v => setMM({ showBanner: v })} />
      {mm.showBanner && (
        <>
          <div>
            <p className="text-xs font-medium text-muted-foreground">URL do banner</p>
            <Input className="mt-1 h-9 text-sm" value={mm.bannerImageUrl} placeholder="https://..."
              onChange={e => setMM({ bannerImageUrl: e.target.value })} />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Link do banner</p>
            <Input className="mt-1 h-9 text-sm" value={mm.bannerLink} placeholder="/products/sale"
              onChange={e => setMM({ bannerLink: e.target.value })} />
          </div>
        </>
      )}
    </div>
  );
}

function IconsSection() {
  const { draft, updateDraftSection } = useTheme();
  const h = draft.header ?? {} as any;
  const set = (u: Partial<typeof h>) => updateDraftSection('header', u);

  return (
    <div className="space-y-5">
      <SectionHeader icon={MousePointer} title="Ícones & Ações" description="Controle quais ícones aparecem e seu estilo visual." />
      <NumberSlider label="Tamanho" value={h.iconSize} onChange={v => set({ iconSize: v })} min={16} max={28} suffix="px" />
      <OptionPicker label="Espessura" value={String(h.iconStrokeWidth || 1.5)} onChange={v => set({ iconStrokeWidth: Number(v) })} options={[
        { value: '1', label: 'Fino' },
        { value: '1.5', label: 'Regular' },
        { value: '2', label: 'Bold' },
      ]} />

      <SectionLabel>Visibilidade</SectionLabel>
      <ToggleRow label="Busca" hint="Ícone de lupa" checked={h.showSearch} onChange={v => set({ showSearch: v })} />
      <ToggleRow label="Conta" hint="Perfil/login do usuário" checked={h.showAccount} onChange={v => set({ showAccount: v })} />
      <ToggleRow label="Wishlist" hint="Coração para favoritos" checked={h.showWishlist} onChange={v => set({ showWishlist: v })} />
      <ToggleRow label="Carrinho" hint="Sacola de compras" checked={h.showCart} onChange={v => set({ showCart: v })} />

      {h.showCart && (
        <OptionPicker label="Badge do carrinho" value={h.cartBadgeStyle} onChange={v => set({ cartBadgeStyle: v })} options={[
          { value: 'count', label: 'Contador' },
          { value: 'dot', label: 'Ponto' },
          { value: 'none', label: 'Nenhum' },
        ]} />
      )}

      {/* Live preview */}
      <div className="mt-3 rounded-lg border border-border/50 bg-muted/10 p-4 flex items-center justify-center gap-3">
        {h.showSearch && <Search style={{ width: h.iconSize, height: h.iconSize }} strokeWidth={h.iconStrokeWidth || 1.5} className="text-foreground" />}
        {h.showWishlist && <Heart style={{ width: h.iconSize, height: h.iconSize }} strokeWidth={h.iconStrokeWidth || 1.5} className="text-foreground" />}
        {h.showAccount && <User style={{ width: h.iconSize, height: h.iconSize }} strokeWidth={h.iconStrokeWidth || 1.5} className="text-foreground" />}
        {h.showCart && (
          <div className="relative">
            <ShoppingBag style={{ width: h.iconSize, height: h.iconSize }} strokeWidth={h.iconStrokeWidth || 1.5} className="text-foreground" />
            {h.cartBadgeStyle === 'count' && (
              <span className="absolute -top-1.5 -right-2 bg-foreground text-background text-[8px] font-bold rounded-full h-4 w-4 flex items-center justify-center">3</span>
            )}
            {h.cartBadgeStyle === 'dot' && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary rounded-full h-2 w-2" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SearchSection() {
  const { draft, updateDraftSection } = useTheme();
  const h = draft.header ?? {} as any;
  const set = (u: Partial<typeof h>) => updateDraftSection('header', u);
  const search = h.search ?? { placeholder: 'Buscar produtos...', showOnDesktop: true, showOnMobile: true, autoSuggest: false, maxResults: 6, shortcutEnabled: false };
  const setSearch = (u: Partial<typeof search>) => updateDraftSection('header', { search: { ...search, ...u } });

  return (
    <div className="space-y-5">
      <SectionHeader icon={Search} title="Busca" description="Configuração completa da busca: estilo, placeholder, dispositivos e auto-sugestão." />

      <OptionPicker label="Estilo" value={h.searchStyle} onChange={v => set({ searchStyle: v })} options={[
        { value: 'inline', label: 'Inline', description: 'Barra visível no cabeçalho' },
        { value: 'modal', label: 'Modal', description: 'Popup centralizado ao clicar' },
        { value: 'drawer', label: 'Drawer', description: 'Painel desliza do topo' },
      ]} />

      <div>
        <p className="text-xs font-medium text-muted-foreground">Placeholder</p>
        <Input className="mt-1 h-9 text-sm" value={search.placeholder} placeholder="Buscar produtos..."
          onChange={e => setSearch({ placeholder: e.target.value })} />
      </div>

      <SectionLabel>Dispositivos</SectionLabel>
      <ToggleRow label="Exibir no desktop" checked={search.showOnDesktop} onChange={v => setSearch({ showOnDesktop: v })} />
      <ToggleRow label="Exibir no mobile" checked={search.showOnMobile} onChange={v => setSearch({ showOnMobile: v })} />

      <SectionLabel>Avançado</SectionLabel>
      <ToggleRow label="Auto-sugestão" hint="Sugere produtos e categorias enquanto digita" checked={search.autoSuggest} onChange={v => setSearch({ autoSuggest: v })} />
      {search.autoSuggest && (
        <NumberSlider label="Máximo de resultados" value={search.maxResults} onChange={v => setSearch({ maxResults: v })} min={3} max={12} suffix="" />
      )}
      <ToggleRow label="Atalho de teclado" hint="Ctrl+K ou / para abrir a busca" checked={search.shortcutEnabled} onChange={v => setSearch({ shortcutEnabled: v })} />
    </div>
  );
}

function MobileSection() {
  const { draft, updateDraftSection } = useTheme();
  const h = draft.header ?? {} as any;
  const mobile = h.mobile ?? { drawerPosition: 'left', showSearchInDrawer: true, showAccountInDrawer: true, showCartInDrawer: true, fixedFooterItems: [], maxLevels: 2, groupStyle: 'accordion' };
  const setMobile = (u: Partial<typeof mobile>) => updateDraftSection('header', { mobile: { ...mobile, ...u } });

  return (
    <div className="space-y-5">
      <SectionHeader icon={Smartphone} title="Menu Mobile" description="Drawer, ações, itens fixos e navegação hierárquica no celular." />

      <OptionPicker label="Posição do drawer" value={mobile.drawerPosition} onChange={v => setMobile({ drawerPosition: v as any })} options={[
        { value: 'left', label: '← Esquerda' },
        { value: 'right', label: 'Direita →' },
      ]} />

      <OptionPicker label="Estilo de agrupamento" value={mobile.groupStyle} onChange={v => setMobile({ groupStyle: v as any })} options={[
        { value: 'accordion', label: 'Acordeão', description: 'Expande subitens ao tocar' },
        { value: 'list', label: 'Lista', description: 'Todos os itens visíveis' },
      ]} />

      <NumberSlider label="Níveis de hierarquia" value={mobile.maxLevels} onChange={v => setMobile({ maxLevels: v as any })} min={2} max={3} suffix="" />

      <SectionLabel>Ações dentro do drawer</SectionLabel>
      <ToggleRow label="Buscar" hint="Campo de busca no topo do menu mobile" checked={mobile.showSearchInDrawer} onChange={v => setMobile({ showSearchInDrawer: v })} />
      <ToggleRow label="Conta / Login" hint="Link para perfil ou login" checked={mobile.showAccountInDrawer} onChange={v => setMobile({ showAccountInDrawer: v })} />
      <ToggleRow label="Carrinho" hint="Ícone do carrinho visível no drawer" checked={mobile.showCartInDrawer} onChange={v => setMobile({ showCartInDrawer: v })} />
    </div>
  );
}

function ItemsSection() {
  const { draft, updateDraftSection } = useTheme();
  const mm = draft.megaMenu ?? { items: [], mobileGroupStyle: 'accordion', showIcons: false, showBadges: true };
  const set = (u: Partial<typeof mm>) => updateDraftSection('megaMenu', u as any);

  const addItem = () => {
    set({ items: [...mm.items, { id: `mi-${Date.now()}`, label: 'Novo item', link: '', openNewTab: false, badge: '', badgeColor: '#ef4444', icon: '', children: [] }] });
  };
  const updateItem = (idx: number, u: ThemeMenuItem) => { const items = [...mm.items]; items[idx] = u; set({ items }); };
  const removeItem = (idx: number) => { set({ items: mm.items.filter((_, i) => i !== idx) }); };

  return (
    <div className="space-y-5">
      <SectionHeader icon={Menu} title="Itens do Menu" description="Gerencie os links que aparecem na barra de navegação da loja." />

      <div className="border border-border rounded-lg bg-card">
        <div className="px-4 py-3 border-b border-border">
          <p className="text-xs font-semibold text-foreground flex items-center gap-1.5"><Settings2 className="h-3.5 w-3.5" /> Preferências</p>
        </div>
        <div className="p-4 space-y-3">
          <ToggleRow label="Badges promocionais" hint="Etiquetas como 'Novo' ou '-30%'" checked={mm.showBadges} onChange={v => set({ showBadges: v })} />
          <ToggleRow label="Ícones nos itens" hint="Ícone à esquerda de cada item" checked={mm.showIcons} onChange={v => set({ showIcons: v })} />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">Itens</p>
            <p className="text-[11px] text-muted-foreground">{mm.items.length} {mm.items.length === 1 ? 'item' : 'itens'}</p>
          </div>
        </div>

        {mm.items.length === 0 && (
          <div className="border-2 border-dashed border-border rounded-lg py-10 text-center">
            <Menu className="h-7 w-7 text-muted-foreground/20 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Nenhum item adicionado</p>
            <p className="text-[11px] text-muted-foreground/60 mt-1">A loja usará categorias automáticas.</p>
          </div>
        )}

        {mm.items.map((item, idx) => (
          <MenuItemEditor key={item.id} item={item} onUpdate={u => updateItem(idx, u)} onDelete={() => removeItem(idx)} />
        ))}

        <Button variant="outline" className="w-full" onClick={addItem}>
          <Plus className="h-4 w-4 mr-2" /> Adicionar item
        </Button>
      </div>
    </div>
  );
}

function AnnouncementSection() {
  const { draft, updateDraftSection } = useTheme();
  const h = draft.header ?? {} as any;
  const a = h.announcement ?? { enabled: false, messages: [], speed: 5, backgroundColor: '#1a1a1a', textColor: '#fafafa', showIcon: false, icon: 'truck', link: '', pauseOnHover: true, style: 'static' as const, direction: 'rtl' as const };
  const setAnn = (u: Partial<typeof a>) => updateDraftSection('header', { announcement: { ...a, ...u } });

  return (
    <div className="space-y-5">
      <SectionHeader icon={Megaphone} title="Barra de Anúncio" description="Barra fina acima do cabeçalho com mensagens promocionais." />
      <ToggleRow label="Ativar barra" hint="Exibe barra colorida no topo do site" checked={a.enabled} onChange={v => setAnn({ enabled: v })} />

      {a.enabled && (
        <>
          <OptionPicker label="Estilo" value={a.style} onChange={v => setAnn({ style: v })} options={[
            { value: 'static', label: 'Estático', description: 'Mensagem fixa' },
            { value: 'carousel', label: 'Carrossel', description: 'Alterna entre mensagens' },
            { value: 'ticker', label: 'Ticker', description: 'Texto desliza como letreiro' },
          ]} />

          {(a.style === 'ticker' || a.style === 'carousel') && (
            <OptionPicker label="Direção" value={a.direction} onChange={v => setAnn({ direction: v })} options={[
              { value: 'rtl', label: '← Esquerda' },
              { value: 'ltr', label: 'Direita →' },
            ]} />
          )}

          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Mensagem 1</p>
              <Input className="mt-1 h-9 text-sm" value={a.messages[0] || ''} placeholder="Frete grátis acima de R$ 299"
                onChange={e => { const msgs = [...a.messages]; msgs[0] = e.target.value; setAnn({ messages: msgs }); }} />
            </div>
            {(a.style === 'carousel' || a.style === 'ticker') && (
              <>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Mensagem 2</p>
                  <Input className="mt-1 h-9 text-sm" value={a.messages[1] || ''} placeholder="Parcele em até 12x"
                    onChange={e => { const msgs = [...a.messages]; while (msgs.length < 2) msgs.push(''); msgs[1] = e.target.value; setAnn({ messages: msgs }); }} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Mensagem 3</p>
                  <Input className="mt-1 h-9 text-sm" value={a.messages[2] || ''} placeholder="Troca grátis em 30 dias"
                    onChange={e => { const msgs = [...a.messages]; while (msgs.length < 3) msgs.push(''); msgs[2] = e.target.value; setAnn({ messages: msgs }); }} />
                </div>
                <NumberSlider label="Velocidade" value={a.speed} onChange={v => setAnn({ speed: v })} min={2} max={10} suffix="s" />
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ColorInput label="Cor do fundo" value={a.backgroundColor} onChange={v => setAnn({ backgroundColor: v })} />
            <ColorInput label="Cor do texto" value={a.textColor} onChange={v => setAnn({ textColor: v })} />
          </div>

          <ToggleRow label="Pausar no hover" hint="Pausa animação quando o mouse está sobre a barra" checked={a.pauseOnHover} onChange={v => setAnn({ pauseOnHover: v })} />
        </>
      )}
    </div>
  );
}

function BannerSection() {
  const { draft, updateDraftSection } = useTheme();
  const h = draft.header ?? {} as any;
  const bb = h.bannerBelow ?? { enabled: false, imageUrl: '', images: [], link: '', height: 60, fullWidth: true, carousel: false, carouselSpeed: 5 };
  const setBanner = (u: Partial<typeof bb>) => updateDraftSection('header', { bannerBelow: { ...bb, ...u } });

  return (
    <div className="space-y-5">
      <SectionHeader icon={ImageIcon} title="Banner abaixo do Cabeçalho" description="Banner com imagem logo abaixo do cabeçalho. Ideal para promoções sazonais." />
      <ToggleRow label="Ativar banner" hint="Exibe um banner com imagem abaixo do cabeçalho" checked={bb.enabled} onChange={v => setBanner({ enabled: v })} />

      {bb.enabled && (
        <>
          <div>
            <p className="text-xs font-medium text-muted-foreground">URL da imagem principal</p>
            <Input className="mt-1 h-9 text-sm" value={bb.imageUrl} placeholder="https://..."
              onChange={e => setBanner({ imageUrl: e.target.value })} />
          </div>
          <ToggleRow label="Carrossel" hint="Rotação automática entre múltiplas imagens" checked={bb.carousel} onChange={v => setBanner({ carousel: v })} />
          {bb.carousel && (
            <>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Imagem 2</p>
                <Input className="mt-1 h-9 text-sm" value={bb.images[0] || ''} placeholder="https://..."
                  onChange={e => { const imgs = [...(bb.images || [])]; while (imgs.length < 1) imgs.push(''); imgs[0] = e.target.value; setBanner({ images: imgs }); }} />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Imagem 3</p>
                <Input className="mt-1 h-9 text-sm" value={bb.images[1] || ''} placeholder="https://..."
                  onChange={e => { const imgs = [...(bb.images || [])]; while (imgs.length < 2) imgs.push(''); imgs[1] = e.target.value; setBanner({ images: imgs }); }} />
              </div>
              <NumberSlider label="Velocidade" value={bb.carouselSpeed} onChange={v => setBanner({ carouselSpeed: v })} min={2} max={10} suffix="s" />
            </>
          )}
          <div>
            <p className="text-xs font-medium text-muted-foreground">Link</p>
            <Input className="mt-1 h-9 text-sm" value={bb.link} placeholder="/products"
              onChange={e => setBanner({ link: e.target.value })} />
          </div>
          <NumberSlider label="Altura" value={bb.height} onChange={v => setBanner({ height: v })} min={40} max={200} suffix="px" />
          <ToggleRow label="Largura total" hint="Banner ocupa toda a largura da tela" checked={bb.fullWidth} onChange={v => setBanner({ fullWidth: v })} />
        </>
      )}
    </div>
  );
}

/* ================================================================== */
/*  SECTION RENDERER                                                    */
/* ================================================================== */

const SECTION_COMPONENTS: Record<SectionKey, React.FC> = {
  'presets': PresetsSection,
  'layout': LayoutSection,
  'states': StatesSection,
  'container': ContainerSection,
  'menu-style': MenuStyleSection,
  'mega-menu': MegaMenuSection,
  'icons': IconsSection,
  'search': SearchSection,
  'mobile': MobileSection,
  'items': ItemsSection,
  'announcement': AnnouncementSection,
  'banner': BannerSection,
};

/* ================================================================== */
/*  MAIN PAGE                                                          */
/* ================================================================== */

export default function AdminMenu() {
  const [activeSection, setActiveSection] = useState<SectionKey>('presets');
  const { isDirty, publish } = useTheme();
  const navigate = useNavigate();

  const handleSave = () => {
    publish('Atualização do menu/cabeçalho');
    toast.success('Alterações salvas e publicadas!');
  };

  const SectionComponent = SECTION_COMPONENTS[activeSection];

  // Group sidebar items
  const groups = SIDEBAR_ITEMS.reduce<Record<string, SidebarItem[]>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  return (
    <div className="h-full flex flex-col">
      {/* Top bar */}
      <div className="border-b border-border px-6 py-3 flex items-center justify-between bg-background">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <PanelTop className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Cabeçalho & Menu</h2>
            <p className="text-[11px] text-muted-foreground">Configure toda a navegação e aparência do topo da loja</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => navigate('/admin/customization')}>
            <Palette className="h-3.5 w-3.5" /> Aparência
          </Button>
          {isDirty && (
            <Button size="sm" className="gap-1.5 text-xs" onClick={handleSave}>
              <Save className="h-3.5 w-3.5" /> Publicar
            </Button>
          )}
        </div>
      </div>

      {/* Content: Sidebar + Panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-56 border-r border-border bg-muted/20 flex-shrink-0">
          <ScrollArea className="h-full">
            <div className="py-3 px-2">
              {Object.entries(groups).map(([group, items]) => (
                <div key={group} className="mb-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50 px-3 mb-1">{group}</p>
                  {items.map(item => (
                    <button
                      key={item.key}
                      onClick={() => setActiveSection(item.key)}
                      className={cn(
                        'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150',
                        activeSection === item.key
                          ? 'bg-background text-foreground font-medium shadow-sm border border-border/60'
                          : 'text-muted-foreground hover:text-foreground hover:bg-background/60'
                      )}
                    >
                      <item.icon className={cn('h-4 w-4 shrink-0', activeSection === item.key ? 'text-primary' : 'text-muted-foreground/60')} />
                      <span className="truncate">{item.label}</span>
                      {item.key === 'states' && (
                        <span className="ml-auto text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">NOVO</span>
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Edit Panel */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="max-w-2xl mx-auto px-6 py-6">
              <SectionComponent />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
