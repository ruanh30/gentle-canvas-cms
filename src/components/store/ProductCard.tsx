import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/format';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ShoppingBag, Heart, Eye, X, Minus, Plus, Star, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface Props {
  product: Product;
}

const aspectMap: Record<string, string> = {
  '1:1': 'aspect-square',
  '3:4': 'aspect-[3/4]',
  '4:5': 'aspect-[4/5]',
  '2:3': 'aspect-[2/3]',
  '16:9': 'aspect-video',
};

const radiusMap: Record<string, string> = {
  none: 'rounded-none',
  small: 'rounded-sm',
  medium: 'rounded-lg',
  large: 'rounded-xl',
};

const shadowMap: Record<string, string> = {
  none: '',
  subtle: 'shadow-sm',
  medium: 'shadow-md',
  strong: 'shadow-lg',
};

const badgeRadiusMap: Record<string, string> = {
  square: 'rounded-none',
  rounded: 'rounded',
  pill: 'rounded-full',
};

const priceTextMap: Record<string, string> = {
  small: 'text-xs',
  medium: 'text-sm',
  large: 'text-base',
};

const spacingMap: Record<string, string> = {
  compact: 'mt-2 space-y-0.5',
  normal: 'mt-3 space-y-1',
  spacious: 'mt-4 space-y-2',
};

const badgePosMap: Record<string, string> = {
  'top-left': 'top-3 left-3',
  'top-right': 'top-3 right-3',
  'bottom-left': 'bottom-3 left-3',
};

