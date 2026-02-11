import React from 'react';
import { Link } from 'react-router-dom';
import { mockProducts, mockCategories } from '@/data/mock';
import { useTheme } from '@/contexts/ThemeContext';
import { ProductCard } from '@/components/store/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const HomePage = () => {
  const { theme } = useTheme();
  const featured = mockProducts.filter(p => p.featured);

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  const heroAlign = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  return (
    <>
      {/* Hero */}
      {theme.hero.enabled && (
        <section
          className="relative bg-secondary"
          style={theme.hero.backgroundImage ? {
            backgroundImage: `url(${theme.hero.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          } : undefined}
        >
          {theme.hero.backgroundImage && (
            <div className="absolute inset-0 bg-background" style={{ opacity: theme.hero.overlayOpacity }} />
          )}
          <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
            <div className={cn('max-w-xl flex flex-col', heroAlign[theme.hero.style])}>
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 font-body">
                {theme.hero.subtitle}
              </p>
              <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6 whitespace-pre-line">
                {theme.hero.title}
              </h1>
              <p className="text-muted-foreground mb-8 text-lg font-body">
                {theme.hero.description}
              </p>
              <div className="flex gap-3">
                <Link to={theme.hero.ctaLink}>
                  <Button size="lg" className="rounded-full px-8 font-body">
                    {theme.hero.ctaText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {theme.homepage.showCategories && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-display font-bold mb-8 text-center">Categorias</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockCategories.map(cat => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="group text-center p-6 rounded-xl bg-secondary hover:bg-accent transition-colors"
              >
                <p className="text-sm font-medium group-hover:text-foreground transition-colors">{cat.name}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured */}
      {theme.homepage.showFeatured && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-display font-bold">Destaques</h2>
            <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className={cn('grid gap-6', gridCols[theme.homepage.productsPerRow])}>
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Banner */}
      {theme.homepage.showBanner && (
        <section className="container mx-auto px-4 py-8">
          <div className="bg-secondary rounded-2xl p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{theme.homepage.bannerTitle}</h2>
            <p className="text-muted-foreground mb-6 font-body">{theme.homepage.bannerDescription}</p>
            <Link to="/login">
              <Button variant="outline" size="lg" className="rounded-full px-8 font-body">Criar conta</Button>
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default HomePage;
