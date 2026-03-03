import { StoreHeader } from '@/components/store/StoreHeader';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useRef } from 'react';

/**
 * Standalone page that renders ONLY the StoreHeader.
 * Loaded inside an iframe (375px) in AdminMenu for pixel-perfect mobile preview.
 * Receives live theme updates via postMessage from the parent admin window.
 */
export default function PreviewHeader() {
  const { updateDraft } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  // Send height to parent whenever content resizes
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const sendHeight = () => {
      window.parent.postMessage(
        { type: 'header-preview-resize', height: el.scrollHeight },
        '*'
      );
    };

    const observer = new ResizeObserver(sendHeight);
    observer.observe(el);
    sendHeight();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'admin-header-preview' && event.data.theme) {
        updateDraft(event.data.theme);
      }
    };
    window.addEventListener('message', handler);

    // Signal parent that iframe is ready
    window.parent.postMessage({ type: 'header-preview-ready' }, '*');

    return () => window.removeEventListener('message', handler);
  }, [updateDraft]);

  return (
    <div ref={containerRef} style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
      <StoreHeader />
    </div>
  );
}
