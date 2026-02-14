#!/bin/bash
FILE=/home/u324811576/domains/flashloja.com.br/public_html/public/assets/admin/css/flashloja-dashboard.css

# Add overflow hidden to fl-main to prevent content bleeding behind sidebar
cat >> "$FILE" << 'CSS'

/* Fix content bleeding behind sidebar */
.fl-main {
  overflow: hidden;
}
CSS

echo "done"
cd ~/domains/flashloja.com.br/public_html && php artisan view:clear 2>&1
