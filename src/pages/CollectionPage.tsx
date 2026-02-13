import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockCollections, mockProducts } from '@/data/mock';
import { useTheme } from '@/contexts/ThemeContext';
import { ProductCard } from '@/components/store/ProductCard';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const CollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { theme } = useTheme();
  const collection = mockCollections.find(c => c.slug === slug);

  if (!collection) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-display font-bold mb-4">Coleção não encontrada</h1>
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground underline">
          Voltar à home
        </Link>
      </div>
    );
  }

  const products = mockProducts.filter(p => collection.productIds.includes(p.id));

  const gridCols: Record<number, string> = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">{collection.name}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold">{collection.name}</h1>
        {collection.description && (
          <p className="text-muted-foreground mt-2">{collection.description}</p>
        )}
        <p className="text-sm text-muted-foreground mt-1">{products.length} produtos</p>
      </div>

      <div className={cn('grid gap-6', gridCols[theme.category?.columnsDesktop] || 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4')}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p>Nenhum produto nesta coleção ainda.</p>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
