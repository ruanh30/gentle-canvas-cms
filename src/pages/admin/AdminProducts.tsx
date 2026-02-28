import React, { useState } from 'react';
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
  Plus, Search, ChevronLeft,
  FileText, DollarSign, Boxes, ImageIcon, Eye,
  Pencil, Trash2, Package as PackageIcon, Save, Palette,
  Star, Tag, Layers, Link, Image, Check, Info, X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { mockProducts, mockCategories, mockCollections } from '@/data/mock';
import type { Product, Category, ProductCollection } from '@/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Tab = 'categories' | 'products' | 'collections';
type ProductSection = 'info' | 'price' | 'stock' | 'images' | 'status';
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

/* ================================================================== */
/*  CATEGORY FORM                                                      */
/* ================================================================== */

function CategoryForm({ category, onSave, onBack, productCount }: {
  category: Category; onSave: (c: Category) => void; onBack: () => void; productCount: number;
}) {
  const [form, setForm] = useState(category);
  const [urlInput, setUrlInput] = useState('');
  const [showMedia, setShowMedia] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');

  const allMedia = getAllMediaImages();
  const filteredMedia = allMedia.filter(m =>
    m.name.toLowerCase().includes(mediaSearch.toLowerCase()) &&
    m.url !== form.image
  );

  return (
    <div className="space-y-6 pt-2">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors">
          <ChevronLeft className="h-4 w-4" /> {form.name || 'Nova Categoria'}
        </button>
        <SaveButton onClick={() => onSave(form)} />
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

          {/* Upload */}
          <SecureFileUpload
            onFileAccepted={(dataUrl) => setForm({ ...form, image: dataUrl })}
            compact
            className="mt-3"
          />

          {/* URL input */}
          <div className="mt-3">
            <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
              <Link className="h-3 w-3" /> URL da imagem
            </label>
            <div className="flex gap-2 mt-1">
              <Input
                placeholder="https://exemplo.com/imagem.jpg"
                className="flex-1 h-9 text-sm"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && urlInput.trim()) {
                    setForm({ ...form, image: urlInput.trim() });
                    setUrlInput('');
                  }
                }}
              />
              <Button variant="outline" size="sm" disabled={!urlInput.trim()} onClick={() => { setForm({ ...form, image: urlInput.trim() }); setUrlInput(''); }}>
                Usar
              </Button>
            </div>
          </div>

          {/* Media picker */}
          <div className="mt-3">
            <button
              onClick={() => setShowMedia(!showMedia)}
              className="text-xs font-medium text-foreground flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Image className="h-3 w-3" />
              {showMedia ? 'Ocultar Mídia' : 'Selecionar da Mídia'}
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
                      <button
                        key={i}
                        onClick={() => { setForm({ ...form, image: m.url }); setShowMedia(false); }}
                        className="group relative aspect-square rounded-md overflow-hidden border border-border hover:border-primary/50 transition-colors"
                      >
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

        {/* Name */}
        <div>
          <label className="text-sm font-medium text-foreground">Nome da categoria</label>
          <Input className="mt-1.5" placeholder="Ex: Camisetas" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} />
        </div>

        {/* Slug */}
        <div>
          <label className="text-sm font-medium text-foreground">Slug</label>
          <Input className="mt-1.5" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
          <p className="text-[10px] text-muted-foreground mt-1">URL: /categorias/{form.slug || '...'}</p>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-foreground">Descrição</label>
          <Textarea className="mt-1.5" placeholder="Descrição da categoria..." rows={3} value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} />
        </div>

        {/* Info */}
        {productCount > 0 && (
          <div className="bg-muted/50 rounded-lg px-4 py-3">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{productCount}</span> produto(s) nesta categoria
            </p>
          </div>
        )}
      </div>
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
  const filtered = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const productCount = (catId: string) => mockProducts.filter(p => p.categoryId === catId).length;

  if (editing) {
    return (
      <CategoryForm
        category={editing}
        onSave={cat => {
          setCategories(prev => prev.find(x => x.id === cat.id) ? prev.map(x => x.id === cat.id ? cat : x) : [...prev, cat]);
          setEditing(null);
        }}
        onBack={() => setEditing(null)}
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
        <Button onClick={() => setEditing({ id: `cat-${Date.now()}`, name: '', slug: '' })} className="gap-2">
          <Plus className="h-4 w-4" /> Nova Categoria
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(c => (
          <div key={c.id} className="border border-border rounded-lg overflow-hidden bg-card hover:border-primary/30 transition-colors group cursor-pointer" onClick={() => setEditing(c)}>
            <div className="h-28 bg-muted overflow-hidden">
              {c.image ? (
                <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <div className="flex items-center justify-center h-full"><PackageIcon className="h-8 w-8 text-muted-foreground/20" /></div>
              )}
            </div>
            <div className="p-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">{c.name}</h3>
                <Badge variant="secondary" className="text-[10px]">{productCount(c.id)} produtos</Badge>
              </div>
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
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  if (editing) {
    return (
      <ProductForm
        product={editing}
        allProducts={products}
        sidebarSearch={sidebarSearch}
        onSidebarSearch={setSidebarSearch}
        onSelect={setEditing}
        onSave={p => {
          setProducts(prev => prev.find(x => x.id === p.id) ? prev.map(x => x.id === p.id ? p : x) : [...prev, p]);
          setEditing(null);
        }}
        onBack={() => setEditing(null)}
      />
    );
  }

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{products.length} produtos</p>
        <Button onClick={() => setEditing({
          id: `prod-${Date.now()}`, name: '', slug: '', description: '', price: 0,
          images: [], categoryId: '', variants: [], stock: 0, sku: '',
          featured: false, active: true, rating: 0, reviewCount: 0,
          createdAt: new Date().toISOString(), tags: [],
        })} className="gap-2">
          <Plus className="h-4 w-4" /> Novo Produto
        </Button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar produto..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
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

  return (
    <div className="space-y-5">
      <h3 className="text-base font-semibold text-foreground">Imagens</h3>
      <hr className="border-border" />

      {/* Recommended sizes */}
      <div className="flex items-start gap-2 bg-muted/50 border border-border rounded-lg px-4 py-3">
        <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
        <div className="text-xs text-muted-foreground space-y-0.5">
          <p className="font-medium text-foreground">Tamanhos recomendados</p>
          <p>Principal: <span className="font-medium">1000×1000px</span> (quadrada)</p>
          <p>Galeria: <span className="font-medium">800×800px</span> mínimo · Formato: JPG ou PNG · Máx: 2MB</p>
        </div>
      </div>

      {/* Current images */}
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

      {/* Upload */}
      <SecureFileUpload
        onFileAccepted={(dataUrl) => addImage(dataUrl)}
        multiple
      />

      {/* Add methods */}
      <div className="space-y-3">
        {/* URL input */}
        <div>
          <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <Link className="h-3.5 w-3.5" /> Adicionar por URL
          </label>
          <div className="flex gap-2 mt-1.5">
            <Input
              placeholder="https://exemplo.com/imagem.jpg"
              className="flex-1"
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && urlInput.trim()) {
                  addImage(urlInput.trim());
                  setUrlInput('');
                }
              }}
            />
            <Button
              variant="outline"
              size="sm"
              disabled={!urlInput.trim()}
              onClick={() => { addImage(urlInput.trim()); setUrlInput(''); }}
            >
              Adicionar
            </Button>
          </div>
        </div>

        {/* Media gallery toggle */}
        <div>
          <button
            onClick={() => setShowMedia(!showMedia)}
            className="text-sm font-medium text-foreground flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Image className="h-3.5 w-3.5" />
            {showMedia ? 'Ocultar Mídia' : 'Selecionar da Mídia'}
          </button>

          {showMedia && (
            <div className="mt-3 border border-border rounded-lg p-3 space-y-3 bg-muted/20">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Buscar imagem..."
                  className="pl-8 h-8 text-xs"
                  value={mediaSearch}
                  onChange={e => setMediaSearch(e.target.value)}
                />
              </div>
              {filteredMedia.length > 0 ? (
                <div className="grid grid-cols-4 gap-2 max-h-60 overflow-y-auto">
                  {filteredMedia.map((m, i) => (
                    <button
                      key={i}
                      onClick={() => addImage(m.url)}
                      className="group relative aspect-square rounded-md overflow-hidden border border-border hover:border-primary/50 transition-colors"
                    >
                      <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                        <Plus className="h-5 w-5 text-background opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                      </div>
                      <span className="absolute bottom-0 inset-x-0 bg-foreground/60 text-background text-[9px] px-1.5 py-0.5 truncate">
                        {m.name}
                      </span>
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
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stock Section with variant management                              */
/* ------------------------------------------------------------------ */

const DEFAULT_SIZES = ['PP', 'P', 'M', 'G', 'GG', 'XG', '36', '37', '38', '39', '40', '41', '42', '43', '44'];
const DEFAULT_COLORS = ['Branca', 'Preta', 'Cinza', 'Azul', 'Vermelha', 'Verde', 'Amarela', 'Rosa', 'Marrom', 'Bege'];

function StockSection({ form, setForm }: { form: Product; setForm: (f: Product) => void }) {
  const [customColor, setCustomColor] = useState('');
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

  const allColors = [...DEFAULT_COLORS, ...userColors];
  const allSizes = [...DEFAULT_SIZES, ...userSizes];

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
    const newVariants: Product['variants'] = [];
    const sizes = selectedSizes.length > 0 ? selectedSizes : [''];
    const colors = selectedColors.length > 0 ? selectedColors : [''];

    for (const size of sizes) {
      for (const color of colors) {
        const name = [size, color].filter(Boolean).join(' - ');
        const existing = form.variants.find(v =>
          (v.attributes.tamanho || '') === size && (v.attributes.cor || '') === color
        );
        if (existing) {
          newVariants.push(existing);
        } else {
          const skuParts = [form.sku, size, color.substring(0, 2).toUpperCase()].filter(Boolean).join('-');
          newVariants.push({
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
        }
      }
    }
    const totalStock = newVariants.reduce((sum, v) => sum + v.stock, 0);
    setForm({ ...form, variants: newVariants, stock: totalStock });
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
        <div className="flex flex-wrap gap-1.5">
          {allColors.map(c => {
            const isCustom = userColors.includes(c);
            return (
              <Badge
                key={c}
                variant={selectedColors.includes(c) ? 'default' : 'outline'}
                className="cursor-pointer text-xs select-none gap-1 pr-1.5"
                onClick={() => toggleColor(c)}
              >
                {selectedColors.includes(c) && <Check className="h-3 w-3" />}
                {c}
                {isCustom && (
                  <button
                    type="button"
                    className="ml-0.5 rounded-full hover:bg-destructive/20 p-0.5"
                    onClick={e => {
                      e.stopPropagation();
                      setUserColors(prev => prev.filter(x => x !== c));
                      setSelectedColors(prev => prev.filter(x => x !== c));
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </Badge>
            );
          })}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Input
            className="h-8 w-40 text-xs"
            placeholder="Nova cor personalizada..."
            value={customColor}
            onChange={e => setCustomColor(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustomColor(); } }}
          />
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
              <Badge
                key={s}
                variant={selectedSizes.includes(s) ? 'default' : 'outline'}
                className="cursor-pointer text-xs select-none gap-1 pr-1.5"
                onClick={() => toggleSize(s)}
              >
                {selectedSizes.includes(s) && <Check className="h-3 w-3" />}
                {s}
                {isCustom && (
                  <button
                    type="button"
                    className="ml-0.5 rounded-full hover:bg-destructive/20 p-0.5"
                    onClick={e => {
                      e.stopPropagation();
                      setUserSizes(prev => prev.filter(x => x !== s));
                      setSelectedSizes(prev => prev.filter(x => x !== s));
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </Badge>
            );
          })}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Input
            className="h-8 w-40 text-xs"
            placeholder="Novo tamanho..."
            value={customSize}
            onChange={e => setCustomSize(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustomSize(); } }}
          />
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1" disabled={!customSize.trim()} onClick={addCustomSize}>
            <Plus className="h-3 w-3" /> Adicionar
          </Button>
        </div>
      </div>

      {/* Generate */}
      <Button onClick={generateVariants} className="gap-2" disabled={selectedColors.length === 0 && selectedSizes.length === 0}>
        <Boxes className="h-4 w-4" /> Gerar variantes ({(selectedColors.length || 1) * (selectedSizes.length || 1)})
      </Button>

      {/* Variant stock table */}
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
                  <Input
                    type="number" min={0} className="w-20 h-8 text-sm text-right" value={v.stock}
                    onChange={e => {
                      const newStock = parseInt(e.target.value) || 0;
                      const updatedVariants = form.variants.map(vr => vr.id === v.id ? { ...vr, stock: newStock } : vr);
                      const totalStock = updatedVariants.reduce((sum, vr) => sum + vr.stock, 0);
                      setForm({ ...form, variants: updatedVariants, stock: totalStock });
                    }}
                  />
                  <span className="text-xs text-muted-foreground w-5">un</span>
                  <button
                    onClick={() => {
                      const updated = form.variants.filter(vr => vr.id !== v.id);
                      setForm({ ...form, variants: updated, stock: updated.reduce((s, vr) => s + vr.stock, 0) });
                    }}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
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
/*  Product Form                                                       */
/* ------------------------------------------------------------------ */

function ProductForm({ product, allProducts, sidebarSearch, onSidebarSearch, onSelect, onSave, onBack }: {
  product: Product; allProducts: Product[]; sidebarSearch: string;
  onSidebarSearch: (s: string) => void; onSelect: (p: Product) => void;
  onSave: (p: Product) => void; onBack: () => void;
}) {
  const [form, setForm] = useState(product);
  const [section, setSection] = useState<ProductSection>('info');
  const [tagInput, setTagInput] = useState('');

  React.useEffect(() => { setForm(product); }, [product]);

  const sidebarFiltered = allProducts.filter(p => p.name.toLowerCase().includes(sidebarSearch.toLowerCase()));

  const sectionItems: { key: ProductSection; label: string; icon: React.ElementType }[] = [
    { key: 'info', label: 'Informações', icon: FileText },
    { key: 'price', label: 'Preço', icon: DollarSign },
    { key: 'stock', label: 'Estoque', icon: Boxes },
    { key: 'images', label: 'Imagens', icon: ImageIcon },
    { key: 'status', label: 'Status', icon: Eye },
  ];

  return (
    <div className="pt-2">
      <div className="flex items-center justify-between mb-5">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors">
          <ChevronLeft className="h-4 w-4" />
          {form.name || 'Novo Produto'}
        </button>
        <SaveButton onClick={() => onSave(form)} />
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
              <button
                key={p.id}
                onClick={() => onSelect(p)}
                className={cn(
                  'flex items-center gap-2 w-full px-2 py-2 rounded-md text-left transition-colors',
                  p.id === form.id ? 'bg-muted' : 'hover:bg-muted/40'
                )}
              >
                <div className="h-8 w-8 rounded-md bg-muted overflow-hidden shrink-0">
                  {p.images[0] ? (
                    <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full"><PackageIcon className="h-3.5 w-3.5 text-muted-foreground/30" /></div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-[10px] text-muted-foreground">R$ {p.price.toFixed(2).replace('.', ',')}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Section Nav */}
        <SectionNav items={sectionItems} active={section} onChange={s => setSection(s as ProductSection)} />

        {/* Content */}
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
                  <Input
                    className="h-7 w-28 text-xs"
                    placeholder="Nova tag..."
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && tagInput.trim()) {
                        setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
                        setTagInput('');
                      }
                    }}
                  />
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

          {section === 'stock' && (
            <StockSection form={form} setForm={setForm} />
          )}

          {section === 'images' && (
            <ImagesSectionContent form={form} setForm={setForm} />
          )}

          {section === 'status' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-foreground">Status</h3>
              <hr className="border-border" />
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">Produto ativo</p>
                  <p className="text-xs text-muted-foreground">Visível na loja para os clientes.</p>
                </div>
                <Switch checked={form.active} onCheckedChange={v => setForm({ ...form, active: v })} />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">Produto destaque</p>
                  <p className="text-xs text-muted-foreground">Aparece na seção de destaques da home.</p>
                </div>
                <Switch checked={form.featured} onCheckedChange={v => setForm({ ...form, featured: v })} />
              </div>
              <hr className="border-border" />
              <div className="bg-muted/50 rounded-lg px-4 py-3 space-y-1.5">
                <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Avaliação:</span> {form.rating}/5 ({form.reviewCount} avaliações)</p>
                <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Slug:</span> /{form.slug}</p>
                <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Criado em:</span> {new Date(form.createdAt).toLocaleDateString('pt-BR')}</p>
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
  const [collections, setCollections] = useState<ProductCollection[]>(mockCollections);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<ProductCollection | null>(null);

  if (editing) {
    return (
      <CollectionForm
        collection={editing}
        onSave={c => {
          setCollections(prev => prev.find(x => x.id === c.id) ? prev.map(x => x.id === c.id ? c : x) : [...prev, c]);
          setEditing(null);
        }}
        onBack={() => setEditing(null)}
      />
    );
  }

  const filtered = collections.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5 pt-2">
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
                      {p.images[0] ? (
                        <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full"><PackageIcon className="h-3.5 w-3.5 text-muted-foreground/20" /></div>
                      )}
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

function CollectionForm({ collection, onSave, onBack }: {
  collection: ProductCollection;
  onSave: (c: ProductCollection) => void;
  onBack: () => void;
}) {
  const [form, setForm] = useState(collection);
  const [section, setSection] = useState<CollectionSection>('info');
  const [prodSearch, setProdSearch] = useState('');
  const availableProducts = mockProducts.filter(p => p.name.toLowerCase().includes(prodSearch.toLowerCase()));

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
        <SaveButton onClick={() => onSave(form)} />
      </div>

      <div className="flex gap-5">
        <SectionNav items={sectionItems} active={section} onChange={s => setSection(s as CollectionSection)} />

        <div className="flex-1 min-w-0 pl-4">
          {section === 'info' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-foreground">Informações</h3>
              <hr className="border-border" />
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
                    <button
                      key={p.id}
                      onClick={() => setForm(prev => ({
                        ...prev,
                        productIds: selected ? prev.productIds.filter(id => id !== p.id) : [...prev.productIds, p.id],
                      }))}
                      className={cn('flex items-center gap-3 px-4 py-3 w-full text-left transition-colors', selected ? 'bg-primary/5' : 'hover:bg-muted/30')}
                    >
                      <div className="h-9 w-9 rounded-md bg-muted overflow-hidden shrink-0">
                        {p.images[0] ? (
                          <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full"><PackageIcon className="h-4 w-4 text-muted-foreground/30" /></div>
                        )}
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
              <div className="bg-muted/50 rounded-lg px-4 py-3">
                <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Slug:</span> /{form.slug}</p>
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
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border px-6 pt-2 flex items-center justify-between">
        <div className="flex gap-0">
          {([
            { key: 'categories' as Tab, label: 'Categorias', count: mockCategories.length },
            { key: 'products' as Tab, label: 'Produtos', count: mockProducts.length },
            { key: 'collections' as Tab, label: 'Coleções', count: mockCollections.length },
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
      </div>
    </div>
  );
}