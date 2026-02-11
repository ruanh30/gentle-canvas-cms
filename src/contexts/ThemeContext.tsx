import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ThemeConfig {
  // Colors
  colors: {
    primary: string;
    primaryForeground: string;
    accent: string;
    background: string;
    foreground: string;
    buyNow: string;
  };
  // Typography
  typography: {
    headingFont: string;
    bodyFont: string;
  };
  // Logo
  logo: {
    text: string;
    imageUrl: string;
    showText: boolean;
  };
  // Header
  header: {
    announcementBar: string;
    announcementEnabled: boolean;
    style: 'minimal' | 'centered' | 'classic';
    sticky: boolean;
  };
  // Hero
  hero: {
    enabled: boolean;
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
    style: 'left' | 'center' | 'right';
    overlayOpacity: number;
  };
  // Homepage
  homepage: {
    showCategories: boolean;
    showFeatured: boolean;
    showBanner: boolean;
    bannerTitle: string;
    bannerDescription: string;
    productsPerRow: 2 | 3 | 4;
  };
  // Footer
  footer: {
    showInstitutional: boolean;
    showHelp: boolean;
    showContact: boolean;
    showSocial: boolean;
    copyrightText: string;
  };
  // Layout
  layout: {
    borderRadius: 'none' | 'small' | 'medium' | 'large' | 'full';
    buttonStyle: 'filled' | 'outline' | 'ghost';
    maxWidth: 'narrow' | 'default' | 'wide';
  };
}

const defaultTheme: ThemeConfig = {
  colors: {
    primary: '#1a1a1a',
    primaryForeground: '#fafafa',
    accent: '#f5f5f5',
    background: '#ffffff',
    foreground: '#1a1a1a',
    buyNow: '#dc2626',
  },
  typography: {
    headingFont: 'Playfair Display',
    bodyFont: 'Inter',
  },
  logo: {
    text: 'MODA STORE',
    imageUrl: '',
    showText: true,
  },
  header: {
    announcementBar: 'Frete grátis acima de R$ 299',
    announcementEnabled: true,
    style: 'classic',
    sticky: true,
  },
  hero: {
    enabled: true,
    title: 'Estilo que\ndefine você',
    subtitle: 'Nova Coleção',
    description: 'Descubra peças únicas com design atemporal e qualidade premium.',
    ctaText: 'Ver coleção',
    ctaLink: '/products',
    backgroundImage: '',
    style: 'left',
    overlayOpacity: 0,
  },
  homepage: {
    showCategories: true,
    showFeatured: true,
    showBanner: true,
    bannerTitle: 'Cadastre-se e ganhe 15% OFF',
    bannerDescription: 'Use o cupom BEMVINDO na sua primeira compra.',
    productsPerRow: 4,
  },
  footer: {
    showInstitutional: true,
    showHelp: true,
    showContact: true,
    showSocial: true,
    copyrightText: '© 2024 {storeName}. Todos os direitos reservados.',
  },
  layout: {
    borderRadius: 'medium',
    buttonStyle: 'filled',
    maxWidth: 'default',
  },
};

interface ThemeContextType {
  theme: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  updateSection: <K extends keyof ThemeConfig>(section: K, updates: Partial<ThemeConfig[K]>) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function hexToHSL(hex: string): string {
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

function getRadiusValue(radius: ThemeConfig['layout']['borderRadius']): string {
  switch (radius) {
    case 'none': return '0rem';
    case 'small': return '0.25rem';
    case 'medium': return '0.5rem';
    case 'large': return '0.75rem';
    case 'full': return '9999px';
    default: return '0.5rem';
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem('store-theme');
    return saved ? { ...defaultTheme, ...JSON.parse(saved) } : defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('store-theme', JSON.stringify(theme));
    // Apply CSS variables
    const root = document.documentElement;
    root.style.setProperty('--primary', hexToHSL(theme.colors.primary));
    root.style.setProperty('--primary-foreground', hexToHSL(theme.colors.primaryForeground));
    root.style.setProperty('--accent', hexToHSL(theme.colors.accent));
    root.style.setProperty('--background', hexToHSL(theme.colors.background));
    root.style.setProperty('--foreground', hexToHSL(theme.colors.foreground));
    root.style.setProperty('--buy-now', hexToHSL(theme.colors.buyNow));
    root.style.setProperty('--radius', getRadiusValue(theme.layout.borderRadius));
    // Fonts
    root.style.setProperty('--font-heading', theme.typography.headingFont);
    root.style.setProperty('--font-body', theme.typography.bodyFont);
  }, [theme]);

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    setTheme(prev => ({ ...prev, ...updates }));
  };

  const updateSection = <K extends keyof ThemeConfig>(section: K, updates: Partial<ThemeConfig[K]>) => {
    setTheme(prev => ({ ...prev, [section]: { ...prev[section], ...updates } }));
  };

  const resetTheme = () => setTheme(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, updateSection, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export { defaultTheme };
