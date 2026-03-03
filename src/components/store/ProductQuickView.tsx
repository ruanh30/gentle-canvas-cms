import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/format';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { mockProducts } from '@/data/mock';
import { SizeGuideDisplay } from './SizeGuideDisplay';
import {
  X, Minus, Plus, Star, Truck, ShoppingCart,
  ChevronLeft, ChevronRight, ChevronDown,
  MapPin, Package, ExternalLink, Share2, Ruler,
} from 'lucide-react';

/* ================================================================== */
/*  Tokens helper                                                      */
/* ================================================================== */
const radiusMap = { sm: 'rounded-lg', md: 'rounded-xl', lg: 'rounded-2xl' } as const;
const shadowMap = { sm: 'shadow-md', md: 'shadow-xl' } as const;
const colorHex: Record<string, string> = {
  Branca: '#ffffff', Preta: '#111827', Azul: '#3b82f6',
  Cinza: '#9ca3af', Verde: '#22c55e', Vermelha: '#ef4444',
  Rosa: '#ec4899', Amarela: '#eab308', Laranja: '#f97316',
  Marrom: '#92400e', Bege: '#d4a574',
};

/* ================================================================== */
/*  QuickViewHeader — sticky top                                       */
/* ================================================================== */
function QuickViewHeader({ product, onClose, qv }: {
  product: Product; onClose: () => void; qv: any;
}) {
  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100) : 0;

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/40 px-5 py-4 flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <h2 className="text-lg font-semibold leading-snug text-foreground line-clamp-2">
          {product.name}
        </h2>
        <div className="flex items-baseline gap-2.5 mt-1.5">
          <span className="text-xl font-bold text-foreground tracking-tight">
            {formatCurrency(product.price)}
          </span>
          {product.compareAtPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
              <span className="text-[11px] font-bold bg-foreground/10 text-foreground px-1.5 py-0.5 rounded-full">
                -{discount}%
              </span>
            </>
          )}
        </div>
        {qv?.showRating && product.rating > 0 && (
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-foreground">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
        )}
      </div>
      <button
        onClick={onClose}
        className="w-9 h-9 grid place-items-center rounded-full border border-border/50 bg-background hover:bg-muted transition-colors shrink-0"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ================================================================== */
