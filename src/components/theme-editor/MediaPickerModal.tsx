import React, { useState, useMemo } from 'react';
import { X, Search, ImageIcon, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { mockProducts, mockCategories } from '@/data/mock';

function getAllMedia() {
  const items: { id: string; url: string; source: string; name: string }[] = [];
  const seen = new Set<string>();

  mockCategories.forEach(c => {
    if (c.image && !seen.has(c.image)) {
      seen.add(c.image);
      items.push({ id: `cat-${c.id}`, url: c.image, source: 'Categoria', name: c.name });
    }
  });

  mockProducts.forEach(p => {
    p.images.forEach((img, i) => {
      if (!seen.has(img)) {
        seen.add(img);
        items.push({ id: `${p.id}-${i}`, url: img, source: 'Produto', name: `${p.name}${i > 0 ? ` (${i + 1})` : ''}` });
      }
    });
  });

  return items;
}

interface MediaPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  currentValue?: string;
}

export function MediaPickerModal({ open, onClose, onSelect, currentValue }: MediaPickerModalProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'Produto' | 'Categoria'>('all');
  const allMedia = useMemo(() => getAllMedia(), []);

  const filtered = useMemo(() =>
    allMedia
      .filter(m => filter === 'all' || m.source === filter)
      .filter(m => m.name.toLowerCase().includes(search.toLowerCase())),
    [allMedia, filter, search]
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-background rounded-2xl shadow-2xl border border-border/50 w-[90vw] max-w-3xl max-h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <div>
            <h2 className="text-base font-semibold text-foreground">Biblioteca de Mídia</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{allMedia.length} imagens disponíveis</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-muted/80 transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 px-6 py-3 border-b border-border/30">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar imagem..."
              className="pl-9 h-9 bg-secondary/30 border-border/50"
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
            />
          </div>
          <div className="flex gap-1.5">
            {(['all', 'Produto', 'Categoria'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
                  filter === f
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-secondary/50 text-muted-foreground border-border/50 hover:bg-secondary hover:text-foreground'
                )}
              >
                {f === 'all' ? 'Todas' : f === 'Produto' ? 'Produtos' : 'Categorias'}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {filtered.map(file => {
                const isSelected = currentValue === file.url;
                return (
                  <button
                    key={file.id}
                    onClick={() => {
                      onSelect(file.url);
                      onClose();
                    }}
                    className={cn(
                      'group border rounded-xl overflow-hidden text-left transition-all hover:shadow-md',
                      isSelected
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-border/50 hover:border-primary/40'
                    )}
                  >
                    <div className="aspect-square bg-muted overflow-hidden relative">
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
                            <Check className="h-4 w-4 text-primary-foreground" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <p className="text-[11px] font-medium text-foreground truncate">{file.name}</p>
                      <Badge variant="secondary" className="text-[9px] mt-0.5">{file.source}</Badge>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center">
              <ImageIcon className="h-10 w-10 text-muted-foreground/20 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Nenhuma imagem encontrada.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
