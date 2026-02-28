import React, { useState } from 'react';
import { ImageIcon, Upload, Palette, Check, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { mockProducts, mockCategories } from '@/data/mock';
import { cn } from '@/lib/utils';

// Extract all unique images from store products and categories
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

export default function AdminMedia() {
  const navigate = useNavigate();
  const allMedia = getAllMedia();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'Produto' | 'Categoria'>('all');

  const filtered = allMedia
    .filter(m => filter === 'all' || m.source === filter)
    .filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Mídia</h1>
          <p className="text-sm text-muted-foreground">
            {allMedia.length} imagens da sua loja
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <Button variant="outline" size="sm" className="gap-1.5 text-destructive border-destructive/30" onClick={() => setSelected(new Set())}>
              <Trash2 className="h-4 w-4" />
              {selected.size} selecionadas
            </Button>
          )}
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => navigate('/admin/customization')}>
            <Palette className="h-4 w-4" />
            Editor de Tema
          </Button>
          <Button size="sm" className="gap-1.5">
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar imagem..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1.5">
          {(['all', 'Produto', 'Categoria'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-medium border transition-colors',
                filter === f
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-card text-muted-foreground border-border hover:bg-muted/50'
              )}
            >
              {f === 'all' ? 'Todas' : f === 'Produto' ? 'Produtos' : 'Categorias'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map(file => {
          const isSelected = selected.has(file.id);
          return (
            <div
              key={file.id}
              onClick={() => toggleSelect(file.id)}
              className={cn(
                'group border rounded-lg overflow-hidden cursor-pointer transition-all',
                isSelected
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-border hover:border-primary/30'
              )}
            >
              <div className="aspect-square bg-muted overflow-hidden relative">
                <img src={file.url} alt={file.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {isSelected && (
                  <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                )}
              </div>
              <div className="p-2.5">
                <p className="text-xs font-medium text-foreground truncate">{file.name}</p>
                <Badge variant="secondary" className="text-[9px] mt-1">{file.source}</Badge>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <ImageIcon className="h-10 w-10 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Nenhuma imagem encontrada.</p>
        </div>
      )}
    </div>
  );
}