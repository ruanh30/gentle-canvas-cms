import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Palette, Package, Menu, ImageIcon, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/admin/customization', label: 'Personalização', icon: Palette },
  { to: '/admin/products', label: 'Produtos', icon: Package },
  { to: '/admin/menu', label: 'Menu', icon: Menu },
  { to: '/admin/media', label: 'Mídia', icon: ImageIcon },
];

export function AdminLayout() {
  const location = useLocation();
  const isCustomization = location.pathname === '/admin/customization';

  // Customization uses its own fullscreen layout
  if (isCustomization) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-56 border-r border-border bg-card flex flex-col shrink-0">
        <div className="h-14 flex items-center px-4 border-b border-border">
          <NavLink to="/" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="h-3.5 w-3.5" />
            Voltar à loja
          </NavLink>
        </div>

        <div className="px-3 pt-4 pb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
            Administração
          </span>
        </div>

        <nav className="flex-1 px-2 space-y-0.5">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                )
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <p className="text-[10px] text-muted-foreground/50 text-center">Painel Admin</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
