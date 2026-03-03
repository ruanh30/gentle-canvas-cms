import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { mockProducts, mockCategories } from '@/data/mock';
import { ProductCard } from '@/components/store/ProductCard';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Grid3X3, List, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categorySlug = searchParams.get('category');
  const searchQuery = searchParams.get('q')?.toLowerCase().trim() || '';
  const [sortBy, setSortBy] = useState('featured');
  const { theme } = useTheme();
  const cat = theme.category;
  const [localDisplay, setLocalDisplay] = useState(cat.displayMode);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setLocalDisplay(cat.displayMode); }, [cat.displayMode]);

  const filtered = useMemo(() => {
    let products = mockProducts.filter(p => p.active);
    if (categorySlug) {
      const c = mockCategories.find(c => c.slug === categorySlug);
      if (c) products = products.filter(p => p.categoryId === c.id);
    }
    if (searchQuery) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery) ||
        p.tags?.some(t => t.toLowerCase().includes(searchQuery))
      );
    }
    switch (sortBy) {
      case 'price-asc': return [...products].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...products].sort((a, b) => b.price - a.price);
      case 'newest': return [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      default: return products;
    }
  }, [categorySlug, sortBy, searchQuery]);

  const activeCategory = mockCategories.find(c => c.slug === categorySlug);

  const gridCols: Record<number, string> = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  };

  const direction = cat.carouselDirection || 'ltr';

  const scrollCarousel = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = 300;
      scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  // Auto-scroll for carousel
  useEffect(() => {
    if (localDisplay !== 'carousel' || !cat.carouselAutoplay || !scrollRef.current) return;
    const scrollAmount = direction === 'ltr' ? 280 : -280;
    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      if (direction === 'ltr') {
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      } else {
        if (el.scrollLeft <= 10) {
          el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, cat.carouselSpeed * 1000);
    return () => clearInterval(interval);
  }, [localDisplay, cat.carouselAutoplay, cat.carouselSpeed, direction]);

  // For RTL carousel, start scrolled to the right
  useEffect(() => {
    if (localDisplay === 'carousel' && direction === 'rtl' && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [localDisplay, direction]);

  const renderProducts = () => {
    if (filtered.length === 0) {
      return (
        <div className="text-center py-20">
          <p className="text-muted-foreground">Nenhum produto encontrado.</p>
        </div>
      );
    }

    switch (localDisplay) {
      case 'carousel':
        return (
          <div className="relative">
            <button onClick={() => scrollCarousel('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-background">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth pb-4 px-8 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
              {filtered.map(product => (
                <div key={product.id} className="min-w-[260px] max-w-[280px] snap-start flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <button onClick={() => scrollCarousel('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-background">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        );

      case 'list':
        return (
          <div className="space-y-4">
            {filtered.map(product => (
              <div key={product.id} className="flex gap-4 border border-border rounded-lg p-3 hover:shadow-md transition-shadow">
                <div className="w-24 h-24 flex-shrink-0">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{product.description?.slice(0, 80)}...</p>
                  <p className="text-sm font-semibold mt-2">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'compact-grid':
        return (
          <div className={cn('grid gap-0', gridCols[cat.columnsDesktop] || gridCols[4])}>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        );

      case 'masonry':
        return (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map(product => (
              <div key={product.id} className="break-inside-avoid">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        );

      default: // grid
        return (
          <div className={cn('grid gap-6', gridCols[cat.columnsDesktop] || gridCols[4])}>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">
            {activeCategory ? activeCategory.name : 'Todos os Produtos'}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{filtered.length} produtos</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1 border border-border rounded-md p-0.5">
            <button onClick={() => setLocalDisplay('grid')} className={cn('p-1.5 rounded', localDisplay === 'grid' && 'bg-foreground text-background')}>
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button onClick={() => setLocalDisplay('list')} className={cn('p-1.5 rounded', localDisplay === 'list' && 'bg-foreground text-background')}>
              <List className="h-4 w-4" />
            </button>
            <button onClick={() => setLocalDisplay('compact-grid')} className={cn('p-1.5 rounded', localDisplay === 'compact-grid' && 'bg-foreground text-background')}>
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <Button
              variant={!categorySlug ? 'default' : 'outline'}
              size="sm"
              className="rounded-full whitespace-nowrap font-body"
              onClick={() => navigate('/products')}
            >
              Todos
            </Button>
            {mockCategories.map(cat => (
              <Button
                key={cat.id}
                variant={categorySlug === cat.slug ? 'default' : 'outline'}
                size="sm"
                className="rounded-full whitespace-nowrap font-body"
                onClick={() => navigate(`/products?category=${cat.slug}`)}
              >
                {cat.name}
              </Button>
            ))}
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Destaques</SelectItem>
              <SelectItem value="newest">Mais recentes</SelectItem>
              <SelectItem value="price-asc">Menor preço</SelectItem>
              <SelectItem value="price-desc">Maior preço</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {renderProducts()}
    </div>
  );
};

export default ProductsPage;
