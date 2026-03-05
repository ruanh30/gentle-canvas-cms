import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { ThemeHomepageSection } from '@/types/theme';
import { mockCategories, mockCollections } from '@/data/mock';
import { HintTooltip, SectionDivider } from '../EditorControls';
import {
  ChevronDown, ChevronUp, GripVertical, Eye, EyeOff, Trash2,
  Pencil, Check, X, Image, Video, Timer, LayoutGrid, ShoppingBag,
  FolderTree, Sparkles, Type, Star
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const sectionTypeIcons: Record<string, React.ElementType> = {
  banner: Image,
  'double-banner': LayoutGrid,
  'triple-banner': LayoutGrid,
  video: Video,
  countdown: Timer,
  'image-text': Image,
  collections: ShoppingBag,
  categories: FolderTree,
  'featured-products': Star,
  benefits: Sparkles,
  'trust-bar': Sparkles,
};

const sectionTypeLabels: Record<string, string> = {
  banner: 'Banner',
  'double-banner': 'Banner Duplo',
  'triple-banner': 'Banner Triplo',
  video: 'Vídeo',
  countdown: 'Contagem Regressiva',
  'image-text': 'Imagem + Texto',
  collections: 'Coleção de Produtos',
  categories: 'Categorias',
  'featured-products': 'Produtos em Destaque',
  benefits: 'Benefícios',
  'trust-bar': 'Barra de Confiança',
};

const carouselSections = ['categories', 'featured-products', 'collections'];

interface HomeSectionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HomeSectionsDialog({ open, onOpenChange }: HomeSectionsDialogProps) {
  const { draft, toggleSection, reorderSections, updateDraft } = useTheme();
  const sections = draft.homepageSections;
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const setSetting = (id: string, key: string, value: unknown) => {
    updateDraft({
      homepageSections: sections.map(s =>
        s.id === id ? { ...s, settings: { ...s.settings, [key]: value } } : s
      ),
    });
  };

  const removeSection = (id: string) => {
    updateDraft({ homepageSections: sections.filter(s => s.id !== id) });
    if (expandedId === id) setExpandedId(null);
  };

  const renameSection = (id: string, newTitle: string) => {
    updateDraft({
      homepageSections: sections.map(s => s.id === id ? { ...s, title: newTitle } : s),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-lg">Editor de Seções da Home</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Gerencie, edite e personalize cada seção da sua página inicial. Clique em uma seção para expandir suas configurações.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 max-h-[calc(85vh-120px)]">
          <div className="p-6 space-y-3">
            {sections.map((section, idx) => {
              const Icon = sectionTypeIcons[section.type] || Sparkles;
              const typeLabel = sectionTypeLabels[section.type] || section.type;
              const isExpanded = expandedId === section.id;

              return (
                <div
                  key={section.id}
                  className={cn(
                    'rounded-xl border transition-all duration-200',
                    isExpanded ? 'border-primary/30 shadow-sm' : 'border-border',
                    !section.enabled && 'opacity-50'
                  )}
                >
                  {/* Section header row */}
                  <div
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 cursor-pointer select-none',
                      isExpanded && 'border-b bg-muted/30'
                    )}
                    onClick={() => setExpandedId(isExpanded ? null : section.id)}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                        section.enabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                      )}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{section.title}</p>
                        <p className="text-[11px] text-muted-foreground">{typeLabel}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                      {/* Reorder */}
                      <button
                        onClick={() => idx > 0 && reorderSections(idx, idx - 1)}
                        disabled={idx === 0}
                        className="p-1.5 rounded-md hover:bg-secondary transition-colors disabled:opacity-30"
                        title="Mover para cima"
                      >
                        <ChevronUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => idx < sections.length - 1 && reorderSections(idx, idx + 1)}
                        disabled={idx === sections.length - 1}
                        className="p-1.5 rounded-md hover:bg-secondary transition-colors disabled:opacity-30"
                        title="Mover para baixo"
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </button>

                      {/* Toggle title visibility */}
                      <button
                        onClick={() => updateDraft({
                          homepageSections: sections.map(s => s.id === section.id ? { ...s, showTitle: !(s.showTitle ?? true) } : s),
                        })}
                        className="p-1.5 rounded-md hover:bg-secondary transition-colors"
                        title={section.showTitle !== false ? 'Ocultar título' : 'Mostrar título'}
                      >
                        {section.showTitle !== false ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => removeSection(section.id)}
                        className="p-1.5 rounded-md hover:bg-destructive/10 text-destructive transition-colors"
                        title="Remover seção"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>

                      {/* Enable/disable */}
                      <Switch
                        checked={section.enabled}
                        onCheckedChange={() => toggleSection(section.id)}
                        className="scale-90"
                      />
                    </div>

                    <ChevronDown className={cn(
                      'h-4 w-4 text-muted-foreground transition-transform duration-200 shrink-0',
                      isExpanded && 'rotate-180'
                    )} />
                  </div>

                  {/* Expanded settings */}
                  {isExpanded && (
                    <div className="p-4 space-y-4">
                      {/* Rename */}
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium">Nome da seção</Label>
                        <Input
                          value={section.title}
                          onChange={e => renameSection(section.id, e.target.value)}
                          className="h-9"
                        />
                      </div>

                      {/* Carousel/grid settings for applicable types */}
                      {carouselSections.includes(section.type) && (
                        <CarouselSettings section={section} setSetting={setSetting} />
                      )}

                      {/* Type-specific settings */}
                      {section.type === 'banner' && <BannerSettings section={section} setSetting={setSetting} />}
                      {(section.type === 'double-banner' || section.type === 'triple-banner') && (
                        <MultiBannerSettings section={section} setSetting={setSetting} />
                      )}
                      {section.type === 'video' && <VideoSettings section={section} setSetting={setSetting} />}
                      {section.type === 'countdown' && <CountdownSettings section={section} setSetting={setSetting} />}
                      {section.type === 'image-text' && <ImageTextSettings section={section} setSetting={setSetting} />}
                      {section.type === 'categories' && <CategorySettings section={section} setSetting={setSetting} />}
                    </div>
                  )}
                </div>
              );
            })}

            {sections.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <LayoutGrid className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Nenhuma seção adicionada ainda.</p>
                <p className="text-xs mt-1">Adicione seções pelo painel lateral.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

/* ── Setting sub-components ── */

function FieldGroup({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">
        {label}
        {hint && <HintTooltip text={hint} />}
      </Label>
      {children}
    </div>
  );
}

function TwoCol({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-4">{children}</div>;
}

interface SettingsProps {
  section: ThemeHomepageSection;
  setSetting: (id: string, key: string, value: unknown) => void;
}

function CarouselSettings({ section, setSetting }: SettingsProps) {
  const mode = (section.settings?.displayMode as string) || 'grid';
  return (
    <div className="space-y-3 p-3 rounded-lg bg-muted/30 border border-border/50">
      <p className="text-xs font-semibold text-foreground">Modo de exibição</p>
      <TwoCol>
        <FieldGroup label="Exibição">
          <select
            value={mode}
            onChange={e => setSetting(section.id, 'displayMode', e.target.value)}
            className="w-full h-9 text-sm rounded-md border border-border bg-background px-3"
          >
            <option value="grid">Grade</option>
            <option value="carousel">Carrossel</option>
          </select>
        </FieldGroup>
        {mode === 'carousel' && (
          <FieldGroup label="Velocidade" hint="Segundos entre transições">
            <div className="flex items-center gap-2">
              <input
                type="range" min={1} max={10}
                value={(section.settings?.carouselSpeed as number) || 4}
                onChange={e => setSetting(section.id, 'carouselSpeed', Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground w-6 text-right">{(section.settings?.carouselSpeed as number) || 4}s</span>
            </div>
          </FieldGroup>
        )}
      </TwoCol>
      {mode === 'carousel' && (
        <div className="flex items-center gap-3">
          <Switch
            checked={(section.settings?.showArrows as boolean) ?? true}
            onCheckedChange={v => setSetting(section.id, 'showArrows', v)}
          />
          <Label className="text-xs">Mostrar setas de navegação</Label>
        </div>
      )}
      {section.type === 'categories' && (
        <FieldGroup label={mode === 'carousel' ? 'Espaçamento do carrossel' : 'Espaçamento da grade'}>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={mode === 'carousel' ? 1 : 0}
              max={mode === 'carousel' ? 100 : 32}
              step={mode === 'carousel' ? 1 : 4}
              value={(section.settings?.[mode === 'carousel' ? 'carouselGap' : 'gridGap'] as number) ?? 16}
              onChange={e => setSetting(section.id, mode === 'carousel' ? 'carouselGap' : 'gridGap', Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-8 text-right">
              {(section.settings?.[mode === 'carousel' ? 'carouselGap' : 'gridGap'] as number) ?? 16}px
            </span>
          </div>
        </FieldGroup>
      )}
    </div>
  );
}

function BannerSettings({ section, setSetting }: SettingsProps) {
  return (
    <div className="space-y-3 p-3 rounded-lg bg-muted/30 border border-border/50">
      <p className="text-xs font-semibold text-foreground">Conteúdo do Banner</p>
      <TwoCol>
        <FieldGroup label="Título">
          <Input value={(section.settings?.title as string) || ''} onChange={e => setSetting(section.id, 'title', e.target.value)} placeholder="Título do banner" className="h-9" />
        </FieldGroup>
        <FieldGroup label="Descrição">
          <Input value={(section.settings?.description as string) || ''} onChange={e => setSetting(section.id, 'description', e.target.value)} placeholder="Descrição do banner" className="h-9" />
        </FieldGroup>
      </TwoCol>
      <FieldGroup label="Imagem de fundo (URL)">
        <Input value={(section.settings?.backgroundImage as string) || ''} onChange={e => setSetting(section.id, 'backgroundImage', e.target.value)} placeholder="https://exemplo.com/imagem.jpg" className="h-9" />
        {(section.settings?.backgroundImage as string) && (
          <div className="mt-2 rounded-lg overflow-hidden border border-border/50 h-24">
            <img src={section.settings.backgroundImage as string} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </FieldGroup>
      <TwoCol>
        <FieldGroup label="Texto do botão">
          <Input value={(section.settings?.ctaText as string) || ''} onChange={e => setSetting(section.id, 'ctaText', e.target.value)} placeholder="Ver mais" className="h-9" />
        </FieldGroup>
        <FieldGroup label="Link do botão">
          <Input value={(section.settings?.ctaLink as string) || ''} onChange={e => setSetting(section.id, 'ctaLink', e.target.value)} placeholder="/products" className="h-9" />
        </FieldGroup>
      </TwoCol>
    </div>
  );
}

function MultiBannerSettings({ section, setSetting }: SettingsProps) {
  const count = section.type === 'triple-banner' ? 3 : 2;
  return (
    <div className="space-y-3 p-3 rounded-lg bg-muted/30 border border-border/50">
      <p className="text-xs font-semibold text-foreground">Imagens e Links</p>
      <div className={cn('grid gap-4', count === 3 ? 'grid-cols-3' : 'grid-cols-2')}>
        {Array.from({ length: count }, (_, i) => i + 1).map(n => (
          <div key={n} className="space-y-2 p-3 rounded-lg bg-background border border-border/30">
            <p className="text-xs font-medium">Banner {n}</p>
            <FieldGroup label="Imagem (URL)">
              <Input value={(section.settings?.[`image${n}`] as string) || ''} onChange={e => setSetting(section.id, `image${n}`, e.target.value)} placeholder="https://..." className="h-9" />
            </FieldGroup>
            <FieldGroup label="Link">
              <Input value={(section.settings?.[`link${n}`] as string) || ''} onChange={e => setSetting(section.id, `link${n}`, e.target.value)} placeholder="/products" className="h-9" />
            </FieldGroup>
          </div>
        ))}
      </div>
    </div>
  );
}

function VideoSettings({ section, setSetting }: SettingsProps) {
  return (
    <div className="space-y-3 p-3 rounded-lg bg-muted/30 border border-border/50">
      <p className="text-xs font-semibold text-foreground">Configuração do Vídeo</p>
      <FieldGroup label="URL do vídeo" hint="Cole o link do YouTube ou URL direta do vídeo">
        <Input value={(section.settings?.url as string) || ''} onChange={e => setSetting(section.id, 'url', e.target.value)} placeholder="https://youtube.com/watch?v=..." className="h-9" />
      </FieldGroup>
      <TwoCol>
        <FieldGroup label="Provedor">
          <select
            value={(section.settings?.provider as string) || 'youtube'}
            onChange={e => setSetting(section.id, 'provider', e.target.value)}
            className="w-full h-9 text-sm rounded-md border border-border bg-background px-3"
          >
            <option value="youtube">YouTube</option>
            <option value="direct">Vídeo direto (URL)</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Reprodução automática">
          <div className="flex items-center gap-2 h-9">
            <Switch
              checked={(section.settings?.autoplay as boolean) ?? false}
              onCheckedChange={v => setSetting(section.id, 'autoplay', v)}
            />
            <span className="text-xs text-muted-foreground">Autoplay (sem som)</span>
          </div>
        </FieldGroup>
      </TwoCol>
    </div>
  );
}

function CountdownSettings({ section, setSetting }: SettingsProps) {
  return (
    <div className="space-y-3 p-3 rounded-lg bg-muted/30 border border-border/50">
      <p className="text-xs font-semibold text-foreground">Contagem Regressiva</p>
      <TwoCol>
        <FieldGroup label="Data alvo">
          <Input type="datetime-local" value={(section.settings?.targetDate as string) || ''} onChange={e => setSetting(section.id, 'targetDate', e.target.value)} className="h-9" />
        </FieldGroup>
        <FieldGroup label="Texto auxiliar">
          <Input value={(section.settings?.label as string) || ''} onChange={e => setSetting(section.id, 'label', e.target.value)} placeholder="Promoção termina em" className="h-9" />
        </FieldGroup>
      </TwoCol>
      <TwoCol>
        <FieldGroup label="Cor de fundo">
          <div className="flex items-center gap-2">
            <input type="color" value={(section.settings?.backgroundColor as string) || '#1a1a1a'} onChange={e => setSetting(section.id, 'backgroundColor', e.target.value)} className="h-9 w-10 rounded-md border border-border cursor-pointer" />
            <Input value={(section.settings?.backgroundColor as string) || '#1a1a1a'} onChange={e => setSetting(section.id, 'backgroundColor', e.target.value)} className="h-9 font-mono text-xs uppercase" maxLength={7} />
          </div>
        </FieldGroup>
        <FieldGroup label="Cor do texto">
          <div className="flex items-center gap-2">
            <input type="color" value={(section.settings?.textColor as string) || '#ffffff'} onChange={e => setSetting(section.id, 'textColor', e.target.value)} className="h-9 w-10 rounded-md border border-border cursor-pointer" />
            <Input value={(section.settings?.textColor as string) || '#ffffff'} onChange={e => setSetting(section.id, 'textColor', e.target.value)} className="h-9 font-mono text-xs uppercase" maxLength={7} />
          </div>
        </FieldGroup>
      </TwoCol>
    </div>
  );
}

function ImageTextSettings({ section, setSetting }: SettingsProps) {
  return (
    <div className="space-y-3 p-3 rounded-lg bg-muted/30 border border-border/50">
      <p className="text-xs font-semibold text-foreground">Imagem + Texto</p>
      <FieldGroup label="Imagem (URL)">
        <Input value={(section.settings?.imageUrl as string) || ''} onChange={e => setSetting(section.id, 'imageUrl', e.target.value)} placeholder="https://exemplo.com/imagem.jpg" className="h-9" />
        {(section.settings?.imageUrl as string) && (
          <div className="mt-2 rounded-lg overflow-hidden border border-border/50 h-24">
            <img src={section.settings.imageUrl as string} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </FieldGroup>
      <TwoCol>
        <FieldGroup label="Título">
          <Input value={(section.settings?.title as string) || ''} onChange={e => setSetting(section.id, 'title', e.target.value)} placeholder="Título da seção" className="h-9" />
        </FieldGroup>
        <FieldGroup label="Posição da imagem">
          <select
            value={(section.settings?.imagePosition as string) || 'left'}
            onChange={e => setSetting(section.id, 'imagePosition', e.target.value)}
            className="w-full h-9 text-sm rounded-md border border-border bg-background px-3"
          >
            <option value="left">Esquerda</option>
            <option value="right">Direita</option>
          </select>
        </FieldGroup>
      </TwoCol>
      <FieldGroup label="Descrição">
        <textarea
          value={(section.settings?.description as string) || ''}
          onChange={e => setSetting(section.id, 'description', e.target.value)}
          placeholder="Texto descritivo..."
          className="w-full text-sm rounded-md border border-border bg-background px-3 py-2 min-h-[80px] resize-y"
        />
      </FieldGroup>
      <TwoCol>
        <FieldGroup label="Texto do botão">
          <Input value={(section.settings?.ctaText as string) || ''} onChange={e => setSetting(section.id, 'ctaText', e.target.value)} placeholder="Saiba mais" className="h-9" />
        </FieldGroup>
        <FieldGroup label="Link do botão">
          <Input value={(section.settings?.ctaLink as string) || ''} onChange={e => setSetting(section.id, 'ctaLink', e.target.value)} placeholder="/products" className="h-9" />
        </FieldGroup>
      </TwoCol>
    </div>
  );
}

function CategorySettings({ section, setSetting }: SettingsProps) {
  return (
    <div className="space-y-4">
      {/* Appearance */}
      <div className="space-y-3 p-3 rounded-lg bg-muted/30 border border-border/50">
        <p className="text-xs font-semibold text-foreground">Aparência das Categorias</p>
        <div className="flex items-center gap-3">
          <Switch
            checked={(section.settings?.showImage as boolean) ?? true}
            onCheckedChange={v => setSetting(section.id, 'showImage', v)}
          />
          <Label className="text-xs">Mostrar imagem da categoria</Label>
        </div>
        {(section.settings?.showImage as boolean) !== false && (
          <TwoCol>
            <FieldGroup label="Formato">
              <select
                value={(section.settings?.imageShape as string) || 'circle'}
                onChange={e => setSetting(section.id, 'imageShape', e.target.value)}
                className="w-full h-9 text-sm rounded-md border border-border bg-background px-3"
              >
                <option value="circle">Circular</option>
                <option value="rounded">Arredondado</option>
                <option value="square">Quadrado</option>
              </select>
            </FieldGroup>
            <FieldGroup label="Tamanho">
              <div className="flex items-center gap-2">
                <input type="range" min={60} max={140} step={10}
                  value={(section.settings?.imageSize as number) || 80}
                  onChange={e => setSetting(section.id, 'imageSize', Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-10 text-right">{(section.settings?.imageSize as number) || 80}px</span>
              </div>
            </FieldGroup>
          </TwoCol>
        )}
        {(section.settings?.showImage as boolean) !== false && (
          <>
            <div className="flex items-center gap-3">
              <Switch
                checked={(section.settings?.imageBorder as boolean) ?? false}
                onCheckedChange={v => setSetting(section.id, 'imageBorder', v)}
              />
              <Label className="text-xs">Borda na imagem</Label>
            </div>
            {(section.settings?.imageBorder as boolean) && (
              <TwoCol>
                <FieldGroup label="Largura da borda">
                  <div className="flex items-center gap-2">
                    <input type="range" min={1} max={6} step={1}
                      value={(section.settings?.imageBorderWidth as number) || 2}
                      onChange={e => setSetting(section.id, 'imageBorderWidth', Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-xs text-muted-foreground w-6 text-right">{(section.settings?.imageBorderWidth as number) || 2}px</span>
                  </div>
                </FieldGroup>
                <FieldGroup label="Cor da borda">
                  <div className="flex items-center gap-2">
                    <input type="color"
                      value={(section.settings?.imageBorderColor as string) || '#e91e8c'}
                      onChange={e => setSetting(section.id, 'imageBorderColor', e.target.value)}
                      className="h-9 w-10 rounded-md border border-border cursor-pointer"
                    />
                    <Input value={(section.settings?.imageBorderColor as string) || '#e91e8c'} onChange={e => setSetting(section.id, 'imageBorderColor', e.target.value)} className="h-9 font-mono text-xs" maxLength={7} />
                  </div>
                </FieldGroup>
              </TwoCol>
            )}
          </>
        )}
      </div>

      {/* Category selection */}
      <div className="space-y-3 p-3 rounded-lg bg-muted/30 border border-border/50">
        <p className="text-xs font-semibold text-foreground">Categorias em destaque</p>
        <p className="text-[11px] text-muted-foreground">Selecione quais categorias aparecem nesta seção:</p>
        <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto">
          {mockCategories.map(cat => {
            const selectedIds = (section.settings?.selectedCategoryIds as string[]) || [];
            const isSelected = selectedIds.includes(cat.id);
            return (
              <label
                key={cat.id}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm',
                  isSelected ? 'bg-primary/10 text-foreground border border-primary/20' : 'hover:bg-muted/50 text-muted-foreground border border-transparent'
                )}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={(checked) => {
                    const newIds = checked
                      ? [...selectedIds, cat.id]
                      : selectedIds.filter(id => id !== cat.id);
                    setSetting(section.id, 'selectedCategoryIds', newIds);
                  }}
                />
                {cat.image && (
                  <img src={cat.image} alt={cat.name} className="h-6 w-6 rounded-full object-cover shrink-0" />
                )}
                <span className="truncate">{cat.name}</span>
              </label>
            );
          })}
        </div>
        {((section.settings?.selectedCategoryIds as string[]) || []).length === 0 && (
          <p className="text-[11px] text-amber-500">Nenhuma selecionada — todas serão exibidas por padrão.</p>
        )}
      </div>
    </div>
  );
}
