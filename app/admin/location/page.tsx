'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Download,
  FileText,
  FileSpreadsheet,
} from 'lucide-react';
import { SalesChart } from '@/components/admin/SalesChart';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { fetchOrders } from '@/lib/data/orders';
import { formatCurrency } from '@/lib/utils/format';
import { exportToExcel } from '@/lib/utils/export-excel';
import { exportToPdf } from '@/lib/utils/export-pdf';
import { exportToCsv } from '@/lib/utils/export-csv';
import type { Order } from '@/types';

interface DivisionRow {
  [key: string]: unknown;
  division: string;
  orders: number;
  revenue: number;
  topDistrict: string;
}

export default function LocationPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });
  const orders: Order[] = data ?? [];

  // Group orders by division
  const divisionMap: Record<string, { orders: number; revenue: number; districts: Record<string, number> }> = {};
  for (const o of orders) {
    const div = o.shippingAddress.division;
    if (!divisionMap[div]) {
      divisionMap[div] = { orders: 0, revenue: 0, districts: {} };
    }
    divisionMap[div].orders += 1;
    divisionMap[div].revenue += o.total;
    const dist = o.shippingAddress.district;
    divisionMap[div].districts[dist] = (divisionMap[div].districts[dist] ?? 0) + 1;
  }

  const divisionRows: DivisionRow[] = Object.entries(divisionMap).map(([div, data]) => {
    const topDistrict = Object.entries(data.districts).sort(
      ([, a], [, b]) => b - a,
    )[0]?.[0] ?? '—';
    return {
      division: div,
      orders: data.orders,
      revenue: data.revenue,
      topDistrict,
    };
  });

  // Chart data
  const chartData = divisionRows.map((r) => ({
    name: r.division,
    orders: r.orders,
  }));

  const columns: Column<DivisionRow>[] = [
    { key: 'division', header: 'Division', sortable: true },
    { key: 'orders', header: 'Orders', sortable: true },
    {
      key: 'revenue',
      header: 'Revenue',
      sortable: true,
      render: (row) => formatCurrency(row.revenue),
    },
    { key: 'topDistrict', header: 'Top District' },
  ];

  const handleExportExcel = () => {
    exportToExcel(
      divisionRows.map((r) => ({
        division: r.division,
        orders: r.orders,
        revenue: r.revenue,
        topDistrict: r.topDistrict,
      })),
      'locations',
    );
  };

  const handleExportPdf = () => {
    exportToPdf(
      divisionRows.map((r) => ({
        division: r.division,
        orders: r.orders,
        revenue: formatCurrency(r.revenue),
        topDistrict: r.topDistrict,
      })),
      [
        { header: 'Division', dataKey: 'division' },
        { header: 'Orders', dataKey: 'orders' },
        { header: 'Revenue', dataKey: 'revenue' },
        { header: 'Top District', dataKey: 'topDistrict' },
      ],
      'locations',
      'Location Report',
    );
  };

  const handleExportCsv = () => {
    exportToCsv(
      divisionRows.map((r) => ({
        division: r.division,
        orders: r.orders,
        revenue: r.revenue,
        topDistrict: r.topDistrict,
      })),
      'locations',
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl text-charcoal-800">Location</h1>
          <p className="mt-1 text-sm text-charcoal-500">Loading...</p>
        </div>
        <div className="h-80 animate-pulse border border-cream-300 bg-white" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-3xl text-charcoal-800">Location</h1>
          <p className="mt-1 text-sm text-charcoal-500">
            Geographic distribution of orders
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

      {/* Chart */}
      <div className="border border-cream-300 bg-white p-6">
        <h2 className="mb-4 font-serif text-lg text-charcoal-800">
          Orders by Division
        </h2>
        <SalesChart data={chartData} dataKey="orders" xKey="name" />
      </div>

      {/* Table */}
      <div className="border border-cream-300 bg-white p-6">
        <h2 className="mb-4 font-serif text-lg text-charcoal-800">
          Division Breakdown
        </h2>
        <DataTable columns={columns} data={divisionRows} pageSize={10} />
      </div>
    </div>
  );
}
