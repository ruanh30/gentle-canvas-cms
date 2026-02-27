<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\CustomizationController;
use App\Http\Controllers\Store\HomeController;
use App\Http\Controllers\Store\StoreProductController;
use App\Http\Controllers\Store\CartController;
use App\Http\Controllers\Store\CheckoutController;
use App\Http\Controllers\Store\AccountController;
use App\Http\Controllers\Store\WishlistController;

// ─── Auth ───
Route::get('/', function () {
    return auth()->check() ? redirect('/dashboard') : redirect('/login');
});

Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
Route::get('/register', [LoginController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [LoginController::class, 'register']);

// ─── Dashboard ───
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

// ─── Admin ───
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    // Products
    Route::resource('products', ProductController::class);
    // Categories
    Route::resource('categories', CategoryController::class);
    // Orders
    Route::resource('orders', OrderController::class)->only(['index', 'show', 'update', 'destroy']);
    // Customers
    Route::resource('customers', CustomerController::class)->only(['index', 'show', 'destroy']);
    // Coupons
    Route::resource('coupons', CouponController::class);
    // Blog Posts
    Route::resource('blog', BlogController::class);
    // FAQ
    Route::resource('faq', FaqController::class);
    // Testimonials
    Route::resource('testimonials', TestimonialController::class);
    // Brands
    Route::resource('brands', BrandController::class);
    // Static Pages
    Route::resource('pages', PageController::class);
    // Media
    Route::get('media', [MediaController::class, 'index'])->name('media.index');
    Route::post('media', [MediaController::class, 'store'])->name('media.store');
    Route::delete('media/{media}', [MediaController::class, 'destroy'])->name('media.destroy');
    // Menus
    Route::resource('menus', MenuController::class);
    // Collections
    Route::resource('collections', CollectionController::class);
    // Settings
    Route::get('settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::post('settings', [SettingsController::class, 'update'])->name('settings.update');
    // Customization (Theme)
    Route::get('customization', [CustomizationController::class, 'index'])->name('customization.index');
    Route::post('customization', [CustomizationController::class, 'update'])->name('customization.update');
});

// ─── Storefront ───
Route::get('/store', [HomeController::class, 'index'])->name('store.home');
Route::get('/store/products', [StoreProductController::class, 'index'])->name('store.products');
Route::get('/store/product/{slug}', [StoreProductController::class, 'show'])->name('store.product');
Route::get('/store/cart', [CartController::class, 'index'])->name('store.cart');
Route::post('/store/cart/add', [CartController::class, 'add'])->name('store.cart.add');
Route::post('/store/cart/update', [CartController::class, 'update'])->name('store.cart.update');
Route::post('/store/cart/remove', [CartController::class, 'remove'])->name('store.cart.remove');
Route::get('/store/checkout', [CheckoutController::class, 'index'])->name('store.checkout');
Route::post('/store/checkout', [CheckoutController::class, 'process'])->name('store.checkout.process');
Route::get('/store/order-success/{order}', [CheckoutController::class, 'success'])->name('store.order.success');

Route::middleware('auth')->prefix('store')->name('store.')->group(function () {
    Route::get('/account', [AccountController::class, 'index'])->name('account');
    Route::get('/orders', [AccountController::class, 'orders'])->name('orders');
    Route::get('/addresses', [AccountController::class, 'addresses'])->name('addresses');
    Route::post('/addresses', [AccountController::class, 'storeAddress'])->name('addresses.store');
    Route::delete('/addresses/{address}', [AccountController::class, 'destroyAddress'])->name('addresses.destroy');
    Route::get('/personal-data', [AccountController::class, 'personalData'])->name('personal-data');
    Route::post('/personal-data', [AccountController::class, 'updatePersonalData'])->name('personal-data.update');
    Route::get('/wishlist', [WishlistController::class, 'index'])->name('wishlist');
    Route::post('/wishlist/toggle', [WishlistController::class, 'toggle'])->name('wishlist.toggle');
});
