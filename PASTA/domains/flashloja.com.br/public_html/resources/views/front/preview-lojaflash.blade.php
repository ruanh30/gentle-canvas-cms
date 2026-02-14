<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Flashloja — Plataforma Multi-tenant para lojas online</title>
  <meta name="description" content="Crie e gerencie lojas online em minutos com a Flashloja. Multi-tenant com subdomínios, domínio próprio, PIX, checkout e painel completo." />

  <style>
    :root{
      --bg:#0b0f19;
      --panel:#0f1629;
      --panel2:#0c1324;
      --text:#e9eefc;
      --muted:#a9b4d6;
      --brand:#7c3aed; /* roxo */
      --brandBlue:#2563eb; /* azul */
      --line:rgba(255,255,255,.10);
      --shadow: 0 20px 60px rgba(0,0,0,.45);
      --radius:16px;
      --radius2:22px;
      --max:1120px;
    }
    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
      color:var(--text);
      background:
        radial-gradient(900px 500px at 10% 10%, rgba(124,58,237,.22), transparent 60%),
        radial-gradient(900px 500px at 90% 20%, rgba(37,99,235,.16), transparent 60%),
        radial-gradient(900px 500px at 50% 90%, rgba(59,130,246,.10), transparent 60%),
        var(--bg);
      overflow-x:hidden;
    }
    a{color:inherit;text-decoration:none}
    .container{max-width:var(--max); margin:0 auto; padding:0 20px;}

    .nav{
      position:sticky; top:0; z-index:50;
      backdrop-filter: blur(10px);
      background: rgba(11,15,25,.65);
      border-bottom: 1px solid var(--line);
    }
    .nav-inner{display:flex; align-items:center; justify-content:space-between; height:72px;}

    .logo{display:flex; align-items:center; gap:10px; font-weight:900; letter-spacing:.2px;}
    .logo img{max-height: 34px; width:auto; height:auto; display:block;}
    .mark{width:34px;height:34px;border-radius:12px;
      background: linear-gradient(135deg, rgba(124,58,237,1), rgba(37,99,235,1));
      box-shadow: 0 10px 30px rgba(124,58,237,.25);
    }

    .nav-links{display:flex; gap:18px; align-items:center; color:var(--muted); font-weight:700; font-size:14px;}
    .nav-links a{padding:10px 10px; border-radius:12px;}
    .nav-links a:hover{background:rgba(255,255,255,.06); color:var(--text);} 

    .btn{
      display:inline-flex; align-items:center; justify-content:center;
      height:44px; padding:0 16px;
      border-radius:14px;
      font-weight:900; font-size:14px;
      border:1px solid transparent;
      cursor:pointer;
      transition:.2s ease;
      user-select:none;
    }
    .btn-primary{
      background: linear-gradient(135deg, rgba(124,58,237,1), rgba(37,99,235,1));
      box-shadow: 0 18px 40px rgba(124,58,237,.25);
    }
    .btn-primary:hover{transform: translateY(-1px); filter:brightness(1.05);} 

    .btn-ghost{ background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.10); color: var(--text); }
    .btn-ghost:hover{background: rgba(255,255,255,.10);} 
    .btn-outline{ background: transparent; border-color: rgba(255,255,255,.18); color: var(--text); }
    .btn-outline:hover{background: rgba(255,255,255,.06);} 

    .burger{display:none}

    .hero{padding:70px 0 40px; position:relative;}
    .badge{
      display:inline-flex; align-items:center; gap:10px;
      padding:10px 12px; border-radius:999px;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.10);
      color: var(--muted);
      font-weight:800; font-size:13px;
    }
    .dot{width:10px;height:10px;border-radius:50%; background: var(--brandBlue); box-shadow: 0 0 0 6px rgba(37,99,235,.12);} 

    .hero-grid{display:grid; grid-template-columns: 1.15fr .85fr; gap:28px; align-items:stretch; margin-top:18px;}
    h1{margin:14px 0 12px; font-size: clamp(34px, 4.2vw, 56px); line-height: 1.03; letter-spacing:-.8px;}
    .lead{color: var(--muted); font-size: 16px; line-height: 1.6; max-width: 52ch;}
    .hero-cta{display:flex; gap:12px; margin-top:22px; flex-wrap:wrap;}
    .subnote{margin-top:10px; color: rgba(233,238,252,.65); font-size:12.5px;}

    .cards{display:grid; gap:14px; align-content:start;}
    .card{
      background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
      border: 1px solid rgba(255,255,255,.10);
      border-radius: var(--radius2);
      padding:16px;
      box-shadow: var(--shadow);
    }

    .mini{display:flex; gap:12px; align-items:flex-start;}
    .ico{
      width:40px;height:40px;border-radius:14px;
      display:grid; place-items:center;
      background: rgba(124,58,237,.14);
      border: 1px solid rgba(124,58,237,.25);
      flex:0 0 auto;
    }
    .ico svg{width:20px;height:20px}
    .mini h3{margin:0 0 4px; font-size:14px}
    .mini p{margin:0; color:var(--muted); font-size:13px; line-height:1.45}

    .section{padding:56px 0;}
    .section h2{margin:0 0 10px; font-size: clamp(24px, 3vw, 36px); letter-spacing:-.4px;}
    .section p.desc{margin:0; color:var(--muted); line-height:1.6; max-width:70ch;}

    .grid-3{display:grid; grid-template-columns: repeat(3, 1fr); gap:14px; margin-top:22px;}
    .feature{padding:18px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.10); border-radius: var(--radius2); min-height: 140px;}
    .feature .top{display:flex; align-items:center; justify-content:space-between; gap:10px;}
    .pill{display:inline-flex; align-items:center; font-size:12px; font-weight:900; color: rgba(233,238,252,.85); background: rgba(124,58,237,.14); border: 1px solid rgba(124,58,237,.25); padding:6px 10px; border-radius:999px;}
    .feature h3{margin:10px 0 6px; font-size:15px;}
    .feature p{margin:0; color:var(--muted); font-size:13.5px; line-height:1.55;}

    .steps{display:grid; grid-template-columns: 1fr 1fr; gap:14px; margin-top:22px;}
    .step{padding:18px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.10); border-radius: var(--radius2);}
    .step .n{width:34px;height:34px;border-radius:12px; display:grid; place-items:center; background: rgba(37,99,235,.14); border: 1px solid rgba(37,99,235,.26); font-weight:950;}
    .step h3{margin:12px 0 6px; font-size:15px;}
    .step p{margin:0; color:var(--muted); font-size:13.5px; line-height:1.55;}

    .pricing{display:grid; grid-template-columns: repeat(3, 1fr); gap:14px; margin-top:22px;}
    .plan{padding:18px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.10); border-radius: var(--radius2); position:relative; overflow:hidden;}
    .plan.featured{border-color: rgba(124,58,237,.45); box-shadow: 0 20px 70px rgba(124,58,237,.18); background: radial-gradient(800px 300px at 50% 0%, rgba(124,58,237,.18), rgba(255,255,255,.04));}
    .plan .tag{position:absolute; top:14px; right:14px; font-size:12px; font-weight:950; padding:6px 10px; border-radius:999px; background: rgba(37,99,235,.14); border: 1px solid rgba(37,99,235,.25);}
    .plan h3{margin:0 0 6px; font-size:16px;}
    .price{font-size:30px; font-weight:950; letter-spacing:-.6px; margin:12px 0 8px;}
    .price span{font-size:13px; color:var(--muted); font-weight:900;}
    .ul{margin:14px 0 0; padding:0; list-style:none; display:grid; gap:10px;}
    .ul li{display:flex; gap:10px; color: var(--muted); font-size:13.5px; line-height:1.4;}
    .check{width:18px;height:18px;border-radius:6px; flex:0 0 auto; background: rgba(37,99,235,.14); border: 1px solid rgba(37,99,235,.25); display:grid; place-items:center; margin-top:1px;}

    .faq{margin-top:22px; display:grid; gap:12px;}
    details{background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.10); border-radius: var(--radius2); padding:14px 16px;}
    summary{cursor:pointer; font-weight:950; outline:none; list-style:none; display:flex; align-items:center; justify-content:space-between; gap:12px;}
    summary::-webkit-details-marker{display:none}
    details p{color:var(--muted); line-height:1.6; margin:10px 0 0;}

    .cta{padding:38px 0 70px;}
    .cta-box{
      border-radius: 26px;
      background:
        radial-gradient(900px 350px at 10% 20%, rgba(37,99,235,.18), transparent 60%),
        radial-gradient(900px 350px at 90% 40%, rgba(124,58,237,.22), transparent 60%),
        rgba(255,255,255,.04);
      border: 1px solid rgba(255,255,255,.10);
      padding:22px;
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:16px;
    }
    .cta-box h3{margin:0 0 6px; font-size:18px;}
    .cta-box p{margin:0; color:var(--muted); line-height:1.6;}

    footer{border-top: 1px solid var(--line); padding:22px 0; color: rgba(233,238,252,.65); font-size:13px;}
    .footer-row{display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap;}
    .smalllinks{display:flex; gap:14px; flex-wrap:wrap;}
    .smalllinks a{color: rgba(233,238,252,.65);} 
    .smalllinks a:hover{color: var(--text);} 

    @media (max-width: 980px){
      .hero-grid{grid-template-columns:1fr;}
      .grid-3{grid-template-columns:1fr;}
      .steps{grid-template-columns:1fr;}
      .pricing{grid-template-columns:1fr;}
      .nav-links{display:none}
      .burger{display:inline-flex}
    }

    .mobile-menu{display:none; border-top:1px solid var(--line); background: rgba(11,15,25,.85);}
    .mobile-menu.open{display:block}
    .mobile-menu a{display:block; padding:14px 20px; color: var(--muted); font-weight:900; border-bottom: 1px solid rgba(255,255,255,.06);}
    .mobile-menu a:hover{color: var(--text); background: rgba(255,255,255,.04);} 
  </style>
