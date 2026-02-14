<style>
/* ============================================
   PREMIUM THEME — Gentle-CMS Faithful Port
   Colors via --pm-* CSS vars (hex) from layout
   ============================================ */

/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');

/* Reset */
.pm-theme *,.pm-theme *::before,.pm-theme *::after{box-sizing:border-box}

/* Base */
.pm-theme{
  font-family: var(--pm-font-body, 'Inter', sans-serif);
  font-size: var(--pm-font-size-base, 16px);
  font-weight: var(--pm-body-weight, 400);
  line-height: var(--pm-line-height, 1.6);
  letter-spacing: var(--pm-letter-spacing, 0);
  color: var(--pm-foreground, #1a1a1a);
  background: var(--pm-background, #ffffff);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.pm-theme h1,.pm-theme h2,.pm-theme h3,.pm-theme h4,.pm-theme h5,.pm-theme h6{
  font-family: var(--pm-font-heading, 'Playfair Display', serif);
  font-weight: var(--pm-heading-weight, 700);
  color: var(--pm-foreground);
  margin: 0;
  line-height: 1.2;
}

.pm-theme a{ color: inherit; text-decoration: none; transition: all .2s ease }
.pm-theme img{ max-width:100%; height:auto; display:block }
.pm-theme button{ cursor:pointer; border:none; background:none; font-family:inherit }

/* Utility: font-display / font-body */
.pm-font-display{ font-family: var(--pm-font-heading, 'Playfair Display', serif) !important }
.pm-font-body{ font-family: var(--pm-font-body, 'Inter', sans-serif) !important }

/* Container — matches gentle-cms: container mx-auto px-4 */
.pm-container{
  width: 100%;
  max-width: var(--pm-container-width, 1280px);
  margin: 0 auto;
  padding: 0 16px;
}

/* ══════════════════════════════════════════
   ANNOUNCEMENT BAR
   ══════════════════════════════════════════ */
.pm-announce{
  font-size: 12px;
  padding: 6px 0;
  text-align: center;
  overflow: hidden;
  position: relative;
  font-family: var(--pm-font-body);
  letter-spacing: 0.02em;
}
.pm-announce a{ color: inherit }

/* Ticker */
.pm-announce--ticker .pm-announce__track{
  display: flex;
  white-space: nowrap;
  animation: pm-ticker linear infinite;
}
.pm-announce--ticker-ltr .pm-announce__track{
  animation-name: pm-ticker-ltr;
}
.pm-announce--ticker .pm-announce__item,
.pm-announce--ticker-ltr .pm-announce__item{
  flex-shrink: 0;
  padding: 0 32px;
}

/* Carousel */
.pm-announce--carousel{
  height: 28px;
}
.pm-announce--carousel .pm-announce__item{
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(8px);
  transition: all .5s ease;
}
.pm-announce--carousel .pm-announce__item.active{
  opacity: 1;
  transform: translateY(0);
}

@keyframes pm-ticker{
  0%{ transform: translateX(0) }
  100%{ transform: translateX(-50%) }
}
@keyframes pm-ticker-ltr{
  0%{ transform: translateX(-50%) }
  100%{ transform: translateX(0) }
}

/* ══════════════════════════════════════════
   HEADER — matches StoreHeader.tsx
   ══════════════════════════════════════════ */
.pm-header{
  z-index: 50;
  background: var(--pm-background, #fff);
  backdrop-filter: blur(8px);
}
.pm-header.pm-header--sticky{
  position: sticky;
  top: 0;
}
.pm-header.pm-header--border{
  border-bottom: 1px solid var(--pm-border);
}

.pm-header__main{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--pm-header-height, 64px);
}
.pm-header__main--centered{
  justify-content: center;
  position: relative;
}

/* Logo */
.pm-header__logo{
  display: flex;
  align-items: center;
  gap: 8px;
}
.pm-header__logo img{
  object-fit: contain;
}
.pm-header__logo-text{
  font-family: var(--pm-font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}
@media(min-width:768px){
  .pm-header__logo-text{ font-size: 1.5rem }
}

/* Nav */
.pm-header__nav{
  display: none;
  align-items: center;
  gap: 32px;
}
@media(min-width:1024px){
  .pm-header__nav{ display: flex }
}
.pm-header__nav a{
  font-weight: 500;
  color: var(--pm-muted-fg);
  transition: color .2s;
  font-size: var(--pm-menu-font-size, 13px);
  text-transform: var(--pm-menu-transform, uppercase);
  letter-spacing: var(--pm-menu-letter-spacing, 0.1em);
}
.pm-header__nav a:hover{
  color: var(--pm-foreground);
}

/* Nav centered below logo */
.pm-header__nav-centered{
  display: none;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding-bottom: 12px;
}
@media(min-width:1024px){
  .pm-header__nav-centered{ display: flex }
}
.pm-header__nav-centered a{
  font-weight: 500;
  color: var(--pm-muted-fg);
  transition: color .2s;
  font-size: var(--pm-menu-font-size, 13px);
  text-transform: var(--pm-menu-transform, uppercase);
  letter-spacing: var(--pm-menu-letter-spacing, 0.1em);
}
.pm-header__nav-centered a:hover{
  color: var(--pm-foreground);
}

/* Action icons — ghost buttons like gentle-cms */
.pm-header__actions{
  display: flex;
  align-items: center;
  gap: 4px;
}
.pm-header__icon-btn{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  transition: background .15s;
  position: relative;
  color: var(--pm-foreground);
}
.pm-header__icon-btn:hover{
  background: var(--pm-secondary);
}
.pm-header__icon-btn svg{
  width: var(--pm-icon-size, 20px);
  height: var(--pm-icon-size, 20px);
  stroke-width: 1.5;
}
.pm-header__badge{
  position: absolute;
  top: -2px;
  right: -2px;
  background: var(--pm-foreground);
  color: var(--pm-background);
  font-size: 10px;
  font-weight: 700;
  border-radius: 9999px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hamburger — visible on mobile */
.pm-header__hamburger{
  display: inline-flex;
}
@media(min-width:1024px){
  .pm-header__hamburger{ display: none }
}
.pm-header__hamburger-always{
  display: inline-flex !important;
}

/* Centered mode — actions absolute right */
.pm-header__actions--abs-right{
  position: absolute;
  right: 0;
}
.pm-header__hamburger--abs-left{
  position: absolute;
  left: 0;
}

/* Search bar */
.pm-header__search{
  padding-bottom: 16px;
  animation: pm-slideDown .2s ease;
}
.pm-header__search-input{
  width: 100%;
  padding: 10px 16px 10px 40px;
  background: var(--pm-secondary);
  border: none;
  border-radius: var(--pm-radius, 8px);
  font-family: var(--pm-font-body);
  font-size: 14px;
  color: var(--pm-foreground);
  outline: none;
}
.pm-header__search-wrap{
  position: relative;
}
.pm-header__search-wrap svg{
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--pm-muted-fg);
}

/* Mobile menu sheet */
.pm-mobile-menu-overlay{
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.4);
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transition: all .3s;
}
.pm-mobile-menu-overlay.active{
  opacity: 1;
  visibility: visible;
}
.pm-mobile-menu{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 288px;
  background: var(--pm-background);
  z-index: 101;
  transform: translateX(-100%);
  transition: transform .3s ease;
  overflow-y: auto;
  padding: 32px 24px;
}
.pm-mobile-menu.active{
  transform: translateX(0);
}
.pm-mobile-menu__close{
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pm-mobile-menu nav{
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
}
.pm-mobile-menu nav a:first-child{
  font-family: var(--pm-font-heading);
  font-size: 18px;
  font-weight: 600;
}
.pm-mobile-menu nav a{
  font-size: 16px;
  color: var(--pm-foreground);
  transition: color .2s;
}
.pm-mobile-menu nav a:hover{
  opacity: .8;
}

/* Banner Below Header */
.pm-banner-below{
  position: relative;
  overflow: hidden;
}
.pm-banner-below img{
  width: 100%;
  object-fit: cover;
}
.pm-banner-below__placeholder{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--pm-secondary);
  color: var(--pm-muted-fg);
  font-size: 14px;
}
.pm-banner-below__slide{
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity .7s ease;
}
.pm-banner-below__slide.active{
  opacity: 1;
  position: relative;
}

@keyframes pm-slideDown{
  from{ opacity:0; transform:translateY(-8px) }
  to{ opacity:1; transform:translateY(0) }
}

/* ══════════════════════════════════════════
   HERO — matches HomePage.tsx hero section
   ══════════════════════════════════════════ */
.pm-hero{
  position: relative;
  background-color: var(--pm-secondary);
  background-size: cover;
  background-position: center;
}
.pm-hero__overlay{
  position: absolute;
  inset: 0;
}
.pm-hero__inner{
  position: relative;
  z-index: 10;
  padding: 80px 0;
}
@media(min-width:768px){
  .pm-hero__inner{ padding: 128px 0 }
}
.pm-hero__content{
  max-width: 36rem;
  display: flex;
  flex-direction: column;
}
.pm-hero__content--left{
  text-align: left;
  align-items: flex-start;
}
.pm-hero__content--center{
  text-align: center;
  align-items: center;
  margin: 0 auto;
}
.pm-hero__content--right{
  text-align: right;
  align-items: flex-end;
  margin-left: auto;
}
.pm-hero__subtitle{
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--pm-muted-fg);
  margin-bottom: 16px;
  font-family: var(--pm-font-body);
}
.pm-hero__title{
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 24px;
  white-space: pre-line;
}
@media(min-width:768px){
  .pm-hero__title{ font-size: 3.75rem }
}
.pm-hero__desc{
  color: var(--pm-muted-fg);
  margin-bottom: 32px;
  font-size: 18px;
  font-family: var(--pm-font-body);
}
.pm-hero__cta{
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 32px;
  background: var(--pm-primary);
  color: var(--pm-primary-fg, #fff);
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 500;
  font-family: var(--pm-font-body);
  transition: opacity .2s;
}
.pm-hero__cta:hover{ opacity: .9 }
.pm-hero__cta svg{ width:16px; height:16px }

/* Hero placeholder when no config */
.pm-hero--placeholder{
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--pm-secondary);
}

/* ══════════════════════════════════════════
   SECTIONS — py-16 spacing like gentle-cms
   ══════════════════════════════════════════ */
.pm-section{
  padding: 64px 0;
}
.pm-section--sm{
  padding: 32px 0;
}
.pm-section__title{
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 32px;
  text-align: center;
}
.pm-section__header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}
.pm-section__header h2{
  font-size: 1.5rem;
  font-weight: 700;
}
.pm-section__viewall{
  font-size: 14px;
  font-weight: 500;
  color: var(--pm-muted-fg);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: color .2s;
  margin-left: auto;
}
.pm-section__viewall:hover{ color: var(--pm-foreground) }
.pm-section__viewall svg{ width:16px; height:16px }

