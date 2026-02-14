#!/bin/bash
set -e
cd ~/domains/flashloja.com.br/public_html
python3 - <<'PY'
from pathlib import Path
import re
p=Path('resources/views/user/partials/top-navbar.blade.php')
s=p.read_text(encoding='utf-8')

new_btn = '''<button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-7 w-7 fl-sidebar-trigger" data-sidebar="trigger" aria-label="Menu" onclick="window.flToggleSidebar();return false;">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M9 3v18"></path></svg>
    <span class="sr-only">Toggle Sidebar</span>
</button>'''

# Replace old trigger button block
patterns = [
    r'<button[^>]*class="[^"]*fl-sidebar-trigger[^"]*"[^>]*>.*?</button>',
    r'<button[^>]*class="[^"]*toggle-sidebar[^"]*"[^>]*>.*?</button>'
]
replaced=False
for pat in patterns:
    ns, n = re.subn(pat, new_btn, s, flags=re.S)
    if n>0:
        s=ns
        replaced=True
        break

if not replaced:
    # fallback: insert near navbar header if not found
    marker = '<div class="nav-toggle">'
    if marker in s:
        s = s.replace(marker, marker + '\n' + new_btn + '\n', 1)
        replaced=True

p.write_text(s, encoding='utf-8')
print('patched top-navbar:', replaced)
PY
php artisan view:clear >/dev/null 2>&1 || true
php artisan optimize:clear >/dev/null 2>&1 || true
echo done
