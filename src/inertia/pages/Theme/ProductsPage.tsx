/**
 * Inertia Page: Theme/ProductsPage — FULL VERSION
 *
 * Features: category filter, sort, grid/list display modes, pagination.
 *
 * Server props:
 *   - theme: ThemeConfig
 *   - products: Product[]
 *   - categories: Category[]
 *   - currentCategory: string | null
 *   - pagination: { current_page, last_page, total }
 *   - storeName: string
 */
import React from 'react';
import ProductsPageComponent from '@/pages/ProductsPage';

// Standalone Lovable preview
export default ProductsPageComponent;

// ============================================================
// INERTIA PRODUCTION VERSION
// ============================================================
// Copy to resources/js/inertia/Pages/Theme/ProductsPage.tsx
//
// ```tsx
// import React, { useState } from 'react';
// import { Head, usePage } from '@inertiajs/react';
// import { ThemeProvider } from '../../../cms/contexts/ThemeContext';
// import { StoreLayout } from '../../../cms/components/store/StoreLayout';
// import { ProductCard } from '../../../cms/components/store/ProductCard';
// import { cn } from '../../../cms/lib/utils';
// import { ChevronLeft, ChevronRight, Grid3X3, List } from 'lucide-react';
//
// export default function ProductsPage() {
//   const { theme, products, categories, currentCategory, pagination, storeName } = usePage().props as any;
//   const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');
//
//   const cols = theme?.category?.columnsDesktop || 4;
//   const gridCols: Record<number, string> = {
//     2: 'grid-cols-1 md:grid-cols-2',
//     3: 'grid-cols-2 md:grid-cols-3',
//     4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
//     5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
//   };
//
//   const currentPage = pagination?.current_page ?? 1;
//   const lastPage = pagination?.last_page ?? 1;
//   const total = pagination?.total ?? products?.length ?? 0;
//
//   const buildPageUrl = (page: number) => {
//     const params = new URLSearchParams(window.location.search);
//     params.set('page', String(page));
//     return `?${params.toString()}`;
//   };
//
//   return (
//     <>
//       <Head title={`${currentCategory ? categories?.find((c: any) => c.slug === currentCategory)?.name : 'Produtos'} — ${storeName || 'Loja'}`} />
//       <ThemeProvider initialPublished={theme}>
//         <StoreLayout categories={categories}>
//           <div className="container mx-auto px-4 py-8">
//             {/* Header */}
//             <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
//               <div>
//                 <h1 className="text-3xl font-bold">
//                   {currentCategory
//                     ? categories?.find((c: any) => c.slug === currentCategory)?.name || 'Produtos'
//                     : 'Todos os Produtos'}
//                 </h1>
//                 <p className="text-sm opacity-60 mt-1">{total} produtos</p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="hidden md:flex items-center gap-1 border rounded-md p-0.5">
//                   <button onClick={() => setDisplayMode('grid')} className={cn('p-1.5 rounded', displayMode === 'grid' && 'bg-black text-white')}>
//                     <Grid3X3 className="h-4 w-4" />
//                   </button>
//                   <button onClick={() => setDisplayMode('list')} className={cn('p-1.5 rounded', displayMode === 'list' && 'bg-black text-white')}>
//                     <List className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//
//             {/* Category filters */}
//             {Array.isArray(categories) && categories.length > 0 && (
//               <div className="mb-6 flex flex-wrap gap-2">
//                 <a
//                   href="./shop"
//                   className={cn('text-sm px-4 py-1.5 rounded-full border font-medium transition-colors', !currentCategory ? 'bg-black text-white border-black' : 'hover:bg-gray-100')}
//                 >
//                   Todos
//                 </a>
//                 {categories.map((c: any) => (
//                   <a
//                     key={c.id}
//                     href={`./shop?category=${encodeURIComponent(c.slug)}`}
//                     className={cn('text-sm px-4 py-1.5 rounded-full border font-medium transition-colors', currentCategory === c.slug ? 'bg-black text-white border-black' : 'hover:bg-gray-100')}
//                   >
//                     {c.name}
//                   </a>
//                 ))}
//               </div>
//             )}
//
//             {/* Products */}
//             {(!products || products.length === 0) ? (
//               <div className="text-center py-20">
//                 <p className="opacity-60">Nenhum produto encontrado.</p>
//               </div>
//             ) : displayMode === 'list' ? (
//               <div className="space-y-4">
//                 {products.map((p: any) => (
//                   <a key={p.id} href={`./product/${encodeURIComponent(p.slug)}`} className="flex gap-4 border rounded-lg p-3 hover:shadow-md transition-shadow">
//                     <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
//                       {p.images?.[0] && <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h3 className="text-sm font-medium truncate">{p.name}</h3>
//                       <p className="text-sm font-semibold mt-2">R$ {Number(p.price).toFixed(2)}</p>
//                     </div>
//                   </a>
//                 ))}
//               </div>
//             ) : (
//               <div className={cn('grid gap-6', gridCols[cols])}>
//                 {products.map((p: any) => <ProductCard key={p.id} product={p} />)}
//               </div>
//             )}
//
//             {/* Pagination */}
//             {lastPage > 1 && (
//               <div className="flex items-center justify-center gap-2 mt-12">
//                 {currentPage > 1 && (
//                   <a href={buildPageUrl(currentPage - 1)} className="p-2 border rounded-md hover:bg-gray-100">
//                     <ChevronLeft className="h-4 w-4" />
//                   </a>
//                 )}
//                 {Array.from({ length: lastPage }, (_, i) => i + 1)
//                   .filter(p => p === 1 || p === lastPage || Math.abs(p - currentPage) <= 2)
//                   .map((p, idx, arr) => (
//                     <React.Fragment key={p}>
//                       {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-1 opacity-40">…</span>}
//                       <a
//                         href={buildPageUrl(p)}
//                         className={cn('px-3 py-1.5 text-sm rounded-md border', p === currentPage ? 'bg-black text-white border-black' : 'hover:bg-gray-100')}
//                       >
//                         {p}
//                       </a>
//                     </React.Fragment>
//                   ))}
//                 {currentPage < lastPage && (
//                   <a href={buildPageUrl(currentPage + 1)} className="p-2 border rounded-md hover:bg-gray-100">
//                     <ChevronRight className="h-4 w-4" />
//                   </a>
//                 )}
//               </div>
//             )}
//           </div>
//         </StoreLayout>
//       </ThemeProvider>
//     </>
//   );
// }
// ```
//
// ──── ThemeStorefrontController update for pagination ────
// Replace `->limit(48)` with:
//
// $perPage = (int) $request->query('per_page', $theme['category']['productsPerPage'] ?? 24);
// $page = (int) $request->query('page', 1);
// $total = (clone $q)->count();
// $items = $q->orderByDesc('user_items.id')->offset(($page - 1) * $perPage)->limit($perPage)->get();
//
// And add to the Inertia::render() call:
// 'pagination' => [
//     'current_page' => $page,
//     'last_page' => (int) ceil($total / $perPage),
//     'total' => $total,
//     'per_page' => $perPage,
// ],