/* ══════════════════════════════════════════
   CATEGORIES — rounded cards like gentle-cms
   ══════════════════════════════════════════ */
.pm-categories-grid{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
@media(min-width:768px){
  .pm-categories-grid{ grid-template-columns: repeat(3, 1fr) }
}
@media(min-width:1024px){
  .pm-categories-grid{ grid-template-columns: repeat(6, 1fr) }
}
.pm-category-card{
  text-align: center;
  padding: 24px;
  border-radius: 12px;
  background: var(--pm-secondary);
  transition: background .2s;
}
.pm-category-card:hover{
  background: var(--pm-accent);
}
.pm-category-card__name{
  font-size: 14px;
  font-weight: 500;
  color: var(--pm-foreground);
  transition: color .2s;
}
.pm-category-card__img{
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 12px;
}

/* ══════════════════════════════════════════
   PRODUCT GRID
   ══════════════════════════════════════════ */
.pm-product-grid{
  display: grid;
  gap: 24px;
}
.pm-product-grid--2{ grid-template-columns: repeat(1, 1fr) }
.pm-product-grid--3{ grid-template-columns: repeat(2, 1fr) }
.pm-product-grid--4{ grid-template-columns: repeat(2, 1fr) }
.pm-product-grid--5{ grid-template-columns: repeat(2, 1fr) }
@media(min-width:768px){
  .pm-product-grid--2{ grid-template-columns: repeat(2, 1fr) }
  .pm-product-grid--3{ grid-template-columns: repeat(3, 1fr) }
  .pm-product-grid--4{ grid-template-columns: repeat(3, 1fr) }
  .pm-product-grid--5{ grid-template-columns: repeat(3, 1fr) }
}
@media(min-width:1024px){
  .pm-product-grid--4{ grid-template-columns: repeat(4, 1fr) }
  .pm-product-grid--5{ grid-template-columns: repeat(5, 1fr) }
}

/* ══════════════════════════════════════════
   PRODUCT CARD — faithful to ProductCard.tsx
   ══════════════════════════════════════════ */
.pm-product-card{
  position: relative;
  transition: box-shadow .3s ease;
}
.pm-product-card--shadow-sm{ box-shadow: 0 1px 2px rgba(0,0,0,.05) }
.pm-product-card--shadow-md{ box-shadow: 0 4px 6px rgba(0,0,0,.07) }
.pm-product-card--shadow-lg{ box-shadow: 0 10px 15px rgba(0,0,0,.1) }
.pm-product-card--hover-shadow:hover{ box-shadow: 0 10px 25px rgba(0,0,0,.12) }
.pm-product-card--border{ border: 1px solid var(--pm-border) }
.pm-product-card--center{ text-align: center }

/* Border radius variants */
.pm-product-card--radius-none{ border-radius: 0 }
.pm-product-card--radius-sm{ border-radius: 4px }
.pm-product-card--radius-md{ border-radius: 8px }
.pm-product-card--radius-lg{ border-radius: 12px }

/* Image container */
.pm-product-card__image{
  position: relative;
  overflow: hidden;
  background: var(--pm-secondary);
}
.pm-product-card--radius-none .pm-product-card__image{ border-radius: 0 }
.pm-product-card--radius-sm .pm-product-card__image{ border-radius: 4px }
.pm-product-card--radius-md .pm-product-card__image{ border-radius: 8px }
.pm-product-card--radius-lg .pm-product-card__image{ border-radius: 12px }

/* Aspect ratios */
.pm-product-card__image--1-1{ aspect-ratio: 1/1 }
.pm-product-card__image--3-4{ aspect-ratio: 3/4 }
.pm-product-card__image--4-5{ aspect-ratio: 4/5 }
.pm-product-card__image--2-3{ aspect-ratio: 2/3 }
.pm-product-card__image--16-9{ aspect-ratio: 16/9 }

.pm-product-card__image img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .5s ease;
}

