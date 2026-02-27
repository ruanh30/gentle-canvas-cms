<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @php
        // Load published theme from settings — mirrors ThemeContext.tsx
        $__themeJson = \App\Models\Setting::get('theme_published', '{}');
        $__t = json_decode($__themeJson, true) ?: [];

        // Defaults (mirrors theme-presets.ts defaultThemeConfig)
        $__c = array_merge([
            'primary' => '#1a1a1a', 'primaryForeground' => '#fafafa',
            'secondary' => '#f5f5f5', 'secondaryForeground' => '#1a1a1a',
            'accent' => '#f5f5f5', 'accentForeground' => '#1a1a1a',
            'background' => '#ffffff', 'foreground' => '#1a1a1a',
            'muted' => '#f5f5f5', 'mutedForeground' => '#737373',
            'border' => '#e5e5e5', 'buyNow' => '#dc2626', 'buyNowHover' => '#b91c1c',
        ], $__t['colors'] ?? []);

        $__typo = array_merge([
            'headingFont' => 'Playfair Display', 'bodyFont' => 'Inter',
            'baseFontSize' => 16, 'headingWeight' => 700, 'bodyWeight' => 400,
            'lineHeight' => 1.6, 'letterSpacing' => 0,
        ], $__t['typography'] ?? []);

        $__logo = array_merge(['text' => 'MODA STORE', 'showText' => true, 'imageUrl' => '', 'maxHeight' => 40], $__t['logo'] ?? []);
        $__header = array_merge([
            'layout' => 'classic', 'sticky' => true, 'borderBottom' => true, 'height' => 64,
            'menuFontSize' => 13, 'menuUppercase' => true, 'menuLetterSpacing' => 0.1,
            'iconSize' => 20, 'showSearch' => true, 'showAccount' => true,
            'showWishlist' => false, 'showCart' => true, 'cartBadgeStyle' => 'count',
        ], $__t['header'] ?? []);

        $__ann = array_merge([
            'enabled' => true, 'messages' => ['Frete grátis acima de R$ 299'],
            'speed' => 5, 'backgroundColor' => '#1a1a1a', 'textColor' => '#fafafa',
            'style' => 'static', 'direction' => 'rtl',
        ], $__t['header']['announcement'] ?? []);

        $__footer = array_merge([
            'backgroundColor' => '#1a1a1a', 'textColor' => '#fafafa',
            'copyrightText' => '© 2024 {storeName}. Todos os direitos reservados.',
            'showBackToTop' => true, 'showSocial' => true, 'showNewsletter' => false,
            'columns' => [
                ['title' => 'Institucional', 'links' => [['label' => 'Sobre nós', 'url' => '/about'], ['label' => 'Contato', 'url' => '/contact'], ['label' => 'FAQ', 'url' => '/faq']], 'enabled' => true],
                ['title' => 'Ajuda', 'links' => [['label' => 'Entregas', 'url' => '/shipping'], ['label' => 'Trocas', 'url' => '/returns'], ['label' => 'Privacidade', 'url' => '/privacy']], 'enabled' => true],
                ['title' => 'Contato', 'links' => [['label' => 'contato@loja.com', 'url' => 'mailto:contato@loja.com'], ['label' => '(11) 99999-0000', 'url' => 'tel:+5511999990000']], 'enabled' => true],
            ],
            'socialLinks' => [['platform' => 'instagram', 'url' => '#'], ['platform' => 'facebook', 'url' => '#']],
            'bottomLinks' => [['label' => 'Termos de Uso', 'url' => '/terms'], ['label' => 'Política de Privacidade', 'url' => '/privacy']],
        ], $__t['footer'] ?? []);

        $__wa = array_merge(['enabled' => false, 'number' => '', 'message' => 'Olá!', 'position' => 'bottom-right', 'showLabel' => false, 'label' => 'Precisa de ajuda?', 'backgroundColor' => '#25d366', 'delay' => 3], $__t['whatsapp'] ?? []);

        $storeName = $__logo['text'] ?: 'MODA STORE';
        $copyright = str_replace('{storeName}', $storeName, $__footer['copyrightText']);
    @endphp
    <title>@yield('title', $storeName)</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family={{ urlencode($__typo['headingFont']) }}:wght@300;400;500;600;700;800;900&family={{ urlencode($__typo['bodyFont']) }}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['{{ $__typo['bodyFont'] }}', 'system-ui', 'sans-serif'],
                        display: ['"{{ $__typo['headingFont'] }}"', 'serif'],
                    },
                    colors: {
                        background: '{{ $__c['background'] }}', foreground: '{{ $__c['foreground'] }}',
                        primary: '{{ $__c['primary'] }}', 'primary-foreground': '{{ $__c['primaryForeground'] }}',
                        secondary: '{{ $__c['secondary'] }}', 'secondary-foreground': '{{ $__c['secondaryForeground'] }}',
                        muted: '{{ $__c['muted'] }}', 'muted-foreground': '{{ $__c['mutedForeground'] }}',
                        accent: '{{ $__c['accent'] }}', 'accent-foreground': '{{ $__c['accentForeground'] }}',
                        border: '{{ $__c['border'] }}',
                    }
                }
            }
        }
    </script>
    <style>
        body { font-family: '{{ $__typo['bodyFont'] }}', system-ui, sans-serif; font-size: {{ $__typo['baseFontSize'] }}px; font-weight: {{ $__typo['bodyWeight'] }}; line-height: {{ $__typo['lineHeight'] }}; letter-spacing: {{ $__typo['letterSpacing'] }}em; }
        .font-display { font-family: '{{ $__typo['headingFont'] }}', serif; font-weight: {{ $__typo['headingWeight'] }}; }
        .font-body { font-family: '{{ $__typo['bodyFont'] }}', system-ui, sans-serif; }
    </style>
    @stack('styles')
