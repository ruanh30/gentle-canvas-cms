import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  avatar?: string;
  active: boolean;
}

const defaultTestimonials: Testimonial[] = [
  { id: 't1', name: 'Maria Silva', text: 'Amei a qualidade das peças! Entrega super rápida.', rating: 5, active: true },
  { id: 't2', name: 'João Santos', text: 'Ótimo atendimento e produtos incríveis.', rating: 5, active: true },
  { id: 't3', name: 'Ana Costa', text: 'Tecido de primeira, caimento perfeito!', rating: 4, active: true },
];

const AdminTestimonials = () => {
  const [items, setItems] = useState<Testimonial[]>(defaultTestimonials);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Testimonial | null>(null);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get('name') as string,
      text: form.get('text') as string,
      rating: Number(form.get('rating')),
      avatar: form.get('avatar') as string,
      active: true,
    };

    if (editItem) {
      setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...data } : i));
      toast.success('Depoimento atualizado');
    } else {
      setItems(prev => [...prev, { ...data, id: `t-${Date.now()}` }]);
      toast.success('Depoimento adicionado');
    }
    setShowForm(false);
    setEditItem(null);
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
    toast.success('Depoimento removido');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">Gerencie depoimentos exibidos na loja.</p>
        <Button onClick={() => { setEditItem(null); setShowForm(true); }} className="font-body">
          <Plus className="h-4 w-4 mr-2" /> Novo Depoimento
        </Button>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Depoimento</TableHead>
              <TableHead>Nota</TableHead>
              <TableHead className="w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(item => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground truncate max-w-[300px]">{item.text}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => { setEditItem(item); setShowForm(true); }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
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
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editItem ? 'Editar Depoimento' : 'Novo Depoimento'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div><Label>Nome do cliente</Label><Input name="name" required defaultValue={editItem?.name} className="mt-1" /></div>
            <div><Label>Depoimento</Label><Textarea name="text" required defaultValue={editItem?.text} className="mt-1" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nota</Label>
                <Select name="rating" defaultValue={String(editItem?.rating || 5)}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map(n => <SelectItem key={n} value={String(n)}>{n} estrelas</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Avatar (URL)</Label><Input name="avatar" defaultValue={editItem?.avatar} placeholder="https://..." className="mt-1" /></div>
            </div>
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

export default AdminTestimonials;
