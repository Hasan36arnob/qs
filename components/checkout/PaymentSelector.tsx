'use client';

import { Banknote, CreditCard, Smartphone, Check } from 'lucide-react';
import type { PaymentMethod } from '@/types';
import { PAYMENT_METHODS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface PaymentSelectorProps {
  selected?: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

const icons: Record<PaymentMethod, React.ElementType> = {
  cod: Banknote,
  card: CreditCard,
  'mobile-banking': Smartphone,
};

export function PaymentSelector({ selected, onSelect }: PaymentSelectorProps) {
  return (
    <div className="space-y-3">
      {PAYMENT_METHODS.map((method) => {
        const Icon = icons[method.id];
        const isSelected = selected === method.id;
        return (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={cn(
              'flex w-full items-center gap-4 border p-4 text-left transition-colors',
              isSelected
                ? 'border-charcoal-800 bg-cream-50'
                : 'border-cream-300 hover:border-charcoal-400',
            )}
          >
            <div
              className={cn(
                'flex h-5 w-5 items-center justify-center rounded-full',
                isSelected ? 'bg-charcoal-800' : 'border-2 border-cream-400',
              )}
            >
              {isSelected && <Check className="h-3 w-3 text-cream-100" />}
            </div>
            <Icon className="h-5 w-5 text-charcoal-600" />
            <div>
              <p className="text-sm font-medium text-charcoal-800">
                {method.name}
              </p>
              <p className="text-xs text-charcoal-500">
                {method.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