</head>
<body class="bg-background text-foreground antialiased">
    <div class="min-h-screen flex flex-col">

        {{-- ═══ ANNOUNCEMENT BAR — mirrors AnnouncementBar in StoreHeader.tsx ═══ --}}
        @php $validMsgs = array_filter($__ann['messages'] ?? [], fn($m) => !empty(trim($m))); @endphp
        @if($__ann['enabled'] && count($validMsgs) > 0)
            <div class="text-center text-xs py-1.5 font-body tracking-wide"
                 style="background-color:{{ $__ann['backgroundColor'] }};color:{{ $__ann['textColor'] }}">
                {{ $validMsgs[0] ?? '' }}
            </div>
        @endif

        {{-- ═══ HEADER — mirrors StoreHeader.tsx ═══ --}}
        <header class="z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 {{ $__header['borderBottom'] ? 'border-b' : '' }} {{ $__header['sticky'] ? 'sticky top-0' : '' }}">
            <div class="container mx-auto px-4">
                @php
                    $isMinimal = in_array($__header['layout'], ['minimal', 'hamburger-only']);
                    $isCentered = in_array($__header['layout'], ['centered', 'logo-center-nav-left']);
                @endphp
                <div class="flex items-center {{ $isCentered ? 'justify-center relative' : 'justify-between' }}" style="height:{{ $__header['height'] }}px">
                    {{-- Mobile menu toggle --}}
                    <button onclick="document.getElementById('mobile-menu').classList.toggle('hidden')"
                            class="lg:hidden p-2 hover:bg-secondary rounded-md {{ $isCentered ? 'absolute left-0' : '' }}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                    </button>

                    {{-- Logo --}}
                    <a href="/" class="flex items-center gap-2">
                        @if($__logo['imageUrl'])
                            <img src="{{ $__logo['imageUrl'] }}" alt="Logo" style="max-height:{{ $__logo['maxHeight'] }}px" class="object-contain">
                        @endif
                        @if($__logo['showText'])
                            <span class="font-display text-xl md:text-2xl font-bold tracking-tight">{{ $storeName }}</span>
                        @endif
                    </a>

                    {{-- Desktop nav --}}
                    @if(!in_array($__header['layout'], ['hamburger-only', 'centered']))
                        <nav class="hidden lg:flex items-center gap-8">
                            @php $storeCategories = \App\Models\Category::where('is_active', true)->take(5)->get(); @endphp
                            @foreach($storeCategories as $cat)
                                <a href="{{ route('store.products', ['category' => $cat->slug]) }}"
                                   class="font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wider"
                                   style="font-size:{{ $__header['menuFontSize'] }}px;text-transform:{{ $__header['menuUppercase'] ? 'uppercase' : 'none' }};letter-spacing:{{ $__header['menuLetterSpacing'] }}em">
                                    {{ $cat->name }}
                                </a>
                            @endforeach
                        </nav>
                    @endif

                    {{-- Icons --}}
                    <div class="flex items-center gap-1 {{ $isCentered ? 'absolute right-0' : '' }}">
                        @if($__header['showSearch'])
                            <a href="{{ route('store.products') }}" class="p-2 hover:bg-secondary rounded-md transition-colors inline-flex items-center justify-center">
                                <svg width="{{ $__header['iconSize'] }}" height="{{ $__header['iconSize'] }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </a>
                        @endif
                        @if($__header['showWishlist'])
                            <a href="{{ auth()->check() ? route('store.wishlist') : route('login') }}" class="p-2 hover:bg-secondary rounded-md transition-colors inline-flex items-center justify-center">
                                <svg width="{{ $__header['iconSize'] }}" height="{{ $__header['iconSize'] }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                            </a>
                        @endif
                        @if($__header['showAccount'])
                            <a href="{{ auth()->check() ? route('store.account') : route('login') }}" class="p-2 hover:bg-secondary rounded-md transition-colors inline-flex items-center justify-center">
                                <svg width="{{ $__header['iconSize'] }}" height="{{ $__header['iconSize'] }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            </a>
                        @endif
                        @if($__header['showCart'])
                            <a href="{{ route('store.cart') }}" class="relative p-2 hover:bg-secondary rounded-md transition-colors inline-flex items-center justify-center">
                                <svg width="{{ $__header['iconSize'] }}" height="{{ $__header['iconSize'] }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                                @php $cartCount = count(session('cart', [])); @endphp
                                @if($cartCount > 0 && $__header['cartBadgeStyle'] !== 'none')
                                    <span class="absolute -top-1 -right-1 bg-foreground text-background text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {{ $__header['cartBadgeStyle'] === 'count' ? $cartCount : '●' }}
                                    </span>
                                @endif
                            </a>
                        @endif
                    </div>
                </div>

                {{-- Centered nav below --}}
                @if($__header['layout'] === 'centered')
                    <nav class="hidden lg:flex items-center justify-center gap-8 pb-3">
                        @foreach($storeCategories ?? [] as $cat)
                            <a href="{{ route('store.products', ['category' => $cat->slug]) }}"
                               class="font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wider"
                               style="font-size:{{ $__header['menuFontSize'] }}px;text-transform:{{ $__header['menuUppercase'] ? 'uppercase' : 'none' }}">
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
                        <a href="{{ route('store.products', ['category' => $cat->slug]) }}" class="text-base hover:text-foreground/80 transition-colors">{{ $cat->name }}</a>
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
        <footer class="mt-20" style="background-color:{{ $__footer['backgroundColor'] }};color:{{ $__footer['textColor'] }}">
            <div class="container mx-auto px-4 py-12">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 class="font-display text-lg font-bold mb-4">{{ $storeName }}</h3>
                        @if($__footer['showNewsletter'])
                            <p class="text-sm opacity-70">{{ $__footer['newsletterDescription'] ?? '' }}</p>
                        @endif
                    </div>
                    @foreach(array_filter($__footer['columns'] ?? [], fn($c) => $c['enabled'] ?? true) as $col)
                        <div>
                            <h4 class="font-semibold text-sm uppercase tracking-wider mb-4">{{ $col['title'] }}</h4>
                            <ul class="space-y-2 text-sm" style="color:{{ $__footer['textColor'] }}b3">
                                @foreach($col['links'] ?? [] as $link)
                                    <li><a href="{{ $link['url'] }}" class="hover:opacity-100 transition-opacity opacity-70">{{ $link['label'] }}</a></li>
                                @endforeach
                            </ul>
                        </div>
                    @endforeach
                </div>

                @if($__footer['showSocial'])
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

                <div class="border-t mt-8 pt-8 text-center text-xs opacity-50" style="border-color:{{ $__footer['textColor'] }}1a">
                    <div class="flex items-center justify-between">
                        <span>{{ $copyright }}</span>
                        @if($__footer['showBackToTop'])
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
        @if($__wa['enabled'] && $__wa['number'])
            @php $waUrl = 'https://wa.me/' . preg_replace('/\D/', '', $__wa['number']) . '?text=' . urlencode($__wa['message']); @endphp
            <a href="{{ $waUrl }}" target="_blank" rel="noopener noreferrer"
               class="fixed z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg text-white transition-all hover:scale-105 {{ $__wa['position'] === 'bottom-left' ? 'bottom-6 left-6' : 'bottom-6 right-6' }}"
               style="background-color:{{ $__wa['backgroundColor'] }}">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                @if($__wa['showLabel'])
                    <span class="text-sm font-medium">{{ $__wa['label'] }}</span>
                @endif
            </a>
        @endif
    </div>
    @stack('scripts')
</body>
</html>
