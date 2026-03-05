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
import { HintTooltip } from '../EditorControls';
import {
  ChevronDown, ChevronUp, Eye, EyeOff, Trash2, Plus,
  Image, Video, Timer, LayoutGrid, ShoppingBag,
  FolderTree, Sparkles, Star, Type as TypeIcon, MousePointer,
  Truck, RefreshCw, ShieldCheck, CreditCard, Lock, DatabaseBackup, PackageCheck,
  Heart, Gift, Clock, Headphones, MapPin, Zap, Award, ThumbsUp, CheckCircle,
  Phone, Mail, Globe, Percent, Tag, Flame, BadgeCheck, Gem, Crown,
  icons as lucideIcons
} from 'lucide-react';
import { SingleBannerEditor, MultiBannerEditor } from './BannerSectionEditor';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MediaPickerModal } from '../MediaPickerModal';
import SecureFileUpload from '@/components/admin/SecureFileUpload';

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
  'trust-bar': 'Barra de Confiança',
  benefits: 'Benefícios',
  categories: 'Categorias',
  collections: 'Coleção de Produtos',
  countdown: 'Contagem Regressiva',
  'image-text': 'Imagem + Texto',
  'featured-products': 'Produtos em Destaque',
  video: 'Vídeo',
};

const carouselSections = ['categories', 'featured-products', 'collections'];

interface HomeSectionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HomeSectionsDialog({ open, onOpenChange }: HomeSectionsDialogProps) {
  const { draft, toggleSection, reorderSections, updateDraft } = useTheme();
  const sections = draft.homepageSections;
  const [selectedId, setSelectedId] = useState<string | null>(sections[0]?.id || null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSectionType, setNewSectionType] = useState<ThemeHomepageSection['type']>('banner');
  const [newSectionName, setNewSectionName] = useState('');
  const [newCollectionId, setNewCollectionId] = useState('');

  const selectedSection = sections.find(s => s.id === selectedId);

  const setSetting = (id: string, key: string, value: unknown) => {
    updateDraft({
      homepageSections: sections.map(s =>
        s.id === id ? { ...s, settings: { ...s.settings, [key]: value } } : s
      ),
    });
  };

  const setSettings = (id: string, updates: Record<string, unknown>) => {
    updateDraft({
      homepageSections: sections.map(s =>
        s.id === id ? { ...s, settings: { ...s.settings, ...updates } } : s
      ),
    });
  };

