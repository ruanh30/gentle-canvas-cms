{{-- ═══ ProductCard — exact mirror of src/components/store/ProductCard.tsx ═══ --}}
@php
    $pc = $__t['productCard'] ?? [];
    // Aspect
    $aspectMap = ['1:1' => 'aspect-square', '3:4' => 'aspect-[3/4]', '4:5' => 'aspect-[4/5]', '2:3' => 'aspect-[2/3]', '16:9' => 'aspect-video'];
    $aspectClass = $aspectMap[$pc['imageAspect'] ?? '3:4'] ?? 'aspect-[3/4]';
    // Radius
    $radiusMap = ['none' => 'rounded-none', 'small' => 'rounded-sm', 'medium' => 'rounded-lg', 'large' => 'rounded-xl'];
    $radiusClass = $radiusMap[$pc['imageBorderRadius'] ?? 'medium'] ?? 'rounded-lg';
    // Shadow
    $shadowMap = ['none' => '', 'subtle' => 'shadow-sm', 'medium' => 'shadow-md', 'strong' => 'shadow-lg'];
    $shadowClass = $shadowMap[$pc['shadow'] ?? 'none'] ?? '';
    // Badge radius
    $badgeRadiusMap = ['square' => 'rounded-none', 'rounded' => 'rounded', 'pill' => 'rounded-full'];
    $badgeRadiusClass = $badgeRadiusMap[$pc['badgeStyle'] ?? 'rounded'] ?? 'rounded';
    // Badge position
    $badgePosMap = ['top-left' => 'top-3 left-3', 'top-right' => 'top-3 right-3', 'bottom-left' => 'bottom-3 left-3'];
    $badgePosClass = $badgePosMap[$pc['badgePosition'] ?? 'top-left'] ?? 'top-3 left-3';
    // Price size
    $priceMap = ['small' => 'text-xs', 'medium' => 'text-sm', 'large' => 'text-base'];
    $priceClass = $priceMap[$pc['priceSize'] ?? 'medium'] ?? 'text-sm';
    // Spacing
    $spacingMap = ['compact' => 'mt-2 space-y-0.5', 'normal' => 'mt-3 space-y-1', 'spacious' => 'mt-4 space-y-2'];
    $spacingClass = $spacingMap[$pc['spacing'] ?? 'normal'] ?? 'mt-3 space-y-1';
    // Hover
    $hoverClass = match($pc['imageHover'] ?? 'zoom') { 'zoom' => 'group-hover:scale-105', 'slide' => 'group-hover:translate-x-1', default => '' };
    // Discount
    $comparePrice = $product->compare_price ?? null;
    $discount = $comparePrice ? round((1 - $product->price / $comparePrice) * 100) : 0;
    // Visibility
    $visibility = $pc['buttonVisibility'] ?? 'both';
    $showAdd = ($pc['showAddToCart'] ?? true) && in_array($visibility, ['both', 'add-only']);
    $showBuy = ($pc['showBuyNow'] ?? true) && in_array($visibility, ['both', 'buy-only']);
    $btnStyle = $pc['buttonStyle'] ?? 'solid';
    $btnLayout = $pc['buttonLayout'] ?? 'stacked';
    $buyNowText = $pc['buyNowText'] ?? 'Comprar Agora';
    $addToCartText = $pc['addToCartText'] ?? 'Adicionar ao Carrinho';
    $buyNowColor = $__c['buyNow'] ?? '#dc2626';
    $buyNowHover = $__c['buyNowHover'] ?? '#b91c1c';
    // Button style maps
    $btnRadiusMap = ['solid' => 'rounded-md', 'outline' => 'rounded-md', 'pill' => 'rounded-full', 'rounded' => 'rounded-xl', 'sharp' => 'rounded-none', 'gradient' => 'rounded-md', 'underline' => 'rounded-none'];
    $btnRadiusClass = $btnRadiusMap[$btnStyle] ?? 'rounded-md';
    $contentAlign = $pc['contentAlign'] ?? 'left';
    $image = $product->featured_image ?? ($product->images[0] ?? '/placeholder.svg');
