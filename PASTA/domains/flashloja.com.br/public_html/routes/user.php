<?php
/*=======================================================
******************** User Dashboard Routes **********************
=======================================================*/

Route::group(['prefix' => 'user', 'middleware' => ['auth', 'userstatus', 'Demo', 'userLanguage']], function () {
    // user theme change
    Route::get('/change-theme', 'User\UserController@changeTheme')->name('user.theme.change');
    // RTL check
    Route::get('/rtlcheck/{langid}', 'User\LanguageController@rtlcheck')->name('user.rtlcheck');
    Route::get('/rtlcheck2/{langid}', 'User\LanguageController@rtlcheck2')->name('user.rtlcheck2');

    Route::get('/dashboard', 'User\UserController@index')->name('user-dashboard');
    Route::get('/profile', 'User\UserController@profile')->name('user-profile');
    Route::post('/profile', 'User\UserController@profileupdate')->name('user-profile-update');
    Route::get('/logout', 'User\Auth\LoginController@logout')->name('user-logout');
    Route::post('/change-status', 'User\UserController@status')->name('user-status');

    // Registered Customers
    Route::get('register/users', 'User\RegisterCustomerController@index')->name('user.register.user');
    Route::post('register/user/store', 'User\RegisterCustomerController@store')->name('user.register.user.store');
    Route::post('register/users/ban', 'User\RegisterCustomerController@userban')->name('user.register.user.ban')->middleware('limitCheck:items,update,without_ajax');
    Route::post('register/users/featured', 'User\RegisterCustomerController@userFeatured')->name('user.register.user.featured');
    Route::post('register/users/template', 'User\RegisterCustomerController@userTemplate')->name('user.register.user.template');
    Route::post('register/users/template/update', 'User\RegisterCustomerController@userUpdateTemplate')->name('user.register.user.updateTemplate');
    Route::post('register/users/email', 'User\RegisterCustomerController@emailStatus')->name('user.register.user.email')->middleware('limitCheck:items,update,without_ajax');
    Route::get('register/user/details/{id}', 'User\RegisterCustomerController@view')->name('user.register.user.view');
    Route::post('register/user/delete', 'User\RegisterCustomerController@delete')->name('user.register.user.delete');
    Route::post('register/user/bulk-delete', 'User\RegisterCustomerController@bulkDelete')->name('user.register.user.bulk.delete');
    Route::get('register/user/{id}/changePassword', 'User\RegisterCustomerController@changePass')->name('user.register.user.changePass');
    Route::post('register/user/updatePassword', 'User\RegisterCustomerController@updatePassword')->name('user.register.user.updatePassword')->middleware('limitCheck:items,update,without_ajax');
    Route::get('register/user/secret-login/{id}', 'User\RegisterCustomerController@secret_login')->name('user.register.user.secret_login');

    // user QR Builder
    Route::group(['middleware' => 'checkUserPermission:QR Builder'], function () {
        Route::get('/saved/qrs', 'User\QrController@index')->name('user.qrcode.index');
        Route::post('/saved/qr/delete', 'User\QrController@delete')->name('user.qrcode.delete')->withoutMiddleware('Demo');
        Route::post('/saved/qr/bulk-delete', 'User\QrController@bulkDelete')->name('user.qrcode.bulk.delete')->withoutMiddleware('Demo');
        Route::get('/qr-code', 'User\QrController@qrCode')->name('user.qrcode');
        Route::post('/qr-code/generate', 'User\QrController@generate')->name('user.qrcode.generate')->withoutMiddleware('Demo');
        Route::get('/qr-code/clear', 'User\QrController@clear')->name('user.qrcode.clear');
        Route::post('/qr-code/save', 'User\QrController@save')->name('user.qrcode.save')->withoutMiddleware('Demo');
    });

    Route::get('/change-password', 'User\UserController@changePass')->name('user.changePass');
    Route::post('/profile/updatePassword', 'User\UserController@updatePassword')->name('user.updatePassword')->middleware('limitCheck:items,update,without_ajax');

    // Customer management
    Route::post('user/customer/ban', 'User\UserController@userban')->name('user.customer.ban');
    Route::get('register/customer/details/{id}', 'User\UserController@view')->name('register.customer.view');
    Route::post('register/customer/email', 'User\UserController@emailStatus')->name('register.customer.email');
    Route::get('/register-user', 'User\UserController@registerUsers')->name('user.register-user');
    Route::get('register/customer/{id}/changePassword', 'User\UserController@changePassCstmr')->name('register.customer.changePass');
    Route::post('register/customer/updatePassword', 'User\UserController@updatePasswordCstmr')->name('register.customer.updatePassword');
    Route::post('register/customer/delete', 'User\UserController@delete')->name('register.customer.delete');
    Route::post('/digital/download', 'User\OrderController@digitalDownload')->name('user-digital-download');

    // ═══════════════════ SITE SETTINGS ═══════════════════
    Route::prefix('site-settings')->middleware('checkpermission:Site Settings')->group(function () {

        // Appearance - redirect old URL to premium
        Route::get('/appearance', function() { return redirect()->route('user.appearance.premium'); })->name('user.appearance');
        Route::post('/appearance', function() { return redirect()->route('user.appearance.premium'); })->name('user.appearance.update');
        
        // DEBUG ROUTE
        Route::get('/debug-test', function() { return 'DEBUG NESTED OK'; });

        // Appearance Premium theme editor
        Route::get('/appearance-premium', 'User\PremiumAppearanceController@index')->name('user.appearance.premium');
        Route::post('/appearance-premium', 'User\PremiumAppearanceController@update')->name('user.appearance.premium.update');
        Route::post('/appearance-premium/preview', 'User\PremiumAppearanceController@preview')->name('user.appearance.premium.preview');
        Route::post('/appearance-premium/preset', 'User\PremiumAppearanceController@applyPreset')->name('user.appearance.premium.preset');
        Route::get('/appearance-premium/versions', 'User\PremiumAppearanceController@versions')->name('user.appearance.premium.versions');
        Route::post('/appearance-premium/rollback', 'User\PremiumAppearanceController@rollback')->name('user.appearance.premium.rollback');

        // Plugins
        Route::get('/plugins', 'User\PluginController@plugins')->name('user.plugins');
        Route::post('/googlelogin/update', 'User\PluginController@updategooglelogin')->name('user.googlelogin.update')->middleware('limitCheck:items,update,without_ajax');
        Route::post('/whatsapp/update', 'User\PluginController@updateWhatsapp')->name('user.whatsapp.update')->middleware('limitCheck:items,update,without_ajax');
        Route::post('/tawk/update', 'User\PluginController@updateTawkTo')->name('user.tawk.update')->middleware('limitCheck:items,update,without_ajax');
        Route::post('/disqus/update', 'User\PluginController@updateDisqus')->name('user.disqus.update')->middleware('limitCheck:items,update,without_ajax');
        Route::post('/analytics/update', 'User\PluginController@updateGoogleAnalytics')->name('user.google.analytics.update')->middleware('limitCheck:items,update,without_ajax');
        Route::post('/recaptcha/update', 'User\PluginController@updateRecaptcha')->name('user.recaptcha.update')->middleware('limitCheck:items,update,without_ajax');
        Route::post('/pixel/update', 'User\PluginController@updatePixel')->name('user.pixel.update')->middleware('limitCheck:items,update,without_ajax');

        // Maintenance mode
        Route::get('/maintenance-mode', 'User\BasicController@maintenance')->name('user.maintenance_mode');
        Route::post('/update-maintenance-mode', 'User\BasicController@updateMaintenance')->name('user.update_maintenance_mode');

        // Cookie alert
        Route::get('/cookie-alert', 'User\BasicController@cookieAlert')->name('user.cookie.alert');
        Route::post('/cookie-alert/{langid}/update', 'User\BasicController@updateCookie')->name('user.cookie.update')->middleware('limitCheck:items,update,without_ajax');

        // Email settings
        Route::prefix('email-settings')->group(function () {
            Route::get('/mail-templates', 'User\MailTemplateController@mailTemplates')->name('user.basic_settings.mail_templates');
            Route::get('/edit-mail-template/{id}', 'User\MailTemplateController@editMailTemplate')->name('user.basic_settings.edit_mail_template');
            Route::post('/update_mail_template/{id}', 'User\MailTemplateController@updateMailTemplate')->name('user.basic_settings.update_mail_template')->middleware('limitCheck:items,update,without_ajax');

            Route::get('/mail-information', 'User\SubscriberController@getMailInformation')->name('user.mail.information');
            Route::post('/mail-information/update', 'User\SubscriberController@storeMailInformation')->name('user.mail.subscriber')->middleware('limitCheck:items,update,without_ajax');
        });

        // Online Gateways
        Route::get('/gateways', 'User\GatewayController@index')->name('user.gateway.index');
        Route::middleware('limitCheck:items,update,without_ajax')->group(function () {
            Route::post('/stripe/update', 'User\GatewayController@stripeUpdate')->name('user.stripe.update');
            Route::post('/anet/update', 'User\GatewayController@anetUpdate')->name('user.anet.update');
            Route::post('/paypal/update', 'User\GatewayController@paypalUpdate')->name('user.paypal.update');
            Route::post('/paystack/update', 'User\GatewayController@paystackUpdate')->name('user.paystack.update');
            Route::post('/paytm/update', 'User\GatewayController@paytmUpdate')->name('user.paytm.update');
            Route::post('/flutterwave/update', 'User\GatewayController@flutterwaveUpdate')->name('user.flutterwave.update');
            Route::post('/instamojo/update', 'User\GatewayController@instamojoUpdate')->name('user.instamojo.update');
            Route::post('/mollie/update', 'User\GatewayController@mollieUpdate')->name('user.mollie.update');
            Route::post('/razorpay/update', 'User\GatewayController@razorpayUpdate')->name('user.razorpay.update');
            Route::post('/mercadopago/update', 'User\GatewayController@mercadopagoUpdate')->name('user.mercadopago.update');
            Route::post('/yoco/update', 'User\GatewayController@yocoUpdate')->name('user.yoco.update');
            Route::post('/xendit/update', 'User\GatewayController@xenditUpdate')->name('user.xendit.update');
            Route::post('/perfect_money/update', 'User\GatewayController@perfectMoneyUpdate')->name('user.perfect_money.update');
            Route::post('/myfatoorah/update', 'User\GatewayController@myfatoorahUpdate')->name('user.myfatoorah.update');
            Route::post('/toyyibpay/update', 'User\GatewayController@toyyibpayUpdate')->name('user.toyyibpay.update');
            Route::post('/paytabs/update', 'User\GatewayController@paytabsUpdate')->name('user.paytabs.update');
            Route::post('/phonepe/update', 'User\GatewayController@phonepeUpdate')->name('user.phonepe.update');
            Route::post('/midtrans/update', 'User\GatewayController@midtransUpdate')->name('user.midtrans.update');
            Route::post('/iyzico/update', 'User\GatewayController@iyzicoUpdate')->name('user.iyzico.update');
        });

        // Offline Gateways
        Route::get('/offline/gateways', 'User\GatewayController@offline')->name('user.gateway.offline');
        Route::post('/offline/gateway/store', 'User\GatewayController@store')->name('user.gateway.offline.store');
        Route::post('/offline/gateway/update', 'User\GatewayController@update')->name('user.gateway.offline.update');
        Route::post('/offline/status', 'User\GatewayController@status')->name('user.offline.status')->middleware('limitCheck:items,update,without_ajax');
        Route::post('/offline/gateway/delete', 'User\GatewayController@delete')->name('user.offline.gateway.delete');

        // Domains & URLs
        Route::prefix('domains-&-urls')->group(function () {
            Route::group(['middleware' => 'checkUserPermission:Custom Domain'], function () {
                Route::get('/domains', 'User\DomainController@domains')->name('user-domains');
                Route::post('/request/domain', 'User\DomainController@domainrequest')->name('user-domain-request')->middleware('limitCheck:items,update,without_ajax');
            });
            Route::get('/subdomain', 'User\SubdomainController@subdomain')->name('user-subdomain');
        });
    });

    // ═══════════════════ MARKETING ═══════════════════

    // Subscribers
    Route::get('/subscribers', 'User\SubscriberController@index')->name('user.subscriber.index');
    Route::get('/mailsubscriber', 'User\SubscriberController@mailsubscriber')->name('user.mailsubscriber');
    Route::post('/subscribers/sendmail', 'User\SubscriberController@subscsendmail')->name('user.subscribers.sendmail');
    Route::post('/subscriber/delete', 'User\SubscriberController@delete')->name('user.subscriber.delete');
    Route::post('/subscriber/bulk-delete', 'User\SubscriberController@bulkDelete')->name('user.subscriber.bulk.delete');

    // Coupons
    Route::prefix('coupon')->middleware('checkpermission:Coupon')->group(function () {
        Route::get('', 'User\CouponController@index')->name('user.coupon.index');
        Route::post('/store', 'User\CouponController@store')->name('user.coupon.store');
        Route::post('/update', 'User\CouponController@update')->name('user.coupon.update');
        Route::post('/delete', 'User\CouponController@delete')->name('user.coupon.delete');
    });

    // ═══════════════════ FINANCEIRO ═══════════════════

    // Membership
    Route::prefix('membership')->middleware('checkpermission:Membership')->group(function () {
        Route::get('/logs', 'User\PaymentLogController@index')->name('user.payment-log.index');
        Route::get('/extend-membership', 'User\BuyPlanController@index')->name('user.plan.extend.index');
        Route::get('/extend-membership/package/checkout/{package_id}', 'User\BuyPlanController@checkout')->name('user.plan.extend.checkout');
        Route::post('/package/checkout', 'User\UserCheckoutController@checkout')->name('user.plan.checkout');
    });

    // Shipping
    Route::prefix('shipping-charges')->middleware('checkpermission:Shipping Charges')->group(function () {
        Route::get('', 'User\ShopSettingController@index')->name('user.shipping.index');
        Route::post('/store', 'User\ShopSettingController@store')->name('user.shipping.store');
        Route::post('/update', 'User\ShopSettingController@update')->name('user.shipping.update');
        Route::post('/delete', 'User\ShopSettingController@delete')->name('user.shipping.delete');
    });

    // ═══════════════════ ORDERS ═══════════════════
    Route::prefix('shop-management/products')->middleware('checkpermission:Shop Management')->group(function () {
        Route::post('/orders/mail', 'Admin\ItemOrderController@mail')->name('user.orders.mail');

        Route::prefix('orders')->group(function () {
            Route::get('/all/orders', 'User\ItemOrderController@all')->name('user.all.item.orders');
            Route::get('/pending/orders', 'User\ItemOrderController@pending')->name('user.pending.item.orders');
            Route::get('/processing/orders', 'User\ItemOrderController@processing')->name('user.processing.item.orders');
            Route::get('/completed/orders', 'User\ItemOrderController@completed')->name('user.completed.item.orders');
            Route::get('/rejected/orders', 'User\ItemOrderController@rejected')->name('user.rejected.item.orders');
            Route::post('/order/status', 'User\ItemOrderController@status')->name('user.item.orders.status');
            Route::get('/orders/details/{id}', 'User\ItemOrderController@details')->name('user.item.details');
            Route::post('/order/delete', 'User\ItemOrderController@orderDelete')->name('user.item.order.delete');
            Route::post('/order/bulk-delete', 'User\ItemOrderController@bulkOrderDelete')->name('user.item.order.bulk.delete');
            Route::post('/paymentStatus', 'User\ItemController@paymentStatus')->name('user.item.paymentStatus');
            Route::get('/orders/report', 'User\ItemOrderController@report')->name('user.orders.report');
            Route::get('/export/report', 'User\ItemOrderController@exportReport')->name('user.orders.export');
        });
    });


    // ═══════════════════ LOJA - PRODUTOS & CATEGORIAS ═══════════════════
    Route::prefix('shop')->middleware('checkpermission:Shop Management')->group(function () {
        // Products
        Route::get('/products', 'User\ItemController@index')->name('user.item.index');
        Route::get('/product/create', 'User\ItemController@create')->name('user.item.create');
        Route::get('/product/{id}/edit', 'User\ItemController@edit')->name('user.item.edit');
        Route::post('/product/store', 'User\ItemController@store')->name('user.item.store');
        Route::post('/product/update', 'User\ItemController@update')->name('user.item.update');
        Route::post('/product/delete', 'User\ItemController@delete')->name('user.item.delete');
        Route::post('/product/bulk-delete', 'User\ItemController@bulkDelete')->name('user.item.bulk.delete');
        Route::post('/product/feature', 'User\ItemController@feature')->name('user.item.feature');
        Route::get('/product/type', 'User\ItemController@type')->name('user.item.type');
        Route::get('/product/{id}/slider', 'User\ItemController@slider')->name('user.item.slider');
        Route::post('/product/slider/remove', 'User\ItemController@sliderRemove')->name('user.item.sliderRemove');
        Route::post('/product/db-slider/remove', 'User\ItemController@dbSliderRemove')->name('user.item.dbSliderRemove');
        Route::post('/product/{id}/uploadUpdate', 'User\ItemController@uploadUpdate')->name('user.item.uploadUpdate');
        Route::get('/product/getCategory/{langid}', 'User\ItemController@getCategory')->name('user.item.getCategory');
        Route::post('/product/subcat', 'User\ItemController@subcatGetter')->name('user.item.subcatGetter');

        // Categories
        Route::get('/categories', 'User\ItemCategoryController@index')->name('user.itemcategory.index');
        Route::post('/category/store', 'User\ItemCategoryController@store')->name('user.itemcategory.store');
        Route::get('/category/{id}/edit', 'User\ItemCategoryController@edit')->name('user.itemcategory.edit');
        Route::post('/category/update', 'User\ItemCategoryController@update')->name('user.itemcategory.update');
        Route::post('/category/delete', 'User\ItemCategoryController@delete')->name('user.itemcategory.delete');
        Route::post('/category/bulk-delete', 'User\ItemCategoryController@bulkDelete')->name('user.itemcategory.bulk.delete');
        Route::post('/category/feature', 'User\ItemCategoryController@feature')->name('user.itemcategory.feature');
    });

    // ═══════════════════ MENUS ═══════════════════
    Route::get('/menus', 'User\MenuController@index')->name('user.menu.index');
    Route::post('/menus/save', 'User\MenuController@save')->name('user.menu.save');

    // ═══════════════════ MÍDIA ═══════════════════
    Route::get('/media', 'User\MediaController@index')->name('user.media.index');
    Route::post('/media/store', 'User\MediaController@store')->name('user.media.store');
    Route::post('/media/delete', 'User\MediaController@delete')->name('user.media.delete');




    // 
    // CMS Inertia Admin (Products, Categories, Menus, Media)
    Route::prefix('cms')->middleware('checkpermission:Shop Management')->group(function () {
        // Pages
        Route::get('/products', [App\Http\Controllers\User\CmsPageController::class, 'products'])->name('user.cms.products');
        Route::get('/categories', [App\Http\Controllers\User\CmsPageController::class, 'categories'])->name('user.cms.categories');
        Route::get('/menus', [App\Http\Controllers\User\CmsPageController::class, 'menus'])->name('user.cms.menus');
        Route::get('/media', [App\Http\Controllers\User\CmsPageController::class, 'media'])->name('user.cms.media');

        // API
        Route::get('/api/products', [App\Http\Controllers\User\CmsApiController::class, 'productsIndex'])->name('user.cms.api.products');
        Route::post('/api/products/store', [App\Http\Controllers\User\CmsApiController::class, 'productsStore'])->name('user.cms.api.products.store');
        Route::post('/api/products/update', [App\Http\Controllers\User\CmsApiController::class, 'productsUpdate'])->name('user.cms.api.products.update');
        Route::post('/api/products/delete', [App\Http\Controllers\User\CmsApiController::class, 'productsDelete'])->name('user.cms.api.products.delete');

        Route::get('/api/categories', [App\Http\Controllers\User\CmsApiController::class, 'categoriesIndex'])->name('user.cms.api.categories');
        Route::post('/api/categories/store', [App\Http\Controllers\User\CmsApiController::class, 'categoriesStore'])->name('user.cms.api.categories.store');
        Route::post('/api/categories/update', [App\Http\Controllers\User\CmsApiController::class, 'categoriesUpdate'])->name('user.cms.api.categories.update');
        Route::post('/api/categories/delete', [App\Http\Controllers\User\CmsApiController::class, 'categoriesDelete'])->name('user.cms.api.categories.delete');

        Route::get('/api/menus', [App\Http\Controllers\User\CmsApiController::class, 'menusGet'])->name('user.cms.api.menus');
        Route::post('/api/menus/save', [App\Http\Controllers\User\CmsApiController::class, 'menusSave'])->name('user.cms.api.menus.save');

        Route::get('/api/media', [App\Http\Controllers\User\CmsApiController::class, 'mediaIndex'])->name('user.cms.api.media');
        Route::post('/api/media/store', [App\Http\Controllers\User\CmsApiController::class, 'mediaStore'])->name('user.cms.api.media.store');
        Route::post('/api/media/delete', [App\Http\Controllers\User\CmsApiController::class, 'mediaDelete'])->name('user.cms.api.media.delete');
    });

    // Premium Theme Editor (Inertia)
    Route::get('/site-settings/appearance-premium', [App\Http\Controllers\User\ThemePremiumController::class, 'index'])->name('user.appearance.premium');
    Route::post('/site-settings/appearance-premium/save', [App\Http\Controllers\User\ThemePremiumController::class, 'save'])->name('user.appearance.premium.save');
    Route::post('/site-settings/appearance-premium/publish', [App\Http\Controllers\User\ThemePremiumController::class, 'publish'])->name('user.appearance.premium.publish');
    Route::get('/site-settings/appearance-premium/versions', [App\Http\Controllers\User\ThemePremiumController::class, 'versions'])->name('user.appearance.premium.versions');
});
