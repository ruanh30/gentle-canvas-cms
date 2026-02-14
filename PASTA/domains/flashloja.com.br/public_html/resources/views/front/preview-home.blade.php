@extends('front.layout')

@section('pagename')
  - Preview Home
@endsection

@section('meta-description', !empty($seo) ? $seo->home_meta_description : '')
@section('meta-keywords', !empty($seo) ? $seo->home_meta_keywords : '')

@section('styles')
  <style>
    /* Home V2 (preview) — inspirado em meloja/tray/jumpseller/yampi/nloja/wbuy/lojavirtual */
    .ocv2-topbar{background:rgba(15,23,42,.92);color:rgba(255,255,255,.92);font-size:13px;line-height:1.3;padding:10px 0}
    .ocv2-topbar a{color:#fff;text-decoration:underline;font-weight:800}
    .ocv2-hero{padding:84px 0 54px;background:radial-gradient(900px 480px at 12% 10%,rgba(var(--color-primary-rgb),.16),transparent 60%),radial-gradient(900px 480px at 88% 30%,rgba(var(--color-primary-rgb),.08),transparent 55%),linear-gradient(180deg,rgba(2,6,23,.02),rgba(2,6,23,0));border-bottom:1px solid rgba(15,23,42,.06)}
    .ocv2-kicker{display:inline-flex;align-items:center;gap:10px;padding:8px 12px;border-radius:999px;background:rgba(var(--color-primary-rgb),.10);color:#0f172a;font-weight:900;font-size:13px;letter-spacing:.02em;text-transform:uppercase}
    .ocv2-title{font-size:clamp(34px,3.6vw,54px);line-height:1.05;letter-spacing:-.02em;margin:14px 0 12px;color:#0f172a}
    .ocv2-subtitle{font-size:18px;line-height:1.6;color:#475569;max-width:56ch;margin:0}
    .ocv2-cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px;align-items:center}
    .ocv2-btn-primary{background:var(--color-primary);border:1px solid var(--color-primary);color:#fff;padding:12px 18px;border-radius:12px;font-weight:900;text-decoration:none;box-shadow:0 10px 30px rgba(var(--color-primary-rgb),.22)}
    .ocv2-btn-primary:hover{filter:brightness(.95);color:#fff}
    .ocv2-btn-secondary{background:#fff;border:1px solid rgba(15,23,42,.14);color:#0f172a;padding:12px 18px;border-radius:12px;font-weight:900;text-decoration:none}
    .ocv2-trustrow{margin-top:18px;display:flex;flex-wrap:wrap;gap:10px 16px;color:#64748b;font-size:14px}
    .ocv2-check{display:inline-flex;align-items:center;gap:8px;padding:6px 10px;border-radius:999px;background:rgba(15,23,42,.04);border:1px solid rgba(15,23,42,.06);font-weight:700}
    .ocv2-hero-card{border:1px solid rgba(15,23,42,.10);border-radius:18px;background:#fff;padding:18px;box-shadow:0 18px 50px rgba(2,6,23,.08)}
    .ocv2-hero-shot{border-radius:14px;overflow:hidden;background:rgba(15,23,42,.03);border:1px solid rgba(15,23,42,.08)}
    .ocv2-section{padding:72px 0}
    .ocv2-section-title{color:#0f172a;letter-spacing:-.01em;margin:0;font-weight:900}
    .ocv2-section-lead{color:#64748b;margin-top:10px;max-width:70ch}
    .ocv2-card{border:1px solid rgba(15,23,42,.10);border-radius:16px;background:#fff;padding:18px;height:100%;box-shadow:0 12px 28px rgba(2,6,23,.05)}
    .ocv2-card h3{margin:0 0 8px;color:#0f172a;font-size:18px;font-weight:900;letter-spacing:-.01em}
    .ocv2-muted{color:#64748b}
    .ocv2-badges{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}
    .ocv2-badge{padding:7px 10px;border-radius:999px;background:rgba(15,23,42,.04);color:#334155;font-size:13px;border:1px solid rgba(15,23,42,.06);font-weight:800}
    .ocv2-logos{display:flex;flex-wrap:wrap;gap:18px 26px;align-items:center;opacity:.9;margin-top:22px}
    .ocv2-logos img{height:26px;width:auto;filter:grayscale(1);opacity:.75}
    .ocv2-surface{background:rgba(15,23,42,.02);border-top:1px solid rgba(15,23,42,.06);border-bottom:1px solid rgba(15,23,42,.06)}
    .ocv2-illus{width:100%;border-radius:14px;border:1px solid rgba(15,23,42,.10);background:#fff;overflow:hidden}
    .ocv2-faq details{border:1px solid rgba(15,23,42,.10);border-radius:14px;padding:14px 16px;background:#fff}
    .ocv2-faq summary{cursor:pointer;font-weight:900;color:#0f172a}
    .ocv2-faq p{margin:10px 0 0;color:#475569}
    .ocv2-testimonial{display:flex;gap:12px;align-items:flex-start}
    .ocv2-avatar{width:42px;height:42px;border-radius:999px;background:rgba(var(--color-primary-rgb),.14);border:1px solid rgba(var(--color-primary-rgb),.18);display:flex;align-items:center;justify-content:center;font-weight:900;color:#0f172a;flex:0 0 auto}
    .ocv2-preview-note{margin-top:12px;border:1px dashed rgba(15,23,42,.25);border-radius:12px;padding:12px 14px;background:rgba(255,255,255,.85);backdrop-filter:blur(6px);color:#0f172a;font-size:14px}
  </style>
@endsection

@section('content')

  @php
    $mockLogos = [
      'https://dummyimage.com/140x40/111827/ffffff&text=LOGO+1',
      'https://dummyimage.com/140x40/111827/ffffff&text=LOGO+2',
      'https://dummyimage.com/140x40/111827/ffffff&text=LOGO+3',
      'https://dummyimage.com/140x40/111827/ffffff&text=LOGO+4',
      'https://dummyimage.com/140x40/111827/ffffff&text=LOGO+5'
    ];

    $testimonialsMock = [
      ['name' => 'Mariana S.', 'role' => 'Lojista (Moda)', 'text' => 'Em poucos dias consegui publicar, configurar pagamentos e deixar a vitrine com cara profissional. A conversao melhorou sem precisar mexer em codigo.'],
      ['name' => 'Carlos A.', 'role' => 'Lojista (Eletronicos)', 'text' => 'O painel de pedidos e a organizacao do catalogo economizam muito tempo. A loja fica rapida e passa mais confianca para o cliente.'],
      ['name' => 'Fernanda L.', 'role' => 'Lojista (Cosmeticos)', 'text' => 'Da para escolher um tema moderno e ajustar o visual sem quebrar nada. Ficou com cara de marca maior.'],
    ];

    $heroImg = (!empty($homeSec) && !empty($homeSec->image)) ? asset('assets/front/img/' . $homeSec->image) : asset('assets/front/images/placeholder.png');

    $mockDashboardSvg = 'data:image/svg+xml;utf8,' . rawurlencode('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0f172a" stop-opacity="0.04"/><stop offset="1" stop-color="#0f172a" stop-opacity="0.01"/></linearGradient></defs><rect x="0" y="0" width="1200" height="760" rx="28" fill="url(#g)"/><rect x="52" y="54" width="1096" height="70" rx="14" fill="#ffffff" stroke="#e5e7eb"/><circle cx="90" cy="89" r="10" fill="#ef4444"/><circle cx="122" cy="89" r="10" fill="#f59e0b"/><circle cx="154" cy="89" r="10" fill="#10b981"/><rect x="52" y="150" width="280" height="560" rx="18" fill="#ffffff" stroke="#e5e7eb"/><rect x="374" y="150" width="774" height="250" rx="18" fill="#ffffff" stroke="#e5e7eb"/><rect x="374" y="430" width="370" height="280" rx="18" fill="#ffffff" stroke="#e5e7eb"/><rect x="778" y="430" width="370" height="280" rx="18" fill="#ffffff" stroke="#e5e7eb"/><text x="86" y="210" font-family="Arial" font-size="20" fill="#0f172a" font-weight="700">Menu</text><text x="410" y="210" font-family="Arial" font-size="22" fill="#0f172a" font-weight="800">Dashboard (exemplo)</text><text x="410" y="250" font-family="Arial" font-size="16" fill="#64748b">Pedidos, receita e funil em um painel simples.</text><rect x="410" y="280" width="700" height="10" rx="5" fill="#e5e7eb"/><rect x="410" y="280" width="380" height="10" rx="5" fill="#6366f1" fill-opacity="0.7"/><rect x="410" y="305" width="520" height="10" rx="5" fill="#e5e7eb"/><rect x="410" y="305" width="290" height="10" rx="5" fill="#10b981" fill-opacity="0.65"/><rect x="410" y="330" width="640" height="10" rx="5" fill="#e5e7eb"/><rect x="410" y="330" width="340" height="10" rx="5" fill="#f59e0b" fill-opacity="0.65"/></svg>');
  @endphp

  <div class="ocv2-topbar">
    <div class="container d-flex flex-wrap align-items-center justify-content-between" style="gap:10px;">
      <div>Plataforma para criar loja online com foco em conversao, performance e confianca.</div>
      <div><a href="{{ route('front.pricing') }}">Ver planos</a></div>
    </div>
  </div>

  <div class="container">
    <div class="ocv2-preview-note">Preview de layout (Home V2). Nada aqui substitui a pagina inicial ainda. URL: <strong>/preview-home</strong></div>
  </div>

  <section class="ocv2-hero">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="ocv2-kicker">Flashloja</div>
          <h1 class="ocv2-title">Crie sua loja virtual e venda com uma operacao profissional.</h1>
          <p class="ocv2-subtitle">Um site bonito vende mais quando passa confianca. Na Flashloja, voce cria sua vitrine, configura pagamentos e gerencia pedidos em um painel simples.</p>

          <div class="ocv2-cta">
            <a class="ocv2-btn-primary" href="{{ route('front.pricing') }}">Comecar agora</a>
            <a class="ocv2-btn-secondary" href="{{ route('front.templates.view') }}">Ver templates</a>
          </div>

          <div class="ocv2-trustrow">
            <span class="ocv2-check">Checkout seguro</span>
            <span class="ocv2-check">Templates modernos</span>
            <span class="ocv2-check">Gestao de pedidos</span>
            <span class="ocv2-check">Suporte</span>
          </div>

          <div class="ocv2-badges">
            <span class="ocv2-badge">Pagamentos integrados</span>
            <span class="ocv2-badge">SEO e performance</span>
            <span class="ocv2-badge">Design responsivo</span>
          </div>

          @if (!empty($partners) && count($partners) > 0)
            <div class="ocv2-logos">
              @foreach ($partners->take(6) as $partner)
                <img src="{{ asset('assets/front/img/partners/' . $partner->image) }}" alt="Partner">
              @endforeach
            </div>
          @else
            <div class="ocv2-logos">
              @foreach ($mockLogos as $logo)
                <img src="{{ $logo }}" alt="Logo">
              @endforeach
            </div>
          @endif
        </div>

        <div class="col-lg-6 mt-4 mt-lg-0">
          <div class="ocv2-hero-card">
            <div style="font-weight:900;color:#0f172a;margin-bottom:12px;">Como sua loja pode ficar</div>
            <div class="ocv2-hero-shot">
              <img style="width:100%;height:auto;display:block;" src="{{ $mockDashboardSvg }}" alt="Dashboard">
            </div>
            <div class="row g-3" style="margin-top:14px;">
              <div class="col-sm-6"><div class="ocv2-card" style="box-shadow:none;padding:14px;"><h3>Catalogo</h3><div class="ocv2-muted">Produtos, variacoes, imagens e precos.</div></div></div>
              <div class="col-sm-6"><div class="ocv2-card" style="box-shadow:none;padding:14px;"><h3>Pedidos</h3><div class="ocv2-muted">Do pagamento ao envio, com organizacao.</div></div></div>
              <div class="col-12"><div class="ocv2-illus" style="margin-top:2px;"><img style="width:100%;height:auto;display:block;" src="{{ $heroImg }}" alt="Ilustracao"></div></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <section class="ocv2-section">
    <div class="container">
      <div class="row mb-4"><div class="col-lg-8"><h2 class="ocv2-section-title">Tudo o que voce precisa para vender</h2><p class="ocv2-section-lead">Estrutura pronta para lancar rapido e evoluir com seguranca. O foco e conversao: menos distracao, mais compra.</p></div></div>
      <div class="row g-3">
        @foreach ($features->take(6) as $feature)
          <div class="col-md-6 col-lg-4"><div class="ocv2-card"><h3>{{ $feature->title }}</h3><div class="ocv2-muted">{{ $feature->text }}</div></div></div>
        @endforeach
        @if (count($features) == 0)
          <div class="col-md-6 col-lg-4"><div class="ocv2-card"><h3>Checkout que passa confianca</h3><div class="ocv2-muted">Experiencia simples para o cliente finalizar a compra.</div></div></div>
          <div class="col-md-6 col-lg-4"><div class="ocv2-card"><h3>Marketing e integracoes</h3><div class="ocv2-muted">Recursos para divulgacao, paginas e funis.</div></div></div>
          <div class="col-md-6 col-lg-4"><div class="ocv2-card"><h3>Gestao de estoque</h3><div class="ocv2-muted">Controle do catalogo para operar sem erros.</div></div></div>
        @endif
      </div>
      <div class="mt-4"><a class="ocv2-btn-primary" href="{{ route('front.pricing') }}">Ver planos e recursos</a></div>
    </div>
  </section>

  <section class="ocv2-section ocv2-surface">
    <div class="container">
      <div class="row mb-4"><div class="col-lg-8"><h2 class="ocv2-section-title">Como funciona</h2><p class="ocv2-section-lead">Um caminho simples para colocar a loja no ar e comecar a vender.</p></div></div>
      <div class="row g-3">
        @foreach ($processes->take(4) as $process)
          <div class="col-md-6 col-lg-3"><div class="ocv2-card"><h3>{{ $process->title }}</h3><div class="ocv2-muted">{{ $process->text }}</div></div></div>
        @endforeach
      </div>
      <div class="mt-4"><a class="ocv2-btn-primary" href="{{ route('front.pricing') }}">Quero comecar</a><a class="ocv2-btn-secondary" href="{{ route('front.contact') }}" style="margin-left:10px;">Falar com a equipe</a></div>
    </div>
  </section>

  <section class="ocv2-section">
    <div class="container">
      <div class="row mb-4"><div class="col-lg-8"><h2 class="ocv2-section-title">Templates e exemplos</h2><p class="ocv2-section-lead">Escolha um tema moderno e personalize. Menos poluicao visual, mais foco em compra.</p></div></div>
      <div class="row g-3">
        @foreach ($templates->take(6) as $template)
          <div class="col-sm-6 col-lg-4">
            <div class="ocv2-card">
              <div class="ocv2-illus" style="margin-bottom:12px;">
                @php
                  $img = !empty($template->template_img) ? asset('assets/front/img/template-previews/' . $template->template_img) : asset('assets/front/images/placeholder.png');
                @endphp
                <img style="width:100%;height:auto;display:block;" src="{{ $img }}" alt="Template">
              </div>
              <h3>{{ $template->username ?? 'Template' }}</h3>
              <div class="ocv2-muted" style="margin-bottom:12px;">Exemplo de vitrine com estrutura pronta para conversao.</div>
              <a class="ocv2-btn-secondary" href="{{ detailsUrl($template) }}" target="_blank">Abrir exemplo</a>
            </div>
          </div>
        @endforeach
      </div>
    </div>
  </section>

  <section class="ocv2-section ocv2-surface">
    <div class="container">
      <div class="row mb-4"><div class="col-lg-8"><h2 class="ocv2-section-title">O que os lojistas dizem</h2><p class="ocv2-section-lead">Prova social simulada por enquanto, para visualizar o layout final.</p></div></div>
      <div class="row g-3">
        @foreach ($testimonialsMock as $t)
          @php $initials = mb_strtoupper(mb_substr($t['name'], 0, 1)); @endphp
          <div class="col-md-6 col-lg-4"><div class="ocv2-card"><div class="ocv2-testimonial"><div class="ocv2-avatar">{{ $initials }}</div><div><div style="font-weight:900;color:#0f172a;">{{ $t['name'] }}</div><div class="ocv2-muted" style="font-size:13px;margin-top:2px;">{{ $t['role'] }}</div></div></div><div style="margin-top:12px;color:#334155;line-height:1.6;">“{{ $t['text'] }}”</div></div></div>
        @endforeach
      </div>
      <div class="mt-4"><a class="ocv2-btn-primary" href="{{ route('front.pricing') }}">Ver planos</a></div>
    </div>
  </section>

  <section class="ocv2-section">
    <div class="container">
      <div class="row mb-4"><div class="col-lg-8"><h2 class="ocv2-section-title">Perguntas frequentes</h2><p class="ocv2-section-lead">Diminui friccao e aumenta a chance de clique no plano.</p></div></div>
      <div class="row g-3 ocv2-faq">
        <div class="col-lg-6"><details><summary>Em quanto tempo consigo colocar a loja no ar?</summary><p>Em geral, voce consegue publicar rapido: escolher plano, ajustar tema e cadastrar os primeiros produtos.</p></details></div>
        <div class="col-lg-6"><details><summary>Preciso saber programar?</summary><p>Nao. A proposta e usar templates e configuracoes guiadas para voce focar em vender.</p></details></div>
        <div class="col-lg-6"><details><summary>Posso trocar o tema depois?</summary><p>Sim. Voce pode trocar o tema e manter o conteudo principal, ajustando o visual quando quiser.</p></details></div>
        <div class="col-lg-6"><details><summary>Quais formas de pagamento estao disponiveis?</summary><p>Depende das integracoes ativadas. A plataforma suporta diversos gateways e metodos.</p></details></div>
      </div>
      <div class="mt-4 ocv2-cta"><a class="ocv2-btn-primary" href="{{ route('front.pricing') }}">Comecar agora</a><a class="ocv2-btn-secondary" href="{{ route('user.login') }}">Entrar</a></div>
    </div>
  </section>

@endsection
