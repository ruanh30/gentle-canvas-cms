<script>
  "use strict";
  var mainurl = "{{ url('/') }}";
  var storeUrl = "";
  var removeUrl = "";
  var rmvdbUrl = "";
  var are_you_sure = "{{ __('Are you sure ?') }}";
  var wont_revert_text = "{!! __('You won\'t be able to revert this!') !!}";

  var yes_delete_it = "{{ __('Yes, delete it') }}";
  var cancel = "{{ __('Cancel') }}";
  var yes = "{{ __('Yes') }}";
  var default_currency_msg =
    "{{ __('Important: Changing your default currency will affect the pricing of your products. You may need to adjust or reset your product prices to reflect the new currency settings') }}";
  var demo_mode = "{{ env('DEMO_MODE') }}";
  var shopSetting = "{{ $shopSetting->time_format }}";
  var processing_text = "{{ __('Processing') }}...";
  var WarningText = "{{ __('Warning') }}";
  var downgradText = "{{ __('Your feature limit is over or down graded!') }}";
  var reco1920_300 = "{{ __('Recommended Image size : 1920X300') }}";
  var reco400_260 = "{{ __('Recommended Image size : 400X260') }}";
  var reco680_670 = "{{ __('Recommended Image size : 680X670') }}";
  var reco870_590 = "{{ __('Recommended Image size : 870X590') }}";
  var reco700_375 = "{{ __('Recommended Image size : 700X375') }}";
  var reco700_850 = "{{ __('Recommended Image size : 700X850') }}";
  var reco860_1150 = "{{ __('Recommended Image size : 860X1150') }}";
  var reco860_1320 = "{{ __('Recommended Image size : 860X1320') }}";
  var reco860_400 = "{{ __('Recommended Image size : 860X400') }}";
  var reco445_195 = "{{ __('Recommended Image size : 445X195') }}";
  var reco490_730 = "{{ __('Recommended Image size : 490X730') }}";
  var reco700_280 = "{{ __('Recommended Image size : 700X280') }}";
  var reco750_330 = "{{ __('Recommended Image size : 750X330') }}";
  var reco450_240 = "{{ __('Recommended Image size : 450X240') }}";
  var reco485_730 = "{{ __('Recommended Image size : 485X730') }}";
  var reco500_265 = "{{ __('Recommended Image size : 500X265') }}";
  var reco688_320 = "{{ __('Recommended Image size : 688X320') }}";
  var reco625_570 = "{{ __('Recommended Image size : 625X570') }}";
  var success = "{{ __('Success') }}";
  var nextText = "{{ __('Next') }}";
  var previousText = "{{ __('Previous') }}";
  var showText = "{{ __('Show') }}";
  var entriesText = "{{ __('entries') }}";
  var Search = "{{ __('Search') }}";
  var Showing = "{{ __('Showing') }}";
  var to = "{{ __('to') }}";
  var ofText = "{{ __('of') }}";
</script>
<!--   Core JS Files   -->
<script src="{{ asset('assets/admin/js/core/jquery.min.js') }}"></script>
<script src="{{ asset('assets/admin/js/plugin/vue/vue.js') }}"></script>
<script src="{{ asset('assets/admin/js/plugin/vue/axios.js') }}"></script>
<script src="{{ asset('assets/admin/js/core/popper.min.js') }}"></script>
<script src="{{ asset('assets/admin/js/core/bootstrap.min.js') }}"></script>

<!-- jQuery UI -->
<script src="{{ asset('assets/admin/js/plugin/jquery-ui/jquery-ui.min.js') }}"></script>
<script src="{{ asset('assets/admin/js/plugin/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js') }}"></script>

<!-- jQuery flatpickr -->
<script src="{{ asset('assets/admin/js/plugin/flatpickr.js') }}"></script>
<!-- jQuery Scrollbar -->
<script src="{{ asset('assets/admin/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js') }}"></script>

<!-- Bootstrap Notify -->
<script src="{{ asset('assets/admin/js/plugin/bootstrap-notify/bootstrap-notify.min.js') }}"></script>

<!-- Sweet Alert -->
<script src="{{ asset('assets/admin/js/plugin/sweetalert/sweetalert.min.js') }}"></script>

<!-- Bootstrap Tag Input -->
<script src="{{ asset('assets/admin/js/plugin/bootstrap-tagsinput/bootstrap-tagsinput.min.js') }}"></script>

<!-- Dropzone JS -->
<script src="{{ asset('assets/admin/js/plugin/dropzone/jquery.dropzone.min.js') }}"></script>

{{-- tinymce js --}}
<script type="text/javascript" src="{{ asset('assets/js/tinymce/js/tinymce/tinymce.min.js') }}"></script>

<!-- JS color JS -->
<script src="{{ asset('assets/admin/js/plugin/jscolor/jscolor.js') }}"></script>

<!-- choose color JS -->
<script src="{{ asset('assets/admin/js/plugin/choose-color/choose-color.js') }}"></script>

<!-- Datatable -->
<script src="{{ asset('assets/admin/js/plugin/datatables.min.js') }}"></script>

