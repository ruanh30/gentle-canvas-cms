import React, { useState, useCallback, useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Trash2, ChevronDown, ChevronRight, GripVertical, Palette, Save,
  Menu, ExternalLink, Tag, Settings2, PanelTop, Megaphone, ImageIcon,
  Eye, EyeOff, Search, User, Heart, ShoppingBag, ShoppingCart,
  Monitor, Smartphone, Layers, Sparkles, RotateCcw,
  Copy, MousePointer, Columns3, LayoutGrid, Navigation, Zap,
  ArrowRight, Check, X, ChevronLeft
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

/* ================================================================== */
/*  TYPES                                                               */
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
  badge?: string;
}

/* ================================================================== */
/*  SIDEBAR CONFIG                                                      */
/* ================================================================== */

const SIDEBAR_ITEMS: SidebarItem[] = [
  { key: 'presets', label: 'Estilos Prontos', icon: Sparkles, group: 'DESIGN' },
  { key: 'layout', label: 'Layout', icon: LayoutGrid, group: 'DESIGN' },
  { key: 'states', label: 'Estados', icon: Layers, group: 'DESIGN', badge: 'PRO' },
  { key: 'container', label: 'Dimensões', icon: Columns3, group: 'DESIGN' },
  { key: 'menu-style', label: 'Menu Desktop', icon: Navigation, group: 'NAVEGAÇÃO' },
  { key: 'mega-menu', label: 'Mega Menu', icon: LayoutGrid, group: 'NAVEGAÇÃO' },
  { key: 'mobile', label: 'Menu Mobile', icon: Smartphone, group: 'NAVEGAÇÃO' },
  { key: 'items', label: 'Itens do Menu', icon: Menu, group: 'NAVEGAÇÃO' },
  { key: 'icons', label: 'Ícones', icon: MousePointer, group: 'ELEMENTOS' },
  { key: 'search', label: 'Busca', icon: Search, group: 'ELEMENTOS' },
  { key: 'announcement', label: 'Barra de Anúncio', icon: Megaphone, group: 'EXTRAS' },
  { key: 'banner', label: 'Banner', icon: ImageIcon, group: 'EXTRAS' },
];

/* ================================================================== */
/*  SHARED PREMIUM CONTROLS                                             */
/* ================================================================== */

function ControlGroup({ title, children, hint, collapsible = false }: {
  title: string; children: React.ReactNode; hint?: string; collapsible?: boolean;
}) {
  const [open, setOpen] = useState(!collapsible);
  return (
    <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
      <button
        onClick={() => collapsible && setOpen(!open)}
        className={cn(
          'w-full flex items-center justify-between px-4 py-3',
          collapsible && 'cursor-pointer hover:bg-muted/30 transition-colors',
          !collapsible && 'cursor-default'
        )}
      >
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/80">{title}</p>
          {hint && <p className="text-[10px] text-muted-foreground/60 mt-0.5">{hint}</p>}
        </div>
        {collapsible && (
          <ChevronDown className={cn('h-3.5 w-3.5 text-muted-foreground/40 transition-transform', open && 'rotate-180')} />
        )}
      </button>
      {open && <div className="px-4 pb-4 space-y-4 border-t border-border/30 pt-4">{children}</div>}
    </div>
  );
}

function ToggleRow({ label, hint, checked, onChange }: {
  label: string; hint?: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between py-1 cursor-pointer group">
      <div className="pr-3">
        <p className="text-[13px] font-medium text-foreground group-hover:text-foreground/90 transition-colors">{label}</p>
        {hint && <p className="text-[11px] text-muted-foreground/60 leading-tight">{hint}</p>}
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </label>
  );
}

function NumSlider({ label, value, onChange, min, max, suffix = '', step = 1, hint }: {
  label: string; value: number; onChange: (v: number) => void; min: number; max: number;
  suffix?: string; step?: number; hint?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13px] font-medium text-foreground">{label}</p>
          {hint && <p className="text-[10px] text-muted-foreground/60">{hint}</p>}
        </div>
        <span className="text-[11px] font-mono text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-md tabular-nums">{value}{suffix}</span>
      </div>
      <Slider value={[value]} onValueChange={v => onChange(v[0])} min={min} max={max} step={step} className="w-full" />
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-medium text-muted-foreground/70">{label}</p>
      <div className="flex items-center gap-2">
        <div className="relative">
          <input type="color" value={value || '#ffffff'} onChange={e => onChange(e.target.value)}
            className="w-9 h-9 rounded-lg border border-border/60 cursor-pointer appearance-none bg-transparent" />
          <div className="absolute inset-0.5 rounded-[7px] pointer-events-none" style={{ backgroundColor: value || '#ffffff' }} />
        </div>
        <Input value={value} onChange={e => onChange(e.target.value)}
          className="font-mono text-[11px] h-9 flex-1 uppercase tracking-wider bg-muted/30 border-border/40" maxLength={7} />
      </div>
    </div>
  );
}