</head>
<body>

  <header class="nav">
    <div class="container">
      <div class="nav-inner">
        <a class="logo" href="#top" aria-label="Flashloja">
          <span class="mark" aria-hidden="true"></span>
          <span>Flashloja</span>
        </a>

        <nav class="nav-links" aria-label="Navegação">
          <a href="#recursos">Recursos</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#planos">Planos</a>
          <a href="#faq">FAQ</a>
          <a class="btn btn-ghost" href="#demo">Ver demo</a>
          <a class="btn btn-primary" href="{{ route('front.pricing') }}">Criar minha loja</a>
        </nav>

        <button class="btn btn-ghost burger" id="burger" aria-label="Abrir menu">☰</button>
      </div>
    </div>

    <div class="mobile-menu" id="mobileMenu">
      <a href="#recursos">Recursos</a>
      <a href="#como-funciona">Como funciona</a>
      <a href="#planos">Planos</a>
      <a href="#faq">FAQ</a>
      <a href="#demo">Ver demo</a>
      <a href="{{ route('front.pricing') }}">Criar minha loja</a>
    </div>
  </header>

  <main id="top" class="hero">
    <div class="container">
      <div class="badge">
        <span class="dot" aria-hidden="true"></span>
        Plataforma multi-tenant para criar lojas online em minutos
      </div>

      <div class="hero-grid">
        <section>
          <h1>
            Crie, publique e escale lojas online com a <span style="color:var(--brand)">Flashloja</span>.
          </h1>
          <p class="lead">
            Uma plataforma multi-tenant pronta para subdomínios, domínio próprio, catálogo, checkout e painel.
            Ideal para você vender o seu SaaS de e-commerce para vários lojistas, com gestão centralizada.
          </p>

          <div class="hero-cta" id="começar">
            <a class="btn btn-primary" href="#demo">Quero ver a demo</a>
            <a class="btn btn-outline" href="{{ route('front.pricing') }}">Ver planos</a>
            <a class="btn btn-ghost" href="{{ route('front.contact') }}">Falar com vendas</a>
          </div>

          <div class="subnote">Setup rápido • Multi lojas • Permissões por conta • Cresce com você</div>
        </section>

        <aside class="cards">
          <div class="card">
            <div class="mini">
              <div class="ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M7 10V7a5 5 0 0 1 10 0v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M6 10h12l-1 11H7L6 10Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                </svg>
              </div>
              <div>
                <h3>Multi-tenant de verdade</h3>
                <p>Cada loja com seu painel, subdomínio/domínio e configurações — tudo isolado e seguro.</p>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="mini">
              <div class="ico" aria-hidden="true" style="background:rgba(37,99,235,.12);border-color:rgba(37,99,235,.25)">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M20 7l-8 10L4 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div>
                <h3>Checkout e pagamentos</h3>
                <p>Integre PIX/cartão, cupom, frete e a base de um checkout confiável para converter mais.</p>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="mini">
              <div class="ico" aria-hidden="true" style="background:rgba(59,130,246,.10);border-color:rgba(59,130,246,.22)">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 19V5m0 14h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M7 14l3-3 3 2 5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div>
                <h3>Escalável e rápido</h3>
                <p>Performance, SEO e layout clean para passar confiança e aumentar cliques no CTA.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </main>

  <section id="recursos" class="section">
    <div class="container">
      <h2>Recursos feitos para vender mais</h2>
      <p class="desc">
        A Flashloja foi pensada para você operar um ecossistema de lojas com facilidade — onboarding rápido,
        domínio, catálogo, painel e uma base sólida para crescer.
      </p>

      <div class="grid-3">
        <div class="feature">
          <div class="top"><strong>Subdomínios</strong> <span class="pill">default</span></div>
          <h3>lojista.flashloja.com.br</h3>
          <p>Crie lojas com subdomínio automático, provisionamento instantâneo e SSL.</p>
        </div>

        <div class="feature">
          <div class="top"><strong>Domínio próprio</strong> <span class="pill">premium</span></div>
          <h3>Domínio customizado</h3>
          <p>Fluxo simples: solicita → valida DNS → conecta. Perfeito para lojistas mais avançados.</p>
        </div>

        <div class="feature">
          <div class="top"><strong>Painel do lojista</strong> <span class="pill">core</span></div>
          <h3>Produtos, pedidos e clientes</h3>
          <p>Gestão do básico ao avançado: estoque, variações, status de pedido e relatórios.</p>
        </div>

        <div class="feature">
          <div class="top"><strong>Temas</strong> <span class="pill">clean</span></div>
          <h3>Vitrine moderna</h3>
          <p>Layouts prontos e rápidos: home, coleção, produto, carrinho e checkout.</p>
        </div>

        <div class="feature">
          <div class="top"><strong>SEO</strong> <span class="pill">growth</span></div>
          <h3>Indexação e performance</h3>
          <p>URLs amigáveis, metatags e base rápida para melhorar conversão e tráfego orgânico.</p>
        </div>

        <div class="feature">
          <div class="top"><strong>Admin master</strong> <span class="pill">ops</span></div>
          <h3>Gestão centralizada</h3>
          <p>Crie planos, acompanhe lojas, controle limites e monitore a saúde do sistema.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="como-funciona" class="section">
    <div class="container">
      <h2>Como funciona</h2>
      <p class="desc">Do cadastro à primeira venda: tudo em um fluxo simples para você e para seus lojistas.</p>
      <div class="steps">
        <div class="step"><div class="n">1</div><h3>O lojista cria a conta</h3><p>Escolhe um plano, define o nome da loja e já ganha um subdomínio automático.</p></div>
        <div class="step"><div class="n">2</div><h3>Configura catálogo e layout</h3><p>Produtos, coleções e banners. Tudo com uma interface rápida e objetiva.</p></div>
        <div class="step"><div class="n">3</div><h3>Ativa pagamentos e frete</h3><p>Integra gateway, define regras de entrega e cupons. Pronto para vender.</p></div>
        <div class="step"><div class="n">4</div><h3>Você administra o ecossistema</h3><p>Painel master para planos, domínio próprio, limites, suporte e métricas.</p></div>
      </div>
    </div>
  </section>

  
  
  

  <section id="planos" class="section">
    <div class="container">
      <h2>Planos</h2>
      <p class="desc">Abaixo é o /pricing real, embutido no protótipo (mesmo HTML/CSS do sistema), com ajuste de cores para combinar com esta landing.</p>

      <div id="pricing-shadow"></div>

      <script>
        (async function(){
          const host = document.getElementById('pricing-shadow');
          if (!host) return;

          const shadow = host.attachShadow({mode:'open'});

          // Load required CSS inside shadow (isolated)
          const link1 = document.createElement('link');
          link1.rel = 'stylesheet';
          link1.href = '/assets/front/css/bootstrap.min.css';

          // Icons used by pricing cards
          const fa = document.createElement('link');
          fa.rel = 'stylesheet';
          fa.href = '/assets/front/fonts/fontawesome/css/all.min.css';

          const link2 = document.createElement('link');
          link2.rel = 'stylesheet';
          link2.href = '/assets/front/css/style.css';

          const style = document.createElement('style');
          style.textContent = `
            :host{display:block;}
            /* Dark theme overrides inside the embedded pricing section */
            .pricing-area{padding: 22px 0 10px !important; background: transparent !important;}
            .pricing-area .card{background: rgba(255,255,255,.04) !important; border: 1px solid rgba(255,255,255,.10) !important; border-radius: 22px !important; box-shadow: 0 20px 60px rgba(0,0,0,.45) !important;}
            .pricing-area .card.active{border-color: rgba(124,58,237,.45) !important; box-shadow: 0 20px 70px rgba(124,58,237,.18) !important;}
            .pricing-area .label h3, .pricing-area h5{color: rgba(233,238,252,.92) !important;}
            .pricing-area .price{color: #e9eefc !important;}
            .pricing-area .period{color: rgba(233,238,252,.65) !important;}
            .pricing-area .item-list li{color: rgba(169,180,214,1) !important;}
            .pricing-area .item-list li.disabled{opacity:.55;}
            .pricing-area .item-list li i{color: rgba(37,99,235,.95) !important;}
            .pricing-area .item-list li.disabled i{color: rgba(233,238,252,.55) !important;}
            .pricing-area .show-more{cursor:pointer; color: rgba(233,238,252,.75) !important; font-weight: 900;}

            .pricing-area .nav-tabs{border-bottom: 1px solid rgba(255,255,255,.10) !important; justify-content:center; gap:10px;}
            .pricing-area .nav-tabs .nav-link{border-radius:14px !important; border:1px solid rgba(255,255,255,.10) !important; background: rgba(255,255,255,.06) !important; color: rgba(233,238,252,.80) !important; font-weight: 950;}
            .pricing-area .nav-tabs .nav-link.active{background: radial-gradient(600px 120px at 50% 0%, rgba(124,58,237,.26), rgba(255,255,255,.06)) !important; border-color: rgba(124,58,237,.45) !important; box-shadow: 0 18px 40px rgba(124,58,237,.18) !important; color:#e9eefc !important;}

            .pricing-area .btn.primary-btn{background: linear-gradient(135deg, rgba(124,58,237,1), rgba(37,99,235,1)) !important; border: 0 !important;}
            .pricing-area .btn.secondary-btn{background: rgba(255,255,255,.06) !important; border: 1px solid rgba(255,255,255,.12) !important; color: #e9eefc !important;}

            /* remove decorative background images from original pricing */
            .pricing-area > img.bg-overlay, .pricing-area .shape{display:none !important;}
          `;

          shadow.append(link1, fa, link2, style);

          // Fetch the real pricing page and extract the pricing section
          const res = await fetch('/pricing', {credentials:'same-origin'});
          const html = await res.text();
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const section = doc.querySelector('section.pricing-area');
          if (!section) {
            shadow.append(document.createTextNode('Nao foi possivel carregar os planos.'));
            return;
          }

          // Render
          const wrapper = document.createElement('div');
          wrapper.innerHTML = section.outerHTML;
          shadow.append(wrapper);

          // Tabs behavior (Bootstrap-free)
          const buttons = Array.from(shadow.querySelectorAll('[data-bs-toggle="tab"]'));
          if (buttons.length) {
            const panes = Array.from(shadow.querySelectorAll('.tab-pane'));
            const activate = (targetId) => {
              buttons.forEach(b => b.classList.toggle('active', b.getAttribute('data-bs-target') === targetId));
              panes.forEach(p => {
                const isActive = ('#' + p.id) === targetId;
                p.classList.toggle('show', isActive);
                p.classList.toggle('active', isActive);
              });
            };
            buttons.forEach(b => b.addEventListener('click', (e) => { e.preventDefault(); activate(b.getAttribute('data-bs-target')); }));
          }

          // Show More behavior for toggle lists
          const toggleBtns = Array.from(shadow.querySelectorAll('[data-toggle-btn="toggleListBtn"]'));
          toggleBtns.forEach(btn => {
            const ul = btn.parentElement?.querySelector('ul.toggle-list');
            if (!ul) return;
            const showN = parseInt(ul.getAttribute('data-toggle-show') || '7', 10);
            const apply = (expanded) => {
              const lis = Array.from(ul.querySelectorAll('li'));
              lis.forEach((li, i) => li.style.display = (expanded || i < showN) ? '' : 'none');
              btn.textContent = expanded ? 'Show Less -' : 'Show More +';
              btn.dataset.expanded = expanded ? '1' : '0';
            };
            apply(false);
            btn.addEventListener('click', () => apply(btn.dataset.expanded !== '1'));
          });

        })();
      </script>
    </div>
  </section>
