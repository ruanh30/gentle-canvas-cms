@extends('front.layout')

@section('pagename')
  - Preview Home
@endsection

@section('meta-description', !empty($seo) ? $seo->home_meta_description : '')
@section('meta-keywords', !empty($seo) ? $seo->home_meta_keywords : '')

@section('styles')
<style>
:root{--v4-graph:#111827;--v4-green:#0f766e;}
.v4-hero{padding:86px 0 56px;background:linear-gradient(180deg,rgba(17,24,39,.06),rgba(17,24,39,0));border-bottom:1px solid rgba(15,23,42,.06);}
.v4-title{font-size:clamp(36px,3.8vw,56px);line-height:1.04;letter-spacing:-.02em;color:var(--v4-graph);font-weight:950;}
.v4-sub{color:#475569;font-size:18px;line-height:1.65;max-width:58ch;}
.v4-btn{border-radius:12px;padding:12px 18px;font-weight:900;text-decoration:none;display:inline-block;}
.v4-primary{background:var(--v4-green);border:1px solid var(--v4-green);color:#fff;box-shadow:0 14px 40px rgba(15,118,110,.25);}
.v4-secondary{background:#fff;border:1px solid rgba(15,23,42,.14);color:var(--v4-graph);}
.v4-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:18px;}
.v4-card{border:1px solid rgba(15,23,42,.10);border-radius:16px;padding:18px;background:#fff;height:100%;}
.v4-card h3{font-weight:900;font-size:18px;margin:0 0 8px;color:var(--v4-graph);}
.v4-muted{color:#64748b;}
.v4-img{border-radius:18px;overflow:hidden;border:1px solid rgba(15,23,42,.10);box-shadow:0 18px 60px rgba(2,6,23,.10);}
.v4-section{padding:72px 0;}
</style>
@endsection

@section('content')
<section class="v4-hero"><div class="container"><div class="row align-items-center"><div class="col-lg-6">
<div style="font-size:13px;color:#64748b;font-weight:800;">Prototipo 4/5: cores mais serias (verde/grafite).</div>
<h1 class="v4-title">Uma plataforma sobria para marcas que querem crescer.</h1>
<p class="v4-sub">Paleta mais madura, tom mais corporativo, e CTA verde para passar confianca.</p>
<div class="v4-cta"><a class="v4-btn v4-primary" href="{{ route('front.pricing') }}">Ver planos</a><a class="v4-btn v4-secondary" href="{{ route('front.templates.view') }}">Ver demonstracoes</a></div>
</div><div class="col-lg-6 mt-4 mt-lg-0"><div class="v4-img"><img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80" alt="" style="width:100%;height:auto;display:block;"/></div></div></div></div></section>
<section class="v4-section"><div class="container"><div class="row g-3"><div class="col-md-6 col-lg-4"><div class="v4-card"><h3>Confianca</h3><div class="v4-muted">Hierarquia visual e consistencia.</div></div></div><div class="col-md-6 col-lg-4"><div class="v4-card"><h3>Operacao</h3><div class="v4-muted">Catalogo, pedidos e pagamentos com processo.</div></div></div><div class="col-md-6 col-lg-4"><div class="v4-card"><h3>Escala</h3><div class="v4-muted">Base pronta para crescer sem refazer o site.</div></div></div></div></div></section>
@endsection
