#!/bin/bash
set -e
cd ~/domains/flashloja.com.br/public_html
CSS=public/assets/admin/css/flashloja-dashboard.css

cat >> "$CSS" <<'CSSAPP'

/* FORCE theme toggle to match reference (high specificity override) */
body.fl-dashboard-body .fl-topbar .fl-theme-toggle{
  display:inline-flex !important;
  align-items:center !important;
  justify-content:flex-start !important;
  height:32px !important;
  width:56px !important;
  padding:4px !important;
  border-radius:999px !important;
  border:1px solid hsl(var(--border)) !important;
  background: hsl(var(--secondary)) !important;
  box-shadow: none !important;
}
body.fl-dashboard-body .fl-topbar .fl-theme-toggle .fl-theme-toggle-knob{
  display:inline-flex !important;
  align-items:center !important;
  justify-content:center !important;
  width:24px !important;
  height:24px !important;
  border-radius:999px !important;
  background: hsl(var(--primary)) !important;
  color: hsl(var(--primary-foreground)) !important;
}
body.fl-dashboard-body .fl-topbar .fl-theme-toggle .fl-theme-toggle-knob svg{
  width:14px !important;
  height:14px !important;
}
CSSAPP

php artisan view:clear >/dev/null 2>&1 || true
php artisan optimize:clear >/dev/null 2>&1 || true
echo "done"
