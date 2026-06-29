'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Download,
  FileText,
  FileSpreadsheet,
  Globe,
  Percent,
} from 'lucide-react';
import { MetricCard } from '@/components/admin/MetricCard';
import { SalesChart } from '@/components/admin/SalesChart';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { fetchOrders } from '@/lib/data/orders';
import { fetchEvents } from '@/lib/data/events';
import { formatCurrency, formatNumber } from '@/lib/utils/format';
import { exportToExcel } from '@/lib/utils/export-excel';
import { exportToPdf } from '@/lib/utils/export-pdf';
import { exportToCsv } from '@/lib/utils/export-csv';
import { ORDER_SOURCES } from '@/lib/constants';
import type { Order, Event } from '@/types';

interface SourceRow {
  [key: string]: unknown;
  source: string;
  orders: number;
  revenue: number;
}

export default function TrafficPage() {
  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });
  const { data: eventsData, isLoading: eventsLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEvents(),
  });

  const orders: Order[] = ordersData ?? [];
  const events: Event[] = eventsData ?? [];

  const loading = ordersLoading || eventsLoading;

  // Traffic by source (count orders per source)
  const trafficBySource = ORDER_SOURCES.map((source) => ({
    name: source.replace(/_/g, ' '),
    orders: orders.filter((o) => o.source === source).length,
  }));

  // Source table data
  const sourceRows: SourceRow[] = ORDER_SOURCES.map((source) => {
    const sourceOrders = orders.filter((o) => o.source === source);
    return {
      source: source.replace(/_/g, ' '),
      orders: sourceOrders.length,
      revenue: sourceOrders.reduce((sum, o) => sum + o.total, 0),
    };
  }).filter((r) => r.orders > 0);

  const totalVisits = events.length;
  const conversionRate =
    totalVisits > 0 ? (orders.length / totalVisits) * 100 : 0;

  const columns: Column<SourceRow>[] = [
    { key: 'source', header: 'Source', sortable: true },
    { key: 'orders', header: 'Orders', sortable: true },
    {
      key: 'revenue',
      header: 'Revenue',
      sortable: true,
      render: (row) => formatCurrency(row.revenue),
    },
  ];

  const handleExportExcel = () => {
    exportToExcel(
      sourceRows.map((r) => ({
        source: r.source,
        orders: r.orders,
        revenue: r.revenue,
      })),
      'traffic',
    );
  };

  const handleExportPdf = () => {
    exportToPdf(
      sourceRows.map((r) => ({
        source: r.source,
        orders: r.orders,
        revenue: formatCurrency(r.revenue),
      })),
      [
        { header: 'Source', dataKey: 'source' },
        { header: 'Orders', dataKey: 'orders' },
        { header: 'Revenue', dataKey: 'revenue' },
      ],
      'traffic',
      'Traffic Report',
    );
  };

  const handleExportCsv = () => {
    exportToCsv(
      sourceRows.map((r) => ({
        source: r.source,
        orders: r.orders,
        revenue: r.revenue,
      })),
      'traffic',
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl text-charcoal-800">Traffic</h1>
          <p className="mt-1 text-sm text-charcoal-500">Loading...</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[...Array(2)].map((_, i) => (
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
          <h1 className="font-serif text-3xl text-charcoal-800">Traffic</h1>
          <p className="mt-1 text-sm text-charcoal-500">
            Traffic sources and conversion analytics
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
          label="Total Visits"
          value={formatNumber(totalVisits)}
          icon={Globe}
          change={15.3}
        />
        <MetricCard
          label="Conversion Rate"
          value={`${conversionRate.toFixed(2)}%`}
          icon={Percent}
          change={2.1}
        />
      </div>

      {/* Traffic by source chart */}
      <div className="border border-cream-300 bg-white p-6">
        <h2 className="mb-4 font-serif text-lg text-charcoal-800">
          Traffic by Source
        </h2>
        <SalesChart data={trafficBySource} dataKey="orders" xKey="name" />
      </div>

      {/* Source table */}
      <div className="border border-cream-300 bg-white p-6">
        <h2 className="mb-4 font-serif text-lg text-charcoal-800">
          Sources Breakdown
        </h2>
        <DataTable columns={columns} data={sourceRows} pageSize={10} />
      </div>
    </div>
  );
}
