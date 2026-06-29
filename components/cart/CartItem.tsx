'use client';

import { X, Plus, Minus } from 'lucide-react';
import type { CartItem as CartItemType } from '@/types';
import { useCartStore } from '@/lib/stores/cart-store';
import { formatCurrency } from '@/lib/utils/format';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-4 py-4">
      <div className="h-24 w-20 flex-shrink-0 overflow-hidden bg-cream-200">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <h4 className="font-serif text-sm text-charcoal-800">{item.name}</h4>
          <button
            onClick={() => removeItem(item.productId, item.variant)}
            aria-label="Remove item"
            className="text-charcoal-400 transition-colors hover:text-charcoal-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {item.variant && (
          <p className="mt-0.5 text-xs text-charcoal-500">{item.variant}</p>
        )}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center border border-cream-300">
            <button
              onClick={() =>
                updateQuantity(item.productId, item.quantity - 1, item.variant)
              }
              aria-label="Decrease quantity"
              className="px-2 py-1 text-charcoal-600 transition-colors hover:text-charcoal-900"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="px-3 text-sm text-charcoal-800">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                updateQuantity(item.productId, item.quantity + 1, item.variant)
              }
              aria-label="Increase quantity"
              className="px-2 py-1 text-charcoal-600 transition-colors hover:text-charcoal-900"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <p className="text-sm font-medium text-charcoal-800">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
