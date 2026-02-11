import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

const OrderSuccessPage = () => {
  return (
    <div className="container mx-auto px-4 py-20 text-center max-w-md">
      <CheckCircle2 className="h-16 w-16 mx-auto text-green-600 mb-6" />
      <h1 className="text-3xl font-display font-bold mb-3">Pedido realizado!</h1>
      <p className="text-muted-foreground mb-8 font-body">
        Obrigado pela sua compra. Você receberá um e-mail com os detalhes do pedido.
      </p>
      <div className="flex flex-col gap-3">
        <Link to="/products">
          <Button className="w-full rounded-full font-body">Continuar comprando</Button>
        </Link>
        <Link to="/">
          <Button variant="outline" className="w-full rounded-full font-body">Voltar ao início</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
