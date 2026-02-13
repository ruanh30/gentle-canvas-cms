<?php
/**
 * ============================================================
 * Rotas da Vitrine Premium (Inertia)
 * ============================================================
 * 
 * Adicione ao seu routes/web.php, APÓS as rotas do admin e ANTES
 * do catch-all de temas legados.
 * 
 * IMPORTANTE: Estas rotas devem usar o middleware 'web' e 'inertia'.
 * Certifique-se de que HandleInertiaRequests está registrado.
 */

use App\Http\Controllers\User\ThemeStorefrontController;

// ============================================================
// Vitrine Premium — Inertia Pages
// ============================================================
// 
// Estas rotas servem as páginas da vitrine como Inertia Pages,
// lendo o tema publicado de user_theme_states.
//
// O middleware CheckPremiumTheme (opcional) pode verificar se
// o usuário realmente tem tema premium ativo.

Route::middleware(['web'])->group(function () {
    
    // Homepage da loja
    Route::get('/{username}', [ThemeStorefrontController::class, 'home'])
        ->name('theme.home')
        ->where('username', '[a-zA-Z0-9_-]+');

    // Listagem de produtos / categorias
    Route::get('/{username}/shop', [ThemeStorefrontController::class, 'products'])
        ->name('theme.products');

    // Detalhe do produto
    Route::get('/{username}/product/{slug}', [ThemeStorefrontController::class, 'productDetail'])
        ->name('theme.product');

    // Carrinho
    Route::get('/{username}/cart', [ThemeStorefrontController::class, 'cart'])
        ->name('theme.cart');

    // Checkout
    Route::get('/{username}/checkout', [ThemeStorefrontController::class, 'checkout'])
        ->name('theme.checkout');
});


// ============================================================
// NOTAS DE INTEGRAÇÃO
// ============================================================
//
// 1. HandleInertiaRequests.php — adicione shared data:
//
//    public function share(Request $request): array
//    {
//        return array_merge(parent::share($request), [
//            'flash' => [
//                'success' => fn() => $request->session()->get('success'),
//                'error' => fn() => $request->session()->get('error'),
//            ],
//        ]);
//    }
//
// 2. Build — após editar componentes React:
//    npm run build
//    → Gera public/build/ com manifest.json
//
// 3. A root view inertia.blade.php já está configurada.
//    Verifique que usa @inertia e @viteReactRefresh.
//
// 4. Ordem das rotas é importante! Coloque DEPOIS das rotas
//    do admin (/user/...) e ANTES do catch-all genérico.
