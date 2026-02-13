import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';

const WishlistPage = () => {
  return (
    <div className="container mx-auto px-4 py-20 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-display">Meus Favoritos</CardTitle>
          <CardDescription className="font-body">
            Seus produtos favoritos aparecerão aqui
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-muted-foreground font-body">
            Você ainda não adicionou nenhum produto aos favoritos. Navegue pela loja e clique no ❤️ para salvar.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WishlistPage;
