/**
 * Inertia Page: Theme/HomePage — FULL VERSION
 *
 * Renders hero, sections (categories, featured-products, benefits, trust-bar, banners),
 * and collections using ThemeConfig from server props.
 *
 * Server props:
 *   - theme: ThemeConfig (published)
 *   - products: Product[]
 *   - categories: Category[]
 *   - collections: Collection[] (optional)
 *   - storeName: string
 */
import React, { useRef, useEffect } from 'react';
// import { Head, usePage } from '@inertiajs/react';
// import { ThemeProvider } from '../../../cms/contexts/ThemeContext';
// import { StoreLayout } from '../../../cms/components/store/StoreLayout';
// import { ProductCard } from '../../../cms/components/store/ProductCard';
import { useTheme } from '@/contexts/ThemeContext';
import { ProductCard } from '@/components/store/ProductCard';
import { ArrowRight, ChevronLeft, ChevronRight, Truck, RefreshCw, ShieldCheck, CreditCard, Lock, DatabaseBackup, PackageCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeHomepageSection } from '@/types/theme';

// ── Standalone imports (Lovable preview) ──
import { mockProducts, mockCategories, mockCollections } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// ============================================================
// Carousel helper
// ============================================================

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

// ============================================================
// HomePage (standalone Lovable preview — uses mock data + react-router-dom)
// For Inertia production, see the commented block below.
// ============================================================

