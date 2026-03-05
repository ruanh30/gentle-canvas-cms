import React, { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { ThemeHomepageSection } from '@/types/theme';
import { HintTooltip } from '../EditorControls';
import { MediaPickerModal } from '../MediaPickerModal';
import SecureFileUpload from '@/components/admin/SecureFileUpload';
import { ImageIcon, Upload, Link2, Type, Palette, Layout, Monitor, Smartphone, AlignLeft, AlignCenter, AlignRight, AlignVerticalJustifyStart, AlignVerticalJustifyCenter, AlignVerticalJustifyEnd } from 'lucide-react';
import { mockCategories } from '@/data/mock';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

/* ── Types ── */

export interface BannerItemData {
  backgroundImage: string;
  title: string;
  subtitle: string;
  description: string;
  showText: boolean;
  showButton: boolean;
  ctaText: string;
  ctaLink: string;
  ctaLinkType: 'url' | 'category';
  ctaCategory: string;
  ctaStyle: 'filled' | 'outline' | 'ghost';
  clickableImage: boolean;
  imageLink: string;
  imageLinkType: 'url' | 'category';
  imageCategory: string;
  overlayColor: string;
  overlayOpacity: number;
  textColor: string;
  contentAlign: 'left' | 'center' | 'right';
  verticalAlign: 'top' | 'center' | 'bottom';
  buttonAlign: 'left' | 'center' | 'right';
  paddingX: number;
  paddingY: number;
}

export const defaultBannerItem: BannerItemData = {
  backgroundImage: '',
  title: '',
  subtitle: '',
  description: '',
  showText: false,
  showButton: false,
  ctaText: 'Ver mais',
  ctaLink: '',
  ctaLinkType: 'category',
  ctaCategory: '',
  ctaStyle: 'filled',
  clickableImage: true,
  imageLink: '',
  imageLinkType: 'category',
  imageCategory: '',
  overlayColor: '#000000',
  overlayOpacity: 0,
  textColor: '#ffffff',
  contentAlign: 'center',
  verticalAlign: 'center',
  buttonAlign: 'center',
  paddingX: 32,
  paddingY: 32,
};

/* ── Layout definitions ── */

export const DOUBLE_LAYOUTS = [
  { value: 'side-by-side', label: 'Lado a lado', desc: 'Dois banners iguais na horizontal' },
  { value: 'stacked', label: 'Empilhado', desc: 'Um em cima do outro' },
  { value: '2-1', label: '2/3 + 1/3', desc: 'Primeiro maior, segundo menor' },
  { value: '1-2', label: '1/3 + 2/3', desc: 'Primeiro menor, segundo maior' },
];

export const TRIPLE_LAYOUTS = [
  { value: 'equal-row', label: '3 em linha', desc: 'Três banners iguais lado a lado' },
  { value: 'stacked', label: 'Empilhados', desc: 'Um abaixo do outro' },
  { value: '1-big-2-small', label: '1 grande + 2 pequenos', desc: 'Um grande à esquerda e dois empilhados à direita' },
  { value: '2-small-1-big', label: '2 pequenos + 1 grande', desc: 'Dois empilhados à esquerda e um grande à direita' },
  { value: 'top-1-bottom-2', label: '1 largo em cima + 2 embaixo', desc: 'Um banner largo no topo e dois abaixo' },
];

/* ── Reusable helpers ── */

function FieldGroup({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
        {label}
        {hint && <HintTooltip text={hint} />}
      </Label>
      {children}
    </div>
  );
}

function SettingsCard({ title, icon: Icon, children, collapsible = false }: { title: string; icon?: React.ElementType; children: React.ReactNode; collapsible?: boolean }) {
  const [open, setOpen] = useState(!collapsible);
  return (
    <div className="rounded-xl border border-border/50 bg-muted/20 overflow-hidden">
      <button
        onClick={() => collapsible && setOpen(!open)}
        className={cn(
          'w-full flex items-center gap-2.5 px-4 py-3 text-left',
          collapsible && 'hover:bg-muted/40 transition-colors cursor-pointer'
        )}
      >
        {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
        <span className="text-xs font-semibold text-foreground flex-1">{title}</span>
        {collapsible && (
          <span className="text-[10px] text-muted-foreground">{open ? '▾' : '▸'}</span>
        )}
      </button>
      {open && <div className="px-4 pb-4 space-y-3 border-t border-border/30 pt-3">{children}</div>}
    </div>
  );
}

function SegmentedControl<T extends string>({ options, value, onChange }: {
  options: { value: T; label: string; icon?: React.ElementType }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-center gap-0.5 bg-secondary/50 rounded-lg border border-border/50 p-0.5">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-all',
            value === opt.value
              ? 'bg-foreground text-background shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {opt.icon && <opt.icon className="h-3 w-3" />}
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/* ── Image Picker (gallery + upload) ── */

function BannerImagePicker({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="space-y-2">
      <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Imagem de fundo</Label>

      {/* Preview */}
      {value && (
        <div className="relative rounded-lg overflow-hidden border border-border/50 h-28 group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground rounded-md px-2 py-1 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Remover
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-1.5">
        <button
          onClick={() => setPickerOpen(true)}
          className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ImageIcon className="h-3.5 w-3.5" />
          Galeria
        </button>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <Upload className="h-3.5 w-3.5" />
          Upload
        </button>
      </div>

      {/* URL manual */}
      <Input
        value={value}
        onChange={e => {
          const v = e.target.value;
          const lower = v.toLowerCase().replace(/\s/g, '');
          if (lower.startsWith('javascript:') || lower.startsWith('vbscript:') || lower.startsWith('data:text') || lower.startsWith('data:application')) return;
          onChange(v);
        }}
        placeholder="Ou cole uma URL de imagem..."
        className="h-8 text-xs bg-secondary/30 border-border/50"
      />

      {/* Upload area */}
      {showUpload && (
        <SecureFileUpload
          onFileAccepted={(dataUrl) => {
            onChange(dataUrl);
            setShowUpload(false);
          }}
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          compact
        />
      )}

      <MediaPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={onChange}
        currentValue={value}
      />
    </div>
  );
}

/* ── Link destination picker ── */

function LinkDestinationPicker({ linkType, link, category, onLinkTypeChange, onLinkChange, onCategoryChange }: {
  linkType: 'url' | 'category';
  link: string;
  category: string;
  onLinkTypeChange: (v: 'url' | 'category') => void;
  onLinkChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <FieldGroup label="Destino">
          <Select value={linkType} onValueChange={v => onLinkTypeChange(v as 'url' | 'category')}>
            <SelectTrigger className="h-8 text-xs bg-secondary/30 border-border/50"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="url">URL personalizada</SelectItem>
              <SelectItem value="category">Categoria</SelectItem>
            </SelectContent>
          </Select>
        </FieldGroup>
        {linkType === 'url' ? (
          <FieldGroup label="URL">
            <Input value={link} onChange={e => onLinkChange(e.target.value)} placeholder="/products" className="h-8 text-xs bg-secondary/30 border-border/50" />
          </FieldGroup>
        ) : (
          <FieldGroup label="Categoria">
            <Select value={category} onValueChange={v => {
              onCategoryChange(v);
              const cat = mockCategories.find(c => c.id === v);
              if (cat) onLinkChange(`/products?category=${cat.slug}`);
            }}>
              <SelectTrigger className="h-8 text-xs bg-secondary/30 border-border/50"><SelectValue placeholder="Selecione" /></SelectTrigger>
              <SelectContent>
                {mockCategories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </FieldGroup>
        )}
      </div>
    </div>
  );
}

/* ── Individual Banner Item Editor ── */

function BannerItemEditor({ data, onChange, label }: {
  data: BannerItemData;
  onChange: (updates: Partial<BannerItemData>) => void;
  label: string;
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-bold text-foreground border-b border-border/50 pb-2">{label}</p>

      {/* Image */}
      <BannerImagePicker value={data.backgroundImage} onChange={v => onChange({ backgroundImage: v })} />

      {/* Clickable image (whole banner as link) */}
      <SettingsCard title="Link da imagem" icon={Link2}>
        <div className="flex items-center gap-3">
          <Switch checked={data.clickableImage} onCheckedChange={v => onChange({ clickableImage: v })} />
          <div>
            <p className="text-xs font-medium">Imagem clicável</p>
            <p className="text-[10px] text-muted-foreground">Ao clicar na imagem, redireciona para um destino</p>
          </div>
        </div>
        {data.clickableImage && (
          <LinkDestinationPicker
            linkType={data.imageLinkType}
            link={data.imageLink}
            category={data.imageCategory}
            onLinkTypeChange={v => onChange({ imageLinkType: v })}
            onLinkChange={v => onChange({ imageLink: v })}
            onCategoryChange={v => onChange({ imageCategory: v })}
          />
        )}
      </SettingsCard>

      {/* Overlay */}
      <SettingsCard title="Overlay" icon={Palette} collapsible>
        <div className="grid grid-cols-2 gap-3">
          <FieldGroup label="Cor do overlay">
            <div className="flex items-center gap-2">
              <input type="color" value={data.overlayColor} onChange={e => onChange({ overlayColor: e.target.value })}
                className="w-8 h-8 rounded-md border border-border/50 cursor-pointer [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch]:border-none" />
              <Input value={data.overlayColor} onChange={e => onChange({ overlayColor: e.target.value })} className="h-8 text-xs font-mono w-20 bg-secondary/30 border-border/50" maxLength={7} />
            </div>
          </FieldGroup>
          <FieldGroup label="Opacidade">
            <div className="flex items-center gap-2">
              <Slider value={[data.overlayOpacity]} onValueChange={([v]) => onChange({ overlayOpacity: v })} min={0} max={1} step={0.05} className="flex-1" />
              <span className="text-[10px] text-muted-foreground w-8 text-right">{Math.round(data.overlayOpacity * 100)}%</span>
            </div>
          </FieldGroup>
        </div>
      </SettingsCard>

      {/* Text content */}
      <SettingsCard title="Conteúdo de texto" icon={Type} collapsible>
        <div className="flex items-center gap-3">
          <Switch checked={data.showText} onCheckedChange={v => onChange({ showText: v })} />
          <p className="text-xs font-medium">Exibir textos</p>
        </div>
        {data.showText && (
          <>
            <FieldGroup label="Subtítulo">
              <Input value={data.subtitle} onChange={e => onChange({ subtitle: e.target.value })} placeholder="Subtítulo" className="h-8 text-xs bg-secondary/30 border-border/50" />
            </FieldGroup>
            <FieldGroup label="Título">
              <Input value={data.title} onChange={e => onChange({ title: e.target.value })} placeholder="Título do banner" className="h-8 text-xs bg-secondary/30 border-border/50" />
            </FieldGroup>
            <FieldGroup label="Descrição">
              <Input value={data.description} onChange={e => onChange({ description: e.target.value })} placeholder="Descrição" className="h-8 text-xs bg-secondary/30 border-border/50" />
            </FieldGroup>
            <FieldGroup label="Cor do texto">
              <div className="flex items-center gap-2">
                <input type="color" value={data.textColor} onChange={e => onChange({ textColor: e.target.value })}
                  className="w-8 h-8 rounded-md border border-border/50 cursor-pointer [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch]:border-none" />
                <Input value={data.textColor} onChange={e => onChange({ textColor: e.target.value })} className="h-8 text-xs font-mono w-20 bg-secondary/30 border-border/50" maxLength={7} />
              </div>
            </FieldGroup>
          </>
        )}
      </SettingsCard>

      {/* Alignment */}
      {(data.showText || data.showButton) && (
        <SettingsCard title="Alinhamento" icon={AlignCenter} collapsible>
          <FieldGroup label="Horizontal">
            <SegmentedControl
              value={data.contentAlign}
              onChange={v => onChange({ contentAlign: v })}
              options={[
                { value: 'left' as const, label: 'Esquerda', icon: AlignLeft },
                { value: 'center' as const, label: 'Centro', icon: AlignCenter },
                { value: 'right' as const, label: 'Direita', icon: AlignRight },
              ]}
            />
          </FieldGroup>
          <FieldGroup label="Vertical">
            <SegmentedControl
              value={data.verticalAlign}
              onChange={v => onChange({ verticalAlign: v })}
              options={[
                { value: 'top' as const, label: 'Topo', icon: AlignVerticalJustifyStart },
                { value: 'center' as const, label: 'Centro', icon: AlignVerticalJustifyCenter },
                { value: 'bottom' as const, label: 'Base', icon: AlignVerticalJustifyEnd },
              ]}
            />
          </FieldGroup>
          <FieldGroup label="Botão">
            <SegmentedControl
              value={data.buttonAlign || data.contentAlign}
              onChange={v => onChange({ buttonAlign: v })}
              options={[
                { value: 'left' as const, label: 'Esquerda', icon: AlignLeft },
                { value: 'center' as const, label: 'Centro', icon: AlignCenter },
                { value: 'right' as const, label: 'Direita', icon: AlignRight },
              ]}
            />
          </FieldGroup>
          <div className="grid grid-cols-2 gap-3">
            <FieldGroup label="Padding horizontal">
              <div className="flex items-center gap-2">
                <Slider value={[data.paddingX]} onValueChange={([v]) => onChange({ paddingX: v })} min={8} max={80} step={4} className="flex-1" />
                <span className="text-[10px] text-muted-foreground w-8 text-right">{data.paddingX}px</span>
              </div>
            </FieldGroup>
            <FieldGroup label="Padding vertical">
              <div className="flex items-center gap-2">
                <Slider value={[data.paddingY]} onValueChange={([v]) => onChange({ paddingY: v })} min={8} max={80} step={4} className="flex-1" />
                <span className="text-[10px] text-muted-foreground w-8 text-right">{data.paddingY}px</span>
              </div>
            </FieldGroup>
          </div>
        </SettingsCard>
      )}

      {/* Button */}
      <SettingsCard title="Botão de ação (CTA)" icon={Link2} collapsible>
        <div className="flex items-center gap-3">
          <Switch checked={data.showButton} onCheckedChange={v => onChange({ showButton: v })} />
          <p className="text-xs font-medium">Exibir botão</p>
        </div>
        {data.showButton && (
          <>
            <FieldGroup label="Texto do botão">
              <Input value={data.ctaText} onChange={e => onChange({ ctaText: e.target.value })} placeholder="Ver mais" className="h-8 text-xs bg-secondary/30 border-border/50" />
            </FieldGroup>
            <LinkDestinationPicker
              linkType={data.ctaLinkType}
              link={data.ctaLink}
              category={data.ctaCategory}
              onLinkTypeChange={v => onChange({ ctaLinkType: v })}
              onLinkChange={v => onChange({ ctaLink: v })}
              onCategoryChange={v => onChange({ ctaCategory: v })}
            />
            <FieldGroup label="Estilo do botão">
              <SegmentedControl
                value={data.ctaStyle}
                onChange={v => onChange({ ctaStyle: v })}
                options={[
                  { value: 'filled' as const, label: 'Preenchido' },
                  { value: 'outline' as const, label: 'Contorno' },
                  { value: 'ghost' as const, label: 'Transparente' },
                ]}
              />
            </FieldGroup>
          </>
        )}
      </SettingsCard>
    </div>
  );
}

/* ── Main Exports ── */

interface BannerEditorProps {
  section: ThemeHomepageSection;
  setSetting: (id: string, key: string, value: unknown) => void;
}

/** Single Banner Editor */
export function SingleBannerEditor({ section, setSetting }: BannerEditorProps) {
  const bannerData: BannerItemData = {
    ...defaultBannerItem,
    ...(section.settings?.bannerData as Partial<BannerItemData> || {}),
  };

  const update = (updates: Partial<BannerItemData>) => {
    setSetting(section.id, 'bannerData', { ...bannerData, ...updates });
  };

  const heightDesktop = (section.settings?.heightDesktop as number) || 300;
  const heightMobile = (section.settings?.heightMobile as number) || 200;
  const fullWidth = (section.settings?.fullWidth as boolean) ?? false;
  const borderRadius = (section.settings?.borderRadius as number) ?? 16;

  return (
    <div className="space-y-4">
      {/* Section-level settings */}
      <SettingsCard title="Configurações da Seção" icon={Layout}>
        <div className="grid grid-cols-2 gap-3">
          <FieldGroup label="Altura desktop" hint="Altura do banner em pixels no desktop">
            <div className="flex items-center gap-2">
              <Slider value={[heightDesktop]} onValueChange={([v]) => setSetting(section.id, 'heightDesktop', v)} min={120} max={600} step={10} className="flex-1" />
              <span className="text-[10px] text-muted-foreground w-10 text-right">{heightDesktop}px</span>
            </div>
          </FieldGroup>
          <FieldGroup label="Altura mobile" hint="Altura do banner em pixels no mobile">
            <div className="flex items-center gap-2">
              <Slider value={[heightMobile]} onValueChange={([v]) => setSetting(section.id, 'heightMobile', v)} min={100} max={400} step={10} className="flex-1" />
              <span className="text-[10px] text-muted-foreground w-10 text-right">{heightMobile}px</span>
            </div>
          </FieldGroup>
        </div>
        <FieldGroup label="Arredondamento">
          <div className="flex items-center gap-2">
            <Slider value={[borderRadius]} onValueChange={([v]) => setSetting(section.id, 'borderRadius', v)} min={0} max={32} step={2} className="flex-1" />
            <span className="text-[10px] text-muted-foreground w-8 text-right">{borderRadius}px</span>
          </div>
        </FieldGroup>
        <div className="flex items-center gap-3">
          <Switch checked={fullWidth} onCheckedChange={v => setSetting(section.id, 'fullWidth', v)} />
          <div>
            <p className="text-xs font-medium">Largura total</p>
            <p className="text-[10px] text-muted-foreground">Banner ocupa toda a largura da tela</p>
          </div>
        </div>
      </SettingsCard>

      {/* Banner content */}
      <BannerItemEditor data={bannerData} onChange={update} label="Conteúdo do Banner" />
    </div>
  );
}

/** Double / Triple Banner Editor */
export function MultiBannerEditor({ section, setSetting }: BannerEditorProps) {
  const isTriple = section.type === 'triple-banner';
  const count = isTriple ? 3 : 2;
  const layouts = isTriple ? TRIPLE_LAYOUTS : DOUBLE_LAYOUTS;

  const layout = (section.settings?.layout as string) || layouts[0].value;
  const heightDesktop = (section.settings?.heightDesktop as number) || 280;
  const heightMobile = (section.settings?.heightMobile as number) || 180;
  const gap = (section.settings?.gap as number) ?? 16;
  const borderRadius = (section.settings?.borderRadius as number) ?? 12;
  const mobileStack = (section.settings?.mobileStack as boolean) ?? true;

  const [activeTab, setActiveTab] = useState(0);

  // Get banner items
  const items: BannerItemData[] = Array.from({ length: count }, (_, i) => ({
    ...defaultBannerItem,
    ...(section.settings?.[`banner${i}`] as Partial<BannerItemData> || {}),
  }));

  const updateItem = (idx: number, updates: Partial<BannerItemData>) => {
    setSetting(section.id, `banner${idx}`, { ...items[idx], ...updates });
  };

  return (
    <div className="space-y-4">
      {/* Layout selector */}
      <SettingsCard title="Layout da Seção" icon={Layout}>
        <FieldGroup label="Organização dos banners">
          <div className="space-y-1">
            {layouts.map(l => (
              <button
                key={l.value}
                onClick={() => setSetting(section.id, 'layout', l.value)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all',
                  layout === l.value
                    ? 'bg-foreground/5 border border-foreground/20 shadow-sm'
                    : 'border border-transparent hover:bg-secondary/50'
                )}
              >
                <div className={cn(
                  'w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0',
                  layout === l.value ? 'border-foreground bg-foreground' : 'border-muted-foreground/30'
                )}>
                  {layout === l.value && <div className="w-1.5 h-1.5 rounded-full bg-background" />}
                </div>
                <div>
                  <p className="text-[12px] font-medium">{l.label}</p>
                  <p className="text-[10px] text-muted-foreground">{l.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </FieldGroup>
      </SettingsCard>

      {/* Dimensions */}
      <SettingsCard title="Dimensões e Espaçamento" icon={Monitor}>
        <div className="grid grid-cols-2 gap-3">
          <FieldGroup label="Altura desktop">
            <div className="flex items-center gap-2">
              <Slider value={[heightDesktop]} onValueChange={([v]) => setSetting(section.id, 'heightDesktop', v)} min={120} max={600} step={10} className="flex-1" />
              <span className="text-[10px] text-muted-foreground w-10 text-right">{heightDesktop}px</span>
            </div>
          </FieldGroup>
          <FieldGroup label="Altura mobile">
            <div className="flex items-center gap-2">
              <Slider value={[heightMobile]} onValueChange={([v]) => setSetting(section.id, 'heightMobile', v)} min={80} max={400} step={10} className="flex-1" />
              <span className="text-[10px] text-muted-foreground w-10 text-right">{heightMobile}px</span>
            </div>
          </FieldGroup>
        </div>
        <FieldGroup label="Espaço entre banners">
          <div className="flex items-center gap-2">
            <Slider value={[gap]} onValueChange={([v]) => setSetting(section.id, 'gap', v)} min={0} max={32} step={4} className="flex-1" />
            <span className="text-[10px] text-muted-foreground w-8 text-right">{gap}px</span>
          </div>
        </FieldGroup>
        <FieldGroup label="Arredondamento">
          <div className="flex items-center gap-2">
            <Slider value={[borderRadius]} onValueChange={([v]) => setSetting(section.id, 'borderRadius', v)} min={0} max={32} step={2} className="flex-1" />
            <span className="text-[10px] text-muted-foreground w-8 text-right">{borderRadius}px</span>
          </div>
        </FieldGroup>
      </SettingsCard>

      {/* Mobile behavior */}
      <SettingsCard title="Comportamento Mobile" icon={Smartphone}>
        <div className="flex items-center gap-3">
          <Switch checked={mobileStack} onCheckedChange={v => setSetting(section.id, 'mobileStack', v)} />
          <div>
            <p className="text-xs font-medium">Empilhar no mobile</p>
            <p className="text-[10px] text-muted-foreground">Banners ficam um abaixo do outro em telas pequenas</p>
          </div>
        </div>
      </SettingsCard>

      {/* Banner tabs */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-foreground">Configurar cada banner</p>
        <div className="flex gap-1.5">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={cn(
                'flex-1 py-2 rounded-lg text-xs font-medium transition-all border',
                activeTab === i
                  ? 'bg-foreground text-background border-foreground shadow-sm'
                  : 'bg-secondary/50 text-muted-foreground border-border/50 hover:bg-secondary'
              )}
            >
              Banner {i + 1}
            </button>
          ))}
        </div>

        <BannerItemEditor
          data={items[activeTab]}
          onChange={updates => updateItem(activeTab, updates)}
          label={`Banner ${activeTab + 1}`}
        />
      </div>
    </div>
  );
}
