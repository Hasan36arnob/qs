'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/stores/cart-store';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { EmptyState } from '@/components/shared/EmptyState';

export default function CartPage() {
  const items = useCartStore((s) => s.items);

  if (items.length === 0) {
    return (
      <div className="container-luxury py-20">
        <h1 className="mb-8 font-serif text-4xl text-charcoal-800">Shopping Cart</h1>
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Discover our curated collection of luxury essentials."
          actionLabel="Continue Shopping"
          onAction={() => (window.location.href = '/')}
        />
      </div>
    );
  }

  return (
    <div className="container-luxury py-12">
      <h1 className="mb-8 font-serif text-4xl text-charcoal-800">Shopping Cart</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="divide-y divide-cream-200 border-y border-cream-300">
            {items.map((item) => (
              <CartItem
                key={`${item.productId}-${item.variant ?? ''}`}
                item={item}
              />
            ))}
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="border border-cream-300 bg-white p-6">
            <h2 className="font-serif text-xl text-charcoal-800">
              Order Summary
            </h2>
            <div className="mt-4">
              <CartSummary showButton />
            </div>
            <Link
              href="/"
              className="mt-4 block text-center text-sm text-charcoal-500 transition-colors hover:text-charcoal-800"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
