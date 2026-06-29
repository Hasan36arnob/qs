'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { CATEGORIES, BRAND } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-cream-300 bg-cream-100">
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold tracking-[0.15em] text-charcoal-900">
              QASVANI
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-charcoal-500">
              {BRAND.description}
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={BRAND.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-charcoal-500 transition-colors hover:text-charcoal-900"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={BRAND.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-charcoal-500 transition-colors hover:text-charcoal-900"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={BRAND.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-charcoal-500 transition-colors hover:text-charcoal-900"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-charcoal-400">
              Shop
            </h4>
            <ul className="mt-4 space-y-3">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.id}`}
                    className="text-sm text-charcoal-600 transition-colors hover:text-charcoal-900"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-charcoal-400">
              Account
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/account/login"
                  className="text-sm text-charcoal-600 transition-colors hover:text-charcoal-900"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/account/register"
                  className="text-sm text-charcoal-600 transition-colors hover:text-charcoal-900"
                >
                  Create Account
                </Link>
              </li>
              <li>
                <Link
                  href="/account/orders"
                  className="text-sm text-charcoal-600 transition-colors hover:text-charcoal-900"
                >
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/account/wishlist"
                  className="text-sm text-charcoal-600 transition-colors hover:text-charcoal-900"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  href="/account/addresses"
                  className="text-sm text-charcoal-600 transition-colors hover:text-charcoal-900"
                >
                  Addresses
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-charcoal-400">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-charcoal-600">
              <li>{BRAND.address}</li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="transition-colors hover:text-charcoal-900"
                >
                  {BRAND.email}
                </a>
              </li>
              <li>{BRAND.phone}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-cream-300 pt-8 text-center">
          <p className="text-xs text-charcoal-400">
            © {new Date().getFullYear()} QASVANI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
