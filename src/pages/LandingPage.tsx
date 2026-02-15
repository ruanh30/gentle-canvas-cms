import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, ShoppingBag, Palette, BarChart3, Shield, Globe,
  CreditCard, Truck, MessageCircle, ArrowRight, Check,
  Star, Smartphone, Layers, Headphones
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const features = [
  { icon: ShoppingBag, title: 'Catálogo Completo', desc: 'Gerencie produtos, variações, estoque e imagens em um painel intuitivo.' },
  { icon: Palette, title: 'Editor Visual Premium', desc: 'Personalize cores, fontes, banners e seções da sua loja sem código.' },
  { icon: BarChart3, title: 'Painel de Métricas', desc: 'Acompanhe vendas, pedidos e clientes em tempo real.' },
  { icon: CreditCard, title: 'Pagamentos Integrados', desc: 'PIX, cartão e boleto configurados em minutos.' },
  { icon: Truck, title: 'Frete Inteligente', desc: 'Cálculo automático por região com múltiplas transportadoras.' },
  { icon: Shield, title: 'Segurança Total', desc: 'SSL, backups automáticos e proteção de dados inclusos.' },
  { icon: Globe, title: 'Domínio Próprio', desc: 'Conecte seu domínio personalizado com 1 clique.' },
  { icon: MessageCircle, title: 'WhatsApp Integrado', desc: 'Botão flutuante de WhatsApp para atendimento direto.' },
  { icon: Smartphone, title: '100% Responsivo', desc: 'Sua loja perfeita em qualquer dispositivo.' },
];

const plans = [
  {
    name: 'Starter',
    price: 'Grátis',
    period: '',
    desc: 'Para quem está começando',
    features: ['Até 30 produtos', 'Tema padrão', 'Checkout integrado', 'Suporte por email'],
    cta: 'Começar Grátis',
    highlight: false,
  },
  {
    name: 'Pro',
    price: 'R$ 49',
    period: '/mês',
    desc: 'Para lojas em crescimento',
    features: ['Produtos ilimitados', 'Editor Visual Premium', 'Domínio próprio', 'Relatórios avançados', 'Cupons e promoções', 'Suporte prioritário'],
    cta: 'Assinar Pro',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'R$ 149',
    period: '/mês',
    desc: 'Para operações avançadas',
    features: ['Tudo do Pro', 'Multi-loja', 'API completa', 'Integrações customizadas', 'Gerente de conta dedicado', 'SLA 99.9%'],
    cta: 'Falar com Vendas',
    highlight: false,
  },
];

const stats = [
  { value: '10k+', label: 'Lojistas ativos' },
  { value: '2M+', label: 'Pedidos processados' },
  { value: '99.9%', label: 'Uptime garantido' },
  { value: '4.9★', label: 'Avaliação média' },
];

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-2">
          <Zap className="h-7 w-7 text-amber-500" />
          <span className="text-xl font-bold tracking-tight">
            Flash<span className="text-amber-500">Loja</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Recursos</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Planos</a>
          <a href="#stats" className="hover:text-foreground transition-colors">Resultados</a>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Entrar</Link>
          </Button>
          <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white" asChild>
            <Link to="/login">Criar Loja</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-sm font-medium">
            <Zap className="h-3.5 w-3.5" />
            Plataforma #1 de e-commerce no Brasil
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08]">
            Sua loja online
            <br />
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              em minutos.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
            Crie, personalize e venda com a plataforma mais rápida e intuitiva do mercado.
            Zero código, zero complicação.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-base px-8 h-13 shadow-lg shadow-amber-500/25" asChild>
              <Link to="/login">
                Criar Loja Grátis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 h-13" asChild>
              <a href="#features">Ver Recursos</a>
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-green-500" /> Sem cartão</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-green-500" /> Setup em 2 min</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-green-500" /> Suporte BR</span>
          </div>
        </div>

        {/* Hero visual — a stylised store mockup */}
        <div className="relative hidden lg:block">
          <div className="relative rounded-2xl border border-border/60 bg-card shadow-2xl shadow-black/10 overflow-hidden">
            {/* Fake browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-muted/50">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400/80" />
                <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                <span className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 mx-4 h-7 rounded-md bg-muted flex items-center px-3 text-xs text-muted-foreground">
                minhaloja.flashloja.com.br
              </div>
            </div>
            {/* Fake store content */}
            <div className="p-6 space-y-6">
              <div className="h-40 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center">
                <span className="text-4xl font-bold text-amber-600/60">Sua Marca</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="space-y-2">
                    <div className="aspect-square rounded-lg bg-muted animate-pulse" />
                    <div className="h-3 w-3/4 rounded bg-muted" />
                    <div className="h-3 w-1/2 rounded bg-amber-200 dark:bg-amber-800/50" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-500/15 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Vendas hoje</p>
              <p className="text-sm font-bold">R$ 4.280,00</p>
            </div>
          </div>
          {/* Floating badge 2 */}
          <div className="absolute -top-4 -right-4 bg-card border border-border rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-500/15 flex items-center justify-center">
              <Star className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avaliação</p>
              <p className="text-sm font-bold">4.9/5.0</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section id="stats" className="border-y border-border/50 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="text-center space-y-1">
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              {s.value}
            </p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-medium text-amber-500 uppercase tracking-wider">Recursos</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Tudo que você precisa para vender online
          </h2>
          <p className="text-muted-foreground text-lg">
            Ferramentas profissionais sem complexidade. Monte sua operação completa em um só lugar.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl border border-border/60 bg-card hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                <f.icon className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-medium text-amber-500 uppercase tracking-wider">Planos</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Escolha o plano ideal para seu negócio
          </h2>
          <p className="text-muted-foreground text-lg">
            Comece grátis, evolua quando quiser. Sem surpresas, sem taxa de setup.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={cn(
                'relative flex flex-col rounded-2xl border p-8 transition-all',
                plan.highlight
                  ? 'border-amber-500 bg-card shadow-xl shadow-amber-500/10 scale-[1.03]'
                  : 'border-border/60 bg-card hover:border-border'
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-500 text-white text-xs font-semibold">
                  Mais Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.desc}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  'w-full h-12',
                  plan.highlight
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25'
                    : ''
                )}
                variant={plan.highlight ? 'default' : 'outline'}
                asChild
              >
                <Link to="/login">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-amber-500" />
              <span className="text-lg font-bold">Flash<span className="text-amber-500">Loja</span></span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              A plataforma mais rápida para criar sua loja online profissional. Sem código, sem complicação.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Produto</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground transition-colors">Recursos</a></li>
              <li><a href="#pricing" className="hover:text-foreground transition-colors">Planos</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Temas</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Suporte</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} FlashLoja. Todos os direitos reservados.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