@endphp
<div class="group relative {{ $shadowClass }} {{ ($pc['hoverShadow'] ?? false) ? 'hover:shadow-lg transition-shadow' : '' }} {{ ($pc['border'] ?? false) ? 'border border-border' : '' }} {{ $radiusClass }} {{ $contentAlign === 'center' ? 'text-center' : '' }}">
    <a href="{{ route('store.product', $product->slug) }}" class="block">
        <div class="overflow-hidden bg-secondary relative {{ $aspectClass }} {{ $radiusClass }}">
            <img src="{{ $image }}" alt="{{ $product->name }}" class="h-full w-full object-cover transition-transform duration-500 {{ $hoverClass }}" loading="lazy">
            @if(($pc['showDiscount'] ?? true) && $discount > 0)
                <span class="absolute bg-foreground text-background text-xs font-bold px-2 py-1 {{ $badgeRadiusClass }} {{ $badgePosClass }}">
                    @if(($pc['discountStyle'] ?? 'percentage') === 'percentage')
                        -{{ $discount }}%
                    @elseif(($pc['discountStyle'] ?? '') === 'amount')
                        -R$ {{ number_format($comparePrice - $product->price, 2, ',', '.') }}
                    @else
                        OFERTA
                    @endif
                </span>
            @endif
            <div class="absolute top-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 {{ ($pc['badgePosition'] ?? 'top-left') === 'top-right' ? 'left-3' : 'right-3' }}">
                @if($pc['showWishlist'] ?? false)
                    <button class="bg-background/90 backdrop-blur-sm p-2 rounded-full hover:bg-background shadow-sm">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                    </button>
                @endif
                @if($pc['showQuickView'] ?? false)
                    <button class="bg-background/90 backdrop-blur-sm p-2 rounded-full hover:bg-background shadow-sm">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                @endif
            </div>
        </div>
        <div class="{{ $spacingClass }}">
            @if(($pc['showCategory'] ?? false) && $product->category)
                <p class="text-xs text-muted-foreground uppercase tracking-wider">{{ $product->category->name }}</p>
            @endif
            <h3 class="text-sm font-medium leading-tight {{ match($pc['titleLines'] ?? 2) { 1 => 'line-clamp-1', 2 => 'line-clamp-2', default => 'line-clamp-3' } }}">{{ $product->name }}</h3>
            <div class="flex items-center gap-2 {{ $contentAlign === 'center' ? 'justify-center' : '' }}">
                <span class="font-semibold {{ $priceClass }}">R$ {{ number_format($product->price, 2, ',', '.') }}</span>
                @if(($pc['showComparePrice'] ?? true) && $comparePrice)
                    <span class="text-xs text-muted-foreground line-through">R$ {{ number_format($comparePrice, 2, ',', '.') }}</span>
                @endif
            </div>
            @if(($pc['showInstallments'] ?? false) && $product->price > 100)
                <p class="text-xs text-muted-foreground">até 12x de R$ {{ number_format($product->price / 12, 2, ',', '.') }}</p>
            @endif
        </div>
    </a>
    {{-- Action buttons --}}
    <div class="{{ $btnLayout === 'side-by-side' ? 'mt-2 flex gap-1' : 'mt-2 space-y-1' }}">
        @if($showBuy)
            <form action="{{ route('store.cart.add') }}" method="POST" class="{{ $btnLayout === 'side-by-side' ? 'flex-1' : 'w-full' }}">
                @csrf
                <input type="hidden" name="product_id" value="{{ $product->id }}">
                <input type="hidden" name="quantity" value="1">
                <input type="hidden" name="buy_now" value="1">
                <button type="submit" class="py-2 text-xs font-medium transition-all hover:opacity-90 w-full {{ $btnRadiusClass }}"
                    @if($btnStyle === 'outline')
                        style="border:2px solid {{ $buyNowColor }};color:{{ $buyNowColor }};background:transparent"
                    @elseif($btnStyle === 'gradient')
                        style="background:linear-gradient(135deg,{{ $buyNowColor }},{{ $buyNowHover }});color:#fff"
                    @elseif($btnStyle === 'underline')
                        style="border-bottom:2px solid {{ $buyNowColor }};color:{{ $buyNowColor }};background:transparent"
                    @else
                        style="background-color:{{ $buyNowColor }};color:#fff"
                    @endif
                >{{ $buyNowText }}</button>
            </form>
        @endif
        @if($showAdd)
            @php $addStyle = $pc['addToCartStyle'] ?? 'full-width'; @endphp
            @if($addStyle === 'full-width' || $btnLayout === 'side-by-side')
                <form action="{{ route('store.cart.add') }}" method="POST" class="{{ $btnLayout === 'side-by-side' ? 'flex-1' : 'w-full' }}">
                    @csrf
                    <input type="hidden" name="product_id" value="{{ $product->id }}">
                    <input type="hidden" name="quantity" value="1">
                    <button type="submit" class="text-xs font-medium transition-all hover:opacity-90 w-full py-2 {{ $btnRadiusClass }} {{ $btnStyle === 'outline' ? 'border-2 border-foreground text-foreground bg-transparent' : ($btnStyle === 'underline' ? 'border-b-2 border-foreground text-foreground bg-transparent' : 'bg-foreground text-background') }}">{{ $addToCartText }}</button>
                </form>
            @else
                <form action="{{ route('store.cart.add') }}" method="POST" class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    @csrf
                    <input type="hidden" name="product_id" value="{{ $product->id }}">
                    <input type="hidden" name="quantity" value="1">
                    <button type="submit" class="bg-background/90 backdrop-blur-sm p-2 rounded-full hover:bg-background shadow-sm">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    </button>
                </form>
            @endif
        @endif
    </div>
</div>