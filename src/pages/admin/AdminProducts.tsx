import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus, Search, ChevronLeft,
  FileText, DollarSign, Globe, ImageIcon, Eye,
  Pencil, Trash2, Package as PackageIcon, Save,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Types & Mock Data                                                  */
/* ------------------------------------------------------------------ */

interface MockCategory { id: string; name: string; slug: string; description: string }
interface MockProduct {
  id: string; name: string; sku: string; price: number; compareAtPrice: number;
  stock: number; categoryId: string; description: string; active: boolean; featured: boolean;
}
interface MockCollection {
  id: string; name: string; description: string; order: number;
  active: boolean; productIds: string[];
}

const initCategories: MockCategory[] = [
  { id: 'c1', name: 'Camisetas', slug: 'camisetas', description: 'Camisetas variadas' },
  { id: 'c2', name: 'Calças', slug: 'calcas', description: '' },
  { id: 'c3', name: 'Acessórios', slug: 'acessorios', description: 'Bonés, bolsas e mais' },
];

const initProducts: MockProduct[] = [
  { id: 'p1', name: 'Camiseta Básica', sku: 'CAM-001', price: 79.90, compareAtPrice: 0, stock: 45, categoryId: 'c1', description: '', active: true, featured: false },
  { id: 'p2', name: 'Calça Jeans Slim', sku: 'CAL-002', price: 189.90, compareAtPrice: 229.90, stock: 23, categoryId: 'c2', description: '', active: true, featured: false },
  { id: 'p3', name: 'Tênis Runner', sku: 'TEN-003', price: 299.90, compareAtPrice: 0, stock: 8, categoryId: 'c3', description: '', active: true, featured: true },
  { id: 'p4', name: 'Boné Classic', sku: 'BON-004', price: 59.90, compareAtPrice: 0, stock: 67, categoryId: 'c3', description: '', active: true, featured: false },
];

const initCollections: MockCollection[] = [];

type Tab = 'categories' | 'products' | 'collections';
type ProductSection = 'info' | 'price' | 'stock' | 'images' | 'status';
type CollectionSection = 'info' | 'products' | 'status';

/* ------------------------------------------------------------------ */
/*  Shared: Save Button                                                */
/* ------------------------------------------------------------------ */

function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
      <Save className="h-4 w-4" /> Salvar
    </Button>
  );
}

/* ------------------------------------------------------------------ */
/*  Product Section Nav                                                */
/* ------------------------------------------------------------------ */

