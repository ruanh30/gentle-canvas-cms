import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import {
  Zap, ShoppingBag, Palette, BarChart3, Shield,
  CreditCard, Truck, ArrowRight, Check,
  ArrowUpRight, Play, ChevronRight, Sparkles,
  Package, Users, TrendingUp, MousePointerClick,
  Globe, Eye, Layers, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/* ================================================================== */
/*  ANIMATED COUNTER                                                   */
/* ================================================================== */
function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { damping: 40, stiffness: 100 });

  useEffect(() => {
    if (isInView) motionVal.set(value);
  }, [isInView, value, motionVal]);

  useEffect(() => {
    const unsub = spring.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = Math.round(v).toLocaleString('pt-BR') + suffix;
      }
    });
    return unsub;
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ================================================================== */
/*  AURORA BACKGROUND                                                  */
/* ================================================================== */
function AuroraBackground({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden -z-10', className)}>
      <div className="absolute w-[800px] h-[800px] top-[-200px] left-[-200px] rounded-full opacity-30 blur-[120px] animate-[aurora1_15s_ease-in-out_infinite]"
        style={{ background: 'radial-gradient(circle, hsl(var(--flash-glow)), transparent 70%)' }} />
      <div className="absolute w-[600px] h-[600px] top-[20%] right-[-100px] rounded-full opacity-20 blur-[100px] animate-[aurora2_20s_ease-in-out_infinite]"
        style={{ background: 'radial-gradient(circle, hsl(var(--flash-brand)), transparent 70%)' }} />
      <div className="absolute w-[500px] h-[500px] bottom-[-100px] left-[30%] rounded-full opacity-15 blur-[100px] animate-[aurora3_18s_ease-in-out_infinite]"
        style={{ background: 'radial-gradient(circle, hsl(var(--flash-brand-deep)), transparent 70%)' }} />
      <style>{`
        @keyframes aurora1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(80px,40px) scale(1.1)} 66%{transform:translate(-40px,80px) scale(0.95)} }
        @keyframes aurora2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-120px,60px) scale(1.15)} }
        @keyframes aurora3 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(60px,-40px) scale(1.08)} 66%{transform:translate(-80px,-20px) scale(0.92)} }
      `}</style>
    </div>
  );
}

