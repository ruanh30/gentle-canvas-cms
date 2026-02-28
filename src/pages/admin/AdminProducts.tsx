import React from 'react';
import { Package, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const mockProducts = [
  { id: 1, name: 'Camiseta Básica', price: 79.90, stock: 45, status: 'Ativo' },
  { id: 2, name: 'Calça Jeans Slim', price: 189.90, stock: 23, status: 'Ativo' },
  { id: 3, name: 'Tênis Runner', price: 299.90, stock: 8, status: 'Baixo estoque' },
  { id: 4, name: 'Jaqueta Corta-Vento', price: 249.90, stock: 0, status: 'Esgotado' },
  { id: 5, name: 'Boné Classic', price: 59.90, stock: 67, status: 'Ativo' },
];

export default function AdminProducts() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Produtos</h1>
          <p className="text-sm text-muted-foreground">Gerencie o catálogo de produtos da sua loja</p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Novo Produto
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar produtos..." className="pl-9" />
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Produto</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Preço</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Estoque</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map(p => (
              <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
                <td className="px-4 py-3 text-muted-foreground">R$ {p.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.stock}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    p.status === 'Ativo' ? 'bg-green-500/10 text-green-600' :
                    p.status === 'Baixo estoque' ? 'bg-yellow-500/10 text-yellow-600' :
                    'bg-red-500/10 text-red-600'
                  }`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
