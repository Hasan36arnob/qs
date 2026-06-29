'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Download,
  FileText,
  FileSpreadsheet,
  Eye,
  ShoppingCart,
  CreditCard,
  CheckCircle,
} from 'lucide-react';
import { MetricCard } from '@/components/admin/MetricCard';
import { SalesChart } from '@/components/admin/SalesChart';
import { fetchEvents, fetchFunnelData } from '@/lib/data/events';
import { formatNumber } from '@/lib/utils/format';
import { exportToExcel } from '@/lib/utils/export-excel';
import { exportToPdf } from '@/lib/utils/export-pdf';
import { exportToCsv } from '@/lib/utils/export-csv';
import { formatDateShort } from '@/lib/utils/format';
import type { Event } from '@/types';

const FUNNEL_STAGES = [
  { key: 'product_view', label: 'Product View', icon: Eye },
  { key: 'add_to_cart', label: 'Add to Cart', icon: ShoppingCart },
  { key: 'checkout_initiate', label: 'Checkout', icon: CreditCard },
  { key: 'purchase', label: 'Purchase', icon: CheckCircle },
] as const;

export default function BehaviorPage() {
  const { data: eventsData, isLoading: eventsLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEvents(),
  });
  const { data: funnel, isLoading: funnelLoading } = useQuery({
    queryKey: ['funnel'],
    queryFn: fetchFunnelData,
  });

  const events: Event[] = eventsData ?? [];

  const loading = eventsLoading || funnelLoading;

  const funnelData = FUNNEL_STAGES.map((stage) => ({
    name: stage.label,
    count: funnel ? funnel[stage.key] : 0,
  }));

  // Conversion rates between steps
  const conversionRates = FUNNEL_STAGES.map((stage, i) => {
    const current = funnel ? funnel[stage.key] : 0;
    const prev = i > 0 && funnel ? funnel[FUNNEL_STAGES[i - 1].key] : 0;
    const rate = prev > 0 ? (current / prev) * 100 : 100;
    return { stage: stage.label, rate };
  });

  const handleExportExcel = () => {
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
  };

  const handleExportPdf = () => {
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
  };

  const handleExportCsv = () => {
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
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl text-charcoal-800">Behavior</h1>
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
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-3xl text-charcoal-800">Behavior</h1>
          <p className="mt-1 text-sm text-charcoal-500">
            User behavior and conversion funnel analysis
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

      {/* Funnel Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FUNNEL_STAGES.map((stage, i) => {
          const count = funnel ? funnel[stage.key] : 0;
          const prev = i > 0 && funnel ? funnel[FUNNEL_STAGES[i - 1].key] : 0;
          const rate = prev > 0 ? (count / prev) * 100 : 100;
          const Icon = stage.icon;
          return (
            <MetricCard
              key={stage.key}
              label={stage.label}
              value={formatNumber(count)}
              icon={Icon}
              change={i > 0 ? rate - 100 : undefined}
            />
          );
        })}
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
                    {stage.count} {i > 0 && `(${rate.toFixed(1)}% conversion)`}
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

      {/* Funnel chart */}
      <div className="border border-cream-300 bg-white p-6">
        <h2 className="mb-4 font-serif text-lg text-charcoal-800">
          Funnel Chart
        </h2>
        <SalesChart data={funnelData} dataKey="count" xKey="name" />
      </div>
    </div>
  );
}
