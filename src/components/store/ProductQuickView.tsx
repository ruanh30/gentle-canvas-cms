import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/format';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { mockProducts } from '@/data/mock';
import {
  Heart, Share2, Minus, Plus, Star, Truck,
  ShoppingCart, ChevronLeft, ChevronRight, Tag, X,
  ChevronDown, ChevronUp, FileText, MapPin, Package,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

/** Icon button – 40×40, border, hover bg, focus ring (Duetto pattern) */
function IconBtn({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        'w-10 h-10 grid place-items-center rounded-full border border-border/60',
        'bg-background transition-all duration-150',
        'hover:bg-muted hover:border-border',
        'focus:outline-none focus:ring-2 focus:ring-ring/25',
        className,
      )}
    >
      {children}
    </button>
  );
}

/** Quantity stepper – bordered container, -/+, centered value */
function Stepper({ value, onMinus, onPlus }: { value: number; onMinus: () => void; onPlus: () => void }) {
  return (
    <div className="flex items-center border border-border/60 rounded-[10px] overflow-hidden h-10 bg-background">
      <button
        onClick={onMinus}
        className="w-10 h-10 grid place-items-center hover:bg-muted transition-colors"
      >
        <Minus className="h-3.5 w-3.5 text-foreground" />
      </button>
      <span className="w-11 text-center text-sm font-semibold text-foreground select-none tabular-nums">
        {value}
      </span>
      <button
        onClick={onPlus}
        className="w-10 h-10 grid place-items-center hover:bg-muted transition-colors"
      >
        <Plus className="h-3.5 w-3.5 text-foreground" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Color helper                                                       */
/* ------------------------------------------------------------------ */
const colorHex: Record<string, string> = {
  Branca: '#ffffff', Preta: '#111827', Azul: '#3b82f6',
  Cinza: '#9ca3af', Verde: '#22c55e', Vermelha: '#ef4444',
  Rosa: '#ec4899', Amarela: '#eab308', Laranja: '#f97316',
};

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

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

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [variantQuantities, setVariantQuantities] = useState<Record<string, number>>({});
  const [showDescription, setShowDescription] = useState(true);
  const [cep, setCep] = useState('');

  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  const variants = product.variants || [];

  const updateQty = (variantId: string, delta: number) => {
    setVariantQuantities(prev => ({
      ...prev,
      [variantId]: Math.max(0, (prev[variantId] || 0) + delta),
    }));
  };

  const totalQty = Object.values(variantQuantities).reduce((a, b) => a + b, 0);

  const handleAddToCart = () => {
    Object.entries(variantQuantities).forEach(([variantId, qty]) => {
      if (qty > 0) {
        const variant = variants.find(v => v.id === variantId);
        for (let i = 0; i < qty; i++) addItem(product, variant);
      }
    });
    if (totalQty === 0) addItem(product);
    onClose();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const relatedProducts = useMemo(() => {
    return mockProducts
      .filter(p => p.id !== product.id && p.categoryId === product.categoryId)
      .slice(0, qv?.relatedCount || 6);
  }, [product.id, product.categoryId, qv?.relatedCount]);

  /* ---------------------------------------------------------------- */
  /*  Gallery (left side)                                              */
  /* ---------------------------------------------------------------- */
  const gallery = (
    <div className="relative flex gap-3 p-5 md:p-6 h-full">
      {/* Thumbnails */}
      {qv?.showGalleryThumbs !== false && product.images.length > 1 && (
        <div className="hidden md:flex flex-col gap-2 w-14 shrink-0">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImageIndex(i)}
              className={cn(
                'w-14 h-14 rounded-xl overflow-hidden border-2 transition-all',
                i === activeImageIndex
                  ? 'border-foreground shadow-sm'
                  : 'border-border/30 hover:border-border/60',
              )}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="flex-1 relative">
        <div className="w-full h-full rounded-xl overflow-hidden bg-secondary">
          <img
            src={product.images[activeImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Nav arrows */}
        {product.images.length > 1 && (
          <>
            <IconBtn
              onClick={() => setActiveImageIndex(i => i > 0 ? i - 1 : product.images.length - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 shadow-md bg-background/90 backdrop-blur-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </IconBtn>
            <IconBtn
              onClick={() => setActiveImageIndex(i => i < product.images.length - 1 ? i + 1 : 0)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 shadow-md bg-background/90 backdrop-blur-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </IconBtn>
          </>
        )}

        {/* Progress dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {product.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImageIndex(i)}
              className={cn(
                'h-1.5 rounded-full transition-all',
                i === activeImageIndex ? 'w-6 bg-foreground' : 'w-2.5 bg-foreground/25',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Info panel (right side – scrollable)                             */
  /* ---------------------------------------------------------------- */
  const infoPanel = (
    <div className="overflow-y-auto md:border-l border-border/40 qv-scrollbar">
      <div className="p-5 md:p-6 space-y-5">

        {/* ── Close (mobile) ── */}
        <div className="flex justify-end md:hidden">
          <IconBtn onClick={onClose} className="w-9 h-9">
            <X className="h-4 w-4" />
          </IconBtn>
        </div>

        {/* ── 1. Title + meta ── */}
        <div>
          <h2 className="text-xl font-semibold leading-snug tracking-tight text-foreground">
            {product.name}
          </h2>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            {qv?.showTags && product.tags?.[0] && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Tag className="h-3 w-3" /> {product.tags[0]}
              </span>
            )}
            {qv?.showSalesCount && product.reviewCount > 0 && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <ShoppingCart className="h-3 w-3" /> {product.reviewCount} vendas
              </span>
            )}
            {qv?.showRating && product.rating > 0 && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {product.rating}
              </span>
            )}
          </div>
        </div>

        {/* ── 2. Price + discount ── */}
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-bold tracking-tight text-foreground">
            {formatCurrency(product.price)}
          </span>
          {product.compareAtPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
              <span className="text-xs font-bold bg-foreground/10 text-foreground px-2 py-0.5 rounded-full">
                -{discount}%
              </span>
            </>
          )}
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-border/50" />

        {/* ── 3. Variations ── */}
        {qv?.showVariations !== false && variants.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Escolha as Variações</p>
            <div>
              {variants.map((v, idx) => (
                <div
                  key={v.id}
                  className={cn(
                    'flex items-center justify-between gap-3 py-3',
                    idx < variants.length - 1 && 'border-b border-border/30',
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Color swatch */}
                    {v.attributes.cor && (
                      <div
                        className="w-3.5 h-3.5 rounded shrink-0 border border-border/60"
                        style={{ backgroundColor: colorHex[v.attributes.cor] || '#ddd' }}
                      />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{v.name}</p>
                      {qv?.showSKU && (
                        <p className="text-[11px] text-muted-foreground font-mono mt-0.5"># {v.sku}</p>
                      )}
                    </div>
                  </div>
                  {qv?.showQuantityPerVariation !== false && (
                    <Stepper
                      value={variantQuantities[v.id] || 0}
                      onMinus={() => updateQty(v.id, -1)}
                      onPlus={() => updateQty(v.id, 1)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Divider ── */}
        <div className="h-px bg-border/50" />

        {/* ── 4. Shipping ── */}
        {qv?.showShippingEstimate !== false && (
          <div>
            <p className="text-sm font-semibold text-foreground mb-3 inline-flex items-center gap-2">
              <Truck className="h-4 w-4" /> Calcular Frete
            </p>
            <div className="flex items-center h-11 rounded-xl border border-border/60 overflow-hidden bg-background focus-within:ring-2 focus-within:ring-ring/25 transition-shadow">
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
              <button
                className="h-full px-5 text-sm font-semibold bg-foreground text-background hover:opacity-90 transition-opacity shrink-0"
              >
                Calcular
              </button>
            </div>
          </div>
        )}

        {/* ── Divider ── */}
        <div className="h-px bg-border/50" />

        {/* ── 5. CTA ── */}
        <div className="space-y-2.5">
          <button
            onClick={handleAddToCart}
            className={cn(
              'w-full h-12 rounded-xl font-semibold text-sm',
              'inline-flex items-center justify-center gap-2',
              'border border-foreground/10 shadow-md',
              'transition-all duration-150',
              'hover:-translate-y-0.5 hover:shadow-lg',
              'active:translate-y-0 active:shadow-none',
              'focus:outline-none focus:ring-2 focus:ring-ring/25',
            )}
            style={qv?.ctaStyle === 'outline'
              ? { border: `2px solid ${theme.colors.primary}`, color: theme.colors.primary, backgroundColor: 'transparent' }
              : { backgroundColor: theme.colors.primary, color: theme.colors.primaryForeground }
            }
          >
            <ShoppingCart className="h-4 w-4" />
            {qv?.ctaText || 'Adicionar ao Carrinho'}
          </button>
          {qv?.showBuyNow && (
            <button
              onClick={handleBuyNow}
              className={cn(
                'w-full h-12 rounded-xl font-semibold text-sm',
                'inline-flex items-center justify-center gap-2',
                'border border-foreground/10 shadow-md',
                'transition-all duration-150',
                'hover:-translate-y-0.5 hover:shadow-lg',
                'active:translate-y-0 active:shadow-none',
                'focus:outline-none focus:ring-2 focus:ring-ring/25',
              )}
              style={{ backgroundColor: theme.colors.buyNow, color: '#fff' }}
            >
              {qv?.buyNowText || 'Comprar Agora'}
            </button>
          )}
        </div>

        {/* ── 6. Social actions (icon buttons) ── */}
        {qv?.showSocialActions !== false && (
          <div className="flex items-center justify-center gap-3 pt-1">
            {qv?.socialActions?.wishlist !== false && (
              <IconBtn aria-label="Favoritar">
                <Heart className="h-[18px] w-[18px] text-muted-foreground" />
              </IconBtn>
            )}
            {qv?.socialActions?.share !== false && (
              <IconBtn aria-label="Compartilhar">
                <Share2 className="h-[18px] w-[18px] text-muted-foreground" />
              </IconBtn>
            )}
          </div>
        )}

        {/* ── Divider ── */}
        <div className="h-px bg-border/50" />

        {/* ── 7. Description (accordion, starts open) ── */}
        {qv?.showDescription !== false && product.description && (
          <div>
            <button
              onClick={() => setShowDescription(!showDescription)}
              className="w-full flex items-center justify-between py-1 group"
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                <FileText className="h-4 w-4 text-muted-foreground" /> Descrição do Produto
              </span>
              <ChevronDown className={cn(
                'h-4 w-4 text-muted-foreground transition-transform duration-200',
                showDescription && 'rotate-180',
              )} />
            </button>
            {showDescription && (
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>
        )}

        {/* ── Divider ── */}
        {qv?.showRelatedProducts !== false && relatedProducts.length > 0 && (
          <div className="h-px bg-border/50" />
        )}

        {/* ── 8. Related products ── */}
        {qv?.showRelatedProducts !== false && relatedProducts.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-foreground mb-3 inline-flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              {qv?.relatedTitle || 'Produtos Relacionados'}
            </p>
            <div className="relative">
              <div className="flex gap-3 overflow-x-auto pb-2 qv-scrollbar-h">
                {relatedProducts.map(rp => (
                  <button
                    key={rp.id}
                    onClick={() => { onClose(); navigate(`/product/${rp.slug}`); }}
                    className="shrink-0 w-28 group/related text-left"
                  >
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-secondary mb-1.5 border border-border/20">
                      <img
                        src={rp.images[0]}
                        alt={rp.name}
                        className="w-full h-full object-cover group-hover/related:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-[11px] font-medium text-foreground line-clamp-1">{rp.name}</p>
                    <p className="text-[11px] text-muted-foreground">{formatCurrency(rp.price)}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Content: grid layout (60/40)                                     */
  /* ---------------------------------------------------------------- */
  const content = (
    <div className="grid grid-cols-1 md:grid-cols-[1.2fr_.8fr] h-full">
      {/* Left – gallery (stable, no scroll) */}
      <div className="hidden md:flex bg-secondary/30">
        {gallery}
      </div>
      {/* Mobile gallery */}
      <div className="md:hidden">
        {gallery}
      </div>
      {/* Right – info (scrollable) */}
      {infoPanel}
    </div>
  );

  if (!qv?.enabled) return null;

  if (qv?.style === 'drawer' || qv?.style === 'side-panel') {
    return (
      <Sheet open={open} onOpenChange={v => !v && onClose()}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto p-0">
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="w-[min(1100px,92vw)] max-w-none h-[min(720px,92vh)] p-0 overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(2,6,23,0.20)] border-border/40">
        {content}
      </DialogContent>
    </Dialog>
  );
}
