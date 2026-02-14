#!/bin/bash
set -e
cd ~/domains/flashloja.com.br/public_html
cp -a resources/views/user/partials/side-navbar.blade.php.bak.20260211_012905 resources/views/user/partials/side-navbar.blade.php
php artisan view:clear >/dev/null 2>&1 || true
php artisan optimize:clear >/dev/null 2>&1 || true
echo "rolled back side-navbar"
