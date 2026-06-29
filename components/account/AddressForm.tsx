'use client';

import { useState } from 'react';
import type { Address, AddressLabel } from '@/types';
import { DIVISIONS, DISTRICTS_BY_DIVISION } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface AddressFormProps {
  initial?: Address;
  onSave: (address: Address) => void;
  onCancel: () => void;
}

export function AddressForm({ initial, onSave, onCancel }: AddressFormProps) {
  const [form, setForm] = useState<Address>(
    initial ?? {
      id: 'addr-' + Date.now(),
      label: 'Home',
      fullName: '',
      phone: '',
      division: 'Dhaka',
      district: 'Dhaka',
      area: '',
      detail: '',
      isDefault: false,
    },
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.area.trim()) e.area = 'Area is required';
    if (!form.detail.trim()) e.detail = 'Address detail is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSave(form);
  };

  const districts = DISTRICTS_BY_DIVISION[form.division] ?? [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-charcoal-500">
            Label
          </label>
          <select
            value={form.label}
            onChange={(e) =>
              setForm({ ...form, label: e.target.value as AddressLabel })
            }
            className="w-full border border-cream-300 bg-white px-3 py-2 text-sm text-charcoal-800 focus:border-charcoal-800 focus:outline-none"
          >
            <option value="Home">Home</option>
            <option value="Office">Office</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-charcoal-500">
            Full Name
          </label>
          <input
            type="text"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className="w-full border border-cream-300 bg-white px-3 py-2 text-sm text-charcoal-800 focus:border-charcoal-800 focus:outline-none"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-charcoal-500">
            Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-cream-300 bg-white px-3 py-2 text-sm text-charcoal-800 focus:border-charcoal-800 focus:outline-none"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-charcoal-500">
            Division
          </label>
          <select
            value={form.division}
            onChange={(e) =>
              setForm({
                ...form,
                division: e.target.value,
                district: DISTRICTS_BY_DIVISION[e.target.value]?.[0] ?? '',
              })
            }
            className="w-full border border-cream-300 bg-white px-3 py-2 text-sm text-charcoal-800 focus:border-charcoal-800 focus:outline-none"
          >
            {DIVISIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-charcoal-500">
            District
          </label>
          <select
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
            className="w-full border border-cream-300 bg-white px-3 py-2 text-sm text-charcoal-800 focus:border-charcoal-800 focus:outline-none"
          >
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-charcoal-500">
            Area
          </label>
          <input
            type="text"
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
            className="w-full border border-cream-300 bg-white px-3 py-2 text-sm text-charcoal-800 focus:border-charcoal-800 focus:outline-none"
          />
          {errors.area && (
            <p className="mt-1 text-xs text-red-500">{errors.area}</p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-charcoal-500">
          Address Detail
        </label>
        <textarea
          value={form.detail}
          onChange={(e) => setForm({ ...form, detail: e.target.value })}
          rows={2}
          className="w-full border border-cream-300 bg-white px-3 py-2 text-sm text-charcoal-800 focus:border-charcoal-800 focus:outline-none"
        />
        {errors.detail && (
          <p className="mt-1 text-xs text-red-500">{errors.detail}</p>
        )}
      </div>

      <label className="flex items-center gap-2 text-sm text-charcoal-600">
        <input
          type="checkbox"
          checked={form.isDefault}
          onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
          className="h-4 w-4 border-cream-300"
        />
        Set as default address
      </label>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 bg-charcoal-800 py-2.5 text-sm font-medium tracking-wide text-cream-100 transition-colors hover:bg-charcoal-900"
        >
          Save Address
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border border-charcoal-800 py-2.5 text-sm font-medium tracking-wide text-charcoal-800 transition-colors hover:bg-charcoal-800 hover:text-cream-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
