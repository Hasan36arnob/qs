'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
  productId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function WishlistButton({
  productId: _productId,
  className,
  size = 'md',
}: WishlistButtonProps) {
  const [wishlisted, setWishlisted] = useState(false);

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setWishlisted((w) => !w);
      }}
      aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      className={cn(
        'transition-all duration-200 hover:scale-110 active:scale-90',
        className,
      )}
    >
      <Heart
        className={cn(
          sizeClasses[size],
          wishlisted
            ? 'fill-red-500 text-red-500'
            : 'fill-none text-charcoal-600',
        )}
      />
    </button>
  );
}
