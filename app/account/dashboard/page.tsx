'use client';

import Link from 'next/link';
import {
  Package,
  Heart,
  MapPin,
  ShoppingBag,
  User as UserIcon,
  ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useQuery } from '@tanstack/react-query';
import { fetchOrders } from '@/lib/data/orders';
import { formatCurrency } from '@/lib/utils/format';

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  if (!isAuthenticated || !user) {
    return (
      <div className="container-luxury py-12">
        <div className="mx-auto max-w-md text-center">
          <h1 className="font-serif text-3xl text-charcoal-900">
            Welcome Back
          </h1>
          <p className="mt-3 text-sm text-charcoal-500">
            Sign in to view your dashboard, track orders, and manage your
            account.
          </p>
          <Link
            href="/account/login"
            className="mt-8 inline-block bg-charcoal-800 px-8 py-3 text-sm font-medium tracking-wide text-cream-100 transition-colors hover:bg-charcoal-900"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const totalOrders = orders?.length ?? 0;
  const wishlistItems = 0; // No wishlist store yet
  const savedAddresses = user.addresses.length;

  const stats = [
    {
      label: 'Total Orders',
      value: totalOrders,
      icon: Package,
      href: '/account/orders',
    },
    {
      label: 'Wishlist Items',
      value: wishlistItems,
      icon: Heart,
      href: '/account/wishlist',
    },
    {
      label: 'Saved Addresses',
      value: savedAddresses,
      icon: MapPin,
      href: '/account/addresses',
    },
  ];

  const quickLinks = [
    {
      label: 'My Orders',
      description: 'Track and review your purchases',
      icon: ShoppingBag,
      href: '/account/orders',
    },
    {
      label: 'Profile Settings',
      description: 'Update your personal information',
      icon: UserIcon,
      href: '/account/profile',
    },
    {
      label: 'Addresses',
      description: 'Manage your shipping addresses',
      icon: MapPin,
      href: '/account/addresses',
    },
    {
      label: 'Wishlist',
      description: 'Items you&apos;ve saved for later',
      icon: Heart,
      href: '/account/wishlist',
    },
  ];

  const firstName = user.fullName.split(' ')[0];

  return (
    <div className="container-luxury py-12">
      <div className="mb-10">
        <h1 className="font-serif text-3xl text-charcoal-900">
          Welcome, {firstName}
        </h1>
        <p className="mt-2 text-sm text-charcoal-500">
          Here&apos;s an overview of your account.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group border border-cream-300 bg-cream-50 p-6 transition-colors hover:border-charcoal-400"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-charcoal-500">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-serif text-3xl text-charcoal-900">
                    {stat.value}
                  </p>
                </div>
                <Icon
                  className="h-8 w-8 text-cream-400 transition-colors group-hover:text-charcoal-400"
                  strokeWidth={1}
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick links */}
      <div>
        <h2 className="mb-4 font-serif text-xl text-charcoal-900">
          Quick Links
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                className="group flex items-center gap-4 border border-cream-300 bg-white p-5 transition-colors hover:border-charcoal-400"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-cream-100">
                  <Icon className="h-6 w-6 text-charcoal-600" strokeWidth={1} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-charcoal-800">{link.label}</p>
                  <p className="mt-0.5 text-sm text-charcoal-500">
                    {link.description}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-cream-400 transition-colors group-hover:text-charcoal-600" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent order summary */}
      {orders && orders.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 font-serif text-xl text-charcoal-900">
            Recent Order
          </h2>
          <div className="border border-cream-300 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-charcoal-800">
                  {orders[0].id}
                </p>
                <p className="mt-0.5 text-sm text-charcoal-500">
                  {orders[0].items.length} item
                  {orders[0].items.length > 1 ? 's' : ''} ·{' '}
                  <span className="capitalize">{orders[0].status}</span>
                </p>
              </div>
              <p className="font-serif text-lg text-charcoal-900">
                {formatCurrency(orders[0].total)}
              </p>
            </div>
            <Link
              href={`/account/orders/${orders[0].id}`}
              className="mt-4 inline-block text-sm font-medium text-charcoal-800 underline-offset-4 hover:underline"
            >
              View order details →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
