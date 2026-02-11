import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockOrders, mockProducts, mockCustomers } from '@/data/mock';
import { formatCurrency } from '@/lib/format';
import { getStatusLabel, getStatusColor } from '@/lib/format';
import { TrendingUp, ShoppingCart, Users, DollarSign, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const totalRevenue = mockOrders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = mockOrders.length;
  const avgTicket = totalRevenue / totalOrders;
  const totalCustomers = mockCustomers.length;
  const totalProducts = mockProducts.length;

  const stats = [
    { label: 'Faturamento', value: formatCurrency(totalRevenue), icon: DollarSign, change: '+12.5%' },
    { label: 'Pedidos', value: totalOrders.toString(), icon: ShoppingCart, change: '+8.2%' },
    { label: 'Ticket Médio', value: formatCurrency(avgTicket), icon: TrendingUp, change: '+3.1%' },
    { label: 'Clientes', value: totalCustomers.toString(), icon: Users, change: '+15.3%' },
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-body">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1 font-body">{stat.change}</p>
                </div>
                <div className="p-3 bg-secondary rounded-lg">
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Pedidos Recentes</CardTitle>
            <Link to="/admin/orders" className="text-xs text-muted-foreground hover:text-foreground">Ver todos</Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockOrders.slice(0, 5).map(order => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">{order.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">{order.customerName}</p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <Badge variant="secondary" className={`${getStatusColor(order.status)} text-xs border-0`}>
                      {getStatusLabel(order.status)}
                    </Badge>
                    <span className="text-sm font-medium">{formatCurrency(order.total)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Produtos em Destaque</CardTitle>
            <Link to="/admin/products" className="text-xs text-muted-foreground hover:text-foreground">Ver todos</Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockProducts.slice(0, 5).map(product => (
                <div key={product.id} className="flex items-center gap-3 py-2 border-b last:border-0">
                  <img src={product.images[0]} alt="" className="w-10 h-10 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">Estoque: {product.stock}</p>
                  </div>
                  <span className="text-sm font-medium">{formatCurrency(product.price)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