/* Hover effects */
.pm-product-card:hover .pm-product-card__image--zoom img{
  transform: scale(1.05);
}
.pm-product-card:hover .pm-product-card__image--slide img{
  transform: translateX(4px);
}

/* Discount badge */
.pm-product-card__badge{
  position: absolute;
  z-index: 5;
  background: var(--pm-foreground);
  color: var(--pm-background);
  font-size: 12px;
  font-weight: 700;
  padding: 4px 8px;
}
.pm-product-card__badge--tl{ top: 12px; left: 12px }
.pm-product-card__badge--tr{ top: 12px; right: 12px }
.pm-product-card__badge--bl{ bottom: 12px; left: 12px }
.pm-product-card__badge--square{ border-radius: 0 }
.pm-product-card__badge--rounded{ border-radius: 4px }
.pm-product-card__badge--pill{ border-radius: 9999px }

/* Overlay buttons (wishlist, quick view) */
.pm-product-card__overlays{
  position: absolute;
  top: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  opacity: 0;
  transition: opacity .2s ease;
  z-index: 5;
}
.pm-product-card:hover .pm-product-card__overlays{
  opacity: 1;
}
.pm-product-card__overlays--left{ left: 12px }
.pm-product-card__overlays--right{ right: 12px }
.pm-product-card__overlay-btn{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  background: rgba(255,255,255,.9);
  backdrop-filter: blur(4px);
  box-shadow: 0 1px 3px rgba(0,0,0,.1);
  transition: background .15s;
  color: var(--pm-foreground);
}
.pm-product-card__overlay-btn:hover{
  background: var(--pm-background);
}
.pm-product-card__overlay-btn svg{
  width: 16px;
  height: 16px;
}

