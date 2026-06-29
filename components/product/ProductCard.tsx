'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Product } from '@/types';
import { useCartStore } from '@/lib/stores/cart-store';
import { formatCurrency } from '@/lib/utils/format';
import { WishlistButton } from '@/components/shared/WishlistButton';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, product.variants?.[0]?.options?.[0]);
    toast.success(`${product.name} added to cart`);
  };

  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn('group block', className)}
    >
      <div className="relative aspect-square overflow-hidden bg-cream-200">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
        />

        {/* Wishlist button */}
        <div className="absolute right-3 top-3 z-10">
          <WishlistButton productId={product.id} />
        </div>

        {/* Discount badge */}
        {hasDiscount && (
          <span className="absolute left-3 top-3 bg-charcoal-800 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-cream-100">
            Sale
          </span>
        )}

        {/* Add to cart button */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-cream-100/95 px-4 py-3 opacity-0 transition-all duration-300 ease-luxury group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center gap-2 text-sm font-medium tracking-wide text-charcoal-800"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-xs uppercase tracking-wider text-charcoal-400">
          {product.category.replace(/-/g, ' ')}
        </p>
        <h3 className="mt-1 font-serif text-base text-charcoal-800">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <p className="text-sm font-medium text-charcoal-800">
            {formatCurrency(product.price)}
          </p>
          {hasDiscount && (
            <p className="text-sm text-charcoal-400 line-through">
              {formatCurrency(product.compareAtPrice!)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
