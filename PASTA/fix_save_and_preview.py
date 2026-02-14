#!/usr/bin/env python3
"""
Fix 1: Controller update() - handle homeSections as direct replacement (not recursive merge)
Fix 2: Preview listener - enhance announcement bar real-time updates
"""

# ========== FIX 1: Controller ==========
ctrl_path = '/home/u324811576/domains/flashloja.com.br/public_html/app/Http/Controllers/User/PremiumAppearanceController.php'

with open(ctrl_path, 'r') as f:
    ctrl = f.read()

# The current update() does:
#   $settings = array_replace_recursive(self::defaults(), $settings, $incoming);
# This breaks homeSections because array_replace_recursive merges by index.
#
# Fix: After the merge, directly replace certain keys from $incoming if they exist.
# This ensures arrays like homeSections, hero.slides, footer.columns, etc. come from
# the user's data, not from the defaults.

old_update = """        $settings = is_array($appearance->settings) ? $appearance->settings : [];
        $settings = array_replace_recursive(self::defaults(), $settings, $incoming);"""

new_update = """        $settings = is_array($appearance->settings) ? $appearance->settings : [];
        $settings = array_replace_recursive(self::defaults(), $settings, $incoming);

        // For indexed arrays, array_replace_recursive merges by index which breaks
        // delete/reorder. Directly replace these keys from $incoming if present.
        $arrayKeys = ['homeSections', 'homepageSections'];
        foreach ($arrayKeys as $ak) {
            if (array_key_exists($ak, $incoming)) {
                $settings[$ak] = $incoming[$ak];
            }
        }
        // Also handle nested indexed arrays
        if (isset($incoming['hero']['slides'])) {
            $settings['hero']['slides'] = $incoming['hero']['slides'];
        }
        if (isset($incoming['header']['announcement']['messages'])) {
            $settings['header']['announcement']['messages'] = $incoming['header']['announcement']['messages'];
        }
        if (isset($incoming['footer']['columns'])) {
            $settings['footer']['columns'] = $incoming['footer']['columns'];
        }"""

if old_update in ctrl:
    ctrl = ctrl.replace(old_update, new_update)
    with open(ctrl_path, 'w') as f:
        f.write(ctrl)
    print('FIX1 OK: Controller update() patched with array key overrides')
else:
    print('FIX1 WARN: Pattern not found, checking...')
    if 'array_replace_recursive' in ctrl:
        print('  array_replace_recursive exists but pattern differs')
        # Show context
        idx = ctrl.index('array_replace_recursive')
        print('  Context:', ctrl[idx-100:idx+200])
    else:
        print('  array_replace_recursive not found at all!')

# ========== FIX 2: Preview listener for announcement ==========
layout_path = '/home/u324811576/domains/flashloja.com.br/public_html/resources/views/user-front/layout.blade.php'

with open(layout_path, 'r') as f:
    layout = f.read()

# Check the current announcement section in the listener
if 'annWrap' in layout:
    print('FIX2: Announcement listener exists, checking quality...')
    # The current listener should already handle announcement but let me verify
    if 'ann.backgroundColor' in layout and 'annInner' in layout:
        print('FIX2: Announcement color update exists')
    else:
        print('FIX2 WARN: Announcement color update missing or different')
    if 'ann.messages' in layout:
        print('FIX2: Announcement messages update exists')
    else:
        print('FIX2 WARN: Messages update missing')
else:
    print('FIX2 WARN: annWrap not found in listener')

print('\nDone!')
