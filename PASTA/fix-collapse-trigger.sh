#!/bin/bash
set -e
cd ~/domains/flashloja.com.br/public_html
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user/partials/top-navbar.blade.php')
s=p.read_text(encoding='utf-8')
s=s.replace('btn btn-toggle toggle-sidebar','btn btn-toggle fl-sidebar-trigger')
p.write_text(s,encoding='utf-8')

p2=Path('resources/views/user/partials/scripts.blade.php')
ss=p2.read_text(encoding='utf-8')
ss=ss.replace("document.querySelector('.toggle-sidebar')", "document.querySelector('.fl-sidebar-trigger')")
p2.write_text(ss,encoding='utf-8')
print('patched files')
PY

cat >> public/assets/admin/css/flashloja-dashboard.css <<'CSS'

/* trigger button class update */
body.fl-dashboard-body .fl-topbar .btn.btn-toggle.fl-sidebar-trigger{
  display:inline-flex !important;
  align-items:center !important;
  justify-content:center !important;
  width:28px !important;
  height:28px !important;
  border-radius:6px !important;
  border:0 !important;
  background: transparent !important;
  color: hsl(var(--foreground)) !important;
  padding:0 !important;
}

/* collapsed mode should mimic lovable: only icon rail */
body.fl-dashboard-body.fl-sidebar-collapsed .fl-sidebar .fl-section-label{
  display:none !important;
}
body.fl-dashboard-body.fl-sidebar-collapsed .fl-sidebar .nav.nav-primary > .nav-item{
  margin: 8px 0 !important;
}
body.fl-dashboard-body.fl-sidebar-collapsed .fl-sidebar .nav.nav-primary > .nav-item > a{
  width:40px !important;
  height:40px !important;
  min-height:40px !important;
  margin: 0 auto !important;
  border-radius:10px !important;
  padding:0 !important;
  justify-content:center !important;
  align-items:center !important;
}
body.fl-dashboard-body.fl-sidebar-collapsed .fl-sidebar .nav.nav-primary > .nav-item.active > a{
  background: hsl(var(--primary) / 0.10) !important;
}
CSS

php artisan view:clear >/dev/null 2>&1 || true
php artisan optimize:clear >/dev/null 2>&1 || true
echo done
