<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CmsApiController extends Controller
{
    private function langId(): int
    {
        try {
            $lang = app('userCurrentLang');
            return (int) ($lang?->id ?? 0);
        } catch (\Throwable $e) {
            return 0;
        }
    }

    // ------------------- Categories -------------------
    public function categoriesIndex(Request $request)
    {
        $userId = (int) Auth::id();
        $langId = $this->langId();

        $q = DB::table('user_item_categories')->where('user_id', $userId);
        if ($langId) $q->where('language_id', $langId);

        $cats = $q->orderBy('serial_number')->orderBy('id')->get();

        return response()->json($cats);
    }

    public function categoriesStore(Request $request)
    {
        $userId = (int) Auth::id();
        $langId = $this->langId();

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable'],
        ]);

        $slug = $data['slug'] ?: Str::slug($data['name']);
        $id = DB::table('user_item_categories')->insertGetId([
            'unique_id' => uniqid('', true),
            'serial_number' => (int) (DB::table('user_item_categories')->where('user_id', $userId)->max('serial_number') ?? 0) + 1,
            'user_id' => $userId,
            'language_id' => $langId ?: 0,
            'name' => $data['name'],
            'slug' => $slug,
            'image' => $data['image'] ?? null,
            'status' => isset($data['status']) ? (int) !!$data['status'] : 1,
            'is_feature' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $cat = DB::table('user_item_categories')->where('id', $id)->first();
        return response()->json($cat);
    }

    public function categoriesUpdate(Request $request)
    {
        $userId = (int) Auth::id();
        $data = $request->validate([
            'id' => ['required', 'integer'],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable'],
        ]);

        $row = DB::table('user_item_categories')->where('id', $data['id'])->where('user_id', $userId)->first();
        if (!$row) abort(404);

        DB::table('user_item_categories')->where('id', $data['id'])->update([
            'name' => $data['name'],
            'slug' => $data['slug'] ?: Str::slug($data['name']),
            'image' => $data['image'] ?? null,
            'status' => isset($data['status']) ? (int) !!$data['status'] : (int) $row->status,
            'updated_at' => now(),
        ]);

        $cat = DB::table('user_item_categories')->where('id', $data['id'])->first();
        return response()->json($cat);
    }

    public function categoriesDelete(Request $request)
    {
        $userId = (int) Auth::id();
        $data = $request->validate(['id' => ['required', 'integer']]);

        DB::table('user_item_categories')->where('id', $data['id'])->where('user_id', $userId)->delete();
        return response()->json(['ok' => true]);
    }

    // ------------------- Products -------------------
    public function productsIndex(Request $request)
    {
        $userId = (int) Auth::id();
        $langId = $this->langId();

        $q = DB::table('user_items')
            ->join('user_item_contents', 'user_items.id', '=', 'user_item_contents.item_id')
            ->where('user_items.user_id', $userId);
        if ($langId) $q->where('user_item_contents.language_id', $langId);

        $items = $q->select([
                'user_items.id as id',
                'user_items.stock',
                'user_items.sku',
                'user_items.current_price as price',
                'user_items.previous_price as compareAtPrice',
                'user_items.status as active',
                'user_items.is_feature as featured',
                'user_items.thumbnail',
                'user_item_contents.title as name',
                'user_item_contents.slug',
                'user_item_contents.description',
                'user_item_contents.category_id as categoryId',
            ])
            ->orderByDesc('user_items.id')
            ->limit(200)
            ->get();

        // images
        $ids = $items->pluck('id')->all();
        $imgs = DB::table('user_item_images')->whereIn('item_id', $ids)->orderBy('id')->get(['item_id','image']);
        $byItem = [];
        foreach ($imgs as $img) {
            $byItem[$img->item_id][] = asset('assets/front/img/user/' . ltrim($img->image, '/'));
        }

        $out = $items->map(function ($p) use ($byItem) {
            $images = $byItem[$p->id] ?? [];
            if (!$images && !empty($p->thumbnail)) {
                $images = [asset('assets/front/img/user/' . ltrim($p->thumbnail, '/'))];
            }
            return [
                'id' => (string) $p->id,
                'name' => $p->name ?? '',
                'slug' => $p->slug ?? '',
                'description' => $p->description ?? '',
                'price' => (float) ($p->price ?? 0),
                'compareAtPrice' => $p->compareAtPrice !== null ? (float) $p->compareAtPrice : null,
                'stock' => (int) ($p->stock ?? 0),
                'sku' => $p->sku ?? '',
                'categoryId' => (string) ($p->categoryId ?? ''),
                'active' => ((int) ($p->active ?? 0)) === 1,
                'featured' => ((int) ($p->featured ?? 0)) === 1,
                'images' => $images,
                'rating' => 0,
                'reviewCount' => 0,
                'tags' => [],
                'variants' => [],
                'createdAt' => null,
            ];
        });

        return response()->json($out->values());
    }

    public function productsStore(Request $request)
    {
        $userId = (int) Auth::id();
        $langId = $this->langId();

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'sku' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric'],
            'compareAtPrice' => ['nullable', 'numeric'],
            'stock' => ['nullable', 'integer'],
            'categoryId' => ['nullable', 'integer'],
            'active' => ['nullable'],
            'featured' => ['nullable'],
        ]);

        $itemId = DB::table('user_items')->insertGetId([
            'user_id' => $userId,
            'stock' => (int) ($data['stock'] ?? 0),
            'sku' => $data['sku'],
            'thumbnail' => null,
            'current_price' => (float) $data['price'],
            'previous_price' => $data['compareAtPrice'] !== null ? (float) $data['compareAtPrice'] : null,
            'is_feature' => !empty($data['featured']) ? 1 : 0,
            'rating' => 0,
            'status' => !empty($data['active']) ? 1 : 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('user_item_contents')->insert([
            'user_id' => $userId,
            'item_id' => $itemId,
            'language_id' => $langId ?: 0,
            'category_id' => !empty($data['categoryId']) ? (int) $data['categoryId'] : null,
            'title' => $data['name'],
            'slug' => Str::slug($data['name']),
            'description' => $data['description'] ?? '',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return $this->productsShow($itemId);
    }

    public function productsUpdate(Request $request)
    {
        $userId = (int) Auth::id();
        $langId = $this->langId();

        $data = $request->validate([
            'id' => ['required', 'integer'],
            'name' => ['required', 'string', 'max:255'],
            'sku' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric'],
            'compareAtPrice' => ['nullable', 'numeric'],
            'stock' => ['nullable', 'integer'],
            'categoryId' => ['nullable', 'integer'],
            'active' => ['nullable'],
            'featured' => ['nullable'],
        ]);

        $item = DB::table('user_items')->where('id', $data['id'])->where('user_id', $userId)->first();
        if (!$item) abort(404);

        DB::table('user_items')->where('id', $data['id'])->update([
            'stock' => (int) ($data['stock'] ?? 0),
            'sku' => $data['sku'],
            'current_price' => (float) $data['price'],
            'previous_price' => $data['compareAtPrice'] !== null ? (float) $data['compareAtPrice'] : null,
            'is_feature' => !empty($data['featured']) ? 1 : 0,
            'status' => !empty($data['active']) ? 1 : 0,
            'updated_at' => now(),
        ]);

        // Update content (single language row)
        $content = DB::table('user_item_contents')->where('item_id', $data['id']);
        if ($langId) $content->where('language_id', $langId);
        $c = $content->first();
        if ($c) {
            $content->update([
                'title' => $data['name'],
                'slug' => Str::slug($data['name']),
                'description' => $data['description'] ?? '',
                'category_id' => !empty($data['categoryId']) ? (int) $data['categoryId'] : null,
                'updated_at' => now(),
            ]);
        }

        return $this->productsShow((int) $data['id']);
    }

    public function productsDelete(Request $request)
    {
        $userId = (int) Auth::id();
        $data = $request->validate(['id' => ['required', 'integer']]);

        // Verify ownership BEFORE deleting related rows
        $item = DB::table('user_items')->where('id', $data['id'])->where('user_id', $userId)->first();
        if (!$item) abort(404);

        DB::table('user_item_images')->where('item_id', $data['id'])->delete();
        DB::table('user_item_contents')->where('item_id', $data['id'])->delete();
        DB::table('user_items')->where('id', $data['id'])->delete();

        return response()->json(['ok' => true]);
    }

    private function productsShow(int $id)
    {
        $userId = (int) Auth::id();
        $langId = $this->langId();

        $q = DB::table('user_items')
            ->join('user_item_contents', 'user_items.id', '=', 'user_item_contents.item_id')
            ->where('user_items.user_id', $userId)
            ->where('user_items.id', $id);
        if ($langId) $q->where('user_item_contents.language_id', $langId);

        $p = $q->select([
            'user_items.id as id',
            'user_items.stock',
            'user_items.sku',
            'user_items.current_price as price',
            'user_items.previous_price as compareAtPrice',
            'user_items.status as active',
            'user_items.is_feature as featured',
            'user_items.thumbnail',
            'user_item_contents.title as name',
            'user_item_contents.slug',
            'user_item_contents.description',
            'user_item_contents.category_id as categoryId',
        ])->first();

        if (!$p) abort(404);

        $images = DB::table('user_item_images')
            ->where('item_id', $id)
            ->orderBy('id')
            ->pluck('image')
            ->map(fn($img) => asset('assets/front/img/user/' . ltrim($img, '/')))
            ->values()
            ->all();

        if (!$images && !empty($p->thumbnail)) {
            $images = [asset('assets/front/img/user/' . ltrim($p->thumbnail, '/'))];
        }

        return response()->json([
            'id' => (string) $p->id,
            'name' => $p->name ?? '',
            'slug' => $p->slug ?? '',
            'description' => $p->description ?? '',
            'price' => (float) ($p->price ?? 0),
            'compareAtPrice' => $p->compareAtPrice !== null ? (float) $p->compareAtPrice : null,
            'stock' => (int) ($p->stock ?? 0),
            'sku' => $p->sku ?? '',
            'categoryId' => (string) ($p->categoryId ?? ''),
            'active' => ((int) ($p->active ?? 0)) === 1,
            'featured' => ((int) ($p->featured ?? 0)) === 1,
            'images' => $images,
            'rating' => 0,
            'reviewCount' => 0,
            'tags' => [],
            'variants' => [],
            'createdAt' => null,
        ]);
    }

    // ------------------- Menus -------------------
    public function menusGet(Request $request)
    {
        $userId = (int) Auth::id();
        $langId = $this->langId();

        $row = DB::table('user_menus')->where('user_id', $userId);
        if ($langId) $row->where('language_id', $langId);
        $row = $row->first();

        $menus = ['header' => [], 'footer' => []];
        if ($row && !empty($row->menus)) {
            $decoded = json_decode($row->menus, true);
            if (is_array($decoded)) $menus = array_merge($menus, $decoded);
        }

        return response()->json($menus);
    }

    public function menusSave(Request $request)
    {
        $userId = (int) Auth::id();
        $langId = $this->langId();

        $data = $request->validate([
            'header' => ['nullable', 'array'],
            'footer' => ['nullable', 'array'],
        ]);

        $payload = json_encode([
            'header' => $data['header'] ?? [],
            'footer' => $data['footer'] ?? [],
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        $q = DB::table('user_menus')->where('user_id', $userId);
        if ($langId) $q->where('language_id', $langId);
        $existing = $q->first();

        if ($existing) {
            $q->update(['menus' => $payload, 'updated_at' => now()]);
        } else {
            DB::table('user_menus')->insert([
                'user_id' => $userId,
                'language_id' => $langId ?: 0,
                'menus' => $payload,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        return response()->json(['ok' => true]);
    }

    // ------------------- Media -------------------
    public function mediaIndex(Request $request)
    {
        $userId = (int) Auth::id();
        $items = DB::table('user_media')
            ->where('user_id', $userId)
            ->orderByDesc('id')
            ->limit(200)
            ->get(['id','name','url','created_at']);

        $out = $items->map(fn($m) => [
            'id' => (string) $m->id,
            'name' => $m->name ?? '',
            'url' => $m->url ? asset(ltrim($m->url, '/')) : '',
            'addedAt' => $m->created_at ? date('Y-m-d', strtotime($m->created_at)) : '',
        ]);

        return response()->json($out->values());
    }

    public function mediaStore(Request $request)
    {
        $userId = (int) Auth::id();
        $request->validate([
            'file' => ['required', 'file', 'max:5120', 'mimes:jpg,jpeg,png,gif,webp,svg,mp4,webm,pdf'],
            'name' => ['nullable', 'string', 'max:255'],
        ]);

        $file = $request->file('file');
        $ext = $file->getClientOriginalExtension() ?: 'jpg';
        $filename = sha1_file($file->getRealPath()) . '-' . time() . '.' . $ext;
        $dir = public_path('assets/front/img/user/media');
        if (!is_dir($dir)) @mkdir($dir, 0775, true);
        $file->move($dir, $filename);

        $relative = 'assets/front/img/user/media/' . $filename;
        $name = $request->input('name') ?: ($file->getClientOriginalName() ?: $filename);

        $id = DB::table('user_media')->insertGetId([
            'user_id' => $userId,
            'name' => $name,
            'url' => $relative,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'id' => (string) $id,
            'name' => $name,
            'url' => asset($relative),
            'addedAt' => now()->format('Y-m-d'),
        ]);
    }

    public function mediaDelete(Request $request)
    {
        $userId = (int) Auth::id();
        $data = $request->validate(['id' => ['required', 'integer']]);

        $row = DB::table('user_media')->where('id', $data['id'])->where('user_id', $userId)->first();
        if ($row) {
            DB::table('user_media')->where('id', $data['id'])->delete();
        }

        return response()->json(['ok' => true]);
    }
}
