#!/usr/bin/env python3
"""Fix RegisterUserController: change default theme from 'vegetables' to 'premium'"""

path = '/home/u324811576/domains/flashloja.com.br/public_html/app/Http/Controllers/Admin/RegisterUserController.php'

with open(path, 'r') as f:
    content = f.read()

old = "'theme' => 'vegetables',"
new = "'theme' => 'premium',"

if old in content:
    content = content.replace(old, new)
    with open(path, 'w') as f:
        f.write(content)
    print('FIXED: New users will now default to premium theme')
else:
    if new in content:
        print('Already fixed')
    else:
        print('Pattern not found')

# Verify
with open(path, 'r') as f:
    verify = f.read()
print('Verification: ' + ('premium' if "'theme' => 'premium'" in verify else 'NOT FIXED'))
