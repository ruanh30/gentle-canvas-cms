import React from 'react';
import { Menu, Plus, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockMenuItems = [
  { id: 1, label: 'Início', url: '/', order: 1 },
  { id: 2, label: 'Produtos', url: '/products', order: 2 },
  { id: 3, label: 'Ofertas', url: '/products?sale=true', order: 3 },
  { id: 4, label: 'Novidades', url: '/products?new=true', order: 4 },
  { id: 5, label: 'Contato', url: '/contact', order: 5 },
];

export default function AdminMenu() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Menu de Navegação</h1>
          <p className="text-sm text-muted-foreground">Organize os links do menu principal da loja</p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Novo Item
        </Button>
      </div>

      <div className="border border-border rounded-lg divide-y divide-border">
        {mockMenuItems.map(item => (
          <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors">
            <GripVertical className="h-4 w-4 text-muted-foreground/40 cursor-grab" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.url}</p>
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              Editar
            </Button>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground/60 text-center">
        Arraste os itens para reordenar o menu
      </p>
    </div>
  );
}
