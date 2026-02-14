@php
    $price = $item->current_price;
    $previous_price = $item->previous_price;
    // Fallback for currency
    $currency = $userBs->base_currency_symbol ?? $userBs->base_currency_text ?? 'R$'; 
    $slug = $item->slug;
    try {
        $detailUrl = route('front.user.item_detail', (array) getParam() + ['slug' => $slug]);
    } catch (\Throwable $e) {
        $detailUrl = '#';
    }
@endphp

<a href="{{ $detailUrl }}" class="pm-product-card">
  <div class="pm-product-card__img-wrap">
    <img class="pm-product-card__img lazyload" data-src="{{ asset('assets/front/img/user/items/thumbnail/' . $item->thumbnail) }}" src="{{ asset('assets/front/images/placeholder.png') }}" alt="{{ $item->title }}">
    @if($previous_price > $price)
        @php
            $discount = round((($previous_price - $price) / $previous_price) * 100);
        @endphp
        <span class="pm-product-card__badge">-{{ $discount }}%</span>
    @endif
  </div>
  <div class="pm-product-card__body">
    {{-- Category optional fetch --}}
    @if(!empty($item->category))
        <p class="pm-product-card__category">{{ $item->category->name }}</p>
    @elseif(!empty($item->category_id))
        @php
             // Avoid N+1 if possible, but for now explicit check
             $cat = \App\Models\User\UserItemCategory::find($item->category_id);
        @endphp
        @if($cat)
            <p class="pm-product-card__category">{{ $cat->name }}</p>
        @endif
    @endif

    <h3 class="pm-product-card__title">{{ $item->title }}</h3>
    
    <div class="pm-product-card__prices">
      <span class="pm-product-card__price">{{ $currency }}{{ number_format($price, 2, ',', '.') }}</span>
      @if($previous_price > $price)
        <span class="pm-product-card__old-price">{{ $currency }}{{ number_format($previous_price, 2, ',', '.') }}</span>
      @endif
    </div>
    
    <div class="pm-product-card__actions">
        {{-- Buy Now Button --}}
        <span class="pm-btn pm-btn--buy pm-btn-buy">Comprar</span>
    </div>
  </div>
</a>
