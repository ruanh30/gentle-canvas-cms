/**
 * Inertia Page: Theme/ProductsPage
 * 
 * Receives from ThemeStorefrontController@products:
 *   - theme: ThemeConfig (published)
 *   - products: Product[] (paginated)
 *   - categories: Category[]
 *   - currentCategory: Category | null
 *   - pagination: { current_page, last_page, total }
 */
import React from 'react';
import ProductsPageComponent from '@/pages/ProductsPage';

// Inertia mode example:
// import { usePage } from '@inertiajs/react';
// export default function ProductsPage() {
//   const { theme, products, categories, currentCategory, pagination } = usePage().props as any;
//   return (
//     <ThemeProvider initialPublished={theme}>
//       <StoreLayout>
//         <ProductsPageComponent products={products} categories={categories} />
//       </StoreLayout>
//     </ThemeProvider>
//   );
// }

export default ProductsPageComponent;
