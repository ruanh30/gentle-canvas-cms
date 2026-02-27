<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function index()
    {
        $cart = session('cart', []);
        if (empty($cart)) return redirect()->route('store.cart');

        $items = [];
        $total = 0;
        foreach ($cart as $id => $qty) {
            $product = Product::find($id);
            if ($product) {
                $items[] = ['product' => $product, 'quantity' => $qty, 'subtotal' => $product->price * $qty];
                $total += $product->price * $qty;
            }
        }

        return view('store.checkout', compact('items', 'total'));
    }

    public function process(Request $request)
    {
        $data = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email',
            'customer_phone' => 'nullable|string',
            'payment_method' => 'required|string',
            'address_street' => 'required|string',
            'address_number' => 'required|string',
            'address_complement' => 'nullable|string',
            'address_neighborhood' => 'required|string',
            'address_city' => 'required|string',
            'address_state' => 'required|string',
            'address_zip' => 'required|string',
        ]);

        $cart = session('cart', []);
        if (empty($cart)) return redirect()->route('store.cart');

        $subtotal = 0;
        $orderItems = [];

        foreach ($cart as $id => $qty) {
            $product = Product::find($id);
            if ($product) {
                $lineTotal = $product->price * $qty;
                $subtotal += $lineTotal;
                $orderItems[] = [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'price' => $product->price,
                    'quantity' => $qty,
                ];
            }
        }

        $order = Order::create([
            'order_number' => Order::generateOrderNumber(),
            'user_id' => auth()->id(),
            'customer_name' => $data['customer_name'],
            'customer_email' => $data['customer_email'],
            'customer_phone' => $data['customer_phone'] ?? null,
            'status' => 'pending',
            'subtotal' => $subtotal,
            'total' => $subtotal,
            'payment_method' => $data['payment_method'],
            'shipping_address' => [
                'street' => $data['address_street'],
                'number' => $data['address_number'],
                'complement' => $data['address_complement'] ?? '',
                'neighborhood' => $data['address_neighborhood'],
                'city' => $data['address_city'],
                'state' => $data['address_state'],
                'zip_code' => $data['address_zip'],
            ],
        ]);

        foreach ($orderItems as $item) {
            $order->items()->create($item);
        }

        session()->forget('cart');
        return redirect()->route('store.order.success', $order);
    }

    public function success(Order $order)
    {
        return view('store.order-success', compact('order'));
    }
}
