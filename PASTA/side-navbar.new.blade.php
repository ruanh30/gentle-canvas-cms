@php
  $default = \App\Models\User\Language::where('is_default', 1)
      ->where('user_id', Auth::user()->id)
      ->first();
  $defaultLang = $default ? $default->code : 'en';

  $user = Auth::guard('web')->user();
  $package = \App\Http\Helpers\UserPermissionHelper::currentPackagePermission($user->id);
  if (!empty($user)) {
      $permissions = \App\Http\Helpers\UserPermissionHelper::packagePermission($user->id);
      $permissions = json_decode($permissions, true);
  }

  // Helper for active route checks
  $isActive = function ($patterns) {
      foreach ((array) $patterns as $p) {
          if (request()->routeIs($p)) return true;
      }
      return false;
  };

  // Section open states (keep open by default; open if any item active)
  $openLoja = $isActive([
      'user.all.item.orders','user.pending.item.orders','user.processing.item.orders','user.completed.item.orders','user.rejected.item.orders','user.orders.report','user.item.details',
      'user.item.index','user.item.type','user.item.create','user.item.edit','user.item.variations','user.variant.index','user.variant.create','user.variant.edit',
      'user.itemcategory.index','user.itemcategory.edit','user.itemsubcategory.index','user.itemsubcategory.edit','user.product.label.index'
  ]);

  $openConfig = $isActive([
      'user.basic_settings.general-settings','user.appearance','user.theme.version','user.plugins','user.maintenance_mode',
      'user.social.index','user.social.edit','user.cookie.alert','user.basic_settings.mail_templates','user.basic_settings.edit_mail_template','user.mail.information',
      'user.language.index','user.language.edit','user.language.editKeyword','user.gateway.index','user.gateway.offline','user-domains','user-subdomain',
      'user.shop.setting','user.shop-settings','user.register.user',
      'user.home_page.hero.slider_version','user.home_page.hero.create_slider','user.home_page.hero.edit_slider','user.home_page.static_hero_section','user.home_page.banner_section',
      'user.tab.index','user.tab.edit','user.tab.feature','user.tab.products','user.home_page.subscriber.edit','user.home.section.index','user.home_page.featuredImage.edit',
      'user.sections.index','user.home_page.herosec.bacground_img','user.home_page.heroSec.how_it_work','user.home_page.heroSec.product_slider','user.blog.category.index','user.blog.category.edit',
      'user.blog.index','user.blog.create','user.blog.edit','user.faq.index','user.contact','user.not_found_page','user.header.index','user.footer.index','user.ulink.index',
      'user.page.index','user.page.create','user.page.edit','user.additional_sections','user.additional_section.create','user.additional_section.edit',
      'user.pages.aboutus.about','user.pages.about_us.features.edit','user.pages.about_us.features.index','user.pages.counter_section.index','user.pages.counter_section.counter.edit',
      'user.about_us.testimonial.index','user.about_us.testimonial.edit','user.about.additional_sections','user.about.additional_section.create','user.about.additional_section.edit','user.about.sections.index',
      'user.breadcrumb','user.breadcrumb.heading','user.basic_settings.seo','user.cta_section.index','user.image_text_content.section','user.menu_builder.index','user.sections.item_highlight'
  ]);

  $openMarketing = $isActive(['user.subscriber.index','user.mailsubscriber','user.coupon.index','user.qrcode','user.qrcode.index']);
  $openFinanceiro = $isActive(['user.shipping.index','user-currency-index','user-domains','user-subdomain','user.payment-log.index','user.plan.extend.index','user.plan.extend.checkout']);

  // If nothing active, keep open by default
  if (!$openLoja) $openLoja = true;
  if (!$openConfig) $openConfig = true;
  if (!$openMarketing) $openMarketing = true;
  if (!$openFinanceiro) $openFinanceiro = true;
@endphp

