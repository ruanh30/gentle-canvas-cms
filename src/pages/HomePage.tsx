import React from 'react';
import { Link } from 'react-router-dom';
import { mockProducts, mockCategories, mockStoreSettings } from '@/data/mock';
import { ProductCard } from '@/components/store/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  const featured = mockProducts.filter(p => p.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-secondary">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 font-body">Nova Coleção</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
              Estilo que<br />define você
            </h1>
            <p className="text-muted-foreground mb-8 text-lg font-body">
              Descubra peças únicas com design atemporal e qualidade premium.
            </p>
            <div className="flex gap-3">
              <Link to="/products">
                <Button size="lg" className="rounded-full px-8 font-body">
                  Ver coleção
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-display font-bold mb-8 text-center">Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {mockCategories.map(cat => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className="group text-center p-6 rounded-xl bg-secondary hover:bg-accent transition-colors"
            >
              <p className="text-sm font-medium group-hover:text-foreground transition-colors">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-display font-bold">Destaques</h2>
          <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-secondary rounded-2xl p-8 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Cadastre-se e ganhe 15% OFF</h2>
          <p className="text-muted-foreground mb-6 font-body">Use o cupom <span className="font-semibold text-foreground">BEMVINDO</span> na sua primeira compra.</p>
          <Link to="/login">
            <Button variant="outline" size="lg" className="rounded-full px-8 font-body">Criar conta</Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