/* ================================================================== */
/*  GRID PATTERN                                                       */
/* ================================================================== */
function GridPattern({ className }: { className?: string }) {
  return (
    <div
      className={cn('absolute inset-0 -z-10 opacity-[0.035]', className)}
      style={{
        backgroundImage: `linear-gradient(hsl(var(--flash-brand-deep)) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--flash-brand-deep)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }}
    />
  );
}

/* ================================================================== */
/*  DATA                                                               */
/* ================================================================== */

const features = [
  { icon: Palette, tag: '01', title: 'Editor Visual Premium', desc: 'Interface drag-and-drop com preview em tempo real. Customize cores, tipografia, layout e animações sem escrever código.' },
  { icon: ShoppingBag, tag: '02', title: 'Catálogo Inteligente', desc: 'Variações infinitas, controle de estoque, imagens otimizadas e SEO automático para cada produto.' },
  { icon: CreditCard, tag: '03', title: 'Checkout de Alta Conversão', desc: 'PIX com confirmação instantânea, parcelamento inteligente e one-click buy. Taxa de conversão 3x maior.' },
  { icon: Truck, tag: '04', title: 'Logística Automatizada', desc: 'Integração nativa com Correios, Jadlog e transportadoras. Rastreamento em tempo real para seus clientes.' },
  { icon: BarChart3, tag: '05', title: 'Analytics em Tempo Real', desc: 'Dashboards de vendas, funil de conversão, LTV do cliente e relatórios exportáveis.' },
  { icon: Shield, tag: '06', title: 'Segurança Enterprise', desc: 'SSL incluso, PCI-DSS compliance, backups automáticos e infraestrutura com 99.9% de uptime.' },
];

const plans = [
  {
    name: 'Starter',
    price: 0,
    desc: 'Para validar sua ideia',
    features: ['30 produtos', 'Tema padrão', 'Checkout integrado', 'Suporte email'],
    cta: 'Começar Grátis',
    highlight: false,
  },
  {
    name: 'Pro',
    price: 49,
    desc: 'Para escalar vendas',
    features: ['Produtos ilimitados', 'Editor Premium', 'Domínio próprio', 'Analytics avançado', 'Cupons & promoções', 'Suporte prioritário'],
    cta: 'Começar com Pro',
    highlight: true,
  },
  {
    name: 'Scale',
    price: 149,
    desc: 'Para operações robustas',
    features: ['Tudo do Pro', 'Multi-loja', 'API completa', 'Integrações custom', 'Account manager', 'SLA garantido'],
    cta: 'Falar com Vendas',
    highlight: false,
  },
];

/* ================================================================== */
/*  NAVBAR                                                             */
/* ================================================================== */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-700',
        scrolled
          ? 'bg-background/70 backdrop-blur-2xl shadow-[0_0_40px_-12px_hsl(var(--flash-brand)/0.12)]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-[1360px] mx-auto flex items-center justify-between px-6 lg:px-10 h-[76px]">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 rounded-2xl bg-gradient-to-br from-flash-deep to-flash-darker flex items-center justify-center shadow-lg shadow-flash-deep/30 group-hover:shadow-flash-deep/50 transition-all duration-500 group-hover:scale-105">
            <Zap className="h-5 w-5 text-white" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-flash-brand/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <span className="font-grotesk text-[22px] font-bold tracking-tight">
            Flash<span className="text-flash-deep">Loja</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 bg-flash-surface/60 backdrop-blur-sm rounded-2xl px-2 py-1.5 border border-flash-brand/8">
          {[
            { href: '#features', label: 'Recursos' },
            { href: '#pricing', label: 'Planos' },
            { href: '#proof', label: 'Resultados' },
          ].map(l => (
            <a
              key={l.href}
              href={l.href}
              className="px-5 py-2 text-[13px] font-medium text-foreground/50 hover:text-foreground hover:bg-background rounded-xl transition-all duration-300"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-[13px] font-medium hidden sm:inline-flex rounded-xl" asChild>
            <Link to="/login">Entrar</Link>
          </Button>
          <Button
            size="sm"
            className="relative overflow-hidden bg-flash-deep hover:bg-flash-darker text-white rounded-2xl px-6 text-[13px] font-semibold shadow-lg shadow-flash-deep/25 hover:shadow-flash-deep/40 transition-all duration-500 group"
            asChild
          >
            <Link to="/login">
              <span className="relative z-10 flex items-center">
                Criar Loja
                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}

/* ================================================================== */
/*  HERO                                                               */
/* ================================================================== */

function HeroBento() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-[76px] overflow-hidden bg-background">
      <AuroraBackground />
      <GridPattern />

      <motion.div style={{ opacity }} className="max-w-[1360px] mx-auto px-6 lg:px-10 py-20 lg:py-0 w-full">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-20 items-center min-h-[calc(100vh-76px)]">

          {/* Left — Copy */}
          <div className="space-y-10 max-w-[560px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-flash-brand/20 bg-flash-brand/5 backdrop-blur-sm mb-8">
                <div className="h-2 w-2 rounded-full bg-flash-deep animate-pulse" />
                <span className="text-[11px] font-grotesk font-bold tracking-[0.15em] uppercase text-flash-darker">
                  E-commerce reimaginado
                </span>
              </div>

              <h1 className="font-grotesk text-[clamp(3rem,7vw,5.5rem)] font-black leading-[0.95] tracking-[-0.04em]">
                <span className="block">Sua loja</span>
                <span className="block mt-2">
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-flash-deep via-flash-brand to-flash-deep bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]">
                      premium
                    </span>
                  </span>
                </span>
                <span className="block text-foreground/15 mt-1 text-[clamp(2rem,5vw,3.8rem)]">em minutos.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-[17px] leading-[1.85] text-foreground/45 font-light"
            >
              A plataforma que combina design excepcional com performance.
              Crie, personalize e escale — sem código, sem limites.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="relative overflow-hidden bg-flash-midnight text-white rounded-2xl px-9 h-[58px] text-[15px] font-semibold shadow-2xl shadow-flash-midnight/40 hover:shadow-flash-midnight/60 hover:-translate-y-1 transition-all duration-500 group"
                asChild
              >
                <Link to="/login">
                  <span className="relative z-10 flex items-center gap-2">
                    Criar Loja Grátis
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-500" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-flash-deep to-flash-darker opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="rounded-2xl h-[58px] px-7 text-[15px] font-medium text-foreground/50 hover:text-foreground gap-3 group border border-transparent hover:border-flash-brand/15 hover:bg-flash-surface/50"
                asChild
              >
                <a href="#features">
                  <div className="h-11 w-11 rounded-xl bg-flash-brand/10 flex items-center justify-center group-hover:bg-flash-brand/20 transition-all duration-300 group-hover:scale-110">
                    <Play className="h-4 w-4 text-flash-deep ml-0.5" />
                  </div>
                  Ver demo
                </a>
              </Button>
            </motion.div>

            {/* Micro proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex items-center gap-6 pt-4"
            >
              {[
                { icon: Check, text: 'Sem cartão de crédito' },
                { icon: Zap, text: 'Setup em 2 minutos' },
                { icon: Lock, text: 'SSL incluso' },
              ].map((item, i) => (
                <span key={i} className="flex items-center gap-1.5 text-[12px] text-foreground/35">
                  <item.icon className="h-3.5 w-3.5 text-flash-deep/60" />
                  {item.text}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — Bento grid visual */}
          <motion.div
            style={{ y: y1 }}
            className="relative hidden lg:block"
          >
            <motion.div
              initial={{ opacity: 0, y: 60, rotateX: 8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-4"
              style={{ perspective: '1200px' }}
            >
              {/* Card 1 — Main store preview */}
              <div className="col-span-2 rounded-3xl bg-gradient-to-br from-card to-flash-surface border border-flash-brand/10 p-6 shadow-xl shadow-flash-deep/5 overflow-hidden relative group hover:border-flash-brand/20 transition-all duration-500">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-flash-deep/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-flash-brand/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-flash-brand/10" />
                  </div>
                  <div className="flex-1 h-7 rounded-lg bg-flash-brand/5 flex items-center px-3">
                    <Globe className="h-3 w-3 text-flash-brand/30 mr-2" />
                    <span className="text-[10px] font-grotesk text-foreground/25 tracking-wide">minhaloja.flashloja.com.br</span>
                  </div>
                </div>
                <div className="h-36 rounded-2xl bg-gradient-to-br from-flash-brand/15 via-flash-deep/8 to-transparent relative overflow-hidden mb-4">
                  <div className="absolute inset-0 flex flex-col justify-center pl-6 gap-2">
                    <div className="h-2 w-20 rounded-full bg-flash-deep/20" />
                    <div className="h-4 w-44 rounded-full bg-flash-deep/15" />
                    <div className="h-2 w-32 rounded-full bg-flash-brand/20" />
                    <div className="h-7 w-24 rounded-lg bg-flash-deep/25 mt-2" />
                  </div>
                  <div className="absolute -right-6 -bottom-6 w-40 h-40 rounded-full bg-flash-brand/10 group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="space-y-2">
                      <div className="aspect-square rounded-xl bg-flash-surface group-hover:bg-flash-brand/8 transition-colors duration-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-flash-brand/5 to-transparent" />
                      </div>
                      <div className="h-1.5 w-3/4 rounded bg-foreground/5" />
                      <div className="h-1.5 w-1/2 rounded bg-flash-brand/15" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2 — Revenue */}
              <div className="rounded-3xl bg-flash-midnight p-6 shadow-xl shadow-flash-midnight/20 text-white relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-flash-deep/15 blur-[40px]" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-4 w-4 text-flash-brand" />
                    <span className="text-[10px] font-grotesk uppercase tracking-[0.2em] text-white/40">Receita mensal</span>
                  </div>
                  <p className="font-grotesk text-3xl font-extrabold tracking-tight mb-1">
                    R$ <Counter value={48250} />
                  </p>
                  <div className="flex items-center gap-1.5 mt-3">
                    <div className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">+27%</div>
                    <span className="text-[10px] text-white/30">vs mês anterior</span>
                  </div>
                  {/* Mini chart */}
                  <svg className="w-full h-12 mt-4" viewBox="0 0 200 40" fill="none">
                    <path d="M0 35 Q20 30 40 28 T80 20 T120 15 T160 8 T200 5" stroke="hsl(var(--flash-brand))" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
                    <path d="M0 35 Q20 30 40 28 T80 20 T120 15 T160 8 T200 5 V40 H0Z" fill="url(#chartGrad)" opacity="0.15" />
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--flash-brand))" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Card 3 — Live stats */}
              <div className="rounded-3xl bg-card border border-flash-brand/10 p-6 shadow-xl shadow-flash-deep/5 relative overflow-hidden group hover:scale-[1.02] hover:border-flash-brand/20 transition-all duration-500">
                <div className="flex items-center gap-2 mb-5">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-grotesk uppercase tracking-[0.2em] text-foreground/30">Ao vivo agora</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-foreground/30 mb-0.5">Visitantes</p>
                    <p className="font-grotesk text-2xl font-extrabold tracking-tight text-flash-deep">
                      <Counter value={342} />
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-flash-surface/80">
                      <p className="text-[9px] text-foreground/25 uppercase tracking-wider mb-1">Conversão</p>
                      <p className="font-grotesk text-sm font-bold">4.8%</p>
                    </div>
                    <div className="p-3 rounded-xl bg-flash-surface/80">
                      <p className="text-[9px] text-foreground/25 uppercase tracking-wider mb-1">Pedidos</p>
                      <p className="font-grotesk text-sm font-bold">
                        <Counter value={18} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 50%{background-position:0% 0} 100%{background-position:200% 0} }
      `}</style>
    </section>
  );
}

/* ================================================================== */
/*  MARQUEE                                                            */
/* ================================================================== */

function Marquee() {
  const words = ['E-commerce', 'Performance', 'Design', 'Conversão', 'Analytics', 'Mobile-First', 'SEO', 'Pagamentos', 'Logística', 'Segurança'];
  return (
    <div className="overflow-hidden py-6 border-y border-flash-brand/8 bg-flash-surface/30 backdrop-blur-sm">
      <div className="flex animate-ticker whitespace-nowrap" style={{ animationDuration: '45s' }}>
        {[...words, ...words].map((w, i) => (
          <span key={i} className="mx-8 text-[13px] font-grotesk font-semibold tracking-[0.15em] uppercase text-flash-darker/30 select-none flex items-center gap-4">
            {w}
            <span className="h-1.5 w-1.5 rounded-full bg-flash-brand/40" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  PROOF BAR                                                          */
/* ================================================================== */

function ProofBar() {
  const metrics = [
    { value: 10000, suffix: '+', label: 'Lojistas Ativos', icon: Users },
    { value: 2, suffix: 'M+', label: 'Pedidos Processados', icon: Package },
    { value: 99, suffix: '.9%', label: 'Uptime Garantido', icon: Shield },
    { value: 4, suffix: '.9★', label: 'Avaliação Média', icon: Sparkles },
  ];

  return (
    <section id="proof" className="py-24 bg-flash-midnight relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-[1360px] mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-8 relative">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center group"
          >
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-white/5 mb-4 group-hover:bg-flash-deep/20 transition-colors duration-500">
              <m.icon className="h-5 w-5 text-flash-brand/60" />
            </div>
            <p className="font-grotesk text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold text-white tracking-tight">
              <Counter value={m.value} suffix={m.suffix} />
            </p>
            <p className="text-[11px] font-grotesk uppercase tracking-[0.2em] text-white/25 mt-1">{m.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FEATURES                                                           */
/* ================================================================== */

function Features() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="features" className="py-32 md:py-40 bg-background relative overflow-hidden">
      <AuroraBackground className="opacity-50" />

      <div className="max-w-[1360px] mx-auto px-6 lg:px-10 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mb-24"
        >
          <span className="text-[11px] font-grotesk font-bold uppercase tracking-[0.25em] text-flash-deep mb-5 block">
            Recursos
          </span>
          <h2 className="font-grotesk text-[clamp(2.2rem,5vw,3.5rem)] font-black leading-[1] tracking-[-0.03em]">
            Ferramentas que
            <br />
            <span className="text-foreground/15">transformam resultados</span>
          </h2>
        </motion.div>

        {/* Feature list — editorial alternating */}
        <div className="space-y-2">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'group relative rounded-3xl p-8 lg:p-10 border transition-all duration-700 cursor-default',
                hoveredIdx === i
                  ? 'bg-card border-flash-brand/20 shadow-2xl shadow-flash-brand/8'
                  : 'bg-transparent border-transparent hover:bg-flash-surface/40'
              )}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="flex items-start gap-8 lg:gap-12">
                {/* Number */}
                <span className={cn(
                  'font-grotesk text-[48px] font-black tracking-tighter leading-none transition-colors duration-500 shrink-0 hidden md:block',
                  hoveredIdx === i ? 'text-flash-deep' : 'text-foreground/[0.04]'
                )}>
                  {f.tag}
                </span>

                {/* Icon */}
                <div className={cn(
                  'h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500',
                  hoveredIdx === i
                    ? 'bg-flash-deep shadow-lg shadow-flash-deep/30 scale-110'
                    : 'bg-flash-brand/10'
                )}>
                  <f.icon className={cn(
                    'h-7 w-7 transition-colors duration-500',
                    hoveredIdx === i ? 'text-white' : 'text-flash-deep'
                  )} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-grotesk text-[20px] font-bold tracking-tight mb-2">{f.title}</h3>
                  <p className={cn(
                    'text-[14px] leading-[1.8] max-w-lg transition-colors duration-500',
                    hoveredIdx === i ? 'text-foreground/60' : 'text-foreground/35'
                  )}>
                    {f.desc}
                  </p>
                </div>

                {/* Arrow */}
                <div className={cn(
                  'hidden lg:flex items-center justify-center h-10 w-10 rounded-xl border transition-all duration-500 shrink-0 self-center',
                  hoveredIdx === i
                    ? 'border-flash-brand/30 bg-flash-brand/10 scale-100 opacity-100'
                    : 'border-transparent opacity-0 scale-75'
                )}>
                  <ArrowUpRight className="h-4 w-4 text-flash-deep" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  PRICING                                                            */
/* ================================================================== */

function Pricing() {
  return (
    <section id="pricing" className="py-32 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-flash-surface/30 -z-10" />
      <GridPattern className="opacity-[0.02]" />

      <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-lg mx-auto mb-20"
        >
          <span className="text-[11px] font-grotesk font-bold uppercase tracking-[0.25em] text-flash-deep mb-5 block">
            Planos
          </span>
          <h2 className="font-grotesk text-[clamp(2.2rem,5vw,3.5rem)] font-black leading-[1] tracking-[-0.03em] mb-5">
            Investimento que
            <br />
            <span className="text-foreground/15">se paga sozinho</span>
          </h2>
          <p className="text-[15px] text-foreground/40 leading-[1.8]">
            Comece grátis. Escale quando quiser. Cancele quando quiser.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 max-w-[1080px] mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'relative flex flex-col rounded-[28px] p-9 transition-all duration-700 group',
                plan.highlight
                  ? 'bg-flash-midnight text-white shadow-2xl shadow-flash-midnight/40 scale-[1.04] z-10'
                  : 'bg-card border border-border/40 hover:border-flash-brand/15 hover:shadow-xl hover:shadow-flash-brand/5'
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div className="px-5 py-1.5 rounded-full bg-flash-deep text-white text-[10px] font-grotesk font-bold tracking-[0.15em] uppercase shadow-lg shadow-flash-deep/40 flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3" />
                    Mais Popular
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className={cn('font-grotesk text-[13px] font-bold tracking-[0.15em] uppercase mb-1.5', !plan.highlight && 'text-flash-deep')}>
                  {plan.name}
                </h3>
                <p className={cn('text-[13px]', plan.highlight ? 'text-white/40' : 'text-foreground/35')}>
                  {plan.desc}
                </p>
              </div>

              <div className="mb-9">
                <div className="flex items-baseline gap-1">
                  <span className={cn('text-[12px] font-medium', plan.highlight ? 'text-white/30' : 'text-foreground/25')}>R$</span>
                  <span className="font-grotesk text-[52px] font-black tracking-[-0.04em] leading-none">{plan.price}</span>
                  {plan.price > 0 && (
                    <span className={cn('text-[13px] ml-1', plan.highlight ? 'text-white/30' : 'text-foreground/25')}>/mês</span>
                  )}
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-flash-brand/15 to-transparent mb-8" />

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-3 text-[13px]">
                    <div className={cn(
                      'h-5 w-5 rounded-lg flex items-center justify-center shrink-0',
                      plan.highlight ? 'bg-flash-deep/30' : 'bg-flash-brand/10'
                    )}>
                      <Check className={cn('h-3 w-3', plan.highlight ? 'text-flash-brand' : 'text-flash-deep')} />
                    </div>
                    <span className={plan.highlight ? 'text-white/70' : 'text-foreground/50'}>{feat}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  'w-full h-[52px] rounded-2xl text-[14px] font-semibold transition-all duration-500',
                  plan.highlight
                    ? 'bg-white text-flash-midnight hover:bg-flash-brand shadow-xl shadow-white/10 hover:shadow-flash-brand/30'
                    : 'bg-flash-surface text-flash-darker hover:bg-flash-brand/15 border border-flash-brand/15 hover:border-flash-brand/30'
                )}
                asChild
              >
                <Link to="/login">
                  {plan.cta}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CTA                                                                */
/* ================================================================== */

function FinalCTA() {
  return (
    <section className="py-28 bg-background relative">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[36px] bg-gradient-to-br from-flash-midnight via-flash-darker to-flash-deep overflow-hidden px-10 py-24 md:py-28 text-center"
        >
          {/* Decorations */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-flash-brand/10 blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-flash-glow/10 blur-[100px] translate-x-1/3 translate-y-1/3" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '28px 28px'
            }}
          />

          <div className="relative space-y-8 max-w-2xl mx-auto">
            <h2 className="font-grotesk text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-[1.05] tracking-[-0.03em]">
              Pronto para transformar
              <br />
              <span className="text-flash-brand">seu negócio?</span>
            </h2>
            <p className="text-white/35 text-[16px] max-w-md mx-auto leading-relaxed">
              Milhares de empreendedores já escolheram a FlashLoja. Sua vez.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-flash-midnight hover:bg-flash-brand hover:text-white rounded-2xl px-10 h-[58px] text-[15px] font-semibold shadow-2xl shadow-white/10 hover:shadow-flash-brand/30 hover:-translate-y-1 transition-all duration-500 group"
                asChild
              >
                <Link to="/login">
                  Criar Minha Loja
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FOOTER                                                             */
/* ================================================================== */

function Footer() {
  return (
    <footer className="border-t border-flash-brand/8 bg-flash-surface/20">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-[2.5fr_1fr_1fr] gap-12 mb-16">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-flash-deep to-flash-darker flex items-center justify-center shadow-lg shadow-flash-deep/20">
                <Zap className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="font-grotesk text-[20px] font-bold">
                Flash<span className="text-flash-deep">Loja</span>
              </span>
            </div>
            <p className="text-[14px] text-foreground/35 max-w-sm leading-[1.9]">
              A plataforma de e-commerce mais rápida do Brasil.
              Design premium, performance excepcional.
            </p>
          </div>
          <div>
            <h4 className="font-grotesk text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/20 mb-5">Produto</h4>
            <ul className="space-y-3.5">
              {['Recursos', 'Planos', 'Temas', 'API'].map(l => (
                <li key={l}>
                  <a href="#" className="text-[13px] text-foreground/40 hover:text-foreground transition-colors duration-300">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-grotesk text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/20 mb-5">Suporte</h4>
            <ul className="space-y-3.5">
              {['Central de Ajuda', 'Contato', 'Status', 'Docs'].map(l => (
                <li key={l}>
                  <a href="#" className="text-[13px] text-foreground/40 hover:text-foreground transition-colors duration-300">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-flash-brand/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[11px] text-foreground/20 font-grotesk tracking-wide">
            © {new Date().getFullYear()} FlashLoja. Todos os direitos reservados.
          </span>
          <div className="flex gap-6">
            <a href="#" className="text-[11px] text-foreground/20 hover:text-foreground/50 transition-colors">Termos</a>
            <a href="#" className="text-[11px] text-foreground/20 hover:text-foreground/50 transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-flash-brand/30 selection:text-flash-midnight">
      <Navbar />
      <HeroBento />
      <Marquee />
      <ProofBar />
      <Features />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
}
