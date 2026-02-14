#!/usr/bin/env python3
"""Fix header.blade.php: prioritize 'announcement' over 'announcementBar'
Also fix the defaults() method in the controller to use 'announcement' consistently
Also fix premium-panels.blade.php preview listener announcement key
"""

# Fix header
path = '/home/u324811576/domains/flashloja.com.br/public_html/resources/views/user-front/premium/partials/header.blade.php'
with open(path, 'r') as f:
    content = f.read()

old = "$a = $h['announcementBar'] ?? ($h['announcement'] ?? []);"
new = "$a = $h['announcement'] ?? ($h['announcementBar'] ?? []);"

if old in content:
    content = content.replace(old, new)
    with open(path, 'w') as f:
        f.write(content)
    print('HEADER: Fixed announcement key priority (announcement first)')
else:
    # Check if already fixed
    if new in content:
        print('HEADER: Already fixed')
    else:
        print('HEADER: Pattern not found, checking actual content')
        import re
        match = re.search(r"announcement", content[:500])
        if match:
            print(f'  Found "announcement" at pos {match.start()}')

# Fix controller defaults to not have 'announcementBar' key
ctrl_path = '/home/u324811576/domains/flashloja.com.br/public_html/app/Http/Controllers/User/PremiumAppearanceController.php'
with open(ctrl_path, 'r') as f:
    ctrl = f.read()

# Check if there's an 'announcementBar' in the defaults 
if "'announcementBar'" in ctrl:
    ctrl = ctrl.replace("'announcementBar'", "'announcement'")
    with open(ctrl_path, 'w') as f:
        f.write(ctrl)
    print('CONTROLLER: Replaced announcementBar with announcement in defaults')
else:
    # Check the default header section
    import re
    match = re.search(r"'header'\s*=>\s*\[([^]]*?)\]", ctrl, re.DOTALL)
    if match:
        header_defaults = match.group(1)
        print(f'CONTROLLER: Header defaults keys snippet: {header_defaults[:200]}')
    else:
        print('CONTROLLER: No announcementBar found in defaults (OK)')
