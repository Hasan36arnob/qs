'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Download,
  FileText,
  FileSpreadsheet,
} from 'lucide-react';
import { RevenueChart } from '@/components/admin/RevenueChart';
import { SalesChart } from '@/components/admin/SalesChart';
import { fetchOrders } from '@/lib/data/orders';
import { fetchCustomers } from '@/lib/data/customers';
import { fetchEvents, fetchFunnelData } from '@/lib/data/events';
import { fetchProducts } from '@/lib/data/products';
import { formatCurrency, formatDateShort } from '@/lib/utils/format';
import { exportToExcel } from '@/lib/utils/export-excel';
import { exportToPdf } from '@/lib/utils/export-pdf';
import { exportToCsv } from '@/lib/utils/export-csv';
import { ORDER_SOURCES, CATEGORIES } from '@/lib/constants';
import type { Order, Customer, Event, Product } from '@/types';

const MONTHS = [
  { key: '2025-03', label: 'March' },
  { key: '2025-04', label: 'April' },
  { key: '2025-05', label: 'May' },
];

const FUNNEL_STAGES = [
  { key: 'product_view', label: 'Product View' },
  { key: 'add_to_cart', label: 'Add to Cart' },
  { key: 'checkout_initiate', label: 'Checkout' },
  { key: 'purchase', label: 'Purchase' },
];

