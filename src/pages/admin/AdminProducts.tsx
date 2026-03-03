import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import SecureFileUpload from '@/components/admin/SecureFileUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Plus, Search, ChevronLeft, ChevronUp, ChevronDown,
  FileText, DollarSign, Boxes, ImageIcon, Eye, EyeOff,
  Trash2, Package as PackageIcon, Save, Palette,
  Star, Tag, Layers, Link, Image, Check, Info, X,
  Copy, Weight, Ruler, Globe, Award, GripVertical, Pencil,
  Grid3X3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { mockProducts, mockCategories, mockCollections, mockSizeGuides } from '@/data/mock';
import type { Product, Category, ProductCollection } from '@/types';
import type { ThemeHomepageSection } from '@/types/theme';
import SizeGuidesTab from '@/components/admin/SizeGuidesTab';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Tab = 'categories' | 'products' | 'collections' | 'sizeguides';
type ProductSection = 'info' | 'price' | 'stock' | 'images' | 'seo' | 'status';
type CollectionSection = 'info' | 'products' | 'status';

/* ------------------------------------------------------------------ */
/*  Shared                                                             */
/* ------------------------------------------------------------------ */

function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} className="gap-2">
      <Save className="h-4 w-4" /> Salvar
    </Button>
  );
}

function SectionNav<T extends string>({ items, active, onChange }: {
  items: { key: T; label: string; icon: React.ElementType }[];
  active: T;
  onChange: (s: T) => void;
}) {
  return (
    <div className="w-44 shrink-0 border-r border-border">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 px-3 mb-2">Seções</p>
      <nav className="space-y-0.5 pr-3">
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
/*  Confirm Delete Dialog                                              */
/* ------------------------------------------------------------------ */

function ConfirmDeleteDialog({ open, onOpenChange, title, description, onConfirm }: {
  open: boolean; onOpenChange: (o: boolean) => void;
  title: string; description: string; onConfirm: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/* ================================================================== */
/*  CATEGORY FORM                                                      */
/* ================================================================== */

function CategoryForm({ category, allCategories, onSave, onBack, onDelete, productCount }: {
  category: Category; allCategories: Category[]; onSave: (c: Category) => void; onBack: () => void; onDelete?: () => void; productCount: number;
}) {
  const [form, setForm] = useState(category);
  const [urlInput, setUrlInput] = useState('');
  const [showMedia, setShowMedia] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const allMedia = getAllMediaImages();
  const filteredMedia = allMedia.filter(m =>
    m.name.toLowerCase().includes(mediaSearch.toLowerCase()) &&
    m.url !== form.image
  );

  // Filter out self and descendants for parent selector
  const parentOptions = allCategories.filter(c => c.id !== form.id);

  return (
    <div className="space-y-6 pt-2">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors">
          <ChevronLeft className="h-4 w-4" /> {form.name || 'Nova Categoria'}
        </button>
        <div className="flex items-center gap-2">
          {onDelete && (
            <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive" onClick={() => setConfirmDelete(true)}>
              <Trash2 className="h-3.5 w-3.5" /> Excluir
            </Button>
          )}
          <SaveButton onClick={() => onSave(form)} />
        </div>
      </div>

      <div className="max-w-xl space-y-5">
        {/* Image preview */}
        <div>
          <label className="text-sm font-medium text-foreground">Imagem da categoria</label>
          <div className="flex items-start gap-2 bg-muted/50 border border-border rounded-lg px-3 py-2 mt-1.5 mb-3">
            <Info className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-[11px] text-muted-foreground">
              Recomendado: <span className="font-medium">600×600px</span> (quadrada) ou <span className="font-medium">800×400px</span> (banner). JPG/PNG.
            </p>
          </div>

          {form.image ? (
            <div className="relative group w-full h-36 rounded-lg overflow-hidden bg-muted border border-border">
              <img src={form.image} alt={form.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors flex items-center justify-center gap-2">
                <button
                  onClick={() => setForm({ ...form, image: undefined })}
                  className="opacity-0 group-hover:opacity-100 p-2 bg-background rounded-full shadow-lg transition-opacity"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-border rounded-lg py-8 flex flex-col items-center justify-center gap-2">
              <ImageIcon className="h-8 w-8 text-muted-foreground/25" />
              <p className="text-xs text-muted-foreground">Nenhuma imagem</p>
            </div>
          )}

          <SecureFileUpload onFileAccepted={(dataUrl) => setForm({ ...form, image: dataUrl })} compact className="mt-3" />

          <div className="mt-3">
            <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
              <Link className="h-3 w-3" /> URL da imagem
            </label>
            <div className="flex gap-2 mt-1">
              <Input placeholder="https://exemplo.com/imagem.jpg" className="flex-1 h-9 text-sm" value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && urlInput.trim()) { setForm({ ...form, image: urlInput.trim() }); setUrlInput(''); } }} />
              <Button variant="outline" size="sm" disabled={!urlInput.trim()} onClick={() => { setForm({ ...form, image: urlInput.trim() }); setUrlInput(''); }}>Usar</Button>
            </div>
          </div>

          <div className="mt-3">
            <button onClick={() => setShowMedia(!showMedia)} className="text-xs font-medium text-foreground flex items-center gap-1.5 hover:text-primary transition-colors">
              <Image className="h-3 w-3" /> {showMedia ? 'Ocultar Mídia' : 'Selecionar da Mídia'}
            </button>
            {showMedia && (
              <div className="mt-2 border border-border rounded-lg p-3 space-y-2 bg-muted/20">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input placeholder="Buscar..." className="pl-8 h-8 text-xs" value={mediaSearch} onChange={e => setMediaSearch(e.target.value)} />
                </div>
                {filteredMedia.length > 0 ? (
                  <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                    {filteredMedia.map((m, i) => (
                      <button key={i} onClick={() => { setForm({ ...form, image: m.url }); setShowMedia(false); }}
                        className="group relative aspect-square rounded-md overflow-hidden border border-border hover:border-primary/50 transition-colors">
                        <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                        <span className="absolute bottom-0 inset-x-0 bg-foreground/60 text-background text-[9px] px-1 py-0.5 truncate">{m.name}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-3">Nenhuma imagem disponível</p>
                )}
              </div>
            )}
          </div>
        </div>

        <hr className="border-border" />

        <div>
          <label className="text-sm font-medium text-foreground">Nome da categoria</label>
          <Input className="mt-1.5" placeholder="Ex: Camisetas" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Slug</label>
          <Input className="mt-1.5" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
          <p className="text-[10px] text-muted-foreground mt-1">URL: /categorias/{form.slug || '...'}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Pertence a</label>
          <Select value={form.parentId || '_none'} onValueChange={v => setForm({ ...form, parentId: v === '_none' ? undefined : v })}>
            <SelectTrigger className="mt-1.5"><SelectValue placeholder="Nenhuma (categoria principal)" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="_none">Nenhuma (categoria principal)</SelectItem>
              {parentOptions.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <p className="text-[10px] text-muted-foreground mt-1">Escolha onde esta categoria fica organizada. Ex: "Camisetas" pode ficar dentro de "Roupas". Se não pertence a nenhuma outra, deixe como principal.</p>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Descrição</label>
          <Textarea className="mt-1.5" placeholder="Descrição da categoria..." rows={3} value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} />
        </div>

        {/* Active toggle */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-medium text-foreground">Categoria ativa</p>
            <p className="text-xs text-muted-foreground">Visível na navegação da loja.</p>
          </div>
          <Switch checked={form.active !== false} onCheckedChange={v => setForm({ ...form, active: v })} />
        </div>

        {productCount > 0 && (
          <div className="bg-muted/50 rounded-lg px-4 py-3">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{productCount}</span> produto(s) nesta categoria
            </p>
          </div>
        )}

        {/* SEO */}
        <hr className="border-border" />
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Globe className="h-4 w-4" /> SEO
        </h4>
        <p className="text-xs text-muted-foreground -mt-3">Otimize como a categoria aparece nos buscadores.</p>
        <div>
          <label className="text-sm font-medium text-foreground">Meta título</label>
          <Input className="mt-1.5" placeholder={form.name || 'Título da página'} value={form.metaTitle || ''}
            onChange={e => setForm({ ...form, metaTitle: e.target.value })} maxLength={60} />
          <p className="text-[10px] text-muted-foreground mt-1">{(form.metaTitle || '').length}/60 caracteres</p>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Meta descrição</label>
          <Textarea className="mt-1.5" placeholder={form.description || 'Descrição para buscadores...'} rows={3}
            value={form.metaDescription || ''} onChange={e => setForm({ ...form, metaDescription: e.target.value })} maxLength={160} />
          <p className="text-[10px] text-muted-foreground mt-1">{(form.metaDescription || '').length}/160 caracteres</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 space-y-1">
          <p className="text-sm font-medium text-primary truncate">{form.metaTitle || form.name || 'Título da categoria'}</p>
          <p className="text-[10px] text-emerald-600 truncate">modastore.com/categorias/{form.slug || '...'}</p>
          <p className="text-xs text-muted-foreground line-clamp-2">{form.metaDescription || form.description || 'Descrição da categoria aparecerá aqui...'}</p>
        </div>
      </div>

      {onDelete && (
        <ConfirmDeleteDialog
          open={confirmDelete}
          onOpenChange={setConfirmDelete}
          title="Excluir categoria"
          description={`Tem certeza que deseja excluir "${form.name}"? ${productCount > 0 ? `Existem ${productCount} produto(s) vinculados.` : ''} Esta ação não pode ser desfeita.`}
          onConfirm={onDelete}
        />
      )}
    </div>
  );
}

/* ================================================================== */
/*  CATEGORIES TAB                                                     */
/* ================================================================== */

function CategoriesTab() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Category | null>(null);
  const { draft, updateDraft } = useTheme();
  const filtered = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const autoAddCategoryToHome = (cat: Category) => {
    const exists = draft.homepageSections.some(s => s.id === `cat-section-${cat.id}`);
    if (!exists) {
      const newSection: ThemeHomepageSection = {
        id: `cat-section-${cat.id}`, type: 'categories', enabled: true,
        title: cat.name, showTitle: true, settings: { selectedCategoryIds: [cat.id] },
      };
      updateDraft({ homepageSections: [...draft.homepageSections, newSection] });
    }
  };

  const productCount = (catId: string) => mockProducts.filter(p => p.categoryId === catId).length;

  if (editing) {
    const isNew = !categories.find(x => x.id === editing.id);
    return (
      <CategoryForm
        category={editing}
        allCategories={categories}
        onSave={cat => {
          const duplicate = categories.find(x => x.slug === cat.slug && x.id !== cat.id);
          if (duplicate) {
            toast({ title: 'Slug já existe', description: `A categoria "${duplicate.name}" já utiliza o slug "/${cat.slug}". Escolha um slug diferente.`, variant: 'destructive' });
            return;
          }
          const isNewCat = !categories.find(x => x.id === cat.id);
          setCategories(prev => prev.find(x => x.id === cat.id) ? prev.map(x => x.id === cat.id ? cat : x) : [...prev, cat]);
          if (isNewCat) autoAddCategoryToHome(cat);
          setEditing(null);
        }}
        onBack={() => setEditing(null)}
        onDelete={!isNew ? () => {
          setCategories(prev => prev.filter(x => x.id !== editing.id));
          setEditing(null);
          toast({ title: 'Categoria excluída', description: `"${editing.name}" foi removida.` });
        } : undefined}
        productCount={productCount(editing.id)}
      />
    );
  }

  return (
    <div className="space-y-5 pt-2">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar categoria..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Button onClick={() => setEditing({ id: `cat-${Date.now()}`, name: '', slug: '', active: true })} className="gap-2">
          <Plus className="h-4 w-4" /> Nova Categoria
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(c => (
          <div key={c.id} className="border border-border rounded-lg overflow-hidden bg-card hover:border-primary/30 transition-colors group cursor-pointer" onClick={() => setEditing(c)}>
            <div className="h-28 bg-muted overflow-hidden relative">
              {c.image ? (
                <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <div className="flex items-center justify-center h-full"><PackageIcon className="h-8 w-8 text-muted-foreground/20" /></div>
              )}
              {c.active === false && (
                <Badge variant="secondary" className="absolute top-2 right-2 text-[9px]">Inativa</Badge>
              )}
            </div>
            <div className="p-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">{c.name}</h3>
                <Badge variant="secondary" className="text-[10px]">{productCount(c.id)} produtos</Badge>
              </div>
              {c.parentId && (() => {
                const parent = categories.find(x => x.id === c.parentId);
                return parent ? <p className="text-[10px] text-primary/70 mt-0.5">↳ Subcategoria de {parent.name}</p> : null;
              })()}
              {c.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{c.description}</p>}
              <p className="text-[10px] text-muted-foreground/60 mt-1.5">/{c.slug}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  PRODUCTS TAB                                                       */
/* ================================================================== */

function ProductsTab() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Product | null>(null);
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<Product | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterStock, setFilterStock] = useState<string>('all');
  const filtered = products.filter(p => {
    if (!p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCategory !== 'all' && p.categoryId !== filterCategory) return false;
    if (filterStatus === 'active' && !p.active) return false;
    if (filterStatus === 'inactive' && p.active) return false;
    if (filterStatus === 'featured' && !p.featured) return false;
    if (filterStock === 'out' && p.stock > 0) return false;
    if (filterStock === 'low' && (p.stock === 0 || p.stock > 10)) return false;
    if (filterStock === 'in' && p.stock <= 0) return false;
    return true;
  });

  const duplicateProduct = (p: Product) => {
    const dup: Product = {
      ...p,
      id: `prod-${Date.now()}`,
      name: `${p.name} (Cópia)`,
      slug: `${p.slug}-copia-${Date.now()}`,
      sku: `${p.sku}-COPY`,
      createdAt: new Date().toISOString(),
      variants: p.variants.map(v => ({ ...v, id: `v-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`, productId: `prod-${Date.now()}` })),
    };
    setProducts(prev => [...prev, dup]);
    setEditing(dup);
    toast({ title: 'Produto duplicado', description: `"${p.name}" foi duplicado. Edite as informações conforme necessário.` });
  };

  if (editing) {
    const isNew = !products.find(x => x.id === editing.id);
    return (
      <ProductForm
        product={editing}
        allProducts={products}
        sidebarSearch={sidebarSearch}
        onSidebarSearch={setSidebarSearch}
        onSelect={setEditing}
        onSave={p => {
          const duplicate = products.find(x => x.slug === p.slug && x.id !== p.id);
          if (duplicate) {
            toast({ title: 'Slug já existe', description: `O produto "${duplicate.name}" já utiliza o slug "/${p.slug}". Escolha um slug diferente.`, variant: 'destructive' });
            return;
          }
          setProducts(prev => prev.find(x => x.id === p.id) ? prev.map(x => x.id === p.id ? p : x) : [...prev, p]);
          // Sync to shared mockProducts so storefront reflects changes
          const idx = mockProducts.findIndex(x => x.id === p.id);
          if (idx >= 0) { mockProducts[idx] = p; } else { mockProducts.push(p); }
          setEditing(null);
          toast({ title: 'Produto salvo', description: `"${p.name}" foi atualizado com sucesso.` });
        }}
        onBack={() => setEditing(null)}
        onDuplicate={duplicateProduct}
        onDelete={!isNew ? () => setConfirmDelete(editing) : undefined}
      />
    );
  }

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{filtered.length} de {products.length} produtos</p>
        <Button onClick={() => setEditing({
          id: `prod-${Date.now()}`, name: '', slug: '', description: '', price: 0,
          images: [], categoryId: '', variants: [], stock: 0, sku: '',
          featured: false, active: true, rating: 0, reviewCount: 0,
          createdAt: new Date().toISOString(), tags: [],
        })} className="gap-2">
          <Plus className="h-4 w-4" /> Novo Produto
        </Button>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar produto..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-40 h-10"><SelectValue placeholder="Categoria" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas categorias</SelectItem>
            {mockCategories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-36 h-10"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos status</SelectItem>
            <SelectItem value="active">Ativos</SelectItem>
            <SelectItem value="inactive">Inativos</SelectItem>
            <SelectItem value="featured">Destaques</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStock} onValueChange={setFilterStock}>
          <SelectTrigger className="w-36 h-10"><SelectValue placeholder="Estoque" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todo estoque</SelectItem>
            <SelectItem value="in">Em estoque</SelectItem>
            <SelectItem value="low">Estoque baixo</SelectItem>
            <SelectItem value="out">Esgotado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card divide-y divide-border">
        {filtered.map(p => {
          const cat = mockCategories.find(c => c.id === p.categoryId);
          return (
            <button
              key={p.id}
              onClick={() => setEditing(p)}
              className="flex items-center gap-4 w-full px-4 py-3 text-left hover:bg-muted/30 transition-colors"
            >
              <div className="h-12 w-12 rounded-lg bg-muted overflow-hidden shrink-0">
                {p.images[0] ? (
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full"><PackageIcon className="h-5 w-5 text-muted-foreground/20" /></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                  {p.featured && <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 shrink-0" />}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground">{p.sku}</span>
                  {cat && <span className="text-[10px] text-muted-foreground/60">· {cat.name}</span>}
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-foreground">
                  R$ {p.price.toFixed(2).replace('.', ',')}
                </p>
                {p.compareAtPrice && p.compareAtPrice > p.price && (
                  <p className="text-[10px] text-muted-foreground line-through">
                    R$ {p.compareAtPrice.toFixed(2).replace('.', ',')}
                  </p>
                )}
              </div>
              <div className="w-16 text-right shrink-0">
                {p.stock === 0 ? (
                  <Badge variant="destructive" className="text-[10px]">Esgotado</Badge>
                ) : p.stock <= 10 ? (
                  <Badge variant="secondary" className="text-[10px] bg-amber-100 text-amber-700 border-amber-200">Baixo ({p.stock})</Badge>
                ) : (
                  <span className="text-xs text-muted-foreground">{p.stock} un</span>
                )}
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-muted-foreground">Nenhum produto encontrado.</div>
        )}
      </div>

      <ConfirmDeleteDialog
        open={!!confirmDelete}
        onOpenChange={o => { if (!o) setConfirmDelete(null); }}
        title="Excluir produto"
        description={`Tem certeza que deseja excluir "${confirmDelete?.name}"? Esta ação não pode ser desfeita.`}
        onConfirm={() => {
          if (confirmDelete) {
            setProducts(prev => prev.filter(x => x.id !== confirmDelete.id));
            setEditing(null);
            toast({ title: 'Produto excluído', description: `"${confirmDelete.name}" foi removido.` });
            setConfirmDelete(null);
          }
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Images Section with Media Gallery                                  */
/* ------------------------------------------------------------------ */

function getAllMediaImages() {
  const items: { url: string; name: string; source: string }[] = [];
  const seen = new Set<string>();
  mockCategories.forEach(c => {
    if (c.image && !seen.has(c.image)) {
      seen.add(c.image);
      items.push({ url: c.image, name: c.name, source: 'Categoria' });
    }
  });
  mockProducts.forEach(p => {
    p.images.forEach((img, i) => {
      if (!seen.has(img)) {
        seen.add(img);
        items.push({ url: img, name: `${p.name}${i > 0 ? ` (${i + 1})` : ''}`, source: 'Produto' });
      }
    });
  });
  return items;
}

function ImagesSectionContent({ form, setForm }: { form: Product; setForm: React.Dispatch<React.SetStateAction<Product>> }) {
  const [urlInput, setUrlInput] = useState('');
  const [showMedia, setShowMedia] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');
  const allMedia = getAllMediaImages();
  const filteredMedia = allMedia.filter(m =>
    m.name.toLowerCase().includes(mediaSearch.toLowerCase()) &&
    !form.images.includes(m.url)
  );

  const addImage = (url: string) => {
    if (url && !form.images.includes(url)) {
      setForm(prev => ({ ...prev, images: [...prev.images, url] }));
    }
  };

  // Get unique colors from variants
  const variantColors = Array.from(new Set(form.variants.map(v => v.attributes.cor).filter(Boolean)));

  return (
    <div className="space-y-5">
      <h3 className="text-base font-semibold text-foreground">Imagens</h3>
      <hr className="border-border" />

      <div className="flex items-start gap-2 bg-muted/50 border border-border rounded-lg px-4 py-3">
        <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
        <div className="text-xs text-muted-foreground space-y-0.5">
          <p className="font-medium text-foreground">Tamanhos recomendados</p>
          <p>Principal: <span className="font-medium">1000×1000px</span> (quadrada)</p>
          <p>Galeria: <span className="font-medium">800×800px</span> mínimo · Formato: JPG ou PNG · Máx: 2MB</p>
        </div>
      </div>

      {form.images.length > 0 ? (
        <div className="grid grid-cols-3 gap-3">
          {form.images.map((img, i) => (
            <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-border">
              <img src={img} alt={`Imagem ${i + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors flex items-center justify-center">
                <button
                  onClick={() => setForm(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))}
                  className="opacity-0 group-hover:opacity-100 p-2 bg-background rounded-full shadow-lg transition-opacity"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              </div>
              {i === 0 && (
                <span className="absolute top-1.5 left-1.5 text-[9px] font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                  Principal
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed border-border rounded-lg py-10 flex flex-col items-center justify-center gap-2">
          <ImageIcon className="h-10 w-10 text-muted-foreground/25" />
          <p className="text-sm text-muted-foreground">Nenhuma imagem adicionada</p>
          <p className="text-xs text-muted-foreground">Adicione via URL ou selecione da Mídia</p>
        </div>
      )}

      <SecureFileUpload onFileAccepted={(dataUrl) => addImage(dataUrl)} multiple />

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <Link className="h-3.5 w-3.5" /> Adicionar por URL
          </label>
          <div className="flex gap-2 mt-1.5">
            <Input placeholder="https://exemplo.com/imagem.jpg" className="flex-1" value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && urlInput.trim()) { addImage(urlInput.trim()); setUrlInput(''); } }} />
            <Button variant="outline" size="sm" disabled={!urlInput.trim()} onClick={() => { addImage(urlInput.trim()); setUrlInput(''); }}>Adicionar</Button>
          </div>
        </div>

        <div>
          <button onClick={() => setShowMedia(!showMedia)} className="text-sm font-medium text-foreground flex items-center gap-1.5 hover:text-primary transition-colors">
            <Image className="h-3.5 w-3.5" /> {showMedia ? 'Ocultar Mídia' : 'Selecionar da Mídia'}
          </button>
          {showMedia && (
            <div className="mt-3 border border-border rounded-lg p-3 space-y-3 bg-muted/20">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input placeholder="Buscar imagem..." className="pl-8 h-8 text-xs" value={mediaSearch} onChange={e => setMediaSearch(e.target.value)} />
              </div>
              {filteredMedia.length > 0 ? (
                <div className="grid grid-cols-4 gap-2 max-h-60 overflow-y-auto">
                  {filteredMedia.map((m, i) => (
                    <button key={i} onClick={() => addImage(m.url)}
                      className="group relative aspect-square rounded-md overflow-hidden border border-border hover:border-primary/50 transition-colors">
                      <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                        <Plus className="h-5 w-5 text-background opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                      </div>
                      <span className="absolute bottom-0 inset-x-0 bg-foreground/60 text-background text-[9px] px-1.5 py-0.5 truncate">{m.name}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground text-center py-4">Nenhuma imagem disponível</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Variant images */}
      {variantColors.length > 0 && (
        <>
          <hr className="border-border" />
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Palette className="h-4 w-4" /> Imagem por cor
            </h4>
            <p className="text-xs text-muted-foreground">Associe uma imagem da galeria a cada cor para exibição automática na loja.</p>
            {variantColors.map(color => {
              const currentImg = form.variantImages?.[color];
              return (
                <div key={color} className="flex items-center gap-3 px-3 py-2.5 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium text-foreground w-24">{color}</span>
                  {currentImg ? (
                    <div className="relative group h-10 w-10 rounded-md overflow-hidden border border-border shrink-0">
                      <img src={currentImg} alt={color} className="w-full h-full object-cover" />
                      <button
                        onClick={() => {
                          const updated = { ...form.variantImages };
                          delete updated[color];
                          setForm(prev => ({ ...prev, variantImages: updated }));
                        }}
                        className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <X className="h-3 w-3 text-background" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Sem imagem</span>
                  )}
                  <Select
                    value={currentImg || ''}
                    onValueChange={v => setForm(prev => ({ ...prev, variantImages: { ...prev.variantImages, [color]: v } }))}
                  >
                    <SelectTrigger className="h-8 text-xs flex-1 max-w-[200px]">
                      <SelectValue placeholder="Selecionar imagem..." />
                    </SelectTrigger>
                    <SelectContent>
                      {form.images.map((img, i) => (
                        <SelectItem key={i} value={img}>
                          <span className="text-xs">Imagem {i + 1}{i === 0 ? ' (Principal)' : ''}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stock Section with variant management                              */
/* ------------------------------------------------------------------ */

const DEFAULT_SIZES = ['PP', 'P', 'M', 'G', 'GG', 'XG', '36', '37', '38', '39', '40', '41', '42', '43', '44'];
const DEFAULT_COLORS = ['Branca', 'Preta', 'Cinza', 'Azul', 'Vermelha', 'Verde', 'Amarela', 'Rosa', 'Marrom', 'Bege'];
const COLOR_HEX: Record<string, string> = {
  Branca: '#ffffff', Preta: '#111827', Azul: '#3b82f6',
  Cinza: '#9ca3af', Verde: '#22c55e', Vermelha: '#ef4444',
  Rosa: '#ec4899', Amarela: '#eab308', Laranja: '#f97316',
  Marrom: '#92400e', Bege: '#d4a574',
};

function StockSection({ form, setForm }: { form: Product; setForm: (f: Product) => void }) {
  const [customColor, setCustomColor] = useState('');
  const [customColorHex, setCustomColorHex] = useState('#3b82f6');
  const colorPickerRef = React.useRef<HTMLInputElement>(null);
  const [customSize, setCustomSize] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>(() => {
    const sizes = new Set<string>();
    form.variants.forEach(v => { if (v.attributes.tamanho) sizes.add(v.attributes.tamanho); });
    return Array.from(sizes);
  });
  const [selectedColors, setSelectedColors] = useState<string[]>(() => {
    const colors = new Set<string>();
    form.variants.forEach(v => { if (v.attributes.cor) colors.add(v.attributes.cor); });
    return Array.from(colors);
  });
  const [userColors, setUserColors] = useState<string[]>(() => {
    const existing = new Set<string>();
    form.variants.forEach(v => { if (v.attributes.cor && !DEFAULT_COLORS.includes(v.attributes.cor)) existing.add(v.attributes.cor); });
    return Array.from(existing);
  });
  const [userSizes, setUserSizes] = useState<string[]>(() => {
    const existing = new Set<string>();
    form.variants.forEach(v => { if (v.attributes.tamanho && !DEFAULT_SIZES.includes(v.attributes.tamanho)) existing.add(v.attributes.tamanho); });
    return Array.from(existing);
  });
  const [hiddenColors, setHiddenColors] = useState<string[]>([]);
  const [hiddenSizes, setHiddenSizes] = useState<string[]>([]);

  const allColors = [...DEFAULT_COLORS.filter(c => !hiddenColors.includes(c)), ...userColors];
  const allSizes = [...DEFAULT_SIZES.filter(s => !hiddenSizes.includes(s)), ...userSizes];

  const addCustomColor = () => {
    const c = customColor.trim();
    if (c && !allColors.includes(c)) {
      setUserColors(prev => [...prev, c]);
      setSelectedColors(prev => [...prev, c]);
      setCustomColor('');
    }
  };

  const addCustomSize = () => {
    const s = customSize.trim();
    if (s && !allSizes.includes(s)) {
      setUserSizes(prev => [...prev, s]);
      setSelectedSizes(prev => [...prev, s]);
      setCustomSize('');
    }
  };

  const toggleColor = (c: string) => setSelectedColors(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  const toggleSize = (s: string) => setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const generateVariants = () => {
    const sizes = selectedSizes.length > 0 ? selectedSizes : [''];
    const colors = selectedColors.length > 0 ? selectedColors : [''];
    const existingVariants = [...form.variants];

    let added = 0;
    for (const size of sizes) {
      for (const color of colors) {
        const alreadyExists = existingVariants.some(v =>
          (v.attributes.tamanho || '') === size && (v.attributes.cor || '') === color
        );
        if (!alreadyExists) {
          const name = [size, color].filter(Boolean).join(' - ');
          const skuParts = [form.sku, size, color.substring(0, 2).toUpperCase()].filter(Boolean).join('-');
          existingVariants.push({
            id: `v-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            productId: form.id,
            name: name || 'Padrão',
            sku: skuParts,
            price: form.price,
            stock: 0,
            attributes: {
              ...(size ? { tamanho: size } : {}),
              ...(color ? { cor: color } : {}),
            },
          });
          added++;
        }
      }
    }

    if (added === 0) {
      toast({ title: 'Nenhuma variante nova', description: 'Todas as combinações selecionadas já existem.', variant: 'destructive' });
      return;
    }

    const totalStock = existingVariants.reduce((sum, v) => sum + v.stock, 0);
    setForm({ ...form, variants: existingVariants, stock: totalStock });
    toast({ title: `${added} variante(s) adicionada(s)`, description: 'As variantes existentes foram preservadas.' });
  };

  return (
    <div className="space-y-5">
      <h3 className="text-base font-semibold text-foreground">Estoque & Variantes</h3>
      <hr className="border-border" />

      <div>
        <label className="text-sm font-medium text-foreground">Quantidade em estoque (geral)</label>
        <Input className="mt-1.5 w-32" type="number" min={0} value={form.stock}
          onChange={e => setForm({ ...form, stock: parseInt(e.target.value) || 0 })} />
      </div>

      {form.stock === 0 && form.variants.length === 0 && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3">
          <p className="text-sm text-destructive font-medium">Produto esgotado — não será exibido na loja.</p>
        </div>
      )}

      <hr className="border-border" />

      {/* Colors */}
      <div>
        <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
          <Palette className="h-4 w-4" /> Cores disponíveis
        </p>
        <div className="flex flex-wrap gap-3">
          {allColors.map(c => {
            const isCustom = userColors.includes(c);
            const hex = COLOR_HEX[c];
            const isSelected = selectedColors.includes(c);
            const isWhite = hex?.toLowerCase() === '#ffffff';
            return (
              <div key={c} className="flex flex-col items-center gap-1 relative group">
                <button
                  type="button"
                  onClick={() => toggleColor(c)}
                  className="relative"
                  title={c}
                >
                  <span
                    className={cn(
                      'block w-9 h-9 rounded-full transition-all duration-150 ring-offset-2 ring-offset-background',
                      isSelected ? 'ring-2 ring-foreground scale-110' : 'ring-0 hover:ring-1 hover:ring-border',
                      isWhite && 'border border-border/50',
                    )}
                    style={{ backgroundColor: hex || '#ccc' }}
                  />
                  {isSelected && (
                    <Check className={cn(
                      'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4',
                      isWhite ? 'text-foreground' : 'text-white',
                    )} />
                  )}
                </button>
                <span className="text-[10px] text-muted-foreground">{c}</span>
                <button
                  type="button"
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive/80 text-destructive-foreground grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={e => {
                    e.stopPropagation();
                    if (isCustom) { setUserColors(prev => prev.filter(x => x !== c)); }
                    else { setHiddenColors(prev => [...prev, c]); }
                    setSelectedColors(prev => prev.filter(x => x !== c));
                  }}
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <button
            type="button"
            className="w-9 h-9 rounded-full border-2 border-dashed border-border hover:border-foreground/50 transition-colors overflow-hidden relative cursor-pointer shrink-0"
            onClick={() => colorPickerRef.current?.click()}
            style={{ backgroundColor: customColorHex }}
            title="Escolher cor"
          >
            <input
              ref={colorPickerRef}
              type="color"
              value={customColorHex}
              onChange={e => setCustomColorHex(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </button>
          <Input className="h-8 w-36 text-xs" placeholder="Nome da cor..." value={customColor}
            onChange={e => setCustomColor(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustomColor(); } }} />
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1" disabled={!customColor.trim()} onClick={addCustomColor}>
            <Plus className="h-3 w-3" /> Adicionar
          </Button>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
          <Layers className="h-4 w-4" /> Tamanhos disponíveis
        </p>
        <div className="flex flex-wrap gap-1.5">
          {allSizes.map(s => {
            const isCustom = userSizes.includes(s);
            return (
              <Badge key={s} variant={selectedSizes.includes(s) ? 'default' : 'outline'}
                className="cursor-pointer text-xs select-none gap-1 pr-1" onClick={() => toggleSize(s)}>
                {selectedSizes.includes(s) && <Check className="h-3 w-3" />}
                {s}
                <button type="button" className="ml-0.5 rounded-full hover:bg-destructive/20 p-0.5"
                  onClick={e => {
                    e.stopPropagation();
                    if (isCustom) { setUserSizes(prev => prev.filter(x => x !== s)); }
                    else { setHiddenSizes(prev => [...prev, s]); }
                    setSelectedSizes(prev => prev.filter(x => x !== s));
                  }}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Input className="h-8 w-40 text-xs" placeholder="Novo tamanho..." value={customSize}
            onChange={e => setCustomSize(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustomSize(); } }} />
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1" disabled={!customSize.trim()} onClick={addCustomSize}>
            <Plus className="h-3 w-3" /> Adicionar
          </Button>
        </div>
      </div>

      <Button onClick={generateVariants} className="gap-2" disabled={selectedColors.length === 0 && selectedSizes.length === 0}>
        <Boxes className="h-4 w-4" /> Gerar variantes ({(selectedColors.length || 1) * (selectedSizes.length || 1)})
      </Button>

      {form.variants.length > 0 && (
        <>
          <hr className="border-border" />
          <p className="text-sm font-medium text-foreground">Estoque por variante ({form.variants.length})</p>
          <div className="divide-y divide-border border border-border rounded-lg overflow-hidden max-h-72 overflow-y-auto">
            {form.variants.map(v => (
              <div key={v.id} className="flex items-center justify-between px-4 py-2.5 bg-card">
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground">{v.name}</span>
                  <span className="text-[10px] text-muted-foreground ml-2">{v.sku}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-muted-foreground">R$</span>
                    <Input type="number" min={0} step={0.01} className="w-24 h-8 text-sm text-right" value={v.price}
                      onChange={e => {
                        const newPrice = parseFloat(e.target.value) || 0;
                        const updatedVariants = form.variants.map(vr => vr.id === v.id ? { ...vr, price: newPrice } : vr);
                        setForm({ ...form, variants: updatedVariants });
                      }} />
                  </div>
                  <Input type="number" min={0} className="w-20 h-8 text-sm text-right" value={v.stock}
                    onChange={e => {
                      const newStock = parseInt(e.target.value) || 0;
                      const updatedVariants = form.variants.map(vr => vr.id === v.id ? { ...vr, stock: newStock } : vr);
                      const totalStock = updatedVariants.reduce((sum, vr) => sum + vr.stock, 0);
                      setForm({ ...form, variants: updatedVariants, stock: totalStock });
                    }} />
                  <span className="text-xs text-muted-foreground w-5">un</span>
                  <button onClick={() => {
                    const updated = form.variants.filter(vr => vr.id !== v.id);
                    setForm({ ...form, variants: updated, stock: updated.reduce((s, vr) => s + vr.stock, 0) });
                  }} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-muted/50 rounded-lg">
            <span className="text-sm font-medium text-foreground">Total</span>
            <span className="text-sm font-semibold text-foreground">
              {form.variants.reduce((sum, v) => sum + v.stock, 0)} un
            </span>
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Product Status Section with Badges                                 */
/* ------------------------------------------------------------------ */

function ProductStatusSection({ form, setForm }: { form: Product; setForm: React.Dispatch<React.SetStateAction<Product>> }) {
  const [badgeInput, setBadgeInput] = useState('');
  const { draft, updateDraftSection } = useTheme();
  const badgeConfig = draft.badges ?? { enabled: true, rules: [], position: 'top-left', maxVisible: 2 };
  const badges = form.manualBadges || [];

  const addBadge = () => {
    const b = badgeInput.trim();
    if (b && !badges.includes(b)) {
      setForm(prev => ({ ...prev, manualBadges: [...(prev.manualBadges || []), b] }));
      setBadgeInput('');
    }
  };

  const removeBadge = (b: string) => {
    setForm(prev => ({ ...prev, manualBadges: (prev.manualBadges || []).filter(x => x !== b) }));
  };

  return (
    <div className="space-y-5">
      <h3 className="text-base font-semibold text-foreground">Status</h3>
      <hr className="border-border" />
      <div className="flex items-center justify-between py-2">
        <div>
          <p className="text-sm font-medium text-foreground">Produto ativo</p>
          <p className="text-xs text-muted-foreground">Visível na loja para os clientes.</p>
        </div>
        <Switch checked={form.active} onCheckedChange={v => setForm(prev => ({ ...prev, active: v }))} />
      </div>
      <div className="flex items-center justify-between py-2">
        <div>
          <p className="text-sm font-medium text-foreground">Produto destaque</p>
          <p className="text-xs text-muted-foreground">Aparece na seção de destaques da home.</p>
        </div>
        <Switch checked={form.featured} onCheckedChange={v => setForm(prev => ({ ...prev, featured: v }))} />
      </div>

      {/* Badges */}
      <hr className="border-border" />
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Award className="h-4 w-4" /> Etiquetas (Badges)
        </h4>
        <p className="text-xs text-muted-foreground">
          Adicione etiquetas que aparecem sobre a foto do produto na loja, como "Novo", "Promoção" ou "Frete Grátis".
        </p>
        <div className="flex flex-wrap gap-1.5">
          {badges.map(b => (
            <Badge key={b} variant="default" className="gap-1 text-xs cursor-pointer" onClick={() => removeBadge(b)}>
              {b} ×
            </Badge>
          ))}
          {badges.length === 0 && <span className="text-xs text-muted-foreground/60">Nenhuma etiqueta</span>}
        </div>
        <div className="flex items-center gap-2">
          <Input className="h-8 flex-1 text-xs" placeholder="Ex: Novo, Lançamento, Frete Grátis..." value={badgeInput}
            onChange={e => setBadgeInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addBadge(); } }} />
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1" disabled={!badgeInput.trim()} onClick={addBadge}>
            <Plus className="h-3 w-3" /> Adicionar
          </Button>
        </div>

        {/* Quick add from existing badge rules */}
        {badgeConfig.rules.length > 0 && (
          <div>
            <p className="text-[10px] text-muted-foreground mb-1.5">Sugestões (do tema):</p>
            <div className="flex flex-wrap gap-1">
              {badgeConfig.rules.filter(r => r.enabled && !badges.includes(r.label)).map(r => (
                <button key={r.id} onClick={() => setForm(prev => ({ ...prev, manualBadges: [...(prev.manualBadges || []), r.label] }))}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-border hover:border-primary/50 transition-colors"
                  style={{ backgroundColor: r.color + '20', color: r.color }}>
                  + {r.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <hr className="border-border" />
      <div className="bg-muted/50 rounded-lg px-4 py-3 space-y-1.5">
        <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Avaliação:</span> {form.rating}/5 ({form.reviewCount} avaliações)</p>
        <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Slug:</span> /{form.slug}</p>
        <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Criado em:</span> {new Date(form.createdAt).toLocaleDateString('pt-BR')}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  (HomeSectionsManager removed — now lives in Theme Editor)          */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Product Form                                                       */
/* ------------------------------------------------------------------ */

function ProductForm({ product, allProducts, sidebarSearch, onSidebarSearch, onSelect, onSave, onBack, onDuplicate, onDelete }: {
  product: Product; allProducts: Product[]; sidebarSearch: string;
  onSidebarSearch: (s: string) => void; onSelect: (p: Product) => void;
  onSave: (p: Product) => void; onBack: () => void;
  onDuplicate: (p: Product) => void; onDelete?: () => void;
}) {
  const [form, setForm] = useState(product);
  const [section, setSection] = useState<ProductSection>('info');
  const [tagInput, setTagInput] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  React.useEffect(() => { setForm(product); }, [product]);

  const sidebarFiltered = allProducts.filter(p => p.name.toLowerCase().includes(sidebarSearch.toLowerCase()));

  const sectionItems: { key: ProductSection; label: string; icon: React.ElementType }[] = [
    { key: 'info', label: 'Informações', icon: FileText },
    { key: 'price', label: 'Preço', icon: DollarSign },
    { key: 'stock', label: 'Estoque', icon: Boxes },
    { key: 'images', label: 'Imagens', icon: ImageIcon },
    { key: 'seo', label: 'SEO', icon: Globe },
    { key: 'status', label: 'Status', icon: Eye },
  ];

  return (
    <div className="pt-2">
      <div className="flex items-center justify-between mb-5">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors">
          <ChevronLeft className="h-4 w-4" />
          {form.name || 'Novo Produto'}
        </button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => onDuplicate(form)}>
            <Copy className="h-3.5 w-3.5" /> Duplicar
          </Button>
          {onDelete && (
            <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive" onClick={() => setConfirmDelete(true)}>
              <Trash2 className="h-3.5 w-3.5" /> Excluir
            </Button>
          )}
          <SaveButton onClick={() => onSave(form)} />
        </div>
      </div>

      <div className="flex gap-5">
        {/* Sidebar */}
        <div className="w-52 shrink-0 border-r border-border pr-3 space-y-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Buscar..." className="pl-8 h-9 text-xs" value={sidebarSearch} onChange={e => onSidebarSearch(e.target.value)} />
          </div>
          <div className="space-y-0.5 max-h-[65vh] overflow-y-auto">
            {sidebarFiltered.map(p => (
              <button key={p.id} onClick={() => onSelect(p)}
                className={cn('flex items-center gap-2 w-full px-2 py-2 rounded-md text-left transition-colors', p.id === form.id ? 'bg-muted' : 'hover:bg-muted/40')}>
                <div className="h-8 w-8 rounded-md bg-muted overflow-hidden shrink-0">
                  {p.images[0] ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                    : <div className="flex items-center justify-center h-full"><PackageIcon className="h-3.5 w-3.5 text-muted-foreground/30" /></div>}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-[10px] text-muted-foreground">R$ {p.price.toFixed(2).replace('.', ',')}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <SectionNav items={sectionItems} active={section} onChange={s => setSection(s as ProductSection)} />

        <div className="flex-1 min-w-0 pl-4">
          {section === 'info' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-foreground">Informações</h3>
              <hr className="border-border" />
              <div>
                <label className="text-sm font-medium text-foreground">Nome do produto</label>
                <Input className="mt-1.5" placeholder="Ex: Camiseta Premium" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">SKU</label>
                  <Input className="mt-1.5" placeholder="CAM-001" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Categoria</label>
                  <Select value={form.categoryId} onValueChange={v => setForm({ ...form, categoryId: v })}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent>{mockCategories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Descrição</label>
                <Textarea className="mt-1.5" placeholder="Descreva o produto..." rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Tags</label>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {form.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="gap-1 text-xs cursor-pointer" onClick={() => setForm({ ...form, tags: form.tags.filter((_, idx) => idx !== i) })}>
                      {tag} ×
                    </Badge>
                  ))}
                  <Input className="h-7 w-28 text-xs" placeholder="Nova tag..." value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && tagInput.trim()) { setForm({ ...form, tags: [...form.tags, tagInput.trim()] }); setTagInput(''); } }} />
                </div>
              </div>

              {/* Size Guide */}
              <hr className="border-border" />
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Ruler className="h-4 w-4" /> Tabela de Medidas
              </h4>
              <p className="text-xs text-muted-foreground -mt-3">Vincule uma tabela de medidas a este produto.</p>
              <Select value={form.sizeGuideId || 'none'} onValueChange={v => setForm({ ...form, sizeGuideId: v === 'none' ? undefined : v })}>
                <SelectTrigger className="max-w-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem tabela</SelectItem>
                  <SelectItem value="default">Usar padrão ({mockSizeGuides.find(g => g.isDefault)?.name || '—'})</SelectItem>
                  {mockSizeGuides.map(g => (
                    <SelectItem key={g.id} value={g.id}>{g.name}{g.isDefault ? ' ⭐' : ''}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Weight & Dimensions */}
              <hr className="border-border" />
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Weight className="h-4 w-4" /> Peso & Dimensões
              </h4>
              <p className="text-xs text-muted-foreground -mt-3">Usado para cálculo de frete.</p>
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-medium text-foreground">Peso (g)</label>
                  <Input className="mt-1 h-9 text-sm" type="number" min={0} placeholder="0" value={form.weight || ''}
                    onChange={e => setForm({ ...form, weight: parseFloat(e.target.value) || 0 })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">Larg. (cm)</label>
                  <Input className="mt-1 h-9 text-sm" type="number" min={0} placeholder="0" value={form.width || ''}
                    onChange={e => setForm({ ...form, width: parseFloat(e.target.value) || 0 })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">Alt. (cm)</label>
                  <Input className="mt-1 h-9 text-sm" type="number" min={0} placeholder="0" value={form.height || ''}
                    onChange={e => setForm({ ...form, height: parseFloat(e.target.value) || 0 })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">Prof. (cm)</label>
                  <Input className="mt-1 h-9 text-sm" type="number" min={0} placeholder="0" value={form.depth || ''}
                    onChange={e => setForm({ ...form, depth: parseFloat(e.target.value) || 0 })} />
                </div>
              </div>
            </div>
          )}

          {section === 'price' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-foreground">Preço</h3>
              <hr className="border-border" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Preço de venda (R$)</label>
                  <Input className="mt-1.5" type="number" min={0} step={0.01} value={form.price} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Preço comparativo</label>
                  <Input className="mt-1.5" type="number" min={0} step={0.01} value={form.compareAtPrice || 0} onChange={e => setForm({ ...form, compareAtPrice: parseFloat(e.target.value) || 0 })} />
                  <p className="text-[10px] text-muted-foreground mt-1">Exibido como preço "de" riscado.</p>
                </div>
              </div>
              {form.compareAtPrice && form.compareAtPrice > form.price && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
                  <p className="text-sm text-emerald-700 font-medium">
                    Desconto de {Math.round((1 - form.price / form.compareAtPrice) * 100)}% aplicado
                  </p>
                </div>
              )}
              {form.variants.length > 0 && (
                <>
                  <hr className="border-border" />
                  <p className="text-sm font-medium text-foreground">Variantes ({form.variants.length})</p>
                  <div className="space-y-2">
                    {form.variants.map(v => (
                      <div key={v.id} className="flex items-center gap-3 px-3 py-2 bg-muted/30 rounded-lg">
                        <span className="text-xs font-medium text-foreground flex-1">{v.name}</span>
                        <span className="text-xs text-muted-foreground">{v.sku}</span>
                        <span className="text-xs font-medium text-foreground">R$ {v.price.toFixed(2).replace('.', ',')}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {section === 'stock' && <StockSection form={form} setForm={setForm} />}

          {section === 'images' && <ImagesSectionContent form={form} setForm={setForm} />}

          {section === 'seo' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Globe className="h-4 w-4" /> SEO
              </h3>
              <hr className="border-border" />
              <p className="text-xs text-muted-foreground">Otimize como o produto aparece nos mecanismos de busca.</p>
              <div>
                <label className="text-sm font-medium text-foreground">Meta título</label>
                <Input className="mt-1.5" placeholder={form.name || 'Título da página'} value={form.metaTitle || ''}
                  onChange={e => setForm({ ...form, metaTitle: e.target.value })} maxLength={60} />
                <p className="text-[10px] text-muted-foreground mt-1">{(form.metaTitle || '').length}/60 caracteres</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Meta descrição</label>
                <Textarea className="mt-1.5" placeholder={form.description || 'Descrição para buscadores...'} rows={3}
                  value={form.metaDescription || ''} onChange={e => setForm({ ...form, metaDescription: e.target.value })} maxLength={160} />
                <p className="text-[10px] text-muted-foreground mt-1">{(form.metaDescription || '').length}/160 caracteres</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 space-y-1">
                <p className="text-sm font-medium text-primary truncate">{form.metaTitle || form.name || 'Título do produto'}</p>
                <p className="text-[10px] text-emerald-600 truncate">modastore.com/produto/{form.slug || '...'}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{form.metaDescription || form.description || 'Descrição do produto aparecerá aqui...'}</p>
              </div>
            </div>
          )}

          {section === 'status' && (
            <ProductStatusSection form={form} setForm={setForm} />
          )}
        </div>
      </div>

      {onDelete && (
        <ConfirmDeleteDialog
          open={confirmDelete}
          onOpenChange={setConfirmDelete}
          title="Excluir produto"
          description={`Tem certeza que deseja excluir "${form.name}"? Esta ação não pode ser desfeita.`}
          onConfirm={onDelete}
        />
      )}
    </div>
  );
}

/* ================================================================== */
/*  COLLECTIONS TAB                                                    */
/* ================================================================== */

function CollectionsTab() {
  const [collections, setCollections] = useState<ProductCollection[]>(mockCollections);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<ProductCollection | null>(null);
  const navigate = useNavigate();
  const { draft, updateDraft } = useTheme();

  const autoAddCollectionToHome = (col: ProductCollection) => {
    const exists = draft.homepageSections.some(s =>
      s.id === col.id || s.id === `col-section-${col.id}` ||
      (s.type === 'collections' && (s.settings?.collectionId as string) === col.id)
    );
    if (!exists) {
      const newSection: ThemeHomepageSection = {
        id: col.id, type: 'collections', enabled: true,
        title: col.name, showTitle: true, settings: { collectionId: col.id },
      };
      updateDraft({ homepageSections: [...draft.homepageSections, newSection] });
    }
  };

  if (editing) {
    const isNew = !collections.find(x => x.id === editing.id);
    return (
      <CollectionForm
        collection={editing}
        onSave={c => {
          const duplicate = collections.find(x => x.slug === c.slug && x.id !== c.id);
          if (duplicate) {
            toast({ title: 'Slug já existe', description: `A coleção "${duplicate.name}" já utiliza o slug "/${c.slug}". Escolha um slug diferente.`, variant: 'destructive' });
            return;
          }
          const isNewCol = !collections.find(x => x.id === c.id);
          setCollections(prev => prev.find(x => x.id === c.id) ? prev.map(x => x.id === c.id ? c : x) : [...prev, c]);
          if (isNewCol) autoAddCollectionToHome(c);
          setEditing(null);
        }}
        onBack={() => setEditing(null)}
        onDelete={!isNew ? () => {
          setCollections(prev => prev.filter(x => x.id !== editing.id));
          setEditing(null);
          toast({ title: 'Coleção excluída', description: `"${editing.name}" foi removida.` });
        } : undefined}
      />
    );
  }

  const filtered = collections.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5 pt-2">
      {/* Link to Home Sections in Theme Editor */}
      <div className="border border-border rounded-lg bg-card px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <Grid3X3 className="h-4 w-4 text-muted-foreground shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">Seções da Página Inicial</p>
            <p className="text-[11px] text-muted-foreground">Organize a ordem das seções, oculte títulos, ative ou desative blocos. Categorias e coleções novas aparecem lá automaticamente.</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="shrink-0 gap-1.5 text-xs" onClick={() => navigate('/admin/customization?section=home-sections')}>
          <Palette className="h-3.5 w-3.5" /> Organizar seções
        </Button>
      </div>


      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar coleção..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Button onClick={() => setEditing({
          id: `col-${Date.now()}`, name: '', slug: '', description: '',
          productIds: [], order: collections.length + 1, active: true, createdAt: new Date().toISOString(),
        })} className="gap-2">
          <Plus className="h-4 w-4" /> Nova Coleção
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="py-12 text-center">
          <Layers className="h-10 w-10 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Nenhuma coleção encontrada.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map(c => {
            const colProducts = mockProducts.filter(p => c.productIds.includes(p.id));
            return (
              <div key={c.id} onClick={() => setEditing(c)} className="border border-border rounded-lg p-4 bg-card hover:border-primary/30 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">{c.name}</h3>
                  <Badge variant={c.active ? 'default' : 'secondary'} className="text-[10px]">
                    {c.active ? 'Ativa' : 'Inativa'}
                  </Badge>
                </div>
                {c.description && <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{c.description}</p>}
                <div className="flex gap-1.5 overflow-hidden">
                  {colProducts.slice(0, 4).map(p => (
                    <div key={p.id} className="h-10 w-10 rounded-md bg-muted overflow-hidden shrink-0">
                      {p.images[0] ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                        : <div className="flex items-center justify-center h-full"><PackageIcon className="h-3.5 w-3.5 text-muted-foreground/20" /></div>}
                    </div>
                  ))}
                  {colProducts.length > 4 && (
                    <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-medium text-muted-foreground">+{colProducts.length - 4}</span>
                    </div>
                  )}
                  {colProducts.length === 0 && <p className="text-xs text-muted-foreground/60">Nenhum produto</p>}
                </div>
                <p className="text-[10px] text-muted-foreground/60 mt-2">Ordem: {c.order} · {c.productIds.length} produtos</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Collection Form                                                    */
/* ------------------------------------------------------------------ */

function CollectionForm({ collection, onSave, onBack, onDelete }: {
  collection: ProductCollection;
  onSave: (c: ProductCollection) => void;
  onBack: () => void;
  onDelete?: () => void;
}) {
  const [form, setForm] = useState(collection);
  const [section, setSection] = useState<CollectionSection>('info');
  const [prodSearch, setProdSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showMedia, setShowMedia] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');
  const availableProducts = mockProducts.filter(p => p.name.toLowerCase().includes(prodSearch.toLowerCase()));
  const allMedia = getAllMediaImages();
  const filteredMedia = allMedia.filter(m =>
    m.name.toLowerCase().includes(mediaSearch.toLowerCase()) && m.url !== form.image
  );

  React.useEffect(() => { setForm(collection); }, [collection]);

  const sectionItems: { key: CollectionSection; label: string; icon: React.ElementType }[] = [
    { key: 'info', label: 'Informações', icon: FileText },
    { key: 'products', label: 'Produtos', icon: PackageIcon },
    { key: 'status', label: 'Status', icon: Eye },
  ];

  return (
    <div className="pt-2">
      <div className="flex items-center justify-between mb-5">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors">
          <ChevronLeft className="h-4 w-4" />
          {form.name || 'Nova Coleção'}
        </button>
        <div className="flex items-center gap-2">
          {onDelete && (
            <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive" onClick={() => setConfirmDelete(true)}>
              <Trash2 className="h-3.5 w-3.5" /> Excluir
            </Button>
          )}
          <SaveButton onClick={() => onSave(form)} />
        </div>
      </div>

      <div className="flex gap-5">
        <SectionNav items={sectionItems} active={section} onChange={s => setSection(s as CollectionSection)} />

        <div className="flex-1 min-w-0 pl-4">
          {section === 'info' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-foreground">Informações</h3>
              <hr className="border-border" />

              {/* Collection image */}
              <div>
                <label className="text-sm font-medium text-foreground">Imagem de destaque</label>
                {form.image ? (
                  <div className="relative group w-full h-32 rounded-lg overflow-hidden bg-muted border border-border mt-1.5">
                    <img src={form.image} alt={form.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors flex items-center justify-center">
                      <button onClick={() => setForm({ ...form, image: undefined })} className="opacity-0 group-hover:opacity-100 p-2 bg-background rounded-full shadow-lg transition-opacity">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-lg py-6 flex flex-col items-center justify-center gap-1 mt-1.5">
                    <ImageIcon className="h-6 w-6 text-muted-foreground/25" />
                    <p className="text-[10px] text-muted-foreground">Nenhuma imagem</p>
                  </div>
                )}
                <SecureFileUpload onFileAccepted={(dataUrl) => setForm({ ...form, image: dataUrl })} compact className="mt-2" />
                <div className="flex gap-2 mt-2">
                  <Input placeholder="URL da imagem..." className="flex-1 h-8 text-xs" value={urlInput}
                    onChange={e => setUrlInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && urlInput.trim()) { setForm({ ...form, image: urlInput.trim() }); setUrlInput(''); } }} />
                  <Button variant="outline" size="sm" className="h-8 text-xs" disabled={!urlInput.trim()} onClick={() => { setForm({ ...form, image: urlInput.trim() }); setUrlInput(''); }}>Usar</Button>
                </div>
                <div className="mt-2">
                  <button onClick={() => setShowMedia(!showMedia)} className="text-xs font-medium text-foreground flex items-center gap-1.5 hover:text-primary transition-colors">
                    <Image className="h-3 w-3" /> {showMedia ? 'Ocultar Mídia' : 'Selecionar da Mídia'}
                  </button>
                  {showMedia && (
                    <div className="mt-2 border border-border rounded-lg p-3 space-y-2 bg-muted/20">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                        <Input placeholder="Buscar..." className="pl-8 h-8 text-xs" value={mediaSearch} onChange={e => setMediaSearch(e.target.value)} />
                      </div>
                      {filteredMedia.length > 0 ? (
                        <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                          {filteredMedia.map((m, i) => (
                            <button key={i} onClick={() => { setForm({ ...form, image: m.url }); setShowMedia(false); }}
                              className="group relative aspect-square rounded-md overflow-hidden border border-border hover:border-primary/50 transition-colors">
                              <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                              <span className="absolute bottom-0 inset-x-0 bg-foreground/60 text-background text-[9px] px-1 py-0.5 truncate">{m.name}</span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground text-center py-3">Nenhuma imagem disponível</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Nome da coleção</label>
                <Input className="mt-1.5" placeholder="Ex: Novidades" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Descrição</label>
                <Textarea className="mt-1.5" placeholder="Descreva a coleção..." rows={3} value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Ordem de exibição</label>
                <Input className="mt-1.5 w-24" type="number" min={1} value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 1 })} />
                <p className="text-[10px] text-muted-foreground mt-1">Menor número aparece primeiro.</p>
              </div>
            </div>
          )}

          {section === 'products' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-foreground">Produtos ({form.productIds.length} selecionados)</h3>
              <hr className="border-border" />
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar produto..." className="pl-9" value={prodSearch} onChange={e => setProdSearch(e.target.value)} />
              </div>
              <div className="border border-border rounded-lg divide-y divide-border max-h-[50vh] overflow-y-auto">
                {availableProducts.map(p => {
                  const selected = form.productIds.includes(p.id);
                  return (
                    <button key={p.id}
                      onClick={() => setForm(prev => ({
                        ...prev,
                        productIds: selected ? prev.productIds.filter(id => id !== p.id) : [...prev.productIds, p.id],
                      }))}
                      className={cn('flex items-center gap-3 px-4 py-3 w-full text-left transition-colors', selected ? 'bg-primary/5' : 'hover:bg-muted/30')}>
                      <div className="h-9 w-9 rounded-md bg-muted overflow-hidden shrink-0">
                        {p.images[0] ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                          : <div className="flex items-center justify-center h-full"><PackageIcon className="h-4 w-4 text-muted-foreground/30" /></div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{p.name}</p>
                        <p className="text-[10px] text-muted-foreground">R$ {p.price.toFixed(2).replace('.', ',')}</p>
                      </div>
                      {selected && (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                          <span className="text-[10px] text-primary-foreground font-bold">✓</span>
                        </div>
                      )}
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
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">Coleção ativa</p>
                  <p className="text-xs text-muted-foreground">Visível na página inicial.</p>
                </div>
                <Switch checked={form.active} onCheckedChange={v => setForm({ ...form, active: v })} />
              </div>

              {/* Period */}
              <hr className="border-border" />
              <h4 className="text-sm font-semibold text-foreground">Período ativo</h4>
              <p className="text-xs text-muted-foreground -mt-3">Opcional. Defina datas para coleções sazonais.</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground">Início</label>
                  <Input className="mt-1 h-9 text-sm" type="date" value={form.startsAt || ''} onChange={e => setForm({ ...form, startsAt: e.target.value || undefined })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">Fim</label>
                  <Input className="mt-1 h-9 text-sm" type="date" value={form.endsAt || ''} onChange={e => setForm({ ...form, endsAt: e.target.value || undefined })} />
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg px-4 py-3">
                <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Slug:</span> /{form.slug}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {onDelete && (
        <ConfirmDeleteDialog
          open={confirmDelete}
          onOpenChange={setConfirmDelete}
          title="Excluir coleção"
          description={`Tem certeza que deseja excluir "${form.name}"? Esta ação não pode ser desfeita.`}
          onConfirm={onDelete}
        />
      )}
    </div>
  );
}

/* ================================================================== */
/*  MAIN PAGE                                                          */
/* ================================================================== */

export default function AdminProducts() {
  const [tab, setTab] = useState<Tab>('categories');
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border px-6 pt-2 flex items-center justify-between">
        <div className="flex gap-0">
          {([
            { key: 'categories' as Tab, label: 'Categorias', count: mockCategories.length },
            { key: 'products' as Tab, label: 'Produtos', count: mockProducts.length },
            { key: 'collections' as Tab, label: 'Coleções', count: mockCollections.length },
            { key: 'sizeguides' as Tab, label: 'Tabela de Medidas', count: mockSizeGuides.length },
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
              {t.label}
              <span className={cn(
                'text-[10px] px-1.5 py-0.5 rounded-full',
                tab === t.key ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
              )}>
                {t.count}
              </span>
            </button>
          ))}
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 -mt-1" onClick={() => navigate('/admin/customization')}>
          <Palette className="h-3.5 w-3.5" />
          Aparência
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {tab === 'categories' && <CategoriesTab />}
        {tab === 'products' && <ProductsTab />}
        {tab === 'collections' && <CollectionsTab />}
        {tab === 'sizeguides' && <SizeGuidesTab />}
      </div>
    </div>
  );
}
