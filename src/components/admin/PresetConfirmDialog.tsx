import React, { useMemo } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ================================================================== */
/*  LABEL MAP — user-friendly names for config keys                    */
/* ================================================================== */

const LABEL_MAP: Record<string, string> = {
  // Header
  layout: 'Layout do menu',
  height: 'Altura do header',
  sticky: 'Header fixo',
  shrinkOnScroll: 'Encolher ao rolar',
  menuStyle: 'Estilo do menu',
  menuFontSize: 'Tamanho da fonte do menu',
  menuUppercase: 'Menu em maiúsculas',
  menuLetterSpacing: 'Espaçamento de letras',
  menuFontWeight: 'Peso da fonte do menu',
  menuHoverStyle: 'Estilo do hover',
  menuItemGap: 'Gap entre itens',
  menuSeparator: 'Separador visual',
  menuDividerLine: 'Linha divisória',
  headerSurface: 'Superfície elevada',
  dropdownElevated: 'Dropdown elevado',
  menuItemPadding: 'Padding dos itens',
  borderBottom: 'Borda inferior',
  shadowOnScroll: 'Sombra ao rolar',
  iconSize: 'Tamanho dos ícones',
  iconStrokeWidth: 'Espessura dos ícones',
  showSearch: 'Mostrar busca',
  searchStyle: 'Estilo da busca',
  showAccount: 'Mostrar conta',
  showCart: 'Mostrar carrinho',
  cartBadgeStyle: 'Badge do carrinho',
  states: 'Estados visuais (normal/sticky/transparente)',
  // Colors
  primary: 'Cor primária',
  primaryForeground: 'Texto sobre primária',
  secondary: 'Cor secundária',
  secondaryForeground: 'Texto sobre secundária',
  accent: 'Cor de destaque',
  accentForeground: 'Texto sobre destaque',
  background: 'Cor de fundo',
  foreground: 'Cor do texto',
  muted: 'Cor suave',
  mutedForeground: 'Texto suave',
  border: 'Cor da borda',
  buyNow: 'Botão Comprar',
  buyNowHover: 'Botão Comprar (hover)',
  link: 'Cor de link',
  linkHover: 'Cor de link (hover)',
  // Typography
  headingFont: 'Fonte dos títulos',
  bodyFont: 'Fonte do corpo',
  baseFontSize: 'Tamanho base',
  headingWeight: 'Peso dos títulos',
  bodyWeight: 'Peso do corpo',
  lineHeight: 'Altura da linha',
  letterSpacing: 'Espaçamento de letras',
  // Buttons
  style: 'Estilo',
  radius: 'Arredondamento',
  size: 'Tamanho',
  uppercase: 'Maiúsculas',
  fontWeight: 'Peso da fonte',
  fontSize: 'Tamanho da fonte',
  shadow: 'Sombra',
  // Global
  containerWidth: 'Largura do container',
  containerMaxPx: 'Largura máxima',
  sectionSpacing: 'Espaçamento entre seções',
  borderRadius: 'Arredondamento global',
  shadowLevel: 'Nível de sombra',
  borderStyle: 'Estilo de borda',
  // Product Card
  imageAspect: 'Proporção da imagem',
  imageHover: 'Efeito no hover',
  imageBorderRadius: 'Raio da imagem',
  showCategory: 'Mostrar categoria',
  showBrand: 'Mostrar marca',
  showRating: 'Mostrar avaliação',
  showQuickView: 'Quick View',
  quickViewStyle: 'Estilo Quick View',
  showBuyNow: 'Botão Comprar',
  showAddToCart: 'Botão Adicionar',
  buttonVisibility: 'Visibilidade dos botões',
  buttonLayout: 'Layout dos botões',
  buttonStyle: 'Estilo dos botões',
  priceSize: 'Tamanho do preço',
  showComparePrice: 'Preço comparativo',
  showDiscount: 'Desconto',
  showInstallments: 'Parcelas',
  titleLines: 'Linhas do título',
  contentAlign: 'Alinhamento',
  spacing: 'Espaçamento',
  // Footer
  backgroundColor: 'Cor de fundo',
  textColor: 'Cor do texto',
};

const SECTION_LABELS: Record<string, string> = {
  colors: '🎨 Cores',
  typography: '🔤 Tipografia',
  buttons: '🔘 Botões',
  global: '📐 Layout Global',
  header: '📌 Cabeçalho / Menu',
  productCard: '🛍️ Card de Produto',
  footer: '📎 Rodapé',
  hero: '🖼️ Hero',
  category: '📂 Categoria',
  cart: '🛒 Carrinho',
  checkout: '💳 Checkout',
  quickView: '👁️ Quick View',
  badges: '🏷️ Badges',
  microcopy: '✏️ Microcopy',
};

