import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ThemeHomepageSection } from '@/types/theme';
import { useIsMobile } from '@/hooks/use-mobile';
import type { BannerItemData } from '@/components/theme-editor/panels/BannerSectionEditor';

const defaultItem: BannerItemData = {
  backgroundImage: '',
  title: '',
  subtitle: '',
  description: '',
  showText: false,
  showButton: false,
  ctaText: 'Ver mais',
  ctaLink: '',
  ctaLinkType: 'category',
  ctaCategory: '',
  ctaStyle: 'filled',
  clickableImage: true,
  imageLink: '',
  imageLinkType: 'category',
  imageCategory: '',
  overlayColor: '#000000',
  overlayOpacity: 0,
  textColor: '#ffffff',
  contentAlign: 'center',
  verticalAlign: 'center',
  buttonAlign: 'center',
  paddingX: 32,
  paddingY: 32,
};

/* ── Single banner block renderer ── */

function BannerBlock({ data, height, borderRadius, className }: {
  data: BannerItemData;
  height: number;
  borderRadius: number;
  className?: string;
}) {
  const alignX = data.contentAlign === 'left' ? 'items-start text-left' : data.contentAlign === 'right' ? 'items-end text-right' : 'items-center text-center';
  const alignY = data.verticalAlign === 'top' ? 'justify-start' : data.verticalAlign === 'bottom' ? 'justify-end' : 'justify-center';

  const ctaVariant = data.ctaStyle === 'outline' ? 'outline' : data.ctaStyle === 'ghost' ? 'ghost' : 'default';

  const content = (
    <div
      className={cn('relative overflow-hidden bg-secondary flex flex-col', alignY, className)}
      style={{
        height,
        borderRadius,
        backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      {data.backgroundImage && data.overlayOpacity > 0 && (
        <div className="absolute inset-0" style={{
          backgroundColor: data.overlayColor,
          opacity: data.overlayOpacity,
          borderRadius,
        }} />
      )}

      {/* Content */}
      {(data.showText || data.showButton) && (
        <div
          className={cn('relative z-10 flex flex-col w-full', alignX, alignY, 'h-full')}
          style={{ padding: `${data.paddingY}px ${data.paddingX}px` }}
        >
          {data.showText && (
            <>
              {data.subtitle && (
                <p className="text-xs uppercase tracking-[0.2em] mb-2 opacity-80 font-body" style={{ color: data.textColor }}>
                  {data.subtitle}
                </p>
              )}
              {data.title && (
                <h3 className="text-xl md:text-2xl font-display font-bold mb-2 leading-tight" style={{ color: data.textColor }}>
                  {data.title}
                </h3>
              )}
              {data.description && (
                <p className="text-sm mb-4 opacity-80 font-body max-w-md" style={{ color: data.textColor }}>
                  {data.description}
                </p>
              )}
            </>
          )}
          {data.showButton && data.ctaText && (
            <div className={cn(
              'w-full flex',
              (data.buttonAlign || data.contentAlign) === 'left' ? 'justify-start' : (data.buttonAlign || data.contentAlign) === 'right' ? 'justify-end' : 'justify-center',
            )}>
            <Link to={data.ctaLink || '/products'} onClick={e => e.stopPropagation()}>
              <Button
                variant={ctaVariant}
                size="sm"
                className={cn(
                  'rounded-full px-6 font-body',
                  data.ctaStyle === 'outline' && 'border-current',
                )}
                style={data.ctaStyle === 'outline' || data.ctaStyle === 'ghost' ? { color: data.textColor, borderColor: data.textColor } : undefined}
              >
                {data.ctaText}
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!data.backgroundImage && !data.showText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-muted-foreground text-sm">Banner</span>
        </div>
      )}
    </div>
  );

  // Wrap in link if clickableImage is true and no button is shown (or even with button)
  if (data.clickableImage && data.imageLink) {
    return (
      <Link to={data.imageLink} className="block hover:opacity-95 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}

/* ── Single Banner Section ── */

export function SingleBannerSection({ section, wrapperClass }: { section: ThemeHomepageSection; wrapperClass?: string }) {
  const isMobile = useIsMobile();
  const bannerData: BannerItemData = { ...defaultItem, ...(section.settings?.bannerData as Partial<BannerItemData> || {}) };
  const heightDesktop = (section.settings?.heightDesktop as number) || 300;
  const heightMobile = (section.settings?.heightMobile as number) || 200;
  const fullWidth = (section.settings?.fullWidth as boolean) ?? false;
  const borderRadius = (section.settings?.borderRadius as number) ?? 16;

  // Legacy fallback: if old settings format exists, convert
  const legacyData = migrateLegacySingleBanner(section, bannerData);

  return (
    <section className={cn(fullWidth ? 'px-0' : 'container mx-auto px-4', 'py-4', wrapperClass)}>
      <BannerBlock
        data={legacyData}
        height={isMobile ? heightMobile : heightDesktop}
        borderRadius={fullWidth ? 0 : borderRadius}
      />
    </section>
  );
}

/* ── Double / Triple Banner Section ── */

export function MultiBannerSection({ section, wrapperClass }: { section: ThemeHomepageSection; wrapperClass?: string }) {
  const isMobile = useIsMobile();
  const isTriple = section.type === 'triple-banner';
  const count = isTriple ? 3 : 2;

  const layout = (section.settings?.layout as string) || (isTriple ? 'equal-row' : 'side-by-side');
  const heightDesktop = (section.settings?.heightDesktop as number) || 280;
  const heightMobile = (section.settings?.heightMobile as number) || 180;
  const gap = (section.settings?.gap as number) ?? 16;
  const borderRadius = (section.settings?.borderRadius as number) ?? 12;
  const mobileStack = (section.settings?.mobileStack as boolean) ?? true;

  const items: BannerItemData[] = Array.from({ length: count }, (_, i) => {
    const stored = section.settings?.[`banner${i}`] as Partial<BannerItemData> | undefined;
    // Legacy fallback
    const legacy = migrateLegacyMultiBanner(section, i);
    return { ...defaultItem, ...legacy, ...(stored || {}) };
  });

  const height = isMobile ? heightMobile : heightDesktop;
  const shouldStack = isMobile && mobileStack;

  // Layout classes for double banner
  const doubleLayoutClass = () => {
    if (shouldStack) return 'grid-cols-1';
    switch (layout) {
      case 'stacked': return 'grid-cols-1';
      case '2-1': return 'grid-cols-[2fr_1fr]';
      case '1-2': return 'grid-cols-[1fr_2fr]';
      default: return 'grid-cols-2'; // side-by-side
    }
  };

  // Layout for triple banner
  const tripleLayout = () => {
    if (shouldStack) {
      return (
        <div className="grid grid-cols-1" style={{ gap }}>
          {items.map((item, i) => (
            <BannerBlock key={i} data={item} height={height} borderRadius={borderRadius} />
          ))}
        </div>
      );
    }

    switch (layout) {
      case 'stacked':
        return (
          <div className="grid grid-cols-1" style={{ gap }}>
            {items.map((item, i) => (
              <BannerBlock key={i} data={item} height={height} borderRadius={borderRadius} />
            ))}
          </div>
        );
      case '1-big-2-small':
        return (
          <div className="grid grid-cols-[1fr_1fr]" style={{ gap }}>
            <BannerBlock data={items[0]} height={height * 2 + gap} borderRadius={borderRadius} />
            <div className="grid grid-cols-1" style={{ gap }}>
              <BannerBlock data={items[1]} height={height} borderRadius={borderRadius} />
              <BannerBlock data={items[2]} height={height} borderRadius={borderRadius} />
            </div>
          </div>
        );
      case '2-small-1-big':
        return (
          <div className="grid grid-cols-[1fr_1fr]" style={{ gap }}>
            <div className="grid grid-cols-1" style={{ gap }}>
              <BannerBlock data={items[0]} height={height} borderRadius={borderRadius} />
              <BannerBlock data={items[1]} height={height} borderRadius={borderRadius} />
            </div>
            <BannerBlock data={items[2]} height={height * 2 + gap} borderRadius={borderRadius} />
          </div>
        );
      case 'top-1-bottom-2':
        return (
          <div className="grid grid-cols-1" style={{ gap }}>
            <BannerBlock data={items[0]} height={height} borderRadius={borderRadius} />
            <div className="grid grid-cols-2" style={{ gap }}>
              <BannerBlock data={items[1]} height={height} borderRadius={borderRadius} />
              <BannerBlock data={items[2]} height={height} borderRadius={borderRadius} />
            </div>
          </div>
        );
      default: // equal-row
        return (
          <div className="grid grid-cols-3" style={{ gap }}>
            {items.map((item, i) => (
              <BannerBlock key={i} data={item} height={height} borderRadius={borderRadius} />
            ))}
          </div>
        );
    }
  };

  return (
    <section className={cn('container mx-auto px-4 py-4', wrapperClass)}>
      {isTriple ? (
        tripleLayout()
      ) : (
        <div className={cn('grid', doubleLayoutClass())} style={{ gap }}>
          {items.map((item, i) => (
            <BannerBlock key={i} data={item} height={height} borderRadius={borderRadius} />
          ))}
        </div>
      )}
    </section>
  );
}

/* ── Legacy migration helpers ── */

function migrateLegacySingleBanner(section: ThemeHomepageSection, current: BannerItemData): BannerItemData {
  const s = section.settings || {};
  // If new format already has image, return as-is
  if (current.backgroundImage) return current;
  // Check for old format
  if (s.backgroundImage || s.title || s.ctaText) {
    return {
      ...current,
      backgroundImage: (s.backgroundImage as string) || '',
      title: (s.title as string) || '',
      description: (s.description as string) || '',
      showText: !!(s.title || s.description),
      showButton: !!(s.ctaText),
      ctaText: (s.ctaText as string) || 'Ver mais',
      ctaLink: (s.ctaLink as string) || '/products',
    };
  }
  return current;
}

function migrateLegacyMultiBanner(section: ThemeHomepageSection, idx: number): Partial<BannerItemData> {
  const s = section.settings || {};
  const n = idx + 1;
  const img = s[`image${n}`] as string;
  const link = s[`link${n}`] as string;
  if (!img && !link) return {};
  return {
    backgroundImage: img || '',
    clickableImage: !!link,
    imageLink: link || '',
  };
}
