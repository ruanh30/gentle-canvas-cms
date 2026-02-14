from pathlib import Path

path = Path('~/domains/flashloja.com.br/public_html/app/Http/Controllers/User/ThemePremiumController.php').expanduser()
s = path.read_text(encoding='utf-8')

needle = "$previewUrl = route('front.user.detail.view', ['username' => $user->username]);"
if needle not in s:
    print('needle not found; abort')
    raise SystemExit(1)

s = s.replace(needle, "$previewUrl = route('front.user.detail.view', ['username' => $user->username]) . '?theme-preview=true';")
path.write_text(s, encoding='utf-8')
print('patched ThemePremiumController previewUrl OK')
