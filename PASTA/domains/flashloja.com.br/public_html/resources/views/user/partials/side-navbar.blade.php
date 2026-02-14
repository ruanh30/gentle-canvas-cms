@php
  $default = \App\Models\User\Language::where('is_default', 1)
      ->where('user_id', Auth::user()->id)
      ->first();
  $user = Auth::guard('web')->user();
  $package = \App\Http\Helpers\UserPermissionHelper::currentPackagePermission($user->id);
  if (!empty($user)) {
      $permissions = \App\Http\Helpers\UserPermissionHelper::packagePermission($user->id);
      $permissions = json_decode($permissions, true);
  }
  $themeCookieKey = 'user-theme-' . (Auth::guard('web')->id() ?? 'guest');
@endphp
<aside class="fl-sidebar sidebar sidebar-style-2" @if (request()->cookie($themeCookieKey) == 'dark') data-background-color="dark2" @endif>
  <a class="fl-brand" href="{{ route('user-dashboard') }}">
    <span class="fl-brand-icon"><i data-lucide="zap" class="fl-icon"></i></span>
    <span>Flash<b>Loja</b></span>
  </a>
  <div class="sidebar-wrapper scrollbar scrollbar-inner">
    <div class="sidebar-content">

      {{-- Hidden user section for collapse functionality --}}
      <div class="user" style="display:none!important">
        <div class="info">
          <div class="collapse in" id="collapseExample">
            <ul class="nav">
              @if (true)
                <li><a href="{{ route('user-profile-update', ['language' => $defaultLang]) }}"><span class="link-collapse">{{ __('Edit Profile') }}</span></a></li>
              @endif
              <li><a href="{{ route('user.changePass') }}"><span class="link-collapse">{{ __('Change Password') }}</span></a></li>
              <li><a href="{{ route('user-logout') }}"><span class="link-collapse">{{ __('Logout') }}</span></a></li>
            </ul>
          </div>
        </div>
      </div>

      <ul class="nav nav-primary">

        {{-- ═══════════════════ PRINCIPAL ═══════════════════ --}}
        <li class="fl-section-label">Principal</li>

        <li class="nav-item @if (request()->path() == 'user/dashboard') active @endif">
          <a href="{{ route('user-dashboard') }}">
            <i data-lucide="layout-dashboard" class="fl-icon"></i>
            <p>{{ __('Dashboard') }}</p>
          </a>
        </li>

        @if (true)
        {{-- ═══════════════════ LOJA ═══════════════════ --}}
        <li class="fl-section-label fl-section-toggle" data-section="loja" aria-expanded="true"><span>Loja</span><i data-lucide="chevron-down" class="fl-chevron"></i></li>

        {{-- Orders --}}
        <li class="fl-loja-item nav-item
          @if (request()->routeIs('user.all.item.orders')) active
          @elseif(request()->routeIs('user.pending.item.orders')) active
          @elseif(request()->routeIs('user.processing.item.orders')) active
          @elseif(request()->routeIs('user.completed.item.orders')) active
          @elseif(request()->routeIs('user.rejected.item.orders')) active
          @elseif(request()->routeIs('user.item.details')) active
          @elseif(request()->routeIs('user.orders.report')) active @endif">
          <a data-toggle="collapse" href="#flOrders">
            <i data-lucide="shopping-cart" class="fl-icon"></i>
            <p>{{ __('All Orders') }}</p>
            <span class="caret"></span>
          </a>
          <div class="collapse
            @if (request()->routeIs('user.all.item.orders')) show
            @elseif(request()->routeIs('user.pending.item.orders')) show
            @elseif(request()->routeIs('user.processing.item.orders')) show
            @elseif(request()->routeIs('user.completed.item.orders')) show
            @elseif(request()->routeIs('user.rejected.item.orders')) show
            @elseif(request()->routeIs('user.item.details')) show
            @elseif(request()->routeIs('user.orders.report')) show @endif"
            id="flOrders">
            <ul class="nav nav-collapse">
              <li class="@if (request()->routeIs('user.all.item.orders')) active @endif">
                <a href="{{ route('user.all.item.orders') }}"><span class="sub-item">{{ __('All Orders') }}</span></a>
              </li>
              <li class="@if (request()->routeIs('user.pending.item.orders')) active @endif">
                <a href="{{ route('user.pending.item.orders') }}"><span class="sub-item">{{ __('Pending Orders') }}</span></a>
              </li>
              <li class="@if (request()->routeIs('user.processing.item.orders')) active @endif">
                <a href="{{ route('user.processing.item.orders') }}"><span class="sub-item">{{ __('Processing Orders') }}</span></a>
              </li>
              <li class="@if (request()->routeIs('user.completed.item.orders')) active @endif">
                <a href="{{ route('user.completed.item.orders') }}"><span class="sub-item">{{ __('Completed Orders') }}</span></a>
              </li>
              <li class="@if (request()->routeIs('user.rejected.item.orders')) active @endif">
                <a href="{{ route('user.rejected.item.orders') }}"><span class="sub-item">{{ __('Rejected Orders') }}</span></a>
              </li>
              <li class="@if (request()->routeIs('user.orders.report')) active @endif">
                <a href="{{ route('user.orders.report') }}"><span class="sub-item">{{ __('Sales Report') }}</span></a>
              </li>
            </ul>
          </div>
        </li>

        
        {{-- Produtos --}}
        <li class="fl-loja-item nav-item @if(request()->routeIs('user.item.index') || request()->routeIs('user.item.create') || request()->routeIs('user.item.edit')) active @endif">
          <a href="{{ route('user.item.index', ['language' => $defaultLang]) }}">
            <i data-lucide="package" class="fl-icon"></i>
            <p>Produtos</p>
          </a>
        </li>

        {{-- Categorias --}}
        <li class="fl-loja-item nav-item @if(request()->routeIs('user.itemcategory.index')) active @endif">
          <a href="{{ route('user.itemcategory.index', ['language' => $defaultLang]) }}">
            <i data-lucide="folder-tree" class="fl-icon"></i>
            <p>Categorias</p>
          </a>
        </li>

        {{-- Menus --}}
        <li class="fl-loja-item nav-item @if(request()->routeIs('user.menu.index')) active @endif">
          <a href="{{ route('user.menu.index') }}">
            <i data-lucide="menu" class="fl-icon"></i>
            <p>Menus</p>
          </a>
        </li>

        {{-- Mídia --}}
        <li class="fl-loja-item nav-item @if(request()->routeIs('user.media.index')) active @endif">
          <a href="{{ route('user.media.index') }}">
            <i data-lucide="image" class="fl-icon"></i>
            <p>Mídia</p>
          </a>
        </li>

        {{-- ═══════════════════ CONFIGURAÇÕES ═══════════════════ --}}
        <li class="fl-section-label fl-section-toggle" data-section="config" aria-expanded="true"><span>Configurações</span><i data-lucide="chevron-down" class="fl-chevron"></i></li>

        {{-- Site Settings --}}
        <li class="nav-item
          @if(request()->routeIs('user.appearance') || request()->routeIs('user.appearance.premium')) active
          @elseif(request()->routeIs('user.basic_settings.edit_mail_template')) active
          @elseif(request()->routeIs('user.basic_settings.mail_templates')) active
          @elseif(request()->routeIs('user.cookie.alert')) active
          @elseif(request()->routeIs('user.mail.information')) active
          @elseif(request()->routeIs('user.plugins')) active
          @elseif(request()->routeIs('user.maintenance_mode')) active
          @elseif(request()->routeIs('user-domains')) active
          @elseif(request()->routeIs('user-subdomain')) active
          @elseif(request()->routeIs('user.gateway.index')) active
          @elseif(request()->routeIs('user.gateway.offline')) active @endif">
          <a data-toggle="collapse" href="#flSiteSettings">
            <i data-lucide="settings" class="fl-icon"></i>
            <p>{{ __('Site Settings') }}</p>
            <span class="caret"></span>
          </a>
          <div class="collapse
            @if(request()->routeIs('user.appearance') || request()->routeIs('user.appearance.premium')) show
            @elseif(request()->routeIs('user.basic_settings.edit_mail_template')) show
            @elseif(request()->routeIs('user.basic_settings.mail_templates')) show
            @elseif(request()->routeIs('user.cookie.alert')) show
            @elseif(request()->routeIs('user.mail.information')) show
            @elseif(request()->routeIs('user.plugins')) show
            @elseif(request()->routeIs('user.maintenance_mode')) show
            @elseif(request()->routeIs('user-domains')) show
            @elseif(request()->routeIs('user-subdomain')) show
            @elseif(request()->routeIs('user.gateway.index')) show
            @elseif(request()->routeIs('user.gateway.offline')) show @endif"
            id="flSiteSettings">
            <ul class="nav nav-collapse">
              <li class="@if (request()->routeIs('user.appearance') || request()->routeIs('user.appearance.premium')) active @endif">
                <a href="{{ route('user.appearance.premium') }}"><span class="sub-item">{{ __('Aparência') }}</span></a>
              </li>
              <li class="@if (request()->routeIs('user.plugins')) active @endif">
                <a href="{{ route('user.plugins') }}"><span class="sub-item">{{ __('Plugins') }}</span></a>
              </li>
              <li class="@if (request()->routeIs('user.maintenance_mode')) active @endif">
                <a href="{{ route('user.maintenance_mode') }}"><span class="sub-item">{{ __('Maintenance Mode') }}</span></a>
              </li>
              <li class="@if (request()->routeIs('user.cookie.alert')) active @endif">
                <a href="{{ route('user.cookie.alert', ['language' => $defaultLang]) }}"><span class="sub-item">{{ __('Cookie Alert') }}</span></a>
              </li>
              <li class="submenu @if (request()->routeIs('user.basic_settings.mail_templates')) selected @elseif (request()->routeIs('user.basic_settings.edit_mail_template')) selected @elseif (request()->routeIs('user.mail.information')) selected @endif">
                <a data-toggle="collapse" href="#emailset"
                  aria-expanded="{{ request()->routeIs('user.mail.information') || request()->routeIs('user.basic_settings.mail_templates') || request()->routeIs('user.basic_settings.edit_mail_template') ? 'true' : 'false' }}">
                  <span class="sub-item">{{ __('Email Settings') }}</span>
                  <span class="caret"></span>
                </a>
                <div class="collapse {{ request()->routeIs('user.basic_settings.mail_templates') || request()->routeIs('user.basic_settings.edit_mail_template') || request()->routeIs('user.mail.information') ? 'show' : '' }}" id="emailset">
                  <ul class="nav nav-collapse subnav">
                    <li class="@if (request()->routeIs('user.basic_settings.mail_templates')) active @elseif (request()->routeIs('user.basic_settings.edit_mail_template')) active @endif">
                      <a href="{{ route('user.basic_settings.mail_templates', ['language' => $defaultLang]) }}"><span class="sub-item">{{ __('Modelo de E-mail') }}</span></a>
                    </li>
                    <li class="@if (request()->routeIs('user.mail.information')) active @endif">
                      <a href="{{ route('user.mail.information') }}"><span class="sub-item">{{ __('Informações de E-mail') }}</span></a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="submenu @if (request()->routeIs('user.gateway.index')) selected @elseif(request()->routeIs('user.gateway.offline')) selected @endif">
                <a data-toggle="collapse" href="#gateways"
                  aria-expanded="{{ request()->routeIs('user.gateway.index') || request()->routeIs('user.gateway.offline') ? 'true' : 'false' }}">
                  <span class="sub-item">{{ __('Payment Gateways') }}</span>
                  <span class="caret"></span>
                </a>
                <div class="collapse @if (request()->routeIs('user.gateway.index')) show @elseif(request()->routeIs('user.gateway.offline')) show @endif" id="gateways">
                  <ul class="nav nav-collapse subnav">
                    <li class="@if (request()->routeIs('user.gateway.index')) active @endif">
                      <a href="{{ route('user.gateway.index') }}"><span class="sub-item">{{ __('Online Gateways') }}</span></a>
                    </li>
                    <li class="@if (request()->routeIs('user.gateway.offline')) active @endif">
                      <a href="{{ route('user.gateway.offline') . '?language=' . $defaultLang }}"><span class="sub-item">{{ __('Offline Gateways') }}</span></a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="submenu @if (request()->routeIs('user-domains')) selected @elseif(request()->routeIs('user-subdomain')) selected @endif">
                <a data-toggle="collapse" href="#domains"
                  aria-expanded="{{ request()->routeIs('user-domains') || request()->routeIs('user-subdomain') ? 'true' : 'false' }}">
                  <span class="sub-item">{{ __('Domains & URLs') }}</span>
                  <span class="caret"></span>
                </a>
                <div class="collapse @if (request()->routeIs('user-domains')) show @elseif(request()->routeIs('user-subdomain')) show @endif" id="domains">
                  <ul class="nav nav-collapse subnav">
                    <li class="@if (request()->routeIs('user-domains')) active @endif">
                      <a href="{{ route('user-domains') }}"><span class="sub-item">{{ __('Custom Domain') }}</span></a>
                    </li>
                    <li class="@if (request()->routeIs('user-subdomain')) active @endif">
                      <a href="{{ route('user-subdomain') }}"><span class="sub-item">{{ __('Subdomain & Path URL') }}</span></a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>

        {{-- Registered Customers --}}
        @if (true)
        <li class="nav-item
          @if (request()->path() == 'user/register/users') active
          @elseif(request()->is('user/register/user/details/*')) active
          @elseif(request()->routeIs('user.register.user.changePass')) active @endif">
          <a href="{{ route('user.register.user') }}">
            <i data-lucide="users" class="fl-icon"></i>
            <p>{{ __('Registered Customers') }}</p>
          </a>
        </li>
        @endif

        @endif {{-- end @if(true) for shop --}}

        {{-- ═══════════════════ MARKETING ═══════════════════ --}}
        @if (true)
        <li class="fl-section-label fl-section-toggle" data-section="marketing" aria-expanded="true"><span>Marketing</span><i data-lucide="chevron-down" class="fl-chevron"></i></li>

        {{-- Subscribers --}}
        @if(true)
        <li class="nav-item
          @if (request()->path() == 'user/subscribers') active
          @elseif(request()->path() == 'user/mailsubscriber') active @endif">
          <a data-toggle="collapse" href="#subscribers">
            <i data-lucide="user-plus" class="fl-icon"></i>
            <p>{{ __('Subscribers') }}</p>
            <span class="caret"></span>
          </a>
          <div class="collapse
            @if (request()->path() == 'user/subscribers') show
            @elseif(request()->path() == 'user/mailsubscriber') show @endif"
            id="subscribers">
            <ul class="nav nav-collapse">
              <li class="@if (request()->path() == 'user/subscribers') active @endif">
                <a href="{{ route('user.subscriber.index') }}"><span class="sub-item">{{ __('Subscribers') }}</span></a>
              </li>
              <li class="@if (request()->path() == 'user/mailsubscriber') active @endif">
                <a href="{{ route('user.mailsubscriber') }}"><span class="sub-item">{{ __('E-mail para assinantes') }}</span></a>
              </li>
            </ul>
          </div>
        </li>
        @endif

        {{-- Coupons --}}
        <li class="nav-item @if (request()->routeIs('user.coupon.index')) active @endif">
          <a href="{{ route('user.coupon.index') }}">
            <i data-lucide="credit-card" class="fl-icon"></i>
            <p>{{ __('Coupons') }}</p>
          </a>
        </li>

        {{-- QR Codes --}}
        @if (true)
        <li class="nav-item
          @if (request()->routeIs('user.qrcode')) active
          @elseif(request()->routeIs('user.qrcode.index')) active @endif">
          <a data-toggle="collapse" href="#qrcode">
            <i data-lucide="qr-code" class="fl-icon"></i>
            <p>{{ __('QR Codes') }}</p>
            <span class="caret"></span>
          </a>
          <div class="collapse
            @if (request()->routeIs('user.qrcode')) show
            @elseif(request()->routeIs('user.qrcode.index')) show @endif"
            id="qrcode">
            <ul class="nav nav-collapse">
              <li class="@if (request()->routeIs('user.qrcode')) active @endif">
                <a href="{{ route('user.qrcode') }}"><span class="sub-item">{{ __('Generate QR Code') }}</span></a>
              </li>
              <li class="@if (request()->routeIs('user.qrcode.index')) active @endif">
                <a href="{{ route('user.qrcode.index') }}"><span class="sub-item">{{ __('Saved QR Codes') }}</span></a>
              </li>
            </ul>
          </div>
        </li>
        @endif
        @endif

        {{-- ═══════════════════ FINANCEIRO ═══════════════════ --}}
        <li class="fl-section-label fl-section-toggle" data-section="financeiro" aria-expanded="true"><span>Financeiro</span><i data-lucide="chevron-down" class="fl-chevron"></i></li>

        {{-- Shipping --}}
        @if(true)
        <li class="nav-item @if (request()->routeIs('user.shipping.index')) active @endif">
          <a href="{{ route('user.shipping.index') . '?language=' . $defaultLang }}">
            <i data-lucide="truck" class="fl-icon"></i>
            <p>{{ __('Shipping Charges') }}</p>
          </a>
        </li>
        @endif

        {{-- My Plan --}}
        <li class="nav-item
          @if (request()->routeIs('user.payment-log.index')) active
          @elseif(request()->routeIs('user.plan.extend.index')) active
          @elseif(request()->routeIs('user.plan.extend.checkout')) active @endif">
          <a data-toggle="collapse" href="#Membership">
            <i data-lucide="package-check" class="fl-icon"></i>
            <p>Meu Plano</p>
            <span class="caret"></span>
          </a>
          <div class="collapse
            @if (request()->routeIs('user.payment-log.index')) show
            @elseif(request()->routeIs('user.plan.extend.index')) show
            @elseif(request()->routeIs('user.plan.extend.checkout')) show @endif"
            id="Membership">
            <ul class="nav nav-collapse">
              <li class="@if (request()->routeIs('user.payment-log.index')) active @endif">
                <a href="{{ route('user.payment-log.index') }}"><span class="sub-item">{{ __('Logs') }}</span></a>
              </li>
              <li class="@if (request()->routeIs('user.plan.extend.index')) active @elseif (request()->routeIs('user.plan.extend.checkout')) active @endif">
                <a href="{{ route('user.plan.extend.index') }}"><span class="sub-item">{{ __('Mudar Meu plano') }}</span></a>
              </li>
            </ul>
          </div>
        </li>

      </ul>
    </div>
  </div>
</aside>
