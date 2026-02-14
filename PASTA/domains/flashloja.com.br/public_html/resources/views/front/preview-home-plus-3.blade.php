@extends('front.layout')

@section('pagename')
  - Preview Plus 3
@endsection

@section('styles')
<style>
  /* Inspired by /preview-home but upgraded to billion-dollar SaaS feel */
  .ph-wrap { overflow-x:hidden; }
  .ph-top { background: rgba(15,23,42,.92); color: rgba(255,255,255,.92); padding: 10px 0; font-size: 13px; }
  .ph-top a { color:#fff; font-weight: 900; text-decoration: underline; }
  .ph-hero { padding: 92px 0 62px; background: radial-gradient(900px 520px at 15% 20%, rgba(var(--color-primary-rgb), .18), transparent 60%), radial-gradient(900px 520px at 85% 30%, rgba(var(--color-primary-rgb), .10), transparent 55%), linear-gradient(180deg, rgba(2,6,23,.02), rgba(2,6,23,0)); border-bottom: 1px solid rgba(15,23,42,.06); }
  .ph-kicker { display:inline-flex; align-items:center; gap:10px; padding: 8px 12px; border-radius: 999px; background: rgba(15,23,42,.05); border:1px solid rgba(15,23,42,.08); font-weight: 900; font-size: 12px; letter-spacing: .02em; text-transform: uppercase; color:#0f172a; }
  .ph-title { font-size: clamp(38px, 3.8vw, 60px); line-height: 1.02; letter-spacing: -.03em; font-weight: 950; color:#0f172a; margin: 14px 0 12px; }
  .ph-sub { font-size: 18px; line-height: 1.65; color:#475569; max-width: 62ch; }
  .ph-cta { display:flex; flex-wrap:wrap; gap: 12px; margin-top: 20px; align-items:center; }
  .ph-btn { border-radius: 12px; padding: 12px 18px; font-weight: 950; text-decoration:none; display:inline-block; }
  .ph-btn-primary { background: var(--ph-accent); border: 1px solid var(--ph-accent); color:#fff; box-shadow: 0 14px 44px rgba(2,6,23,.12); }
  .ph-btn-secondary { background:#fff; border:1px solid rgba(15,23,42,.14); color:#0f172a; }
  .ph-proof { display:flex; flex-wrap:wrap; gap:10px 14px; margin-top: 18px; color:#64748b; font-size: 14px; }
  .ph-chip { padding: 6px 10px; border-radius: 999px; background: rgba(15,23,42,.03); border:1px solid rgba(15,23,42,.08); font-weight: 800; }
  .ph-heroimg { border-radius: 18px; overflow:hidden; border: 1px solid rgba(15,23,42,.10); box-shadow: 0 24px 80px rgba(2,6,23,.14); background:#fff; }
  .ph-heroimg img { width:100%; height:auto; display:block; }

  .ph-section { padding: 80px 0; }
  .ph-surface { background: rgba(15,23,42,.02); border-top:1px solid rgba(15,23,42,.06); border-bottom:1px solid rgba(15,23,42,.06); }
  .ph-h2 { font-weight: 950; color:#0f172a; letter-spacing: -.02em; margin:0; }
  .ph-lead { color:#64748b; margin-top: 10px; max-width: 74ch; }

  .ph-card { border:1px solid rgba(15,23,42,.10); border-radius: 16px; background:#fff; padding: 18px; height: 100%; box-shadow: 0 10px 26px rgba(2,6,23,.06); }
  .ph-card h3 { font-size: 18px; font-weight: 950; color:#0f172a; margin: 0 0 8px; letter-spacing: -.01em; }
  .ph-muted { color:#64748b; }

  .ph-gridicon { width: 40px; height: 40px; border-radius: 12px; display:flex; align-items:center; justify-content:center; background: rgba(var(--color-primary-rgb), .12); border: 1px solid rgba(var(--color-primary-rgb), .18); font-weight: 950; color:#0f172a; margin-bottom: 12px; }

  .ph-integrations { display:grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 10px; margin-top: 18px; }
  @media (max-width: 992px) { .ph-integrations { grid-template-columns: repeat(3, minmax(0,1fr)); } }
  .ph-integ { border:1px solid rgba(15,23,42,.10); border-radius: 14px; background:#fff; padding: 12px; text-align:center; font-weight: 900; color:#0f172a; font-size: 12px; }

  .ph-faq details { border:1px solid rgba(15,23,42,.10); border-radius: 14px; padding: 14px 16px; background:#fff; }
  .ph-faq summary { cursor:pointer; font-weight: 950; color:#0f172a; }
  .ph-faq p { margin: 10px 0 0; color:#475569; }

  .ph-final { padding: 72px 0; background: linear-gradient(180deg, rgba(15,23,42,.02), rgba(15,23,42,0)); }

  :root{--ph-accent:#0f766e;} .ph-gridicon{background:rgba(15,118,110,.12);border-color:rgba(15,118,110,.20);} .ph-btn-primary{box-shadow:0 18px 60px rgba(15,118,110,.22);}
</style>
@endsection

@section('content')
<div class="ph-wrap">
  <div class="ph-top">
    <div class="container d-flex flex-wrap align-items-center justify-content-between" style="gap:10px;">
      <div>Modelo Plus 3/5: serio (teal) + prova/credibilidade.</div>
      <div><a href="{{ route('front.pricing') }}">Ver planos</a></div>
    </div>
  </div>

  <section class="ph-hero">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="ph-kicker">Flashloja • Plataforma de ecommerce</div>
          <h1 class="ph-title">Crie uma loja com aparência premium e conversão real.</h1>
          <p class="ph-sub">Uma home com hierarquia de marca, CTAs claros e um produto que passa confiança. Pensado para escalar: do primeiro pedido ao alto volume.</p>
          <div class="ph-cta">
            <a class="ph-btn ph-btn-primary" href="{{ route('front.pricing') }}">Começar agora</a>
            <a class="ph-btn ph-btn-secondary" href="{{ route('front.templates.view') }}">Ver templates</a>
          </div>
          <div class="ph-proof">
            <span class="ph-chip">Checkout confiável</span>
            <span class="ph-chip">Mobile-first</span>
            <span class="ph-chip">SEO e performance</span>
            <span class="ph-chip">Pagamentos integrados</span>
          </div>
        </div>
        <div class="col-lg-6 mt-4 mt-lg-0">
          <div class="ph-heroimg"><img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=80" alt="Hero" /></div>
        </div>
      </div>

      <div class="row" style="margin-top: 18px;">
        <div class="col-lg-12">
          <div class="ph-integrations">
            <div class="ph-integ">PIX</div><div class="ph-integ">Cartão</div><div class="ph-integ">Boleto</div><div class="ph-integ">Frete</div><div class="ph-integ">Cupom</div><div class="ph-integ">WhatsApp</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="ph-section">
    <div class="container">
      <div class="row mb-4">
        <div class="col-lg-8">
          <h2 class="ph-h2">Padrão de empresa grande: design, produto e operação.</h2>
          <p class="ph-lead">Copys e imagens são simuladas para você visualizar o resultado final. Depois substituímos por conteúdo e fotos oficiais.</p>
        </div>
      </div>
      <div class="row g-3">
        <div class="col-md-6 col-lg-4"><div class="ph-card"><div class="ph-gridicon">A</div><h3>Arquitetura de conversão</h3><div class="ph-muted">Hierarquia e espaçamento para levar ao CTA sem ruído.</div></div></div>
        <div class="col-md-6 col-lg-4"><div class="ph-card"><div class="ph-gridicon">B</div><h3>Credibilidade instantânea</h3><div class="ph-muted">Visual sóbrio, padrões consistentes e linguagem de produto.</div></div></div>
        <div class="col-md-6 col-lg-4"><div class="ph-card"><div class="ph-gridicon">C</div><h3>Operação sem caos</h3><div class="ph-muted">Do catálogo ao pedido: fluxo simples para rotinas reais.</div></div></div>
      </div>
    </div>
  </section>

  <section class="ph-section ph-surface"><div class="container"><div class="row mb-4"><div class="col-lg-8"><h2 class="ph-h2">Prova social do jeito certo</h2><p class="ph-lead">Sem logos falsas. Aqui usamos blocos de cases e números simulados (substituíveis).</p></div></div><div class="row g-3"><div class="col-lg-4"><div class="ph-card"><h3>Case 01</h3><div class="ph-muted">+32% conversão em 60 dias (simulado).</div></div></div><div class="col-lg-4"><div class="ph-card"><h3>Case 02</h3><div class="ph-muted">Checkout mais rápido e menos abandono (simulado).</div></div></div><div class="col-lg-4"><div class="ph-card"><h3>Case 03</h3><div class="ph-muted">Mais pedidos com layout mobile-first (simulado).</div></div></div></div></div></section>

  <section class="ph-final">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-8">
          <h2 class="ph-h2">Pronto para elevar a Flashloja para outro patamar?</h2>
          <p class="ph-lead">Aprovando um desses modelos, a próxima etapa é ligar isso na rota / com segurança.</p>
        </div>
        <div class="col-lg-4" style="text-align:right;">
          <a class="ph-btn ph-btn-primary" href="{{ route('front.pricing') }}">Ver planos</a>
        </div>
      </div>
    </div>
  </section>
</div>
@endsection
