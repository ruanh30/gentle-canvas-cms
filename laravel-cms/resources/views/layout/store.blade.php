<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @php
        // Load draft in editor preview, published in storefront
        $__themeKey = request()->boolean('theme-preview') ? 'theme_draft' : 'theme_published';
        $__themeJson = \App\Models\Setting::get($__themeKey, '{}');
        $__raw = json_decode($__themeJson, true) ?: [];

        // Use canonical defaults from CustomizationController
        $__defaults = \App\Http\Controllers\CustomizationController::nestedDefaults();
        $__t = array_replace_recursive($__defaults, $__raw);

        $__c = $__t['colors'] ?? [];
        $__typo = $__t['typography'] ?? [];
        $__logo = $__t['logo'] ?? [];
        $__header = $__t['header'] ?? [];
        $__ann = $__header['announcement'] ?? [];
        $__footer = $__t['footer'] ?? [];
        $__wa = $__t['whatsapp'] ?? [];
        $__global = $__t['global'] ?? [];
        $__buttons = $__t['buttons'] ?? [];

        $storeName = $__logo['text'] ?: 'MODA STORE';
        $copyright = str_replace('{storeName}', $storeName, $__footer['copyrightText'] ?? '');

        // Radius helper
        $radiusMap = ['none' => '0px', 'small' => '4px', 'medium' => '8px', 'large' => '12px', 'full' => '9999px'];
        $globalRadius = $radiusMap[$__global['borderRadius'] ?? 'medium'] ?? '8px';

        // Button size map
        $btnSizeMap = [
            'small' => ['px' => '12px', 'py' => '6px', 'fs' => '13px'],
            'medium' => ['px' => '16px', 'py' => '10px', 'fs' => '14px'],
            'large' => ['px' => '24px', 'py' => '14px', 'fs' => '16px'],
        ];
        $btnSize = $btnSizeMap[$__buttons['size'] ?? 'medium'] ?? $btnSizeMap['medium'];
    @endphp
    <title>@yield('title', $storeName)</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family={{ urlencode($__typo['headingFont']) }}:wght@300;400;500;600;700;800;900&family={{ urlencode($__typo['bodyFont']) }}:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    {{-- ═══ CSS VARIABLES — mirrors applyThemeCSS() in ThemeContext.tsx ═══ --}}
    <style id="theme-vars">
        :root {
            /* Colors (raw hex — used via var()) */
            --pm-primary: {{ $__c['primary'] }};
            --pm-primary-fg: {{ $__c['primaryForeground'] }};
            --pm-secondary: {{ $__c['secondary'] }};
            --pm-secondary-fg: {{ $__c['secondaryForeground'] }};
            --pm-accent: {{ $__c['accent'] }};
            --pm-accent-fg: {{ $__c['accentForeground'] }};
            --pm-background: {{ $__c['background'] }};
            --pm-foreground: {{ $__c['foreground'] }};
            --pm-muted: {{ $__c['muted'] }};
            --pm-muted-fg: {{ $__c['mutedForeground'] }};
            --pm-border: {{ $__c['border'] }};
            --pm-buy-now: {{ $__c['buyNow'] }};
            --pm-buy-now-hover: {{ $__c['buyNowHover'] }};

            /* Typography */
            --pm-font-heading: '{{ $__typo['headingFont'] }}', serif;
            --pm-font-body: '{{ $__typo['bodyFont'] }}', system-ui, sans-serif;
            --pm-font-size-base: {{ $__typo['baseFontSize'] }}px;
            --pm-heading-weight: {{ $__typo['headingWeight'] }};
            --pm-body-weight: {{ $__typo['bodyWeight'] }};
            --pm-line-height: {{ $__typo['lineHeight'] }};
            --pm-letter-spacing: {{ $__typo['letterSpacing'] }}em;

            /* Layout */
            --pm-radius: {{ $globalRadius }};
            --pm-container-width: {{ $__global['containerWidth'] === 'full' ? '100%' : (($__global['containerMaxPx'] ?? 1400) . 'px') }};

            /* Header */
            --pm-header-height: {{ $__header['height'] ?? 64 }}px;
            --pm-icon-size: {{ $__header['iconSize'] ?? 20 }}px;
            --pm-menu-font-size: {{ $__header['menuFontSize'] ?? 13 }}px;
            --pm-menu-transform: {{ ($__header['menuUppercase'] ?? false) ? 'uppercase' : 'none' }};
            --pm-menu-letter-spacing: {{ $__header['menuLetterSpacing'] ?? 0.1 }}em;

            /* Footer */
            --pm-footer-bg: {{ $__footer['backgroundColor'] ?? '#1a1a1a' }};
            --pm-footer-text: {{ $__footer['textColor'] ?? '#fafafa' }};

            /* Buttons */
            --pm-btn-px: {{ $btnSize['px'] }};
            --pm-btn-py: {{ $btnSize['py'] }};
            --pm-btn-font-size: {{ $btnSize['fs'] }};
            --pm-btn-font-weight: {{ $__buttons['fontWeight'] ?? 500 }};
            --pm-btn-transform: {{ ($__buttons['uppercase'] ?? false) ? 'uppercase' : 'none' }};
            --pm-btn-shadow: {{ ($__buttons['shadow'] ?? false) ? '0 2px 8px rgba(0,0,0,0.15)' : 'none' }};
            --pm-btn-radius: {{ $radiusMap[$__buttons['radius'] ?? 'medium'] ?? '8px' }};
        }
    </style>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['{{ $__typo['bodyFont'] }}', 'system-ui', 'sans-serif'],
                        display: ['"{{ $__typo['headingFont'] }}"', 'serif'],
                    },
                    colors: {
                        background: 'var(--pm-background)', foreground: 'var(--pm-foreground)',
                        primary: 'var(--pm-primary)', 'primary-foreground': 'var(--pm-primary-fg)',
                        secondary: 'var(--pm-secondary)', 'secondary-foreground': 'var(--pm-secondary-fg)',
                        muted: 'var(--pm-muted)', 'muted-foreground': 'var(--pm-muted-fg)',
                        accent: 'var(--pm-accent)', 'accent-foreground': 'var(--pm-accent-fg)',
                        border: 'var(--pm-border)',
                    }
                }
            }
        }
    </script>
    <style>
        body {
            font-family: var(--pm-font-body);
            font-size: var(--pm-font-size-base);
            font-weight: var(--pm-body-weight);
            line-height: var(--pm-line-height);
            letter-spacing: var(--pm-letter-spacing);
            background-color: var(--pm-background);
            color: var(--pm-foreground);
        }
        .font-display { font-family: var(--pm-font-heading); font-weight: var(--pm-heading-weight); }
        .font-body { font-family: var(--pm-font-body); }
        .bg-background { background-color: var(--pm-background); }
        .bg-secondary { background-color: var(--pm-secondary); }
        .bg-secondary\/50 { background-color: color-mix(in srgb, var(--pm-secondary) 50%, transparent); }
        .bg-accent { background-color: var(--pm-accent); }
        .bg-foreground { background-color: var(--pm-foreground); }
        .bg-foreground\/5 { background-color: color-mix(in srgb, var(--pm-foreground) 5%, transparent); }
        .bg-primary { background-color: var(--pm-primary); }
        .text-foreground { color: var(--pm-foreground); }
        .text-primary-foreground { color: var(--pm-primary-fg); }
        .text-muted-foreground { color: var(--pm-muted-fg); }
        .text-secondary-foreground { color: var(--pm-secondary-fg); }
        .text-background { color: var(--pm-background); }
        .border-b { border-bottom: 1px solid var(--pm-border); }
        .border-t { border-top: 1px solid var(--pm-border); }
        .border { border: 1px solid var(--pm-border); }
        .hover\:bg-secondary:hover { background-color: var(--pm-secondary); }
        .hover\:bg-accent:hover { background-color: var(--pm-accent); }
        .hover\:bg-foreground:hover { background-color: var(--pm-foreground); }
        .hover\:text-foreground:hover { color: var(--pm-foreground); }
        .hover\:text-background:hover { color: var(--pm-background); }
        .bg-background\/90 { background-color: color-mix(in srgb, var(--pm-background) 90%, transparent); }
        .bg-background\/95 { background-color: color-mix(in srgb, var(--pm-background) 95%, transparent); }
        .bg-background\/80 { background-color: color-mix(in srgb, var(--pm-background) 80%, transparent); }
    </style>

    {{-- ═══ POSTMESSAGE LISTENER — real-time preview like React ThemeContext ═══ --}}
    <script>
    (function() {
        function hexToHSL(hex) {
            if (!hex || hex[0] !== '#' || hex.length < 7) return '0 0% 0%';
            var r = parseInt(hex.slice(1,3),16)/255, g = parseInt(hex.slice(3,5),16)/255, b = parseInt(hex.slice(5,7),16)/255;
            var max = Math.max(r,g,b), min = Math.min(r,g,b), h=0, s=0, l=(max+min)/2;
            if (max !== min) { var d=max-min; s=l>0.5?d/(2-max-min):d/(max+min);
                switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break;} }
            return Math.round(h*360)+' '+Math.round(s*100)+'% '+Math.round(l*100)+'%';
        }
        function radiusPx(r) { return {none:'0px',small:'4px',medium:'8px',large:'12px',full:'9999px'}[r]||'8px'; }

        function applyTheme(t) {
            var root = document.documentElement;
            var c = t.colors || {};
            if (c.primary) root.style.setProperty('--pm-primary', c.primary);
            if (c.primaryForeground) root.style.setProperty('--pm-primary-fg', c.primaryForeground);
            if (c.secondary) root.style.setProperty('--pm-secondary', c.secondary);
            if (c.secondaryForeground) root.style.setProperty('--pm-secondary-fg', c.secondaryForeground);
            if (c.accent) root.style.setProperty('--pm-accent', c.accent);
            if (c.accentForeground) root.style.setProperty('--pm-accent-fg', c.accentForeground);
            if (c.background) root.style.setProperty('--pm-background', c.background);
            if (c.foreground) root.style.setProperty('--pm-foreground', c.foreground);
            if (c.muted) root.style.setProperty('--pm-muted', c.muted);
            if (c.mutedForeground) root.style.setProperty('--pm-muted-fg', c.mutedForeground);
            if (c.border) root.style.setProperty('--pm-border', c.border);
            if (c.buyNow) root.style.setProperty('--pm-buy-now', c.buyNow);
            if (c.buyNowHover) root.style.setProperty('--pm-buy-now-hover', c.buyNowHover);

            var ty = t.typography || {};
            if (ty.headingFont) {
                root.style.setProperty('--pm-font-heading', "'"+ty.headingFont+"', serif");
                // Load font dynamically
                var id = 'gfont-'+ty.headingFont.replace(/\s+/g,'-').toLowerCase();
                if (!document.getElementById(id)) {
                    var link = document.createElement('link'); link.id=id; link.rel='stylesheet';
                    link.href='https://fonts.googleapis.com/css2?family='+encodeURIComponent(ty.headingFont)+':wght@300;400;500;600;700;800;900&display=swap';
                    document.head.appendChild(link);
                }
            }
            if (ty.bodyFont) {
                root.style.setProperty('--pm-font-body', "'"+ty.bodyFont+"', system-ui, sans-serif");
                var id2 = 'gfont-'+ty.bodyFont.replace(/\s+/g,'-').toLowerCase();
                if (!document.getElementById(id2)) {
                    var link2 = document.createElement('link'); link2.id=id2; link2.rel='stylesheet';
                    link2.href='https://fonts.googleapis.com/css2?family='+encodeURIComponent(ty.bodyFont)+':wght@300;400;500;600;700&display=swap';
                    document.head.appendChild(link2);
                }
            }
            if (ty.baseFontSize) root.style.setProperty('--pm-font-size-base', ty.baseFontSize+'px');
            if (ty.headingWeight) root.style.setProperty('--pm-heading-weight', ty.headingWeight);
            if (ty.bodyWeight) root.style.setProperty('--pm-body-weight', ty.bodyWeight);
            if (ty.lineHeight) root.style.setProperty('--pm-line-height', ty.lineHeight);
            if (ty.letterSpacing !== undefined) root.style.setProperty('--pm-letter-spacing', ty.letterSpacing+'em');

            var g = t.global || {};
            if (g.borderRadius) root.style.setProperty('--pm-radius', radiusPx(g.borderRadius));

            var h = t.header || {};
            if (h.height) root.style.setProperty('--pm-header-height', h.height+'px');
            if (h.iconSize) root.style.setProperty('--pm-icon-size', h.iconSize+'px');
            if (h.menuFontSize) root.style.setProperty('--pm-menu-font-size', h.menuFontSize+'px');
            if (h.menuUppercase !== undefined) root.style.setProperty('--pm-menu-transform', h.menuUppercase?'uppercase':'none');
            if (h.menuLetterSpacing !== undefined) root.style.setProperty('--pm-menu-letter-spacing', h.menuLetterSpacing+'em');

            var f = t.footer || {};
            if (f.backgroundColor) root.style.setProperty('--pm-footer-bg', f.backgroundColor);
            if (f.textColor) root.style.setProperty('--pm-footer-text', f.textColor);

            var btn = t.buttons || {};
            if (btn.fontWeight) root.style.setProperty('--pm-btn-font-weight', btn.fontWeight);
            if (btn.uppercase !== undefined) root.style.setProperty('--pm-btn-transform', btn.uppercase?'uppercase':'none');
            if (btn.shadow !== undefined) root.style.setProperty('--pm-btn-shadow', btn.shadow?'0 2px 8px rgba(0,0,0,0.15)':'none');
            if (btn.radius) root.style.setProperty('--pm-btn-radius', radiusPx(btn.radius));
        }

        window.addEventListener('message', function(event) {
            if (event.data && event.data.type === 'theme-preview-update' && event.data.theme) {
                applyTheme(event.data.theme);
            }
        });
    })();
    </script>

    @stack('styles')
