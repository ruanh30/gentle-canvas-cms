import React from 'react';
import { mockSizeGuides } from '@/data/mock';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';

interface Props {
  product: Product;
  className?: string;
}

export function SizeGuideDisplay({ product, className }: Props) {
  if (!product.sizeGuideId) return null;

  const guide = product.sizeGuideId === 'default'
    ? mockSizeGuides.find(g => g.isDefault)
    : mockSizeGuides.find(g => g.id === product.sizeGuideId);

  if (!guide) return null;

  // If has table data, render table
  const hasTable = guide.columns.length > 0 && guide.rows.length > 0;

  return (
    <div className={cn('space-y-3', className)}>
      {hasTable && (
        <div className="border border-border/50 rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40">
                <th className="px-3 py-2 text-left text-xs font-semibold text-foreground border-r border-border/30">
                  Tamanho
                </th>
                {guide.columns.map((col, i) => (
                  <th key={i} className="px-3 py-2 text-center text-xs font-semibold text-foreground border-r border-border/30 last:border-r-0">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {guide.rows.map((row, ri) => (
                <tr key={ri} className="hover:bg-muted/20 transition-colors">
                  <td className="px-3 py-2 text-xs font-semibold text-foreground border-r border-border/30">
                    {row.label}
                  </td>
                  {row.values.map((val, ci) => (
                    <td key={ci} className="px-3 py-2 text-xs text-center text-muted-foreground border-r border-border/30 last:border-r-0">
                      {val || '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Fallback image */}
      {guide.image && !hasTable && (
        <img src={guide.image} alt={`Tabela de medidas - ${guide.name}`} className="w-full rounded-lg" />
      )}

      {/* Show image below table if both exist */}
      {guide.image && hasTable && (
        <details className="text-xs">
          <summary className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
            Ver imagem da tabela
          </summary>
          <img src={guide.image} alt={`Tabela de medidas - ${guide.name}`} className="w-full rounded-lg mt-2" />
        </details>
      )}
    </div>
  );
}
