import React, { useState, useCallback, useMemo } from 'react';
import { ImageIcon, Upload, Palette, Check, Trash2, Search, ArrowDownAZ, ArrowUpAZ, ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { mockProducts, mockCategories } from '@/data/mock';
import { cn } from '@/lib/utils';
import SecureFileUpload from '@/components/admin/SecureFileUpload';
import { toast } from '@/hooks/use-toast';

interface MediaItem {
  id: string;
  url: string;
  source: string;
  name: string;
  addedAt: number; // timestamp for sort
}

type SortOption = 'recent' | 'oldest' | 'a-z' | 'z-a';

function getAllMedia(): MediaItem[] {
  const items: MediaItem[] = [];
  const seen = new Set<string>();

  let order = 0;
  mockCategories.forEach(c => {
    if (c.image && !seen.has(c.image)) {
      seen.add(c.image);
      items.push({ id: `cat-${c.id}`, url: c.image, source: 'Categoria', name: c.name, addedAt: order++ });
    }
  });

  mockProducts.forEach(p => {
    p.images.forEach((img, i) => {
      if (!seen.has(img)) {
        seen.add(img);
        items.push({ id: `${p.id}-${i}`, url: img, source: 'Produto', name: `${p.name}${i > 0 ? ` (${i + 1})` : ''}`, addedAt: order++ });
      }
    });
  });

  return items;
}

export default function AdminMedia() {
  // Clean up corrupted localStorage from previous version
  React.useEffect(() => { localStorage.removeItem('flashloja_uploaded_media'); }, []);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'Produto' | 'Categoria'>('all');
  const [sort, setSort] = useState<SortOption>('recent');
  const [uploadedMedia, setUploadedMedia] = useState<MediaItem[]>([]);
  const [deletedIds, setDeletedIds] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem('flashloja_deleted_media') || '[]')); } catch { return new Set(); }
  });

  const allMedia = [...getAllMedia(), ...uploadedMedia].filter(m => !deletedIds.has(m.id));

  const filtered = useMemo(() => {
    const list = allMedia
      .filter(m => filter === 'all' || m.source === filter)
      .filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

    switch (sort) {
      case 'a-z': return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'z-a': return list.sort((a, b) => b.name.localeCompare(a.name));
      case 'oldest': return list.sort((a, b) => a.addedAt - b.addedAt);
      case 'recent':
      default: return list.sort((a, b) => b.addedAt - a.addedAt);
    }
  }, [allMedia, filter, search, sort]);

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleDelete = () => {
    const count = selected.size;
    const nextDeleted = new Set(deletedIds);
    selected.forEach(id => nextDeleted.add(id));
    setDeletedIds(nextDeleted);
    localStorage.setItem('flashloja_deleted_media', JSON.stringify([...nextDeleted]));

    const nextUploaded = uploadedMedia.filter(m => !selected.has(m.id));
    setUploadedMedia(nextUploaded);

    setSelected(new Set());
    toast({
      title: `${count} ${count === 1 ? 'imagem removida' : 'imagens removidas'}`,
      description: 'As imagens selecionadas foram removidas da biblioteca.',
    });
  };

  const handleFileAccepted = useCallback((dataUrl: string, file: File) => {
    const newItem: MediaItem = {
      id: `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      url: dataUrl,
      source: 'Upload',
      name: file.name.replace(/\.[^/.]+$/, ''),
      addedAt: Date.now(),
    };
    setUploadedMedia(prev => [newItem, ...prev]);
    toast({
      title: 'Upload concluído',
      description: `"${newItem.name}" foi adicionada à biblioteca.`,
    });
  }, []);

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
            <Button variant="outline" size="sm" className="gap-1.5 text-destructive border-destructive/30" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
              Apagar {selected.size}
            </Button>
          )}
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => navigate('/admin/customization')}>
            <Palette className="h-4 w-4" />
            Editor de Tema
          </Button>
          <SecureFileUpload
            onFileAccepted={handleFileAccepted}
            multiple
            compact
          />
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
        <div className="h-5 w-px bg-border" />
        <div className="flex gap-1">
          {([
            { value: 'recent' as SortOption, label: 'Recentes', icon: ArrowDown },
            { value: 'oldest' as SortOption, label: 'Antigas', icon: ArrowUp },
            { value: 'a-z' as SortOption, label: 'A–Z', icon: ArrowDownAZ },
            { value: 'z-a' as SortOption, label: 'Z–A', icon: ArrowUpAZ },
          ]).map(s => (
            <button
              key={s.value}
              onClick={() => setSort(s.value)}
              className={cn(
                'px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors flex items-center gap-1',
                sort === s.value
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-card text-muted-foreground border-border hover:bg-muted/50'
              )}
            >
              <s.icon className="h-3.5 w-3.5" />
              {s.label}
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
