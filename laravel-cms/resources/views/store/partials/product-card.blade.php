<a href="{{ route('store.product', $product->slug) }}" class="group">
    <div class="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
        @if($product->featured_image)
            <img src="{{ $product->featured_image }}" alt="{{ $product->name }}" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
        @else
            <div class="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">Sem imagem</div>
        @endif
        <div class="p-4">
            <h3 class="text-sm font-medium group-hover:text-primary transition">{{ $product->name }}</h3>
            <div class="mt-2 flex items-center gap-2">
                @if($product->compare_price)
                    <span class="text-xs text-gray-400 line-through">R$ {{ number_format($product->compare_price, 2, ',', '.') }}</span>
                @endif
                <span class="text-sm font-bold">R$ {{ number_format($product->price, 2, ',', '.') }}</span>
            </div>
        </div>
    </div>
</a>
