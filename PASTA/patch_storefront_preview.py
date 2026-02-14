from pathlib import Path
import re

path = Path('~/domains/flashloja.com.br/public_html/app/Http/Controllers/UserFront/ThemeStorefrontController.php').expanduser()
s = path.read_text(encoding='utf-8')

if 'theme-preview' in s:
    print('preview logic already present; aborting')
    raise SystemExit(0)

# 1) add Auth import
s = s.replace(
    'use Illuminate\\Support\\Facades\\DB;\nuse Inertia\\Inertia;',
    'use Illuminate\\Support\\Facades\\DB;\nuse Illuminate\\Support\\Facades\\Auth;\nuse Inertia\\Inertia;'
)

# 2) change resolve signature
s = s.replace(
    '    private function resolve(string $username): array',
    '    private function resolve(Request $request, string $username): array'
)

# 3) inject preview theme logic
old = """        $state = UserThemeState::where('user_id', $user->id)->where('theme', 'premium')->first();
        $theme = [];
        if ($state && !empty($state->published)) {
            $theme = is_string($state->published)
                ? (json_decode($state->published, true) ?: [])
                : (array) $state->published;
        }"""

new = """        $state = UserThemeState::where('user_id', $user->id)->where('theme', 'premium')->first();

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
        }"""

if old not in s:
    raise SystemExit('Expected theme block not found; abort')

s = s.replace(old, new)

# 4) add categories helper (needed because pages pass categories to StoreLayout)
if 'private function categoriesForUser' not in s:
    marker = '    private function mapProduct'
    i = s.find(marker)
    if i == -1:
        raise SystemExit('mapProduct marker not found')

    helper = """    private function categoriesForUser(int $userId)
    {
        return DB::table('user_item_categories')
            ->where('user_id', $userId)
            ->where('status', 1)
            ->orderBy('name')
            ->get(['id', 'name', 'slug'])
            ->map(fn($c) => ['id' => (string) $c->id, 'name' => $c->name ?? '', 'slug' => $c->slug ?? ''])
            ->values();
    }

"""
    s = s[:i] + helper + s[i:]

# 5) update resolve call sites
s = s.replace(
    '[$user, $ubs, $theme] = $this->resolve($username);',
    '[$user, $ubs, $theme] = $this->resolve($request, $username);'
)

# 6) replace duplicated categories blocks
s = re.sub(
    r"\$categories = DB::table\('user_item_categories'\)[\s\S]*?->values\(\);\n\n        return Inertia::render\('Theme/HomePage'",
    "$categories = $this->categoriesForUser((int) $user->id);\n\n        return Inertia::render('Theme/HomePage'",
    s,
    count=1
)

s = re.sub(
    r"\$categories = DB::table\('user_item_categories'\)[\s\S]*?->values\(\);\n\n        return Inertia::render\('Theme/ProductsPage'",
    "$categories = $this->categoriesForUser((int) $user->id);\n\n        return Inertia::render('Theme/ProductsPage'",
    s,
    count=1
)

# 7) ensure categories is passed in all Theme pages
if "return Inertia::render('Theme/ProductDetailPage'" in s and "'categories'" not in s.split("return Inertia::render('Theme/ProductDetailPage'", 1)[1].split(']);', 1)[0]:
    s = s.replace(
        "return Inertia::render('Theme/ProductDetailPage', [\n            'theme' => $theme,\n            'product' => $product,\n            'relatedProducts' => $relatedProducts,\n            'storeName' => $user->username,\n        ]);",
        "$categories = $this->categoriesForUser((int) $user->id);\n\n        return Inertia::render('Theme/ProductDetailPage', [\n            'theme' => $theme,\n            'product' => $product,\n            'relatedProducts' => $relatedProducts,\n            'categories' => $categories,\n            'storeName' => $user->username,\n        ]);"
    )

if "return Inertia::render('Theme/CartPage'" in s and "'categories'" not in s.split("return Inertia::render('Theme/CartPage'", 1)[1].split(']);', 1)[0]:
    s = s.replace(
        "return Inertia::render('Theme/CartPage', [\n            'theme' => $theme,\n            'storeName' => $user->username,\n        ]);",
        "$categories = $this->categoriesForUser((int) $user->id);\n\n        return Inertia::render('Theme/CartPage', [\n            'theme' => $theme,\n            'categories' => $categories,\n            'storeName' => $user->username,\n        ]);"
    )

if "return Inertia::render('Theme/CheckoutPage'" in s and "'categories'" not in s.split("return Inertia::render('Theme/CheckoutPage'", 1)[1].split(']);', 1)[0]:
    s = s.replace(
        "return Inertia::render('Theme/CheckoutPage', [\n            'theme' => $theme,\n            'storeName' => $user->username,\n        ]);",
        "$categories = $this->categoriesForUser((int) $user->id);\n\n        return Inertia::render('Theme/CheckoutPage', [\n            'theme' => $theme,\n            'categories' => $categories,\n            'storeName' => $user->username,\n        ]);"
    )

path.write_text(s, encoding='utf-8')
print('patched ThemeStorefrontController.php OK')
