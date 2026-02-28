// ============================================================
// Theme Schema — Full configuration for every visual aspect
// ============================================================

export interface ThemeColors {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  buyNow: string;
  buyNowHover: string;
}

export interface ThemeTypography {
  headingFont: string;
  bodyFont: string;
  baseFontSize: number;       // px
  headingWeight: number;
  bodyWeight: number;
  lineHeight: number;         // ratio
  letterSpacing: number;      // em
}

export interface ThemeButtons {
  style: 'filled' | 'outline' | 'ghost' | 'soft' | 'gradient' | '3d' | 'neon' | 'minimal';
  radius: 'none' | 'small' | 'medium' | 'large' | 'full';
  size: 'small' | 'medium' | 'large';
  paddingX: number;   // px
  paddingY: number;   // px
  fontSize: number;   // px
  uppercase: boolean;
  fontWeight: number;
  shadow: boolean;
}

export interface ThemeInputs {
  radius: 'none' | 'small' | 'medium' | 'large';
  borderWidth: 1 | 2;
  focusRing: boolean;
  style: 'default' | 'filled' | 'underline';
}

export interface ThemeLogo {
  text: string;
  imageUrl: string;
  showText: boolean;
  maxHeight: number;          // px
  position: 'left' | 'center';
}

export interface ThemeAnnouncementBar {
  enabled: boolean;
  messages: string[];
  speed: number;              // seconds per message
  backgroundColor: string;
  textColor: string;
  showIcon: boolean;
  icon: string;
  link: string;
  pauseOnHover: boolean;
  style: 'static' | 'carousel' | 'ticker';
  direction: 'ltr' | 'rtl';
}

export interface ThemeBannerBelow {
  enabled: boolean;
  imageUrl: string;
  images: string[];
  link: string;
  height: number;
  fullWidth: boolean;
  carousel: boolean;
  carouselSpeed: number;
}

export interface ThemeHeader {
  layout: 'classic' | 'centered' | 'minimal' | 'logo-center-nav-left' | 'hamburger-only' | 'top-bar-split' | 'double-row' | 'sidebar-nav' | 'transparent';
  sticky: boolean;
  shrinkOnScroll: boolean;
  shadowOnScroll: boolean;
  backgroundColor: string;
  borderBottom: boolean;
  height: number;             // px
  menuStyle: 'horizontal' | 'dropdown' | 'mega-menu';
  menuFontSize: number;
  menuUppercase: boolean;
  menuLetterSpacing: number;
  iconSize: number;
  showSearch: boolean;
  searchStyle: 'inline' | 'modal' | 'drawer';
  showAccount: boolean;
  showWishlist: boolean;
  showCart: boolean;
  cartBadgeStyle: 'dot' | 'count' | 'none';
  announcement: ThemeAnnouncementBar;
  bannerBelow: ThemeBannerBelow;
}

export interface ThemeHeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  ctaStyle: 'filled' | 'outline' | 'ghost';
  backgroundImage: string;
  backgroundVideo: string;
  overlayColor: string;
  overlayOpacity: number;
  contentAlign: 'left' | 'center' | 'right';
  textColor: string;
}

export interface ThemeHero {
  enabled: boolean;
  height: 'small' | 'medium' | 'large' | 'fullscreen';
  autoplay: boolean;
  autoplaySpeed: number;
  showDots: boolean;
  showArrows: boolean;
  transition: 'slide' | 'fade' | 'zoom';
  slides: ThemeHeroSlide[];
}

