/**
 * Inertia Page: Theme/HomePage
 * 
 * This file is the Inertia.js version of the storefront homepage.
 * It receives data from ThemeStorefrontController@home via Inertia props.
 * 
 * Usage in Laravel:
 *   return Inertia::render('Theme/HomePage', [
 *     'theme'      => $themeState->published,      // ThemeConfig JSON
 *     'products'   => $featuredProducts,            // Product[]
 *     'categories' => $categories,                  // Category[]
 *     'collections'=> $collections,                 // Collection[]
 *     'storeName'  => $user->username,
 *   ]);
 * 
 * For standalone Lovable preview, this wraps the existing HomePage component.
 */
import React from 'react';
import HomePageComponent from '@/pages/HomePage';

// In Inertia mode, this would use usePage() to receive props:
//
// import { usePage } from '@inertiajs/react';
// import { ThemeProvider } from '@/contexts/ThemeContext';
// import { StoreLayout } from '@/components/store/StoreLayout';
//
// export default function HomePage() {
//   const { theme, products, categories, collections, storeName } = usePage().props as any;
//   return (
//     <ThemeProvider initialPublished={theme}>
//       <StoreLayout>
//         <HomePageComponent
//           products={products}
//           categories={categories}
//           collections={collections}
//         />
//       </StoreLayout>
//     </ThemeProvider>
//   );
// }

// Standalone export for Lovable preview
export default HomePageComponent;
