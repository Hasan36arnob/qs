'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Download,
  FileText,
  FileSpreadsheet,
  ShoppingCart,
  AlertCircle,
} from 'lucide-react';
import { MetricCard } from '@/components/admin/MetricCard';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { fetchAbandonedCarts } from '@/lib/data/carts';
import { formatCurrency, formatRelativeTime } from '@/lib/utils/format';
import { exportToExcel } from '@/lib/utils/export-excel';
import { exportToPdf } from '@/lib/utils/export-pdf';
import { exportToCsv } from '@/lib/utils/export-csv';
import type { Cart } from '@/types';

interface CartRow {
  [key: string]: unknown;
  id: string;
  user: string;
  items: number;
  value: number;
  updatedAt: string;
}

export default function AbandonedCartsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['abandoned-carts'],
    queryFn: fetchAbandonedCarts,
  });
  const carts: Cart[] = data ?? [];

  const rows: CartRow[] = carts.map((c) => ({
    id: c.id,
    user: c.userId ?? c.sessionId ?? '—',
    items: c.items.reduce((sum, i) => sum + i.quantity, 0),
    value: c.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    updatedAt: c.updatedAt,
  }));

  const potentialRevenueLost = rows.reduce((sum, r) => sum + r.value, 0);

  const columns: Column<CartRow>[] = [
    { key: 'id', header: 'Cart ID', sortable: true },
    { key: 'user', header: 'User / Session', sortable: true },
    { key: 'items', header: 'Items', sortable: true },
    {
      key: 'value',
      header: 'Cart Value',
      sortable: true,
      render: (row) => formatCurrency(row.value),
    },
    {
      key: 'updatedAt',
      header: 'Last Updated',
      sortable: true,
      render: (row) => formatRelativeTime(row.updatedAt),
    },
  ];

  const handleExportExcel = () => {
    exportToExcel(
      rows.map((r) => ({
        id: r.id,
        user: r.user,
        items: r.items,
        value: r.value,
        updatedAt: r.updatedAt,
      })),
      'abandoned-carts',
    );
  };

  const handleExportPdf = () => {
    exportToPdf(
      rows.map((r) => ({
        id: r.id,
        user: r.user,
        items: r.items,
        value: formatCurrency(r.value),
        updatedAt: formatRelativeTime(r.updatedAt),
      })),
      [
        { header: 'Cart ID', dataKey: 'id' },
        { header: 'User / Session', dataKey: 'user' },
        { header: 'Items', dataKey: 'items' },
        { header: 'Cart Value', dataKey: 'value' },
        { header: 'Last Updated', dataKey: 'updatedAt' },
      ],
      'abandoned-carts',
      'Abandoned Carts Report',
    );
  };

  const handleExportCsv = () => {
    exportToCsv(
      rows.map((r) => ({
        id: r.id,
        user: r.user,
        items: r.items,
        value: r.value,
        updatedAt: r.updatedAt,
      })),
      'abandoned-carts',
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl text-charcoal-800">
            Abandoned Carts
          </h1>
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
          <h1 className="font-serif text-3xl text-charcoal-800">
            Abandoned Carts
          </h1>
          <p className="mt-1 text-sm text-charcoal-500">
            Recover lost revenue from abandoned shopping carts
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
          label="Abandoned Carts"
          value={carts.length}
          icon={ShoppingCart}
          change={-3.2}
        />
        <MetricCard
          label="Potential Revenue Lost"
          value={formatCurrency(potentialRevenueLost)}
          icon={AlertCircle}
          change={-1.8}
        />
      </div>

      {/* Table */}
      <div className="border border-cream-300 bg-white p-6">
        <h2 className="mb-4 font-serif text-lg text-charcoal-800">
          Abandoned Cart Details
        </h2>
        <DataTable
          columns={columns}
          data={rows}
          pageSize={10}
          searchKey="id"
          searchPlaceholder="Search by cart ID..."
        />
      </div>
    </div>
  );
}
