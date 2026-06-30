// FILE: app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useCartStore } from '@/lib/stores/cart-store';
import { useAuthStore } from '@/lib/stores/auth-store';
import { AddressSelector } from '@/components/checkout/AddressSelector';
import { PaymentSelector } from '@/components/checkout/PaymentSelector';
import { EmptyState } from '@/components/shared/EmptyState';
import { ShoppingBag, Ticket, Check } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/format';
import { SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from '@/lib/constants';
import type { Address, PaymentMethod } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const user = useAuthStore((s) => s.user);
  const addAddress = useAuthStore((s) => s.addAddress);

  const [selectedAddressId, setSelectedAddressId] = useState<string | undefined>(
    user?.addresses.find((a) => a.isDefault)?.id ?? user?.addresses[0]?.id,
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

  // Coupon System State
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponApplied, setCouponApplied] = useState(false);

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

  const subtotal = getSubtotal();
  const discountAmount = couponApplied ? subtotal * appliedDiscount : 0;
  const postDiscountSubtotal = subtotal - discountAmount;
  const shipping = postDiscountSubtotal >= FREE_SHIPPING_THRESHOLD || postDiscountSubtotal === 0 ? 0 : SHIPPING_FEE;
  const finalTotal = postDiscountSubtotal + shipping;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'QASVANI10') {
      setAppliedDiscount(0.10); // 10% Off
      setCouponApplied(true);
      toast.success('কুপন কোড সফলভাবে প্রযোজ্য হয়েছে! ১০% ছাড় যোগ করা হয়েছে।');
    } else {
      toast.error('ভুল কুপন কোড। অনুগ্রহ করে সঠিক কোড দিন।');
    }
  };

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
        {/* Left: Shipping Forms */}
        <div className="space-y-8 lg:col-span-2">
          {/* Shipping Address */}
          <section className="bg-white p-6 border border-cream-300">
            <h2 className="mb-4 font-serif text-2xl text-qprimary font-bold">
              Shipping Address
            </h2>
            <AddressSelector
              addresses={user?.addresses ?? []}
              selectedId={selectedAddressId}
              onSelect={setSelectedAddressId}
              onAdd={handleAddAddress}
            />
          </section>

          {/* Payment Method */}
          <section className="bg-white p-6 border border-cream-300">
            <h2 className="mb-4 font-serif text-2xl text-qprimary font-bold">
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
          <div className="border border-cream-300 bg-white p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-qprimary border-b border-cream-200 pb-2">Order Summary</h3>
            <div className="space-y-3 max-h-[250px] overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variant ?? ''}`} className="flex gap-3 text-sm">
                  <img src={item.image} alt={item.name} className="h-12 w-10 object-cover bg-cream-100" />
                  <div className="flex-1">
                    <p className="font-bold text-charcoal-800">{item.name}</p>
                    <p className="text-xs text-charcoal-500">Qty: {item.quantity} {item.variant ? `(${item.variant})` : ''}</p>
                  </div>
                  <p className="font-semibold text-charcoal-800">৳{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            {/* Promo / Coupon Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-2 border-t border-cream-200">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="প্রোমো কোড (যেমন: QASVANI10)"
                disabled={couponApplied}
                className="flex-1 border border-cream-300 bg-white px-3 py-2 text-xs focus:border-qprimary focus:outline-none disabled:bg-cream-100"
              />
              <button
                type="submit"
                disabled={couponApplied}
                className="bg-qprimary px-4 py-2 text-xs font-semibold text-cream-100 hover:bg-qprimary-hover disabled:bg-qaccent/25 flex items-center gap-1"
              >
                {couponApplied ? <Check className="h-3.5 w-3.5 text-qaccent" /> : <Ticket className="h-3.5 w-3.5" />}
                {couponApplied ? 'Applied' : 'Apply'}
              </button>
            </form>

            {/* Calculations Breakdowns */}
            <div className="pt-2 border-t border-cream-200 space-y-2 text-sm">
              <div className="flex justify-between text-charcoal-600">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-qaccent font-semibold">
                  <span>Discount (10% Off)</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-charcoal-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-cream-300 pt-2 font-bold text-qprimary">
                <span className="font-serif text-lg">Total</span>
                <span className="font-serif text-lg">
                  {formatCurrency(finalTotal)}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-4 w-full bg-qprimary py-3.5 text-xs font-semibold uppercase tracking-widest text-cream-100 transition-colors hover:bg-qprimary-hover"
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