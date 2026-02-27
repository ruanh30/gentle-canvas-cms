<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name', 'MODA STORE') }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], display: ['"Playfair Display"', 'serif'] },
                    colors: {
                        background: 'hsl(0 0% 100%)', foreground: 'hsl(0 0% 8%)',
                        primary: 'hsl(0 0% 8%)', 'primary-foreground': 'hsl(0 0% 98%)',
                        secondary: 'hsl(0 0% 96%)', 'muted-foreground': 'hsl(0 0% 45%)',
                        border: 'hsl(0 0% 90%)', destructive: 'hsl(0 72% 51%)',
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
</head>
<body class="bg-background text-foreground antialiased">
    {{-- Identical to LoginPage.tsx --}}
    <div class="container mx-auto px-4 py-20 flex justify-center">
        <div class="w-full max-w-md rounded-xl border border-border bg-background shadow-sm">
            @if(session('error'))
                <div class="mx-6 mt-4 p-3 bg-red-100 text-red-800 rounded-lg text-sm font-body">{{ session('error') }}</div>
            @endif
            @if($errors->any())
                <div class="mx-6 mt-4 p-3 bg-red-100 text-red-800 rounded-lg text-sm font-body">
                    @foreach($errors->all() as $error)<p>{{ $error }}</p>@endforeach
                </div>
            @endif
            @yield('content')
        </div>
    </div>
</body>
</html>