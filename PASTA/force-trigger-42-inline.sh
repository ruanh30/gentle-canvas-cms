#!/bin/bash
set -e
cd ~/domains/flashloja.com.br/public_html
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user/partials/top-navbar.blade.php')
s=p.read_text(encoding='utf-8')
old='class="fl-sidebar-trigger fl-trigger-shadcn" data-sidebar="trigger" aria-label="Menu" onclick="window.flToggleSidebar();return false;"'
new='class="fl-sidebar-trigger fl-trigger-shadcn" data-sidebar="trigger" aria-label="Menu" onclick="window.flToggleSidebar();return false;" style="display:inline-flex !important;align-items:center !important;justify-content:center !important;width:42px !important;height:42px !important;min-width:42px !important;min-height:42px !important;padding:0 !important;border:0 !important;border-radius:12px !important;line-height:1 !important;"'
if old in s:
    s=s.replace(old,new)
    print('inline style injected')
else:
    print('pattern not found')
p.write_text(s,encoding='utf-8')
PY

cat >> public/assets/admin/css/flashloja-dashboard.css <<'CSS'

/* Hard force 42x42 above any Atlantis rule */
header.fl-topbar > .fl-sidebar-trigger.fl-trigger-shadcn,
header.fl-topbar > button.fl-sidebar-trigger.fl-trigger-shadcn,
.fl-topbar .fl-sidebar-trigger.fl-trigger-shadcn{
  display: inline-flex !important;
  width: 42px !important;
  height: 42px !important;
  min-width: 42px !important;
  min-height: 42px !important;
  padding: 0 !important;
  line-height: 1 !important;
  border: 0 !important;
  border-radius: 12px !important;
}
.fl-topbar .fl-sidebar-trigger.fl-trigger-shadcn svg{
  width: 20px !important;
  height: 20px !important;
}
CSS

php artisan view:clear >/dev/null 2>&1 || true
php artisan optimize:clear >/dev/null 2>&1 || true
echo done
