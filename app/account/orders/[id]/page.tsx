'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Package } from 'lucide-react';
import { fetchOrderById } from '@/lib/data/orders';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { OrderTracker } from '@/components/account/OrderTracker';
import { EmptyState } from '@/components/shared/EmptyState';
import type { Order, PaymentMethod } from '@/types';

const paymentLabels: Record<PaymentMethod, string> = {
  cod: 'Cash on Delivery',
  card: 'Card',
  'mobile-banking': 'Mobile Banking',
};

function DetailSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-48 bg-cream-200" />
      <div className="h-24 bg-cream-200" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 bg-cream-200" />
        ))}
      </div>
    </div>
  );
}

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data: order, isLoading, isError } = useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrderById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container-luxury py-12">
        <DetailSkeleton />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="container-luxury py-12">
        <div className="border border-cream-300 bg-cream-50">
          <EmptyState
            icon={Package}
            title="Order not found"
            description="We couldn't find the order you're looking for."
            actionLabel="Back to Orders"
            onAction={() => {
              window.location.href = '/account/orders';
            }}
          />
        </div>
      </div>
    );
  }

  const itemCount = order.items.reduce(
    (sum: number, i: Order['items'][number]) => sum + i.quantity,
    0,
  );

  return (
    <div className="container-luxury py-12">
      <Link
        href="/account/orders"
        className="mb-6 inline-flex items-center gap-2 text-sm text-charcoal-500 transition-colors hover:text-charcoal-800"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Orders
      </Link>

      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl text-charcoal-900">{order.id}</h1>
          <p className="mt-1 text-sm text-charcoal-500">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <span className="inline-block w-fit rounded-sm bg-cream-200 px-3 py-1 text-xs font-medium uppercase tracking-wider text-charcoal-600">
          {order.status}
        </span>
      </div>

      {/* Tracker */}
      <div className="mb-10 border border-cream-300 bg-cream-50 p-6">
        <h2 className="mb-6 font-serif text-lg text-charcoal-900">
          Order Status
        </h2>
        <OrderTracker currentStatus={order.status} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 font-serif text-xl text-charcoal-900">
            Items ({itemCount})
          </h2>
          <div className="space-y-4">
            {order.items.map((item: Order['items'][number], i: number) => (
              <div
                key={`${item.productId}-${i}`}
                className="flex gap-4 border border-cream-300 bg-white p-4"
              >
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden bg-cream-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="font-medium text-charcoal-800">{item.name}</p>
                  {item.variant && (
                    <p className="mt-0.5 text-sm text-charcoal-500">
                      {item.variant}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-charcoal-500">
                    Qty {item.quantity} × {formatCurrency(item.price)}
                  </p>
                </div>
                <p className="self-center font-medium text-charcoal-800">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          {/* Shipping address */}
          <div className="border border-cream-300 bg-cream-50 p-5">
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-charcoal-500">
              Shipping Address
            </h3>
            <p className="text-sm font-medium text-charcoal-800">
              {order.shippingAddress.fullName}
            </p>
            <p className="mt-1 text-sm text-charcoal-600">
              {order.shippingAddress.phone}
            </p>
            <p className="mt-1 text-sm text-charcoal-600">
              {order.shippingAddress.detail}
            </p>
            <p className="text-sm text-charcoal-600">
              {order.shippingAddress.area}, {order.shippingAddress.district}
            </p>
            <p className="text-sm text-charcoal-600">
              {order.shippingAddress.division}
            </p>
          </div>

          {/* Payment method */}
          <div className="border border-cream-300 bg-cream-50 p-5">
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-charcoal-500">
              Payment Method
            </h3>
            <p className="text-sm font-medium text-charcoal-800">
              {paymentLabels[order.paymentMethod as PaymentMethod]}
            </p>
          </div>

          {/* Order total */}
          <div className="border border-cream-300 bg-white p-5">
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-charcoal-500">
              Order Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-charcoal-600">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-charcoal-600">
                <span>Shipping</span>
                <span>{formatCurrency(order.shipping)}</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-cream-300 pt-2 font-medium text-charcoal-900">
                <span>Total</span>
                <span className="font-serif text-lg">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
