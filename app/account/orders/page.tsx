'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Package } from 'lucide-react';
import { fetchOrders } from '@/lib/data/orders';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { EmptyState } from '@/components/shared/EmptyState';
import type { Order, OrderStatus } from '@/types';

const statusStyles: Record<OrderStatus, string> = {
  delivered: 'bg-green-100 text-green-700',
  shipped: 'bg-blue-100 text-blue-700',
  pending: 'bg-amber-100 text-amber-700',
  cancelled: 'bg-red-100 text-red-700',
  confirmed: 'bg-green-100 text-green-700',
};

function OrdersSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse border border-cream-300 bg-white p-5"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 w-32 bg-cream-200" />
              <div className="h-3 w-24 bg-cream-200" />
            </div>
            <div className="h-6 w-20 bg-cream-200" />
          </div>
          <div className="mt-4 h-4 w-40 bg-cream-200" />
        </div>
      ))}
    </div>
  );
}

export default function OrdersPage() {
  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  return (
    <div className="container-luxury py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-charcoal-900">My Orders</h1>
        <p className="mt-2 text-sm text-charcoal-500">
          Track and review your recent purchases.
        </p>
      </div>

      {isLoading ? (
        <OrdersSkeleton />
      ) : isError ? (
        <div className="border border-cream-300 bg-cream-50 p-8 text-center">
          <p className="text-sm text-charcoal-500">
            We couldn&apos;t load your orders. Please try again later.
          </p>
        </div>
      ) : !orders || orders.length === 0 ? (
        <div className="border border-cream-300 bg-cream-50">
          <EmptyState
            icon={Package}
            title="No orders yet"
            description="When you place your first order, it will appear here."
            actionLabel="Explore Products"
            onAction={() => {
              window.location.href = '/';
            }}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: Order) => {
            const itemCount = order.items.reduce(
              (sum: number, i) => sum + i.quantity,
              0,
            );
            return (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="group block border border-cream-300 bg-white p-5 transition-colors hover:border-charcoal-400"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-medium text-charcoal-800">
                        {order.id}
                      </p>
                      <span
                        className={`rounded-sm px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider ${statusStyles[order.status as OrderStatus]}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-charcoal-500">
                      {formatDate(order.createdAt)}
                    </p>
                    <p className="mt-2 text-sm text-charcoal-600">
                      {itemCount} item{itemCount > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-1">
                    <p className="font-serif text-lg text-charcoal-900">
                      {formatCurrency(order.total)}
                    </p>
                    <span className="text-sm font-medium text-charcoal-600 transition-colors group-hover:text-charcoal-900">
                      View details →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
