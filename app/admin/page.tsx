'use client';

import { useQuery } from '@tanstack/react-query';
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  Download,
  FileText,
  FileSpreadsheet,
} from 'lucide-react';
import { MetricCard } from '@/components/admin/MetricCard';
import { RevenueChart } from '@/components/admin/RevenueChart';
import { SalesChart } from '@/components/admin/SalesChart';
import { fetchOrders } from '@/lib/data/orders';
import { fetchCustomers } from '@/lib/data/customers';
import { formatCurrency, formatNumber, formatDateShort } from '@/lib/utils/format';
import { exportToExcel } from '@/lib/utils/export-excel';
import { exportToPdf } from '@/lib/utils/export-pdf';
import { exportToCsv } from '@/lib/utils/export-csv';
import { ORDER_SOURCES } from '@/lib/constants';
import type { Order, Customer, OrderStatus } from '@/types';

const STATUS_STYLES: Record<OrderStatus, string> = {
  delivered: 'bg-green-100 text-green-700',
  shipped: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  cancelled: 'bg-red-100 text-red-700',
};

const MONTHS = [
  { key: '2025-03', label: 'March' },
  { key: '2025-04', label: 'April' },
  { key: '2025-05', label: 'May' },
];

export default function AdminDashboardPage() {
  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });
  const { data: customersData, isLoading: customersLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });

  const orders: Order[] = ordersData ?? [];
  const customers: Customer[] = customersData ?? [];

  const loading = ordersLoading || customersLoading;

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Monthly revenue for March, April, May 2025
  const monthlyRevenue = MONTHS.map((m) => {
    const revenue = orders
      .filter((o) => o.createdAt.startsWith(m.key))
      .reduce((sum, o) => sum + o.total, 0);
    return { name: m.label, revenue };
  });

  // Orders by source
  const ordersBySource = ORDER_SOURCES.map((source) => ({
    name: source.replace(/_/g, ' '),
    orders: orders.filter((o) => o.source === source).length,
  }));

  // Recent orders (last 5)
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const handleExportExcel = () => {
    const data = orders.map((o) => ({
      id: o.id,
      customer: o.userId ?? o.sessionId ?? '',
      date: o.createdAt,
      status: o.status,
      total: o.total,
    }));
    exportToExcel(data, 'orders');
  };

  const handleExportPdf = () => {
    const data = orders.map((o) => ({
      id: o.id,
      customer: o.userId ?? o.sessionId ?? '',
      date: formatDateShort(o.createdAt),
      status: o.status,
      total: formatCurrency(o.total),
    }));
    exportToPdf(
      data,
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
  };

  const handleExportCsv = () => {
    const data = orders.map((o) => ({
      id: o.id,
      customer: o.userId ?? o.sessionId ?? '',
      date: o.createdAt,
      status: o.status,
      total: o.total,
    }));
    exportToCsv(data, 'orders');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl text-charcoal-800">Dashboard</h1>
          <p className="mt-1 text-sm text-charcoal-500">Loading...</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse border border-cream-300 bg-white"
            />
          ))}
        </div>
        <div className="h-80 animate-pulse border border-cream-300 bg-white" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-3xl text-charcoal-800">Dashboard</h1>
          <p className="mt-1 text-sm text-charcoal-500">
            Overview of your store performance
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 border border-cream-300 bg-white px-3 py-2 text-xs font-medium text-charcoal-700 transition-colors hover:bg-cream-50"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Excel
          </button>
          <button
            onClick={handleExportPdf}
            className="flex items-center gap-1.5 border border-cream-300 bg-white px-3 py-2 text-xs font-medium text-charcoal-700 transition-colors hover:bg-cream-50"
          >
            <FileText className="h-4 w-4" />
            PDF
          </button>
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 border border-cream-300 bg-white px-3 py-2 text-xs font-medium text-charcoal-700 transition-colors hover:bg-cream-50"
          >
            <Download className="h-4 w-4" />
            CSV
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon={DollarSign}
          change={12.5}
        />
        <MetricCard
          label="Total Orders"
          value={formatNumber(totalOrders)}
          icon={ShoppingBag}
          change={8.2}
        />
        <MetricCard
          label="Total Customers"
          value={formatNumber(totalCustomers)}
          icon={Users}
          change={5.1}
        />
        <MetricCard
          label="Avg Order Value"
          value={formatCurrency(avgOrderValue)}
          icon={TrendingUp}
          change={3.4}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="border border-cream-300 bg-white p-6">
          <h2 className="mb-4 font-serif text-lg text-charcoal-800">
            Monthly Revenue
          </h2>
          <RevenueChart data={monthlyRevenue} dataKey="revenue" xKey="name" />
        </div>
        <div className="border border-cream-300 bg-white p-6">
          <h2 className="mb-4 font-serif text-lg text-charcoal-800">
            Orders by Source
          </h2>
          <SalesChart data={ordersBySource} dataKey="orders" xKey="name" />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="border border-cream-300 bg-white p-6">
        <h2 className="mb-4 font-serif text-lg text-charcoal-800">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cream-300 bg-cream-50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order: Order) => (
                <tr
                  key={order.id}
                  className="border-b border-cream-200 transition-colors hover:bg-cream-50"
                >
                  <td className="px-4 py-3 text-sm font-medium text-charcoal-800">
                    {order.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-charcoal-700">
                    {order.userId ?? order.sessionId ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-charcoal-700">
                    {formatDateShort(order.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-medium text-charcoal-800">
                    {formatCurrency(order.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
