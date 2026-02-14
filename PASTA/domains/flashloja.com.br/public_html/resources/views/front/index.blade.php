@extends('front.layout')

@section('pagename')
  - {{ __('Home') }}
@endsection

@section('meta-description', !empty($seo) ? $seo->home_meta_description : '')
@section('meta-keywords', !empty($seo) ? $seo->home_meta_keywords : '')

@section('content')
@php
  $host = request()->getHost();
@endphp

<style>
  /* ===== FlashLoja new index (LojaFlash landing adapted) ===== */
  :root{
    --lf2-bg:#ffffff;
    --lf2-bg2:#f6f8ff;
    --lf2-panel:#ffffff;
    --lf2-text:#0f172a;
    --lf2-muted:#5b6478;
    --lf2-brand:#6c4cff;
    --lf2-brand2:#22c55e;
    --lf2-brand3:#2563eb;
    --lf2-line:#e7eaf3;
    --lf2-shadow: 0 18px 50px rgba(15,23,42,.10);
    --lf2-shadow2: 0 10px 30px rgba(15,23,42,.08);
    --lf2-radius:16px;
    --lf2-radius2:22px;
  }

  .lf2-wrap{
    background:
      radial-gradient(900px 500px at 10% 10%, rgba(108,76,255,.12), transparent 60%),
      radial-gradient(900px 500px at 90% 20%, rgba(34,197,94,.10), transparent 60%),
      radial-gradient(900px 500px at 50% 90%, rgba(37,99,235,.08), transparent 60%),
      linear-gradient(180deg, var(--lf2-bg), var(--lf2-bg2));
  }

  .lf2-container{max-width:1120px;margin:0 auto;padding:0 20px;}

  .lf2-hero{padding:64px 0 34px;}
  .lf2-badge{
    display:inline-flex;align-items:center;gap:10px;
    padding:10px 12px;border-radius:999px;
    background: rgba(255,255,255,.75);
    border: 1px solid var(--lf2-line);
    color: var(--lf2-muted);
    font-weight:800;font-size:13px;
    box-shadow: var(--lf2-shadow2);
  }
  .lf2-dot{width:10px;height:10px;border-radius:50%;background:var(--lf2-brand2);box-shadow:0 0 0 6px rgba(34,197,94,.14)}

  .lf2-hero-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:28px;align-items:stretch;margin-top:18px;}
  .lf2-h1{margin:14px 0 12px;font-size:clamp(34px,4.2vw,56px);line-height:1.03;letter-spacing:-.8px;}
  .lf2-lead{color:var(--lf2-muted);font-size:16px;line-height:1.65;max-width:60ch;}

  .lf2-cta{display:flex;gap:12px;margin-top:22px;flex-wrap:wrap;}
  .lf2-subnote{margin-top:10px;color:rgba(15,23,42,.62);font-size:12.5px;font-weight:700;}

  .lf2-btn{
    display:inline-flex;align-items:center;justify-content:center;
    height:44px;padding:0 16px;border-radius:14px;
    font-weight:900;font-size:14px;border:1px solid transparent;
    cursor:pointer;transition:.2s ease;user-select:none;white-space:nowrap;
  }
  .lf2-btn-primary{background:linear-gradient(135deg, rgba(108,76,255,1), rgba(37,99,235,1));color:#fff;box-shadow:0 18px 40px rgba(108,76,255,.18)}
  .lf2-btn-primary:hover{transform:translateY(-1px);filter:brightness(1.02)}
  .lf2-btn-ghost{background:rgba(15,23,42,.04);border-color:rgba(15,23,42,.08);color:var(--lf2-text)}
  .lf2-btn-ghost:hover{background:rgba(15,23,42,.07)}
  .lf2-btn-outline{background:rgba(255,255,255,.75);border-color:rgba(15,23,42,.12);color:var(--lf2-text)}
  .lf2-btn-outline:hover{background:rgba(15,23,42,.04)}

  .lf2-cards{display:grid;gap:14px;align-content:start;}
  .lf2-card{background:rgba(255,255,255,.78);border:1px solid var(--lf2-line);border-radius:var(--lf2-radius2);padding:16px;box-shadow:var(--lf2-shadow)}

  .lf2-hero-visual{background:rgba(255,255,255,.78);border:1px solid var(--lf2-line);border-radius:26px;box-shadow:var(--lf2-shadow);overflow:hidden;padding:14px}
  .lf2-hero-visual img{width:100%;height:auto;display:block;border-radius:18px;border:1px solid rgba(15,23,42,.08);background:transparent}
  .lf2-hero-visual .lf2-caption{margin-top:10px;font-size:12.5px;color:rgba(15,23,42,.62);font-weight:800;display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}

  .lf2-mini{display:flex;gap:12px;align-items:flex-start}
  .lf2-ico{width:40px;height:40px;border-radius:14px;display:grid;place-items:center;background:rgba(108,76,255,.10);border:1px solid rgba(108,76,255,.18);flex:0 0 auto;color:var(--lf2-brand)}
  .lf2-ico svg{width:20px;height:20px}
  .lf2-mini h3{margin:0 0 4px;font-size:14px}
  .lf2-mini p{margin:0;color:var(--lf2-muted);font-size:13px;line-height:1.5}

  .lf2-section{padding:56px 0;}
  .lf2-section h2{margin:0 0 10px;font-size:clamp(24px,3vw,36px);letter-spacing:-.4px;}
  .lf2-desc{margin:0;color:var(--lf2-muted);line-height:1.7;max-width:72ch;}

  .lf2-grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:22px;}
  .lf2-feature{padding:18px;background:rgba(255,255,255,.78);border:1px solid var(--lf2-line);border-radius:var(--lf2-radius2);box-shadow:var(--lf2-shadow2);min-height:140px}
  .lf2-feature .lf2-top{display:flex;align-items:center;justify-content:space-between;gap:10px}
  .lf2-pill{display:inline-flex;align-items:center;font-size:12px;font-weight:900;color:rgba(15,23,42,.78);background:rgba(108,76,255,.10);border:1px solid rgba(108,76,255,.18);padding:6px 10px;border-radius:999px}
  .lf2-feature h3{margin:10px 0 6px;font-size:15px}
  .lf2-feature p{margin:0;color:var(--lf2-muted);font-size:13.5px;line-height:1.65}

  .lf2-steps{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:22px;}
  .lf2-step{padding:18px;background:rgba(255,255,255,.78);border:1px solid var(--lf2-line);border-radius:var(--lf2-radius2);box-shadow:var(--lf2-shadow2)}
  .lf2-step .lf2-n{width:34px;height:34px;border-radius:12px;display:grid;place-items:center;background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.25);font-weight:950;color:rgba(15,23,42,.85)}
  .lf2-step h3{margin:12px 0 6px;font-size:15px}
  .lf2-step p{margin:0;color:var(--lf2-muted);font-size:13.5px;line-height:1.65}

  .lf2-demo-card{margin-top:18px}

  /* Pricing header (match requested layout) */
  #planos .section-title{
    margin-bottom: 18px;
  }
  #planos .section-title .title{
    white-space: nowrap;
    text-align: center;
    margin: 0;
    font-size: 32px;
    line-height: 1.1;
  }
  @media (max-width: 980px){
    #planos .section-title .title{
      font-size: 26px;
      white-space: normal;
    }
  }

  /* Mini gallery (2 shots) */
  .lf2-mini-gallery{
    margin-top:18px;
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap:12px;
  }
  .lf2-shot{
    background: rgba(255,255,255,.78);
    border:1px solid var(--lf2-line);
    border-radius: 18px;
    box-shadow: var(--lf2-shadow2);
    overflow:hidden;
  }
  .lf2-shot img{
    width:100%;
    display:block;
    background: transparent;
  }
  .lf2-shot .lf2-label{
    padding:10px 12px;
    font-size:12.5px;
    font-weight:900;
    color: rgba(15,23,42,.72);
    border-top:1px solid rgba(15,23,42,.06);
    background: rgba(255,255,255,.7);
  }

  @media (max-width: 980px){
    .lf2-hero-grid{grid-template-columns:1fr;}
    .lf2-grid-3{grid-template-columns:1fr;}
    .lf2-steps{grid-template-columns:1fr;}
  }


  /* Testimonials title alignment */
  .testimonial-area .section-title{
    text-align: center; /* centered like the reference */
    margin-left: 0;
    padding-top: 100px; /* move title down */
    margin-bottom: 18px;
  }
  .testimonial-area .section-title .title{
    white-space: nowrap;
    font-size: clamp(22px, 2.2vw, 34px);
    line-height: 1.15;
    margin-bottom: 0;
  }
  /* keep the illustration/copy in the same place (no empty gap) */
  .testimonial-area .image.image-left{
    margin-top: -100px;
  }

