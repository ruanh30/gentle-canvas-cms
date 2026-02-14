from pathlib import Path
p = Path('~/domains/flashloja.com.br/public_html/routes/user.php').expanduser()
s = p.read_text('utf-8')

marker = "// "
# We'll append near existing MENUS/MIDIA section (before Premium Theme Editor)
insert_before = "    // Premium Theme Editor (Inertia)"
if insert_before not in s:
    raise SystemExit('Insert point not found')

if "CmsPageController" in s:
    print('cms routes already present')
    raise SystemExit(0)

block = """

    // 
    // CMS Inertia Admin (Products, Categories, Menus, Media)
    Route::prefix('cms')->middleware('checkpermission:Shop Management')->group(function () {
        // Pages
        Route::get('/products', [App\\Http\\Controllers\\User\\CmsPageController::class, 'products'])->name('user.cms.products');
        Route::get('/categories', [App\\Http\\Controllers\\User\\CmsPageController::class, 'categories'])->name('user.cms.categories');
        Route::get('/menus', [App\\Http\\Controllers\\User\\CmsPageController::class, 'menus'])->name('user.cms.menus');
        Route::get('/media', [App\\Http\\Controllers\\User\\CmsPageController::class, 'media'])->name('user.cms.media');

        // API
        Route::get('/api/products', [App\\Http\\Controllers\\User\\CmsApiController::class, 'productsIndex'])->name('user.cms.api.products');
        Route::post('/api/products/store', [App\\Http\\Controllers\\User\\CmsApiController::class, 'productsStore'])->name('user.cms.api.products.store');
        Route::post('/api/products/update', [App\\Http\\Controllers\\User\\CmsApiController::class, 'productsUpdate'])->name('user.cms.api.products.update');
        Route::post('/api/products/delete', [App\\Http\\Controllers\\User\\CmsApiController::class, 'productsDelete'])->name('user.cms.api.products.delete');

        Route::get('/api/categories', [App\\Http\\Controllers\\User\\CmsApiController::class, 'categoriesIndex'])->name('user.cms.api.categories');
        Route::post('/api/categories/store', [App\\Http\\Controllers\\User\\CmsApiController::class, 'categoriesStore'])->name('user.cms.api.categories.store');
        Route::post('/api/categories/update', [App\\Http\\Controllers\\User\\CmsApiController::class, 'categoriesUpdate'])->name('user.cms.api.categories.update');
        Route::post('/api/categories/delete', [App\\Http\\Controllers\\User\\CmsApiController::class, 'categoriesDelete'])->name('user.cms.api.categories.delete');

        Route::get('/api/menus', [App\\Http\\Controllers\\User\\CmsApiController::class, 'menusGet'])->name('user.cms.api.menus');
        Route::post('/api/menus/save', [App\\Http\\Controllers\\User\\CmsApiController::class, 'menusSave'])->name('user.cms.api.menus.save');

        Route::get('/api/media', [App\\Http\\Controllers\\User\\CmsApiController::class, 'mediaIndex'])->name('user.cms.api.media');
        Route::post('/api/media/store', [App\\Http\\Controllers\\User\\CmsApiController::class, 'mediaStore'])->name('user.cms.api.media.store');
        Route::post('/api/media/delete', [App\\Http\\Controllers\\User\\CmsApiController::class, 'mediaDelete'])->name('user.cms.api.media.delete');
    });
"""

s = s.replace(insert_before, block + "\n" + insert_before)
p.write_text(s, 'utf-8')
print('cms routes added')
