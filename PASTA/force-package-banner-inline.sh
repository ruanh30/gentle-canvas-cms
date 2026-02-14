#!/bin/bash
set -e
cd ~/domains/flashloja.com.br/public_html
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user/dashboard.blade.php')
s=p.read_text(encoding='utf-8')
count_before = s.count('alert border-left border-primary text-dark')
s = s.replace('alert border-left border-primary text-dark', 'alert border-left border-primary text-dark fl-package-banner')
count_after = s.count('fl-package-banner')
p.write_text(s, encoding='utf-8')
print('before=',count_before,'after=',count_after)
PY

cat >> public/assets/admin/css/flashloja-dashboard.css <<'CSS'

/* Absolute force: package banner exact color */
.alert.border-left.border-primary.text-dark.fl-package-banner,
.alert.border-left.border-primary.text-dark.fl-package-banner *{
  color: #0f172a !important;
}
.alert.border-left.border-primary.text-dark.fl-package-banner{
  background-color: #E9F1F7 !important;
  background: #E9F1F7 !important;
  border: 1px solid #c6ddef !important;
  border-left: 1px solid #c6ddef !important;
  box-shadow: none !important;
}
CSS

php artisan view:clear >/dev/null 2>&1 || true
php artisan optimize:clear >/dev/null 2>&1 || true
echo done
