@extends('layout.store')
@section('title', 'Checkout')
@section('content')
<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-display font-bold mb-8">Checkout</h1>

    <form action="{{ route('store.checkout.process') }}" method="POST" id="checkout-form">
        @csrf
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div class="lg:col-span-2 space-y-8">
                {{-- Contact --}}
                <section class="space-y-4">
                    <h2 class="text-lg font-semibold">Contato</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm font-medium leading-none">Nome completo</label>
                            <input type="text" name="customer_name" required placeholder="Seu nome" value="{{ old('customer_name', auth()->user()->name ?? '') }}" class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none">E-mail</label>
                            <input type="email" name="customer_email" required placeholder="email@exemplo.com" value="{{ old('customer_email', auth()->user()->email ?? '') }}" class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none">Telefone</label>
                            <input type="text" name="customer_phone" placeholder="(11) 99999-0000" value="{{ old('customer_phone') }}" class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none">CPF</label>
                            <input type="text" name="customer_cpf" placeholder="000.000.000-00" value="{{ old('customer_cpf') }}" class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        </div>
                    </div>
                </section>

                {{-- Address --}}
                <section class="space-y-4">
                    <h2 class="text-lg font-semibold">Endereço de entrega</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="text-sm font-medium leading-none">CEP</label>
                            <input type="text" name="address_zip" required placeholder="00000-000" value="{{ old('address_zip') }}" class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        </div>
                        <div class="md:col-span-2">
                            <label class="text-sm font-medium leading-none">Rua</label>
                            <input type="text" name="address_street" required placeholder="Rua / Avenida" value="{{ old('address_street') }}" class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none">Número</label>
                            <input type="text" name="address_number" required placeholder="Nº" value="{{ old('address_number') }}" class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none">Complemento</label>
                            <input type="text" name="address_complement" placeholder="Apto, bloco..." value="{{ old('address_complement') }}" class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none">Bairro</label>
                            <input type="text" name="address_neighborhood" required placeholder="Bairro" value="{{ old('address_neighborhood') }}" class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none">Cidade</label>
                            <input type="text" name="address_city" required placeholder="Cidade" value="{{ old('address_city') }}" class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none">Estado</label>
                            <input type="text" name="address_state" required placeholder="UF" value="{{ old('address_state') }}" class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        </div>
                    </div>
                </section>

                {{-- Payment --}}
                <section class="space-y-4">
                    <h2 class="text-lg font-semibold">Pagamento</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="md:col-span-2">
                            <label class="text-sm font-medium leading-none">Número do cartão</label>
                            <input type="text" name="card_number" placeholder="0000 0000 0000 0000" value="{{ old('card_number') }}" class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none">Validade</label>
                            <input type="text" name="card_expiry" placeholder="MM/AA" value="{{ old('card_expiry') }}" class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none">CVV</label>
                            <input type="text" name="card_cvv" placeholder="000" value="{{ old('card_cvv') }}" class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        </div>
                    </div>
                </section>
            </div>

            {{-- Summary sidebar --}}
            <div>
                <div class="border rounded-xl p-6 sticky top-24 space-y-4">
                    <h2 class="font-semibold text-lg">Resumo do pedido</h2>
                    <div class="space-y-3 max-h-60 overflow-y-auto">
                        @foreach($items as $item)
                        <div class="flex gap-3 text-sm">
                            <img src="{{ $item['product']->images[0] ?? '/placeholder.svg' }}" alt="" class="w-12 h-14 object-cover rounded">
                            <div class="flex-1 min-w-0">
                                <p class="font-medium line-clamp-1">{{ $item['product']->name }}</p>
                                <p class="text-muted-foreground">Qtd: {{ $item['quantity'] }}</p>
                            </div>
                            <span class="font-medium">R$ {{ number_format($item['subtotal'], 2, ',', '.') }}</span>
                        </div>
                        @endforeach
                    </div>

                    {{-- Coupon --}}
                    <div class="border-t pt-4">
                        @if(session('applied_coupon'))
                            <div class="flex items-center gap-2 text-sm bg-secondary p-2 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600"><path d="M20 6 9 17l-5-5"/></svg>
                                <span class="font-medium">{{ session('applied_coupon.code') }}</span>
                                <span class="text-muted-foreground">-{{ session('applied_coupon.type') === 'percentage' ? session('applied_coupon.value') . '%' : 'R$ ' . number_format(session('applied_coupon.value'), 2, ',', '.') }}</span>
                                <form action="{{ route('store.checkout.remove-coupon') }}" method="POST" class="ml-auto">
                                    @csrf
                                    <button type="submit" class="text-xs text-muted-foreground hover:text-foreground">Remover</button>
                                </form>
                            </div>
                        @else
                            <form action="{{ route('store.checkout.apply-coupon') }}" method="POST" class="flex gap-2">
                                @csrf
                                <div class="relative flex-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
                                    <input type="text" name="coupon_code" placeholder="Cupom" class="pl-8 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                </div>
                                <button type="submit" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">Aplicar</button>
                            </form>
                        @endif
                    </div>

                    <div class="space-y-2 text-sm font-body border-t pt-4">
                        <div class="flex justify-between"><span class="text-muted-foreground">Subtotal</span><span>R$ {{ number_format($subtotal, 2, ',', '.') }}</span></div>
                        <div class="flex justify-between"><span class="text-muted-foreground">Frete</span><span>{{ $shipping === 0 ? 'Grátis' : 'R$ ' . number_format($shipping, 2, ',', '.') }}</span></div>
                        @if($discount > 0)
                        <div class="flex justify-between text-green-600"><span>Desconto</span><span>-R$ {{ number_format($discount, 2, ',', '.') }}</span></div>
                        @endif
                        <div class="border-t pt-2 flex justify-between font-semibold text-base"><span>Total</span><span>R$ {{ number_format($total, 2, ',', '.') }}</span></div>
                    </div>

                    <button type="submit" class="w-full inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-body font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-11 px-8 text-white" style="background-color: hsl(0, 72%, 51%)">
                        Pagar R$ {{ number_format($total, 2, ',', '.') }}
                    </button>
                </div>
            </div>
        </div>
    </form>
</div>
@endsection
