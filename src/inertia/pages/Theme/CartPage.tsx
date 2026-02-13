/**
 * Inertia Page: Theme/CartPage
 *
 * Cart is client-side (localStorage). Server only provides theme + storeName.
 */
import React from 'react';
import CartPageComponent from '@/pages/CartPage';

// Standalone Lovable preview
export default CartPageComponent;

// ============================================================
// INERTIA PRODUCTION VERSION
// ============================================================
// Copy to resources/js/inertia/Pages/Theme/CartPage.tsx
//
// ```tsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { Head, usePage } from '@inertiajs/react';
// import { ThemeProvider } from '../../../cms/contexts/ThemeContext';
// import { StoreLayout } from '../../../cms/components/store/StoreLayout';
// import { formatCurrency } from '../../../cms/lib/format';
// import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
//
// interface CartItem {
//   id: string;
//   name: string;
//   slug: string;
//   price: number;
//   image: string;
//   quantity: number;
// }
//
// function useLocalCart() {
//   const [items, setItems] = useState<CartItem[]>([]);
//
//   useEffect(() => {
//     try {
//       const stored = localStorage.getItem('cart-items');
//       if (stored) setItems(JSON.parse(stored));
//     } catch {}
//
//     const handler = (e: CustomEvent) => {
//       const { product, quantity = 1 } = e.detail;
//       setItems(prev => {
//         const exists = prev.find(i => i.id === product.id);
//         const next = exists
//           ? prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
//           : [...prev, { id: product.id, name: product.name, slug: product.slug, price: product.price, image: product.images?.[0] || '', quantity }];
//         localStorage.setItem('cart-items', JSON.stringify(next));
//         return next;
//       });
//     };
//
//     window.addEventListener('add-to-cart', handler as EventListener);
//     return () => window.removeEventListener('add-to-cart', handler as EventListener);
//   }, []);
//
//   const updateQuantity = useCallback((id: string, qty: number) => {
//     setItems(prev => {
//       const next = qty <= 0 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? { ...i, quantity: qty } : i);
//       localStorage.setItem('cart-items', JSON.stringify(next));
//       return next;
//     });
//   }, []);
//
//   const removeItem = useCallback((id: string) => updateQuantity(id, 0), [updateQuantity]);
//
//   const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
//
//   return { items, updateQuantity, removeItem, total };
// }
//
// export default function CartPage() {
//   const { theme, storeName, categories } = usePage().props as any;
//   const { items, updateQuantity, removeItem, total } = useLocalCart();
//
//   return (
//     <>
//       <Head title={`Carrinho — ${storeName || 'Loja'}`} />
//       <ThemeProvider initialPublished={theme}>
//         <StoreLayout categories={categories}>
//           <div className="container mx-auto px-4 py-8">
//             <h1 className="text-3xl font-bold mb-8">Carrinho</h1>
//
//             {items.length === 0 ? (
//               <div className="text-center py-20">
//                 <ShoppingBag className="h-12 w-12 mx-auto opacity-20 mb-4" />
//                 <p className="opacity-60 mb-4">Seu carrinho está vazio</p>
//                 <a href="./shop" className="inline-block px-6 py-2 border rounded-md text-sm hover:bg-gray-100">
//                   Continuar comprando
//                 </a>
//               </div>
//             ) : (
//               <div className="grid lg:grid-cols-3 gap-8">
//                 <div className="lg:col-span-2 space-y-4">
//                   {items.map(item => (
//                     <div key={item.id} className="flex gap-4 border rounded-lg p-4">
//                       <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
//                         {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <h3 className="font-medium text-sm">{item.name}</h3>
//                         <p className="text-sm font-semibold mt-1">{formatCurrency(item.price)}</p>
//                         <div className="flex items-center gap-3 mt-2">
//                           <div className="flex items-center border rounded">
//                             <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5"><Minus className="h-3 w-3" /></button>
//                             <span className="px-3 text-sm">{item.quantity}</span>
//                             <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5"><Plus className="h-3 w-3" /></button>
//                           </div>
//                           <button onClick={() => removeItem(item.id)} className="text-red-500 p-1"><Trash2 className="h-4 w-4" /></button>
//                         </div>
//                       </div>
//                       <div className="text-sm font-semibold">{formatCurrency(item.price * item.quantity)}</div>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="border rounded-lg p-6 h-fit space-y-4">
//                   <h2 className="font-bold text-lg">Resumo</h2>
//                   <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatCurrency(total)}</span></div>
//                   <div className="flex justify-between font-bold text-lg border-t pt-4"><span>Total</span><span>{formatCurrency(total)}</span></div>
//                   <a
//                     href="./checkout/process"
//                     className="block w-full text-center py-3 rounded-lg text-white font-semibold"
//                     style={{ backgroundColor: theme.colors?.buyNow || '#dc2626' }}
//                   >
//                     Finalizar Compra
//                   </a>
//                   <a href="./shop" className="block text-center text-sm opacity-60 hover:opacity-100">
//                     Continuar comprando
//                   </a>
//                 </div>
//               </div>
//             )}
//           </div>
//         </StoreLayout>
//       </ThemeProvider>
//     </>
//   );
// }
// ```
