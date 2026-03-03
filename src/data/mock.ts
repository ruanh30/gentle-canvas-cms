import { Product, Category, Order, Customer, Coupon, StoreSettings, User, ProductCollection } from '@/types';

export const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Camisetas', slug: 'camisetas', description: 'Camisetas masculinas e femininas', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop' },
  { id: 'cat-2', name: 'Calças', slug: 'calcas', description: 'Calças jeans, jogger e mais', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop' },
  { id: 'cat-3', name: 'Vestidos', slug: 'vestidos', description: 'Vestidos para todas as ocasiões', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=300&fit=crop' },
  { id: 'cat-4', name: 'Acessórios', slug: 'acessorios', description: 'Bolsas, cintos e bijuterias', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300&h=300&fit=crop' },
  { id: 'cat-5', name: 'Calçados', slug: 'calcados', description: 'Tênis, sandálias e sapatos', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&h=300&fit=crop' },
  { id: 'cat-6', name: 'Casacos', slug: 'casacos', description: 'Jaquetas e casacos', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=300&fit=crop' },
];

const imgs = [
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
  'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600',
  'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600',
  'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600',
  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600',
  'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600',
  'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600',
  'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
  'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600',
];

export const mockProducts: Product[] = [
  {
    id: 'prod-1', name: 'Camiseta Básica Premium', slug: 'camiseta-basica-premium',
    description: 'Camiseta de algodão orgânico com caimento perfeito. Tecido macio e durável, ideal para o dia a dia.',
    price: 89.90, compareAtPrice: 129.90, images: [imgs[0], imgs[5], imgs[6]],
    categoryId: 'cat-1', stock: 150, sku: 'CAM-001', featured: true, active: true,
    rating: 4.8, reviewCount: 124, createdAt: '2024-01-15', tags: ['básico', 'algodão'],
    variants: [
      { id: 'v1', productId: 'prod-1', name: 'P - Branca', sku: 'CAM-001-P-BR', price: 89.90, stock: 30, attributes: { tamanho: 'P', cor: 'Branca' } },
      { id: 'v2', productId: 'prod-1', name: 'M - Branca', sku: 'CAM-001-M-BR', price: 89.90, stock: 45, attributes: { tamanho: 'M', cor: 'Branca' } },
      { id: 'v3', productId: 'prod-1', name: 'G - Branca', sku: 'CAM-001-G-BR', price: 89.90, stock: 35, attributes: { tamanho: 'G', cor: 'Branca' } },
      { id: 'v4', productId: 'prod-1', name: 'M - Preta', sku: 'CAM-001-M-PT', price: 89.90, stock: 40, attributes: { tamanho: 'M', cor: 'Preta' } },
    ],
  },
  {
    id: 'prod-2', name: 'Calça Jeans Slim', slug: 'calca-jeans-slim',
    description: 'Calça jeans com corte slim moderno. Denim premium com elastano para maior conforto.',
    price: 199.90, compareAtPrice: 259.90, images: [imgs[1], imgs[7]],
    categoryId: 'cat-2', stock: 80, sku: 'CAL-001', featured: true, active: true,
    rating: 4.6, reviewCount: 89, createdAt: '2024-02-01', tags: ['jeans', 'slim'],
    variants: [
      { id: 'v5', productId: 'prod-2', name: '38 - Azul', sku: 'CAL-001-38-AZ', price: 199.90, stock: 20, attributes: { tamanho: '38', cor: 'Azul' } },
      { id: 'v6', productId: 'prod-2', name: '40 - Azul', sku: 'CAL-001-40-AZ', price: 199.90, stock: 25, attributes: { tamanho: '40', cor: 'Azul' } },
      { id: 'v7', productId: 'prod-2', name: '42 - Azul', sku: 'CAL-001-42-AZ', price: 199.90, stock: 20, attributes: { tamanho: '42', cor: 'Azul' } },
    ],
  },
  {
    id: 'prod-3', name: 'Vestido Midi Floral', slug: 'vestido-midi-floral',
    description: 'Vestido midi com estampa floral exclusiva. Tecido fluido e confortável para qualquer ocasião.',
    price: 249.90, images: [imgs[2], imgs[3]],
    categoryId: 'cat-3', stock: 45, sku: 'VES-001', featured: true, active: true,
    rating: 4.9, reviewCount: 67, createdAt: '2024-02-10', tags: ['floral', 'midi'],
    variants: [
      { id: 'v8', productId: 'prod-3', name: 'P - Cinza', sku: 'VES-001-P-CI', price: 249.90, stock: 4, attributes: { tamanho: 'P', cor: 'Cinza' } },
      { id: 'v8b', productId: 'prod-3', name: 'P - Azul', sku: 'VES-001-P-AZ', price: 249.90, stock: 4, attributes: { tamanho: 'P', cor: 'Azul' } },
      { id: 'v8c', productId: 'prod-3', name: 'P - Vermelha', sku: 'VES-001-P-VE', price: 249.90, stock: 4, attributes: { tamanho: 'P', cor: 'Vermelha' } },
      { id: 'v9', productId: 'prod-3', name: 'M - Cinza', sku: 'VES-001-M-CI', price: 249.90, stock: 5, attributes: { tamanho: 'M', cor: 'Cinza' } },
      { id: 'v9b', productId: 'prod-3', name: 'M - Azul', sku: 'VES-001-M-AZ', price: 249.90, stock: 5, attributes: { tamanho: 'M', cor: 'Azul' } },
      { id: 'v9c', productId: 'prod-3', name: 'M - Vermelha', sku: 'VES-001-M-VE', price: 249.90, stock: 5, attributes: { tamanho: 'M', cor: 'Vermelha' } },
      { id: 'v10', productId: 'prod-3', name: 'G - Cinza', sku: 'VES-001-G-CI', price: 249.90, stock: 5, attributes: { tamanho: 'G', cor: 'Cinza' } },
      { id: 'v10b', productId: 'prod-3', name: 'G - Azul', sku: 'VES-001-G-AZ', price: 249.90, stock: 5, attributes: { tamanho: 'G', cor: 'Azul' } },
      { id: 'v10c', productId: 'prod-3', name: 'G - Vermelha', sku: 'VES-001-G-VE', price: 249.90, stock: 5, attributes: { tamanho: 'G', cor: 'Vermelha' } },
    ],
  },
  {
    id: 'prod-4', name: 'Bolsa Couro Elegance', slug: 'bolsa-couro-elegance',
    description: 'Bolsa em couro legítimo com acabamento artesanal. Design atemporal e sofisticado.',
    price: 399.90, compareAtPrice: 499.90, images: [imgs[4], imgs[11]],
    categoryId: 'cat-4', stock: 25, sku: 'BOL-001', featured: false, active: true,
    rating: 4.7, reviewCount: 43, createdAt: '2024-03-01', tags: ['couro', 'elegante'],
    variants: [],
  },
  {
    id: 'prod-5', name: 'Tênis Urban Runner', slug: 'tenis-urban-runner',
    description: 'Tênis casual com tecnologia de amortecimento. Confortável para uso diário.',
    price: 329.90, images: [imgs[5], imgs[0]],
    categoryId: 'cat-5', stock: 60, sku: 'TEN-001', featured: true, active: true,
    rating: 4.5, reviewCount: 156, createdAt: '2024-03-15', tags: ['casual', 'conforto'],
    variants: [
      { id: 'v11', productId: 'prod-5', name: '39', sku: 'TEN-001-39', price: 329.90, stock: 15, attributes: { tamanho: '39' } },
      { id: 'v12', productId: 'prod-5', name: '40', sku: 'TEN-001-40', price: 329.90, stock: 15, attributes: { tamanho: '40' } },
      { id: 'v13', productId: 'prod-5', name: '41', sku: 'TEN-001-41', price: 329.90, stock: 15, attributes: { tamanho: '41' } },
      { id: 'v14', productId: 'prod-5', name: '42', sku: 'TEN-001-42', price: 329.90, stock: 15, attributes: { tamanho: '42' } },
    ],
  },
  {
    id: 'prod-6', name: 'Jaqueta Oversized', slug: 'jaqueta-oversized',
    description: 'Jaqueta oversized em sarja premium. Estilo moderno com forro interno.',
    price: 359.90, compareAtPrice: 449.90, images: [imgs[10], imgs[8]],
    categoryId: 'cat-6', stock: 35, sku: 'JAQ-001', featured: true, active: true,
    rating: 4.8, reviewCount: 78, createdAt: '2024-04-01', tags: ['oversized', 'inverno'],
    variants: [
      { id: 'v15', productId: 'prod-6', name: 'M - Verde', sku: 'JAQ-001-M-VD', price: 359.90, stock: 12, attributes: { tamanho: 'M', cor: 'Verde' } },
      { id: 'v16', productId: 'prod-6', name: 'G - Verde', sku: 'JAQ-001-G-VD', price: 359.90, stock: 12, attributes: { tamanho: 'G', cor: 'Verde' } },
    ],
  },
  {
    id: 'prod-7', name: 'Camiseta Estampada Art', slug: 'camiseta-estampada-art',
    description: 'Camiseta com estampa artística exclusiva. Edição limitada.',
    price: 119.90, images: [imgs[8], imgs[9]],
    categoryId: 'cat-1', stock: 100, sku: 'CAM-002', featured: false, active: true,
    rating: 4.4, reviewCount: 52, createdAt: '2024-04-15', tags: ['estampa', 'arte'],
    variants: [
      { id: 'v17', productId: 'prod-7', name: 'P', sku: 'CAM-002-P', price: 119.90, stock: 25, attributes: { tamanho: 'P' } },
      { id: 'v18', productId: 'prod-7', name: 'M', sku: 'CAM-002-M', price: 119.90, stock: 40, attributes: { tamanho: 'M' } },
      { id: 'v19', productId: 'prod-7', name: 'G', sku: 'CAM-002-G', price: 119.90, stock: 35, attributes: { tamanho: 'G' } },
    ],
  },
  {
    id: 'prod-8', name: 'Calça Jogger Moletom', slug: 'calca-jogger-moletom',
    description: 'Calça jogger em moletom felpado. Conforto máximo com estilo urbano.',
    price: 159.90, images: [imgs[7], imgs[1]],
    categoryId: 'cat-2', stock: 70, sku: 'CAL-002', featured: false, active: true,
    rating: 4.3, reviewCount: 91, createdAt: '2024-05-01', tags: ['jogger', 'moletom'],
    variants: [
      { id: 'v20', productId: 'prod-8', name: 'M - Cinza', sku: 'CAL-002-M-CZ', price: 159.90, stock: 25, attributes: { tamanho: 'M', cor: 'Cinza' } },
      { id: 'v21', productId: 'prod-8', name: 'G - Cinza', sku: 'CAL-002-G-CZ', price: 159.90, stock: 25, attributes: { tamanho: 'G', cor: 'Cinza' } },
    ],
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ord-1', orderNumber: '#1001', customerId: 'cust-1', customerName: 'Maria Silva', customerEmail: 'maria@email.com',
    items: [
      { id: 'oi-1', productId: 'prod-1', productName: 'Camiseta Básica Premium', price: 89.90, quantity: 2, image: imgs[0] },
      { id: 'oi-2', productId: 'prod-2', productName: 'Calça Jeans Slim', price: 199.90, quantity: 1, image: imgs[1] },
    ],
    subtotal: 379.70, shipping: 0, discount: 37.97, total: 341.73, status: 'delivered',
    shippingAddress: { street: 'Rua das Flores', number: '123', neighborhood: 'Centro', city: 'São Paulo', state: 'SP', zipCode: '01001-000' },
    couponCode: 'PROMO10', paymentMethod: 'Cartão de Crédito', createdAt: '2024-06-01T10:00:00', updatedAt: '2024-06-05T14:30:00',
  },
  {
    id: 'ord-2', orderNumber: '#1002', customerId: 'cust-2', customerName: 'João Santos', customerEmail: 'joao@email.com',
    items: [
      { id: 'oi-3', productId: 'prod-3', productName: 'Vestido Midi Floral', price: 249.90, quantity: 1, image: imgs[2] },
    ],
    subtotal: 249.90, shipping: 15.90, discount: 0, total: 265.80, status: 'shipped',
    shippingAddress: { street: 'Av. Brasil', number: '456', complement: 'Apto 12', neighborhood: 'Jardins', city: 'Rio de Janeiro', state: 'RJ', zipCode: '20000-000' },
    paymentMethod: 'PIX', createdAt: '2024-06-10T15:30:00', updatedAt: '2024-06-12T09:00:00',
  },
  {
    id: 'ord-3', orderNumber: '#1003', customerId: 'cust-3', customerName: 'Ana Costa', customerEmail: 'ana@email.com',
    items: [
      { id: 'oi-4', productId: 'prod-5', productName: 'Tênis Urban Runner', price: 329.90, quantity: 1, image: imgs[5] },
      { id: 'oi-5', productId: 'prod-6', productName: 'Jaqueta Oversized', price: 359.90, quantity: 1, image: imgs[10] },
    ],
    subtotal: 689.80, shipping: 0, discount: 0, total: 689.80, status: 'processing',
    shippingAddress: { street: 'Rua Augusta', number: '789', neighborhood: 'Consolação', city: 'São Paulo', state: 'SP', zipCode: '01305-000' },
    paymentMethod: 'Cartão de Crédito', createdAt: '2024-06-15T08:45:00', updatedAt: '2024-06-15T08:45:00',
  },
  {
    id: 'ord-4', orderNumber: '#1004', customerId: 'cust-1', customerName: 'Maria Silva', customerEmail: 'maria@email.com',
    items: [
      { id: 'oi-6', productId: 'prod-4', productName: 'Bolsa Couro Elegance', price: 399.90, quantity: 1, image: imgs[4] },
    ],
    subtotal: 399.90, shipping: 0, discount: 0, total: 399.90, status: 'pending',
    shippingAddress: { street: 'Rua das Flores', number: '123', neighborhood: 'Centro', city: 'São Paulo', state: 'SP', zipCode: '01001-000' },
    paymentMethod: 'Boleto', createdAt: '2024-06-18T11:20:00', updatedAt: '2024-06-18T11:20:00',
  },
  {
    id: 'ord-5', orderNumber: '#1005', customerId: 'cust-4', customerName: 'Pedro Lima', customerEmail: 'pedro@email.com',
    items: [
      { id: 'oi-7', productId: 'prod-7', productName: 'Camiseta Estampada Art', price: 119.90, quantity: 3, image: imgs[8] },
    ],
    subtotal: 359.70, shipping: 0, discount: 35.97, total: 323.73, status: 'confirmed',
    shippingAddress: { street: 'Rua XV de Novembro', number: '321', neighborhood: 'Centro', city: 'Curitiba', state: 'PR', zipCode: '80020-000' },
    couponCode: 'PROMO10', paymentMethod: 'PIX', createdAt: '2024-06-20T16:00:00', updatedAt: '2024-06-20T16:00:00',
  },
];

export const mockCustomers: Customer[] = [
  { id: 'cust-1', userId: 'u-1', name: 'Maria Silva', email: 'maria@email.com', phone: '(11) 99999-0001', cpf: '123.456.789-00', addresses: [], totalOrders: 2, totalSpent: 741.63, createdAt: '2024-01-10' },
  { id: 'cust-2', userId: 'u-2', name: 'João Santos', email: 'joao@email.com', phone: '(21) 99999-0002', addresses: [], totalOrders: 1, totalSpent: 265.80, createdAt: '2024-02-15' },
  { id: 'cust-3', userId: 'u-3', name: 'Ana Costa', email: 'ana@email.com', phone: '(11) 99999-0003', addresses: [], totalOrders: 1, totalSpent: 689.80, createdAt: '2024-03-20' },
  { id: 'cust-4', userId: 'u-4', name: 'Pedro Lima', email: 'pedro@email.com', phone: '(41) 99999-0004', addresses: [], totalOrders: 1, totalSpent: 323.73, createdAt: '2024-04-05' },
];

export const mockCoupons: Coupon[] = [
  { id: 'cup-1', code: 'PROMO10', type: 'percentage', value: 10, minOrderValue: 100, maxUses: 100, usedCount: 23, active: true, expiresAt: '2025-12-31', createdAt: '2024-01-01' },
  { id: 'cup-2', code: 'FRETE0', type: 'fixed', value: 25, minOrderValue: 150, maxUses: 50, usedCount: 12, active: true, expiresAt: '2025-06-30', createdAt: '2024-02-01' },
  { id: 'cup-3', code: 'BEMVINDO', type: 'percentage', value: 15, maxUses: 1000, usedCount: 156, active: true, createdAt: '2024-01-01' },
];

export const mockStoreSettings: StoreSettings = {
  storeName: 'MODA STORE',
  description: 'Sua loja de moda online',
  currency: 'BRL',
  locale: 'pt-BR',
  shippingFlatRate: 15.90,
  freeShippingThreshold: 299,
  contactEmail: 'contato@modastore.com',
  contactPhone: '(11) 3000-0000',
  socialLinks: { instagram: '@modastore', whatsapp: '5511999990000' },
};

export const mockCollections: ProductCollection[] = [
  {
    id: 'col-1', name: 'Acabaram de Chegar', slug: 'acabaram-de-chegar',
    description: 'Novidades fresquinhas na loja',
    productIds: ['prod-1', 'prod-3', 'prod-5', 'prod-7'],
    order: 1, active: true, createdAt: '2024-06-01',
  },
  {
    id: 'col-2', name: 'Mais Vendidos', slug: 'mais-vendidos',
    description: 'Os queridinhos dos nossos clientes',
    productIds: ['prod-2', 'prod-4', 'prod-6', 'prod-8'],
    order: 2, active: true, createdAt: '2024-06-01',
  },
  {
    id: 'col-3', name: 'Looks Completos', slug: 'looks-completos',
    description: 'Combinações perfeitas para você',
    productIds: ['prod-1', 'prod-2', 'prod-6'],
    order: 3, active: true, createdAt: '2024-06-10',
  },
];

export const mockAdminUser: User = {
  id: 'admin-1', name: 'Admin', email: 'admin@modastore.com', role: 'admin', createdAt: '2024-01-01',
};
