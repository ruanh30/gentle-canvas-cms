<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Admin') - CMS</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#3b82f6',
                        secondary: '#64748b',
                        dark: '#1e293b',
                        light: '#f8fafc'
                    }
                }
            }
        }
    </script>
    <style>
        [x-cloak] { display: none !important; }
    </style>
</head>
<body class="bg-slate-50 font-sans text-gray-800 min-h-screen flex">

    {{-- Sidebar --}}
    <aside class="w-64 bg-slate-900 text-white min-h-screen fixed left-0 top-0 overflow-y-auto z-40">
        <div class="p-6 border-b border-slate-700">
            <h1 class="text-xl font-bold tracking-tight">📦 CMS Admin</h1>
            <p class="text-xs text-slate-400 mt-1">{{ auth()->user()->name ?? 'Admin' }}</p>
        </div>

        <nav class="mt-4 space-y-1 px-3">
            <a href="{{ route('dashboard') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition {{ request()->routeIs('dashboard') ? 'bg-slate-800 text-white' : 'text-slate-300' }}">
                📊 <span>Dashboard</span>
            </a>

            <p class="px-3 pt-4 pb-1 text-xs uppercase tracking-wider text-slate-500">E-commerce</p>

            <a href="{{ route('admin.products.index') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition {{ request()->routeIs('admin.products.*') ? 'bg-slate-800 text-white' : 'text-slate-300' }}">
                🛍️ <span>Produtos</span>
            </a>
            <a href="{{ route('admin.categories.index') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition {{ request()->routeIs('admin.categories.*') ? 'bg-slate-800 text-white' : 'text-slate-300' }}">
                📁 <span>Categorias</span>
            </a>
            <a href="{{ route('admin.collections.index') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition {{ request()->routeIs('admin.collections.*') ? 'bg-slate-800 text-white' : 'text-slate-300' }}">
                📦 <span>Coleções</span>
            </a>
            <a href="{{ route('admin.orders.index') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition {{ request()->routeIs('admin.orders.*') ? 'bg-slate-800 text-white' : 'text-slate-300' }}">
                📋 <span>Pedidos</span>
            </a>
            <a href="{{ route('admin.customers.index') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition {{ request()->routeIs('admin.customers.*') ? 'bg-slate-800 text-white' : 'text-slate-300' }}">
                👥 <span>Clientes</span>
            </a>
            <a href="{{ route('admin.coupons.index') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition {{ request()->routeIs('admin.coupons.*') ? 'bg-slate-800 text-white' : 'text-slate-300' }}">
                🎟️ <span>Cupons</span>
            </a>
            <a href="{{ route('admin.brands.index') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition {{ request()->routeIs('admin.brands.*') ? 'bg-slate-800 text-white' : 'text-slate-300' }}">
                🏷️ <span>Marcas</span>
            </a>

            <p class="px-3 pt-4 pb-1 text-xs uppercase tracking-wider text-slate-500">Conteúdo</p>

            <a href="{{ route('admin.blog.index') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition {{ request()->routeIs('admin.blog.*') ? 'bg-slate-800 text-white' : 'text-slate-300' }}">
                ✏️ <span>Blog</span>
            </a>
            <a href="{{ route('admin.pages.index') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition {{ request()->routeIs('admin.pages.*') ? 'bg-slate-800 text-white' : 'text-slate-300' }}">
                📄 <span>Páginas</span>
            </a>
            <a href="{{ route('admin.faq.index') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition {{ request()->routeIs('admin.faq.*') ? 'bg-slate-800 text-white' : 'text-slate-300' }}">
                ❓ <span>FAQ</span>
            </a>
            <a href="{{ route('admin.testimonials.index') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition {{ request()->routeIs('admin.testimonials.*') ? 'bg-slate-800 text-white' : 'text-slate-300' }}">
                💬 <span>Depoimentos</span>
            </a>
            <a href="{{ route('admin.media.index') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition {{ request()->routeIs('admin.media.*') ? 'bg-slate-800 text-white' : 'text-slate-300' }}">
                🖼️ <span>Mídia</span>
            </a>
            <a href="{{ route('admin.menus.index') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition {{ request()->routeIs('admin.menus.*') ? 'bg-slate-800 text-white' : 'text-slate-300' }}">
                🧭 <span>Menus</span>
            </a>

            <p class="px-3 pt-4 pb-1 text-xs uppercase tracking-wider text-slate-500">Sistema</p>

            <a href="{{ route('admin.customization.index') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition {{ request()->routeIs('admin.customization.*') ? 'bg-slate-800 text-white' : 'text-slate-300' }}">
                🎨 <span>Personalização</span>
            </a>
            <a href="{{ route('admin.settings.index') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition {{ request()->routeIs('admin.settings.*') ? 'bg-slate-800 text-white' : 'text-slate-300' }}">
                ⚙️ <span>Configurações</span>
            </a>

            <div class="border-t border-slate-700 mt-4 pt-4">
                <a href="{{ route('store.home') }}" target="_blank" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition">
                    🌐 <span>Ver Loja</span>
                </a>
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-slate-800 hover:text-red-300 transition w-full text-left">
                        🚪 <span>Sair</span>
                    </button>
                </form>
            </div>
        </nav>
    </aside>

    {{-- Main Content --}}
    <main class="ml-64 flex-1 min-h-screen">
        {{-- Top bar --}}
        <header class="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
            <h2 class="text-lg font-semibold text-gray-800">@yield('title', 'Dashboard')</h2>
            <div class="flex items-center gap-4">
                <span class="text-sm text-gray-500">{{ auth()->user()->email ?? '' }}</span>
            </div>
        </header>

        {{-- Alerts --}}
        <div class="px-8 pt-4">
            @if(session('success'))
                <div class="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4 flex items-center justify-between">
                    <span>✅ {{ session('success') }}</span>
                    <button onclick="this.parentElement.remove()" class="text-green-600 hover:text-green-800">&times;</button>
                </div>
            @endif
            @if(session('error'))
                <div class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4 flex items-center justify-between">
                    <span>❌ {{ session('error') }}</span>
                    <button onclick="this.parentElement.remove()" class="text-red-600 hover:text-red-800">&times;</button>
                </div>
            @endif
            @if($errors->any())
                <div class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
                    <ul class="list-disc list-inside text-sm">
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
        </div>

        {{-- Page Content --}}
        <div class="px-8 py-6">
            @yield('content')
        </div>
    </main>

</body>
</html>
