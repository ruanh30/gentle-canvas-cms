import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockCoupons } from '@/data/mock';
import { toast } from 'sonner';
import { Check, Tag, UserPlus, LogIn, Mail, Lock, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { brazilianStates } from '@/data/brazilian-locations';

type CheckoutMode = 'choose' | 'guest' | 'login' | 'form';

const CheckoutPage = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<typeof mockCoupons[0] | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const isLoggedCustomer = user && user.role === 'customer';
  const [mode, setMode] = useState<CheckoutMode>(isLoggedCustomer ? 'form' : 'choose');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const availableCities = useMemo(() => {
    if (!selectedState) return [];
    const state = brazilianStates.find(s => s.uf === selectedState);
    return state ? state.cities.sort() : [];
  }, [selectedState]);

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setTimeout(() => {
      const success = login(loginEmail, loginPassword);
      setLoginLoading(false);
      if (success) {
        toast.success('Login realizado! Continuando com seu pedido.');
        setMode('form');
      } else {
        toast.error('Credenciais inválidas');
      }
    }, 600);
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

  /* ---- Step: Choose mode ---- */
  if (mode === 'choose') {
    return (
      <div className="container mx-auto px-4 py-12 max-w-lg">
        <h1 className="text-2xl font-display font-bold text-center mb-2">Como deseja continuar?</h1>
        <p className="text-sm text-muted-foreground text-center mb-8">
          Faça login para acompanhar seus pedidos ou continue como convidado.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => setMode('login')}
            className={cn(
              'w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all text-left',
              'border-border hover:border-primary/50 hover:bg-primary/5'
            )}
          >
            <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <LogIn className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Entrar na minha conta</p>
              <p className="text-xs text-muted-foreground mt-0.5">Acompanhe pedidos e salve seus dados</p>
            </div>
          </button>

          <button
            onClick={() => setMode('guest')}
            className={cn(
              'w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all text-left',
              'border-border hover:border-primary/50 hover:bg-primary/5'
            )}
          >
            <div className="h-11 w-11 rounded-full bg-muted flex items-center justify-center shrink-0">
              <UserPlus className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Continuar como convidado</p>
              <p className="text-xs text-muted-foreground mt-0.5">Finalize sem criar conta</p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  /* ---- Step: Login form ---- */
  if (mode === 'login') {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <button onClick={() => setMode('choose')} className="text-sm text-muted-foreground hover:text-foreground mb-6 flex items-center gap-1.5 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </button>
        <h1 className="text-2xl font-display font-bold mb-1">Entrar na sua conta</h1>
        <p className="text-sm text-muted-foreground mb-6">Acesse para acompanhar seus pedidos.</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label>E-mail</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="email" required placeholder="email@exemplo.com" className="pl-9" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Senha</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="password" required placeholder="••••••••" className="pl-9" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loginLoading}>
            {loginLoading ? 'Entrando...' : 'Entrar e continuar'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <button onClick={() => setMode('guest')} className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline transition-colors">
            Prefiro continuar como convidado
          </button>
        </div>
      </div>
    );
  }

  /* ---- Checkout form (guest or logged in) ---- */
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-bold">Checkout</h1>
        {!isLoggedCustomer && (
          <button onClick={() => setMode('choose')} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Alterar modo
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Contact */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Contato</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>Nome completo</Label><Input required placeholder="Seu nome" className="mt-1" defaultValue={isLoggedCustomer ? user.name : ''} /></div>
                <div><Label>E-mail</Label><Input type="email" required placeholder="email@exemplo.com" className="mt-1" defaultValue={isLoggedCustomer ? user.email : ''} /></div>
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
                <div>
                  <Label>Estado</Label>
                  <Select value={selectedState} onValueChange={(val) => { setSelectedState(val); setSelectedCity(''); }}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {brazilianStates.map(s => (
                        <SelectItem key={s.uf} value={s.uf}>{s.uf} - {s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Cidade</Label>
                  <Select value={selectedCity} onValueChange={setSelectedCity} disabled={!selectedState}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={selectedState ? "Selecione a cidade" : "Selecione o estado primeiro"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
                      <Input value={couponCode} onChange={e => setCouponCode(e.target.value)} placeholder="Cupom" className="pl-8 text-sm" />
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
