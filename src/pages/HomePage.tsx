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
  const sections = theme.homepageSections;

  const heroSection = sections.find(s => s.type === 'hero');
  const catSection = sections.find(s => s.type === 'categories');
  const featSection = sections.find(s => s.type === 'featured-products');
  const bannerSection = sections.find(s => s.type === 'banner');

  const slide = theme.hero.slides[0];

  const gridCols: Record<number, string> = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  };

  const heroAlign: Record<string, string> = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  // Render sections in order
  const renderSection = (section: typeof sections[0]) => {
    switch (section.type) {
      case 'hero':
        if (!theme.hero.enabled || !slide) return null;
        return (
          <section
            key={section.id}
            className="relative bg-secondary"
            style={slide.backgroundImage ? {
              backgroundImage: `url(${slide.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            } : undefined}
          >
            {slide.backgroundImage && (
              <div className="absolute inset-0" style={{ backgroundColor: slide.overlayColor, opacity: slide.overlayOpacity }} />
            )}
            <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
              <div className={cn('max-w-xl flex flex-col', heroAlign[slide.contentAlign])}>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 font-body">
                  {slide.subtitle}
                </p>
                <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6 whitespace-pre-line">
                  {slide.title}
                </h1>
                <p className="text-muted-foreground mb-8 text-lg font-body">
                  {slide.description}
                </p>
                <div className="flex gap-3">
                  <Link to={slide.ctaLink}>
                    <Button size="lg" className="rounded-full px-8 font-body">
                      {slide.ctaText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );

      case 'categories':
        return (
          <section key={section.id} className="container mx-auto px-4 py-16">
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
        );

      case 'featured-products':
        return (
          <section key={section.id} className="container mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold">Destaques</h2>
              <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className={cn('grid gap-6', gridCols[theme.category.columnsDesktop] || gridCols[4])}>
              {featured.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        );

      case 'banner': {
        const settings = section.settings as { title?: string; description?: string };
        return (
          <section key={section.id} className="container mx-auto px-4 py-8">
            <div className="bg-secondary rounded-2xl p-8 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{settings.title || 'Banner'}</h2>
              <p className="text-muted-foreground mb-6 font-body">{settings.description || ''}</p>
              <Link to="/login">
                <Button variant="outline" size="lg" className="rounded-full px-8 font-body">Criar conta</Button>
              </Link>
            </div>
          </section>
        );
      }

      case 'benefits':
        return (
          <section key={section.id} className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {['🚚 Frete Grátis', '🔄 Troca Fácil', '🔒 Compra Segura', '💳 12x sem juros'].map((b, i) => (
                <div key={i} className="p-4">
                  <p className="text-sm font-medium">{b}</p>
                </div>
              ))}
            </div>
          </section>
        );

      case 'trust-bar':
        return (
          <section key={section.id} className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center gap-8 text-muted-foreground text-sm">
              {['Compra Segura', 'Dados Protegidos', 'Entrega Garantida'].map((s, i) => (
                <span key={i} className="flex items-center gap-1">✅ {s}</span>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {sections.filter(s => s.enabled).map(renderSection)}
    </>
  );
};

export default HomePage;
