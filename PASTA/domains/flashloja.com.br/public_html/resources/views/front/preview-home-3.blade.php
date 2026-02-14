@extends('front.layout')

@section('pagename')
  - Preview Home
@endsection

@section('meta-description', !empty($seo) ? $seo->home_meta_description : '')
@section('meta-keywords', !empty($seo) ? $seo->home_meta_keywords : '')

@section('styles')
<style>
.v3-hero{padding:78px 0 54px;background:rgba(15,23,42,.02);border-bottom:1px solid rgba(15,23,42,.06);}
.v3-title{font-size:clamp(34px,3.5vw,52px);line-height:1.05;letter-spacing:-.02em;font-weight:900;color:#0f172a;}
.v3-sub{color:#475569;font-size:18px;line-height:1.6;max-width:60ch;}
.v3-btn{border-radius:12px;padding:12px 18px;font-weight:900;text-decoration:none;display:inline-block;}
.v3-primary{background:var(--color-primary);border:1px solid var(--color-primary);color:#fff;}
.v3-secondary{background:#fff;border:1px solid rgba(15,23,42,.14);color:#0f172a;}
.v3-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:18px;}
.v3-section{padding:72px 0;}
.v3-card{border:1px solid rgba(15,23,42,.10);border-radius:16px;background:#fff;overflow:hidden;height:100%;}
.v3-card img{width:100%;height:190px;object-fit:cover;display:block;}
.v3-card .body{padding:16px;}
.v3-card h3{margin:0 0 8px;font-weight:900;color:#0f172a;font-size:18px;}
.v3-muted{color:#64748b;}
</style>
@endsection

@section('content')
<section class="v3-hero"><div class="container"><div class="row align-items-center"><div class="col-lg-6">
<div style="font-size:13px;color:#64748b;font-weight:800;">Prototipo 3/5: visual com imagens (referencia).</div>
<h1 class="v3-title">Uma plataforma completa para montar sua loja e automatizar vendas.</h1>
<p class="v3-sub">Aqui eu uso imagens externas (simulacao). Depois trocamos por imagens oficiais da Flashloja.</p>
<div class="v3-cta"><a class="v3-btn v3-primary" href="{{ route('front.pricing') }}">Criar minha loja</a><a class="v3-btn v3-secondary" href="{{ route('front.contact') }}">Agendar demonstracao</a></div>
</div><div class="col-lg-6 mt-4 mt-lg-0"><img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80" alt="" style="width:100%;border-radius:18px;border:1px solid rgba(15,23,42,.10);box-shadow:0 18px 60px rgba(2,6,23,.10);"/></div></div></div></section>
<section class="v3-section"><div class="container"><div class="row g-3">
<div class="col-md-6 col-lg-4"><div class="v3-card"><img src="https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=1200&q=80" alt=""><div class="body"><h3>Checkout que converte</h3><div class="v3-muted">Fluxo claro, rapido e confiavel.</div></div></div></div>
<div class="col-md-6 col-lg-4"><div class="v3-card"><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" alt=""><div class="body"><h3>Painel e relatorios</h3><div class="v3-muted">Pedidos, receita e indicadores.</div></div></div></div>
<div class="col-md-6 col-lg-4"><div class="v3-card"><img src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&w=1200&q=80" alt=""><div class="body"><h3>Mobile primeiro</h3><div class="v3-muted">Responsivo para vender bem no celular.</div></div></div></div>
</div></div></section>
@endsection
