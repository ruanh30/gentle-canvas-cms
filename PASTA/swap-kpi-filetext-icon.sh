#!/bin/bash
set -e
cd ~/domains/flashloja.com.br/public_html
python3 - <<'PY'
from pathlib import Path
p = Path('resources/views/user/dashboard.blade.php')
s = p.read_text(encoding='utf-8')
old = '''<div class="icon-big text-center">
                  <i data-lucide="file-text" class="fl-icon"></i>
                </div>'''
new = '''<div class="icon-big text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text w-4 h-4 text-primary opacity-60 group-hover:opacity-100 transition-opacity"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
                </div>'''
if old in s:
    s = s.replace(old, new, 1)
    print('file-text KPI icon swapped')
else:
    print('target block not found')
p.write_text(s, encoding='utf-8')
PY
php artisan view:clear >/dev/null 2>&1 || true
php artisan optimize:clear >/dev/null 2>&1 || true
echo done