export default function ReportsPage() {
  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });
  const { data: customersData, isLoading: customersLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });
  const { data: eventsData, isLoading: eventsLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEvents(),
  });
  const { data: funnel } = useQuery({
    queryKey: ['funnel'],
    queryFn: fetchFunnelData,
  });
  const { data: productsData } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const orders: Order[] = ordersData ?? [];
  const customers: Customer[] = customersData ?? [];
  const events: Event[] = eventsData ?? [];
  const products: Product[] = productsData ?? [];

  const loading = ordersLoading || customersLoading || eventsLoading;

  // Monthly revenue
  const monthlyRevenue = MONTHS.map((m) => ({
    name: m.label,
    revenue: orders
      .filter((o) => o.createdAt.startsWith(m.key))
      .reduce((sum, o) => sum + o.total, 0),
  }));

  // Orders by category (count products per category in orders)
  const productMap = new Map(products.map((p) => [p.id, p]));
  const categoryCounts: Record<string, number> = {};
  for (const order of orders) {
    for (const item of order.items) {
      const product = productMap.get(item.productId);
      if (product) {
        const cat = product.category;
        categoryCounts[cat] = (categoryCounts[cat] ?? 0) + item.quantity;
      }
    }
  }
  const ordersByCategory = CATEGORIES.map((c) => ({
    name: c.name,
    orders: categoryCounts[c.id] ?? 0,
  }));

  // Orders by source
  const ordersBySource = ORDER_SOURCES.map((source) => ({
    name: source.replace(/_/g, ' '),
    orders: orders.filter((o) => o.source === source).length,
  }));

  // Funnel data
  const funnelData = FUNNEL_STAGES.map((stage) => ({
    name: stage.label,
    count: funnel ? funnel[stage.key as keyof typeof funnel] : 0,
  }));

  const handleExportExcel = (type: 'orders' | 'customers' | 'events') => {
    if (type === 'orders') {
      exportToExcel(
        orders.map((o) => ({
          id: o.id,
          customer: o.userId ?? o.sessionId ?? '',
          date: o.createdAt,
          status: o.status,
          total: o.total,
        })),
        'orders',
      );
    } else if (type === 'customers') {
      exportToExcel(
        customers.map((c) => ({
          id: c.id,
          name: c.fullName,
          email: c.email,
          orders: c.totalOrders,
          totalSpent: c.totalSpent,
          joinDate: c.joinDate,
        })),
        'customers',
      );
    } else {
      exportToExcel(
        events.map((e) => ({
          id: e.id,
          type: e.eventType,
          sessionId: e.sessionId,
          productId: e.productId ?? '',
          timestamp: e.timestamp,
        })),
        'events',
      );
    }
  };

  const handleExportPdf = (type: 'orders' | 'customers' | 'events') => {
    if (type === 'orders') {
      exportToPdf(
        orders.map((o) => ({
          id: o.id,
          customer: o.userId ?? o.sessionId ?? '',
          date: formatDateShort(o.createdAt),
          status: o.status,
          total: formatCurrency(o.total),
        })),
        [
          { header: 'Order ID', dataKey: 'id' },
          { header: 'Customer', dataKey: 'customer' },
          { header: 'Date', dataKey: 'date' },
          { header: 'Status', dataKey: 'status' },
          { header: 'Total', dataKey: 'total' },
        ],
        'orders',
        'Orders Report',
      );
    } else if (type === 'customers') {
      exportToPdf(
        customers.map((c) => ({
          id: c.id,
          name: c.fullName,
          email: c.email,
          orders: c.totalOrders,
          totalSpent: formatCurrency(c.totalSpent),
          joinDate: formatDateShort(c.joinDate),
        })),
        [
          { header: 'ID', dataKey: 'id' },
          { header: 'Name', dataKey: 'name' },
          { header: 'Email', dataKey: 'email' },
          { header: 'Orders', dataKey: 'orders' },
          { header: 'Total Spent', dataKey: 'totalSpent' },
          { header: 'Join Date', dataKey: 'joinDate' },
        ],
        'customers',
        'Customers Report',
      );
    } else {
      exportToPdf(
        events.map((e) => ({
          id: e.id,
          type: e.eventType,
          sessionId: e.sessionId,
          productId: e.productId ?? '',
          timestamp: formatDateShort(e.timestamp),
        })),
        [
          { header: 'ID', dataKey: 'id' },
          { header: 'Type', dataKey: 'type' },
          { header: 'Session', dataKey: 'sessionId' },
          { header: 'Product', dataKey: 'productId' },
          { header: 'Timestamp', dataKey: 'timestamp' },
        ],
        'events',
        'Events Report',
      );
    }
  };

  const handleExportCsv = (type: 'orders' | 'customers' | 'events') => {
    if (type === 'orders') {
      exportToCsv(
        orders.map((o) => ({
          id: o.id,
          customer: o.userId ?? o.sessionId ?? '',
          date: o.createdAt,
          status: o.status,
          total: o.total,
        })),
        'orders',
      );
    } else if (type === 'customers') {
      exportToCsv(
        customers.map((c) => ({
          id: c.id,
          name: c.fullName,
          email: c.email,
          orders: c.totalOrders,
          totalSpent: c.totalSpent,
          joinDate: c.joinDate,
        })),
        'customers',
      );
    } else {
      exportToCsv(
        events.map((e) => ({
          id: e.id,
          type: e.eventType,
          sessionId: e.sessionId,
          productId: e.productId ?? '',
          timestamp: e.timestamp,
        })),
        'events',
      );
    }
  };

  const ExportButtons = ({ type }: { type: 'orders' | 'customers' | 'events' }) => (
    <div className="flex gap-2">
      <button
        onClick={() => handleExportExcel(type)}
        className="flex items-center gap-1.5 border border-cream-300 bg-white px-3 py-2 text-xs font-medium text-charcoal-700 transition-colors hover:bg-cream-50"
      >
        <FileSpreadsheet className="h-4 w-4" />
        Excel
      </button>
      <button
        onClick={() => handleExportPdf(type)}
        className="flex items-center gap-1.5 border border-cream-300 bg-white px-3 py-2 text-xs font-medium text-charcoal-700 transition-colors hover:bg-cream-50"
      >
        <FileText className="h-4 w-4" />
        PDF
      </button>
      <button
        onClick={() => handleExportCsv(type)}
        className="flex items-center gap-1.5 border border-cream-300 bg-white px-3 py-2 text-xs font-medium text-charcoal-700 transition-colors hover:bg-cream-50"
      >
        <Download className="h-4 w-4" />
        CSV
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl text-charcoal-800">Reports</h1>
          <p className="mt-1 text-sm text-charcoal-500">Loading...</p>
        </div>
        <div className="h-80 animate-pulse border border-cream-300 bg-white" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-charcoal-800">Reports</h1>
        <p className="mt-1 text-sm text-charcoal-500">
          Comprehensive analytics and performance reports
        </p>
      </div>

      {/* Export sections */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="border border-cream-300 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-charcoal-800">Orders Data</h3>
          <ExportButtons type="orders" />
        </div>
        <div className="border border-cream-300 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-charcoal-800">Customers Data</h3>
          <ExportButtons type="customers" />
        </div>
        <div className="border border-cream-300 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-charcoal-800">Events Data</h3>
          <ExportButtons type="events" />
        </div>
      </div>

      {/* Revenue chart */}
      <div className="border border-cream-300 bg-white p-6">
        <h2 className="mb-4 font-serif text-lg text-charcoal-800">Monthly Revenue</h2>
        <RevenueChart data={monthlyRevenue} dataKey="revenue" xKey="name" />
      </div>

      {/* Category and Source charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="border border-cream-300 bg-white p-6">
          <h2 className="mb-4 font-serif text-lg text-charcoal-800">
            Orders by Category
          </h2>
          <SalesChart data={ordersByCategory} dataKey="orders" xKey="name" />
        </div>
        <div className="border border-cream-300 bg-white p-6">
          <h2 className="mb-4 font-serif text-lg text-charcoal-800">
            Orders by Source
          </h2>
          <SalesChart data={ordersBySource} dataKey="orders" xKey="name" />
        </div>
      </div>

      {/* Funnel visualization */}
      <div className="border border-cream-300 bg-white p-6">
        <h2 className="mb-4 font-serif text-lg text-charcoal-800">
          Conversion Funnel
        </h2>
        <div className="space-y-4">
          {funnelData.map((stage, i) => {
            const max = funnelData[0]?.count ?? 1;
            const width = max > 0 ? (stage.count / max) * 100 : 0;
            const prev = i > 0 ? funnelData[i - 1].count : 0;
            const rate = prev > 0 ? (stage.count / prev) * 100 : 100;
            return (
              <div key={stage.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-charcoal-700">{stage.name}</span>
                  <span className="text-charcoal-500">
                    {stage.count} {i > 0 && `(${rate.toFixed(1)}%)`}
                  </span>
                </div>
                <div className="h-8 w-full bg-cream-100">
                  <div
                    className="flex h-8 items-center justify-end bg-gold-400 px-2 text-xs font-medium text-charcoal-800"
                    style={{ width: `${width}%` }}
                  >
                    {stage.count > 0 && stage.count}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
