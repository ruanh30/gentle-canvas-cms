import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockProducts } from '@/data/mock';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Star, Minus, Plus, ArrowLeft, Truck, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/store/ProductCard';
import { cn } from '@/lib/utils';

const colorHex: Record<string, string> = {
  Branca: '#ffffff', Preta: '#111827', Azul: '#3b82f6',
  Cinza: '#9ca3af', Verde: '#22c55e', Vermelha: '#ef4444',
  Rosa: '#ec4899', Amarela: '#eab308', Laranja: '#f97316',
  Marrom: '#92400e', Bege: '#d4a574',
};

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = mockProducts.find(p => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product?.variants[0]?.id
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Produto não encontrado.</p>
        <Link to="/products"><Button variant="outline" className="mt-4">Voltar</Button></Link>
      </div>
    );
  }

  const variant = product.variants.find(v => v.id === selectedVariant);
  const currentPrice = variant?.price ?? product.price;
  const discount = product.compareAtPrice ? Math.round((1 - product.price / product.compareAtPrice) * 100) : 0;
  const related = mockProducts.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);

  const handleBuyNow = () => {
    addItem(product, variant, quantity);
    navigate('/cart');
  };

  const handleAddToCart = () => {
    addItem(product, variant, quantity);
  };

  // Get unique attribute keys
  const attrKeys = product.variants.length > 0
    ? [...new Set(product.variants.flatMap(v => Object.keys(v.attributes)))]
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Voltar
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[3/4] rounded-xl overflow-hidden bg-secondary">
            <img src={product.images[selectedImage]} alt={product.name} className="h-full w-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-foreground' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">SKU: {product.sku}</p>
            <h1 className="text-3xl font-display font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-foreground text-foreground" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({product.reviewCount} avaliações)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold">{formatCurrency(currentPrice)}</span>
            {product.compareAtPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">{formatCurrency(product.compareAtPrice)}</span>
                <Badge variant="secondary" className="font-body">-{discount}%</Badge>
              </>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed font-body">{product.description}</p>

          {/* Variants */}
          {attrKeys.map(key => {
            const values = [...new Set(product.variants.map(v => v.attributes[key]))];
            const isColor = key.toLowerCase() === 'cor';
            return (
              <div key={key}>
                <p className="text-sm font-medium mb-2 capitalize">{key}</p>
                {isColor ? (
                  <div className="flex flex-wrap gap-3">
                    {values.map(val => {
                      const hex = colorHex[val];
                      const matching = product.variants.filter(v => v.attributes[key] === val);
                      const isSelected = matching.some(v => v.id === selectedVariant);
                      const isWhite = hex?.toLowerCase() === '#ffffff';
                      const outOfStock = matching.every(v => v.stock <= 0);
                      return (
                        <button
                          key={val}
                          onClick={() => !outOfStock && setSelectedVariant(matching[0]?.id)}
                          className={cn('group relative', outOfStock && 'cursor-not-allowed')}
                          title={outOfStock ? `${val} — Esgotado` : val}
                          disabled={outOfStock}
                        >
                          <span
                            className={cn(
                              'block w-10 h-10 rounded-full transition-all duration-150 ring-offset-2 ring-offset-background',
                              isSelected ? 'ring-2 ring-foreground scale-110' : 'ring-0 group-hover:ring-1 group-hover:ring-border',
                              isWhite && 'border border-border/50',
                              outOfStock && 'opacity-30',
                            )}
                            style={{ backgroundColor: hex || '#ccc' }}
                          />
                          {outOfStock && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <span className="block w-[1px] h-11 bg-muted-foreground/60 rotate-45" />
                            </span>
                          )}
                          {isSelected && !outOfStock && (
                            <Check className={cn(
                              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4',
                              isWhite ? 'text-foreground' : 'text-white',
                            )} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {values.map(val => {
                      const matching = product.variants.filter(v => v.attributes[key] === val);
                      const isSelected = matching.some(v => v.id === selectedVariant);
                      const outOfStock = matching.every(v => v.stock <= 0);
                      return (
                        <button
                          key={val}
                          onClick={() => !outOfStock && setSelectedVariant(matching[0]?.id)}
                          disabled={outOfStock}
                          className={cn(
                            'px-4 py-2 text-sm border rounded-lg transition-colors font-body',
                            outOfStock
                              ? 'opacity-40 cursor-not-allowed line-through border-border/40 text-muted-foreground'
                              : isSelected
                                ? 'border-foreground bg-foreground text-background'
                                : 'border-border hover:border-foreground',
                          )}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Quantity */}
          <div>
            <p className="text-sm font-medium mb-2">Quantidade</p>
            <div className="flex items-center border rounded-lg w-fit">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-secondary transition-colors">
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-6 text-sm font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-secondary transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-2">
            <Button
              size="lg"
              onClick={handleBuyNow}
              className="w-full rounded-lg text-base font-semibold font-body"
              style={{ backgroundColor: 'hsl(0, 72%, 51%)', color: 'white' }}
            >
              Comprar Agora
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleAddToCart}
              className="w-full rounded-lg text-base font-body"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Adicionar ao Carrinho
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
            <Truck className="h-4 w-4" />
            <span>Frete grátis acima de R$ 299,00</span>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-display font-bold mb-8">Produtos Relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
