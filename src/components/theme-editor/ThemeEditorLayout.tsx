import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { Search, Monitor, Tablet, Smartphone, Undo2, Send, RotateCcw, Copy, History, X, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// Sections config
import {
  Palette, Type, Layout, PanelTop, PanelBottom, Image, ShoppingBag, Package,
  Grid3X3, CreditCard, CheckSquare, MessageCircle, Globe, Code, Accessibility,
  Layers, MousePointer, FormInput, Sparkles
} from 'lucide-react';

// Editor panels
import { ColorsPanel } from './panels/ColorsPanel';
import { TypographyPanel } from './panels/TypographyPanel';
import { GlobalPanel } from './panels/GlobalPanel';
import { ButtonsPanel } from './panels/ButtonsPanel';
import { InputsPanel } from './panels/InputsPanel';
import { LogoPanel } from './panels/LogoPanel';
import { HeaderPanel } from './panels/HeaderPanel';
import { HeroPanel } from './panels/HeroPanel';
import { HomeSectionsPanel } from './panels/HomeSectionsPanel';
import { ProductCardPanel } from './panels/ProductCardPanel';
import { ProductPagePanel } from './panels/ProductPagePanel';
import { CategoryPanel } from './panels/CategoryPanel';
import { CartPanel } from './panels/CartPanel';
import { CheckoutPanel } from './panels/CheckoutPanel';
import { FooterPanel } from './panels/FooterPanel';
import { WhatsAppPanel } from './panels/WhatsAppPanel';
import { SEOPanel } from './panels/SEOPanel';
import { CustomCodePanel } from './panels/CustomCodePanel';
import { PresetsPanel } from './panels/PresetsPanel';

export interface EditorSectionItem {
  id: string;
  label: string;
  icon: React.ElementType;
  group: string;
}

const sections: EditorSectionItem[] = [
  // Design System
  { id: 'presets', label: 'Temas Prontos', icon: Sparkles, group: 'Sistema' },
  { id: 'colors', label: 'Cores', icon: Palette, group: 'Sistema' },
  { id: 'typography', label: 'Tipografia', icon: Type, group: 'Sistema' },
  { id: 'global', label: 'Layout Global', icon: Layout, group: 'Sistema' },
  { id: 'buttons', label: 'Botões', icon: MousePointer, group: 'Sistema' },
  { id: 'inputs', label: 'Formulários', icon: FormInput, group: 'Sistema' },
  // Componentes
  { id: 'logo', label: 'Logo', icon: Image, group: 'Componentes' },
  { id: 'header', label: 'Cabeçalho', icon: PanelTop, group: 'Componentes' },
  { id: 'hero', label: 'Hero / Banner', icon: Layers, group: 'Componentes' },
  { id: 'home-sections', label: 'Seções da Home', icon: Grid3X3, group: 'Componentes' },
  { id: 'product-card', label: 'Card de Produto', icon: Package, group: 'Componentes' },
  { id: 'product-page', label: 'Página de Produto', icon: ShoppingBag, group: 'Componentes' },
  { id: 'category', label: 'Categoria / Busca', icon: Grid3X3, group: 'Componentes' },
  { id: 'cart', label: 'Carrinho', icon: ShoppingBag, group: 'Componentes' },
  { id: 'checkout', label: 'Checkout', icon: CreditCard, group: 'Componentes' },
  { id: 'footer', label: 'Rodapé', icon: PanelBottom, group: 'Componentes' },
  // Extras
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, group: 'Extras' },
  { id: 'seo', label: 'SEO', icon: Globe, group: 'Extras' },
  { id: 'custom-code', label: 'Código Custom', icon: Code, group: 'Extras' },
];

function renderPanel(sectionId: string) {
  switch (sectionId) {
    case 'presets': return <PresetsPanel />;
    case 'colors': return <ColorsPanel />;
    case 'typography': return <TypographyPanel />;
    case 'global': return <GlobalPanel />;
    case 'buttons': return <ButtonsPanel />;
    case 'inputs': return <InputsPanel />;
    case 'logo': return <LogoPanel />;
    case 'header': return <HeaderPanel />;
    case 'hero': return <HeroPanel />;
    case 'home-sections': return <HomeSectionsPanel />;
    case 'product-card': return <ProductCardPanel />;
    case 'product-page': return <ProductPagePanel />;
    case 'category': return <CategoryPanel />;
    case 'cart': return <CartPanel />;
    case 'checkout': return <CheckoutPanel />;
    case 'footer': return <FooterPanel />;
    case 'whatsapp': return <WhatsAppPanel />;
    case 'seo': return <SEOPanel />;
    case 'custom-code': return <CustomCodePanel />;
    default: return <div className="p-4 text-muted-foreground text-sm">Selecione uma seção</div>;
  }
}

