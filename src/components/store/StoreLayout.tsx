import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { StoreHeader } from './StoreHeader';
import { StoreFooter } from './StoreFooter';
import { useTheme } from '@/contexts/ThemeContext';
import { MessageCircle } from 'lucide-react';
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
      <MessageCircle className="h-5 w-5" />
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
