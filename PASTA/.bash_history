</script>
  @endif'''
ns=s[:start]+new+s[end:]
p.write_text(ns)
print('patched')
PY

php artisan view:clear
cd /home/u324811576/domains/flashloja.com.br/public_html
awk '{print NR":"$0}' resources/views/user/appearance/premium-panels.blade.php | grep -i -E 'formul|inputs|input' | head -n 80
nl -ba resources/views/user-front/layout.blade.php | sed -n '140,240p'
nl -ba resources/views/user-front/layout.blade.php | sed -n '240,340p'
nl -ba resources/views/user-front/layout.blade.php | sed -n '340,430p'
nl -ba resources/views/user-front/layout.blade.php | sed -n '430,500p'
python3 - <<'PY'
from pathlib import Path
import re
p=Path('resources/views/user-front/layout.blade.php')
s=p.read_text()
pat=r"(\{\{-- Theme Preview Live Update --\}\}\s*\n\s*@if \(request\(\)->get\('theme-preview'\) == 'true'\)\s*\n)([\s\S]*?)(\n\s*@endif\s*\n\s*@endif)"
m=re.search(pat,s)
if not m:
    raise SystemExit('block not found')
new_script="""  <script>
  (function(){
    function stableStringify(obj){ if(obj===null||typeof obj!=='object') return JSON.stringify(obj); if(Array.isArray(obj)) return '['+obj.map(stableStringify).join(',')+']'; return '{'+Object.keys(obj).sort().map(function(k){ return JSON.stringify(k)+':'+stableStringify(obj[k]); }).join(',')+'}'; }
    function hashTheme(obj){ var str=stableStringify(obj||{}), h=0; for(var i=0;i<str.length;i++){ h=((h<<5)-h)+str.charCodeAt(i); h|=0; } return String(h>>>0); }
    function upsertStyle(id, css){ var st=document.getElementById(id); if(!st){ st=document.createElement('style'); st.id=id; document.head.appendChild(st); } st.textContent=css||''; }
    function applyTheme(themeJSON, meta){
      var theme = themeJSON || {};
      var root = document.documentElement;
      function setVar(name,val){ if(val!==undefined && val!==null && val!=='') root.style.setProperty(name, val); }
      function setText(sel,val){ if(val!==undefined && val!==null) document.querySelectorAll(sel).forEach(function(el){ el.textContent = val; }); }
      function setImg(sel,val){ if(val) document.querySelectorAll(sel).forEach(function(el){ el.src = val; }); }
      function toggle(sel,val){ document.querySelectorAll(sel).forEach(function(el){ el.style.display = val ? '' : 'none'; }); }

      var c = theme.colors || {};
      setVar('--pm-primary', c.primary); setVar('--pm-primary-fg', c.primaryForeground);
      setVar('--pm-secondary', c.secondary); setVar('--pm-secondary-fg', c.secondaryForeground);
      setVar('--pm-accent', c.accent); setVar('--pm-accent-fg', c.accentForeground);
      setVar('--pm-background', c.background); setVar('--pm-foreground', c.foreground);
      setVar('--pm-muted', c.muted); setVar('--pm-muted-fg', c.mutedForeground);
      setVar('--pm-border', c.border); setVar('--pm-success', c.success); setVar('--pm-warning', c.warning); setVar('--pm-error', c.error);
      setVar('--pm-buy-now', c.buyNow); setVar('--pm-buy-now-hover', c.buyNowHover); setVar('--color-primary', c.primary);

      var ty = theme.typography || {};
      if(ty.headingFont){
        setVar('--pm-font-heading', "'"+ty.headingFont+"', serif");
        var hId='pm-font-h', oldH=document.getElementById(hId); if(oldH) oldH.remove();
        var lh=document.createElement('link'); lh.id=hId; lh.rel='stylesheet';
        lh.href='https://fonts.googleapis.com/css2?family='+encodeURIComponent(ty.headingFont)+':wght@400;500;600;700&display=swap';
        document.head.appendChild(lh);
      }
      if(ty.bodyFont){
        setVar('--pm-font-body', "'"+ty.bodyFont+"', sans-serif");
        var bId='pm-font-b', oldB=document.getElementById(bId); if(oldB) oldB.remove();
        var lb=document.createElement('link'); lb.id=bId; lb.rel='stylesheet';
        lb.href='https://fonts.googleapis.com/css2?family='+encodeURIComponent(ty.bodyFont)+':wght@300;400;500;600;700&display=swap';
        document.head.appendChild(lb);
      }
      setVar('--pm-font-size-base', ty.baseFontSize ? ty.baseFontSize+'px' : null);
      setVar('--pm-heading-weight', ty.headingWeight); setVar('--pm-body-weight', ty.bodyWeight);
      setVar('--pm-line-height', ty.lineHeight); setVar('--pm-letter-spacing', (ty.letterSpacing!==undefined&&ty.letterSpacing!==null) ? ty.letterSpacing+'px' : null);

      var g = theme.global || {};
      setVar('--pm-container-width', g.containerWidth || (g.containerMaxPx ? g.containerMaxPx+'px' : null));
      var rMap={none:'0',small:'4px',medium:'8px',large:'12px',full:'9999px'};
      setVar('--pm-radius', g.borderRadius ? (rMap[g.borderRadius] || g.borderRadius+'px') : null);

      var h = theme.header || {};
      setVar('--pm-header-height', h.height ? (h.height + (typeof h.height==='number'?'px':'')) : null);
      setVar('--pm-icon-size', h.iconSize ? (h.iconSize + (typeof h.iconSize==='number'?'px':'')) : null);
      setVar('--pm-menu-font-size', h.menuFontSize ? (h.menuFontSize + (typeof h.menuFontSize==='number'?'px':'')) : null);
      setVar('--pm-menu-transform', h.menuUppercase ? 'uppercase' : 'none');
      setVar('--pm-menu-letter-spacing', h.menuLetterSpacing ? h.menuLetterSpacing+'em' : null);
      var header=document.querySelector('.pm-header');
      if(header){ if(h.layout) header.setAttribute('data-pm-layout', h.layout); header.classList.toggle('pm-header--sticky', !!h.sticky); header.classList.toggle('pm-header--border', !!h.borderBottom); header.classList.toggle('pm-header--shadow-scroll', !!h.shadowOnScroll); toggle('.pm-header__search-wrap', h.showSearch); toggle('.pm-header__action--wishlist', h.showWishlist); toggle('.pm-header__action--account', h.showAccount); toggle('.pm-header__action--cart', h.showCart); }
      var ann=h.announcement||{}; var annWrap=document.querySelector('.pm-announce-wrapper');
      if(annWrap){ annWrap.style.display = ann.enabled===false ? 'none' : ''; if(ann.backgroundColor) annWrap.style.background=ann.backgroundColor; if(ann.textColor) annWrap.style.color=ann.textColor; var msgs=ann.messages||[]; var items=annWrap.querySelectorAll('.pm-announce__item'); if(items.length>0 && msgs.length>0) items.forEach(function(item,i){ item.textContent=msgs[i%msgs.length]; }); else { var sm=annWrap.querySelector('.pm-announce'); if(sm&&msgs[0]) sm.textContent=msgs[0]; }}
      var bb=h.bannerBelow||{}; var bbWrap=document.querySelector('.pm-banner-below-wrapper');
      if(bbWrap){ bbWrap.style.display = bb.enabled===false ? 'none' : ''; if(bb.imageUrl){ var img=bbWrap.querySelector('img'); if(img) img.src=bb.imageUrl; } if(bb.height){ bbWrap.style.height=bb.height+'px'; var i2=bbWrap.querySelector('img'); if(i2) i2.style.height=bb.height+'px'; } }

      var b=theme.buttons||{};
      setVar('--pm-btn-radius', b.borderRadius ? b.borderRadius+'px' : (b.radius ? ({none:'0',small:'4px',medium:'8px',large:'12px',pill:'9999px'})[b.radius] : null));
      setVar('--pm-btn-transform', b.uppercase ? 'uppercase' : (b.textTransform || 'none'));
      setVar('--pm-btn-font-weight', b.fontWeight);

      var i=theme.inputs||{};
      setVar('--pm-input-radius', i.borderRadius ? i.borderRadius+'px' : (i.radius ? ({none:'0',small:'4px',medium:'8px',large:'12px',pill:'9999px'})[i.radius] : null));
      setVar('--pm-input-border', i.borderColor); setVar('--pm-input-focus-border', i.focusBorderColor);
      if(i.style){ root.setAttribute('data-pm-input-style', i.style); } if(i.focusRing!==undefined){ root.setAttribute('data-pm-focus-ring', i.focusRing ? '1':'0'); }

      var pc=theme.productCard||{};
      if(pc.imageAspect){ var p=String(pc.imageAspect).split(':'); if(p.length===2) setVar('--pm-card-aspect', p[0]+'/'+p[1]); }
      setVar('--pm-card-radius', pc.imageBorderRadius ? rMap[pc.imageBorderRadius] : null);
      setVar('--pm-price-size', pc.priceSize ? ({small:'14px',medium:'16px',large:'20px'})[pc.priceSize] : null);
      toggle('.pm-product-card__badge', pc.showDiscount); toggle('.pm-product-card__category', pc.showCategory); toggle('.pm-btn-buy', pc.showBuyNow); toggle('.pm-btn-cart-icon', pc.showAddToCart); toggle('.pm-product-card__action--wishlist', pc.showWishlist); toggle('.pm-product-card__action--quickview', pc.showQuickView);

      var f=theme.footer||{};
      if(f.backgroundColor){ setVar('--pm-footer-bg',f.backgroundColor); var ft=document.querySelector('.pm-footer'); if(ft) ft.style.background=f.backgroundColor; }
      if(f.textColor){ setVar('--pm-footer-text',f.textColor); var ft2=document.querySelector('.pm-footer'); if(ft2) ft2.style.color=f.textColor; }
      toggle('.pm-footer-newsletter', f.showNewsletter);
      setText('.pm-footer__copyright-text', f.copyrightText); setText('.pm-footer__newsletter-title', f.newsletterTitle); setText('.pm-footer__newsletter-desc', f.newsletterDescription);

      var lg=theme.logo||{};
      if(lg.text!==undefined) setText('.pm-logo__text,.site-logo-text,.navbar-brand-text', lg.text);
      if(lg.imageUrl) setImg('.pm-logo img,.site-logo img,.navbar-brand img', lg.imageUrl);
      if(lg.maxHeight) setVar('--pm-logo-max-height', (typeof lg.maxHeight==='number'?lg.maxHeight+'px':lg.maxHeight));
      if(lg.showText!==undefined){ toggle('.pm-logo__text,.site-logo-text,.navbar-brand-text', !!lg.showText); }

      var hero=theme.hero||{};
      if(hero.enabled!==undefined) toggle('.pm-hero,.hero-section,.pm-section--hero', !!hero.enabled);
      if(hero.slides&&hero.slides.length){ hero.slides.forEach(function(slide, idx){ var i=idx+1; var base='.pm-hero-slide:nth-child('+i+')'; if(slide.title) setText(base+' .pm-hero__title', slide.title); if(slide.subtitle) setText(base+' .pm-hero__subtitle', slide.subtitle); if(slide.description) setText(base+' .pm-hero__desc', slide.description); if(slide.ctaText) setText(base+' .pm-hero__cta', slide.ctaText); if(slide.backgroundImage){ document.querySelectorAll(base).forEach(function(el){ el.style.backgroundImage='url('+slide.backgroundImage+')'; }); } if(slide.textColor){ document.querySelectorAll(base+' .pm-hero__content,'+base+' .pm-hero__title,'+base+' .pm-hero__subtitle,'+base+' .pm-hero__desc').forEach(function(el){ el.style.color=slide.textColor; }); } }); }

      var cc=theme.customCode||{};
      upsertStyle('custom-css', cc.customCSS||'');
      if(cc.customJS!==undefined){ var jh=hashTheme({js:String(cc.customJS||'')}); if(window.__peCustomJsHash!==jh){ window.__peCustomJsHash=jh; try{ (new Function(String(cc.customJS||'')))(); }catch(err){ console.warn('custom JS error', err); } } }

      var applyHash = hashTheme(theme);
      root.setAttribute('data-theme-hash', applyHash);
      upsertStyle('theme-dynamic', ':root[data-theme-hash="'+applyHash+'"]{outline-color:transparent;}');

      var appliedMeta={ themeHash: (meta&&meta.themeHash) ? meta.themeHash : applyHash, themeVersion:(meta&&meta.themeVersion)||null, lastPreviewApply:Date.now(), lastPublish:(meta&&meta.lastPublish)||null };
      try{ window.parent && window.parent.postMessage({type:'THEME_APPLIED', meta:appliedMeta}, '*'); }catch(_e){}
    }

    window.addEventListener('message', function(e){ if(!e.data || e.data.type!=='theme-preview-update') return; applyTheme(e.data.theme||{}, e.data.meta||{}); });
    try{ window.parent && window.parent.postMessage({type:'PREVIEW_READY', ts:Date.now()}, '*'); }catch(_e){}
  })();
  </script>"""
ns=s[:m.start(2)] + new_script + s[m.end(2):]
p.write_text(ns)
print('patched preview block')
PY

php artisan view:clear
php artisan cache:clear
php -l resources/views/user-front/layout.blade.php
cd /home/u324811576/domains/flashloja.com.br/public_html
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user-front/layout.blade.php')
s=p.read_text()
old="""      var b=theme.buttons||{};
      setVar('--pm-btn-radius', b.borderRadius ? b.borderRadius+'px' : (b.radius ? ({none:'0',small:'4px',medium:'8px',large:'12px',pill:'9999px'})[b.radius] : null));
      setVar('--pm-btn-transform', b.uppercase ? 'uppercase' : (b.textTransform || 'none'));
      setVar('--pm-btn-font-weight', b.fontWeight);
"""
new="""      var b=theme.buttons||{};
      var btnRadiusMap={none:'0',small:'4px',medium:'8px',large:'12px',full:'9999px',pill:'9999px'};
      setVar('--pm-btn-radius', b.borderRadius ? b.borderRadius+'px' : (b.radius ? btnRadiusMap[b.radius] : null));
      setVar('--pm-btn-transform', b.uppercase ? 'uppercase' : (b.textTransform || 'none'));
      setVar('--pm-btn-font-weight', b.fontWeight);
      if(b.size){ setVar('--pm-btn-size', b.size); }
      if(b.style){ root.setAttribute('data-pm-btn-style', b.style); }
      if(b.shadow!==undefined){ root.setAttribute('data-pm-btn-shadow', b.shadow ? '1':'0'); }
"""
if old not in s:
    raise SystemExit('target block not found')
s=s.replace(old,new,1)
p.write_text(s)
print('patched buttons mapping')
PY

php artisan view:clear
php artisan cache:clear
php -l resources/views/user-front/layout.blade.php
cd /home/u324811576/domains/flashloja.com.br/public_html
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user-front/layout.blade.php')
s=p.read_text()
# initial root vars
s=s.replace("--pm-font-heading: {!! $pmFontHeading !!};\n          --pm-font-body: {!! $pmFontBody !!};","--pm-font-heading: {!! $pmFontHeading !!};\n          --pm-font-body: {!! $pmFontBody !!};\n          --font-display: {!! $pmFontHeading !!};\n          --font-body: {!! $pmFontBody !!};")
# runtime applyTheme vars
s=s.replace("setVar('--pm-font-heading', \"'\"+ty.headingFont+\"', serif\");","setVar('--pm-font-heading', \"'\"+ty.headingFont+\"', serif\");\n          setVar('--font-display', \"'\"+ty.headingFont+\"', serif\");")
s=s.replace("setVar('--pm-font-body', \"'\"+ty.bodyFont+\"', sans-serif\");","setVar('--pm-font-body', \"'\"+ty.bodyFont+\"', sans-serif\");\n          setVar('--font-body', \"'\"+ty.bodyFont+\"', sans-serif\");")
p.write_text(s)
print('patched font aliases')
PY

php artisan view:clear
php artisan cache:clear
php -l resources/views/user-front/layout.blade.php
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user-front/layout.blade.php')
s=p.read_text()
anchor="""          --color-primary: {{ $pmColors['primary'] ?? '#6366f1' }};
        }
      </style>
"""
insert="""          --color-primary: {{ $pmColors['primary'] ?? '#6366f1' }};
        }

        .pm-page,
        .pm-page * {
          font-family: var(--pm-font-body, var(--font-body, 'Inter', sans-serif));
        }

        .pm-page h1,
        .pm-page h2,
        .pm-page h3,
        .pm-page h4,
        .pm-page h5,
        .pm-page h6,
        .pm-hero__title,
        .pm-section__title,
        .pm-product-card__title {
          font-family: var(--pm-font-heading, var(--font-display, 'Playfair Display', serif)) !important;
        }
      </style>
"""
if anchor not in s:
    raise SystemExit('anchor not found')
s=s.replace(anchor,insert,1)
# dynamic style include heading/body enforcement for preview instant update
old="upsertStyle('theme-dynamic', ':root[data-theme-hash="+applyHash+"]{outline-color:transparent;}');"
new="upsertStyle('theme-dynamic', ':root[data-theme-hash="+applyHash+"]{outline-color:transparent;} .pm-page,.pm-page *{font-family:var(--pm-font-body,var(--font-body,\\'Inter\\',sans-serif));} .pm-page h1,.pm-page h2,.pm-page h3,.pm-page h4,.pm-page h5,.pm-page h6,.pm-hero__title,.pm-section__title,.pm-product-card__title{font-family:var(--pm-font-heading,var(--font-display,\\'Playfair Display\\',serif)) !important;}');"
if old in s:
    s=s.replace(old,new,1)
else:
    print('dynamic anchor missing')
p.write_text(s)
print('patched pm-page font rules')
PY

php artisan view:clear
php artisan cache:clear
php -l resources/views/user-front/layout.blade.php
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user-front/layout.blade.php')
s=p.read_text()
needle="""          --color-primary: {{ $pmColors['primary'] ?? '#6366f1' }};
        }
      </style>
"""
add="""          --color-primary: {{ $pmColors['primary'] ?? '#6366f1' }};
        }

        .pm-page,
        .pm-page * {
          font-family: var(--pm-font-body, var(--font-body, 'Inter', sans-serif));
        }

        .pm-page h1,
        .pm-page h2,
        .pm-page h3,
        .pm-page h4,
        .pm-page h5,
        .pm-page h6,
        .pm-hero__title,
        .pm-section__title,
        .pm-product-card__title {
          font-family: var(--pm-font-heading, var(--font-display, 'Playfair Display', serif)) !important;
        }
      </style>
"""
if needle not in s:
    raise SystemExit('needle missing')
s=s.replace(needle,add,1)
old="upsertStyle('theme-dynamic', ':root[data-theme-hash="+'"'+"'+applyHash+'"'+"']{outline-color:transparent;}');"
# fallback direct
old2="upsertStyle('theme-dynamic', ':root[data-theme-hash="'+applyHash+'"]{outline-color:transparent;}');"
new2="upsertStyle('theme-dynamic', ':root[data-theme-hash="'+applyHash+'"]{outline-color:transparent;} .pm-page,.pm-page *{font-family:var(--pm-font-body,var(--font-body,\\'Inter\\',sans-serif));} .pm-page h1,.pm-page h2,.pm-page h3,.pm-page h4,.pm-page h5,.pm-page h6,.pm-hero__title,.pm-section__title,.pm-product-card__title{font-family:var(--pm-font-heading,var(--font-display,\\'Playfair Display\\',serif)) !important;}');"
if old2 in s:
    s=s.replace(old2,new2,1)
else:
    print('theme-dynamic line not found')
p.write_text(s)
print('patched pm-page typography')
PY

php artisan view:clear
php artisan cache:clear
php -l resources/views/user-front/layout.blade.php
python3 - <<'PY'
from pathlib import Path
import re
p=Path('resources/views/user-front/layout.blade.php')
s=p.read_text()
pat=r"(--color-primary:\s*\{\{\s*\$pmColors\['primary'\]\s*\?\?\s*'#6366f1'\s*\}\};\s*\n\s*\})\s*\n\s*</style>"
m=re.search(pat,s)
if not m:
    raise SystemExit('pattern not found')
inject=m.group(1)+"\n\n        .pm-page,\n        .pm-page * {\n          font-family: var(--pm-font-body, var(--font-body, 'Inter', sans-serif));\n        }\n\n        .pm-page h1,\n        .pm-page h2,\n        .pm-page h3,\n        .pm-page h4,\n        .pm-page h5,\n        .pm-page h6,\n        .pm-hero__title,\n        .pm-section__title,\n        .pm-product-card__title {\n          font-family: var(--pm-font-heading, var(--font-display, 'Playfair Display', serif)) !important;\n        }\n      </style>"
s=s[:m.start()]+inject+s[m.end():]
p.write_text(s)
print('inserted pm-page font css')
PY

php artisan view:clear
php artisan cache:clear
php -l resources/views/user-front/layout.blade.php
cd /home/u324811576/domains/flashloja.com.br/public_html
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user-front/layout.blade.php')
s=p.read_text()
old_pc="""        var pc=theme.productCard||{};
        if(pc.imageAspect){ var p=String(pc.imageAspect).split(':'); if(p.length===2) setVar('--pm-card-aspect', p[0]+'/'+p[1]); }
        setVar('--pm-card-radius', pc.imageBorderRadius ? rMap[pc.imageBorderRadius] : null);
        setVar('--pm-price-size', pc.priceSize ? ({small:'14px',medium:'16px',large:'20px'})[pc.priceSize] : null);
        toggle('.pm-product-card__badge', pc.showDiscount); toggle('.pm-product-card__category', pc.showCategory); toggle('.pm-btn-buy', pc.showBuyNow); toggle('.pm-btn-cart-icon', pc.showAddToCart); toggle('.pm-product-card__action--wishlist', pc.showWishlist); toggle('.pm-product-card__action--quickview', pc.showQuickView);
"""
new_pc="""        var pc=theme.productCard||{};
        if(pc.imageAspect){ var p=String(pc.imageAspect).split(':'); if(p.length===2) setVar('--pm-card-aspect', p[0]+'/'+p[1]); }
        setVar('--pm-card-radius', pc.imageBorderRadius ? rMap[pc.imageBorderRadius] : null);
        setVar('--pm-price-size', pc.priceSize ? ({small:'14px',medium:'16px',large:'20px'})[pc.priceSize] : null);
        if(pc.layout){ root.setAttribute('data-pm-card-layout', pc.layout); }
        if(pc.contentAlign){ root.setAttribute('data-pm-card-align', pc.contentAlign); }
        if(pc.buttonStyle){ root.setAttribute('data-pm-card-btn-style', pc.buttonStyle); }
        if(pc.buttonLayout){ root.setAttribute('data-pm-card-btn-layout', pc.buttonLayout); }
        document.querySelectorAll('.pm-product-card').forEach(function(card){
          if(pc.contentAlign){ card.classList.toggle('pm-product-card--center', pc.contentAlign==='center'); }
          if(pc.shadow){ card.classList.remove('pm-product-card--shadow-sm','pm-product-card--shadow-md','pm-product-card--shadow-lg'); var smap={none:'',subtle:'pm-product-card--shadow-sm',small:'pm-product-card--shadow-sm',medium:'pm-product-card--shadow-md',strong:'pm-product-card--shadow-lg'}; if(smap[pc.shadow]) card.classList.add(smap[pc.shadow]); }
          if(pc.border!==undefined){ card.classList.toggle('pm-product-card--border', !!pc.border); }
          if(pc.hoverShadow!==undefined){ card.classList.toggle('pm-product-card--hover-shadow', !!pc.hoverShadow); }
        });
        document.querySelectorAll('.pm-product-card__title').forEach(function(el){ if(pc.titleLines){ el.classList.remove('pm-product-card__title--1','pm-product-card__title--2','pm-product-card__title--3'); el.classList.add('pm-product-card__title--'+pc.titleLines); } });
        document.querySelectorAll('.pm-btn-buy').forEach(function(el){ if(pc.buttonStyle){ el.classList.remove('pm-btn-buy--solid','pm-btn-buy--outline','pm-btn-buy--pill','pm-btn-buy--rounded','pm-btn-buy--sharp','pm-btn-buy--gradient','pm-btn-buy--underline'); el.classList.add('pm-btn-buy--'+pc.buttonStyle); } if(pc.buyNowText){ el.textContent=pc.buyNowText; } });
        document.querySelectorAll('.pm-btn-cart').forEach(function(el){ if(pc.buttonStyle){ el.classList.remove('pm-btn-cart--solid','pm-btn-cart--outline','pm-btn-cart--pill','pm-btn-cart--rounded','pm-btn-cart--sharp','pm-btn-cart--gradient','pm-btn-cart--underline'); el.classList.add('pm-btn-cart--'+pc.buttonStyle); } if(pc.addToCartText){ el.textContent=pc.addToCartText; } });
        document.querySelectorAll('.pm-product-card__actions').forEach(function(el){ if(pc.buttonLayout==='side-by-side') {el.classList.add('pm-product-card__actions--side');el.classList.remove('pm-product-card__actions--stacked');} else if(pc.buttonLayout==='stacked'){el.classList.add('pm-product-card__actions--stacked');el.classList.remove('pm-product-card__actions--side');} });
        toggle('.pm-product-card__badge', pc.showDiscount); toggle('.pm-product-card__category', pc.showCategory); toggle('.pm-btn-buy', pc.showBuyNow); toggle('.pm-btn-cart-icon', pc.showAddToCart); toggle('.pm-product-card__action--wishlist', pc.showWishlist); toggle('.pm-product-card__action--quickview', pc.showQuickView);
"""
if old_pc not in s: raise SystemExit('pc block not found')
s=s.replace(old_pc,new_pc,1)
old_logo="""        var lg=theme.logo||{};
        if(lg.text!==undefined) setText('.pm-logo__text,.site-logo-text,.navbar-brand-text', lg.text);
        if(lg.imageUrl) setImg('.pm-logo img,.site-logo img,.navbar-brand img', lg.imageUrl);
        if(lg.maxHeight) setVar('--pm-logo-max-height', (typeof lg.maxHeight==='number'?lg.maxHeight+'px':lg.maxHeight));
        if(lg.showText!==undefined){ toggle('.pm-logo__text,.site-logo-text,.navbar-brand-text', !!lg.showText); }
"""
new_logo="""        var lg=theme.logo||{};
        if(lg.text!==undefined) setText('.pm-header__logo-text,.pm-logo__text,.site-logo-text,.navbar-brand-text', lg.text);
        if(lg.imageUrl) setImg('.pm-header__logo img,.pm-logo img,.site-logo img,.navbar-brand img', lg.imageUrl);
        if(lg.maxHeight){ var mh=(typeof lg.maxHeight==='number'?lg.maxHeight+'px':lg.maxHeight); setVar('--pm-logo-max-height', mh); document.querySelectorAll('.pm-header__logo img').forEach(function(im){ im.style.maxHeight=mh; im.style.height=mh; }); }
        if(lg.showText!==undefined){ toggle('.pm-header__logo-text,.pm-logo__text,.site-logo-text,.navbar-brand-text', !!lg.showText); }
        if(lg.position){ root.setAttribute('data-pm-logo-position', lg.position); }
"""
if old_logo not in s: raise SystemExit('logo block not found')
s=s.replace(old_logo,new_logo,1)
old2="upsertStyle('theme-dynamic', ':root[data-theme-hash="+'"'+"'+applyHash+'"'+"']{outline-color:transparent;}');"
old2="upsertStyle('theme-dynamic', ':root[data-theme-hash="'+applyHash+'"]{outline-color:transparent;}');"
new2="upsertStyle('theme-dynamic', ':root[data-theme-hash="'+applyHash+'"]{outline-color:transparent;} .pm-page,.pm-page *{font-family:var(--pm-font-body,var(--font-body,\\'Inter\\',sans-serif));} .pm-page h1,.pm-page h2,.pm-page h3,.pm-page h4,.pm-page h5,.pm-page h6,.pm-hero__title,.pm-section__title,.pm-product-card__title{font-family:var(--pm-font-heading,var(--font-display,\\'Playfair Display\\',serif)) !important;} .pm-header__logo img{max-height:var(--pm-logo-max-height,48px);height:var(--pm-logo-max-height,48px);} :root[data-pm-logo-position=\\'center\\'] .pm-header__logo{justify-content:center;margin:0 auto;} :root[data-pm-card-layout=\\'horizontal\\'] .pm-product-card{display:flex;gap:12px;align-items:flex-start;} :root[data-pm-card-layout=\\'horizontal\\'] .pm-product-card__image{width:45%;flex:0 0 45%;} :root[data-pm-card-layout=\\'minimal\\'] .pm-product-card__category,:root[data-pm-card-layout=\\'minimal\\'] .pm-product-card__installments{display:none !important;} :root[data-pm-card-layout=\\'overlay\\'] .pm-product-card__info{margin-top:-64px;position:relative;z-index:2;background:linear-gradient(to top,rgba(0,0,0,.5),transparent);color:#fff;padding:8px;} .pm-footer__grid{grid-template-columns:repeat(var(--pm-footer-cols,4),minmax(0,1fr));}');"
if old2 in s: s=s.replace(old2,new2,1)
insert_point="        var cc=theme.customCode||{};"
addon="""        var pp=theme.productPage||{};
        if(pp.galleryLayout){ root.setAttribute('data-pm-pdp-gallery-layout', pp.galleryLayout); }
        if(pp.galleryPosition){ root.setAttribute('data-pm-pdp-gallery-position', pp.galleryPosition); }
        if(pp.variantStyle){ root.setAttribute('data-pm-pdp-variant-style', pp.variantStyle); }
        if(pp.ctaLayout){ root.setAttribute('data-pm-pdp-cta-layout', pp.ctaLayout); }
        if(pp.relatedTitle){ setText('.pm-related__title,.pm-section-related .pm-section__title', pp.relatedTitle); }

        var fcols={ '4-columns':4,'3-columns':3,'2-columns':2,'simple':1,'centered':1 };
        if(f.layout && fcols[f.layout]){ setVar('--pm-footer-cols', String(fcols[f.layout])); }
"""
if insert_point in s and addon not in s: s=s.replace(insert_point,addon+insert_point,1)
p.write_text(s)
print('patched runtime mappings')
PY

php artisan view:clear
php artisan cache:clear
php -l resources/views/user-front/layout.blade.php
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user-front/layout.blade.php')
s=p.read_text()
old_pc="""        var pc=theme.productCard||{};
        if(pc.imageAspect){ var p=String(pc.imageAspect).split(':'); if(p.length===2) setVar('--pm-card-aspect', p[0]+'/'+p[1]); }
        setVar('--pm-card-radius', pc.imageBorderRadius ? rMap[pc.imageBorderRadius] : null);
        setVar('--pm-price-size', pc.priceSize ? ({small:'14px',medium:'16px',large:'20px'})[pc.priceSize] : null);
        toggle('.pm-product-card__badge', pc.showDiscount); toggle('.pm-product-card__category', pc.showCategory); toggle('.pm-btn-buy', pc.showBuyNow); toggle('.pm-btn-cart-icon', pc.showAddToCart); toggle('.pm-product-card__action--wishlist', pc.showWishlist); toggle('.pm-product-card__action--quickview', pc.showQuickView);
"""
if old_pc in s:
 s=s.replace(old_pc,"""        var pc=theme.productCard||{};
        if(pc.imageAspect){ var p=String(pc.imageAspect).split(':'); if(p.length===2) setVar('--pm-card-aspect', p[0]+'/'+p[1]); }
        setVar('--pm-card-radius', pc.imageBorderRadius ? rMap[pc.imageBorderRadius] : null);
        setVar('--pm-price-size', pc.priceSize ? ({small:'14px',medium:'16px',large:'20px'})[pc.priceSize] : null);
        if(pc.layout){ root.setAttribute('data-pm-card-layout', pc.layout); }
        if(pc.contentAlign){ root.setAttribute('data-pm-card-align', pc.contentAlign); }
        if(pc.buttonStyle){ root.setAttribute('data-pm-card-btn-style', pc.buttonStyle); }
        if(pc.buttonLayout){ root.setAttribute('data-pm-card-btn-layout', pc.buttonLayout); }
        document.querySelectorAll('.pm-product-card').forEach(function(card){
          if(pc.contentAlign){ card.classList.toggle('pm-product-card--center', pc.contentAlign==='center'); }
          if(pc.shadow){ card.classList.remove('pm-product-card--shadow-sm','pm-product-card--shadow-md','pm-product-card--shadow-lg'); var smap={none:'',subtle:'pm-product-card--shadow-sm',small:'pm-product-card--shadow-sm',medium:'pm-product-card--shadow-md',strong:'pm-product-card--shadow-lg'}; if(smap[pc.shadow]) card.classList.add(smap[pc.shadow]); }
          if(pc.border!==undefined){ card.classList.toggle('pm-product-card--border', !!pc.border); }
          if(pc.hoverShadow!==undefined){ card.classList.toggle('pm-product-card--hover-shadow', !!pc.hoverShadow); }
        });
        document.querySelectorAll('.pm-product-card__title').forEach(function(el){ if(pc.titleLines){ el.classList.remove('pm-product-card__title--1','pm-product-card__title--2','pm-product-card__title--3'); el.classList.add('pm-product-card__title--'+pc.titleLines); } });
        document.querySelectorAll('.pm-btn-buy').forEach(function(el){ if(pc.buttonStyle){ el.classList.remove('pm-btn-buy--solid','pm-btn-buy--outline','pm-btn-buy--pill','pm-btn-buy--rounded','pm-btn-buy--sharp','pm-btn-buy--gradient','pm-btn-buy--underline'); el.classList.add('pm-btn-buy--'+pc.buttonStyle); } if(pc.buyNowText){ el.textContent=pc.buyNowText; } });
        document.querySelectorAll('.pm-btn-cart').forEach(function(el){ if(pc.buttonStyle){ el.classList.remove('pm-btn-cart--solid','pm-btn-cart--outline','pm-btn-cart--pill','pm-btn-cart--rounded','pm-btn-cart--sharp','pm-btn-cart--gradient','pm-btn-cart--underline'); el.classList.add('pm-btn-cart--'+pc.buttonStyle); } if(pc.addToCartText){ el.textContent=pc.addToCartText; } });
        document.querySelectorAll('.pm-product-card__actions').forEach(function(el){ if(pc.buttonLayout==='side-by-side') {el.classList.add('pm-product-card__actions--side');el.classList.remove('pm-product-card__actions--stacked');} else if(pc.buttonLayout==='stacked'){el.classList.add('pm-product-card__actions--stacked');el.classList.remove('pm-product-card__actions--side');} });
        toggle('.pm-product-card__badge', pc.showDiscount); toggle('.pm-product-card__category', pc.showCategory); toggle('.pm-btn-buy', pc.showBuyNow); toggle('.pm-btn-cart-icon', pc.showAddToCart); toggle('.pm-product-card__action--wishlist', pc.showWishlist); toggle('.pm-product-card__action--quickview', pc.showQuickView);
""",1)
old_logo="""        var lg=theme.logo||{};
        if(lg.text!==undefined) setText('.pm-logo__text,.site-logo-text,.navbar-brand-text', lg.text);
        if(lg.imageUrl) setImg('.pm-logo img,.site-logo img,.navbar-brand img', lg.imageUrl);
        if(lg.maxHeight) setVar('--pm-logo-max-height', (typeof lg.maxHeight==='number'?lg.maxHeight+'px':lg.maxHeight));
        if(lg.showText!==undefined){ toggle('.pm-logo__text,.site-logo-text,.navbar-brand-text', !!lg.showText); }
"""
if old_logo in s:
 s=s.replace(old_logo,"""        var lg=theme.logo||{};
        if(lg.text!==undefined) setText('.pm-header__logo-text,.pm-logo__text,.site-logo-text,.navbar-brand-text', lg.text);
        if(lg.imageUrl) setImg('.pm-header__logo img,.pm-logo img,.site-logo img,.navbar-brand img', lg.imageUrl);
        if(lg.maxHeight){ var mh=(typeof lg.maxHeight==='number'?lg.maxHeight+'px':lg.maxHeight); setVar('--pm-logo-max-height', mh); document.querySelectorAll('.pm-header__logo img').forEach(function(im){ im.style.maxHeight=mh; im.style.height=mh; }); }
        if(lg.showText!==undefined){ toggle('.pm-header__logo-text,.pm-logo__text,.site-logo-text,.navbar-brand-text', !!lg.showText); }
        if(lg.position){ root.setAttribute('data-pm-logo-position', lg.position); }
""",1)
old2="upsertStyle('theme-dynamic', ':root[data-theme-hash="+'"'+"'+applyHash+'"'+"']{outline-color:transparent;}');"
old2="upsertStyle('theme-dynamic', ':root[data-theme-hash="'+applyHash+'"]{outline-color:transparent;}');"
if old2 in s:
 s=s.replace(old2,"upsertStyle('theme-dynamic', ':root[data-theme-hash="+'"'+"'+applyHash+'"'+"']{outline-color:transparent;} .pm-page,.pm-page *{font-family:var(--pm-font-body,var(--font-body,\\'Inter\\',sans-serif));} .pm-page h1,.pm-page h2,.pm-page h3,.pm-page h4,.pm-page h5,.pm-page h6,.pm-hero__title,.pm-section__title,.pm-product-card__title{font-family:var(--pm-font-heading,var(--font-display,\\'Playfair Display\\',serif)) !important;} .pm-header__logo img{max-height:var(--pm-logo-max-height,48px);height:var(--pm-logo-max-height,48px);} :root[data-pm-logo-position=\\'center\\'] .pm-header__logo{justify-content:center;margin:0 auto;} :root[data-pm-card-layout=\\'horizontal\\'] .pm-product-card{display:flex;gap:12px;align-items:flex-start;} :root[data-pm-card-layout=\\'horizontal\\'] .pm-product-card__image{width:45%;flex:0 0 45%;} :root[data-pm-card-layout=\\'minimal\\'] .pm-product-card__category,:root[data-pm-card-layout=\\'minimal\\'] .pm-product-card__installments{display:none !important;} :root[data-pm-card-layout=\\'overlay\\'] .pm-product-card__info{margin-top:-64px;position:relative;z-index:2;background:linear-gradient(to top,rgba(0,0,0,.5),transparent);color:#fff;padding:8px;} .pm-footer__grid{grid-template-columns:repeat(var(--pm-footer-cols,4),minmax(0,1fr));}');",1)
ins="        var cc=theme.customCode||{};"
addon="""        var pp=theme.productPage||{};
        if(pp.galleryLayout){ root.setAttribute('data-pm-pdp-gallery-layout', pp.galleryLayout); }
        if(pp.galleryPosition){ root.setAttribute('data-pm-pdp-gallery-position', pp.galleryPosition); }
        if(pp.variantStyle){ root.setAttribute('data-pm-pdp-variant-style', pp.variantStyle); }
        if(pp.ctaLayout){ root.setAttribute('data-pm-pdp-cta-layout', pp.ctaLayout); }
        if(pp.relatedTitle){ setText('.pm-related__title,.pm-section-related .pm-section__title', pp.relatedTitle); }

        var fcols={ '4-columns':4,'3-columns':3,'2-columns':2,'simple':1,'centered':1 };
        if(f.layout && fcols[f.layout]){ setVar('--pm-footer-cols', String(fcols[f.layout])); }
"""
if ins in s and addon not in s:
 s=s.replace(ins,addon+ins,1)
p.write_text(s)
print('patched runtime mappings')
PY

php artisan view:clear
php artisan cache:clear
php -l resources/views/user-front/layout.blade.php
python3 - <<'PY'
from pathlib import Path
import re
p=Path('resources/views/user-front/layout.blade.php')
s=p.read_text()
# replace logo block simply by regex
s=re.sub(r"var lg=theme\.logo\|\|\{\};[\s\S]*?if\(lg\.showText!==undefined\)\{[^\n]*\}\n",
"""var lg=theme.logo||{};
        if(lg.text!==undefined) setText('.pm-header__logo-text,.pm-logo__text,.site-logo-text,.navbar-brand-text', lg.text);
        if(lg.imageUrl) setImg('.pm-header__logo img,.pm-logo img,.site-logo img,.navbar-brand img', lg.imageUrl);
        if(lg.maxHeight){ var mh=(typeof lg.maxHeight==='number'?lg.maxHeight+'px':lg.maxHeight); setVar('--pm-logo-max-height', mh); document.querySelectorAll('.pm-header__logo img').forEach(function(im){ im.style.maxHeight=mh; im.style.height=mh; }); }
        if(lg.showText!==undefined){ toggle('.pm-header__logo-text,.pm-logo__text,.site-logo-text,.navbar-brand-text', !!lg.showText); }
        if(lg.position){ root.setAttribute('data-pm-logo-position', lg.position); }
",s,count=1)
# append footer/productpage mapping before customcode
if "var pp=theme.productPage||{};" not in s:
 s=s.replace("        var cc=theme.customCode||{};", """        var pp=theme.productPage||{};
        if(pp.galleryLayout){ root.setAttribute('data-pm-pdp-gallery-layout', pp.galleryLayout); }
        if(pp.galleryPosition){ root.setAttribute('data-pm-pdp-gallery-position', pp.galleryPosition); }
        if(pp.variantStyle){ root.setAttribute('data-pm-pdp-variant-style', pp.variantStyle); }
        if(pp.ctaLayout){ root.setAttribute('data-pm-pdp-cta-layout', pp.ctaLayout); }
        if(pp.relatedTitle){ setText('.pm-related__title,.pm-section-related .pm-section__title', pp.relatedTitle); }

        var fcols={ '4-columns':4,'3-columns':3,'2-columns':2,'simple':1,'centered':1 };
        if(f.layout && fcols[f.layout]){ setVar('--pm-footer-cols', String(fcols[f.layout])); }
        var cc=theme.customCode||{};""",1)
# strengthen dynamic style line via regex
s=re.sub(r"upsertStyle\('theme-dynamic',\s*':root\[data-theme-hash="\+'\"'\+"\+applyHash\+'\"'\+"\]\{outline-color:transparent;\}'\);",
"upsertStyle('theme-dynamic', ':root[data-theme-hash="+'"'+"'+applyHash+'"'+"']{outline-color:transparent;} .pm-header__logo img{max-height:var(--pm-logo-max-height,48px);height:var(--pm-logo-max-height,48px);} :root[data-pm-logo-position=\\'center\\'] .pm-header__logo{justify-content:center;margin:0 auto;} .pm-footer__grid{grid-template-columns:repeat(var(--pm-footer-cols,4),minmax(0,1fr));}');",s,count=1)
# productcard: add quick mappings if markers missing
if "data-pm-card-layout" not in s:
 s=s.replace("setVar('--pm-price-size', pc.priceSize ? ({small:'14px',medium:'16px',large:'20px'})[pc.priceSize] : null);",
"setVar('--pm-price-size', pc.priceSize ? ({small:'14px',medium:'16px',large:'20px'})[pc.priceSize] : null);\n        if(pc.layout){ root.setAttribute('data-pm-card-layout', pc.layout); }\n        if(pc.contentAlign){ root.setAttribute('data-pm-card-align', pc.contentAlign); }\n        if(pc.buttonStyle){ root.setAttribute('data-pm-card-btn-style', pc.buttonStyle); }",1)
p.write_text(s)
print('patched safe')
PY

php artisan view:clear
php artisan cache:clear
php -l resources/views/user-front/layout.blade.php
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user-front/layout.blade.php')
s=p.read_text()
s=s.replace('.pm-logo__text,.site-logo-text,.navbar-brand-text','.pm-header__logo-text,.pm-logo__text,.site-logo-text,.navbar-brand-text')
s=s.replace('.pm-logo img,.site-logo img,.navbar-brand img','.pm-header__logo img,.pm-logo img,.site-logo img,.navbar-brand img')
s=s.replace("if(lg.showText!==undefined){ toggle('.pm-header__logo-text,.pm-logo__text,.site-logo-text,.navbar-brand-text', !!lg.showText); }","if(lg.showText!==undefined){ toggle('.pm-header__logo-text,.pm-logo__text,.site-logo-text,.navbar-brand-text', !!lg.showText); }\n        if(lg.position){ root.setAttribute('data-pm-logo-position', lg.position); }\n        if(lg.maxHeight){ document.querySelectorAll('.pm-header__logo img').forEach(function(im){ var mh=(typeof lg.maxHeight==='number'?lg.maxHeight+'px':lg.maxHeight); im.style.maxHeight=mh; im.style.height=mh; }); }")
s=s.replace("setVar('--pm-price-size', pc.priceSize ? ({small:'14px',medium:'16px',large:'20px'})[pc.priceSize] : null);","setVar('--pm-price-size', pc.priceSize ? ({small:'14px',medium:'16px',large:'20px'})[pc.priceSize] : null);\n        if(pc.layout){ root.setAttribute('data-pm-card-layout', pc.layout); }\n        if(pc.contentAlign){ root.setAttribute('data-pm-card-align', pc.contentAlign); }\n        if(pc.buttonStyle){ root.setAttribute('data-pm-card-btn-style', pc.buttonStyle); }")
if "var fcols={ '4-columns':4" not in s:
    s=s.replace("var cc=theme.customCode||{};","var fcols={ '4-columns':4,'3-columns':3,'2-columns':2,'simple':1,'centered':1 };\n        if(f.layout && fcols[f.layout]){ setVar('--pm-footer-cols', String(fcols[f.layout])); }\n\n        var pp=theme.productPage||{};\n        if(pp.galleryLayout){ root.setAttribute('data-pm-pdp-gallery-layout', pp.galleryLayout); }\n        if(pp.galleryPosition){ root.setAttribute('data-pm-pdp-gallery-position', pp.galleryPosition); }\n\n        var cc=theme.customCode||{};",1)
s=s.replace("upsertStyle('theme-dynamic', ':root[data-theme-hash=\"'+applyHash+'\"]{outline-color:transparent;}');","upsertStyle('theme-dynamic', ':root[data-theme-hash=\"'+applyHash+'\"]{outline-color:transparent;} .pm-header__logo img{max-height:var(--pm-logo-max-height,48px);height:var(--pm-logo-max-height,48px);} :root[data-pm-logo-position=\\\"center\\\"] .pm-header__logo{justify-content:center;margin:0 auto;} :root[data-pm-card-layout=\\\"horizontal\\\"] .pm-product-card{display:flex;gap:12px;align-items:flex-start;} :root[data-pm-card-layout=\\\"horizontal\\\"] .pm-product-card__image{width:45%;flex:0 0 45%;} :root[data-pm-card-align=\\\"center\\\"] .pm-product-card{text-align:center;} .pm-footer__grid{grid-template-columns:repeat(var(--pm-footer-cols,4),minmax(0,1fr));}');")
p.write_text(s)
print('patched')
PY

php artisan view:clear
php artisan cache:clear
php -l resources/views/user-front/layout.blade.php
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user-front/layout.blade.php')
s=p.read_text()
old="""          .pm-product-card__title {
            font-family: var(--pm-font-heading, var(--font-display, 'Playfair Display', serif)) !important;
          }
        </style>
"""
new="""          .pm-product-card__title {
            font-family: var(--pm-font-heading, var(--font-display, 'Playfair Display', serif)) !important;
          }

          .pm-header__logo img {
            max-height: {{ ($pmS['logo']['maxHeight'] ?? 48) }}px;
            height: {{ ($pmS['logo']['maxHeight'] ?? 48) }}px;
          }

          .pm-header__logo {
            justify-content: {{ (($pmS['logo']['position'] ?? 'left') === 'center') ? 'center' : 'flex-start' }};
          }

          .pm-product-card {
            text-align: {{ ($pmCard['contentAlign'] ?? 'left') === 'center' ? 'center' : 'left' }};
          }

          .pm-footer__grid {
            grid-template-columns: repeat({{ ['4-columns'=>4,'3-columns'=>3,'2-columns'=>2,'simple'=>1,'centered'=>1][($pmFooter['layout'] ?? '4-columns')] ?? 4 }}, minmax(0, 1fr));
          }
        </style>
"""
if old not in s:
    raise SystemExit('anchor missing')
s=s.replace(old,new,1)
p.write_text(s)
print('patched static css')
PY

php artisan view:clear
php artisan cache:clear
php -l resources/views/user-front/layout.blade.php
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user-front/layout.blade.php')
s=p.read_text()
old="""        .pm-product-card__title {
          font-family: var(--pm-font-heading, var(--font-display, 'Playfair Display', serif)) !important;
        }
      </style>
"""
new="""        .pm-product-card__title {
          font-family: var(--pm-font-heading, var(--font-display, 'Playfair Display', serif)) !important;
        }

        .pm-header__logo img {
          max-height: {{ ($pmS['logo']['maxHeight'] ?? 48) }}px;
          height: {{ ($pmS['logo']['maxHeight'] ?? 48) }}px;
        }

        .pm-header__logo {
          justify-content: {{ (($pmS['logo']['position'] ?? 'left') === 'center') ? 'center' : 'flex-start' }};
        }

        .pm-product-card {
          text-align: {{ ($pmCard['contentAlign'] ?? 'left') === 'center' ? 'center' : 'left' }};
        }

        .pm-footer__grid {
          grid-template-columns: repeat({{ ['4-columns'=>4,'3-columns'=>3,'2-columns'=>2,'simple'=>1,'centered'=>1][($pmFooter['layout'] ?? '4-columns')] ?? 4 }}, minmax(0, 1fr));
        }
      </style>
"""
if old not in s:
    raise SystemExit('anchor not found')
s=s.replace(old,new,1)
p.write_text(s)
print('inserted static rules')
PY

php artisan view:clear
php artisan cache:clear
php -l resources/views/user-front/layout.blade.php
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user-front/layout.blade.php')
s=p.read_text()
needle="toggle('.pm-product-card__badge', pc.showDiscount); toggle('.pm-product-card__category', pc.showCategory); toggle('.pm-btn-buy', pc.showBuyNow); toggle('.pm-btn-cart-icon', pc.showAddToCart); toggle('.pm-product-card__action--wishlist', pc.showWishlist); toggle('.pm-product-card__action--quickview', pc.showQuickView);"
add="document.querySelectorAll('.pm-btn-buy').forEach(function(el){ if(pc.buttonStyle){ el.className=el.className.replace(/pm-btn-buy--\\w+/g,'').trim()+' pm-btn-buy--'+pc.buttonStyle; } });\n        document.querySelectorAll('.pm-btn-cart').forEach(function(el){ if(pc.buttonStyle){ el.className=el.className.replace(/pm-btn-cart--\\w+/g,'').trim()+' pm-btn-cart--'+pc.buttonStyle; } });\n        "+needle
if needle in s:
    s=s.replace(needle,add,1)
# static store-side style for productCard.buttonStyle
if "@php $pmBtnStyle" not in s:
    s=s.replace(".pm-footer__grid {\n          grid-template-columns: repeat({{ ['4-columns'=>4,'3-columns'=>3,'2-columns'=>2,'simple'=>1,'centered'=>1][($pmFooter['layout'] ?? '4-columns')] ?? 4 }}, minmax(0, 1fr));\n        }",
".pm-footer__grid {\n          grid-template-columns: repeat({{ ['4-columns'=>4,'3-columns'=>3,'2-columns'=>2,'simple'=>1,'centered'=>1][($pmFooter['layout'] ?? '4-columns')] ?? 4 }}, minmax(0, 1fr));\n        }\n\n        @php $pmBtnStyle = $pmCard['buttonStyle'] ?? 'solid'; @endphp\n        .pm-btn-buy, .pm-btn-cart {\n          @if($pmBtnStyle==='outline')\n            background: transparent !important; border: 2px solid currentColor;\n          @elseif($pmBtnStyle==='pill')\n            border-radius: 9999px !important;\n          @elseif($pmBtnStyle==='rounded')\n            border-radius: 12px !important;\n          @elseif($pmBtnStyle==='sharp')\n            border-radius: 0 !important;\n          @endif\n        }")
p.write_text(s)
print('patched card button style')
PY

php artisan view:clear
php artisan cache:clear
php -l resources/views/user-front/layout.blade.php
cd /home/u324811576/domains/flashloja.com.br/public_html
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user-front/layout.blade.php')
s=p.read_text()
old="if(pc.buttonStyle){ root.setAttribute('data-pm-card-btn-style', pc.buttonStyle); }\n        toggle('.pm-product-card__badge', pc.showDiscount);"
new="if(pc.buttonStyle){ root.setAttribute('data-pm-card-btn-style', pc.buttonStyle); }\n        document.querySelectorAll('.pm-product-card').forEach(function(card){ if(pc.contentAlign){ card.style.textAlign=(pc.contentAlign==='center'?'center':'left'); } });\n        toggle('.pm-product-card__badge', pc.showDiscount);"
if old not in s:
    raise SystemExit('pattern not found')
s=s.replace(old,new,1)
p.write_text(s)
print('patched card align preview style')
PY

php artisan view:clear
php artisan cache:clear
php -l resources/views/user-front/layout.blade.php
nl -ba resources/views/user-front/layout.blade.php | sed -n '356,374p'
nl -ba resources/views/user-front/layout.blade.php | sed -n '374,410p'
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user-front/layout.blade.php')
s=p.read_text()
old="          if(pc.contentAlign){ root.setAttribute('data-pm-card-align', pc.contentAlign); }\n          if(pc.buttonStyle){ root.setAttribute('data-pm-card-btn-style', pc.buttonStyle); }"
new="          if(pc.contentAlign){ root.setAttribute('data-pm-card-align', pc.contentAlign); document.querySelectorAll('.pm-product-card').forEach(function(card){ card.style.textAlign=(pc.contentAlign==='center'?'center':'left'); }); }\n          if(pc.buttonStyle){ root.setAttribute('data-pm-card-btn-style', pc.buttonStyle); }"
if old not in s:
    raise SystemExit('not found')
s=s.replace(old,new,1)
p.write_text(s)
print('patched align inline')
PY

php artisan view:clear
php artisan cache:clear
php -l resources/views/user-front/layout.blade.php
python3 - <<'PY'
from pathlib import Path
import re
p=Path('resources/views/user-front/layout.blade.php')
s=p.read_text()
s2=re.sub(r"if\(pc\.contentAlign\)\{\s*root\.setAttribute\('data-pm-card-align', pc\.contentAlign\);\s*\}","if(pc.contentAlign){ root.setAttribute('data-pm-card-align', pc.contentAlign); document.querySelectorAll('.pm-product-card').forEach(function(card){ card.style.textAlign=(pc.contentAlign==='center'?'center':'left'); }); }",s,count=1)
if s2==s:
    raise SystemExit('regex nochange')
p.write_text(s2)
print('patched regex align')
PY

php artisan view:clear
php artisan cache:clear
php -l resources/views/user-front/layout.blade.php
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user-front/layout.blade.php')
s=p.read_text()
# applyTheme productPage runtime block
old="if(pp.galleryPosition){ root.setAttribute('data-pm-pdp-gallery-position', pp.galleryPosition); }"
new="if(pp.galleryPosition){ root.setAttribute('data-pm-pdp-gallery-position', pp.galleryPosition); var pd=document.querySelector('.product-single-default'); if(pd){ pd.style.display='flex'; pd.style.flexDirection=(pp.galleryPosition==='right'?'row-reverse':'row'); } }"
s=s.replace(old,new,1)
# static css insert for productPage gallery position after pm-product-card block
marker=".pm-product-card {\n          text-align: {{ ($pmCard['contentAlign'] ?? 'left') === 'center' ? 'center' : 'left' }};\n        }"
if marker in s and 'product-single-default' not in s:
    s=s.replace(marker, marker+"\n\n        .product-single-default {\n          display: flex;\n          flex-direction: {{ (($pmS['productPage']['galleryPosition'] ?? 'left') === 'right') ? 'row-reverse' : 'row' }};\n        }")
p.write_text(s)
print('patched productPage gallery')
PY

php artisan view:clear
php artisan cache:clear
php -l resources/views/user-front/layout.blade.php
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user-front/layout.blade.php')
s=p.read_text()
if '.product-single-default {' not in s:
    s=s.replace(".pm-product-card {\n            text-align: {{ ($pmCard['contentAlign'] ?? 'left') === 'center' ? 'center' : 'left' }};\n          }",
".pm-product-card {\n            text-align: {{ ($pmCard['contentAlign'] ?? 'left') === 'center' ? 'center' : 'left' }};\n          }\n\n          .product-single-default {\n            display: flex;\n            flex-direction: {{ (($pmS['productPage']['galleryPosition'] ?? 'left') === 'right') ? 'row-reverse' : 'row' }};\n          }")
p.write_text(s)
print('inserted static pdp rule')
PY

php artisan view:clear
php artisan cache:clear
php -l resources/views/user-front/layout.blade.php
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user-front/layout.blade.php')
s=p.read_text()
s=s.replace('display: flex;\n            flex-direction: {{ (($pmS[\'productPage\'][\'galleryPosition\'] ?? \'left\') === \'right\') ? \'row-reverse\' : \'row\' }};','display: flex !important;\n            flex-direction: {{ (($pmS[\'productPage\'][\'galleryPosition\'] ?? \'left\') === \'right\') ? \'row-reverse\' : \'row\' }} !important;')
p.write_text(s)
print('patched pdp important')
PY

php artisan view:clear
php artisan cache:clear
php -l resources/views/user-front/layout.blade.php
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user-front/layout.blade.php')
s=p.read_text()
needle="@includeIf('user-front.premium.styles')"
ins="""@includeIf('user-front.premium.styles')

      <script>
      (function(){
        try {
          var pp = @json($pmS['productPage'] ?? []);
          if (pp && pp.galleryPosition) {
            var pd = document.querySelector('.product-single-default');
            if (pd) {
              pd.style.display = 'flex';
              pd.style.flexDirection = (pp.galleryPosition === 'right') ? 'row-reverse' : 'row';
            }
          }
        } catch (e) {}
      })();
      </script>"""
if needle not in s:
    raise SystemExit('needle missing')
s=s.replace(needle,ins,1)
p.write_text(s)
print('inserted runtime store script for pdp')
PY

php artisan view:clear
php artisan cache:clear
php -l resources/views/user-front/layout.blade.php
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user-front/layout.blade.php')
s=p.read_text()
old="""      <script>
      (function(){
        try {
          var pp = @json($pmS['productPage'] ?? []);
          if (pp && pp.galleryPosition) {
            var pd = document.querySelector('.product-single-default');
            if (pd) {
              pd.style.display = 'flex';
              pd.style.flexDirection = (pp.galleryPosition === 'right') ? 'row-reverse' : 'row';
            }
          }
        } catch (e) {}
      })();
      </script>"""
new="""      <script>
      (function(){
        function applyPdpLayout(){
          try {
            var pp = @json($pmS['productPage'] ?? []);
            if (pp && pp.galleryPosition) {
              var pd = document.querySelector('.product-single-default');
              if (pd) {
                pd.style.display = 'flex';
                pd.style.flexDirection = (pp.galleryPosition === 'right') ? 'row-reverse' : 'row';
              }
            }
          } catch (e) {}
        }
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', applyPdpLayout);
        } else {
          applyPdpLayout();
        }
        window.addEventListener('load', applyPdpLayout);
      })();
      </script>"""
if old not in s:
    raise SystemExit('script block not found')
s=s.replace(old,new,1)
p.write_text(s)
print('patched pdp script timing')
PY

php artisan view:clear
php artisan cache:clear
php -l resources/views/user-front/layout.blade.php
exit
pwd
ls -la
cd domains/flashloja.com.br
pwd
ls -la
cd /home/u324811576/domains/flashloja.com.br/public_html
printf "\n==PWD==\n"; pwd
printf "\n==TOP LEVEL==\n"; ls -la
printf "\n==DIR TREE (depth 2)==\n"; find . -maxdepth 2 -type d | sort
printf "\n==FILE COUNT==\n"; find . -type f | wc -l
printf "\n==EXT COUNT==\n"; find . -type f | sed -E 's#.*\.##' | tr '[:upper:]' '[:lower:]' | sort | uniq -c | sort -nr | head -n 80
cd /home/u324811576/domains/flashloja.com.br/public_html
printf "\n==COMPOSER.JSON==\n"; cat composer.json
printf "\n==PACKAGE.JSON==\n"; cat package.json
printf "\n==ROUTES FILES==\n"; ls -la routes
printf "\n==PHP/LARAVEL VERSION HINTS==\n"; php -v | head -n 2
php artisan --version
cd /home/u324811576/domains/flashloja.com.br/public_html
printf "\n==APP/HTTP TREE==\n"; find app/Http -maxdepth 3 -type d | sort
printf "\n==CONTROLLERS==\n"; find app/Http/Controllers -type f -name '*.php' | sort
printf "\n==MODELS==\n"; find app/Models -type f -name '*.php' | sort
printf "\n==INERTIA/REACT FILES==\n"; find resources/js -type f | sort
cd /home/u324811576/domains/flashloja.com.br/public_html
python3 - <<'PY'
import os, hashlib, datetime, json, re
root='.'
inv='RELATORIO_INVENTARIO_COMPLETO.tsv'
with open(inv,'w',encoding='utf-8') as f:
    f.write('path\tsize_bytes\tmtime_utc\tsha1\n')
    for dp, dns, fns in os.walk(root):
        dns.sort(); fns.sort()
        for n in fns:
            p=os.path.join(dp,n)
            rp=p[2:] if p.startswith('./') else p
            try:
                st=os.stat(p)
                h=hashlib.sha1()
                with open(p,'rb') as r:
                    for chunk in iter(lambda:r.read(1024*1024),b''):
                        h.update(chunk)
                m=datetime.datetime.utcfromtimestamp(st.st_mtime).isoformat()+'Z'
                f.write(f"{rp}\t{st.st_size}\t{m}\t{h.hexdigest()}\n")
            except Exception as e:
                f.write(f"{rp}\tERROR\tERROR\t{type(e).__name__}:{e}\n")

# relatório técnico factual
report='RELATORIO_TECNICO_COMPLETO.md'

def sh(cmd):
    import subprocess
    return subprocess.check_output(cmd,shell=True,text=True,stderr=subprocess.STDOUT)

composer=json.load(open('composer.json','r',encoding='utf-8'))
package=json.load(open('package.json','r',encoding='utf-8'))

with open(report,'w',encoding='utf-8') as w:
    w.write('# Relatório técnico completo do sistema FlashLoja\n\n')
    w.write('## 1) Identificação do ambiente\n')
    w.write('- Caminho analisado: `/home/u324811576/domains/flashloja.com.br/public_html`\n')
    w.write('- Data UTC da varredura: '+datetime.datetime.utcnow().isoformat()+'Z\n')
    w.write('- Total de arquivos (find): '+sh("find . -type f | wc -l").strip()+'\n')
    w.write('- Versão PHP (CLI): '+sh("php -v | head -n 1").strip()+'\n')
    w.write('- Versão Laravel: '+sh("php artisan --version").strip()+'\n\n')

    w.write('## 2) Linguagens e artefatos detectados (contagem por extensão)\n')
    w.write('```\n'+sh("find . -type f | sed -E 's#.*\\.##' | tr '[:upper:]' '[:lower:]' | sort | uniq -c | sort -nr | head -n 120")+'```\n\n')

    w.write('## 3) Dependências backend (composer.json)\n')
    w.write('### require\n')
    for k,v in composer.get('require',{}).items():
        w.write(f'- `{k}`: `{v}`\n')
    w.write('\n### require-dev\n')
    for k,v in composer.get('require-dev',{}).items():
        w.write(f'- `{k}`: `{v}`\n')
    w.write('\n')

    w.write('## 4) Dependências frontend/build (package.json)\n')
    w.write('### scripts\n')
    for k,v in package.get('scripts',{}).items():
        w.write(f'- `{k}`: `{v}`\n')
    w.write('\n### devDependencies\n')
    for k,v in package.get('devDependencies',{}).items():
        w.write(f'- `{k}`: `{v}`\n')
    w.write('\n')

    w.write('## 5) Rotas (arquivos de definição)\n')
    for fn in sorted(os.listdir('routes')):
        p='routes/'+fn
        st=os.stat(p)
        w.write(f'- `{p}` ({st.st_size} bytes)\n')
    w.write('\n')

    w.write('## 6) Inventário detalhado de código da aplicação (sem vendor)\n')
    targets=['app','bootstrap','config','database','public','resources','routes','tests','updater','tools','assets','site']
    code_ext={'.php','.js','.ts','.tsx','.css','.scss','.sass','.blade.php','.json','.yml','.yaml','.md','.sh','.py','.txt'}
    for t in targets:
        if not os.path.exists(t):
            continue
        w.write(f'### {t}\n')
        for dp,dns,fns in os.walk(t):
            dns.sort(); fns.sort()
            for n in fns:
                p=os.path.join(dp,n)
                st=os.stat(p)
                ext=''.join(os.path.splitext(n)[1:])
                # para blade.php detectar direito
                if n.endswith('.blade.php'): ext='.blade.php'
                line_count='-'
                try:
                    with open(p,'rb') as r:
                        b=r.read()
                    try:
                        txt=b.decode('utf-8')
                    except:
                        txt=b.decode('latin-1','ignore')
                    line_count=str(txt.count('\n')+1)
                    signatures=[]
                    if p.endswith('.php'):
                        signatures += re.findall(r'\b(class|interface|trait)\s+([A-Za-z_][A-Za-z0-9_]*)',txt)
                        methods = re.findall(r'\bfunction\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(',txt)
                        if methods:
                            m=', '.join(methods[:15])
                            if len(methods)>15: m += ', ...'
                            sigtxt=f'methods: {m}'
                        else:
                            sigtxt='methods: (nenhum detectado)'
                        if signatures:
                            cls=', '.join([f'{a} {b}' for a,b in signatures[:8]])
                            if len(signatures)>8: cls += ', ...'
                            sign=f'tipos: {cls}; {sigtxt}'
                        else:
                            sign=sigtxt
                    elif p.endswith(('.js','.ts','.tsx')):
                        funcs=re.findall(r'\bfunction\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(|const\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*\(',txt)
                        names=[]
                        for a,b in funcs:
                            names.append(a or b)
                        names=[x for x in names if x]
                        if names:
                            sign='funções detectadas: '+', '.join(names[:15])+(' ...' if len(names)>15 else '')
                        else:
                            sign='funções detectadas: nenhuma por regex simples'
                    else:
                        sign=''
                except Exception as e:
                    sign=f'erro leitura: {type(e).__name__}: {e}'
                w.write(f'- `{p}` | {st.st_size} bytes | {line_count} linhas | mtime={datetime.datetime.utcfromtimestamp(st.st_mtime).isoformat()}Z')
                if sign:
                    w.write(f' | {sign}')
                w.write('\n')
        w.write('\n')

    w.write('## 7) Vendor (pacotes instalados)\n')
    if os.path.exists('vendor'):
        for pkg in sorted(os.listdir('vendor')):
            w.write(f'- `vendor/{pkg}`\n')
    w.write('\n')

    w.write('## 8) Inventário total de arquivos\n')
    w.write('Inventário completo com hash SHA1 está em `RELATORIO_INVENTARIO_COMPLETO.tsv`.\n')

print('OK: arquivos gerados -> RELATORIO_TECNICO_COMPLETO.md e RELATORIO_INVENTARIO_COMPLETO.tsv')
PY

ls -lh RELATORIO_TECNICO_COMPLETO.md RELATORIO_INVENTARIO_COMPLETO.tsv
python3 - <<'PY'
import os, json, re, datetime, subprocess

def sh(cmd):
    return subprocess.check_output(cmd,shell=True,universal_newlines=True,stderr=subprocess.STDOUT).strip()
root='.'
composer=json.load(open('composer.json'))
package=json.load(open('package.json'))
report='RELATORIO_TECNICO_COMPLETO.md'
with open(report,'w') as w:
    w.write('# Relatorio tecnico completo do sistema FlashLoja\n\n')
    w.write('## Ambiente\n')
    w.write('- Caminho analisado: /home/u324811576/domains/flashloja.com.br/public_html\n')
    w.write('- Data UTC: %s\n' % (datetime.datetime.utcnow().isoformat()+'Z'))
    w.write('- Total de arquivos: %s\n' % sh("find . -type f | wc -l"))
    w.write('- PHP: %s\n' % sh("php -v | head -n 1"))
    w.write('- Laravel: %s\n\n' % sh("php artisan --version"))

    w.write('## Estrutura de diretorios (nivel 2)\n``\n%s\n```\n\n' % sh("find . -maxdepth 2 -type d | sort"))
    w.write('## Contagem por extensao\n```\n%s\n```\n\n' % sh("find . -type f | sed -E 's#.*\\.##' | tr '[:upper:]' '[:lower:]' | sort | uniq -c | sort -nr | head -n 120"))

    w.write('## Dependencias Composer require\n')
    for k,v in composer.get('require',{}).items(): w.write('- %s: %s\n' % (k,v))
    w.write('\n## Dependencias Composer require-dev\n')
    for k,v in composer.get('require-dev',{}).items(): w.write('- %s: %s\n' % (k,v))

    w.write('\n## Scripts npm\n')
    for k,v in package.get('scripts',{}).items(): w.write('- %s: %s\n' % (k,v))
    w.write('\n## npm devDependencies\n')
    for k,v in package.get('devDependencies',{}).items(): w.write('- %s: %s\n' % (k,v))

    w.write('\n## Arquivos de rotas\n')
    for fn in sorted(os.listdir('routes')):
        p='routes/'+fn
        st=os.stat(p)
        w.write('- %s | %s bytes\n' % (p,st.st_size))

    w.write('\n## Arquivos de controllers\n')
    for p in sorted([x for x in sh("find app/Http/Controllers -type f -name '*.php'").split('\n') if x.strip()]):
        st=os.stat(p)
        txt=open(p,'rb').read().decode('utf-8','ignore')
        methods=re.findall(r'\bfunction\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(',txt)
        w.write('- %s | %s bytes | funcoes: %s\n' % (p,st.st_size,(', '.join(methods) if methods else 'nenhuma detectada')))

    w.write('\n## Arquivos de models\n')
    for p in sorted([x for x in sh("find app/Models -type f -name '*.php'").split('\n') if x.strip()]):
        st=os.stat(p)
        txt=open(p,'rb').read().decode('utf-8','ignore')
        methods=re.findall(r'\bfunction\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(',txt)
        w.write('- %s | %s bytes | funcoes: %s\n' % (p,st.st_size,(', '.join(methods) if methods else 'nenhuma detectada')))

    w.write('\n## Arquivos resources/js\n')
    for p in sorted([x for x in sh("find resources/js -type f").split('\n') if x.strip()]):
        st=os.stat(p)
        w.write('- %s | %s bytes\n' % (p,st.st_size))

    w.write('\n## Observacao de inventario total\n')
    w.write('- Arquivo RELATORIO_INVENTARIO_COMPLETO.tsv contem TODOS os arquivos com: caminho, tamanho, data modificacao UTC e hash SHA1.\n')

print('OK')
PY

ls -lh RELATORIO_TECNICO_COMPLETO.md RELATORIO_INVENTARIO_COMPLETO.tsv
sed -n '1,220p' RELATORIO_TECNICO_COMPLETO.md
