# Relatorio tecnico completo do sistema FlashLoja

## Ambiente
- Caminho analisado: /home/u324811576/domains/flashloja.com.br/public_html
- Data UTC: 2026-02-14T01:50:29.699650Z
- Total de arquivos: 17641
- PHP: PHP 8.2.29 (cli) (built: Nov 12 2025 16:46:40) (NTS)
- Laravel: Laravel Framework 9.52.21

## Estrutura de diretorios (nivel 2)
``
.
./app
./app/Console
./app/Events
./app/Exceptions
./app/Exports
./app/Http
./app/Jobs
./app/Libraries
./app/Mail
./app/Models
./app/Notifications
./app/Providers
./app/Rules
./app/Services
./app/View
./assets
./assets/front
./bootstrap
./bootstrap/cache
./config
./database
./database/factories
./database/migrations
./database/seeds
./public
./public/assets
./public/build
./public/css
./public/images
./public/js
./resources
./resources/js
./resources/lang
./resources/sass
./resources/views
./routes
./site
./storage
./storage/app
./storage/digital_products
./storage/framework
./storage/logs
./tests
./tests/Feature
./tests/Unit
./tools
./.trash
./updater
./updater/app
./updater/database
./updater/public
./updater/resources
./updater/routes
./vendor
./vendor/academe
./vendor/anandsiddharth
./vendor/anhskohbo
./vendor/asm89
./vendor/bacon
./vendor/barryvdh
./vendor/baselrabia
./vendor/bin
./vendor/brick
./vendor/caouecs
./vendor/carbonphp
./vendor/cartalyst
./vendor/clue
./vendor/composer
./vendor/dasprid
./vendor/dflydev
./vendor/doctrine
./vendor/dompdf
./vendor/dragonmantank
./vendor/egulias
./vendor/ezyang
./vendor/fakerphp
./vendor/filp
./vendor/firebase
./vendor/fruitcake
./vendor/graham-campbell
./vendor/guzzlehttp
./vendor/hamcrest
./vendor/inertiajs
./vendor/instamojo
./vendor/intervention
./vendor/ixudra
./vendor/iyzico
./vendor/kreativdev
./vendor/laravel
./vendor/_laravel_ide
./vendor/laravel-notification-channels
./vendor/league
./vendor/maatwebsite
./vendor/maennchen
./vendor/markbaker
./vendor/masterminds
./vendor/mews
./vendor/midtrans
./vendor/minishlink
./vendor/mockery
./vendor/mollie
./vendor/moneyphp
./vendor/monolog
./vendor/myclabs
./vendor/nesbot
./vendor/nette
./vendor/nicmart
./vendor/nikic
./vendor/nunomaduro
./vendor/omnipay
./vendor/paragonie
./vendor/paypal
./vendor/phar-io
./vendor/phenx
./vendor/php-http
./vendor/phpmailer
./vendor/phpoffice
./vendor/phpoption
./vendor/phpseclib
./vendor/phpunit
./vendor/psr
./vendor/psy
./vendor/pusher
./vendor/rachidlaasri
./vendor/ralouphie
./vendor/ramsey
./vendor/razorpay
./vendor/rmccue
./vendor/sabberworm
./vendor/sebastian
./vendor/simplepie
./vendor/simplesoftwareio
./vendor/spatie
./vendor/spomky-labs
./vendor/symfony
./vendor/theseer
./vendor/tijsverkoyen
./vendor/Transliterator
./vendor/unisharp
./vendor/vcard
./vendor/vlucas
./vendor/voku
./vendor/web-token
./vendor/willvincent
```

## Contagem por extensao
```
14162 php
    561 png
    484 md
    326 json
    193 gif
    178 js
    169 txt
    143 html
    128 css
    118 jpg
    110 stub
     77 yml
     76 svg
     68 scss
     57 xml
     48 rst
     40 ttf
     34 gitignore
     29 map
     28 dist
     23 woff
     22 wrl
     22 eot
     18 pdf
     17 woff2
     15 webp
     14 tpl
     14 afm
     13 xsd
     13 ufm
     12 editorconfig
      9 gitkeep
      8 sass
      8 pem
      8 neon
      8 lock
      8 bat
      7 ser
      7 ini
      7 gitattributes
      5 sql
      5 conf
      4 z
      4 sh
      4 otf
      4 inc
      3 rollback_current_20260204_231849
      2 zip
      2 yaml
      2 src
      2 sha256
      2 pre_revert_20260204_180733
      2 log
      2 htaccess
      2 db
      1 zsh
      1 xlsx
      1 vue
      1 /vendor/web-token/jwt-util-ecc/license
      1 /vendor/web-token/jwt-signature/license
      1 /vendor/web-token/jwt-signature-algorithm-ecdsa/license
      1 /vendor/web-token/jwt-library/license
      1 /vendor/web-token/jwt-key-mgmt/license
      1 /vendor/vlucas/phpdotenv/license
      1 /vendor/unisharp/laravel-filemanager/makefile
      1 /vendor/unisharp/laravel-filemanager/license
      1 /vendor/unisharp/laravel-filemanager/docs/gemfile
      1 /vendor/theseer/tokenizer/license
      1 /vendor/symfony/yaml/resources/bin/yaml-lint
      1 /vendor/symfony/yaml/license
      1 /vendor/symfony/var-dumper/resources/bin/var-dump-server
      1 /vendor/symfony/var-dumper/license
      1 /vendor/symfony/uid/license
      1 /vendor/symfony/translation/license
      1 /vendor/symfony/translation-contracts/license
      1 /vendor/symfony/string/license
      1 /vendor/symfony/service-contracts/license
      1 /vendor/symfony/routing/license
      1 /vendor/symfony/property-access/license
      1 /vendor/symfony/process/license
      1 /vendor/symfony/polyfill-uuid/license
      1 /vendor/symfony/polyfill-php83/license
      1 /vendor/symfony/polyfill-php80/license
      1 /vendor/symfony/polyfill-mbstring/license
      1 /vendor/symfony/polyfill-intl-normalizer/license
      1 /vendor/symfony/polyfill-intl-idn/license
      1 /vendor/symfony/polyfill-intl-grapheme/license
      1 /vendor/symfony/polyfill-ctype/license
      1 /vendor/symfony/mime/license
      1 /vendor/symfony/mailer/license
      1 /vendor/symfony/inflector/license
      1 /vendor/symfony/http-kernel/license
      1 /vendor/symfony/http-foundation/license
      1 /vendor/symfony/http-client/license
      1 /vendor/symfony/http-client-contracts/license
      1 /vendor/symfony/finder/license
      1 /vendor/symfony/event-dispatcher/license
      1 /vendor/symfony/event-dispatcher-contracts/license
      1 /vendor/symfony/error-handler/resources/bin/patch-type-declarations
      1 /vendor/symfony/error-handler/license
      1 /vendor/symfony/dom-crawler/license
      1 /vendor/symfony/deprecation-contracts/license
      1 /vendor/symfony/css-selector/license
      1 /vendor/symfony/console/license
      1 /vendor/spomky-labs/pki-framework/license
      1 /vendor/spomky-labs/base64url/license
      1 /vendor/spatie/image-optimizer/license
      1 /vendor/simplesoftwareio/simple-qrcode/license
      1 /vendor/simplepie/simplepie/idn/licence
      1 /vendor/sebastian/version/license
      1 /vendor/sebastian/type/license
      1 /vendor/sebastian/resource-operations/license
      1 /vendor/sebastian/recursion-context/license
      1 /vendor/sebastian/object-reflector/license
      1 /vendor/sebastian/object-enumerator/license
      1 /vendor/sebastian/lines-of-code/license
      1 /vendor/sebastian/global-state/license
      1 /vendor/sebastian/exporter/license
      1 /vendor/sebastian/environment/license
      1 /vendor/sebastian/diff/license
