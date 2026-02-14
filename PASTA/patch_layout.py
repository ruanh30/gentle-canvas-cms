#!/usr/bin/env python3
"""Patch layout.blade.php to replace preview listener with enhanced version."""
import re

layout_path = '/home/u324811576/domains/flashloja.com.br/public_html/resources/views/user-front/layout.blade.php'
listener_path = '/home/u324811576/preview_listener.js'

with open(layout_path, 'r') as f:
    content = f.read()

with open(listener_path, 'r') as f:
    new_listener = f.read()

# Find and replace the old listener block
# Pattern: from "window.addEventListener('message'," to the closing "});" before "</script>" and "@endif"
old_pattern = r"(window\.addEventListener\('message', function\(e\) \{.*?\n\s*\}\);)"
match = re.search(old_pattern, content, re.DOTALL)

if match:
    content = content[:match.start()] + new_listener.strip() + content[match.end():]
    with open(layout_path, 'w') as f:
        f.write(content)
    print('PATCHED OK - replaced preview listener')
else:
    print('ERROR: Could not find old listener pattern')
    # Try alternative approach
    old_start = "window.addEventListener('message', function(e) {"
    idx = content.find(old_start)
    if idx >= 0:
        # Find the closing });  for this function
        depth = 0
        i = idx + len(old_start) - 1  # position of opening {
        for j in range(i, len(content)):
            if content[j] == '{':
                depth += 1
            elif content[j] == '}':
                depth -= 1
                if depth == 0:
                    # Found the matching close, now find the ");
                    end = content.find(');', j)
                    if end >= 0:
                        end += 2
                        content = content[:idx] + new_listener.strip() + content[end:]
                        with open(layout_path, 'w') as f:
                            f.write(content)
                        print('PATCHED OK (alt method)')
                    else:
                        print('ERROR: Could not find closing );')
                    break
    else:
        print('ERROR: Could not find listener start at all')
