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
  link: string;
  linkHover: string;
}

export interface ThemeTypography {
  headingFont: string;
  bodyFont: string;
  baseFontSize: number;       // px
  headingWeight: number;
  bodyWeight: number;
  lineHeight: number;         // ratio
  letterSpacing: number;      // em
  headingLineHeight: number;  // ratio for headings
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
  // Advanced rules
  pageRules: 'all' | 'home-only' | 'checkout-only' | 'mobile-only';
  scheduleEnabled: boolean;
  scheduleStart: string;
  scheduleEnd: string;
  segmentation: 'all' | 'first-visit' | 'logged-in' | 'campaign';
  ctaText: string;
  ctaLink: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
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

export interface ThemeHeaderStateStyle {
  backgroundColor: string;
  textColor: string;
  borderBottom: boolean;
  borderColor: string;
  shadow: 'none' | 'subtle' | 'medium' | 'strong';
  blur: boolean;
  height: number;             // px
}

export interface ThemeHeaderMobile {
  drawerPosition: 'left' | 'right';
  showSearchInDrawer: boolean;
  showAccountInDrawer: boolean;
  showCartInDrawer: boolean;
  fixedFooterItems: string[];     // e.g. ['whatsapp', 'login', 'track-order']
  maxLevels: 2 | 3;
  groupStyle: 'accordion' | 'list';
}

export interface ThemeHeaderContainer {
  width: 'full' | 'container';
  maxWidth: number;               // px (1200-1600)
  paddingX: number;               // px
  gap: number;                    // px between logo/nav/actions
  verticalAlign: 'center' | 'start' | 'end';
}

export interface ThemeHeaderMegaMenu {
  columns: 2 | 3 | 4 | 5 | 6;
  width: 'auto' | 'full' | 'container';
  showImages: boolean;
  showBanner: boolean;
  bannerImageUrl: string;
  bannerLink: string;
}

export interface ThemeHeaderSearch {
  placeholder: string;
  showOnDesktop: boolean;
  showOnMobile: boolean;
  autoSuggest: boolean;
  maxResults: number;
  shortcutEnabled: boolean;       // Ctrl+K or /
}

export interface ThemeMenuTypography {
  fontFamily: string;
  fontWeight: 400 | 500 | 600 | 700;
  fontSizeDesktop: number;      // px (12-20)
  fontSizeMobile: number;       // px (12-20)
  letterSpacing: number;        // em (-0.02 to 0.20)
  textTransform: 'none' | 'uppercase';
  lineHeight: number;           // ratio (1.0-1.6)
}

export interface ThemeMenuBar {
  enabled: boolean;
  backgroundColor: string;
  textColor: string;
  height: number;
  fullWidth: boolean;
  borderTop: boolean;
  borderBottom: boolean;
  shadow: 'none' | 'subtle' | 'medium';
}

export interface ThemeHeader {
  layout: 'classic' | 'centered' | 'minimal' | 'logo-center-nav-left' | 'hamburger-only' | 'top-bar-split' | 'double-row' | 'sidebar-nav' | 'transparent';
  sticky: boolean;
  shrinkOnScroll: boolean;
  shrinkTransparent: boolean;
  shadowOnScroll: boolean;
  backgroundColor: string;
  borderBottom: boolean;
  headerSurface: boolean;
  dropdownElevated: boolean;
  menuItemPadding: boolean;
  height: number;
  menuStyle: 'horizontal' | 'dropdown' | 'mega-menu';
  menuFontSize: number;
  menuUppercase: boolean;
  menuLetterSpacing: number;
  menuFontWeight: number;
  menuHoverStyle: 'underline' | 'background' | 'both';
  menuItemGap: number;
  menuSeparator: 'none' | 'line' | 'dot' | 'slash';
  menuDividerLine: boolean;  // subtle horizontal line between logo area and nav area
  iconSize: number;
  iconStrokeWidth: number;
  showSearch: boolean;
  searchStyle: 'inline' | 'modal' | 'drawer';
  showAccount: boolean;
  showCart: boolean;
  cartBadgeStyle: 'dot' | 'count' | 'none';
  // States
  states: {
    normal: ThemeHeaderStateStyle;
    sticky: ThemeHeaderStateStyle;
    transparent: ThemeHeaderStateStyle;
  };
  // Container/Grid
  container: ThemeHeaderContainer;
  // Mobile
  mobile: ThemeHeaderMobile;
  // Mega Menu
  megaMenuConfig: ThemeHeaderMegaMenu;
  // Search
  search: ThemeHeaderSearch;
  // Preset
  preset: string;
  // Icon choices
  searchIcon: string;
  accountIcon: string;
  cartIcon: string;
  // Menu colors
  menuColors: {
    linkColor: string;
    linkHoverColor: string;
    linkActiveColor: string;
    linkBg: string;
    linkHoverBg: string;
  };
  // Menu Typography
  menuTypography: ThemeMenuTypography;
  // Separated Menu Bar
  menuBar: ThemeMenuBar;
  announcement: ThemeAnnouncementBar;
  bannerBelow: ThemeBannerBelow;
  socialBar: ThemeSocialBar;
}

export interface ThemeHeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  ctaLinkType: 'url' | 'category';
  ctaCategory: string;
  ctaStyle: 'filled' | 'outline' | 'ghost';
  backgroundImage: string;
  backgroundVideo: string;
  overlayColor: string;
  overlayOpacity: number;
  contentAlign: 'left' | 'center' | 'right';
  textColor: string;
  showText: boolean;
  showButton: boolean;
  contentOffsetX: number;
  contentOffsetY: number;
  buttonOffsetX: number;
  buttonOffsetY: number;
}

