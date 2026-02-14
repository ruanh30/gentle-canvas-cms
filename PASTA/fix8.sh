#!/bin/bash
CSS=/home/u324811576/domains/flashloja.com.br/public_html/public/assets/admin/css/flashloja-dashboard.css

python3 << 'PYEOF'
path = "/home/u324811576/domains/flashloja.com.br/public_html/public/assets/admin/css/flashloja-dashboard.css"
with open(path, 'r') as f:
    content = f.read()

# Remove old override attempts
content = content.replace("""
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
""", "")

# Add stronger override using body prefix for specificity
override = """

/* Override atlantis.css fixed sidebar - needs high specificity */
body.fl-dashboard-body .fl-dashboard .fl-sidebar.sidebar.sidebar-style-2 {
  position: relative !important;
  height: 100vh;
  flex-shrink: 0;
  overflow-y: auto;
  top: auto !important;
  left: auto !important;
}

body.fl-dashboard-body .fl-main {
  flex: 1;
  min-width: 0;
  overflow-x: hidden;
}
"""

content += override

with open(path, 'w') as f:
    f.write(content)
print("done")
PYEOF

cd ~/domains/flashloja.com.br/public_html && php artisan view:clear 2>&1
