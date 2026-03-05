import React, { useRef, useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { mockProducts, mockCategories, mockCollections } from '@/data/mock';
import { useTheme } from '@/contexts/ThemeContext';
import { ProductCard } from '@/components/store/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, Truck, RefreshCw, ShieldCheck, CreditCard, Lock, DatabaseBackup, PackageCheck, Play, Heart, Gift, Clock, Headphones, MapPin, Zap, Award, ThumbsUp, CheckCircle, Phone, Mail, Globe, Percent, Tag, Flame, BadgeCheck, Gem, Crown, Sparkles, Star, Timer } from 'lucide-react';
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
    <div className="relative w-full">
      {showArrows && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm p-1.5 md:p-2 rounded-full shadow-md hover:bg-background hidden md:flex items-center justify-center"
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      )}
      <div
        ref={scrollRef}
        className={cn(
          "flex overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory no-scrollbar",
          showArrows ? "md:px-10 px-1" : "px-1",
        )}
        style={{ gap: `${gap}px` }}
      >
        {children}
      </div>
      {showArrows && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm p-1.5 md:p-2 rounded-full shadow-md hover:bg-background hidden md:flex items-center justify-center"
        >
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      )}
    </div>
  );
}
interface CountdownTimerProps {
  targetDate: string;
  style?: 'minimal' | 'boxes' | 'bold';
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  expired?: boolean;
}

