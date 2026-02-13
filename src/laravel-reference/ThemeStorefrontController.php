<?php
/**
 * ============================================================
 * ThemeStorefrontController.php
 * ============================================================
 * 
 * Controller para servir as páginas da vitrine Premium via Inertia.
 * Lê o tema publicado de user_theme_states e entrega como props.
 * 
 * COPIE este arquivo para:
 * app/Http/Controllers/User/ThemeStorefrontController.php
 * 
 * ROTAS (adicione em routes/web.php):
 * 
 * Route::middleware(['web'])->group(function () {
 *     Route::get('/{username}', [ThemeStorefrontController::class, 'home'])->name('theme.home');
 *     Route::get('/{username}/shop', [ThemeStorefrontController::class, 'products'])->name('theme.products');
 *     Route::get('/{username}/product/{slug}', [ThemeStorefrontController::class, 'productDetail'])->name('theme.product');
 *     Route::get('/{username}/cart', [ThemeStorefrontController::class, 'cart'])->name('theme.cart');
 *     Route::get('/{username}/checkout', [ThemeStorefrontController::class, 'checkout'])->name('theme.checkout');
 * });
 */

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\UserThemeState;
use App\Models\User\BasicSetting;
use Inertia\Inertia;

class ThemeStorefrontController extends Controller
{
    /**
     * Resolve the user and their published theme config.
     */
    private function resolveTheme(string $username): array
    {
        $user = \App\Models\User::where('username', $username)->firstOrFail();
        $ubs = BasicSetting::where('user_id', $user->id)->firstOrFail();
        
        // Only serve Inertia pages for premium theme
        if ($ubs->theme !== 'premium') {
            abort(404);
        }

        $state = UserThemeState::where('user_id', $user->id)
            ->where('theme', 'premium')
            ->first();

        $defaults = \App\Http\Controllers\User\PremiumAppearanceController::defaults();
        $published = $defaults;

        if ($state && $state->published) {
            $pub = is_string($state->published) ? json_decode($state->published, true) : $state->published;
            if (is_array($pub)) {
                $published = array_replace_recursive($defaults, $pub);
            }
        }

        return [
            'user' => $user,
            'ubs' => $ubs,
            'theme' => $published,
        ];
    }

    /**
     * Homepage — Featured products, categories, collections
     */
    public function home(string $username)
    {
        $ctx = $this->resolveTheme($username);
        $user = $ctx['user'];

        // Fetch featured products
        $products = \App\Models\User\UserItem::where('user_id', $user->id)
            ->where('status', 1)
            ->where('featured', 1)
            ->with(['contents' => function ($q) {
                $q->where('language_id', currentLanguageId());
            }, 'images'])
            ->limit(12)
            ->get()
            ->map(fn($item) => $this->mapProduct($item));

        // Fetch categories
        $categories = \App\Models\User\UserItemCategory::where('user_id', $user->id)
            ->where('status', 1)
            ->with(['contents' => function ($q) {
                $q->where('language_id', currentLanguageId());
            }])
            ->get()
            ->map(fn($cat) => [
                'id' => $cat->id,
                'name' => $cat->contents->first()?->name ?? '',
                'slug' => $cat->contents->first()?->slug ?? '',
            ]);

        return Inertia::render('Theme/HomePage', [
            'theme' => $ctx['theme'],
            'products' => $products,
            'categories' => $categories,
            'collections' => [], // Add collection logic as needed
            'storeName' => $user->username,
        ]);
    }

