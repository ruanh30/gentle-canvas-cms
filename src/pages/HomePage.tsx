import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mockProducts, mockCategories, mockCollections } from '@/data/mock';
import { useTheme } from '@/contexts/ThemeContext';
import { ProductCard } from '@/components/store/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, Truck, RefreshCw, ShieldCheck, CreditCard, Lock, DatabaseBackup, PackageCheck, Play } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { ThemeHomepageSection } from '@/types/theme';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeader } from '@/components/store/SectionHeader';
import { SingleBannerSection, MultiBannerSection } from '@/components/store/BannerSection';

function SectionCarousel({ children, speed, showArrows = true, centered = false, gap = 16 }: { children: React.ReactNode[]; speed: number; showArrows?: boolean; centered?: boolean; gap?: number }) {
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
      {showArrows && (
        <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-background">
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      <div ref={scrollRef} className={cn("flex overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory", showArrows ? "px-8" : "px-2", centered && "justify-center")} style={{ scrollbarWidth: 'none', gap: `${gap}px` }}>
        {children}
      </div>
      {showArrows && (
        <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-background">
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-3">
      {[
        { val: time.days, label: 'Dias' },
        { val: time.hours, label: 'Horas' },
        { val: time.minutes, label: 'Min' },
        { val: time.seconds, label: 'Seg' },
      ].map((unit, i) => (
        <div key={i} className="flex flex-col items-center">
          <span className="text-3xl md:text-5xl font-display font-bold tabular-nums">{pad(unit.val)}</span>
          <span className="text-xs uppercase tracking-wider opacity-70">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}

const HomePage = () => {
  const { theme } = useTheme();
  const featured = mockProducts.filter(p => p.featured);
  const sections = theme.homepageSections;
  const activeCollections = mockCollections
    .filter(c => c.active)
    .sort((a, b) => a.order - b.order);

  const heroSlides = theme.hero.slides || [];
  const responsive = theme.responsive;
  const hiddenMobile = responsive?.hideSectionsMobile || [];

  const spacingMap: Record<string, string> = {
    minimal: 'py-2',
    compact: 'py-6',
    normal: 'py-10',
    spacious: 'py-16',
  };
  const sectionPy = spacingMap[theme.global?.sectionSpacing] || 'py-10';

  const desktopGridCols: Record<number, string> = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8',
  };
  const tabletGridCols: Record<number, string> = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  const heroAlign: Record<string, string> = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  const heroHeightMap: Record<string, string> = {
    '200': 'min-h-[200px]',
    '300': 'min-h-[300px]',
    '400': 'min-h-[400px]',
    '500': 'min-h-[500px]',
    fullscreen: 'min-h-screen',
  };

  const [heroIdx, setHeroIdx] = React.useState(0);

  // Autoplay
  useEffect(() => {
    if (!theme.hero.enabled || !theme.hero.autoplay || heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setHeroIdx(prev => (prev + 1) % heroSlides.length);
    }, (theme.hero.autoplaySpeed || 5) * 1000);
    return () => clearInterval(interval);
  }, [theme.hero.enabled, theme.hero.autoplay, theme.hero.autoplaySpeed, heroSlides.length]);

  const renderSection = (section: ThemeHomepageSection) => {
    const isCarousel = (section.settings?.displayMode as string) === 'carousel';
    const carouselSpeed = (section.settings?.carouselSpeed as number) || 4;
    const carouselShowArrows = (section.settings?.showArrows as boolean) ?? true;
    const isHiddenMobile = hiddenMobile.includes(section.id);

    const wrapperClass = isHiddenMobile ? 'hidden md:block' : '';

    const rhythmPy = sectionPy;

    switch (section.type) {
      case 'hero': {
        if (!theme.hero.enabled || heroSlides.length === 0) return null;
        const slide = heroSlides[heroIdx] || heroSlides[0];
        if (!slide) return null;
        const heightClass = heroHeightMap[theme.hero.height] || heroHeightMap['500'];
        const transition = theme.hero.transition || 'fade';

        const variants = {
          fade: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.6, ease: [0.4, 0, 0.6, 1] as const },
          },
          slide: {
            initial: { x: '100%', opacity: 0 },
            animate: { x: 0, opacity: 1 },
            exit: { x: '-100%', opacity: 0 },
            transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
          },
          zoom: {
            initial: { scale: 1.15, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.9, opacity: 0 },
            transition: { duration: 0.6, ease: [0.4, 0, 0.6, 1] as const },
          },
        };

        const v = variants[transition] || variants.fade;

        return (
          <section
            data-highlight="hero"
            key={section.id}
            className={cn('relative bg-secondary overflow-hidden', heightClass, wrapperClass)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id || heroIdx}
                initial={v.initial}
                animate={v.animate}
                exit={v.exit}
                transition={v.transition}
                className="absolute inset-0"
                style={slide.backgroundImage ? {
                  backgroundImage: `url(${slide.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                } : undefined}
              >
                {slide.backgroundImage && (
                  <div className="absolute inset-0" style={{ backgroundColor: slide.overlayColor || '#000', opacity: slide.overlayOpacity ?? 0 }} />
                )}
                <div
                  className="container mx-auto px-4 relative z-10 flex flex-col justify-center h-full"
                  style={{ minHeight: 'inherit' }}
                >
                  <div
                    className={cn('max-w-xl flex flex-col', heroAlign[slide.contentAlign || 'left'])}
                    style={{
                      transform: `translate(${slide.contentOffsetX ?? 0}%, ${slide.contentOffsetY ?? 0}%)`,
                    }}
                  >
                    {slide.showText !== false && (
                      <>
                        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground mb-2 md:mb-4 font-body">
                          {slide.subtitle}
                        </p>
                        <h1
                          className="text-2xl md:text-4xl lg:text-6xl font-display font-bold leading-tight mb-3 md:mb-6 whitespace-pre-line"
                          style={{ fontSize: responsive?.heroTitleSizeMobile ? `clamp(${responsive.heroTitleSizeMobile}px, 5vw, 3.75rem)` : undefined }}
                        >
                          {slide.title}
                        </h1>
                        <p className="text-muted-foreground mb-4 md:mb-8 text-sm md:text-lg font-body">
                          {slide.description}
                        </p>
                      </>
                    )}
                    {slide.showButton !== false && slide.ctaText && (
                      <div
                        className="flex gap-3"
                        style={{
                          transform: `translate(${slide.buttonOffsetX ?? 0}%, ${slide.buttonOffsetY ?? 0}%)`,
                        }}
                      >
                        <Link to={slide.ctaLink || '/products'}>
                          <Button size="default" className="rounded-full px-5 md:px-8 text-sm md:text-base font-body">
                            {slide.ctaText}
                            <ArrowRight className="ml-1.5 md:ml-2 h-3.5 md:h-4 w-3.5 md:w-4" />
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            {theme.hero.showDots && heroSlides.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setHeroIdx(i)}
                    className={cn(
                      'w-2.5 h-2.5 rounded-full transition-all',
                      heroIdx === i ? 'bg-foreground scale-110' : 'bg-foreground/30 hover:bg-foreground/50'
                    )}
                  />
                ))}
              </div>
            )}

            {/* Arrows */}
            {theme.hero.showArrows && heroSlides.length > 1 && (
              <>
                <button
                  onClick={() => setHeroIdx(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-background/60 backdrop-blur-sm p-2 rounded-full shadow hover:bg-background/90 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setHeroIdx(prev => (prev + 1) % heroSlides.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-background/60 backdrop-blur-sm p-2 rounded-full shadow hover:bg-background/90 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </section>
        );
      }

      case 'categories': {
        const showImage = (section.settings?.showImage as boolean) !== false;
        const imageShape = (section.settings?.imageShape as string) || 'circle';
        const imageSize = (section.settings?.imageSize as number) || 80;
        const imageBorder = (section.settings?.imageBorder as boolean) ?? false;
        const imageBorderColor = (section.settings?.imageBorderColor as string) || '#e91e8c';
        const shapeClass = imageShape === 'circle' ? 'rounded-full' : imageShape === 'rounded' ? 'rounded-xl' : 'rounded-none';
        const selectedIds = (section.settings?.selectedCategoryIds as string[]) || [];
        const filteredCategories = selectedIds.length > 0 ? mockCategories.filter(c => selectedIds.includes(c.id)) : mockCategories;

        const categoryCard = (cat: typeof mockCategories[0]) => (
          <Link
            key={cat.id}
            to={`/products?category=${cat.slug}`}
            className={cn(
              'group text-center flex flex-col items-center gap-3 p-5 transition-all duration-200 min-w-[130px] flex-shrink-0 snap-start rounded-2xl',
              'hover:bg-accent/40',
              !showImage && 'p-6 rounded-xl bg-secondary hover:bg-accent',
            )}
          >
            {showImage && cat.image && (
              <div className="relative">
                {/* Soft glow ring behind the image */}
                <div
                  className={cn('absolute inset-0 scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md bg-primary/15', shapeClass)}
                />
                <div
                  className={cn(
                    'relative overflow-hidden bg-secondary flex-shrink-0 transition-all duration-300',
                    'ring-2 ring-border/50 group-hover:ring-primary/40 group-hover:shadow-lg group-hover:scale-105',
                    shapeClass
                  )}
                  style={{
                    width: imageSize,
                    height: imageSize,
                    ...(imageBorder ? { border: `${(section.settings?.imageBorderWidth as number) || 2}px solid ${imageBorderColor}` } : {}),
                  }}
                >
                  <img src={cat.image} alt={cat.name} className={cn('w-full h-full object-cover transition-transform duration-500 group-hover:scale-110', shapeClass)} loading="lazy" />
                </div>
              </div>
            )}
            <p className="text-[13px] text-muted-foreground group-hover:text-foreground transition-colors duration-200 uppercase tracking-wider font-body font-semibold mt-1">{cat.name}</p>
          </Link>
        );

        return (
          <section key={section.id} className={cn('container mx-auto px-4 flex flex-col items-center justify-center', rhythmPy, wrapperClass)}>
            {section.showTitle !== false && (
              <SectionHeader title={section.title} size="md" subtitle="Encontre o que procura" align={(section.settings?.titleAlign as 'left'|'center'|'right') || 'center'} />
            )}
            {isCarousel ? (
              <SectionCarousel speed={carouselSpeed} showArrows={carouselShowArrows} centered gap={(section.settings?.carouselGap as number) ?? 16}>
                {filteredCategories.map(categoryCard)}
              </SectionCarousel>
            ) : (
              <div className="flex flex-wrap justify-center w-full" style={{ gap: `${(section.settings?.gridGap as number) ?? 16}px` }}>
                {filteredCategories.map(categoryCard)}
              </div>
            )}
          </section>
        );
      }

      case 'featured-products': {
        const pl = theme.productListing || { limitDesktop: 0, limitMobile: 0 };
        const desktopProducts = pl.limitDesktop > 0 ? featured.slice(0, pl.limitDesktop) : featured;
        const mobileProducts = pl.limitMobile > 0 ? featured.slice(0, pl.limitMobile) : featured;

        return (
          <section key={section.id} className={cn('pm-showcase-container px-4', rhythmPy, wrapperClass)}>
            <div className="flex items-center justify-between mb-8">
              {section.showTitle !== false && (
                <SectionHeader title={section.title} size="lg" subtitle="Peças selecionadas para você" align={(section.settings?.titleAlign as 'left'|'center'|'right') || 'left'} className="mb-0" />
              )}
              <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 ml-auto shrink-0">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            {isCarousel ? (
              <SectionCarousel speed={carouselSpeed} showArrows={carouselShowArrows} centered>
                {featured.map(product => (
                  <div key={product.id} className="min-w-[260px] max-w-[280px] snap-start flex-shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </SectionCarousel>
            ) : (
              <>
                {/* Desktop */}
                <div className={cn('hidden lg:grid', desktopGridCols[theme.category?.columnsDesktop || 4] || desktopGridCols[4])} style={{ gap: `${theme.category?.gridGap ?? 24}px` }}>
                  {desktopProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {/* Tablet */}
                <div className={cn('hidden md:grid lg:hidden', tabletGridCols[theme.category?.columnsTablet || 3] || tabletGridCols[3])} style={{ gap: `${theme.category?.gridGap ?? 24}px` }}>
                  {desktopProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {/* Mobile */}
                <div className={cn('grid md:hidden', theme.category?.columnsMobile === 1 ? 'grid-cols-1' : 'grid-cols-2')} style={{ gap: `${Math.min(theme.category?.gridGap ?? 16, 16)}px` }}>
                  {mobileProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </section>
        );
      }

      case 'banner': {
        return (
          <div key={section.id} className={wrapperClass}>
            {section.showTitle !== false && (
              <div className="container mx-auto px-4">
                <SectionHeader title={section.title} size="sm" align={(section.settings?.titleAlign as 'left'|'center'|'right') || 'center'} />
              </div>
            )}
            <SingleBannerSection section={section} wrapperClass="" />
          </div>
        );
      }

      case 'double-banner':
      case 'triple-banner': {
        return (
          <div key={section.id} className={wrapperClass}>
            {section.showTitle !== false && (
              <div className="container mx-auto px-4">
                <SectionHeader title={section.title} size="sm" align={(section.settings?.titleAlign as 'left'|'center'|'right') || 'center'} />
              </div>
            )}
            <MultiBannerSection section={section} wrapperClass="" />
          </div>
        );
      }

      case 'image-text': {
        const s = section.settings as { imageUrl?: string; title?: string; description?: string; ctaText?: string; ctaLink?: string; imagePosition?: string };
        const imgLeft = (s.imagePosition || 'left') === 'left';
        return (
          <section key={section.id} className={cn('container mx-auto px-4', rhythmPy, wrapperClass)}>
            <div className={cn('grid md:grid-cols-2 gap-8 items-center', !imgLeft && 'direction-rtl')}>
              <div className={cn('rounded-2xl overflow-hidden bg-secondary', !imgLeft && 'md:order-2')}>
                {s.imageUrl ? (
                  <img src={s.imageUrl} alt={s.title || ''} className="w-full h-64 md:h-96 object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-64 md:h-96 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Imagem</span>
                  </div>
                )}
              </div>
              <div className={cn('flex flex-col justify-center', !imgLeft && 'md:order-1')}>
                <h2 className="text-xl md:text-3xl font-display font-bold mb-3 md:mb-4">{s.title || section.title}</h2>
                <p className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-base font-body leading-relaxed">{s.description || ''}</p>
                {s.ctaText && (
                  <Link to={s.ctaLink || '#'}>
                    <Button size="default" className="rounded-full px-5 md:px-8 text-sm md:text-base font-body">
                      {s.ctaText} <ArrowRight className="ml-1.5 md:ml-2 h-3.5 md:h-4 w-3.5 md:w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </section>
        );
      }

      case 'faq': {
        const items = (section.settings?.items as { question: string; answer: string }[]) || [];
        return (
          <section key={section.id} className={cn('container mx-auto px-4 max-w-3xl', rhythmPy, wrapperClass)}>
            {section.showTitle !== false && (
              <SectionHeader title={section.title} size="sm" subtitle="Tire suas dúvidas" align={(section.settings?.titleAlign as 'left'|'center'|'right') || 'center'} />
            )}
            <Accordion type="multiple" className="w-full">
              {items.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
          <section key={section.id} className={cn('container mx-auto px-4', rhythmPy, wrapperClass)}>
            {section.showTitle !== false && (
              <SectionHeader title={section.title} size="sm" accent={false} align={(section.settings?.titleAlign as 'left'|'center'|'right') || 'center'} />
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
          <section key={section.id} className={cn('container mx-auto px-4 py-8', wrapperClass)}>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10 text-muted-foreground text-xs md:text-sm">
              {trusts.map((t, i) => (
                <span key={i} className="flex items-center gap-1.5 md:gap-2">
                  <t.icon className="h-3.5 md:h-4 w-3.5 md:w-4" strokeWidth={1.5} />
                  {t.label}
                </span>
              ))}
            </div>
          </section>
        );
      }

      case 'collections': {
        const collectionId = section.settings?.collectionId as string;
        const collection = collectionId
          ? mockCollections.find(c => c.id === collectionId)
          : mockCollections.find(c => c.slug === section.id || c.name === section.title);
        if (!collection) return null;
        const allCollectionProducts = mockProducts.filter(p => collection.productIds.includes(p.id));
        if (allCollectionProducts.length === 0) return null;

        const pl = theme.productListing || { limitDesktop: 0, limitMobile: 0 };
        const desktopProducts = pl.limitDesktop > 0 ? allCollectionProducts.slice(0, pl.limitDesktop) : allCollectionProducts;
        const mobileProducts = pl.limitMobile > 0 ? allCollectionProducts.slice(0, pl.limitMobile) : allCollectionProducts;

        return (
          <section key={section.id} className={cn('pm-showcase-container px-4', rhythmPy, wrapperClass)}>
            {section.showTitle !== false && (
              <SectionHeader title={section.title} size="md" align={(section.settings?.titleAlign as 'left'|'center'|'right') || 'center'} />
            )}
            {isCarousel ? (
              <SectionCarousel speed={carouselSpeed} showArrows={carouselShowArrows} centered>
                {allCollectionProducts.map(product => (
                  <div key={product.id} className="min-w-[260px] max-w-[280px] snap-start flex-shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </SectionCarousel>
            ) : (
              <>
                {/* Desktop */}
                <div className={cn('hidden lg:grid', desktopGridCols[theme.category?.columnsDesktop || 4] || desktopGridCols[4])} style={{ gap: `${theme.category?.gridGap ?? 24}px` }}>
                  {desktopProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {/* Tablet */}
                <div className={cn('hidden md:grid lg:hidden', tabletGridCols[theme.category?.columnsTablet || 3] || tabletGridCols[3])} style={{ gap: `${theme.category?.gridGap ?? 24}px` }}>
                  {desktopProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {/* Mobile */}
                <div className={cn('grid md:hidden', theme.category?.columnsMobile === 1 ? 'grid-cols-1' : 'grid-cols-2')} style={{ gap: `${Math.min(theme.category?.gridGap ?? 16, 16)}px` }}>
                  {mobileProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </section>
        );
      }

      default:
        return null;
    }
  };

  return (
    <>
      {sections.filter(s => s.enabled).map(section => {
        const rendered = renderSection(section);
        if (!rendered) return null;
        return (
          <div key={section.id} data-highlight="section">
            {rendered}
          </div>
        );
      })}
    </>
  );
};

export default HomePage;
