import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Plus, Edit, Trash2, Newspaper } from 'lucide-react';
import { toast } from 'sonner';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  published: boolean;
  createdAt: string;
}

const defaultPosts: BlogPost[] = [
  { id: 'bp-1', title: 'Tendências de Moda 2024', slug: 'tendencias-2024', excerpt: 'Descubra as principais tendências...', content: 'Conteúdo completo do post...', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600', published: true, createdAt: '2024-06-01' },
  { id: 'bp-2', title: 'Como Combinar Peças Básicas', slug: 'combinar-pecas-basicas', excerpt: 'Aprenda a montar looks incríveis...', content: 'Conteúdo completo do post...', published: true, createdAt: '2024-06-15' },
];

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>(defaultPosts);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<BlogPost | null>(null);

  const filtered = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      title: form.get('title') as string,
      slug: (form.get('slug') as string) || (form.get('title') as string).toLowerCase().replace(/\s+/g, '-'),
      excerpt: form.get('excerpt') as string,
      content: form.get('content') as string,
      image: form.get('image') as string,
      published: true,
    };

    if (editItem) {
      setPosts(prev => prev.map(p => p.id === editItem.id ? { ...p, ...data } : p));
      toast.success('Post atualizado');
    } else {
      setPosts(prev => [{ ...data, id: `bp-${Date.now()}`, createdAt: new Date().toISOString().split('T')[0] }, ...prev]);
      toast.success('Post criado');
    }
    setShowForm(false);
    setEditItem(null);
  };

  const handleDelete = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    toast.success('Post removido');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar post..." className="pl-9" />
        </div>
        <Button onClick={() => { setEditItem(null); setShowForm(true); }} className="font-body">
          <Plus className="h-4 w-4 mr-2" /> Novo Post
        </Button>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Post</TableHead>
              <TableHead>Resumo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(post => (
              <TableRow key={post.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Newspaper className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{post.title}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground truncate max-w-[250px]">{post.excerpt}</TableCell>
                <TableCell>
                  <Badge variant={post.published ? 'default' : 'secondary'} className="text-xs">
                    {post.published ? 'Publicado' : 'Rascunho'}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{post.createdAt}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => { setEditItem(post); setShowForm(true); }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)}>
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
            <DialogTitle>{editItem ? 'Editar Post' : 'Novo Post'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Título</Label><Input name="title" required defaultValue={editItem?.title} className="mt-1" /></div>
              <div><Label>Slug</Label><Input name="slug" defaultValue={editItem?.slug} placeholder="gerado-automaticamente" className="mt-1" /></div>
            </div>
            <div><Label>Imagem de capa (URL)</Label><Input name="image" defaultValue={editItem?.image} placeholder="https://..." className="mt-1" /></div>
            <div><Label>Resumo</Label><Input name="excerpt" defaultValue={editItem?.excerpt} className="mt-1" /></div>
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

export default AdminBlog;
