#!/bin/bash
CSS=/home/u324811576/domains/flashloja.com.br/public_html/public/assets/admin/css/flashloja-dashboard.css

# Replace the fl-sidebar and fl-main rules to override atlantis fixed positioning
python3 << 'PYEOF'
path = "/home/u324811576/domains/flashloja.com.br/public_html/public/assets/admin/css/flashloja-dashboard.css"
with open(path, 'r') as f:
    content = f.read()

# Remove the overflow hidden we just added
content = content.replace("""
/* Fix content bleeding behind sidebar */
.fl-main {
  overflow: hidden;
}""", "")

# Add proper overrides for atlantis fixed sidebar
overrides = """

/* Override atlantis.css fixed sidebar */
.fl-sidebar.sidebar {
  position: sticky !important;
  top: 0;
  height: 100vh;
  flex-shrink: 0;
  z-index: 100;
  overflow-y: auto;
}

.fl-main {
  flex: 1;
  min-width: 0;
  overflow-x: hidden;
}
"""

content += overrides

with open(path, 'w') as f:
    f.write(content)
print("done")
PYEOF

cd ~/domains/flashloja.com.br/public_html && php artisan view:clear 2>&1
