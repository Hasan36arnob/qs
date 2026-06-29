'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Download,
  FileText,
  FileSpreadsheet,
  Megaphone,
  DollarSign,
  Award,
} from 'lucide-react';
import { MetricCard } from '@/components/admin/MetricCard';
import { SalesChart } from '@/components/admin/SalesChart';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { fetchOrders } from '@/lib/data/orders';
import { formatCurrency } from '@/lib/utils/format';
import { exportToExcel } from '@/lib/utils/export-excel';
import { exportToPdf } from '@/lib/utils/export-pdf';
import { exportToCsv } from '@/lib/utils/export-csv';
import { ORDER_SOURCES } from '@/lib/constants';
import type { Order } from '@/types';

interface CampaignRow {
  [key: string]: unknown;
  campaign: string;
  orders: number;
  revenue: number;
  avgOrderValue: number;
}

export default function MarketingPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });
  const orders: Order[] = data ?? [];

  // Group orders by source (treating each source as a campaign)
  const campaignRows: CampaignRow[] = ORDER_SOURCES.map((source) => {
    const sourceOrders = orders.filter((o) => o.source === source);
    const revenue = sourceOrders.reduce((sum, o) => sum + o.total, 0);
    const avg = sourceOrders.length > 0 ? revenue / sourceOrders.length : 0;
    return {
      campaign: source.replace(/_/g, ' '),
      orders: sourceOrders.length,
      revenue,
      avgOrderValue: avg,
    };
  }).filter((r) => r.orders > 0);

  const totalCampaigns = campaignRows.length;
  const totalRevenue = campaignRows.reduce((sum, c) => sum + c.revenue, 0);
  const bestCampaign = campaignRows.reduce(
    (best, c) => (c.revenue > (best?.revenue ?? 0) ? c : best),
    campaignRows[0],
  );

  // Chart data
  const chartData = campaignRows.map((c) => ({
    name: c.campaign,
    revenue: c.revenue,
  }));

  const columns: Column<CampaignRow>[] = [
    { key: 'campaign', header: 'Campaign', sortable: true },
    { key: 'orders', header: 'Orders', sortable: true },
    {
      key: 'revenue',
      header: 'Revenue',
      sortable: true,
      render: (row) => formatCurrency(row.revenue),
    },
    {
      key: 'avgOrderValue',
      header: 'Avg Order Value',
      sortable: true,
      render: (row) => formatCurrency(row.avgOrderValue),
    },
  ];

  const handleExportExcel = () => {
    exportToExcel(
      campaignRows.map((r) => ({
        campaign: r.campaign,
        orders: r.orders,
        revenue: r.revenue,
        avgOrderValue: r.avgOrderValue,
      })),
      'campaigns',
    );
  };

  const handleExportPdf = () => {
    exportToPdf(
      campaignRows.map((r) => ({
        campaign: r.campaign,
        orders: r.orders,
        revenue: formatCurrency(r.revenue),
        avgOrderValue: formatCurrency(r.avgOrderValue),
      })),
      [
        { header: 'Campaign', dataKey: 'campaign' },
        { header: 'Orders', dataKey: 'orders' },
        { header: 'Revenue', dataKey: 'revenue' },
        { header: 'Avg Order Value', dataKey: 'avgOrderValue' },
      ],
      'campaigns',
      'Campaign Report',
    );
  };

  const handleExportCsv = () => {
    exportToCsv(
      campaignRows.map((r) => ({
        campaign: r.campaign,
        orders: r.orders,
        revenue: r.revenue,
        avgOrderValue: r.avgOrderValue,
      })),
      'campaigns',
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl text-charcoal-800">Marketing</h1>
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
          <h1 className="font-serif text-3xl text-charcoal-800">Marketing</h1>
          <p className="mt-1 text-sm text-charcoal-500">
            Campaign performance and attribution analytics
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard
          label="Total Campaigns"
          value={totalCampaigns}
          icon={Megaphone}
          change={5.0}
        />
        <MetricCard
          label="Attributed Revenue"
          value={formatCurrency(totalRevenue)}
          icon={DollarSign}
          change={12.5}
        />
        <MetricCard
          label="Best Campaign"
          value={bestCampaign?.campaign ?? '—'}
          icon={Award}
        />
      </div>

      {/* Chart */}
      <div className="border border-cream-300 bg-white p-6">
        <h2 className="mb-4 font-serif text-lg text-charcoal-800">
          Revenue by Campaign
        </h2>
        <SalesChart data={chartData} dataKey="revenue" xKey="name" />
      </div>

      {/* Table */}
      <div className="border border-cream-300 bg-white p-6">
        <h2 className="mb-4 font-serif text-lg text-charcoal-800">
          Campaign Performance
        </h2>
        <DataTable columns={columns} data={campaignRows} pageSize={10} />
      </div>
    </div>
  );
}
