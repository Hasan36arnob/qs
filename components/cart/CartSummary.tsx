'use client';

import { useCartStore } from '@/lib/stores/cart-store';
import { formatCurrency } from '@/lib/utils/format';
import { SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from '@/lib/constants';

interface CartSummaryProps {
  showButton?: boolean;
}

export function CartSummary({ showButton = false }: CartSummaryProps) {
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const subtotal = getSubtotal();
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  return (
    <div className="space-y-3 border-t border-cream-300 pt-4">
      <div className="flex justify-between text-sm text-charcoal-600">
        <span>Subtotal</span>
        <span className="font-medium text-charcoal-800">
          {formatCurrency(subtotal)}
        </span>
      </div>
      <div className="flex justify-between text-sm text-charcoal-600">
        <span>Shipping</span>
        <span className="font-medium text-charcoal-800">
          {shipping === 0 ? 'Free' : formatCurrency(shipping)}
        </span>
      </div>
      {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
        <p className="text-xs text-charcoal-400">
          Add {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)} more for free
          shipping
        </p>
      )}
      <div className="flex justify-between border-t border-cream-300 pt-3">
        <span className="font-serif text-lg text-charcoal-800">Total</span>
        <span className="font-serif text-lg font-medium text-charcoal-800">
          {formatCurrency(total)}
        </span>
      </div>
      {showButton && (
        <a
          href="/checkout"
          className="mt-4 block bg-charcoal-800 py-3 text-center text-sm font-medium tracking-wide text-cream-100 transition-colors hover:bg-charcoal-900"
        >
          Proceed to Checkout
        </a>
      )}
    </div>
  );
}
