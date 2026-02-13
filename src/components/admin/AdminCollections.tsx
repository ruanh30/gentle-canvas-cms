import React, { useState } from 'react';
import { mockProducts, mockCollections } from '@/data/mock';
import { ProductCollection } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  Search, Plus, Trash2, ChevronLeft, Save, GripVertical,
  FileText, Package, ToggleLeft, X
} from 'lucide-react';

type PanelSection = 'info' | 'products' | 'status';

const panelSections: { id: PanelSection; label: string; icon: React.ElementType }[] = [
  { id: 'info', label: 'Informações', icon: FileText },
  { id: 'products', label: 'Produtos', icon: Package },
  { id: 'status', label: 'Status', icon: ToggleLeft },
];

const AdminCollections = () => {
  const [search, setSearch] = useState('');
  const [collections, setCollections] = useState<ProductCollection[]>(mockCollections);
  const [selectedCollection, setSelectedCollection] = useState<ProductCollection | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelSection>('info');
  const [productSearch, setProductSearch] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    productIds: [] as string[],
    active: true,
    order: 1,
  });

  const filtered = collections.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const openCollection = (col: ProductCollection) => {
    setSelectedCollection(col);
    setIsCreating(false);
    setActivePanel('info');
    setFormData({
      name: col.name,
      description: col.description || '',
      productIds: [...col.productIds],
      active: col.active,
      order: col.order,
    });
  };

  const startCreating = () => {
    setSelectedCollection(null);
    setIsCreating(true);
    setActivePanel('info');
    setFormData({
      name: '',
      description: '',
      productIds: [],
      active: true,
      order: collections.length + 1,
    });
  };

  const goBack = () => {
    setSelectedCollection(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    setCollections(prev => prev.filter(c => c.id !== id));
    if (selectedCollection?.id === id) goBack();
    toast.success('Coleção removida');
  };

  const handleSave = () => {
    if (!formData.name) {
      toast.error('Preencha o nome da coleção');
      return;
    }

    if (selectedCollection) {
      setCollections(prev =>
        prev.map(c =>
          c.id === selectedCollection.id
            ? { ...c, ...formData, slug: formData.name.toLowerCase().replace(/\s+/g, '-') }
            : c
        )
      );
      toast.success('Coleção atualizada');
    } else {
      const newCol: ProductCollection = {
        ...formData,
        id: `col-${Date.now()}`,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        createdAt: new Date().toISOString(),
      };
      setCollections(prev => [...prev, newCol]);
      openCollection(newCol);
      toast.success('Coleção criada');
    }
  };

  const toggleProduct = (productId: string) => {
    setFormData(f => ({
      ...f,
      productIds: f.productIds.includes(productId)
        ? f.productIds.filter(id => id !== productId)
        : [...f.productIds, productId],
    }));
  };

  const removeProduct = (productId: string) => {
    setFormData(f => ({
      ...f,
      productIds: f.productIds.filter(id => id !== productId),
    }));
  };

  const isEditing = selectedCollection !== null || isCreating;
  const editTitle = isCreating ? 'Nova Coleção' : selectedCollection?.name || '';

  const filteredProducts = mockProducts.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(productSearch.toLowerCase())
  );

  const selectedProducts = mockProducts.filter(p => formData.productIds.includes(p.id));

  const renderPanel = () => {
    switch (activePanel) {
      case 'info':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground">Nome da coleção</Label>
              <Input
                value={formData.name}
                onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                placeholder="Ex: Acabaram de Chegar"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Descrição (opcional)</Label>
              <Textarea
                value={formData.description}
                onChange={e => setFormData(f => ({ ...f, description: e.target.value }))}
                placeholder="Descreva a coleção..."
                className="mt-1 min-h-[80px]"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Ordem de exibição</Label>
              <Input
                type="number"
                min="1"
                value={formData.order}
                onChange={e => setFormData(f => ({ ...f, order: Number(e.target.value) }))}
                className="mt-1 w-24"
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                Menor número aparece primeiro na home.
              </p>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="space-y-4">
            {/* Selected products */}
            {selectedProducts.length > 0 && (
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">
                  Produtos na coleção ({selectedProducts.length})
                </Label>
                <div className="space-y-1">
                  {selectedProducts.map(product => (
                    <div
                      key={product.id}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-secondary/50 text-xs"
                    >
                      <GripVertical className="h-3 w-3 text-muted-foreground shrink-0" />
                      <img src={product.images[0]} alt="" className="w-7 h-7 rounded object-cover shrink-0" />
                      <span className="flex-1 truncate font-medium">{product.name}</span>
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="p-0.5 hover:bg-destructive/10 rounded transition-colors"
                      >
                        <X className="h-3 w-3 text-destructive" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add products */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Adicionar produtos</Label>
              <div className="relative mb-2">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Buscar produto..."
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                  className="pl-7 h-8 text-xs"
                />
              </div>
              <div className="max-h-[300px] overflow-y-auto space-y-0.5 border rounded-md p-1">
                {filteredProducts.map(product => {
                  const isSelected = formData.productIds.includes(product.id);
                  return (
                    <button
                      key={product.id}
                      onClick={() => toggleProduct(product.id)}
                      className={cn(
                        'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-colors',
                        isSelected
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      )}
                    >
                      <img src={product.images[0]} alt="" className="w-7 h-7 rounded object-cover shrink-0" />
                      <span className="flex-1 truncate text-left">{product.name}</span>
                      {isSelected && (
                        <Badge variant="default" className="text-[9px] shrink-0">✓</Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'status':
        return (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm">Coleção ativa</Label>
                <p className="text-[11px] text-muted-foreground">Visível na página inicial da loja.</p>
              </div>
              <Switch
                checked={formData.active}
                onCheckedChange={v => setFormData(f => ({ ...f, active: v }))}
              />
            </div>
            <div className="p-3 bg-secondary/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                💡 Cada coleção ativa aparecerá como uma seção separada na home, com seu próprio título e carrossel de produtos.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-background border-b shrink-0">
        <div className="flex items-center gap-2">
          {isEditing && (
            <button onClick={goBack} className="p-1 hover:bg-secondary rounded-md transition-colors mr-1">
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          <h1 className="text-sm font-bold">{isEditing ? editTitle : 'Coleções'}</h1>
          {selectedCollection && (
            <Badge variant={selectedCollection.active ? 'default' : 'secondary'} className="text-[10px]">
              {selectedCollection.active ? 'Ativa' : 'Inativa'}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {isEditing ? (
            <>
              {selectedCollection && (
                <Button variant="ghost" size="sm" className="h-8 text-xs text-destructive hover:text-destructive"
                  onClick={() => handleDelete(selectedCollection.id)}>
                  <Trash2 className="h-3.5 w-3.5 mr-1" /> Excluir
                </Button>
              )}
              <Button size="sm" className="h-8 text-xs" onClick={handleSave}>
                <Save className="h-3.5 w-3.5 mr-1" /> Salvar
              </Button>
            </>
          ) : (
            <Button size="sm" className="h-8 text-xs" onClick={startCreating}>
              <Plus className="h-3.5 w-3.5 mr-1" /> Nova Coleção
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Col 1: Collection list */}
        <div className={cn(
          'border-r bg-background flex flex-col shrink-0 transition-all',
          isEditing ? 'w-56' : 'w-full max-w-full'
        )}>
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Buscar coleção..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-7 h-8 text-xs"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-1">
            {filtered.map(col => (
              <button
                key={col.id}
                onClick={() => openCollection(col)}
                className={cn(
                  'w-full flex items-center gap-2 px-2 py-2 rounded-md text-xs transition-colors',
                  selectedCollection?.id === col.id
                    ? 'bg-foreground text-background font-medium'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <div className="flex-1 min-w-0 text-left">
                  <p className="truncate font-medium">{col.name}</p>
                  <p className={cn(
                    'text-[10px]',
                    selectedCollection?.id === col.id ? 'opacity-70' : 'text-muted-foreground'
                  )}>
                    {col.productIds.length} produtos · Ordem {col.order}
                  </p>
                </div>
                {!col.active && (
                  <Badge variant="secondary" className="text-[9px] shrink-0">Off</Badge>
                )}
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="p-4 text-center text-xs text-muted-foreground">
                Nenhuma coleção encontrada.
              </div>
            )}
          </div>
        </div>

        {/* Col 2: Section tabs */}
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

        {/* Col 3: Properties panel */}
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

export default AdminCollections;
