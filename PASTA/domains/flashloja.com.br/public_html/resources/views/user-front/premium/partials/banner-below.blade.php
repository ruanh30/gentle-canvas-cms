@php
    $h = $settings['header'] ?? [];
    $bb = $h['bannerBelow'] ?? [];
    $enabled = $bb['enabled'] ?? false;
    $carousel = $bb['carousel'] ?? false;
    $images = $bb['images'] ?? [];
    $imageUrl = $bb['imageUrl'] ?? null;
    $link = $bb['link'] ?? null;
    $height = $bb['height'] ?? '60px'; // Default height
    $speed = $bb['carouselSpeed'] ?? 5;
    
    // Combine single image and array for logic
    $allImages = array_filter(array_merge([$imageUrl], $images));
@endphp

@if($enabled)
    <div class="banner-below" style="height: {{ $height }}; position: relative; overflow: hidden; width: 100%;">
        @if($link) <a href="{{ $link }}" style="display: block; height: 100%;"> @endif
            
            @if($carousel && count($allImages) > 1)
                @foreach($allImages as $index => $img)
                    <div class="banner-slide" style="position: absolute; inset: 0; background-image: url('{{ asset($img) }}'); background-size: cover; background-position: center; transition: opacity 0.7s ease; opacity: {{ $index === 0 ? 1 : 0 }}; width: 100%; height: 100%;"></div>
                @endforeach
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        const slides = document.querySelectorAll('.banner-below .banner-slide');
                        let currentBanner = 0;
                        setInterval(() => {
                            slides[currentBanner].style.opacity = 0;
                            currentBanner = (currentBanner + 1) % slides.length;
                            slides[currentBanner].style.opacity = 1;
                        }, {{ $speed * 1000 }});
                    });
                </script>
            @elseif(count($allImages) > 0)
                <div style="background-image: url('{{ asset($allImages[0]) }}'); background-size: cover; background-position: center; width: 100%; height: 100%;"></div>
            @else
                <div style="background-color: #f1f1f1; display: flex; align-items: center; justify-content: center; height: 100%; color: #888;">
                    Banner Preview (No Image Configured)
                </div>
            @endif

        @if($link) </a> @endif
    </div>
@endif
