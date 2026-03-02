import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User, MapPin, Package } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const AccountPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const initials = user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl font-display bg-primary text-primary-foreground">{initials}</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-2xl font-display">{user.name}</CardTitle>
          <CardDescription className="font-body">{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <NavLink to="/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors font-body text-sm">
            <Package className="h-4 w-4 text-muted-foreground" />
            Meus Pedidos
          </NavLink>
          <NavLink to="/addresses" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors font-body text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Endereços
          </NavLink>
          <NavLink to="/personal-data" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors font-body text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            Dados Pessoais
          </NavLink>
          <div className="pt-3 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive font-body"
              onClick={() => { logout(); navigate('/'); }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair da conta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountPage;
