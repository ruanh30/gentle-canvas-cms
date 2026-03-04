import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { StoreHeader } from '@/components/store/StoreHeader';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Trash2, ChevronDown, ChevronRight, GripVertical, Palette, Save,
  Menu, ExternalLink, Tag, Settings2, PanelTop, Megaphone, ImageIcon,
  Eye, EyeOff, Search, User, Heart, ShoppingBag, ShoppingCart,
  Monitor, Smartphone, Layers, Sparkles, RotateCcw,
  Copy, MousePointer, Columns3, LayoutGrid, Navigation, Zap,
  ArrowRight, Check, X, ChevronLeft, Image,
  // Icon picker — Search icons
  SearchIcon, ScanSearch, SearchCheck, SearchCode, Telescope, Focus, ScanLine, Radar, ListFilter, Filter,
  // Icon picker — Account icons
  UserRound, UserCircle, UserCircle2, UserCheck, UserCog, CircleUser, Contact, BadgeCheck, Fingerprint, LogIn,
  // Icon picker — Cart icons
  Store, Package, PackagePlus, Briefcase, HandCoins, Wallet, CreditCard, Receipt, Gem, Gift,
  // Menu colors
  Paintbrush,
  type LucideIcon
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
import { PresetConfirmDialog } from '@/components/admin/PresetConfirmDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

/* ================================================================== */
/*  TYPES                                                               */
/* ================================================================== */

type SectionKey =
  | 'presets' | 'layout' | 'states' | 'container' | 'menu-style'
  | 'mega-menu' | 'icons' | 'search' | 'mobile' | 'items'
  | 'banners';

interface SidebarItem {
  key: SectionKey;
  label: string;
  icon: React.ElementType;
  group: string;
  badge?: string;
  hint?: string;
}

/* ================================================================== */
/*  SIDEBAR CONFIG                                                      */
/* ================================================================== */

const SIDEBAR_ITEMS: SidebarItem[] = [
  { key: 'presets', label: 'Estilos Prontos', icon: Sparkles, group: 'DESIGN', hint: 'Layouts pré-montados' },
  { key: 'layout', label: 'Layout', icon: LayoutGrid, group: 'DESIGN', hint: 'Estrutura e comportamento' },
  { key: 'states', label: 'Estados', icon: Layers, group: 'DESIGN', hint: 'Normal, Sticky, Transparente' },
  { key: 'container', label: 'Dimensões', icon: Columns3, group: 'DESIGN', hint: 'Largura, altura e espaçamentos' },
  { key: 'menu-style', label: 'Menu Desktop', icon: Navigation, group: 'NAVEGAÇÃO', hint: 'Tipografia, cores e interações' },
  { key: 'mega-menu', label: 'Mega Menu', icon: LayoutGrid, group: 'NAVEGAÇÃO', hint: 'Painel com colunas e banners' },
  { key: 'mobile', label: 'Menu Mobile', icon: Smartphone, group: 'NAVEGAÇÃO', hint: 'Drawer e ações mobile' },
  { key: 'items', label: 'Itens do Menu', icon: Menu, group: 'NAVEGAÇÃO', hint: 'Links e subitens' },
  { key: 'icons', label: 'Ícones', icon: MousePointer, group: 'ELEMENTOS', hint: 'Visibilidade, estilo e personalização' },
  { key: 'search', label: 'Busca', icon: Search, group: 'ELEMENTOS', hint: 'Estilo e comportamento da busca' },
  { key: 'banners', label: 'Banners & Anúncios', icon: Megaphone, group: 'CONTEÚDO', hint: 'Barra de anúncio + banner' },
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
        <span className="text-[11px] font-mono tabular-nums px-2 py-0.5 rounded-md bg-[hsl(var(--flash-brand)/0.08)] text-[hsl(var(--flash-brand-deep))]">{value}{suffix}</span>
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
                ? 'bg-[hsl(var(--flash-brand-deep))] text-white border-[hsl(var(--flash-brand-deep))] shadow-sm'
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
                ? 'bg-[hsl(var(--flash-brand)/0.06)] border-[hsl(var(--flash-brand-deep)/0.3)] ring-1 ring-[hsl(var(--flash-brand-deep)/0.15)]'
                : 'bg-muted/20 border-border/40 hover:bg-muted/40 hover:border-border/60'
            )}>
            <div className="flex items-center justify-between">
              <span className={cn('font-medium', value === o.value ? 'text-[hsl(var(--flash-brand-deep))]' : 'text-foreground')}>{o.label}</span>
              {value === o.value && <Check className="h-3.5 w-3.5 text-[hsl(var(--flash-brand-deep))]" />}
            </div>
            <span className="text-[11px] text-muted-foreground/60 block mt-0.5">{o.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  ANNOUNCEMENT CAROUSEL PREVIEW (mini)                                */
/* ================================================================== */

function AnnouncementCarouselPreview({ messages, bg, color, speed }: { messages: string[]; bg: string; color: string; speed: number }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (messages.length <= 1) return;
    const interval = setInterval(() => setIdx(p => (p + 1) % messages.length), speed * 1000);
    return () => clearInterval(interval);
  }, [messages.length, speed]);

  return (
    <div className="relative overflow-hidden py-1" style={{ backgroundColor: bg, color, height: 22 }}>
      {messages.map((m, i) => (
        <div key={i} className={cn(
          'absolute inset-0 flex items-center justify-center text-[9px] font-medium tracking-wide transition-all duration-500',
          i === idx ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
        )}>{m}</div>
      ))}
    </div>
  );
}

/* ================================================================== */
/*  LIVE HEADER PREVIEW                                                 */
/* ================================================================== */

