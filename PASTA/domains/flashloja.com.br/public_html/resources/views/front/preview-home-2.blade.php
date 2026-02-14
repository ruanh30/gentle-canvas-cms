@extends('front.layout')

@section('pagename')
  - Preview Home
@endsection

@section('meta-description', !empty($seo) ? $seo->home_meta_description : '')
@section('meta-keywords', !empty($seo) ? $seo->home_meta_keywords : '')

@section('styles')
<style>
.v2-hero{padding:92px 0 56px;background:#fff;border-bottom:1px solid rgba(15,23,42,.06);}
.v2-title{font-size:clamp(36px,3.6vw,56px);line-height:1.04;letter-spacing:-.02em;color:#0f172a;font-weight:900;}
.v2-sub{color:#475569;font-size:18px;line-height:1.65;max-width:58ch;}
.v2-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:18px;}
.v2-btn{border-radius:12px;padding:12px 18px;font-weight:900;text-decoration:none;display:inline-block;}
.v2-primary{background:var(--color-primary);border:1px solid var(--color-primary);color:#fff;}
.v2-secondary{background:#fff;border:1px solid rgba(15,23,42,.14);color:#0f172a;}
.v2-metrics{display:flex;gap:16px 22px;flex-wrap:wrap;margin-top:22px;color:#0f172a;}
.v2-metric{min-width:160px;}
.v2-metric strong{font-size:22px;}
.v2-metric div{color:#64748b;font-size:13px;margin-top:4px;}
.v2-img{border-radius:18px;overflow:hidden;border:1px solid rgba(15,23,42,.08);box-shadow:0 18px 60px rgba(2,6,23,.10);}
.v2-section{padding:72px 0;}
.v2-card{border:1px solid rgba(15,23,42,.10);border-radius:16px;padding:18px;height:100%;background:#fff;}
.v2-card h3{font-size:18px;font-weight:900;color:#0f172a;margin:0 0 8px;}
.v2-muted{color:#64748b;}
</style>
@endsection

@section('content')
<section class="v2-hero"><div class="container"><div class="row align-items-center"><div class="col-lg-6">
<div style="font-size:13px;color:#64748b;font-weight:800;">Prototipo 2/5: clean e premium.</div>
<h1 class="v2-title">Uma home limpa. Um checkout claro. Uma marca mais forte.</h1>
<p class="v2-sub">Layout com foco em leitura e conversao, sem excesso de elementos decorativos.</p>
<div class="v2-cta"><a class="v2-btn v2-primary" href="{{ route('front.pricing') }}">Ver planos</a><a class="v2-btn v2-secondary" href="{{ route('front.templates.view') }}">Explorar templates</a></div>
<div class="v2-metrics"><div class="v2-metric"><strong>Meta</strong><div>mais cliques no CTA</div></div><div class="v2-metric"><strong>Hierarquia</strong><div>tipografia consistente</div></div><div class="v2-metric"><strong>Leve</strong><div>pouca distracao</div></div></div>
</div><div class="col-lg-6 mt-4 mt-lg-0"><div class="v2-img"><img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80" alt="" style="width:100%;height:auto;display:block;"/></div></div></div></div></section>
<section class="v2-section"><div class="container"><div class="row g-3"><div class="col-md-6 col-lg-4"><div class="v2-card"><h3>Design consistente</h3><div class="v2-muted">Padrao de tamanhos, pesos e espacamento.</div></div></div><div class="col-md-6 col-lg-4"><div class="v2-card"><h3>Prova e confianca</h3><div class="v2-muted">Aparencia mais madura e objetiva.</div></div></div><div class="col-md-6 col-lg-4"><div class="v2-card"><h3>CTA direto</h3><div class="v2-muted">Fluxo claro para levar ao plano/cadastro.</div></div></div></div></div></section>
@endsection
