@extends('front.layout')

@section('pagename')
  - Preview Home
@endsection

@section('meta-description', !empty($seo) ? $seo->home_meta_description : '')
@section('meta-keywords', !empty($seo) ? $seo->home_meta_keywords : '')

@section('styles')
<style>
:root{--v5-bg:#070a13;--v5-neon:#7c3aed;--v5-cyan:#22d3ee;}
.v5-hero{padding:92px 0 60px;background:radial-gradient(900px 520px at 15% 20%,rgba(124,58,237,.28),transparent 60%),radial-gradient(900px 520px at 85% 30%,rgba(34,211,238,.18),transparent 55%),linear-gradient(180deg,#070a13,#0b1024);color:#e5e7eb;}
.v5-title{font-size:clamp(36px,3.8vw,58px);line-height:1.02;letter-spacing:-.03em;font-weight:950;color:#fff;}
.v5-sub{color:rgba(229,231,235,.84);font-size:18px;line-height:1.65;max-width:58ch;}
.v5-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:18px;}
.v5-btn{border-radius:12px;padding:12px 18px;font-weight:950;text-decoration:none;display:inline-block;}
.v5-primary{background:linear-gradient(90deg,var(--v5-neon),#4f46e5);border:0;color:#fff;box-shadow:0 18px 60px rgba(124,58,237,.35);}
.v5-secondary{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);color:#fff;}
.v5-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:16px;height:100%;}
.v5-card h3{color:#fff;font-weight:900;font-size:18px;margin:0 0 8px;}
.v5-muted{color:rgba(229,231,235,.78);}
.v5-img{border-radius:18px;overflow:hidden;border:1px solid rgba(255,255,255,.16);box-shadow:0 24px 80px rgba(0,0,0,.35);}
.v5-section{padding:72px 0;background:#fff;}
.v5-h2{font-weight:950;color:#0f172a;letter-spacing:-.02em;}
.v5-card2{border:1px solid rgba(15,23,42,.10);border-radius:16px;background:#fff;padding:18px;height:100%;box-shadow:0 10px 26px rgba(2,6,23,.06);}
</style>
@endsection

@section('content')
<section class="v5-hero"><div class="container"><div class="row align-items-center"><div class="col-lg-6">
<div style="font-size:13px;color:rgba(229,231,235,.75);font-weight:800;">Prototipo 5/5: tecnologico e mais atrativo.</div>
<h1 class="v5-title">Ecommerce com visual moderno e performance.</h1>
<p class="v5-sub">Um layout com energia de produto tech, CTA com gradiente e seções enxutas.</p>
<div class="v5-cta"><a class="v5-btn v5-primary" href="{{ route('front.pricing') }}">Criar loja agora</a><a class="v5-btn v5-secondary" href="{{ route('front.templates.view') }}">Ver templates</a></div>
<div class="row g-3" style="margin-top:18px;"><div class="col-md-6"><div class="v5-card"><h3>Velocidade</h3><div class="v5-muted">Paginas leves e navegacao rapida.</div></div></div><div class="col-md-6"><div class="v5-card"><h3>Conversao</h3><div class="v5-muted">Hierarquia para guiar o clique.</div></div></div></div>
</div><div class="col-lg-6 mt-4 mt-lg-0"><div class="v5-img"><img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80" alt="" style="width:100%;height:auto;display:block;"/></div></div></div></div></section>
<section class="v5-section"><div class="container"><div class="row mb-4"><div class="col-lg-8"><h2 class="v5-h2">Recursos que destravam vendas</h2><p style="color:#64748b;margin-top:10px;">Texto simulado. Ajustamos depois com seu posicionamento.</p></div></div><div class="row g-3"><div class="col-md-6 col-lg-4"><div class="v5-card2"><strong>Catalogo e variacoes</strong><div style="color:#64748b;margin-top:8px;">Organizacao para vender sem erro.</div></div></div><div class="col-md-6 col-lg-4"><div class="v5-card2"><strong>Pagamentos</strong><div style="color:#64748b;margin-top:8px;">Integrações e metodos para conversao.</div></div></div><div class="col-md-6 col-lg-4"><div class="v5-card2"><strong>Pedidos</strong><div style="color:#64748b;margin-top:8px;">Processo do pedido ao envio.</div></div></div></div></div></section>
@endsection
