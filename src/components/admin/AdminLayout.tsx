import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard, Package, ShoppingCart, Users, Tag, Settings, LogOut, ChevronLeft, ChevronRight, Store, Paintbrush,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { label: 'Pedidos', icon: ShoppingCart, path: '/admin/orders' },
  { label: 'Produtos', icon: Package, path: '/admin/products' },
  { label: 'Clientes', icon: Users, path: '/admin/customers' },
  { label: 'Cupons', icon: Tag, path: '/admin/coupons' },
  { label: 'Configurações', icon: Settings, path: '/admin/settings' },
  { label: 'Personalização', icon: Paintbrush, path: '/admin/customization' },
];

export function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  if (!user || (user.role !== 'admin' && user.role !== 'manager')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-display font-bold">Acesso restrito</h1>
          <p className="text-muted-foreground font-body">Faça login como administrador.</p>
          <Link to="/login"><Button className="font-body">Login</Button></Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen flex bg-secondary/30">
      {/* Sidebar */}
      <aside className={cn(
        'bg-background border-r flex flex-col transition-all duration-200 sticky top-0 h-screen',
        collapsed ? 'w-16' : 'w-60'
      )}>
        <div className="p-4 border-b flex items-center justify-between">
          {!collapsed && (
            <Link to="/admin" className="font-display font-bold text-lg truncate">Admin</Link>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1 hover:bg-secondary rounded-md transition-colors ml-auto">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {navItems.map(item => {
            const active = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  active ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Store className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Ver loja</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Sair</span>}
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <header className="bg-background border-b px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">
              {navItems.find(n => location.pathname === n.path || (n.path !== '/admin' && location.pathname.startsWith(n.path)))?.label || 'Admin'}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground font-body">{user.name}</span>
              <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold">
                {user.name[0]}
              </div>
            </div>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
