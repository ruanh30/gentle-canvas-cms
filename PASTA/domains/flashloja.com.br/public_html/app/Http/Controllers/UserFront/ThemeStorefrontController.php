<?php

namespace App\Http\Controllers\UserFront;

use App\Http\Controllers\Controller;
use App\Models\UserThemeState;
use App\Models\User\BasicSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ThemeStorefrontController extends Controller
{
    private function resolve(Request $request, string $username): array
    {
        $user = DB::table('users')->where('username', $username)->first();
        if (!$user) abort(404);

        $ubs = BasicSetting::where('user_id', $user->id)->first();
        if (!$ubs) abort(404);

        $state = UserThemeState::where('user_id', $user->id)->where('theme', 'premium')->first();

        // Theme resolution
        // Default: serve PUBLISHED config.
        // Preview mode: if the store owner is authenticated and requests ?theme-preview=true, serve DRAFT config.
        $theme = [];
        if ($state) {
            $useDraft = false;
            if ($request->boolean('theme-preview') && Auth::check() && (int) Auth::id() === (int) $user->id) {
                $useDraft = true;
            }

            $raw = $useDraft ? $state->draft : $state->published;
            if (!empty($raw)) {
                $theme = is_string($raw) ? (json_decode($raw, true) ?: []) : (array) $raw;
            }
        }

        return [$user, $ubs, $theme];
    }

    private function currentLangId(): ?int
    {
        try {
            $lang = app('userCurrentLang');
            return $lang?->id;
        } catch (\Throwable $e) {
            return null;
        }
    }

    private function categoriesForUser(int $userId)
    {
        return DB::table('user_item_categories')
            ->where('user_id', $userId)
            ->where('status', 1)
            ->orderBy('name')
            ->get(['id', 'name', 'slug'])
            ->map(fn($c) => ['id' => (string) $c->id, 'name' => $c->name ?? '', 'slug' => $c->slug ?? ''])
            ->values();
    }

    private function mapProduct($row): array
    {
        $images = DB::table('user_item_images')
            ->where('item_id', $row->item_id)
            ->orderBy('id')
            ->pluck('image')
            ->map(fn($img) => asset('assets/front/img/user/' . ltrim($img, '/')))
            ->values()
            ->all();

        // Fallback: some installs store the main image in user_items.thumbnail (no rows in user_item_images).
        if (empty($images) && !empty($row->thumbnail)) {
            $images = [asset('assets/front/img/user/items/thumbnail/' . ltrim($row->thumbnail, '/'))];
        }

        return [
            'id' => (string) $row->item_id,
            'name' => $row->title ?? '',
            'slug' => $row->slug ?? '',
            'description' => $row->description ?? '',
            'price' => (float) ($row->current_price ?? 0),
            'compareAtPrice' => !empty($row->previous_price) ? (float) $row->previous_price : null,
            'stock' => (int) ($row->stock ?? 0),
            'sku' => $row->sku ?? '',
            'active' => ((int) ($row->status ?? 0)) === 1,
            'images' => $images,
            'categoryId' => (string) ($row->category_id ?? ''),
            'tags' => [],
            'rating' => 0,
            'reviewCount' => 0,
        ];
    }

    public function home(Request $request, string $username)
    {
        [$user, $ubs, $theme] = $this->resolve($request, $username);

        // Only serve Inertia storefront for premium theme
        if ($ubs->theme !== 'premium') {
            return app(\App\Http\Controllers\UserFront\HomeController::class)->userDetailView($username);
        }

        $langId = $this->currentLangId();

        // NOTE: This project database doesn't have user_items.featured on all installs.
        // To avoid 500s, we only filter by status=1 here.
        $q = DB::table('user_items')
            ->join('user_item_contents', 'user_items.id', '=', 'user_item_contents.item_id')
            ->where('user_items.user_id', $user->id)
            ->where('user_items.status', 1);

        if ($langId) {
            $q->where('user_item_contents.language_id', $langId);
        }

        $perPage = (int) $request->query('per_page', 24);
        $page = (int) $request->query('page', 1);
        $total = (clone $q)->count();

        $items = $q
            ->select([
                'user_items.id as item_id',
                'user_items.current_price',
                'user_items.previous_price',
                'user_items.stock',
                'user_items.thumbnail',
                'user_items.thumbnail',
                'user_items.thumbnail',
                'user_items.sku',
                'user_items.status',
                'user_item_contents.title',
                'user_item_contents.slug',
                'user_item_contents.description',
                'user_item_contents.category_id',
            ])
            ->orderByDesc('user_items.id')
            ->limit(12)
            ->get();

        $products = $items->map(fn($row) => $this->mapProduct($row))->values();

        $categories = $this->categoriesForUser((int) $user->id);

        return Inertia::render('Theme/HomePage', [
            'theme' => $theme,
            'products' => $products,
            'categories' => $categories,
            'collections' => [],
            'storeName' => $user->username,
        ]);
    }

    public function products(Request $request, string $username)
    {
        [$user, $ubs, $theme] = $this->resolve($request, $username);

        if ($ubs->theme !== 'premium') {
            return app(\App\Http\Controllers\UserFront\ShopController::class)->Shop($username);
        }

        $langId = $this->currentLangId();
        $catSlug = $request->query('category');

        $q = DB::table('user_items')
            ->join('user_item_contents', 'user_items.id', '=', 'user_item_contents.item_id')
            ->where('user_items.user_id', $user->id)
            ->where('user_items.status', 1);

        if ($langId) $q->where('user_item_contents.language_id', $langId);

        if ($catSlug) {
            $cat = DB::table('user_item_categories')->where('user_id', $user->id)->where('slug', $catSlug)->first();
            if ($cat) $q->where('user_item_contents.category_id', $cat->id);
        }

        $perPage = (int) $request->query('per_page', 24);
        $page = (int) $request->query('page', 1);
        $total = (clone $q)->count();

        $items = $q
            ->select([
                'user_items.id as item_id',
                'user_items.current_price',
                'user_items.previous_price',
                'user_items.stock',
                'user_items.thumbnail',
                'user_items.thumbnail',
                'user_items.thumbnail',
                'user_items.sku',
                'user_items.status',
                'user_item_contents.title',
                'user_item_contents.slug',
                'user_item_contents.description',
                'user_item_contents.category_id',
            ])
            ->orderByDesc('user_items.id')
            ->offset(($page - 1) * $perPage)
            ->limit($perPage)
            ->get();

        $products = $items->map(fn($row) => $this->mapProduct($row))->values();

        $categories = $this->categoriesForUser((int) $user->id);

        return Inertia::render('Theme/ProductsPage', [
            'theme' => $theme,
            'products' => $products,
            'categories' => $categories,
            'currentCategory' => $catSlug,
            'pagination' => [
                'current_page' => $page,
                'per_page' => $perPage,
                'total' => $total,
                'last_page' => (int) ceil($total / $perPage),
            ],
            'storeName' => $user->username,
        ]);
    }

    public function productDetail(Request $request, string $username, string $slug)
    {
        [$user, $ubs, $theme] = $this->resolve($request, $username);

        if ($ubs->theme !== 'premium') {
            return app(\App\Http\Controllers\UserFront\ShopController::class)->productDetails($username, $slug);
        }

        $langId = $this->currentLangId();

        $q = DB::table('user_items')
            ->join('user_item_contents', 'user_items.id', '=', 'user_item_contents.item_id')
            ->where('user_items.user_id', $user->id)
            ->where('user_items.status', 1)
            ->where('user_item_contents.slug', $slug);

        if ($langId) $q->where('user_item_contents.language_id', $langId);

        $row = $q
            ->select([
                'user_items.id as item_id',
                'user_items.current_price',
                'user_items.previous_price',
                'user_items.stock',
                'user_items.thumbnail',
                'user_items.thumbnail',
                'user_items.thumbnail',
                'user_items.sku',
                'user_items.status',
                'user_item_contents.title',
                'user_item_contents.slug',
                'user_item_contents.description',
                'user_item_contents.category_id',
            ])
            ->first();

        if (!$row) abort(404);

        $product = $this->mapProduct($row);

        $relatedProducts = [];
        if (!empty($row->category_id)) {
            $rel = DB::table('user_items')
                ->join('user_item_contents', 'user_items.id', '=', 'user_item_contents.item_id')
                ->where('user_items.user_id', $user->id)
                ->where('user_items.status', 1)
                ->where('user_item_contents.category_id', $row->category_id)
                ->where('user_items.id', '!=', $row->item_id);

            if ($langId) $rel->where('user_item_contents.language_id', $langId);

            $relatedProducts = $rel
                ->select([
                    'user_items.id as item_id',
                    'user_items.current_price',
                    'user_items.previous_price',
                    'user_items.stock',
                'user_items.thumbnail',
                'user_items.thumbnail',
                'user_items.thumbnail',
                    'user_items.sku',
                    'user_items.status',
                    'user_item_contents.title',
                    'user_item_contents.slug',
                    'user_item_contents.description',
                    'user_item_contents.category_id',
                ])
                ->orderByDesc('user_items.id')
                ->limit(8)
                ->get()
                ->map(fn($r) => $this->mapProduct($r))
                ->values()
                ->all();
        }

        $categories = $this->categoriesForUser((int) $user->id);

        return Inertia::render('Theme/ProductDetailPage', [
            'theme' => $theme,
            'product' => $product,
            'relatedProducts' => $relatedProducts,
            'categories' => $categories,
            'storeName' => $user->username,
        ]);
    }

    public function cart(Request $request, string $username)
    {
        [$user, $ubs, $theme] = $this->resolve($request, $username);

        if ($ubs->theme !== 'premium') {
            return app(\App\Http\Controllers\UserFront\ItemController::class)->cart($username);
        }

        $categories = $this->categoriesForUser((int) $user->id);

        return Inertia::render('Theme/CartPage', [
            'theme' => $theme,
            'categories' => $categories,
            'storeName' => $user->username,
        ]);
    }

    public function checkout(Request $request, string $username)
    {
        [$user, $ubs, $theme] = $this->resolve($request, $username);

        if ($ubs->theme !== 'premium') {
            return app(\App\Http\Controllers\UserFront\ItemController::class)->checkout($username);
        }

        $categories = $this->categoriesForUser((int) $user->id);

        return Inertia::render('Theme/CheckoutPage', [
            'theme' => $theme,
            'categories' => $categories,
            'storeName' => $user->username,
        ]);
    }
}