    /**
     * Products listing with optional category filter
     */
    public function products(string $username)
    {
        $ctx = $this->resolveTheme($username);
        $user = $ctx['user'];
        $perPage = $ctx['theme']['category']['productsPerPage'] ?? 24;

        $query = \App\Models\User\UserItem::where('user_id', $user->id)
            ->where('status', 1)
            ->with(['contents' => function ($q) {
                $q->where('language_id', currentLanguageId());
            }, 'images']);

        // Category filter
        if ($catSlug = request('category')) {
            $cat = \App\Models\User\UserItemCategory::whereHas('contents', function ($q) use ($catSlug) {
                $q->where('slug', $catSlug);
            })->where('user_id', $user->id)->first();

            if ($cat) {
                $query->where('category_id', $cat->id);
            }
        }

        $products = $query->paginate($perPage)->through(fn($item) => $this->mapProduct($item));

        $categories = \App\Models\User\UserItemCategory::where('user_id', $user->id)
            ->where('status', 1)
            ->with(['contents' => function ($q) {
                $q->where('language_id', currentLanguageId());
            }])
            ->get()
            ->map(fn($cat) => [
                'id' => $cat->id,
                'name' => $cat->contents->first()?->name ?? '',
                'slug' => $cat->contents->first()?->slug ?? '',
            ]);

        return Inertia::render('Theme/ProductsPage', [
            'theme' => $ctx['theme'],
            'products' => $products->items(),
            'categories' => $categories,
            'currentCategory' => $catSlug,
            'pagination' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'total' => $products->total(),
            ],
            'storeName' => $user->username,
        ]);
    }

    /**
     * Product detail page
     */
    public function productDetail(string $username, string $slug)
    {
        $ctx = $this->resolveTheme($username);
        $user = $ctx['user'];

        $item = \App\Models\User\UserItem::where('user_id', $user->id)
            ->where('status', 1)
            ->whereHas('contents', function ($q) use ($slug) {
                $q->where('slug', $slug);
            })
            ->with(['contents', 'images', 'variants'])
            ->firstOrFail();

        $product = $this->mapProduct($item, true);

        // Related products
        $related = \App\Models\User\UserItem::where('user_id', $user->id)
            ->where('status', 1)
            ->where('category_id', $item->category_id)
            ->where('id', '!=', $item->id)
            ->with(['contents' => function ($q) {
                $q->where('language_id', currentLanguageId());
            }, 'images'])
            ->limit(4)
            ->get()
            ->map(fn($i) => $this->mapProduct($i));

        return Inertia::render('Theme/ProductDetailPage', [
            'theme' => $ctx['theme'],
            'product' => $product,
            'relatedProducts' => $related,
            'storeName' => $user->username,
        ]);
    }

    /**
     * Cart page (mostly client-side, just needs theme)
     */
    public function cart(string $username)
    {
        $ctx = $this->resolveTheme($username);

        return Inertia::render('Theme/CartPage', [
            'theme' => $ctx['theme'],
            'storeName' => $ctx['user']->username,
        ]);
    }

    /**
     * Checkout page
     */
    public function checkout(string $username)
    {
        $ctx = $this->resolveTheme($username);

        return Inertia::render('Theme/CheckoutPage', [
            'theme' => $ctx['theme'],
            'storeName' => $ctx['user']->username,
        ]);
    }

    /**
     * Map a UserItem model to the Product shape expected by React components.
     */
    private function mapProduct($item, bool $full = false): array
    {
        $content = $item->contents->first();
        $images = $item->images->pluck('image')->map(fn($img) => asset('assets/front/img/user/' . $img))->toArray();

        $product = [
            'id' => (string) $item->id,
            'name' => $content?->title ?? '',
            'slug' => $content?->slug ?? '',
            'description' => $content?->description ?? '',
            'price' => (float) $item->current_price,
            'compareAtPrice' => $item->previous_price > 0 ? (float) $item->previous_price : null,
            'images' => $images ?: [asset('assets/front/images/placeholder.png')],
            'sku' => $item->sku ?? '',
            'categoryId' => (string) $item->category_id,
            'active' => (bool) $item->status,
            'featured' => (bool) ($item->featured ?? false),
            'rating' => (float) ($item->rating ?? 0),
            'reviewCount' => (int) ($item->review_count ?? 0),
            'stock' => (int) ($item->stock ?? 0),
            'createdAt' => $item->created_at?->toISOString() ?? '',
            'variants' => [],
            'tags' => [],
        ];

        if ($full && $item->relationLoaded('variants')) {
            $product['variants'] = $item->variants->map(fn($v) => [
                'id' => (string) $v->id,
                'name' => $v->name ?? '',
                'price' => (float) ($v->price ?? $item->current_price),
                'stock' => (int) ($v->stock ?? 0),
                'sku' => $v->sku ?? '',
                'attributes' => is_array($v->attributes) ? $v->attributes : [],
            ])->toArray();
        }

        return $product;
    }
}