/* Product info */
.pm-product-card__info--compact{ margin-top: 8px }
.pm-product-card__info--compact > *+*{ margin-top: 2px }
.pm-product-card__info--normal{ margin-top: 12px }
.pm-product-card__info--normal > *+*{ margin-top: 4px }
.pm-product-card__info--spacious{ margin-top: 16px }
.pm-product-card__info--spacious > *+*{ margin-top: 8px }

.pm-product-card__category{
  font-size: 12px;
  color: var(--pm-muted-fg);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.pm-product-card__title{
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--pm-foreground);
}
.pm-product-card__title a{ color: inherit }
.pm-product-card__title--1{ display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden }
.pm-product-card__title--2{ display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden }
.pm-product-card__title--3{ display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden }

.pm-product-card__prices{
  display: flex;
  align-items: center;
  gap: 8px;
}
.pm-product-card--center .pm-product-card__prices{
  justify-content: center;
}
.pm-product-card__price{
  font-weight: 600;
}
.pm-product-card__price--sm{ font-size: 12px }
.pm-product-card__price--md{ font-size: 14px }
.pm-product-card__price--lg{ font-size: 16px }
.pm-product-card__price-old{
  font-size: 12px;
  color: var(--pm-muted-fg);
  text-decoration: line-through;
}
.pm-product-card__installments{
  font-size: 12px;
  color: var(--pm-muted-fg);
}