type DeviceSize = 'desktop' | 'tablet' | 'mobile';

export function ThemeEditorLayout() {
  const { isDirty, publish, discardDraft, resetToDefault, versions, rollback, draft } = useTheme();
  const [activeSection, setActiveSection] = useState('presets');
  const [searchQuery, setSearchQuery] = useState('');
  const [device, setDevice] = useState<DeviceSize>('desktop');
  const [showVersions, setShowVersions] = useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  // Send draft to iframe on every change
  React.useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'theme-preview-update', theme: draft }, '*');
    }
  }, [draft]);

  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'theme-preview-update', theme: draft }, '*');
    }
  };
  
  const filteredSections = searchQuery
    ? sections.filter(s => s.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : sections;

  const groups = Array.from(new Set(filteredSections.map(s => s.group)));

  const iframeWidth = device === 'desktop' ? '100%' : device === 'tablet' ? '768px' : '390px';

  const handlePublish = () => {
    publish('Publicação manual');
    toast.success('Tema publicado com sucesso!');
  };

  const handleDiscard = () => {
    discardDraft();
    toast.info('Alterações descartadas.');
  };

  const activeLabel = sections.find(s => s.id === activeSection)?.label || '';

  return (
    <div className="flex flex-col h-[calc(100vh-73px)] -m-6">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-background border-b shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold">Editor de Tema</h1>
          {isDirty && (
            <span className="text-[10px] bg-warning/20 text-warning px-2 py-0.5 rounded-full font-medium">
              Rascunho não publicado
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setShowVersions(true)}>
            <History className="h-3.5 w-3.5 mr-1" /> Versões
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={resetToDefault}>
            <RotateCcw className="h-3.5 w-3.5 mr-1" /> Restaurar
          </Button>
          {isDirty && (
            <>
              <Button variant="outline" size="sm" className="h-8 text-xs" onClick={handleDiscard}>
                <Undo2 className="h-3.5 w-3.5 mr-1" /> Descartar
              </Button>
              <Button size="sm" className="h-8 text-xs" onClick={handlePublish}>
                <Send className="h-3.5 w-3.5 mr-1" /> Publicar
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Main 3 columns */}
      <div className="flex flex-1 min-h-0">
        {/* Col 1: Sections list */}
        <div className="w-56 border-r bg-background flex flex-col shrink-0">
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-7 h-8 text-xs"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-1">
            {groups.map(group => (
              <div key={group} className="mb-1">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold px-2 py-1.5">{group}</p>
                {filteredSections.filter(s => s.group === group).map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-colors',
                      activeSection === section.id
                        ? 'bg-foreground text-background font-medium'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    )}
                  >
                    <section.icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{section.label}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: Properties panel */}
        <div className="w-80 border-r bg-background flex flex-col shrink-0">
          <div className="px-3 py-2 border-b flex items-center gap-2">
            <h2 className="text-sm font-semibold">{activeLabel}</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            {renderPanel(activeSection)}
          </div>
        </div>

        {/* Col 3: Preview */}
        <div className="flex-1 bg-muted/50 flex flex-col min-w-0">
          <div className="flex items-center justify-center gap-2 py-2 border-b bg-background/50">
            {([
              { id: 'desktop' as DeviceSize, icon: Monitor, label: 'Desktop' },
              { id: 'tablet' as DeviceSize, icon: Tablet, label: 'Tablet' },
              { id: 'mobile' as DeviceSize, icon: Smartphone, label: 'Mobile' },
            ]).map(d => (
              <button
                key={d.id}
                onClick={() => setDevice(d.id)}
                className={cn(
                  'p-1.5 rounded-md transition-colors',
                  device === d.id ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-secondary'
                )}
                title={d.label}
              >
                <d.icon className="h-4 w-4" />
              </button>
            ))}
          </div>
          <div className="flex-1 flex items-start justify-center p-4 overflow-auto min-h-0">
            <div
              className="bg-background rounded-lg shadow-xl overflow-hidden transition-all duration-300"
              style={{ width: iframeWidth, maxWidth: '100%', height: 'calc(100vh - 160px)' }}
            >
              <iframe
                ref={iframeRef}
                src="/"
                className="w-full h-full border-0"
                title="Preview da Loja"
                onLoad={handleIframeLoad}
              />
            </div>
          </div>
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
    </div>
  );
}
