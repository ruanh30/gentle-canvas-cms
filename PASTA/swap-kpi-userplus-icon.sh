#!/bin/bash
set -e
cd ~/domains/flashloja.com.br/public_html
python3 - <<'PY'
from pathlib import Path
p = Path('resources/views/user/dashboard.blade.php')
s = p.read_text(encoding='utf-8')
old = '''<div class="icon-big text-center">
                  <i data-lucide="user-plus" class="fl-icon"></i>
                </div>'''
new = '''<div class="icon-big text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus w-4 h-4 text-accent opacity-60 group-hover:opacity-100 transition-opacity"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg>
                </div>'''
if old in s:
    s = s.replace(old, new, 1)
    print('user-plus KPI icon swapped')
else:
    print('target block not found')
p.write_text(s, encoding='utf-8')
PY
php artisan view:clear >/dev/null 2>&1 || true
php artisan optimize:clear >/dev/null 2>&1 || true
echo done
