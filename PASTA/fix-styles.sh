#!/bin/bash
FILE="domains/flashloja.com.br/public_html/resources/views/user/partials/styles.blade.php"
# Add flashloja-dashboard.css after atlantis.css line
sed -i '/atlantis\.css/a <link rel="stylesheet" href="{{ asset('\''assets\/admin\/css\/flashloja-dashboard.css'\'') }}">' "$FILE"
echo "done"
grep -n 'flashloja-dashboard' "$FILE"
