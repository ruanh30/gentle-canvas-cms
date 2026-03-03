import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Instagram, Facebook, ArrowUp } from 'lucide-react';

export function StoreFooter() {
  const { theme } = useTheme();
  const f = theme.footer;
  const storeName = theme.logo.text || 'Loja';
  const copyright = f.copyrightText.replace('{storeName}', storeName);

  return (
    <footer className="mt-20" style={{ backgroundColor: f.backgroundColor, color: f.textColor }}>
      <div className="container mx-auto px-4 py-10 lg:py-12">
        {/* Mobile: 2 cols — Desktop: 4 cols */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-display text-lg font-bold mb-3">{storeName}</h3>
            {f.showNewsletter && (
              <div className="space-y-2">
                <p className="text-sm opacity-70">{f.newsletterDescription}</p>
              </div>
            )}
            {f.showSocial && (
              <div className="flex gap-3 mt-3 md:hidden">
                {f.socialLinks.map((s, i) => (
                  <a key={i} href={s.url} className="opacity-70 hover:opacity-100 transition-opacity">
                    {s.platform === 'instagram' ? <Instagram className="h-5 w-5" /> : <Facebook className="h-5 w-5" />}
                  </a>
                ))}
              </div>
            )}
          </div>
          {f.columns.filter(c => c.enabled).map((col, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-xs uppercase tracking-wider mb-3">{col.title}</h4>
              <ul className="space-y-1.5 text-sm" style={{ color: `${f.textColor}b3` }}>
                {col.links.map((link, i) => (
                  <li key={i}>
                    <Link to={link.url} className="hover:opacity-100 transition-opacity opacity-70">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {f.showSocial && (
          <div className="hidden md:flex gap-3 mt-8">
            {f.socialLinks.map((s, i) => (
              <a key={i} href={s.url} className="opacity-70 hover:opacity-100 transition-opacity">
                {s.platform === 'instagram' ? <Instagram className="h-5 w-5" /> : <Facebook className="h-5 w-5" />}
              </a>
            ))}
          </div>
        )}

        <div className="border-t mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs opacity-50" style={{ borderColor: `${f.textColor}1a` }}>
          <div className="flex items-center justify-between">
            <span>{copyright}</span>
            {f.showBackToTop && (
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="opacity-70 hover:opacity-100">
                <ArrowUp className="h-4 w-4" />
              </button>
            )}
          </div>
          {f.bottomLinks && f.bottomLinks.length > 0 && (
            <div className="flex justify-center gap-4 mt-2">
              {f.bottomLinks.map((link, i) => (
                <Link key={i} to={link.url} className="hover:opacity-100 opacity-70">{link.label}</Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
