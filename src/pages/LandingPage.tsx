import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, ShoppingBag, Palette, BarChart3, Shield, Globe,
  CreditCard, Truck, MessageCircle, ArrowRight, Check,
  Smartphone, ArrowUpRight, Play, ChevronRight, Sparkles,
  Package, Users, TrendingUp, MousePointerClick
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Intersection Observer hook                                         */
/* ------------------------------------------------------------------ */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const features = [
  { icon: Palette, title: 'Editor Visual', desc: 'Arraste, solte e publique. Sem escrever uma linha de código.' },
  { icon: ShoppingBag, title: 'Catálogo Inteligente', desc: 'Variações, estoque, imagens e SEO em um só painel.' },
  { icon: CreditCard, title: 'Checkout Otimizado', desc: 'PIX, cartão, boleto. Taxa de conversão 3x maior.' },
  { icon: Truck, title: 'Logística Integrada', desc: 'Cálculo de frete automático com rastreamento em tempo real.' },
  { icon: BarChart3, title: 'Analytics Profundo', desc: 'Dashboards de vendas, clientes e produtos mais vendidos.' },
  { icon: Shield, title: 'Infraestrutura Sólida', desc: 'SSL, CDN global, backups automáticos e 99.9% uptime.' },
];

const plans = [
  {
    name: 'Starter',
    price: '0',
    desc: 'Para validar sua ideia',
    features: ['30 produtos', 'Tema padrão', 'Checkout integrado', 'Suporte por email'],
    cta: 'Começar Grátis',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '49',
    desc: 'Para escalar vendas',
    features: ['Produtos ilimitados', 'Editor Premium', 'Domínio próprio', 'Analytics avançado', 'Cupons & promoções', 'Suporte prioritário'],
    cta: 'Começar com Pro',
    highlight: true,
  },
  {
    name: 'Scale',
    price: '149',
    desc: 'Para operações robustas',
    features: ['Tudo do Pro', 'Multi-loja', 'API completa', 'Integrações custom', 'Account manager', 'SLA garantido'],
    cta: 'Falar com Vendas',
    highlight: false,
  },
];

const metrics = [
  { icon: Users, value: '10.000+', label: 'lojistas' },
  { icon: Package, value: '2M+', label: 'pedidos' },
  { icon: TrendingUp, value: '99.9%', label: 'uptime' },
];

/* ------------------------------------------------------------------ */
/*  Marquee (infinite scroll ticker)                                   */
/* ------------------------------------------------------------------ */

