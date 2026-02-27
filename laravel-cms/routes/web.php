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

// ─── Auth (same slugs as React: /login, /register) ───
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
Route::get('/register', [LoginController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [LoginController::class, 'register']);

// ─── Storefront — EXACT same slugs as React App.tsx ───
Route::get('/', [HomeController::class, 'index'])->name('store.home');
Route::get('/products', [StoreProductController::class, 'index'])->name('store.products');
Route::get('/product/{slug}', [StoreProductController::class, 'show'])->name('store.product');
Route::get('/cart', [CartController::class, 'index'])->name('store.cart');
Route::post('/cart/add', [CartController::class, 'add'])->name('store.cart.add');
Route::post('/cart/update', [CartController::class, 'update'])->name('store.cart.update');
Route::post('/cart/remove', [CartController::class, 'remove'])->name('store.cart.remove');
Route::get('/checkout', [CheckoutController::class, 'index'])->name('store.checkout');
Route::post('/checkout', [CheckoutController::class, 'process'])->name('store.checkout.process');
Route::get('/order-success/{order}', [CheckoutController::class, 'success'])->name('store.order.success');

Route::middleware('auth')->group(function () {
    Route::get('/account', [AccountController::class, 'index'])->name('store.account');
    Route::get('/orders', [AccountController::class, 'orders'])->name('store.orders');
    Route::get('/addresses', [AccountController::class, 'addresses'])->name('store.addresses');
    Route::post('/addresses', [AccountController::class, 'storeAddress'])->name('store.addresses.store');
    Route::delete('/addresses/{address}', [AccountController::class, 'destroyAddress'])->name('store.addresses.destroy');
    Route::get('/personal-data', [AccountController::class, 'personalData'])->name('store.personal-data');
    Route::post('/personal-data', [AccountController::class, 'updatePersonalData'])->name('store.personal-data.update');
    Route::get('/wishlist', [WishlistController::class, 'index'])->name('store.wishlist');
    Route::post('/wishlist/toggle', [WishlistController::class, 'toggle'])->name('store.wishlist.toggle');
});

// ─── Admin Panel ───
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('products', ProductController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('orders', OrderController::class)->only(['index', 'show', 'update', 'destroy']);
    Route::resource('customers', CustomerController::class)->only(['index', 'show', 'destroy']);
    Route::resource('coupons', CouponController::class);
    Route::resource('blog', BlogController::class);
    Route::resource('faq', FaqController::class);
    Route::resource('testimonials', TestimonialController::class);
    Route::resource('brands', BrandController::class);
    Route::resource('pages', PageController::class);
    Route::get('media', [MediaController::class, 'index'])->name('media.index');
    Route::post('media', [MediaController::class, 'store'])->name('media.store');
    Route::delete('media/{media}', [MediaController::class, 'destroy'])->name('media.destroy');
    Route::resource('menus', MenuController::class);
    Route::resource('collections', CollectionController::class);
    Route::get('settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::post('settings', [SettingsController::class, 'update'])->name('settings.update');
    Route::get('customization', [CustomizationController::class, 'index'])->name('customization.index');
    Route::post('customization', [CustomizationController::class, 'update'])->name('customization.update');
});
