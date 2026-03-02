import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Trash2, ChevronDown, ChevronRight, GripVertical, Palette, Save,
  Menu, ExternalLink, Tag, Settings2, PanelTop, Megaphone, ImageIcon,
  Eye, EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ThemeMenuItem } from '@/types/theme';
import { toast } from 'sonner';
import { mockCategories } from '@/data/mock';

/* ================================================================== */
/*  SHARED CONTROLS                                                    */
/* ================================================================== */

type MenuTabType = 'items' | 'header' | 'announcement' | 'banner';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 pt-2">{children}</p>;
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

function NumberSlider({ label, value, onChange, min, max, suffix = '' }: {
  label: string; value: number; onChange: (v: number) => void; min: number; max: number; suffix?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <span className="text-xs text-muted-foreground tabular-nums">{value}{suffix}</span>
      </div>
      <Slider value={[value]} onValueChange={v => onChange(v[0])} min={min} max={max} step={1} className="w-full" />
    </div>
  );
}

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2">
        <input type="color" value={value} onChange={e => onChange(e.target.value)}
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
/*  TAB: ITENS                                                         */
/* ================================================================== */

function ItemsTab() {
  const { draft, updateDraftSection } = useTheme();
  const mm = draft.megaMenu ?? { items: [], mobileGroupStyle: 'accordion', showIcons: false, showBadges: true };
  const set = (u: Partial<typeof mm>) => updateDraftSection('megaMenu', u as any);

  const addItem = () => {
    set({ items: [...mm.items, { id: `mi-${Date.now()}`, label: 'Novo item', link: '', openNewTab: false, badge: '', badgeColor: '#ef4444', icon: '', children: [] }] });
  };
  const updateItem = (idx: number, u: ThemeMenuItem) => { const items = [...mm.items]; items[idx] = u; set({ items }); };
  const removeItem = (idx: number) => { set({ items: mm.items.filter((_, i) => i !== idx) }); };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Preferences */}
      <div className="border border-border rounded-lg bg-card">
        <div className="px-4 py-3 border-b border-border">
          <p className="text-xs font-semibold text-foreground flex items-center gap-1.5"><Settings2 className="h-3.5 w-3.5" /> Preferências</p>
        </div>
        <div className="p-4 space-y-3">
          <ToggleRow label="Badges promocionais" hint="Exibe etiquetas como 'Novo' ou '-30%' ao lado dos itens" checked={mm.showBadges} onChange={v => set({ showBadges: v })} />
          <ToggleRow label="Ícones nos itens" hint="Adiciona um ícone à esquerda de cada item do menu" checked={mm.showIcons} onChange={v => set({ showIcons: v })} />
          <div className="border-t border-border pt-3">
            <p className="text-sm font-medium text-foreground mb-2">Estilo no celular</p>
            <div className="flex gap-2">
              {([{ value: 'accordion', label: 'Acordeão', hint: 'Expande ao tocar' }, { value: 'list', label: 'Lista', hint: 'Tudo visível' }] as const).map(opt => (
                <button key={opt.value} onClick={() => set({ mobileGroupStyle: opt.value })}
                  className={cn('flex-1 px-3 py-2 rounded-md text-sm font-medium border transition-colors text-center',
                    mm.mobileGroupStyle === opt.value ? 'bg-foreground text-background border-foreground' : 'bg-card text-muted-foreground border-border hover:bg-muted/50')}>
                  <span className="block">{opt.label}</span>
                  <span className="block text-[10px] font-normal opacity-70">{opt.hint}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu items list */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">Itens do Menu</p>
            <p className="text-[11px] text-muted-foreground">Defina os links que aparecem na barra de navegação da loja.</p>
          </div>
          <span className="text-xs text-muted-foreground tabular-nums">{mm.items.length} {mm.items.length === 1 ? 'item' : 'itens'}</span>
        </div>

        {mm.items.length === 0 && (
          <div className="border-2 border-dashed border-border rounded-lg py-10 text-center">
            <Menu className="h-7 w-7 text-muted-foreground/20 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Nenhum item adicionado</p>
            <p className="text-[11px] text-muted-foreground/60 mt-1">Quando vazio, a loja usará categorias automáticas.</p>
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

/* ================================================================== */
/*  TAB: CABEÇALHO                                                     */
/* ================================================================== */

function HeaderTab() {
  const { draft, updateDraftSection } = useTheme();
  const h = draft.header ?? {} as any;
  const set = (u: Partial<typeof h>) => updateDraftSection('header', u);

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Layout */}
      <div className="border border-border rounded-lg bg-card p-4 space-y-4">
        <SectionLabel>Layout do Cabeçalho</SectionLabel>
        <p className="text-[11px] text-muted-foreground -mt-2">Define como logo, menu e ícones são organizados.</p>
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
      </div>

      {/* Behavior */}
      <div className="border border-border rounded-lg bg-card p-4 space-y-3">
        <SectionLabel>Comportamento</SectionLabel>
        <p className="text-[11px] text-muted-foreground -mt-1">Como o cabeçalho reage à rolagem da página.</p>
        <ToggleRow label="Header fixo (sticky)" hint="Mantém o cabeçalho visível ao rolar" checked={h.sticky} onChange={v => set({ sticky: v })} />
        <ToggleRow label="Encolher ao rolar" hint="O cabeçalho diminui de tamanho ao rolar" checked={h.shrinkOnScroll} onChange={v => set({ shrinkOnScroll: v })} />
        <ToggleRow label="Sombra ao rolar" hint="Sombra sutil quando a página é rolada" checked={h.shadowOnScroll} onChange={v => set({ shadowOnScroll: v })} />
        <ToggleRow label="Borda inferior" hint="Linha fina na parte inferior do cabeçalho" checked={h.borderBottom} onChange={v => set({ borderBottom: v })} />
        <NumberSlider label="Altura" value={h.height} onChange={v => set({ height: v })} min={48} max={96} suffix="px" />
      </div>

      {/* Navigation style */}
      <div className="border border-border rounded-lg bg-card p-4 space-y-3">
        <SectionLabel>Estilo do Menu</SectionLabel>
        <p className="text-[11px] text-muted-foreground -mt-1">Aparência dos links de navegação.</p>
        <OptionPicker label="Tipo" value={h.menuStyle} onChange={v => set({ menuStyle: v })} options={[
          { value: 'horizontal', label: 'Horizontal' },
          { value: 'dropdown', label: 'Dropdown' },
          { value: 'mega-menu', label: 'Mega Menu' },
        ]} />
        <NumberSlider label="Tamanho da fonte" value={h.menuFontSize} onChange={v => set({ menuFontSize: v })} min={10} max={18} suffix="px" />
        <ToggleRow label="Texto em maiúsculas" hint="Transforma os links em letras maiúsculas" checked={h.menuUppercase} onChange={v => set({ menuUppercase: v })} />
      </div>

      {/* Icons */}
      <div className="border border-border rounded-lg bg-card p-4 space-y-3">
        <SectionLabel>Ícones e Ações</SectionLabel>
        <p className="text-[11px] text-muted-foreground -mt-1">Quais ícones aparecem no cabeçalho.</p>
        <NumberSlider label="Tamanho dos ícones" value={h.iconSize} onChange={v => set({ iconSize: v })} min={16} max={28} suffix="px" />
        <ToggleRow label="Ícone de busca" hint="Lupa para buscar produtos" checked={h.showSearch} onChange={v => set({ showSearch: v })} />
        {h.showSearch && (
          <OptionPicker label="Estilo da busca" value={h.searchStyle} onChange={v => set({ searchStyle: v })} options={[
            { value: 'inline', label: 'Inline' },
            { value: 'modal', label: 'Modal' },
            { value: 'drawer', label: 'Drawer' },
          ]} />
        )}
        <ToggleRow label="Ícone de conta" hint="Perfil/login do usuário" checked={h.showAccount} onChange={v => set({ showAccount: v })} />
        <ToggleRow label="Ícone de wishlist" hint="Coração para lista de desejos" checked={h.showWishlist} onChange={v => set({ showWishlist: v })} />
        <ToggleRow label="Ícone do carrinho" hint="Sacola/carrinho de compras" checked={h.showCart} onChange={v => set({ showCart: v })} />
        <OptionPicker label="Badge do carrinho" value={h.cartBadgeStyle} onChange={v => set({ cartBadgeStyle: v })} options={[
          { value: 'count', label: 'Contador' },
          { value: 'dot', label: 'Ponto' },
          { value: 'none', label: 'Nenhum' },
        ]} />
      </div>
    </div>
  );
}

/* ================================================================== */
/*  TAB: BARRA DE ANÚNCIO                                              */
/* ================================================================== */

function AnnouncementTab() {
  const { draft, updateDraftSection } = useTheme();
  const h = draft.header ?? {} as any;
  const a = h.announcement ?? { enabled: false, messages: [], speed: 5, backgroundColor: '#1a1a1a', textColor: '#fafafa', showIcon: false, icon: 'truck', link: '', pauseOnHover: true, style: 'static' as const, direction: 'rtl' as const };
  const setAnn = (u: Partial<typeof a>) => updateDraftSection('header', { announcement: { ...a, ...u } });

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="border border-border rounded-lg bg-card p-4 space-y-4">
        <SectionLabel>Barra de Anúncio</SectionLabel>
        <p className="text-[11px] text-muted-foreground -mt-2">Barra fina acima do cabeçalho com mensagens promocionais (ex: "Frete Grátis").</p>
        <ToggleRow label="Ativar barra de anúncio" hint="Exibe uma barra colorida no topo do site" checked={a.enabled} onChange={v => setAnn({ enabled: v })} />

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

            <ToggleRow label="Pausar no hover" hint="Pausa a animação quando o mouse está sobre a barra" checked={a.pauseOnHover} onChange={v => setAnn({ pauseOnHover: v })} />
          </>
        )}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  TAB: BANNER                                                        */
/* ================================================================== */

function BannerTab() {
  const { draft, updateDraftSection } = useTheme();
  const h = draft.header ?? {} as any;
  const bb = h.bannerBelow ?? { enabled: false, imageUrl: '', images: [], link: '', height: 60, fullWidth: true, carousel: false, carouselSpeed: 5 };
  const setBanner = (u: Partial<typeof bb>) => updateDraftSection('header', { bannerBelow: { ...bb, ...u } });

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="border border-border rounded-lg bg-card p-4 space-y-4">
        <SectionLabel>Banner abaixo do Cabeçalho</SectionLabel>
        <p className="text-[11px] text-muted-foreground -mt-2">Banner com imagem logo abaixo do cabeçalho. Ideal para promoções sazonais.</p>
        <ToggleRow label="Ativar banner" hint="Exibe um banner com imagem abaixo do cabeçalho" checked={bb.enabled} onChange={v => setBanner({ enabled: v })} />

        {bb.enabled && (
          <>
            <div>
              <p className="text-xs font-medium text-muted-foreground">URL da imagem principal</p>
              <Input className="mt-1 h-9 text-sm" value={bb.imageUrl} placeholder="https://..."
                onChange={e => setBanner({ imageUrl: e.target.value })} />
            </div>

            <ToggleRow label="Carrossel de imagens" hint="Rotação automática entre múltiplas imagens" checked={bb.carousel} onChange={v => setBanner({ carousel: v })} />
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
                <NumberSlider label="Velocidade do carrossel" value={bb.carouselSpeed} onChange={v => setBanner({ carouselSpeed: v })} min={2} max={10} suffix="s" />
              </>
            )}

            <div>
              <p className="text-xs font-medium text-muted-foreground">Link do banner</p>
              <Input className="mt-1 h-9 text-sm" value={bb.link} placeholder="/products"
                onChange={e => setBanner({ link: e.target.value })} />
            </div>
            <NumberSlider label="Altura" value={bb.height} onChange={v => setBanner({ height: v })} min={40} max={200} suffix="px" />
            <ToggleRow label="Largura total" hint="Banner ocupa toda a largura da tela" checked={bb.fullWidth} onChange={v => setBanner({ fullWidth: v })} />
          </>
        )}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  MAIN PAGE                                                          */
/* ================================================================== */

const TABS: { key: MenuTabType; label: string; icon: React.ElementType }[] = [
  { key: 'items', label: 'Itens', icon: Menu },
  { key: 'header', label: 'Cabeçalho', icon: PanelTop },
  { key: 'announcement', label: 'Barra de Anúncio', icon: Megaphone },
  { key: 'banner', label: 'Banner', icon: ImageIcon },
];

export default function AdminMenu() {
  const [tab, setTab] = useState<MenuTabType>('items');
  const { isDirty, publish } = useTheme();
  const navigate = useNavigate();

  const handleSave = () => {
    publish('Atualização do menu/cabeçalho');
    toast.success('Alterações salvas e publicadas!');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border px-6 pt-2 flex items-center justify-between">
        <div className="flex gap-0">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                'flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px',
                tab === t.key
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              )}
            >
              <t.icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 -mt-1">
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

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {tab === 'items' && <ItemsTab />}
        {tab === 'header' && <HeaderTab />}
        {tab === 'announcement' && <AnnouncementTab />}
        {tab === 'banner' && <BannerTab />}
      </div>
    </div>
  );
}