export interface ThemeProductCard {
  layout: 'standard' | 'minimal' | 'detailed' | 'horizontal' | 'overlay' | 'magazine';
  imageAspect: '1:1' | '3:4' | '4:5' | '2:3' | '16:9';
  imageHover: 'none' | 'zoom' | 'swap' | 'slide';
  imageBorderRadius: 'none' | 'small' | 'medium' | 'large';
  showCategory: boolean;
  showBrand: boolean;
  showRating: boolean;
  showQuickView: boolean;
  quickViewStyle: 'modal' | 'drawer' | 'expand' | 'side-panel';
  showWishlist: boolean;
  showAddToCart: boolean;
  showBuyNow: boolean;
  buyNowText: string;
  buyNowIcon: string;
  addToCartText: string;
  addToCartIcon: string;
  buttonVisibility: 'both' | 'add-only' | 'buy-only';
  buttonLayout: 'stacked' | 'side-by-side';
  buttonStyle: 'solid' | 'outline' | 'pill' | 'rounded' | 'sharp' | 'gradient' | 'underline';
  addToCartStyle: 'icon' | 'button' | 'full-width';
  clickBehavior: 'navigate' | 'modal';
  badgePosition: 'top-left' | 'top-right' | 'bottom-left';
  badgeStyle: 'square' | 'rounded' | 'pill';
  priceSize: 'small' | 'medium' | 'large';
  showComparePrice: boolean;
  showDiscount: boolean;
  discountStyle: 'percentage' | 'amount' | 'badge';
  showInstallments: boolean;
  titleLines: 1 | 2 | 3;
  contentAlign: 'left' | 'center';
  spacing: 'compact' | 'normal' | 'spacious';
  shadow: 'none' | 'subtle' | 'medium' | 'strong';
  hoverShadow: boolean;
  border: boolean;
}

export interface ThemeProductPage {
  galleryLayout: 'side-by-side' | 'slider' | 'grid' | 'vertical-thumbs';
  galleryPosition: 'left' | 'right';
  imageZoom: boolean;
  stickyGallery: boolean;
  showBreadcrumb: boolean;
  showSKU: boolean;
  showBrand: boolean;
  showRating: boolean;
  showStock: boolean;
  showShareButtons: boolean;
  variantStyle: 'dropdown' | 'buttons' | 'swatches';
  quantityStyle: 'input' | 'stepper';
  ctaLayout: 'stacked' | 'side-by-side';
  ctaStickyMobile: boolean;
  showTrustBadges: boolean;
  trustBadges: string[];
  tabsStyle: 'tabs' | 'accordion' | 'inline';
  showRelated: boolean;
  relatedTitle: string;
  showRecentlyViewed: boolean;
  sizeGuideEnabled: boolean;
  shippingEstimate: boolean;
}

export interface ThemeCategory {
  layout: 'sidebar-left' | 'sidebar-right' | 'top-filters' | 'no-filters';
  displayMode: 'grid' | 'list' | 'masonry' | 'carousel' | 'compact-grid';
  columnsDesktop: 2 | 3 | 4 | 5;
  columnsMobile: 1 | 2;
  filterStyle: 'checkbox' | 'chips' | 'accordion';
  showFilterCount: boolean;
  sortStyle: 'dropdown' | 'chips';
  pagination: 'classic' | 'infinite-scroll' | 'load-more';
  productsPerPage: number;
  showBanner: boolean;
  bannerHeight: number;
  showBreadcrumb: boolean;
  showProductCount: boolean;
  carouselAutoplay: boolean;
  carouselSpeed: number;      // seconds
  carouselDirection: 'ltr' | 'rtl';
  showAddToCartOnListing: boolean;
}

export interface ThemeCart {
  style: 'page' | 'drawer' | 'dropdown';
  showThumbnails: boolean;
  showQuantity: boolean;
  showCoupon: boolean;
  showShippingEstimate: boolean;
  showRecommendations: boolean;
  recommendationsTitle: string;
  showFreeShippingBar: boolean;
  freeShippingThreshold: number;
  freeShippingMessage: string;
  emptyCartMessage: string;
  emptyCartCta: string;
  showContinueShopping: boolean;
}

