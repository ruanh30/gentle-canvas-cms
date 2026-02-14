@extends('front.layout')

@section('meta-description', 'Plataforma Flashloja: crie sua loja virtual com visual premium e foco em conversao.')
@section('meta-keywords', 'loja virtual, ecommerce, plataforma, templates, pagamentos, pedidos')

@section('pagename')
  - Preview Novo 3
@endsection

@section('styles')
<style>
  :root{ --accent: #4f46e5; }
  
  :root{
    --bg: #ffffff;
    --ink: #0f172a;
    --muted: #475569;
    --muted2: #64748b;
    --border: rgba(15,23,42,.10);
  }
  .lp{background:var(--bg); color:var(--ink); overflow-x:hidden;}
  .lp a{ text-decoration:none; }
  .lp-hero{ padding: 96px 0 70px; border-bottom: 1px solid rgba(15,23,42,.06); }
  .lp-kicker{ display:inline-flex; align-items:center; gap:10px; padding: 8px 12px; border-radius: 999px; background: rgba(37,99,235,.08); border: 1px solid rgba(37,99,235,.14); font-weight: 900; font-size: 12px; letter-spacing: .02em; text-transform: uppercase; color: var(--ink); }
  .lp-title{ font-size: clamp(40px, 4.2vw, 64px); line-height: 1.02; letter-spacing: -.03em; font-weight: 950; margin: 14px 0 12px; }
  .lp-sub{ font-size: 18px; line-height: 1.7; color: var(--muted); max-width: 64ch; }
  .lp-cta{ display:flex; flex-wrap:wrap; gap:12px; margin-top: 20px; align-items:center; }
  .lp-btn{ border-radius: 12px; padding: 12px 18px; font-weight: 950; display:inline-block; }
  .lp-btn-primary{ background: var(--accent); color:#fff; border: 1px solid var(--accent); box-shadow: 0 18px 70px rgba(37,99,235,.20); }
  .lp-btn-secondary{ background:#fff; color: var(--ink); border: 1px solid rgba(15,23,42,.14); }
  .lp-proof{ display:flex; flex-wrap:wrap; gap:10px 14px; margin-top: 18px; color: var(--muted2); font-size: 14px; }
  .lp-chip{ padding: 6px 10px; border-radius: 999px; background: rgba(15,23,42,.03); border: 1px solid rgba(15,23,42,.08); font-weight: 800; }
  .lp-media{ border-radius: 18px; overflow:hidden; border: 1px solid rgba(15,23,42,.10); background: #fff; box-shadow: 0 28px 90px rgba(2,6,23,.12); }
  .lp-media img{ width:100%; height:auto; display:block; }
  .lp-section{ padding: 86px 0; }
  .lp-surface{ background: rgba(15,23,42,.02); border-top: 1px solid rgba(15,23,42,.06); border-bottom: 1px solid rgba(15,23,42,.06); }
  .lp-h2{ font-weight: 950; letter-spacing: -.02em; margin: 0; }
  .lp-lead{ margin-top: 10px; color: var(--muted2); max-width: 78ch; }
  .lp-card{ border: 1px solid var(--border); border-radius: 16px; background: #fff; padding: 18px; height: 100%; box-shadow: 0 12px 30px rgba(2,6,23,.06); }
  .lp-card h3{ font-size: 18px; font-weight: 950; letter-spacing: -.01em; margin: 0 0 8px; }
  .lp-muted{ color: var(--muted2); }
  .lp-icon{ width: 40px; height: 40px; border-radius: 12px; display:flex; align-items:center; justify-content:center; background: rgba(124,58,237,.10); border: 1px solid rgba(124,58,237,.16); font-weight: 950; margin-bottom: 12px; color: var(--ink); }
  .lp-logos{ display:flex; flex-wrap:wrap; gap: 10px; margin-top: 18px; }
  .lp-logo{ border:1px solid rgba(15,23,42,.10); border-radius: 14px; background:#fff; padding: 10px 12px; font-weight: 900; font-size: 12px; color: var(--ink); }
  .lp-faq details{ border:1px solid rgba(15,23,42,.10); border-radius: 14px; padding: 14px 16px; background:#fff; }
  .lp-faq summary{ cursor:pointer; font-weight: 950; }
  .lp-faq p{ margin: 10px 0 0; color: var(--muted); }
  .lp-final{ padding: 76px 0; background: linear-gradient(180deg, rgba(37,99,235,.06), rgba(255,255,255,0)); }

  
  .lp-section{padding: 96px 0;}
  .lp-card{box-shadow: 0 18px 46px rgba(2,6,23,.08);} 
  .lp-icon{background: rgba(79,70,229,.10); border-color: rgba(79,70,229,.18);} 

</style>
@endsection

@section('content')
<div class="lp">
  <section class="lp-hero">
    <div class="container">
      <div class="row align-items-center"><div class="col-lg-6">
<div class="lp-kicker">Landing com mais densidade de conteudo (SaaS)</div>
<h1 class="lp-title">Venda mais com uma home pensada para cliques, confianca e conversao.</h1>
<p class="lp-sub">Landing page no estilo SaaS (como os grandes players), mas conectada ao seu sistema: planos, templates, login e lojas em destaque. Tudo sem mexer na home oficial ate voce aprovar.</p>
<div class="lp-cta">
  <a class="lp-btn lp-btn-primary" href="{{ route('front.pricing') }}">Ver planos</a>
  <a class="lp-btn lp-btn-secondary" href="{{ route('front.templates.view') }}">Ver templates</a>
  <a class="lp-btn lp-btn-secondary" href="{{ route('user.login') }}">Entrar</a>
</div>
<div class="lp-proof">
  <span class="lp-chip">Sem codigo</span>
  <span class="lp-chip">Checkout e pagamentos</span>
  <span class="lp-chip">Mobile-first</span>
  <span class="lp-chip">SEO e performance</span>
</div>
<div class="lp-logos">
  <div class="lp-logo">PIX</div><div class="lp-logo">Cartao</div><div class="lp-logo">Boleto</div><div class="lp-logo">Frete</div><div class="lp-logo">Cupons</div><div class="lp-logo">WhatsApp</div>
</div>
</div>
<div class="col-lg-6 mt-4 mt-lg-0">
  <div class="lp-media"><img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%271200%27%20height%3D%27760%27%20viewBox%3D%270%200%201200%20760%27%3E%0A%3Cdefs%3E%0A%20%20%3ClinearGradient%20id%3D%27g%27%20x1%3D%270%27%20y1%3D%270%27%20x2%3D%271%27%20y2%3D%271%27%3E%0A%20%20%20%20%3Cstop%20offset%3D%270%27%20stop-color%3D%27%237c3aed%27%20stop-opacity%3D%270.22%27/%3E%0A%20%20%20%20%3Cstop%20offset%3D%271%27%20stop-color%3D%27%232563eb%27%20stop-opacity%3D%270.14%27/%3E%0A%20%20%3C/linearGradient%3E%0A%3C/defs%3E%0A%3Crect%20x%3D%270%27%20y%3D%270%27%20width%3D%271200%27%20height%3D%27760%27%20rx%3D%2728%27%20fill%3D%27url%28%23g%29%27/%3E%0A%3Crect%20x%3D%2752%27%20y%3D%2754%27%20width%3D%271096%27%20height%3D%2770%27%20rx%3D%2714%27%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.95%27%20stroke%3D%27%23e5e7eb%27/%3E%0A%3Ccircle%20cx%3D%2790%27%20cy%3D%2789%27%20r%3D%2710%27%20fill%3D%27%23ef4444%27/%3E%0A%3Ccircle%20cx%3D%27122%27%20cy%3D%2789%27%20r%3D%2710%27%20fill%3D%27%23f59e0b%27/%3E%0A%3Ccircle%20cx%3D%27154%27%20cy%3D%2789%27%20r%3D%2710%27%20fill%3D%27%2310b981%27/%3E%0A%3Crect%20x%3D%2752%27%20y%3D%27150%27%20width%3D%27280%27%20height%3D%27560%27%20rx%3D%2718%27%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.92%27%20stroke%3D%27%23e5e7eb%27/%3E%0A%3Crect%20x%3D%27374%27%20y%3D%27150%27%20width%3D%27774%27%20height%3D%27250%27%20rx%3D%2718%27%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.92%27%20stroke%3D%27%23e5e7eb%27/%3E%0A%3Crect%20x%3D%27374%27%20y%3D%27430%27%20width%3D%27370%27%20height%3D%27280%27%20rx%3D%2718%27%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.92%27%20stroke%3D%27%23e5e7eb%27/%3E%0A%3Crect%20x%3D%27778%27%20y%3D%27430%27%20width%3D%27370%27%20height%3D%27280%27%20rx%3D%2718%27%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.92%27%20stroke%3D%27%23e5e7eb%27/%3E%0A%3Ctext%20x%3D%2786%27%20y%3D%27210%27%20font-family%3D%27Arial%27%20font-size%3D%2720%27%20fill%3D%27%230f172a%27%20font-weight%3D%27700%27%3EMenu%3C/text%3E%0A%3Ctext%20x%3D%27410%27%20y%3D%27210%27%20font-family%3D%27Arial%27%20font-size%3D%2722%27%20fill%3D%27%230f172a%27%20font-weight%3D%27800%27%3EDashboard%20%28exemplo%29%3C/text%3E%0A%3Ctext%20x%3D%27410%27%20y%3D%27250%27%20font-family%3D%27Arial%27%20font-size%3D%2716%27%20fill%3D%27%2364748b%27%3EPedidos%2C%20receita%20e%20funil%20em%20um%20painel%20simples.%3C/text%3E%0A%3Crect%20x%3D%27410%27%20y%3D%27285%27%20width%3D%27700%27%20height%3D%2710%27%20rx%3D%275%27%20fill%3D%27%23e5e7eb%27/%3E%0A%3Crect%20x%3D%27410%27%20y%3D%27285%27%20width%3D%27380%27%20height%3D%2710%27%20rx%3D%275%27%20fill%3D%27%237c3aed%27%20fill-opacity%3D%270.65%27/%3E%0A%3Crect%20x%3D%27410%27%20y%3D%27315%27%20width%3D%27520%27%20height%3D%2710%27%20rx%3D%275%27%20fill%3D%27%23e5e7eb%27/%3E%0A%3Crect%20x%3D%27410%27%20y%3D%27315%27%20width%3D%27290%27%20height%3D%2710%27%20rx%3D%275%27%20fill%3D%27%232563eb%27%20fill-opacity%3D%270.55%27/%3E%0A%3Crect%20x%3D%27410%27%20y%3D%27345%27%20width%3D%27640%27%20height%3D%2710%27%20rx%3D%275%27%20fill%3D%27%23e5e7eb%27/%3E%0A%3Crect%20x%3D%27410%27%20y%3D%27345%27%20width%3D%27340%27%20height%3D%2710%27%20rx%3D%275%27%20fill%3D%27%237c3aed%27%20fill-opacity%3D%270.45%27/%3E%0A%3C/svg%3E" alt="Produto"></div>
</div></div>
    </div>
  </section>
  
<section class="lp-section">
  <div class="container">
    <div class="row mb-4"><div class="col-lg-8"><h2 class="lp-h2">Uma home que parece grande (e vende como grande)</h2>
      <p class="lp-lead">Aqui voce ve copy e visual no nivel certo. Depois ajustamos com sua proposta de valor e provas reais.</p>
    </div></div>

    <div class="row g-3">
      @foreach ($features->take(6) as $feature)
        <div class="col-md-6 col-lg-4">
          <div class="lp-card">
            <div class="lp-icon">F</div>
            <h3>{{ $feature->title }}</h3>
            <div class="lp-muted">{{ $feature->text }}</div>
          </div>
        </div>
      @endforeach

      @if (count($features) == 0)
        <div class="col-md-6 col-lg-4"><div class="lp-card"><div class="lp-icon">1</div><h3>Checkout que converte</h3><div class="lp-muted">Fluxo simples, objetivo e confiavel para finalizar.</div></div></div>
        <div class="col-md-6 col-lg-4"><div class="lp-card"><div class="lp-icon">2</div><h3>Vitrine premium</h3><div class="lp-muted">Templates modernos com foco em compra.</div></div></div>
        <div class="col-md-6 col-lg-4"><div class="lp-card"><div class="lp-icon">3</div><h3>Operacao organizada</h3><div class="lp-muted">Pedidos, catalogo e rotinas num painel unico.</div></div></div>
      @endif
    </div>
  </div>
</section>

<section class="lp-section lp-surface">
  <div class="container">
    <div class="row mb-4"><div class="col-lg-8"><h2 class="lp-h2">Como funciona (sem enrolacao)</h2>
      <p class="lp-lead">Passos diretos, iguais aos sites top do mercado, mas adaptados ao que a Flashloja entrega.</p>
    </div></div>
    <div class="row g-3">
      @foreach ($processes->take(4) as $process)
        <div class="col-md-6 col-lg-3">
          <div class="lp-card">
            <div class="lp-icon">{{ $loop->iteration }}</div>
            <h3>{{ $process->title }}</h3>
            <div class="lp-muted">{{ $process->text }}</div>
          </div>
        </div>
      @endforeach
    </div>
    <div style="margin-top:22px;" class="lp-cta">
      <a class="lp-btn lp-btn-primary" href="{{ route('front.pricing') }}">Escolher plano</a>
      <a class="lp-btn lp-btn-secondary" href="{{ route('front.contact') }}">Falar com a equipe</a>
    </div>
  </div>
</section>

<section class="lp-section">
  <div class="container">
    <div class="row mb-4"><div class="col-lg-8"><h2 class="lp-h2">Templates e exemplos</h2>
      <p class="lp-lead">Visual para voce enxergar resultado. Os cards puxam dados reais quando existirem.</p>
    </div></div>
    <div class="row g-3">
      @foreach ($templates->take(6) as $template)
        <div class="col-sm-6 col-lg-4">
          <div class="lp-card">
            <h3 style="margin-bottom:6px;">{{ $template->username ?? 'Template' }}</h3>
            <div class="lp-muted" style="margin-bottom:12px;">Exemplo de vitrine com estrutura pronta para conversao.</div>
            <a class="lp-btn lp-btn-secondary" href="{{ detailsUrl($template) }}" target="_blank">Abrir exemplo</a>
          </div>
        </div>
      @endforeach
    </div>
  </div>
</section>

<section class="lp-section lp-surface">
  <div class="container">
    <div class="row mb-4"><div class="col-lg-8"><h2 class="lp-h2">FAQ</h2>
      <p class="lp-lead">Respostas curtas para tirar friccao antes do clique no plano.</p>
    </div></div>
    <div class="row g-3 lp-faq">
      <div class="col-lg-6"><details><summary>Preciso saber programar?</summary><p>Nao. A plataforma foi feita para voce configurar e publicar com rapidez.</p></details></div>
      <div class="col-lg-6"><details><summary>Consigo mudar o visual depois?</summary><p>Sim. Voce troca tema e ajusta elementos sem perder estrutura.</p></details></div>
      <div class="col-lg-6"><details><summary>Quais pagamentos posso usar?</summary><p>Depende das integracoes ativas, mas a plataforma suporta diversos metodos.</p></details></div>
      <div class="col-lg-6"><details><summary>Como eu comeco?</summary><p>Escolha um plano, selecione um tema e publique sua loja.</p></details></div>
    </div>
  </div>
</section>

<section class="lp-final">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-8">
        <h2 class="lp-h2">Vamos transformar isso na home oficial?</h2>
        <p class="lp-lead">Quando voce aprovar um desses modelos, a gente liga ele na rota / com backup e rollback.</p>
      </div>
      <div class="col-lg-4" style="text-align:right;">
        <a class="lp-btn lp-btn-primary" href="{{ route('front.pricing') }}">Ver planos</a>
      </div>
    </div>
  </div>
</section>

</div>
@endsection
