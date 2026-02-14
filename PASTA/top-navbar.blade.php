@php
  use App\Http\Helpers\LimitCheck as LimitCheck;

  $userId = Auth::guard('web')->user()->id;
  $currPackage = LimitCheck::current_package($userId);
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
@endphp

<header class="fl-topbar">
  <button class="btn btn-toggle toggle-sidebar" aria-label="Menu">
    <i class="icon-menu"></i>
  </button>

  <div class="fl-topbar-right">
    {{-- Theme Toggle --}}
    <form action="{{ route('user.theme.change') }}" class="form-inline" id="adminThemeForm">
      <div class="form-group mb-0">
        <div class="selectgroup selectgroup-secondary selectgroup-pills">
          <label class="selectgroup-item mb-0">
            <input type="radio" name="theme" value="light" class="selectgroup-input"
              {{ empty(request()->cookie('user-theme')) || request()->cookie('user-theme') == 'light' ? 'checked' : '' }}
              onchange="document.getElementById('adminThemeForm').submit();">
            <span class="selectgroup-button selectgroup-button-icon"><i class="fa fa-sun"></i></span>
          </label>
          <label class="selectgroup-item mb-0">
            <input type="radio" name="theme" value="dark" class="selectgroup-input"
              {{ request()->cookie('user-theme') == 'dark' ? 'checked' : '' }}
              onchange="document.getElementById('adminThemeForm').submit();">
            <span class="selectgroup-button selectgroup-button-icon"><i class="fa fa-moon"></i></span>
          </label>
        </div>
      </div>
    </form>

    {{-- Plan Badge --}}
    @if (!is_null($currPackage))
      <span class="fl-plan-badge" data-toggle="modal" data-target="#limitModal" style="cursor:pointer;">
        @if ($infoIcon)
          <i class="fas fa-exclamation-triangle mr-1" style="color: #ef4444;"></i>
        @endif
        {{ $currPackage->title ?? 'Premium' }} · {{ $currPackage->term ?? 'Anual' }}
      </span>
    @endif

    {{-- View Site --}}
    @php
      if (Auth::user()->custom_domain_status == 1 && !empty(Auth::user()->custom_domain)) {
          $domain = Auth::user()->custom_domain;
      } else {
          $domain = Auth::user()->username . '.' . env('WEBSITE_HOST');
      }
    @endphp
    <a class="btn btn-round" target="_blank" href="{{ route('front.user.detail.view', Auth::user()->username) }}" title="Ver site" style="background:var(--fl-primary);color:#fff;border:none;border-radius:8px;padding:4px 10px;font-size:12px;">
      <i class="fas fa-eye"></i>
    </a>

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

            {{-- Online status toggle inside dropdown --}}
            <div class="dropdown-item d-flex align-items-center">
              <label class="switch m-0">
                <input type="checkbox" name="online_status" id="toggle-btn" data-toggle="toggle" data-on="1" data-off="0" @if (Auth::user()->online_status == 1) checked @endif>
                <span class="slider round"></span>
              </label>
              @if (Auth::user()->online_status == 1)
                <span class="ml-2">{{ __('Active') }}</span>
              @else
                <span class="ml-2">{{ __('Deactive') }}</span>
              @endif
            </div>

            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="{{ route('user-logout') }}">{{ __('Logout') }}</a>
          </li>
        </div>
      </ul>
    </div>
  </div>
</header>

@includeIf('user.partials.limit-modal')