/* Action buttons */
.pm-product-card__actions{
  margin-top: 8px;
}
.pm-product-card__actions--stacked > *+*{ margin-top: 4px }
.pm-product-card__actions--side{
  display: flex;
  gap: 4px;
}
.pm-product-card__actions--side > *{ flex: 1 }

/* Buy Now button */
.pm-btn-buy{
  display: block;
  width: 100%;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  transition: opacity .2s;
  color: #fff;
}
.pm-btn-buy:hover{ opacity: .9 }
/* Styles */
.pm-btn-buy--solid{ border-radius: 6px }
.pm-btn-buy--outline{ border-radius: 6px; background: transparent !important; border: 2px solid }
.pm-btn-buy--pill{ border-radius: 9999px }
.pm-btn-buy--rounded{ border-radius: 12px }
.pm-btn-buy--sharp{ border-radius: 0 }
.pm-btn-buy--gradient{ border-radius: 6px }
.pm-btn-buy--underline{ border-radius: 0; background: transparent !important; border-bottom: 2px solid }

/* Cart button */
.pm-btn-cart{
  display: block;
  width: 100%;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  transition: opacity .2s;
  background: var(--pm-foreground);
  color: var(--pm-background);
}
.pm-btn-cart:hover{ opacity: .9 }
.pm-btn-cart--solid{ border-radius: 6px }
.pm-btn-cart--outline{ border-radius: 6px; background: transparent !important; border: 2px solid var(--pm-foreground); color: var(--pm-foreground) }
.pm-btn-cart--pill{ border-radius: 9999px }
.pm-btn-cart--rounded{ border-radius: 12px }
.pm-btn-cart--sharp{ border-radius: 0 }
.pm-btn-cart--gradient{ border-radius: 6px; background: linear-gradient(135deg, var(--pm-foreground), var(--pm-muted-fg)) }
.pm-btn-cart--underline{ border-radius: 0; background: transparent !important; border-bottom: 2px solid var(--pm-foreground); color: var(--pm-foreground) }
.pm-btn-cart--compact{ width: auto; padding: 6px 16px }