const HomePage = () => {
  const { theme } = useTheme();
  const featured = mockProducts.filter(p => p.featured);
  const sections = theme.homepageSections;
  const activeCollections = mockCollections
    .filter(c => c.active)
    .sort((a, b) => a.order - b.order);

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
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  {slide.subtitle}
                </p>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 whitespace-pre-line">
                  {slide.title}
                </h1>
                <p className="text-muted-foreground mb-8 text-lg">
                  {slide.description}
                </p>
                {slide.ctaText && (
                  <div className="flex gap-3">
                    <Link to={slide.ctaLink || '/products'}>
                      <Button size="lg" className="rounded-full px-8">
                        {slide.ctaText}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case 'categories':
        return (
          <section key={section.id} className="container mx-auto px-4 py-16">
            {section.showTitle !== false && (
              <h2 className="text-2xl font-bold mb-8 text-center">{section.title}</h2>
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
                <h2 className="text-2xl font-bold">{section.title}</h2>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{settings.title || 'Banner'}</h2>
              <p className="text-muted-foreground mb-6">{settings.description || ''}</p>
              <Link to="/login">
                <Button variant="outline" size="lg" className="rounded-full px-8">Criar conta</Button>
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
              <h2 className="text-2xl font-bold mb-8 text-center">{section.title}</h2>
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

      {/* Collections */}
      {activeCollections.map(collection => {
        const collectionProducts = mockProducts.filter(p => collection.productIds.includes(p.id));
        if (collectionProducts.length === 0) return null;
        return (
          <section key={collection.id} className="container mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">{collection.name}</h2>
              <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 ml-auto">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <SectionCarousel speed={5}>
              {collectionProducts.map(product => (
                <div key={product.id} className="min-w-[260px] max-w-[280px] snap-start flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </SectionCarousel>
          </section>
        );
      })}
    </>
  );
};

export default HomePage;

// ============================================================
// INERTIA PRODUCTION VERSION
// ============================================================
// Copy the block below to resources/js/inertia/Pages/Theme/HomePage.tsx
// and replace the standalone version above.
//
// ```tsx
// import React, { useRef, useEffect } from 'react';
// import { Head, usePage } from '@inertiajs/react';
// import { ThemeProvider } from '../../../cms/contexts/ThemeContext';
// import { StoreLayout } from '../../../cms/components/store/StoreLayout';
// import { ProductCard } from '../../../cms/components/store/ProductCard';
// import { ArrowRight, ChevronLeft, ChevronRight, Truck, RefreshCw, ShieldCheck, CreditCard, Lock, DatabaseBackup, PackageCheck } from 'lucide-react';
// import { cn } from '../../../cms/lib/utils';
//
// function SectionCarousel({ children, speed }: { children: React.ReactNode[]; speed: number }) {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     if (!scrollRef.current) return;
//     const interval = setInterval(() => {
//       const el = scrollRef.current;
//       if (!el) return;
//       if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
//         el.scrollTo({ left: 0, behavior: 'smooth' });
//       } else {
//         el.scrollBy({ left: 280, behavior: 'smooth' });
//       }
//     }, speed * 1000);
//     return () => clearInterval(interval);
//   }, [speed]);
//   const scroll = (dir: 'left' | 'right') => {
//     scrollRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
//   };
//   return (
//     <div className="relative">
//       <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-md"><ChevronLeft className="h-5 w-5" /></button>
//       <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth pb-4 px-8 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>{children}</div>
//       <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-md"><ChevronRight className="h-5 w-5" /></button>
//     </div>
//   );
// }
//
// export default function HomePage() {
//   const { theme, products, categories, collections, storeName } = usePage().props as any;
//
//   // Hero
//   const heroSlide = theme?.hero?.slides?.[0];
//   const heroEnabled = theme?.hero?.enabled && heroSlide;
//   const sections = theme?.homepageSections ?? [];
//
//   const heroAlign: Record<string, string> = {
//     left: 'text-left items-start',
//     center: 'text-center items-center mx-auto',
//     right: 'text-right items-end ml-auto',
//   };
//
//   const gridCols: Record<number, string> = {
//     2: 'grid-cols-1 md:grid-cols-2',
//     3: 'grid-cols-2 md:grid-cols-3',
//     4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
//     5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
//   };
//
//   const renderSection = (section: any) => {
//     const isCarousel = section.settings?.displayMode === 'carousel';
//     const carouselSpeed = section.settings?.carouselSpeed || 4;
//
//     switch (section.type) {
//       case 'hero':
//         if (!heroEnabled) return null;
//         return (
//           <section key={section.id} className="relative bg-gray-100"
//             style={heroSlide.backgroundImage ? { backgroundImage: `url(${heroSlide.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
//           >
//             {heroSlide.backgroundImage && <div className="absolute inset-0" style={{ backgroundColor: heroSlide.overlayColor, opacity: heroSlide.overlayOpacity }} />}
//             <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
//               <div className={cn('max-w-xl flex flex-col', heroAlign[heroSlide.contentAlign] || 'text-left items-start')}>
//                 {heroSlide.subtitle && <p className="text-sm uppercase tracking-[0.3em] opacity-70 mb-4">{heroSlide.subtitle}</p>}
//                 <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 whitespace-pre-line">{heroSlide.title}</h1>
//                 {heroSlide.description && <p className="opacity-80 mb-8 text-lg">{heroSlide.description}</p>}
//                 {heroSlide.ctaText && (
//                   <a href={heroSlide.ctaLink || './shop'} className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium text-white" style={{ backgroundColor: theme.colors?.primary || '#000' }}>
//                     {heroSlide.ctaText} <ArrowRight className="h-4 w-4" />
//                   </a>
//                 )}
//               </div>
//             </div>
//           </section>
//         );
//
//       case 'categories':
//         if (!Array.isArray(categories) || categories.length === 0) return null;
//         return (
//           <section key={section.id} className="container mx-auto px-4 py-16">
//             {section.showTitle !== false && <h2 className="text-2xl font-bold mb-8 text-center">{section.title}</h2>}
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//               {categories.map((cat: any) => (
//                 <a key={cat.id} href={`./shop?category=${encodeURIComponent(cat.slug)}`} className="group text-center p-6 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
//                   <p className="text-sm font-medium">{cat.name}</p>
//                 </a>
//               ))}
//             </div>
//           </section>
//         );
//
//       case 'featured-products':
//         if (!Array.isArray(products) || products.length === 0) return null;
//         return (
//           <section key={section.id} className="container mx-auto px-4 py-16">
//             <div className="flex items-center justify-between mb-8">
//               {section.showTitle !== false && <h2 className="text-2xl font-bold">{section.title}</h2>}
//               <a href="./shop" className="text-sm font-medium opacity-60 hover:opacity-100 flex items-center gap-1 ml-auto">Ver todos <ArrowRight className="h-4 w-4" /></a>
//             </div>
//             {isCarousel ? (
//               <SectionCarousel speed={carouselSpeed}>
//                 {products.map((p: any) => (
//                   <div key={p.id} className="min-w-[260px] max-w-[280px] snap-start flex-shrink-0"><ProductCard product={p} /></div>
//                 ))}
//               </SectionCarousel>
//             ) : (
//               <div className={cn('grid gap-6', gridCols[theme.category?.columnsDesktop] || 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4')}>
//                 {products.map((p: any) => <ProductCard key={p.id} product={p} />)}
//               </div>
//             )}
//           </section>
//         );
//
//       case 'benefits':
//         return (
//           <section key={section.id} className="container mx-auto px-4 py-16">
//             {section.showTitle !== false && <h2 className="text-2xl font-bold mb-8 text-center">{section.title}</h2>}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {[{ icon: Truck, label: 'Frete Grátis', desc: 'Para todo o Brasil' },
//                 { icon: RefreshCw, label: 'Troca Fácil', desc: 'Até 30 dias' },
//                 { icon: ShieldCheck, label: 'Compra Segura', desc: '100% protegida' },
//                 { icon: CreditCard, label: '12x sem juros', desc: 'No cartão de crédito' }].map((b, i) => (
//                 <div key={i} className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50">
//                   <div className="p-3 rounded-full bg-gray-100 mb-3"><b.icon className="h-5 w-5" strokeWidth={1.5} /></div>
//                   <p className="text-sm font-semibold">{b.label}</p>
//                   <p className="text-xs opacity-60 mt-0.5">{b.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </section>
//         );
//
//       case 'trust-bar':
//         return (
//           <section key={section.id} className="container mx-auto px-4 py-8">
//             <div className="flex items-center justify-center gap-10 opacity-60 text-sm">
//               {[{ icon: Lock, label: 'Compra Segura' }, { icon: DatabaseBackup, label: 'Dados Protegidos' }, { icon: PackageCheck, label: 'Entrega Garantida' }].map((t, i) => (
//                 <span key={i} className="flex items-center gap-2"><t.icon className="h-4 w-4" strokeWidth={1.5} />{t.label}</span>
//               ))}
//             </div>
//           </section>
//         );
//
//       default: return null;
//     }
//   };
//
//   return (
//     <>
//       <Head title={storeName || 'Loja'} />
//       <ThemeProvider initialPublished={theme}>
//         <StoreLayout categories={categories}>
//           {sections.filter((s: any) => s.enabled).map(renderSection)}
//         </StoreLayout>
//       </ThemeProvider>
//     </>
//   );
// }
// ```