function Marquee() {
  const words = ['E-commerce', 'Design', 'Conversão', 'Performance', 'Pagamentos', 'Frete', 'Analytics', 'Mobile', 'SEO', 'Segurança'];
  return (
    <div className="overflow-hidden py-5 border-y border-flash-brand/15 bg-flash-surface/50">
      <div className="flex animate-ticker whitespace-nowrap" style={{ animationDuration: '40s' }}>
        {[...words, ...words].map((w, i) => (
          <span key={i} className="mx-6 text-sm font-grotesk font-medium tracking-widest uppercase text-flash-darker/50 select-none">
            {w} <span className="text-flash-brand mx-4">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled ? 'bg-background/90 backdrop-blur-2xl shadow-[0_1px_0_0_hsl(var(--flash-brand)/0.08)]' : 'bg-transparent'
      )}
    >
      <div className="max-w-[1320px] mx-auto flex items-center justify-between px-6 lg:px-10 h-[72px]">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-flash-deep flex items-center justify-center shadow-lg shadow-flash-deep/30 group-hover:shadow-flash-deep/50 transition-shadow">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="font-grotesk text-[22px] font-bold tracking-tight">
            Flash<span className="text-flash-deep">Loja</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {[
            { href: '#features', label: 'Recursos' },
            { href: '#pricing', label: 'Planos' },
            { href: '#proof', label: 'Resultados' },
          ].map(l => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-[13px] font-medium text-foreground/60 hover:text-foreground rounded-lg hover:bg-flash-surface transition-all duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-[13px] font-medium hidden sm:inline-flex" asChild>
            <Link to="/login">Entrar</Link>
          </Button>
          <Button
            size="sm"
            className="bg-flash-deep hover:bg-flash-darker text-white rounded-xl px-5 text-[13px] font-semibold shadow-lg shadow-flash-deep/20 hover:shadow-flash-deep/40 transition-all duration-300"
            asChild
          >
            <Link to="/login">
              Criar Loja
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-[72px] overflow-hidden bg-background">
      {/* Organic blob shapes */}
      <div className="absolute top-0 right-0 w-[60%] h-full bg-flash-surface rounded-bl-[120px] -z-10" />
      <div className="absolute top-[15%] right-[8%] w-[420px] h-[420px] rounded-full bg-flash-brand/12 blur-[100px] -z-10" />
      <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-flash-deep/8 blur-[80px] -z-10" />

      {/* Decorative grid dots */}
      <div
        className="absolute top-24 left-12 w-40 h-40 -z-10 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--flash-brand-deep)) 1.5px, transparent 1.5px)',
          backgroundSize: '20px 20px'
        }}
      />

      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-20 lg:py-0">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center">

          {/* Left — Copy */}
          <div className="space-y-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-flash-brand/25 bg-flash-brand/8 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-flash-deep" />
              <span className="text-[12px] font-grotesk font-semibold tracking-wide uppercase text-flash-darker">
                Nova era do e-commerce
              </span>
            </div>

            <div className="space-y-5">
              <h1 className="font-grotesk text-[clamp(2.8rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
                Crie sua loja.
                <br />
                <span className="relative">
                  <span className="relative z-10 text-flash-deep">Venda mais.</span>
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-flash-brand/25 -z-0 rounded-sm" />
                </span>
              </h1>
              <p className="text-[17px] leading-[1.7] text-foreground/55 font-light max-w-md">
                A plataforma que transforma sua ideia em uma loja online profissional — sem código, sem atrito, sem limites.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5">
              <Button
                size="lg"
                className="bg-flash-deep hover:bg-flash-darker text-white rounded-2xl px-8 h-14 text-[15px] font-semibold shadow-xl shadow-flash-deep/25 hover:shadow-flash-deep/40 hover:-translate-y-0.5 transition-all duration-300 group"
                asChild
              >
                <Link to="/login">
                  Começar Agora
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="rounded-2xl h-14 px-6 text-[15px] font-medium text-foreground/60 hover:text-foreground hover:bg-flash-surface gap-2.5 group"
                asChild
              >
                <a href="#features">
                  <div className="h-10 w-10 rounded-xl bg-flash-brand/15 flex items-center justify-center group-hover:bg-flash-brand/25 transition-colors">
                    <Play className="h-4 w-4 text-flash-deep ml-0.5" />
                  </div>
                  Ver como funciona
                </a>
              </Button>
            </div>

            {/* Social proof micro-bar */}
            <div className="flex items-center gap-5 pt-4">
              <div className="flex -space-x-2.5">
                {['A', 'B', 'C', 'D'].map((l, i) => (
                  <div
                    key={l}
                    className="h-9 w-9 rounded-full border-2 border-background flex items-center justify-center text-[11px] font-bold font-grotesk text-white"
                    style={{
                      background: `hsl(${213 + i * 15}, ${70 + i * 5}%, ${55 + i * 5}%)`,
                      zIndex: 4 - i,
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div className="text-[13px]">
                <span className="font-semibold text-foreground">+10.000</span>{' '}
                <span className="text-foreground/45">lojistas já vendem conosco</span>
              </div>
            </div>
          </div>

          {/* Right — Visual composition */}
          <div className="relative hidden lg:block">
            {/* Main card — "store preview" */}
            <div className="relative rounded-[28px] bg-card border border-border/40 shadow-2xl shadow-flash-deep/8 overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/40">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-flash-brand/40" />
                  <span className="w-3 h-3 rounded-full bg-flash-brand/25" />
                  <span className="w-3 h-3 rounded-full bg-flash-brand/15" />
                </div>
                <div className="flex-1 mx-8 h-8 rounded-xl bg-flash-surface flex items-center px-4">
                  <span className="text-[11px] font-grotesk text-foreground/30 tracking-wide">minhaloja.flashloja.com.br</span>
                </div>
                <MousePointerClick className="h-4 w-4 text-flash-brand/40" />
              </div>

              {/* Store content mockup */}
              <div className="p-7 space-y-6">
                {/* Hero banner */}
                <div className="h-44 rounded-2xl bg-gradient-to-br from-flash-brand/20 via-flash-deep/10 to-flash-surface overflow-hidden relative">
                  <div className="absolute inset-0 flex flex-col items-start justify-center pl-8">
                    <div className="h-3 w-24 rounded bg-flash-deep/30 mb-3" />
                    <div className="h-5 w-48 rounded bg-flash-deep/20 mb-2" />
                    <div className="h-3 w-36 rounded bg-flash-brand/30" />
                    <div className="h-8 w-28 rounded-lg bg-flash-deep/40 mt-5" />
                  </div>
                  {/* Abstract shape */}
                  <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-flash-brand/15" />
                  <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-flash-deep/10" />
                </div>

                {/* Product grid */}
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="group cursor-pointer">
                      <div className="aspect-[3/4] rounded-xl bg-flash-surface mb-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-flash-brand/8 to-transparent" />
                        {i === 1 && (
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-flash-deep/80 text-[9px] font-bold text-white tracking-wide">
                            NOVO
                          </div>
                        )}
                      </div>
                      <div className="h-2.5 w-4/5 rounded bg-foreground/8 mb-1.5" />
                      <div className="h-2.5 w-1/2 rounded bg-flash-brand/30" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating card — Sales */}
            <div className="absolute -bottom-6 -left-8 bg-card border border-border/40 rounded-2xl p-4 shadow-xl shadow-flash-deep/8 flex items-center gap-4 backdrop-blur-xl">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-flash-brand/30 to-flash-deep/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-flash-deep" />
              </div>
              <div>
                <p className="text-[10px] font-grotesk uppercase tracking-wider text-foreground/40">Vendas hoje</p>
                <p className="text-lg font-grotesk font-bold tracking-tight">R$ 12.480</p>
              </div>
            </div>

            {/* Floating card — Conversion */}
            <div className="absolute -top-5 -right-5 bg-card border border-border/40 rounded-2xl p-4 shadow-xl shadow-flash-deep/8 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-grotesk uppercase tracking-wider text-foreground/40">Conversão</span>
              </div>
              <p className="text-2xl font-grotesk font-bold text-flash-deep">4.8%</p>
              <p className="text-[10px] text-emerald-500 font-semibold mt-0.5">↑ 23% vs ontem</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Proof bar                                                          */
/* ------------------------------------------------------------------ */

function ProofBar() {
  const { ref, inView } = useInView();
  return (
    <section id="proof" ref={ref} className="py-20 bg-flash-deep relative overflow-hidden">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-10 relative">
        {metrics.map((m, i) => (
          <div
            key={i}
            className={cn(
              'text-center md:text-left flex-1 transition-all duration-700',
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
              <m.icon className="h-5 w-5 text-white/40" />
              <span className="font-grotesk text-[clamp(2rem,4vw,3.2rem)] font-extrabold text-white tracking-tight">
                {m.value}
              </span>
            </div>
            <span className="text-[13px] text-white/50 font-medium uppercase tracking-widest font-grotesk">{m.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Features                                                           */
/* ------------------------------------------------------------------ */

function Features() {
  const { ref, inView } = useInView();
  return (
    <section id="features" className="py-28 md:py-36 bg-background relative overflow-hidden">
      {/* Corner deco */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-flash-brand/6 blur-[80px]" />

      <div className="max-w-[1320px] mx-auto px-6 lg:px-10" ref={ref}>
        {/* Header — left-aligned, editorial */}
        <div className="grid lg:grid-cols-2 gap-6 mb-20">
          <div>
            <span className="text-[12px] font-grotesk font-bold uppercase tracking-[0.2em] text-flash-deep mb-4 block">
              Recursos
            </span>
            <h2 className="font-grotesk text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.02em]">
              Ferramentas que fazem
              <br />
              a diferença
            </h2>
          </div>
          <div className="flex items-end lg:justify-end">
            <p className="text-[16px] leading-[1.8] text-foreground/45 max-w-sm">
              Cada detalhe pensado para simplificar sua operação e maximizar vendas.
            </p>
          </div>
        </div>

        {/* Grid — 3x2 with staggered reveal */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className={cn(
                'group relative p-7 rounded-3xl border border-transparent bg-flash-surface/50 hover:bg-card hover:border-flash-brand/15 hover:shadow-xl hover:shadow-flash-brand/5 transition-all duration-500 cursor-default',
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="h-14 w-14 rounded-2xl bg-flash-brand/12 flex items-center justify-center mb-5 group-hover:bg-flash-brand/20 group-hover:scale-110 transition-all duration-500">
                <f.icon className="h-6 w-6 text-flash-deep" />
              </div>
              <h3 className="font-grotesk text-[17px] font-bold mb-2 tracking-tight">{f.title}</h3>
              <p className="text-[14px] leading-[1.7] text-foreground/45">{f.desc}</p>

              {/* Hover arrow */}
              <div className="absolute top-7 right-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="h-4 w-4 text-flash-deep/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Pricing                                                            */
/* ------------------------------------------------------------------ */

function Pricing() {
  const { ref, inView } = useInView();
  return (
    <section id="pricing" className="py-28 md:py-36 relative overflow-hidden">
      {/* Split background */}
      <div className="absolute inset-0 bg-flash-surface/40 -z-10" />
      <div className="absolute top-0 left-0 w-1/3 h-full bg-background -z-10 hidden lg:block rounded-r-[80px]" />

      <div className="max-w-[1320px] mx-auto px-6 lg:px-10" ref={ref}>
        <div className="text-center max-w-lg mx-auto mb-20">
          <span className="text-[12px] font-grotesk font-bold uppercase tracking-[0.2em] text-flash-deep mb-4 block">
            Planos
          </span>
          <h2 className="font-grotesk text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.02em] mb-4">
            Investimento que se paga
          </h2>
          <p className="text-[15px] text-foreground/45 leading-[1.7]">
            Comece grátis. Escale quando quiser. Sem surpresas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-[1060px] mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={cn(
                'relative flex flex-col rounded-3xl p-8 transition-all duration-700',
                plan.highlight
                  ? 'bg-flash-deep text-white shadow-2xl shadow-flash-deep/30 scale-[1.03] z-10'
                  : 'bg-card border border-border/40 hover:border-flash-brand/20 hover:shadow-lg hover:shadow-flash-brand/5',
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              )}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full bg-white text-flash-deep text-[11px] font-grotesk font-bold tracking-wide shadow-lg">
                  POPULAR
                </div>
              )}

              <div className="mb-8">
                <h3 className={cn('font-grotesk text-[15px] font-bold tracking-wide uppercase mb-1', !plan.highlight && 'text-flash-deep')}>
                  {plan.name}
                </h3>
                <p className={cn('text-[13px]', plan.highlight ? 'text-white/60' : 'text-foreground/40')}>
                  {plan.desc}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className={cn('text-[11px] font-medium', plan.highlight ? 'text-white/50' : 'text-foreground/30')}>R$</span>
                  <span className="font-grotesk text-5xl font-extrabold tracking-tighter">{plan.price}</span>
                  {plan.price !== '0' && (
                    <span className={cn('text-[13px]', plan.highlight ? 'text-white/50' : 'text-foreground/30')}>/mês</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3.5 mb-10 flex-1">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-3 text-[13px]">
                    <div className={cn(
                      'h-5 w-5 rounded-lg flex items-center justify-center shrink-0',
                      plan.highlight ? 'bg-white/15' : 'bg-flash-brand/12'
                    )}>
                      <Check className={cn('h-3 w-3', plan.highlight ? 'text-white' : 'text-flash-deep')} />
                    </div>
                    <span className={plan.highlight ? 'text-white/80' : 'text-foreground/60'}>{feat}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  'w-full h-13 rounded-2xl text-[14px] font-semibold transition-all duration-300',
                  plan.highlight
                    ? 'bg-white text-flash-deep hover:bg-white/90 shadow-lg'
                    : 'bg-flash-surface text-flash-deeper hover:bg-flash-brand/15 border border-flash-brand/20'
                )}
                asChild
              >
                <Link to="/login">
                  {plan.cta}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA final                                                          */
/* ------------------------------------------------------------------ */

function FinalCTA() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-28 bg-background">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div
          className={cn(
            'relative rounded-[32px] bg-flash-deep overflow-hidden px-10 py-20 md:py-24 text-center transition-all duration-700',
            inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          )}
        >
          {/* Decorations */}
          <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-flash-brand/15 translate-x-1/3 translate-y-1/3" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          <div className="relative space-y-8 max-w-2xl mx-auto">
            <h2 className="font-grotesk text-[clamp(1.8rem,4vw,3rem)] font-extrabold text-white leading-[1.1] tracking-[-0.02em]">
              Pronto para transformar
              <br />
              seu negócio?
            </h2>
            <p className="text-white/50 text-[16px] max-w-md mx-auto leading-relaxed">
              Junte-se a milhares de empreendedores que já vendem online com a FlashLoja.
            </p>
            <Button
              size="lg"
              className="bg-white text-flash-deep hover:bg-white/90 rounded-2xl px-10 h-14 text-[15px] font-semibold shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
              asChild
            >
              <Link to="/login">
                Criar Minha Loja
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-12 mb-16">
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-flash-deep flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-grotesk text-lg font-bold">
                Flash<span className="text-flash-deep">Loja</span>
              </span>
            </div>
            <p className="text-[14px] text-foreground/40 max-w-xs leading-[1.8]">
              A plataforma mais rápida para criar sua loja online profissional.
            </p>
          </div>
          <div>
            <h4 className="font-grotesk text-[12px] font-bold uppercase tracking-[0.15em] text-foreground/30 mb-5">Produto</h4>
            <ul className="space-y-3">
              {['Recursos', 'Planos', 'Temas', 'API'].map(l => (
                <li key={l}>
                  <a href="#" className="text-[14px] text-foreground/50 hover:text-foreground transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-grotesk text-[12px] font-bold uppercase tracking-[0.15em] text-foreground/30 mb-5">Suporte</h4>
            <ul className="space-y-3">
              {['Central de Ajuda', 'Contato', 'Status', 'Docs'].map(l => (
                <li key={l}>
                  <a href="#" className="text-[14px] text-foreground/50 hover:text-foreground transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[12px] text-foreground/30 font-grotesk">
            © {new Date().getFullYear()} FlashLoja. Todos os direitos reservados.
          </span>
          <div className="flex gap-6">
            <a href="#" className="text-[12px] text-foreground/30 hover:text-foreground/60 transition-colors">Termos</a>
            <a href="#" className="text-[12px] text-foreground/30 hover:text-foreground/60 transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-flash-brand/30">
      <Navbar />
      <Hero />
      <Marquee />
      <ProofBar />
      <Features />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
}
