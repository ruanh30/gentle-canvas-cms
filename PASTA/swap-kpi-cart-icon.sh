#!/bin/bash
set -e
cd ~/domains/flashloja.com.br/public_html
python3 - <<'PY'
from pathlib import Path
p = Path('resources/views/user/dashboard.blade.php')
s = p.read_text(encoding='utf-8')
old = '''<div class="icon-big text-center">
                  <i data-lucide="shopping-cart" class="fl-icon"></i>
                </div>'''
new = '''<div class="icon-big text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart w-4 h-4 text-accent opacity-60 group-hover:opacity-100 transition-opacity"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
                </div>'''
if old in s:
    s = s.replace(old, new, 1)
    print('shopping-cart KPI icon swapped')
else:
    print('target block not found')
p.write_text(s, encoding='utf-8')
PY
php artisan view:clear >/dev/null 2>&1 || true
php artisan optimize:clear >/dev/null 2>&1 || true
echo done
