import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Plus } from 'lucide-react';

const AddressesPage = () => {
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/account')}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <CardTitle className="text-xl font-display">Endereços</CardTitle>
            </div>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Novo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
              <MapPin className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-body text-foreground font-medium">Nenhum endereço salvo</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Adicione um endereço para agilizar suas compras.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddressesPage;
