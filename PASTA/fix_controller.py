#!/usr/bin/env python3
"""Fix PremiumAppearanceController:
1. Add 'theme' => 'premium' to firstOrCreate lookups
2. Use consistent announcement key
"""

path = '/home/u324811576/domains/flashloja.com.br/public_html/app/Http/Controllers/User/PremiumAppearanceController.php'

with open(path, 'r') as f:
    content = f.read()

original = content

# Fix 1: All firstOrCreate calls need ['user_id' => ..., 'theme' => 'premium']
# In index() method:
content = content.replace(
    """        $appearance = UserAppearanceSetting::firstOrCreate(
            ['user_id' => $ubs->user_id],
            [
                'theme' => 'premium',
                'settings' => self::defaults(),
                'custom_css' => null,
            ]
        );""",
    """        $appearance = UserAppearanceSetting::firstOrCreate(
            ['user_id' => $ubs->user_id, 'theme' => 'premium'],
            [
                'settings' => self::defaults(),
                'custom_css' => null,
            ]
        );"""
)

# In update() method:
content = content.replace(
    """        $appearance = UserAppearanceSetting::firstOrCreate(
            ['user_id' => $ubs->user_id],
            ['theme' => 'premium', 'settings' => self::defaults()]
        );""",
    """        $appearance = UserAppearanceSetting::firstOrCreate(
            ['user_id' => $ubs->user_id, 'theme' => 'premium'],
            ['settings' => self::defaults()]
        );"""
)

if content != original:
    with open(path, 'w') as f:
        f.write(content)
    print('CONTROLLER PATCHED OK')
    changes = sum(1 for a, b in zip(original, content) if a != b)
    print(f'Characters changed: {changes}')
else:
    print('WARNING: No changes made')

# Verify
with open(path, 'r') as f:
    verify = f.read()
    
count = verify.count("'theme' => 'premium'")
print(f"Total occurrences of theme=>premium in firstOrCreate: {count}")
fc_count = verify.count("firstOrCreate")
print(f"Total firstOrCreate calls: {fc_count}")
