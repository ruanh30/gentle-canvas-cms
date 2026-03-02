import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, Heart, ShoppingCart, Plus, PackagePlus, Store, ChevronDown, type LucideIcon } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { mockCategories } from '@/data/mock';
import { cn } from '@/lib/utils';
import type { ThemeMenuItem } from '@/types/theme';

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

function NavItem({ item, className, style, openNewTab, elevated, padded, hoverStyle }: {
  item: ThemeMenuItem;
  className?: string;
  style?: React.CSSProperties;
  openNewTab?: boolean;
  elevated?: boolean;
  padded?: boolean;
  hoverStyle?: string;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const hasChildren = item.children && item.children.length > 0;

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200);
  };

  const useUnderline = hoverStyle === 'underline' || hoverStyle === 'both';
  const useBgHover = hoverStyle === 'background' || hoverStyle === 'both';

  const paddingCls = padded && useBgHover
    ? 'px-3 py-2 rounded-md hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
    : padded
    ? 'px-3 py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
    : '';

  const underlineCls = useUnderline ? 'nav-link-underline' : '';

  if (!hasChildren) {
    return (
      <Link
        to={item.link || '#'}
        className={cn(className, paddingCls, underlineCls)}
        style={style}
        {...(openNewTab ? { target: '_blank', rel: 'noopener' } : {})}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link
        to={item.link || '#'}
        className={cn(className, 'inline-flex items-center gap-1.5', paddingCls, underlineCls)}
        style={style}
        {...(openNewTab ? { target: '_blank', rel: 'noopener' } : {})}
      >
        {item.label}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')} />
      </Link>
      {open && (
        <div className={cn('absolute top-full z-50 dropdown-animate', elevated ? 'left-1/2 -translate-x-1/2 pt-3' : 'left-0 pt-2')}>
          {elevated && (
            <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-popover border-l border-t border-border z-10" />
          )}
          <div className={cn(
            'bg-popover border border-border py-1.5 min-w-[180px] relative',
            elevated ? 'rounded-xl shadow-[0_8px_30px_-6px_hsl(var(--foreground)/0.12)]' : 'rounded-lg shadow-lg'
          )}>
            {item.children.map(child => (
              <Link
                key={child.id}
                to={child.link || '#'}
                className={cn(
                  'block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all duration-150',
                  elevated && 'mx-1.5 rounded-lg'
                )}
                style={style ? { fontSize: style.fontSize, letterSpacing: style.letterSpacing } : undefined}
                {...(child.openNewTab ? { target: '_blank', rel: 'noopener' } : {})}
              >
                {child.label}
                {child.badge && (
                  <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: child.badgeColor, color: '#fff' }}>{child.badge}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* Mega Menu dropdown for mega-menu style */
function MegaMenuItem({ item, className, style, openNewTab, padded, hoverStyle }: {
  item: ThemeMenuItem;
  className?: string;
  style?: React.CSSProperties;
  openNewTab?: boolean;
  padded?: boolean;
  hoverStyle?: string;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const hasChildren = item.children && item.children.length > 0;

  const handleEnter = () => { clearTimeout(timeoutRef.current); setOpen(true); };
  const handleLeave = () => { timeoutRef.current = setTimeout(() => setOpen(false), 200); };

  const useUnderline = hoverStyle === 'underline' || hoverStyle === 'both';
  const useBgHover = hoverStyle === 'background' || hoverStyle === 'both';

  const paddingCls = padded && useBgHover
    ? 'px-3 py-2 rounded-md hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
    : padded
    ? 'px-3 py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
    : '';

  const underlineCls = useUnderline ? 'nav-link-underline' : '';

  if (!hasChildren) {
    return (
      <Link to={item.link || '#'} className={cn(className, paddingCls, underlineCls)} style={style}
        {...(openNewTab ? { target: '_blank', rel: 'noopener' } : {})}>
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link to={item.link || '#'} className={cn(className, 'inline-flex items-center gap-1.5', paddingCls, underlineCls)} style={style}
        {...(openNewTab ? { target: '_blank', rel: 'noopener' } : {})}>
        {item.label}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')} />
      </Link>
      {open && (
        <div className="absolute top-full left-0 pt-3 z-50 dropdown-animate" style={{ minWidth: '480px' }}>
          <div className="absolute top-[6px] left-8 w-3 h-3 rotate-45 bg-popover border-l border-t border-border z-10" />
          <div className="bg-popover border border-border rounded-xl shadow-[0_8px_30px_-6px_hsl(var(--foreground)/0.12)] p-5 grid grid-cols-3 gap-4 relative">
            {item.children.map(child => (
              <Link key={child.id} to={child.link || '#'}
                className="block text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 px-3 py-2.5 rounded-lg transition-all duration-150"
                style={style ? { fontSize: style.fontSize, letterSpacing: style.letterSpacing } : undefined}
                {...(child.openNewTab ? { target: '_blank', rel: 'noopener' } : {})}>
                <span className="font-medium text-foreground">{child.label}</span>
                {child.badge && (
                  <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: child.badgeColor, color: '#fff' }}>{child.badge}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function StoreHeader() {
  const { itemCount } = useCart();
  const { user } = useAuth();
  const { theme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const CartIconComponent = headerCartIconMap[theme.productCard?.addToCartIcon || ''] || ShoppingBag;

  const mm = theme.megaMenu;
  const hasCustomMenu = mm && mm.items && mm.items.length > 0;
  const h = theme.header ?? {} as any;
  const isMinimal = h.layout === 'minimal' || h.layout === 'hamburger-only';
  const isCentered = h.layout === 'centered' || h.layout === 'logo-center-nav-left';

  // Scroll listener for shrink/shadow behaviors
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const baseHeight = h.height || 64;
  const shrinkActive = h.shrinkOnScroll && scrolled;
  const currentHeight = shrinkActive ? 44 : baseHeight;

  // Choose NavItemComponent based on menuStyle
  const isMegaMenu = h.menuStyle === 'mega-menu';
  const MenuItemComponent = isMegaMenu ? MegaMenuItem : NavItem;

  // Search modal open
  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };

  const renderSearchBar = () => {
    if (!h.showSearch) return null;

    if (h.searchStyle === 'inline') {
      return (
        <div className="hidden lg:block relative w-52 xl:w-72 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 group-focus-within:text-foreground transition-colors" />
          <input
            placeholder="Buscar produtos..."
            className="w-full pl-9 pr-3 h-9 text-sm bg-secondary/60 hover:bg-secondary rounded-full border-0 outline-none ring-1 ring-transparent focus:ring-border focus:bg-background transition-all duration-200 placeholder:text-muted-foreground/50"
          />
        </div>
      );
    }

    return (
      <Button variant="ghost" size="icon" onClick={handleSearchClick}>
        <Search style={{ width: h.iconSize, height: h.iconSize }} />
      </Button>
    );
  };

  const renderSearchOverlay = () => {
    if (!searchOpen || !h.showSearch || h.searchStyle === 'inline') return null;

    if (h.searchStyle === 'modal') {
      return (
        <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
          <DialogContent className="sm:max-w-lg p-0 overflow-hidden rounded-xl border-border/50 shadow-[0_16px_70px_-12px_hsl(var(--foreground)/0.2)]">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
                <input
                  placeholder="O que você está procurando?"
                  className="w-full pl-12 pr-4 h-14 text-base bg-transparent border-0 outline-none placeholder:text-muted-foreground/40"
                  autoFocus
                  onKeyDown={(e) => { if (e.key === 'Escape') setSearchOpen(false); }}
                />
              </div>
              <div className="border-t border-border/40 mt-2 pt-3">
                <p className="text-[11px] text-muted-foreground/50 uppercase tracking-wider font-medium px-1">Sugestões populares</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {['Camisetas', 'Vestidos', 'Promoções', 'Novidades'].map(tag => (
                    <span key={tag} className="px-3 py-1.5 text-xs text-muted-foreground bg-secondary/80 hover:bg-secondary rounded-full cursor-pointer transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    }

    // drawer — slides from top
    return (
      <div className="pb-4 pt-2 animate-in slide-in-from-top-2 duration-300">
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
          <input
            placeholder="O que você está procurando?"
            className="w-full pl-11 pr-4 h-11 text-sm bg-secondary/60 rounded-full border-0 outline-none ring-1 ring-border/40 focus:ring-border focus:bg-background transition-all duration-200 placeholder:text-muted-foreground/40"
            autoFocus
            onKeyDown={(e) => { if (e.key === 'Escape') setSearchOpen(false); }}
          />
        </div>
      </div>
    );
  };

  const renderNavItems = (extraClass?: string) => {
    const elevated = h.dropdownElevated ?? true;
    const padded = h.menuItemPadding ?? true;
    const hoverStyle = h.menuHoverStyle || 'underline';
    const itemStyle: React.CSSProperties = {
      fontSize: h.menuFontSize,
      fontWeight: h.menuFontWeight || 500,
      textTransform: h.menuUppercase ? 'uppercase' : 'none',
      letterSpacing: `${h.menuLetterSpacing}em`,
    };
    const itemClass = cn(
      'text-muted-foreground hover:text-foreground transition-all duration-150',
      extraClass,
    );

    if (hasCustomMenu) {
      return mm!.items.map(mi => (
        <MenuItemComponent
          key={mi.id}
          item={mi}
          elevated={elevated}
          padded={padded}
          hoverStyle={hoverStyle}
          className={itemClass}
          style={itemStyle}
          openNewTab={mi.openNewTab}
        />
      ));
    }

    const useUnderline = hoverStyle === 'underline' || hoverStyle === 'both';
    const useBgHover = hoverStyle === 'background' || hoverStyle === 'both';

    return mockCategories.slice(0, 5).map(cat => {
      return (
        <Link
          key={cat.id}
          to={`/products?category=${cat.slug}`}
          className={cn(
            itemClass,
            useUnderline && 'nav-link-underline',
            padded && useBgHover && 'px-3 py-2 rounded-md hover:bg-accent/80',
            padded && !useBgHover && 'px-3 py-2 rounded-md',
          )}
          style={itemStyle}
        >
          {cat.name}
        </Link>
      );
    });
  };

  return (
    <header className={cn(
      'z-50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 transition-all duration-300',
      (h.headerSurface ?? true) && 'border-b border-border/60 shadow-[0_1px_3px_0_hsl(var(--foreground)/0.04),0_1px_2px_-1px_hsl(var(--foreground)/0.06)]',
      !(h.headerSurface ?? true) && h.borderBottom && 'border-b border-border',
      h.shadowOnScroll && scrolled && 'shadow-md',
      h.sticky && 'sticky top-0'
    )}>
      {/* Announcement bar: hide when shrunk */}
      {!isMinimal && !shrinkActive && <AnnouncementBar />}

      <div className="container mx-auto px-4">
        {/* Main row with logo + icons: hide when shrunk */}
        {!shrinkActive && (
          <div className={cn(
            'flex items-center transition-all duration-300',
            isCentered ? 'justify-center relative' : 'justify-between'
          )} style={{ height: currentHeight }}>
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
              <nav className="hidden lg:flex items-center gap-1">
                {renderNavItems()}
              </nav>
            )}

            {h.searchStyle === 'inline' && h.showSearch && h.layout !== 'hamburger-only' && (
              <div className="hidden lg:block relative w-52 xl:w-72 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 group-focus-within:text-foreground transition-colors" />
                <input
                  placeholder="Buscar produtos..."
                  className="w-full pl-9 pr-3 h-9 text-sm bg-secondary/60 hover:bg-secondary rounded-full border-0 outline-none ring-1 ring-transparent focus:ring-border focus:bg-background transition-all duration-200 placeholder:text-muted-foreground/50"
                />
              </div>
            )}

            <div className={cn('flex items-center gap-1', isCentered && 'absolute right-0')}>
              {h.showSearch && h.searchStyle !== 'inline' && (
                <Button variant="ghost" size="icon" className="h-10 w-10" onClick={handleSearchClick}>
                  <Search style={{ width: h.iconSize, height: h.iconSize }} strokeWidth={h.iconStrokeWidth || 1.5} />
                </Button>
              )}
              {h.showWishlist && (
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Heart style={{ width: h.iconSize, height: h.iconSize }} strokeWidth={h.iconStrokeWidth || 1.5} />
                </Button>
              )}
              {h.showAccount && (
                <Link to={user ? '/account' : '/login'}>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <User style={{ width: h.iconSize, height: h.iconSize }} strokeWidth={h.iconStrokeWidth || 1.5} />
                  </Button>
                </Link>
              )}
              {h.showCart && (
                <Link to="/cart" className="relative">
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <CartIconComponent style={{ width: h.iconSize, height: h.iconSize }} strokeWidth={h.iconStrokeWidth || 1.5} />
                    {itemCount > 0 && h.cartBadgeStyle !== 'none' && (
                      <span className="absolute -top-0.5 -right-0.5 bg-foreground text-background text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {h.cartBadgeStyle === 'count' ? itemCount : '●'}
                      </span>
                    )}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* When shrunk: show ONLY the nav menu bar */}
        {shrinkActive && (
          <nav className="flex items-center justify-center gap-1 py-2">
            {renderNavItems()}
          </nav>
        )}

        {/* Centered layout sub-nav */}
        {h.layout === 'centered' && !shrinkActive && (
          <nav className="hidden lg:flex items-center justify-center gap-1 pb-3">
            {renderNavItems()}
          </nav>
        )}

        {!shrinkActive && renderSearchOverlay()}
      </div>

      {!shrinkActive && <BannerBelow />}
    </header>
  );
}
