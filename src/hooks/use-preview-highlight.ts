/**
 * Sends highlight commands to the preview iframe via postMessage.
 * Used by the theme editor to show which areas are affected.
 */

export type HighlightTarget = 'sections' | 'header' | 'footer' | 'cards' | 'hero' | 'container' | 'buttons' | 'borders' | 'shadows' | 'all';

// Map editor section IDs to highlight targets
export const sectionHighlightMap: Record<string, HighlightTarget[]> = {
  presets: ['all'],
  colors: ['all'],
  typography: ['all'],
  global: ['sections'],
  buttons: ['buttons'],
  logo: ['header'],
  hero: ['hero'],
  'home-sections': ['sections'],
  footer: ['footer'],
  'product-card': ['cards'],
  category: ['cards', 'sections'],
  'quick-view': ['cards'],
  cart: [],
  checkout: [],
  microcopy: ['all'],
  conversion: ['sections', 'cards'],
  whatsapp: [],
  'custom-code': [],
};

let _iframeRef: HTMLIFrameElement | null = null;

export function setPreviewIframe(iframe: HTMLIFrameElement | null) {
  _iframeRef = iframe;
}

export function sendPreviewHighlight(target: HighlightTarget, duration = 2000) {
  if (_iframeRef?.contentWindow) {
    _iframeRef.contentWindow.postMessage(
      { type: 'theme-highlight', target, duration },
      '*'
    );
  }
}

export function clearPreviewHighlight() {
  if (_iframeRef?.contentWindow) {
    _iframeRef.contentWindow.postMessage(
      { type: 'theme-highlight-clear' },
      '*'
    );
  }
}

// Send multiple highlights at once (for sections that affect multiple areas)
export function sendPreviewHighlights(targets: HighlightTarget[], duration = 2000) {
  targets.forEach(t => sendPreviewHighlight(t, duration));
}

// Debounced version to avoid spamming highlights on rapid slider changes
let _timer: ReturnType<typeof setTimeout> | null = null;

export function sendPreviewHighlightDebounced(target: HighlightTarget, duration = 2000, debounce = 300) {
  if (_timer) clearTimeout(_timer);
  _timer = setTimeout(() => sendPreviewHighlight(target, duration), debounce);
}
