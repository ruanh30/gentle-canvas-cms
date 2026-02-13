/**
 * Server-side StoreHeader (Inertia) — NO react-router-dom
 * Full-featured: announcement bar, banner below, logo, nav, search, icons
 */
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { ShoppingBag, Search, User, Menu, Heart, X } from 'lucide-react';
import { cn } from '@/lib/utils';

function AnnouncementBar() {
  const { theme } = useTheme();
  const a = theme.header?.announcement;
  const [currentIdx, setCurrentIdx] = useState(0);
  const enabled = a?.enabled ?? false;
  const validMsgs = enabled ? (a?.messages ?? []).filter(Boolean) : [];

  useEffect(() => {
    if (!enabled || !a || a.style === 'static' || validMsgs.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % validMsgs.length);
    }, a.speed * 1000);
    return () => clearInterval(interval);
  }, [enabled, a?.style, a?.speed, validMsgs.length]);

  if (!enabled || validMsgs.length === 0) return null;

  const direction = a!.direction || 'rtl';

  if (a.style === 'ticker') {
    return (
      <div
        className="overflow-hidden text-xs py-1.5"
        style={{ backgroundColor: a.backgroundColor, color: a.textColor }}
      >
        <div
          className={cn('whitespace-nowrap inline-block', direction === 'rtl' ? 'animate-ticker' : 'animate-ticker-ltr')}
          style={{ animationDuration: `${a.speed * validMsgs.length * 3}s` }}
        >
          {validMsgs.map((m, i) => <span key={i} className="mx-8">{m}</span>)}
          {validMsgs.map((m, i) => <span key={`dup-${i}`} className="mx-8">{m}</span>)}
        </div>
      </div>
    );
  }

  if (a.style === 'carousel' && validMsgs.length > 1) {
    return (
      <div
        className="text-center text-xs py-1.5 relative overflow-hidden h-7"
        style={{ backgroundColor: a.backgroundColor, color: a.textColor }}
      >
        {validMsgs.map((msg, i) => (
          <div
            key={i}
            className={cn(
              'absolute inset-0 flex items-center justify-center transition-all duration-500',
              i === currentIdx ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
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
      className="text-center text-xs py-1.5 tracking-wide"
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
    <img src={bb.imageUrl} alt="Banner" className="w-full object-cover" style={{ height: bb.height }} />
  ) : (
    <div className="w-full bg-secondary flex items-center justify-center" style={{ height: bb?.height || 60 }}>
      <span className="text-muted-foreground text-sm">Banner (configure a URL da imagem)</span>
    </div>
  );

  if (bb?.link) {
    return <a href={bb.link} className="block">{content}</a>;
  }
  return <div>{content}</div>;
}

interface StoreHeaderProps {
  categories?: Array<{ id: string; name: string; slug: string }>;
  cartItemCount?: number;
}

export function StoreHeader({ categories = [], cartItemCount = 0 }: StoreHeaderProps) {
  const { theme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = categories.slice(0, 6);
  const h: any = theme.header ?? {};
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
        <div
          className={cn(
            'flex items-center',
            isCentered ? 'justify-center relative' : 'justify-between'
          )}
          style={{ height: h.height || 64 }}
        >
          {/* Mobile menu toggle */}
          <button
            className={cn('lg:hidden p-2', isCentered && 'absolute left-0')}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <a href="./" className="flex items-center gap-2">
            {theme.logo.imageUrl && (
              <img src={theme.logo.imageUrl} alt="Logo" style={{ maxHeight: theme.logo.maxHeight }} className="object-contain" />
            )}
            {theme.logo.showText && (
              <span className="font-bold text-xl md:text-2xl tracking-tight">
                {theme.logo.text}
              </span>
            )}
            {!theme.logo.imageUrl && !theme.logo.showText && (
              <span className="font-bold text-lg">{theme.logo.text || 'Loja'}</span>
            )}
          </a>

          {/* Desktop nav */}
          {h.layout !== 'hamburger-only' && h.layout !== 'centered' && navLinks.length > 0 && (
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(cat => (
                <a
                  key={cat.id}
                  href={`./shop?category=${encodeURIComponent(cat.slug)}`}
                  className="font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wider"
                  style={{
                    fontSize: h.menuFontSize || 14,
                    textTransform: h.menuUppercase ? 'uppercase' : 'none',
                    letterSpacing: `${h.menuLetterSpacing || 0.05}em`,
                  }}
                >
                  {cat.name}
                </a>
              ))}
            </nav>
          )}

          {/* Icons */}
          <div className={cn('flex items-center gap-1', isCentered && 'absolute right-0')}>
            {h.showSearch && (
              <button className="p-2 hover:bg-secondary rounded-md transition-colors" onClick={() => setSearchOpen(!searchOpen)}>
                <Search style={{ width: h.iconSize || 20, height: h.iconSize || 20 }} />
              </button>
            )}
            {h.showWishlist && (
              <a href="./customer/wishlist" className="p-2 hover:bg-secondary rounded-md transition-colors">
                <Heart style={{ width: h.iconSize || 20, height: h.iconSize || 20 }} />
              </a>
            )}
            {h.showAccount && (
              <a href="./customer/login" className="p-2 hover:bg-secondary rounded-md transition-colors">
                <User style={{ width: h.iconSize || 20, height: h.iconSize || 20 }} />
              </a>
            )}
            {h.showCart && (
              <a href="./cart" className="p-2 hover:bg-secondary rounded-md transition-colors relative">
                <ShoppingBag style={{ width: h.iconSize || 20, height: h.iconSize || 20 }} />
                {cartItemCount > 0 && h.cartBadgeStyle !== 'none' && (
                  <span className="absolute -top-0.5 -right-0.5 bg-foreground text-background text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {h.cartBadgeStyle === 'count' ? cartItemCount : '●'}
                  </span>
                )}
              </a>
            )}
          </div>
        </div>

        {/* Centered layout nav below */}
        {h.layout === 'centered' && navLinks.length > 0 && (
          <nav className="hidden lg:flex items-center justify-center gap-8 pb-3">
            {navLinks.map(cat => (
              <a
                key={cat.id}
                href={`./shop?category=${encodeURIComponent(cat.slug)}`}
                className="font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wider"
                style={{
                  fontSize: h.menuFontSize || 14,
                  textTransform: h.menuUppercase ? 'uppercase' : 'none',
                }}
              >
                {cat.name}
              </a>
            ))}
          </nav>
        )}

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-4 animate-in slide-in-from-top-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <form action="./shop-search" method="GET">
                <input
                  name="search"
                  placeholder="Buscar produtos..."
                  className="w-full pl-10 pr-4 py-2 bg-secondary border-0 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                  onKeyDown={(e) => { if (e.key === 'Escape') setSearchOpen(false); }}
                />
              </form>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t py-4 space-y-3 animate-in slide-in-from-top-2">
            <a href="./" className="block text-base font-semibold">Início</a>
            <a href="./shop" className="block text-base hover:text-foreground/80 transition-colors">Todos os Produtos</a>
            {navLinks.map(cat => (
              <a
                key={cat.id}
                href={`./shop?category=${encodeURIComponent(cat.slug)}`}
                className="block text-base hover:text-foreground/80 transition-colors"
              >
                {cat.name}
              </a>
            ))}
          </nav>
        )}
      </div>

      <BannerBelow />
    </header>
  );
}
