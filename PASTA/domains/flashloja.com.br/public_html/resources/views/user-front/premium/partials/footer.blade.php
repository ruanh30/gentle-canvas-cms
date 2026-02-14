{{-- Premium Theme Footer Partial --}}
@php
  $appearance = $userBs->appearance ?? null;
  $settings = [];
  if ($appearance && !empty($appearance->settings)) {
      $settings = is_array($appearance->settings) ? $appearance->settings : (json_decode($appearance->settings, true) ?: []);
  }
  $pmFooter = $settings['footer'] ?? [];
  $pmLogo   = $settings['logo'] ?? [];
  $pmColors = $settings['colors'] ?? [];

  $fBg        = $pmFooter['backgroundColor'] ?? '#1a1a1a';
  $fColor     = $pmFooter['textColor'] ?? '#fafafa';
  $storeName  = $pmLogo['text'] ?? $userBs->website_title ?? 'Loja';
  $copyright  = str_replace('{storeName}', $storeName, $pmFooter['copyrightText'] ?? '© 2024 {storeName}. Todos os direitos reservados.');
  $columns    = $pmFooter['columns'] ?? [];
  $socialLinks = $pmFooter['socialLinks'] ?? [];
  $bottomLinks = $pmFooter['bottomLinks'] ?? [];
  $showNewsletter = !empty($pmFooter['showNewsletter']);
  $showSocial = !empty($pmFooter['showSocial']);
  $showPayment = !empty($pmFooter['showPaymentIcons']);
  $showBackToTop = !empty($pmFooter['showBackToTop']);

  $shopUrl = route('front.user.shop', getParam());
@endphp

<style>
.pm-footer { margin-top: 5rem; }
.pm-footer__inner { padding: 3rem 0; }
.pm-footer__grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
@media (min-width: 768px) { .pm-footer__grid { grid-template-columns: repeat(4, 1fr); } }
.pm-footer__brand-name { font-family: var(--pm-heading-font, serif); font-size: 1.125rem; font-weight: 700; margin-bottom: 1rem; }
.pm-footer__col-title { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem; }
.pm-footer__col-links { list-style: none; padding: 0; margin: 0; }
.pm-footer__col-links li { margin-bottom: 0.5rem; }
.pm-footer__col-links a { font-size: 0.875rem; text-decoration: none; opacity: 0.7; transition: opacity .2s; }
.pm-footer__col-links a:hover { opacity: 1; }
.pm-footer__social { display: flex; gap: 0.75rem; margin-top: 2rem; }
.pm-footer__social a { opacity: 0.7; transition: opacity .2s; }
.pm-footer__social a:hover { opacity: 1; }
.pm-footer__bottom { border-top: 1px solid rgba(255,255,255,0.1); margin-top: 2rem; padding-top: 2rem; text-align: center; font-size: 0.75rem; opacity: 0.5; }
.pm-footer__bottom-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
.pm-footer__bottom-links { display: flex; justify-content: center; gap: 1rem; margin-top: 0.5rem; }
.pm-footer__bottom-links a { opacity: 0.7; transition: opacity .2s; font-size: 0.75rem; text-decoration: none; }
.pm-footer__bottom-links a:hover { opacity: 1; }
.pm-footer__btt { background: none; border: none; cursor: pointer; opacity: 0.7; padding: 0.5rem; transition: opacity .2s; }
.pm-footer__btt:hover { opacity: 1; }
.pm-footer__newsletter { margin-bottom: 1rem; }
.pm-footer__newsletter p { font-size: 0.875rem; opacity: 0.7; margin-bottom: 0.75rem; }
.pm-footer__newsletter form { display: flex; gap: 0.5rem; }
.pm-footer__newsletter input { flex: 1; padding: 0.5rem 0.75rem; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.1); border-radius: 0.375rem; font-size: 0.875rem; color: inherit; }
.pm-footer__newsletter button { padding: 0.5rem 1rem; border: none; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 600; cursor: pointer; }
.pm-footer__payment { display: flex; gap: 0.5rem; margin-top: 1rem; opacity: 0.5; flex-wrap: wrap; }
.pm-footer__payment span { font-size: 0.7rem; padding: 0.25rem 0.5rem; border: 1px solid rgba(255,255,255,0.2); border-radius: 0.25rem; }
</style>

<footer class="pm-footer" style="background:{{ $fBg }};color:{{ $fColor }}">
  <div class="pm-container">
    <div class="pm-footer__inner">
      <div class="pm-footer__grid">
        {{-- Store name & newsletter --}}
        <div>
          <h3 class="pm-footer__brand-name">{{ $storeName }}</h3>

          @if($showNewsletter)
            <div class="pm-footer__newsletter">
              <p>{{ $pmFooter['newsletterDescription'] ?? 'Cadastre-se e fique por dentro das promoções.' }}</p>
              <form action="{{ (\Illuminate\Support\Facades\Route::has('front.user.subscriber') ? route('front.user.subscriber', getParam()) : '#') }}" method="POST">
                @csrf
                <input type="email" name="email" placeholder="Seu e-mail" required>
                <button type="submit" style="background:{{ $pmColors['primary'] ?? '#fff' }};color:{{ $pmColors['primaryForeground'] ?? '#000' }}">Inscrever</button>
              </form>
            </div>
          @endif
        </div>

        {{-- Dynamic Columns --}}
        @foreach($columns as $col)
          @if(!empty($col['enabled']))
            <div>
              <h4 class="pm-footer__col-title">{{ $col['title'] ?? '' }}</h4>
              <ul class="pm-footer__col-links">
                @foreach($col['links'] ?? [] as $link)
                  <li>
                    <a href="{{ $link['url'] ?? '#' }}" style="color:{{ $fColor }}">{{ $link['label'] ?? '' }}</a>
                  </li>
                @endforeach
              </ul>
            </div>
          @endif
        @endforeach
      </div>

      {{-- Social Links --}}
      @if($showSocial && !empty($socialLinks))
        <div class="pm-footer__social">
          @foreach($socialLinks as $social)
            <a href="{{ $social['url'] ?? '#' }}" target="_blank" rel="noopener" style="color:{{ $fColor }}">
              @switch($social['platform'] ?? '')
                @case('instagram')
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  @break
                @case('facebook')
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  @break
                @case('twitter')
                @case('x')
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                  @break
                @case('youtube')
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                  @break
                @case('tiktok')
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                  @break
                @default
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              @endswitch
            </a>
          @endforeach
        </div>
      @endif

      {{-- Payment Icons --}}
      @if($showPayment)
        <div class="pm-footer__payment">
          <span>Visa</span>
          <span>Mastercard</span>
          <span>Pix</span>
          <span>Boleto</span>
          <span>Elo</span>
        </div>
      @endif

      {{-- Bottom --}}
      <div class="pm-footer__bottom" style="border-color:{{ $fColor }}1a">
        <div class="pm-footer__bottom-inner">
          <span>{{ $copyright }}</span>
          @if($showBackToTop)
            <button class="pm-footer__btt" onclick="window.scrollTo({top:0,behavior:'smooth'})" style="color:{{ $fColor }}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
            </button>
          @endif
        </div>
        @if(!empty($bottomLinks))
          <div class="pm-footer__bottom-links">
            @foreach($bottomLinks as $bl)
              <a href="{{ $bl['url'] ?? '#' }}" style="color:{{ $fColor }}">{{ $bl['label'] ?? '' }}</a>
            @endforeach
          </div>
        @endif
      </div>
    </div>
  </div>
</footer>
