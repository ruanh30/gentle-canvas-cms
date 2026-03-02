import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, Heart, ShoppingCart, Plus, PackagePlus, Store, type LucideIcon } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { mockCategories } from '@/data/mock';
import { cn } from '@/lib/utils';

function AnnouncementBar() {
  const { theme } = useTheme();
  const a = theme.header?.announcement ?? { enabled: false, messages: [], speed: 5, backgroundColor: '#1a1a1a', textColor: '#fafafa', showIcon: false, icon: 'truck', link: '', pauseOnHover: true, style: 'static' as const, direction: 'rtl' as const, pageRules: 'all' as const, scheduleEnabled: false, scheduleStart: '', scheduleEnd: '', segmentation: 'all' as const, ctaText: '', ctaLink: '', utmSource: '', utmMedium: '', utmCampaign: '' };
  const [currentIdx, setCurrentIdx] = useState(0);
  const validMsgs = a.messages.filter(Boolean);

  useEffect(() => {
    if (a.style === 'static' || validMsgs.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % validMsgs.length);
    }, a.speed * 1000);
    return () => clearInterval(interval);
  }, [a.style, a.speed, validMsgs.length]);

  if (!a.enabled || validMsgs.length === 0) return null;

  const direction = a.direction || 'rtl';

  if (a.style === 'ticker') {
    return (
      <div
        className="overflow-hidden text-xs py-1.5 font-body"
        style={{ backgroundColor: a.backgroundColor, color: a.textColor }}
      >
        <div
          className={cn('whitespace-nowrap inline-block', direction === 'rtl' ? 'animate-ticker' : 'animate-ticker-ltr')}
          style={{ animationDuration: `${a.speed * validMsgs.length * 3}s` }}
        >
          {validMsgs.map((m, i) => (
            <span key={i} className="mx-8">{m}</span>
          ))}
          {validMsgs.map((m, i) => (
            <span key={`dup-${i}`} className="mx-8">{m}</span>
          ))}
        </div>
      </div>
    );
  }

  if (a.style === 'carousel' && validMsgs.length > 1) {
    const slideDir = direction === 'ltr' ? 'translate-y-4' : '-translate-y-4';
    return (
      <div
        className="text-center text-xs py-1.5 font-body relative overflow-hidden h-7"
        style={{ backgroundColor: a.backgroundColor, color: a.textColor }}
      >
        {validMsgs.map((msg, i) => (
          <div
            key={i}
            className={cn(
              'absolute inset-0 flex items-center justify-center transition-all duration-500',
              i === currentIdx ? 'opacity-100 translate-y-0' : `opacity-0 ${slideDir}`
            )}
          >
            {msg}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="text-center text-xs py-1.5 font-body tracking-wide"
      style={{ backgroundColor: a.backgroundColor, color: a.textColor }}
    >
      {validMsgs[0]}
    </div>
  );
}

function BannerBelow() {
  const { theme } = useTheme();
  const bb = theme.header?.bannerBelow;
  const [currentImg, setCurrentImg] = useState(0);

  const allImages = [bb?.imageUrl, ...(bb?.images || [])].filter(Boolean);

  useEffect(() => {
    if (!bb?.carousel || allImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImg(prev => (prev + 1) % allImages.length);
    }, (bb?.carouselSpeed || 5) * 1000);
    return () => clearInterval(interval);
  }, [bb?.carousel, allImages.length, bb?.carouselSpeed]);

  if (!bb?.enabled) return null;

  if (bb?.carousel && allImages.length > 1) {
    return (
      <div className="relative overflow-hidden" style={{ height: bb.height }}>
        {allImages.map((img, i) => (
          <div
            key={i}
            className={cn(
              'absolute inset-0 transition-opacity duration-700',
              i === currentImg ? 'opacity-100' : 'opacity-0'
            )}
          >
            {img ? (
              <img src={img} alt="Banner" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Banner {i + 1}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  const content = bb?.imageUrl ? (
    <img
      src={bb!.imageUrl}
      alt="Banner"
      className="w-full object-cover"
      style={{ height: bb!.height }}
    />
  ) : (
    <div className="w-full bg-secondary flex items-center justify-center" style={{ height: bb?.height || 60 }}>
      <span className="text-muted-foreground text-sm">Banner (configure a URL da imagem)</span>
    </div>
  );

  if (bb?.link) {
    return <Link to={bb.link} className="block">{content}</Link>;
  }
  return <div>{content}</div>;
}

const headerCartIconMap: Record<string, LucideIcon> = { ShoppingBag, ShoppingCart, Plus, PackagePlus, Heart, Store };

export function StoreHeader() {
  const { itemCount } = useCart();
  const { user } = useAuth();
  const { theme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const CartIconComponent = headerCartIconMap[theme.productCard?.addToCartIcon || ''] || ShoppingBag;

  const mm = theme.megaMenu;
  const hasCustomMenu = mm && mm.items && mm.items.length > 0;
  const h = theme.header ?? {} as any;
  const isMinimal = h.layout === 'minimal' || h.layout === 'hamburger-only';
  const isCentered = h.layout === 'centered' || h.layout === 'logo-center-nav-left';

  return (
    <header className={cn(
      'z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80',
      h.borderBottom && 'border-b',
      h.sticky && 'sticky top-0'
    )}>
      {!isMinimal && <AnnouncementBar />}

      <div className="container mx-auto px-4">
        <div className={cn(
          'flex items-center',
          isCentered ? 'justify-center relative' : 'justify-between'
        )} style={{ height: h.height }}>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn('lg:hidden', isCentered && 'absolute left-0')}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-lg font-display font-semibold">Início</Link>
                {hasCustomMenu ? mm!.items.map(mi => (
                  <div key={mi.id}>
                    <Link to={mi.link || '#'} className="text-base hover:text-foreground/80 transition-colors" {...(mi.openNewTab ? { target: '_blank', rel: 'noopener' } : {})}>
                      {mi.label}
                      {mm!.showBadges && mi.badge && (
                        <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: mi.badgeColor, color: '#fff' }}>{mi.badge}</span>
                      )}
                    </Link>
                    {mi.children.length > 0 && (
                      <div className="ml-4 mt-2 flex flex-col gap-2">
                        {mi.children.map(sub => (
                          <Link key={sub.id} to={sub.link || '#'} className="text-sm text-muted-foreground hover:text-foreground transition-colors" {...(sub.openNewTab ? { target: '_blank', rel: 'noopener' } : {})}>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )) : mockCategories.slice(0, 5).map(cat => (
                  <Link key={cat.id} to={`/products?category=${cat.slug}`} className="text-base hover:text-foreground/80 transition-colors">
                    {cat.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-2">
            {theme.logo.imageUrl && (
              <img src={theme.logo.imageUrl} alt="Logo" style={{ maxHeight: theme.logo.maxHeight }} className="object-contain" />
            )}
            {theme.logo.showText && (
              <span className="font-display text-xl md:text-2xl font-bold tracking-tight">
                {theme.logo.text}
              </span>
            )}
          </Link>

          {h.layout !== 'hamburger-only' && h.layout !== 'centered' && (
            <nav className="hidden lg:flex items-center gap-8">
              {hasCustomMenu ? mm!.items.map(mi => (
                <Link
                  key={mi.id}
                  to={mi.link || '#'}
                  className="font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wider"
                  style={{
                    fontSize: h.menuFontSize,
                    textTransform: h.menuUppercase ? 'uppercase' : 'none',
                    letterSpacing: `${h.menuLetterSpacing}em`,
                  }}
                  {...(mi.openNewTab ? { target: '_blank', rel: 'noopener' } : {})}
                >
                  {mi.label}
                </Link>
              )) : mockCategories.slice(0, 5).map(cat => (
                <Link
                  key={cat.id}
                  to={`/products?category=${cat.slug}`}
                  className="font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wider"
                  style={{
                    fontSize: h.menuFontSize,
                    textTransform: h.menuUppercase ? 'uppercase' : 'none',
                    letterSpacing: `${h.menuLetterSpacing}em`,
                  }}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          )}

          <div className={cn('flex items-center gap-1', isCentered && 'absolute right-0')}>
            {h.showSearch && (
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(!searchOpen)}>
                <Search style={{ width: h.iconSize, height: h.iconSize }} />
              </Button>
            )}
            {h.showWishlist && (
              <Button variant="ghost" size="icon">
                <Heart style={{ width: h.iconSize, height: h.iconSize }} />
              </Button>
            )}
            {h.showAccount && (
              <Link to={user ? '/account' : '/login'}>
                <Button variant="ghost" size="icon">
                  <User style={{ width: h.iconSize, height: h.iconSize }} />
                </Button>
              </Link>
            )}
            {h.showCart && (
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon">
                  <CartIconComponent style={{ width: h.iconSize, height: h.iconSize }} />
                  {itemCount > 0 && h.cartBadgeStyle !== 'none' && (
                    <span className="absolute -top-1 -right-1 bg-foreground text-background text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {h.cartBadgeStyle === 'count' ? itemCount : '●'}
                    </span>
                  )}
                </Button>
              </Link>
            )}
          </div>
        </div>

        {h.layout === 'centered' && (
          <nav className="hidden lg:flex items-center justify-center gap-8 pb-3">
            {hasCustomMenu ? mm!.items.map(mi => (
              <Link
                key={mi.id}
                to={mi.link || '#'}
                className="font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wider"
                style={{
                  fontSize: h.menuFontSize,
                  textTransform: h.menuUppercase ? 'uppercase' : 'none',
                }}
                {...(mi.openNewTab ? { target: '_blank', rel: 'noopener' } : {})}
              >
                {mi.label}
              </Link>
            )) : mockCategories.slice(0, 5).map(cat => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wider"
                style={{
                  fontSize: h.menuFontSize,
                  textTransform: h.menuUppercase ? 'uppercase' : 'none',
                }}
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        )}

        {searchOpen && (
          <div className="pb-4 animate-in slide-in-from-top-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos..."
                className="pl-10 bg-secondary border-0"
                autoFocus
                onKeyDown={(e) => { if (e.key === 'Escape') setSearchOpen(false); }}
              />
            </div>
          </div>
        )}
      </div>

      <BannerBelow />
    </header>
  );
}
