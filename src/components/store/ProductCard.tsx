import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/format';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ShoppingBag, Heart, Eye, X, Minus, Plus, Star, Truck, Zap, CreditCard, Sparkles, ArrowRight, Rocket, BadgeCheck, Tag, ShoppingCart, PackagePlus, Store, Flame, Send, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Zap, CreditCard, Sparkles, ArrowRight, Rocket, BadgeCheck, Tag, Flame, Send,
  ShoppingBag, ShoppingCart, Plus, PackagePlus, Heart, Store,
};
import { Button } from '@/components/ui/button';
import { ProductQuickView } from './ProductQuickView';

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


const btnStyleMap: Record<string, string> = {
  solid: 'rounded-md',
  outline: 'rounded-md',
  pill: 'rounded-full',
  rounded: 'rounded-xl',
  sharp: 'rounded-none',
  gradient: 'rounded-md',
  underline: 'rounded-none',
};

function BuyButton({ label, btnStyle, color, hoverColor, sideBySide, onClick, buyNowIcon }: {
  label: string; btnStyle: string; color: string; hoverColor: string; sideBySide: boolean; onClick: (e: React.MouseEvent) => void; buyNowIcon?: string;
}) {
  const { theme } = useTheme();
  const b = theme.buttons;
  const isOutline = btnStyle === 'outline';
  const isUnderline = btnStyle === 'underline';
  const isGradient = btnStyle === 'gradient';
  const BuyIcon = iconMap[buyNowIcon || ''] || Zap;

  const btnColors: React.CSSProperties = {
    textTransform: (b?.uppercase ? 'uppercase' : 'none') as React.CSSProperties['textTransform'],
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'pm-theme-btn font-medium transition-all hover:opacity-90 inline-flex items-center justify-center w-full overflow-hidden',
        btnStyleMap[btnStyle] || 'rounded-md',
      )}
      style={{
        ...btnColors,
        ...(isOutline
          ? { border: `2px solid ${color}`, color, backgroundColor: 'transparent' }
          : isUnderline
          ? { borderBottom: `2px solid ${color}`, color, backgroundColor: 'transparent' }
          : isGradient
          ? { background: `linear-gradient(135deg, ${color}, ${hoverColor})`, color: '#fff' }
          : { backgroundColor: color, color: '#fff' }),
      }}
    >
      <BuyIcon className="h-3.5 w-3.5 mr-1.5 shrink-0" />
      <span className="truncate">{label}</span>
    </button>
  );
}

function CartButton({ label, btnStyle, sideBySide, compact, onClick, cartIcon }: {
  label: string; btnStyle: string; sideBySide: boolean; compact?: boolean; onClick: (e: React.MouseEvent) => void; cartIcon?: string;
}) {
  const { theme } = useTheme();
  const b = theme.buttons;
  const isOutline = btnStyle === 'outline';
  const isUnderline = btnStyle === 'underline';
  const isGradient = btnStyle === 'gradient';
  const CartIcon = iconMap[cartIcon || ''] || ShoppingBag;

  const btnColors: React.CSSProperties = {
    textTransform: b?.uppercase ? 'uppercase' : 'none',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'pm-theme-btn font-medium transition-all hover:opacity-90 inline-flex items-center justify-center w-full overflow-hidden',
        btnStyleMap[btnStyle] || 'rounded-md',
        isOutline && 'border-2 border-foreground text-foreground bg-transparent',
        isUnderline && 'border-b-2 border-foreground text-foreground bg-transparent',
        isGradient && 'bg-gradient-to-r from-foreground/90 to-foreground text-background',
        !isOutline && !isUnderline && !isGradient && 'bg-foreground text-background',
      )}
      style={btnColors}
    >
      <CartIcon className="h-3.5 w-3.5 mr-1.5 shrink-0" />
      <span className="truncate">{label}</span>
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

  const showBuy = c.showBuyNow !== false;

  const handleClick = (e: React.MouseEvent) => {
    if (theme.quickView?.enabled) {
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
      <div
        className={cn(
          'group relative pm-global-border transition-all duration-300',
          radiusMap[c.imageBorderRadius],
          'text-center',
        )}
        style={{
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'; }}
      >
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
            <div className={cn('flex items-center gap-2 justify-center')}>
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

        {/* Buy button — optionally appears on hover with slide-up animation */}
        <div className={cn(
          'px-3 pb-3 mt-2 transition-all duration-300 ease-out',
          c.buyNowHoverReveal !== false && 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0',
        )}>
          {showBuy && (
            <BuyButton
              label={c.buyNowText || 'Comprar Agora'}
              btnStyle={c.buttonStyle || 'solid'}
              color={theme.colors.buyNow}
              hoverColor={theme.colors.buyNowHover}
              sideBySide={false}
              onClick={handleBuyNow}
              buyNowIcon={c.buyNowIcon}
            />
          )}
        </div>

      </div>

      {showPreview && (
        <ProductQuickView
          product={product}
          open={showPreview}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}
