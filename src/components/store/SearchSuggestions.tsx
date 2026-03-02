import React from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '@/data/mock';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';

interface SearchSuggestionsProps {
  query: string;
  maxResults?: number;
  onSelect?: () => void;
  onViewAll?: () => void;
  className?: string;
  flat?: boolean;
}

export function SearchSuggestions({ query, maxResults = 5, onSelect, onViewAll, className, flat }: SearchSuggestionsProps) {
  const q = query.toLowerCase().trim();

  if (!q || q.length < 2) return null;

  const results = mockProducts
    .filter(p => p.active)
    .filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags?.some(t => t.toLowerCase().includes(q))
    )
    .slice(0, maxResults);

  const containerCls = flat
    ? cn('overflow-hidden', className)
    : cn('bg-popover border border-border rounded-xl shadow-[0_8px_30px_-6px_hsl(var(--foreground)/0.12)] overflow-hidden', className);

  if (results.length === 0) {
    return (
      <div className={containerCls}>
        <div className="px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">Nenhum produto encontrado para "{query}"</p>
        </div>
      </div>
    );
  }

  return (
    <div className={containerCls}>
      <div className="divide-y divide-border/40">
        {results.map(product => (
          <Link
            key={product.id}
            to={`/product/${product.slug}`}
            onClick={onSelect}
            className="flex items-center gap-3 px-4 py-3 hover:bg-accent/50 transition-colors duration-150"
          >
            <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
              <p className="text-sm font-semibold text-primary mt-0.5">
                {formatCurrency(product.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {onViewAll && (
        <button
          onClick={onViewAll}
          className="w-full px-4 py-3 text-sm font-medium text-center border-t border-border/40 hover:bg-accent/30 transition-colors duration-150 text-foreground"
        >
          Ver todos os resultados »
        </button>
      )}
    </div>
  );
}
