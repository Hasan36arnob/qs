'use client';

import Link from 'next/link';
import { X, ShoppingBag } from 'lucide-react';
import { useUIStore } from '@/lib/stores/ui-store';
import { useCartStore } from '@/lib/stores/cart-store';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { EmptyState } from '@/components/shared/EmptyState';
import { cn } from '@/lib/utils';

export function CartDrawer() {
  const { cartDrawerOpen, setCartDrawer } = useUIStore();
  const items = useCartStore((s) => s.items);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-[70] bg-charcoal-900/40 backdrop-blur-sm transition-opacity duration-300',
          cartDrawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setCartDrawer(false)}
      />

      {/* Panel */}
      <div
        className={cn(
          'fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-cream-100 shadow-2xl transition-transform duration-300 ease-luxury',
          cartDrawerOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-300 px-6 py-5">
          <h2 className="font-serif text-xl text-charcoal-800">
            Shopping Cart ({items.length})
          </h2>
          <button
            onClick={() => setCartDrawer(false)}
            aria-label="Close cart"
            className="text-charcoal-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <EmptyState
              icon={ShoppingBag}
              title="Your cart is empty"
              description="Discover our curated collection of luxury essentials."
              actionLabel="Continue Shopping"
              onAction={() => setCartDrawer(false)}
            />
          ) : (
            <div className="divide-y divide-cream-200">
              {items.map((item) => (
                <CartItem
                  key={`${item.productId}-${item.variant ?? ''}`}
                  item={item}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-cream-300 px-6 py-5">
            <CartSummary />
            <div className="mt-4 flex gap-3">
              <Link
                href="/cart"
                onClick={() => setCartDrawer(false)}
                className="flex-1 border border-charcoal-800 py-3 text-center text-sm font-medium tracking-wide text-charcoal-800 transition-colors hover:bg-charcoal-800 hover:text-cream-100"
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                onClick={() => setCartDrawer(false)}
                className="flex-1 bg-charcoal-800 py-3 text-center text-sm font-medium tracking-wide text-cream-100 transition-colors hover:bg-charcoal-900"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
