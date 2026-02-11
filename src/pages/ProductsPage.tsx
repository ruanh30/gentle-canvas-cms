import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockProducts, mockCategories } from '@/data/mock';
import { ProductCard } from '@/components/store/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get('category');
  const [sortBy, setSortBy] = useState('featured');

  const filtered = useMemo(() => {
    let products = mockProducts.filter(p => p.active);
    if (categorySlug) {
      const cat = mockCategories.find(c => c.slug === categorySlug);
      if (cat) products = products.filter(p => p.categoryId === cat.id);
    }
    switch (sortBy) {
      case 'price-asc': return [...products].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...products].sort((a, b) => b.price - a.price);
      case 'newest': return [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      default: return products;
    }
  }, [categorySlug, sortBy]);

  const activeCategory = mockCategories.find(c => c.slug === categorySlug);

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
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <Button
              variant={!categorySlug ? 'default' : 'outline'}
              size="sm"
              className="rounded-full whitespace-nowrap font-body"
              onClick={() => window.history.pushState({}, '', '/products')}
            >
              Todos
            </Button>
            {mockCategories.map(cat => (
              <Button
                key={cat.id}
                variant={categorySlug === cat.slug ? 'default' : 'outline'}
                size="sm"
                className="rounded-full whitespace-nowrap font-body"
                onClick={() => window.history.pushState({}, '', `/products?category=${cat.slug}`)}
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

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">Nenhum produto encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
