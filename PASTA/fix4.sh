#!/bin/bash
FILE=~/domains/flashloja.com.br/public_html/resources/views/user/partials/side-navbar.blade.php

# Show last 10 lines
echo "=== LAST 10 LINES ==="
tail -10 "$FILE" | cat -A

# Use python to fix
python3 << 'PYEOF'
import re

path = "/home/u324811576/domains/flashloja.com.br/public_html/resources/views/user/partials/side-navbar.blade.php"
with open(path, 'r') as f:
    content = f.read()

# Replace the ending: 3 closing divs + \n + aside -> 2 closing divs + aside
old = '</div>\n</aside>'
if old in content:
    content = content.replace(old, '\n</aside>', 1)
    # But we need to replace from the end, count occurrences
    # Actually just replace the literal string
    print(f"Found literal backslash-n pattern")

# Try the actual ending
lines = content.rstrip().split('\n')
print(f"Last 5 lines: {lines[-5:]}")

# Count divs
opens = content.count('<div')
closes = content.count('</div>')
print(f"Before fix: {opens} opens, {closes} closes")

if closes > opens:
    # Remove one </div> from near the end (before </aside>)
    # Find last </aside> and remove the </div> right before it
    idx = content.rfind('</aside>')
    before = content[:idx]
    after = content[idx:]
    # Remove last </div> in 'before'
    last_div = before.rfind('</div>')
    if last_div >= 0:
        content = before[:last_div] + before[last_div+6:] + after
        print("Removed extra </div>")

opens2 = content.count('<div')
closes2 = content.count('</div>')
print(f"After fix: {opens2} opens, {closes2} closes")

with open(path, 'w') as f:
    f.write(content)
PYEOF

echo "=== AFTER LAST 5 ==="
tail -5 "$FILE"

cd ~/domains/flashloja.com.br/public_html
php artisan view:clear 2>&1
