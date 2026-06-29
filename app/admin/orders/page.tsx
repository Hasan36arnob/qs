'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Download,
  FileText,
  FileSpreadsheet,
  Package,
} from 'lucide-react';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { fetchOrders } from '@/lib/data/orders';
import { formatCurrency, formatDateShort } from '@/lib/utils/format';
import { exportToExcel } from '@/lib/utils/export-excel';
import { exportToPdf } from '@/lib/utils/export-pdf';
import { exportToCsv } from '@/lib/utils/export-csv';
import { ORDER_STATUSES } from '@/lib/constants';
import type { Order, OrderStatus } from '@/types';

const STATUS_STYLES: Record<OrderStatus, string> = {
  delivered: 'bg-green-100 text-green-700',
  shipped: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  cancelled: 'bg-red-100 text-red-700',
};

interface OrderRow {
  [key: string]: unknown;
  id: string;
  customer: string;
  date: string;
  status: OrderStatus;
  items: number;
  total: number;
  createdAt: string;
}

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });
  const orders: Order[] = data ?? [];

  const filteredOrders = useMemo(() => {
    if (statusFilter === 'all') return orders;
    return orders.filter((o) => o.status === statusFilter);
  }, [orders, statusFilter]);

  const rows: OrderRow[] = filteredOrders.map((o) => ({
    id: o.id,
    customer: o.userId ?? o.sessionId ?? '—',
    date: formatDateShort(o.createdAt),
    status: o.status,
    items: o.items.reduce((sum, i) => sum + i.quantity, 0),
    total: o.total,
    createdAt: o.createdAt,
  }));

  const columns: Column<OrderRow>[] = [
    { key: 'id', header: 'Order ID', sortable: true },
    { key: 'customer', header: 'Customer', sortable: true },
    { key: 'date', header: 'Date', sortable: true },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => (
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[row.status]}`}
        >
          {row.status}
        </span>
      ),
    },
    { key: 'items', header: 'Items', sortable: true },
    {
      key: 'total',
      header: 'Total',
      sortable: true,
      render: (row) => formatCurrency(row.total),
    },
  ];

  const handleExportExcel = () => {
    const data = rows.map((r) => ({
      id: r.id,
      customer: r.customer,
      date: r.date,
      status: r.status,
      items: r.items,
      total: r.total,
    }));
    exportToExcel(data, 'orders');
  };

  const handleExportPdf = () => {
    exportToPdf(
      rows.map((r) => ({
        id: r.id,
        customer: r.customer,
        date: r.date,
        status: r.status,
        items: r.items,
        total: formatCurrency(r.total),
      })),
      [
        { header: 'Order ID', dataKey: 'id' },
        { header: 'Customer', dataKey: 'customer' },
        { header: 'Date', dataKey: 'date' },
        { header: 'Status', dataKey: 'status' },
        { header: 'Items', dataKey: 'items' },
        { header: 'Total', dataKey: 'total' },
      ],
      'orders',
      'Orders Report',
    );
  };

  const handleExportCsv = () => {
    const data = rows.map((r) => ({
      id: r.id,
      customer: r.customer,
      date: r.date,
      status: r.status,
      items: r.items,
      total: r.total,
    }));
    exportToCsv(data, 'orders');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl text-charcoal-800">Orders</h1>
          <p className="mt-1 text-sm text-charcoal-500">Loading...</p>
        </div>
        <div className="h-96 animate-pulse border border-cream-300 bg-white" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-3xl text-charcoal-800">Orders</h1>
          <p className="mt-1 text-sm text-charcoal-500">
            Manage and track all customer orders
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

      {/* Status filter buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter('all')}
          className={`flex items-center gap-1.5 border px-3 py-2 text-xs font-medium transition-colors ${
            statusFilter === 'all'
              ? 'border-charcoal-800 bg-charcoal-800 text-cream-100'
              : 'border-cream-300 bg-white text-charcoal-700 hover:bg-cream-50'
          }`}
        >
          <Package className="h-4 w-4" />
          All ({orders.length})
        </button>
        {ORDER_STATUSES.map((status) => {
          const count = orders.filter((o) => o.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`border px-3 py-2 text-xs font-medium capitalize transition-colors ${
                statusFilter === status
                  ? 'border-charcoal-800 bg-charcoal-800 text-cream-100'
                  : 'border-cream-300 bg-white text-charcoal-700 hover:bg-cream-50'
              }`}
            >
              {status} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders table */}
      <div className="border border-cream-300 bg-white p-6">
        <DataTable
          columns={columns}
          data={rows}
          pageSize={10}
          searchKey="id"
          searchPlaceholder="Search by order ID..."
        />
      </div>
    </div>
  );
}
