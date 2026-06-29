'use client';

import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address');
      return;
    }
    setError(null);
    setSubmitting(true);
    // Simulate request latency for a realistic UX.
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    toast.success('Password reset link sent');
    setEmail('');
  };

  return (
    <div className="container-luxury py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-10 text-center">
          <h1 className="font-serif text-3xl text-charcoal-900">
            Reset Password
          </h1>
          <p className="mt-2 text-sm text-charcoal-500">
            Enter your email and we&apos;ll send you a link to reset your
            password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              disabled={submitting}
              className="w-full border border-cream-300 bg-white px-3 py-2.5 text-sm text-charcoal-800 transition-colors focus:border-charcoal-800 focus:outline-none disabled:opacity-60"
              placeholder="you@example.com"
              autoComplete="email"
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-charcoal-800 py-3 text-sm font-medium tracking-wide text-cream-100 transition-colors hover:bg-charcoal-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Sending…' : 'Send Reset Link'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-charcoal-500">
          Remembered your password?{' '}
          <Link
            href="/account/login"
            className="font-medium text-charcoal-800 underline-offset-4 hover:underline"
          >
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