/* ================================================================== */
/*  DIFF LOGIC                                                         */
/* ================================================================== */

interface Change {
  section: string;
  key: string;
  label: string;
  from: string;
  to: string;
}

function formatValue(val: unknown): string {
  if (val === null || val === undefined) return '—';
  if (typeof val === 'boolean') return val ? 'Sim' : 'Não';
  if (typeof val === 'object') return '(configuração complexa)';
  return String(val);
}

function computeChanges(
  currentConfig: Record<string, any>,
  presetConfig: Record<string, any>,
): Change[] {
  const changes: Change[] = [];

  for (const sectionKey of Object.keys(presetConfig)) {
    const presetSection = presetConfig[sectionKey];
    const currentSection = currentConfig[sectionKey];

    if (!presetSection || typeof presetSection !== 'object' || Array.isArray(presetSection)) {
      // Simple value at root level
      if (JSON.stringify(currentSection) !== JSON.stringify(presetSection)) {
        changes.push({
          section: 'geral',
          key: sectionKey,
          label: LABEL_MAP[sectionKey] || sectionKey,
          from: formatValue(currentSection),
          to: formatValue(presetSection),
        });
      }
      continue;
    }

    // Object — compare leaf keys
    for (const key of Object.keys(presetSection)) {
      const presetVal = presetSection[key];
      const currentVal = currentSection?.[key];

      if (JSON.stringify(currentVal) !== JSON.stringify(presetVal)) {
        changes.push({
          section: sectionKey,
          key,
          label: LABEL_MAP[key] || key,
          from: formatValue(currentVal),
          to: formatValue(presetVal),
        });
      }
    }
  }

  return changes;
}

/* ================================================================== */
/*  COMPONENT                                                           */
/* ================================================================== */

interface PresetConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  presetName: string;
  currentConfig: Record<string, any>;
  presetConfig: Record<string, any>;
  onConfirm: () => void;
  /** "header" for AdminMenu presets, "theme" for Editor presets */
  scope: 'header' | 'theme';
}

export function PresetConfirmDialog({
  open, onOpenChange, presetName, currentConfig, presetConfig, onConfirm, scope,
}: PresetConfirmDialogProps) {
  const changes = useMemo(
    () => computeChanges(currentConfig, presetConfig),
    [currentConfig, presetConfig],
  );

  // Group changes by section
  const grouped = useMemo(() => {
    const map = new Map<string, Change[]>();
    for (const c of changes) {
      const list = map.get(c.section) || [];
      list.push(c);
      map.set(c.section, list);
    }
    return map;
  }, [changes]);

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-5 pt-5 pb-3">
          <DialogTitle className="text-[15px] font-semibold flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Aplicar "{presetName}"
          </DialogTitle>
          <DialogDescription className="text-[12px] text-muted-foreground/70">
            {changes.length === 0
              ? 'Nenhuma alteração será feita — suas configurações já estão iguais.'
              : `${changes.length} configuração${changes.length > 1 ? 'ões serão alteradas' : ' será alterada'}. Revise antes de confirmar.`
            }
          </DialogDescription>
        </DialogHeader>

        {changes.length > 0 && (
          <ScrollArea className="max-h-[340px] border-y border-border/40">
            <div className="px-5 py-3 space-y-4">
              {Array.from(grouped.entries()).map(([section, items]) => (
                <div key={section}>
                  <p className="text-[11px] font-semibold text-muted-foreground/80 uppercase tracking-wide mb-2">
                    {SECTION_LABELS[section] || section}
                  </p>
                  <div className="space-y-1.5">
                    {items.map(item => (
                      <div key={`${section}-${item.key}`} className="flex items-center gap-2 text-[12px] py-1 px-2 rounded-md bg-muted/30">
                        <span className="text-muted-foreground/70 flex-1 min-w-0 truncate">{item.label}</span>
                        <span className="text-muted-foreground/50 max-w-[70px] truncate text-right" title={item.from}>
                          {item.from}
                        </span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground/40 shrink-0" />
                        <span className="text-foreground font-medium max-w-[70px] truncate text-right" title={item.to}>
                          {item.to}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        <DialogFooter className="px-5 py-3 gap-2">
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="text-[12px]">
            Cancelar
          </Button>
          <Button size="sm" onClick={handleConfirm} className="text-[12px] gap-1.5">
            <Check className="h-3.5 w-3.5" />
            {changes.length === 0 ? 'Fechar' : 'Aplicar alterações'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