```

## Dependencias Composer require
- php: ^8.0.2
- ext-curl: *
- ext-json: *
- academe/omnipay-authorizenetapi:  ~3.0
- anandsiddharth/laravel-paytm-wallet: ^2.0
- anhskohbo/no-captcha: ^3.1
- barryvdh/laravel-dompdf: ^1.0.0
- baselrabia/myfatoorah-with-laravel: ^1.0
- caouecs/laravel-lang: ~4.0
- cartalyst/stripe-laravel: 14.*
- doctrine/dbal: ^3.1
- fruitcake/laravel-cors: ^2.0
- guzzlehttp/guzzle: 6.2.0.* | 7.3.0
- inertiajs/inertia-laravel: ^0.6
- instamojo/instamojo-php: ^0.4.0
- ixudra/curl: ^6.22
- iyzico/iyzipay-php: ^2.0
- kreativdev/saas-installer: ^1.0
- laravel-notification-channels/webpush: ^7.0
- laravel/framework: ^9.0
- laravel/socialite: ^5.2
- laravel/tinker: ^2.5
- laravel/ui: ^3.3
- maatwebsite/excel: ^3.1
- mews/purifier: ^3.2
- midtrans/midtrans-php: ^2.5
- mollie/laravel-mollie: ^2.11
- paypal/rest-api-sdk-php: ^1.14
- php-http/httplug: ^2.4
- phpmailer/phpmailer: ^6.1
- pusher/pusher-php-server: ^4.1
- rachidlaasri/laravel-installer: ^4.1
- razorpay/razorpay: 2.*
- simplesoftwareio/simple-qrcode: ^4.2
- spatie/laravel-cookie-consent: ^3.2
- spatie/laravel-sitemap: ^6.0.0
- unisharp/laravel-filemanager: ^2.2
- willvincent/feeds: ^2.2

## Dependencias Composer require-dev
- spatie/laravel-ignition: ^1.0
- fakerphp/faker: ^1.9.1
- laravel/sail: ^1.0.1
- mockery/mockery: ^1.4.2
- nunomaduro/collision: ^6.0
- phpunit/phpunit: ^9.3.3

## Scripts npm
- dev: npm run development
- development: cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js
- watch: npm run development -- --watch
- watch-poll: npm run watch -- --watch-poll
- hot: cross-env NODE_ENV=development node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot --config=node_modules/laravel-mix/setup/webpack.config.js
- prod: npm run production
- production: cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --no-progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js

## npm devDependencies
- axios: ^0.19
- cross-env: ^7.0
- laravel-mix: ^5.0.1
- lodash: ^4.17.13
- resolve-url-loader: ^3.1.0
- sass: ^1.15.2
- sass-loader: ^8.0.0

## Arquivos de rotas
- routes/admin.php | 34551 bytes
- routes/api.php | 528 bytes
- routes/channels.php | 508 bytes
- routes/console.php | 553 bytes
- routes/user-front.php | 12956 bytes
- routes/user.php | 23681 bytes
- routes/web.php | 10689 bytes

## Arquivos de controllers
- app/Http/Controllers/Admin/AboutAdditionSectionController.php | 7978 bytes | funcoes: index, create, store, edit, update, delete, bulkdelete
- app/Http/Controllers/Admin/AdditionalSectionController.php | 8703 bytes | funcoes: index, create, store, edit, update, delete, bulkdelete
- app/Http/Controllers/Admin/BasicController.php | 18320 bytes | funcoes: generalSetting, updateGeneralSetting, removeImage, updateslider, breadcrumb, updatebreadcrumb, script, updatescript, maintainance, updatemaintainance, sections, updatesections, aboutSectionInfo, aboutSectionInfoUpdate, cookiealert, updatecookie, seo, updateSEO, heading, update_heading
- app/Http/Controllers/Admin/BcategoryController.php | 4999 bytes | funcoes: index, edit, store, update, delete, bulkDelete
- app/Http/Controllers/Admin/BlogController.php | 4420 bytes | funcoes: index, edit, store, update, delete, bulkDelete, getcats
- app/Http/Controllers/Admin/CacheController.php | 445 bytes | funcoes: clear
- app/Http/Controllers/Admin/ContactController.php | 1395 bytes | funcoes: index, update
- app/Http/Controllers/Admin/CounterInformationController.php | 4726 bytes | funcoes: index, updateInfo, removeImg, storeCounter, updateCounter, destroyCounter, bulkDestroyCounter
- app/Http/Controllers/Admin/CustomDomainController.php | 7811 bytes | funcoes: texts, updateTexts, index, status, mail, delete, bulkDelete
- app/Http/Controllers/Admin/DashboardController.php | 1228 bytes | funcoes: dashboard, changeTheme
- app/Http/Controllers/Admin/EmailController.php | 2954 bytes | funcoes: mailFromAdmin, updateMailFromAdmin, mailToAdmin, updateMailToAdmin
- app/Http/Controllers/Admin/FaqController.php | 2655 bytes | funcoes: index, store, update, delete, bulkDelete
- app/Http/Controllers/Admin/FeatureController.php | 3302 bytes | funcoes: index, edit, store, update, delete
- app/Http/Controllers/Admin/FooterController.php | 2877 bytes | funcoes: index, update, removeImage
- app/Http/Controllers/Admin/ForgetController.php | 2395 bytes | funcoes: mailForm, sendmail
- app/Http/Controllers/Admin/GatewayController.php | 14772 bytes | funcoes: index, paypalUpdate, stripeUpdate, paystackUpdate, paytmUpdate, flutterwaveUpdate, instamojoUpdate, mollieUpdate, razorpayUpdate, anetUpdate, mercadopagoUpdate, yocoUpdate, xenditUpdate, perfect_moneyUpdate, myfatoorahUpdate, midtransUpdate, toyyibpayUpdate, iyzicoUpdate, paytabsUpdate, phonepeUpdate, offline, store, update, status, delete
- app/Http/Controllers/Admin/HerosectionController.php | 3629 bytes | funcoes: imgtext, update, removeImg
- app/Http/Controllers/Admin/LanguageController.php | 48028 bytes | funcoes: index, store, edit, update, editKeyword, updateKeyword, delete, default, dashboardDefault, rtlcheck, addKeyword, addKeywordForAdmin, editAdminKeyword, updateAdminKeyword, editUserKeyword, updateUserDashboardKeyword, editUserFrontendKeyword, updateCustomerKeyword, validationMessage, validationMessageFrontend, updateValidationAttribute, copyFolder
- app/Http/Controllers/Admin/LoginController.php | 770 bytes | funcoes: login, authenticate, logout
- app/Http/Controllers/Admin/MailTemplateController.php | 1166 bytes | funcoes: mailTemplates, editMailTemplate, updateMailTemplate
- app/Http/Controllers/Admin/MenuBuilderController.php | 1198 bytes | funcoes: index, update
- app/Http/Controllers/Admin/PackageController.php | 6474 bytes | funcoes: settings, updateSettings, features, updateFeatures, index, store, edit, update, delete, bulkDelete
- app/Http/Controllers/Admin/PageController.php | 3136 bytes | funcoes: index, create, store, edit, update, delete, bulkDelete
- app/Http/Controllers/Admin/PartnerController.php | 5581 bytes | funcoes: index, edit, upload, store, uploadUpdate, update, delete
- app/Http/Controllers/Admin/PaymentLogController.php | 7311 bytes | funcoes: index, update
- app/Http/Controllers/Admin/PopupController.php | 11698 bytes | funcoes: index, types, create, edit, store, update, delete, bulkDelete, status
- app/Http/Controllers/Admin/ProcessController.php | 3461 bytes | funcoes: index, edit, store, update, delete, removeImage
- app/Http/Controllers/Admin/ProfileController.php | 2909 bytes | funcoes: changePass, editProfile, updateProfile, updatePassword
- app/Http/Controllers/Admin/PushController.php | 2604 bytes | funcoes: settings, updateSettings, send, push
- app/Http/Controllers/Admin/RegisterUserController.php | 70518 bytes | funcoes: index, view, store, storeEmailTemplate, userban, emailStatus, userFeatured, userTemplate, userUpdateTemplate, changePass, updatePassword, delete, bulkDelete, removeCurrPackage, sendMail, changeCurrPackage, addCurrPackage, removeNextPackage, changeNextPackage, addNextPackage, secret_login, category, categoryStore, categoryEdit, categoryUpdate, categoryDelete
- app/Http/Controllers/Admin/RoleController.php | 2146 bytes | funcoes: index, store, update, delete, managePermissions, updatePermissions
- app/Http/Controllers/Admin/SitemapController.php | 2341 bytes | funcoes: index, store, download, update, delete
- app/Http/Controllers/Admin/SocialController.php | 1575 bytes | funcoes: index, store, edit, update, delete
- app/Http/Controllers/Admin/SubdomainController.php | 1738 bytes | funcoes: index, status
- app/Http/Controllers/Admin/SubscriberController.php | 2456 bytes | funcoes: index, mailsubscriber, subscsendmail, delete, bulkDelete
- app/Http/Controllers/Admin/TestimonialController.php | 6623 bytes | funcoes: index, edit, store, sideImageStore, update, textupdate, delete
- app/Http/Controllers/Admin/UlinkController.php | 2169 bytes | funcoes: index, store, update, delete
- app/Http/Controllers/Admin/UserController.php | 4040 bytes | funcoes: index, edit, store, update, delete, managePermissions, updatePermissions
- app/Http/Controllers/Auth/ForgotPasswordController.php | 834 bytes | funcoes: __construct
- app/Http/Controllers/Auth/LoginController.php | 943 bytes | funcoes: __construct
- app/Http/Controllers/Auth/RegisterController.php | 1898 bytes | funcoes: __construct, validator, create
- app/Http/Controllers/Auth/ResetPasswordController.php | 952 bytes | funcoes: __construct
- app/Http/Controllers/Auth/VerificationController.php | 1071 bytes | funcoes: __construct
- app/Http/Controllers/Controller.php | 5053 bytes | funcoes: getUserPageHeading, getPageHeading
- app/Http/Controllers/CronJobController.php | 11319 bytes | funcoes: expired, check_payment, IyzicoPaymentStatus, updateIyzicoPendingMemership, updateIyzicoPendingOrder
- app/Http/Controllers/Front/CheckoutController.php | 34228 bytes | funcoes: checkout, store, storeEmailTemplate, offlineSuccess, trialSuccess, cancelPayment
- app/Http/Controllers/Front/FrontendController.php | 35040 bytes | funcoes: __construct, index, previewHome, buildHomePreviewData, previewHome1, previewHome2, previewHome3, previewHome4, previewHome5, about, subscribe, loginView, checkUsername, step1, step2, checkout, pricing, blogs, blogdetails, contactView, faqs, dynamicPage, shops, customPage, paymentInstruction, contactMessage, adminContactMessage, changeLanguage, changeUserLanguage, templates, invoice, previewHomePlus1, previewHomePlus2, previewHomePlus3, previewHomePlus4, previewHomePlus5, previewNovo1, previewNovo2, previewNovo3, previewNovo4, previewNovo5, previewLojaFlash
- app/Http/Controllers/Front/PushController.php | 883 bytes | funcoes: store
- app/Http/Controllers/MidtransBankNotifyController.php | 5918 bytes | funcoes: bank_notify
- app/Http/Controllers/MyFatoorahController.php | 2094 bytes | funcoes: callback, cancel
- app/Http/Controllers/Payment/AuthorizenetController.php | 8758 bytes | funcoes: __construct, paymentProcess, cancelPayment
- app/Http/Controllers/Payment/FlutterWaveController.php | 9604 bytes | funcoes: __construct, paymentProcess, successPayment
- app/Http/Controllers/Payment/InstamojoController.php | 7606 bytes | funcoes: paymentProcess, successPayment, cancelPayment
- app/Http/Controllers/Payment/IyzicoController.php | 7111 bytes | funcoes: paymentProcess, successPayment
- app/Http/Controllers/Payment/MercadopagoController.php | 9443 bytes | funcoes: __construct, paymentProcess, curlCalls, paycancle, payreturn, successPayment, cancelPayment
- app/Http/Controllers/Payment/MidtransController.php | 8065 bytes | funcoes: paymentProcess, successPayment
- app/Http/Controllers/Payment/MollieController.php | 7164 bytes | funcoes: paymentProcess, successPayment, cancelPayment
- app/Http/Controllers/Payment/MyFatoorahController.php | 8250 bytes | funcoes: __construct, paymentProcess, successPayment
- app/Http/Controllers/Payment/PaypalController.php | 10181 bytes | funcoes: __construct, paymentProcess, successPayment, cancelPayment
- app/Http/Controllers/Payment/PaystackController.php | 7590 bytes | funcoes: __construct, paymentProcess, successPayment
- app/Http/Controllers/Payment/PaytabsController.php | 6750 bytes | funcoes: paymentProcess, successPayment
- app/Http/Controllers/Payment/PaytmController.php | 17719 bytes | funcoes: paymentProcess, handlePaytmRequest, getAllEncdecFunc, encrypt_e, decrypt_e, pkcs5_pad_e, pkcs5_unpad_e, generateSalt_e, checkString_e, getChecksumFromArray, getChecksumFromString, verifychecksum_e, verifychecksum_eFromStr, getArray2Str, getArray2StrForVerify, redirect2PG, removeCheckSumParam, getTxnStatus, getTxnStatusNew, initiateTxnRefund, callAPI, callNewAPI, getRefundChecksumFromArray, getRefundArray2Str, callRefundAPI, paymentStatus
- app/Http/Controllers/Payment/PerfectMoneyController.php | 7197 bytes | funcoes: paymentProcess, successPayment
- app/Http/Controllers/Payment/PhonePeController.php | 7530 bytes | funcoes: paymentProcess, successPayment
- app/Http/Controllers/Payment/RazorpayController.php | 8805 bytes | funcoes: __construct, paymentProcess, successPayment
- app/Http/Controllers/Payment/StripeController.php | 7864 bytes | funcoes: __construct, paymentProcess, cancelPayment
- app/Http/Controllers/Payment/ToyyibpayController.php | 8133 bytes | funcoes: paymentProcess, successPayment
- app/Http/Controllers/Payment/TwoCheckoutController.php | 1623 bytes | funcoes: __construct, index, charge
- app/Http/Controllers/Payment/XenditController.php | 7109 bytes | funcoes: paymentProcess, successPayment
- app/Http/Controllers/Payment/YocoController.php | 6860 bytes | funcoes: paymentProcess, successPayment
- app/Http/Controllers/User/AboutAdditionalSectionController.php | 9483 bytes | funcoes: index, create, store, edit, update, delete, bulkdelete
- app/Http/Controllers/User/AboutTestimonialController.php | 5125 bytes | funcoes: index, updateInfo, store, edit, update, delete, bulk_delete
- app/Http/Controllers/User/AboutUsController.php | 7157 bytes | funcoes: features, about, removeImg, updaetAbout, feature_store, feature_edit, feature_update, delete_features, bulk_delete_features, sections, updatesections
- app/Http/Controllers/User/AdditionalSectionController.php | 9382 bytes | funcoes: index, create, store, edit, update, delete, bulkdelete
- app/Http/Controllers/User/Auth/ForgotPasswordController.php | 4556 bytes | funcoes: __construct, showLinkRequestForm, forgetPasswordMail, broker
- app/Http/Controllers/User/Auth/LoginController.php | 3197 bytes | funcoes: __construct, showLoginForm, login, logout
- app/Http/Controllers/User/Auth/RegisterController.php | 3127 bytes | funcoes: __construct, register, token
- app/Http/Controllers/User/Auth/ResetPasswordController.php | 1716 bytes | funcoes: __construct, showResetForm, broker, guard
- app/Http/Controllers/User/BannerSectionController.php | 6248 bytes | funcoes: bannerSection, countBanner, storebanner, updatebanner, deletebanner
- app/Http/Controllers/User/BasicController.php | 20106 bytes | funcoes: themeVersion, updateThemeVersion, breadcrumb, updatebreadcrumb, generalSettings, updateInfo, removeImage, seo, updateSEO, faqindex, faqstore, faqupdate, faqdelete, faqbulkDelete, cookieAlert, updatecookie, maintenance, updateMaintenance, userNotFoundPage, updateUserNotFoundPage
- app/Http/Controllers/User/BlogCategoryController.php | 6751 bytes | funcoes: index, store, edit, update, delete, bulkDelete
- app/Http/Controllers/User/BlogController.php | 19810 bytes | funcoes: index, create, store, update_status, edit, update, getcats, delete, bulkDelete
- app/Http/Controllers/User/BuyPlanController.php | 4996 bytes | funcoes: index, checkout
- app/Http/Controllers/User/CmsApiController.php | 16643 bytes | funcoes: langId, categoriesIndex, categoriesStore, categoriesUpdate, categoriesDelete, productsIndex, productsStore, productsUpdate, productsDelete, productsShow, menusGet, menusSave, mediaIndex, mediaStore, mediaDelete
- app/Http/Controllers/User/CmsPageController.php | 680 bytes | funcoes: products, categories, menus, media
- app/Http/Controllers/User/ContactController.php | 2417 bytes | funcoes: index, update
- app/Http/Controllers/User/CounterInformationController.php | 5135 bytes | funcoes: counter, updateInfo, removeImg, storeCounter, counter_edit, counter_update, delete_counter, bulk_delete_counter
- app/Http/Controllers/User/CouponController.php | 3894 bytes | funcoes: index, store, update, delete
- app/Http/Controllers/User/CtaSectionController.php | 1676 bytes | funcoes: index, update
- app/Http/Controllers/User/CurrencyController.php | 3594 bytes | funcoes: index, store, update, status, delete
- app/Http/Controllers/User/DomainController.php | 2071 bytes | funcoes: domains, isValidDomain, domainrequest
- app/Http/Controllers/User/FooterSectionController.php | 4698 bytes | funcoes: index, update, removeImage
- app/Http/Controllers/User/GatewayController.php | 22570 bytes | funcoes: index, paypalUpdate, stripeUpdate, paystackUpdate, paytmUpdate, flutterwaveUpdate, instamojoUpdate, mollieUpdate, razorpayUpdate, anetUpdate, mercadopagoUpdate, yocoUpdate, xenditUpdate, perfectMoneyUpdate, myfatoorahUpdate, midtransUpdate, iyzicoUpdate, toyyibpayUpdate, paytabsUpdate, phonepeUpdate, offline, store, update, status, delete
- app/Http/Controllers/User/HeaderSectionController.php | 1844 bytes | funcoes: index, update
- app/Http/Controllers/User/HeadingController.php | 3022 bytes | funcoes: index, update
- app/Http/Controllers/User/HeroSliderController.php | 12561 bytes | funcoes: sliderVersion, createSlider, storeSliderInfo, editSlider, updateSliderInfo, deleteSlider, updateStaticSlider, HeroSecBgImg, HeroSecBgImgRemove, updateHeroSecBgImg, productSlider, updateProductSlider, toggleSliderStatus
- app/Http/Controllers/User/HomePageTextController.php | 11410 bytes | funcoes: index, update, sections, updatesections, contentSection, removeImage, item_highlight, item_highlight_update
- app/Http/Controllers/User/HowItWorkController.php | 2853 bytes | funcoes: index, store, update, delete
- app/Http/Controllers/User/ItemCategoryController.php | 12470 bytes | funcoes: index, store, edit, update, feature, delete, bulkDelete
- app/Http/Controllers/User/ItemController.php | 48286 bytes | funcoes: index, type, create, uploadUpdate, getCategory, store, edit, update, feature, specialOffer, delete, bulkDelete, variants, variations, getVariation, variationStore, variationDelete, variationOptionDelete, paymentStatus, settings, updateSettings, slider, sliderRemove, dbSliderRemove, subcatGetter, setFlashSale
- app/Http/Controllers/User/ItemLabelController.php | 2369 bytes | funcoes: index, store, update, delete
- app/Http/Controllers/User/ItemOrderController.php | 11771 bytes | funcoes: all, pending, processing, completed, rejected, status, mail, details, bulkOrderDelete, orderDelete, report, exportReport
- app/Http/Controllers/User/ItemSubCategoryController.php | 8853 bytes | funcoes: index, store, edit, update, delete, bulkDelete
- app/Http/Controllers/User/LanguageController.php | 20116 bytes | funcoes: index, store, edit, update, editKeyword, updateKeyword, delete, default, dashboardDefault, rtlcheck, rtlcheck2, addKeyword
- app/Http/Controllers/User/MailTemplateController.php | 2011 bytes | funcoes: mailTemplates, editMailTemplate, updateMailTemplate
- app/Http/Controllers/User/MediaController.php | 2603 bytes | funcoes: index, store, delete
- app/Http/Controllers/User/MenuBuilderController.php | 1509 bytes | funcoes: index, update
- app/Http/Controllers/User/MenuController.php | 2163 bytes | funcoes: index, save
- app/Http/Controllers/User/OrderController.php | 1010 bytes | funcoes: __construct, digitalDownload
- app/Http/Controllers/User/PageController.php | 12889 bytes | funcoes: index, create, store, edit, update, delete, bulkDelete
- app/Http/Controllers/User/Payment/AuthorizenetController.php | 2879 bytes | funcoes: __construct, paymentProcess
- app/Http/Controllers/User/Payment/FlutterWaveController.php | 5295 bytes | funcoes: __construct, paymentProcess, successPayment
- app/Http/Controllers/User/Payment/InstamojoController.php | 2744 bytes | funcoes: paymentProcess, successPayment
- app/Http/Controllers/User/Payment/IyzicoController.php | 5532 bytes | funcoes: paymentProcess, successPayment
- app/Http/Controllers/User/Payment/MercadopagoController.php | 4460 bytes | funcoes: __construct, paymentProcess, curlCalls, paycancle, successPayment
- app/Http/Controllers/User/Payment/MidtransController.php | 3556 bytes | funcoes: paymentProcess, successPayment
- app/Http/Controllers/User/Payment/MollieController.php | 3178 bytes | funcoes: __construct, paymentProcess, successPayment
- app/Http/Controllers/User/Payment/MyfatoorahController.php | 3872 bytes | funcoes: __construct, paymentProcess, successPayment
- app/Http/Controllers/User/Payment/PaypalController.php | 5446 bytes | funcoes: __construct, paymentProcess, successPayment
- app/Http/Controllers/User/Payment/PaystackController.php | 3208 bytes | funcoes: paymentProcess, successPayment
- app/Http/Controllers/User/Payment/PaytabsController.php | 2962 bytes | funcoes: paymentProcess, successPayment
- app/Http/Controllers/User/Payment/PaytmController.php | 14037 bytes | funcoes: __construct, paymentProcess, handlePaytmRequest, getAllEncdecFunc, encrypt_e, decrypt_e, pkcs5_pad_e, pkcs5_unpad_e, generateSalt_e, checkString_e, getChecksumFromArray, getChecksumFromString, verifychecksum_e, verifychecksum_eFromStr, getArray2Str, getArray2StrForVerify, redirect2PG, removeCheckSumParam, getTxnStatus, getTxnStatusNew, initiateTxnRefund, callAPI, callNewAPI, getRefundChecksumFromArray, getRefundArray2Str, callRefundAPI, paymentStatus
- app/Http/Controllers/User/Payment/PerfectMoneyController.php | 3471 bytes | funcoes: paymentProcess, successPayment
- app/Http/Controllers/User/Payment/PhonePeController.php | 3778 bytes | funcoes: paymentProcess, successPayment
- app/Http/Controllers/User/Payment/RazorpayController.php | 4350 bytes | funcoes: __construct, paymentProcess, successPayment
- app/Http/Controllers/User/Payment/StripeController.php | 2536 bytes | funcoes: __construct, paymentProcess
- app/Http/Controllers/User/Payment/ToyyibpayController.php | 3909 bytes | funcoes: paymentProcess, successPayment
- app/Http/Controllers/User/Payment/XenditController.php | 3421 bytes | funcoes: paymentProcess, successPayment
- app/Http/Controllers/User/Payment/YocoController.php | 3044 bytes | funcoes: paymentProcess, successPayment
- app/Http/Controllers/User/PaymentLogController.php | 740 bytes | funcoes: index
- app/Http/Controllers/User/PluginController.php | 3896 bytes | funcoes: plugins, updategooglelogin, updateWhatsapp, updateTawkTo, updateDisqus, updateGoogleAnalytics, updateRecaptcha, updatePixel
- app/Http/Controllers/User/PremiumAppearanceController.php | 25837 bytes | funcoes: ensurePremium, defaults, presets, index, update, preview, applyPreset
- app/Http/Controllers/User/QrController.php | 9172 bytes | funcoes: index, qrCode, generate, save, clear, clearFilters, delete, bulkDelete
- app/Http/Controllers/User/RegisterCustomerController.php | 5118 bytes | funcoes: index, view, store, emailStatus, userban, changePass, updatePassword, delete, bulkDelete, secret_login
- app/Http/Controllers/User/ShopSettingController.php | 2968 bytes | funcoes: index, store, update, delete
- app/Http/Controllers/User/SocialController.php | 2345 bytes | funcoes: index, store, edit, update, delete
- app/Http/Controllers/User/StaticHeroSectionController.php | 2302 bytes | funcoes: index, update
- app/Http/Controllers/User/SubdomainController.php | 449 bytes | funcoes: subdomain
- app/Http/Controllers/User/SubscriberController.php | 4891 bytes | funcoes: index, Usersubscribe, mailsubscriber, getMailInformation, storeMailInformation, subscsendmail, delete, bulkDelete
- app/Http/Controllers/User/TabSectionController.php | 6928 bytes | funcoes: index, store, update, feature, delete, bulkDelete, products, productsStore
- app/Http/Controllers/User/TestimonialController.php | 7089 bytes | funcoes: index, store, edit, update, delete, bulkDelete
- app/Http/Controllers/User/ThemePremiumController.php | 5416 bytes | funcoes: index, save, publish, versions, rollback
- app/Http/Controllers/User/UlinkSectionController.php | 2443 bytes | funcoes: index, store, update, delete
- app/Http/Controllers/User/UserCheckoutController.php | 19667 bytes | funcoes: checkout, store
- app/Http/Controllers/User/UserController.php | 7964 bytes | funcoes: __construct, index, status, profile, profileupdate, changePass, updatePassword, billingupdate, changeTheme
- app/Http/Controllers/User/VariantController.php | 14305 bytes | funcoes: index, create, get_subcategory, store, edit, update, saveVariantOptionContent, delete, bulk_delete, delete_option, getValidation
- app/Http/Controllers/UserFront/CheckoutController.php | 26915 bytes | funcoes: checkout, store, storeEmailTemplate, offlineSuccess, trialSuccess
- app/Http/Controllers/UserFront/CustomerController.php | 30080 bytes | funcoes: __construct, login, redirectToGoogle, handleGoogleCallback, authUserViaProvider, loginSubmit, forgetPassword, sendMail, resetPassword, resetPasswordSubmit, signup, signupSubmit, sendVerificationMail, signupVerify, redirectToDashboard, editProfile, updateProfile, slider, changePassword, updatePassword, logoutSubmit, shippingdetails, shippingupdate, billingdetails, billingupdate, customerOrders, customerWishlist, removefromWish, orderdetails, onlineSuccess
- app/Http/Controllers/UserFront/FrontendController.php | 14836 bytes | funcoes: __construct, index, subscribe, checkUsername, step1, step2, checkout, pricing, blogs, blogdetails, contactView, faqs, dynamicPage, paymentInstruction, contactMessage, adminContactMessage, changeLanguage, changeUserLanguage
- app/Http/Controllers/UserFront/HomeController.php | 28302 bytes | funcoes: userDetailView, checkCurrentUser, changeUserLanguage, changeUserCurrency, invoice, contactView, contactMessage, faqs, userBlogs, userBlogDetail, userAbout, removeMaintenance
- app/Http/Controllers/UserFront/ItemController.php | 24125 bytes | funcoes: cart, addToCart, addToWishlist, removeToWishlist, cartitemremove, updatecart, checkout_process, checkout, checkoutGuest, coupon, compare, addToCompare, compareitemremove, cartDropdown, cartDropdownCount, compareCount, wishlistCount
- app/Http/Controllers/UserFront/PushController.php | 883 bytes | funcoes: store
- app/Http/Controllers/UserFront/ReviewController.php | 2845 bytes | funcoes: __construct, reviewsubmit, authcheck
- app/Http/Controllers/UserFront/ShopController.php | 21972 bytes | funcoes: Shop, ShopSearch, shop_type, get_variation, get_productVariation, productDetails, productDetailsQuickview
- app/Http/Controllers/UserFront/ThemeStorefrontController.php | 12162 bytes | funcoes: resolve, currentLangId, categoriesForUser, mapProduct, home, products, productDetail, cart, checkout
- app/Http/Controllers/UserFront/UsercheckoutController.php | 22695 bytes | funcoes: checkout, paymentInstruction, offlineSuccess, cancelPayment

## Arquivos de models
- app/Models/AdditionalSection.php | 425 bytes | funcoes: page_content
- app/Models/AdditionalSectionContent.php | 326 bytes | funcoes: nenhuma detectada
- app/Models/Admin.php | 545 bytes | funcoes: role
- app/Models/Admin/Heading.php | 213 bytes | funcoes: nenhuma detectada
- app/Models/Admin/ImageText.php | 186 bytes | funcoes: nenhuma detectada
- app/Models/Admin/UserCategory.php | 218 bytes | funcoes: nenhuma detectada
- app/Models/BasicExtended.php | 297 bytes | funcoes: language
- app/Models/BasicSetting.php | 1353 bytes | funcoes: language
- app/Models/Bcategory.php | 337 bytes | funcoes: blogs
- app/Models/Blog.php | 550 bytes | funcoes: bcategory, language
- app/Models/CounterInformation.php | 315 bytes | funcoes: nenhuma detectada
- app/Models/CounterSection.php | 293 bytes | funcoes: nenhuma detectada
- app/Models/Customer.php | 2706 bytes | funcoes: sendPasswordResetNotification, user
- app/Models/CustomerWishList.php | 373 bytes | funcoes: item
- app/Models/EmailTemplate.php | 290 bytes | funcoes: nenhuma detectada
- app/Models/Faq.php | 131 bytes | funcoes: nenhuma detectada
- app/Models/Feature.php | 354 bytes | funcoes: language
- app/Models/Guest.php | 626 bytes | funcoes: pushSubscriptionBelongsToUser
- app/Models/Language.php | 1695 bytes | funcoes: basic_setting, basic_extended, seo, menus, features, testimonials, partners, ulinks, pages, faqs, bcategories, processes, blogs, popups, pageName
- app/Models/Membership.php | 868 bytes | funcoes: user, package
- app/Models/Menu.php | 251 bytes | funcoes: language
- app/Models/OfflineGateway.php | 310 bytes | funcoes: nenhuma detectada
- app/Models/Package.php | 720 bytes | funcoes: memberships
- app/Models/Page.php | 196 bytes | funcoes: language
- app/Models/Partner.php | 231 bytes | funcoes: language
- app/Models/PaymentGateway.php | 873 bytes | funcoes: convertAutoData, getAutoDataText, showKeyword, showForm
- app/Models/Popup.php | 176 bytes | funcoes: nenhuma detectada
- app/Models/Process.php | 306 bytes | funcoes: language
- app/Models/Role.php | 247 bytes | funcoes: admins
- app/Models/Seo.php | 965 bytes | funcoes: nenhuma detectada
- app/Models/Sitemap.php | 196 bytes | funcoes: nenhuma detectada
- app/Models/Social.php | 134 bytes | funcoes: nenhuma detectada
- app/Models/Subscriber.php | 138 bytes | funcoes: nenhuma detectada
- app/Models/Testimonial.php | 394 bytes | funcoes: language
- app/Models/Timezone.php | 316 bytes | funcoes: nenhuma detectada
- app/Models/Ulink.php | 292 bytes | funcoes: language
- app/Models/User.php | 6354 bytes | funcoes: banners, category_variations, contacts, faqs, footers, headers, hero_sliders, item_categories, item_sub_categories, menus, sections, seos, sub_category_variations, tabs, items, itemContent, orderContents, orders, memberships, user_custom_domains, permissions, basic_setting, achievements, services, testimonials, blogs, blog_categories, social_media, permission, languages, sendPasswordResetNotification, custom_domains, cvs, qr_codes, custome_page
- app/Models/User/AboutUs.php | 399 bytes | funcoes: nenhuma detectada
- app/Models/User/AboutUsFeatures.php | 431 bytes | funcoes: nenhuma detectada
- app/Models/User/AdditionalSection.php | 511 bytes | funcoes: page_content
- app/Models/User/AdditionalSectionContent.php | 392 bytes | funcoes: nenhuma detectada
- app/Models/User/Banner.php | 559 bytes | funcoes: brandLang
- app/Models/User/BasicExtende.php | 349 bytes | funcoes: language
- app/Models/User/BasicSetting.php | 757 bytes | funcoes: language, appearance
- app/Models/User/Blog.php | 506 bytes | funcoes: user, blogContent
- app/Models/User/BlogCategory.php | 402 bytes | funcoes: language
- app/Models/User/BlogContent.php | 767 bytes | funcoes: blog, category, language
- app/Models/User/CallToAction.php | 440 bytes | funcoes: nenhuma detectada
- app/Models/User/ContactMessage.php | 289 bytes | funcoes: nenhuma detectada
- app/Models/User/CounterInformation.php | 391 bytes | funcoes: nenhuma detectada
- app/Models/User/CounterSection.php | 366 bytes | funcoes: nenhuma detectada
- app/Models/User/Faq.php | 172 bytes | funcoes: nenhuma detectada
- app/Models/User/HeroSlider.php | 680 bytes | funcoes: sliderVersionLang
- app/Models/User/HowitWorkSection.php | 368 bytes | funcoes: nenhuma detectada
- app/Models/User/Label.php | 309 bytes | funcoes: nenhuma detectada
- app/Models/User/Language.php | 2588 bytes | funcoes: pageName, itemInfo, banners, category_variations, contacts, faqs, footers, headers, hero_sliders, item_categories, item_sub_categories, menus, sections, seos, sub_category_variations, tabs, testimonials, blogs, blog_categories
- app/Models/User/ProductHeroSlider.php | 319 bytes | funcoes: nenhuma detectada
- app/Models/User/ProductVariantOption.php | 337 bytes | funcoes: nenhuma detectada
- app/Models/User/ProductVariantOptionContent.php | 511 bytes | funcoes: option_content
- app/Models/User/ProductVariation.php | 285 bytes | funcoes: nenhuma detectada
- app/Models/User/ProductVariationContent.php | 687 bytes | funcoes: variation, variation_option
- app/Models/User/SEO.php | 1026 bytes | funcoes: nenhuma detectada
- app/Models/User/Social.php | 281 bytes | funcoes: nenhuma detectada
- app/Models/User/StaticHeroSection.php | 403 bytes | funcoes: nenhuma detectada
- app/Models/User/Tab.php | 675 bytes | funcoes: items, subcategories, language
- app/Models/User/Testimonial.php | 426 bytes | funcoes: nenhuma detectada
- app/Models/User/UserAppearanceSetting.php | 351 bytes | funcoes: nenhuma detectada
- app/Models/User/UserCategoryVariation.php | 329 bytes | funcoes: category
- app/Models/User/UserContact.php | 647 bytes | funcoes: language
- app/Models/User/UserCoupon.php | 494 bytes | funcoes: currency
- app/Models/User/UserCurrency.php | 248 bytes | funcoes: nenhuma detectada
- app/Models/User/UserCustomDomain.php | 280 bytes | funcoes: user
- app/Models/User/UserCvSection.php | 287 bytes | funcoes: user_cv
- app/Models/User/UserEmailTemplate.php | 278 bytes | funcoes: nenhuma detectada
- app/Models/User/UserFeature.php | 339 bytes | funcoes: nenhuma detectada
- app/Models/User/UserFooter.php | 350 bytes | funcoes: language
- app/Models/User/UserHeader.php | 350 bytes | funcoes: language
- app/Models/User/UserHeading.php | 216 bytes | funcoes: nenhuma detectada
- app/Models/User/UserItem.php | 695 bytes | funcoes: itemContents, sliders, variations, currency
- app/Models/User/UserItemCategory.php | 870 bytes | funcoes: items, subcategories, language, variations
- app/Models/User/UserItemContent.php | 809 bytes | funcoes: item, label, category, subcategory, variations
- app/Models/User/UserItemImage.php | 353 bytes | funcoes: item
- app/Models/User/UserItemReview.php | 403 bytes | funcoes: customer
- app/Models/User/UserItemSubCategory.php | 767 bytes | funcoes: category, items, variations
- app/Models/User/UserItemVariation.php | 328 bytes | funcoes: itemContenet
- app/Models/User/UserMenu.php | 380 bytes | funcoes: user
- app/Models/User/UserNewsletterSubscriber.php | 248 bytes | funcoes: nenhuma detectada
- app/Models/User/UserOfflineGateway.php | 336 bytes | funcoes: nenhuma detectada
- app/Models/User/UserOrder.php | 551 bytes | funcoes: orderitems, currency, customer
- app/Models/User/UserOrderItem.php | 279 bytes | funcoes: item
- app/Models/User/UserPage.php | 520 bytes | funcoes: language, user
- app/Models/User/UserPageContent.php | 266 bytes | funcoes: nenhuma detectada
- app/Models/User/UserPaymentGeteway.php | 469 bytes | funcoes: convertAutoData
- app/Models/User/UserPermission.php | 253 bytes | funcoes: nenhuma detectada
- app/Models/User/UserQrCode.php | 186 bytes | funcoes: nenhuma detectada
- app/Models/User/UserSection.php | 286 bytes | funcoes: language
- app/Models/User/UserService.php | 509 bytes | funcoes: language
- app/Models/User/UserShippingCharge.php | 442 bytes | funcoes: currency
- app/Models/User/UserShopSetting.php | 221 bytes | funcoes: nenhuma detectada
- app/Models/User/UserSubCategoryVariation.php | 338 bytes | funcoes: subcategory
- app/Models/User/UserUlink.php | 357 bytes | funcoes: language
- app/Models/UserThemeState.php | 431 bytes | funcoes: nenhuma detectada
- app/Models/UserThemeVersion.php | 368 bytes | funcoes: nenhuma detectada
- app/Models/Variant.php | 426 bytes | funcoes: variantContents, variantOptions
- app/Models/VariantContent.php | 800 bytes | funcoes: category, sub_category, variant_options
- app/Models/VariantOption.php | 546 bytes | funcoes: variant_options_content, variantOptionContents
- app/Models/VariantOptionContent.php | 340 bytes | funcoes: nenhuma detectada

## Arquivos resources/js
- resources/js/app.js | 24 bytes
- resources/js/bootstrap.js | 869 bytes
- resources/js/inertia/Pages/User/PremiumAppearance/Editor.tsx | 1649 bytes

## Observacao de inventario total
- Arquivo RELATORIO_INVENTARIO_COMPLETO.tsv contem TODOS os arquivos com: caminho, tamanho, data modificacao UTC e hash SHA1.
