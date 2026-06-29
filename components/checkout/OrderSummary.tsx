'use client';

import { useCartStore } from '@/lib/stores/cart-store';
import { formatCurrency } from '@/lib/utils/format';
import { SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from '@/lib/constants';

export function OrderSummary() {
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const subtotal = getSubtotal();
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  return (
    <div className="border border-cream-300 bg-white p-6">
      <h3 className="font-serif text-lg text-charcoal-800">Order Summary</h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={`${item.productId}-${item.variant ?? ''}`}
            className="flex gap-3"
          >
            <div className="h-16 w-14 flex-shrink-0 overflow-hidden bg-cream-200">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-charcoal-800">{item.name}</p>
              {item.variant && (
                <p className="text-xs text-charcoal-500">{item.variant}</p>
              )}
              <p className="text-xs text-charcoal-500">
                Qty: {item.quantity}
              </p>
            </div>
            <p className="text-sm font-medium text-charcoal-800">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2 border-t border-cream-300 pt-4">
        <div className="flex justify-between text-sm text-charcoal-600">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-charcoal-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
        </div>
        <div className="flex justify-between border-t border-cream-300 pt-2">
          <span className="font-serif text-lg text-charcoal-800">Total</span>
          <span className="font-serif text-lg font-medium text-charcoal-800">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
