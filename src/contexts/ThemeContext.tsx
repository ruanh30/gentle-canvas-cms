import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { ThemeConfig, ThemeVersion } from '@/types/theme';
import { defaultThemeConfig } from '@/data/theme-presets';

// ============================================================
// Provider Props — supports standalone (localStorage) and Inertia (server) modes
// ============================================================

export interface ThemeProviderProps {
  children: ReactNode;
  /** Initial draft config from server (Inertia mode) */
  initialDraft?: ThemeConfig | Record<string, unknown>;
  /** Initial published config from server (Inertia mode) */
  initialPublished?: ThemeConfig | Record<string, unknown>;
  /** Callback to persist draft to server (Inertia mode) */
  onSaveDraft?: (config: ThemeConfig, label?: string) => void;
  /** Callback to publish theme on server (Inertia mode) */
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

function applyThemeCSS(t: ThemeConfig) {
  const root = document.documentElement;
  // Colors
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
  // Global
  root.style.setProperty('--radius', getRadiusValue(t.global.borderRadius));
  // Typography
  root.style.setProperty('--font-heading', t.typography.headingFont);
  root.style.setProperty('--font-body', t.typography.bodyFont);
  root.style.setProperty('--font-size-base', `${t.typography.baseFontSize}px`);
  root.style.setProperty('--heading-weight', `${t.typography.headingWeight}`);
  root.style.setProperty('--body-weight', `${t.typography.bodyWeight}`);
  root.style.setProperty('--line-height', `${t.typography.lineHeight}`);
  root.style.setProperty('--letter-spacing', `${t.typography.letterSpacing}em`);
  // Set base font
  root.style.fontSize = `${t.typography.baseFontSize}px`;
  root.style.fontFamily = t.typography.bodyFont;
  root.style.fontWeight = `${t.typography.bodyWeight}`;
  root.style.lineHeight = `${t.typography.lineHeight}`;
  root.style.letterSpacing = `${t.typography.letterSpacing}em`;
}

// ============================================================
// Storage keys
// ============================================================

const STORAGE_KEYS = {
  draft: 'theme-draft',
  published: 'theme-published',
  versions: 'theme-versions',
};

// Migrations: force-update fields that changed defaults across versions
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
  return c;
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    if (!data) return fallback;
    const parsed = JSON.parse(data);
    // Deep merge with defaults to fill in any missing fields from schema updates
    if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed) && typeof fallback === 'object' && fallback !== null && !Array.isArray(fallback)) {
      return deepMerge(fallback, parsed);
    }
    return parsed;
  } catch {
    // If localStorage data is corrupted, clear it and return fallback
    try { localStorage.removeItem(key); } catch {}
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch { /* storage full — ignore */ }
}

// Detect if running inside the theme editor iframe via URL parameter
// This avoids the issue of Lovable's own preview iframe triggering preview mode
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
// Provider
// ============================================================

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isPreviewMode] = useState(checkIsPreviewMode);

  const [published, setPublished] = useState<ThemeConfig>(() =>
    migrateTheme(loadFromStorage(STORAGE_KEYS.published, defaultThemeConfig))
  );
  const [draft, setDraft] = useState<ThemeConfig>(() =>
    migrateTheme(loadFromStorage(STORAGE_KEYS.draft, loadFromStorage(STORAGE_KEYS.published, defaultThemeConfig)))
  );
  const [versions, setVersions] = useState<ThemeVersion[]>(() =>
    loadFromStorage(STORAGE_KEYS.versions, [])
  );

  // Preview mode: override theme with incoming postMessage data
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

  // Persist (only in non-preview mode)
  useEffect(() => { if (!isPreviewMode) saveToStorage(STORAGE_KEYS.draft, draft); }, [draft, isPreviewMode]);
  useEffect(() => { if (!isPreviewMode) saveToStorage(STORAGE_KEYS.published, published); }, [published, isPreviewMode]);
  useEffect(() => { if (!isPreviewMode) saveToStorage(STORAGE_KEYS.versions, versions); }, [versions, isPreviewMode]);

  // The active theme for the storefront: in preview mode use previewTheme, otherwise published
  const activeTheme = isPreviewMode && previewTheme ? previewTheme : published;

  // Apply theme CSS variables
  useEffect(() => {
    applyThemeCSS(activeTheme);
  }, [activeTheme]);

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
        obj = obj[parts[i]];
      }
      obj[parts[parts.length - 1]] = value;
      next.updatedAt = new Date().toISOString();
      return next;
    });
  }, []);

  const publish = useCallback((note = '') => {
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
  }, [draft, published, versions]);

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