  const removeSection = (id: string) => {
    updateDraft({ homepageSections: sections.filter(s => s.id !== id) });
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const renameSection = (id: string, newTitle: string) => {
    updateDraft({
      homepageSections: sections.map(s => s.id === id ? { ...s, title: newTitle } : s),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 gap-0 flex flex-col">
        <DialogHeader className="px-6 pt-5 pb-3 border-b shrink-0 space-y-2">
          <DialogTitle className="text-base">Editor de Seções da Home</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Selecione uma seção à esquerda para editar suas configurações à direita.
          </DialogDescription>
          <p className="text-xs font-semibold text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
            A ordem das seções na lista é exatamente a ordem em que elas aparecem no seu site. Arraste ou use os botões para reorganizar.
          </p>
        </DialogHeader>

        <div className="flex flex-1 min-h-0">
          {/* LEFT: Section list */}
          <div className="w-64 border-r flex flex-col shrink-0">
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-0.5">
                {sections.map((section, idx) => {
                  const Icon = sectionTypeIcons[section.type] || Sparkles;
                  const isSelected = selectedId === section.id;

                  return (
                    <div key={section.id} className="group">
                      <button
                        onClick={() => setSelectedId(section.id)}
                        className={cn(
                          'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all duration-150',
                          isSelected
                            ? 'bg-primary/10 text-foreground ring-1 ring-primary/20'
                            : 'hover:bg-muted/60 text-muted-foreground hover:text-foreground',
                          !section.enabled && 'opacity-50'
                        )}
                      >
                        <div className={cn(
                          'w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors',
                          isSelected ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'
                        )}>
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{section.title}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{sectionTypeLabels[section.type]}</p>
                        </div>
                      {!section.enabled && (
                          <EyeOff className="h-3 w-3 text-muted-foreground shrink-0" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Add section button/form */}
            <div className="border-t p-2 shrink-0">
              {!showAddForm ? (
                <button
                  onClick={() => { setShowAddForm(true); setNewSectionType('banner'); setNewSectionName(''); setNewCollectionId(''); }}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-border text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Adicionar seção
                </button>
              ) : (
                <div className="space-y-2">
                  <select
                    value={newSectionType}
                    onChange={e => {
                      const t = e.target.value as ThemeHomepageSection['type'];
                      setNewSectionType(t);
                      setNewCollectionId('');
                      if (t !== 'collections') {
                        setNewSectionName(sectionTypeLabels[t] || '');
                      } else {
                        setNewSectionName('');
                      }
                    }}
                    className="w-full h-8 text-xs rounded-md border border-border bg-background px-2"
                  >
                    {Object.entries(sectionTypeLabels).map(([type, label]) => (
                      <option key={type} value={type}>{label}</option>
                    ))}
                  </select>
                  {newSectionType === 'collections' ? (
                    <select
                      value={newCollectionId}
                      onChange={e => {
                        setNewCollectionId(e.target.value);
                        const col = mockCollections.find(c => c.id === e.target.value);
                        if (col) setNewSectionName(col.name);
                      }}
                      className="w-full h-8 text-xs rounded-md border border-border bg-background px-2"
                    >
                      <option value="">— Escolha uma coleção —</option>
                      {mockCollections.filter(c => c.active).map(col => (
                        <option key={col.id} value={col.id}>{col.name}</option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      value={newSectionName}
                      onChange={e => setNewSectionName(e.target.value)}
                      placeholder="Nome da seção"
                      className="h-8 text-xs"
                    />
                  )}
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => {
                        if (newSectionType === 'collections' && !newCollectionId) return;
                        const label = newSectionName.trim() || sectionTypeLabels[newSectionType] || 'Nova seção';
                        const newSection: ThemeHomepageSection = {
                          id: newSectionType === 'collections' ? newCollectionId : `${newSectionType}-${Date.now()}`,
                          type: newSectionType,
                          enabled: true,
                          title: label,
                          showTitle: !['trust-bar', 'benefits', 'video', 'countdown', 'banner', 'double-banner', 'triple-banner'].includes(newSectionType),
                          settings: newSectionType === 'collections' ? { collectionId: newCollectionId } : {},
                        };
                        updateDraft({ homepageSections: [...sections, newSection] });
                        setSelectedId(newSection.id);
                        setShowAddForm(false);
                      }}
                      disabled={newSectionType === 'collections' && !newCollectionId}
                      className="flex-1 h-8 rounded-lg bg-foreground text-background text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
                    >
                      Adicionar
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 h-8 rounded-lg border border-border text-xs font-medium hover:bg-muted/50 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Settings panel */}
          <div className="flex-1 min-w-0">
            <ScrollArea className="h-full">
              {selectedSection ? (
                <div className="p-6 space-y-5">
                  {/* Header: name + active toggle */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 space-y-1.5">
                      <Label className="text-xs font-medium text-muted-foreground">Nome da seção</Label>
                      <Input
                        value={selectedSection.title}
                        onChange={e => renameSection(selectedSection.id, e.target.value)}
                        className="h-9"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-5">
                      <Label className="text-xs text-muted-foreground">Ativa</Label>
                      <Switch
                        checked={selectedSection.enabled}
                        onCheckedChange={() => toggleSection(selectedSection.id)}
                      />
                    </div>
                  </div>

                  {/* Ordering, visibility & delete controls */}
                  {(() => {
                    const idx = sections.findIndex(s => s.id === selectedSection.id);
                    return (
                      <div className="grid grid-cols-2 gap-3">
                        {/* Move up */}
                        <button
                          onClick={() => { if (idx > 0) reorderSections(idx, idx - 1); }}
                          disabled={idx === 0}
                          className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 transition-colors disabled:opacity-30 text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shrink-0 border border-border/50">
                            <ChevronUp className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs font-medium">Mover para cima</p>
                            <p className="text-[10px] text-muted-foreground">Sobe a posição desta seção na página</p>
                          </div>
                        </button>

                        {/* Move down */}
                        <button
                          onClick={() => { if (idx < sections.length - 1) reorderSections(idx, idx + 1); }}
                          disabled={idx === sections.length - 1}
                          className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 transition-colors disabled:opacity-30 text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shrink-0 border border-border/50">
                            <ChevronDown className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs font-medium">Mover para baixo</p>
                            <p className="text-[10px] text-muted-foreground">Desce a posição desta seção na página</p>
                          </div>
                        </button>

                        {/* Toggle title */}
                        <button
                          onClick={() => updateDraft({
                            homepageSections: sections.map(s => s.id === selectedSection.id ? { ...s, showTitle: !(s.showTitle ?? true) } : s),
                          })}
                          className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shrink-0 border border-border/50">
                            {selectedSection.showTitle !== false ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="text-xs font-medium">
                              {selectedSection.showTitle !== false ? 'Título visível' : 'Título oculto'}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              {selectedSection.showTitle !== false
                                ? 'O título desta seção aparece na loja'
                                : 'O título desta seção está oculto na loja'}
                            </p>
                          </div>
                        </button>

                        {/* Title alignment - only when title is visible */}
                        {selectedSection.showTitle !== false && (
                          <div className="col-span-2 flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/30">
                            <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shrink-0 border border-border/50">
                              <TypeIcon className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-medium">Alinhamento do título</p>
                              <p className="text-[10px] text-muted-foreground">Define onde o título aparece na seção</p>
                            </div>
                            <div className="flex items-center gap-1 bg-background rounded-lg border border-border/50 p-0.5">
                              {([
                                { value: 'left', label: 'Esquerda' },
                                { value: 'center', label: 'Centro' },
                                { value: 'right', label: 'Direita' },
                              ] as const).map(opt => (
                                <button
                                  key={opt.value}
                                  onClick={() => setSetting(selectedSection.id, 'titleAlign', opt.value)}
                                  className={cn(
                                    'px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors',
                                    (selectedSection.settings?.titleAlign as string || 'left') === opt.value
                                      ? 'bg-foreground text-background'
                                      : 'text-muted-foreground hover:text-foreground'
                                  )}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}


                        <button
                          onClick={() => removeSection(selectedSection.id)}
                          className="flex items-center gap-3 p-3 rounded-xl border border-destructive/20 bg-destructive/5 hover:bg-destructive/10 transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shrink-0 border border-destructive/20">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-destructive">Remover seção</p>
                            <p className="text-[10px] text-muted-foreground">Remove permanentemente esta seção da home</p>
                          </div>
                        </button>
                      </div>
                    );
                  })()}

                  {/* Type-specific settings */}
                  {carouselSections.includes(selectedSection.type) && (
                    <CarouselSettings section={selectedSection} setSetting={setSetting} />
                  )}
                  {selectedSection.type === 'banner' && <SingleBannerEditor section={selectedSection} setSetting={setSetting} />}
                  {(selectedSection.type === 'double-banner' || selectedSection.type === 'triple-banner') && (
                    <MultiBannerEditor section={selectedSection} setSetting={setSetting} />
                  )}
                  {selectedSection.type === 'video' && <VideoSettings section={selectedSection} setSetting={setSetting} setSettings={setSettings} />}
                  {selectedSection.type === 'countdown' && <CountdownSettings section={selectedSection} setSetting={setSetting} />}
                  {selectedSection.type === 'image-text' && <ImageTextSettings section={selectedSection} setSetting={setSetting} />}
                  {selectedSection.type === 'categories' && <CategorySettings section={selectedSection} setSetting={setSetting} />}
                  {selectedSection.type === 'benefits' && <BenefitsSettings section={selectedSection} setSetting={setSetting} />}
                  {selectedSection.type === 'trust-bar' && <TrustBarSettings section={selectedSection} setSetting={setSetting} />}

                  {/* Fallback for types without settings */}
                  {!carouselSections.includes(selectedSection.type) &&
                    !['banner', 'double-banner', 'triple-banner', 'video', 'countdown', 'image-text', 'categories', 'benefits', 'trust-bar'].includes(selectedSection.type) && (
                    <div className="text-center py-8 text-muted-foreground">
                      <MousePointer className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">Esta seção não possui configurações adicionais.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center py-16">
                    <MousePointer className="h-10 w-10 mx-auto mb-3 opacity-20" />
                    <p className="text-sm">Selecione uma seção à esquerda</p>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ── Reusable layout helpers ── */

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

function SettingsCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3 p-4 rounded-xl bg-muted/30 border border-border/50">
      <p className="text-xs font-semibold text-foreground">{title}</p>
      {children}
    </div>
  );
}

interface SettingsProps {
  section: ThemeHomepageSection;
  setSetting: (id: string, key: string, value: unknown) => void;
  setSettings?: (id: string, updates: Record<string, unknown>) => void;
}

/* ── Type-specific settings ── */

function CarouselSettings({ section, setSetting }: SettingsProps) {
  const mode = (section.settings?.displayMode as string) || 'grid';
  return (
    <SettingsCard title="Modo de exibição">
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
              <input type="range" min={1} max={10}
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
        <>
          <FieldGroup label={mode === 'carousel' ? 'Espaçamento do carrossel' : 'Espaçamento da grade'}>
            <div className="flex items-center gap-2">
              <input type="range"
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
          {mode === 'carousel' && (
            <FieldGroup label="Espaçamento do carrossel mobile" hint="Espaçamento entre itens no celular">
              <div className="flex items-center gap-2">
                <input type="range" min={1} max={100} step={1}
                  value={(section.settings?.carouselGapMobile as number) ?? (section.settings?.carouselGap as number) ?? 16}
                  onChange={e => setSetting(section.id, 'carouselGapMobile', Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {(section.settings?.carouselGapMobile as number) ?? (section.settings?.carouselGap as number) ?? 16}px
                </span>
              </div>
            </FieldGroup>
          )}
        </>
      )}
    </SettingsCard>
  );
}

function BannerSettings({ section, setSetting }: SettingsProps) {
  return (
    <SettingsCard title="Conteúdo do Banner">
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
          <div className="mt-2 rounded-lg overflow-hidden border border-border/50 h-28">
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
    </SettingsCard>
  );
}

function MultiBannerSettings({ section, setSetting }: SettingsProps) {
  const count = section.type === 'triple-banner' ? 3 : 2;
  return (
    <SettingsCard title="Imagens e Links">
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
    </SettingsCard>
  );
}

function VideoSettings({ section, setSetting, setSettings }: SettingsProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const provider = (section.settings?.provider as string) || 'youtube';
  const url = (section.settings?.url as string) || '';

  return (
    <SettingsCard title="Configuração do Vídeo">
      <FieldGroup label="Origem do vídeo">
        <select
          value={provider}
          onChange={e => {
            setSettings?.(section.id, { provider: e.target.value, url: '' });
          }}
          className="w-full h-9 text-sm rounded-md border border-border bg-background px-3"
        >
          <option value="youtube">YouTube</option>
          <option value="gallery">Galeria de mídia</option>
          <option value="upload">Upload de vídeo</option>
        </select>
      </FieldGroup>

      {provider === 'youtube' && (
        <FieldGroup label="Link do YouTube" hint="Cole o link do vídeo do YouTube">
          <Input
            value={url}
            onChange={e => {
              const v = e.target.value;
              const lower = v.toLowerCase().replace(/\s/g, '');
              if (lower.startsWith('javascript:') || lower.startsWith('vbscript:')) return;
              setSetting(section.id, 'url', v);
            }}
            placeholder="https://youtube.com/watch?v=..."
            className="h-9"
          />
        </FieldGroup>
      )}

      {provider === 'gallery' && (
        <FieldGroup label="Vídeo da galeria">
          {url ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-secondary/50 border border-border/30">
                <Video className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-xs text-foreground truncate flex-1">Vídeo selecionado</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPickerOpen(true)}
                  className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Image className="h-3.5 w-3.5" />
                  Trocar
                </button>
                <button
                  onClick={() => setSetting(section.id, 'url', '')}
                  className="flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg border border-destructive/30 bg-destructive/5 hover:bg-destructive/10 text-xs font-medium text-destructive transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remover
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setPickerOpen(true)}
              className="w-full flex items-center justify-center gap-1.5 h-9 rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Image className="h-3.5 w-3.5" />
              Selecionar da galeria
            </button>
          )}
          <MediaPickerModal
            open={pickerOpen}
            onClose={() => setPickerOpen(false)}
            onSelect={(v) => setSetting(section.id, 'url', v)}
            currentValue={url}
            accept="video/mp4,video/webm,.mp4,.webm"
          />
        </FieldGroup>
      )}

      {provider === 'upload' && (
        <FieldGroup label="Upload de vídeo">
          {url ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-secondary/50 border border-border/30">
                <Video className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-xs text-foreground truncate flex-1">Vídeo carregado</span>
              </div>
              <button
                onClick={() => setSetting(section.id, 'url', '')}
                className="w-full flex items-center justify-center gap-1.5 h-9 rounded-lg border border-destructive/30 bg-destructive/5 hover:bg-destructive/10 text-xs font-medium text-destructive transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remover vídeo
              </button>
            </div>
          ) : (
            <SecureFileUpload
              onFileAccepted={(dataUrl) => setSetting(section.id, 'url', dataUrl)}
              accept="video/mp4,video/webm,.mp4,.webm"
              compact
            />
          )}
        </FieldGroup>
      )}

      <FieldGroup label="Reprodução automática">
        <div className="flex items-center gap-2 h-9">
          <Switch
            checked={(section.settings?.autoplay as boolean) ?? false}
            onCheckedChange={v => setSetting(section.id, 'autoplay', v)}
          />
          <span className="text-xs text-muted-foreground">Autoplay (sem som)</span>
        </div>
      </FieldGroup>
    </SettingsCard>
  );
}

function CountdownSettings({ section, setSetting }: SettingsProps) {
  const [bgPickerOpen, setBgPickerOpen] = useState(false);
  const bgType = (section.settings?.bgType as string) || 'solid';

  return (
    <>
      {/* ── Conteúdo ── */}
      <SettingsCard title="Conteúdo">
        <FieldGroup label="Título principal" hint="Ex: Oferta relâmpago, Black Friday">
          <Input value={(section.settings?.headline as string) || ''} onChange={e => setSetting(section.id, 'headline', e.target.value)} placeholder="Oferta relâmpago" className="h-9" />
        </FieldGroup>
        <FieldGroup label="Subtítulo">
          <Input value={(section.settings?.subtitle as string) || ''} onChange={e => setSetting(section.id, 'subtitle', e.target.value)} placeholder="Aproveite antes que acabe!" className="h-9" />
        </FieldGroup>
        <FieldGroup label="Texto auxiliar do contador">
          <Input value={(section.settings?.label as string) || ''} onChange={e => setSetting(section.id, 'label', e.target.value)} placeholder="Promoção termina em" className="h-9" />
        </FieldGroup>
        <TwoCol>
          <FieldGroup label="Texto do botão">
            <Input value={(section.settings?.ctaText as string) || ''} onChange={e => setSetting(section.id, 'ctaText', e.target.value)} placeholder="Ver ofertas" className="h-9" />
          </FieldGroup>
          <FieldGroup label="Destino do botão">
            <select
              value={(section.settings?.ctaDestType as string) || 'custom'}
              onChange={e => setSetting(section.id, 'ctaDestType', e.target.value)}
              className="w-full h-9 text-sm rounded-md border border-border bg-background px-3"
            >
              <option value="catalog">Catálogo (todos os produtos)</option>
              <option value="collection">Coleção</option>
              <option value="custom">Link personalizado</option>
            </select>
          </FieldGroup>
        </TwoCol>
        {(section.settings?.ctaDestType as string) === 'collection' && (
          <FieldGroup label="Coleção">
            <select
              value={(section.settings?.ctaCollectionId as string) || ''}
              onChange={e => setSetting(section.id, 'ctaCollectionId', e.target.value)}
              className="w-full h-9 text-sm rounded-md border border-border bg-background px-3"
            >
              <option value="">Selecione...</option>
              {mockCollections.filter(c => c.active).map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </FieldGroup>
        )}
        {(section.settings?.ctaDestType as string) === 'custom' && (
          <FieldGroup label="Link personalizado">
            <Input value={(section.settings?.ctaLink as string) || ''} onChange={e => setSetting(section.id, 'ctaLink', e.target.value)} placeholder="/produtos" className="h-9" />
          </FieldGroup>
        )}
      </SettingsCard>

      {/* ── Contador ── */}
      <SettingsCard title="Contador">
        <TwoCol>
          <FieldGroup label="Data alvo">
            <Input type="datetime-local" value={(section.settings?.targetDate as string) || ''} onChange={e => setSetting(section.id, 'targetDate', e.target.value)} className="h-9" />
          </FieldGroup>
          <FieldGroup label="Estilo do contador">
            <select
              value={(section.settings?.counterStyle as string) || 'boxes'}
              onChange={e => setSetting(section.id, 'counterStyle', e.target.value)}
              className="w-full h-9 text-sm rounded-md border border-border bg-background px-3"
            >
              <option value="minimal">Minimalista</option>
              <option value="boxes">Caixas</option>
              <option value="bold">Destaque</option>
            </select>
          </FieldGroup>
        </TwoCol>
        <FieldGroup label="Unidades visíveis">
          <div className="flex gap-3">
            {[
              { key: 'showDays', label: 'Dias' },
              { key: 'showHours', label: 'Horas' },
              { key: 'showMinutes', label: 'Minutos' },
              { key: 'showSeconds', label: 'Segundos' },
            ].map(u => (
              <label key={u.key} className="flex items-center gap-1.5 text-xs">
                <Checkbox
                  checked={(section.settings?.[u.key] as boolean) ?? true}
                  onCheckedChange={v => setSetting(section.id, u.key, v)}
                />
                {u.label}
              </label>
            ))}
          </div>
        </FieldGroup>
      </SettingsCard>

      {/* ── Layout ── */}
      <SettingsCard title="Layout">
        <TwoCol>
          <FieldGroup label="Alinhamento">
            <select
              value={(section.settings?.align as string) || 'center'}
              onChange={e => setSetting(section.id, 'align', e.target.value)}
              className="w-full h-9 text-sm rounded-md border border-border bg-background px-3"
            >
              <option value="left">Esquerda</option>
              <option value="center">Centro</option>
              <option value="right">Direita</option>
            </select>
          </FieldGroup>
          <FieldGroup label="Altura da seção">
            <select
              value={(section.settings?.sectionHeight as string) || 'auto'}
              onChange={e => setSetting(section.id, 'sectionHeight', e.target.value)}
              className="w-full h-9 text-sm rounded-md border border-border bg-background px-3"
            >
              <option value="compact">Faixa compacta</option>
              <option value="auto">Normal</option>
              <option value="tall">Grande</option>
              <option value="hero">Destaque (hero)</option>
            </select>
          </FieldGroup>
        </TwoCol>
      </SettingsCard>

      {/* ── Estilo visual ── */}
      <SettingsCard title="Estilo Visual">
        <FieldGroup label="Tipo de fundo">
          <select
            value={bgType}
            onChange={e => setSetting(section.id, 'bgType', e.target.value)}
            className="w-full h-9 text-sm rounded-md border border-border bg-background px-3"
          >
            <option value="solid">Cor sólida</option>
            <option value="gradient">Gradiente</option>
            <option value="image">Imagem de fundo</option>
          </select>
        </FieldGroup>

        {bgType === 'solid' && (
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
        )}

        {bgType === 'gradient' && (
          <>
            <TwoCol>
              <FieldGroup label="Cor inicial">
                <div className="flex items-center gap-2">
                  <input type="color" value={(section.settings?.gradientFrom as string) || '#1a1a1a'} onChange={e => setSetting(section.id, 'gradientFrom', e.target.value)} className="h-9 w-10 rounded-md border border-border cursor-pointer" />
                  <Input value={(section.settings?.gradientFrom as string) || '#1a1a1a'} onChange={e => setSetting(section.id, 'gradientFrom', e.target.value)} className="h-9 font-mono text-xs uppercase" maxLength={7} />
                </div>
              </FieldGroup>
              <FieldGroup label="Cor final">
                <div className="flex items-center gap-2">
                  <input type="color" value={(section.settings?.gradientTo as string) || '#4a1a8a'} onChange={e => setSetting(section.id, 'gradientTo', e.target.value)} className="h-9 w-10 rounded-md border border-border cursor-pointer" />
                  <Input value={(section.settings?.gradientTo as string) || '#4a1a8a'} onChange={e => setSetting(section.id, 'gradientTo', e.target.value)} className="h-9 font-mono text-xs uppercase" maxLength={7} />
                </div>
              </FieldGroup>
            </TwoCol>
            <FieldGroup label="Cor do texto">
              <div className="flex items-center gap-2">
                <input type="color" value={(section.settings?.textColor as string) || '#ffffff'} onChange={e => setSetting(section.id, 'textColor', e.target.value)} className="h-9 w-10 rounded-md border border-border cursor-pointer" />
                <Input value={(section.settings?.textColor as string) || '#ffffff'} onChange={e => setSetting(section.id, 'textColor', e.target.value)} className="h-9 font-mono text-xs uppercase" maxLength={7} />
              </div>
            </FieldGroup>
          </>
        )}

        {bgType === 'image' && (
          <>
            <FieldGroup label="Imagem de fundo">
              <p className="text-[10px] text-muted-foreground -mt-0.5 mb-1.5">Recomendado: 1440 × 500px</p>
              {(section.settings?.bgImage as string) ? (
                <div className="space-y-2">
                  <div className="rounded-lg overflow-hidden border border-border/50 h-24">
                    <img src={section.settings.bgImage as string} alt="Fundo" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setBgPickerOpen(true)} className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                      <Image className="h-3.5 w-3.5" /> Trocar
                    </button>
                    <button onClick={() => setSetting(section.id, 'bgImage', '')} className="flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg border border-destructive/30 bg-destructive/5 hover:bg-destructive/10 text-xs font-medium text-destructive transition-colors">
                      <Trash2 className="h-3.5 w-3.5" /> Remover
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setBgPickerOpen(true)} className="w-full flex items-center justify-center gap-1.5 h-9 rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <Image className="h-3.5 w-3.5" /> Selecionar imagem
                </button>
              )}
              <MediaPickerModal open={bgPickerOpen} onClose={() => setBgPickerOpen(false)} onSelect={v => setSetting(section.id, 'bgImage', v)} currentValue={(section.settings?.bgImage as string) || ''} />
            </FieldGroup>
            <TwoCol>
              <FieldGroup label="Overlay">
                <div className="flex items-center gap-2">
                  <input type="color" value={(section.settings?.overlayColor as string) || '#000000'} onChange={e => setSetting(section.id, 'overlayColor', e.target.value)} className="h-9 w-10 rounded-md border border-border cursor-pointer" />
                  <Input value={(section.settings?.overlayColor as string) || '#000000'} onChange={e => setSetting(section.id, 'overlayColor', e.target.value)} className="h-9 font-mono text-xs uppercase" maxLength={7} />
                </div>
              </FieldGroup>
              <FieldGroup label="Opacidade overlay">
                <Input type="number" min={0} max={100} value={(section.settings?.overlayOpacity as number) ?? 50} onChange={e => setSetting(section.id, 'overlayOpacity', Number(e.target.value))} className="h-9" />
              </FieldGroup>
            </TwoCol>
            <FieldGroup label="Cor do texto">
              <div className="flex items-center gap-2">
                <input type="color" value={(section.settings?.textColor as string) || '#ffffff'} onChange={e => setSetting(section.id, 'textColor', e.target.value)} className="h-9 w-10 rounded-md border border-border cursor-pointer" />
                <Input value={(section.settings?.textColor as string) || '#ffffff'} onChange={e => setSetting(section.id, 'textColor', e.target.value)} className="h-9 font-mono text-xs uppercase" maxLength={7} />
              </div>
            </FieldGroup>
          </>
        )}
      </SettingsCard>

      {/* ── Comportamento ao expirar ── */}
      <SettingsCard title="Ao expirar">
        <FieldGroup label="Quando o tempo acabar">
          <select
            value={(section.settings?.expiryBehavior as string) || 'hide'}
            onChange={e => setSetting(section.id, 'expiryBehavior', e.target.value)}
            className="w-full h-9 text-sm rounded-md border border-border bg-background px-3"
          >
            <option value="hide">Esconder a seção</option>
            <option value="message">Mostrar mensagem</option>
            <option value="keep">Manter zerado</option>
          </select>
        </FieldGroup>
        {(section.settings?.expiryBehavior as string) === 'message' && (
          <FieldGroup label="Mensagem de encerramento">
            <Input value={(section.settings?.expiryMessage as string) || ''} onChange={e => setSetting(section.id, 'expiryMessage', e.target.value)} placeholder="Promoção encerrada!" className="h-9" />
          </FieldGroup>
        )}
      </SettingsCard>
    </>
  );
}

function ImageTextSettings({ section, setSetting }: SettingsProps) {
  const [imgPickerOpen, setImgPickerOpen] = useState(false);
  const imageUrl = (section.settings?.imageUrl as string) || '';
  const bgType = (section.settings?.bgType as string) || 'none';

  return (
    <>
      {/* ── Imagem ── */}
      <SettingsCard title="Imagem">
        <FieldGroup label="Imagem da seção">
          <p className="text-[10px] text-muted-foreground -mt-0.5 mb-1.5">Recomendado: 800 × 800px ou 1200 × 800px</p>
          {imageUrl ? (
            <div className="space-y-2">
              <div className="rounded-lg overflow-hidden border border-border/50 h-28">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => setImgPickerOpen(true)} className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <Image className="h-3.5 w-3.5" /> Trocar
                </button>
                <button onClick={() => setSetting(section.id, 'imageUrl', '')} className="flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg border border-destructive/30 bg-destructive/5 hover:bg-destructive/10 text-xs font-medium text-destructive transition-colors">
                  <Trash2 className="h-3.5 w-3.5" /> Remover
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setImgPickerOpen(true)} className="w-full flex items-center justify-center gap-1.5 h-9 rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
              <Image className="h-3.5 w-3.5" /> Selecionar imagem
            </button>
          )}
          <MediaPickerModal open={imgPickerOpen} onClose={() => setImgPickerOpen(false)} onSelect={v => setSetting(section.id, 'imageUrl', v)} currentValue={imageUrl} />
        </FieldGroup>
        <TwoCol>
          <FieldGroup label="Posição da imagem">
            <select value={(section.settings?.imagePosition as string) || 'left'} onChange={e => setSetting(section.id, 'imagePosition', e.target.value)} className="w-full h-9 text-sm rounded-md border border-border bg-background px-3">
              <option value="left">Esquerda</option>
              <option value="right">Direita</option>
            </select>
          </FieldGroup>
          <FieldGroup label="Proporção da imagem">
            <select value={(section.settings?.imageRatio as string) || 'auto'} onChange={e => setSetting(section.id, 'imageRatio', e.target.value)} className="w-full h-9 text-sm rounded-md border border-border bg-background px-3">
              <option value="auto">Automática</option>
              <option value="square">Quadrada (1:1)</option>
              <option value="portrait">Retrato (3:4)</option>
              <option value="landscape">Paisagem (4:3)</option>
            </select>
          </FieldGroup>
        </TwoCol>
      </SettingsCard>

      {/* ── Conteúdo ── */}
      <SettingsCard title="Conteúdo">
        <FieldGroup label="Título">
          <Input value={(section.settings?.title as string) || ''} onChange={e => setSetting(section.id, 'title', e.target.value)} placeholder="Título da seção" className="h-9" />
        </FieldGroup>
        <FieldGroup label="Subtítulo">
          <Input value={(section.settings?.subtitle as string) || ''} onChange={e => setSetting(section.id, 'subtitle', e.target.value)} placeholder="Subtítulo opcional" className="h-9" />
        </FieldGroup>
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
          <FieldGroup label="Destino do botão">
            <select value={(section.settings?.ctaDestType as string) || 'custom'} onChange={e => setSetting(section.id, 'ctaDestType', e.target.value)} className="w-full h-9 text-sm rounded-md border border-border bg-background px-3">
              <option value="catalog">Catálogo (todos os produtos)</option>
              <option value="collection">Coleção</option>
              <option value="custom">Link personalizado</option>
            </select>
          </FieldGroup>
        </TwoCol>
        {(section.settings?.ctaDestType as string) === 'collection' && (
          <FieldGroup label="Coleção">
            <select value={(section.settings?.ctaCollectionId as string) || ''} onChange={e => setSetting(section.id, 'ctaCollectionId', e.target.value)} className="w-full h-9 text-sm rounded-md border border-border bg-background px-3">
              <option value="">Selecione...</option>
              {mockCollections.filter(c => c.active).map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </FieldGroup>
        )}
        {((section.settings?.ctaDestType as string) === 'custom' || !(section.settings?.ctaDestType)) && (
          <FieldGroup label="Link personalizado">
            <Input value={(section.settings?.ctaLink as string) || ''} onChange={e => setSetting(section.id, 'ctaLink', e.target.value)} placeholder="/produtos" className="h-9" />
          </FieldGroup>
        )}
      </SettingsCard>

      {/* ── Layout ── */}
      <SettingsCard title="Layout">
        <TwoCol>
          <FieldGroup label="Alinhamento do texto">
            <select value={(section.settings?.textAlign as string) || 'left'} onChange={e => setSetting(section.id, 'textAlign', e.target.value)} className="w-full h-9 text-sm rounded-md border border-border bg-background px-3">
              <option value="left">Esquerda</option>
              <option value="center">Centro</option>
              <option value="right">Direita</option>
            </select>
          </FieldGroup>
          <FieldGroup label="Alinhamento vertical">
            <select value={(section.settings?.verticalAlign as string) || 'center'} onChange={e => setSetting(section.id, 'verticalAlign', e.target.value)} className="w-full h-9 text-sm rounded-md border border-border bg-background px-3">
              <option value="top">Topo</option>
              <option value="center">Centro</option>
              <option value="bottom">Base</option>
            </select>
          </FieldGroup>
        </TwoCol>
        <FieldGroup label="Altura da seção">
          <select value={(section.settings?.sectionHeight as string) || 'auto'} onChange={e => setSetting(section.id, 'sectionHeight', e.target.value)} className="w-full h-9 text-sm rounded-md border border-border bg-background px-3">
            <option value="compact">Compacta</option>
            <option value="auto">Normal</option>
            <option value="tall">Grande</option>
            <option value="hero">Destaque (hero)</option>
          </select>
        </FieldGroup>
      </SettingsCard>

      {/* ── Estilo Visual ── */}
      <SettingsCard title="Estilo Visual">
        <FieldGroup label="Fundo da seção">
          <select value={bgType} onChange={e => setSetting(section.id, 'bgType', e.target.value)} className="w-full h-9 text-sm rounded-md border border-border bg-background px-3">
            <option value="none">Padrão (sem fundo)</option>
            <option value="solid">Cor sólida</option>
            <option value="gradient">Gradiente</option>
          </select>
        </FieldGroup>
        {bgType === 'solid' && (
          <TwoCol>
            <FieldGroup label="Cor de fundo">
              <div className="flex items-center gap-2">
                <input type="color" value={(section.settings?.backgroundColor as string) || '#f5f5f5'} onChange={e => setSetting(section.id, 'backgroundColor', e.target.value)} className="h-9 w-10 rounded-md border border-border cursor-pointer" />
                <Input value={(section.settings?.backgroundColor as string) || '#f5f5f5'} onChange={e => setSetting(section.id, 'backgroundColor', e.target.value)} className="h-9 font-mono text-xs uppercase" maxLength={7} />
              </div>
            </FieldGroup>
            <FieldGroup label="Cor do texto">
              <div className="flex items-center gap-2">
                <input type="color" value={(section.settings?.textColor as string) || '#1a1a1a'} onChange={e => setSetting(section.id, 'textColor', e.target.value)} className="h-9 w-10 rounded-md border border-border cursor-pointer" />
                <Input value={(section.settings?.textColor as string) || '#1a1a1a'} onChange={e => setSetting(section.id, 'textColor', e.target.value)} className="h-9 font-mono text-xs uppercase" maxLength={7} />
              </div>
            </FieldGroup>
          </TwoCol>
        )}
        {bgType === 'gradient' && (
          <>
            <TwoCol>
              <FieldGroup label="Cor inicial">
                <div className="flex items-center gap-2">
                  <input type="color" value={(section.settings?.gradientFrom as string) || '#f5f5f5'} onChange={e => setSetting(section.id, 'gradientFrom', e.target.value)} className="h-9 w-10 rounded-md border border-border cursor-pointer" />
                  <Input value={(section.settings?.gradientFrom as string) || '#f5f5f5'} onChange={e => setSetting(section.id, 'gradientFrom', e.target.value)} className="h-9 font-mono text-xs uppercase" maxLength={7} />
                </div>
              </FieldGroup>
              <FieldGroup label="Cor final">
                <div className="flex items-center gap-2">
                  <input type="color" value={(section.settings?.gradientTo as string) || '#e0e0e0'} onChange={e => setSetting(section.id, 'gradientTo', e.target.value)} className="h-9 w-10 rounded-md border border-border cursor-pointer" />
                  <Input value={(section.settings?.gradientTo as string) || '#e0e0e0'} onChange={e => setSetting(section.id, 'gradientTo', e.target.value)} className="h-9 font-mono text-xs uppercase" maxLength={7} />
                </div>
              </FieldGroup>
            </TwoCol>
            <FieldGroup label="Cor do texto">
              <div className="flex items-center gap-2">
                <input type="color" value={(section.settings?.textColor as string) || '#1a1a1a'} onChange={e => setSetting(section.id, 'textColor', e.target.value)} className="h-9 w-10 rounded-md border border-border cursor-pointer" />
                <Input value={(section.settings?.textColor as string) || '#1a1a1a'} onChange={e => setSetting(section.id, 'textColor', e.target.value)} className="h-9 font-mono text-xs uppercase" maxLength={7} />
              </div>
            </FieldGroup>
          </>
        )}
        {bgType === 'none' && (
          <FieldGroup label="Cor do texto">
            <div className="flex items-center gap-2">
              <input type="color" value={(section.settings?.textColor as string) || ''} onChange={e => setSetting(section.id, 'textColor', e.target.value)} className="h-9 w-10 rounded-md border border-border cursor-pointer" />
              <Input value={(section.settings?.textColor as string) || ''} onChange={e => setSetting(section.id, 'textColor', e.target.value)} className="h-9 font-mono text-xs uppercase" maxLength={7} placeholder="Padrão" />
            </div>
          </FieldGroup>
        )}
        <TwoCol>
          <FieldGroup label="Cantos arredondados">
            <select value={(section.settings?.borderRadius as string) || 'lg'} onChange={e => setSetting(section.id, 'borderRadius', e.target.value)} className="w-full h-9 text-sm rounded-md border border-border bg-background px-3">
              <option value="none">Sem arredondamento</option>
              <option value="md">Médio</option>
              <option value="lg">Grande</option>
              <option value="xl">Extra grande</option>
            </select>
          </FieldGroup>
          <FieldGroup label="Largura da seção">
            <select value={(section.settings?.sectionWidth as string) || 'contained'} onChange={e => setSetting(section.id, 'sectionWidth', e.target.value)} className="w-full h-9 text-sm rounded-md border border-border bg-background px-3">
              <option value="contained">Contida</option>
              <option value="wide">Larga</option>
              <option value="full">Tela inteira</option>
            </select>
          </FieldGroup>
        </TwoCol>
      </SettingsCard>
    </>
  );
}

/* ── Icon Picker for Benefits / Trust Bar ── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_OPTIONS: { name: string; icon: any }[] = [
  { name: 'Truck', icon: Truck },
  { name: 'RefreshCw', icon: RefreshCw },
  { name: 'ShieldCheck', icon: ShieldCheck },
  { name: 'CreditCard', icon: CreditCard },
  { name: 'Lock', icon: Lock },
  { name: 'DatabaseBackup', icon: DatabaseBackup },
  { name: 'PackageCheck', icon: PackageCheck },
  { name: 'Heart', icon: Heart },
  { name: 'Gift', icon: Gift },
  { name: 'Clock', icon: Clock },
  { name: 'Headphones', icon: Headphones },
  { name: 'MapPin', icon: MapPin },
  { name: 'Zap', icon: Zap },
  { name: 'Award', icon: Award },
  { name: 'ThumbsUp', icon: ThumbsUp },
  { name: 'CheckCircle', icon: CheckCircle },
  { name: 'Star', icon: Star },
  { name: 'Phone', icon: Phone },
  { name: 'Mail', icon: Mail },
  { name: 'Globe', icon: Globe },
  { name: 'Percent', icon: Percent },
  { name: 'Tag', icon: Tag },
  { name: 'Flame', icon: Flame },
  { name: 'BadgeCheck', icon: BadgeCheck },
  { name: 'Gem', icon: Gem },
  { name: 'Crown', icon: Crown },
  { name: 'Sparkles', icon: Sparkles },
];

function getIconByName(name: string) {
  return ICON_OPTIONS.find(i => i.name === name)?.icon || ShieldCheck;
}

function IconPicker({ value, onChange }: { value: string; onChange: (name: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-background hover:bg-muted/50 transition-colors w-full"
      >
        {(() => { const Icon = getIconByName(value); return <Icon className="h-4 w-4 text-foreground" strokeWidth={1.5} />; })()}
        <span className="text-xs text-muted-foreground flex-1 text-left truncate">{value || 'Selecionar'}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute z-50 top-full mt-1 left-0 right-0 bg-background border border-border rounded-lg shadow-xl p-2 grid grid-cols-6 gap-1 max-h-48 overflow-y-auto">
          {ICON_OPTIONS.map(opt => (
            <button
              key={opt.name}
              type="button"
              onClick={() => { onChange(opt.name); setOpen(false); }}
              className={cn(
                'p-2 rounded-md flex items-center justify-center transition-colors',
                value === opt.name ? 'bg-primary/10 ring-1 ring-primary' : 'hover:bg-muted/60'
              )}
              title={opt.name}
            >
              <opt.icon className="h-4 w-4" strokeWidth={1.5} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Benefits Settings ── */

interface BenefitItem { icon: string; label: string; desc: string }

const DEFAULT_BENEFITS: BenefitItem[] = [
  { icon: 'Truck', label: 'Frete Grátis', desc: 'Para todo o Brasil' },
  { icon: 'RefreshCw', label: 'Troca Fácil', desc: 'Até 30 dias' },
  { icon: 'ShieldCheck', label: 'Compra Segura', desc: '100% protegida' },
  { icon: 'CreditCard', label: '12x sem juros', desc: 'No cartão de crédito' },
];

function BenefitsSettings({ section, setSetting }: SettingsProps) {
  const items: BenefitItem[] = (section.settings?.items as BenefitItem[]) || DEFAULT_BENEFITS;

  const updateItem = (index: number, updates: Partial<BenefitItem>) => {
    const next = items.map((item, i) => i === index ? { ...item, ...updates } : item);
    setSetting(section.id, 'items', next);
  };
  const removeItem = (index: number) => {
    setSetting(section.id, 'items', items.filter((_, i) => i !== index));
  };
  const addItem = () => {
    setSetting(section.id, 'items', [...items, { icon: 'Star', label: 'Novo benefício', desc: 'Descrição' }]);
  };

  return (
    <>
      <SettingsCard title="Itens">
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="p-3 rounded-xl border border-border/50 bg-muted/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Item {i + 1}</span>
                {items.length > 1 && (
                  <button onClick={() => removeItem(i)} className="text-destructive hover:text-destructive/80 transition-colors">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <FieldGroup label="Ícone">
                <IconPicker value={item.icon} onChange={v => updateItem(i, { icon: v })} />
              </FieldGroup>
              <TwoCol>
                <FieldGroup label="Título">
                  <Input value={item.label} onChange={e => updateItem(i, { label: e.target.value })} className="h-8 text-xs" />
                </FieldGroup>
                <FieldGroup label="Descrição">
                  <Input value={item.desc} onChange={e => updateItem(i, { desc: e.target.value })} className="h-8 text-xs" />
                </FieldGroup>
              </TwoCol>
            </div>
          ))}
        </div>
        {items.length < 8 && (
          <button onClick={addItem} className="w-full flex items-center justify-center gap-1.5 h-9 rounded-lg border border-dashed border-border/60 hover:border-primary/40 hover:bg-muted/30 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mt-2">
            <Plus className="h-3.5 w-3.5" /> Adicionar benefício
          </button>
        )}
      </SettingsCard>
      <SettingsCard title="Estilo">
        <TwoCol>
          <FieldGroup label="Layout">
            <select value={(section.settings?.layout as string) || 'grid'} onChange={e => setSetting(section.id, 'layout', e.target.value)} className="w-full h-9 text-sm rounded-md border border-border bg-background px-3">
              <option value="grid">Grade</option>
              <option value="inline">Linha</option>
            </select>
          </FieldGroup>
          <FieldGroup label="Estilo visual">
            <select value={(section.settings?.style as string) || 'cards'} onChange={e => setSetting(section.id, 'style', e.target.value)} className="w-full h-9 text-sm rounded-md border border-border bg-background px-3">
              <option value="cards">Cards</option>
              <option value="minimal">Minimalista</option>
              <option value="outlined">Contorno</option>
            </select>
          </FieldGroup>
        </TwoCol>
        <TwoCol>
          <FieldGroup label="Cor do ícone">
            <div className="flex items-center gap-2">
              <input type="color" value={(section.settings?.iconColor as string) || '#000000'} onChange={e => setSetting(section.id, 'iconColor', e.target.value)} className="h-9 w-10 rounded-md border border-border cursor-pointer" />
              <Input value={(section.settings?.iconColor as string) || ''} onChange={e => setSetting(section.id, 'iconColor', e.target.value)} className="h-9 font-mono text-xs" maxLength={7} placeholder="Padrão" />
            </div>
          </FieldGroup>
          <FieldGroup label="Cor de fundo">
            <div className="flex items-center gap-2">
              <input type="color" value={(section.settings?.bgColor as string) || '#f5f5f5'} onChange={e => setSetting(section.id, 'bgColor', e.target.value)} className="h-9 w-10 rounded-md border border-border cursor-pointer" />
              <Input value={(section.settings?.bgColor as string) || ''} onChange={e => setSetting(section.id, 'bgColor', e.target.value)} className="h-9 font-mono text-xs" maxLength={7} placeholder="Padrão" />
            </div>
          </FieldGroup>
        </TwoCol>
      </SettingsCard>
    </>
  );
}

/* ── Trust Bar Settings ── */

interface TrustItem { icon: string; label: string }

const DEFAULT_TRUSTS: TrustItem[] = [
  { icon: 'Lock', label: 'Compra Segura' },
  { icon: 'DatabaseBackup', label: 'Dados Protegidos' },
  { icon: 'PackageCheck', label: 'Entrega Garantida' },
];

function TrustBarSettings({ section, setSetting }: SettingsProps) {
  const items: TrustItem[] = (section.settings?.items as TrustItem[]) || DEFAULT_TRUSTS;

  const updateItem = (index: number, updates: Partial<TrustItem>) => {
    const next = items.map((item, i) => i === index ? { ...item, ...updates } : item);
    setSetting(section.id, 'items', next);
  };
  const removeItem = (index: number) => {
    setSetting(section.id, 'items', items.filter((_, i) => i !== index));
  };
  const addItem = () => {
    setSetting(section.id, 'items', [...items, { icon: 'CheckCircle', label: 'Novo selo' }]);
  };

  return (
    <>
      <SettingsCard title="Selos de Confiança">
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="p-3 rounded-xl border border-border/50 bg-muted/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Selo {i + 1}</span>
                {items.length > 1 && (
                  <button onClick={() => removeItem(i)} className="text-destructive hover:text-destructive/80 transition-colors">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <TwoCol>
                <FieldGroup label="Ícone">
                  <IconPicker value={item.icon} onChange={v => updateItem(i, { icon: v })} />
                </FieldGroup>
                <FieldGroup label="Texto">
                  <Input value={item.label} onChange={e => updateItem(i, { label: e.target.value })} className="h-8 text-xs" />
                </FieldGroup>
              </TwoCol>
            </div>
          ))}
        </div>
        {items.length < 6 && (
          <button onClick={addItem} className="w-full flex items-center justify-center gap-1.5 h-9 rounded-lg border border-dashed border-border/60 hover:border-primary/40 hover:bg-muted/30 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mt-2">
            <Plus className="h-3.5 w-3.5" /> Adicionar selo
          </button>
        )}
      </SettingsCard>
      <SettingsCard title="Estilo">
        <TwoCol>
          <FieldGroup label="Cor do texto">
            <div className="flex items-center gap-2">
              <input type="color" value={(section.settings?.textColor as string) || '#666666'} onChange={e => setSetting(section.id, 'textColor', e.target.value)} className="h-9 w-10 rounded-md border border-border cursor-pointer" />
              <Input value={(section.settings?.textColor as string) || ''} onChange={e => setSetting(section.id, 'textColor', e.target.value)} className="h-9 font-mono text-xs" maxLength={7} placeholder="Padrão" />
            </div>
          </FieldGroup>
          <FieldGroup label="Tamanho do texto">
            <select value={(section.settings?.fontSize as string) || 'sm'} onChange={e => setSetting(section.id, 'fontSize', e.target.value)} className="w-full h-9 text-sm rounded-md border border-border bg-background px-3">
              <option value="xs">Pequeno</option>
              <option value="sm">Médio</option>
              <option value="base">Grande</option>
            </select>
          </FieldGroup>
        </TwoCol>
      </SettingsCard>
    </>
  );
}

function CategorySettings({ section, setSetting }: SettingsProps) {
  return (
    <div className="space-y-4">
      <SettingsCard title="Aparência das Categorias">
        <div className="flex items-center gap-3">
          <Switch
            checked={(section.settings?.showImage as boolean) ?? true}
            onCheckedChange={v => setSetting(section.id, 'showImage', v)}
          />
          <Label className="text-xs">Mostrar imagem da categoria</Label>
        </div>
        {(section.settings?.showImage as boolean) !== false && (
          <>
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
            <FieldGroup label="Tamanho mobile" hint="Tamanho da imagem em telas pequenas">
              <div className="flex items-center gap-2">
                <input type="range" min={40} max={120} step={10}
                  value={(section.settings?.imageSizeMobile as number) || (section.settings?.imageSize as number) || 80}
                  onChange={e => setSetting(section.id, 'imageSizeMobile', Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-10 text-right">{(section.settings?.imageSizeMobile as number) || (section.settings?.imageSize as number) || 80}px</span>
              </div>
            </FieldGroup>
            <div className="flex items-center gap-3">
              <Switch
                checked={(section.settings?.imageBorder as boolean) ?? false}
                onCheckedChange={v => setSetting(section.id, 'imageBorder', v)}
              />
              <Label className="text-xs">Borda na imagem</Label>
            </div>
            {(section.settings?.imageBorder as boolean) && (
              <>
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
                <FieldGroup label="Largura da borda mobile" hint="Largura da borda em telas pequenas">
                  <div className="flex items-center gap-2">
                    <input type="range" min={1} max={6} step={1}
                      value={(section.settings?.imageBorderWidthMobile as number) || (section.settings?.imageBorderWidth as number) || 2}
                      onChange={e => setSetting(section.id, 'imageBorderWidthMobile', Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-xs text-muted-foreground w-6 text-right">{(section.settings?.imageBorderWidthMobile as number) || (section.settings?.imageBorderWidth as number) || 2}px</span>
                  </div>
                </FieldGroup>
              </>
            )}
          </>
        )}
      </SettingsCard>

      <SettingsCard title="Categorias em destaque">
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
      </SettingsCard>
    </div>
  );
}
