#!/bin/bash
set -e
cd ~/domains/flashloja.com.br/public_html
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user/dashboard.blade.php')
s=p.read_text(encoding='utf-8')
needle='alert border-left border-primary text-dark'
if needle in s:
    s=s.replace(needle, needle+' fl-package-banner', 1)
    print('class appended')
else:
    print('needle not found')
p.write_text(s,encoding='utf-8')
PY

cat >> public/assets/admin/css/flashloja-dashboard.css <<'CSS'

/* Package banner force (without depending on body class) */
.fl-package-banner,
.alert.fl-package-banner{
  background: #dbeafe !important;
  border: 1px solid #93c5fd !important;
  border-left: 1px solid #93c5fd !important;
  color: #0f172a !important;
  border-radius: 12px !important;
  box-shadow: none !important;
}
.alert.fl-package-banner .badge.badge-secondary{
  background: #bae6fd !important;
  color: #0369a1 !important;
  border: 0 !important;
}
CSS

php artisan view:clear >/dev/null 2>&1 || true
php artisan optimize:clear >/dev/null 2>&1 || true
echo done
