#!/bin/bash
set -e
cd ~/domains/flashloja.com.br/public_html
python3 - <<'PY'
from pathlib import Path
p = Path('resources/views/user/dashboard.blade.php')
s = p.read_text(encoding='utf-8')
old = '''<div class="icon-big text-center">
                  <i data-lucide="users" class="fl-icon"></i>
                </div>'''
new = '''<div class="icon-big text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-4 h-4 text-primary opacity-60 group-hover:opacity-100 transition-opacity"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>'''
if old in s:
    s = s.replace(old, new, 1)
    print('users KPI icon swapped')
else:
    print('target block not found')
p.write_text(s, encoding='utf-8')
PY
php artisan view:clear >/dev/null 2>&1 || true
php artisan optimize:clear >/dev/null 2>&1 || true
echo done
