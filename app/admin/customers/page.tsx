'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Download,
  FileText,
  FileSpreadsheet,
  Users,
} from 'lucide-react';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { fetchCustomers } from '@/lib/data/customers';
import { formatCurrency, formatDateShort } from '@/lib/utils/format';
import { exportToExcel } from '@/lib/utils/export-excel';
import { exportToPdf } from '@/lib/utils/export-pdf';
import { exportToCsv } from '@/lib/utils/export-csv';
import type { Customer } from '@/types';

interface CustomerRow {
  [key: string]: unknown;
  id: string;
  fullName: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  joinDate: string;
  isActive: boolean;
}

export default function CustomersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });
  const customers: Customer[] = data ?? [];

  const rows: CustomerRow[] = customers.map((c) => ({
    id: c.id,
    fullName: c.fullName,
    email: c.email,
    phone: c.phone ?? '—',
    totalOrders: c.totalOrders,
    totalSpent: c.totalSpent,
    joinDate: formatDateShort(c.joinDate),
    isActive: c.isActive,
  }));

  const columns: Column<CustomerRow>[] = [
    { key: 'fullName', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'phone', header: 'Phone' },
    { key: 'totalOrders', header: 'Orders', sortable: true },
    {
      key: 'totalSpent',
      header: 'Total Spent',
      sortable: true,
      render: (row) => formatCurrency(row.totalSpent),
    },
    { key: 'joinDate', header: 'Join Date', sortable: true },
    {
      key: 'isActive',
      header: 'Status',
      sortable: true,
      render: (row) => (
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
            row.isActive
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  const handleExportExcel = () => {
    exportToExcel(
      rows.map((r) => ({
        id: r.id,
        name: r.fullName,
        email: r.email,
        phone: r.phone,
        orders: r.totalOrders,
        totalSpent: r.totalSpent,
        joinDate: r.joinDate,
        status: r.isActive ? 'Active' : 'Inactive',
      })),
      'customers',
    );
  };

  const handleExportPdf = () => {
    exportToPdf(
      rows.map((r) => ({
        name: r.fullName,
        email: r.email,
        phone: r.phone,
        orders: r.totalOrders,
        totalSpent: formatCurrency(r.totalSpent),
        joinDate: r.joinDate,
        status: r.isActive ? 'Active' : 'Inactive',
      })),
      [
        { header: 'Name', dataKey: 'name' },
        { header: 'Email', dataKey: 'email' },
        { header: 'Phone', dataKey: 'phone' },
        { header: 'Orders', dataKey: 'orders' },
        { header: 'Total Spent', dataKey: 'totalSpent' },
        { header: 'Join Date', dataKey: 'joinDate' },
        { header: 'Status', dataKey: 'status' },
      ],
      'customers',
      'Customers Report',
    );
  };

  const handleExportCsv = () => {
    exportToCsv(
      rows.map((r) => ({
        id: r.id,
        name: r.fullName,
        email: r.email,
        phone: r.phone,
        orders: r.totalOrders,
        totalSpent: r.totalSpent,
        joinDate: r.joinDate,
        status: r.isActive ? 'Active' : 'Inactive',
      })),
      'customers',
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl text-charcoal-800">Customers</h1>
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
          <h1 className="font-serif text-3xl text-charcoal-800">Customers</h1>
          <p className="mt-1 text-sm text-charcoal-500">
            View and manage your customer base
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

      <div className="border border-cream-300 bg-white p-6">
        <div className="mb-4 flex items-center gap-2 text-sm text-charcoal-500">
          <Users className="h-4 w-4" />
          {customers.length} total customers
        </div>
        <DataTable
          columns={columns}
          data={rows}
          pageSize={10}
          searchKey="fullName"
          searchPlaceholder="Search by name..."
        />
      </div>
    </div>
  );
}