<section id="demo" class="section">
    <div class="container">
      <h2>Demo rápida</h2>
      <p class="desc">Simule como ficaria a URL da loja do seu lojista dentro do multi-tenant.</p>

      <div class="card" style="margin-top:18px;">
        <div style="display:grid; gap:10px;">
          <label style="font-weight:950; font-size:13px; color:rgba(233,238,252,.85)">Digite o nome da loja (slug)</label>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <input id="slug" placeholder="ex: moda-praia" value="minha-loja"
              style="flex:1; min-width:220px; height:44px; border-radius:14px; padding:0 14px; outline:none; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.12); color:var(--text); font-weight:900;">
            <button class="btn btn-primary" id="gen" type="button">Gerar link</button>
            <button class="btn btn-ghost" id="copy" type="button">Copiar</button>
          </div>
          <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
            <div style="color:var(--muted); font-weight:900;">Link:</div>
            <code id="out" style="padding:10px 12px; border-radius:14px; background:rgba(0,0,0,.25); border:1px solid rgba(255,255,255,.10);">minha-loja.flashloja.com.br</code>
            <span id="copied" style="display:none; color:rgba(37,99,235,.95); font-weight:950;">Copiado</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="faq" class="section">
    <div class="container">
      <h2>Perguntas frequentes</h2>
      <p class="desc">Dúvidas comuns sobre multi-tenant, domínio e operação.</p>

      <div class="faq">
        <details><summary>A Flashloja é realmente multi-tenant? <span>＋</span></summary><p>Sim. Cada loja possui isolamento lógico (configurações, domínio, catálogo e permissões). Você administra tudo pelo painel master.</p></details>
        <details><summary>Posso permitir domínio próprio para o lojista? <span>＋</span></summary><p>Sim. Você pode habilitar domínio customizado por plano: o lojista solicita, valida DNS, e você conecta.</p></details>
        <details><summary>Dá para integrar PIX e cartão? <span>＋</span></summary><p>Dá. A landing comunica isso como “integrável”. Na implementação, você conecta o gateway de sua preferência.</p></details>
        <details><summary>Eu consigo vender isso como SaaS mensal? <span>＋</span></summary><p>Esse é o objetivo: planos, limites e provisionamento rápido para escalar com vários lojistas.</p></details>
      </div>
    </div>
  </section>

  <section class="cta" id="contato">
    <div class="container">
      <div class="cta-box">
        <div>
          <h3>Pronto para lançar sua plataforma multi-tenant?</h3>
          <p>Deixe a Flashloja como sua base: rápido para vender, fácil de operar e simples de escalar.</p>
        </div>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <a class="btn btn-primary" href="{{ route('front.pricing') }}">Criar minha loja</a>
          <a class="btn btn-ghost" href="{{ route('front.contact') }}">Falar com vendas</a>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <div class="footer-row">
        <div style="display:flex; align-items:center; gap:10px;">
          <span class="mark" aria-hidden="true" style="width:26px;height:26px;border-radius:10px;"></span>
          <strong>Flashloja</strong>
          <span style="opacity:.7">© <span id="year"></span></span>
        </div>
        <div class="smalllinks">
          <a href="#recursos">Recursos</a>
          <a href="#planos">Planos</a>
          <a href="#faq">FAQ</a>
          <a href="#top">Topo</a>
        </div>
      </div>
    </div>
  </footer>

  <script>
    // Mobile menu
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    burger?.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

    // Demo link generator
    const slug = document.getElementById('slug');
    const out = document.getElementById('out');
    const gen = document.getElementById('gen');
    const copy = document.getElementById('copy');
    const copied = document.getElementById('copied');

    function sanitize(s){
      return (s || "")
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
    }

    function update(){
      const v = sanitize(slug.value || "minha-loja") || "minha-loja";
      out.textContent = `${v}.flashloja.com.br`;
      copied.style.display = "none";
    }

    gen?.addEventListener('click', update);
    slug?.addEventListener('input', update);
    copy?.addEventListener('click', async () => {
      try{
        await navigator.clipboard.writeText(out.textContent);
        copied.style.display = "inline";
        setTimeout(()=>copied.style.display="none", 1800);
      }catch(e){
        alert("Nao consegui copiar automaticamente. Selecione e copie manualmente.");
      }
    });

    document.getElementById('year').textContent = new Date().getFullYear();
    update();
  </script>
</body>
</html>
