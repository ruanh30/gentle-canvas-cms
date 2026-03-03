import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { House, LayoutGrid, ShoppingBag, CircleUserRound } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ICON_MAP } from '@/components/store/StoreHeader';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const location = useLocation();
  const { itemCount } = useCart();
  const { user } = useAuth();
  const { theme } = useTheme();

  const h = theme.header as Record<string, any> || {};

  // Herda ícones configurados pelo lojista no header
  const CartIcon = ICON_MAP[h?.cartIcon || ''] || ShoppingBag;
  const AccountIcon = ICON_MAP[h?.accountIcon || ''] || CircleUserRound;

  const navItems = [
    { label: 'Início', icon: House, path: '/' },
    { label: 'Categorias', icon: LayoutGrid, path: '/products' },
    { label: 'Carrinho', icon: CartIcon, path: '/cart' },
    { label: 'Conta', icon: AccountIcon, path: '/account' },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t border-border/30 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="grid grid-cols-4 h-12">
        {navItems.map(item => {
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);

          const href =
            item.path === '/account' && !user ? '/login' : item.path;

          return (
            <Link
              key={item.path}
              to={href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors relative',
                'active:scale-95 touch-manipulation',
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground/60'
              )}
            >
              <div className="relative">
                <item.icon
                  className={cn(
                    'h-4 w-4 transition-all',
                    isActive && 'scale-105'
                  )}
                  strokeWidth={isActive ? 1.8 : 1.4}
                />
                {item.path === '/cart' && itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-foreground text-background text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
              <span>{item.label}</span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-foreground" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