</head>
<body class="antialiased">
    <div class="min-h-screen flex flex-col">

        {{-- ═══ ANNOUNCEMENT BAR — mirrors AnnouncementBar in StoreHeader.tsx ═══ --}}
        @php $validMsgs = array_filter($__ann['messages'] ?? [], fn($m) => !empty(trim($m))); @endphp
        @if(($__ann['enabled'] ?? false) && count($validMsgs) > 0)
            <div class="text-center text-xs py-1.5 font-body tracking-wide"
                 style="background-color:var(--pm-primary);color:var(--pm-primary-fg)">
                {{ $validMsgs[0] ?? '' }}
            </div>
        @endif

        {{-- ═══ HEADER — mirrors StoreHeader.tsx ═══ --}}
        <header class="z-50 backdrop-blur supports-[backdrop-filter]:bg-background/80 {{ ($__header['borderBottom'] ?? true) ? 'border-b' : '' }} {{ ($__header['sticky'] ?? true) ? 'sticky top-0' : '' }}"
                style="background-color:color-mix(in srgb, var(--pm-background) 95%, transparent)">
            <div class="container mx-auto px-4">
                @php
                    $isMinimal = in_array($__header['layout'] ?? 'classic', ['minimal', 'hamburger-only']);
                    $isCentered = in_array($__header['layout'] ?? 'classic', ['centered', 'logo-center-nav-left']);
                @endphp
                <div class="flex items-center {{ $isCentered ? 'justify-center relative' : 'justify-between' }}" style="height:var(--pm-header-height)">
                    {{-- Mobile menu toggle --}}
                    <button onclick="document.getElementById('mobile-menu').classList.toggle('hidden')"
                            class="lg:hidden p-2 rounded-md {{ $isCentered ? 'absolute left-0' : '' }}"
                            style="color:var(--pm-foreground)">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                    </button>

                    {{-- Logo --}}
                    <a href="/" class="flex items-center gap-2" style="color:var(--pm-foreground)">
                        @if($__logo['imageUrl'] ?? '')
                            <img src="{{ $__logo['imageUrl'] }}" alt="Logo" style="max-height:{{ $__logo['maxHeight'] ?? 40 }}px" class="object-contain">
                        @endif
                        @if($__logo['showText'] ?? true)
                            <span class="font-display text-xl md:text-2xl font-bold tracking-tight">{{ $storeName }}</span>
                        @endif
                    </a>

                    {{-- Desktop nav --}}
                    @if(!in_array($__header['layout'] ?? 'classic', ['hamburger-only', 'centered']))
                        <nav class="hidden lg:flex items-center gap-8">
                            @php $storeCategories = \App\Models\Category::where('is_active', true)->take(5)->get(); @endphp
                            @foreach($storeCategories as $cat)
                                <a href="{{ route('store.products', ['category' => $cat->slug]) }}"
                                   class="font-medium transition-colors tracking-wider"
                                   style="color:var(--pm-muted-fg);font-size:var(--pm-menu-font-size);text-transform:var(--pm-menu-transform);letter-spacing:var(--pm-menu-letter-spacing)">
                                    {{ $cat->name }}
                                </a>
                            @endforeach
                        </nav>
                    @endif

                    {{-- Icons --}}
                    <div class="flex items-center gap-1 {{ $isCentered ? 'absolute right-0' : '' }}">
                        @if($__header['showSearch'] ?? true)
                            <a href="{{ route('store.products') }}" class="p-2 rounded-md transition-colors inline-flex items-center justify-center" style="color:var(--pm-foreground)">
                                <svg width="{{ $__header['iconSize'] ?? 20 }}" height="{{ $__header['iconSize'] ?? 20 }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </a>
                        @endif
                        @if($__header['showWishlist'] ?? false)
                            <a href="{{ auth()->check() ? route('store.wishlist') : route('login') }}" class="p-2 rounded-md transition-colors inline-flex items-center justify-center" style="color:var(--pm-foreground)">
                                <svg width="{{ $__header['iconSize'] ?? 20 }}" height="{{ $__header['iconSize'] ?? 20 }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                            </a>
                        @endif
                        @if($__header['showAccount'] ?? true)
                            <a href="{{ auth()->check() ? route('store.account') : route('login') }}" class="p-2 rounded-md transition-colors inline-flex items-center justify-center" style="color:var(--pm-foreground)">
                                <svg width="{{ $__header['iconSize'] ?? 20 }}" height="{{ $__header['iconSize'] ?? 20 }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            </a>
                        @endif
                        @if($__header['showCart'] ?? true)
                            <a href="{{ route('store.cart') }}" class="relative p-2 rounded-md transition-colors inline-flex items-center justify-center" style="color:var(--pm-foreground)">
                                <svg width="{{ $__header['iconSize'] ?? 20 }}" height="{{ $__header['iconSize'] ?? 20 }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                                @php $cartCount = count(session('cart', [])); @endphp
                                @if($cartCount > 0 && ($__header['cartBadgeStyle'] ?? 'count') !== 'none')
                                    <span class="absolute -top-1 -right-1 text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center"
                                          style="background-color:var(--pm-foreground);color:var(--pm-background)">
                                        {{ ($__header['cartBadgeStyle'] ?? 'count') === 'count' ? $cartCount : '●' }}
                                    </span>
                                @endif
                            </a>
                        @endif
                    </div>
                </div>

                {{-- Centered nav below --}}
                @if(($__header['layout'] ?? 'classic') === 'centered')
                    <nav class="hidden lg:flex items-center justify-center gap-8 pb-3">
                        @foreach($storeCategories ?? [] as $cat)
                            <a href="{{ route('store.products', ['category' => $cat->slug]) }}"
                               class="font-medium transition-colors tracking-wider"
                               style="color:var(--pm-muted-fg);font-size:var(--pm-menu-font-size);text-transform:var(--pm-menu-transform)">
                                {{ $cat->name }}
                            </a>
                        @endforeach
                    </nav>
                @endif
            </div>

            {{-- Mobile nav --}}
            <div id="mobile-menu" class="hidden lg:hidden border-t">
                <nav class="container mx-auto px-4 py-4 flex flex-col gap-4">
                    <a href="/" class="text-lg font-display font-semibold">Início</a>
                    @foreach($storeCategories ?? [] as $cat)
                        <a href="{{ route('store.products', ['category' => $cat->slug]) }}" class="text-base transition-colors" style="color:var(--pm-foreground)">{{ $cat->name }}</a>
                    @endforeach
                </nav>
            </div>
        </header>

        {{-- Main --}}
        <main class="flex-1">
            @if(session('success'))
                <div class="container mx-auto px-4 mt-4"><div class="p-3 bg-green-100 text-green-800 rounded-lg text-sm font-body">{{ session('success') }}</div></div>
            @endif
            @if(session('error'))
                <div class="container mx-auto px-4 mt-4"><div class="p-3 bg-red-100 text-red-800 rounded-lg text-sm font-body">{{ session('error') }}</div></div>
            @endif
            @yield('content')
        </main>

        {{-- ═══ FOOTER — mirrors StoreFooter.tsx ═══ --}}
        <footer class="mt-20" style="background-color:var(--pm-footer-bg);color:var(--pm-footer-text)">
            <div class="container mx-auto px-4 py-12">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 class="font-display text-lg font-bold mb-4">{{ $storeName }}</h3>
                        @if($__footer['showNewsletter'] ?? false)
                            <p class="text-sm opacity-70">{{ $__footer['newsletterDescription'] ?? '' }}</p>
                        @endif
                    </div>
                    @foreach(array_filter($__footer['columns'] ?? [], fn($c) => $c['enabled'] ?? true) as $col)
                        <div>
                            <h4 class="font-semibold text-sm uppercase tracking-wider mb-4">{{ $col['title'] }}</h4>
                            <ul class="space-y-2 text-sm">
                                @foreach($col['links'] ?? [] as $link)
                                    <li><a href="{{ $link['url'] }}" class="opacity-70 hover:opacity-100 transition-opacity">{{ $link['label'] }}</a></li>
                                @endforeach
                            </ul>
                        </div>
                    @endforeach
                </div>

                @if($__footer['showSocial'] ?? true)
                    <div class="flex gap-3 mt-8">
                        @foreach($__footer['socialLinks'] ?? [] as $s)
                            <a href="{{ $s['url'] }}" class="opacity-70 hover:opacity-100 transition-opacity">
                                @if($s['platform'] === 'instagram')
                                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                                @else
                                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                                @endif
                            </a>
                        @endforeach
                    </div>
                @endif

                <div class="mt-8 pt-8 text-center text-xs opacity-50" style="border-top:1px solid color-mix(in srgb, var(--pm-footer-text) 10%, transparent)">
                    <div class="flex items-center justify-between">
                        <span>{{ $copyright }}</span>
                        @if($__footer['showBackToTop'] ?? true)
                            <button onclick="window.scrollTo({top:0,behavior:'smooth'})" class="opacity-70 hover:opacity-100">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
                            </button>
                        @endif
                    </div>
                    @if(count($__footer['bottomLinks'] ?? []) > 0)
                        <div class="flex justify-center gap-4 mt-2">
                            @foreach($__footer['bottomLinks'] as $link)
                                <a href="{{ $link['url'] }}" class="hover:opacity-100 opacity-70">{{ $link['label'] }}</a>
                            @endforeach
                        </div>
                    @endif
                </div>
            </div>
        </footer>

        {{-- ═══ WHATSAPP BUTTON — mirrors WhatsAppButton in StoreLayout.tsx ═══ --}}
        @if(($__wa['enabled'] ?? false) && ($__wa['number'] ?? ''))
            @php $waUrl = 'https://wa.me/' . preg_replace('/\D/', '', $__wa['number']) . '?text=' . urlencode($__wa['message'] ?? ''); @endphp
            <a href="{{ $waUrl }}" target="_blank" rel="noopener noreferrer"
               class="fixed z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg text-white transition-all hover:scale-105 {{ ($__wa['position'] ?? 'bottom-right') === 'bottom-left' ? 'bottom-6 left-6' : 'bottom-6 right-6' }}"
               style="background-color:{{ $__wa['backgroundColor'] ?? '#25d366' }}">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
                @if($__wa['showLabel'] ?? false)
                    <span class="text-sm font-medium">{{ $__wa['label'] ?? '' }}</span>
                @endif
            </a>
        @endif
    </div>
    @stack('scripts')
</body>
</html>
