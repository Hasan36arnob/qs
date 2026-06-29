'use client';

import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPercentage } from '@/lib/utils/format';

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: LucideIcon;
  className?: string;
}

export function MetricCard({
  label,
  value,
  change,
  icon: Icon,
  className,
}: MetricCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div
      className={cn(
        'border border-cream-300 bg-white p-6 transition-shadow hover:shadow-md',
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-charcoal-400">
            {label}
          </p>
          <p className="mt-2 font-serif text-3xl font-bold text-charcoal-800">
            {value}
          </p>
        </div>
        {Icon && (
          <div className="rounded-sm bg-cream-100 p-2.5">
            <Icon className="h-5 w-5 text-charcoal-500" />
          </div>
        )}
      </div>
      {change !== undefined && (
        <div className="mt-3 flex items-center gap-1.5">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span
            className={cn(
              'text-xs font-medium',
              isPositive ? 'text-green-600' : 'text-red-500',
            )}
          >
            {formatPercentage(change)}
          </span>
          <span className="text-xs text-charcoal-400">vs last period</span>
        </div>
      )}
    </div>
  );
}
