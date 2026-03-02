import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { StoreHeader } from './StoreHeader';
import { StoreFooter } from './StoreFooter';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

function WhatsAppButton() {
  const { theme } = useTheme();
  const w = theme.whatsapp;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!w.enabled) return;
    const timer = setTimeout(() => setVisible(true), w.delay * 1000);
    return () => clearTimeout(timer);
  }, [w.enabled, w.delay]);

  if (!w.enabled || !visible) return null;

  const url = `https://wa.me/${w.number.replace(/\D/g, '')}?text=${encodeURIComponent(w.message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'fixed z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg text-white transition-all hover:scale-105',
        w.position === 'bottom-left' ? 'bottom-6 left-6' : 'bottom-6 right-6',
      )}
      style={{ backgroundColor: w.backgroundColor }}
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white flex-shrink-0" aria-hidden="true">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.924 15.924 0 0016.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.338 22.614c-.39 1.1-2.292 2.104-3.154 2.168-.862.064-1.67.388-5.626-1.17-4.764-1.874-7.762-6.756-7.996-7.068-.234-.312-1.904-2.528-1.904-4.824s1.204-3.42 1.632-3.888c.428-.468.936-.586 1.248-.586.312 0 .624.002.898.016.288.014.674-.11.054 1.248-.62 1.358-2.184 5.322-2.378 5.712-.194.39-.324.844-.064 1.36.26.518 1.164 1.902 2.502 3.082 1.72 1.516 3.168 1.986 3.614 2.206.448.22.708.186 968-.106.26-.292 1.092-1.274 1.382-1.712.29-.438.578-.364.976-.22.398.142 2.526 1.192 2.958 1.408.432.218.72.326.826.506.104.182.104 1.054-.286 2.154z"/>
      </svg>
      {w.showLabel && <span className="text-sm font-medium">{w.label}</span>}
    </a>
  );
}

export function StoreLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <StoreFooter />
      <WhatsAppButton />
    </div>
  );
}
