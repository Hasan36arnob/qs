'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Package,
  Globe,
  MapPin,
  Activity,
  Megaphone,
  ShoppingCart,
  FileBarChart,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/sales', label: 'Sales', icon: TrendingUp },
  { href: '/admin/orders', label: 'Orders', icon: Package },
  { href: '/admin/traffic', label: 'Traffic', icon: Globe },
  { href: '/admin/location', label: 'Location', icon: MapPin },
  { href: '/admin/behavior', label: 'Behavior', icon: Activity },
  { href: '/admin/marketing', label: 'Marketing', icon: Megaphone },
  { href: '/admin/abandoned-carts', label: 'Abandoned Carts', icon: ShoppingCart },
  { href: '/admin/reports', label: 'Reports', icon: FileBarChart },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-sm bg-charcoal-800 p-2 text-cream-100 md:hidden"
        aria-label="Open admin menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-64 bg-charcoal-800 transition-transform duration-300 md:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className="font-serif text-xl font-bold tracking-[0.15em] text-cream-100"
          >
            QASVANI
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-cream-400 md:hidden"
            aria-label="Close admin menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors',
                  isActive
                    ? 'bg-gold-400/15 text-gold-300'
                    : 'text-cream-300 hover:bg-charcoal-700 hover:text-cream-100',
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-charcoal-700 p-4">
          <Link
            href="/"
            className="text-xs text-cream-400 transition-colors hover:text-cream-100"
          >
            ← Back to Store
          </Link>
        </div>
      </aside>
    </>
  );
}
