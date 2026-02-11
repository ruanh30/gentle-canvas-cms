import React, { useState } from 'react';
import { mockCoupons } from '@/data/mock';
import { formatCurrency, formatDate } from '@/lib/format';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Coupon } from '@/types';

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [showForm, setShowForm] = useState(false);
  const [editCoupon, setEditCoupon] = useState<Coupon | null>(null);

  const handleDelete = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
    toast.success('Cupom removido');
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      code: (form.get('code') as string).toUpperCase(),
      type: form.get('type') as 'percentage' | 'fixed',
      value: Number(form.get('value')),
      minOrderValue: form.get('minOrder') ? Number(form.get('minOrder')) : undefined,
      maxUses: form.get('maxUses') ? Number(form.get('maxUses')) : undefined,
      active: true,
    };

    if (editCoupon) {
      setCoupons(prev => prev.map(c => c.id === editCoupon.id ? { ...c, ...data } : c));
      toast.success('Cupom atualizado');
    } else {
      setCoupons(prev => [...prev, { ...data, id: `cup-${Date.now()}`, usedCount: 0, createdAt: new Date().toISOString() }]);
      toast.success('Cupom criado');
    }
    setShowForm(false);
    setEditCoupon(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => { setEditCoupon(null); setShowForm(true); }} className="font-body">
          <Plus className="h-4 w-4 mr-2" /> Novo Cupom
        </Button>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Usos</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expira</TableHead>
              <TableHead className="w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map(coupon => (
              <TableRow key={coupon.id}>
                <TableCell className="font-mono font-medium">{coupon.code}</TableCell>
                <TableCell>{coupon.type === 'percentage' ? 'Percentual' : 'Fixo'}</TableCell>
                <TableCell>{coupon.type === 'percentage' ? `${coupon.value}%` : formatCurrency(coupon.value)}</TableCell>
                <TableCell>{coupon.usedCount}{coupon.maxUses ? `/${coupon.maxUses}` : ''}</TableCell>
                <TableCell><Badge variant={coupon.active ? 'default' : 'secondary'} className="text-xs">{coupon.active ? 'Ativo' : 'Inativo'}</Badge></TableCell>
                <TableCell className="text-muted-foreground">{coupon.expiresAt ? formatDate(coupon.expiresAt) : '—'}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => { setEditCoupon(coupon); setShowForm(true); }}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(coupon.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{editCoupon ? 'Editar Cupom' : 'Novo Cupom'}</DialogTitle></DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div><Label>Código</Label><Input name="code" required defaultValue={editCoupon?.code} className="mt-1 uppercase" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tipo</Label>
                <Select name="type" defaultValue={editCoupon?.type || 'percentage'}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentual (%)</SelectItem>
                    <SelectItem value="fixed">Fixo (R$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Valor</Label><Input name="value" type="number" step="0.01" required defaultValue={editCoupon?.value} className="mt-1" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Pedido mínimo</Label><Input name="minOrder" type="number" step="0.01" defaultValue={editCoupon?.minOrderValue} className="mt-1" /></div>
              <div><Label>Limite de usos</Label><Input name="maxUses" type="number" defaultValue={editCoupon?.maxUses} className="mt-1" /></div>
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

export default AdminCoupons;
