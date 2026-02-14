from pathlib import Path
import re

path = Path('~/domains/flashloja.com.br/public_html/app/Http/Controllers/UserFront/ThemeStorefrontController.php').expanduser()
s = path.read_text('utf-8')

# Insert thumbnail fallback after images array computed
needle = "        $images = DB::table('user_item_images')\n            ->where('item_id', $row->item_id)\n            ->orderBy('id')\n            ->pluck('image')\n            ->map(fn($img) => asset('assets/front/img/user/' . ltrim($img, '/')))\n            ->values()\n            ->all();\n"

if needle not in s:
    raise SystemExit('Expected images query block not found; abort')

replacement = needle + "\n        // Fallback: some installs store the main image in user_items.thumbnail (no rows in user_item_images).\n        if (empty($images) && !empty($row->thumbnail)) {\n            $images = [asset('assets/front/img/user/items/thumbnail/' . ltrim($row->thumbnail, '/'))];\n        }\n"

s = s.replace(needle, replacement)

# Ensure thumbnail is selected in queries
for method in ['home', 'products', 'productDetail']:
    # add user_items.thumbnail to select if missing
    s = s.replace("'user_items.stock',", "'user_items.stock',\n                'user_items.thumbnail',")

path.write_text(s, 'utf-8')
print('patched images fallback + added thumbnail select')
