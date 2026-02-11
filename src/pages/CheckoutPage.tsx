import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockCoupons } from '@/data/mock';
import { toast } from 'sonner';
import { Check, Tag } from 'lucide-react';

const CheckoutPage = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<typeof mockCoupons[0] | null>(null);
  const [loading, setLoading] = useState(false);

  const shipping = subtotal >= 299 ? 0 : 15.90;
  const discount = appliedCoupon
    ? appliedCoupon.type === 'percentage'
      ? subtotal * (appliedCoupon.value / 100)
      : appliedCoupon.value
    : 0;
  const total = subtotal + shipping - discount;

  const applyCoupon = () => {
    const found = mockCoupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase() && c.active);
    if (found) {
      if (found.minOrderValue && subtotal < found.minOrderValue) {
        toast.error(`Pedido mínimo de ${formatCurrency(found.minOrderValue)}`);
        return;
      }
      setAppliedCoupon(found);
      toast.success('Cupom aplicado!');
    } else {
      toast.error('Cupom inválido');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      clearCart();
      navigate('/order-success');
    }, 1500);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-display font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Contact */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Contato</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>Nome completo</Label><Input required placeholder="Seu nome" className="mt-1" /></div>
                <div><Label>E-mail</Label><Input type="email" required placeholder="email@exemplo.com" className="mt-1" /></div>
                <div><Label>Telefone</Label><Input placeholder="(11) 99999-0000" className="mt-1" /></div>
                <div><Label>CPF</Label><Input placeholder="000.000.000-00" className="mt-1" /></div>
              </div>
            </section>

            {/* Address */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Endereço de entrega</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><Label>CEP</Label><Input required placeholder="00000-000" className="mt-1" /></div>
                <div className="md:col-span-2"><Label>Rua</Label><Input required placeholder="Rua / Avenida" className="mt-1" /></div>
                <div><Label>Número</Label><Input required placeholder="Nº" className="mt-1" /></div>
                <div><Label>Complemento</Label><Input placeholder="Apto, bloco..." className="mt-1" /></div>
                <div><Label>Bairro</Label><Input required placeholder="Bairro" className="mt-1" /></div>
                <div><Label>Cidade</Label><Input required placeholder="Cidade" className="mt-1" /></div>
                <div><Label>Estado</Label><Input required placeholder="UF" className="mt-1" /></div>
              </div>
            </section>

            {/* Payment */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Pagamento</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2"><Label>Número do cartão</Label><Input placeholder="0000 0000 0000 0000" className="mt-1" /></div>
                <div><Label>Validade</Label><Input placeholder="MM/AA" className="mt-1" /></div>
                <div><Label>CVV</Label><Input placeholder="000" className="mt-1" /></div>
              </div>
            </section>
          </div>

          {/* Summary */}
          <div>
            <div className="border rounded-xl p-6 sticky top-24 space-y-4">
              <h2 className="font-semibold text-lg">Resumo do pedido</h2>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map(item => (
                  <div key={`${item.productId}-${item.variantId}`} className="flex gap-3 text-sm">
                    <img src={item.product.images[0]} alt="" className="w-12 h-14 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium line-clamp-1">{item.product.name}</p>
                      <p className="text-muted-foreground">Qtd: {item.quantity}</p>
                    </div>
                    <span className="font-medium">{formatCurrency((item.variant?.price ?? item.product.price) * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="border-t pt-4">
                {appliedCoupon ? (
                  <div className="flex items-center gap-2 text-sm bg-secondary p-2 rounded-lg">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="font-medium">{appliedCoupon.code}</span>
                    <span className="text-muted-foreground">-{appliedCoupon.type === 'percentage' ? `${appliedCoupon.value}%` : formatCurrency(appliedCoupon.value)}</span>
                    <button type="button" onClick={() => setAppliedCoupon(null)} className="ml-auto text-xs text-muted-foreground hover:text-foreground">Remover</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                      <Input
                        value={couponCode}
                        onChange={e => setCouponCode(e.target.value)}
                        placeholder="Cupom"
                        className="pl-8 text-sm"
                      />
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={applyCoupon}>Aplicar</Button>
                  </div>
                )}
              </div>

              <div className="space-y-2 text-sm font-body border-t pt-4">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Frete</span><span>{shipping === 0 ? 'Grátis' : formatCurrency(shipping)}</span></div>
                {discount > 0 && <div className="flex justify-between text-green-600"><span>Desconto</span><span>-{formatCurrency(discount)}</span></div>}
                <div className="border-t pt-2 flex justify-between font-semibold text-base"><span>Total</span><span>{formatCurrency(total)}</span></div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full rounded-lg font-body"
                style={{ backgroundColor: 'hsl(0, 72%, 51%)', color: 'white' }}
              >
                {loading ? 'Processando...' : `Pagar ${formatCurrency(total)}`}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