/* Cart icon button (floating overlay style) */
.pm-btn-cart-icon{
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  background: rgba(255,255,255,.9);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity .2s;
  box-shadow: 0 1px 3px rgba(0,0,0,.1);
  z-index: 5;
}
.pm-product-card:hover .pm-btn-cart-icon{ opacity: 1 }
.pm-btn-cart-icon svg{ width: 16px; height: 16px }

/* ══════════════════════════════════════════
   BANNER SECTION — matches gentle-cms
   ══════════════════════════════════════════ */
.pm-banner{
  background: var(--pm-secondary);
  border-radius: 16px;
  padding: 32px;
  text-align: center;
}
@media(min-width:768px){
  .pm-banner{ padding: 64px }
}
.pm-banner__title{
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 16px;
}
@media(min-width:768px){
  .pm-banner__title{ font-size: 2.25rem }
}
.pm-banner__desc{
  color: var(--pm-muted-fg);
  margin-bottom: 24px;
  font-family: var(--pm-font-body);
}
.pm-banner__btn{
  display: inline-flex;
  align-items: center;
  padding: 12px 32px;
  border: 1px solid var(--pm-border);
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 500;
  font-family: var(--pm-font-body);
  color: var(--pm-foreground);
  background: transparent;
  transition: background .2s;
}
.pm-banner__btn:hover{
  background: var(--pm-accent);
}

/* ══════════════════════════════════════════
   BENEFITS — matches gentle-cms
   ══════════════════════════════════════════ */
