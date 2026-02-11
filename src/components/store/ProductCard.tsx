import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/format';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

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

export function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const { theme } = useTheme();
  const c = theme.productCard;

  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  const hoverClass = c.imageHover === 'zoom'
    ? 'group-hover:scale-105'
    : c.imageHover === 'slide'
    ? 'group-hover:translate-x-1'
    : '';

  return (
    <div className={cn(
      'group relative',
      shadowMap[c.shadow],
      c.hoverShadow && 'hover:shadow-lg transition-shadow',
      c.border && 'border border-border',
      radiusMap[c.imageBorderRadius],
      c.contentAlign === 'center' && 'text-center',
    )}>
      <Link to={`/product/${product.slug}`} className="block">
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
          {/* Badge */}
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

          {/* Quick actions overlay */}
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

      {/* Add to cart */}
      {c.showAddToCart && (
        c.addToCartStyle === 'full-width' ? (
          <button
            onClick={(e) => { e.preventDefault(); addItem(product); }}
            className="w-full mt-2 py-2 bg-foreground text-background text-xs font-medium rounded-md hover:opacity-90 transition-opacity"
          >
            Adicionar ao carrinho
          </button>
        ) : c.addToCartStyle === 'button' ? (
          <button
            onClick={(e) => { e.preventDefault(); addItem(product); }}
            className="mt-2 px-4 py-1.5 bg-foreground text-background text-xs font-medium rounded-md hover:opacity-90 transition-opacity"
          >
            Adicionar
          </button>
        ) : (
          <button
            onClick={(e) => { e.preventDefault(); addItem(product); }}
            className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-background shadow-sm"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        )
      )}
    </div>
  );
}
