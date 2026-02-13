import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

import { StoreLayout } from "@/components/store/StoreLayout";
import { AdminLayout } from "@/components/admin/AdminLayout";

import HomePage from "@/pages/HomePage";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import OrderSuccessPage from "@/pages/OrderSuccessPage";
import LoginPage from "@/pages/LoginPage";
import CollectionPage from "@/pages/CollectionPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminOrders from "@/pages/admin/AdminOrders";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminCategories from "@/pages/admin/AdminCategories";
import AdminCustomers from "@/pages/admin/AdminCustomers";
import AdminCoupons from "@/pages/admin/AdminCoupons";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminCustomization from "@/pages/admin/AdminCustomization";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminStaticPages from "@/pages/admin/AdminStaticPages";
import AdminFAQ from "@/pages/admin/AdminFAQ";
import AdminTestimonials from "@/pages/admin/AdminTestimonials";
import AdminBrands from "@/pages/admin/AdminBrands";
import AdminMenus from "@/pages/admin/AdminMenus";
import AdminMedia from "@/pages/admin/AdminMedia";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ThemeProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Storefront */}
              <Route element={<StoreLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/collections/:slug" element={<CollectionPage />} />
              </Route>

              {/* Admin */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="customers" element={<AdminCustomers />} />
                <Route path="coupons" element={<AdminCoupons />} />
                <Route path="blog" element={<AdminBlog />} />
                <Route path="pages" element={<AdminStaticPages />} />
                <Route path="faq" element={<AdminFAQ />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
                <Route path="brands" element={<AdminBrands />} />
                <Route path="menus" element={<AdminMenus />} />
                <Route path="media" element={<AdminMedia />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="customization" element={<AdminCustomization />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
        </ThemeProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
