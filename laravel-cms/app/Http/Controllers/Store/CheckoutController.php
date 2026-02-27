<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function index()
    {
        $cart = session('cart', []);
        if (empty($cart)) return redirect()->route('store.cart');

        $items = [];
        $subtotal = 0;
        foreach ($cart as $id => $qty) {
            $product = Product::find($id);
            if ($product) {
                $lineTotal = $product->price * $qty;
                $items[] = ['product' => $product, 'quantity' => $qty, 'subtotal' => $lineTotal];
                $subtotal += $lineTotal;
            }
        }

        // Shipping: free if >= 299
        $shipping = $subtotal >= 299 ? 0 : 15.90;

        // Coupon discount
        $discount = 0;
        $coupon = session('applied_coupon');
        if ($coupon) {
            $discount = $coupon['type'] === 'percentage'
                ? $subtotal * ($coupon['value'] / 100)
                : $coupon['value'];
        }

        $total = $subtotal + $shipping - $discount;

        return view('store.checkout', compact('items', 'subtotal', 'shipping', 'discount', 'total'));
    }

    public function applyCoupon(Request $request)
    {
        $code = $request->input('coupon_code');
        $coupon = Coupon::where('code', $code)->where('active', true)->first();

        if (!$coupon) {
            return redirect()->route('store.checkout')->with('error', 'Cupom inválido');
        }

        // Calculate subtotal for min order check
        $cart = session('cart', []);
        $subtotal = 0;
        foreach ($cart as $id => $qty) {
            $product = Product::find($id);
            if ($product) $subtotal += $product->price * $qty;
        }

        if ($coupon->min_order_value && $subtotal < $coupon->min_order_value) {
            return redirect()->route('store.checkout')->with('error', 'Pedido mínimo de R$ ' . number_format($coupon->min_order_value, 2, ',', '.'));
        }

        session(['applied_coupon' => [
            'code' => $coupon->code,
            'type' => $coupon->type,
            'value' => $coupon->value,
        ]]);

        return redirect()->route('store.checkout')->with('success', 'Cupom aplicado!');
    }

    public function removeCoupon()
    {
        session()->forget('applied_coupon');
        return redirect()->route('store.checkout');
    }

    public function process(Request $request)
    {
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email',
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

        $shipping = $subtotal >= 299 ? 0 : 15.90;
        $discount = 0;
        $coupon = session('applied_coupon');
        if ($coupon) {
            $discount = $coupon['type'] === 'percentage'
                ? $subtotal * ($coupon['value'] / 100)
                : $coupon['value'];
        }
        $total = $subtotal + $shipping - $discount;

        $order = Order::create([
            'order_number' => Order::generateOrderNumber(),
            'user_id' => auth()->id(),
            'customer_name' => $request->input('customer_name'),
            'customer_email' => $request->input('customer_email'),
            'customer_phone' => $request->input('customer_phone'),
            'status' => 'pending',
            'subtotal' => $subtotal,
            'shipping' => $shipping,
            'discount' => $discount,
            'total' => $total,
            'payment_method' => 'credit_card',
            'shipping_address' => [
                'street' => $request->input('address_street', ''),
                'number' => $request->input('address_number', ''),
                'complement' => $request->input('address_complement', ''),
                'neighborhood' => $request->input('address_neighborhood', ''),
                'city' => $request->input('address_city', ''),
                'state' => $request->input('address_state', ''),
                'zip_code' => $request->input('address_zip', ''),
            ],
            'coupon_code' => $coupon['code'] ?? null,
        ]);

        foreach ($orderItems as $item) {
            $order->items()->create($item);
        }

        session()->forget('cart');
        session()->forget('applied_coupon');
        return redirect()->route('store.order.success', $order);
    }

    public function success(Order $order)
    {
        return view('store.order-success', compact('order'));
    }
}
