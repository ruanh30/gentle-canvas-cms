import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface StaticPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
}

const defaultPages: StaticPage[] = [
  { id: 'pg-1', title: 'Sobre Nós', slug: 'about', content: 'Somos uma loja de moda online...', published: true, createdAt: '2024-01-01' },
  { id: 'pg-2', title: 'Termos de Uso', slug: 'terms', content: 'Termos e condições gerais...', published: true, createdAt: '2024-01-01' },
  { id: 'pg-3', title: 'Política de Privacidade', slug: 'privacy', content: 'Sua privacidade é importante...', published: true, createdAt: '2024-01-01' },
  { id: 'pg-4', title: 'Trocas e Devoluções', slug: 'returns', content: 'Nossa política de trocas...', published: false, createdAt: '2024-02-01' },
];

const AdminStaticPages = () => {
  const [pages, setPages] = useState<StaticPage[]>(defaultPages);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<StaticPage | null>(null);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      title: form.get('title') as string,
      slug: (form.get('slug') as string) || (form.get('title') as string).toLowerCase().replace(/\s+/g, '-'),
      content: form.get('content') as string,
      published: true,
    };

    if (editItem) {
      setPages(prev => prev.map(p => p.id === editItem.id ? { ...p, ...data } : p));
      toast.success('Página atualizada');
    } else {
      setPages(prev => [...prev, { ...data, id: `pg-${Date.now()}`, createdAt: new Date().toISOString() }]);
      toast.success('Página criada');
    }
    setShowForm(false);
    setEditItem(null);
  };

  const handleDelete = (id: string) => {
    setPages(prev => prev.filter(p => p.id !== id));
    toast.success('Página removida');
  };

  const togglePublished = (id: string) => {
    setPages(prev => prev.map(p => p.id === id ? { ...p, published: !p.published } : p));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">Gerencie páginas institucionais como Sobre, Termos, etc.</p>
        <Button onClick={() => { setEditItem(null); setShowForm(true); }} className="font-body">
          <Plus className="h-4 w-4 mr-2" /> Nova Página
        </Button>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Página</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map(page => (
              <TableRow key={page.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{page.title}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">/{page.slug}</TableCell>
                <TableCell>
                  <Badge variant={page.published ? 'default' : 'secondary'} className="text-xs cursor-pointer" onClick={() => togglePublished(page.id)}>
                    {page.published ? 'Publicada' : 'Rascunho'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => { setEditItem(page); setShowForm(true); }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(page.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editItem ? 'Editar Página' : 'Nova Página'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Título</Label><Input name="title" required defaultValue={editItem?.title} className="mt-1" /></div>
              <div><Label>Slug (URL)</Label><Input name="slug" defaultValue={editItem?.slug} placeholder="gerado-automaticamente" className="mt-1" /></div>
            </div>
            <div><Label>Conteúdo</Label><Textarea name="content" defaultValue={editItem?.content} className="mt-1 min-h-[200px]" /></div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminStaticPages;
