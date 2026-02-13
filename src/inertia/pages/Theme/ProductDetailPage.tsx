/**
 * Inertia Page: Theme/ProductDetailPage — FULL VERSION
 *
 * Features: image gallery with thumbnails, price with discount,
 * description, quantity selector, buy/add buttons, related products.
 *
 * Server props:
 *   - theme: ThemeConfig
 *   - product: Product
 *   - relatedProducts: Product[]
 *   - storeName: string
 */
import React from 'react';
import ProductDetailPageComponent from '@/pages/ProductDetailPage';

// Standalone Lovable preview (uses react-router-dom + mock data)
export default ProductDetailPageComponent;

// ============================================================
// INERTIA PRODUCTION VERSION
// ============================================================
// Copy the block below to resources/js/inertia/Pages/Theme/ProductDetailPage.tsx
//
// ```tsx
// import React, { useState } from 'react';
// import { Head, usePage } from '@inertiajs/react';
// import { ThemeProvider } from '../../../cms/contexts/ThemeContext';
// import { StoreLayout } from '../../../cms/components/store/StoreLayout';
// import { ProductCard } from '../../../cms/components/store/ProductCard';
// import { formatCurrency } from '../../../cms/lib/format';
// import { ArrowLeft, Minus, Plus, ShoppingBag, Truck } from 'lucide-react';
//
// export default function ProductDetailPage() {
//   const { theme, product, relatedProducts, storeName, categories } = usePage().props as any;
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//
//   if (!product) {
//     return (
//       <>
//         <Head title="Produto não encontrado" />
//         <ThemeProvider initialPublished={theme}>
//           <StoreLayout categories={categories}>
//             <div className="container mx-auto px-4 py-20 text-center">
//               <p className="opacity-60">Produto não encontrado.</p>
//               <a href="./shop" className="inline-block mt-4 px-6 py-2 border rounded-md text-sm">Voltar</a>
//             </div>
//           </StoreLayout>
//         </ThemeProvider>
//       </>
//     );
//   }
//
//   const images = product.images ?? [];
//   const discount = product.compareAtPrice
//     ? Math.round((1 - product.price / product.compareAtPrice) * 100)
//     : 0;
//
//   const handleAddToCart = () => {
//     window.dispatchEvent(new CustomEvent('add-to-cart', { detail: { product, quantity } }));
//   };
//
//   const handleBuyNow = () => {
//     handleAddToCart();
//     window.location.href = './cart';
//   };
//
//   return (
//     <>
//       <Head title={`${product.name} — ${storeName || 'Loja'}`} />
//       <ThemeProvider initialPublished={theme}>
//         <StoreLayout categories={categories}>
//           <div className="container mx-auto px-4 py-8">
//             <a href="./shop" className="flex items-center gap-1 text-sm opacity-60 hover:opacity-100 mb-6">
//               <ArrowLeft className="h-4 w-4" /> Voltar
//             </a>
//
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//               {/* Gallery */}
//               <div className="space-y-4">
//                 <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
//                   {images[selectedImage] ? (
//                     <img src={images[selectedImage]} alt={product.name} className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="h-full w-full flex items-center justify-center text-sm opacity-40">Sem imagem</div>
//                   )}
//                 </div>
//                 {images.length > 1 && (
//                   <div className="flex gap-3 overflow-x-auto">
//                     {images.map((img: string, i: number) => (
//                       <button
//                         key={i}
//                         onClick={() => setSelectedImage(i)}
//                         className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-colors ${i === selectedImage ? 'border-black' : 'border-transparent'}`}
//                       >
//                         <img src={img} alt="" className="h-full w-full object-cover" />
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//
//               {/* Info */}
//               <div className="space-y-6">
//                 {product.sku && <p className="text-xs uppercase tracking-[0.2em] opacity-50">SKU: {product.sku}</p>}
//                 <h1 className="text-3xl font-bold">{product.name}</h1>
//
//                 <div className="flex items-baseline gap-3">
//                   <span className="text-3xl font-bold">{formatCurrency(product.price)}</span>
//                   {product.compareAtPrice && (
//                     <>
//                       <span className="text-lg opacity-50 line-through">{formatCurrency(product.compareAtPrice)}</span>
//                       <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: theme.colors?.primary || '#000', color: '#fff' }}>-{discount}%</span>
//                     </>
//                   )}
//                 </div>
//
//                 {product.description && (
//                   <div className="opacity-70 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: product.description }} />
//                 )}
//
//                 {/* Quantity */}
//                 <div>
//                   <p className="text-sm font-medium mb-2">Quantidade</p>
//                   <div className="flex items-center border rounded-lg w-fit">
//                     <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-100"><Minus className="h-4 w-4" /></button>
//                     <span className="px-6 text-sm font-medium">{quantity}</span>
//                     <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-100"><Plus className="h-4 w-4" /></button>
//                   </div>
//                 </div>
//
//                 {/* Actions */}
//                 <div className="flex flex-col gap-3 pt-2">
//                   <button
//                     onClick={handleBuyNow}
//                     className="w-full py-3 rounded-lg text-base font-semibold text-white"
//                     style={{ backgroundColor: theme.colors?.buyNow || '#dc2626' }}
//                   >
//                     Comprar Agora
//                   </button>
//                   <button
//                     onClick={handleAddToCart}
//                     className="w-full py-3 rounded-lg text-base font-medium border-2 flex items-center justify-center gap-2"
//                   >
//                     <ShoppingBag className="h-5 w-5" />
//                     Adicionar ao Carrinho
//                   </button>
//                 </div>
//
//                 <div className="flex items-center gap-2 text-sm opacity-50 pt-2">
//                   <Truck className="h-4 w-4" />
//                   <span>Frete grátis acima de R$ 299,00</span>
//                 </div>
//               </div>
//             </div>
//
//             {/* Related products */}
//             {Array.isArray(relatedProducts) && relatedProducts.length > 0 && (
//               <section className="mt-20">
//                 <h2 className="text-2xl font-bold mb-8">Produtos Relacionados</h2>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                   {relatedProducts.map((p: any) => <ProductCard key={p.id} product={p} />)}
//                 </div>
//               </section>
//             )}
//           </div>
//         </StoreLayout>
//       </ThemeProvider>
//     </>
//   );
// }
// ```
