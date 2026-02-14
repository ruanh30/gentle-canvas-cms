#!/bin/bash
cd ~/domains/flashloja.com.br/public_html
# Touch the file to bust OPcache
touch resources/views/user/partials/styles.blade.php
# Also try via artisan
php artisan optimize:clear 2>&1
# Verify
grep 'flashloja-dashboard' resources/views/user/partials/styles.blade.php
echo "---"
# Check if file is accessible
curl -sI "https://flashloja.com.br/assets/admin/css/flashloja-dashboard.css" | head -5
