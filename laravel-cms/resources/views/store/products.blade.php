@extends('layout.store')
@section('title', 'Produtos')
@section('content')
<div class="container mx-auto px-4 py-12">
    <div class="flex flex-col md:flex-row gap-8">
        <aside class="w-full md:w-56 shrink-0">
            <h3 class="font-semibold mb-3">Categorias</h3>
            <ul class="space-y-1">
                <li><a href="{{ route('store.products') }}" class="text-sm {{ !request('category')?'text-primary font-medium':'text-gray-600 hover:text-primary' }}">Todas</a></li>
                @foreach($categories as $cat)
                    <li><a href="{{ route('store.products', ['category'=>$cat->slug]) }}" class="text-sm {{ request('category')===$cat->slug?'text-primary font-medium':'text-gray-600 hover:text-primary' }}">{{ $cat->name }}</a></li>
                @endforeach
            </ul>
            <h3 class="font-semibold mt-6 mb-3">Ordenar</h3>
            <ul class="space-y-1">
                <li><a href="{{ route('store.products', array_merge(request()->query(), ['sort'=>'newest'])) }}" class="text-sm text-gray-600 hover:text-primary">Mais recentes</a></li>
                <li><a href="{{ route('store.products', array_merge(request()->query(), ['sort'=>'price_asc'])) }}" class="text-sm text-gray-600 hover:text-primary">Menor preço</a></li>
                <li><a href="{{ route('store.products', array_merge(request()->query(), ['sort'=>'price_desc'])) }}" class="text-sm text-gray-600 hover:text-primary">Maior preço</a></li>
            </ul>
        </aside>
        <div class="flex-1">
            <div class="mb-6">
                <form action="{{ route('store.products') }}" method="GET" class="flex gap-2">
                    @if(request('category'))<input type="hidden" name="category" value="{{ request('category') }}">@endif
                    <input type="text" name="search" value="{{ request('search') }}" placeholder="Buscar..." class="px-4 py-2 border border-gray-200 rounded-lg text-sm flex-1">
                    <button class="bg-primary text-white px-4 py-2 rounded-lg text-sm">Buscar</button>
                </form>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
                @forelse($products as $product)
                    @include('store.partials.product-card', ['product' => $product])
                @empty
                    <div class="col-span-3 py-12 text-center text-gray-500">Nenhum produto encontrado.</div>
                @endforelse
            </div>
            <div class="mt-8">{{ $products->withQueryString()->links() }}</div>
        </div>
    </div>
</div>
@endsection
