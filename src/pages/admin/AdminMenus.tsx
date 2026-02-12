import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, GripVertical, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface MenuItem {
  id: string;
  label: string;
  url: string;
  type: 'link' | 'category' | 'page' | 'custom';
}

const defaultMenuItems: MenuItem[] = [
  { id: 'm1', label: 'Início', url: '/', type: 'link' },
  { id: 'm2', label: 'Produtos', url: '/products', type: 'link' },
  { id: 'm3', label: 'Camisetas', url: '/products?category=camisetas', type: 'category' },
  { id: 'm4', label: 'Calças', url: '/products?category=calcas', type: 'category' },
];

const AdminMenus = () => {
  const [headerMenu, setHeaderMenu] = useState<MenuItem[]>(defaultMenuItems);
  const [footerMenu, setFooterMenu] = useState<MenuItem[]>([
    { id: 'f1', label: 'Sobre nós', url: '/about', type: 'page' },
    { id: 'f2', label: 'Termos de uso', url: '/terms', type: 'page' },
    { id: 'f3', label: 'Política de privacidade', url: '/privacy', type: 'page' },
  ]);

  const addItem = (menu: 'header' | 'footer') => {
    const newItem: MenuItem = { id: `m-${Date.now()}`, label: '', url: '', type: 'link' };
    if (menu === 'header') setHeaderMenu(prev => [...prev, newItem]);
    else setFooterMenu(prev => [...prev, newItem]);
  };

  const updateItem = (menu: 'header' | 'footer', id: string, field: keyof MenuItem, value: string) => {
    const setter = menu === 'header' ? setHeaderMenu : setFooterMenu;
    setter(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeItem = (menu: 'header' | 'footer', id: string) => {
    const setter = menu === 'header' ? setHeaderMenu : setFooterMenu;
    setter(prev => prev.filter(item => item.id !== id));
  };

  const handleSave = () => {
    toast.success('Menus salvos com sucesso!');
  };

  const renderMenuEditor = (items: MenuItem[], menu: 'header' | 'footer') => (
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg bg-secondary/20">
          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab shrink-0" />
          <Input
            value={item.label}
            onChange={e => updateItem(menu, item.id, 'label', e.target.value)}
            placeholder="Rótulo"
            className="flex-1"
          />
          <Input
            value={item.url}
            onChange={e => updateItem(menu, item.id, 'url', e.target.value)}
            placeholder="/caminho ou URL"
            className="flex-1"
          />
          <Select value={item.type} onValueChange={v => updateItem(menu, item.id, 'type', v)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="link">Link</SelectItem>
              <SelectItem value="category">Categoria</SelectItem>
              <SelectItem value="page">Página</SelectItem>
              <SelectItem value="custom">Customizado</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" onClick={() => removeItem(menu, item.id)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => addItem(menu)} className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Adicionar item
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ExternalLink className="h-4 w-4" /> Menu do Cabeçalho
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderMenuEditor(headerMenu, 'header')}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ExternalLink className="h-4 w-4" /> Menu do Rodapé
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderMenuEditor(footerMenu, 'footer')}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="font-body">Salvar Menus</Button>
      </div>
    </div>
  );
};

export default AdminMenus;