function ProductQuickView({ product, open, onClose, style }: { product: Product; open: boolean; onClose: () => void; style: string }) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const c = theme.productCard;
  const [quantity, setQuantity] = useState(1);
  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  const showAdd = c.buttonVisibility === 'both' || c.buttonVisibility === 'add-only';
  const showBuy = c.buttonVisibility === 'both' || c.buttonVisibility === 'buy-only';

  const content = (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2">
        <div className="aspect-[3/4] rounded-lg overflow-hidden bg-secondary">
          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="md:w-1/2 space-y-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">SKU: {product.sku}</p>
          <h2 className="text-xl font-display font-bold">{product.name}</h2>
          {product.rating && (
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-3.5 w-3.5 fill-foreground text-foreground" />
              <span className="text-xs">{product.rating} ({product.reviewCount})</span>
            </div>
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">{formatCurrency(product.price)}</span>
          {product.compareAtPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">{formatCurrency(product.compareAtPrice)}</span>
              <span className="text-xs bg-foreground text-background px-1.5 py-0.5 rounded font-bold">-{discount}%</span>
            </>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{product.description}</p>

        <div className="flex items-center border rounded-lg w-fit">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-secondary"><Minus className="h-4 w-4" /></button>
          <span className="px-4 text-sm font-medium">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-secondary"><Plus className="h-4 w-4" /></button>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          {showBuy && (
            <Button
              className="w-full"
              style={{ backgroundColor: theme.colors.buyNow, color: '#fff' }}
              onClick={() => { addItem(product, undefined, quantity); navigate('/cart'); onClose(); }}
            >
              {c.buyNowText || 'Comprar Agora'}
            </Button>
          )}
          {showAdd && (
            <Button variant="outline" className="w-full" onClick={() => { addItem(product, undefined, quantity); onClose(); }}>
              <ShoppingBag className="mr-2 h-4 w-4" /> {c.addToCartText || 'Adicionar ao Carrinho'}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
          <Truck className="h-3.5 w-3.5" />
          <span>Frete grátis acima de R$ 299</span>
        </div>

        <button onClick={() => { onClose(); navigate(`/product/${product.slug}`); }} className="text-xs text-muted-foreground underline hover:text-foreground">
          Ver página completa →
        </button>
      </div>
    </div>
  );

  if (style === 'drawer' || style === 'side-panel') {
    return (
      <Sheet open={open} onOpenChange={v => !v && onClose()}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <div className="pt-6">{content}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {content}
      </DialogContent>
    </Dialog>
  );
}

const btnStyleMap: Record<string, string> = {
  solid: 'rounded-md',
  outline: 'rounded-md',
  pill: 'rounded-full',
  rounded: 'rounded-xl',
  sharp: 'rounded-none',
  gradient: 'rounded-md',
  underline: 'rounded-none',
};

function BuyButton({ label, btnStyle, color, hoverColor, sideBySide, onClick }: {
  label: string; btnStyle: string; color: string; hoverColor: string; sideBySide: boolean; onClick: (e: React.MouseEvent) => void;
}) {
  const { theme } = useTheme();
  const b = theme.buttons;
  const isOutline = btnStyle === 'outline';
  const isUnderline = btnStyle === 'underline';
  const isGradient = btnStyle === 'gradient';

  const btnDimensions = {
    padding: `${b?.paddingY ?? 10}px ${b?.paddingX ?? 16}px`,
    fontSize: `${b?.fontSize ?? 14}px`,
    fontWeight: b?.fontWeight ?? 600,
    textTransform: (b?.uppercase ? 'uppercase' : 'none') as React.CSSProperties['textTransform'],
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'pm-theme-btn font-medium transition-all hover:opacity-90 inline-flex items-center justify-center',
        btnStyleMap[btnStyle] || 'rounded-md',
        sideBySide && 'flex-1',
      )}
      style={{
        ...btnDimensions,
        ...(isOutline
          ? { border: `2px solid ${color}`, color, backgroundColor: 'transparent' }
          : isUnderline
          ? { borderBottom: `2px solid ${color}`, color, backgroundColor: 'transparent' }
          : isGradient
          ? { background: `linear-gradient(135deg, ${color}, ${hoverColor})`, color: '#fff' }
          : { backgroundColor: color, color: '#fff' }),
      }}
    >
      {label}
    </button>
  );
}

function CartButton({ label, btnStyle, sideBySide, compact, onClick }: {
  label: string; btnStyle: string; sideBySide: boolean; compact?: boolean; onClick: (e: React.MouseEvent) => void;
}) {
  const { theme } = useTheme();
  const b = theme.buttons;
  const isOutline = btnStyle === 'outline';
  const isUnderline = btnStyle === 'underline';
  const isGradient = btnStyle === 'gradient';

  const btnDimensions: React.CSSProperties = {
    padding: `${b?.paddingY ?? 10}px ${b?.paddingX ?? 16}px`,
    fontSize: `${b?.fontSize ?? 14}px`,
    fontWeight: b?.fontWeight ?? 600,
    textTransform: b?.uppercase ? 'uppercase' : 'none',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'pm-theme-btn font-medium transition-all hover:opacity-90 inline-flex items-center justify-center',
        btnStyleMap[btnStyle] || 'rounded-md',
        compact ? '' : sideBySide && 'flex-1',
        isOutline && 'border-2 border-foreground text-foreground bg-transparent',
        isUnderline && 'border-b-2 border-foreground text-foreground bg-transparent',
        isGradient && 'bg-gradient-to-r from-foreground/90 to-foreground text-background',
        !isOutline && !isUnderline && !isGradient && 'bg-foreground text-background',
      )}
      style={btnDimensions}
    >
      {label}
    </button>
  );
}