function Pills({ label, value, onChange, options, hint }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string; desc?: string }[];
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <div>
        <p className="text-[13px] font-medium text-foreground">{label}</p>
        {hint && <p className="text-[10px] text-muted-foreground/60 mt-0.5">{hint}</p>}
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {options.map(o => (
          <button key={o.value} onClick={() => onChange(o.value)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 border',
              value === o.value
                ? 'bg-foreground text-background border-foreground shadow-sm'
                : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/70 hover:text-foreground'
            )}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function OptionCards({ label, value, onChange, options, hint }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string; description: string }[];
  hint?: string;
}) {
  return (
    <div className="space-y-2.5">
      <div>
        <p className="text-[13px] font-medium text-foreground">{label}</p>
        {hint && <p className="text-[10px] text-muted-foreground/60 mt-0.5">{hint}</p>}
      </div>
      <div className="space-y-1.5">
        {options.map(o => (
          <button key={o.value} onClick={() => onChange(o.value)}
            className={cn(
              'w-full text-left px-3.5 py-2.5 rounded-xl text-[13px] border transition-all duration-150',
              value === o.value
                ? 'bg-primary/5 border-primary/30 ring-1 ring-primary/20'
                : 'bg-muted/20 border-border/40 hover:bg-muted/40 hover:border-border/60'
            )}>
            <div className="flex items-center justify-between">
              <span className={cn('font-medium', value === o.value ? 'text-primary' : 'text-foreground')}>{o.label}</span>
              {value === o.value && <Check className="h-3.5 w-3.5 text-primary" />}
            </div>
            <span className="text-[11px] text-muted-foreground/60 block mt-0.5">{o.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  LIVE HEADER PREVIEW                                                 */
/* ================================================================== */

function LiveHeaderPreview() {
  const { draft } = useTheme();
  const h = draft.header ?? {} as any;
  const logo = draft.logo;
  const states = h.states;
  const normal = states?.normal;
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const bg = normal?.backgroundColor || '#ffffff';
  const text = normal?.textColor || '#1a1a1a';
  const isCentered = h.layout === 'centered' || h.layout === 'logo-center-nav-left';
  const isDoubleRow = h.layout === 'double-row';
  const isMobile = previewDevice === 'mobile';

  return (
    <div className="border-b border-border/50 bg-muted/10">
      <div className="flex items-center justify-between px-4 py-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/50">Preview ao vivo</p>
        <Tabs value={previewDevice} onValueChange={v => setPreviewDevice(v as any)}>
          <TabsList className="h-7 bg-muted/50">
            <TabsTrigger value="desktop" className="h-5 text-[10px] px-2 gap-1">
              <Monitor className="h-3 w-3" /> Desktop
            </TabsTrigger>
            <TabsTrigger value="mobile" className="h-5 text-[10px] px-2 gap-1">
              <Smartphone className="h-3 w-3" /> Mobile
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className={cn('mx-auto mb-3 rounded-lg overflow-hidden border border-border/40 shadow-sm transition-all duration-300', isMobile ? 'max-w-[375px]' : 'max-w-full mx-4')}>
        {/* Announcement bar preview */}
        {h.announcement?.enabled && (
          <div className="text-center py-1 text-[9px] font-medium tracking-wide"
            style={{ backgroundColor: h.announcement.backgroundColor || '#1a1a1a', color: h.announcement.textColor || '#fff' }}>
            {h.announcement.messages?.[0] || 'Barra de anúncio'}
          </div>
        )}

        {/* Header preview */}
        <div
          className={cn(
            'flex items-center justify-between px-4 transition-all duration-300',
            normal?.borderBottom && 'border-b',
            normal?.blur && 'backdrop-blur-md',
          )}
          style={{
            backgroundColor: bg,
            color: text,
            borderColor: normal?.borderColor || '#e5e7eb',
            height: isMobile ? 48 : Math.min(h.height || 64, 56),
          }}
        >
          {isMobile ? (
            <>
              <Menu className="h-4 w-4" style={{ color: text, opacity: 0.6 }} />
              <span className="text-[11px] font-bold tracking-wide" style={{ color: text }}>{logo?.text || 'LOGO'}</span>
              <div className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5" style={{ color: text, opacity: 0.5 }} />
                <ShoppingBag className="h-3.5 w-3.5" style={{ color: text, opacity: 0.5 }} />
              </div>
            </>
          ) : isCentered ? (
            <>
              <div className="flex items-center gap-3">
                {['Início', 'Loja', 'Sobre'].map((t, i) => (
                  <span key={i} className="text-[10px]" style={{ color: text, opacity: i === 0 ? 0.9 : 0.5, fontWeight: h.menuFontWeight || 500, textTransform: h.menuUppercase ? 'uppercase' : 'none', fontSize: Math.min(h.menuFontSize || 13, 11) }}>{t}</span>
                ))}
              </div>
              <span className="text-[12px] font-bold tracking-wide" style={{ color: text }}>{logo?.text || 'LOGO'}</span>
              <div className="flex items-center gap-2">
                {h.showSearch && <Search className="h-3.5 w-3.5" style={{ color: text, opacity: 0.4 }} />}
                {h.showAccount && <User className="h-3.5 w-3.5" style={{ color: text, opacity: 0.4 }} />}
                {h.showCart && <ShoppingBag className="h-3.5 w-3.5" style={{ color: text, opacity: 0.4 }} />}
              </div>
            </>
          ) : isDoubleRow ? (
            <div className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold tracking-wide" style={{ color: text }}>{logo?.text || 'LOGO'}</span>
                {h.searchStyle === 'inline' && h.showSearch && (
                  <div className="flex-1 mx-4 max-w-[200px] h-6 rounded-full border border-current/10 flex items-center px-2">
                    <Search className="h-2.5 w-2.5" style={{ color: text, opacity: 0.3 }} />
                    <span className="text-[8px] ml-1" style={{ color: text, opacity: 0.3 }}>Buscar...</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  {h.showAccount && <User className="h-3.5 w-3.5" style={{ color: text, opacity: 0.4 }} />}
                  {h.showCart && <ShoppingBag className="h-3.5 w-3.5" style={{ color: text, opacity: 0.4 }} />}
                </div>
              </div>
              <div className="flex items-center gap-3 border-t border-current/5 pt-1">
                {['Início', 'Loja', 'Categorias', 'Promoções'].map((t, i) => (
                  <span key={i} className="text-[9px]" style={{ color: text, opacity: i === 0 ? 0.9 : 0.45, fontWeight: h.menuFontWeight || 500, textTransform: h.menuUppercase ? 'uppercase' : 'none' }}>{t}</span>
                ))}
              </div>
            </div>
          ) : (
            <>
              <span className="text-[12px] font-bold tracking-wide" style={{ color: text }}>{logo?.text || 'LOGO'}</span>
              <div className="flex items-center gap-3">
                {['Início', 'Loja', 'Sobre'].map((t, i) => (
                  <span key={i} className="text-[10px]" style={{ color: text, opacity: i === 0 ? 0.9 : 0.5, fontWeight: h.menuFontWeight || 500, textTransform: h.menuUppercase ? 'uppercase' : 'none', fontSize: Math.min(h.menuFontSize || 13, 11) }}>{t}</span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {h.showSearch && h.searchStyle === 'inline' && (
                  <div className="h-6 w-24 rounded-full border border-current/10 flex items-center px-2">
                    <Search className="h-2.5 w-2.5" style={{ color: text, opacity: 0.3 }} />
                    <span className="text-[8px] ml-1" style={{ color: text, opacity: 0.3 }}>Buscar</span>
                  </div>
                )}
                {h.showSearch && h.searchStyle !== 'inline' && <Search className="h-3.5 w-3.5" style={{ color: text, opacity: 0.4 }} />}
                {h.showWishlist && <Heart className="h-3.5 w-3.5" style={{ color: text, opacity: 0.4 }} />}
                {h.showAccount && <User className="h-3.5 w-3.5" style={{ color: text, opacity: 0.4 }} />}
                {h.showCart && (
                  <div className="relative">
                    <ShoppingBag className="h-3.5 w-3.5" style={{ color: text, opacity: 0.4 }} />
                    {h.cartBadgeStyle === 'count' && (
                      <span className="absolute -top-1.5 -right-1.5 text-[7px] font-bold rounded-full h-3 w-3 flex items-center justify-center" style={{ backgroundColor: text, color: bg }}>2</span>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  PRESET SYSTEM — 6 layout presets with desktop + mobile previews     */
/* ================================================================== */

interface HeaderPreset {
  id: string;
  name: string;
  tagline: string;
  tags: string[];
  config: Record<string, any>;
}

const HEADER_PRESETS: HeaderPreset[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    tagline: 'Limpo, leve, sem ruído',
    tags: ['Clean', 'Moderno'],
    config: {
      layout: 'classic', menuStyle: 'horizontal', menuUppercase: false, menuFontWeight: 400,
      menuFontSize: 13, menuHoverStyle: 'underline', menuSeparator: 'none', menuItemGap: 24,
      headerSurface: false, borderBottom: true, shadowOnScroll: false, iconStrokeWidth: 1.5,
      height: 56, sticky: true, shrinkOnScroll: false, iconSize: 20,
      showSearch: true, searchStyle: 'modal', showAccount: true, showWishlist: false, showCart: true, cartBadgeStyle: 'count',
      states: {
        normal: { backgroundColor: '#ffffff', textColor: '#1a1a1a', borderBottom: true, borderColor: '#f0f0f0', shadow: 'none', blur: false, height: 56 },
        sticky: { backgroundColor: '#ffffff', textColor: '#1a1a1a', borderBottom: true, borderColor: '#e5e7eb', shadow: 'subtle', blur: true, height: 52 },
        transparent: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 56 },
      },
    },
  },
  {
    id: 'classic',
    name: 'Classic',
    tagline: 'Confiável e organizado',
    tags: ['Profissional', 'Versátil'],
    config: {
      layout: 'classic', menuStyle: 'dropdown', menuUppercase: true, menuFontWeight: 500,
      menuFontSize: 12, menuHoverStyle: 'both', menuSeparator: 'none', menuItemGap: 16,
      menuLetterSpacing: 0.08, headerSurface: true, dropdownElevated: true, borderBottom: true,
      shadowOnScroll: true, iconStrokeWidth: 1.5, height: 64, sticky: true, shrinkOnScroll: true, iconSize: 20,
      showSearch: true, searchStyle: 'modal', showAccount: true, showWishlist: false, showCart: true, cartBadgeStyle: 'count',
      states: {
        normal: { backgroundColor: '#ffffff', textColor: '#1a1a1a', borderBottom: true, borderColor: '#e5e7eb', shadow: 'subtle', blur: false, height: 64 },
        sticky: { backgroundColor: '#ffffff', textColor: '#1a1a1a', borderBottom: true, borderColor: '#e5e7eb', shadow: 'medium', blur: true, height: 56 },
        transparent: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 64 },
      },
    },
  },
  {
    id: 'centered',
    name: 'Centered',
    tagline: 'Logo centralizada, elegante',
    tags: ['Fashion', 'Elegante'],
    config: {
      layout: 'centered', menuStyle: 'horizontal', menuUppercase: true, menuFontWeight: 500,
      menuFontSize: 11, menuHoverStyle: 'underline', menuSeparator: 'dot', menuItemGap: 20,
      menuLetterSpacing: 0.12, headerSurface: false, borderBottom: true, shadowOnScroll: false,
      iconStrokeWidth: 1.5, height: 72, sticky: true, shrinkOnScroll: true, iconSize: 20,
      showSearch: true, searchStyle: 'modal', showAccount: true, showWishlist: true, showCart: true, cartBadgeStyle: 'dot',
      states: {
        normal: { backgroundColor: '#ffffff', textColor: '#1a1a1a', borderBottom: true, borderColor: '#f0f0f0', shadow: 'none', blur: false, height: 72 },
        sticky: { backgroundColor: '#ffffff', textColor: '#1a1a1a', borderBottom: true, borderColor: '#e5e7eb', shadow: 'subtle', blur: true, height: 56 },
        transparent: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 72 },
      },
    },
  },
  {
    id: 'fashion',
    name: 'Fashion',
    tagline: 'Bold, contraste forte',
    tags: ['Impactante', 'Premium'],
    config: {
      layout: 'centered', menuStyle: 'horizontal', menuUppercase: true, menuFontWeight: 700,
      menuFontSize: 11, menuHoverStyle: 'underline', menuSeparator: 'none', menuItemGap: 32,
      menuLetterSpacing: 0.15, headerSurface: false, borderBottom: false, shadowOnScroll: false,
      iconStrokeWidth: 2, height: 72, sticky: true, shrinkOnScroll: true, iconSize: 20,
      showSearch: true, searchStyle: 'modal', showAccount: true, showWishlist: true, showCart: true, cartBadgeStyle: 'count',
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
    tagline: 'Moderno com busca inline',
    tags: ['Funcional', 'SaaS'],
    config: {
      layout: 'double-row', menuStyle: 'mega-menu', menuUppercase: false, menuFontWeight: 500,
      menuFontSize: 14, menuHoverStyle: 'background', menuSeparator: 'none', menuItemGap: 8,
      headerSurface: true, dropdownElevated: true, borderBottom: true, shadowOnScroll: true,
      iconStrokeWidth: 1.5, height: 64, sticky: true, shrinkOnScroll: true, iconSize: 20,
      searchStyle: 'inline', showSearch: true, showAccount: true, showWishlist: false, showCart: true, cartBadgeStyle: 'count',
      states: {
        normal: { backgroundColor: '#ffffff', textColor: '#0f172a', borderBottom: true, borderColor: '#e2e8f0', shadow: 'none', blur: false, height: 64 },
        sticky: { backgroundColor: '#f8fafc', textColor: '#0f172a', borderBottom: true, borderColor: '#e2e8f0', shadow: 'subtle', blur: true, height: 56 },
        transparent: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 64 },
      },
    },
  },
  {
    id: 'luxury',
    name: 'Luxury',
    tagline: 'Sofisticado e transparente',
    tags: ['Alto Padrão', 'Exclusivo'],
    config: {
      layout: 'transparent', menuStyle: 'horizontal', menuUppercase: true, menuFontWeight: 400,
      menuFontSize: 11, menuHoverStyle: 'underline', menuSeparator: 'none', menuItemGap: 32,
      menuLetterSpacing: 0.2, headerSurface: false, borderBottom: false, shadowOnScroll: false,
      iconStrokeWidth: 1, height: 80, sticky: true, shrinkOnScroll: true, iconSize: 18,
      showSearch: true, searchStyle: 'modal', showAccount: true, showWishlist: true, showCart: true, cartBadgeStyle: 'dot',
      states: {
        normal: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 80 },
        sticky: { backgroundColor: 'rgba(255,255,255,0.95)', textColor: '#1a1a1a', borderBottom: true, borderColor: '#e5e7eb', shadow: 'subtle', blur: true, height: 56 },
        transparent: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 80 },
      },
    },
  },
];

/* Preset Card with SVG preview */
function PresetCard({ preset, isActive, onApply }: { preset: HeaderPreset; isActive: boolean; onApply: () => void }) {
  const ns = preset.config.states?.normal;
  const bg = ns?.backgroundColor || '#ffffff';
  const text = ns?.textColor || '#1a1a1a';
  const isCentered = preset.config.layout === 'centered';
  const isDoubleRow = preset.config.layout === 'double-row';
  const isTransparent = preset.config.layout === 'transparent';
  const fillBg = isTransparent ? '#2d2d2d' : bg;

  return (
    <button onClick={onApply}
      className={cn(
        'relative w-full rounded-2xl border-2 transition-all duration-200 overflow-hidden text-left group',
        isActive
          ? 'border-primary ring-2 ring-primary/15 shadow-lg shadow-primary/5'
          : 'border-border/40 hover:border-primary/30 hover:shadow-md'
      )}>
      {/* SVG preview — desktop */}
      <div className="p-3 pb-2">
        <svg viewBox="0 0 240 50" className="w-full" style={{ height: isDoubleRow ? 42 : 32 }}>
          <rect width="240" height={isDoubleRow ? 50 : 32} rx="4" fill={fillBg}
            stroke={ns?.borderBottom ? (ns.borderColor || '#e5e7eb') : 'none'} strokeWidth="0.8" />

          {isCentered ? (
            <>
              <rect x="100" y="5" width="40" height="5" rx="2" fill={text} opacity="0.8" />
              {[55, 80, 150, 175].map((x, i) => (
                <rect key={i} x={x} y="20" width="20" height="2.5" rx="1" fill={text} opacity={0.3} />
              ))}
              <circle cx="22" cy="14" r="3.5" fill={text} opacity="0.2" />
              <circle cx="218" cy="14" r="3.5" fill={text} opacity="0.2" />
            </>
          ) : isDoubleRow ? (
            <>
              <rect x="14" y="6" width="35" height="5" rx="2" fill={text} opacity="0.8" />
              <rect x="70" y="5" width="100" height="7" rx="3.5" fill={text} opacity="0.06" />
              <circle cx="195" cy="10" r="3.5" fill={text} opacity="0.2" />
              <circle cx="210" cy="10" r="3.5" fill={text} opacity="0.2" />
              <circle cx="225" cy="10" r="3.5" fill={text} opacity="0.2" />
              <line x1="0" y1="23" x2="240" y2="23" stroke={text} strokeOpacity="0.06" />
              {[35, 75, 115, 155, 190].map((x, i) => (
                <rect key={i} x={x} y="30" width="28" height="2.5" rx="1" fill={text} opacity={i === 0 ? 0.6 : 0.25} />
              ))}
            </>
          ) : (
            <>
              <rect x="14" y="11" width="35" height="5" rx="2" fill={text} opacity="0.8" />
              {[70, 100, 130, 158].map((x, i) => (
                <rect key={i} x={x} y="13" width="22" height="2.5" rx="1" fill={text} opacity={i === 0 ? 0.6 : 0.25} />
              ))}
              <circle cx="205" cy="14" r="3.5" fill={text} opacity="0.2" />
              <circle cx="220" cy="14" r="3.5" fill={text} opacity="0.2" />
            </>
          )}
        </svg>
      </div>

      {/* Info */}
      <div className={cn('px-3.5 pb-3 pt-1')}>
        <div className="flex items-center gap-2 mb-1">
          <p className={cn('text-[13px] font-semibold', isActive ? 'text-primary' : 'text-foreground')}>{preset.name}</p>
          {isActive && <Check className="h-3.5 w-3.5 text-primary" />}
        </div>
        <p className="text-[11px] text-muted-foreground/60">{preset.tagline}</p>
        <div className="flex gap-1 mt-2">
          {preset.tags.map(t => (
            <span key={t} className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground/60">{t}</span>
          ))}
        </div>
      </div>
    </button>
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
        <SelectValue placeholder="Destino" />
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
/*  MENU ITEM EDITORS                                                   */
/* ================================================================== */

function SubitemEditor({ item, onUpdate, onDelete }: {
  item: ThemeMenuItem; onUpdate: (u: ThemeMenuItem) => void; onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-dashed border-border/50 rounded-xl bg-muted/10">
      <div className="flex items-center gap-2 px-3 py-2">
        <GripVertical className="h-3 w-3 text-muted-foreground/20 shrink-0" />
        <Input value={item.label} onChange={e => onUpdate({ ...item, label: e.target.value })} className="h-7 text-xs flex-1 bg-transparent border-border/30" placeholder="Subitem" />
        <DestinationSelect value={item.link} onChange={v => onUpdate({ ...item, link: v })} className="w-32" />
        <button onClick={() => setOpen(!open)} className="p-1 text-muted-foreground/40 hover:text-foreground transition-colors">
          <Settings2 className="h-3 w-3" />
        </button>
        <button onClick={onDelete} className="p-1 text-destructive/40 hover:text-destructive transition-colors">
          <X className="h-3 w-3" />
        </button>
      </div>
      {open && (
        <div className="px-3 pb-3 pt-1 space-y-2 border-t border-border/30">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <p className="text-[10px] text-muted-foreground/50 mb-1">Badge</p>
              <Input value={item.badge} onChange={e => onUpdate({ ...item, badge: e.target.value })} className="h-7 text-xs" placeholder="Novo" />
            </div>
            <input type="color" value={item.badgeColor} onChange={e => onUpdate({ ...item, badgeColor: e.target.value })} className="h-7 w-8 rounded border border-border cursor-pointer" />
          </div>
        </div>
      )}
    </div>
  );
}

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
    <div className="border border-border/50 rounded-xl bg-card overflow-hidden">
      <div className="flex items-center gap-2 p-3">
        <GripVertical className="h-3.5 w-3.5 text-muted-foreground/20 cursor-grab shrink-0" />
        <button onClick={() => setExpanded(!expanded)} className="p-0.5 text-muted-foreground/40 hover:text-foreground transition-colors">
          <ChevronRight className={cn('h-3.5 w-3.5 transition-transform', expanded && 'rotate-90')} />
        </button>
        <Input value={item.label} onChange={e => onUpdate({ ...item, label: e.target.value })} className="h-8 text-[13px] font-medium flex-1 bg-transparent border-border/30" placeholder="Nome" />
        <DestinationSelect value={item.link} onChange={v => onUpdate({ ...item, link: v })} className="w-36" />
        {item.badge && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 text-white" style={{ backgroundColor: item.badgeColor }}>{item.badge}</span>}
        {item.children.length > 0 && <span className="text-[10px] text-muted-foreground/50 bg-muted/40 px-1.5 py-0.5 rounded-full shrink-0">{item.children.length}</span>}
        <button onClick={onDelete} className="p-1.5 text-destructive/30 hover:text-destructive hover:bg-destructive/5 rounded-lg transition-colors">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
      {expanded && (
        <div className="border-t border-border/30 bg-muted/5 p-4 space-y-3">
          <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
            <div>
              <p className="text-[10px] font-medium text-muted-foreground/50 mb-1 flex items-center gap-1"><Tag className="h-3 w-3" /> Badge</p>
              <Input value={item.badge} onChange={e => onUpdate({ ...item, badge: e.target.value })} className="h-8 text-xs" placeholder="Novo, Promo, -30%" />
            </div>
            <input type="color" value={item.badgeColor} onChange={e => onUpdate({ ...item, badgeColor: e.target.value })} className="h-8 w-10 rounded-lg border border-border cursor-pointer" />
          </div>
          <label className="flex items-center gap-2 text-[13px] text-muted-foreground cursor-pointer">
            <input type="checkbox" checked={item.openNewTab} onChange={e => onUpdate({ ...item, openNewTab: e.target.checked })} className="rounded" />
            <ExternalLink className="h-3 w-3" /> Abrir em nova aba
          </label>
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider">Subitens ({item.children.length})</p>
            {item.children.map((child, idx) => (
              <SubitemEditor key={child.id} item={child} onUpdate={u => updateChild(idx, u)} onDelete={() => removeChild(idx)} />
            ))}
            <Button size="sm" variant="ghost" className="w-full text-xs h-8 text-muted-foreground/50 hover:text-muted-foreground" onClick={addChild}>
              <Plus className="h-3 w-3 mr-1" /> Subitem
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  STATE STYLE EDITOR                                                  */
/* ================================================================== */

function StateCard({ label, color, state, onChange, onCopyFrom }: {
  label: string; color: string; state: ThemeHeaderStateStyle;
  onChange: (u: Partial<ThemeHeaderStateStyle>) => void;
  onCopyFrom?: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
      {/* Header with mini preview */}
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors">
        <div className={cn('h-3 w-3 rounded-full shrink-0')} style={{ backgroundColor: color }} />
        <div className="flex-1 text-left">
          <p className="text-[13px] font-semibold text-foreground">{label}</p>
        </div>
        {/* Inline mini preview */}
        <div className="flex items-center gap-2 mr-2">
          <div className="w-20 h-5 rounded flex items-center justify-between px-1.5"
            style={{
              backgroundColor: state.backgroundColor === 'transparent' ? 'rgba(0,0,0,0.03)' : state.backgroundColor,
              border: state.borderBottom ? `1px solid ${state.borderColor}` : '1px solid transparent',
            }}>
            <div className="w-4 h-1.5 rounded" style={{ backgroundColor: state.textColor, opacity: 0.6 }} />
            <div className="flex gap-0.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: state.textColor, opacity: 0.3 }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: state.textColor, opacity: 0.3 }} />
            </div>
          </div>
        </div>
        <ChevronDown className={cn('h-3.5 w-3.5 text-muted-foreground/40 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="border-t border-border/30 p-4 space-y-4">
          {onCopyFrom && (
            <button onClick={onCopyFrom} className="text-[11px] text-primary/70 hover:text-primary flex items-center gap-1 transition-colors">
              <Copy className="h-3 w-3" /> Copiar estilos do Normal
            </button>
          )}

          <div className="grid grid-cols-2 gap-3">
            <ColorField label="Fundo" value={state.backgroundColor} onChange={v => onChange({ backgroundColor: v })} />
            <ColorField label="Texto" value={state.textColor} onChange={v => onChange({ textColor: v })} />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <ToggleRow label="Borda" checked={state.borderBottom} onChange={v => onChange({ borderBottom: v })} />
            <ToggleRow label="Blur" checked={state.blur} onChange={v => onChange({ blur: v })} />
          </div>

          {state.borderBottom && (
            <ColorField label="Cor da borda" value={state.borderColor} onChange={v => onChange({ borderColor: v })} />
          )}

          <Pills label="Sombra" value={state.shadow} onChange={v => onChange({ shadow: v as any })} options={[
            { value: 'none', label: 'Sem' },
            { value: 'subtle', label: 'Sutil' },
            { value: 'medium', label: 'Média' },
            { value: 'strong', label: 'Forte' },
          ]} />

          <NumSlider label="Altura" value={state.height} onChange={v => onChange({ height: v })} min={40} max={96} suffix="px" />
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  SECTION PANELS                                                      */
/* ================================================================== */

function PresetsSection() {
  const { draft, updateDraftSection } = useTheme();
  const h = draft.header ?? {} as any;

  const applyPreset = (preset: HeaderPreset) => {
    updateDraftSection('header', { ...preset.config, preset: preset.id });
    toast.success(`Preset "${preset.name}" aplicado`);
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-[15px] font-semibold text-foreground">Estilos Prontos</h3>
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Escolha um ponto de partida. Personalize depois.</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {HEADER_PRESETS.map(p => (
          <PresetCard key={p.id} preset={p} isActive={h.preset === p.id} onApply={() => applyPreset(p)} />
        ))}
      </div>
      <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs" onClick={() => {
        updateDraftSection('header', { preset: 'custom' });
        toast.success('Resetado para padrão');
      }}>
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
      <div>
        <h3 className="text-[15px] font-semibold text-foreground">Layout do Cabeçalho</h3>
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Como logo, menu e ícones são organizados.</p>
      </div>

      <OptionCards label="Disposição" value={h.layout} onChange={v => set({ layout: v })} options={[
        { value: 'classic', label: 'Clássico', description: 'Logo à esquerda, menu e ícones à direita' },
        { value: 'centered', label: 'Centralizado', description: 'Logo no centro, navegação abaixo' },
        { value: 'minimal', label: 'Minimalista', description: 'Apenas logo e ícones essenciais' },
        { value: 'logo-center-nav-left', label: 'Logo Centro + Nav', description: 'Menu à esquerda, logo centralizada, ícones à direita' },
        { value: 'hamburger-only', label: 'Hambúrguer', description: 'Menu sempre recolhido' },
        { value: 'double-row', label: 'Duas Linhas', description: 'Linha 1: logo + busca. Linha 2: navegação' },
        { value: 'transparent', label: 'Transparente', description: 'Sem fundo, sobrepõe o hero/banner' },
      ]} />

      <ControlGroup title="Comportamento" hint="Como o cabeçalho reage à rolagem">
        <ToggleRow label="Fixo (sticky)" hint="Mantém visível ao rolar" checked={h.sticky} onChange={v => set({ sticky: v })} />
        <ToggleRow label="Encolher ao rolar" hint="Reduz altura ao rolar para baixo" checked={h.shrinkOnScroll} onChange={v => set({ shrinkOnScroll: v })} />
        <ToggleRow label="Sombra ao rolar" checked={h.shadowOnScroll} onChange={v => set({ shadowOnScroll: v })} />
      </ControlGroup>

      <ControlGroup title="Profundidade" collapsible hint="Superfície e interação visual">
        <ToggleRow label="Superfície elevada" hint="Sombra e borda permanentes" checked={h.headerSurface ?? true} onChange={v => set({ headerSurface: v })} />
        <ToggleRow label="Dropdown elevado" hint="Submenus com sombra e seta" checked={h.dropdownElevated ?? true} onChange={v => set({ dropdownElevated: v })} />
        <ToggleRow label="Área clicável ampla" hint="Links maiores e fundo no hover" checked={h.menuItemPadding ?? true} onChange={v => set({ menuItemPadding: v })} />
      </ControlGroup>
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
    toast.success(`Estilos copiados para ${key === 'sticky' ? 'Sticky' : 'Transparente'}`);
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-[15px] font-semibold text-foreground">Estados do Cabeçalho</h3>
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Estilos independentes para cada estado: padrão, ao rolar e sobre hero.</p>
      </div>

      <StateCard label="Normal" color="#22c55e" state={states.normal} onChange={u => setState('normal', u)} />
      <StateCard label="Sticky (ao rolar)" color="#f59e0b" state={states.sticky} onChange={u => setState('sticky', u)} onCopyFrom={() => copyNormalTo('sticky')} />
      <StateCard label="Transparente (sobre hero)" color="#3b82f6" state={states.transparent} onChange={u => setState('transparent', u)} onCopyFrom={() => copyNormalTo('transparent')} />
    </div>
  );
}

function ContainerSection() {
  const { draft, updateDraftSection } = useTheme();
  const h = draft.header ?? {} as any;
  const container = h.container ?? { width: 'container', maxWidth: 1400, paddingX: 16, gap: 16, verticalAlign: 'center' };
  const setC = (u: Partial<typeof container>) => updateDraftSection('header', { container: { ...container, ...u } });

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-[15px] font-semibold text-foreground">Dimensões & Grid</h3>
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Largura, padding e espaçamento do cabeçalho.</p>
      </div>

      <Pills label="Largura" value={container.width} onChange={v => setC({ width: v as any })} options={[
        { value: 'full', label: 'Full Width' },
        { value: 'container', label: 'Container' },
      ]} />

      {container.width === 'container' && (
        <NumSlider label="Largura máxima" value={container.maxWidth} onChange={v => setC({ maxWidth: v })} min={1000} max={1920} suffix="px" step={20} />
      )}

      <NumSlider label="Padding lateral" value={container.paddingX} onChange={v => setC({ paddingX: v })} min={8} max={48} suffix="px" />
      <NumSlider label="Gap entre blocos" value={container.gap} onChange={v => setC({ gap: v })} min={0} max={48} suffix="px" hint="Espaçamento entre logo, menu e ações" />
      <NumSlider label="Altura" value={h.height || 64} onChange={v => updateDraftSection('header', { height: v })} min={48} max={96} suffix="px" />
    </div>
  );
}

function MenuStyleSection() {
  const { draft, updateDraftSection } = useTheme();
  const h = draft.header ?? {} as any;
  const set = (u: Partial<typeof h>) => updateDraftSection('header', u);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-[15px] font-semibold text-foreground">Menu Desktop</h3>
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Estilo, tipografia e interações da navegação.</p>
      </div>

      <Pills label="Tipo" value={h.menuStyle} onChange={v => set({ menuStyle: v })} options={[
        { value: 'horizontal', label: 'Horizontal' },
        { value: 'dropdown', label: 'Dropdown' },
        { value: 'mega-menu', label: 'Mega Menu' },
      ]} />

      <ControlGroup title="Tipografia">
        <NumSlider label="Tamanho da fonte" value={h.menuFontSize} onChange={v => set({ menuFontSize: v })} min={10} max={18} suffix="px" />
        <NumSlider label="Peso" value={h.menuFontWeight || 500} onChange={v => set({ menuFontWeight: v })} min={300} max={700} step={100} />
        <ToggleRow label="Maiúsculas" checked={h.menuUppercase} onChange={v => set({ menuUppercase: v })} />
        <NumSlider label="Espaçamento entre letras" value={Math.round((h.menuLetterSpacing ?? 0.05) * 100)} onChange={v => set({ menuLetterSpacing: v / 100 })} min={0} max={20} />
      </ControlGroup>

      <ControlGroup title="Interação">
        <Pills label="Hover" value={h.menuHoverStyle || 'underline'} onChange={v => set({ menuHoverStyle: v })} options={[
          { value: 'underline', label: 'Sublinhado' },
          { value: 'background', label: 'Fundo' },
          { value: 'both', label: 'Ambos' },
        ]} />
        <NumSlider label="Gap entre itens" value={h.menuItemGap ?? 8} onChange={v => set({ menuItemGap: v })} min={0} max={80} suffix="px" />
        <Pills label="Separador" value={h.menuSeparator || 'none'} onChange={v => set({ menuSeparator: v })} options={[
          { value: 'none', label: 'Nenhum' },
          { value: 'line', label: '| Linha' },
          { value: 'dot', label: '• Ponto' },
          { value: 'slash', label: '/ Barra' },
        ]} />
      </ControlGroup>
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
      <div>
        <h3 className="text-[15px] font-semibold text-foreground">Mega Menu</h3>
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Painel expandido com colunas, imagens e banners.</p>
      </div>

      {h.menuStyle !== 'mega-menu' && (
        <div className="rounded-xl border border-amber-200/60 bg-amber-50/30 p-3">
          <p className="text-[12px] text-amber-700/80">Ative "Mega Menu" na seção Menu Desktop para usar estas opções.</p>
        </div>
      )}

      <NumSlider label="Colunas" value={mm.columns} onChange={v => setMM({ columns: v as any })} min={2} max={6} />

      <Pills label="Largura" value={mm.width} onChange={v => setMM({ width: v as any })} options={[
        { value: 'auto', label: 'Auto' },
        { value: 'container', label: 'Container' },
        { value: 'full', label: 'Full' },
      ]} />

      <ToggleRow label="Imagens por categoria" hint="Thumbnail ao lado de cada grupo" checked={mm.showImages} onChange={v => setMM({ showImages: v })} />
      <ToggleRow label="Banner promocional" hint="Imagem dentro do mega menu" checked={mm.showBanner} onChange={v => setMM({ showBanner: v })} />

      {mm.showBanner && (
        <ControlGroup title="Banner">
          <div>
            <p className="text-[11px] text-muted-foreground/60 mb-1">URL da imagem</p>
            <Input className="h-8 text-xs" value={mm.bannerImageUrl} placeholder="https://..." onChange={e => setMM({ bannerImageUrl: e.target.value })} />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground/60 mb-1">Link</p>
            <Input className="h-8 text-xs" value={mm.bannerLink} placeholder="/products/sale" onChange={e => setMM({ bannerLink: e.target.value })} />
          </div>
        </ControlGroup>
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
      <div>
        <h3 className="text-[15px] font-semibold text-foreground">Ícones & Ações</h3>
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Quais ícones aparecem e como eles são exibidos.</p>
      </div>

      <NumSlider label="Tamanho" value={h.iconSize} onChange={v => set({ iconSize: v })} min={16} max={28} suffix="px" />

      <Pills label="Espessura" value={String(h.iconStrokeWidth || 1.5)} onChange={v => set({ iconStrokeWidth: Number(v) })} options={[
        { value: '1', label: 'Fino' },
        { value: '1.5', label: 'Regular' },
        { value: '2', label: 'Bold' },
      ]} />

      <ControlGroup title="Visibilidade">
        <ToggleRow label="Busca" hint="Ícone de lupa" checked={h.showSearch} onChange={v => set({ showSearch: v })} />
        <ToggleRow label="Conta" hint="Perfil / login" checked={h.showAccount} onChange={v => set({ showAccount: v })} />
        <ToggleRow label="Wishlist" hint="Favoritos" checked={h.showWishlist} onChange={v => set({ showWishlist: v })} />
        <ToggleRow label="Carrinho" hint="Sacola de compras" checked={h.showCart} onChange={v => set({ showCart: v })} />
      </ControlGroup>

      {h.showCart && (
        <Pills label="Badge do carrinho" value={h.cartBadgeStyle} onChange={v => set({ cartBadgeStyle: v })} options={[
          { value: 'count', label: 'Contador' },
          { value: 'dot', label: 'Ponto' },
          { value: 'none', label: 'Nenhum' },
        ]} />
      )}

      {/* Live icon preview */}
      <div className="rounded-xl border border-border/40 bg-muted/10 p-4 flex items-center justify-center gap-4">
        {h.showSearch && <Search style={{ width: h.iconSize, height: h.iconSize }} strokeWidth={h.iconStrokeWidth || 1.5} className="text-foreground/70" />}
        {h.showWishlist && <Heart style={{ width: h.iconSize, height: h.iconSize }} strokeWidth={h.iconStrokeWidth || 1.5} className="text-foreground/70" />}
        {h.showAccount && <User style={{ width: h.iconSize, height: h.iconSize }} strokeWidth={h.iconStrokeWidth || 1.5} className="text-foreground/70" />}
        {h.showCart && (
          <div className="relative">
            <ShoppingBag style={{ width: h.iconSize, height: h.iconSize }} strokeWidth={h.iconStrokeWidth || 1.5} className="text-foreground/70" />
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
      <div>
        <h3 className="text-[15px] font-semibold text-foreground">Busca</h3>
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Estilo, placeholder, dispositivos e auto-sugestão.</p>
      </div>

      <Pills label="Estilo" value={h.searchStyle} onChange={v => set({ searchStyle: v })} options={[
        { value: 'inline', label: 'Inline' },
        { value: 'modal', label: 'Modal' },
        { value: 'drawer', label: 'Drawer' },
      ]} />

      <div>
        <p className="text-[11px] text-muted-foreground/60 mb-1">Placeholder</p>
        <Input className="h-9 text-[13px]" value={search.placeholder} placeholder="Buscar produtos..."
          onChange={e => setSearch({ placeholder: e.target.value })} />
      </div>

      <ControlGroup title="Dispositivos">
        <ToggleRow label="Desktop" checked={search.showOnDesktop} onChange={v => setSearch({ showOnDesktop: v })} />
        <ToggleRow label="Mobile" checked={search.showOnMobile} onChange={v => setSearch({ showOnMobile: v })} />
      </ControlGroup>

      <ControlGroup title="Avançado" collapsible>
        <ToggleRow label="Auto-sugestão" hint="Sugere produtos enquanto digita" checked={search.autoSuggest} onChange={v => setSearch({ autoSuggest: v })} />
        {search.autoSuggest && (
          <NumSlider label="Máx. resultados" value={search.maxResults} onChange={v => setSearch({ maxResults: v })} min={3} max={12} />
        )}
        <ToggleRow label="Atalho Ctrl+K" hint="Abre a busca com atalho de teclado" checked={search.shortcutEnabled} onChange={v => setSearch({ shortcutEnabled: v })} />
      </ControlGroup>
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
      <div>
        <h3 className="text-[15px] font-semibold text-foreground">Menu Mobile</h3>
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Drawer, ações internas e navegação hierárquica.</p>
      </div>

      <Pills label="Posição do drawer" value={mobile.drawerPosition} onChange={v => setMobile({ drawerPosition: v as any })} options={[
        { value: 'left', label: '← Esquerda' },
        { value: 'right', label: 'Direita →' },
      ]} />

      <Pills label="Agrupamento" value={mobile.groupStyle} onChange={v => setMobile({ groupStyle: v as any })} options={[
        { value: 'accordion', label: 'Acordeão' },
        { value: 'list', label: 'Lista' },
      ]} />

      <NumSlider label="Níveis" value={mobile.maxLevels} onChange={v => setMobile({ maxLevels: v as any })} min={2} max={3} hint="Profundidade máxima de subitens" />

      <ControlGroup title="Ações no Drawer" hint="O que aparece dentro do menu mobile">
        <ToggleRow label="Buscar" checked={mobile.showSearchInDrawer} onChange={v => setMobile({ showSearchInDrawer: v })} />
        <ToggleRow label="Conta / Login" checked={mobile.showAccountInDrawer} onChange={v => setMobile({ showAccountInDrawer: v })} />
        <ToggleRow label="Carrinho" checked={mobile.showCartInDrawer} onChange={v => setMobile({ showCartInDrawer: v })} />
      </ControlGroup>
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
      <div>
        <h3 className="text-[15px] font-semibold text-foreground">Itens do Menu</h3>
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Links da barra de navegação. Arraste para reordenar.</p>
      </div>

      <ControlGroup title="Preferências">
        <ToggleRow label="Badges" hint="Etiquetas como 'Novo' ou '-30%'" checked={mm.showBadges} onChange={v => set({ showBadges: v })} />
        <ToggleRow label="Ícones" hint="Ícone à esquerda de cada item" checked={mm.showIcons} onChange={v => set({ showIcons: v })} />
      </ControlGroup>

      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-foreground">{mm.items.length} {mm.items.length === 1 ? 'item' : 'itens'}</p>
        </div>

        {mm.items.length === 0 && (
          <div className="border-2 border-dashed border-border/30 rounded-2xl py-10 text-center">
            <Menu className="h-6 w-6 text-muted-foreground/15 mx-auto mb-2" />
            <p className="text-[13px] text-muted-foreground/50">Nenhum item adicionado</p>
            <p className="text-[11px] text-muted-foreground/30 mt-1">A loja usará categorias automáticas.</p>
          </div>
        )}

        {mm.items.map((item, idx) => (
          <MenuItemEditor key={item.id} item={item} onUpdate={u => updateItem(idx, u)} onDelete={() => removeItem(idx)} />
        ))}

        <Button variant="outline" className="w-full rounded-xl" onClick={addItem}>
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
      <div>
        <h3 className="text-[15px] font-semibold text-foreground">Barra de Anúncio</h3>
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Barra no topo do site com mensagens promocionais.</p>
      </div>

      <ToggleRow label="Ativar barra" hint="Exibe barra colorida no topo" checked={a.enabled} onChange={v => setAnn({ enabled: v })} />

      {a.enabled && (
        <>
          <Pills label="Estilo" value={a.style} onChange={v => setAnn({ style: v })} options={[
            { value: 'static', label: 'Fixo' },
            { value: 'carousel', label: 'Carrossel' },
            { value: 'ticker', label: 'Ticker' },
          ]} />

          {(a.style === 'ticker' || a.style === 'carousel') && (
            <Pills label="Direção" value={a.direction} onChange={v => setAnn({ direction: v })} options={[
              { value: 'rtl', label: '← Esquerda' },
              { value: 'ltr', label: 'Direita →' },
            ]} />
          )}

          <ControlGroup title="Mensagens">
            <div>
              <p className="text-[11px] text-muted-foreground/60 mb-1">Mensagem 1</p>
              <Input className="h-8 text-xs" value={a.messages[0] || ''} placeholder="Frete grátis acima de R$ 299"
                onChange={e => { const msgs = [...a.messages]; msgs[0] = e.target.value; setAnn({ messages: msgs }); }} />
            </div>
            {(a.style === 'carousel' || a.style === 'ticker') && (
              <>
                <div>
                  <p className="text-[11px] text-muted-foreground/60 mb-1">Mensagem 2</p>
                  <Input className="h-8 text-xs" value={a.messages[1] || ''} placeholder="Parcele em até 12x"
                    onChange={e => { const msgs = [...a.messages]; while (msgs.length < 2) msgs.push(''); msgs[1] = e.target.value; setAnn({ messages: msgs }); }} />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground/60 mb-1">Mensagem 3</p>
                  <Input className="h-8 text-xs" value={a.messages[2] || ''} placeholder="Troca grátis em 30 dias"
                    onChange={e => { const msgs = [...a.messages]; while (msgs.length < 3) msgs.push(''); msgs[2] = e.target.value; setAnn({ messages: msgs }); }} />
                </div>
                <NumSlider label="Velocidade" value={a.speed} onChange={v => setAnn({ speed: v })} min={2} max={10} suffix="s" />
              </>
            )}
          </ControlGroup>

          <div className="grid grid-cols-2 gap-3">
            <ColorField label="Fundo" value={a.backgroundColor} onChange={v => setAnn({ backgroundColor: v })} />
            <ColorField label="Texto" value={a.textColor} onChange={v => setAnn({ textColor: v })} />
          </div>

          <ToggleRow label="Pausar no hover" checked={a.pauseOnHover} onChange={v => setAnn({ pauseOnHover: v })} />
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
      <div>
        <h3 className="text-[15px] font-semibold text-foreground">Banner</h3>
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Imagem abaixo do cabeçalho. Ideal para promoções.</p>
      </div>

      <ToggleRow label="Ativar banner" checked={bb.enabled} onChange={v => setBanner({ enabled: v })} />

      {bb.enabled && (
        <>
          <div>
            <p className="text-[11px] text-muted-foreground/60 mb-1">URL da imagem</p>
            <Input className="h-8 text-xs" value={bb.imageUrl} placeholder="https://..."
              onChange={e => setBanner({ imageUrl: e.target.value })} />
          </div>

          <ToggleRow label="Carrossel" hint="Múltiplas imagens com rotação" checked={bb.carousel} onChange={v => setBanner({ carousel: v })} />

          {bb.carousel && (
            <ControlGroup title="Imagens adicionais">
              <div>
                <p className="text-[11px] text-muted-foreground/60 mb-1">Imagem 2</p>
                <Input className="h-8 text-xs" value={bb.images[0] || ''} placeholder="https://..."
                  onChange={e => { const imgs = [...(bb.images || [])]; while (imgs.length < 1) imgs.push(''); imgs[0] = e.target.value; setBanner({ images: imgs }); }} />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground/60 mb-1">Imagem 3</p>
                <Input className="h-8 text-xs" value={bb.images[1] || ''} placeholder="https://..."
                  onChange={e => { const imgs = [...(bb.images || [])]; while (imgs.length < 2) imgs.push(''); imgs[1] = e.target.value; setBanner({ images: imgs }); }} />
              </div>
              <NumSlider label="Velocidade" value={bb.carouselSpeed} onChange={v => setBanner({ carouselSpeed: v })} min={2} max={10} suffix="s" />
            </ControlGroup>
          )}

          <div>
            <p className="text-[11px] text-muted-foreground/60 mb-1">Link</p>
            <Input className="h-8 text-xs" value={bb.link} placeholder="/products"
              onChange={e => setBanner({ link: e.target.value })} />
          </div>

          <NumSlider label="Altura" value={bb.height} onChange={v => setBanner({ height: v })} min={40} max={200} suffix="px" />
          <ToggleRow label="Largura total" checked={bb.fullWidth} onChange={v => setBanner({ fullWidth: v })} />
        </>
      )}
    </div>
  );
}

/* ================================================================== */
/*  SECTION MAP                                                         */
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
    publish('Atualização do cabeçalho');
    toast.success('Publicado com sucesso!');
  };

  const SectionComponent = SECTION_COMPONENTS[activeSection];

  const groups = useMemo(() => {
    return SIDEBAR_ITEMS.reduce<Record<string, SidebarItem[]>>((acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push(item);
      return acc;
    }, {});
  }, []);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Top bar */}
      <div className="border-b border-border/50 px-5 py-2.5 flex items-center justify-between bg-background shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center">
            <PanelTop className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="text-[14px] font-semibold text-foreground">Cabeçalho & Menu</h2>
            <p className="text-[11px] text-muted-foreground/50">Navegação e aparência do topo da loja</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs h-8 text-muted-foreground" onClick={() => navigate('/')}>
            <Eye className="h-3.5 w-3.5" /> Ver loja
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8" onClick={() => navigate('/admin/customization')}>
            <Palette className="h-3.5 w-3.5" /> Aparência
          </Button>
          {isDirty && (
            <Button size="sm" className="gap-1.5 text-xs h-8" onClick={handleSave}>
              <Save className="h-3.5 w-3.5" /> Publicar
            </Button>
          )}
        </div>
      </div>

      {/* Live preview */}
      <LiveHeaderPreview />

      {/* Content: Sidebar + Panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-52 border-r border-border/40 bg-muted/10 flex-shrink-0">
          <ScrollArea className="h-full">
            <div className="py-3 px-2 space-y-4">
              {Object.entries(groups).map(([group, items]) => (
                <div key={group}>
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground/35 px-3 mb-1.5">{group}</p>
                  <div className="space-y-0.5">
                    {items.map(item => (
                      <button
                        key={item.key}
                        onClick={() => setActiveSection(item.key)}
                        className={cn(
                          'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] transition-all duration-150',
                          activeSection === item.key
                            ? 'bg-background text-foreground font-medium shadow-sm border border-border/50'
                            : 'text-muted-foreground/70 hover:text-foreground hover:bg-background/50'
                        )}
                      >
                        <item.icon className={cn('h-3.5 w-3.5 shrink-0', activeSection === item.key ? 'text-primary' : 'text-muted-foreground/40')} />
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto text-[8px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">{item.badge}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Edit Panel */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="max-w-xl mx-auto px-6 py-6">
              <SectionComponent />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
