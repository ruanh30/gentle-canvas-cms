/**
 * Hook to send highlight commands to the preview iframe.
 * 
 * Usage in editor panels:
 *   const highlight = usePreviewHighlight();
 *   highlight('sections');  // highlights all home sections
 *   highlight('header');    // highlights the header
 *   highlight('footer');    // highlights the footer
 *   highlight('cards');     // highlights product cards
 */

// Target types that can be highlighted in the preview
export type HighlightTarget = 'sections' | 'header' | 'footer' | 'cards' | 'hero' | 'container' | 'buttons' | 'borders' | 'shadows';

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

// Debounced version to avoid spamming highlights on rapid slider changes
let _timer: ReturnType<typeof setTimeout> | null = null;

export function sendPreviewHighlightDebounced(target: HighlightTarget, duration = 2000, debounce = 300) {
  if (_timer) clearTimeout(_timer);
  _timer = setTimeout(() => sendPreviewHighlight(target, duration), debounce);
}
