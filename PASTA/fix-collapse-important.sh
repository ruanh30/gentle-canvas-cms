#!/bin/bash
set -e
cd ~/domains/flashloja.com.br/public_html
python3 - <<'PY'
from pathlib import Path
p=Path('resources/views/user/partials/scripts.blade.php')
s=p.read_text(encoding='utf-8')
old = """    if(on){
      sb.style.width='64px';
      sb.style.minWidth='64px';
      sb.style.maxWidth='64px';
      sb.style.flex='0 0 64px';
    }else{
      sb.style.width='260px';
      sb.style.minWidth='260px';
      sb.style.maxWidth='260px';
      sb.style.flex='0 0 260px';
    }"""
new = """    if(on){
      sb.style.setProperty('width','64px','important');
      sb.style.setProperty('min-width','64px','important');
      sb.style.setProperty('max-width','64px','important');
      sb.style.setProperty('flex','0 0 64px','important');
    }else{
      sb.style.setProperty('width','260px','important');
      sb.style.setProperty('min-width','260px','important');
      sb.style.setProperty('max-width','260px','important');
      sb.style.setProperty('flex','0 0 260px','important');
    }"""
if old in s:
    s=s.replace(old,new)
    print('replaced block')
else:
    print('block not found, appending fallback script')
    s += """
<script>
(function(){
  function forceSidebarWidth(){
    var sb=document.querySelector('.fl-sidebar');
    if(!sb) return;
    if(document.body.classList.contains('fl-sidebar-collapsed')){
      sb.style.setProperty('width','64px','important');
      sb.style.setProperty('min-width','64px','important');
      sb.style.setProperty('max-width','64px','important');
      sb.style.setProperty('flex','0 0 64px','important');
    } else {
      sb.style.setProperty('width','260px','important');
      sb.style.setProperty('min-width','260px','important');
      sb.style.setProperty('max-width','260px','important');
      sb.style.setProperty('flex','0 0 260px','important');
    }
  }
  document.addEventListener('DOMContentLoaded', forceSidebarWidth);
  window.addEventListener('resize', forceSidebarWidth);
})();
</script>
"""
p.write_text(s,encoding='utf-8')
PY
php artisan view:clear >/dev/null 2>&1 || true
php artisan optimize:clear >/dev/null 2>&1 || true
echo done
