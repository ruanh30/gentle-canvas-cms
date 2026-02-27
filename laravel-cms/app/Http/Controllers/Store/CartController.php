<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        $cart = session('cart', []);
        $items = [];
        $total = 0;

        foreach ($cart as $id => $qty) {
            $product = Product::find($id);
            if ($product) {
                $items[] = ['product' => $product, 'quantity' => $qty, 'subtotal' => $product->price * $qty];
                $total += $product->price * $qty;
            }
        }

        return view('store.cart', compact('items', 'total'));
    }

    public function add(Request $request)
    {
        $request->validate(['product_id' => 'required|exists:products,id', 'quantity' => 'nullable|integer|min:1']);
        $cart = session('cart', []);
        $id = $request->product_id;
        $qty = $request->quantity ?? 1;
        $cart[$id] = ($cart[$id] ?? 0) + $qty;
        session(['cart' => $cart]);
        return redirect()->route('store.cart')->with('success', 'Produto adicionado ao carrinho!');
    }

    public function update(Request $request)
    {
        $request->validate(['product_id' => 'required', 'quantity' => 'required|integer|min:0']);
        $cart = session('cart', []);
        if ($request->quantity <= 0) {
            unset($cart[$request->product_id]);
        } else {
            $cart[$request->product_id] = $request->quantity;
        }
        session(['cart' => $cart]);
        return redirect()->route('store.cart');
    }

    public function remove(Request $request)
    {
        $cart = session('cart', []);
        unset($cart[$request->product_id]);
        session(['cart' => $cart]);
        return redirect()->route('store.cart')->with('success', 'Produto removido!');
    }
}
