import React, { useState } from 'react';
import { mockProducts, mockCategories } from '@/data/mock';
import { formatCurrency } from '@/lib/format';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Product } from '@/types';
import { cn } from '@/lib/utils';
import {
  Search, Plus, Trash2, Package, ChevronLeft, Save, Image, Tag,
  DollarSign, Box, FileText, ToggleLeft, Layers
} from 'lucide-react';
import AdminCollections from '@/components/admin/AdminCollections';

type PanelSection = 'info' | 'pricing' | 'inventory' | 'media' | 'status';

const panelSections: { id: PanelSection; label: string; icon: React.ElementType }[] = [
  { id: 'info', label: 'Informações', icon: FileText },
  { id: 'pricing', label: 'Preço', icon: DollarSign },
  { id: 'inventory', label: 'Estoque', icon: Box },
  { id: 'media', label: 'Imagens', icon: Image },
  { id: 'status', label: 'Status', icon: ToggleLeft },
];

const AdminProducts = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'collections'>('products');
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelSection>('info');

  // Form state
  const [formData, setFormData] = useState({
    name: '', description: '', price: 0, compareAtPrice: 0,
    stock: 0, sku: '', categoryId: mockCategories[0].id,
    active: true, featured: false,
  });

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsCreating(false);
    setActivePanel('info');
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      compareAtPrice: product.compareAtPrice || 0,
      stock: product.stock,
      sku: product.sku,
      categoryId: product.categoryId,
      active: product.active,
      featured: product.featured,
    });
  };

  const startCreating = () => {
    setSelectedProduct(null);
    setIsCreating(true);
    setActivePanel('info');
    setFormData({
      name: '', description: '', price: 0, compareAtPrice: 0,
      stock: 0, sku: '', categoryId: mockCategories[0].id,
      active: true, featured: false,
    });
  };

  const goBack = () => {
    setSelectedProduct(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    if (selectedProduct?.id === id) goBack();
    toast.success('Produto removido');
  };

  const handleSave = () => {
    if (!formData.name || !formData.sku) {
      toast.error('Preencha nome e SKU');
      return;
    }

    if (selectedProduct) {
      setProducts(prev => prev.map(p => p.id === selectedProduct.id ? { ...p, ...formData } : p));
      toast.success('Produto atualizado');
    } else {
      const newProduct: Product = {
        ...formData,
        id: `prod-${Date.now()}`,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'],
        rating: 0, reviewCount: 0, createdAt: new Date().toISOString(),
        tags: [], variants: [],
      };
      setProducts(prev => [newProduct, ...prev]);
      openProduct(newProduct);
      toast.success('Produto criado');
    }
  };

  const isEditing = selectedProduct !== null || isCreating;
  const editTitle = isCreating ? 'Novo Produto' : selectedProduct?.name || '';

  // Render the form panel content based on active section
  const renderPanel = () => {
    switch (activePanel) {
      case 'info':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground">Nome do produto</Label>
              <Input
                value={formData.name}
                onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                placeholder="Ex: Camiseta Premium"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">SKU</Label>
              <Input
                value={formData.sku}
                onChange={e => setFormData(f => ({ ...f, sku: e.target.value }))}
                placeholder="Ex: CAM-001"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Categoria</Label>
              <Select
                value={formData.categoryId}
                onValueChange={v => setFormData(f => ({ ...f, categoryId: v }))}
              >
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {mockCategories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Descrição</Label>
              <Textarea
                value={formData.description}
                onChange={e => setFormData(f => ({ ...f, description: e.target.value }))}
                placeholder="Descreva o produto..."
                className="mt-1 min-h-[120px]"
              />
            </div>
          </div>
        );
      case 'pricing':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground">Preço de venda (R$)</Label>
              <Input
                type="number" step="0.01" min="0"
                value={formData.price}
                onChange={e => setFormData(f => ({ ...f, price: Number(e.target.value) }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Preço comparativo (riscado)</Label>
              <Input
                type="number" step="0.01" min="0"
                value={formData.compareAtPrice}
                onChange={e => setFormData(f => ({ ...f, compareAtPrice: Number(e.target.value) }))}
                className="mt-1"
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                Exibido como preço "de" riscado ao lado do preço atual.
              </p>
            </div>
          </div>
        );
      case 'inventory':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground">Quantidade em estoque</Label>
              <Input
                type="number" min="0"
                value={formData.stock}
                onChange={e => setFormData(f => ({ ...f, stock: Number(e.target.value) }))}
                className="mt-1"
              />
            </div>
            <div className="p-3 bg-secondary/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                💡 Quando o estoque chegar a <strong>0</strong>, o produto será exibido como "Esgotado" automaticamente.
              </p>
            </div>
          </div>
        );
      case 'media':
        return (
          <div className="space-y-4">
            {(selectedProduct?.images || []).length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {(selectedProduct?.images || []).map((img, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden border">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Image className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Nenhuma imagem adicionada</p>
                <p className="text-[11px] text-muted-foreground mt-1">As imagens aparecerão aqui após salvar.</p>
              </div>
            )}
          </div>
        );
      case 'status':
        return (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm">Produto ativo</Label>
                <p className="text-[11px] text-muted-foreground">Visível na loja para os clientes.</p>
              </div>
              <Switch
                checked={formData.active}
                onCheckedChange={v => setFormData(f => ({ ...f, active: v }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm">Produto destaque</Label>
                <p className="text-[11px] text-muted-foreground">Aparece na seção de destaques da home.</p>
              </div>
              <Switch
                checked={formData.featured}
                onCheckedChange={v => setFormData(f => ({ ...f, featured: v }))}
              />
            </div>
          </div>
        );
    }
  };

  if (activeTab === 'collections') {
    return (
      <div className="flex flex-col h-[calc(100vh-73px)] -m-6">
        {/* Tab bar */}
        <div className="flex items-center gap-0 border-b bg-background shrink-0">
          <button
            onClick={() => setActiveTab('products')}
            className={cn(
              'px-4 py-2.5 text-xs font-medium border-b-2 transition-colors',
              'text-muted-foreground border-transparent hover:text-foreground'
            )}
          >
            <Package className="h-3.5 w-3.5 inline mr-1.5" />Produtos
          </button>
          <button
            onClick={() => setActiveTab('collections')}
            className={cn(
              'px-4 py-2.5 text-xs font-medium border-b-2 transition-colors',
              'text-foreground border-foreground'
            )}
          >
            <Layers className="h-3.5 w-3.5 inline mr-1.5" />Coleções
          </button>
        </div>
        <div className="flex-1 min-h-0">
          <AdminCollections />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-73px)] -m-6">
      {/* Tab bar */}
      <div className="flex items-center gap-0 border-b bg-background shrink-0">
        <button
          onClick={() => setActiveTab('products')}
          className={cn(
            'px-4 py-2.5 text-xs font-medium border-b-2 transition-colors',
            'text-foreground border-foreground'
          )}
        >
          <Package className="h-3.5 w-3.5 inline mr-1.5" />Produtos
        </button>
        <button
          onClick={() => setActiveTab('collections')}
          className={cn(
            'px-4 py-2.5 text-xs font-medium border-b-2 transition-colors',
            'text-muted-foreground border-transparent hover:text-foreground'
          )}
        >
          <Layers className="h-3.5 w-3.5 inline mr-1.5" />Coleções
        </button>
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-background border-b shrink-0">
        <div className="flex items-center gap-2">
          {isEditing && (
            <button onClick={goBack} className="p-1 hover:bg-secondary rounded-md transition-colors mr-1">
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          <h1 className="text-sm font-bold">{isEditing ? editTitle : 'Produtos'}</h1>
          {selectedProduct && (
            <Badge variant={selectedProduct.active ? 'default' : 'secondary'} className="text-[10px]">
              {selectedProduct.active ? 'Ativo' : 'Inativo'}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {isEditing ? (
            <>
              {selectedProduct && (
                <Button variant="ghost" size="sm" className="h-8 text-xs text-destructive hover:text-destructive"
                  onClick={() => handleDelete(selectedProduct.id)}>
                  <Trash2 className="h-3.5 w-3.5 mr-1" /> Excluir
                </Button>
              )}
              <Button size="sm" className="h-8 text-xs" onClick={handleSave}>
                <Save className="h-3.5 w-3.5 mr-1" /> Salvar
              </Button>
            </>
          ) : (
            <Button size="sm" className="h-8 text-xs" onClick={startCreating}>
              <Plus className="h-3.5 w-3.5 mr-1" /> Novo Produto
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Col 1: Product list */}
        <div className={cn(
          'border-r bg-background flex flex-col shrink-0 transition-all',
          isEditing ? 'w-56' : 'w-full max-w-full'
        )}>
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Buscar produto..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-7 h-8 text-xs"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-1">
            {filtered.map(product => (
              <button
                key={product.id}
                onClick={() => openProduct(product)}
                className={cn(
                  'w-full flex items-center gap-2 px-2 py-2 rounded-md text-xs transition-colors',
                  selectedProduct?.id === product.id
                    ? 'bg-foreground text-background font-medium'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <img src={product.images[0]} alt="" className="w-8 h-8 rounded object-cover shrink-0" />
                <div className="flex-1 min-w-0 text-left">
                  <p className="truncate font-medium">{product.name}</p>
                  <p className={cn(
                    'text-[10px]',
                    selectedProduct?.id === product.id ? 'opacity-70' : 'text-muted-foreground'
                  )}>
                    {product.sku} · {formatCurrency(product.price)}
                  </p>
                </div>
                {!product.active && (
                  <Badge variant="secondary" className="text-[9px] shrink-0">Off</Badge>
                )}
                {product.stock < 10 && product.stock > 0 && (
                  <span className="text-[9px] text-orange-500 shrink-0">Baixo</span>
                )}
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="p-4 text-center text-xs text-muted-foreground">
                Nenhum produto encontrado.
              </div>
            )}
          </div>
        </div>

        {/* Col 2: Section tabs (only when editing) */}
        {isEditing && (
          <div className="w-44 border-r bg-background flex flex-col shrink-0">
            <div className="px-3 py-2 border-b">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Seções</p>
            </div>
            <div className="flex-1 overflow-y-auto p-1">
              {panelSections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActivePanel(section.id)}
                  className={cn(
                    'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-colors',
                    activePanel === section.id
                      ? 'bg-foreground text-background font-medium'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  )}
                >
                  <section.icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{section.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Col 3: Properties panel (only when editing) */}
        {isEditing && (
          <div className="flex-1 bg-background flex flex-col min-w-0">
            <div className="px-4 py-2 border-b flex items-center gap-2">
              <h2 className="text-sm font-semibold">
                {panelSections.find(s => s.id === activePanel)?.label}
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {renderPanel()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
