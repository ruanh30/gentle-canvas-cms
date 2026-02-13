/**
 * Server-side ProductCard (Inertia) — NO react-router-dom
 * Full-featured: badges, hover effects, buy/add buttons, theme config
 */
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';
import { ShoppingBag, Heart, Eye } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  images: string[];
  tags?: string[];
  stock?: number;
  rating?: number;
  reviewCount?: number;
}

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
  const isOutline = btnStyle === 'outline';
  const isUnderline = btnStyle === 'underline';
  const isGradient = btnStyle === 'gradient';
  return (
    <button
      onClick={onClick}
      className={cn(
        'py-2 text-xs font-medium transition-all hover:opacity-90',
        btnStyleMap[btnStyle] || 'rounded-md',
        sideBySide ? 'flex-1' : 'w-full',
      )}
      style={
        isOutline ? { border: `2px solid ${color}`, color, backgroundColor: 'transparent' }
        : isUnderline ? { borderBottom: `2px solid ${color}`, color, backgroundColor: 'transparent' }
        : isGradient ? { background: `linear-gradient(135deg, ${color}, ${hoverColor})`, color: '#fff' }
        : { backgroundColor: color, color: '#fff' }
      }
    >
      {label}
    </button>
  );
}

function CartButton({ label, btnStyle, sideBySide, compact, onClick }: {
  label: string; btnStyle: string; sideBySide: boolean; compact?: boolean; onClick: (e: React.MouseEvent) => void;
}) {
  const isOutline = btnStyle === 'outline';
  const isUnderline = btnStyle === 'underline';
  const isGradient = btnStyle === 'gradient';
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-xs font-medium transition-all hover:opacity-90',
        btnStyleMap[btnStyle] || 'rounded-md',
        compact ? 'px-4 py-1.5' : sideBySide ? 'flex-1 py-2' : 'w-full py-2',
        isOutline && 'border-2 border-foreground text-foreground bg-transparent',
        isUnderline && 'border-b-2 border-foreground text-foreground bg-transparent',
        isGradient && 'bg-gradient-to-r from-foreground/90 to-foreground text-background',
        !isOutline && !isUnderline && !isGradient && 'bg-foreground text-background',
      )}
    >
      {label}
    </button>
  );
}

export function ProductCard({ product }: Props) {
  const { theme } = useTheme();
  const c: any = theme.productCard ?? {};

  const href = `./product/${encodeURIComponent(product.slug)}`;
  const img = product.images?.[0] ?? '';
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Inertia: dispatch to cart logic (localStorage or server route)
    window.dispatchEvent(new CustomEvent('add-to-cart', { detail: { product } }));
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('add-to-cart', { detail: { product } }));
    window.location.href = './cart';
  };

  return (
    <div className={cn(
      'group relative',
      shadowMap[c.shadow],
      c.hoverShadow && 'hover:shadow-lg transition-shadow',
      c.border && 'border border-border',
      radiusMap[c.imageBorderRadius],
      c.contentAlign === 'center' && 'text-center',
    )}>
      <a href={href} className="block">
        <div className={cn(
          'overflow-hidden bg-secondary relative',
          aspectMap[c.imageAspect] || 'aspect-[3/4]',
          radiusMap[c.imageBorderRadius],
        )}>
          {img ? (
            <img
              src={img}
              alt={product.name}
              className={cn('h-full w-full object-cover transition-transform duration-500', hoverClass)}
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">
              Sem imagem
            </div>
          )}

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
              <button className="bg-background/90 backdrop-blur-sm p-2 rounded-full hover:bg-background shadow-sm">
                <Eye className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className={cn('px-1 pb-2', spacingMap[c.spacing] ?? 'mt-3 space-y-1')}>
          {c.showCategory && product.tags?.[0] && (
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.tags[0]}</p>
          )}
          <h3 className={cn(
            'text-sm font-medium leading-tight',
            c.titleLines === 1 ? 'line-clamp-1' : c.titleLines === 2 ? 'line-clamp-2' : 'line-clamp-3',
          )}>{product.name}</h3>
          <div className={cn('flex items-center gap-2', c.contentAlign === 'center' && 'justify-center')}>
            <span className={cn('font-semibold', priceTextMap[c.priceSize] ?? 'text-sm')}>
              {formatCurrency(product.price)}
            </span>
            {c.showComparePrice && product.compareAtPrice ? (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
            ) : null}
          </div>
          {c.showInstallments && product.price > 100 && (
            <p className="text-xs text-muted-foreground">
              até 12x de {formatCurrency(product.price / 12)}
            </p>
          )}
        </div>
      </a>

      {/* Action buttons */}
      <div className={cn('px-1 pb-2', c.buttonLayout === 'side-by-side' ? 'flex gap-1' : 'space-y-1')}>
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
              onClick={handleAddToCart}
            />
          ) : c.addToCartStyle === 'button' ? (
            <CartButton
              label={c.addToCartText || 'Adicionar'}
              btnStyle={c.buttonStyle || 'solid'}
              sideBySide={false}
              compact
              onClick={handleAddToCart}
            />
          ) : (
            <button
              onClick={handleAddToCart}
              className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-background shadow-sm"
              aria-label={c.addToCartText || 'Adicionar ao carrinho'}
            >
              <ShoppingBag className="h-4 w-4" />
            </button>
          )
        )}
      </div>
    </div>
  );
}