/*  QuickViewGallery                                                   */
/* ================================================================== */
function QuickViewGallery({ product, qv }: { product: Product; qv: any }) {
  const [idx, setIdx] = useState(0);
  const thumbLayout = qv?.galleryThumbsLayout || 'left';
  const maxH = qv?.galleryMaxHeight || '55vh';
  const fit = qv?.galleryFit || 'cover';
  const showArrows = qv?.galleryShowArrows !== false;

  return (
    <div className={cn(
      'relative flex gap-2.5',
      thumbLayout === 'left' ? 'flex-row' : 'flex-col',
    )} style={{ maxHeight: maxH }}>
      {/* Thumbnails */}
      {thumbLayout !== 'hidden' && product.images.length > 1 && (
        <div className={cn(
          'flex gap-1.5 shrink-0',
          thumbLayout === 'left' ? 'flex-col w-14 overflow-y-auto qv-scrollbar' : 'flex-row overflow-x-auto order-2 qv-scrollbar-h',
        )}>
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={cn(
                'shrink-0 rounded-lg overflow-hidden border-2 transition-all',
                thumbLayout === 'left' ? 'w-14 h-14' : 'w-12 h-12',
                i === idx ? 'border-foreground shadow-sm' : 'border-border/30 hover:border-border/60',
              )}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="group/gallery flex-1 relative rounded-xl overflow-hidden bg-secondary border border-border/20">
        <img
          src={product.images[idx]}
          alt={product.name}
          className={cn('w-full h-full', fit === 'contain' ? 'object-contain' : 'object-cover')}
        />
        {showArrows && product.images.length > 1 && (
          <>
            <button
              onClick={() => setIdx(i => i > 0 ? i - 1 : product.images.length - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 grid place-items-center rounded-full bg-background/80 backdrop-blur-sm shadow-sm border border-border/30 hover:bg-background transition-all opacity-0 group-hover/gallery:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIdx(i => i < product.images.length - 1 ? i + 1 : 0)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 grid place-items-center rounded-full bg-background/80 backdrop-blur-sm shadow-sm border border-border/30 hover:bg-background transition-all opacity-0 group-hover/gallery:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
          {product.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={cn(
                'h-1.5 rounded-full transition-all',
                i === idx ? 'w-5 bg-foreground' : 'w-2 bg-foreground/25',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  QuickViewVariants                                                  */
/* ================================================================== */
function QuickViewVariants({ product, qv, quantities, onUpdateQty, selectedAttrs, onSelectAttr }: {
  product: Product; qv: any;
  quantities: Record<string, number>;
  onUpdateQty: (id: string, delta: number) => void;
  selectedAttrs: Record<string, string>;
  onSelectAttr: (key: string, value: string) => void;
}) {
  const variants = product.variants || [];
  if (variants.length === 0) return null;

  const style = qv?.variationStyle || 'chips';
  const attrKeys = [...new Set(variants.flatMap(v => Object.keys(v.attributes)))];

  // Check if a specific attribute value has ANY variant in stock
  const isAttrValueInStock = (key: string, val: string) =>
    variants.some(v => v.attributes[key] === val && v.stock > 0);

  // Color swatch renderer shared across styles
  const renderColorSwatches = (key: string, values: string[]) => (
    <div key={key}>
      <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">{key}</p>
      <div className="flex flex-wrap gap-2.5">
        {values.map(val => {
          const hex = colorHex[val];
          const isSelected = selectedAttrs[key] === val;
          const isWhite = hex?.toLowerCase() === '#ffffff' || hex?.toLowerCase() === '#fff';
          const outOfStock = !isAttrValueInStock(key, val);
          return (
            <button
              key={val}
              onClick={() => !outOfStock && onSelectAttr(key, val)}
              className={cn('group relative', outOfStock && 'cursor-not-allowed')}
              title={outOfStock ? `${val} — Esgotado` : val}
              disabled={outOfStock}
            >
              <span
                className={cn(
                  'block w-8 h-8 rounded-full transition-all duration-150 ring-offset-2 ring-offset-background',
                  isSelected ? 'ring-2 ring-foreground scale-110' : 'ring-0 group-hover:ring-1 group-hover:ring-border',
                  isWhite && 'border border-border/50',
                  outOfStock && 'opacity-30',
                )}
                style={{ backgroundColor: hex || '#ccc' }}
              />
              {outOfStock && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="block w-[1px] h-9 bg-muted-foreground/60 rotate-45" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  if (style === 'chips') {
    return (
      <div className="space-y-4">
        {attrKeys.map(key => {
          const values = [...new Set(variants.map(v => v.attributes[key]))];
          const isColor = key.toLowerCase() === 'cor';
          if (isColor) return renderColorSwatches(key, values);
          return (
            <div key={key}>
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">{key}</p>
              <div className="flex flex-wrap gap-2">
                {values.map(val => {
                  const isSelected = selectedAttrs[key] === val;
                  const outOfStock = !isAttrValueInStock(key, val);
                  return (
                    <button
                      key={val}
                      onClick={() => !outOfStock && onSelectAttr(key, val)}
                      disabled={outOfStock}
                      className={cn(
                        'px-3 py-1.5 text-sm border rounded-lg transition-colors',
                        outOfStock
                          ? 'opacity-40 cursor-not-allowed line-through border-border/40 text-muted-foreground'
                          : isSelected
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border/60 hover:border-foreground text-foreground',
                      )}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
        {/* Single qty stepper */}
        <div>
          <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Quantidade</p>
          <div className="flex items-center border border-border/60 rounded-lg w-fit">
            <button
              onClick={() => onUpdateQty('_single', -1)}
              className="w-9 h-9 grid place-items-center hover:bg-muted transition-colors"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-10 text-center text-sm font-semibold tabular-nums">
              {quantities['_single'] || 1}
            </span>
            <button
              onClick={() => onUpdateQty('_single', 1)}
              className="w-9 h-9 grid place-items-center hover:bg-muted transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (style === 'list-compact') {
    const colorKey = attrKeys.find(k => k.toLowerCase() === 'cor');

    return (
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Variações</p>
          <div className="divide-y divide-border/30">
            {variants.map(v => {
              const colorVal = colorKey ? v.attributes[colorKey] : null;
              const hex = colorVal ? (colorHex[colorVal] || '#ccc') : null;
              const isWhite = hex?.toLowerCase() === '#ffffff' || hex?.toLowerCase() === '#fff';
              const outOfStock = v.stock <= 0;
              return (
                <div key={v.id} className={cn(
                  'flex items-center justify-between py-2.5 gap-3',
                  outOfStock && 'opacity-40',
                )}>
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    {hex && (
                      <span
                        className={cn(
                          'w-5 h-5 rounded-full shrink-0 border',
                          isWhite ? 'border-border/50' : 'border-transparent',
                        )}
                        style={{ backgroundColor: hex }}
                        title={colorVal || ''}
                      />
                    )}
                    <div className="min-w-0">
                      <p className={cn('text-sm font-medium text-foreground truncate', outOfStock && 'line-through')}>
                        {v.name}
                        {outOfStock && <span className="ml-1.5 text-[10px] text-muted-foreground no-underline font-normal">(Esgotado)</span>}
                      </p>
                      {qv?.showSKU && (
                        <p className="text-[10px] text-muted-foreground font-mono">#{v.sku}</p>
                      )}
                    </div>
                  </div>
                  <div className={cn('flex items-center border border-border/60 rounded-lg', outOfStock && 'pointer-events-none')}>
                    <button
                      onClick={() => onUpdateQty(v.id, -1)}
                      disabled={outOfStock}
                      className="w-8 h-8 grid place-items-center hover:bg-muted transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-semibold tabular-nums">
                      {quantities[v.id] || 0}
                    </span>
                    <button
                      onClick={() => onUpdateQty(v.id, 1)}
                      disabled={outOfStock}
                      className="w-8 h-8 grid place-items-center hover:bg-muted transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // dropdown
  return (
    <div className="space-y-3">
      {attrKeys.map(key => {
        const values = [...new Set(variants.map(v => v.attributes[key]))];
        const isColor = key.toLowerCase() === 'cor';
        if (isColor) return renderColorSwatches(key, values);
        return (
          <div key={key}>
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">{key}</p>
            <select
              className="w-full h-10 rounded-lg border border-border/60 bg-background px-3 text-sm text-foreground"
              value={selectedAttrs[key] || ''}
              onChange={e => onSelectAttr(key, e.target.value)}
            >
              {values.map(val => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </div>
        );
      })}
      {/* Quantity stepper */}
      <div>
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Quantidade</p>
        <div className="flex items-center border border-border/60 rounded-lg w-fit">
          <button
            onClick={() => onUpdateQty('_single', -1)}
            className="w-9 h-9 grid place-items-center hover:bg-muted transition-colors"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-10 text-center text-sm font-semibold tabular-nums">
            {quantities['_single'] || 1}
          </span>
          <button
            onClick={() => onUpdateQty('_single', 1)}
            className="w-9 h-9 grid place-items-center hover:bg-muted transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Accordion section helper                                           */
/* ================================================================== */
function AccordionSection({ icon: Icon, title, children, defaultOpen = false }: {
  icon: React.ElementType; title: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-border/30">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 group"
      >
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
          <Icon className="h-4 w-4 text-muted-foreground" /> {title}
        </span>
        <ChevronDown className={cn(
          'h-4 w-4 text-muted-foreground transition-transform duration-200',
          open && 'rotate-180',
        )} />
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

/* ================================================================== */
/*  QuickViewShipping                                                  */
/* ================================================================== */
function QuickViewShipping({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [cep, setCep] = useState('');
  return (
    <AccordionSection icon={Truck} title="Calcular Frete" defaultOpen={defaultOpen}>
      <div className="flex items-center h-10 rounded-lg border border-border/60 overflow-hidden bg-background focus-within:ring-2 focus-within:ring-ring/25 transition-shadow">
        <div className="pl-3 pr-1 text-muted-foreground">
          <MapPin className="h-4 w-4" />
        </div>
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={cep}
          onChange={e => setCep(e.target.value)}
          maxLength={9}
          className="flex-1 h-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none px-2"
        />
        <button className="h-full px-4 text-xs font-semibold bg-foreground text-background hover:opacity-90 transition-opacity shrink-0">
          Calcular
        </button>
      </div>
    </AccordionSection>
  );
}

/* ================================================================== */
/*  QuickViewDescription                                               */
/* ================================================================== */
function QuickViewDescription({ product, defaultOpen = false }: { product: Product; defaultOpen?: boolean }) {
  if (!product.description) return null;
  return (
    <AccordionSection icon={Package} title="Descrição do Produto" defaultOpen={defaultOpen}>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {product.description}
      </p>
    </AccordionSection>
  );
}

/* ================================================================== */
/*  QuickViewFooter — sticky bottom                                    */
/* ================================================================== */
function QuickViewFooter({ onAddToCart, onBuyNow, qv, theme, installmentPrice, disabled }: {
  onAddToCart: () => void; onBuyNow: () => void; qv: any; theme: any; installmentPrice?: string; disabled?: boolean;
}) {
  const ctaSize = qv?.ctaSize === 'large' ? 'h-12' : 'h-11';
  return (
    <div className="sticky bottom-0 z-10 bg-background/95 backdrop-blur-sm border-t border-border/40 px-5 py-4 space-y-2">
      <button
        onClick={onAddToCart}
        disabled={disabled}
        className={cn(
          'w-full rounded-xl font-semibold text-sm inline-flex items-center justify-center gap-2',
          'transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring/25',
          ctaSize,
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 active:scale-[0.99]',
        )}
        style={{ backgroundColor: theme.colors.primary, color: theme.colors.primaryForeground }}
      >
        <ShoppingCart className="h-4 w-4" />
        {disabled ? 'Esgotado' : (qv?.ctaText || 'Adicionar ao Carrinho')}
      </button>
      {qv?.showSecondaryCta !== false && (
        <button
          onClick={onBuyNow}
          disabled={disabled}
          className={cn(
            'w-full rounded-xl font-medium text-sm inline-flex items-center justify-center gap-2',
            'border border-border/60 text-foreground transition-colors',
            qv?.ctaSize === 'large' ? 'h-11' : 'h-10',
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted',
          )}
        >
          {qv?.ctaSecondaryText || 'Comprar Agora'}
        </button>
      )}
      {qv?.showInstallments && installmentPrice && (
        <p className="text-center text-xs text-muted-foreground">
          ou até 12x de {installmentPrice}
        </p>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Main ProductQuickView                                              */
/* ================================================================== */
interface QuickViewProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export function ProductQuickView({ product, open, onClose }: QuickViewProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const qv = theme.quickView;

  const [quantities, setQuantities] = useState<Record<string, number>>({ _single: 1 });
  const [selectedAttrs, setSelectedAttrs] = useState<Record<string, string>>(() => {
    // Pre-select first value for each attribute key
    const attrs: Record<string, string> = {};
    const variants = product.variants || [];
    if (variants.length > 0) {
      const keys = [...new Set(variants.flatMap(v => Object.keys(v.attributes)))];
      keys.forEach(k => {
        const vals = [...new Set(variants.map(v => v.attributes[k]))];
        // Prefer first in-stock value
        const inStockVal = vals.find(val => variants.some(v => v.attributes[k] === val && v.stock > 0));
        if (inStockVal) attrs[k] = inStockVal;
        else if (vals.length > 0) attrs[k] = vals[0];
      });
    }
    return attrs;
  });

  // Check if product is fully out of stock
  const isFullyOutOfStock = useMemo(() => {
    if (product.variants.length > 0) return product.variants.every(v => v.stock <= 0);
    return product.stock <= 0;
  }, [product]);

  const selectAttr = useCallback((key: string, value: string) => {
    setSelectedAttrs(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    // Block quantity changes for out-of-stock variants
    if (id !== '_single') {
      const v = product.variants.find(v => v.id === id);
      if (v && v.stock <= 0) return;
    }
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(id === '_single' ? 1 : 0, (prev[id] || (id === '_single' ? 1 : 0)) + delta),
    }));
  }, [product.variants]);

  // Find the variant matching selected attributes
  const matchedVariant = useMemo(() => {
    if (!product.variants.length) return undefined;
    return product.variants.find(v =>
      Object.entries(selectedAttrs).every(([k, val]) => v.attributes[k] === val)
    );
  }, [product.variants, selectedAttrs]);

  // Check if current selection is out of stock
  const isCurrentOutOfStock = useMemo(() => {
    const style = qv?.variationStyle || 'chips';
    if (style === 'list-compact') return false;
    if (matchedVariant) return matchedVariant.stock <= 0;
    return false;
  }, [matchedVariant, qv?.variationStyle]);

  const totalQty = Object.entries(quantities).reduce((sum, [k, v]) => {
    if (k === '_single') return sum + v;
    return sum + v;
  }, 0);

  const handleAddToCart = () => {
    const style = qv?.variationStyle || 'chips';
    if (style === 'list-compact') {
      Object.entries(quantities).forEach(([vid, qty]) => {
        if (vid === '_single' || qty <= 0) return;
        const variant = product.variants.find(v => v.id === vid);
        if (variant && variant.stock <= 0) return;
        for (let i = 0; i < qty; i++) addItem(product, variant);
      });
      const hasAny = Object.entries(quantities).some(([k, v]) => k !== '_single' && v > 0);
      if (!hasAny) return;
    } else {
      if (isCurrentOutOfStock) return;
      const singleQty = quantities._single || 1;
      for (let i = 0; i < singleQty; i++) addItem(product, matchedVariant);
    }
    onClose();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const installmentPrice = product.price > 100 ? formatCurrency(product.price / 12) : undefined;

  const model = qv?.model || 'drawer-right';
  const padding = qv?.containerPadding || 20;
  const spacing = qv?.sectionSpacing || 16;

  if (!qv?.enabled) return null;

  /* ── Body content ── */
  const body = (
    <div className="flex-1 overflow-y-auto qv-scrollbar" style={{ padding: `0 ${padding}px` }}>
      <div style={{ paddingTop: spacing, paddingBottom: spacing }} className="space-y-0">
        {/* Fully out of stock banner */}
        {isFullyOutOfStock && (
          <div className="mb-4 rounded-xl border border-border/50 bg-muted/50 px-4 py-3 text-center">
            <p className="text-sm font-semibold text-foreground">Produto Esgotado</p>
            <p className="text-xs text-muted-foreground mt-0.5">Este produto está temporariamente indisponível.</p>
          </div>
        )}
        {/* Gallery */}
        <div style={{ marginBottom: spacing }}>
          <QuickViewGallery product={product} qv={qv} />
        </div>

        {/* SKU */}
        {qv?.showSKU && (
          <p className="text-[10px] text-muted-foreground font-mono mb-2">SKU: {product.sku}</p>
        )}

        {/* Variants */}
        {product.variants.length > 0 && (
          <div style={{ marginBottom: spacing }}>
            <QuickViewVariants product={product} qv={qv} quantities={quantities} onUpdateQty={updateQty} selectedAttrs={selectedAttrs} onSelectAttr={selectAttr} />
          </div>
        )}

        {/* Accordions */}
        {qv?.showShipping !== false && <QuickViewShipping />}
        {qv?.showDescription !== false && <QuickViewDescription product={product} />}
        {product.sizeGuideId && (
          <AccordionSection icon={Ruler} title="Tabela de Medidas">
            <SizeGuideDisplay product={product} />
          </AccordionSection>
        )}

        {/* View product link */}
        {qv?.showViewProduct && (
          <button
            onClick={() => { onClose(); navigate(`/product/${product.slug}`); }}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Ver página completa do produto
          </button>
        )}

        {/* Share */}
        {qv?.showShare && (
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors py-1">
            <Share2 className="h-3.5 w-3.5" /> Compartilhar
          </button>
        )}
      </div>
    </div>
  );

  /* ── Full layout: header + body + footer ── */
  const fullContent = (
    <div className="flex flex-col h-full">
      <QuickViewHeader product={product} onClose={onClose} qv={qv} />
      {body}
      <QuickViewFooter
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        qv={qv}
        theme={theme}
        installmentPrice={installmentPrice}
        disabled={isCurrentOutOfStock || isFullyOutOfStock}
      />
    </div>
  );

  /* ── Modal layout: 2-column (gallery left, info right) ── */
  const modalContent = (
    <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] h-full overflow-hidden">
      <div className="hidden md:flex md:flex-col bg-secondary/20 overflow-hidden">
        <div className="flex-shrink-0 p-5 pb-0">
          <QuickViewGallery product={product} qv={qv} />
        </div>
        <div className="flex-1 overflow-y-auto qv-scrollbar px-5 pb-5">
          <div className="mt-4">
            {qv?.showDescription !== false && <QuickViewDescription product={product} defaultOpen />}
            {product.sizeGuideId && (
              <AccordionSection icon={Ruler} title="Tabela de Medidas" defaultOpen>
                <SizeGuideDisplay product={product} />
              </AccordionSection>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full overflow-hidden">
        <QuickViewHeader product={product} onClose={onClose} qv={qv} />
        <div className="flex-1 overflow-y-auto qv-scrollbar" style={{ padding: `0 ${padding}px` }}>
          <div style={{ paddingTop: spacing, paddingBottom: spacing }} className="space-y-0">
            {/* Mobile gallery */}
            <div className="md:hidden" style={{ marginBottom: spacing }}>
              <QuickViewGallery product={product} qv={qv} />
            </div>
            {qv?.showSKU && (
              <p className="text-[10px] text-muted-foreground font-mono mb-2">SKU: {product.sku}</p>
            )}
            {product.variants.length > 0 && (
              <div style={{ marginBottom: spacing }}>
                <QuickViewVariants product={product} qv={qv} quantities={quantities} onUpdateQty={updateQty} selectedAttrs={selectedAttrs} onSelectAttr={selectAttr} />
              </div>
            )}
            {qv?.showShipping !== false && <QuickViewShipping defaultOpen />}
            {qv?.showDescription !== false && <div className="md:hidden"><QuickViewDescription product={product} defaultOpen /></div>}
            {product.sizeGuideId && (
              <div className="md:hidden">
                <AccordionSection icon={Ruler} title="Tabela de Medidas">
                  <SizeGuideDisplay product={product} />
                </AccordionSection>
              </div>
            )}
            {qv?.showViewProduct && (
              <button
                onClick={() => { onClose(); navigate(`/product/${product.slug}`); }}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Ver página completa
              </button>
            )}
          </div>
        </div>
        <QuickViewFooter
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          qv={qv}
          theme={theme}
          installmentPrice={installmentPrice}
          disabled={isCurrentOutOfStock || isFullyOutOfStock}
        />
      </div>
    </div>
  );

  const containerCn = cn(radiusMap[qv?.containerRadius || 'md']);
  const shadowCn = shadowMap[qv?.containerShadow || 'md'];
  const borderCn = qv?.containerBorder ? 'border border-border/40' : '';

  // Animation classes
  const animType = qv?.animationType || 'slide';

  /* ── Render based on model ── */
  if (model === 'modal-center') {
    return (
      <Dialog open={open} onOpenChange={v => !v && onClose()}>
        <DialogContent
          className={cn(
            'p-0 overflow-hidden max-w-none',
            containerCn, shadowCn, borderCn,
          )}
          style={{
            width: `min(${qv?.modalWidth || 860}px, 94vw)`,
            height: 'min(720px, 90vh)',
          }}
        >
          {modalContent}
        </DialogContent>
      </Dialog>
    );
  }

  if (model === 'bottom-sheet') {
    return (
      <>
        {/* Desktop: drawer right */}
        <div className="hidden md:block">
          <Sheet open={open} onOpenChange={v => !v && onClose()}>
            <SheetContent
              side="right"
              className={cn('w-full p-0 overflow-hidden', borderCn)}
              style={{ maxWidth: `${qv?.drawerWidth || 480}px` }}
            >
              {fullContent}
            </SheetContent>
          </Sheet>
        </div>
        {/* Mobile: bottom sheet */}
        <div className="md:hidden">
          <Drawer open={open} onOpenChange={v => !v && onClose()}>
            <DrawerContent className="max-h-[90vh] p-0">
              {fullContent}
            </DrawerContent>
          </Drawer>
        </div>
      </>
    );
  }

  // drawer-right or drawer-left
  const side = model === 'drawer-left' ? 'left' : 'right';
  return (
    <Sheet open={open} onOpenChange={v => !v && onClose()}>
      <SheetContent
        side={side as any}
        className={cn('w-full p-0 overflow-hidden', borderCn)}
        style={{ maxWidth: `${qv?.drawerWidth || 480}px` }}
      >
        {fullContent}
      </SheetContent>
    </Sheet>
  );
}