<!-- Select2 JS -->
<script src="{{ asset('assets/admin/js/plugin/select2.min.js') }}"></script>

<!-- Atlantis JS -->
<script src="{{ asset('assets/admin/js/atlantis.min.js') }}"></script>

<!-- Fontawesome Icon Picker JS -->
<script src="{{ asset('assets/admin/js/plugin/fontawesome-iconpicker/fontawesome-iconpicker.min.js') }}"></script>

<!-- Fonts and icons -->
<script src="{{ asset('assets/admin/js/plugin/webfont/webfont.min.js') }}"></script>

<!-- Custom JS -->
<script src="{{ asset('assets/user/js/custom.js') }}"></script>
@yield('variables')
<!-- misc JS -->
<script>
  var category_url = "{{ '#' }}";
  var user_status = "{{ route('user-status') }}";
</script>
<script src="{{ asset('assets/admin/js/misc.js') }}"></script>

{{-- Lucide Icons init --}}
<script>
  (function () {
    function flLucideRefresh() {
      try {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          window.lucide.createIcons();
        }
      } catch (e) {}
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', flLucideRefresh);
    } else {
      flLucideRefresh();
    }

    // Re-render icons inside newly expanded collapses/modals
    document.addEventListener('shown.bs.collapse', flLucideRefresh);
    document.addEventListener('shown.bs.modal', flLucideRefresh);
  })();
</script>

{{-- Sidebar: section collapse (Principal/Loja/Configurações/Marketing/Financeiro) + caret chevrons --}}
<script>
  (function () {
    function flInitSidebarSections() {
      var sidebar = document.querySelector('.fl-sidebar');
      if (!sidebar) return;

      // Inject lucide chevrons into Atlantis caret spans (so we don't rely on FontAwesome)
      sidebar.querySelectorAll('span.caret').forEach(function (caret) {
        if (caret.querySelector('i[data-lucide]')) return;
        caret.innerHTML = '<i data-lucide="chevron-down" class="fl-icon"></i>';
      });

      // Section-level collapsible blocks (toggle items until next section label)
      var toggles = sidebar.querySelectorAll('.fl-section-label.fl-section-toggle');
      toggles.forEach(function (toggle) {
        if (toggle.dataset.bound === '1') return;
        toggle.dataset.bound = '1';

        // default expanded
        if (!toggle.hasAttribute('aria-expanded')) toggle.setAttribute('aria-expanded', 'true');

        function setCollapsed(collapsed) {
          toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
          // hide/show until next section label
          var el = toggle.nextElementSibling;
          while (el && !(el.classList && el.classList.contains('fl-section-label'))) {
            el.style.display = collapsed ? 'none' : '';
            el = el.nextElementSibling;
          }
        }

        toggle.addEventListener('click', function (e) {
          e.preventDefault();
          var expanded = toggle.getAttribute('aria-expanded') !== 'false';
          setCollapsed(expanded);
          if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
        });

        // ensure initial state visible
        setCollapsed(toggle.getAttribute('aria-expanded') === 'false');
      });

      if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', flInitSidebarSections);
    } else {
      flInitSidebarSections();
    }
  })();
</script>



<script>
/* THEME_TOGGLE_REACT_ADAPT_START */
(function () {
  function bindThemeToggle() {
    var form = document.getElementById('adminThemeForm');
    var btn = form ? form.querySelector('.js-theme-toggle') : null;
    var input = form ? form.querySelector('input[name="theme"]') : null;
    if (!form || !btn || !input || btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var current = btn.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = current === 'dark' ? 'light' : 'dark';

      btn.setAttribute('data-theme', next);
      input.value = next;

      // Keep icon SVGs consistent before submit
      try {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          window.lucide.createIcons();
        }
      } catch (err) {}

      // tiny delay so user sees the knob motion, then submit
      setTimeout(function () { form.submit(); }, 120);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindThemeToggle);
  } else {
    bindThemeToggle();
  }
})();
/* THEME_TOGGLE_REACT_ADAPT_END */
</script>

@yield('scripts')

@yield('vuescripts')
@if (session()->has('modal-show'))
  <script>
    $(document).ready(function() {
      $('#limitModal').modal('show');
    });
  </script>
  @php
    session()->forget('modal-show');
  @endphp
@endif

@if (session()->has('success'))
  <script>
    "use strict";
    var content = {};

    content.message = '{{ session('success') }}';
    content.title = "{{ __('Success') }}";
    content.icon = 'fa fa-bell';

    $.notify(content, {
      type: 'success',
      placement: {
        from: 'top',
        align: 'right'
      },
      showProgressbar: true,
      time: 1000,
      delay: 4000,
    });
  </script>
@endif


@if (session()->has('warning'))
  <script>
    "use strict";
    var content = {};

    content.message = '{{ session('warning') }}';
    content.title = "{{ __('Warning') }}";
    content.icon = 'fa fa-bell';

    $.notify(content, {
      type: 'warning',
      placement: {
        from: 'top',
        align: 'right'
      },
      showProgressbar: true,
      time: 1000,
      delay: 4000,
    });
  </script>
