#!/bin/bash
set -e
cd ~/domains/flashloja.com.br/public_html

cat >> resources/views/user/partials/scripts.blade.php <<'JS'

<script>
// FlashLoja: robust sidebar toggle (delegated, conflict-proof)
(function(){
  if (window.__flSidebarDelegatedBound) return;
  window.__flSidebarDelegatedBound = true;

  function applySidebarInline(on){
    var sb = document.querySelector('.fl-sidebar');
    if(!sb) return;
    if(on){
      sb.style.setProperty('width','64px','important');
      sb.style.setProperty('min-width','64px','important');
      sb.style.setProperty('max-width','64px','important');
      sb.style.setProperty('flex','0 0 64px','important');
    }else{
      sb.style.setProperty('width','260px','important');
      sb.style.setProperty('min-width','260px','important');
      sb.style.setProperty('max-width','260px','important');
      sb.style.setProperty('flex','0 0 260px','important');
    }
  }

  function setCollapsed(on){
    var collapsed = !!on;
    document.body.classList.toggle('fl-sidebar-collapsed', collapsed);
    applySidebarInline(collapsed);
    try { localStorage.setItem('flSidebarCollapsed', collapsed ? '1' : '0'); } catch(e) {}
  }

  window.flToggleSidebar = function(){
    setCollapsed(!document.body.classList.contains('fl-sidebar-collapsed'));
  };

  document.addEventListener('DOMContentLoaded', function(){
    var saved = '0';
    try { saved = localStorage.getItem('flSidebarCollapsed') || '0'; } catch(e) {}
    setCollapsed(saved === '1');
  });

  document.addEventListener('click', function(ev){
    var btn = ev.target && ev.target.closest ? ev.target.closest('.fl-sidebar-trigger') : null;
    if(!btn) return;
    ev.preventDefault();
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    window.flToggleSidebar();
  }, true);
})();
</script>
JS

python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user/partials/top-navbar.blade.php')
s=p.read_text(encoding='utf-8')
if 'fl-sidebar-trigger' in s and 'onclick="window.flToggleSidebar();return false;"' not in s:
    s=s.replace('class="btn btn-toggle fl-sidebar-trigger"', 'class="btn btn-toggle fl-sidebar-trigger" onclick="window.flToggleSidebar();return false;"')
p.write_text(s,encoding='utf-8')
print('top navbar patched')
PY

php artisan view:clear >/dev/null 2>&1 || true
php artisan optimize:clear >/dev/null 2>&1 || true
echo done
