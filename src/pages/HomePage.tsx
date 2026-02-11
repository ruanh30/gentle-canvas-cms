import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockProducts, mockCategories } from '@/data/mock';
import { useTheme } from '@/contexts/ThemeContext';
import { ProductCard } from '@/components/store/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, Truck, RefreshCw, ShieldCheck, CreditCard, Lock, DatabaseBackup, PackageCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeHomepageSection } from '@/types/theme';

function SectionCarousel({ children, speed }: { children: React.ReactNode[]; speed: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: 280, behavior: 'smooth' });
      }
    }, speed * 1000);
    return () => clearInterval(interval);
  }, [speed]);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-background">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth pb-4 px-8 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
        {children}
      </div>
      <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-background">
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

const HomePage = () => {
  const { theme } = useTheme();
  const featured = mockProducts.filter(p => p.featured);
  const sections = theme.homepageSections;

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

  const renderSection = (section: ThemeHomepageSection) => {
    const isCarousel = (section.settings?.displayMode as string) === 'carousel';
    const carouselSpeed = (section.settings?.carouselSpeed as number) || 4;

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
            {section.showTitle !== false && (
              <h2 className="text-2xl font-display font-bold mb-8 text-center">{section.title}</h2>
            )}
            {isCarousel ? (
              <SectionCarousel speed={carouselSpeed}>
                {mockCategories.map(cat => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.slug}`}
                    className="group text-center p-6 rounded-xl bg-secondary hover:bg-accent transition-colors min-w-[160px] flex-shrink-0 snap-start"
                  >
                    <p className="text-sm font-medium group-hover:text-foreground transition-colors">{cat.name}</p>
                  </Link>
                ))}
              </SectionCarousel>
            ) : (
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
            )}
          </section>
        );

      case 'featured-products':
        return (
          <section key={section.id} className="container mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-8">
              {section.showTitle !== false && (
                <h2 className="text-2xl font-display font-bold">{section.title}</h2>
              )}
              <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 ml-auto">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            {isCarousel ? (
              <SectionCarousel speed={carouselSpeed}>
                {featured.map(product => (
                  <div key={product.id} className="min-w-[260px] max-w-[280px] snap-start flex-shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </SectionCarousel>
            ) : (
              <div className={cn('grid gap-6', gridCols[theme.category?.columnsDesktop] || 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4')}>
                {featured.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
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

      case 'benefits': {
        const benefits = [
          { icon: Truck, label: 'Frete Grátis', desc: 'Para todo o Brasil' },
          { icon: RefreshCw, label: 'Troca Fácil', desc: 'Até 30 dias' },
          { icon: ShieldCheck, label: 'Compra Segura', desc: '100% protegida' },
          { icon: CreditCard, label: '12x sem juros', desc: 'No cartão de crédito' },
        ];
        return (
          <section key={section.id} className="container mx-auto px-4 py-16">
            {section.showTitle !== false && (
              <h2 className="text-2xl font-display font-bold mb-8 text-center">{section.title}</h2>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {benefits.map((b, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 rounded-xl bg-secondary/50">
                  <div className="p-3 rounded-full bg-foreground/5 mb-3">
                    <b.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-semibold">{b.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{b.desc}</p>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case 'trust-bar': {
        const trusts = [
          { icon: Lock, label: 'Compra Segura' },
          { icon: DatabaseBackup, label: 'Dados Protegidos' },
          { icon: PackageCheck, label: 'Entrega Garantida' },
        ];
        return (
          <section key={section.id} className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center gap-10 text-muted-foreground text-sm">
              {trusts.map((t, i) => (
                <span key={i} className="flex items-center gap-2">
                  <t.icon className="h-4 w-4" strokeWidth={1.5} />
                  {t.label}
                </span>
              ))}
            </div>
          </section>
        );
      }

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