function MobilePreviewFloat() {
  const { draft } = useTheme();
  const mobileIframeRef = React.useRef<HTMLIFrameElement>(null);
  const iframeLoadedRef = React.useRef(false);

  // When iframe loads, send initial theme
  const handleIframeLoad = useCallback(() => {
    iframeLoadedRef.current = true;
    mobileIframeRef.current?.contentWindow?.postMessage(
      { type: 'theme-preview-update', theme: draft },
      '*'
    );
  }, [draft]);

  // Sync draft changes to iframe
  useEffect(() => {
    if (iframeLoadedRef.current && mobileIframeRef.current?.contentWindow) {
      mobileIframeRef.current.contentWindow.postMessage(
        { type: 'theme-preview-update', theme: draft },
        '*'
      );
    }
  }, [draft]);

  const iframeScale = 260 / 375;
  const phoneHeight = 520;
  const screenHeight = phoneHeight - 68; // top bezel + bottom bar

  return (
    <div className="sticky top-0 shrink-0 z-10 p-3">
      {/* Phone shell */}
      <div className="relative w-[276px]">
        {/* Outer phone body */}
        <div
          className="rounded-[32px] border-[3px] border-[#1a1a1a] bg-[#1a1a1a] shadow-2xl overflow-hidden"
          style={{ height: phoneHeight }}
        >
          {/* Status bar with notch */}
          <div className="h-7 bg-black relative flex items-center justify-between px-5">
            <span className="text-[9px] text-white/80 font-semibold">9:41</span>
            {/* Notch / Dynamic Island */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[72px] h-[18px] bg-black rounded-full flex items-center justify-center">
              <div className="w-[8px] h-[8px] rounded-full bg-[#1a1a1a] border border-[#333] mr-1" />
            </div>
            {/* Right status icons */}
            <div className="flex items-center gap-1">
              {/* Signal */}
              <div className="flex gap-[1px] items-end">
                {[4, 6, 8, 10].map((h, i) => (
                  <div key={i} className="w-[2px] rounded-sm bg-white/70" style={{ height: h }} />
                ))}
              </div>
              {/* Wifi */}
              <svg className="w-3 h-3 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" fill="currentColor" />
              </svg>
              {/* Battery */}
              <div className="w-[18px] h-[9px] rounded-[2px] border border-white/60 relative ml-0.5">
                <div className="absolute inset-[1.5px] right-[3px] bg-white/70 rounded-[1px]" />
                <div className="absolute -right-[3px] top-[2px] w-[2px] h-[4px] bg-white/50 rounded-r-sm" />
              </div>
            </div>
          </div>

          {/* Screen area — full store page in iframe */}
          <div className="overflow-hidden" style={{ height: screenHeight }}>
            <iframe
              ref={mobileIframeRef}
              src="/?theme-preview=true"
              title="Mobile Store Preview"
              className="border-0 bg-background block origin-top-left"
              onLoad={handleIframeLoad}
              style={{
                width: 375,
                height: screenHeight / iframeScale,
                transform: `scale(${iframeScale})`,
                transformOrigin: 'top left',
              }}
              sandbox="allow-same-origin allow-scripts"
            />
          </div>

          {/* Bottom home indicator */}
          <div className="h-5 bg-background flex items-end justify-center pb-1">
            <div className="w-24 h-1 rounded-full bg-foreground/20" />
          </div>
        </div>

        {/* Side buttons */}
        {/* Power button */}
        <div className="absolute -right-[4px] top-[100px] w-[3px] h-[40px] rounded-r-sm bg-[#2a2a2a]" />
        {/* Volume up */}
        <div className="absolute -left-[4px] top-[80px] w-[3px] h-[24px] rounded-l-sm bg-[#2a2a2a]" />
        {/* Volume down */}
        <div className="absolute -left-[4px] top-[112px] w-[3px] h-[24px] rounded-l-sm bg-[#2a2a2a]" />
      </div>
      <p className="text-[9px] text-muted-foreground/50 text-center mt-2 uppercase tracking-wider font-medium">Mobile Preview</p>
    </div>
  );
}

function LiveHeaderPreview() {
  const desktopScale = 0.55;

  return (
    <div className="border-b border-border/50 bg-[hsl(var(--flash-surface))]">
      <div className="px-4 py-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[hsl(var(--flash-brand-deep)/0.6)]">Preview ao vivo</p>
      </div>
      <div className="px-4 mb-3">
        <div className="rounded-lg overflow-hidden border border-border/40 shadow-sm">
          <div
            style={{
              transform: `scale(${desktopScale})`,
              transformOrigin: 'top left',
              width: `${100 / desktopScale}%`,
              pointerEvents: 'none',
            }}
          >
            <StoreHeader />
          </div>
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
  // ── 1. MINIMAL — Apple-inspired: translucent glass, even spacing, clean ──
  {
    id: 'minimal',
    name: 'Minimal',
    tagline: 'Inspirado na Apple. Blur translúcido, tipografia fina, espaçamento uniforme',
    tags: ['Clean', 'Premium'],
    config: {
      layout: 'classic', menuStyle: 'horizontal', menuUppercase: false, menuFontWeight: 400,
      menuFontSize: 13, menuHoverStyle: 'underline', menuSeparator: 'none', menuItemGap: 28,
      menuLetterSpacing: 0, menuItemPadding: false,
      headerSurface: false, dropdownElevated: false, borderBottom: false, shadowOnScroll: false,
      iconStrokeWidth: 1.5, height: 52, sticky: true, shrinkOnScroll: false, shrinkTransparent: false, iconSize: 18,
      showSearch: true, searchStyle: 'modal', showAccount: true, showCart: true, cartBadgeStyle: 'dot',
      menuDividerLine: false,
      menuTypography: { fontFamily: 'DM Sans', fontWeight: 400, fontSizeDesktop: 13, fontSizeMobile: 14, letterSpacing: 0, textTransform: 'none', lineHeight: 1.2 },
      container: { width: 'container', maxWidth: 1280, paddingX: 20, gap: 24, verticalAlign: 'center' },
      mobile: { drawerPosition: 'right', showSearchInDrawer: true, showAccountInDrawer: true, showCartInDrawer: false, maxLevels: 2, groupStyle: 'list' },
      search: { placeholder: 'Buscar...', showOnDesktop: true, showOnMobile: true, autoSuggest: false, maxResults: 6, shortcutEnabled: true },
      announcement: { enabled: false },
      menuColors: { linkColor: '', linkHoverColor: '', linkActiveColor: '', linkBg: '', linkHoverBg: '' },
      states: {
        normal: { backgroundColor: 'rgba(255,255,255,0.8)', textColor: '#1d1d1f', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: true, height: 52 },
        sticky: { backgroundColor: 'rgba(255,255,255,0.92)', textColor: '#1d1d1f', borderBottom: true, borderColor: '#d2d2d7', shadow: 'none', blur: true, height: 48 },
        transparent: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 52 },
      },
    },
  },

  // ── 2. MARKETPLACE — Amazon/Shein: double-row, search-first, dense, mega menu ──
  {
    id: 'marketplace',
    name: 'Marketplace',
    tagline: 'Estilo Amazon/Shein. Busca inline, mega menu denso, barra de categorias separada',
    tags: ['E-commerce', 'Denso'],
    config: {
      layout: 'double-row', menuStyle: 'mega-menu', menuUppercase: false, menuFontWeight: 500,
      menuFontSize: 14, menuHoverStyle: 'background', menuSeparator: 'none', menuItemGap: 4,
      menuLetterSpacing: 0, menuItemPadding: true,
      headerSurface: true, dropdownElevated: true, borderBottom: true, shadowOnScroll: true,
      iconStrokeWidth: 1.5, height: 60, sticky: true, shrinkOnScroll: true, shrinkTransparent: false, iconSize: 22,
      showSearch: true, searchStyle: 'inline', showAccount: true, showCart: true, cartBadgeStyle: 'count',
      menuDividerLine: false,
      menuTypography: { fontFamily: 'Inter', fontWeight: 500, fontSizeDesktop: 14, fontSizeMobile: 14, letterSpacing: 0, textTransform: 'none', lineHeight: 1.2 },
      container: { width: 'full', maxWidth: 1600, paddingX: 16, gap: 12, verticalAlign: 'center' },
      mobile: { drawerPosition: 'left', showSearchInDrawer: true, showAccountInDrawer: true, showCartInDrawer: true, maxLevels: 3, groupStyle: 'accordion' },
      megaMenuConfig: { columns: 5, width: 'full', showImages: true, showBanner: true, bannerImageUrl: '', bannerLink: '' },
      search: { placeholder: 'Buscar em toda a loja...', showOnDesktop: true, showOnMobile: true, autoSuggest: true, maxResults: 8, shortcutEnabled: true },
      menuBar: { enabled: true, backgroundColor: '#f7f7f7', textColor: '#111111', height: 44, fullWidth: true, borderTop: false, borderBottom: true, shadow: 'none' },
      announcement: { enabled: true, messages: ['Frete grátis acima de R$ 199', 'Até 50% OFF em selecionados'], speed: 4, backgroundColor: '#131921', textColor: '#ffffff', style: 'ticker', direction: 'rtl', showIcon: false, icon: '', link: '', pauseOnHover: true, pageRules: 'all', scheduleEnabled: false, scheduleStart: '', scheduleEnd: '', segmentation: 'all', ctaText: '', ctaLink: '', utmSource: '', utmMedium: '', utmCampaign: '' },
      menuColors: { linkColor: '#111111', linkHoverColor: '#000000', linkActiveColor: '#e47911', linkBg: '', linkHoverBg: 'rgba(0,0,0,0.04)' },
      states: {
        normal: { backgroundColor: '#ffffff', textColor: '#0f1111', borderBottom: true, borderColor: '#ddd', shadow: 'subtle', blur: false, height: 60 },
        sticky: { backgroundColor: '#f7f7f7', textColor: '#0f1111', borderBottom: true, borderColor: '#ddd', shadow: 'medium', blur: true, height: 52 },
        transparent: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 60 },
      },
    },
  },

  // ── 3. MAISON — Gucci/Dior: centered logo, editorial letter-spacing, serif feel ──
  {
    id: 'fashion-house',
    name: 'Maison',
    tagline: 'Inspirado em Gucci/Dior. Logo central, tipografia editorial, tom luxuoso',
    tags: ['Luxo', 'Editorial'],
    config: {
      layout: 'centered', menuStyle: 'horizontal', menuUppercase: true, menuFontWeight: 400,
      menuFontSize: 10, menuHoverStyle: 'underline', menuSeparator: 'none', menuItemGap: 40,
      menuLetterSpacing: 0.25, menuItemPadding: false,
      headerSurface: false, dropdownElevated: false, borderBottom: true, shadowOnScroll: false,
      iconStrokeWidth: 1, height: 80, sticky: true, shrinkOnScroll: true, shrinkTransparent: false, iconSize: 18,
      showSearch: true, searchStyle: 'modal', showAccount: true, showCart: true, cartBadgeStyle: 'dot',
      menuDividerLine: true,
      menuTypography: { fontFamily: 'Lato', fontWeight: 400, fontSizeDesktop: 10, fontSizeMobile: 12, letterSpacing: 0.25, textTransform: 'uppercase', lineHeight: 1.2 },
      container: { width: 'container', maxWidth: 1400, paddingX: 32, gap: 32, verticalAlign: 'center' },
      mobile: { drawerPosition: 'left', showSearchInDrawer: true, showAccountInDrawer: true, showCartInDrawer: false, maxLevels: 2, groupStyle: 'list' },
      search: { placeholder: 'Pesquisar', showOnDesktop: true, showOnMobile: true, autoSuggest: false, maxResults: 5, shortcutEnabled: false },
      announcement: { enabled: false },
      menuColors: { linkColor: '#2c2418', linkHoverColor: '#8a7560', linkActiveColor: '#2c2418', linkBg: '', linkHoverBg: '' },
      states: {
        normal: { backgroundColor: '#faf8f5', textColor: '#2c2418', borderBottom: true, borderColor: '#e0d5c5', shadow: 'none', blur: false, height: 80 },
        sticky: { backgroundColor: '#faf8f5', textColor: '#2c2418', borderBottom: true, borderColor: '#d4c8b0', shadow: 'subtle', blur: true, height: 56 },
        transparent: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 80 },
      },
    },
  },

  // ── 4. ZARA — Hamburger-only desktop, ultra-clean, giant logo, minimal icons ──
  {
    id: 'zara',
    name: 'Zara',
    tagline: 'Estilo Zara. Hamburger no desktop, logo dominante, quase sem elementos',
    tags: ['Ultra-Clean', 'Destaque'],
    config: {
      layout: 'hamburger-only', menuStyle: 'horizontal', menuUppercase: true, menuFontWeight: 300,
      menuFontSize: 13, menuHoverStyle: 'underline', menuSeparator: 'none', menuItemGap: 20,
      menuLetterSpacing: 0.3, menuItemPadding: false,
      headerSurface: false, dropdownElevated: false, borderBottom: false, shadowOnScroll: false,
      iconStrokeWidth: 1, height: 72, sticky: true, shrinkOnScroll: true, shrinkTransparent: false, iconSize: 20,
      showSearch: true, searchStyle: 'modal', showAccount: false, showCart: true, cartBadgeStyle: 'dot',
      menuDividerLine: false,
      menuTypography: { fontFamily: 'Inter', fontWeight: 300, fontSizeDesktop: 13, fontSizeMobile: 14, letterSpacing: 0.3, textTransform: 'uppercase', lineHeight: 1.2 },
      container: { width: 'full', maxWidth: 1920, paddingX: 24, gap: 16, verticalAlign: 'center' },
      mobile: { drawerPosition: 'left', showSearchInDrawer: true, showAccountInDrawer: true, showCartInDrawer: false, maxLevels: 3, groupStyle: 'list' },
      search: { placeholder: 'BUSCAR', showOnDesktop: true, showOnMobile: true, autoSuggest: false, maxResults: 6, shortcutEnabled: false },
      announcement: { enabled: false },
      menuColors: { linkColor: '#000000', linkHoverColor: '#666666', linkActiveColor: '#000000', linkBg: '', linkHoverBg: '' },
      states: {
        normal: { backgroundColor: '#ffffff', textColor: '#000000', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 72 },
        sticky: { backgroundColor: '#ffffff', textColor: '#000000', borderBottom: true, borderColor: '#f0f0f0', shadow: 'none', blur: true, height: 56 },
        transparent: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 72 },
      },
    },
  },

  // ── 5. UNIQLO — Compact functional, dropdown menus, all icons visible ──
  {
    id: 'uniqlo',
    name: 'Uniqlo',
    tagline: 'Limpo e funcional. Compacto, dropdown com sub-menus, todos os ícones visíveis',
    tags: ['Funcional', 'Compacto'],
    config: {
      layout: 'classic', menuStyle: 'dropdown', menuUppercase: false, menuFontWeight: 500,
      menuFontSize: 13, menuHoverStyle: 'both', menuSeparator: 'none', menuItemGap: 16,
      menuLetterSpacing: 0, menuItemPadding: true,
      headerSurface: true, dropdownElevated: true, borderBottom: true, shadowOnScroll: true,
      iconStrokeWidth: 1.5, height: 52, sticky: true, shrinkOnScroll: false, shrinkTransparent: false, iconSize: 20,
      showSearch: true, searchStyle: 'modal', showAccount: true, showCart: true, cartBadgeStyle: 'count',
      menuDividerLine: false,
      menuTypography: { fontFamily: 'Manrope', fontWeight: 500, fontSizeDesktop: 13, fontSizeMobile: 13, letterSpacing: 0, textTransform: 'none', lineHeight: 1.2 },
      container: { width: 'container', maxWidth: 1300, paddingX: 16, gap: 16, verticalAlign: 'center' },
      mobile: { drawerPosition: 'right', showSearchInDrawer: true, showAccountInDrawer: true, showCartInDrawer: true, maxLevels: 2, groupStyle: 'accordion' },
      search: { placeholder: 'Buscar produtos...', showOnDesktop: true, showOnMobile: true, autoSuggest: true, maxResults: 6, shortcutEnabled: true },
      announcement: { enabled: false },
      menuColors: { linkColor: '#1a1a1a', linkHoverColor: '#c41200', linkActiveColor: '#c41200', linkBg: '', linkHoverBg: 'rgba(0,0,0,0.03)' },
      states: {
        normal: { backgroundColor: '#ffffff', textColor: '#1a1a1a', borderBottom: true, borderColor: '#e0e0e0', shadow: 'none', blur: false, height: 52 },
        sticky: { backgroundColor: '#ffffff', textColor: '#1a1a1a', borderBottom: true, borderColor: '#d0d0d0', shadow: 'subtle', blur: true, height: 48 },
        transparent: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 52 },
      },
    },
  },

  // ── 6. PASTEL — Beauty/cosmetics, centered, delicate, soft ──
  {
    id: 'pastel',
    name: 'Pastel',
    tagline: 'Beleza e cosméticos. Rosa suave, ícones finos, feeling delicado e feminino',
    tags: ['Beauty', 'Delicado'],
    config: {
      layout: 'centered', menuStyle: 'horizontal', menuUppercase: false, menuFontWeight: 400,
      menuFontSize: 13, menuHoverStyle: 'underline', menuSeparator: 'none', menuItemGap: 28,
      menuLetterSpacing: 0.02, menuItemPadding: false,
      headerSurface: false, dropdownElevated: false, borderBottom: true, shadowOnScroll: false,
      iconStrokeWidth: 1, height: 68, sticky: true, shrinkOnScroll: true, shrinkTransparent: false, iconSize: 18,
      showSearch: true, searchStyle: 'modal', showAccount: true, showCart: true, cartBadgeStyle: 'dot',
      menuDividerLine: false,
      menuTypography: { fontFamily: 'Nunito Sans', fontWeight: 400, fontSizeDesktop: 13, fontSizeMobile: 13, letterSpacing: 0.02, textTransform: 'none', lineHeight: 1.3 },
      container: { width: 'container', maxWidth: 1200, paddingX: 24, gap: 20, verticalAlign: 'center' },
      mobile: { drawerPosition: 'right', showSearchInDrawer: true, showAccountInDrawer: true, showCartInDrawer: false, maxLevels: 2, groupStyle: 'list' },
      search: { placeholder: 'O que você procura?', showOnDesktop: true, showOnMobile: true, autoSuggest: false, maxResults: 5, shortcutEnabled: false },
      announcement: { enabled: true, messages: ['Ganhe uma amostra grátis em compras acima de R$ 150 💕'], speed: 6, backgroundColor: '#fce7f3', textColor: '#9d174d', style: 'static', direction: 'rtl', showIcon: false, icon: '', link: '', pauseOnHover: true, pageRules: 'all', scheduleEnabled: false, scheduleStart: '', scheduleEnd: '', segmentation: 'all', ctaText: '', ctaLink: '', utmSource: '', utmMedium: '', utmCampaign: '' },
      menuColors: { linkColor: '#831843', linkHoverColor: '#be185d', linkActiveColor: '#831843', linkBg: '', linkHoverBg: '' },
      states: {
        normal: { backgroundColor: '#fdf2f8', textColor: '#831843', borderBottom: true, borderColor: '#fbcfe8', shadow: 'none', blur: false, height: 68 },
        sticky: { backgroundColor: '#fdf2f8', textColor: '#831843', borderBottom: true, borderColor: '#f9a8d4', shadow: 'subtle', blur: true, height: 56 },
        transparent: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 68 },
      },
    },
  },

  // ── 7. LUXURY — Transparent over hero, reveals on scroll, Rolex/Cartier ──
  {
    id: 'luxury',
    name: 'Luxury',
    tagline: 'Transparente sobre o hero. Revela fundo ao rolar. Rolex/Cartier vibe',
    tags: ['Invisível', 'Alto Padrão'],
    config: {
      layout: 'transparent', menuStyle: 'horizontal', menuUppercase: true, menuFontWeight: 300,
      menuFontSize: 11, menuHoverStyle: 'underline', menuSeparator: 'none', menuItemGap: 36,
      menuLetterSpacing: 0.22, menuItemPadding: false,
      headerSurface: false, dropdownElevated: false, borderBottom: false, shadowOnScroll: false,
      iconStrokeWidth: 1, height: 80, sticky: true, shrinkOnScroll: true, shrinkTransparent: false, iconSize: 18,
      showSearch: true, searchStyle: 'modal', showAccount: true, showCart: true, cartBadgeStyle: 'dot',
      menuDividerLine: false,
      menuTypography: { fontFamily: 'Lato', fontWeight: 300, fontSizeDesktop: 11, fontSizeMobile: 12, letterSpacing: 0.22, textTransform: 'uppercase', lineHeight: 1.2 },
      container: { width: 'container', maxWidth: 1400, paddingX: 40, gap: 32, verticalAlign: 'center' },
      mobile: { drawerPosition: 'left', showSearchInDrawer: true, showAccountInDrawer: true, showCartInDrawer: false, maxLevels: 2, groupStyle: 'list' },
      search: { placeholder: 'Pesquisar', showOnDesktop: true, showOnMobile: true, autoSuggest: false, maxResults: 5, shortcutEnabled: false },
      announcement: { enabled: false },
      menuColors: { linkColor: '', linkHoverColor: '', linkActiveColor: '', linkBg: '', linkHoverBg: '' },
      states: {
        normal: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 80 },
        sticky: { backgroundColor: 'rgba(255,255,255,0.95)', textColor: '#1a1a1a', borderBottom: true, borderColor: '#e5e7eb', shadow: 'subtle', blur: true, height: 52 },
        transparent: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 80 },
      },
    },
  },

  // ── 8. BUILDER — Full-featured, double-row, all tools on, announcement bar ──
  {
    id: 'builder',
    name: 'Builder',
    tagline: 'Tudo ligado. Double-row, mega menu, busca inline, barra de anúncio, completo',
    tags: ['Completo', 'Tudo-em-um'],
    config: {
      layout: 'double-row', menuStyle: 'mega-menu', menuUppercase: false, menuFontWeight: 500,
      menuFontSize: 14, menuHoverStyle: 'both', menuSeparator: 'none', menuItemGap: 8,
      menuLetterSpacing: 0, menuItemPadding: true,
      headerSurface: true, dropdownElevated: true, borderBottom: true, shadowOnScroll: true,
      iconStrokeWidth: 1.5, height: 64, sticky: true, shrinkOnScroll: true, shrinkTransparent: false, iconSize: 20,
      showSearch: true, searchStyle: 'inline', showAccount: true, showCart: true, cartBadgeStyle: 'count',
      menuDividerLine: false,
      menuTypography: { fontFamily: 'Inter', fontWeight: 500, fontSizeDesktop: 14, fontSizeMobile: 14, letterSpacing: 0, textTransform: 'none', lineHeight: 1.2 },
      container: { width: 'container', maxWidth: 1400, paddingX: 16, gap: 16, verticalAlign: 'center' },
      mobile: { drawerPosition: 'left', showSearchInDrawer: true, showAccountInDrawer: true, showCartInDrawer: true, maxLevels: 3, groupStyle: 'accordion' },
      megaMenuConfig: { columns: 4, width: 'container', showImages: true, showBanner: true, bannerImageUrl: '', bannerLink: '' },
      search: { placeholder: 'O que você está buscando?', showOnDesktop: true, showOnMobile: true, autoSuggest: true, maxResults: 8, shortcutEnabled: true },
      menuBar: { enabled: true, backgroundColor: '#1a1a1a', textColor: '#ffffff', height: 48, fullWidth: true, borderTop: false, borderBottom: false, shadow: 'none' },
      announcement: { enabled: true, messages: ['Frete grátis acima de R$ 199', '10% OFF na primeira compra — Use: BEMVINDO10'], speed: 4, backgroundColor: '#000000', textColor: '#ffffff', style: 'ticker', direction: 'rtl', showIcon: false, icon: '', link: '', pauseOnHover: true, pageRules: 'all', scheduleEnabled: false, scheduleStart: '', scheduleEnd: '', segmentation: 'all', ctaText: '', ctaLink: '', utmSource: '', utmMedium: '', utmCampaign: '' },
      menuColors: { linkColor: '#1a1a1a', linkHoverColor: '#2563eb', linkActiveColor: '#2563eb', linkBg: '', linkHoverBg: 'rgba(37,99,235,0.06)' },
      states: {
        normal: { backgroundColor: '#ffffff', textColor: '#1a1a1a', borderBottom: true, borderColor: '#e5e7eb', shadow: 'subtle', blur: false, height: 64 },
        sticky: { backgroundColor: '#ffffff', textColor: '#1a1a1a', borderBottom: true, borderColor: '#d1d5db', shadow: 'medium', blur: true, height: 52 },
        transparent: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 64 },
      },
    },
  },

  // ── 9. CANDY — Playful pink e-commerce, bold Poppins, fun vibes ──
  {
    id: 'candy',
    name: 'Candy',
    tagline: 'Divertido e vibrante. Poppins bold, rosa vibrante, emojis e personalidade',
    tags: ['Divertido', 'Pop'],
    config: {
      layout: 'classic', menuStyle: 'horizontal', menuUppercase: false, menuFontWeight: 600,
      menuFontSize: 14, menuHoverStyle: 'background', menuSeparator: 'none', menuItemGap: 20,
      menuLetterSpacing: 0, menuItemPadding: true,
      headerSurface: true, dropdownElevated: true, borderBottom: false, shadowOnScroll: true,
      iconStrokeWidth: 2, height: 60, sticky: true, shrinkOnScroll: false, shrinkTransparent: false, iconSize: 22,
      showSearch: true, searchStyle: 'inline', showAccount: true, showCart: true, cartBadgeStyle: 'count',
      menuDividerLine: false,
      menuTypography: { fontFamily: 'Poppins', fontWeight: 600, fontSizeDesktop: 14, fontSizeMobile: 14, letterSpacing: 0, textTransform: 'none', lineHeight: 1.2 },
      container: { width: 'container', maxWidth: 1300, paddingX: 20, gap: 16, verticalAlign: 'center' },
      mobile: { drawerPosition: 'right', showSearchInDrawer: true, showAccountInDrawer: true, showCartInDrawer: true, maxLevels: 2, groupStyle: 'accordion' },
      search: { placeholder: 'O que você quer? 🍬', showOnDesktop: true, showOnMobile: true, autoSuggest: false, maxResults: 6, shortcutEnabled: false },
      announcement: { enabled: true, messages: ['🍭 Frete grátis em pedidos acima de R$99!'], speed: 4, backgroundColor: '#f472b6', textColor: '#ffffff', style: 'static', direction: 'rtl', showIcon: false, icon: '', link: '', pauseOnHover: true, pageRules: 'all', scheduleEnabled: false, scheduleStart: '', scheduleEnd: '', segmentation: 'all', ctaText: '', ctaLink: '', utmSource: '', utmMedium: '', utmCampaign: '' },
      menuColors: { linkColor: '#9d174d', linkHoverColor: '#be185d', linkActiveColor: '#9d174d', linkBg: '', linkHoverBg: 'rgba(190,24,93,0.08)' },
      states: {
        normal: { backgroundColor: '#fff1f2', textColor: '#9d174d', borderBottom: false, borderColor: 'transparent', shadow: 'subtle', blur: false, height: 60 },
        sticky: { backgroundColor: '#fff1f2', textColor: '#9d174d', borderBottom: false, borderColor: 'transparent', shadow: 'medium', blur: true, height: 56 },
        transparent: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 60 },
      },
    },
  },

  // ── 10. FRESH — Modern purple accent, Nunito Sans bold, clean dropdown ──
  {
    id: 'fresh',
    name: 'Fresh',
    tagline: 'Moderno e vibrante. Nunito Sans bold, acentos roxo, dropdown elegante',
    tags: ['Moderno', 'Vibrante'],
    config: {
      layout: 'classic', menuStyle: 'dropdown', menuUppercase: false, menuFontWeight: 600,
      menuFontSize: 15, menuHoverStyle: 'background', menuSeparator: 'none', menuItemGap: 16,
      menuLetterSpacing: 0, menuItemPadding: true,
      headerSurface: true, dropdownElevated: true, borderBottom: false, shadowOnScroll: true,
      iconStrokeWidth: 2, height: 64, sticky: true, shrinkOnScroll: false, shrinkTransparent: false, iconSize: 22,
      showSearch: true, searchStyle: 'inline', showAccount: true, showCart: true, cartBadgeStyle: 'count',
      menuDividerLine: false,
      menuTypography: { fontFamily: 'Nunito Sans', fontWeight: 600, fontSizeDesktop: 15, fontSizeMobile: 14, letterSpacing: 0, textTransform: 'none', lineHeight: 1.2 },
      container: { width: 'container', maxWidth: 1400, paddingX: 20, gap: 16, verticalAlign: 'center' },
      mobile: { drawerPosition: 'right', showSearchInDrawer: true, showAccountInDrawer: true, showCartInDrawer: true, maxLevels: 2, groupStyle: 'accordion' },
      search: { placeholder: 'O que você quer encontrar? 🔍', showOnDesktop: true, showOnMobile: true, autoSuggest: false, maxResults: 6, shortcutEnabled: false },
      announcement: { enabled: true, messages: ['🎉 Primeira compra com 15% OFF!', '✨ Novidades toda semana'], speed: 4, backgroundColor: '#7c3aed', textColor: '#ffffff', style: 'carousel', direction: 'rtl', showIcon: false, icon: '', link: '', pauseOnHover: true, pageRules: 'all', scheduleEnabled: false, scheduleStart: '', scheduleEnd: '', segmentation: 'all', ctaText: '', ctaLink: '', utmSource: '', utmMedium: '', utmCampaign: '' },
      menuColors: { linkColor: '#1e1b4b', linkHoverColor: '#7c3aed', linkActiveColor: '#7c3aed', linkBg: '', linkHoverBg: 'rgba(124,58,237,0.08)' },
      states: {
        normal: { backgroundColor: '#ffffff', textColor: '#1e1b4b', borderBottom: false, borderColor: 'transparent', shadow: 'subtle', blur: false, height: 64 },
        sticky: { backgroundColor: '#ffffff', textColor: '#1e1b4b', borderBottom: false, borderColor: 'transparent', shadow: 'medium', blur: true, height: 56 },
        transparent: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 64 },
      },
    },
  },

  // ── 11. DALUZ — Two-row, peach tones, inline search, icon labels, uppercase menu in separated bar ──
  {
    id: 'daluz',
    name: 'Daluz',
    tagline: 'Estilo Daluz. Duas linhas, tons pêssego, busca retangular, labels nos ícones, menu em barra separada',
    tags: ['Elegante', 'Feminino'],
    config: {
      layout: 'double-row', menuStyle: 'horizontal', menuUppercase: true, menuFontWeight: 500,
      menuFontSize: 13, menuHoverStyle: 'underline', menuSeparator: 'none', menuItemGap: 32,
      menuLetterSpacing: 0.12, menuItemPadding: false,
      headerSurface: false, dropdownElevated: false, borderBottom: false, shadowOnScroll: false,
      iconStrokeWidth: 1.5, height: 68, sticky: true, shrinkOnScroll: true, shrinkTransparent: false, iconSize: 18,
      showSearch: true, searchStyle: 'inline', searchShape: 'rectangle',
      showAccount: true, showCart: true, showIconLabels: true, cartBadgeStyle: 'count',
      menuDividerLine: false,
      menuTypography: { fontFamily: 'Montserrat', fontWeight: 500, fontSizeDesktop: 13, fontSizeMobile: 13, letterSpacing: 0.12, textTransform: 'uppercase', lineHeight: 1.2 },
      container: { width: 'container', maxWidth: 1400, paddingX: 24, gap: 20, verticalAlign: 'center' },
      mobile: { drawerPosition: 'left', showSearchInDrawer: true, showAccountInDrawer: true, showCartInDrawer: true, maxLevels: 2, groupStyle: 'accordion' },
      search: { placeholder: 'Buscar', showOnDesktop: true, showOnMobile: true, autoSuggest: false, maxResults: 6, shortcutEnabled: false },
      menuBar: { enabled: true, backgroundColor: '#f5d5c8', textColor: '#3d2b1f', height: 44, fullWidth: true, borderTop: false, borderBottom: false, shadow: 'none' },
      announcement: { enabled: false },
      menuColors: { linkColor: '#3d2b1f', linkHoverColor: '#8b6f5e', linkActiveColor: '#3d2b1f', linkBg: '', linkHoverBg: '' },
      states: {
        normal: { backgroundColor: '#fdf0ea', textColor: '#3d2b1f', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 68 },
        sticky: { backgroundColor: '#fdf0ea', textColor: '#3d2b1f', borderBottom: true, borderColor: '#e8cfc4', shadow: 'subtle', blur: true, height: 52 },
        transparent: { backgroundColor: 'transparent', textColor: '#ffffff', borderBottom: false, borderColor: 'transparent', shadow: 'none', blur: false, height: 68 },
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
  const hasMenuBar = preset.config.menuBar?.enabled;
  const menuBarBg = preset.config.menuBar?.backgroundColor || '#1a1a1a';
  const menuBarText = preset.config.menuBar?.textColor || '#ffffff';
  const fillBg = isTransparent ? '#2d2d2d' : bg;

  return (
    <button onClick={onApply}
      className={cn(
        'relative w-full rounded-2xl border-2 transition-all duration-200 overflow-hidden text-left group',
        isActive
          ? 'border-[hsl(var(--flash-brand-deep))] ring-2 ring-[hsl(var(--flash-brand)/0.2)] shadow-lg shadow-[hsl(var(--flash-brand)/0.08)]'
          : 'border-border/40 hover:border-[hsl(var(--flash-brand-deep)/0.3)] hover:shadow-md'
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
              {hasMenuBar ? (
                <>
                  <rect x="0" y="23" width="240" height="27" fill={menuBarBg} />
                  {[55, 95, 135, 175].map((x, i) => (
                    <rect key={i} x={x} y="33" width="28" height="2.5" rx="1" fill={menuBarText} opacity={i === 0 ? 0.8 : 0.5} />
                  ))}
                </>
              ) : (
                <>
                  <line x1="0" y1="23" x2="240" y2="23" stroke={text} strokeOpacity="0.06" />
                  {[35, 75, 115, 155, 190].map((x, i) => (
                    <rect key={i} x={x} y="30" width="28" height="2.5" rx="1" fill={text} opacity={i === 0 ? 0.6 : 0.25} />
                  ))}
                </>
              )}
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
          <p className={cn('text-[13px] font-semibold', isActive ? 'text-[hsl(var(--flash-brand-deep))]' : 'text-foreground')}>{preset.name}</p>
          {isActive && <Check className="h-3.5 w-3.5 text-[hsl(var(--flash-brand-deep))]" />}
        </div>
        <p className="text-[11px] text-muted-foreground/60">{preset.tagline}</p>
        <div className="flex gap-1 mt-2">
          {preset.tags.map(t => (
            <span key={t} className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-[hsl(var(--flash-brand)/0.08)] text-[hsl(var(--flash-brand-darker))]">{t}</span>
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
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors">
        <div className="h-3 w-3 rounded-full shrink-0 ring-2 ring-offset-1" style={{ backgroundColor: color, boxShadow: `0 0 0 2px ${color}40` }} />
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
            <button onClick={onCopyFrom} className="text-[11px] text-[hsl(var(--flash-brand-deep))] hover:text-[hsl(var(--flash-brand-darker))] flex items-center gap-1 transition-colors">
              <Copy className="h-3 w-3" /> Copiar estilos do Normal
            </button>
          )}

          <div className="grid grid-cols-2 gap-3">
            <ColorField label="Fundo" value={state.backgroundColor} onChange={v => onChange({ backgroundColor: v })} />
            <ColorField label="Texto" value={state.textColor} onChange={v => onChange({ textColor: v })} />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <ToggleRow label="Borda inferior" hint="Linha na parte de baixo" checked={state.borderBottom} onChange={v => onChange({ borderBottom: v })} />
            <ToggleRow label="Blur (Glass)" hint="Efeito vidro fosco" checked={state.blur} onChange={v => onChange({ blur: v })} />
          </div>

          {state.borderBottom && (
            <ColorField label="Cor da borda" value={state.borderColor} onChange={v => onChange({ borderColor: v })} />
          )}

          <Pills label="Sombra" value={state.shadow} onChange={v => onChange({ shadow: v as any })} hint="Profundidade visual do cabeçalho neste estado" options={[
            { value: 'none', label: 'Sem' },
            { value: 'subtle', label: 'Sutil' },
            { value: 'medium', label: 'Média' },
            { value: 'strong', label: 'Forte' },
          ]} />

          <NumSlider label="Altura neste estado" value={state.height} onChange={v => onChange({ height: v })} min={40} max={96} suffix="px" hint="Altura específica do cabeçalho quando neste estado" />
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  SECTION PANELS                                                      */
/* ================================================================== */

function PresetsSection() {
  const { draft, updateDraft, updateDraftSection } = useTheme();
  const h = draft.header ?? {} as any;

  const applyPreset = (preset: HeaderPreset) => {
    const preserved = {
      searchIcon: h.searchIcon,
      accountIcon: h.accountIcon,
      cartIcon: h.cartIcon,
      bannerBelow: h.bannerBelow,
      socialBar: h.socialBar,
    };
    updateDraft({
      header: {
        ...preset.config,
        ...preserved,
        preset: preset.id,
      } as any,
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-[15px] font-semibold text-foreground">Estilos Prontos</h3>
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Escolha um ponto de partida profissional e personalize depois.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {HEADER_PRESETS.map(p => (
          <PresetCard key={p.id} preset={p} isActive={h.preset === p.id} onApply={() => applyPreset(p)} />
        ))}
      </div>

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
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Define como logo, navegação e ícones são posicionados. O preview acima atualiza em tempo real.</p>
      </div>

      <OptionCards label="Disposição" value={h.layout} onChange={v => set({ layout: v })} hint="Defina a estrutura principal do cabeçalho. Cada opção reorganiza logo, menu e ações de forma diferente." options={[
        { value: 'classic', label: 'Clássico', description: 'Logo à esquerda, menu central, ícones à direita — o layout mais versátil' },
        { value: 'centered', label: 'Centralizado', description: 'Logo destacada no centro com navegação abaixo — ideal para moda e lifestyle' },
        { value: 'minimal', label: 'Minimalista', description: 'Apenas logo e ícones essenciais, sem menu visível — foco total na marca' },
        { value: 'logo-center-nav-left', label: 'Logo Centro + Nav', description: 'Menu à esquerda, logo centralizada — equilíbrio entre marca e navegação' },
        { value: 'hamburger-only', label: 'Hambúrguer', description: 'Menu sempre recolhido em ícone — libera espaço visual máximo' },
        { value: 'double-row', label: 'Duas Linhas', description: 'Linha 1: logo + busca + ações. Linha 2: navegação completa — ideal para catálogos grandes' },
        { value: 'transparent', label: 'Transparente', description: 'Sem fundo, sobrepõe o hero/banner — impacto visual para landing pages' },
      ]} />

      <ControlGroup title="Comportamento ao Rolar" hint="Como o cabeçalho reage quando o cliente rola a página para baixo">
        <ToggleRow label="Fixo (sticky)" hint="O cabeçalho permanece sempre visível no topo, mesmo ao rolar a página inteira" checked={h.sticky} onChange={v => set({ sticky: v, ...(v ? { shrinkOnScroll: false, shrinkTransparent: false } : {}) })} />
        <ToggleRow label="Encolher ao rolar" hint="A altura do cabeçalho diminui suavemente ao rolar para baixo, liberando mais área de conteúdo" checked={h.shrinkOnScroll} onChange={v => set({ shrinkOnScroll: v, ...(v ? { sticky: false, shrinkTransparent: false } : {}) })} />
        <ToggleRow label="Encolher transparente" hint="Igual ao encolher, mas o fundo fica transparente — apenas logo, menu e ícones flutuam sobre o conteúdo" checked={h.shrinkTransparent} onChange={v => set({ shrinkTransparent: v, ...(v ? { sticky: false, shrinkOnScroll: false } : {}) })} />
      </ControlGroup>

      <ControlGroup title="Profundidade & Interação" collapsible hint="Controla a superfície visual do cabeçalho e a qualidade de interação dos itens de menu">
        <ToggleRow label="Superfície elevada" hint="Adiciona sombra e borda permanentes ao cabeçalho, separando-o visualmente do conteúdo" checked={h.headerSurface ?? true} onChange={v => set({ headerSurface: v })} />
        <ToggleRow label="Dropdown elevado" hint="Submenus abrem com sombra forte, seta de ancoragem e cantos arredondados (estilo popover premium)" checked={h.dropdownElevated ?? true} onChange={v => set({ dropdownElevated: v })} />
        <ToggleRow label="Área clicável ampla" hint="Links do menu ganham padding maior e fundo sutil no hover, facilitando cliques e tornando o menu mais confortável" checked={h.menuItemPadding ?? true} onChange={v => set({ menuItemPadding: v })} />
        <ToggleRow label="Linha divisória" hint="Exibe uma linha fina separando o topo (logo + ações) da navegação" checked={h.menuDividerLine ?? false} onChange={v => set({ menuDividerLine: v })} />
      </ControlGroup>

      <ControlGroup title="Barra de Menu Separada" collapsible hint="Exibe o menu em uma barra independente abaixo do cabeçalho">
        {(() => {
          const mb = h.menuBar ?? { enabled: false, backgroundColor: '#1a1a1a', textColor: '#ffffff', height: 48, fullWidth: true, borderTop: false, borderBottom: false, shadow: 'none' };
          const setMB = (u: Partial<typeof mb>) => updateDraftSection('header', { menuBar: { ...mb, ...u } });

          return (
            <>
              <ToggleRow label="Ativar barra separada" hint="O menu sai do cabeçalho e fica em sua própria barra com visual independente" checked={mb.enabled} onChange={v => setMB({ enabled: v })} />
              {mb.enabled && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <ColorField label="Cor de fundo" value={mb.backgroundColor} onChange={v => setMB({ backgroundColor: v })} />
                    <ColorField label="Cor do texto" value={mb.textColor} onChange={v => setMB({ textColor: v })} />
                  </div>
                  <NumSlider label="Altura" value={mb.height} onChange={v => setMB({ height: v })} min={36} max={64} suffix="px" hint="Altura da barra de navegação separada" />
                  <ToggleRow label="Largura total" hint="Barra ocupa 100% da tela" checked={mb.fullWidth} onChange={v => setMB({ fullWidth: v })} />
                  <ToggleRow label="Borda superior" hint="Linha fina acima da barra" checked={mb.borderTop} onChange={v => setMB({ borderTop: v })} />
                  <ToggleRow label="Borda inferior" hint="Linha fina abaixo da barra" checked={mb.borderBottom} onChange={v => setMB({ borderBottom: v })} />
                  <Pills label="Sombra" value={mb.shadow} onChange={v => setMB({ shadow: v as any })} options={[
                    { value: 'none', label: 'Nenhuma' },
                    { value: 'subtle', label: 'Sutil' },
                    { value: 'medium', label: 'Média' },
                  ]} />
                </>
              )}
            </>
          );
        })()}
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
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Configure estilos visuais independentes para cada situação: quando o cliente está no topo (Normal), ao rolar a página (Sticky) e quando o cabeçalho está sobre o hero/banner (Transparente).</p>
      </div>

      <div className="rounded-xl border border-[hsl(var(--flash-brand)/0.15)] bg-[hsl(var(--flash-brand)/0.04)] p-3">
        <p className="text-[11px] text-[hsl(var(--flash-brand-deeper)/0.7)] leading-relaxed">
          💡 Cada estado permite fundo, cor do texto, bordas, sombras e altura diferentes. Use "Copiar do Normal" para começar rápido.
        </p>
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
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Controla a largura total do conteúdo, espaçamentos internos e a altura do cabeçalho.</p>
      </div>

      <Pills label="Largura do conteúdo" value={container.width} onChange={v => setC({ width: v as any })} hint="'Full Width' ocupa 100% da tela. 'Container' limita a uma largura máxima centralizada." options={[
        { value: 'full', label: 'Full Width' },
        { value: 'container', label: 'Container' },
      ]} />

      {container.width === 'container' && (
        <NumSlider label="Largura máxima" value={container.maxWidth} onChange={v => setC({ maxWidth: v })} min={1000} max={1920} suffix="px" step={20} hint="Largura máxima do conteúdo quando em modo Container" />
      )}

      <NumSlider label="Padding lateral" value={container.paddingX} onChange={v => setC({ paddingX: v })} min={8} max={48} suffix="px" hint="Espaço entre o conteúdo e as bordas laterais da tela" />
      <NumSlider label="Gap entre blocos" value={container.gap} onChange={v => setC({ gap: v })} min={0} max={48} suffix="px" hint="Distância entre logo, navegação e ícones de ação" />
      <NumSlider label="Altura base" value={h.height || 64} onChange={v => updateDraftSection('header', { height: v })} min={48} max={96} suffix="px" hint="Altura padrão do cabeçalho (pode ser sobrescrita por estado)" />
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
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Estilo visual, tipografia e micro-interações dos links de navegação no desktop.</p>
      </div>

      <Pills label="Tipo de navegação" value={h.menuStyle} onChange={v => set({ menuStyle: v })} hint="Como os itens de menu são exibidos e se abrem ao interagir" options={[
        { value: 'horizontal', label: 'Horizontal', desc: 'Links lado a lado' },
        { value: 'dropdown', label: 'Dropdown', desc: 'Abre lista ao hover' },
        { value: 'mega-menu', label: 'Mega Menu', desc: 'Painel expandido' },
      ]} />

      <ControlGroup title="Tipografia do Menu" hint="Fonte, peso, tamanho e espaçamento dos links de navegação">
        {(() => {
          const mt = h.menuTypography ?? { fontFamily: 'Inter', fontWeight: 500, fontSizeDesktop: 14, fontSizeMobile: 14, letterSpacing: 0.02, textTransform: 'uppercase', lineHeight: 1.2 };
          const setMT = (u: Partial<typeof mt>) => updateDraftSection('header', { menuTypography: { ...mt, ...u } });

          const CURATED_FONTS = [
            { value: 'Inter', label: 'Inter', desc: 'Clean e moderna' },
            { value: 'Poppins', label: 'Poppins', desc: 'Geométrica e amigável' },
            { value: 'Montserrat', label: 'Montserrat', desc: 'Elegante e versátil' },
            { value: 'DM Sans', label: 'DM Sans', desc: 'Minimalista e leve' },
            { value: 'Rubik', label: 'Rubik', desc: 'Arredondada e legível' },
            { value: 'Manrope', label: 'Manrope', desc: 'Moderna e técnica' },
            { value: 'Nunito Sans', label: 'Nunito Sans', desc: 'Suave e equilibrada' },
          ];

          return (
            <>
              <div className="space-y-2">
                <p className="text-[13px] font-medium text-foreground">Fonte</p>
                <p className="text-[10px] text-muted-foreground/60">Família tipográfica aplicada apenas nos links do menu</p>
                <div className="grid grid-cols-1 gap-1.5">
                  {CURATED_FONTS.map(f => (
                    <button key={f.value} onClick={() => setMT({ fontFamily: f.value })}
                      className={cn(
                        'w-full text-left px-3.5 py-2.5 rounded-xl text-[13px] border transition-all duration-150',
                        mt.fontFamily === f.value
                          ? 'bg-[hsl(var(--flash-brand)/0.06)] border-[hsl(var(--flash-brand-deep)/0.3)] ring-1 ring-[hsl(var(--flash-brand-deep)/0.15)]'
                          : 'bg-muted/20 border-border/40 hover:bg-muted/40 hover:border-border/60'
                      )}>
                      <div className="flex items-center justify-between">
                        <span className={cn('font-medium', mt.fontFamily === f.value ? 'text-[hsl(var(--flash-brand-deep))]' : 'text-foreground')} style={{ fontFamily: f.value }}>{f.label}</span>
                        {mt.fontFamily === f.value && <Check className="h-3.5 w-3.5 text-[hsl(var(--flash-brand-deep))]" />}
                      </div>
                      <span className="text-[11px] text-muted-foreground/60 block mt-0.5">{f.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
              <Pills label="Peso da fonte" value={String(mt.fontWeight)} onChange={v => setMT({ fontWeight: Number(v) as any })} hint="Grossura dos caracteres do menu" options={[
                { value: '400', label: 'Regular' },
                { value: '500', label: 'Medium' },
                { value: '600', label: 'Semibold' },
                { value: '700', label: 'Bold' },
              ]} />
              <NumSlider label="Tamanho desktop" value={mt.fontSizeDesktop} onChange={v => setMT({ fontSizeDesktop: v })} min={12} max={20} suffix="px" hint="Tamanho da fonte dos links no desktop" />
              <NumSlider label="Tamanho mobile" value={mt.fontSizeMobile} onChange={v => setMT({ fontSizeMobile: v })} min={12} max={20} suffix="px" hint="Tamanho da fonte dos links no menu mobile" />
              <NumSlider label="Espaçamento entre letras" value={Math.round(mt.letterSpacing * 100)} onChange={v => setMT({ letterSpacing: v / 100 })} min={-2} max={20} hint="Distância entre cada letra — valores altos criam estilo editorial" />
              <Pills label="Transformação" value={mt.textTransform} onChange={v => setMT({ textTransform: v as any })} hint="Caixa alta ou normal" options={[
                { value: 'none', label: 'Normal' },
                { value: 'uppercase', label: 'MAIÚSCULAS' },
              ]} />
              <NumSlider label="Altura da linha" value={Math.round(mt.lineHeight * 10)} onChange={v => setMT({ lineHeight: v / 10 })} min={10} max={16} hint="Espaçamento vertical — valores baixos alinham melhor no menu" />
            </>
          );
        })()}
      </ControlGroup>

      <ControlGroup title="Interação & Espaçamento" hint="Comportamento ao hover e separadores entre itens">
        <Pills label="Estilo do hover" value={h.menuHoverStyle || 'underline'} onChange={v => set({ menuHoverStyle: v })} hint="Efeito visual que aparece quando o mouse passa sobre um link do menu" options={[
          { value: 'underline', label: 'Sublinhado', desc: 'Linha animada sob o texto' },
          { value: 'background', label: 'Fundo', desc: 'Fundo sutil aparece' },
          { value: 'both', label: 'Ambos', desc: 'Sublinhado + fundo' },
        ]} />
        
        <Pills label="Separador visual" value={h.menuSeparator || 'none'} onChange={v => set({ menuSeparator: v })} hint="Elemento visual que aparece entre cada link do menu" options={[
          { value: 'none', label: 'Nenhum' },
          { value: 'line', label: '| Linha' },
          { value: 'dot', label: '• Ponto' },
          { value: 'slash', label: '/ Barra' },
        ]} />
      </ControlGroup>

      <ControlGroup title="Cores dos Links" collapsible hint="Personalize as cores dos links de navegação. Deixe vazio para herdar do estado do cabeçalho">
        {(() => {
          const mc = h.menuColors ?? { linkColor: '', linkHoverColor: '', linkActiveColor: '', linkBg: '', linkHoverBg: '' };
          const setMC = (u: Partial<typeof mc>) => updateDraftSection('header', { menuColors: { ...mc, ...u } });

          return (
            <>
              <ColorField label="Cor dos links" value={mc.linkColor} onChange={v => setMC({ linkColor: v })} />
              <ColorField label="Cor no hover" value={mc.linkHoverColor} onChange={v => setMC({ linkHoverColor: v })} />
              <ColorField label="Cor do ativo" value={mc.linkActiveColor} onChange={v => setMC({ linkActiveColor: v })} />
              <ColorField label="Fundo no hover" value={mc.linkHoverBg} onChange={v => setMC({ linkHoverBg: v })} />
              <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs mt-2" onClick={() => {
                setMC({ linkColor: '', linkHoverColor: '', linkActiveColor: '', linkBg: '', linkHoverBg: '' });
                toast.success('Cores do menu resetadas');
              }}>
                <RotateCcw className="h-3.5 w-3.5" /> Resetar Cores
              </Button>
            </>
          );
        })()}
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
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Painel expandido com colunas, imagens por categoria e espaço para banner promocional.</p>
      </div>

      {h.menuStyle !== 'mega-menu' && (
        <div className="rounded-xl border border-amber-200/60 bg-amber-50/30 p-3">
          <p className="text-[12px] text-amber-700/80">⚠️ Ative "Mega Menu" na seção <strong>Menu Desktop → Tipo de navegação</strong> para usar estas opções.</p>
        </div>
      )}

      <NumSlider label="Colunas" value={mm.columns} onChange={v => setMM({ columns: v as any })} min={2} max={6} hint="Quantidade de colunas de links exibidas no painel expandido" />

      <Pills label="Largura do painel" value={mm.width} onChange={v => setMM({ width: v as any })} hint="Largura do mega menu quando aberto" options={[
        { value: 'auto', label: 'Auto', desc: 'Ajusta ao conteúdo' },
        { value: 'container', label: 'Container', desc: 'Mesma largura do site' },
        { value: 'full', label: 'Full', desc: 'Largura total da tela' },
      ]} />

      <ToggleRow label="Imagens por categoria" hint="Exibe uma thumbnail (miniatura) ao lado de cada grupo de links no mega menu" checked={mm.showImages} onChange={v => setMM({ showImages: v })} />
      <ToggleRow label="Banner promocional" hint="Adiciona uma imagem clicável dentro do mega menu — ideal para destacar promoções" checked={mm.showBanner} onChange={v => setMM({ showBanner: v })} />

      {mm.showBanner && (
        <ControlGroup title="Banner dentro do Mega Menu" hint="Imagem e link do banner promocional exibido no painel">
          <div>
            <p className="text-[11px] text-muted-foreground/60 mb-1">URL da imagem</p>
            <Input className="h-8 text-xs" value={mm.bannerImageUrl} placeholder="https://..." onChange={e => setMM({ bannerImageUrl: e.target.value })} />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground/60 mb-1">Link do banner</p>
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
  const iconSize = h.iconSize || 20;
  const sw = h.iconStrokeWidth || 1.5;

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-[15px] font-semibold text-foreground">Ícones & Ações</h3>
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Controle quais ícones aparecem, seu visual, tamanho e espessura.</p>
      </div>

      <ControlGroup title="Visibilidade" hint="Escolha quais ícones de ação serão exibidos no cabeçalho">
        <ToggleRow label="Busca" hint="Ícone de lupa — permite ao cliente buscar produtos" checked={h.showSearch} onChange={v => set({ showSearch: v })} />
        <ToggleRow label="Conta" hint="Ícone de perfil — leva para login ou área do cliente" checked={h.showAccount} onChange={v => set({ showAccount: v })} />
        <ToggleRow label="Carrinho" hint="Ícone da sacola — mostra o carrinho de compras" checked={h.showCart} onChange={v => set({ showCart: v })} />
      </ControlGroup>

      <NumSlider label="Tamanho dos ícones" value={h.iconSize} onChange={v => set({ iconSize: v })} min={16} max={28} suffix="px" hint="Dimensão em pixels de cada ícone no cabeçalho" />

      <Pills label="Espessura do traço" value={String(h.iconStrokeWidth || 1.5)} onChange={v => set({ iconStrokeWidth: Number(v) })} hint="Grossura da linha dos ícones — 'Fino' para elegância, 'Bold' para destaque" options={[
        { value: '1', label: 'Fino' },
        { value: '1.5', label: 'Regular' },
        { value: '2', label: 'Bold' },
      ]} />

      {h.showCart && (
        <Pills label="Badge do carrinho" value={h.cartBadgeStyle} onChange={v => set({ cartBadgeStyle: v })} hint="Indicador sobre o ícone do carrinho mostrando que há itens" options={[
          { value: 'count', label: 'Contador', desc: 'Exibe número de itens' },
          { value: 'dot', label: 'Ponto', desc: 'Apenas um ponto' },
          { value: 'none', label: 'Nenhum', desc: 'Sem indicador' },
        ]} />
      )}

      {/* Icon pickers — inline */}
      {h.showSearch && (
        <ControlGroup title="Ícone da Busca" collapsible hint="Escolha o ícone que representa a busca na sua loja">
          <IconGrid icons={SEARCH_ICONS} selected={h.searchIcon || 'Search'} onSelect={v => set({ searchIcon: v })} iconSize={iconSize} strokeWidth={sw} />
        </ControlGroup>
      )}

      {h.showAccount && (
        <ControlGroup title="Ícone da Conta" collapsible hint="Escolha o ícone que leva o cliente para login ou perfil">
          <IconGrid icons={ACCOUNT_ICONS} selected={h.accountIcon || 'User'} onSelect={v => set({ accountIcon: v })} iconSize={iconSize} strokeWidth={sw} />
        </ControlGroup>
      )}

      {h.showCart && (
        <ControlGroup title="Ícone do Carrinho" collapsible hint="Escolha o ícone que representa o carrinho de compras">
          <IconGrid icons={CART_ICONS} selected={h.cartIcon || 'ShoppingBag'} onSelect={v => set({ cartIcon: v })} iconSize={iconSize} strokeWidth={sw} />
        </ControlGroup>
      )}

      {/* Live preview */}
      <div className="rounded-xl border border-border/40 bg-[hsl(var(--flash-surface))] p-4">
        <p className="text-[9px] text-muted-foreground/40 uppercase tracking-wider mb-3 text-center">Preview ao vivo</p>
        <div className="flex items-center justify-center gap-5">
          {h.showSearch && (() => {
            const si = SEARCH_ICONS.find(i => i.id === (h.searchIcon || 'Search')) || SEARCH_ICONS[0];
            return <div className="flex flex-col items-center gap-1">
              <si.icon style={{ width: iconSize, height: iconSize }} strokeWidth={sw} className="text-foreground/70" />
              <span className="text-[8px] text-muted-foreground/40">Busca</span>
            </div>;
          })()}
          {h.showAccount && (() => {
            const ai = ACCOUNT_ICONS.find(i => i.id === (h.accountIcon || 'User')) || ACCOUNT_ICONS[0];
            return <div className="flex flex-col items-center gap-1">
              <ai.icon style={{ width: iconSize, height: iconSize }} strokeWidth={sw} className="text-foreground/70" />
              <span className="text-[8px] text-muted-foreground/40">Conta</span>
            </div>;
          })()}
          {h.showCart && (() => {
            const ci = CART_ICONS.find(i => i.id === (h.cartIcon || 'ShoppingBag')) || CART_ICONS[0];
            return <div className="flex flex-col items-center gap-1 relative">
              <ci.icon style={{ width: iconSize, height: iconSize }} strokeWidth={sw} className="text-foreground/70" />
              {h.cartBadgeStyle === 'count' && <span className="absolute -top-1.5 right-0 bg-foreground text-background text-[7px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center">3</span>}
              {h.cartBadgeStyle === 'dot' && <span className="absolute -top-0.5 right-0 bg-[hsl(var(--flash-brand-deep))] rounded-full h-2 w-2" />}
              <span className="text-[8px] text-muted-foreground/40">Carrinho</span>
            </div>;
          })()}
        </div>
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
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Configure como a barra de busca aparece e funciona para o cliente encontrar produtos.</p>
      </div>

      <Pills label="Estilo de exibição" value={h.searchStyle} onChange={v => set({ searchStyle: v })} hint="Como a busca é apresentada para o cliente" options={[
        { value: 'inline', label: 'Inline', desc: 'Barra visível no header' },
        { value: 'modal', label: 'Modal', desc: 'Popup central ao clicar' },
        { value: 'drawer', label: 'Drawer', desc: 'Desliza do topo' },
      ]} />

      <div>
        <p className="text-[11px] text-muted-foreground/60 mb-1">Texto placeholder</p>
        <Input className="h-9 text-[13px]" value={search.placeholder} placeholder="Buscar produtos..."
          onChange={e => setSearch({ placeholder: e.target.value })} />
        <p className="text-[10px] text-muted-foreground/40 mt-1">Texto que aparece na barra antes do cliente digitar</p>
      </div>

      <ControlGroup title="Visibilidade por Dispositivo" hint="Controle em quais dispositivos a busca aparece">
        <ToggleRow label="Exibir no Desktop" hint="Mostra o ícone ou barra de busca em telas grandes" checked={search.showOnDesktop} onChange={v => setSearch({ showOnDesktop: v })} />
        <ToggleRow label="Exibir no Mobile" hint="Mostra o ícone de busca em telas pequenas" checked={search.showOnMobile} onChange={v => setSearch({ showOnMobile: v })} />
      </ControlGroup>

      <ControlGroup title="Funcionalidades" collapsible hint="Sugestões automáticas ao digitar">
        <ToggleRow label="Auto-sugestão" hint="Ao digitar, sugere produtos em tempo real abaixo da barra de busca" checked={search.autoSuggest} onChange={v => setSearch({ autoSuggest: v })} />
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
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Configure o menu lateral (drawer) que abre em telas menores. Inclui posição, ações internas e profundidade de navegação.</p>
      </div>

      <Pills label="Posição do drawer" value={mobile.drawerPosition} onChange={v => setMobile({ drawerPosition: v as any })} hint="De qual lado da tela o menu mobile desliza ao abrir" options={[
        { value: 'left', label: '← Esquerda' },
        { value: 'right', label: 'Direita →' },
      ]} />

      <Pills label="Estilo de agrupamento" value={mobile.groupStyle} onChange={v => setMobile({ groupStyle: v as any })} hint="Como os subitens são exibidos dentro do drawer" options={[
        { value: 'accordion', label: 'Acordeão', desc: 'Expande/recolhe ao clicar' },
        { value: 'list', label: 'Lista', desc: 'Todos visíveis direto' },
      ]} />

      <NumSlider label="Níveis de profundidade" value={mobile.maxLevels} onChange={v => setMobile({ maxLevels: v as any })} min={2} max={3} hint="Quantos níveis de subitens são exibidos no drawer (2 ou 3)" />

      <ControlGroup title="Ações dentro do Drawer" hint="Funcionalidades que aparecem dentro do menu mobile, além da navegação">
        <ToggleRow label="Campo de busca" hint="Barra de busca dentro do drawer para encontrar produtos sem fechar o menu" checked={mobile.showSearchInDrawer} onChange={v => setMobile({ showSearchInDrawer: v })} />
        <ToggleRow label="Conta / Login" hint="Link de acesso à conta ou login no rodapé do drawer" checked={mobile.showAccountInDrawer} onChange={v => setMobile({ showAccountInDrawer: v })} />
        <ToggleRow label="Carrinho" hint="Link para o carrinho de compras no rodapé do drawer" checked={mobile.showCartInDrawer} onChange={v => setMobile({ showCartInDrawer: v })} />
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
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Gerencie os links que aparecem na barra de navegação. Adicione subitens para criar dropdowns. Se nenhum item for adicionado, a loja usa as categorias automaticamente.</p>
      </div>

      <ControlGroup title="Preferências de Exibição" hint="Elementos visuais adicionais nos itens do menu">
        <ToggleRow label="Badges (etiquetas)" hint="Exibe etiquetas coloridas como 'Novo', 'Promo' ou '-30%' ao lado dos links" checked={mm.showBadges} onChange={v => set({ showBadges: v })} />
        <ToggleRow label="Ícones" hint="Exibe um ícone decorativo à esquerda de cada item do menu" checked={mm.showIcons} onChange={v => set({ showIcons: v })} />
      </ControlGroup>

      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-foreground">{mm.items.length} {mm.items.length === 1 ? 'item' : 'itens'}</p>
        </div>

        {mm.items.length === 0 && (
          <div className="border-2 border-dashed border-border/30 rounded-2xl py-10 text-center">
            <Menu className="h-6 w-6 text-muted-foreground/15 mx-auto mb-2" />
            <p className="text-[13px] text-muted-foreground/50">Nenhum item adicionado</p>
            <p className="text-[11px] text-muted-foreground/30 mt-1">A loja usará categorias automáticas como links.</p>
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

/* ================================================================== */
/*  BANNERS & ANÚNCIO (UNIFIED)                                         */
/* ================================================================== */

function BannersSection() {
  const { draft, updateDraftSection } = useTheme();
  const h = draft.header ?? {} as any;
  const a = h.announcement ?? { enabled: false, messages: [], speed: 5, backgroundColor: '#1a1a1a', textColor: '#fafafa', showIcon: false, icon: 'truck', link: '', pauseOnHover: true, style: 'static' as const, direction: 'rtl' as const };
  const bb = h.bannerBelow ?? { enabled: false, imageUrl: '', images: [], link: '', height: 60, fullWidth: true, carousel: false, carouselSpeed: 5 };
  const setAnn = (u: Partial<typeof a>) => updateDraftSection('header', { announcement: { ...a, ...u } });
  const setBanner = (u: Partial<typeof bb>) => updateDraftSection('header', { bannerBelow: { ...bb, ...u } });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[15px] font-semibold text-foreground">Banners & Anúncios</h3>
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">Barra de mensagens promocionais no topo e banner com imagem abaixo do cabeçalho.</p>
      </div>

      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border/30 flex items-center gap-2">
          <Megaphone className="h-4 w-4 text-[hsl(var(--flash-brand-deep))]" />
          <div>
            <p className="text-[13px] font-semibold text-foreground">Barra de Anúncio</p>
            <p className="text-[10px] text-muted-foreground/50">Barra colorida no topo do site com mensagens promocionais (ex: "Frete Grátis", "Black Friday")</p>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <ToggleRow label="Ativar barra de anúncio" hint="Quando ativada, aparece uma faixa no topo do site visível em todas as páginas" checked={a.enabled} onChange={v => setAnn({ enabled: v })} />

          {a.enabled && (
            <>
              <Pills label="Estilo de exibição" value={a.style} onChange={v => setAnn({ style: v })} hint="Define como as mensagens são apresentadas na barra" options={[
                { value: 'static', label: 'Fixo', desc: 'Mensagem parada' },
                { value: 'carousel', label: 'Carrossel', desc: 'Alterna mensagens' },
                { value: 'ticker', label: 'Ticker', desc: 'Texto deslizante' },
              ]} />

              {(a.style === 'ticker' || a.style === 'carousel') && (
                <Pills label="Direção da animação" value={a.direction} onChange={v => setAnn({ direction: v })} hint="Para qual lado o texto se move" options={[
                  { value: 'rtl', label: '← Esquerda' },
                  { value: 'ltr', label: 'Direita →' },
                ]} />
              )}

              <ControlGroup title="Mensagens" hint="Textos exibidos na barra. Em modo estático, apenas a Mensagem 1 aparece.">
                <div>
                  <p className="text-[11px] text-muted-foreground/60 mb-1">Mensagem 1 (principal)</p>
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
                    <NumSlider label="Velocidade da animação" value={a.speed} onChange={v => setAnn({ speed: v })} min={2} max={10} suffix="s" hint="Tempo entre cada troca de mensagem ou ciclo do ticker" />
                  </>
                )}
              </ControlGroup>

              <div className="grid grid-cols-2 gap-3">
                <ColorField label="Cor do fundo" value={a.backgroundColor} onChange={v => setAnn({ backgroundColor: v })} />
                <ColorField label="Cor do texto" value={a.textColor} onChange={v => setAnn({ textColor: v })} />
              </div>

              <ToggleRow label="Pausar no hover" hint="A animação pausa quando o mouse está sobre a barra, permitindo leitura" checked={a.pauseOnHover} onChange={v => setAnn({ pauseOnHover: v })} />
            </>
          )}
        </div>
      </div>

      {/* ── BANNER BELOW ── */}
      <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border/30 flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-[hsl(var(--flash-brand-deep))]" />
          <div>
            <p className="text-[13px] font-semibold text-foreground">Banner abaixo do Cabeçalho</p>
            <p className="text-[10px] text-muted-foreground/50">Imagem clicável exibida logo abaixo do cabeçalho — ideal para promoções sazonais</p>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <ToggleRow label="Ativar banner" hint="Exibe uma imagem (ou carrossel) entre o cabeçalho e o conteúdo da página" checked={bb.enabled} onChange={v => setBanner({ enabled: v })} />

          {bb.enabled && (
            <>
              <div>
                <p className="text-[11px] text-muted-foreground/60 mb-1">URL da imagem principal</p>
                <Input className="h-8 text-xs" value={bb.imageUrl} placeholder="https://..."
                  onChange={e => setBanner({ imageUrl: e.target.value })} />
                <p className="text-[10px] text-muted-foreground/40 mt-1">Cole a URL de uma imagem (ex: do Imgur, Cloudinary ou Biblioteca de Mídia)</p>
              </div>

              <ToggleRow label="Carrossel de imagens" hint="Ativa rotação automática entre múltiplas imagens no banner" checked={bb.carousel} onChange={v => setBanner({ carousel: v })} />

              {bb.carousel && (
                <ControlGroup title="Imagens adicionais" hint="Imagens que se alternam automaticamente com a principal">
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
                  <NumSlider label="Velocidade do carrossel" value={bb.carouselSpeed} onChange={v => setBanner({ carouselSpeed: v })} min={2} max={10} suffix="s" hint="Tempo em segundos entre cada troca de imagem" />
                </ControlGroup>
              )}

              <div>
                <p className="text-[11px] text-muted-foreground/60 mb-1">Link de destino</p>
                <Input className="h-8 text-xs" value={bb.link} placeholder="/products"
                  onChange={e => setBanner({ link: e.target.value })} />
                <p className="text-[10px] text-muted-foreground/40 mt-1">Página para onde o cliente vai ao clicar no banner</p>
              </div>

              <NumSlider label="Altura do banner" value={bb.height} onChange={v => setBanner({ height: v })} min={40} max={200} suffix="px" hint="Altura em pixels da imagem do banner" />
              <ToggleRow label="Largura total" hint="Banner ocupa toda a largura da tela, sem margens laterais" checked={bb.fullWidth} onChange={v => setBanner({ fullWidth: v })} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  SECTION MAP                                                         */
/* ================================================================== */

/* ================================================================== */
/*  ICON PICKER — contextual icons for Search, Account, Cart            */
/* ================================================================== */

const SEARCH_ICONS: { id: string; icon: LucideIcon; label: string }[] = [
  { id: 'Search', icon: Search, label: 'Lupa' },
  { id: 'SearchIcon', icon: SearchIcon, label: 'Buscar' },
  { id: 'ScanSearch', icon: ScanSearch, label: 'Scan' },
  { id: 'SearchCheck', icon: SearchCheck, label: 'Busca OK' },
  { id: 'SearchCode', icon: SearchCode, label: 'Busca Detalhada' },
  { id: 'Telescope', icon: Telescope, label: 'Telescópio' },
  { id: 'Focus', icon: Focus, label: 'Foco' },
  { id: 'ScanLine', icon: ScanLine, label: 'Escanear' },
  { id: 'Radar', icon: Radar, label: 'Radar' },
  { id: 'ListFilter', icon: ListFilter, label: 'Filtrar' },
  { id: 'Filter', icon: Filter, label: 'Funil' },
];

const ACCOUNT_ICONS: { id: string; icon: LucideIcon; label: string }[] = [
  { id: 'User', icon: User, label: 'Pessoa' },
  { id: 'UserRound', icon: UserRound, label: 'Pessoa Redonda' },
  { id: 'UserCircle', icon: UserCircle, label: 'Círculo' },
  { id: 'UserCircle2', icon: UserCircle2, label: 'Círculo 2' },
  { id: 'CircleUser', icon: CircleUser, label: 'Usuário Circular' },
  { id: 'UserCheck', icon: UserCheck, label: 'Verificado' },
  { id: 'UserCog', icon: UserCog, label: 'Configurações' },
  { id: 'Contact', icon: Contact, label: 'Contato' },
  { id: 'BadgeCheck', icon: BadgeCheck, label: 'Badge' },
  { id: 'Fingerprint', icon: Fingerprint, label: 'Biometria' },
  { id: 'LogIn', icon: LogIn, label: 'Login' },
];

const CART_ICONS: { id: string; icon: LucideIcon; label: string }[] = [
  { id: 'ShoppingBag', icon: ShoppingBag, label: 'Sacola' },
  { id: 'ShoppingCart', icon: ShoppingCart, label: 'Carrinho' },
  { id: 'Store', icon: Store, label: 'Loja' },
  { id: 'Package', icon: Package, label: 'Pacote' },
  { id: 'PackagePlus', icon: PackagePlus, label: 'Pacote +' },
  { id: 'Briefcase', icon: Briefcase, label: 'Maleta' },
  { id: 'HandCoins', icon: HandCoins, label: 'Compra' },
  { id: 'Wallet', icon: Wallet, label: 'Carteira' },
  { id: 'CreditCard', icon: CreditCard, label: 'Cartão' },
  { id: 'Receipt', icon: Receipt, label: 'Recibo' },
  { id: 'Gem', icon: Gem, label: 'Joia' },
  { id: 'Gift', icon: Gift, label: 'Presente' },
];

function IconGrid({ icons, selected, onSelect, iconSize, strokeWidth }: {
  icons: { id: string; icon: LucideIcon; label: string }[];
  selected: string;
  onSelect: (id: string) => void;
  iconSize: number;
  strokeWidth: number;
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {icons.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={cn(
            'flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all duration-150',
            'hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            selected === id
              ? 'border-[hsl(var(--flash-brand-deep))] bg-[hsl(var(--flash-brand)/0.08)] shadow-sm'
              : 'border-border/30 bg-card'
          )}
        >
          <Icon style={{ width: iconSize, height: iconSize }} strokeWidth={strokeWidth} className={cn(
            'transition-colors',
            selected === id ? 'text-[hsl(var(--flash-brand-deep))]' : 'text-foreground/60'
          )} />
          <span className={cn('text-[9px] font-medium leading-tight text-center', selected === id ? 'text-[hsl(var(--flash-brand-deep))]' : 'text-muted-foreground/60')}>{label}</span>
          {selected === id && <Check className="h-3 w-3 text-[hsl(var(--flash-brand-deep))]" />}
        </button>
      ))}
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
  'banners': BannersSection,
};

/* ================================================================== */
/*  MAIN PAGE                                                          */
/* ================================================================== */

export default function AdminMenu() {
  const [activeSection, setActiveSection] = useState<SectionKey>('presets');
  const { isDirty, publish, versions, rollback } = useTheme();
  const navigate = useNavigate();
  const [showVersions, setShowVersions] = useState(false);

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
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[hsl(var(--flash-brand)/0.2)] to-[hsl(var(--flash-brand-deep)/0.1)] flex items-center justify-center">
            <PanelTop className="h-4 w-4 text-[hsl(var(--flash-brand-deep))]" />
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
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs h-8 text-muted-foreground" onClick={() => setShowVersions(true)}>
            <RotateCcw className="h-3.5 w-3.5" /> Versões
          </Button>
          {isDirty && (
            <Button size="sm" className="gap-1.5 text-xs h-8 bg-[hsl(var(--flash-brand-deep))] hover:bg-[hsl(var(--flash-brand-darker))] text-white" onClick={handleSave}>
              <Save className="h-3.5 w-3.5" /> Publicar
            </Button>
          )}
        </div>
      </div>

      {/* Versions dialog */}
      <Dialog open={showVersions} onOpenChange={setShowVersions}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Histórico de Versões</DialogTitle>
            <DialogDescription>Restaure uma versão anterior do tema</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {versions.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">Nenhuma versão publicada ainda.</p>
            )}
            {versions.map(v => (
              <div key={v.version} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div>
                  <p className="text-sm font-medium">Versão {v.version}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(v.publishedAt).toLocaleString('pt-BR')}
                    {v.note && ` — ${v.note}`}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => {
                  rollback(v.version);
                  setShowVersions(false);
                  toast.info(`Versão ${v.version} restaurada como rascunho.`);
                }}>
                  Restaurar
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Live preview */}
      <LiveHeaderPreview />

      {/* Content: Sidebar + Panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-56 border-r border-border/40 bg-[hsl(var(--flash-surface))] flex-shrink-0">
          <ScrollArea className="h-full">
            <div className="py-3 px-2 space-y-4">
              {Object.entries(groups).map(([group, items]) => (
                <div key={group}>
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[hsl(var(--flash-brand-deep)/0.4)] px-3 mb-1.5">{group}</p>
                  <div className="space-y-0.5">
                    {items.map(item => (
                      <button
                        key={item.key}
                        onClick={() => setActiveSection(item.key)}
                        className={cn(
                          'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-150',
                          activeSection === item.key
                            ? 'bg-white text-foreground font-medium shadow-sm border border-[hsl(var(--flash-brand)/0.15)]'
                            : 'text-muted-foreground/70 hover:text-foreground hover:bg-white/60'
                        )}
                      >
                        <item.icon className={cn('h-3.5 w-3.5 shrink-0', activeSection === item.key ? 'text-[hsl(var(--flash-brand-deep))]' : 'text-muted-foreground/40')} />
                        <div className="flex-1 text-left min-w-0">
                          <span className="truncate block">{item.label}</span>
                          {activeSection === item.key && item.hint && (
                            <span className="text-[9px] text-muted-foreground/50 block truncate">{item.hint}</span>
                          )}
                        </div>
                        {item.badge && (
                          <span className="ml-auto text-[8px] font-bold text-[hsl(var(--flash-brand-deep))] bg-[hsl(var(--flash-brand)/0.1)] px-1.5 py-0.5 rounded-full">{item.badge}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Edit Panel + Mobile Preview float */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="max-w-xl mx-auto px-6 py-6">
                <SectionComponent />
              </div>
            </ScrollArea>
          </div>
          {/* Floating mobile preview on the right */}
          <MobilePreviewFloat />
        </div>
      </div>
    </div>
  );
}
