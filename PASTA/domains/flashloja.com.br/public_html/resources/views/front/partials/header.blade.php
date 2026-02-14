{{-- FlashLoja front header (custom nav) --}}
@php
  $links = json_decode($menus ?? '[]', true) ?: [];
@endphp

<style>
  /* Namespaced styles to avoid collisions with existing theme */
  :root{
    --lf-bg:#ffffff;
    --lf-bg2:#f6f8ff;
    --lf-text:#0f172a;
    --lf-muted:#5b6478;
    --lf-brand:#6c4cff;
    --lf-brand3:#2563eb;
    --lf-line:#e7eaf3;
    --lf-shadow: 0 18px 50px rgba(15,23,42,.10);
    --lf-shadow2: 0 10px 30px rgba(15,23,42,.08);
  }

  .lf-nav{
    position: sticky;
    top: 0;
    z-index: 999;
    backdrop-filter: blur(10px);
    background: rgba(255,255,255,.75);
    border-bottom: 1px solid var(--lf-line);
  }
  .lf-nav-inner{
    display:flex;
    align-items:center;
    justify-content:space-between;
    height:72px;
  }
  .lf-logo{
    display:flex;
    align-items:center;
    gap:12px;
    font-weight:900;
    letter-spacing:.2px;
    min-width: auto;
  }
  .lf-mark{
    height:64px;
    width:auto;
    display:flex;
    align-items:center;
    justify-content:center;
    overflow:visible;
    background: transparent;
    border: 0;
    box-shadow: none;
    border-radius: 0;
  }
  .lf-mark img{
    height: 56px;
    width: auto;
    object-fit: contain;
    padding: 0;
    filter: none;
  }

  .lf-links{
    display:flex;
    gap:18px;
    align-items:center;
    color:var(--lf-muted);
    font-weight:700;
    font-size:14px;
  }
  .lf-links > a,
  .lf-links .lf-dd > a{
    padding:10px 10px;
    border-radius:12px;
    display:inline-flex;
    align-items:center;
    gap:8px;
  }
  .lf-links > a:hover,
  .lf-links .lf-dd > a:hover{
    background:rgba(15,23,42,.05);
    color:var(--lf-text);
  }

  /* Dropdown */
  .lf-dd{position:relative;}
  .lf-dd-menu{
    position:absolute;
    top: calc(100% + 10px);
    left: 0;
    min-width: 220px;
    padding: 8px;
    background: rgba(255,255,255,.98);
    border: 1px solid rgba(15,23,42,.10);
    border-radius: 16px;
    box-shadow: var(--lf-shadow2);
    display:none;
  }
  .lf-dd:hover .lf-dd-menu{display:block;}
  .lf-dd-menu a{
    display:block;
    padding: 10px 12px;
    border-radius: 12px;
    color: var(--lf-muted);
    font-weight: 800;
  }
  .lf-dd-menu a:hover{background: rgba(15,23,42,.05); color: var(--lf-text);}

  /* Buttons */
  .lf-btn{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    height:44px;
    padding:0 16px;
    border-radius:14px;
    font-weight:900;
    font-size:14px;
    border:1px solid transparent;
    cursor:pointer;
    transition:.2s ease;
    user-select:none;
    white-space: nowrap;
  }
  .lf-btn-primary{
    background: linear-gradient(135deg, rgba(108,76,255,1), rgba(37,99,235,1));
    color:#fff;
    box-shadow: 0 18px 40px rgba(108,76,255,.18);
  }
  .lf-btn-primary:hover{transform: translateY(-1px); filter:brightness(1.02); color:#fff;}
  .lf-btn-ghost{
    background: rgba(15,23,42,.04);
    border-color: rgba(15,23,42,.08);
    color: var(--lf-text);
  }
  .lf-btn-ghost:hover{background: rgba(15,23,42,.07);}

  .lf-lang select{
    height: 44px;
    border-radius: 14px;
    padding: 0 12px;
    background: rgba(255,255,255,.85);
    border: 1px solid rgba(15,23,42,.12);
    color: var(--lf-text);
    font-weight: 900;
    outline: none;
  }

  .lf-burger{display:none;}
  .lf-mobile{
    display:none;
    border-top:1px solid var(--lf-line);
    background: rgba(255,255,255,.88);
    backdrop-filter: blur(10px);
  }
  .lf-mobile.open{display:block;}
  .lf-mobile a{
    display:block;
    padding:14px 20px;
    color: var(--lf-muted);
    font-weight: 900;
    border-bottom: 1px solid rgba(15,23,42,.06);
  }
  .lf-mobile a:hover{color: var(--lf-text); background: rgba(15,23,42,.04);}

  @media (max-width: 980px){
    .lf-links{display:none;}
    .lf-burger{display:inline-flex;}
  }
</style>

<header class="lf-nav">
  <div class="container">
    <div class="lf-nav-inner">
      <a class="lf-logo" href="{{ route('front.index') }}" aria-label="{{ $bs->website_title ?? 'Flashloja' }}">
        <span class="lf-mark" aria-hidden="true">
          @if(!empty($bs->logo))
            <img src="{{ asset('assets/front/img/' . $bs->logo) }}" alt="">
          @endif
        </span>
      </a>

      <nav class="lf-links" aria-label="Navegação">
        {{-- Dynamic menu builder links --}}
        @foreach ($links as $link)
          @php $href = getHref($link); @endphp
          @if (!array_key_exists('children', $link))
            <a href="{{ $href }}" target="{{ $link['target'] }}">{{ $link['text'] }}</a>
          @else
            <div class="lf-dd">
              <a href="{{ $href }}" target="{{ $link['target'] }}">
                {{ $link['text'] }}
                <span aria-hidden="true" style="opacity:.65">▾</span>
              </a>
              <div class="lf-dd-menu" role="menu">
                @foreach ($link['children'] as $level2)
                  @php $l2Href = getHref($level2); @endphp
                  <a role="menuitem" href="{{ $l2Href }}" target="{{ $level2['target'] }}">{{ $level2['text'] }}</a>
                @endforeach
              </div>
            </div>
          @endif
        @endforeach

        {{-- Actions --}}
        @guest
          <a class="lf-btn lf-btn-ghost" href="{{ route('user.login') }}">Entrar</a>
        @endguest
        @auth
          <a class="lf-btn lf-btn-ghost" href="{{ route('user-dashboard') }}">Dashboard</a>
        @endauth

        <a class="lf-btn lf-btn-primary" href="{{ route('front.pricing') }}">Criar minha loja</a>

        <span class="lf-lang">
          @if (!empty($currentLang))
            <select onchange="handleSelect(this)">
              @foreach ($langs as $lang)
                <option value="{{ $lang->code }}" {{ $currentLang->code === $lang->code ? 'selected' : '' }}>
                  {{ $lang->name }}
                </option>
              @endforeach
            </select>
          @endif
        </span>
      </nav>

      <button class="lf-btn lf-btn-ghost lf-burger" id="lfBurger" aria-label="Abrir menu">☰</button>
    </div>
  </div>

  {{-- Mobile menu (same links + actions) --}}
  <div class="lf-mobile" id="lfMobile">
    @foreach ($links as $link)
      @php $href = getHref($link); @endphp
      @if (!array_key_exists('children', $link))
        <a href="{{ $href }}" target="{{ $link['target'] }}">{{ $link['text'] }}</a>
      @else
        <a href="{{ $href }}" target="{{ $link['target'] }}">{{ $link['text'] }}</a>
        @foreach ($link['children'] as $level2)
          @php $l2Href = getHref($level2); @endphp
          <a style="padding-left:32px;" href="{{ $l2Href }}" target="{{ $level2['target'] }}">— {{ $level2['text'] }}</a>
        @endforeach
      @endif
    @endforeach

    @guest
      <a href="{{ route('user.login') }}">Entrar</a>
    @endguest
    @auth
      <a href="{{ route('user-dashboard') }}">Dashboard</a>
    @endauth

    <a href="{{ route('front.pricing') }}">Criar minha loja</a>

    @if (!empty($currentLang))
      <div style="padding:14px 20px;">
        <div style="font-weight:900; color: rgba(15,23,42,.7); margin-bottom:8px;">Idioma</div>
        <select style="width:100%;" onchange="handleSelect(this)">
          @foreach ($langs as $lang)
            <option value="{{ $lang->code }}" {{ $currentLang->code === $lang->code ? 'selected' : '' }}>
              {{ $lang->name }}
            </option>
          @endforeach
        </select>
      </div>
    @endif
  </div>
</header>

<script>
  (function(){
    var burger = document.getElementById('lfBurger');
    var menu = document.getElementById('lfMobile');
    if(!burger || !menu) return;
    burger.addEventListener('click', function(){
      menu.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        menu.classList.remove('open');
      });
    });
  })();
</script>