</style>

<div class="lf2-wrap">

  <main id="top" class="lf2-hero">
    <div class="lf2-container">
      <div class="lf2-badge">
        <span class="lf2-dot" aria-hidden="true"></span>
        Tudo que você precisa para criar e crescer sua loja online rapidamente
      </div>

      <div class="lf2-hero-grid">
        <section>
          <h1 class="lf2-h1">
            {{ $homeSec->hero_section_text ?? 'Crie sua loja on-line em minutos' }}
          </h1>

          <p class="lf2-lead">
            {{ $homeSec->hero_section_desc ?? 'Gerencie produtos, pagamentos e vendas sem esforço. Tudo o que você precisa para crescer seu negócio está a um clique de distância. Comece agora mesmo.' }}
          </p>

          <div class="lf2-cta">
            <a class="lf2-btn lf2-btn-primary" href="{{ route('front.pricing') }}">Ver planos</a>
          </div>

          <div class="lf2-subnote">Setup rápido • Multi lojas • Domínio próprio • Cresce com você</div>

          <div class="lf2-mini-gallery">
            <div class="lf2-shot">
              <img id="lf2ShotProduct" alt="Mock: Página de produto" src="{{ asset('assets/front/images/placeholder.png') }}">
              <div class="lf2-label">Mock: página de produto</div>
            </div>
            <div class="lf2-shot">
              <img id="lf2ShotDashboard" alt="Mock: Painel do lojista" src="{{ asset('assets/front/images/placeholder.png') }}">
              <div class="lf2-label">Mock: painel do lojista</div>
            </div>
          </div>
        </section>

        <aside class="lf2-cards">
          <div class="lf2-hero-visual">
            <img
              class="lazyload"
              src="{{ asset('assets/front/images/placeholder.png') }}"
              data-src="{{ asset('assets/front/img/' . ($homeSec->image ?? '')) }}"
              alt="Banner"
            >
            <div class="lf2-caption">
              <span>Vitrine + Painel, prontos para vender</span>
              <span style="color:rgba(108,76,255,.95); font-weight:950;">{{ $bs->website_title ?? 'Flashloja' }}</span>
            </div>
          </div>

          <div class="lf2-card">
            <div class="lf2-mini">
              <div class="lf2-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M7 10V7a5 5 0 0 1 10 0v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M6 10h12l-1 11H7L6 10Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                </svg>
              </div>
              <div>
                <h3>Multi Lojas de verdade</h3>
                <p>Cada loja com seu painel, domínio e configurações — tudo isolado e seguro.</p>
              </div>
            </div>
          </div>

          <div class="lf2-card">
            <div class="lf2-mini">
              <div class="lf2-ico" aria-hidden="true" style="background:rgba(34,197,94,.12);border-color:rgba(34,197,94,.25); color: rgba(22,163,74,.95);">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M20 7l-8 10L4 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div>
                <h3>Checkout e pagamentos</h3>
                <p>Integrações já previstas para PIX/cartão, cupons, frete e pedidos.</p>
              </div>
            </div>
          </div>

          <div class="lf2-card">
            <div class="lf2-mini">
              <div class="lf2-ico" aria-hidden="true" style="background:rgba(37,99,235,.10);border-color:rgba(37,99,235,.20); color: rgba(37,99,235,.95);">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 19V5m0 14h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M7 14l3-3 3 2 5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div>
                <h3>Escalável e rápido</h3>
                <p>Performance, SEO e layout clean para converter mais sem complicação.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </main>


  <!-- Pricing (embedded from /pricing) -->
  <section id="planos" class="pricing-area pt-120 pb-120">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="section-title text-center" data-aos="fade-up">
            <h2 class="title">O que nossos clientes estão dizendo</h2>
          </div>

          @if (count($terms) > 1)
            <div class="nav-tabs-navigation text-center" data-aos="fade-up">
              <ul class="nav nav-tabs">
                @foreach ($terms as $term)
                  <li class="nav-item">
                    <button class="nav-link {{ $loop->first ? 'active' : '' }}" data-bs-toggle="tab"
                      data-bs-target="#{{ __($term) }}" type="button">{{ __($term) }}</button>
                  </li>
                @endforeach
              </ul>
            </div>
          @endif

          <div class="tab-content">
            @foreach ($terms as $term)
              <div class="tab-pane fade {{ $loop->first ? 'show active' : '' }}" id="{{ __($term) }}">
                <div class="row">
                  @php
                    $packages = \App\Models\Package::where('status', '1')->where('term', strtolower($term))->get();
                  @endphp
                  @foreach ($packages as $package)
                    @php
                      $pFeatures = json_decode($package->features);
                    @endphp
                    <div class="col-md-6 col-lg-4">
                      <div class="card mb-30 {{ $package->recommended == '1' ? 'active' : '' }}" data-aos="fade-up" data-aos-delay="100">
                        <div class="d-flex align-items-center mb-4">
                          <div class="icon primary"><i class="{{ $package->icon }}"></i></div>
                          <div class="label">
                            <h3>{{ __($package->title) }}</h3>
                            @if ($package->recommended == '1')
                              <span>{{ __('Popular') }}</span>
                            @endif
                          </div>
                        </div>

                        <div class="d-flex align-items-center">
                          <span class="price">{{ $package->price != 0 && $be->base_currency_symbol_position == 'left' ? $be->base_currency_symbol : '' }}{{ $package->price == 0 ? __('Free') : $package->price }}{{ $package->price != 0 && $be->base_currency_symbol_position == 'right' ? $be->base_currency_symbol : '' }}</span>
                          <span class="period">/ {{ __($package->term) }}</span>
                        </div>

                        <h5>{{ __("What's Included") }}</h5>
                        <div class="list-item-area mb-20">
                          <ul class="item-list list-unstyled p-0 toggle-list" data-toggle-list="amenitiesToggle" data-toggle-show="7">
                            <li><i class="fal fa-check"></i>{{ __('Categories Limit') . ' :' }} {{ $package->categories_limit != '999999' ? $package->categories_limit : __('Unlimited') }}</li>
                            <li><i class="fal fa-check"></i>{{ __('Subcategories Limit') . ' :' }} {{ $package->subcategories_limit != '999999' ? $package->subcategories_limit : __('Unlimited') }}</li>
                            <li><i class="fal fa-check"></i>{{ __('Products Limit') . ' :' }} {{ $package->product_limit != '999999' ? $package->product_limit : __('Unlimited') }}</li>
                            <li><i class="fal fa-check"></i>{{ __('Orders Limit') . ' :' }} {{ $package->order_limit != '999999' ? $package->order_limit : __('Unlimited') }}</li>
                            <li><i class="fal fa-check"></i>{{ __('Additional Languages') . ' :' }} {{ $package->language_limit != '999999' ? $package->language_limit : __('Unlimited') }}</li>

                            @if (is_array($pFeatures) && in_array('Blog', $pFeatures))
                              <li><i class="fal fa-check"></i>{{ __('Posts Limit') . ':' }} {{ $package->post_limit != '999999' ? $package->post_limit : __('Unlimited') }}</li>
                            @else
                              <li class="disabled"><i class="fal fa-times"></i>{{ __('Blog') }}</li>
                            @endif

                            @if (is_array($pFeatures) && in_array('Custom Page', $pFeatures))
                              <li><i class="fal fa-check"></i>{{ __('Custom Pages Limit') . ' :' }} {{ $package->number_of_custom_page != '999999' ? $package->number_of_custom_page : __('Unlimited') }}</li>
                            @else
                              <li class="disabled"><i class="fal fa-times"></i>{{ __('Custom Page') }}</li>
                            @endif

                            @php $hideFeatures = ['Posts Limit', 'Blog', 'Custom Page']; @endphp
                            @foreach ($allPfeatures as $feature)
                              @if (!in_array($feature, $hideFeatures))
                                <li class="{{ is_array($pFeatures) && in_array($feature, $pFeatures) ? '' : 'disabled' }}">
                                  <i class="{{ is_array($pFeatures) && in_array($feature, $pFeatures) ? 'fal fa-check' : 'fal fa-times' }}"></i>{{ __($feature) }}
                                </li>
                              @endif
                            @endforeach
                          </ul>
                          <span class="show-more font-sm" data-toggle-btn="toggleListBtn">{{ __('Show More') }} +</span>
                        </div>

                        <div class="d-flex align-items-center">
                          @if ($package->is_trial === '1' && $package->price != 0)
                            <a href="{{ route('front.register.view', ['status' => 'trial', 'id' => $package->id]) }}" class="btn secondary-btn">{{ __('Trial') }}</a>
                          @endif

                          @if ($package->price == 0)
                            <a href="{{ route('front.register.view', ['status' => 'regular', 'id' => $package->id]) }}" class="btn secondary-btn">{{ __('Signup') }}</a>
                          @else
                            <a href="{{ route('front.register.view', ['status' => 'regular', 'id' => $package->id]) }}" class="btn primary-btn">{{ __('Purchase') }}</a>
                          @endif
                        </div>
                      </div>
                    </div>
                  @endforeach
                </div>
              </div>
            @endforeach
          </div>
        </div>
      </div>
    </div>

    <!-- Bg Overlay / Shapes (same as pricing page) -->
    <img class="lazyload bg-overlay" src="{{ asset('assets/front/images/shadow-bg-2.png') }}" alt="Bg">
    <img class="lazyload bg-overlay" src="{{ asset('assets/front/images/shadow-bg-1.png') }}" alt="Bg">
    <div class="shape">
      <img class="lazyload shape-1" src="{{ asset('assets/front/images/shape/shape-6.png') }}" alt="Shape">
      <img class="lazyload shape-2" src="{{ asset('assets/front/images/shape/shape-7.png') }}" alt="Shape">
      <img class="lazyload shape-3" src="{{ asset('assets/front/images/shape/shape-3.png') }}" alt="Shape">
      <img class="lazyload shape-4" src="{{ asset('assets/front/images/shape/shape-4.png') }}" alt="Shape">
      <img class="lazyload shape-5" src="{{ asset('assets/front/images/shape/shape-5.png') }}" alt="Shape">
      <img class="lazyload shape-6" src="{{ asset('assets/front/images/shape/shape-11.png') }}" alt="Shape">
    </div>
  </section>
  <!-- /Pricing -->

  <section id="recursos" class="lf2-section">
    <div class="lf2-container">
      <h2>Recursos feitos para vender mais</h2>
      <p class="lf2-desc">A Flashloja foi pensada para você operar um ecossistema de lojas com facilidade — onboarding rápido, domínio, catálogo, painel e uma base sólida para crescer.</p>

      <div class="lf2-grid-3">
        <div class="lf2-feature">
          <div class="lf2-top"><span class="lf2-pill">Subdomínios</span></div>
          <h3>lojista.{{ $host }}</h3>
          <p>Crie lojas com subdomínio automático e SSL.</p>
        </div>
        <div class="lf2-feature">
          <div class="lf2-top"><span class="lf2-pill">Domínio próprio</span></div>
          <h3>Domínio customizado</h3>
          <p>Fluxo simples: solicita → valida DNS → conecta.</p>
        </div>
        <div class="lf2-feature">
          <div class="lf2-top"><span class="lf2-pill">Painel do Lojista</span></div>
          <h3>Produtos, pedidos e clientes</h3>
          <p>Gestão do básico ao avançado: estoque, variações e relatórios.</p>
        </div>
        <div class="lf2-feature">
          <div class="lf2-top"><span class="lf2-pill">Temas</span></div>
          <h3>Vitrine moderna</h3>
          <p>Layouts prontos: home, coleção, produto, carrinho e checkout.</p>
        </div>
        <div class="lf2-feature">
          <div class="lf2-top"><span class="lf2-pill">SEO</span></div>
          <h3>Indexação e performance</h3>
          <p>URLs amigáveis, metatags e base rápida para tráfego orgânico.</p>
        </div>
        <div class="lf2-feature">
          <div class="lf2-top"><span class="lf2-pill">Admin master</span></div>
          <h3>Gestão centralizada</h3>
          <p>Crie planos, acompanhe lojas, controle limites e monitore o sistema.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="como-funciona" class="lf2-section">
    <div class="lf2-container">
      <h2>Como funciona</h2>
      <p class="lf2-desc">Do cadastro à primeira venda: tudo em um fluxo simples para você e para seus lojistas.</p>

      <div class="lf2-steps">
        <div class="lf2-step">
          <div class="lf2-n">1</div>
          <h3>O lojista cria a conta</h3>
          <p>Escolhe um plano, define o nome da loja e já ganha um subdomínio automático.</p>
        </div>
        <div class="lf2-step">
          <div class="lf2-n">2</div>
          <h3>Configura catálogo e layout</h3>
          <p>Produtos, categorias e banners — com uma interface rápida e objetiva.</p>
        </div>
        <div class="lf2-step">
          <div class="lf2-n">3</div>
          <h3>Ativa pagamentos e frete</h3>
          <p>Integra gateway, define entrega e cupons. Pronto para vender.</p>
        </div>
        <div class="lf2-step">
          <div class="lf2-n">4</div>
          <h3>Você administra o ecossistema</h3>
          <p>Painel master para planos, domínio próprio, limites, suporte e métricas.</p>
        </div>
      </div>
    </div>


  @if ($bs->testimonial_section == 1)
    <!-- Testimonial Start -->
    <section class="testimonial-area">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-title ms-0" data-aos="fade-right">
              <h2 class="title">O que nossos clientes estão dizendo</h2>
            </div>
          </div>
          <div class="col-12">
            <div class="row align-items-center gx-xl-5">
              <div class="col-lg-6">
                <div class="image image-left" data-aos="fade-right">
                  <img class="lazyload" src="{{ asset('assets/front/images/placeholder.png') }}"
                    data-src="{{ asset('assets/front/img/testimonials/' . $be->testimonial_img) }}"
                    alt="Banner Image">
                </div>
              </div>
              <div class="col-lg-6">
                <div class="swiper testimonial-slider" data-aos="fade-left">
                  <div class="swiper-wrapper">

                    @for ($i = 0; $i <= count($testimonials); $i = $i + 2)
                      @if ($i < count($testimonials) - 1)
                        <div class="swiper-slide">

                          <div class="slider-item">
                            <div class="quote">
                              <span class="icon"><i class="fas fa-quote-right"></i></span>
                              <p class="text">{{ $testimonials[$i]->comment }}</p>
                            </div>
                            <div class="client">
                              <div class="image">
                                <div class="lazy-container aspect-ratio-1-1">
                                  <img class="lazyload lazy-image"
                                    src="{{ asset('assets/front/images/placeholder.png') }}"
                                    data-src="{{ $testimonials[$i]->image ? asset('assets/front/img/testimonials/' . $testimonials[$i]->image) : asset('assets/front/img/thumb-1.jpg') }}"
                                    alt="Person Image">
                                </div>
                              </div>
                              <div class="content">
                                <h6 class="name">{{ $testimonials[$i]->name }}</h6>
                                <span class="designation">{{ $testimonials[$i]->designation }}</span>
                              </div>
                            </div>
                          </div>

                          <div class="slider-item">
                            <div class="quote">
                              <span class="icon"><i class="fas fa-quote-right"></i></span>
                              <p class="text">{{ $testimonials[$i + 1]->comment }}</p>
                            </div>
                            <div class="client">
                              <div class="image">
                                <div class="lazy-container aspect-ratio-1-1">
                                  <img class="lazyload lazy-image"
                                    src="{{ asset('assets/front/images/placeholder.png') }}"
                                    data-src="{{ $testimonials[$i + 1]->image ? asset('assets/front/img/testimonials/' . $testimonials[$i + 1]->image) : asset('assets/front/img/thumb-1.jpg') }}"
                                    alt="Person Image">
                                </div>
                              </div>
                              <div class="content">
                                <h6 class="name">{{ $testimonials[$i + 1]->name }}</h6>
                                <span class="designation">{{ $testimonials[$i + 1]->designation }}</span>
                              </div>
                            </div>
                          </div>

                        </div>
                      @endif
                    @endfor

                  </div>
                  <div class="swiper-pagination"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Bg Overlay -->
      <img class="lazyload bg-overlay" src="{{ asset('assets/front/images/shadow-bg-1.png') }}" alt="Bg">
      <img class="lazyload bg-overlay" src="{{ asset('assets/front/images/shadow-bg-2.png') }}" alt="Bg">
      <!-- Bg Shape -->
      <div class="shape">
        <img class="lazyload shape-1" src="{{ asset('assets/front/images/shape/shape-8.png') }}" alt="Shape">
        <img class="lazyload shape-2" src="{{ asset('assets/front/images/shape/shape-3.png') }}" alt="Shape">
        <img class="lazyload shape-3" src="{{ asset('assets/front/images/shape/shape-4.png') }}" alt="Shape">
        <img class="lazyload shape-4" src="{{ asset('assets/front/images/shape/shape-7.png') }}" alt="Shape">
        <img class="lazyload shape-5" src="{{ asset('assets/front/images/shape/shape-6.png') }}" alt="Shape">
        <img class="lazyload shape-6" src="{{ asset('assets/front/images/shape/shape-10.png') }}" alt="Shape">
      </div>
    </section>
    <!-- Testimonial End -->
  @endif

  </section>

</div>

<script>
(function(){
  const host = @json($host);
</script>
@endsection
