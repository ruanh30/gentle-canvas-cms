<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Loja')</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: { extend: { colors: { primary: '#3b82f6', secondary: '#64748b', dark: '#1e293b', light: '#f8fafc' } } }
        }
    </script>
</head>
<body class="bg-white font-sans text-gray-800 min-h-screen flex flex-col">
    {{-- Header --}}
    <header class="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
            <a href="{{ route('store.home') }}" class="text-xl font-bold tracking-tight">🛍️ {{ \App\Models\Setting::get('store_name', 'Loja') }}</a>
            <nav class="hidden md:flex items-center gap-6 text-sm">
                <a href="{{ route('store.home') }}" class="hover:text-primary transition">Início</a>
                <a href="{{ route('store.products') }}" class="hover:text-primary transition">Produtos</a>
            </nav>
            <div class="flex items-center gap-3">
                @auth
                    <a href="{{ route('store.wishlist') }}" class="text-gray-500 hover:text-primary transition">❤️</a>
                    <a href="{{ route('store.account') }}" class="text-gray-500 hover:text-primary transition">👤</a>
                @else
                    <a href="{{ route('login') }}" class="text-sm text-gray-600 hover:text-primary">Entrar</a>
                @endauth
                <a href="{{ route('store.cart') }}" class="relative text-gray-500 hover:text-primary transition">
                    🛒
                    @php $cartCount = count(session('cart', [])); @endphp
                    @if($cartCount > 0)
                        <span class="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{{ $cartCount }}</span>
                    @endif
                </a>
            </div>
        </div>
    </header>

    {{-- Flash --}}
    @if(session('success'))
        <div class="container mx-auto px-4 mt-4">
            <div class="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                {{ session('success') }}
            </div>
        </div>
    @endif

    {{-- Content --}}
    <main class="flex-1">
        @yield('content')
    </main>

    {{-- Footer --}}
    <footer class="bg-slate-900 text-white mt-20">
        <div class="container mx-auto px-4 py-12">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 class="font-bold text-lg mb-3">{{ \App\Models\Setting::get('store_name', 'Loja') }}</h3>
                    <p class="text-sm text-slate-400">{{ \App\Models\Setting::get('store_description', 'Os melhores produtos para você.') }}</p>
                </div>
                <div>
                    <h4 class="font-semibold text-sm uppercase tracking-wider mb-3 text-slate-300">Links</h4>
                    <ul class="space-y-2 text-sm text-slate-400">
                        <li><a href="{{ route('store.home') }}" class="hover:text-white transition">Início</a></li>
                        <li><a href="{{ route('store.products') }}" class="hover:text-white transition">Produtos</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold text-sm uppercase tracking-wider mb-3 text-slate-300">Conta</h4>
                    <ul class="space-y-2 text-sm text-slate-400">
                        @auth
                            <li><a href="{{ route('store.account') }}" class="hover:text-white transition">Minha Conta</a></li>
                            <li><a href="{{ route('store.orders') }}" class="hover:text-white transition">Pedidos</a></li>
                        @else
                            <li><a href="{{ route('login') }}" class="hover:text-white transition">Entrar</a></li>
                            <li><a href="{{ route('register') }}" class="hover:text-white transition">Criar Conta</a></li>
                        @endauth
                    </ul>
                </div>
            </div>
            <div class="border-t border-slate-700 mt-8 pt-8 text-center text-xs text-slate-500">
                © {{ date('Y') }} {{ \App\Models\Setting::get('store_name', 'Loja') }}. Todos os direitos reservados.
            </div>
        </div>
    </footer>
</body>
</html>
