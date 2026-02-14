#!/bin/bash
FILE=~/domains/flashloja.com.br/public_html/resources/views/user/partials/side-navbar.blade.php

# Show the last 5 lines before fix
echo "=== BEFORE ==="
tail -5 "$FILE"

# Remove the extra </div> before </aside>
# The pattern is: </div>\n</aside> at the very end
# We need to change </div>\n</aside> to just </aside>
# But we need to keep the correct number of closing divs

# Count opening divs vs closing divs in the file
OPEN=$(grep -o '<div' "$FILE" | wc -l)
CLOSE=$(grep -o '</div>' "$FILE" | wc -l)
echo "Opening divs: $OPEN"
echo "Closing divs: $CLOSE"

# The aside itself doesn't count as a div
# If CLOSE > OPEN, there's an extra </div>
# Fix: remove the last </div> before </aside>
sed -i 'N;$s|</div>\n</aside>|</aside>|' "$FILE"

echo "=== AFTER ==="
tail -5 "$FILE"

# Clear views
cd ~/domains/flashloja.com.br/public_html
php artisan view:clear 2>&1
