<?php
require '/home/u324811576/domains/flashloja.com.br/public_html/vendor/autoload.php';
$app = require_once '/home/u324811576/domains/flashloja.com.br/public_html/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User\UserAppearanceSetting;

$s = UserAppearanceSetting::where('user_id', 32)->where('theme', 'premium')->first();
if ($s) {
    $set = is_array($s->settings) ? $s->settings : json_decode($s->settings, true);
    $set['hero']['enabled'] = true;
    $set['hero']['slides'] = [
        [
            'title' => 'Coleção de Verão',
            'subtitle' => 'Novidades',
            'description' => 'Confira as últimas tendências para o verão 2024.',
            'ctaText' => 'Ver Coleção',
            'ctaLink' => '/products',
            'backgroundImage' => 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'contentAlign' => 'left',
             'overlayColor' => '#000000',
             'overlayOpacity' => 0.4
        ],
        [
            'title' => 'Ofertas Especiais',
            'subtitle' => 'Descontos Imperdíveis',
            'description' => 'Até 50% de desconto em produtos selecionados.',
            'ctaText' => 'Aproveitar',
            'ctaLink' => '/sale',
            'backgroundImage' => 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'contentAlign' => 'center',
             'overlayColor' => '#000000',
             'overlayOpacity' => 0.3
        ],
        [
            'title' => 'Frete Grátis',
            'subtitle' => 'Em todo o site',
            'description' => 'Para compras acima de R$ 299,00.',
            'ctaText' => 'Comprar Agora',
            'ctaLink' => '/products',
            'backgroundImage' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'contentAlign' => 'right',
             'overlayColor' => '#000000',
             'overlayOpacity' => 0.5
        ]
    ];
    $s->settings = $set;
    $s->save();
    echo "Hero Slides configured for user 32.\n";
} else {
    echo "User 32 settings not found.\n";
}
