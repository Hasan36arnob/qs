'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, MapPin } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/auth-store';
import { AddressForm } from '@/components/account/AddressForm';
import type { Address } from '@/types';

export default function AddressesPage() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const addAddress = useAuthStore((s) => s.addAddress);
  const removeAddress = useAuthStore((s) => s.removeAddress);

  const [showForm, setShowForm] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="container-luxury py-12">
        <div className="mx-auto max-w-md text-center">
          <h1 className="font-serif text-3xl text-charcoal-900">
            Your Addresses
          </h1>
          <p className="mt-3 text-sm text-charcoal-500">
            Sign in to manage your shipping addresses.
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

  const handleSave = (address: Address) => {
    addAddress(address);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    removeAddress(id);
  };

  return (
    <div className="container-luxury py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-charcoal-900">
          Saved Addresses
        </h1>
        <p className="mt-2 text-sm text-charcoal-500">
          Manage the addresses you ship to.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Address list */}
        <div className="space-y-4">
          {user.addresses.length === 0 && !showForm ? (
            <div className="border border-cream-300 bg-cream-50 p-8 text-center">
              <MapPin
                className="mx-auto mb-3 h-10 w-10 text-cream-400"
                strokeWidth={1}
              />
              <p className="text-sm text-charcoal-500">
                You haven&apos;t saved any addresses yet.
              </p>
            </div>
          ) : (
            user.addresses.map((addr) => (
              <div
                key={addr.id}
                className="border border-cream-300 bg-white p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-charcoal-800">
                        {addr.fullName}
                      </span>
                      <span className="rounded-sm bg-cream-200 px-2 py-0.5 text-[10px] uppercase tracking-wider text-charcoal-500">
                        {addr.label}
                      </span>
                      {addr.isDefault && (
                        <span className="text-[10px] uppercase tracking-wider text-gold-600">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-charcoal-600">
                      {addr.phone}
                    </p>
                    <p className="mt-0.5 text-sm text-charcoal-500">
                      {addr.detail}, {addr.area}, {addr.district},{' '}
                      {addr.division}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    aria-label={`Delete address for ${addr.fullName}`}
                    className="ml-3 flex-shrink-0 p-1.5 text-charcoal-400 transition-colors hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add new address form */}
        <div>
          {showForm ? (
            <div className="border border-cream-300 bg-white p-5">
              <h2 className="mb-4 font-serif text-lg text-charcoal-900">
                Add New Address
              </h2>
              <AddressForm
                onSave={handleSave}
                onCancel={() => setShowForm(false)}
              />
            </div>
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="flex h-full min-h-[120px] w-full items-center justify-center gap-2 border border-dashed border-cream-400 text-sm text-charcoal-600 transition-colors hover:border-charcoal-800 hover:text-charcoal-800"
            >
              <Plus className="h-4 w-4" />
              Add New Address
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
