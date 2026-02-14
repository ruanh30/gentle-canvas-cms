@extends('front.layout')

@section('pagename')
  - Preview Home
@endsection

@section('meta-description', !empty($seo) ? $seo->home_meta_description : '')
@section('meta-keywords', !empty($seo) ? $seo->home_meta_keywords : '')

@section('styles')
<style>
:root{--v1-navy:#0b1220;--v1-border:rgba(15,23,42,.10);}
.v1-top{background:var(--v1-navy);color:rgba(255,255,255,.92);padding:10px 0;font-size:13px;}
.v1-top a{color:#fff;font-weight:800;text-decoration:underline;}
.v1-hero{padding:86px 0 56px;background:linear-gradient(180deg,rgba(11,18,32,.04),rgba(11,18,32,0));border-bottom:1px solid rgba(15,23,42,.06);}
.v1-kicker{display:inline-block;padding:7px 10px;border-radius:999px;background:rgba(15,23,42,.06);font-weight:900;font-size:13px;color:var(--v1-navy);letter-spacing:.02em;text-transform:uppercase;}
.v1-title{font-size:clamp(36px,3.8vw,56px);line-height:1.04;letter-spacing:-.02em;color:var(--v1-navy);margin:14px 0 12px;font-weight:900;}
.v1-sub{color:#475569;font-size:18px;line-height:1.6;max-width:58ch;}
.v1-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:20px;}
.v1-btn{border-radius:12px;padding:12px 18px;font-weight:900;text-decoration:none;display:inline-block;}
.v1-btn-primary{background:var(--v1-navy);border:1px solid var(--v1-navy);color:#fff;}
.v1-btn-secondary{background:#fff;border:1px solid rgba(15,23,42,.16);color:var(--v1-navy);}
.v1-proof{display:flex;flex-wrap:wrap;gap:10px 14px;margin-top:18px;color:#64748b;font-size:14px;}
.v1-chip{padding:6px 10px;border-radius:999px;border:1px solid rgba(15,23,42,.10);background:rgba(15,23,42,.02);font-weight:700;}
.v1-card{border:1px solid var(--v1-border);border-radius:16px;background:#fff;padding:18px;height:100%;box-shadow:0 10px 26px rgba(2,6,23,.06);}
.v1-section{padding:72px 0;}
.v1-h2{font-weight:900;color:var(--v1-navy);letter-spacing:-.01em;}
.v1-lead{color:#64748b;margin-top:10px;max-width:70ch;}
.v1-heroimg{border-radius:18px;overflow:hidden;border:1px solid rgba(15,23,42,.10);box-shadow:0 20px 60px rgba(2,6,23,.12);}
</style>
@endsection

@section('content')
<div class="v1-top"><div class="container d-flex flex-wrap justify-content-between" style="gap:10px;"><div>Prototipo 1/5: corporativo e sobrio.</div><div><a href="{{ route('front.pricing') }}">Ver planos</a></div></div></div>
<section class="v1-hero"><div class="container"><div class="row align-items-center"><div class="col-lg-6">
<span class="v1-kicker">Flashloja</span>
<h1 class="v1-title">Sua loja com visual serio e estrutura pronta para vender.</h1>
<p class="v1-sub">Uma vitrine moderna, checkout confiavel e um painel simples para gerenciar produtos e pedidos.</p>
<div class="v1-cta"><a class="v1-btn v1-btn-primary" href="{{ route('front.pricing') }}">Comecar agora</a><a class="v1-btn v1-btn-secondary" href="{{ route('front.contact') }}">Falar com comercial</a></div>
<div class="v1-proof"><span class="v1-chip">Operacao organizada</span><span class="v1-chip">Templates modernos</span><span class="v1-chip">Pagamentos integrados</span><span class="v1-chip">Suporte</span></div>
</div><div class="col-lg-6 mt-4 mt-lg-0"><div class="v1-heroimg"><img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1400&q=80" alt="" style="width:100%;height:auto;display:block;"/></div></div></div></div></section>
<section class="v1-section"><div class="container"><div class="row mb-4"><div class="col-lg-8"><h2 class="v1-h2">O essencial para operar bem</h2><p class="v1-lead">Estrutura enxuta, hierarquia clara e tom de empresa.</p></div></div><div class="row g-3"><div class="col-md-6 col-lg-4"><div class="v1-card"><strong>Catalogo organizado</strong><div class="v1-lead">Produtos, variacoes, imagens e precos com padrao.</div></div></div><div class="col-md-6 col-lg-4"><div class="v1-card"><strong>Checkout confiavel</strong><div class="v1-lead">Menos friccao para finalizar compras.</div></div></div><div class="col-md-6 col-lg-4"><div class="v1-card"><strong>Pedidos e expedicao</strong><div class="v1-lead">Rotina do pedido ao envio, sem confusao.</div></div></div></div></div></section>
@endsection
