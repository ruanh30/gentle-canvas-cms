<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CollectionController extends Controller
{
    public function index()
    {
        $collections = Collection::withCount('products')->orderBy('name')->paginate(20);
        return view('collections.index', compact('collections'));
    }

    public function create()
    {
        $products = Product::orderBy('name')->get();
        return view('collections.create', compact('products'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
            'products' => 'nullable|array',
            'products.*' => 'exists:products,id',
        ]);

        $data['slug'] = Str::slug($data['name']);
        $data['is_active'] = $request->boolean('is_active');

        $collection = Collection::create($data);
        if ($request->has('products')) {
            $collection->products()->sync($request->products);
        }

        return redirect()->route('admin.collections.index')->with('success', 'Coleção criada!');
    }

    public function edit(Collection $collection)
    {
        $products = Product::orderBy('name')->get();
        $collection->load('products');
        return view('collections.edit', compact('collection', 'products'));
    }

    public function update(Request $request, Collection $collection)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
            'products' => 'nullable|array',
            'products.*' => 'exists:products,id',
        ]);

        $data['slug'] = Str::slug($data['name']);
        $data['is_active'] = $request->boolean('is_active');

        $collection->update($data);
        $collection->products()->sync($request->products ?? []);

        return redirect()->route('admin.collections.index')->with('success', 'Coleção atualizada!');
    }

    public function destroy(Collection $collection)
    {
        $collection->products()->detach();
        $collection->delete();
        return redirect()->route('admin.collections.index')->with('success', 'Coleção excluída!');
    }
}
