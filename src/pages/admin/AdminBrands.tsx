import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Award } from 'lucide-react';
import { toast } from 'sonner';

interface Brand {
  id: string;
  name: string;
  logo?: string;
  website?: string;
}

const defaultBrands: Brand[] = [
  { id: 'br-1', name: 'Nike', logo: 'https://logo.clearbit.com/nike.com', website: 'https://nike.com' },
  { id: 'br-2', name: 'Adidas', logo: 'https://logo.clearbit.com/adidas.com', website: 'https://adidas.com' },
  { id: 'br-3', name: 'Puma', logo: 'https://logo.clearbit.com/puma.com', website: 'https://puma.com' },
];

const AdminBrands = () => {
  const [brands, setBrands] = useState<Brand[]>(defaultBrands);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Brand | null>(null);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get('name') as string,
      logo: form.get('logo') as string,
      website: form.get('website') as string,
    };

    if (editItem) {
      setBrands(prev => prev.map(b => b.id === editItem.id ? { ...b, ...data } : b));
      toast.success('Marca atualizada');
    } else {
      setBrands(prev => [...prev, { ...data, id: `br-${Date.now()}` }]);
      toast.success('Marca adicionada');
    }
    setShowForm(false);
    setEditItem(null);
  };

  const handleDelete = (id: string) => {
    setBrands(prev => prev.filter(b => b.id !== id));
    toast.success('Marca removida');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">Marcas exibidas na seção de parceiros da loja.</p>
        <Button onClick={() => { setEditItem(null); setShowForm(true); }} className="font-body">
          <Plus className="h-4 w-4 mr-2" /> Nova Marca
        </Button>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Marca</TableHead>
              <TableHead>Website</TableHead>
              <TableHead className="w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.map(brand => (
              <TableRow key={brand.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {brand.logo ? (
                      <img src={brand.logo} alt={brand.name} className="w-8 h-8 rounded object-contain bg-white p-0.5" />
                    ) : (
                      <Award className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="font-medium">{brand.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{brand.website}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => { setEditItem(brand); setShowForm(true); }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(brand.id)}>
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editItem ? 'Editar Marca' : 'Nova Marca'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div><Label>Nome</Label><Input name="name" required defaultValue={editItem?.name} className="mt-1" /></div>
            <div><Label>Logo (URL)</Label><Input name="logo" defaultValue={editItem?.logo} placeholder="https://..." className="mt-1" /></div>
            <div><Label>Website</Label><Input name="website" defaultValue={editItem?.website} placeholder="https://..." className="mt-1" /></div>
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

export default AdminBrands;
