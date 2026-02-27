<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name', 'MODA STORE') }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], display: ['"Playfair Display"', 'serif'] },
                    colors: {
                        background: 'hsl(0 0% 100%)', foreground: 'hsl(0 0% 8%)',
                        primary: 'hsl(0 0% 8%)', 'primary-foreground': 'hsl(0 0% 98%)',
                        secondary: 'hsl(0 0% 96%)', 'secondary-foreground': 'hsl(0 0% 8%)',
                        muted: 'hsl(0 0% 96%)', 'muted-foreground': 'hsl(0 0% 45%)',
                        accent: 'hsl(0 0% 96%)', border: 'hsl(0 0% 90%)', input: 'hsl(0 0% 90%)',
                        destructive: 'hsl(0 72% 51%)',
                    }
                }
            }
        }
    </script>
    <style>
        body { font-family: 'Inter', system-ui, sans-serif; }
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', system-ui, sans-serif; }
    </style>
    @stack('styles')
</head>
<body class="bg-background text-foreground antialiased">
    <div class="min-h-screen flex flex-col">
        {{-- Header - identical to StoreHeader.tsx --}}
        <header class="z-50 bg-background/95 backdrop-blur sticky top-0 border-b">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between" style="height: 64px;">
                    {{-- Mobile menu --}}
                    <button onclick="document.getElementById('mobile-menu').classList.toggle('hidden')" class="lg:hidden p-2 hover:bg-secondary rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                    </button>

                    {{-- Logo --}}
                    <a href="{{ route('store.home') }}" class="flex items-center gap-2">
                        <span class="font-display text-xl md:text-2xl font-bold tracking-tight">MODA STORE</span>
                    </a>

                    {{-- Desktop nav --}}
                    <nav class="hidden lg:flex items-center gap-8">
                        @php $storeCategories = \App\Models\Category::take(5)->get(); @endphp
                        @foreach($storeCategories as $cat)
                            <a href="{{ route('store.products', ['category' => $cat->slug]) }}"
                               class="font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wider text-sm"
                               style="text-transform: uppercase;">{{ $cat->name }}</a>
                        @endforeach
                    </nav>

                    {{-- Icons --}}
                    <div class="flex items-center gap-1">
                        {{-- Search --}}
                        <a href="{{ route('store.products') }}" class="p-2 hover:bg-secondary rounded-md transition-colors inline-flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </a>
                        {{-- Wishlist --}}
                        @auth
                        <a href="{{ route('store.wishlist') }}" class="p-2 hover:bg-secondary rounded-md transition-colors inline-flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                        </a>
                        @endauth
                        {{-- Account --}}
                        <a href="{{ auth()->check() ? route('store.account') : route('login') }}" class="p-2 hover:bg-secondary rounded-md transition-colors inline-flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        </a>
                        {{-- Cart --}}
                        <a href="{{ route('store.cart') }}" class="relative p-2 hover:bg-secondary rounded-md transition-colors inline-flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                            @php $cartCount = count(session('cart', [])); @endphp
                            @if($cartCount > 0)
                                <span class="absolute -top-1 -right-1 bg-foreground text-[hsl(0,0%,98%)] text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">{{ $cartCount }}</span>
                            @endif
                        </a>
                    </div>
                </div>
            </div>

            {{-- Mobile nav --}}
            <div id="mobile-menu" class="hidden lg:hidden border-t">
                <nav class="container mx-auto px-4 py-4 flex flex-col gap-4">
                    <a href="{{ route('store.home') }}" class="text-lg font-display font-semibold">Início</a>
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

        {{-- Footer - identical to StoreFooter.tsx --}}
        <footer class="mt-20" style="background-color: hsl(0, 0%, 8%); color: hsl(0, 0%, 98%);">
            <div class="container mx-auto px-4 py-12">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 class="font-display text-lg font-bold mb-4">MODA STORE</h3>
                        <p class="text-sm opacity-70">Receba novidades e promoções exclusivas.</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-sm uppercase tracking-wider mb-4">Institucional</h4>
                        <ul class="space-y-2 text-sm" style="color: hsla(0,0%,98%,0.7);">
                            <li><a href="#" class="hover:opacity-100 transition-opacity opacity-70">Sobre nós</a></li>
                            <li><a href="#" class="hover:opacity-100 transition-opacity opacity-70">Termos de uso</a></li>
                            <li><a href="#" class="hover:opacity-100 transition-opacity opacity-70">Privacidade</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-sm uppercase tracking-wider mb-4">Atendimento</h4>
                        <ul class="space-y-2 text-sm" style="color: hsla(0,0%,98%,0.7);">
                            <li><a href="#" class="hover:opacity-100 transition-opacity opacity-70">Trocas e devoluções</a></li>
                            <li><a href="#" class="hover:opacity-100 transition-opacity opacity-70">Contato</a></li>
                            <li><a href="#" class="hover:opacity-100 transition-opacity opacity-70">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-sm uppercase tracking-wider mb-4">Minha Conta</h4>
                        <ul class="space-y-2 text-sm" style="color: hsla(0,0%,98%,0.7);">
                            <li><a href="{{ auth()->check() ? route('store.account') : route('login') }}" class="hover:opacity-100 transition-opacity opacity-70">Minha conta</a></li>
                            <li><a href="{{ auth()->check() ? route('store.orders') : route('login') }}" class="hover:opacity-100 transition-opacity opacity-70">Meus pedidos</a></li>
                            <li><a href="{{ auth()->check() ? route('store.wishlist') : route('login') }}" class="hover:opacity-100 transition-opacity opacity-70">Favoritos</a></li>
                        </ul>
                    </div>
                </div>
                <div class="border-t mt-8 pt-8 text-center text-xs opacity-50" style="border-color: hsla(0,0%,98%,0.1);">
                    <span>© {{ date('Y') }} MODA STORE. Todos os direitos reservados.</span>
                </div>
            </div>
        </footer>
    </div>
    @stack('scripts')
</body>
</html>