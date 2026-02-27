{{-- ═══ ProductDetailPage — exact mirror of src/pages/ProductDetailPage.tsx ═══ --}}
@extends('layout.store')
@section('title', $product->name)
@section('content')
@php
    $images = $product->images ?? ($product->featured_image ? [$product->featured_image] : ['/placeholder.svg']);
    if (!is_array($images)) $images = [$images];
    $comparePrice = $product->compare_price ?? null;
    $discount = $comparePrice ? round((1 - $product->price / $comparePrice) * 100) : 0;
@endphp
<div class="container mx-auto px-4 py-8">
    <a href="javascript:history.back()" class="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        Voltar
    </a>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {{-- Images --}}
        <div class="space-y-4">
            <div class="aspect-[3/4] rounded-xl overflow-hidden bg-secondary">
                <img id="main-image" src="{{ $images[0] }}" alt="{{ $product->name }}" class="h-full w-full object-cover">
            </div>
            @if(count($images) > 1)
                <div class="flex gap-3">
                    @foreach($images as $i => $img)
                        <button onclick="document.getElementById('main-image').src='{{ $img }}';document.querySelectorAll('.thumb-btn').forEach(b=>b.classList.remove('border-foreground'));this.classList.add('border-foreground')"
                                class="thumb-btn w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors {{ $i === 0 ? 'border-foreground' : 'border-transparent' }}">
                            <img src="{{ $img }}" alt="" class="h-full w-full object-cover">
                        </button>
                    @endforeach
                </div>
            @endif
        </div>

        {{-- Info --}}
        <div class="space-y-6">
            <div>
                <p class="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">SKU: {{ $product->sku ?? 'N/A' }}</p>
                <h1 class="text-3xl font-display font-bold mb-2">{{ $product->name }}</h1>
                @if($product->rating ?? false)
                    <div class="flex items-center gap-2 mb-4">
                        <div class="flex items-center gap-1">
                            <svg class="h-4 w-4 fill-foreground text-foreground" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <span class="text-sm font-medium">{{ $product->rating }}</span>
                        </div>
                        <span class="text-sm text-muted-foreground">({{ $product->review_count ?? 0 }} avaliações)</span>
                    </div>
                @endif
            </div>

            <div class="flex items-baseline gap-3">
                <span class="text-3xl font-bold">R$ {{ number_format($product->price, 2, ',', '.') }}</span>
                @if($comparePrice)
                    <span class="text-lg text-muted-foreground line-through">R$ {{ number_format($comparePrice, 2, ',', '.') }}</span>
                    <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground font-body">-{{ $discount }}%</span>
                @endif
            </div>

            @if($product->description)
                <p class="text-muted-foreground leading-relaxed font-body">{{ $product->description }}</p>
            @endif

            {{-- Variants (if product has variants) --}}
            @if(method_exists($product, 'variants') && $product->variants && $product->variants->count())
                @php
                    $attrKeys = $product->variants->flatMap(fn($v) => array_keys($v->attributes ?? []))->unique();
                @endphp
                @foreach($attrKeys as $key)
                    <div>
                        <p class="text-sm font-medium mb-2 capitalize">{{ $key }}</p>
                        <div class="flex flex-wrap gap-2">
                            @foreach($product->variants->pluck("attributes.$key")->unique() as $val)
                                <button class="px-4 py-2 text-sm border rounded-lg transition-colors font-body border-border hover:border-foreground">{{ $val }}</button>
                            @endforeach
                        </div>
                    </div>
                @endforeach
            @endif

            {{-- Quantity --}}
            <div>
                <p class="text-sm font-medium mb-2">Quantidade</p>
                <div class="flex items-center border rounded-lg w-fit" id="qty-control">
                    <button type="button" onclick="let q=document.getElementById('qty-input');q.value=Math.max(1,parseInt(q.value)-1)" class="p-3 hover:bg-secondary transition-colors">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>
                    </button>
                    <span id="qty-display" class="px-6 text-sm font-medium">1</span>
                    <input type="hidden" id="qty-input" value="1">
                    <button type="button" onclick="let q=document.getElementById('qty-input');q.value=parseInt(q.value)+1;document.getElementById('qty-display').textContent=q.value" class="p-3 hover:bg-secondary transition-colors">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    </button>
                </div>
            </div>
            <script>
                document.querySelector('#qty-control button:first-child').addEventListener('click', function() {
                    document.getElementById('qty-display').textContent = document.getElementById('qty-input').value;
                });
            </script>

            {{-- Actions --}}
            <div class="flex flex-col gap-3 pt-2">
                <form action="{{ route('store.cart.add') }}" method="POST">
                    @csrf
                    <input type="hidden" name="product_id" value="{{ $product->id }}">
                    <input type="hidden" name="quantity" value="1" class="qty-sync">
                    <input type="hidden" name="buy_now" value="1">
                    <button type="submit" class="w-full rounded-lg text-base font-semibold font-body h-11 px-8 text-white" style="background-color:hsl(0, 72%, 51%)">
                        Comprar Agora
                    </button>
                </form>
                <form action="{{ route('store.cart.add') }}" method="POST">
                    @csrf
                    <input type="hidden" name="product_id" value="{{ $product->id }}">
                    <input type="hidden" name="quantity" value="1" class="qty-sync">
                    <button type="submit" class="w-full rounded-lg text-base font-body h-11 px-8 border border-border bg-background hover:bg-secondary transition-colors inline-flex items-center justify-center gap-2">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                        Adicionar ao Carrinho
                    </button>
                </form>
            </div>

            <div class="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg>
                <span>Frete grátis acima de R$ 299,00</span>
            </div>
        </div>
    </div>

    {{-- Related --}}
    @if($related->count())
        <section class="mt-20">
            <h2 class="text-2xl font-display font-bold mb-8">Produtos Relacionados</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                @foreach($related as $p)
                    @include('store.partials.product-card', ['product' => $p])
                @endforeach
            </div>
        </section>
    @endif
</div>
@endsection