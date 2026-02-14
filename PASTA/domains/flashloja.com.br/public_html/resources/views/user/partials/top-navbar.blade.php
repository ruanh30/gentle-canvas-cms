@php
  use App\Http\Helpers\LimitCheck as LimitCheck;

  $userId = Auth::guard('web')->user()->id;
  $currPackageId = LimitCheck::current_package($userId);
  $currPackage = !empty($currPackageId) ? \App\Models\Package::find($currPackageId) : null;
  $featureCount = LimitCheck::packageFeaturesCount($userId);
  $infoIcon = false;

  $catLimit = LimitCheck::catLimit($userId);
  $totalCat = $featureCount['categories'];
  $canAddCat = $catLimit - $totalCat;
  $subcatLimit = LimitCheck::subcatLimit($userId);
  $totalSubcat = $featureCount['subcategories'];
  $canAddSubcat = $subcatLimit - $totalSubcat;
  $itemLimit = LimitCheck::itemLimit($userId);
  $totalItem = $featureCount['items'];
  $canAddItem = $itemLimit - $totalItem;
  $blogLimit = LimitCheck::blogLimit($userId);
  $totalBlog = $featureCount['blogs'];
  $canAddBlog = $blogLimit - $totalBlog;
  $langLimit = LimitCheck::langLimit($userId);
  $totalLang = $featureCount['languages'];
  $canAddLang = $langLimit - $totalLang;
  $pageLimit = LimitCheck::pageLimit($userId);
  $totalCustomPage = $featureCount['custome_page'];
  $canAddPage = $pageLimit - $totalCustomPage;

  if ($canAddCat < 0 || $canAddSubcat < 0 || $canAddItem < 0 || $canAddBlog < 0 || $canAddLang < 0 || $canAddPage < 0) {
      $infoIcon = true;
  }

  $themeCookieKey = 'user-theme-' . (Auth::guard('web')->id() ?? 'guest');
  $isDark = request()->cookie($themeCookieKey) == 'dark';
  $toggleTo = $isDark ? 'light' : 'dark';

  $termMap = [
      'monthly' => 'Mensal',
      'month' => 'Mensal',
      'annual' => 'Anual',
      'yearly' => 'Anual',
      'year' => 'Anual',
      'lifetime' => 'Vitalicio',
      'trial' => 'Teste'
  ];

  $rawTerm = strtolower(trim((string) ($currPackage->term ?? '')));
  $termLabel = $termMap[$rawTerm] ?? ucfirst($rawTerm ?: 'N/A');
@endphp

<header class="fl-topbar">
  <button class="fl-sidebar-trigger fl-trigger-shadcn" data-sidebar="trigger" aria-label="Menu" onclick="window.flToggleSidebar();return false;" style="display:inline-flex !important;align-items:center !important;justify-content:center !important;width:42px !important;height:42px !important;min-width:42px !important;min-height:42px !important;padding:0 !important;border:0 !important;border-radius:12px !important;line-height:1 !important;">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left" aria-hidden="true">
    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
    <path d="M9 3v18"></path>
  </svg>
  <span class="sr-only">Toggle Sidebar</span>
</button>

  <div class="flex-1"></div>

  <div class="fl-topbar-right">
    {{-- Theme Toggle (single button) --}}
    <form action="{{ route('user.theme.change') }}" class="form-inline" id="adminThemeForm">
      <input type="hidden" name="theme" value="{{ $toggleTo }}">
      <button type="button" class="fl-theme-toggle js-theme-toggle" data-theme="{{ $isDark ? 'dark' : 'light' }}" aria-label="Alternar tema">
        <span class="fl-theme-toggle-knob">
          <i data-lucide="moon" class="fl-icon fl-theme-icon fl-theme-icon-moon"></i>
          <i data-lucide="sun" class="fl-icon fl-theme-icon fl-theme-icon-sun"></i>
        </span>
      </button>
    </form>

    {{-- Plan Badge (keeps existing limit modal access) --}}
    @if (!is_null($currPackage))
      <span class="fl-plan-badge" data-toggle="modal" data-target="#limitModal" style="cursor:pointer;">
        @if ($infoIcon)
          <span style="margin-right:6px; display:inline-flex; align-items:center;">
            <i data-lucide="alert-triangle" class="fl-icon" style="color:#ef4444;"></i>
          </span>
        @endif
        {{ $currPackage->title ?? 'Sem plano' }} - {{ $termLabel }}
      </span>
    @endif

    {{-- Avatar Dropdown --}}
    <div class="nav-item dropdown hidden-caret">
      <a class="dropdown-toggle profile-pic" data-toggle="dropdown" href="#" aria-expanded="false">
        <div class="avatar-sm">
          @if (!empty(Auth::user()->photo))
            <img src="{{ asset('assets/front/img/user/' . Auth::user()->photo) }}" alt="..." class="avatar-img rounded-circle">
          @else
            <img src="{{ asset('assets/admin/img/propics/blank_user.jpg') }}" alt="..." class="avatar-img rounded-circle">
          @endif
        </div>
      </a>
      <ul class="dropdown-menu dropdown-user animated fadeIn">
        <div class="dropdown-user-scroll scrollbar-outer">
          <li>
            <div class="user-box">
              <div class="avatar-lg">
                @if (!empty(Auth::user()->photo))
                  <img src="{{ asset('assets/front/img/user/' . Auth::user()->photo) }}" alt="..." class="avatar-img rounded">
                @else
                  <img src="{{ asset('assets/admin/img/propics/blank_user.jpg') }}" alt="..." class="avatar-img rounded">
                @endif
              </div>
              <div class="u-text">
                <h4>{{ Auth::user()->first_name }} {{ Auth::user()->last_name }}</h4>
                <p class="text-muted">{{ Auth::user()->email }}</p>
                <a href="{{ route('user-profile-update') }}" class="btn btn-xs btn-secondary btn-sm">{{ __('Edit Profile') }}</a>
              </div>
            </div>
          </li>
          <li>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="{{ route('user-profile-update') }}">{{ __('Edit Profile') }}</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="{{ route('user.changePass') }}">{{ __('Change Password') }}</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="{{ route('user-logout') }}">{{ __('Logout') }}</a>
          </li>
        </div>
      </ul>
    </div>
  </div>
</header>

@includeIf('user.partials.limit-modal')
