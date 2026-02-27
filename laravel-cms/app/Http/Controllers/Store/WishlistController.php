<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index()
    {
        $items = auth()->user()->wishlistProducts()->get();
        return view('store.wishlist', compact('items'));
    }

    public function toggle(Request $request)
    {
        $request->validate(['product_id' => 'required|exists:products,id']);

        $existing = Wishlist::where('user_id', auth()->id())->where('product_id', $request->product_id)->first();

        if ($existing) {
            $existing->delete();
            return redirect()->back()->with('success', 'Removido dos favoritos!');
        }

        Wishlist::create(['user_id' => auth()->id(), 'product_id' => $request->product_id]);
        return redirect()->back()->with('success', 'Adicionado aos favoritos!');
    }
}
