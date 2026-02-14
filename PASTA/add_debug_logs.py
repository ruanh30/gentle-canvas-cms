#!/usr/bin/env python3
"""Add debug logging to both editor sendToPreview and iframe listener, then clear caches."""

# 1. Add debug log to editor's sendToPreview in premium.blade.php
editor_path = '/home/u324811576/domains/flashloja.com.br/public_html/resources/views/user/appearance/premium.blade.php'
with open(editor_path, 'r') as f:
    editor = f.read()

old_send = """  function sendToPreview() {
    const iframe = document.getElementById('previewIframe');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type:'theme-preview-update', theme:settings }, '*');
    }
  }"""

new_send = """  function sendToPreview() {
    const iframe = document.getElementById('previewIframe');
    if (iframe && iframe.contentWindow) {
      console.log('[PE-EDITOR] sendToPreview → announcement:', JSON.stringify(settings.header?.announcement || 'N/A'));
      iframe.contentWindow.postMessage({ type:'theme-preview-update', theme:settings }, '*');
    }
  }"""

if old_send in editor:
    editor = editor.replace(old_send, new_send)
    with open(editor_path, 'w') as f:
        f.write(editor)
    print('EDITOR: Added debug log to sendToPreview')
else:
    print('EDITOR: sendToPreview pattern not found (may already be modified)')
    # Try to find it
    idx = editor.find('function sendToPreview')
    if idx >= 0:
        print(f'  Found at position {idx}')
        print(f'  Context: {editor[idx:idx+200]}')

# 2. Add debug log to iframe listener in layout.blade.php
layout_path = '/home/u324811576/domains/flashloja.com.br/public_html/resources/views/user-front/layout.blade.php'
with open(layout_path, 'r') as f:
    layout = f.read()

old_listener_start = "      if (!e.data || e.data.type !== 'theme-preview-update') return;"
new_listener_start = """      if (!e.data || e.data.type !== 'theme-preview-update') return;
      console.log('[PM-PREVIEW] Received theme update, announcement:', JSON.stringify((e.data.theme?.header?.announcement || 'N/A')));"""

if old_listener_start in layout:
    layout = layout.replace(old_listener_start, new_listener_start, 1)
    with open(layout_path, 'w') as f:
        f.write(layout)
    print('LAYOUT: Added debug log to message listener')
else:
    print('LAYOUT: listener start pattern not found')

# 3. Also add debug to the announcement section of the listener
old_ann_debug = "      var annWrap = document.querySelector('.pm-announce-wrapper');"
new_ann_debug = """      var annWrap = document.querySelector('.pm-announce-wrapper');
      console.log('[PM-PREVIEW] annWrap found:', !!annWrap, 'ann.enabled:', ann?.enabled, 'ann.bg:', ann?.backgroundColor);"""

# Wait - ann variable is defined AFTER annWrap. Let me fix that.
# The code is:
#   var annWrap = document.querySelector('.pm-announce-wrapper');
#   if (annWrap) {
#     var ann = h.announcement || h.announcementBar || {};
# Let me add the log after ann is defined:

old_ann_section = """      var ann = h.announcement || h.announcementBar || {};
        annWrap.style.display = ann.enabled === false ? 'none' : '';"""

new_ann_section = """      var ann = h.announcement || h.announcementBar || {};
        console.log('[PM-PREVIEW] Announcement:', 'enabled='+ann.enabled, 'bg='+ann.backgroundColor, 'text='+ann.textColor);
        annWrap.style.display = ann.enabled === false ? 'none' : '';"""

with open(layout_path, 'r') as f:
    layout = f.read()
    
if old_ann_section in layout:
    layout = layout.replace(old_ann_section, new_ann_section, 1)
    with open(layout_path, 'w') as f:
        f.write(layout)
    print('LAYOUT: Added announcement debug log')
else:
    print('LAYOUT: announcement section pattern not found, checking...')
    if 'h.announcement' in layout:
        idx = layout.index('h.announcement')
        print(f'  Found h.announcement at pos {idx}')
        print(f'  Context: ...{layout[idx-20:idx+100]}...')

# 4. Clear caches
import subprocess
result = subprocess.run(
    ['php', '/home/u324811576/domains/flashloja.com.br/public_html/artisan', 'view:clear'],
    capture_output=True, text=True
)
print(f'Cache clear: {result.stdout.strip()}')

print('\nAll debug logs added. User can now open browser console to see postMessage flow.')
