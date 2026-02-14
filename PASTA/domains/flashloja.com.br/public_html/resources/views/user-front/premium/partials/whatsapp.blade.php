@php
    $w = $settings['whatsapp'] ?? [];
    $enabled = $w['enabled'] ?? false;
    $number = $w['number'] ?? '';
    $message = $w['message'] ?? 'Olá!';
    $position = $w['position'] ?? 'bottom-right';
    $delay = $w['delay'] ?? 3;
    $label = $w['label'] ?? '';
    $showLabel = $w['showLabel'] ?? false;
    $bgColor = $w['backgroundColor'] ?? '#25D366';
@endphp

@if($enabled && $number)
    <div id="whatsapp-widget" 
         style="position: fixed; z-index: 9999; {{ $position === 'bottom-left' ? 'left: 20px;' : 'right: 20px;' }} bottom: 20px; display: none; align-items: center; gap: 10px; background-color: {{ $bgColor }}; color: white; padding: 10px 15px; border-radius: 50px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease; cursor: pointer;">
        <a href="https://wa.me/{{ preg_replace('/\D/', '', $number) }}?text={{ urlencode($message) }}" target="_blank" style="color: white; text-decoration: none; display: flex; align-items: center; gap: 8px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            @if($showLabel && $label)
                <span style="font-weight: 500;">{{ $label }}</span>
            @endif
        </a>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
                var widget = document.getElementById('whatsapp-widget');
                if(widget) {
                    widget.style.display = 'flex';
                    widget.classList.add('animate__animated', 'animate__fadeInUp');
                }
            }, {{ $delay * 1000 }});
        });
    </script>
@endif
