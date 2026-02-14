window.addEventListener('message', function (e) {
    if (!e.data || e.data.type !== 'theme-preview-update') return;
    var root = document.documentElement;

    // If editor sends pre-computed cssVariables, use them directly
    if (e.data.cssVariables) {
        var vars = e.data.cssVariables;
        for (var k in vars) { root.style.setProperty(k, vars[k]); }
        return;
    }

    // Otherwise convert the theme settings object to CSS vars
    var t = e.data.theme || {};
    var c = t.colors || {};
    var ty = t.typography || {};
    var g = t.global || {};
    var h = t.header || {};
    var ft = t.footer || {};
    var pc = t.productCard || {};
    var btn = t.buttons || {};
    var inp = t.inputs || {};

    // Colors
    var colorMap = {
        'primary': 'primary', 'primaryForeground': 'primary-fg', 'secondary': 'secondary',
        'secondaryForeground': 'secondary-fg', 'accent': 'accent', 'accentForeground': 'accent-fg',
        'background': 'background', 'foreground': 'foreground', 'muted': 'muted',
        'mutedForeground': 'muted-fg', 'border': 'border', 'buyNow': 'buy-now', 'buyNowHover': 'buy-now-hover'
    };
    for (var ck in colorMap) {
        if (c[ck]) root.style.setProperty('--pm-' + colorMap[ck], c[ck]);
    }

    // Typography
    if (ty.headingFont) {
        root.style.setProperty('--pm-font-heading', "'" + ty.headingFont + "', serif");
        // Load font dynamically
        var linkId = 'pm-preview-font-heading';
        var existH = document.getElementById(linkId);
        if (existH) existH.remove();
        var lnk = document.createElement('link');
        lnk.id = linkId; lnk.rel = 'stylesheet';
        lnk.href = 'https://fonts.googleapis.com/css2?family=' + encodeURIComponent(ty.headingFont) + ':wght@400;500;600;700&display=swap';
        document.head.appendChild(lnk);
    }
    if (ty.bodyFont) {
        root.style.setProperty('--pm-font-body', "'" + ty.bodyFont + "', sans-serif");
        var linkId2 = 'pm-preview-font-body';
        var existB = document.getElementById(linkId2);
        if (existB) existB.remove();
        var lnk2 = document.createElement('link');
        lnk2.id = linkId2; lnk2.rel = 'stylesheet';
        lnk2.href = 'https://fonts.googleapis.com/css2?family=' + encodeURIComponent(ty.bodyFont) + ':wght@300;400;500;600;700&display=swap';
        document.head.appendChild(lnk2);
    }
    if (ty.baseFontSize) root.style.setProperty('--pm-font-size-base', ty.baseFontSize + 'px');
    if (ty.headingWeight) root.style.setProperty('--pm-heading-weight', ty.headingWeight);
    if (ty.bodyWeight) root.style.setProperty('--pm-body-weight', ty.bodyWeight);
    if (ty.lineHeight) root.style.setProperty('--pm-line-height', ty.lineHeight);
    if (ty.letterSpacing !== undefined) root.style.setProperty('--pm-letter-spacing', ty.letterSpacing + 'px');

    // Global
    var radiusMap = { none: '0', small: '4px', medium: '8px', large: '12px', full: '9999px' };
    if (g.borderRadius !== undefined) {
        var rv = typeof g.borderRadius === 'string' ? (radiusMap[g.borderRadius] || '8px') : (g.borderRadius + 'px');
        root.style.setProperty('--pm-radius', rv);
    }
    if (g.containerWidth) root.style.setProperty('--pm-container-width', g.containerWidth);

    // Buttons
    if (btn.borderRadius !== undefined) root.style.setProperty('--pm-btn-radius', btn.borderRadius + 'px');
    if (btn.fontSize) root.style.setProperty('--pm-btn-font-size', btn.fontSize + 'px');
    if (btn.fontWeight) root.style.setProperty('--pm-btn-font-weight', btn.fontWeight);
    if (btn.paddingX) root.style.setProperty('--pm-btn-px', btn.paddingX + 'px');
    if (btn.paddingY) root.style.setProperty('--pm-btn-py', btn.paddingY + 'px');
    if (btn.textTransform) root.style.setProperty('--pm-btn-transform', btn.textTransform);

    // Inputs
    if (inp.borderRadius !== undefined) root.style.setProperty('--pm-input-radius', inp.borderRadius + 'px');
    if (inp.borderColor) root.style.setProperty('--pm-input-border', inp.borderColor);
    if (inp.focusBorderColor) root.style.setProperty('--pm-input-focus-border', inp.focusBorderColor);

    // Header CSS vars
    if (h.height) root.style.setProperty('--pm-header-height', h.height + (typeof h.height === 'number' ? 'px' : ''));
    if (h.iconSize) root.style.setProperty('--pm-icon-size', h.iconSize + (typeof h.iconSize === 'number' ? 'px' : ''));
    if (h.menuFontSize) root.style.setProperty('--pm-menu-font-size', h.menuFontSize + (typeof h.menuFontSize === 'number' ? 'px' : ''));
    root.style.setProperty('--pm-menu-transform', h.menuUppercase ? 'uppercase' : 'none');
    if (h.menuLetterSpacing !== undefined) root.style.setProperty('--pm-menu-letter-spacing', h.menuLetterSpacing + 'em');

    // --- Dynamic header structure updates ---
    var header = document.querySelector('.pm-header');
    if (header) {
        if (h.layout) header.setAttribute('data-pm-layout', h.layout);
        header.classList.toggle('pm-header--sticky', !!h.sticky);
        header.classList.toggle('pm-header--border', !!h.borderBottom);
        header.classList.toggle('pm-header--shadow-scroll', !!h.shadowOnScroll);
        // Action icons show/hide
        ['search', 'wishlist', 'account', 'cart'].forEach(function (a) {
            var key = 'show' + a.charAt(0).toUpperCase() + a.slice(1);
            var el = header.querySelector('[data-pm-action="' + a + '"]');
            if (el) el.style.display = h[key] === false ? 'none' : '';
        });
    }

    // --- Announcement bar ---
    var annWrap = document.querySelector('.pm-announce-wrapper');
    if (annWrap) {
        var ann = h.announcement || h.announcementBar || {};
        annWrap.style.display = ann.enabled === false ? 'none' : '';
        // Update colors
        var annInner = annWrap.querySelector('.pm-announce');
        if (annInner) {
            if (ann.backgroundColor) annInner.style.background = ann.backgroundColor;
            if (ann.textColor) annInner.style.color = ann.textColor;
        }
        // Update messages text
        var msgs = ann.messages || [];
        if (msgs.length > 0) {
            var annItems = annWrap.querySelectorAll('.pm-announce__item');
            annItems.forEach(function (item, idx) {
                var msgIdx = idx % msgs.length;
                if (msgs[msgIdx] !== undefined) item.textContent = msgs[msgIdx];
            });
            // Also update static text if exists
            var staticAnn = annWrap.querySelector('.pm-announce:not(.pm-announce--ticker):not(.pm-announce--carousel):not(.pm-announce--ticker-ltr)');
            if (staticAnn && !staticAnn.querySelector('.pm-announce__item') && msgs[0]) {
                staticAnn.textContent = msgs[0];
            }
        }
    }

    // --- Banner below ---
    var bbWrap = document.querySelector('.pm-banner-below-wrapper');
    if (bbWrap) {
        var bbl = h.bannerBelow || {};
        bbWrap.style.display = (bbl.enabled === false) ? 'none' : '';
        // Update image src
        if (bbl.imageUrl) {
            var bbImg = bbWrap.querySelector('img');
            if (bbImg) bbImg.src = bbl.imageUrl;
        }
        // Update height
        if (bbl.height) {
            bbWrap.querySelectorAll('.pm-banner-below, .pm-banner-below img, .pm-banner-below__placeholder').forEach(function (el) {
                el.style.height = bbl.height + 'px';
            });
        }
    }

    // Footer
    var footer = document.querySelector('.pm-footer');
    if (footer) {
        if (ft.backgroundColor) {
            footer.style.background = ft.backgroundColor;
            root.style.setProperty('--pm-footer-bg', ft.backgroundColor);
        }
        if (ft.textColor) {
            footer.style.color = ft.textColor;
            root.style.setProperty('--pm-footer-text', ft.textColor);
            // Update all footer text elements
            footer.querySelectorAll('.pm-footer__store-name, .pm-footer__col-title').forEach(function (el) {
                el.style.color = ft.textColor;
            });
            footer.querySelectorAll('.pm-footer__links a, .pm-footer__bottom-links a').forEach(function (el) {
                el.style.color = ft.textColor + 'b3';
            });
        }
        if (ft.showBackToTop !== undefined) {
            var btt = footer.querySelector('.pm-footer__back-top');
            if (btt) btt.style.display = ft.showBackToTop ? '' : 'none';
        }
    }

    // Product card
    if (pc.imageAspect) {
        var parts = pc.imageAspect.split(':');
        if (parts.length === 2) root.style.setProperty('--pm-card-aspect', parts[0] + '/' + parts[1]);
    }
    // Product card show/hide elements
    document.querySelectorAll('.pm-product-card').forEach(function (card) {
        // Badge
        var badge = card.querySelector('.pm-product-card__badge');
        if (badge) badge.style.display = pc.showDiscount === false ? 'none' : '';
        // Category
        var cat = card.querySelector('.pm-product-card__category');
        if (cat) cat.style.display = pc.showCategory === false ? 'none' : '';
        // Border
        if (pc.showBorder !== undefined) {
            card.style.borderWidth = pc.showBorder ? '1px' : '0';
        }
        // Shadow
        if (pc.shadow !== undefined) {
            var shadows = { none: 'none', small: '0 1px 3px rgba(0,0,0,.08)', medium: '0 4px 12px rgba(0,0,0,.1)', large: '0 8px 24px rgba(0,0,0,.12)' };
            card.style.boxShadow = shadows[pc.shadow] || 'none';
        }
    });

    // Also set --color-primary alias
    if (c.primary) root.style.setProperty('--color-primary', c.primary);
});
