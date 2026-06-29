'use client';

import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import { EmptyState } from '@/components/shared/EmptyState';

export default function WishlistPage() {
  const router = useRouter();

  return (
    <div className="container-luxury py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-charcoal-900">My Wishlist</h1>
        <p className="mt-2 text-sm text-charcoal-500">
          Items you&apos;ve saved to find again later.
        </p>
      </div>

      <div className="border border-cream-300 bg-cream-50">
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Save items you love to find them quickly later."
          actionLabel="Explore Products"
          onAction={() => router.push('/')}
        />
      </div>
    </div>
  );
}