export interface ThemeHero {
  enabled: boolean;
  height: '200' | '300' | '400' | '500' | 'fullscreen';
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
  
  showAddToCart: boolean;
  showBuyNow: boolean;
  buyNowHoverReveal: boolean;
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


export interface ThemeHomepageSection {
  id: string;
  type: 'hero' | 'categories' | 'featured-products' | 'banner' | 'double-banner' |
        'triple-banner' | 'testimonials' | 'brands' | 'newsletter' | 'benefits' | 'faq' |
        'collections' | 'trust-bar' | 'blog-preview' | 'custom-html' |
        'countdown' | 'video' | 'image-text';
  enabled: boolean;
  title: string;
  showTitle: boolean;
  settings: Record<string, unknown>;
}

// Social Bar
export interface ThemeSocialLink {
  platform: 'facebook' | 'whatsapp' | 'instagram' | 'tiktok' | 'kwai' | 'youtube' | 'linkedin' | 'twitter' | 'telegram';
  url: string;
  enabled: boolean;
}

export interface ThemeSocialBar {
  enabled: boolean;
  position: 'header-top' | 'header-actions';
  links: ThemeSocialLink[];
  iconSize: number;       // 14-24
  iconColor: string;
  iconHoverColor: string;
  showLabels: boolean;
}

// Menu
export interface ThemeMenuItem {
  id: string;
  label: string;
  link: string;
  openNewTab: boolean;
  badge: string;             // "Novo", "Promo", "-30%"
  badgeColor: string;
  icon: string;
  children: ThemeMenuItem[];
}

export interface ThemeMegaMenu {
  items: ThemeMenuItem[];
  mobileGroupStyle: 'accordion' | 'list';
  showIcons: boolean;
  showBadges: boolean;
}

// Badges
export interface ThemeBadgeRule {
  id: string;
  label: string;
  condition: 'manual' | 'new' | 'bestseller' | 'free-shipping' | 'low-stock' | 'on-sale';
  color: string;
  textColor: string;
  style: 'pill' | 'corner' | 'ribbon';
  enabled: boolean;
  daysNew: number;           // for "new" condition
  stockThreshold: number;    // for "low-stock" condition
}

export interface ThemeBadges {
  enabled: boolean;
  rules: ThemeBadgeRule[];
  position: 'top-left' | 'top-right' | 'bottom-left';
  maxVisible: number;
}

// Microcopy
export interface ThemeMicrocopy {
  buyButton: string;
  addToCartButton: string;
  checkoutButton: string;
  continueShoppingButton: string;
  outOfStockMessage: string;
  lowStockMessage: string;     // "Restam {count} unidades"
  freeShippingMessage: string;
  shippingEstimateLabel: string;
  couponPlaceholder: string;
  couponApplyButton: string;
  couponErrorMessage: string;
  checkoutErrorMessage: string;
  variationColorLabel: string;
  variationSizeLabel: string;
  searchPlaceholder: string;
  emptySearchMessage: string;
  relatedProductsTitle: string;
}

// Conversion integrations
export interface ThemeConversion {
  whatsappOnPDP: boolean;
  whatsappPDPText: string;
  whatsappPDPMessage: string;
  socialProofEnabled: boolean;
  socialProofType: 'sold-count' | 'viewing-now' | 'recent-purchase';
  socialProofText: string;
  reviewsEnabled: boolean;
  reviewsStyle: 'stars' | 'thumbs';
  trustDifferentials: { icon: string; title: string; description: string }[];
  showTrustDifferentials: boolean;
}

// Responsive
export interface ThemeResponsive {
  heroTitleSizeMobile: number;
  hideSectionsMobile: string[];    // section IDs
  columnsMobile: number;
  spacingMobile: 'compact' | 'normal' | 'spacious';
  showSearchMobile: boolean;
  stickyHeaderMobile: boolean;
}


export interface ThemeProductListing {
  limitDesktop: number;       // 0 = all
  limitMobile: number;        // 0 = all
}

export interface ThemeGlobal {
  containerWidth: 'narrow' | 'default' | 'wide' | 'full';
  containerMaxPx: number;
  sectionSpacing: 'minimal' | 'compact' | 'normal' | 'spacious';
  borderRadius: 'none' | 'small' | 'medium' | 'large' | 'full';
  shadowLevel: 'none' | 'subtle' | 'medium' | 'strong';
  borderStyle: 'none' | 'thin' | 'medium' | 'thick';
  animationsEnabled: boolean;
  animationSpeed: 'slow' | 'normal' | 'fast';
  scrollBehavior: 'smooth' | 'auto';
}


export interface ThemeQuickView {
  enabled: boolean;

