#!/bin/bash
set -e
cd ~/domains/flashloja.com.br/public_html
python3 - <<'PY'
from pathlib import Path
p = Path('resources/views/user/dashboard.blade.php')
s = p.read_text(encoding='utf-8')
old = '''<div class="icon-big text-center">
                  <i data-lucide="package" class="fl-icon"></i>
                </div>'''
new = '''<div class="icon-big text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package w-4 h-4 text-primary opacity-60 group-hover:opacity-100 transition-opacity"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"></path><path d="m7.5 4.27 9 5.15"></path></svg>
                </div>'''
if old in s:
    s = s.replace(old, new, 1)
    print('package KPI icon swapped')
else:
    print('target block not found')
p.write_text(s, encoding='utf-8')
PY
php artisan view:clear >/dev/null 2>&1 || true
php artisan optimize:clear >/dev/null 2>&1 || true
echo done
