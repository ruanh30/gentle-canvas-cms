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
                        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 font-body">
                          {slide.subtitle}
                        </p>
                        <h1
                          className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6 whitespace-pre-line"
                          style={{ fontSize: responsive?.heroTitleSizeMobile ? `clamp(${responsive.heroTitleSizeMobile}px, 5vw, 3.75rem)` : undefined }}
                        >
                          {slide.title}
                        </h1>
                        <p className="text-muted-foreground mb-8 text-lg font-body">
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
                          <Button size="lg" className="rounded-full px-8 font-body">
                            {slide.ctaText}
                            <ArrowRight className="ml-2 h-4 w-4" />
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
              'group text-center flex flex-col items-center gap-2 p-4 transition-colors min-w-[120px] flex-shrink-0 snap-start',
              !showImage && 'p-6 rounded-xl bg-secondary hover:bg-accent',
            )}
          >
            {showImage && cat.image && (
              <div
                className={cn('overflow-hidden bg-secondary flex-shrink-0 transition-transform group-hover:scale-105', shapeClass)}
                style={{
                  width: imageSize,
                  height: imageSize,
                  ...(imageBorder ? { border: `${(section.settings?.imageBorderWidth as number) || 2}px solid ${imageBorderColor}` } : {}),
                }}
              >
                <img src={cat.image} alt={cat.name} className={cn('w-full h-full object-cover', shapeClass)} loading="lazy" />
              </div>
            )}
            <p className="text-[13px] text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-wide font-body font-semibold">{cat.name}</p>
          </Link>
        );

        return (
          <section key={section.id} className={cn('container mx-auto px-4', sectionPy, wrapperClass)}>
            {section.showTitle !== false && (
              <h2 className="text-2xl font-display font-bold mb-8 text-center">{section.title}</h2>
            )}
            {isCarousel ? (
              <SectionCarousel speed={carouselSpeed} showArrows={carouselShowArrows} centered gap={(section.settings?.carouselGap as number) ?? 16}>
                {filteredCategories.map(categoryCard)}
              </SectionCarousel>
            ) : (
              <div className="flex flex-wrap justify-center" style={{ gap: `${(section.settings?.gridGap as number) ?? 16}px` }}>
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
          <section key={section.id} className={cn('container mx-auto px-4', sectionPy, wrapperClass)}>
            <div className="flex items-center justify-between mb-8">
              {section.showTitle !== false && (
                <h2 className="text-2xl font-display font-bold">{section.title}</h2>
              )}
              <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 ml-auto">
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
                <div className="hidden md:flex flex-wrap justify-center gap-6">
                  {desktopProducts.map(product => (
                    <div key={product.id} className={cn(
                      theme.category?.columnsDesktop === 2 ? 'w-[calc(50%-12px)]' :
                      theme.category?.columnsDesktop === 3 ? 'w-[calc(33.333%-16px)]' :
                      theme.category?.columnsDesktop === 5 ? 'w-[calc(20%-19.2px)]' :
                      'w-[calc(25%-18px)]'
                    )}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
                {/* Mobile */}
                <div className="flex md:hidden flex-wrap justify-center gap-6">
                  {mobileProducts.map(product => (
                    <div key={product.id} className="w-[calc(50%-12px)]">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        );
      }

      case 'banner': {
        const settings = section.settings as { title?: string; description?: string };
        return (
          <section key={section.id} className={cn('container mx-auto px-4 py-8', wrapperClass)}>
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

      case 'countdown': {
        const s = section.settings as { targetDate?: string; label?: string; backgroundColor?: string; textColor?: string };
        return (
          <section key={section.id} className={cn('py-12', wrapperClass)} style={{ backgroundColor: s.backgroundColor || '#1a1a1a', color: s.textColor || '#ffffff' }}>
            <div className="container mx-auto px-4 text-center">
              {section.showTitle !== false && (
                <h2 className="text-2xl font-display font-bold mb-2">{section.title}</h2>
              )}
              <p className="text-sm opacity-80 mb-6">{s.label || 'Promoção termina em'}</p>
              {s.targetDate ? (
                <div className="flex justify-center">
                  <CountdownTimer targetDate={s.targetDate} />
                </div>
              ) : (
                <p className="text-sm opacity-60">Configure a data alvo nas configurações da seção</p>
              )}
            </div>
          </section>
        );
      }

      case 'video': {
        const s = section.settings as { url?: string; provider?: string; autoplay?: boolean };
        const isYouTube = (s.provider || 'youtube') === 'youtube';
        const videoId = s.url?.match(/(?:v=|\/embed\/|youtu\.be\/)([\w-]+)/)?.[1];
        return (
          <section key={section.id} className={cn('container mx-auto px-4', sectionPy, wrapperClass)}>
            {section.showTitle !== false && (
              <h2 className="text-2xl font-display font-bold mb-8 text-center">{section.title}</h2>
            )}
            <div className="aspect-video rounded-2xl overflow-hidden bg-secondary">
              {isYouTube && videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}${s.autoplay ? '?autoplay=1&mute=1' : ''}`}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={section.title}
                />
              ) : s.url ? (
                <video src={s.url} className="w-full h-full object-cover" controls autoPlay={s.autoplay} muted={s.autoplay} />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Play className="h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground ml-3">Configure a URL do vídeo</p>
                </div>
              )}
            </div>
          </section>
        );
      }

      case 'double-banner':
      case 'triple-banner': {
        const s = section.settings as Record<string, string>;
        const isTriple = section.type === 'triple-banner';
        const banners = isTriple
          ? [{ img: s.image1, link: s.link1 }, { img: s.image2, link: s.link2 }, { img: s.image3, link: s.link3 }]
          : [{ img: s.image1, link: s.link1 }, { img: s.image2, link: s.link2 }];

        return (
          <section key={section.id} className={cn('container mx-auto px-4 py-8', wrapperClass)}>
            {section.showTitle !== false && (
              <h2 className="text-2xl font-display font-bold mb-8 text-center">{section.title}</h2>
            )}
            <div className={cn('grid gap-4', isTriple ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2')}>
              {banners.map((b, i) => {
                const content = b.img ? (
                  <img src={b.img} alt={`Banner ${i + 1}`} className="w-full h-48 md:h-64 object-cover rounded-xl" loading="lazy" />
                ) : (
                  <div className="w-full h-48 md:h-64 bg-secondary rounded-xl flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Banner {i + 1}</span>
                  </div>
                );
                return b.link ? (
                  <Link key={i} to={b.link} className="block hover:opacity-90 transition-opacity">{content}</Link>
                ) : (
                  <div key={i}>{content}</div>
                );
              })}
            </div>
          </section>
        );
      }

      case 'image-text': {
        const s = section.settings as { imageUrl?: string; title?: string; description?: string; ctaText?: string; ctaLink?: string; imagePosition?: string };
        const imgLeft = (s.imagePosition || 'left') === 'left';
        return (
          <section key={section.id} className={cn('container mx-auto px-4', sectionPy, wrapperClass)}>
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
                <h2 className="text-3xl font-display font-bold mb-4">{s.title || section.title}</h2>
                <p className="text-muted-foreground mb-6 font-body leading-relaxed">{s.description || ''}</p>
                {s.ctaText && (
                  <Link to={s.ctaLink || '#'}>
                    <Button size="lg" className="rounded-full px-8 font-body">
                      {s.ctaText} <ArrowRight className="ml-2 h-4 w-4" />
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
          <section key={section.id} className={cn('container mx-auto px-4 max-w-3xl', sectionPy, wrapperClass)}>
            {section.showTitle !== false && (
              <h2 className="text-2xl font-display font-bold mb-8 text-center">{section.title}</h2>
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
          <section key={section.id} className={cn('container mx-auto px-4', sectionPy, wrapperClass)}>
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
          <section key={section.id} className={cn('container mx-auto px-4 py-8', wrapperClass)}>
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
          <section key={section.id} className={cn('container mx-auto px-4', sectionPy, wrapperClass)}>
            {section.showTitle !== false && (
              <h2 className="text-2xl font-display font-bold text-center mb-8">{section.title}</h2>
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
                <div className="hidden md:flex flex-wrap justify-center gap-6">
                  {desktopProducts.map(product => (
                    <div key={product.id} className={cn(
                      theme.category?.columnsDesktop === 2 ? 'w-[calc(50%-12px)]' :
                      theme.category?.columnsDesktop === 3 ? 'w-[calc(33.333%-16px)]' :
                      theme.category?.columnsDesktop === 5 ? 'w-[calc(20%-19.2px)]' :
                      'w-[calc(25%-18px)]'
                    )}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
                {/* Mobile */}
                <div className="flex md:hidden flex-wrap justify-center gap-6">
                  {mobileProducts.map(product => (
                    <div key={product.id} className="w-[calc(50%-12px)]">
                      <ProductCard product={product} />
                    </div>
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
      {sections.filter(s => s.enabled).map(renderSection)}
    </>
  );
};

export default HomePage;