  // Tab 1 — Modelo
  model: 'drawer-right' | 'drawer-left' | 'modal-center' | 'bottom-sheet';
  drawerWidth: number;        // 420–520 for drawers
  modalWidth: number;         // 720–920 for modal
  overlayOpacity: number;     // 0.35–0.65
  overlayBlur: 'off' | 'low' | 'medium';

  // Tab 2 — Estrutura
  showRating: boolean;
  showShare: boolean;
  showSKU: boolean;
  showInstallments: boolean;
  showViewProduct: boolean;
  showShipping: boolean;
  showDescription: boolean;
  showSizeGuide: boolean;

  // Tab 3 — Galeria
  galleryThumbsLayout: 'left' | 'bottom' | 'hidden';
  galleryMaxHeight: '45vh' | '55vh' | '60vh';
  galleryShowArrows: boolean;
  galleryZoom: 'off' | 'basic';
  galleryFit: 'contain' | 'cover';

  // Tab 4 — Variações
  variationStyle: 'chips' | 'list-compact' | 'dropdown';
  showStock: boolean;
  allowMultiVariant: boolean;
  stepperStyle: 'compact' | 'default';

  // Tab 5 — CTAs
  ctaText: string;
  ctaSecondaryText: string;
  showSecondaryCta: boolean;
  ctaSize: 'normal' | 'large';

  // Tab 6 — Aparência
  containerRadius: 'sm' | 'md' | 'lg';
  containerShadow: 'sm' | 'md';
  containerBorder: boolean;
  containerPadding: 16 | 20 | 24;
  sectionSpacing: 12 | 16 | 20;

  // Tab 7 — Animação
  animationType: 'slide' | 'fade' | 'none';
  animationDuration: number; // 150–300ms

}

export interface ThemeCustomCode {
  css: string;
  /** @deprecated Scripts field removed for security — use integrations instead */
  headScripts?: string;
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
  global: ThemeGlobal;

  logo: ThemeLogo;
  header: ThemeHeader;
  hero: ThemeHero;
  megaMenu: ThemeMegaMenu;

  productCard: ThemeProductCard;
  productPage: ThemeProductPage;
  category: ThemeCategory;
  cart: ThemeCart;
  checkout: ThemeCheckout;
  quickView: ThemeQuickView;

  footer: ThemeFooter;

  productListing: ThemeProductListing;
  homepageSections: ThemeHomepageSection[];

  badges: ThemeBadges;
  microcopy: ThemeMicrocopy;
  conversion: ThemeConversion;
  responsive: ThemeResponsive;

  whatsapp: ThemeWhatsApp;
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
