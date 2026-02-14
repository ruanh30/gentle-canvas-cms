#!/bin/bash
set -e
cd ~/domains/flashloja.com.br/public_html
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user/partials/side-navbar.blade.php')
s=p.read_text(encoding='utf-8')
markers=['{{-- Orders --}}','{{-- Products --}}','{{-- Categories --}}','{{-- Subcategories --}}','{{-- Labels --}}']
for m in markers:
    idx=s.find(m)
    if idx==-1:
      continue
    li_idx=s.find('<li class="nav-item', idx)
    if li_idx==-1:
      continue
    chunk=s[li_idx:li_idx+180]
    if 'fl-loja-item' in chunk:
      continue
    s=s[:li_idx+len('<li class="')] + 'fl-loja-item ' + s[li_idx+len('<li class="'):]
p.write_text(s,encoding='utf-8')
print('side-navbar patched')
PY

cat >> public/assets/admin/css/flashloja-dashboard.css <<'CSS'

/* Requested: Loja option names 20px to the left */
body.fl-dashboard-body .fl-sidebar .fl-loja-item > a p{
  transform: translateX(-20px) !important;
}
CSS

php artisan view:clear >/dev/null 2>&1 || true
php artisan optimize:clear >/dev/null 2>&1 || true
echo "done"