.pm-benefits-grid{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
@media(min-width:768px){
  .pm-benefits-grid{ grid-template-columns: repeat(4, 1fr) }
}
.pm-benefit{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--pm-secondary) 50%, transparent);
}
.pm-benefit__icon{
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  background: color-mix(in srgb, var(--pm-foreground) 5%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}
.pm-benefit__icon svg{
  width: 20px;
  height: 20px;
  color: var(--pm-foreground);
  stroke-width: 1.5;
}
.pm-benefit__label{
  font-size: 14px;
  font-weight: 600;
}
.pm-benefit__desc{
  font-size: 12px;
  color: var(--pm-muted-fg);
  margin-top: 2px;
}

/* ══════════════════════════════════════════
   TRUST BAR
   ══════════════════════════════════════════ */
.pm-trust-bar{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  color: var(--pm-muted-fg);
  font-size: 14px;
}
.pm-trust-bar__item{
  display: flex;
  align-items: center;
  gap: 8px;
}
.pm-trust-bar__item svg{
  width: 16px;
  height: 16px;
  stroke-width: 1.5;
}

/* ══════════════════════════════════════════
   CAROUSEL (SectionCarousel)
   ══════════════════════════════════════════ */
.pm-carousel{
  position: relative;
}
.pm-carousel__track{
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0 32px 16px;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.pm-carousel__track::-webkit-scrollbar{ display: none }
.pm-carousel__item{
  flex-shrink: 0;
  scroll-snap-align: start;
}
.pm-carousel__item--category{
  min-width: 160px;
}
.pm-carousel__item--product{
  min-width: 260px;
  max-width: 280px;
}
.pm-carousel__btn{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: rgba(255,255,255,.9);
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0,0,0,.12);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background .15s;
  color: var(--pm-foreground);
}
.pm-carousel__btn:hover{ background: var(--pm-background) }
.pm-carousel__btn--left{ left: 0 }
.pm-carousel__btn--right{ right: 0 }
.pm-carousel__btn svg{ width: 20px; height: 20px }

/* ══════════════════════════════════════════
   FOOTER — matches StoreFooter.tsx
   ══════════════════════════════════════════ */
.pm-footer{
  margin-top: 80px;
  background: var(--pm-footer-bg, #1a1a1a);
  color: var(--pm-footer-text, #fafafa);
}
.pm-footer a{ color: inherit }
.pm-footer__inner{
  padding: 48px 0;
}
.pm-footer__grid{
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}
@media(min-width:768px){
  .pm-footer__grid{ grid-template-columns: repeat(4, 1fr) }
}
.pm-footer__store-name{
  font-family: var(--pm-font-heading);
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
}
.pm-footer__newsletter-desc{
  font-size: 14px;
  opacity: .7;
}
.pm-footer__col-title{
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 16px;
}
.pm-footer__links{
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.pm-footer__links li a{
  font-size: 14px;
  opacity: .7;
  transition: opacity .2s;
}
.pm-footer__links li a:hover{
  opacity: 1;
}

/* Social links */
.pm-footer__social{
  display: flex;
  gap: 12px;
  margin-top: 32px;
}
.pm-footer__social a{
  opacity: .7;
  transition: opacity .2s;
}
.pm-footer__social a:hover{ opacity: 1 }
.pm-footer__social svg{ width: 20px; height: 20px }

/* Bottom bar */
.pm-footer__bottom{
  border-top: 1px solid rgba(255,255,255,.1);
  margin-top: 32px;
  padding-top: 32px;
  text-align: center;
  font-size: 12px;
  opacity: .5;
}
.pm-footer__bottom-inner{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pm-footer__back-top{
  opacity: .7;
  transition: opacity .2s;
  cursor: pointer;
  background: none;
  border: none;
  color: inherit;
}
.pm-footer__back-top:hover{ opacity: 1 }
.pm-footer__back-top svg{ width: 16px; height: 16px }
.pm-footer__bottom-links{
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 8px;
}
.pm-footer__bottom-links a{
  opacity: .7;
  transition: opacity .2s;
}
.pm-footer__bottom-links a:hover{ opacity: 1 }

/* ══════════════════════════════════════════
   WHATSAPP BUTTON — matches StoreLayout.tsx
   ══════════════════════════════════════════ */
.pm-whatsapp{
  position: fixed;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 9999px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,.15);
  transition: transform .2s;
  text-decoration: none;
}
.pm-whatsapp:hover{ transform: scale(1.05); color: #fff }
.pm-whatsapp--br{ bottom: 24px; right: 24px }
.pm-whatsapp--bl{ bottom: 24px; left: 24px }
.pm-whatsapp svg{ width: 20px; height: 20px }
.pm-whatsapp__label{
  font-size: 14px;
  font-weight: 500;
}

/* ══════════════════════════════════════════
   SHOP PAGE — category filters, sort, grid toggle
   ══════════════════════════════════════════ */
.pm-shop__filters{
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}
.pm-shop__filter-pill{
  display: inline-flex;
  padding: 6px 16px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 500;
  background: var(--pm-secondary);
  color: var(--pm-foreground);
  transition: all .2s;
  border: 1px solid transparent;
  text-decoration: none;
}
.pm-shop__filter-pill:hover,
.pm-shop__filter-pill--active{
  background: var(--pm-foreground);
  color: var(--pm-background);
}
.pm-shop__toolbar{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}
.pm-shop__count{
  font-size: 14px;
  color: var(--pm-muted-fg);
}
.pm-shop__controls{
  display: flex;
  align-items: center;
  gap: 8px;
}
.pm-shop__sort{
  padding: 8px 12px;
  border: 1px solid var(--pm-border);
  border-radius: var(--pm-radius, 6px);
  font-size: 14px;
  font-family: var(--pm-font-body);
  color: var(--pm-foreground);
  background: var(--pm-background);
  cursor: pointer;
}
.pm-shop__view-btn{
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--pm-border);
  border-radius: var(--pm-radius, 6px);
  background: transparent;
  color: var(--pm-muted-fg);
  transition: all .15s;
}
.pm-shop__view-btn--active{
  background: var(--pm-foreground);
  color: var(--pm-background);
  border-color: var(--pm-foreground);
}

/* List mode */
.pm-product-list .pm-product-card{
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
}
@media(max-width:640px){
  .pm-product-list .pm-product-card{
    grid-template-columns: 1fr;
  }
}

/* Compact grid */
.pm-product-grid--compact{
  gap: 8px !important;
}

/* ══════════════════════════════════════════
   PAGINATION
   ══════════════════════════════════════════ */
.pm-pagination{
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 40px;
}
.pm-pagination a,
.pm-pagination span{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  padding: 0 8px;
  border-radius: var(--pm-radius, 6px);
  font-size: 14px;
  border: 1px solid var(--pm-border);
  color: var(--pm-foreground);
  transition: all .15s;
}
.pm-pagination a:hover{
  background: var(--pm-secondary);
}
.pm-pagination .active span{
  background: var(--pm-foreground);
  color: var(--pm-background);
  border-color: var(--pm-foreground);
}

/* ══════════════════════════════════════════
   RESPONSIVE HELPERS
   ══════════════════════════════════════════ */
.pm-hide-mobile{ display: none !important }
@media(min-width:768px){ .pm-hide-mobile{ display: flex !important } }
.pm-show-mobile{ display: flex !important }
@media(min-width:768px){ .pm-show-mobile{ display: none !important } }

/* === Dynamic layout via data-pm-layout === */
.pm-header[data-pm-layout] .pm-header__nav-centered { display: none; }
.pm-header[data-pm-layout] .pm-header__main { height: var(--pm-header-height, 72px); }
.pm-header[data-pm-layout] .pm-header__icon-btn svg { width: var(--pm-icon-size, 20px); height: var(--pm-icon-size, 20px); }
.pm-header[data-pm-layout] .pm-header__nav a { font-size: var(--pm-menu-font-size, 14px); text-transform: var(--pm-menu-transform, none); }
.pm-header[data-pm-layout] .pm-header__nav-centered a { font-size: var(--pm-menu-font-size, 14px); text-transform: var(--pm-menu-transform, none); }

.pm-header[data-pm-layout="centered"] .pm-header__main { justify-content: center; position: relative; }
.pm-header[data-pm-layout="centered"] .pm-header__nav { display: none !important; }
.pm-header[data-pm-layout="centered"] .pm-header__nav-centered { display: flex !important; }
.pm-header[data-pm-layout="centered"] .pm-header__hamburger { position: absolute; left: 0; }
.pm-header[data-pm-layout="centered"] .pm-header__actions { position: absolute; right: 0; }

.pm-header[data-pm-layout="hamburger-only"] .pm-header__nav,
.pm-header[data-pm-layout="hamburger-only"] .pm-header__nav-centered { display: none !important; }
.pm-header[data-pm-layout="hamburger-only"] .pm-header__hamburger { display: flex !important; }

.pm-header[data-pm-layout="minimal"] .pm-header__nav { display: none !important; }

.pm-header[data-pm-layout="transparent"] { background: transparent !important; position: absolute; width: 100%; z-index: 100; }

.pm-header[data-pm-layout="two-lines"] .pm-header__main { flex-wrap: wrap; }
.pm-header[data-pm-layout="two-lines"] .pm-header__nav { width: 100%; justify-content: center; border-top: 1px solid var(--pm-border); padding-top: 8px; }

.pm-header[data-pm-layout="nav-left"] .pm-header__main { flex-direction: row-reverse; }
.pm-header[data-pm-layout="nav-left"] .pm-header__actions { flex-direction: row-reverse; }

.pm-header[data-pm-layout="divided"] .pm-header__nav { display: none !important; }
.pm-header[data-pm-layout="divided"] .pm-header__nav-centered { display: none !important; }

/* Classic layout: show nav, hide centered nav */
.pm-header[data-pm-layout="classic"] .pm-header__nav-centered { display: none !important; }
</style>
