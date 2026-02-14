@extends('user.layout')

@section('content')
<div class="page-header">
    <h4 class="page-title">Personalização do Tema Premium</h4>
    <ul class="breadcrumbs">
        <li class="nav-home">
            <a href="{{ route('user-dashboard') }}">
                <i class="flaticon-home"></i>
            </a>
        </li>
        <li class="separator">
            <i class="flaticon-right-arrow"></i>
        </li>
        <li class="nav-item">
            <a href="#">Configurações do Site</a>
        </li>
        <li class="separator">
            <i class="flaticon-right-arrow"></i>
        </li>
        <li class="nav-item">
            <a href="#">Aparência</a>
        </li>
    </ul>
</div>

<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <div class="card-title">Temas Prontos (Presets)</div>
            </div>
            <div class="card-body">
                <form action="{{ route('user.appearance.premium.preset') }}" method="POST">
                    @csrf
                    <div class="row align-items-end">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Selecione um Estilo</label>
                                <select name="preset" class="form-control">
                                    <option value="minimal">Minimalista (Padrão)</option>
                                    <option value="modern">Moderno (Azul)</option>
                                    <option value="elegant">Elegante (Preto/Dourado)</option>
                                    <option value="fashion">Fashion (Preto)</option>
                                    <option value="luxury">Luxo (Dourado)</option>
                                    <option value="ocean">Oceano (Ciano)</option>
                                    <option value="rose">Rosé (Rosa)</option>
                                    <option value="nature">Natureza (Verde)</option>
                                    <option value="dark">Noturno (Escuro)</option>
                                    <option value="brutalist">Brutalist (Monocromático)</option>
                                    <option value="candy">Candy Pop (Rosa/Violeta)</option>
                                    <option value="vintage">Vintage (Marrom)</option>
                                    <option value="neon">Neon (Roxo)</option>
                                    <option value="earth">Terra (Terracota)</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <button type="submit" class="btn btn-warning">Aplicar Preset</button>
                                <small class="text-muted d-block mt-2">Isso substituirá suas cores e configurações atuais com os padrões do tema selecionado.</small>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <div class="card-title">Customização Detalhada</div>
            </div>
            <div class="card-body">
                <form action="{{ route('user.appearance.premium.update') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    
                    <div class="row">
                        <div class="col-3">
                            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a class="nav-link active" id="pill-global-tab" data-toggle="pill" href="#pill-global" role="tab">1. Layout Global</a>
                                <a class="nav-link" id="pill-colors-tab" data-toggle="pill" href="#pill-colors" role="tab">2. Cores</a>
                                <a class="nav-link" id="pill-typography-tab" data-toggle="pill" href="#pill-typography" role="tab">3. Tipografia</a>
                                <a class="nav-link" id="pill-buttons-tab" data-toggle="pill" href="#pill-buttons" role="tab">4. Botões</a>
                                <a class="nav-link" id="pill-inputs-tab" data-toggle="pill" href="#pill-inputs" role="tab">5. Formulários</a>
                                <a class="nav-link" id="pill-logo-tab" data-toggle="pill" href="#pill-logo" role="tab">6. Logo e Favicon</a>
                                <a class="nav-link" id="pill-header-tab" data-toggle="pill" href="#pill-header" role="tab">7. Cabeçalho</a>
                                <a class="nav-link" id="pill-hero-tab" data-toggle="pill" href="#pill-hero" role="tab">8. Hero / Banner</a>
                                <a class="nav-link" id="pill-home-sections-tab" data-toggle="pill" href="#pill-home-sections" role="tab">9. Seções da Home</a>
                                <a class="nav-link" id="pill-product-card-tab" data-toggle="pill" href="#pill-product-card" role="tab">10. Card de Produto</a>
                                <a class="nav-link" id="pill-product-page-tab" data-toggle="pill" href="#pill-product-page" role="tab">11. Página de Produto</a>
                                <a class="nav-link" id="pill-category-tab" data-toggle="pill" href="#pill-category" role="tab">12. Categoria / Busca</a>
                                <a class="nav-link" id="pill-cart-tab" data-toggle="pill" href="#pill-cart" role="tab">13. Carrinho</a>
                                <a class="nav-link" id="pill-checkout-tab" data-toggle="pill" href="#pill-checkout" role="tab">14. Checkout</a>
                                <a class="nav-link" id="pill-footer-tab" data-toggle="pill" href="#pill-footer" role="tab">15. Rodapé</a>
                                <a class="nav-link" id="pill-whatsapp-tab" data-toggle="pill" href="#pill-whatsapp" role="tab">16. WhatsApp</a>
                                <a class="nav-link" id="pill-seo-tab" data-toggle="pill" href="#pill-seo" role="tab">17. SEO e Social</a>
                                <a class="nav-link" id="pill-custom-code-tab" data-toggle="pill" href="#pill-custom-code" role="tab">18. Código Customizado</a>
                            </div>
                        </div>
                        <div class="col-9">
                            <div class="tab-content" id="v-pills-tabContent">
                                
                                <!-- 1. Layout Global -->
                                <div class="tab-pane fade show active" id="pill-global" role="tabpanel">
                                    <h3>Layout Global</h3>
                                    <div class="form-group">
                                        <label>Largura Máxima do Container (px)</label>
                                        <input type="number" class="form-control" name="settings[global][containerMaxPx]" value="{{ $settings['global']['containerMaxPx'] ?? 1280 }}">
                                    </div>
                                    <div class="form-group">
                                        <label>Border Radius (Arredondamento Padrão)</label>
                                        <select class="form-control" name="settings[global][borderRadius]">
                                            <option value="none" {{ ($settings['global']['borderRadius'] ?? '') == 'none' ? 'selected' : '' }}>Nenhum (Quadrado)</option>
                                            <option value="small" {{ ($settings['global']['borderRadius'] ?? '') == 'small' ? 'selected' : '' }}>Pequeno (4px)</option>
                                            <option value="medium" {{ ($settings['global']['borderRadius'] ?? '') == 'medium' ? 'selected' : '' }}>Médio (8px)</option>
                                            <option value="large" {{ ($settings['global']['borderRadius'] ?? '') == 'large' ? 'selected' : '' }}>Grande (16px)</option>
                                            <option value="full" {{ ($settings['global']['borderRadius'] ?? '') == 'full' ? 'selected' : '' }}>Total (Redondo)</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- 2. Cores -->
                                <div class="tab-pane fade" id="pill-colors" role="tabpanel">
                                    <h3>Cores do Tema</h3>
                                    <div class="row">
                                        @foreach(['primary' => 'Cor Primária', 'secondary' => 'Cor Secundária', 'accent' => 'Cor de Acento / Destaque', 'background' => 'Cor de Fundo', 'foreground' => 'Cor de Texto', 'surface' => 'Cor de Superfície (Cards)', 'border' => 'Cor de Borda', 'success' => 'Sucesso (Verde)', 'warning' => 'Aviso (Amarelo)', 'danger' => 'Erro/Oferta (Vermelho)'] as $key => $label)
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>{{ $label }}</label>
                                                <input type="color" class="form-control" name="settings[colors][{{ $key }}]" value="{{ $settings['colors'][$key] ?? '#000000' }}">
                                            </div>
                                        </div>
                                        @endforeach
                                    </div>
                                </div>

                                <!-- 3. Tipografia -->
                                <div class="tab-pane fade" id="pill-typography" role="tabpanel">
                                    <h3>Tipografia</h3>
                                    <div class="form-group">
                                        <label>Família da Fonte Principal</label>
                                        <select class="form-control select2" name="settings[typography][fontFamily]">
                                            @foreach(['Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Outfit', 'Playfair Display'] as $font)
                                            <option value="{{ $font }}" {{ ($settings['typography']['fontFamily'] ?? '') == $font ? 'selected' : '' }}>{{ $font }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Tamanho Base (px)</label>
                                        <input type="number" class="form-control" name="settings[typography][baseSize]" value="{{ $settings['typography']['baseSize'] ?? 16 }}">
                                    </div>
                                </div>

                                <!-- 4. Botões -->
                                <div class="tab-pane fade" id="pill-buttons" role="tabpanel">
                                    <h3>Estilo dos Botões</h3>
                                    <div class="form-group">
                                        <label>Arredondamento</label>
                                        <select class="form-control" name="settings[buttons][borderRadius]">
                                            <option value="none" {{ ($settings['buttons']['borderRadius'] ?? '') == 'none' ? 'selected' : '' }}>Quadrado</option>
                                            <option value="small" {{ ($settings['buttons']['borderRadius'] ?? '') == 'small' ? 'selected' : '' }}>Leve</option>
                                            <option value="medium" {{ ($settings['buttons']['borderRadius'] ?? '') == 'medium' ? 'selected' : '' }}>Médio</option>
                                            <option value="full" {{ ($settings['buttons']['borderRadius'] ?? '') == 'full' ? 'selected' : '' }}>Redondo (Pílula)</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Sombra</label>
                                        <select class="form-control" name="settings[buttons][shadow]">
                                            <option value="none" {{ ($settings['buttons']['shadow'] ?? '') == 'none' ? 'selected' : '' }}>Sem Sombra</option>
                                            <option value="small" {{ ($settings['buttons']['shadow'] ?? '') == 'small' ? 'selected' : '' }}>Sombra Suave</option>
                                            <option value="medium" {{ ($settings['buttons']['shadow'] ?? '') == 'medium' ? 'selected' : '' }}>Sombra Média</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Texto em Maiúsculo</label>
                                        <select class="form-control" name="settings[buttons][uppercase]">
                                            <option value="0" {{ ($settings['buttons']['uppercase'] ?? '') == '0' ? 'selected' : '' }}>Não</option>
                                            <option value="1" {{ ($settings['buttons']['uppercase'] ?? '') == '1' ? 'selected' : '' }}>Sim</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- 5. Inputs -->
                                <div class="tab-pane fade" id="pill-inputs" role="tabpanel">
                                    <h3>Formulários</h3>
                                    <div class="form-group">
                                        <label>Estilo</label>
                                        <select class="form-control" name="settings[inputs][style]">
                                            <option value="bordered" {{ ($settings['inputs']['style'] ?? '') == 'bordered' ? 'selected' : '' }}>Borda Completa</option>
                                            <option value="underline" {{ ($settings['inputs']['style'] ?? '') == 'underline' ? 'selected' : '' }}>Apenas Linha Inferior</option>
                                            <option value="flat" {{ ($settings['inputs']['style'] ?? '') == 'flat' ? 'selected' : '' }}>Fundo Sólido (Flat)</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- 6. Logo -->
                                <div class="tab-pane fade" id="pill-logo" role="tabpanel">
                                    <h3>Logo</h3>
                                    <div class="form-group">
                                        <label>Imagem do Logo</label>
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" name="logo_image" accept="image/*">
                                            <label class="custom-file-label">Escolher arquivo</label>
                                        </div>
                                        @if(isset($settings['logo']['imageUrl']))
                                            <div class="mt-2">
                                                <img src="{{ asset($settings['logo']['imageUrl']) }}" alt="Logo Atual" style="max-height: 50px; background: #eee; padding: 5px;">
                                            </div>
                                        @endif
                                    </div>
                                    <div class="form-group">
                                        <label>Largura do Logo (px)</label>
                                        <input type="number" class="form-control" name="settings[logo][width]" value="{{ $settings['logo']['width'] ?? 150 }}">
                                    </div>
                                </div>

                                <!-- 7. Header -->
                                <div class="tab-pane fade" id="pill-header" role="tabpanel">
                                    <h3>Cabeçalho</h3>
                                    <div class="form-group">
                                        <label>Layout</label>
                                        <select class="form-control" name="settings[header][layout]">
                                            <option value="classic" {{ ($settings['header']['layout'] ?? '') == 'classic' ? 'selected' : '' }}>Clássico (Logo Esq, Menu Dir)</option>
                                            <option value="standard" {{ ($settings['header']['layout'] ?? '') == 'standard' ? 'selected' : '' }}>Padrão (Logo Esq, Menu Centro)</option>
                                            <option value="minimal" {{ ($settings['header']['layout'] ?? '') == 'minimal' ? 'selected' : '' }}>Minimalista (Hambúrguer)</option>
                                            <option value="centered" {{ ($settings['header']['layout'] ?? '') == 'centered' ? 'selected' : '' }}>Centralizado</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Altura (px)</label>
                                        <input type="number" class="form-control" name="settings[header][height]" value="{{ $settings['header']['height'] ?? 80 }}">
                                    </div>
                                    <div class="form-group">
                                        <label>Fixar no Topo (Sticky)</label>
                                        <select class="form-control" name="settings[header][sticky]">
                                            <option value="1" {{ ($settings['header']['sticky'] ?? '') == '1' ? 'selected' : '' }}>Sim</option>
                                            <option value="0" {{ ($settings['header']['sticky'] ?? '') == '0' ? 'selected' : '' }}>Não</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- 8. Hero -->
                                <div class="tab-pane fade" id="pill-hero" role="tabpanel">
                                    <h3>Hero Slider</h3>
                                    <div class="accordion" id="heroAccordion">
                                        @for($i = 0; $i < 3; $i++)
                                        <div class="card">
                                            <div class="card-header" id="headingHero{{$i}}">
                                                <h2 class="mb-0">
                                                    <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseHero{{$i}}">
                                                        Slide #{{ $i+1 }}
                                                    </button>
                                                </h2>
                                            </div>
                                            <div id="collapseHero{{$i}}" class="collapse {{ $i==0 ? 'show' : '' }}" data-parent="#heroAccordion">
                                                <div class="card-body">
                                                    <div class="form-group">
                                                        <label>Imagem</label>
                                                        <input type="file" class="form-control-file" name="hero_slides[{{$i}}]">
                                                        @if(isset($settings['hero']['slides'][$i]['backgroundImage']))
                                                            <div class="mt-2"><img src="{{ asset($settings['hero']['slides'][$i]['backgroundImage']) }}" style="height: 50px;"></div>
                                                        @endif
                                                    </div>
                                                    <div class="form-group">
                                                        <label>Título</label>
                                                        <input type="text" class="form-control" name="settings[hero][slides][{{$i}}][title]" value="{{ $settings['hero']['slides'][$i]['title'] ?? '' }}">
                                                    </div>
                                                    <div class="form-group">
                                                        <label>Subtítulo</label>
                                                        <input type="text" class="form-control" name="settings[hero][slides][{{$i}}][subtitle]" value="{{ $settings['hero']['slides'][$i]['subtitle'] ?? '' }}">
                                                    </div>
                                                    <div class="form-group">
                                                        <label>Link do Botão</label>
                                                        <input type="text" class="form-control" name="settings[hero][slides][{{$i}}][link]" value="{{ $settings['hero']['slides'][$i]['link'] ?? '' }}">
                                                    </div>
                                                    <div class="form-group">
                                                        <label>Texto do Botão</label>
                                                        <input type="text" class="form-control" name="settings[hero][slides][{{$i}}][buttonText]" value="{{ $settings['hero']['slides'][$i]['buttonText'] ?? 'Comprar Agora' }}">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        @endfor
                                    </div>
                                </div>

                                <!-- 9. Homepage Sections -->
                                <div class="tab-pane fade" id="pill-home-sections" role="tabpanel">
                                    <h3>Seções da Home (Ordem e Visibilidade)</h3>
                                    <div class="alert alert-info">Arraste para reordenar (funcionalidade em breve). Ative/Desative as seções abaixo.</div>
                                    @php
                                        $sections = [
                                            'hero' => 'Hero Slider',
                                            'benefits' => 'Benefícios/Ícones',
                                            'categories' => 'Categorias em Destaque',
                                            'featured-products' => 'Produtos em Destaque',
                                            'banner' => 'Banner Promocional',
                                            'testimonials' => 'Depoimentos',
                                            'brands' => 'Marcas',
                                            'newsletter' => 'Newsletter',
                                            'trust-bar' => 'Barra de Confiança'
                                        ];
                                    @endphp
                                    @foreach($sections as $secKey => $secLabel)
                                    <div class="form-group d-flex justify-content-between align-items-center border p-2 mb-2 bg-white">
                                        <span>{{ $secLabel }} ({{ $secKey }})</span>
                                        <div class="custom-control custom-switch">
                                            <input type="hidden" name="settings[homepageSections][{{$secKey}}][enabled]" value="0">
                                            <input type="checkbox" class="custom-control-input" id="switch-{{$secKey}}" name="settings[homepageSections][{{$secKey}}][enabled]" value="1" {{ ($settings['homepageSections'][$secKey]['enabled'] ?? true) ? 'checked' : '' }}>
                                            <label class="custom-control-label" for="switch-{{$secKey}}">Visível</label>
                                        </div>
                                    </div>
                                    @endforeach
                                </div>

                                <!-- 10. Product Card -->
                                <div class="tab-pane fade" id="pill-product-card" role="tabpanel">
                                    <h3>Card de Produto</h3>
                                    <div class="form-group">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="pc-showBrand" name="settings[productCard][showBrand]" value="1" {{ ($settings['productCard']['showBrand'] ?? false) ? 'checked' : '' }}>
                                            <label class="custom-control-label" for="pc-showBrand">Mostrar Marca</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="pc-showRating" name="settings[productCard][showRating]" value="1" {{ ($settings['productCard']['showRating'] ?? true) ? 'checked' : '' }}>
                                            <label class="custom-control-label" for="pc-showRating">Mostrar Avaliação (Estrelas)</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="pc-showAddToCart" name="settings[productCard][showAddToCart]" value="1" {{ ($settings['productCard']['showAddToCart'] ?? true) ? 'checked' : '' }}>
                                            <label class="custom-control-label" for="pc-showAddToCart">Mostrar Botão Comprar</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- 11. Product Page -->
                                <div class="tab-pane fade" id="pill-product-page" role="tabpanel">
                                    <h3>Página de Produto</h3>
                                    <div class="form-group">
                                        <label>Layout da Galeria</label>
                                        <select class="form-control" name="settings[productPage][galleryLayout]">
                                            <option value="side-by-side" {{ ($settings['productPage']['galleryLayout'] ?? '') == 'side-by-side' ? 'selected' : '' }}>Lado a Lado (Grid)</option>
                                            <option value="thumbnails-left" {{ ($settings['productPage']['galleryLayout'] ?? '') == 'thumbnails-left' ? 'selected' : '' }}>Thumbnails à Esquerda</option>
                                            <option value="thumbnails-bottom" {{ ($settings['productPage']['galleryLayout'] ?? '') == 'thumbnails-bottom' ? 'selected' : '' }}>Thumbnails Abaixo</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- 12. Category -->
                                <div class="tab-pane fade" id="pill-category" role="tabpanel">
                                    <h3>Página de Categoria</h3>
                                    <div class="form-group">
                                        <label>Layout da Barra Lateral</label>
                                        <select class="form-control" name="settings[category][layout]">
                                            <option value="sidebar-left" {{ ($settings['category']['layout'] ?? '') == 'sidebar-left' ? 'selected' : '' }}>Barra Lateral Esquerda</option>
                                            <option value="sidebar-right" {{ ($settings['category']['layout'] ?? '') == 'sidebar-right' ? 'selected' : '' }}>Barra Lateral Direita</option>
                                            <option value="no-sidebar" {{ ($settings['category']['layout'] ?? '') == 'no-sidebar' ? 'selected' : '' }}>Sem Barra Lateral</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- 13. Cart -->
                                <div class="tab-pane fade" id="pill-cart" role="tabpanel">
                                    <h3>Carrinho</h3>
                                    <p class="text-muted">Use as configurações globais de cores e botões.</p>
                                </div>

                                <!-- 14. Checkout -->
                                <div class="tab-pane fade" id="pill-checkout" role="tabpanel">
                                    <h3>Checkout</h3>
                                    <div class="form-group">
                                        <label>Layout</label>
                                        <select class="form-control" name="settings[checkout][layout]">
                                            <option value="one-page" {{ ($settings['checkout']['layout'] ?? '') == 'one-page' ? 'selected' : '' }}>Uma Página (One Page)</option>
                                            <option value="multi-step" {{ ($settings['checkout']['layout'] ?? '') == 'multi-step' ? 'selected' : '' }}>Multi-etapas</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- 15. Footer -->
                                <div class="tab-pane fade" id="pill-footer" role="tabpanel">
                                    <h3>Rodapé</h3>
                                    <div class="form-group">
                                        <label>Texto de Copyright</label>
                                        <input type="text" class="form-control" name="settings[footer][copyrightText]" value="{{ $settings['footer']['copyrightText'] ?? '© 2026 FlashLoja. Todos os direitos reservados.' }}">
                                    </div>
                                    <div class="form-group">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="ft-showSocial" name="settings[footer][showSocial]" value="1" {{ ($settings['footer']['showSocial'] ?? true) ? 'checked' : '' }}>
                                            <label class="custom-control-label" for="ft-showSocial">Mostrar Redes Sociais</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="ft-showPaymentIcons" name="settings[footer][showPaymentIcons]" value="1" {{ ($settings['footer']['showPaymentIcons'] ?? true) ? 'checked' : '' }}>
                                            <label class="custom-control-label" for="ft-showPaymentIcons">Mostrar Ícones de Pagamento</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- 16. WhatsApp -->
                                <div class="tab-pane fade" id="pill-whatsapp" role="tabpanel">
                                    <h3>Botão WhatsApp</h3>
                                    <div class="form-group">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="wa-enabled" name="settings[whatsapp][enabled]" value="1" {{ ($settings['whatsapp']['enabled'] ?? false) ? 'checked' : '' }}>
                                            <label class="custom-control-label" for="wa-enabled">Habilitar Botão Flutuante</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Número (com DDI e DDD)</label>
                                        <input type="text" class="form-control" name="settings[whatsapp][number]" placeholder="5511999999999" value="{{ $settings['whatsapp']['number'] ?? '' }}">
                                    </div>
                                    <div class="form-group">
                                        <label>Mensagem Padrão</label>
                                        <input type="text" class="form-control" name="settings[whatsapp][message]" value="{{ $settings['whatsapp']['message'] ?? 'Olá, gostaria de mais informações.' }}">
                                    </div>
                                </div>

                                <!-- 17. SEO -->
                                <div class="tab-pane fade" id="pill-seo" role="tabpanel">
                                    <h3>SEO Global</h3>
                                    <div class="form-group">
                                        <label>Título Padrão (Sufixo)</label>
                                        <input type="text" class="form-control" name="settings[seo][metaTitle]" value="{{ $settings['seo']['metaTitle'] ?? '' }}">
                                    </div>
                                    <div class="form-group">
                                        <label>Descrição Meta Padrão</label>
                                        <textarea class="form-control" name="settings[seo][metaDescription]">{{ $settings['seo']['metaDescription'] ?? '' }}</textarea>
                                    </div>
                                    <div class="form-group">
                                        <label>Imagem de Compartilhamento (OG Image)</label>
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" name="seo_og_image" accept="image/*">
                                            <label class="custom-file-label">Escolher imagem</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- 18. Custom Code -->
                                <div class="tab-pane fade" id="pill-custom-code" role="tabpanel">
                                    <h3>Código Customizado</h3>
                                    <div class="form-group">
                                        <label>CSS Personalizado</label>
                                        <textarea class="form-control" name="custom_css" rows="10" style="font-family: monospace;">{{ $settings['customCode']['css'] ?? '' }}</textarea>
                                    </div>
                                    <div class="form-group">
                                        <label>HTML/JS no Header (Analytics, Pixels...)</label>
                                        <textarea class="form-control" name="settings[customCode][headObj]" rows="5" style="font-family: monospace;">{{ $settings['customCode']['headObj'] ?? '' }}</textarea>
                                    </div>
                                    <div class="form-group">
                                        <label>HTML/JS no Body (Fim)</label>
                                        <textarea class="form-control" name="settings[customCode][bodyObj]" rows="5" style="font-family: monospace;">{{ $settings['customCode']['bodyObj'] ?? '' }}</textarea>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="card-footer text-center">
                        <button type="submit" class="btn btn-success btn-lg">Salvar todas as alterações</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script>
    // Simple script to update custom file inputs with filename
    $('.custom-file-input').on('change', function() {
        var fileName = $(this).val().split('\\').pop();
        $(this).next('.custom-file-label').addClass("selected").html(fileName);
    });
</script>
@endsection
