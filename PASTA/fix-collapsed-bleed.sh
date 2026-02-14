#!/bin/bash
cd ~/domains/flashloja.com.br/public_html
cat >> public/assets/admin/css/flashloja-dashboard.css <<'CSS'

/* Collapsed rail cleanup: hide any text bleed */
body.fl-dashboard-body.fl-sidebar-collapsed .fl-sidebar{
  overflow: hidden !important;
}
body.fl-dashboard-body.fl-sidebar-collapsed .fl-sidebar *{
  white-space: nowrap;
}
body.fl-dashboard-body.fl-sidebar-collapsed .fl-sidebar .sidebar-content,
body.fl-dashboard-body.fl-sidebar-collapsed .fl-sidebar .sidebar-wrapper{
  overflow: hidden !important;
}
body.fl-dashboard-body.fl-sidebar-collapsed .fl-sidebar .nav.nav-primary > .nav-item > a{
  overflow: hidden !important;
}
CSS
php artisan view:clear >/dev/null 2>&1 || true
php artisan optimize:clear >/dev/null 2>&1 || true
echo done
