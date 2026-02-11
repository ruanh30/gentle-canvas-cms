import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { mockCategories } from '@/data/mock';
import { cn } from '@/lib/utils';

export function StoreHeader() {
  const { itemCount } = useCart();
  const { user } = useAuth();
  const { theme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = mockCategories.slice(0, 5);
  const h = theme.header;
  const ann = h.announcement;
  const isMinimal = h.layout === 'minimal' || h.layout === 'hamburger-only';
  const isCentered = h.layout === 'centered' || h.layout === 'logo-center-nav-left';

  return (
    <header className={cn(
      'z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80',
      h.borderBottom && 'border-b',
      h.sticky && 'sticky top-0'
    )}>
      {/* Announcement bar */}
      {ann.enabled && !isMinimal && (
        <div
          className="text-center text-xs py-1.5 font-body tracking-wide"
          style={{ backgroundColor: ann.backgroundColor, color: ann.textColor }}
        >
          {ann.messages[0] || ''}
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className={cn(
          'flex items-center',
          isCentered ? 'justify-center relative' : 'justify-between'
        )} style={{ height: h.height }}>
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn('lg:hidden', isCentered && 'absolute left-0')}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-lg font-display font-semibold">Início</Link>
                {navLinks.map(cat => (
                  <Link key={cat.id} to={`/products?category=${cat.slug}`} className="text-base hover:text-foreground/80 transition-colors">
                    {cat.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
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

          {/* Desktop nav */}
          {h.layout !== 'hamburger-only' && h.layout !== 'centered' && (
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(cat => (
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

          {/* Actions */}
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
                  <ShoppingBag style={{ width: h.iconSize, height: h.iconSize }} />
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

        {/* Centered nav below logo */}
        {h.layout === 'centered' && (
          <nav className="hidden lg:flex items-center justify-center gap-8 pb-3">
            {navLinks.map(cat => (
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

        {/* Search bar */}
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
    </header>
  );
}
