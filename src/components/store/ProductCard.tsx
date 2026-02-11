import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/format';
import { useCart } from '@/contexts/CartContext';
import { ShoppingBag } from 'lucide-react';

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="group relative">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="aspect-[3/4] overflow-hidden rounded-lg bg-secondary">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-foreground text-background text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>
        <div className="mt-3 space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.tags?.[0]}</p>
          <h3 className="text-sm font-medium leading-tight line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{formatCurrency(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          addItem(product);
        }}
        className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-background shadow-sm"
        aria-label="Adicionar ao carrinho"
      >
        <ShoppingBag className="h-4 w-4" />
      </button>
    </div>
  );
}
