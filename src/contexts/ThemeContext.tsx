/* cache-bust-v4 */
import React, { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { ThemeConfig, ThemeVersion, ThemeHomepageSection } from '@/types/theme';
import { defaultThemeConfig } from '@/data/theme-presets';
import { mockCollections } from '@/data/mock';

// ============================================================
// Provider Props — standalone (localStorage) + Inertia (server) modes
// ============================================================

export interface ThemeProviderProps {
  children: ReactNode;
  /** Initial draft from server (Inertia mode) */
  initialDraft?: Partial<ThemeConfig> | Record<string, unknown>;
  /** Initial published from server (Inertia mode) */
  initialPublished?: Partial<ThemeConfig> | Record<string, unknown>;
  /** Callback to persist draft to server */
  onSaveDraft?: (config: ThemeConfig, label?: string) => void;
  /** Callback to publish theme on server */
  onPublish?: (label?: string) => void;
}

// ============================================================
// Helpers
// ============================================================

function hexToHSL(hex: string): string {
  if (!hex || hex[0] !== '#' || hex.length < 7) return '0 0% 0%';
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function getRadiusValue(radius: string): string {
  switch (radius) {
    case 'none': return '0rem';
    case 'small': return '0.25rem';
    case 'medium': return '0.5rem';
    case 'large': return '0.75rem';
    case 'full': return '9999px';
    default: return '0.5rem';
  }
}

function getRadiusPx(radius: string): string {
  switch (radius) {
    case 'none': return '0';
    case 'small': return '4px';
    case 'medium': return '8px';
    case 'large': return '12px';
    case 'full': return '9999px';
    default: return '8px';
  }
}

/** Dynamically load a Google Font if not already loaded */
function loadGoogleFont(fontName: string) {
  const id = `gfont-${fontName.replace(/\s+/g, '-').toLowerCase()}`;
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@300;400;500;600;700;800;900&display=swap`;
  document.head.appendChild(link);
}

function deepMerge<T>(target: T, source: Partial<T>): T {
  const result = { ...target };
  for (const key of Object.keys(source) as Array<keyof T>) {
    const val = source[key];
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      result[key] = deepMerge(result[key] as any, val as any);
    } else if (val !== undefined) {
      result[key] = val as any;
    }
  }
  return result;
}

/**
 * Apply CSS variables for both Lovable standalone (--primary etc)
 * AND Laravel/Blade premium storefront (--pm-* etc)
 */
function applyThemeCSS(t: ThemeConfig) {
  const root = document.documentElement;

  // === Lovable standalone vars (HSL for Tailwind) ===
  root.style.setProperty('--primary', hexToHSL(t.colors.primary));
  root.style.setProperty('--primary-foreground', hexToHSL(t.colors.primaryForeground));
  root.style.setProperty('--secondary', hexToHSL(t.colors.secondary));
  root.style.setProperty('--secondary-foreground', hexToHSL(t.colors.secondaryForeground));
  root.style.setProperty('--accent', hexToHSL(t.colors.accent));
  root.style.setProperty('--accent-foreground', hexToHSL(t.colors.accentForeground));
  root.style.setProperty('--background', hexToHSL(t.colors.background));
  root.style.setProperty('--foreground', hexToHSL(t.colors.foreground));
  root.style.setProperty('--muted', hexToHSL(t.colors.muted));
  root.style.setProperty('--muted-foreground', hexToHSL(t.colors.mutedForeground));
  root.style.setProperty('--border', hexToHSL(t.colors.border));
  root.style.setProperty('--buy-now', hexToHSL(t.colors.buyNow));
  root.style.setProperty('--buy-now-hover', hexToHSL(t.colors.buyNowHover));
  root.style.setProperty('--link-color', hexToHSL(t.colors.link || '#1a1a1a'));
  root.style.setProperty('--link-hover', hexToHSL(t.colors.linkHover || '#4a4a4a'));
  root.style.setProperty('--radius', getRadiusValue(t.global.borderRadius));
  // Load Google Fonts dynamically
  loadGoogleFont(t.typography.headingFont);
  loadGoogleFont(t.typography.bodyFont);

  root.style.setProperty('--font-heading', t.typography.headingFont);
  root.style.setProperty('--font-body', t.typography.bodyFont);
  root.style.setProperty('--font-size-base', `${t.typography.baseFontSize}px`);
  root.style.setProperty('--heading-weight', `${t.typography.headingWeight}`);
  root.style.setProperty('--body-weight', `${t.typography.bodyWeight}`);
  root.style.setProperty('--line-height', `${t.typography.lineHeight}`);
  root.style.setProperty('--letter-spacing', `${t.typography.letterSpacing}em`);
  root.style.setProperty('--heading-line-height', `${t.typography.headingLineHeight ?? 1.2}`);

  // Set base font on root
  root.style.fontSize = `${t.typography.baseFontSize}px`;
  root.style.fontFamily = t.typography.bodyFont;
  root.style.fontWeight = `${t.typography.bodyWeight}`;
  root.style.lineHeight = `${t.typography.lineHeight}`;
  root.style.letterSpacing = `${t.typography.letterSpacing}em`;

  // === Premium Blade storefront vars (--pm-* raw hex) ===
  // These are consumed by layout.blade.php and premium Blade partials
  root.style.setProperty('--pm-primary', t.colors.primary);
  root.style.setProperty('--pm-primary-fg', t.colors.primaryForeground);
  root.style.setProperty('--pm-secondary', t.colors.secondary);
  root.style.setProperty('--pm-secondary-fg', t.colors.secondaryForeground);
  root.style.setProperty('--pm-accent', t.colors.accent);
  root.style.setProperty('--pm-accent-fg', t.colors.accentForeground);
  root.style.setProperty('--pm-background', t.colors.background);
  root.style.setProperty('--pm-foreground', t.colors.foreground);
  root.style.setProperty('--pm-muted', t.colors.muted);
  root.style.setProperty('--pm-muted-fg', t.colors.mutedForeground);
  root.style.setProperty('--pm-border', t.colors.border);
  root.style.setProperty('--pm-buy-now', t.colors.buyNow);
  root.style.setProperty('--pm-buy-now-hover', t.colors.buyNowHover);
  root.style.setProperty('--pm-link-color', t.colors.link || '#1a1a1a');
  root.style.setProperty('--pm-link-hover', t.colors.linkHover || '#4a4a4a');
  root.style.setProperty('--color-primary', t.colors.primary);

  root.style.setProperty('--pm-font-heading', `'${t.typography.headingFont}', serif`);
  root.style.setProperty('--pm-font-body', `'${t.typography.bodyFont}', sans-serif`);
  root.style.setProperty('--pm-font-size-base', `${t.typography.baseFontSize}px`);
  root.style.setProperty('--pm-heading-weight', `${t.typography.headingWeight}`);
  root.style.setProperty('--pm-body-weight', `${t.typography.bodyWeight}`);
  root.style.setProperty('--pm-line-height', `${t.typography.lineHeight}`);
  root.style.setProperty('--pm-letter-spacing', `${t.typography.letterSpacing}px`);
  root.style.setProperty('--pm-heading-line-height', `${t.typography.headingLineHeight ?? 1.2}`);

  root.style.setProperty('--pm-radius', getRadiusPx(t.global.borderRadius));
  root.style.setProperty('--pm-container-width', t.global.containerWidth === 'full' ? '100%' : (t.global.containerMaxPx ? `${t.global.containerMaxPx}px` : '1280px'));
  root.style.setProperty('--pm-showcase-container-width', `${t.category?.containerMaxWidth ?? 1400}px`);

  // Shadow level
  const shadowMap: Record<string, string> = {
    none: 'none',
    subtle: '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.06)',
    medium: '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.06)',
    strong: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.08)',
  };
  root.style.setProperty('--pm-shadow', shadowMap[t.global.shadowLevel] || 'none');

  // Border style
  const borderWidthMap: Record<string, string> = {
    none: '0px',
    thin: '1px',
    medium: '2px',
    thick: '3px',
  };
  root.style.setProperty('--pm-border-width', borderWidthMap[t.global.borderStyle] || '0px');

  // Animation speed
  const animSpeedMap: Record<string, string> = { slow: '0.5s', normal: '0.3s', fast: '0.15s' };
  root.style.setProperty('--pm-animation-duration', t.global.animationsEnabled ? (animSpeedMap[t.global.animationSpeed] || '0.3s') : '0s');
  root.classList.toggle('pm-no-animations', !t.global.animationsEnabled);

  // Scroll behavior
  root.style.setProperty('scroll-behavior', t.global.scrollBehavior === 'auto' ? 'auto' : 'smooth');

  root.style.setProperty('--pm-header-height', `${t.header?.height ?? 64}px`);
  root.style.setProperty('--pm-icon-size', `${t.header?.iconSize ?? 20}px`);
  root.style.setProperty('--pm-menu-font-size', `${t.header?.menuFontSize ?? 14}px`);
  root.style.setProperty('--pm-menu-transform', t.header?.menuUppercase ? 'uppercase' : 'none');
  root.style.setProperty('--pm-menu-letter-spacing', `${t.header?.menuLetterSpacing ?? 0.05}em`);

  // Footer
  root.style.setProperty('--pm-footer-bg', t.footer?.backgroundColor ?? '#0f172a');
  root.style.setProperty('--pm-footer-text', t.footer?.textColor ?? '#94a3b8');

  // Buttons
  const btnRadiusMap: Record<string, string> = { none: '0px', small: '4px', medium: '8px', large: '16px', full: '9999px' };
  // Use numeric values if available, otherwise fall back to size presets
  const sizePresets: Record<string, { px: number; py: number; fontSize: number }> = {
    small: { px: 12, py: 6, fontSize: 13 },
    medium: { px: 16, py: 10, fontSize: 14 },
    large: { px: 24, py: 14, fontSize: 16 },
  };
  const preset = sizePresets[t.buttons?.size ?? 'medium'] ?? sizePresets.medium;
  const btnPx = t.buttons?.paddingX ?? preset.px;
  const btnPy = t.buttons?.paddingY ?? preset.py;
  const btnFs = t.buttons?.fontSize ?? preset.fontSize;
  root.style.setProperty('--pm-btn-radius', btnRadiusMap[t.buttons?.radius ?? 'medium'] ?? '8px');
  root.style.setProperty('--pm-btn-style', t.buttons?.style ?? 'filled');
  root.setAttribute('data-pm-btn-style', t.buttons?.style ?? 'filled');
  root.style.setProperty('--pm-btn-px', `${btnPx}px`);
  root.style.setProperty('--pm-btn-py', `${btnPy}px`);
  root.style.setProperty('--pm-btn-font-size', `${btnFs}px`);
  root.style.setProperty('--pm-btn-font-weight', `${t.buttons?.fontWeight ?? 600}`);
  root.style.setProperty('--pm-btn-transform', t.buttons?.uppercase ? 'uppercase' : 'none');
  root.style.setProperty('--pm-btn-shadow', t.buttons?.shadow ? '0 2px 8px rgba(0,0,0,0.15)' : 'none');

  // Product card
  if (t.productCard?.imageAspect) {
    const parts = t.productCard.imageAspect.split(':');
    if (parts.length === 2) root.style.setProperty('--pm-card-aspect', `${parts[0]}/${parts[1]}`);
  }
  root.style.setProperty('--pm-card-radius', getRadiusPx(t.productCard?.imageBorderRadius ?? 'medium'));
  const priceSizeMap: Record<string, string> = { small: '14px', medium: '16px', large: '20px' };
  root.style.setProperty('--pm-price-size', priceSizeMap[t.productCard?.priceSize ?? 'medium'] ?? '16px');
}

// ============================================================
// Storage keys
// ============================================================

const STORAGE_KEYS = {
  draft: 'theme-draft',
  published: 'theme-published',
  versions: 'theme-versions',
};

function migrateTheme(config: ThemeConfig): ThemeConfig {
  const c = { ...config };
  if (c.productCard) {
    const pc = { ...c.productCard };
    if (pc.buttonVisibility === 'add-only' && pc.showBuyNow === false) {
      pc.showBuyNow = true;
      pc.buttonVisibility = 'both';
      pc.addToCartStyle = 'full-width';
    }
    if (!pc.buyNowText) pc.buyNowText = 'Comprar Agora';
    if (!pc.addToCartText) pc.addToCartText = 'Adicionar ao Carrinho';
    if (!pc.buttonLayout) pc.buttonLayout = 'stacked';
    if (!pc.buttonStyle) pc.buttonStyle = 'solid';
    c.productCard = pc;
  }

  // Ensure active collections are present in homepageSections
  if (c.homepageSections) {
    const sections = [...c.homepageSections];
    const activeCollections = mockCollections.filter(col => col.active);
    const missing = activeCollections.filter(col =>
      !sections.some(s =>
        s.id === col.id ||
        s.id === `col-section-${col.id}` ||
        (s.type === 'collections' && (s.settings?.collectionId as string) === col.id)
      )
    );
    if (missing.length > 0) {
      const newSections: ThemeHomepageSection[] = missing.map(col => ({
        id: col.id,
        type: 'collections' as const,
        enabled: true,
        title: col.name,
        showTitle: true,
        settings: { collectionId: col.id },
      }));
      c.homepageSections = [...sections, ...newSections];
    }
  }

  return c;
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    if (!data) return fallback;
    const parsed = JSON.parse(data);
    if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed) && typeof fallback === 'object' && fallback !== null && !Array.isArray(fallback)) {
      return deepMerge(fallback, parsed);
    }
    return parsed;
  } catch {
    try { localStorage.removeItem(key); } catch {}
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch { /* storage full */ }
}

function checkIsPreviewMode(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('theme-preview') === 'true';
}

// ============================================================
// Context type
// ============================================================

interface ThemeContextType {
  theme: ThemeConfig;
  draft: ThemeConfig;
  versions: ThemeVersion[];
  isDirty: boolean;
  updateDraft: (updates: Partial<ThemeConfig>) => void;
  updateDraftSection: <K extends keyof ThemeConfig>(section: K, updates: Partial<ThemeConfig[K]>) => void;
  setDraftDeep: (path: string, value: unknown) => void;
  publish: (note?: string) => void;
  discardDraft: () => void;
  resetToDefault: () => void;
  applyPreset: (preset: Partial<ThemeConfig>) => void;
  rollback: (version: number) => void;
  duplicateTheme: (name: string) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  toggleSection: (sectionId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ============================================================
// Provider — dual mode: standalone (localStorage) + Inertia (server props)
// ============================================================

export function ThemeProvider({
  children,
  initialDraft,
  initialPublished,
  onSaveDraft,
  onPublish,
}: ThemeProviderProps) {
  const isInertiaMode = !!(initialDraft || initialPublished || onSaveDraft || onPublish);
  const [isPreviewMode] = useState(checkIsPreviewMode);

  // Resolve initial values: Inertia props → localStorage → defaults
  const resolveInitialPublished = (): ThemeConfig => {
    if (initialPublished && typeof initialPublished === 'object') {
      return migrateTheme(deepMerge(defaultThemeConfig, initialPublished as Partial<ThemeConfig>));
    }
    return migrateTheme(loadFromStorage(STORAGE_KEYS.published, defaultThemeConfig));
  };

  const resolveInitialDraft = (pub: ThemeConfig): ThemeConfig => {
    if (initialDraft && typeof initialDraft === 'object') {
      return migrateTheme(deepMerge(defaultThemeConfig, initialDraft as Partial<ThemeConfig>));
    }
    return migrateTheme(loadFromStorage(STORAGE_KEYS.draft, pub));
  };

  const [published, setPublished] = useState<ThemeConfig>(() => resolveInitialPublished());
  const [draft, setDraft] = useState<ThemeConfig>(() => resolveInitialDraft(resolveInitialPublished()));
  const [versions, setVersions] = useState<ThemeVersion[]>(() =>
    loadFromStorage(STORAGE_KEYS.versions, [])
  );

  const [previewTheme, setPreviewTheme] = useState<ThemeConfig | null>(null);

  const isDirty = JSON.stringify(draft) !== JSON.stringify(published);

  // Listen for postMessage from editor (preview mode only)
  useEffect(() => {
    if (!isPreviewMode) return;
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'theme-preview-update' && event.data.theme) {
        setPreviewTheme(event.data.theme);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [isPreviewMode]);

  // Persist — only in standalone mode (not Inertia, not preview)
  useEffect(() => {
    if (!isPreviewMode && !isInertiaMode) saveToStorage(STORAGE_KEYS.draft, draft);
  }, [draft, isPreviewMode, isInertiaMode]);
  useEffect(() => {
    if (!isPreviewMode && !isInertiaMode) saveToStorage(STORAGE_KEYS.published, published);
  }, [published, isPreviewMode, isInertiaMode]);
  useEffect(() => {
    if (!isPreviewMode && !isInertiaMode) saveToStorage(STORAGE_KEYS.versions, versions);
  }, [versions, isPreviewMode, isInertiaMode]);

  // Store callback in ref to avoid re-triggering effect when parent re-renders
  const onSaveDraftRef = useRef(onSaveDraft);
  onSaveDraftRef.current = onSaveDraft;
  const onPublishRef = useRef(onPublish);
  onPublishRef.current = onPublish;

  // Auto-save draft to server in Inertia mode (debounced)
  useEffect(() => {
    if (!isInertiaMode || !onSaveDraftRef.current) return;
    const timer = setTimeout(() => {
      onSaveDraftRef.current?.(draft);
    }, 1000);
    return () => clearTimeout(timer);
  }, [draft, isInertiaMode]);

  const activeTheme = isPreviewMode && previewTheme ? previewTheme : draft;

  // Check if we're on an admin route — if so, don't apply theme CSS to the root
  // to prevent storefront colors from leaking into the editor UI
  const isAdminRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdminRoute) return; // Don't apply theme CSS on admin pages
    applyThemeCSS(activeTheme);
  }, [activeTheme, isAdminRoute]);

  // Draft mutations
  const updateDraft = useCallback((updates: Partial<ThemeConfig>) => {
    setDraft(prev => ({ ...prev, ...updates, updatedAt: new Date().toISOString() }));
  }, []);

  const updateDraftSection = useCallback(<K extends keyof ThemeConfig>(section: K, updates: Partial<ThemeConfig[K]>) => {
    setDraft(prev => ({
      ...prev,
      [section]: { ...prev[section] as any, ...updates },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const setDraftDeep = useCallback((path: string, value: unknown) => {
    setDraft(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let obj: any = next;
      for (let i = 0; i < parts.length - 1; i++) {
        if (obj[parts[i]] === undefined || obj[parts[i]] === null) {
          obj[parts[i]] = {};
        }
        obj = obj[parts[i]];
      }
      obj[parts[parts.length - 1]] = value;
      next.updatedAt = new Date().toISOString();
      return next;
    });
  }, []);

  const publish = useCallback((note = '') => {
    // In Inertia mode, delegate to server callback
    if (isInertiaMode && onPublishRef.current) {
      onPublishRef.current(note);
      // Optimistically update local state
      setPublished({ ...draft });
      return;
    }

    // Standalone mode: version locally
    const newVersion: ThemeVersion = {
      version: (versions[0]?.version || 0) + 1,
      config: { ...published },
      publishedAt: new Date().toISOString(),
      publishedBy: 'admin',
      note,
    };
    setVersions(prev => [newVersion, ...prev].slice(0, 20));
    const publishedDraft = { ...draft, version: newVersion.version + 1, updatedAt: new Date().toISOString() };
    setPublished(publishedDraft);
    setDraft(publishedDraft);
  }, [draft, published, versions, isInertiaMode]);

  const discardDraft = useCallback(() => {
    setDraft({ ...published });
  }, [published]);

  const resetToDefault = useCallback(() => {
    setDraft({ ...defaultThemeConfig, updatedAt: new Date().toISOString() });
  }, []);

  const applyPreset = useCallback((preset: Partial<ThemeConfig>) => {
    setDraft(prev => deepMerge(prev, { ...preset, updatedAt: new Date().toISOString() } as Partial<ThemeConfig>));
  }, []);

  const rollback = useCallback((version: number) => {
    const v = versions.find(v => v.version === version);
    if (v) {
      setDraft({ ...v.config, updatedAt: new Date().toISOString() });
    }
  }, [versions]);

  const duplicateTheme = useCallback((name: string) => {
    setDraft(prev => ({ ...prev, name, id: Math.random().toString(36).slice(2), updatedAt: new Date().toISOString() }));
  }, []);

  const reorderSections = useCallback((fromIndex: number, toIndex: number) => {
    setDraft(prev => {
      const sections = [...prev.homepageSections];
      const [moved] = sections.splice(fromIndex, 1);
      sections.splice(toIndex, 0, moved);
      return { ...prev, homepageSections: sections, updatedAt: new Date().toISOString() };
    });
  }, []);

  const toggleSection = useCallback((sectionId: string) => {
    setDraft(prev => ({
      ...prev,
      homepageSections: prev.homepageSections.map(s =>
        s.id === sectionId ? { ...s, enabled: !s.enabled } : s
      ),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  return (
    <ThemeContext.Provider value={{
      theme: activeTheme,
      draft,
      versions,
      isDirty,
      updateDraft,
      updateDraftSection,
      setDraftDeep,
      publish,
      discardDraft,
      resetToDefault,
      applyPreset,
      rollback,
      duplicateTheme,
      reorderSections,
      toggleSection,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

