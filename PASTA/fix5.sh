#!/bin/bash
FILE=/home/u324811576/domains/flashloja.com.br/public_html/resources/views/user/partials/side-navbar.blade.php
python3 -c "
c=open('$FILE').read()
c=c.replace('\\\\n</aside>','\\n</aside>')
open('$FILE','w').write(c)
print('done')
"
tail -3 "$FILE"
cd ~/domains/flashloja.com.br/public_html && php artisan view:clear 2>&1
