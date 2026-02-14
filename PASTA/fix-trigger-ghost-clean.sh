#!/bin/bash
set -e
cd ~/domains/flashloja.com.br/public_html

python3 - <<'PY'
from pathlib import Path
import re
p=Path('resources/views/user/partials/top-navbar.blade.php')
s=p.read_text(encoding='utf-8')

new_btn='''<button class="fl-sidebar-trigger" data-sidebar="trigger" aria-label="Menu" onclick="window.flToggleSidebar();return false;">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
        <path d="M9 3v18"></path>
    </svg>
    <span class="sr-only">Toggle Sidebar</span>
</button>'''

patterns=[
    r'<button[^>]*class="[^"]*fl-sidebar-trigger[^"]*"[^>]*>.*?</button>',
    r'<button[^>]*class="[^"]*toggle-sidebar[^"]*"[^>]*>.*?</button>'
]
replaced=False
for pat in patterns:
    s2,n=re.subn(pat,new_btn,s,flags=re.S)
    if n>0:
        s=s2
        replaced=True
        break

p.write_text(s,encoding='utf-8')
print('button replaced:',replaced)
PY

cat >> public/assets/admin/css/flashloja-dashboard.css <<'CSS'

/* Sidebar trigger: ghost icon button (Lovable-like) */
body.fl-dashboard-body .fl-topbar .fl-sidebar-trigger{
  display:inline-flex !important;
  align-items:center !important;
  justify-content:center !important;
  gap:8px !important;
  width:28px !important;
  height:28px !important;
  min-width:28px !important;
  min-height:28px !important;
  border:0 !important;
  border-radius:6px !important;
  background:transparent !important;
  color:hsl(var(--foreground)) !important;
  padding:0 !important;
  line-height:1 !important;
  transition: background-color .2s ease, color .2s ease, box-shadow .2s ease !important;
}
body.fl-dashboard-body .fl-topbar .fl-sidebar-trigger:hover{
  background:hsl(var(--accent, 210 40% 96.1%)) !important;
  color:hsl(var(--accent-foreground, 222.2 47.4% 11.2%)) !important;
}
body.fl-dashboard-body .fl-topbar .fl-sidebar-trigger:focus,
body.fl-dashboard-body .fl-topbar .fl-sidebar-trigger:focus-visible{
  outline:none !important;
  box-shadow:0 0 0 2px hsl(var(--ring, 215 20.2% 65.1%)) !important;
}
body.fl-dashboard-body .fl-topbar .fl-sidebar-trigger svg{
  width:16px !important;
  height:16px !important;
  display:block !important;
  pointer-events:none !important;
  flex-shrink:0 !important;
}
CSS

php artisan view:clear >/dev/null 2>&1 || true
php artisan optimize:clear >/dev/null 2>&1 || true

echo done
