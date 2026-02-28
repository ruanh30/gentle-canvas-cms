import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/format';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { mockProducts } from '@/data/mock';
import {
  Heart, MessageCircle, Share2, Phone, Minus, Plus, Star, Truck,
  ShoppingCart, ChevronLeft, ChevronRight, Download, Tag, X,
  ChevronDown, ChevronUp,
} from 'lucide-react';

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
  const [showDescription, setShowDescription] = useState(qv?.descriptionStyle !== 'accordion');
  const [cep, setCep] = useState('');

  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  // Group variants by attributes
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
        for (let i = 0; i < qty; i++) {
          addItem(product, variant);
        }
      }
    });
    if (totalQty === 0) {
      addItem(product);
    }
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

  const [relatedScroll, setRelatedScroll] = useState(0);

  const content = (
    <div className="flex flex-col md:flex-row gap-0 max-h-[80vh]">
      {/* Left: Gallery */}
      <div className="md:w-1/2 flex gap-2 p-4">
        {/* Thumbnails */}
        {qv?.showGalleryThumbs !== false && product.images.length > 1 && (
          <div className="flex flex-col gap-1.5 w-16 shrink-0">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIndex(i)}
                className={cn(
                  'w-14 h-14 rounded-md overflow-hidden border-2 transition-all',
                  i === activeImageIndex ? 'border-foreground' : 'border-border/30 hover:border-border'
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
        {/* Main image */}
        <div className="flex-1 relative">
          <div className="aspect-[3/4] rounded-lg overflow-hidden bg-secondary">
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Image navigation */}
          {product.images.length > 1 && (
            <>
              <button
                onClick={() => setActiveImageIndex(i => i > 0 ? i - 1 : product.images.length - 1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-1.5 rounded-full shadow hover:bg-background"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setActiveImageIndex(i => i < product.images.length - 1 ? i + 1 : 0)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-1.5 rounded-full shadow hover:bg-background"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
          {/* Image progress bar */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {product.images.map((_, i) => (
              <div key={i} className={cn('h-0.5 rounded-full transition-all', i === activeImageIndex ? 'w-6 bg-foreground' : 'w-3 bg-foreground/30')} />
            ))}
          </div>
          {/* Download */}
          {qv?.showDownloadImage && (
            <button className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow hover:bg-background">
              <Download className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Right: Info */}
      <div className="md:w-1/2 overflow-y-auto p-4 pt-2 space-y-4">
        {/* Close button for mobile */}
        <div className="flex justify-end md:hidden">
          <button onClick={onClose} className="p-1"><X className="h-5 w-5" /></button>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-xl font-display font-bold leading-tight">{product.name}</h2>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
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
              <span className="inline-flex items-center gap-1 text-xs">
                <Star className="h-3 w-3 fill-foreground text-foreground" /> {product.rating}
              </span>
            )}
          </div>
        </div>

        {/* Price */}
        <div>
          <span className="text-2xl font-bold">{formatCurrency(product.price)}</span>
          {product.compareAtPrice && (
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm text-muted-foreground line-through">{formatCurrency(product.compareAtPrice)}</span>
              <span className="text-xs bg-foreground text-background px-1.5 py-0.5 rounded font-bold">-{discount}%</span>
            </div>
          )}
        </div>

        {/* Variations */}
        {qv?.showVariations !== false && variants.length > 0 && (
          <fieldset className="border border-border/50 rounded-lg p-3">
            <legend className="text-xs font-semibold px-2">Escolha as Variações</legend>
            <div className="space-y-2.5 mt-1">
              {variants.map(v => (
                <div key={v.id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {/* Color dot */}
                    {v.attributes.cor && (
                      <div className="w-4 h-4 rounded border border-border/50 shrink-0"
                        style={{ backgroundColor: v.attributes.cor === 'Branca' ? '#fff' : v.attributes.cor === 'Preta' ? '#000' : v.attributes.cor === 'Azul' ? '#3b82f6' : v.attributes.cor === 'Cinza' ? '#9ca3af' : v.attributes.cor === 'Verde' ? '#22c55e' : '#ddd' }}
                      />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{v.name}</p>
                      {qv?.showSKU && <p className="text-[10px] text-muted-foreground font-mono"># {v.sku}</p>}
                    </div>
                  </div>
                  {/* Quantity stepper */}
                  {qv?.showQuantityPerVariation !== false && (
                    <div className="flex items-center border rounded-lg shrink-0">
                      <button onClick={() => updateQty(v.id, -1)} className="p-1.5 hover:bg-secondary rounded-l-lg">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{variantQuantities[v.id] || 0}</span>
                      <button onClick={() => updateQty(v.id, 1)} className="p-1.5 hover:bg-secondary rounded-r-lg">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </fieldset>
        )}

        {/* Shipping estimate */}
        {qv?.showShippingEstimate !== false && (
          <fieldset className="border border-border/50 rounded-lg p-3">
            <legend className="text-xs font-semibold px-2 inline-flex items-center gap-1">
              <Truck className="h-3 w-3" /> Simular Frete
            </legend>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 border rounded-md px-2 py-1.5 text-xs shrink-0">
                🇧🇷 BR
              </div>
              <Input
                placeholder="00000-000"
                value={cep}
                onChange={e => setCep(e.target.value)}
                className="h-8 text-sm flex-1"
                maxLength={9}
              />
              <Button size="sm" className="h-8 text-xs shrink-0">
                Calcular
              </Button>
            </div>
          </fieldset>
        )}

        {/* CTA Button */}
        <div className="space-y-2">
          <Button
            className="w-full h-11 text-sm font-semibold"
            style={qv?.ctaStyle === 'outline'
              ? { border: `2px solid ${theme.colors.primary}`, color: theme.colors.primary, backgroundColor: 'transparent' }
              : { backgroundColor: theme.colors.primary, color: theme.colors.primaryForeground }
            }
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {qv?.ctaText || 'Adicionar ao Carrinho'}
          </Button>
          {qv?.showBuyNow && (
            <Button
              className="w-full h-11 text-sm font-semibold"
              style={{ backgroundColor: theme.colors.buyNow, color: '#fff' }}
              onClick={handleBuyNow}
            >
              {qv?.buyNowText || 'Comprar Agora'}
            </Button>
          )}
        </div>

        {/* Social actions */}
        {qv?.showSocialActions !== false && (
          <div className="flex items-center justify-center gap-6 py-2">
            {qv?.socialActions?.wishlist !== false && (
              <button className="text-muted-foreground hover:text-foreground transition-colors"><Heart className="h-5 w-5" /></button>
            )}
            {qv?.socialActions?.chat !== false && (
              <button className="text-muted-foreground hover:text-foreground transition-colors"><MessageCircle className="h-5 w-5" /></button>
            )}
            {qv?.socialActions?.share !== false && (
              <button className="text-muted-foreground hover:text-foreground transition-colors"><Share2 className="h-5 w-5" /></button>
            )}
            {qv?.socialActions?.whatsapp !== false && (
              <button className="text-green-500 hover:text-green-600 transition-colors"><Phone className="h-5 w-5" /></button>
            )}
          </div>
        )}

        {/* Description */}
        {qv?.showDescription !== false && product.description && (
          <div className="border-t border-border/50 pt-3">
            {qv?.descriptionStyle === 'accordion' ? (
              <button
                onClick={() => setShowDescription(!showDescription)}
                className="w-full flex items-center justify-between text-sm font-semibold"
              >
                <span className="inline-flex items-center gap-2">📝 Descrição do Produto</span>
                {showDescription ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            ) : (
              <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2">📝 Descrição do Produto</p>
            )}
            {(showDescription || qv?.descriptionStyle !== 'accordion') && (
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{product.description}</p>
            )}
          </div>
        )}

        {/* Related products */}
        {qv?.showRelatedProducts !== false && relatedProducts.length > 0 && (
          <div className="border-t border-border/50 pt-3">
            <p className="text-sm font-semibold mb-3 inline-flex items-center gap-2">
              🏷️ {qv?.relatedTitle || 'Produtos Relacionados'}
            </p>
            <div className="relative">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {relatedProducts.map(rp => (
                  <button
                    key={rp.id}
                    onClick={() => { onClose(); navigate(`/product/${rp.slug}`); }}
                    className="shrink-0 w-28 group/related"
                  >
                    <div className="aspect-[3/4] rounded-md overflow-hidden bg-secondary mb-1">
                      <img src={rp.images[0]} alt={rp.name} className="w-full h-full object-cover group-hover/related:scale-105 transition-transform" />
                    </div>
                    <p className="text-[11px] font-medium line-clamp-1">{rp.name}</p>
                    <p className="text-[11px] text-muted-foreground">{formatCurrency(rp.price)}</p>
                  </button>
                ))}
              </div>
              {relatedProducts.length > 4 && (
                <>
                  <button className="absolute left-0 top-1/3 -translate-y-1/2 bg-background/90 shadow rounded-full p-1">
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button className="absolute right-0 top-1/3 -translate-y-1/2 bg-background/90 shadow rounded-full p-1">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
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
      <DialogContent className="max-w-3xl w-[95vw] p-0 overflow-hidden max-h-[85vh]">
        {content}
      </DialogContent>
    </Dialog>
  );
}
