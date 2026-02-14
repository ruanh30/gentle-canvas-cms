#!/bin/bash
set -e
cd ~/domains/flashloja.com.br/public_html
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user/dashboard.blade.php')
s=p.read_text(encoding='utf-8')
new='<div class="alert border-left border-primary text-dark fl-package-banner" style="background:#E9F1F7 !important;background-color:#E9F1F7 !important;border:1px solid #c6ddef !important;border-left:1px solid #c6ddef !important;">'
if '<div class="alert border-left border-primary text-dark fl-package-banner fl-package-banner">' in s:
    s=s.replace('<div class="alert border-left border-primary text-dark fl-package-banner fl-package-banner">', new, 1)
elif '<div class="alert border-left border-primary text-dark fl-package-banner">' in s:
    s=s.replace('<div class="alert border-left border-primary text-dark fl-package-banner">', new, 1)
elif '<div class="alert border-left border-primary text-dark">' in s:
    s=s.replace('<div class="alert border-left border-primary text-dark">', new, 1)
else:
    print('target div not found')
p.write_text(s,encoding='utf-8')
print('patched inline banner style')
PY
php artisan view:clear >/dev/null 2>&1 || true
php artisan optimize:clear >/dev/null 2>&1 || true
echo done
