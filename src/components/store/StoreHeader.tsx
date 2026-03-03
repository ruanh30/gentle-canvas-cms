import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag, Search, User, Menu, Heart, ShoppingCart, Plus, PackagePlus, Store,
  ChevronDown, ChevronLeft, type LucideIcon,
  ScanSearch, SearchCheck, SearchCode, Telescope, Focus, ScanLine, Radar, ListFilter, Filter,
  UserRound, UserCircle, UserCircle2, UserCheck, UserCog, CircleUser, Contact, BadgeCheck, Fingerprint, LogIn,
  Package, Briefcase, HandCoins, Wallet, CreditCard, Receipt, Gem, Gift,
  House, LayoutGrid, CircleUserRound,
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { mockCategories } from '@/data/mock';
import { cn } from '@/lib/utils';
import type { ThemeMenuItem } from '@/types/theme';
import { SearchSuggestions } from '@/components/store/SearchSuggestions';

/* ================================================================== */
/*  ANNOUNCEMENT BAR                                                    */
/* ================================================================== */

function AnnouncementBar() {
  const { theme } = useTheme();
  const a = theme.header?.announcement ?? { enabled: false, messages: [], speed: 5, backgroundColor: '#1a1a1a', textColor: '#fafafa', showIcon: false, icon: 'truck', link: '', pauseOnHover: true, style: 'static' as const, direction: 'rtl' as const, pageRules: 'all' as const, scheduleEnabled: false, scheduleStart: '', scheduleEnd: '', segmentation: 'all' as const, ctaText: '', ctaLink: '', utmSource: '', utmMedium: '', utmCampaign: '' };
  const [currentIdx, setCurrentIdx] = useState(0);
  const validMsgs = a.messages.filter(Boolean);

  useEffect(() => {
    if (a.style === 'static' || validMsgs.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % validMsgs.length);
    }, a.speed * 1000);
    return () => clearInterval(interval);
  }, [a.style, a.speed, validMsgs.length]);

  if (!a.enabled || validMsgs.length === 0) return null;

  const direction = a.direction || 'rtl';

  if (a.style === 'ticker') {
    return (
      <div
        className="overflow-hidden text-xs py-1.5 font-body"
        style={{ backgroundColor: a.backgroundColor, color: a.textColor }}
      >
        <div
          className={cn('whitespace-nowrap inline-block', direction === 'rtl' ? 'animate-ticker' : 'animate-ticker-ltr')}
          style={{ animationDuration: `${a.speed * validMsgs.length * 3}s` }}
        >
          {validMsgs.map((m, i) => (
            <span key={i} className="mx-8">{m}</span>
          ))}
          {validMsgs.map((m, i) => (
            <span key={`dup-${i}`} className="mx-8">{m}</span>
          ))}
        </div>
      </div>
    );
  }

  if (a.style === 'carousel' && validMsgs.length > 1) {
    const slideDir = direction === 'ltr' ? 'translate-y-4' : '-translate-y-4';
    return (
      <div
        className="text-center text-xs py-1.5 font-body relative overflow-hidden h-7"
        style={{ backgroundColor: a.backgroundColor, color: a.textColor }}
      >
        {validMsgs.map((msg, i) => (
          <div
            key={i}
            className={cn(
              'absolute inset-0 flex items-center justify-center transition-all duration-500',
              i === currentIdx ? 'opacity-100 translate-y-0' : `opacity-0 ${slideDir}`
            )}
          >
            {msg}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="text-center text-xs py-1.5 font-body tracking-wide"
      style={{ backgroundColor: a.backgroundColor, color: a.textColor }}
    >
      {validMsgs[0]}
    </div>
  );
}

/* ================================================================== */
/*  SOCIAL BAR                                                          */
/* ================================================================== */

const SOCIAL_SVGS: Record<string, (props: { size: number }) => React.ReactElement> = {
  facebook: ({ size }) => <svg viewBox="0 0 24 24" width={size} height={size}><circle cx="12" cy="12" r="12" fill="#1877F2"/><path d="M16.671 15.469l.547-3.585h-3.44V9.59c0-.98.48-1.937 2.021-1.937h1.564V4.6s-1.42-.243-2.777-.243c-2.834 0-4.685 1.718-4.685 4.83v2.731H7.078v3.585h2.823v8.67a11.174 11.174 0 003.476 0v-8.67h2.894z" fill="#fff"/></svg>,
  whatsapp: ({ size }) => <svg viewBox="0 0 24 24" width={size} height={size}><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2z" fill="#25D366"/><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17 0-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" fill="#fff"/></svg>,
  instagram: ({ size }) => <svg viewBox="0 0 24 24" width={size} height={size}><defs><linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#FFDC80"/><stop offset="25%" stopColor="#F77737"/><stop offset="50%" stopColor="#E1306C"/><stop offset="75%" stopColor="#C13584"/><stop offset="100%" stopColor="#833AB4"/></linearGradient></defs><rect width="24" height="24" rx="5.5" fill="url(#ig)"/><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="#fff" strokeWidth="1.5"/><circle cx="12" cy="12" r="4.5" fill="none" stroke="#fff" strokeWidth="1.5"/><circle cx="17.5" cy="6.5" r="1.2" fill="#fff"/></svg>,
  tiktok: ({ size }) => <svg viewBox="0 0 24 24" width={size} height={size}><rect width="24" height="24" rx="5" fill="#010101"/><path d="M16.6 5.82s.51.64 1.57 1.08c.6.25 1.3.34 1.83.36v2.85c-.68-.03-1.34-.15-1.96-.38-.4-.15-.77-.35-1.09-.56v4.87c0 .59-.12 1.16-.35 1.7a4.3 4.3 0 01-2.46 2.37c-.53.21-1.1.32-1.69.32-1.17 0-2.24-.45-3.04-1.2a4.28 4.28 0 01-1.28-3.07c0-.57.11-1.12.33-1.64a4.3 4.3 0 014-2.72c.18 0 .36.01.54.04v2.9a1.69 1.69 0 00-.54-.09c-.94 0-1.7.76-1.7 1.7s.76 1.7 1.7 1.7c.94 0 1.7-.76 1.7-1.7V5.82h2.44z" fill="#25F4EE"/><path d="M17.2 6.42s.51.64 1.57 1.08c.6.25 1.3.34 1.83.36v2.85c-.68-.03-1.34-.15-1.96-.38-.4-.15-.77-.35-1.09-.56v4.87c0 .59-.12 1.16-.35 1.7a4.3 4.3 0 01-2.46 2.37c-.53.21-1.1.32-1.69.32-1.17 0-2.24-.45-3.04-1.2a4.28 4.28 0 01-1.28-3.07c0-.57.11-1.12.33-1.64a4.3 4.3 0 014-2.72c.18 0 .36.01.54.04v2.9a1.69 1.69 0 00-.54-.09c-.94 0-1.7.76-1.7 1.7s.76 1.7 1.7 1.7c.94 0 1.7-.76 1.7-1.7V6.42h2.44z" fill="#FE2C55"/></svg>,
  kwai: ({ size }) => <svg viewBox="0 0 24 24" width={size} height={size}><rect width="24" height="24" rx="5" fill="#FF6B00"/><path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z" fill="#fff"/><path d="M12 9l1.5 2.6 2.6 1.5-2.6 1.5L12 17.2l-1.5-2.6L7.9 13.1l2.6-1.5z" fill="#fff"/></svg>,
  youtube: ({ size }) => <svg viewBox="0 0 24 24" width={size} height={size}><rect width="24" height="24" rx="5" fill="#FF0000"/><path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#fff"/></svg>,
  linkedin: ({ size }) => <svg viewBox="0 0 24 24" width={size} height={size}><rect width="24" height="24" rx="3" fill="#0A66C2"/><path d="M7.5 9.5h-2v8h2v-8zm-1-3.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zm10 3.5h-2.1c-.1 0-.2 0-.3.01v-.01h-1.9v8h2v-4.5c0-1.1.5-1.7 1.4-1.7.8 0 1.2.5 1.2 1.5v4.7h2v-5.2c0-2.1-1.1-3.31-2.7-3.31-.9 0-1.5.3-1.9.71V9.5h2.3z" fill="#fff"/></svg>,
  twitter: ({ size }) => <svg viewBox="0 0 24 24" width={size} height={size}><rect width="24" height="24" rx="5" fill="#000"/><path d="M16.244 6.25h2.308l-5.04 5.76 5.93 7.84h-4.64l-3.64-4.76-4.16 4.76H5.69l5.39-6.16L5.44 6.25h4.76l3.29 4.35zm-.81 12.22h1.28L9.6 7.56H8.22z" fill="#fff"/></svg>,
  telegram: ({ size }) => <svg viewBox="0 0 24 24" width={size} height={size}><circle cx="12" cy="12" r="12" fill="#2AABEE"/><path d="M5.432 11.873l8.772-3.81c.41-.167.772.1.636.617l-1.494 7.04c-.112.49-.403.61-.817.38l-2.26-1.666-1.09 1.05c-.12.12-.22.22-.453.22l.16-2.3 4.2-3.8c.183-.16-.04-.25-.283-.09l-5.19 3.27-2.233-.7c-.486-.15-.495-.486.1-.72z" fill="#fff"/></svg>,
};

const SOCIAL_LABELS: Record<string, string> = {
  facebook: 'Facebook', whatsapp: 'WhatsApp', instagram: 'Instagram', tiktok: 'TikTok',
  kwai: 'Kwai', youtube: 'YouTube', linkedin: 'LinkedIn', twitter: 'X (Twitter)', telegram: 'Telegram',
};

function SocialBar() {
  const { theme } = useTheme();
  const sb = theme.header?.socialBar;
  if (!sb?.enabled) return null;
  const visibleLinks = sb.links.filter(l => l.enabled && l.url);
  if (visibleLinks.length === 0) return null;

  return (
    <div className="flex items-center gap-2.5">
      {visibleLinks.map(link => {
        const SvgIcon = SOCIAL_SVGS[link.platform];
        if (!SvgIcon) return null;
        const href = link.platform === 'whatsapp' ? `https://wa.me/${link.url.replace(/\D/g, '')}` : link.url;
        return (
          <a key={link.platform} href={href} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-all duration-150 hover:scale-110 hover:opacity-80"
            aria-label={SOCIAL_LABELS[link.platform]}>
            <SvgIcon size={sb.iconSize} />
            {sb.showLabels && <span className="text-[11px] font-medium text-muted-foreground">{SOCIAL_LABELS[link.platform]}</span>}
          </a>
        );
      })}
    </div>
  );
}

/* ==================================================================
/*  BANNER BELOW                                                        */
/* ================================================================== */

function BannerBelow() {
  const { theme } = useTheme();
  const bb = theme.header?.bannerBelow;
  const [currentImg, setCurrentImg] = useState(0);

  const allImages = [bb?.imageUrl, ...(bb?.images || [])].filter(Boolean);

  useEffect(() => {
    if (!bb?.carousel || allImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImg(prev => (prev + 1) % allImages.length);
    }, (bb?.carouselSpeed || 5) * 1000);
    return () => clearInterval(interval);
  }, [bb?.carousel, allImages.length, bb?.carouselSpeed]);

  if (!bb?.enabled) return null;

  const containerClass = bb.fullWidth ? '' : 'container mx-auto px-4';

  if (bb?.carousel && allImages.length > 1) {
    return (
      <div className={containerClass}>
        <div className="relative overflow-hidden" style={{ height: bb.height }}>
          {allImages.map((img, i) => (
            <div
              key={i}
              className={cn(
                'absolute inset-0 transition-opacity duration-700',
                i === currentImg ? 'opacity-100' : 'opacity-0'
              )}
            >
              {img ? (
                <img src={img} alt="Banner" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Banner {i + 1}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const content = bb?.imageUrl ? (
    <img
      src={bb!.imageUrl}
      alt="Banner"
      className="w-full object-cover"
      style={{ height: bb!.height }}
    />
  ) : (
    <div className="w-full bg-secondary flex items-center justify-center" style={{ height: bb?.height || 60 }}>
      <span className="text-muted-foreground text-sm">Banner (configure a URL da imagem)</span>
    </div>
  );

  const wrapped = bb?.link ? <Link to={bb.link} className="block">{content}</Link> : <div>{content}</div>;

  return <div className={containerClass}>{wrapped}</div>;
}

/* ================================================================== */
/*  ICON MAP — resolves icon choices from admin                         */
/* ================================================================== */

export const ICON_MAP: Record<string, LucideIcon> = {
  Search, SearchIcon: Search, ScanSearch, SearchCheck, SearchCode, Telescope, Focus, ScanLine, Radar, ListFilter, Filter,
  User, UserRound, UserCircle, UserCircle2, CircleUser, UserCheck, UserCog, Contact, BadgeCheck, Fingerprint, LogIn,
  ShoppingBag, ShoppingCart, Store, Package, PackagePlus, Briefcase, HandCoins, Wallet, CreditCard, Receipt, Gem, Gift, Plus,
  House, LayoutGrid, CircleUserRound,
};

/* ================================================================== */
/*  INLINE SEARCH FIELD — adaptive, always premium                      */

function InlineSearchField({ placeholder, headerBg, headerText, className, onSearch }: {
  placeholder: string;
  headerBg?: string;
  headerText?: string;
  className?: string;
  onSearch: (q: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLFormElement>(null);
  const isDark = React.useMemo(() => {
    if (!headerBg || headerBg === 'transparent') return false;
    const c = headerBg.replace(/\s/g, '');
    if (c.startsWith('#')) {
      const hex = c.slice(1);
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return (r * 0.299 + g * 0.587 + b * 0.114) < 128;
    }
    if (c.startsWith('rgba') || c.startsWith('rgb')) {
      const nums = c.match(/[\d.]+/g)?.map(Number) || [];
      if (nums.length >= 3) return (nums[0] * 0.299 + nums[1] * 0.587 + nums[2] * 0.114) < 128;
    }
    return false;
  }, [headerBg]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) { setShowSuggestions(false); onSearch(query.trim()); }
  };

  return (
    <form ref={wrapperRef} onSubmit={handleSubmit} className={cn('hidden lg:block relative w-52 xl:w-72 group', className)}>
      <div className={cn(
        'flex items-center gap-2 h-10 px-3.5 rounded-full border transition-all duration-200',
        'focus-within:ring-2 focus-within:ring-offset-1',
        isDark
          ? 'bg-white/[0.12] border-white/20 focus-within:bg-white/[0.18] focus-within:border-white/30 focus-within:ring-white/20 focus-within:ring-offset-transparent'
          : 'bg-secondary/50 border-border/50 focus-within:bg-background focus-within:border-border focus-within:ring-ring/20 focus-within:ring-offset-background hover:bg-secondary/70 hover:border-border/70',
      )}>
        <Search className={cn(
          'h-4 w-4 shrink-0 transition-colors duration-150',
          isDark
            ? 'text-white/40 group-focus-within:text-white/70'
            : 'text-muted-foreground/50 group-focus-within:text-foreground/70',
        )} />
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); setShowSuggestions(true); }}
          onFocus={() => query.trim().length >= 2 && setShowSuggestions(true)}
          placeholder={placeholder}
          className={cn(
            'flex-1 bg-transparent text-sm outline-none',
            isDark
              ? 'text-white placeholder:text-white/35'
              : 'text-foreground placeholder:text-muted-foreground/45',
          )}
        />
      </div>
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <SearchSuggestions
            query={query}
            maxResults={5}
            onSelect={() => setShowSuggestions(false)}
            onViewAll={() => { setShowSuggestions(false); onSearch(query.trim()); }}
          />
        </div>
      )}
    </form>
  );
}

/* ================================================================== */
/*  ICON MAP                                                            */
/* ================================================================== */

const headerCartIconMap: Record<string, LucideIcon> = { ShoppingBag, ShoppingCart, Plus, PackagePlus, Heart, Store };

/* ================================================================== */
/*  NAV ITEM (dropdown)                                                 */
/* ================================================================== */

function NavItem({ item, className, style, openNewTab, elevated, padded, hoverStyle }: {
  item: ThemeMenuItem;
  className?: string;
  style?: React.CSSProperties;
  openNewTab?: boolean;
  elevated?: boolean;
  padded?: boolean;
  hoverStyle?: string;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);
  const hasChildren = item.children && item.children.length > 0;

  // Touch: toggle on click; Mouse: hover open/close
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;
  const handleEnter = () => { if (!isTouchDevice) { clearTimeout(timeoutRef.current); setOpen(true); } };
  const handleLeave = () => { if (!isTouchDevice) { timeoutRef.current = setTimeout(() => setOpen(false), 200); } };
  const handleToggle = (e: React.MouseEvent) => {
    if (isTouchDevice && hasChildren) { e.preventDefault(); setOpen(v => !v); }
  };

  // Close on outside tap (touch)
  useEffect(() => {
    if (!isTouchDevice || !open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, isTouchDevice]);

  const useUnderline = hoverStyle === 'underline' || hoverStyle === 'both';
  const useBgHover = hoverStyle === 'background' || hoverStyle === 'both';

  const paddingCls = padded && useBgHover
    ? 'px-3 py-2 rounded-md hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
    : padded
    ? 'px-3 py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
    : '';

  const underlineCls = useUnderline ? 'nav-link-underline' : '';

  if (!hasChildren) {
    return (
      <Link
        to={item.link || '#'}
        className={cn(className, paddingCls, underlineCls)}
        style={style}
        {...(openNewTab ? { target: '_blank', rel: 'noopener' } : {})}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative" ref={containerRef} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link
        to={item.link || '#'}
        className={cn(className, 'inline-flex items-center gap-1.5', paddingCls, underlineCls)}
        style={style}
        onClick={handleToggle}
        {...(openNewTab ? { target: '_blank', rel: 'noopener' } : {})}
      >
        {item.label}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')} />
      </Link>
      {open && (
        <div className={cn('absolute top-full z-50 dropdown-animate', elevated ? 'left-1/2 -translate-x-1/2 pt-3' : 'left-0 pt-2')}>
          {elevated && (
            <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-popover border-l border-t border-border z-10" />
          )}
          <div className={cn(
            'bg-popover border border-border py-1.5 min-w-[180px] relative',
            elevated ? 'rounded-xl shadow-[0_8px_30px_-6px_hsl(var(--foreground)/0.12)]' : 'rounded-lg shadow-lg'
          )}>
            {item.children.map(child => (
              <Link
                key={child.id}
                to={child.link || '#'}
                className={cn(
                  'block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all duration-150',
                  elevated && 'mx-1.5 rounded-lg'
                )}
                style={style ? { fontSize: style.fontSize, letterSpacing: style.letterSpacing } : undefined}
                {...(child.openNewTab ? { target: '_blank', rel: 'noopener' } : {})}
              >
                {child.label}
                {child.badge && (
                  <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: child.badgeColor, color: '#fff' }}>{child.badge}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  MEGA MENU ITEM                                                      */
/* ================================================================== */

function MegaMenuItem({ item, className, style, openNewTab, padded, hoverStyle, megaConfig }: {
  item: ThemeMenuItem;
  className?: string;
  style?: React.CSSProperties;
  openNewTab?: boolean;
  padded?: boolean;
  hoverStyle?: string;
  megaConfig?: { columns?: number; width?: string; showImages?: boolean; showBanner?: boolean; bannerImageUrl?: string; bannerLink?: string };
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);
  const hasChildren = item.children && item.children.length > 0;

  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;
  const handleEnter = () => { if (!isTouchDevice) { clearTimeout(timeoutRef.current); setOpen(true); } };
  const handleLeave = () => { if (!isTouchDevice) { timeoutRef.current = setTimeout(() => setOpen(false), 200); } };
  const handleToggle = (e: React.MouseEvent) => {
    if (isTouchDevice && hasChildren) { e.preventDefault(); setOpen(v => !v); }
  };

  useEffect(() => {
    if (!isTouchDevice || !open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, isTouchDevice]);

  const useUnderline = hoverStyle === 'underline' || hoverStyle === 'both';
  const useBgHover = hoverStyle === 'background' || hoverStyle === 'both';

  const paddingCls = padded && useBgHover
    ? 'px-3 py-2 rounded-md hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
    : padded
    ? 'px-3 py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
    : '';

  const underlineCls = useUnderline ? 'nav-link-underline' : '';

  if (!hasChildren) {
    return (
      <Link to={item.link || '#'} className={cn(className, paddingCls, underlineCls)} style={style}
        {...(openNewTab ? { target: '_blank', rel: 'noopener' } : {})}>
        {item.label}
      </Link>
    );
  }

  const cols = megaConfig?.columns || 3;
  const megaWidth = megaConfig?.width === 'full' ? '100vw' : megaConfig?.width === 'container' ? '100%' : '480px';
  const showBanner = megaConfig?.showBanner && megaConfig?.bannerImageUrl;

  return (
    <div className="relative" ref={containerRef} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link to={item.link || '#'} className={cn(className, 'inline-flex items-center gap-1.5', paddingCls, underlineCls)} style={style}
        onClick={handleToggle}
        {...(openNewTab ? { target: '_blank', rel: 'noopener' } : {})}>
        {item.label}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')} />
      </Link>
      {open && (
        <div className="absolute top-full left-0 pt-3 z-50 dropdown-animate" style={{ minWidth: megaWidth === '100vw' ? '90vw' : megaWidth }}>
          <div className="absolute top-[6px] left-8 w-3 h-3 rotate-45 bg-popover border-l border-t border-border z-10" />
          <div className="bg-popover border border-border rounded-xl shadow-[0_8px_30px_-6px_hsl(var(--foreground)/0.12)] p-5 relative">
            <div className="flex gap-4">
              <div className="flex-1 grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                {item.children.map(child => (
                  <Link key={child.id} to={child.link || '#'}
                    className="block text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 px-3 py-2.5 rounded-lg transition-all duration-150"
                    style={style ? { fontSize: style.fontSize, letterSpacing: style.letterSpacing } : undefined}
                    {...(child.openNewTab ? { target: '_blank', rel: 'noopener' } : {})}>
                    <span className="font-medium text-foreground">{child.label}</span>
                    {child.badge && (
                      <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: child.badgeColor, color: '#fff' }}>{child.badge}</span>
                    )}
                  </Link>
                ))}
              </div>
              {showBanner && (
                <div className="w-48 shrink-0">
                  <Link to={megaConfig?.bannerLink || '#'} className="block rounded-lg overflow-hidden hover:opacity-90 transition-opacity">
                    <img src={megaConfig!.bannerImageUrl!} alt="Promo" className="w-full h-full object-cover rounded-lg" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  SEARCH MODAL                                                        */
/* ================================================================== */

function SearchModal({ open, onOpenChange, placeholder, onSearch, shortcutEnabled }: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  placeholder: string;
  onSearch: (q: string) => void;
  shortcutEnabled?: boolean;
}) {
  const [query, setQuery] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') onOpenChange(false);
    if (e.key === 'Enter' && query.trim()) { onOpenChange(false); onSearch(query.trim()); }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden rounded-xl border-border/50 shadow-[0_16px_70px_-12px_hsl(var(--foreground)/0.2)]">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full pl-12 pr-4 h-14 text-base bg-transparent border-0 outline-none placeholder:text-muted-foreground/40"
              autoFocus
              onKeyDown={handleKeyDown}
            />
          </div>

          {query.trim().length >= 2 ? (
            <div className="border-t border-border/40 mt-2 pt-2 max-h-[360px] overflow-y-auto">
              <SearchSuggestions
                query={query}
                maxResults={5}
                flat
                onSelect={() => onOpenChange(false)}
                onViewAll={() => { onOpenChange(false); onSearch(query.trim()); }}
              />
            </div>
          ) : (
            <div className="border-t border-border/40 mt-2 pt-3">
              <p className="text-[11px] text-muted-foreground/50 uppercase tracking-wider font-medium px-1">Sugestões populares</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {['Novidades', 'Promoções', 'Vestidos', 'Camisetas'].map(tag => (
                  <button key={tag} onClick={() => { onOpenChange(false); onSearch(tag); }}
                    className="px-3 py-1.5 text-xs text-muted-foreground bg-secondary/80 hover:bg-secondary rounded-full cursor-pointer transition-colors">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {shortcutEnabled && (
            <div className="border-t border-border/30 mt-3 pt-2 flex justify-end">
              <span className="text-[10px] text-muted-foreground/40">Esc para fechar • Ctrl+K para abrir</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ================================================================== */
/*  SEARCH DRAWER                                                       */
/* ================================================================== */

function SearchDrawer({ placeholder, onSearch, onClose }: {
  placeholder: string;
  onSearch: (q: string) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter' && query.trim()) { onClose(); onSearch(query.trim()); }
  };

  return (
    <div className="pb-4 pt-2 animate-in slide-in-from-top-2 duration-300">
      <div className="relative max-w-lg mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 h-11 text-sm bg-secondary/60 rounded-full border-0 outline-none ring-1 ring-border/40 focus:ring-border focus:bg-background transition-all duration-200 placeholder:text-muted-foreground/40"
          autoFocus
          onKeyDown={handleKeyDown}
        />
        {query.trim().length >= 2 && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50">
            <SearchSuggestions
              query={query}
              maxResults={5}
              onSelect={onClose}
              onViewAll={() => { onClose(); onSearch(query.trim()); }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  MOBILE DRAWER SEARCH                                                */
/* ================================================================== */

function MobileDrawerSearch({ placeholder, onSearch }: { placeholder: string; onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) onSearch(query.trim());
  };

  return (
    <div className="relative mt-4 mb-2">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 h-9 text-sm rounded-lg border border-border/60 outline-none focus:ring-1 focus:ring-border bg-muted/30 placeholder:text-muted-foreground/40"
      />
      {query.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full mt-1 z-50">
          <SearchSuggestions
            query={query}
            maxResults={5}
            onSelect={() => setQuery('')}
            onViewAll={() => onSearch(query.trim())}
          />
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  MAIN HEADER                                                         */
/* ================================================================== */

export function StoreHeader() {
  const { itemCount } = useCart();
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  // Menu typography config
  const mt = theme.header?.menuTypography ?? { fontFamily: 'Inter', fontWeight: 500, fontSizeDesktop: 14, fontSizeMobile: 14, letterSpacing: 0.02, textTransform: 'uppercase' as const, lineHeight: 1.2 };
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);

  // Dynamic Google Font loading for menu typography
  useEffect(() => {
    if (!mt.fontFamily) return;
    const fontId = `menu-font-${mt.fontFamily.replace(/\s/g, '-')}`;
    if (document.getElementById(fontId)) return;
    const weights = [400, 500, 600, 700].join(';');
    const link = document.createElement('link');
    link.id = fontId;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(mt.fontFamily)}:wght@${weights}&display=swap`;
    document.head.appendChild(link);
  }, [mt.fontFamily]);

  const mm = theme.megaMenu;
  const hasCustomMenu = mm && mm.items && mm.items.length > 0;
  const h = theme.header ?? {} as any;

  // Resolve dynamic icons from admin config
  const SearchIconComp = ICON_MAP[h.searchIcon || 'Search'] || Search;
  const AccountIconComp = ICON_MAP[h.accountIcon || 'User'] || User;
  const CartIconComponent = ICON_MAP[h.cartIcon || 'ShoppingBag'] || (headerCartIconMap[theme.productCard?.addToCartIcon || ''] || ShoppingBag);

  const isMinimal = h.layout === 'minimal' || h.layout === 'hamburger-only';
  const isCentered = h.layout === 'centered' || h.layout === 'logo-center-nav-left';
  const isDoubleRow = h.layout === 'double-row';
  const menuBar = h.menuBar ?? { enabled: false, backgroundColor: '#1a1a1a', textColor: '#ffffff', height: 48, fullWidth: true, borderTop: false, borderBottom: false, shadow: 'none' };
  const isMenuBarSeparated = menuBar.enabled;

  // Container settings
  const container = h.container ?? { width: 'container', maxWidth: 1400, paddingX: 16, gap: 16, verticalAlign: 'center' };
  const containerStyle: React.CSSProperties = {
    maxWidth: container.width === 'full' ? '100%' : `${container.maxWidth}px`,
    paddingLeft: `${container.paddingX}px`,
    paddingRight: `${container.paddingX}px`,
    margin: '0 auto',
  };

  // Mobile settings
  const mobile = h.mobile ?? { drawerPosition: 'left', showSearchInDrawer: true, showAccountInDrawer: true, showCartInDrawer: true, fixedFooterItems: [], maxLevels: 2, groupStyle: 'accordion' };

  // Mega menu config
  const megaConfig = h.megaMenuConfig ?? { columns: 4, width: 'container', showImages: false, showBanner: false, bannerImageUrl: '', bannerLink: '' };

  // Search config
  const searchConfig = h.search ?? { placeholder: 'Buscar produtos...', showOnDesktop: true, showOnMobile: true, autoSuggest: false, maxResults: 6, shortcutEnabled: false };

  // Scroll listener + hide-on-scroll for mobile
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);

      // Hide on scroll down, show on scroll up (mobile only)
      const isMobileVp = window.innerWidth < 1024;
      if (isMobileVp && h.sticky) {
        const delta = y - lastScrollY.current;
        if (delta > 8 && y > 80) {
          setHeaderHidden(true);
        } else if (delta < -5) {
          setHeaderHidden(false);
        }
      } else {
        setHeaderHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [h.sticky]);

  // Auto-close drawer on navigation
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Keyboard shortcut for search (Ctrl+K or /)
  useEffect(() => {
    if (!searchConfig.shortcutEnabled || !h.showSearch) return;
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [searchConfig.shortcutEnabled, h.showSearch]);

  const baseHeight = h.height || 64;
  const shrinkActive = h.shrinkOnScroll && scrolled;

  // Resolve state-based styling
  const states = h.states;
  const isTransparentLayout = h.layout === 'transparent';
  const activeState = isTransparentLayout && !scrolled
    ? states?.transparent
    : h.sticky && scrolled
    ? states?.sticky
    : states?.normal;

  const currentHeight = shrinkActive ? 44 : (activeState?.height || baseHeight);

  // Choose NavItemComponent based on menuStyle
  const isMegaMenu = h.menuStyle === 'mega-menu';

  const handleSearchClick = () => setSearchOpen(!searchOpen);
  const handleSearch = (q: string) => { setSearchOpen(false); navigate(`/products?q=${encodeURIComponent(q)}`); };

  const placeholder = searchConfig.placeholder || 'Buscar produtos...';

  const renderSearchBar = () => {
    if (!h.showSearch) return null;
    if (!searchConfig.showOnDesktop) return null;

    if (h.searchStyle === 'inline') {
      return <InlineSearchField placeholder={placeholder} headerBg={activeState?.backgroundColor} headerText={activeState?.textColor} onSearch={handleSearch} />;
    }

    return (
      <Button variant="ghost" size="icon" className="h-10 w-10" onClick={handleSearchClick}>
        <Search style={{ width: h.iconSize, height: h.iconSize }} strokeWidth={h.iconStrokeWidth || 1.5} />
      </Button>
    );
  };

  const renderSearchOverlay = () => {
    if (!searchOpen || !h.showSearch || h.searchStyle === 'inline') return null;

    const handleModalSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') setSearchOpen(false);
      if (e.key === 'Enter') {
        const val = (e.target as HTMLInputElement).value.trim();
        if (val) handleSearch(val);
      }
    };

    const handleSuggestionClick = (tag: string) => handleSearch(tag);

    if (h.searchStyle === 'modal') {
      return <SearchModal open={searchOpen} onOpenChange={setSearchOpen} placeholder={placeholder} onSearch={handleSearch} shortcutEnabled={searchConfig.shortcutEnabled} />;
    }

    // drawer — slides from top
    return <SearchDrawer placeholder={placeholder} onSearch={handleSearch} onClose={() => setSearchOpen(false)} />;
  };

  const separatorChar = h.menuSeparator === 'line' ? '|' : h.menuSeparator === 'dot' ? '•' : h.menuSeparator === 'slash' ? '/' : '';

  const renderNavItems = (extraClass?: string) => {
    const elevated = h.dropdownElevated ?? true;
    const padded = h.menuItemPadding ?? true;
    const hoverStyle = h.menuHoverStyle || 'underline';
    const mc = h.menuColors ?? {};
    const itemStyle: React.CSSProperties = {
      fontFamily: mt.fontFamily,
      fontSize: mt.fontSizeDesktop,
      fontWeight: mt.fontWeight,
      textTransform: mt.textTransform,
      letterSpacing: `${mt.letterSpacing}em`,
      lineHeight: mt.lineHeight,
      ...(mc.linkColor ? { color: mc.linkColor } : isMenuBarSeparated ? { color: menuBar.textColor } : {}),
    };
    const itemClass = cn(
      'text-muted-foreground hover:text-foreground transition-all duration-150',
      extraClass,
    );

    const separatorColor = mc.linkColor || (isMenuBarSeparated ? menuBar.textColor : undefined);
    const buildItems = (elements: React.ReactNode[]) => {
      if (!separatorChar || elements.length <= 1) return elements;
      const result: React.ReactNode[] = [];
      elements.forEach((el, i) => {
        result.push(el);
        if (i < elements.length - 1) {
          result.push(
            <span
              key={`sep-${i}`}
              className="select-none"
              style={{
                fontSize: mt.fontSizeDesktop ? mt.fontSizeDesktop * 0.75 : 11,
                fontWeight: 300,
                opacity: 0.35,
                lineHeight: mt.lineHeight,
                ...(separatorColor ? { color: separatorColor } : {}),
              }}
              aria-hidden="true"
            >
              {separatorChar}
            </span>
          );
        }
      });
      return result;
    };

    if (hasCustomMenu) {
      return buildItems(mm!.items.map(mi => (
        isMegaMenu ? (
          <MegaMenuItem
            key={mi.id}
            item={mi}
            padded={padded}
            hoverStyle={hoverStyle}
            className={itemClass}
            style={itemStyle}
            openNewTab={mi.openNewTab}
            megaConfig={megaConfig}
          />
        ) : (
          <NavItem
            key={mi.id}
            item={mi}
            elevated={elevated}
            padded={padded}
            hoverStyle={hoverStyle}
            className={itemClass}
            style={itemStyle}
            openNewTab={mi.openNewTab}
          />
        )
      )));
    }

    const useUnderline = hoverStyle === 'underline' || hoverStyle === 'both';
    const useBgHover = hoverStyle === 'background' || hoverStyle === 'both';

    return buildItems(mockCategories.slice(0, 5).map(cat => (
      <Link
        key={cat.id}
        to={`/products?category=${cat.slug}`}
        className={cn(
          itemClass,
          useUnderline && 'nav-link-underline',
          padded && useBgHover && 'px-3 py-2 rounded-md hover:bg-accent/80',
          padded && !useBgHover && 'px-3 py-2 rounded-md',
        )}
        style={itemStyle}
      >
        {cat.name}
      </Link>
    )));
  };

  const headerStyle: React.CSSProperties = activeState ? {
    backgroundColor: activeState.backgroundColor === 'transparent' ? 'transparent' : activeState.backgroundColor,
    color: activeState.textColor,
    borderColor: activeState.borderBottom ? activeState.borderColor : 'transparent',
  } : {};

  const shadowMap: Record<string, string> = {
    none: '',
    subtle: 'shadow-sm',
    medium: 'shadow-md',
    strong: 'shadow-lg',
  };

  // Render action icons
  const renderActions = (forMobile = false) => {
    const iconStyle = { width: h.iconSize, height: h.iconSize };
    const sw = h.iconStrokeWidth || 1.5;

    return (
      <div className={cn('flex items-center gap-1', isCentered && 'lg:absolute lg:right-0')}>
        {/* Social icons (actions position) */}
        {!forMobile && theme.header?.socialBar?.enabled && theme.header.socialBar.position === 'header-actions' && (
          <div className="hidden lg:flex items-center mr-1">
            <SocialBar />
          </div>
        )}
        {h.showSearch && h.searchStyle !== 'inline' && (!forMobile || searchConfig.showOnMobile) && (
          <Button variant="ghost" size="icon" className="h-10 w-10" onClick={handleSearchClick}>
            <SearchIconComp style={iconStyle} strokeWidth={sw} />
          </Button>
        )}
        {h.showAccount && !forMobile && (
          <Link to={user ? '/account' : '/login'}>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <AccountIconComp style={iconStyle} strokeWidth={sw} />
            </Button>
          </Link>
        )}
        {h.showCart && (
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <CartIconComponent style={iconStyle} strokeWidth={sw} />
              {itemCount > 0 && h.cartBadgeStyle !== 'none' && (
                <span className="absolute -top-0.5 -right-0.5 bg-foreground text-background text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {h.cartBadgeStyle === 'count' ? itemCount : '●'}
                </span>
              )}
            </Button>
          </Link>
        )}
      </div>
    );
  };

  // Mobile drawer content
  const renderMobileDrawer = () => {
    return (
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10 shrink-0">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side={mobile.drawerPosition} className="w-72 flex flex-col">
          {/* Search in drawer */}
          {mobile.showSearchInDrawer && h.showSearch && (
            <MobileDrawerSearch placeholder={placeholder} onSearch={handleSearch} />
          )}

          {/* Nav items */}
          <nav className="flex flex-col gap-4 mt-4 flex-1" style={{ fontFamily: mt.fontFamily, fontSize: mt.fontSizeMobile, fontWeight: mt.fontWeight, letterSpacing: `${mt.letterSpacing}em`, textTransform: mt.textTransform, lineHeight: mt.lineHeight }}>
            <Link to="/" className="font-display font-semibold" style={{ fontSize: mt.fontSizeMobile + 2 }}>Início</Link>
            {hasCustomMenu ? mm!.items.map(mi => (
              <MobileNavItem key={mi.id} item={mi} showBadges={mm!.showBadges} maxLevels={mobile.maxLevels} groupStyle={mobile.groupStyle} />
            )) : mockCategories.slice(0, 5).map(cat => (
              <Link key={cat.id} to={`/products?category=${cat.slug}`} className="hover:text-foreground/80 transition-colors">
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Actions in drawer footer */}
          <div className="border-t border-border/40 pt-4 pb-2 mt-auto space-y-2">
            {mobile.showAccountInDrawer && (
              <Link to={user ? '/account' : '/login'} className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <User className="h-4 w-4" /> {user ? 'Minha Conta' : 'Entrar'}
              </Link>
            )}
            {mobile.showCartInDrawer && (
              <Link to="/cart" className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ShoppingBag className="h-4 w-4" /> Carrinho {itemCount > 0 && `(${itemCount})`}
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
    );
  };

  const hasNavBarBelow = (isDoubleRow || h.layout === 'centered') && !shrinkActive && !isMenuBarSeparated;

  return (
    <header className={cn(
      'z-50 transition-all duration-300',
      activeState?.blur && 'backdrop-blur-md',
      !activeState && 'bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80',
      'shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]',
      h.sticky && 'sticky top-0',
      headerHidden && 'lg:translate-y-0 -translate-y-full',
    )} style={{
      ...headerStyle,
      paddingTop: 'env(safe-area-inset-top, 0px)',
    }}>
      {/* Social bar (top position) */}
      {theme.header?.socialBar?.enabled && theme.header.socialBar.position === 'header-top' && !shrinkActive && (
        <div className="hidden lg:block">
          <div style={containerStyle}>
            <div className="flex items-center justify-end py-1.5">
              <SocialBar />
            </div>
          </div>
        </div>
      )}

      {/* Announcement bar */}
      {!isMinimal && !shrinkActive && <AnnouncementBar />}

      <div style={containerStyle}>
        {/* DOUBLE ROW LAYOUT */}
        {isDoubleRow && !shrinkActive ? (
          <>
            {/* ── MOBILE: same 3-column grid for double-row ── */}
            <div
              className="grid grid-cols-[auto_1fr_auto] items-center lg:hidden"
              style={{ height: currentHeight, gap: `${Math.min(container.gap, 12)}px` }}
            >
              {renderMobileDrawer()}

              <Link to="/" className="flex items-center gap-2 min-w-0 overflow-hidden justify-start">
                {theme.logo.imageUrl && (
                  <img src={theme.logo.imageUrl} alt="Logo" style={{ maxHeight: theme.logo.maxHeight }} className="object-contain shrink-0" />
                )}
                {theme.logo.showText && (
                  <span className="font-display text-lg font-bold tracking-tight truncate">
                    {theme.logo.text}
                  </span>
                )}
              </Link>

              {renderActions(true)}
            </div>

            {/* ── DESKTOP: Row 1: Logo + Search + Actions ── */}
            <div className="hidden lg:flex items-center justify-between" style={{ height: currentHeight, gap: `${container.gap}px` }}>
              <Link to="/" className="flex items-center gap-2 shrink-0">
                {theme.logo.imageUrl && (
                  <img src={theme.logo.imageUrl} alt="Logo" style={{ maxHeight: theme.logo.maxHeight }} className="object-contain" />
                )}
                {theme.logo.showText && (
                  <span className="font-display text-xl md:text-2xl font-bold tracking-tight">
                    {theme.logo.text}
                  </span>
                )}
              </Link>

              {h.searchStyle === 'inline' && h.showSearch && (
                <InlineSearchField placeholder={placeholder} headerBg={activeState?.backgroundColor} headerText={activeState?.textColor} className="flex-1 max-w-md" onSearch={handleSearch} />
              )}

              {renderActions()}
            </div>

          </>
        ) : !shrinkActive ? (
          /* ALL OTHER LAYOUTS */
          <>
            {/* ── MOBILE: 3-column grid [hamburger | logo | actions] ── */}
            <div
              className="grid grid-cols-[auto_1fr_auto] items-center lg:hidden"
              style={{ height: currentHeight, gap: `${Math.min(container.gap, 12)}px` }}
            >
              {renderMobileDrawer()}

              <Link to="/" className={cn(
                'flex items-center gap-2 min-w-0 overflow-hidden',
                isCentered ? 'justify-center' : 'justify-start',
              )}>
                {theme.logo.imageUrl && (
                  <img src={theme.logo.imageUrl} alt="Logo" style={{ maxHeight: theme.logo.maxHeight }} className="object-contain shrink-0" />
                )}
                {theme.logo.showText && (
                  <span className="font-display text-lg font-bold tracking-tight truncate">
                    {theme.logo.text}
                  </span>
                )}
              </Link>

              {renderActions(true)}
            </div>

            {/* ── DESKTOP: original flex layout ── */}
            <div className={cn(
              'hidden lg:flex items-center transition-all duration-300',
              isCentered ? 'justify-center relative' : 'justify-between'
            )} style={{ height: currentHeight, gap: `${container.gap}px` }}>
              {isCentered && (
                <div className="absolute left-0 shrink-0">
                  {/* Desktop doesn't need hamburger, it's hidden via lg:hidden */}
                </div>
              )}

              <Link to="/" className="flex items-center gap-2 shrink-0 min-w-0">
                {theme.logo.imageUrl && (
                  <img src={theme.logo.imageUrl} alt="Logo" style={{ maxHeight: theme.logo.maxHeight }} className="object-contain shrink-0" />
                )}
                {theme.logo.showText && (
                  <span className="font-display text-xl md:text-2xl font-bold tracking-tight truncate">
                    {theme.logo.text}
                  </span>
                )}
              </Link>

              {h.layout !== 'hamburger-only' && h.layout !== 'centered' && !isMenuBarSeparated && (
                <nav className="flex items-center" style={{ gap: `${h.menuItemGap ?? 4}px` }}>
                  {renderNavItems()}
                </nav>
              )}

              {h.searchStyle === 'inline' && h.showSearch && h.layout !== 'hamburger-only' && h.layout !== 'double-row' && (
                <InlineSearchField placeholder={placeholder} headerBg={activeState?.backgroundColor} headerText={activeState?.textColor} onSearch={handleSearch} />
              )}

              {renderActions()}
            </div>
          </>
        ) : null}

        {/* When shrunk: show ONLY the nav menu bar */}
        {shrinkActive && (
          <nav className="flex items-center justify-center py-2" style={{ gap: `${h.menuItemGap ?? 4}px` }}>
            {renderNavItems()}
          </nav>
        )}

        {/* Centered nav moved outside container below */}

        {!shrinkActive && renderSearchOverlay()}
      </div>

      {/* Double-row nav bar (1px white gap divider) */}
      {isDoubleRow && !shrinkActive && !isMenuBarSeparated && (
        <>
{h.menuDividerLine && <div className="hidden lg:block" style={{ height: '1px', backgroundColor: '#e5e5e5' }} />}
          <div
            className="hidden lg:block"
          >
            <div style={containerStyle}>
              <nav
                className="flex items-center justify-center"
                style={{ height: '40px', gap: `${h.menuItemGap ?? 4}px` }}
              >
                {renderNavItems()}
              </nav>
            </div>
          </div>
        </>
      )}

      {/* Centered layout nav bar (1px white gap divider) */}
      {h.layout === 'centered' && !shrinkActive && !isMenuBarSeparated && (
        <>
          {h.menuDividerLine && <div className="hidden lg:block" style={{ height: '1px', backgroundColor: '#e5e5e5' }} />}
          <div
            className="hidden lg:block"
          >
            <div style={containerStyle}>
              <nav
                className="flex items-center justify-center"
                style={{ height: '40px', gap: `${h.menuItemGap ?? 4}px` }}
              >
                {renderNavItems()}
              </nav>
            </div>
          </div>
        </>
      )}

      {isMenuBarSeparated && !shrinkActive && (
        <div
          className={cn(
            'hidden lg:block transition-all duration-300',
          )}
          style={{
            backgroundColor: menuBar.backgroundColor,
            color: menuBar.textColor,
            ...(!menuBar.borderTop && h.menuDividerLine ? { borderTopWidth: '1px', borderTopStyle: 'solid' as const, borderTopColor: '#e5e5e5' } : {}),
          }}
        >
          <div style={menuBar.fullWidth ? { width: '100%' } : containerStyle}>
            <nav
              className="flex items-center justify-center"
              style={{
                height: `${menuBar.height}px`,
                gap: `${h.menuItemGap ?? 4}px`,
              }}
            >
              {renderNavItems()}
            </nav>
          </div>
        </div>
      )}

      {!shrinkActive && <BannerBelow />}
    </header>
  );
}

/* ================================================================== */
/*  MOBILE NAV ITEM (with accordion / list support)                     */
/* ================================================================== */

function MobileNavItem({ item, showBadges, maxLevels, groupStyle, level = 0 }: {
  item: ThemeMenuItem;
  showBadges: boolean;
  maxLevels: number;
  groupStyle: 'accordion' | 'list';
  level?: number;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0 && level < maxLevels - 1;

  if (!hasChildren) {
    return (
      <Link to={item.link || '#'} className={cn('text-base hover:text-foreground/80 transition-colors', level > 0 && 'text-sm text-muted-foreground ml-4')}
        {...(item.openNewTab ? { target: '_blank', rel: 'noopener' } : {})}>
        {item.label}
        {showBadges && item.badge && (
          <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: item.badgeColor, color: '#fff' }}>{item.badge}</span>
        )}
      </Link>
    );
  }

  if (groupStyle === 'list') {
    return (
      <div>
        <Link to={item.link || '#'} className="text-base hover:text-foreground/80 transition-colors"
          {...(item.openNewTab ? { target: '_blank', rel: 'noopener' } : {})}>
          {item.label}
          {showBadges && item.badge && (
            <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: item.badgeColor, color: '#fff' }}>{item.badge}</span>
          )}
        </Link>
        <div className="ml-4 mt-2 flex flex-col gap-2">
          {item.children.map(sub => (
            <MobileNavItem key={sub.id} item={sub} showBadges={showBadges} maxLevels={maxLevels} groupStyle={groupStyle} level={level + 1} />
          ))}
        </div>
      </div>
    );
  }

  // accordion
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-base hover:text-foreground/80 transition-colors">
        <span>
          {item.label}
          {showBadges && item.badge && (
            <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: item.badgeColor, color: '#fff' }}>{item.badge}</span>
          )}
        </span>
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="ml-4 mt-2 flex flex-col gap-2">
          <Link to={item.link || '#'} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Ver todos
          </Link>
          {item.children.map(sub => (
            <MobileNavItem key={sub.id} item={sub} showBadges={showBadges} maxLevels={maxLevels} groupStyle={groupStyle} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