export interface ThemeCheckout {
  layout: 'one-column' | 'two-columns';
  stepsStyle: 'numbered' | 'progress-bar' | 'tabs';
  showOrderSummary: boolean;
  showCouponField: boolean;
  showTrustBadges: boolean;
  termsRequired: boolean;
  termsText: string;
  successTitle: string;
  successMessage: string;
  showConfetti: boolean;
}

export interface ThemeFooterColumn {
  title: string;
  links: { label: string; url: string }[];
  enabled: boolean;
}

export interface ThemeFooter {
  layout: '4-columns' | '3-columns' | '2-columns' | 'simple' | 'centered';
  backgroundColor: string;
  textColor: string;
  showNewsletter: boolean;
  newsletterTitle: string;
  newsletterDescription: string;
  showSocial: boolean;
  socialLinks: { platform: string; url: string }[];
  showPaymentIcons: boolean;
  showTrustSeals: boolean;
  copyrightText: string;
  showBackToTop: boolean;
  columns: ThemeFooterColumn[];
  bottomLinks: { label: string; url: string }[];
}

export interface ThemeWhatsApp {
  enabled: boolean;
  number: string;
  message: string;
  position: 'bottom-left' | 'bottom-right';
  showLabel: boolean;
  label: string;
  backgroundColor: string;
  delay: number;              // seconds before showing
}

export interface ThemeSEO {
  titleTemplate: string;
  defaultDescription: string;
  ogImage: string;
  showBreadcrumbs: boolean;
}

export interface ThemeHomepageSection {
  id: string;
  type: 'hero' | 'categories' | 'featured-products' | 'banner' | 'double-banner' |
        'testimonials' | 'brands' | 'newsletter' | 'benefits' | 'faq' | 'collections' |
        'trust-bar' | 'blog-preview' | 'custom-html';
  enabled: boolean;
  title: string;
  showTitle: boolean;
  settings: Record<string, unknown>;
}

export interface ThemeGlobal {
  containerWidth: 'narrow' | 'default' | 'wide' | 'full';
  containerMaxPx: number;
  sectionSpacing: 'compact' | 'normal' | 'spacious';
  borderRadius: 'none' | 'small' | 'medium' | 'large' | 'full';
  shadowLevel: 'none' | 'subtle' | 'medium' | 'strong';
  borderStyle: 'none' | 'thin' | 'medium' | 'thick';
  animationsEnabled: boolean;
  animationSpeed: 'slow' | 'normal' | 'fast';
  scrollBehavior: 'smooth' | 'auto';
}

export interface ThemeAccessibility {
  minContrastRatio: number;
  focusVisible: boolean;
  minTouchTarget: number;     // px
  reducedMotion: boolean;
}

export interface ThemeCustomCode {
  css: string;
  headScripts: string;
}

// ============================================================
// Root config
// ============================================================

export interface ThemeConfig {
  id: string;
  name: string;
  version: number;
  createdAt: string;
  updatedAt: string;

  colors: ThemeColors;
  typography: ThemeTypography;
  buttons: ThemeButtons;
  inputs: ThemeInputs;
  global: ThemeGlobal;

  logo: ThemeLogo;
  header: ThemeHeader;
  hero: ThemeHero;

  productCard: ThemeProductCard;
  productPage: ThemeProductPage;
  category: ThemeCategory;
  cart: ThemeCart;
  checkout: ThemeCheckout;

  footer: ThemeFooter;

  homepageSections: ThemeHomepageSection[];

  whatsapp: ThemeWhatsApp;
  seo: ThemeSEO;
  accessibility: ThemeAccessibility;
  customCode: ThemeCustomCode;
}

// ============================================================
// Draft / Published / Versioning
// ============================================================

export interface ThemeVersion {
  version: number;
  config: ThemeConfig;
  publishedAt: string;
  publishedBy: string;
  note: string;
}

export interface ThemeState {
  draft: ThemeConfig;
  published: ThemeConfig;
  versions: ThemeVersion[];
  isDirty: boolean;
}

// ============================================================
// Presets
// ============================================================

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  config: Partial<ThemeConfig>;
}