function CountdownTimer({ targetDate, style = 'boxes', showDays = true, showHours = true, showMinutes = true, showSeconds = true, expired = false }: CountdownTimerProps) {
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

  if (expired) return null;

  const pad = (n: number) => String(n).padStart(2, '0');
  const units = [
    showDays && { val: time.days, label: 'Dias' },
    showHours && { val: time.hours, label: 'Horas' },
    showMinutes && { val: time.minutes, label: 'Min' },
    showSeconds && { val: time.seconds, label: 'Seg' },
  ].filter(Boolean) as { val: number; label: string }[];

  if (style === 'minimal') {
    return (
      <div className="flex items-center gap-4 md:gap-6">
        {units.map((unit, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-2xl md:text-4xl font-display font-light tabular-nums">{pad(unit.val)}</span>
            <span className="text-[10px] md:text-xs uppercase tracking-wider opacity-60 mt-1">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (style === 'bold') {
    return (
      <div className="flex items-center gap-3 md:gap-5">
        {units.map((unit, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-6xl font-display font-black tabular-nums leading-none">{pad(unit.val)}</span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-70 mt-2 font-medium">{unit.label}</span>
            </div>
            {i < units.length - 1 && <span className="text-3xl md:text-5xl font-display font-light opacity-30 -mt-4">:</span>}
          </React.Fragment>
        ))}
      </div>
    );
  }

  // boxes (default)
  return (
    <div className="flex items-center gap-2.5 md:gap-4">
      {units.map((unit, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-1.5">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2.5 md:px-5 md:py-4 border border-white/10">
              <span className="text-2xl md:text-5xl font-display font-bold tabular-nums leading-none">{pad(unit.val)}</span>
            </div>
            <span className="text-[10px] md:text-xs uppercase tracking-wider opacity-70">{unit.label}</span>
          </div>
          {i < units.length - 1 && <span className="text-xl md:text-3xl font-display opacity-30 -mt-5">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

const HomePage = () => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
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
        const imageSize = isMobile ? ((section.settings?.imageSizeMobile as number) || (section.settings?.imageSize as number) || 80) : ((section.settings?.imageSize as number) || 80);
        const imageBorder = (section.settings?.imageBorder as boolean) ?? false;
        const imageBorderColor = (section.settings?.imageBorderColor as string) || '#e91e8c';
        const imageBorderWidth = isMobile ? ((section.settings?.imageBorderWidthMobile as number) || (section.settings?.imageBorderWidth as number) || 2) : ((section.settings?.imageBorderWidth as number) || 2);
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
                    ...(imageBorder ? { border: `${imageBorderWidth}px solid ${imageBorderColor}` } : {}),
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
              <SectionCarousel speed={carouselSpeed} showArrows={carouselShowArrows} centered gap={isMobile ? ((section.settings?.carouselGapMobile as number) ?? (section.settings?.carouselGap as number) ?? 16) : ((section.settings?.carouselGap as number) ?? 16)}>
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

      case 'video': {
        const videoUrl = (section.settings?.url as string) || '';
        const provider = (section.settings?.provider as string) || 'youtube';
        const autoplay = (section.settings?.autoplay as boolean) ?? false;

        const getYoutubeEmbedUrl = (url: string) => {
          const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
          if (match) return `https://www.youtube.com/embed/${match[1]}?rel=0${autoplay ? '&autoplay=1&mute=1' : ''}`;
          return url;
        };

        if (!videoUrl) {
          return (
            <section key={section.id} className={cn('container mx-auto px-4', rhythmPy, wrapperClass)}>
              {section.showTitle !== false && (
                <SectionHeader title={section.title} size="sm" align={(section.settings?.titleAlign as 'left'|'center'|'right') || 'center'} />
              )}
              <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-border/30 bg-secondary/50 aspect-video flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Play className="h-8 w-8 opacity-40" />
                  <span className="text-sm">Nenhum vídeo configurado</span>
                </div>
              </div>
            </section>
          );
        }

        return (
          <section key={section.id} className={cn('container mx-auto px-4', rhythmPy, wrapperClass)}>
            {section.showTitle !== false && (
              <SectionHeader title={section.title} size="sm" align={(section.settings?.titleAlign as 'left'|'center'|'right') || 'center'} />
            )}
            <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-border/30 shadow-sm aspect-video">
              {provider === 'youtube' ? (
                <iframe
                  src={getYoutubeEmbedUrl(videoUrl)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={section.title || 'Vídeo'}
                  loading="lazy"
                />
              ) : (
                <video
                  src={videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay={autoplay}
                  muted={autoplay}
                  playsInline
                />
              )}
            </div>
          </section>
        );
      }

      case 'countdown': {
        const targetDate = (section.settings?.targetDate as string) || '';
        const label = (section.settings?.label as string) || 'Promoção termina em';
        const headline = (section.settings?.headline as string) || '';
        const subtitle = (section.settings?.subtitle as string) || '';
        const ctaText = (section.settings?.ctaText as string) || '';
        const ctaDestType = (section.settings?.ctaDestType as string) || 'custom';
        const ctaCollectionId = (section.settings?.ctaCollectionId as string) || '';
        const ctaCustomLink = (section.settings?.ctaLink as string) || '';
        const ctaLink = ctaDestType === 'catalog' ? '/produtos'
          : ctaDestType === 'collection' && ctaCollectionId ? `/produtos?collection=${ctaCollectionId}`
          : ctaCustomLink;
        const bgType = (section.settings?.bgType as string) || 'solid';
        const bgColor = (section.settings?.backgroundColor as string) || '#1a1a1a';
        const txtColor = (section.settings?.textColor as string) || '#ffffff';
        const gradientFrom = (section.settings?.gradientFrom as string) || '#1a1a1a';
        const gradientTo = (section.settings?.gradientTo as string) || '#4a1a8a';
        const bgImage = (section.settings?.bgImage as string) || '';
        const overlayColor = (section.settings?.overlayColor as string) || '#000000';
        const overlayOpacity = (section.settings?.overlayOpacity as number) ?? 50;
        const align = (section.settings?.align as string) || 'center';
        const sectionHeight = (section.settings?.sectionHeight as string) || 'auto';
        const counterStyle = (section.settings?.counterStyle as string) || 'boxes';
        const showDays = (section.settings?.showDays as boolean) ?? true;
        const showHours = (section.settings?.showHours as boolean) ?? true;
        const showMinutes = (section.settings?.showMinutes as boolean) ?? true;
        const showSeconds = (section.settings?.showSeconds as boolean) ?? true;
        const expiryBehavior = (section.settings?.expiryBehavior as string) || 'hide';
        const expiryMessage = (section.settings?.expiryMessage as string) || 'Promoção encerrada!';

        // Check if expired
        const isExpired = targetDate ? new Date(targetDate).getTime() <= Date.now() : false;

        if (!targetDate) {
          return (
            <section key={section.id} className={cn(rhythmPy, wrapperClass)}>
              <div className="w-full py-8 md:py-12 bg-secondary/50">
                <div className="container mx-auto px-4 flex flex-col items-center gap-3 text-muted-foreground">
                  <Timer className="h-8 w-8 opacity-40" />
                  <span className="text-sm">Configure a data alvo da contagem regressiva</span>
                </div>
              </div>
            </section>
          );
        }
        if (isExpired && expiryBehavior === 'hide') return null;

        const heightMap: Record<string, string> = {
          compact: 'py-4 md:py-6',
          auto: 'py-8 md:py-12',
          tall: 'py-12 md:py-20',
          hero: 'py-20 md:py-32',
        };
        const alignMap: Record<string, string> = {
          left: 'items-start text-left',
          center: 'items-center text-center',
          right: 'items-end text-right',
        };

        let bgStyle: React.CSSProperties = { backgroundColor: bgColor, color: txtColor };
        if (bgType === 'gradient') {
          bgStyle = { background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`, color: txtColor };
        } else if (bgType === 'image') {
          bgStyle = {
            backgroundImage: bgImage ? `url(${bgImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: txtColor,
          };
        }

        return (
          <section key={section.id} className={cn(rhythmPy, wrapperClass)}>
            {section.showTitle !== false && (
              <div className="container mx-auto px-4">
                <SectionHeader title={section.title} size="sm" align={(section.settings?.titleAlign as 'left'|'center'|'right') || 'center'} />
              </div>
            )}
            <div
              className={cn('w-full relative overflow-hidden', heightMap[sectionHeight] || heightMap.auto)}
              style={bgStyle}
            >
              {/* Overlay for image bg */}
              {bgType === 'image' && bgImage && (
                <div className="absolute inset-0" style={{ backgroundColor: overlayColor, opacity: overlayOpacity / 100 }} />
              )}

              <div className={cn('container mx-auto px-4 flex flex-col gap-3 md:gap-5 relative z-10', alignMap[align] || alignMap.center)}>
                {isExpired && expiryBehavior === 'message' ? (
                  <p className="text-lg md:text-2xl font-display font-bold">{expiryMessage}</p>
                ) : (
                  <>
                    {headline && <h3 className="text-xl md:text-3xl font-display font-bold leading-tight">{headline}</h3>}
                    {subtitle && <p className="text-sm md:text-base opacity-80 font-body max-w-xl">{subtitle}</p>}
                    {label && <p className="text-xs md:text-sm uppercase tracking-[0.2em] opacity-70 font-body">{label}</p>}
                    <CountdownTimer
                      targetDate={targetDate}
                      style={counterStyle as 'minimal' | 'boxes' | 'bold'}
                      showDays={showDays}
                      showHours={showHours}
                      showMinutes={showMinutes}
                      showSeconds={showSeconds}
                      expired={isExpired && expiryBehavior === 'keep'}
                    />
                    {ctaText && (
                      <Link
                        to={ctaLink || '#'}
                        className="inline-flex items-center justify-center mt-2 px-6 py-2.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-sm font-medium transition-colors"
                      >
                        {ctaText}
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>
        );
      }

      case 'image-text': {
        const s = section.settings || {};
        const imageUrl = (s.imageUrl as string) || '';
        const title = (s.title as string) || section.title;
        const subtitle = (s.subtitle as string) || '';
        const description = (s.description as string) || '';
        const ctaText = (s.ctaText as string) || '';
        const ctaDestType = (s.ctaDestType as string) || 'custom';
        const ctaCollectionId = (s.ctaCollectionId as string) || '';
        const ctaCustomLink = (s.ctaLink as string) || '';
        const ctaLink = ctaDestType === 'catalog' ? '/produtos'
          : ctaDestType === 'collection' && ctaCollectionId ? `/produtos?collection=${ctaCollectionId}`
          : ctaCustomLink;
        const imgLeft = ((s.imagePosition as string) || 'left') === 'left';
        const textAlign = (s.textAlign as string) || 'left';
        const verticalAlign = (s.verticalAlign as string) || 'center';
        const sectionHeight = (s.sectionHeight as string) || 'auto';
        const bgType = (s.bgType as string) || 'none';
        const bgColor = (s.backgroundColor as string) || '#f5f5f5';
        const txtColor = (s.textColor as string) || '';
        const gradientFrom = (s.gradientFrom as string) || '#f5f5f5';
        const gradientTo = (s.gradientTo as string) || '#e0e0e0';
        const borderRadius = (s.borderRadius as string) || 'lg';
        const sectionWidth = (s.sectionWidth as string) || 'contained';
        const imageRatio = (s.imageRatio as string) || 'auto';

        const heightMap: Record<string, string> = {
          compact: 'min-h-0',
          auto: 'min-h-0',
          tall: 'md:min-h-[500px]',
          hero: 'md:min-h-[600px]',
        };
        const imgHeightMap: Record<string, string> = {
          compact: 'h-48 md:h-64',
          auto: 'h-64 md:h-96',
          tall: 'h-72 md:h-[500px]',
          hero: 'h-80 md:h-[600px]',
        };
        const ratioMap: Record<string, string> = {
          auto: '',
          square: 'aspect-square',
          portrait: 'aspect-[3/4]',
          landscape: 'aspect-[4/3]',
        };
        const vertMap: Record<string, string> = {
          top: 'justify-start',
          center: 'justify-center',
          bottom: 'justify-end',
        };
        const radiusMap: Record<string, string> = {
          none: 'rounded-none',
          md: 'rounded-lg',
          lg: 'rounded-2xl',
          xl: 'rounded-3xl',
        };

        let sectionStyle: React.CSSProperties = {};
        if (bgType === 'solid') sectionStyle = { backgroundColor: bgColor, color: txtColor };
        else if (bgType === 'gradient') sectionStyle = { background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`, color: txtColor };

        const containerClass = sectionWidth === 'full' ? 'w-full px-0' : sectionWidth === 'wide' ? 'container mx-auto px-2 max-w-7xl' : 'container mx-auto px-4';

        return (
          <section key={section.id} className={cn(rhythmPy, wrapperClass)} style={sectionStyle}>
            <div className={containerClass}>
              <div className={cn('grid md:grid-cols-2 gap-6 md:gap-8', heightMap[sectionHeight])}>
                {/* Image */}
                <div className={cn(
                  radiusMap[borderRadius],
                  'overflow-hidden bg-secondary',
                  !imgLeft && 'md:order-2',
                  ratioMap[imageRatio] || imgHeightMap[sectionHeight],
                )}>
                  {imageUrl ? (
                    <img src={imageUrl} alt={title} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-full min-h-[200px] flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">Imagem</span>
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className={cn(
                  'flex flex-col gap-3 md:gap-4 px-2 md:px-4',
                  !imgLeft && 'md:order-1',
                  vertMap[verticalAlign],
                  textAlign === 'center' && 'text-center items-center',
                  textAlign === 'right' && 'text-right items-end',
                  textAlign === 'left' && 'text-left items-start',
                )}>
                  {title && <h2 className="text-xl md:text-3xl font-display font-bold leading-tight">{title}</h2>}
                  {subtitle && <p className="text-sm md:text-lg font-medium opacity-80">{subtitle}</p>}
                  {description && <p className="text-muted-foreground text-sm md:text-base font-body leading-relaxed max-w-lg">{description}</p>}
                  {ctaText && (
                    <Link to={ctaLink || '#'} className="mt-2">
                      <Button size="default" className="rounded-full px-5 md:px-8 text-sm md:text-base font-body">
                        {ctaText} <ArrowRight className="ml-1.5 md:ml-2 h-3.5 md:h-4 w-3.5 md:w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      }

      case 'benefits': {
        const ICON_MAP: Record<string, any> = { Truck, RefreshCw, ShieldCheck, CreditCard, Lock, DatabaseBackup, PackageCheck, Heart, Gift, Clock, Headphones, MapPin, Zap, Award, ThumbsUp, CheckCircle, Star, Phone, Mail, Globe, Percent, Tag, Flame, BadgeCheck, Gem, Crown, Sparkles };
        const defaultItems = [
          { icon: 'Truck', label: 'Frete Grátis', desc: 'Para todo o Brasil' },
          { icon: 'RefreshCw', label: 'Troca Fácil', desc: 'Até 30 dias' },
          { icon: 'ShieldCheck', label: 'Compra Segura', desc: '100% protegida' },
          { icon: 'CreditCard', label: '12x sem juros', desc: 'No cartão de crédito' },
        ];
        const items = (section.settings?.items as { icon: string; label: string; desc: string }[]) || defaultItems;
        const layout = (section.settings?.layout as string) || 'grid';
        const style = (section.settings?.style as string) || 'cards';
        const iconColor = (section.settings?.iconColor as string) || '';
        const bgColor = (section.settings?.bgColor as string) || '';

        return (
          <section key={section.id} className={cn('container mx-auto px-4', rhythmPy, wrapperClass)}>
            {section.showTitle !== false && (
              <SectionHeader title={section.title} size="sm" accent={false} align={(section.settings?.titleAlign as 'left'|'center'|'right') || 'center'} />
            )}
            <div className={cn(
              layout === 'inline'
                ? 'flex flex-wrap items-center justify-center gap-6 md:gap-10'
                : 'grid gap-4 md:gap-6',
              layout !== 'inline' && (items.length <= 2 ? 'grid-cols-2' : items.length === 3 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'),
            )}>
              {items.map((b, i) => {
                const Icon = ICON_MAP[b.icon] || ShieldCheck;
                if (layout === 'inline') {
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" strokeWidth={1.5} style={iconColor ? { color: iconColor } : undefined} />
                      <div>
                        <p className="text-sm font-semibold">{b.label}</p>
                        {b.desc && <p className="text-[10px] text-muted-foreground">{b.desc}</p>}
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={i} className={cn(
                    'flex flex-col items-center text-center p-5 md:p-6 rounded-xl transition-colors',
                    style === 'cards' && 'bg-secondary/50',
                    style === 'outlined' && 'border border-border',
                    style === 'minimal' && '',
                  )} style={bgColor && style === 'cards' ? { backgroundColor: bgColor } : undefined}>
                    <div className={cn('p-3 rounded-full mb-3', style !== 'minimal' ? 'bg-foreground/5' : '')}>
                      <Icon className="h-5 w-5" strokeWidth={1.5} style={iconColor ? { color: iconColor } : undefined} />
                    </div>
                    <p className="text-sm font-semibold">{b.label}</p>
                    {b.desc && <p className="text-xs text-muted-foreground mt-0.5">{b.desc}</p>}
                  </div>
                );
              })}
            </div>
          </section>
        );
      }

      case 'trust-bar': {
        const ICON_MAP: Record<string, any> = { Truck, RefreshCw, ShieldCheck, CreditCard, Lock, DatabaseBackup, PackageCheck, Heart, Gift, Clock, Headphones, MapPin, Zap, Award, ThumbsUp, CheckCircle, Star, Phone, Mail, Globe, Percent, Tag, Flame, BadgeCheck, Gem, Crown, Sparkles };
        const defaultTrusts = [
          { icon: 'Lock', label: 'Compra Segura' },
          { icon: 'DatabaseBackup', label: 'Dados Protegidos' },
          { icon: 'PackageCheck', label: 'Entrega Garantida' },
        ];
        const items = (section.settings?.items as { icon: string; label: string }[]) || defaultTrusts;
        const txtColor = (section.settings?.textColor as string) || '';
        const fontSize = (section.settings?.fontSize as string) || 'sm';
        const fontSizeClass = fontSize === 'xs' ? 'text-[10px] md:text-xs' : fontSize === 'base' ? 'text-sm md:text-base' : 'text-xs md:text-sm';

        return (
          <section key={section.id} className={cn('container mx-auto px-4 py-8', wrapperClass)}>
            <div className={cn('flex flex-wrap items-center justify-center gap-4 md:gap-10', fontSizeClass)} style={txtColor ? { color: txtColor } : undefined}>
              {items.map((t, i) => {
                const Icon = ICON_MAP[t.icon] || ShieldCheck;
                return (
                  <span key={i} className="flex items-center gap-1.5 md:gap-2 text-muted-foreground" style={txtColor ? { color: txtColor } : undefined}>
                    <Icon className="h-3.5 md:h-4 w-3.5 md:w-4" strokeWidth={1.5} />
                    {t.label}
                  </span>
                );
              })}
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
