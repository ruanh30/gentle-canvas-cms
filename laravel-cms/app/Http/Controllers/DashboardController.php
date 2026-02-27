<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Models\Post;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_products' => Product::count(),
            'total_orders' => Order::count(),
            'total_customers' => User::where('is_admin', false)->count(),
            'total_revenue' => Order::where('payment_status', 'paid')->sum('total'),
            'pending_orders' => Order::where('status', 'pending')->count(),
            'total_posts' => Post::count(),
        ];

        $recent_orders = Order::latest()->take(5)->get();
        $recent_products = Product::latest()->take(5)->get();

        return view('dashboard.index', compact('stats', 'recent_orders', 'recent_products'));
    }
}