@endif

<script>
(function(){
  function setCollapsed(on){
    document.body.classList.toggle('fl-sidebar-collapsed', !!on);
    try { localStorage.setItem('flSidebarCollapsed', on ? '1' : '0'); } catch(e){}
    if (window.lucide && window.lucide.createIcons) { window.lucide.createIcons(); }
  }

  document.addEventListener('DOMContentLoaded', function(){
    var btn = document.querySelector('.fl-sidebar-trigger');
    if (!btn) return;

    try {
      var saved = localStorage.getItem('flSidebarCollapsed');
      if (saved === '1') setCollapsed(true);
    } catch(e){}

    btn.addEventListener('click', function(ev){
      ev.preventDefault();
      var on = !document.body.classList.contains('fl-sidebar-collapsed');
      setCollapsed(on);
    });
  });
})();
</script>

<script>
// Force-collapse behavior (independent of Atlantis width locks)
(function(){
  function applySidebarInline(on){
    var sb = document.querySelector('.fl-sidebar');
    if(!sb) return;
    if(on){
      sb.style.setProperty('width','64px','important');
      sb.style.setProperty('min-width','64px','important');
      sb.style.setProperty('max-width','64px','important');
      sb.style.setProperty('flex','0 0 64px','important');
    }else{
      sb.style.setProperty('width','260px','important');
      sb.style.setProperty('min-width','260px','important');
      sb.style.setProperty('max-width','260px','important');
      sb.style.setProperty('flex','0 0 260px','important');
    }
  }

  function setCollapsed(on){
    document.body.classList.toggle('fl-sidebar-collapsed', !!on);
    applySidebarInline(!!on);
    try { localStorage.setItem('flSidebarCollapsed', on ? '1' : '0'); } catch(e){}
    if (window.lucide && window.lucide.createIcons) { window.lucide.createIcons(); }
  }

  document.addEventListener('DOMContentLoaded', function(){
    var btn = document.querySelector('.fl-sidebar-trigger');
    if(!btn) return;

    var saved = '0';
    try { saved = localStorage.getItem('flSidebarCollapsed') || '0'; } catch(e){}
    setCollapsed(saved === '1');

    btn.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      setCollapsed(!document.body.classList.contains('fl-sidebar-collapsed'));
    });
  });
})();
</script>

<script>
// FlashLoja: robust sidebar toggle (delegated, conflict-proof)
(function(){
  if (window.__flSidebarDelegatedBound) return;
  window.__flSidebarDelegatedBound = true;

  function applySidebarInline(on){
    var sb = document.querySelector('.fl-sidebar');
    if(!sb) return;
    if(on){
      sb.style.setProperty('width','64px','important');
      sb.style.setProperty('min-width','64px','important');
      sb.style.setProperty('max-width','64px','important');
      sb.style.setProperty('flex','0 0 64px','important');
    }else{
      sb.style.setProperty('width','260px','important');
      sb.style.setProperty('min-width','260px','important');
      sb.style.setProperty('max-width','260px','important');
      sb.style.setProperty('flex','0 0 260px','important');
    }
  }

  function setCollapsed(on){
    var collapsed = !!on;
    document.body.classList.toggle('fl-sidebar-collapsed', collapsed);
    applySidebarInline(collapsed);
    try { localStorage.setItem('flSidebarCollapsed', collapsed ? '1' : '0'); } catch(e) {}
  }

  window.flToggleSidebar = function(){
    setCollapsed(!document.body.classList.contains('fl-sidebar-collapsed'));
  };

  document.addEventListener('DOMContentLoaded', function(){
    var saved = '0';
    try { saved = localStorage.getItem('flSidebarCollapsed') || '0'; } catch(e) {}
    setCollapsed(saved === '1');
  });

  document.addEventListener('click', function(ev){
    var btn = ev.target && ev.target.closest ? ev.target.closest('.fl-sidebar-trigger') : null;
    if(!btn) return;
    ev.preventDefault();
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    window.flToggleSidebar();
  }, true);
})();
</script>

<script>
// Keep data-state like the lovable/shadcn sidebar for style parity
(function(){
  if (window.__flSidebarStateAttrBound) return;
  window.__flSidebarStateAttrBound = true;

  function syncSidebarDataState(){
    var sb = document.querySelector('.fl-sidebar');
    if (!sb) return;
    var collapsed = document.body.classList.contains('fl-sidebar-collapsed');
    sb.setAttribute('data-state', collapsed ? 'collapsed' : 'expanded');
    sb.setAttribute('data-collapsible', collapsed ? 'icon' : '');
    sb.setAttribute('data-sidebar', 'sidebar');
  }

  document.addEventListener('DOMContentLoaded', syncSidebarDataState);
  document.addEventListener('click', function(ev){
    if (ev.target && ev.target.closest && ev.target.closest('.fl-sidebar-trigger')) {
      setTimeout(syncSidebarDataState, 0);
    }
  }, true);
})();
</script>
