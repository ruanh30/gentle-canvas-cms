#!/bin/bash
set -e
cd ~/domains/flashloja.com.br/public_html

python3 - <<'PY'
from pathlib import Path
import re
p=Path('resources/views/user/partials/top-navbar.blade.php')
s=p.read_text(encoding='utf-8')
new_btn='''<button class="fl-sidebar-trigger fl-trigger-shadcn" data-sidebar="trigger" aria-label="Menu" onclick="window.flToggleSidebar();return false;">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left" aria-hidden="true">
    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
    <path d="M9 3v18"></path>
  </svg>
  <span class="sr-only">Toggle Sidebar</span>
</button>'''

patterns=[
  r'<button[^>]*class="[^"]*fl-sidebar-trigger[^"]*"[^>]*>.*?</button>',
  r'<button[^>]*class="[^"]*toggle-sidebar[^"]*"[^>]*>.*?</button>'
]
for pat in patterns:
    s2,n=re.subn(pat,new_btn,s,flags=re.S)
    if n>0:
        s=s2
        break
p.write_text(s,encoding='utf-8')
print('top navbar trigger normalized')
PY

cat >> public/assets/admin/css/flashloja-dashboard.css <<'CSS'

/* === FINAL: exact-like SidebarTrigger (shadcn ghost + h-7 w-7) === */
body.fl-dashboard-body .fl-topbar .fl-trigger-shadcn{
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: .5rem !important;
  white-space: nowrap !important;
  width: 1.75rem !important;   /* h-7 w-7 */
  height: 1.75rem !important;
  min-width: 1.75rem !important;
  min-height: 1.75rem !important;
  border: 0 !important;
  border-radius: 0.375rem !important; /* rounded-md */
  background: transparent !important;
  color: hsl(var(--foreground)) !important;
  font-size: .875rem !important;
  font-weight: 500 !important;
  line-height: 1 !important;
  padding: 0 !important;
  box-shadow: none !important;
  transition: color .2s ease, background-color .2s ease, box-shadow .2s ease !important;
}
body.fl-dashboard-body .fl-topbar .fl-trigger-shadcn:hover{
  background: hsl(var(--secondary)) !important; /* hover:bg-accent-ish from template theme */
  color: hsl(var(--foreground)) !important;
}
body.fl-dashboard-body .fl-topbar .fl-trigger-shadcn:focus-visible,
body.fl-dashboard-body .fl-topbar .fl-trigger-shadcn:focus{
  outline: none !important;
  box-shadow: 0 0 0 2px hsl(var(--ring)), 0 0 0 4px hsl(var(--background)) !important;
}
body.fl-dashboard-body .fl-topbar .fl-trigger-shadcn svg{
  width: 1rem !important;
  height: 1rem !important;
  pointer-events: none !important;
  flex-shrink: 0 !important;
  display: block !important;
}

/* === FINAL: lovable sidebar motion (200ms linear) === */
body.fl-dashboard-body .fl-sidebar,
body.fl-dashboard-body .fl-dashboard .fl-sidebar,
body.fl-dashboard-body .fl-main,
body.fl-dashboard-body .fl-content {
  transition: width 200ms linear, min-width 200ms linear, max-width 200ms linear, flex-basis 200ms linear, margin-left 200ms linear, padding-left 200ms linear !important;
}
CSS

cat >> resources/views/user/partials/scripts.blade.php <<'JS'

<script>
// Keep data-state like the lovable/shadcn sidebar for style parity
(function(){
  if (window.__flSidebarStateAttrBound) return;
  window.__flSidebarStateAttrBound = true;

  function syncSidebarDataState(){
    var sb = document.querySelector('.fl-sidebar');
    if (!sb) return;
    var collapsed = document.body.classList.contains('fl-sidebar-collapsed');
    sb.setAttribute('data-state', collapsed ? 'collapsed' : 'expanded');
    sb.setAttribute('data-collapsible', collapsed ? 'icon' : '');
    sb.setAttribute('data-sidebar', 'sidebar');
  }

  document.addEventListener('DOMContentLoaded', syncSidebarDataState);
  document.addEventListener('click', function(ev){
    if (ev.target && ev.target.closest && ev.target.closest('.fl-sidebar-trigger')) {
      setTimeout(syncSidebarDataState, 0);
    }
  }, true);
})();
</script>
JS

php artisan view:clear >/dev/null 2>&1 || true
php artisan optimize:clear >/dev/null 2>&1 || true

echo done
