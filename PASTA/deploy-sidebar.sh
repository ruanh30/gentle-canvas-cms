#!/bin/bash
set -e
cd ~/domains/flashloja.com.br/public_html
cp -a resources/views/user/partials/side-navbar.blade.php resources/views/user/partials/side-navbar.blade.php.bak.$(date +%Y%m%d_%H%M%S)
cp -a /home/u324811576/side-navbar.new.blade.php resources/views/user/partials/side-navbar.blade.php
php artisan view:clear >/dev/null 2>&1 || true
php artisan optimize:clear >/dev/null 2>&1 || true
echo "deployed side-navbar"
