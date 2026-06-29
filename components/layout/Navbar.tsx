'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, User, Heart, ShoppingBag, Menu } from 'lucide-react';
import { useUIStore } from '@/lib/stores/ui-store';
import { useCartStore } from '@/lib/stores/cart-store';
import { CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { toggleSearch, toggleMobileMenu, toggleCartDrawer } = useUIStore();
  const getItemCount = useCartStore((s) => s.getItemCount);
  const itemCount = getItemCount();
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cream-300/60 bg-cream-100/80 backdrop-blur-xl">
      <div className="container-luxury">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Left: Mobile menu + nav links */}
          <div className="flex flex-1 items-center gap-6">
            <button
              onClick={toggleMobileMenu}
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-charcoal-800" />
            </button>
            <nav className="hidden items-center gap-6 md:flex">
              <div
                className="relative"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <button className="text-sm font-medium tracking-wide text-charcoal-700 transition-colors hover:text-charcoal-900">
                  Shop
                </button>
                {shopOpen && (
                  <div className="absolute left-0 top-full w-[600px] pt-4">
                    <div className="grid grid-cols-3 gap-4 border border-cream-300 bg-white p-6 shadow-xl">
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/category/${cat.id}`}
                          className="group"
                        >
                          <div className="relative aspect-[4/5] overflow-hidden bg-cream-200">
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <p className="mt-2 text-sm font-medium text-charcoal-800">
                            {cat.name}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link
                href="/category/mens-lifestyle"
                className="text-sm font-medium tracking-wide text-charcoal-700 transition-colors hover:text-charcoal-900"
              >
                Men
              </Link>
              <Link
                href="/category/womens-lifestyle"
                className="text-sm font-medium tracking-wide text-charcoal-700 transition-colors hover:text-charcoal-900"
              >
                Women
              </Link>
              <Link
                href="/category/perfume-attor"
                className="text-sm font-medium tracking-wide text-charcoal-700 transition-colors hover:text-charcoal-900"
              >
                Perfume
              </Link>
              <Link
                href="/category/skincare"
                className="text-sm font-medium tracking-wide text-charcoal-700 transition-colors hover:text-charcoal-900"
              >
                Skincare
              </Link>
              <Link
                href="/category/accessories"
                className="text-sm font-medium tracking-wide text-charcoal-700 transition-colors hover:text-charcoal-900"
              >
                Accessories
              </Link>
            </nav>
          </div>

          {/* Center: Logo */}
          <Link
            href="/"
            className="font-serif text-2xl font-bold tracking-[0.2em] text-charcoal-900 md:text-3xl"
          >
            QASVANI
          </Link>

          {/* Right: Icons */}
          <div className="flex flex-1 items-center justify-end gap-4 md:gap-5">
            <button
              onClick={toggleSearch}
              aria-label="Search"
              className="text-charcoal-700 transition-colors hover:text-charcoal-900"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/account/wishlist"
              aria-label="Wishlist"
              className="hidden text-charcoal-700 transition-colors hover:text-charcoal-900 sm:block"
            >
              <Heart className="h-5 w-5" />
            </Link>
            <Link
              href="/account/dashboard"
              aria-label="Account"
              className="text-charcoal-700 transition-colors hover:text-charcoal-900"
            >
              <User className="h-5 w-5" />
            </Link>
            <button
              onClick={toggleCartDrawer}
              aria-label="Cart"
              className="relative text-charcoal-700 transition-colors hover:text-charcoal-900"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center bg-gold-400 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
