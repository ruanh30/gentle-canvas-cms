import React, { useState } from 'react';
import { mockProducts, mockCategories } from '@/data/mock';
import { formatCurrency } from '@/lib/format';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Product } from '@/types';

const AdminProducts = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState(mockProducts);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.success('Produto removido');
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get('name') as string,
      price: Number(form.get('price')),
      stock: Number(form.get('stock')),
      sku: form.get('sku') as string,
      categoryId: form.get('category') as string,
      description: form.get('description') as string,
      active: true,
    };

    if (editProduct) {
      setProducts(prev => prev.map(p => p.id === editProduct.id ? { ...p, ...data } : p));
      toast.success('Produto atualizado');
    } else {
      const newProduct: Product = {
        ...data, id: `prod-${Date.now()}`, slug: data.name.toLowerCase().replace(/\s+/g, '-'),
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'],
        featured: false, rating: 0, reviewCount: 0, createdAt: new Date().toISOString(), tags: [], variants: [],
      };
      setProducts(prev => [newProduct, ...prev]);
      toast.success('Produto criado');
    }
    setShowForm(false);
    setEditProduct(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar produto..." className="pl-9" />
        </div>
        <Button onClick={() => { setEditProduct(null); setShowForm(true); }} className="font-body">
          <Plus className="h-4 w-4 mr-2" /> Novo Produto
        </Button>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(product => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img src={product.images[0]} alt="" className="w-10 h-10 rounded object-cover" />
                    <span className="font-medium text-sm truncate max-w-[200px]">{product.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>
                  <span className={product.stock < 10 ? 'text-red-600 font-medium' : ''}>{product.stock}</span>
                </TableCell>
                <TableCell>
                  <Badge variant={product.active ? 'default' : 'secondary'} className="text-xs">
                    {product.active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => { setEditProduct(product); setShowForm(true); }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Product Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editProduct ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div><Label>Nome</Label><Input name="name" required defaultValue={editProduct?.name} className="mt-1" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Preço</Label><Input name="price" type="number" step="0.01" required defaultValue={editProduct?.price} className="mt-1" /></div>
              <div><Label>Estoque</Label><Input name="stock" type="number" required defaultValue={editProduct?.stock} className="mt-1" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>SKU</Label><Input name="sku" required defaultValue={editProduct?.sku} className="mt-1" /></div>
              <div>
                <Label>Categoria</Label>
                <Select name="category" defaultValue={editProduct?.categoryId || mockCategories[0].id}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {mockCategories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div><Label>Descrição</Label><Textarea name="description" defaultValue={editProduct?.description} className="mt-1" /></div>
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

export default AdminProducts;
