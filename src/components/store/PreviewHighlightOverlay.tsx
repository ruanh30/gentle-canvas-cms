import React, { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

type HighlightTarget = 'sections' | 'header' | 'footer' | 'cards' | 'hero' | 'container' | 'buttons' | 'borders' | 'shadows';

const targetSelectors: Record<HighlightTarget, string> = {
  sections: '[data-highlight="section"]',
  header: '[data-highlight="header"]',
  footer: '[data-highlight="footer"]',
  cards: '[data-highlight="card"]',
  hero: '[data-highlight="hero"]',
  container: '[data-highlight="container"]',
  buttons: '[data-highlight="button"]',
  borders: '[data-highlight="section"]',
  shadows: '[data-highlight="card"]',
};

interface HighlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function PreviewHighlightOverlay() {
  const [rects, setRects] = useState<HighlightRect[]>([]);
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  const handleMessage = useCallback((e: MessageEvent) => {
    if (e.data?.type !== 'theme-highlight') return;

    const target: HighlightTarget = e.data.target;
    const duration: number = e.data.duration || 2000;
    const selector = targetSelectors[target];
    if (!selector) return;

    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;

    const newRects: HighlightRect[] = [];
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      newRects.push({
        top: rect.top + window.scrollY,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    });

    setRects(newRects);
    setVisible(true);
    setFading(false);

    // Start fade out
    setTimeout(() => setFading(true), duration - 500);
    // Remove
    setTimeout(() => {
      setVisible(false);
      setFading(false);
      setRects([]);
    }, duration);
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  if (!visible || rects.length === 0) return null;

  return (
    <>
      {rects.map((rect, i) => (
        <div
          key={i}
          className={cn(
            'absolute z-[9999] pointer-events-none rounded-lg border-2 border-primary/60',
            'transition-opacity duration-500',
            fading ? 'opacity-0' : 'opacity-100'
          )}
          style={{
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          }}
        >
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-lg bg-primary/8 animate-pulse" />
          {/* Corner accents */}
          <div className="absolute -top-0.5 -left-0.5 w-3 h-3 border-t-2 border-l-2 border-primary rounded-tl-lg" />
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 border-t-2 border-r-2 border-primary rounded-tr-lg" />
          <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 border-b-2 border-l-2 border-primary rounded-bl-lg" />
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-b-2 border-r-2 border-primary rounded-br-lg" />
        </div>
      ))}
    </>
  );
}
