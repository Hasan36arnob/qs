// FILE: components/product/ProductCard.tsx
'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Product } from '@/types';
import { useCartStore } from '@/lib/stores/cart-store';
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

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn('group block bg-white border border-cream-200 p-3 shadow-sm hover:shadow-md transition-shadow', className)}
    >
      <div className="relative aspect-square overflow-hidden bg-cream-50">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
        />

        {/* Wishlist triggers */}
        <div className="absolute right-3 top-3 z-10">
          <WishlistButton productId={product.id} />
        </div>

        {/* Discount status badges */}
        {hasDiscount && (
          <span className="absolute left-3 top-3 bg-qprimary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream-100 font-sans">
            Sale
          </span>
        )}

        {/* Action slide-in trigger */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-cream-50/95 px-4 py-3 opacity-0 transition-all duration-300 ease-luxury group-hover:translate-y-0 group-hover:opacity-100 border-t border-cream-200">
          <button
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-qprimary font-sans hover:text-qgold transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-charcoal-400 font-sans font-bold">
          {product.category.replace(/-/g, ' ')}
        </p>
        <h3 className="font-serif text-base font-bold text-qprimary">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-charcoal-800">
            ৳{product.price.toLocaleString()}
          </p>
          {hasDiscount && (
            <p className="text-xs text-charcoal-400 line-through">
              ৳{product.compareAtPrice!.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}