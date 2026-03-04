import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck, ShieldCheck, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

const CartPage = () => {
  const { items, updateQuantity, removeItem, subtotal, itemCount } = useCart();
  const navigate = useNavigate();

  const freeShippingThreshold = 299;
  const shipping = subtotal >= freeShippingThreshold ? 0 : 15.90;
  const total = subtotal + shipping;
  const missingForFreeShipping = freeShippingThreshold - subtotal;
  const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-md">
        <div className="bg-secondary/50 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-display font-bold mb-2 text-foreground">Seu carrinho está vazio</h1>
        <p className="text-muted-foreground mb-8 font-body leading-relaxed">
          Que tal explorar nossos produtos e encontrar algo especial?
        </p>
        <Link to="/products">
          <Button size="lg" className="font-body">
            Explorar produtos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-foreground/5 rounded-full p-2.5">
          <ShoppingBag className="h-5 w-5 text-foreground" strokeWidth={1.8} />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground leading-none">Meu Carrinho</h1>
          <p className="text-sm text-muted-foreground font-body mt-0.5">
            {itemCount} {itemCount === 1 ? 'item' : 'itens'}
          </p>
        </div>
      </div>

      {/* Free shipping bar */}
      {missingForFreeShipping > 0 && (
        <div className="mb-6 bg-secondary/60 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
            <p className="text-sm font-body text-foreground">
              Faltam <span className="font-semibold">{formatCurrency(missingForFreeShipping)}</span> para frete grátis
            </p>
          </div>
          <div className="w-full bg-border/60 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out bg-primary"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>
      )}
      {missingForFreeShipping <= 0 && (
        <div className="mb-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 flex items-center gap-2">
          <Truck className="h-4 w-4 text-emerald-600" strokeWidth={1.8} />
          <p className="text-sm font-body text-emerald-700 dark:text-emerald-400 font-medium">
            Parabéns! Você ganhou frete grátis 🎉
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item, index) => {
            const unitPrice = item.variant?.price ?? item.product.price;
            const lineTotal = unitPrice * item.quantity;

            return (
              <div
                key={`${item.productId}-${item.variantId}`}
                className={cn(
                  'flex gap-4 p-4 rounded-xl bg-background border border-border/60 transition-all duration-200 hover:border-border hover:shadow-sm',
                )}
              >
                <Link to={`/product/${item.product.slug}`} className="shrink-0 group">
                  <div className="w-24 h-28 rounded-lg overflow-hidden bg-secondary">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="font-medium text-sm text-foreground hover:text-primary transition-colors line-clamp-2 leading-snug"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="text-muted-foreground hover:text-destructive p-1.5 rounded-lg hover:bg-destructive/10 transition-all shrink-0"
                        aria-label="Remover item"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.8} />
                      </button>
                    </div>
                    {item.variant && (
                      <p className="text-xs text-muted-foreground mt-1 font-body">{item.variant.name}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center rounded-lg border border-border/80 bg-secondary/30 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                        className="p-2 hover:bg-secondary transition-colors"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="h-3.5 w-3.5" strokeWidth={2} />
                      </button>
                      <span className="px-4 text-sm font-medium tabular-nums min-w-[2.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                        className="p-2 hover:bg-secondary transition-colors"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                      </button>
                    </div>

                    <div className="text-right">
                      {item.quantity > 1 && (
                        <p className="text-[11px] text-muted-foreground font-body">{formatCurrency(unitPrice)} cada</p>
                      )}
                      <span className="font-semibold text-sm text-foreground">{formatCurrency(lineTotal)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-body mt-2"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180" />
            Continuar comprando
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="border border-border/60 rounded-xl p-6 sticky top-24 space-y-5 bg-background">
            <h2 className="font-display font-semibold text-lg text-foreground">Resumo do pedido</h2>

            <div className="space-y-3 text-sm font-body">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})</span>
                <span className="text-foreground">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frete</span>
                <span className={cn(shipping === 0 ? 'text-emerald-600 font-medium' : 'text-foreground')}>
                  {shipping === 0 ? 'Grátis' : formatCurrency(shipping)}
                </span>
              </div>
              <div className="border-t border-border/60 pt-3 flex justify-between font-semibold text-base">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">{formatCurrency(total)}</span>
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => navigate('/checkout')}
              className="w-full font-body"
            >
              Finalizar Compra
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
                <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span>Compra segura</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
                <Package className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span>Troca garantida</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