export function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const c = theme.productCard ?? {} as any;
  const [showPreview, setShowPreview] = useState(false);

  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  const hoverClass = c.imageHover === 'zoom'
    ? 'group-hover:scale-105'
    : c.imageHover === 'slide'
    ? 'group-hover:translate-x-1'
    : '';

  const visibility = c.buttonVisibility ?? 'both';
  const showAdd = (c.showAddToCart !== false) && (visibility === 'both' || visibility === 'add-only');
  const showBuy = (c.showBuyNow !== false) && (visibility === 'both' || visibility === 'buy-only');

  const handleClick = (e: React.MouseEvent) => {
    if (c.clickBehavior === 'modal') {
      e.preventDefault();
      setShowPreview(true);
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    navigate('/cart');
  };

  return (
    <>
      <div className={cn(
        'group relative',
        shadowMap[c.shadow],
        c.hoverShadow && 'hover:shadow-lg transition-shadow',
        c.border && 'border border-border',
        radiusMap[c.imageBorderRadius],
        c.contentAlign === 'center' && 'text-center',
      )}>
        <Link to={`/product/${product.slug}`} className="block" onClick={handleClick}>
          <div className={cn(
            'overflow-hidden bg-secondary relative',
            aspectMap[c.imageAspect] || 'aspect-[3/4]',
            radiusMap[c.imageBorderRadius],
          )}>
            <img
              src={product.images[0]}
              alt={product.name}
              className={cn('h-full w-full object-cover transition-transform duration-500', hoverClass)}
              loading="lazy"
            />
            {c.showDiscount && discount > 0 && (
              <span className={cn(
                'absolute bg-foreground text-background text-xs font-bold px-2 py-1',
                badgeRadiusMap[c.badgeStyle],
                badgePosMap[c.badgePosition],
              )}>
                {c.discountStyle === 'percentage' ? `-${discount}%` :
                 c.discountStyle === 'amount' ? `-${formatCurrency(product.compareAtPrice! - product.price)}` :
                 'OFERTA'}
              </span>
            )}

            <div className={cn(
              'absolute top-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200',
              c.badgePosition === 'top-right' ? 'left-3' : 'right-3',
            )}>
              {c.showWishlist && (
                <button className="bg-background/90 backdrop-blur-sm p-2 rounded-full hover:bg-background shadow-sm">
                  <Heart className="h-4 w-4" />
                </button>
              )}
              {c.showQuickView && (
                <button
                  className="bg-background/90 backdrop-blur-sm p-2 rounded-full hover:bg-background shadow-sm"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowPreview(true); }}
                >
                  <Eye className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className={cn(spacingMap[c.spacing])}>
            {c.showCategory && product.tags?.[0] && (
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.tags[0]}</p>
            )}
            <h3 className={cn(
              'text-sm font-medium leading-tight',
              c.titleLines === 1 ? 'line-clamp-1' : c.titleLines === 2 ? 'line-clamp-2' : 'line-clamp-3',
            )}>{product.name}</h3>
            <div className={cn('flex items-center gap-2', c.contentAlign === 'center' && 'justify-center')}>
              <span className={cn('font-semibold', priceTextMap[c.priceSize])}>{formatCurrency(product.price)}</span>
              {c.showComparePrice && product.compareAtPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              )}
            </div>
            {c.showInstallments && product.price > 100 && (
              <p className="text-xs text-muted-foreground">
                até 12x de {formatCurrency(product.price / 12)}
              </p>
            )}
          </div>
        </Link>

        {/* Action buttons */}
        <div className={cn('mt-2 flex', c.buttonLayout === 'side-by-side' ? 'flex-row gap-1 items-center justify-center' : 'flex-col gap-1 items-stretch w-fit', c.contentAlign === 'center' && 'mx-auto')}>
          {showBuy && (
            <BuyButton
              label={c.buyNowText || 'Comprar Agora'}
              btnStyle={c.buttonStyle || 'solid'}
              color={theme.colors.buyNow}
              hoverColor={theme.colors.buyNowHover}
              sideBySide={c.buttonLayout === 'side-by-side'}
              onClick={handleBuyNow}
            />
          )}
          {showAdd && (
            c.addToCartStyle === 'full-width' || c.buttonLayout === 'side-by-side' ? (
              <CartButton
                label={c.addToCartText || 'Adicionar ao Carrinho'}
                btnStyle={c.buttonStyle || 'solid'}
                sideBySide={c.buttonLayout === 'side-by-side'}
                onClick={(e) => { e.preventDefault(); addItem(product); }}
              />
            ) : c.addToCartStyle === 'button' ? (
              <CartButton
                label={c.addToCartText || 'Adicionar'}
                btnStyle={c.buttonStyle || 'solid'}
                sideBySide={false}
                compact
                onClick={(e) => { e.preventDefault(); addItem(product); }}
              />
            ) : (
              <button
                onClick={(e) => { e.preventDefault(); addItem(product); }}
                className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-background shadow-sm"
                aria-label={c.addToCartText || 'Adicionar ao carrinho'}
              >
                <ShoppingBag className="h-4 w-4" />
              </button>
            )
          )}
        </div>
      </div>

      {showPreview && (
        <ProductQuickView
          product={product}
          open={showPreview}
          onClose={() => setShowPreview(false)}
          style={c.quickViewStyle}
        />
      )}
    </>
  );
}
