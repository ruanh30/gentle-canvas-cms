<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - {{ config('app.name', 'CMS') }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                        display: ['"Playfair Display"', 'serif'],
                    },
                    colors: {
                        background: 'hsl(0 0% 100%)',
                        foreground: 'hsl(0 0% 8%)',
                        card: 'hsl(0 0% 100%)',
                        'card-foreground': 'hsl(0 0% 8%)',
                        primary: 'hsl(0 0% 8%)',
                        'primary-foreground': 'hsl(0 0% 98%)',
                        secondary: 'hsl(0 0% 96%)',
                        'secondary-foreground': 'hsl(0 0% 8%)',
                        muted: 'hsl(0 0% 96%)',
                        'muted-foreground': 'hsl(0 0% 45%)',
                        accent: 'hsl(0 0% 96%)',
                        'accent-foreground': 'hsl(0 0% 8%)',
                        destructive: 'hsl(0 72% 51%)',
                        border: 'hsl(0 0% 90%)',
                        input: 'hsl(0 0% 90%)',
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
<body class="bg-[hsl(0,0%,96%)]/30 text-foreground antialiased">
    <div class="min-h-screen flex">
        {{-- Sidebar - identical to AdminLayout.tsx --}}
        <aside id="sidebar" class="bg-background border-r flex flex-col transition-all duration-200 sticky top-0 h-screen w-60">
            <div class="p-4 border-b flex items-center justify-between">
                <a href="{{ route('admin.dashboard') }}" class="font-display font-bold text-lg truncate" id="sidebar-title">Admin</a>
                <button onclick="toggleSidebar()" class="p-1 hover:bg-secondary rounded-md transition-colors ml-auto">
                    <svg id="collapse-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
            </div>

            <nav class="flex-1 p-2 space-y-1 overflow-y-auto">
                @php
                    $navItems = [
                        ['label' => 'Dashboard', 'route' => 'admin.dashboard', 'icon' => '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'],
                        ['label' => 'Pedidos', 'route' => 'admin.orders.index', 'icon' => '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>'],
                        ['label' => 'Produtos', 'route' => 'admin.products.index', 'icon' => '<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'],
                        ['label' => 'Categorias', 'route' => 'admin.categories.index', 'icon' => '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="M2 10h20"/>'],
                        ['label' => 'Clientes', 'route' => 'admin.customers.index', 'icon' => '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'],
                        ['label' => 'Cupons', 'route' => 'admin.coupons.index', 'icon' => '<path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/>'],
                        ['label' => 'Blog', 'route' => 'admin.blog.index', 'icon' => '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>'],
                        ['label' => 'Páginas', 'route' => 'admin.pages.index', 'icon' => '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>'],
                        ['label' => 'FAQ', 'route' => 'admin.faq.index', 'icon' => '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>'],
                        ['label' => 'Depoimentos', 'route' => 'admin.testimonials.index', 'icon' => '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'],
                        ['label' => 'Marcas', 'route' => 'admin.brands.index', 'icon' => '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>'],
                        ['label' => 'Menus', 'route' => 'admin.menus.index', 'icon' => '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>'],
                        ['label' => 'Mídia', 'route' => 'admin.media.index', 'icon' => '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>'],
                        ['label' => 'Configurações', 'route' => 'admin.settings.index', 'icon' => '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>'],
                        ['label' => 'Personalização', 'route' => 'admin.customization.index', 'icon' => '<path d="m14.622 17.897-10.68-2.913"/><path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"/><path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/>'],
                    ];
                @endphp

                @foreach($navItems as $item)
                    @php
                        $active = request()->routeIs($item['route']) || request()->routeIs($item['route'] . '.*');
                        if ($item['route'] === 'admin.dashboard') $active = request()->routeIs('admin.dashboard');
                    @endphp
                    <a href="{{ route($item['route']) }}"
                       class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors sidebar-link {{ $active ? 'bg-foreground text-[hsl(0,0%,98%)]' : 'text-muted-foreground hover:bg-secondary hover:text-foreground' }}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 shrink-0">{!! $item['icon'] !!}</svg>
                        <span class="truncate sidebar-label">{{ $item['label'] }}</span>
                    </a>
                @endforeach
            </nav>

            <div class="p-2 border-t space-y-1">
                <a href="{{ route('store.home') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 shrink-0"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><rect width="20" height="5" x="2" y="7"/></svg>
                    <span class="sidebar-label">Ver loja</span>
                </a>
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 shrink-0"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                        <span class="sidebar-label">Sair</span>
                    </button>
                </form>
            </div>
        </aside>

        {{-- Content --}}
        <div class="flex-1 min-w-0">
            <header class="bg-background border-b px-6 py-4 sticky top-0 z-10">
                <div class="flex items-center justify-between">
                    <h2 class="font-semibold text-lg font-sans">@yield('page-title', 'Admin')</h2>
                    <div class="flex items-center gap-3">
                        <span class="text-sm text-muted-foreground font-body">{{ auth()->user()->name }}</span>
                        <div class="w-8 h-8 rounded-full bg-foreground text-[hsl(0,0%,98%)] flex items-center justify-center text-xs font-bold">
                            {{ strtoupper(substr(auth()->user()->name, 0, 1)) }}
                        </div>
                    </div>
                </div>
            </header>
            <main class="p-6">
                @if(session('success'))
                    <div class="mb-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm font-body">{{ session('success') }}</div>
                @endif
                @if(session('error'))
                    <div class="mb-4 p-3 bg-red-100 text-red-800 rounded-lg text-sm font-body">{{ session('error') }}</div>
                @endif
                @if($errors->any())
                    <div class="mb-4 p-3 bg-red-100 text-red-800 rounded-lg text-sm font-body">
                        <ul class="list-disc list-inside">@foreach($errors->all() as $error)<li>{{ $error }}</li>@endforeach</ul>
                    </div>
                @endif
                @yield('content')
            </main>
        </div>
    </div>

    <script>
        let sidebarCollapsed = false;
        function toggleSidebar() {
            sidebarCollapsed = !sidebarCollapsed;
            const sidebar = document.getElementById('sidebar');
            const title = document.getElementById('sidebar-title');
            const icon = document.getElementById('collapse-icon');
            sidebar.classList.toggle('w-60', !sidebarCollapsed);
            sidebar.classList.toggle('w-16', sidebarCollapsed);
            title.classList.toggle('hidden', sidebarCollapsed);
            document.querySelectorAll('.sidebar-label').forEach(el => el.classList.toggle('hidden', sidebarCollapsed));
            icon.innerHTML = sidebarCollapsed ? '<path d="m9 18 6-6-6-6"/>' : '<path d="m15 18-6-6 6-6"/>';
        }
    </script>
    @stack('scripts')
</body>
</html>