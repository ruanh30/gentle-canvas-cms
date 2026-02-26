import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Package, ShoppingBag } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const OrdersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/account')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-xl font-display">Meus Pedidos</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-body text-foreground font-medium">Nenhum pedido ainda</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Quando você fizer uma compra, seus pedidos aparecerão aqui.</p>
            </div>
            <NavLink to="/products">
              <Button className="mt-2">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Explorar Produtos
              </Button>
            </NavLink>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPage;
