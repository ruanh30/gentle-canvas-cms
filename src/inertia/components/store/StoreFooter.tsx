/**
 * Server-side StoreFooter (Inertia) — NO react-router-dom
 * Full-featured: columns, social links, newsletter, back-to-top
 */
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Instagram, Facebook, Twitter, Youtube, ArrowUp } from 'lucide-react';

const socialIconMap: Record<string, React.FC<{ className?: string }>> = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  youtube: Youtube,
};

export function StoreFooter() {
  const { theme } = useTheme();
  const f = theme.footer;
  const storeName = theme.logo.text || 'Loja';
  const copyright = f.copyrightText?.replace('{storeName}', storeName) ?? `© ${new Date().getFullYear()} ${storeName}`;

  return (
    <footer className="mt-20" style={{ backgroundColor: f.backgroundColor, color: f.textColor }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div>
            <h3 className="text-lg font-bold mb-4">{storeName}</h3>
            {f.showNewsletter && (
              <div className="space-y-2">
                <p className="text-sm font-semibold">{f.newsletterTitle || 'Newsletter'}</p>
                <p className="text-sm opacity-70">{f.newsletterDescription}</p>
                <form action="./subscribe" method="POST" className="flex gap-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Seu e-mail"
                    className="flex-1 px-3 py-2 rounded-md text-sm bg-white/10 border border-white/20 placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-white/30"
                  />
                  <button type="submit" className="px-4 py-2 rounded-md text-sm font-medium bg-white/20 hover:bg-white/30 transition-colors">
                    Assinar
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Dynamic columns */}
          {f.columns?.filter(c => c.enabled).map((col, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">{col.title}</h4>
              <ul className="space-y-2 text-sm" style={{ color: `${f.textColor}b3` }}>
                {col.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} className="hover:opacity-100 transition-opacity opacity-70">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social links */}
        {f.showSocial && f.socialLinks?.length > 0 && (
          <div className="flex gap-3 mt-8">
            {f.socialLinks.map((s, i) => {
              const Icon = socialIconMap[s.platform] || Instagram;
              return (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        )}

        {/* Bottom bar */}
        <div className="border-t mt-8 pt-8 text-center text-xs opacity-50" style={{ borderColor: `${f.textColor}1a` }}>
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
                <a key={i} href={link.url} className="hover:opacity-100 opacity-70">{link.label}</a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
