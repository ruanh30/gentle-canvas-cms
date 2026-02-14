#!/bin/bash
cd ~/domains/flashloja.com.br/public_html

# Backup originals
cp public/assets/admin/css/flashloja-dashboard.css public/assets/admin/css/flashloja-dashboard.css.bak.$(date +%s)
cp resources/views/user/partials/side-navbar.blade.php resources/views/user/partials/side-navbar.blade.php.bak.$(date +%s)
cp resources/views/user/partials/top-navbar.blade.php resources/views/user/partials/top-navbar.blade.php.bak.$(date +%s)

# Copy new files
cp ~/flashloja-dashboard.css public/assets/admin/css/flashloja-dashboard.css
cp ~/side-navbar.blade.php resources/views/user/partials/side-navbar.blade.php
cp ~/top-navbar.blade.php resources/views/user/partials/top-navbar.blade.php

# Clear cache
php artisan view:clear
php artisan optimize:clear

echo "DEPLOY DONE"
