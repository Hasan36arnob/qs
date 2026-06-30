// FILE: components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, Truck, ShieldAlert, Award, CreditCard } from 'lucide-react';
import { useUIStore } from '@/lib/stores/ui-store';
import { useCartStore } from '@/lib/stores/cart-store';
import { CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { toggleSearch, toggleMobileMenu, toggleCartDrawer } = useUIStore();
  const getItemCount = useCartStore((s) => s.getItemCount);
  const itemCount = getItemCount();
  const [mounted, setMounted] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);

  const announcements = [
    { text: '৳১,০০০+ অর্ডারে সম্পূর্ণ ফ্রি ডেলিভারি সুবিধা!', icon: Truck },
    { text: '১০০% অরিজিনাল সিগনেচার প্রোডাক্ট কালেকশন', icon: Award },
    { text: '৭ দিনের সহজ রিটার্ন পলিসি', icon: ShieldAlert },
    { text: 'নিরাপদ এবং নির্ভরযোগ্য পেমেন্ট পার্টনারস', icon: CreditCard }
  ];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [announcements.length]);

  const CurrentIcon = announcements[announcementIdx].icon;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* 01. Announcement Bar */}
      <div className="bg-qprimary text-cream-100 py-2.5 px-4 text-center text-xs font-semibold uppercase tracking-wider transition-all duration-500">
        <div className="container-luxury flex items-center justify-center gap-2 font-bengali">
          <CurrentIcon className="h-4 w-4 text-qgold animate-bounce" />
          <span>{announcements[announcementIdx].text}</span>
        </div>
      </div>

      {/* Primary Luxury Nav Panel */}
      <div className="border-b border-cream-300/60 bg-cream-100/90 backdrop-blur-xl">
        <div className="container-luxury">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Left: Mobile Trigger & Navigation links */}
            <div className="flex flex-1 items-center gap-6">
              <button
                onClick={toggleMobileMenu}
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5 text-charcoal-800" />
              </button>
              <nav className="hidden items-center gap-6 md:flex font-sans">
                <Link
                  href="/"
                  className="text-xs font-semibold uppercase tracking-widest text-charcoal-700 transition-colors hover:text-qprimary"
                >
                  HOME
                </Link>
                <div className="relative group">
                  <span className="cursor-pointer text-xs font-semibold uppercase tracking-widest text-charcoal-700 transition-colors hover:text-qprimary">
                    CATEGORIES
                  </span>
                  <div className="absolute left-0 top-full hidden w-[240px] border border-cream-300 bg-white p-4 shadow-xl group-hover:block pt-3">
                    <ul className="space-y-2">
                      {CATEGORIES.map((cat) => (
                        <li key={cat.id}>
                          <Link href={`/category/${cat.id}`} className="block text-xs font-medium text-charcoal-600 hover:text-qprimary py-1">
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Link
                  href="/category/perfume-attor"
                  className="text-xs font-semibold uppercase tracking-widest text-charcoal-700 transition-colors hover:text-qprimary"
                >
                  PERFUME
                </Link>
                <Link
                  href="/category/mens-wear"
                  className="text-xs font-semibold uppercase tracking-widest text-charcoal-700 transition-colors hover:text-qprimary"
                >
                  MEN
                </Link>
                <Link
                  href="/category/womens-wear"
                  className="text-xs font-semibold uppercase tracking-widest text-charcoal-700 transition-colors hover:text-qprimary"
                >
                  WOMEN
                </Link>
                <Link
                  href="/category/accessories"
                  className="text-xs font-semibold uppercase tracking-widest text-charcoal-700 transition-colors hover:text-qprimary"
                >
                  ACCESSORIES
                </Link>
              </nav>
            </div>

            {/* Center: Brand Identity Logo */}
            <Link href="/" className="flex items-center">
              <span className="font-serif text-2xl font-bold tracking-[0.25em] text-qprimary">
                QASVANI
              </span>
            </Link>

            {/* Right: Operational Icon Triggers */}
            <div className="flex flex-1 items-center justify-end gap-4 md:gap-5">
              <button
                onClick={toggleSearch}
                aria-label="Search"
                className="text-charcoal-700 transition-colors hover:text-qprimary"
              >
                <Search className="h-5 w-5" />
              </button>
              <Link
                href="/account/wishlist"
                aria-label="Wishlist"
                className="hidden text-charcoal-700 transition-colors hover:text-qprimary sm:block"
              >
                <Heart className="h-5 w-5" />
              </Link>
              <Link
                href="/account/dashboard"
                aria-label="Account"
                className="text-charcoal-700 transition-colors hover:text-qprimary"
              >
                <User className="h-5 w-5" />
              </Link>
              <button
                onClick={toggleCartDrawer}
                aria-label="Cart"
                className="relative text-charcoal-700 transition-colors hover:text-qprimary"
              >
                <ShoppingBag className="h-5 w-5" />
                {mounted && itemCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center bg-qgold text-[10px] font-bold text-white rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}