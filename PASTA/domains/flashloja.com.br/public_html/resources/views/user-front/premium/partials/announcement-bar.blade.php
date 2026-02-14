@php
    $h = $settings['header'] ?? [];
    $a = $h['announcement'] ?? [];
    $enabled = $a['enabled'] ?? false;
    $messages = $a['messages'] ?? [];
    $validMsgs = array_filter($messages);
    $backgroundColor = $a['backgroundColor'] ?? '#1a1a1a';
    $textColor = $a['textColor'] ?? '#fafafa';
    $style = $a['style'] ?? 'static';
    $speed = $a['speed'] ?? 5;
    $direction = $a['direction'] ?? 'rtl';
@endphp

@if($enabled && count($validMsgs) > 0)
    <div class="announcement-bar" style="background-color: {{ $backgroundColor }}; color: {{ $textColor }}; overflow: hidden; font-size: 12px; padding: 6px 0;">
        @if($style === 'ticker')
            <div class="ticker-wrap">
                <div class="ticker-content" style="animation-duration: {{ $speed * count($validMsgs) * 3 }}s; white-space: nowrap; display: inline-block;">
                    @foreach($validMsgs as $msg)
                        <span style="margin: 0 2rem;">{{ $msg }}</span>
                    @endforeach
                    @foreach($validMsgs as $msg)
                        <span style="margin: 0 2rem;">{{ $msg }}</span>
                    @endforeach
                </div>
            </div>
            <style>
                @keyframes ticker {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .ticker-content {
                    animation-name: ticker;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
            </style>
        @elseif($style === 'carousel' && count($validMsgs) > 1)
            <div class="carousel-container" style="position: relative; height: 20px; text-align: center;">
                @foreach($validMsgs as $index => $msg)
                    <div class="carousel-item" data-index="{{ $index }}" style="position: absolute; width: 100%; transition: opacity 0.5s ease; opacity: {{ $index === 0 ? 1 : 0 }};">
                        {{ $msg }}
                    </div>
                @endforeach
            </div>
            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    const items = document.querySelectorAll('.announcement-bar .carousel-item');
                    let current = 0;
                    setInterval(() => {
                        items[current].style.opacity = 0;
                        current = (current + 1) % items.length;
                        items[current].style.opacity = 1;
                    }, {{ $speed * 1000 }});
                });
            </script>
        @else
            <div style="text-align: center;">
                {{ $validMsgs[0] }}
            </div>
        @endif
    </div>
@endif
