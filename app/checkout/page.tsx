'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useCartStore } from '@/lib/stores/cart-store';
import { useAuthStore } from '@/lib/stores/auth-store';
import { AddressSelector } from '@/components/checkout/AddressSelector';
import { PaymentSelector } from '@/components/checkout/PaymentSelector';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { EmptyState } from '@/components/shared/EmptyState';
import type { Address, PaymentMethod } from '@/types';
import { ShoppingBag } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const user = useAuthStore((s) => s.user);
  const addAddress = useAuthStore((s) => s.addAddress);

  const [selectedAddressId, setSelectedAddressId] = useState<string | undefined>(
    user?.addresses.find((a) => a.isDefault)?.id ?? user?.addresses[0]?.id,
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

  if (items.length === 0) {
    return (
      <div className="container-luxury py-20">
        <h1 className="mb-8 font-serif text-4xl text-charcoal-800">Checkout</h1>
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add items to your cart before proceeding to checkout."
          actionLabel="Continue Shopping"
          onAction={() => router.push('/')}
        />
      </div>
    );
  }

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      toast.error('Please select a shipping address');
      return;
    }
    toast.success('Order placed successfully!');
    clearCart();
    router.push('/account/orders');
  };

  const handleAddAddress = (address: Address) => {
    addAddress(address);
    setSelectedAddressId(address.id);
    toast.success('Address added');
  };

  return (
    <div className="container-luxury py-12">
      <h1 className="mb-8 font-serif text-4xl text-charcoal-800">Checkout</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Left: Forms */}
        <div className="space-y-8 lg:col-span-2">
          {/* Shipping Address */}
          <section>
            <h2 className="mb-4 font-serif text-2xl text-charcoal-800">
              Shipping Address
            </h2>
            {user && user.addresses.length > 0 ? (
              <AddressSelector
                addresses={user.addresses}
                selectedId={selectedAddressId}
                onSelect={setSelectedAddressId}
                onAdd={handleAddAddress}
              />
            ) : (
              <AddressSelector
                addresses={[]}
                onAdd={handleAddAddress}
                onSelect={setSelectedAddressId}
              />
            )}
          </section>

          {/* Payment Method */}
          <section>
            <h2 className="mb-4 font-serif text-2xl text-charcoal-800">
              Payment Method
            </h2>
            <PaymentSelector
              selected={paymentMethod}
              onSelect={setPaymentMethod}
            />
          </section>
        </div>

        {/* Right: Order Summary */}
        <div>
          <OrderSummary />
          <button
            onClick={handlePlaceOrder}
            className="mt-4 w-full bg-charcoal-800 py-3.5 text-sm font-medium tracking-wide text-cream-100 transition-colors hover:bg-charcoal-900"
          >
            Place Order
          </button>
          <p className="mt-3 text-center text-xs text-charcoal-500">
            By placing your order, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