function ProductSectionNav({ active, onChange }: { active: ProductSection; onChange: (s: ProductSection) => void }) {
  const items: { key: ProductSection; label: string; icon: React.ElementType }[] = [
    { key: 'info', label: 'Informações', icon: FileText },
    { key: 'price', label: 'Preço', icon: DollarSign },
    { key: 'stock', label: 'Estoque', icon: Globe },
    { key: 'images', label: 'Imagens', icon: ImageIcon },
    { key: 'status', label: 'Status', icon: Eye },
  ];
  return (
    <div className="w-40 shrink-0 border-r border-border pr-4">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-3">Seções</p>
      <nav className="space-y-0.5">
        {items.map(i => (
          <button
            key={i.key}
            onClick={() => onChange(i.key)}
            className={cn(
              'flex items-center gap-2.5 w-full px-3 py-2 rounded-md text-sm transition-colors',
              active === i.key
                ? 'bg-foreground text-background font-medium'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            )}
          >
            <i.icon className="h-4 w-4" />
            {i.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

function CollectionSectionNav({ active, onChange }: { active: CollectionSection; onChange: (s: CollectionSection) => void }) {
  const items: { key: CollectionSection; label: string; icon: React.ElementType }[] = [
    { key: 'info', label: 'Informacoes', icon: FileText },
    { key: 'products', label: 'Produtos', icon: Globe },
    { key: 'status', label: 'Status', icon: Eye },
  ];
  return (
    <div className="w-40 shrink-0 border-r border-border pr-4">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-3">Seções</p>
      <nav className="space-y-0.5">
        {items.map(i => (
          <button
            key={i.key}
            onClick={() => onChange(i.key)}
            className={cn(
              'flex items-center gap-2.5 w-full px-3 py-2 rounded-md text-sm transition-colors',
              active === i.key
                ? 'bg-foreground text-background font-medium'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            )}
          >
            <i.icon className="h-4 w-4" />
            {i.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Product sidebar list                                               */
/* ------------------------------------------------------------------ */

function ProductSidebar({ products, activeId, search, onSearch, onSelect }: {
  products: MockProduct[]; activeId: string; search: string;
  onSearch: (s: string) => void; onSelect: (p: MockProduct) => void;
}) {
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="w-48 shrink-0 border-r border-border pr-3 space-y-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input placeholder="Buscar produto..." className="pl-8 h-9 text-xs" value={search} onChange={e => onSearch(e.target.value)} />
      </div>
      <div className="space-y-1 max-h-[65vh] overflow-y-auto">
        {filtered.map(p => (
          <button
            key={p.id}
            onClick={() => onSelect(p)}
            className={cn(
              'flex items-center gap-2.5 w-full px-2 py-2 rounded-md text-left transition-colors',
              p.id === activeId ? 'bg-muted' : 'hover:bg-muted/40'
            )}
          >
            <div className="h-9 w-9 rounded-md bg-muted flex items-center justify-center shrink-0">
              <PackageIcon className="h-4 w-4 text-muted-foreground/40" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-foreground truncate">{p.name}</p>
              <p className="text-[10px] text-muted-foreground">{p.sku} · R$ {p.price.toFixed(2).replace('.', ',')}</p>
            </div>
            {p.stock > 0 && p.stock <= 10 && <span className="text-[10px] text-orange-500 font-medium shrink-0">Baixo</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Collection sidebar list                                            */
/* ------------------------------------------------------------------ */

function CollectionSidebar({ collections, activeId, search, onSearch, onSelect }: {
  collections: MockCollection[]; activeId: string; search: string;
  onSearch: (s: string) => void; onSelect: (c: MockCollection) => void;
}) {
  const filtered = collections.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="w-48 shrink-0 border-r border-border pr-3 space-y-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input placeholder="Buscar coleção..." className="pl-8 h-9 text-xs" value={search} onChange={e => onSearch(e.target.value)} />
      </div>
      {filtered.length === 0 ? (
        <p className="text-xs text-muted-foreground/60 text-center py-6">Nenhuma coleção encontrada.</p>
      ) : (
        <div className="space-y-1 max-h-[65vh] overflow-y-auto">
          {filtered.map(c => (
            <button
              key={c.id}
              onClick={() => onSelect(c)}
              className={cn(
                'w-full px-2 py-2 rounded-md text-left text-xs transition-colors',
                c.id === activeId ? 'bg-muted font-medium text-foreground' : 'hover:bg-muted/40 text-muted-foreground'
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  CATEGORIES TAB                                                     */
/* ================================================================== */

function CategoriesTab() {
  const [categories, setCategories] = useState(initCategories);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<MockCategory | null>(null);
  const filtered = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  if (editing) {
    return <CategoryForm category={editing} onSave={c => { setCategories(prev => prev.find(x => x.id === c.id) ? prev.map(x => x.id === c.id ? c : x) : [...prev, c]); setEditing(null); }} onBack={() => setEditing(null)} />;
  }

  return (
    <div className="space-y-5 pt-2">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar categoria..." className="pl-9 border-border" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Button onClick={() => setEditing({ id: `c${Date.now()}`, name: '', slug: '', description: '' })} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="h-4 w-4" /> Nova Categoria
        </Button>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">Nome</th>
              <th className="text-left px-5 py-3.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">Slug</th>
              <th className="text-left px-5 py-3.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">Descrição</th>
              <th className="w-24 px-5 py-3.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <PackageIcon className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                    <span className="font-medium text-foreground">{c.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{c.slug}</td>
                <td className="px-5 py-4 text-muted-foreground">{c.description || ''}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => setEditing(c)} className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => setCategories(prev => prev.filter(x => x.id !== c.id))} className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-sm text-muted-foreground">Nenhuma categoria encontrada.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CategoryForm({ category, onSave, onBack }: { category: MockCategory; onSave: (c: MockCategory) => void; onBack: () => void }) {
  const [form, setForm] = useState(category);
  return (
    <div className="space-y-6 pt-2">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"><ChevronLeft className="h-4 w-4" /> Voltar</button>
        <SaveButton onClick={() => onSave(form)} />
      </div>
      <div className="max-w-xl space-y-5">
        <div><label className="text-sm font-medium text-foreground">Nome da categoria</label><Input className="mt-1.5" placeholder="Ex: Camisetas" value={form.name} onChange={e => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} /></div>
        <div><label className="text-sm font-medium text-foreground">Slug</label><Input className="mt-1.5" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} /></div>
        <div><label className="text-sm font-medium text-foreground">Descrição</label><Textarea className="mt-1.5" placeholder="Descrição da categoria..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  PRODUCTS TAB                                                       */
/* ================================================================== */

function ProductsTab() {
  const [products, setProducts] = useState(initProducts);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<MockProduct | null>(null);
  const [sidebarSearch, setSidebarSearch] = useState('');
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  if (editing) {
    return (
      <ProductForm
        product={editing}
        allProducts={products}
        sidebarSearch={sidebarSearch}
        onSidebarSearch={setSidebarSearch}
        onSelect={setEditing}
        onSave={p => { setProducts(prev => prev.find(x => x.id === p.id) ? prev.map(x => x.id === p.id ? p : x) : [...prev, p]); setEditing(null); }}
        onBack={() => setEditing(null)}
      />
    );
  }

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Produtos</h2>
        <Button onClick={() => setEditing({ id: `p${Date.now()}`, name: '', sku: '', price: 0, compareAtPrice: 0, stock: 0, categoryId: '', description: '', active: true, featured: false })} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="h-4 w-4" /> Novo Produto
        </Button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar produto..." className="pl-9 border-border" value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="space-y-0">
        {filtered.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setEditing(p)}
            className={cn(
              'flex items-center gap-3.5 w-full px-1 py-3 text-left hover:bg-muted/30 transition-colors',
              i < filtered.length - 1 && 'border-b border-border'
            )}
          >
            <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center shrink-0">
              <PackageIcon className="h-5 w-5 text-muted-foreground/30" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.sku} · R$ {p.price.toFixed(2).replace('.', ',')}</p>
            </div>
            {p.stock > 0 && p.stock <= 10 && <span className="text-xs text-orange-500 font-medium pr-2">Baixo</span>}
            {p.stock === 0 && <span className="text-xs text-destructive font-medium pr-2">Esgotado</span>}
          </button>
        ))}
        {filtered.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">Nenhum produto encontrado.</p>}
      </div>
    </div>
  );
}

function ProductForm({ product, allProducts, sidebarSearch, onSidebarSearch, onSelect, onSave, onBack }: {
  product: MockProduct; allProducts: MockProduct[]; sidebarSearch: string;
  onSidebarSearch: (s: string) => void; onSelect: (p: MockProduct) => void;
  onSave: (p: MockProduct) => void; onBack: () => void;
}) {
  const [form, setForm] = useState(product);
  const [section, setSection] = useState<ProductSection>('info');

  // sync when switching products via sidebar
  React.useEffect(() => { setForm(product); }, [product]);

  return (
    <div className="pt-2">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors">
          <ChevronLeft className="h-4 w-4" />
          {form.name || 'Novo Produto'}
        </button>
        <SaveButton onClick={() => onSave(form)} />
      </div>

      {/* 3-column layout */}
      <div className="flex gap-5">
        <ProductSidebar products={allProducts} activeId={form.id} search={sidebarSearch} onSearch={onSidebarSearch} onSelect={onSelect} />
        <ProductSectionNav active={section} onChange={setSection} />

        <div className="flex-1 min-w-0 pl-4">
          {section === 'info' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-foreground">Informações</h3>
              <hr className="border-border" />
              <div><label className="text-sm font-medium text-foreground">Nome do produto</label><Input className="mt-1.5" placeholder="Ex: Camiseta Premium" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div><label className="text-sm font-medium text-foreground">SKU</label><Input className="mt-1.5" placeholder="Ex: CAM-001" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} /></div>
              <div>
                <label className="text-sm font-medium text-foreground">Categoria</label>
                <Select value={form.categoryId} onValueChange={v => setForm({ ...form, categoryId: v })}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent>{initCategories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><label className="text-sm font-medium text-foreground">Descrição</label><Textarea className="mt-1.5" placeholder="Descreva o produto..." rows={5} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
            </div>
          )}

          {section === 'price' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-foreground">Preço</h3>
              <hr className="border-border" />
              <div><label className="text-sm font-medium text-foreground">Preço de venda (R$)</label><Input className="mt-1.5" type="number" min={0} step={0.01} value={form.price} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} /></div>
              <div>
                <label className="text-sm font-medium text-foreground">Preço comparativo (riscado)</label>
                <Input className="mt-1.5" type="number" min={0} step={0.01} value={form.compareAtPrice} onChange={e => setForm({ ...form, compareAtPrice: parseFloat(e.target.value) || 0 })} />
                <p className="text-xs text-muted-foreground mt-1.5">Exibido como preço "de" riscado ao lado do preço atual.</p>
              </div>
            </div>
          )}

          {section === 'stock' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-foreground">Estoque</h3>
              <hr className="border-border" />
              <div><label className="text-sm font-medium text-foreground">Quantidade em estoque</label><Input className="mt-1.5" type="number" min={0} value={form.stock} onChange={e => setForm({ ...form, stock: parseInt(e.target.value) || 0 })} /></div>
              <div className="bg-muted/50 rounded-lg px-4 py-3 mt-2">
                <p className="text-xs text-muted-foreground">Quando o estoque chegar a 0, o produto será exibido como "Esgotado" automaticamente.</p>
              </div>
            </div>
          )}

          {section === 'images' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-foreground">Imagens</h3>
              <hr className="border-border" />
              <div className="border-2 border-dashed border-border rounded-lg py-10 flex flex-col items-center justify-center gap-2">
                <ImageIcon className="h-10 w-10 text-muted-foreground/25" />
                <p className="text-sm text-muted-foreground">Nenhuma imagem selecionada</p>
                <p className="text-xs text-muted-foreground/60">Selecione imagens da sua Mídia abaixo e clique em Salvar.</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-foreground">Mídia (clique para adicionar)</p>
                  <button className="text-xs text-primary hover:underline">Atualizar</button>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {[1,2,3,4,5,6,7,8].map(i => (
                    <div key={i} className="aspect-square bg-muted/30 rounded-lg flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all">
                      <ImageIcon className="h-6 w-6 text-muted-foreground/15" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {section === 'status' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-foreground">Status</h3>
              <hr className="border-border" />
              <div className="flex items-center justify-between py-1">
                <div><p className="text-sm font-medium text-foreground">Produto ativo</p><p className="text-xs text-muted-foreground">Visível na loja para os clientes.</p></div>
                <Switch checked={form.active} onCheckedChange={v => setForm({ ...form, active: v })} />
              </div>
              <div className="flex items-center justify-between py-1">
                <div><p className="text-sm font-medium text-foreground">Produto destaque</p><p className="text-xs text-muted-foreground">Aparece na seção de destaques da home.</p></div>
                <Switch checked={form.featured} onCheckedChange={v => setForm({ ...form, featured: v })} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  COLLECTIONS TAB                                                    */
/* ================================================================== */

function CollectionsTab() {
  const [collections, setCollections] = useState(initCollections);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<MockCollection | null>(null);
  const [sidebarSearch, setSidebarSearch] = useState('');

  if (editing) {
    return (
      <CollectionForm
        collection={editing}
        allCollections={collections}
        sidebarSearch={sidebarSearch}
        onSidebarSearch={setSidebarSearch}
        onSelect={setEditing}
        onSave={c => { setCollections(prev => prev.find(x => x.id === c.id) ? prev.map(x => x.id === c.id ? c : x) : [...prev, c]); setEditing(null); }}
        onBack={() => setEditing(null)}
      />
    );
  }

  return (
    <div className="space-y-5 pt-2">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar coleção..." className="pl-9 border-border" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Button onClick={() => setEditing({ id: `col${Date.now()}`, name: '', description: '', order: 1, active: true, productIds: [] })} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="h-4 w-4" /> Nova Coleção
        </Button>
      </div>

      {collections.length === 0 ? (
        <div className="py-12 text-center"><p className="text-sm text-muted-foreground">Nenhuma coleção encontrada.</p></div>
      ) : (
        <div className="border border-border rounded-lg divide-y divide-border bg-card">
          {collections.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map(c => (
            <button key={c.id} onClick={() => setEditing(c)} className="flex items-center gap-3 px-5 py-3.5 w-full text-left hover:bg-muted/30 transition-colors">
              <div className="flex-1"><p className="text-sm font-medium text-foreground">{c.name}</p><p className="text-xs text-muted-foreground">{c.productIds.length} produtos</p></div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CollectionForm({ collection, allCollections, sidebarSearch, onSidebarSearch, onSelect, onSave, onBack }: {
  collection: MockCollection; allCollections: MockCollection[]; sidebarSearch: string;
  onSidebarSearch: (s: string) => void; onSelect: (c: MockCollection) => void;
  onSave: (c: MockCollection) => void; onBack: () => void;
}) {
  const [form, setForm] = useState(collection);
  const [section, setSection] = useState<CollectionSection>('info');
  const [prodSearch, setProdSearch] = useState('');
  const availableProducts = initProducts.filter(p => p.name.toLowerCase().includes(prodSearch.toLowerCase()));

  React.useEffect(() => { setForm(collection); }, [collection]);

  return (
    <div className="pt-2">
      <div className="flex items-center justify-between mb-5">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors">
          <ChevronLeft className="h-4 w-4" />
          {form.name || 'Nova Coleção'}
        </button>
        <SaveButton onClick={() => onSave(form)} />
      </div>

      <div className="flex gap-5">
        <CollectionSidebar collections={allCollections} activeId={form.id} search={sidebarSearch} onSearch={onSidebarSearch} onSelect={onSelect} />
        <CollectionSectionNav active={section} onChange={setSection} />

        <div className="flex-1 min-w-0 pl-4">
          {section === 'info' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-foreground">Informações</h3>
              <hr className="border-border" />
              <div><label className="text-sm font-medium text-foreground">Nome da coleção</label><Input className="mt-1.5" placeholder="Ex: Novidades" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div><label className="text-sm font-medium text-foreground">Descrição (opcional)</label><Textarea className="mt-1.5" placeholder="Descreva a coleção..." rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
              <div>
                <label className="text-sm font-medium text-foreground">Ordem de exibição</label>
                <Input className="mt-1.5 w-24" type="number" min={1} value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 1 })} />
                <p className="text-xs text-muted-foreground mt-1.5">Menor número aparece primeiro na home.</p>
              </div>
            </div>
          )}

          {section === 'products' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-foreground">Produtos</h3>
              <hr className="border-border" />
              <div>
                <label className="text-sm font-medium text-foreground">Adicionar produtos</label>
                <div className="relative mt-1.5">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar produto..." className="pl-9" value={prodSearch} onChange={e => setProdSearch(e.target.value)} />
                </div>
              </div>
              <div className="border border-border rounded-lg divide-y divide-border">
                {availableProducts.map(p => {
                  const selected = form.productIds.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => setForm(prev => ({ ...prev, productIds: selected ? prev.productIds.filter(id => id !== p.id) : [...prev.productIds, p.id] }))}
                      className={cn('flex items-center gap-3 px-4 py-3 w-full text-left transition-colors', selected ? 'bg-primary/5' : 'hover:bg-muted/30')}
                    >
                      <div className="h-9 w-9 rounded-md bg-muted flex items-center justify-center shrink-0"><PackageIcon className="h-4 w-4 text-muted-foreground/30" /></div>
                      <p className="text-sm text-foreground">{p.name}</p>
                      {selected && <span className="ml-auto text-xs text-primary font-medium">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {section === 'status' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-foreground">Status</h3>
              <hr className="border-border" />
              <div className="flex items-center justify-between py-1">
                <div><p className="text-sm font-medium text-foreground">Coleção ativa</p><p className="text-xs text-muted-foreground">Visível na página inicial da loja.</p></div>
                <Switch checked={form.active} onCheckedChange={v => setForm({ ...form, active: v })} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  MAIN PAGE                                                          */
/* ================================================================== */

export default function AdminProducts() {
  const [tab, setTab] = useState<Tab>('categories');

  return (
    <div className="h-full flex flex-col">
      {/* Underline-style tabs */}
      <div className="border-b border-border px-6 pt-2 flex gap-0">
        {([
          { key: 'categories' as Tab, label: 'Categorias' },
          { key: 'products' as Tab, label: 'Produtos', icon: Globe },
          { key: 'collections' as Tab, label: 'Coleções' },
        ]).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px',
              tab === t.key
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            )}
          >
            {t.icon && <t.icon className="h-3.5 w-3.5" />}
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {tab === 'categories' && <CategoriesTab />}
        {tab === 'products' && <ProductsTab />}
        {tab === 'collections' && <CollectionsTab />}
      </div>
    </div>
  );
}
