'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/stores/auth-store';

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const updateProfile = useAuthStore((s) => s.updateProfile);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
  }>({});
  const [saving, setSaving] = useState(false);

  // Sync form with store user. Re-runs when the user object changes
  // (e.g. after login or a previous save).
  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setEmail(user.email);
      setPhone(user.phone ?? '');
    }
  }, [user]);

  if (!isAuthenticated || !user) {
    return (
      <div className="container-luxury py-12">
        <div className="mx-auto max-w-md text-center">
          <h1 className="font-serif text-3xl text-charcoal-900">
            Your Profile
          </h1>
          <p className="mt-3 text-sm text-charcoal-500">
            Sign in to view and edit your profile information.
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

  const validate = () => {
    const e: typeof errors = {};
    if (!fullName.trim()) e.fullName = 'Full name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = 'Enter a valid email address';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSaving(true);
    // Simulate a brief save latency for a realistic UX.
    await new Promise((r) => setTimeout(r, 400));
    updateProfile({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
    });
    setSaving(false);
    toast.success('Profile updated');
  };

  return (
    <div className="container-luxury py-12">
      <div className="mx-auto max-w-lg">
        <div className="mb-8">
          <h1 className="font-serif text-3xl text-charcoal-900">
            Profile Settings
          </h1>
          <p className="mt-2 text-sm text-charcoal-500">
            Update your personal information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="fullName"
              className="mb-1 block text-xs font-medium uppercase tracking-wider text-charcoal-500"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={saving}
              className="w-full border border-cream-300 bg-white px-3 py-2.5 text-sm text-charcoal-800 transition-colors focus:border-charcoal-800 focus:outline-none disabled:opacity-60"
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-xs font-medium uppercase tracking-wider text-charcoal-500"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={saving}
              className="w-full border border-cream-300 bg-white px-3 py-2.5 text-sm text-charcoal-800 transition-colors focus:border-charcoal-800 focus:outline-none disabled:opacity-60"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-1 block text-xs font-medium uppercase tracking-wider text-charcoal-500"
            >
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={saving}
              placeholder="Optional"
              className="w-full border border-cream-300 bg-white px-3 py-2.5 text-sm text-charcoal-800 transition-colors focus:border-charcoal-800 focus:outline-none disabled:opacity-60"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-charcoal-800 py-3 text-sm font-medium tracking-wide text-cream-100 transition-colors hover:bg-charcoal-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
            <Link
              href="/account/dashboard"
              className="flex-1 border border-charcoal-800 py-3 text-center text-sm font-medium tracking-wide text-charcoal-800 transition-colors hover:bg-charcoal-800 hover:text-cream-100"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
