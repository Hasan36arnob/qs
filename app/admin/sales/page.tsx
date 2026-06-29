'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Download,
  FileText,
  FileSpreadsheet,
  DollarSign,
  TrendingUp,
  ShoppingBag,
} from 'lucide-react';
import { MetricCard } from '@/components/admin/MetricCard';
import { RevenueChart } from '@/components/admin/RevenueChart';
import { SalesChart } from '@/components/admin/SalesChart';
import { fetchOrders } from '@/lib/data/orders';
import { formatCurrency, formatNumber } from '@/lib/utils/format';
import { exportToExcel } from '@/lib/utils/export-excel';
import { exportToPdf } from '@/lib/utils/export-pdf';
import { exportToCsv } from '@/lib/utils/export-csv';
import { PAYMENT_METHODS } from '@/lib/constants';
import type { Order } from '@/types';

export default function SalesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });
  const orders: Order[] = data ?? [];

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const orderCount = orders.length;
  const avgOrderValue = orderCount > 0 ? totalSales / orderCount : 0;

  // Daily revenue (group by date)
  const dailyMap: Record<string, number> = {};
  for (const o of orders) {
    const date = o.createdAt.split('T')[0];
    dailyMap[date] = (dailyMap[date] ?? 0) + o.total;
  }
  const dailyRevenue = Object.entries(dailyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, revenue]) => ({
      name: date.slice(5), // MM-DD
      revenue,
    }));

  // Sales by payment method
  const salesByPayment = PAYMENT_METHODS.map((pm) => ({
    name: pm.name,
    sales: orders
      .filter((o) => o.paymentMethod === pm.id)
      .reduce((sum, o) => sum + o.total, 0),
  }));

  const handleExportExcel = () => {
    exportToExcel(
      orders.map((o) => ({
        id: o.id,
        date: o.createdAt,
        paymentMethod: o.paymentMethod,
        total: o.total,
      })),
      'sales',
    );
  };

  const handleExportPdf = () => {
    exportToPdf(
      orders.map((o) => ({
        id: o.id,
        date: o.createdAt.split('T')[0],
        paymentMethod: o.paymentMethod,
        total: formatCurrency(o.total),
      })),
      [
        { header: 'Order ID', dataKey: 'id' },
        { header: 'Date', dataKey: 'date' },
        { header: 'Payment Method', dataKey: 'paymentMethod' },
        { header: 'Total', dataKey: 'total' },
      ],
      'sales',
      'Sales Report',
    );
  };

  const handleExportCsv = () => {
    exportToCsv(
      orders.map((o) => ({
        id: o.id,
        date: o.createdAt,
        paymentMethod: o.paymentMethod,
        total: o.total,
      })),
      'sales',
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl text-charcoal-800">Sales</h1>
          <p className="mt-1 text-sm text-charcoal-500">Loading...</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse border border-cream-300 bg-white"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-3xl text-charcoal-800">Sales</h1>
          <p className="mt-1 text-sm text-charcoal-500">
            Sales performance and payment analytics
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          label="Total Sales"
          value={formatCurrency(totalSales)}
          icon={DollarSign}
          change={12.5}
        />
        <MetricCard
          label="Avg Order Value"
          value={formatCurrency(avgOrderValue)}
          icon={TrendingUp}
          change={3.4}
        />
        <MetricCard
          label="Number of Orders"
          value={formatNumber(orderCount)}
          icon={ShoppingBag}
          change={8.2}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="border border-cream-300 bg-white p-6">
          <h2 className="mb-4 font-serif text-lg text-charcoal-800">
            Daily Revenue
          </h2>
          <RevenueChart data={dailyRevenue} dataKey="revenue" xKey="name" />
        </div>
        <div className="border border-cream-300 bg-white p-6">
          <h2 className="mb-4 font-serif text-lg text-charcoal-800">
            Sales by Payment Method
          </h2>
          <SalesChart data={salesByPayment} dataKey="sales" xKey="name" />
        </div>
      </div>
    </div>
  );
}
