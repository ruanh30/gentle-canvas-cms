import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu } from 'lucide-react';
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

  return (
    <header className={cn(
      'z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b',
      theme.header.sticky && 'sticky top-0'
    )}>
      {/* Top bar */}
      {theme.header.announcementEnabled && theme.header.style !== 'minimal' && (
        <div className="bg-primary text-primary-foreground text-center text-xs py-1.5 font-body tracking-wide">
          {theme.header.announcementBar}
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className={cn(
          'flex items-center h-16',
          theme.header.style === 'centered' ? 'justify-center relative' : 'justify-between'
        )}>
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn('lg:hidden', theme.header.style === 'centered' && 'absolute left-0')}>
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
              <img src={theme.logo.imageUrl} alt="Logo" className="h-8 object-contain" />
            )}
            {theme.logo.showText && (
              <span className="font-display text-xl md:text-2xl font-bold tracking-tight">
                {theme.logo.text}
              </span>
            )}
          </Link>

          {/* Desktop nav - hidden in centered */}
          {theme.header.style !== 'centered' && (
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(cat => (
                <Link
                  key={cat.id}
                  to={`/products?category=${cat.slug}`}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Actions */}
          <div className={cn('flex items-center gap-1', theme.header.style === 'centered' && 'absolute right-0')}>
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="h-5 w-5" />
            </Button>
            <Link to={user ? '/account' : '/login'}>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-foreground text-background text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Centered nav below logo */}
        {theme.header.style === 'centered' && (
          <nav className="hidden lg:flex items-center justify-center gap-8 pb-3">
            {navLinks.map(cat => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
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
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setSearchOpen(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
