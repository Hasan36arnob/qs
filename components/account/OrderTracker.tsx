'use client';

import { Check } from 'lucide-react';
import type { OrderStatus } from '@/types';
import { cn } from '@/lib/utils';

interface OrderTrackerProps {
  currentStatus: OrderStatus;
}

const steps: { status: OrderStatus; label: string }[] = [
  { status: 'pending', label: 'Pending' },
  { status: 'confirmed', label: 'Confirmed' },
  { status: 'shipped', label: 'Shipped' },
  { status: 'delivered', label: 'Delivered' },
];

export function OrderTracker({ currentStatus }: OrderTrackerProps) {
  if (currentStatus === 'cancelled') {
    return (
      <div className="rounded-sm border border-red-200 bg-red-50 p-4 text-center">
        <p className="text-sm font-medium text-red-600">Order Cancelled</p>
      </div>
    );
  }

  const currentIndex = steps.findIndex((s) => s.status === currentStatus);

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, i) => {
        const isComplete = i <= currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <div key={step.status} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
                  isComplete
                    ? 'border-charcoal-800 bg-charcoal-800 text-cream-100'
                    : 'border-cream-400 bg-cream-100 text-charcoal-400',
                  isCurrent && 'animate-pulse-soft ring-4 ring-gold-400/30',
                )}
              >
                {isComplete && !isCurrent ? (
                  <Check className="h-5 w-5" />
                ) : isComplete ? (
                  <span className="text-xs font-bold">{i + 1}</span>
                ) : (
                  <span className="text-xs font-bold">{i + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  'mt-2 text-xs font-medium uppercase tracking-wider',
                  isComplete ? 'text-charcoal-800' : 'text-charcoal-400',
                )}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  'mx-2 h-0.5 flex-1 transition-colors',
                  i < currentIndex ? 'bg-charcoal-800' : 'bg-cream-300',
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