<aside class="fl-sidebar sidebar sidebar-style-2" @if (request()->cookie('user-theme') == 'dark') data-background-color="dark2" @endif>
  <a class="fl-brand" href="{{ route('user-dashboard') }}">
    <span class="fl-brand-icon"><i data-lucide="zap"></i></span>
    <span>Flash<b>Loja</b></span>
  </a>

  <div class="sidebar-wrapper scrollbar scrollbar-inner">
    <div class="sidebar-content">
      <ul class="nav nav-primary">

        {{-- PRINCIPAL --}}
        <li class="fl-section-label">Principal</li>
        <li class="nav-item @if (request()->path() == 'user/dashboard') active @endif">
          <a href="{{ route('user-dashboard') }}">
            <span class="fl-icon"><i data-lucide="layout-dashboard"></i></span>
            <p>Painel</p>
          </a>
        </li>

        {{-- LOJA --}}
        <li>
          <a class="fl-section-label fl-section-toggle" data-toggle="collapse" href="#flSectionLoja" role="button" aria-expanded="{{ $openLoja ? 'true' : 'false' }}" aria-controls="flSectionLoja">
            <span>Loja</span>
            <i data-lucide="chevron-down" class="fl-chevron"></i>
          </a>
          <div class="collapse {{ $openLoja ? 'show' : '' }}" id="flSectionLoja">
            <ul class="nav nav-primary fl-nav-section">
              <li class="nav-item @if ($isActive(['user.all.item.orders','user.pending.item.orders','user.processing.item.orders','user.completed.item.orders','user.rejected.item.orders','user.orders.report','user.item.details'])) active @endif">
                <a href="{{ route('user.all.item.orders') }}">
                  <span class="fl-icon"><i data-lucide="shopping-cart"></i></span>
                  <p>Todos os pedidos</p>
                </a>
              </li>

              <li class="nav-item @if ($isActive(['user.item.index','user.item.type','user.item.create','user.item.edit','user.item.variations','user.variant.index','user.variant.create','user.variant.edit'])) active @endif">
                <a href="{{ route('user.item.index') . '?language=' . $defaultLang }}">
                  <span class="fl-icon"><i data-lucide="package"></i></span>
                  <p>Produtos cadastrados</p>
                </a>
              </li>

              <li class="nav-item @if ($isActive(['user.itemcategory.index','user.itemcategory.edit'])) active @endif">
                <a href="{{ route('user.itemcategory.index') . '?language=' . $defaultLang }}">
                  <span class="fl-icon"><i data-lucide="folder-tree"></i></span>
                  <p>Categorias</p>
                </a>
              </li>

              <li class="nav-item @if ($isActive(['user.itemsubcategory.index','user.itemsubcategory.edit'])) active @endif">
                <a href="{{ route('user.itemsubcategory.index') . '?language=' . $defaultLang }}">
                  <span class="fl-icon"><i data-lucide="layers"></i></span>
                  <p>Subcategorias</p>
                </a>
              </li>

              <li class="nav-item @if ($isActive(['user.product.label.index'])) active @endif">
                <a href="{{ route('user.product.label.index') . '?language=' . $defaultLang }}">
                  <span class="fl-icon"><i data-lucide="tags"></i></span>
                  <p>Etiquetas</p>
                </a>
              </li>
            </ul>
          </div>
        </li>

        {{-- CONFIGURAÇÕES --}}
        <li>
          <a class="fl-section-label fl-section-toggle" data-toggle="collapse" href="#flSectionConfig" role="button" aria-expanded="{{ $openConfig ? 'true' : 'false' }}" aria-controls="flSectionConfig">
            <span>Configurações</span>
            <i data-lucide="chevron-down" class="fl-chevron"></i>
          </a>
          <div class="collapse {{ $openConfig ? 'show' : '' }}" id="flSectionConfig">
            <ul class="nav nav-primary fl-nav-section">
              <li class="nav-item @if ($isActive(['user.basic_settings.general-settings','user.appearance','user.theme.version','user.plugins','user.maintenance_mode','user.social.index','user.social.edit','user.cookie.alert','user.basic_settings.mail_templates','user.basic_settings.edit_mail_template','user.mail.information','user.language.index','user.language.edit','user.language.editKeyword','user.gateway.index','user.gateway.offline','user-domains','user-subdomain','user.menu_builder.index'])) active @endif">
                <a href="{{ route('user.basic_settings.general-settings') }}">
                  <span class="fl-icon"><i data-lucide="settings"></i></span>
                  <p>Configurações do site</p>
                </a>
              </li>

              <li class="nav-item @if ($isActive(['user.shop-settings','user.shop.setting'])) active @endif">
                <a href="{{ route('user.shop-settings') }}">
                  <span class="fl-icon"><i data-lucide="wrench"></i></span>
                  <p>Configurações da loja</p>
                </a>
              </li>

              <li class="nav-item @if ($isActive(['user.register.user'])) active @endif">
                <a href="{{ route('user.register.user') }}">
                  <span class="fl-icon"><i data-lucide="users"></i></span>
                  <p>Clientes registrados</p>
                </a>
              </li>

              <li class="nav-item @if ($isActive(['user.pages.aboutus.about','user.blog.index','user.page.index','user.footer.index','user.header.index','user.contact','user.faq.index','user.not_found_page','user.breadcrumb','user.basic_settings.seo','user.additional_sections','user.home_page.hero.slider_version','user.home_page.banner_section'])) active @endif">
                <a href="{{ route('user.page.index') . '?language=' . $defaultLang }}">
                  <span class="fl-icon"><i data-lucide="file-text"></i></span>
                  <p>Páginas</p>
                </a>
              </li>
            </ul>
          </div>
        </li>

        {{-- MARKETING --}}
        <li>
          <a class="fl-section-label fl-section-toggle" data-toggle="collapse" href="#flSectionMarketing" role="button" aria-expanded="{{ $openMarketing ? 'true' : 'false' }}" aria-controls="flSectionMarketing">
            <span>Marketing</span>
            <i data-lucide="chevron-down" class="fl-chevron"></i>
          </a>
          <div class="collapse {{ $openMarketing ? 'show' : '' }}" id="flSectionMarketing">
            <ul class="nav nav-primary fl-nav-section">
              <li class="nav-item @if ($isActive(['user.subscriber.index'])) active @endif">
                <a href="{{ route('user.subscriber.index') }}">
                  <span class="fl-icon"><i data-lucide="user-plus"></i></span>
                  <p>Inscritos</p>
                </a>
              </li>

              <li class="nav-item @if ($isActive(['user.mailsubscriber'])) active @endif">
                <a href="{{ route('user.mailsubscriber') }}">
                  <span class="fl-icon"><i data-lucide="mail"></i></span>
                  <p>E-mail para assinantes</p>
                </a>
              </li>

              <li class="nav-item @if ($isActive(['user.coupon.index'])) active @endif">
                <a href="{{ route('user.coupon.index') }}">
                  <span class="fl-icon"><i data-lucide="credit-card"></i></span>
                  <p>Cupons</p>
                </a>
              </li>

              <li class="nav-item @if ($isActive(['user.qrcode','user.qrcode.index'])) active @endif">
                <a href="{{ route('user.qrcode') }}">
                  <span class="fl-icon"><i data-lucide="qr-code"></i></span>
                  <p>Códigos QR</p>
                </a>
              </li>
            </ul>
          </div>
        </li>

        {{-- FINANCEIRO --}}
        <li>
          <a class="fl-section-label fl-section-toggle" data-toggle="collapse" href="#flSectionFinanceiro" role="button" aria-expanded="{{ $openFinanceiro ? 'true' : 'false' }}" aria-controls="flSectionFinanceiro">
            <span>Financeiro</span>
            <i data-lucide="chevron-down" class="fl-chevron"></i>
          </a>
          <div class="collapse {{ $openFinanceiro ? 'show' : '' }}" id="flSectionFinanceiro">
            <ul class="nav nav-primary fl-nav-section">
              <li class="nav-item @if ($isActive(['user.shipping.index'])) active @endif">
                <a href="{{ route('user.shipping.index') . '?language=' . $defaultLang }}">
                  <span class="fl-icon"><i data-lucide="truck"></i></span>
                  <p>Frete</p>
                </a>
              </li>

              <li class="nav-item @if ($isActive(['user-currency-index'])) active @endif">
                <a href="{{ route('user-currency-index') }}">
                  <span class="fl-icon"><i data-lucide="coins"></i></span>
                  <p>Moedas</p>
                </a>
              </li>

              <li class="nav-item @if ($isActive(['user-domains','user-subdomain'])) active @endif">
                <a href="{{ route('user-domains') }}">
                  <span class="fl-icon"><i data-lucide="globe"></i></span>
                  <p>Domínios e URLs</p>
                </a>
              </li>

              <li class="nav-item @if ($isActive(['user.payment-log.index','user.plan.extend.index','user.plan.extend.checkout'])) active @endif">
                <a href="{{ route('user.payment-log.index') }}">
                  <span class="fl-icon"><i data-lucide="package-check"></i></span>
                  <p>Meu Plano</p>
                </a>
              </li>
            </ul>
          </div>
        </li>

      </ul>
    </div>
  </div>
</aside>
