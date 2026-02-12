import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Plus, Trash2, Copy, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface MediaItem {
  id: string;
  url: string;
  name: string;
  addedAt: string;
}

const defaultMedia: MediaItem[] = [
  { id: 'img-1', url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600', name: 'camiseta-branca.jpg', addedAt: '2024-01-15' },
  { id: 'img-2', url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600', name: 'calca-jeans.jpg', addedAt: '2024-02-01' },
  { id: 'img-3', url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600', name: 'vestido-floral.jpg', addedAt: '2024-02-10' },
  { id: 'img-4', url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600', name: 'modelo-pose.jpg', addedAt: '2024-03-01' },
  { id: 'img-5', url: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600', name: 'bolsa-couro.jpg', addedAt: '2024-03-15' },
  { id: 'img-6', url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600', name: 'tenis-runner.jpg', addedAt: '2024-04-01' },
];

const AdminMedia = () => {
  const [media, setMedia] = useState<MediaItem[]>(defaultMedia);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const filtered = media.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const url = form.get('url') as string;
    const name = form.get('name') as string || url.split('/').pop() || 'image.jpg';
    setMedia(prev => [{ id: `img-${Date.now()}`, url, name, addedAt: new Date().toISOString().split('T')[0] }, ...prev]);
    toast.success('Imagem adicionada');
    setShowAdd(false);
  };

  const handleDelete = (id: string) => {
    setMedia(prev => prev.filter(m => m.id !== id));
    toast.success('Imagem removida');
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copiada!');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar imagem..." className="pl-9" />
        </div>
        <Button onClick={() => setShowAdd(true)} className="font-body">
          <Plus className="h-4 w-4 mr-2" /> Adicionar Imagem
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(item => (
          <div key={item.id} className="group relative border rounded-xl overflow-hidden bg-secondary/20">
            <div className="aspect-square">
              <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-2">
              <p className="text-xs font-medium truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.addedAt}</p>
            </div>
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="secondary" size="icon" className="h-7 w-7" onClick={() => copyUrl(item.url)}>
                <Copy className="h-3 w-3" />
              </Button>
              <Button variant="secondary" size="icon" className="h-7 w-7" onClick={() => handleDelete(item.id)}>
                <Trash2 className="h-3 w-3 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">Nenhuma imagem encontrada</p>
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Imagem</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div><Label>URL da imagem</Label><Input name="url" required placeholder="https://..." className="mt-1" /></div>
            <div><Label>Nome (opcional)</Label><Input name="name" placeholder="minha-imagem.jpg" className="mt-1" /></div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setShowAdd(false)}>Cancelar</Button>
              <Button type="submit">Adicionar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMedia;
