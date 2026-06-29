'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/stores/auth-store';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: { email?: string; password?: string } = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = 'Enter a valid email address';
    if (!password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      toast.success('Welcome back');
      router.push('/account/dashboard');
    } catch (err) {
      toast.error('Unable to sign in. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-luxury py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-10 text-center">
          <h1 className="font-serif text-3xl text-charcoal-900">Sign In</h1>
          <p className="mt-2 text-sm text-charcoal-500">
            Welcome back. Sign in to access your account.
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
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-xs font-medium uppercase tracking-wider text-charcoal-500"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
              className="w-full border border-cream-300 bg-white px-3 py-2.5 text-sm text-charcoal-800 transition-colors focus:border-charcoal-800 focus:outline-none disabled:opacity-60"
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-charcoal-800 py-3 text-sm font-medium tracking-wide text-cream-100 transition-colors hover:bg-charcoal-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-3 text-sm text-charcoal-500">
          <Link
            href="/account/reset-password"
            className="transition-colors hover:text-charcoal-800"
          >
            Forgot your password?
          </Link>
          <p>
            Don&apos;t have an account?{' '}
            <Link
              href="/account/register"
              className="font-medium text-charcoal-800 underline-offset-4 hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
