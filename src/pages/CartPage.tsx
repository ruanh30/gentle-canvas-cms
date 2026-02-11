import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';

const CartPage = () => {
  const { items, updateQuantity, removeItem, subtotal, itemCount } = useCart();
  const navigate = useNavigate();

  const shipping = subtotal >= 299 ? 0 : 15.90;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-display font-bold mb-2">Carrinho vazio</h1>
        <p className="text-muted-foreground mb-6 font-body">Adicione produtos para continuar.</p>
        <Link to="/products">
          <Button className="rounded-full px-8 font-body">Explorar produtos</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-display font-bold mb-8">Carrinho ({itemCount})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 p-4 border rounded-xl">
              <Link to={`/product/${item.product.slug}`} className="shrink-0">
                <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-28 object-cover rounded-lg" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <Link to={`/product/${item.product.slug}`} className="font-medium text-sm hover:underline line-clamp-1">{item.product.name}</Link>
                    {item.variant && <p className="text-xs text-muted-foreground mt-0.5">{item.variant.name}</p>}
                  </div>
                  <button onClick={() => removeItem(item.productId, item.variantId)} className="text-muted-foreground hover:text-foreground p-1">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border rounded-lg">
                    <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)} className="p-2 hover:bg-secondary transition-colors">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-3 text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)} className="p-2 hover:bg-secondary transition-colors">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <span className="font-semibold text-sm">
                    {formatCurrency((item.variant?.price ?? item.product.price) * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-xl p-6 sticky top-24 space-y-4">
            <h2 className="font-semibold text-lg">Resumo</h2>
            <div className="space-y-2 text-sm font-body">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frete</span>
                <span>{shipping === 0 ? 'Grátis' : formatCurrency(shipping)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
            <Button
              size="lg"
              onClick={() => navigate('/checkout')}
              className="w-full rounded-lg font-body"
              style={{ backgroundColor: 'hsl(0, 72%, 51%)', color: 'white' }}
            >
              Finalizar Compra
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link to="/products" className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
