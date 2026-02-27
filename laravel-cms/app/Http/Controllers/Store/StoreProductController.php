<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class StoreProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::where('is_published', true)->with('category');

        if ($request->filled('category')) {
            $cat = Category::where('slug', $request->category)->first();
            if ($cat) $query->where('category_id', $cat->id);
        }
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }
        if ($request->filled('sort')) {
            match ($request->sort) {
                'price_asc' => $query->orderBy('price'),
                'price_desc' => $query->orderByDesc('price'),
                'newest' => $query->latest(),
                default => $query->latest(),
            };
        } else {
            $query->latest();
        }

        $products = $query->paginate(12);
        $categories = Category::where('is_active', true)->orderBy('name')->get();

        return view('store.products', compact('products', 'categories'));
    }

    public function show(string $slug)
    {
        $product = Product::where('slug', $slug)->where('is_published', true)->firstOrFail();
        $related = Product::where('is_published', true)
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->take(4)->get();

        return view('store.product-detail', compact('product', 'related'));
    }
}
