'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { useUIStore } from '@/lib/stores/ui-store';
import { CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function MobileMenu() {
  const { mobileMenuOpen, setMobileMenu } = useUIStore();

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-[60] bg-charcoal-900/40 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setMobileMenu(false)}
      />

      {/* Panel */}
      <div
        className={cn(
          'fixed left-0 top-0 z-[70] h-full w-[85%] max-w-sm bg-cream-100 shadow-2xl transition-transform duration-300 ease-luxury md:hidden',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-cream-300 px-6 py-5">
          <span className="font-serif text-xl font-bold tracking-[0.2em] text-charcoal-900">
            QASVANI
          </span>
          <button
            onClick={() => setMobileMenu(false)}
            aria-label="Close menu"
            className="text-charcoal-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-6">
          <Link
            href="/"
            onClick={() => setMobileMenu(false)}
            className="border-b border-cream-200 py-3 text-sm font-medium tracking-wide text-charcoal-800"
          >
            Home
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              onClick={() => setMobileMenu(false)}
              className="border-b border-cream-200 py-3 text-sm font-medium tracking-wide text-charcoal-800"
            >
              {cat.name}
            </Link>
          ))}
          <div className="mt-6 space-y-3">
            <Link
              href="/account/dashboard"
              onClick={() => setMobileMenu(false)}
              className="block text-sm text-charcoal-600"
            >
              My Account
            </Link>
            <Link
              href="/account/orders"
              onClick={() => setMobileMenu(false)}
              className="block text-sm text-charcoal-600"
            >
              My Orders
            </Link>
            <Link
              href="/account/wishlist"
              onClick={() => setMobileMenu(false)}
              className="block text-sm text-charcoal-600"
            >
              Wishlist
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenu(false)}
              className="block text-sm text-charcoal-600"
            >
              Admin
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
