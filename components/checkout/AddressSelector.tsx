'use client';

import { useState } from 'react';
import { Plus, MapPin, Check } from 'lucide-react';
import type { Address } from '@/types';
import { AddressForm } from '@/components/account/AddressForm';
import { cn } from '@/lib/utils';

interface AddressSelectorProps {
  addresses: Address[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onAdd: (address: Address) => void;
}

export function AddressSelector({
  addresses,
  selectedId,
  onSelect,
  onAdd,
}: AddressSelectorProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-3">
      {addresses.map((addr) => (
        <button
          key={addr.id}
          onClick={() => onSelect(addr.id)}
          className={cn(
            'flex w-full items-start gap-3 border p-4 text-left transition-colors',
            selectedId === addr.id
              ? 'border-charcoal-800 bg-cream-50'
              : 'border-cream-300 hover:border-charcoal-400',
          )}
        >
          <div className="mt-0.5">
            {selectedId === addr.id ? (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-charcoal-800">
                <Check className="h-3 w-3 text-cream-100" />
              </div>
            ) : (
              <div className="h-5 w-5 rounded-full border-2 border-cream-400" />
            )}
          </div>
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
            <p className="mt-1 text-sm text-charcoal-600">{addr.phone}</p>
            <p className="mt-0.5 text-sm text-charcoal-500">
              {addr.detail}, {addr.area}, {addr.district}, {addr.division}
            </p>
          </div>
          <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-charcoal-400" />
        </button>
      ))}

      {showForm ? (
        <div className="border border-cream-300 p-4">
          <AddressForm
            onSave={(addr) => {
              onAdd(addr);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="flex w-full items-center justify-center gap-2 border border-dashed border-cream-400 py-4 text-sm text-charcoal-600 transition-colors hover:border-charcoal-800 hover:text-charcoal-800"
        >
          <Plus className="h-4 w-4" />
          Add New Address
        </button>
      )}
    </div>
  );
}
