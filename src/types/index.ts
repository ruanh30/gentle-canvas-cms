export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'support' | 'customer';
  avatar?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  parentId?: string;
  active?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  attributes: Record<string, string>;
}

export interface SizeGuide {
  id: string;
  name: string;
  columns: string[];
  rows: { label: string; values: string[] }[];
  image?: string;
  isDefault: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  categoryId: string;
  category?: Category;
  variants: ProductVariant[];
  stock: number;
  sku: string;
  featured: boolean;
  active: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  tags: string[];
  weight?: number;
  width?: number;
  height?: number;
  depth?: number;
  metaTitle?: string;
  metaDescription?: string;
  variantImages?: Record<string, string>;
  manualBadges?: string[];
  sizeGuideId?: string; // 'default' | specific ID | undefined (none)
}

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  product: Product;
  variant?: ProductVariant;
}

export interface Address {
  id: string;
  customerId: string;
  label: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface Customer {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  addresses: Address[];
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  productName: string;
  variantName?: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  shippingAddress: Omit<Address, 'id' | 'customerId' | 'isDefault' | 'label'>;
  couponCode?: string;
  paymentMethod: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderValue?: number;
  maxUses?: number;
  usedCount: number;
  active: boolean;
  expiresAt?: string;
  createdAt: string;
}

export interface StoreSettings {
  storeName: string;
  logo?: string;
  description: string;
  currency: string;
  locale: string;
  shippingFlatRate: number;
  freeShippingThreshold: number;
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
}

export interface ProductCollection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productIds: string[];
  order: number;
  active: boolean;
  createdAt: string;
  startsAt?: string;
  endsAt?: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  averageTicket: number;
  conversionRate: number;
  revenueChange: number;
  ordersChange: number;
}
