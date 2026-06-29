'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag, ChevronRight, Minus, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchProductBySlug } from '@/lib/data/products';
import { fetchProducts } from '@/lib/data/products';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductCard } from '@/components/product/ProductCard';
import { WishlistButton } from '@/components/shared/WishlistButton';
import { EmptyState } from '@/components/shared/EmptyState';
import { useCartStore } from '@/lib/stores/cart-store';
import type { Product } from '@/types';
import { useTrackEvent } from '@/lib/hooks/use-track-event';
import { formatCurrency } from '@/lib/utils/format';
import { PackageSearch } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((s) => s.addItem);
  const { trackEvent } = useTrackEvent();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetchProductBySlug(slug),
    enabled: !!slug,
  });

  const { data: allProducts } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className="container-luxury py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="aspect-square animate-pulse bg-cream-200" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse bg-cream-200" />
            <div className="h-6 w-1/3 animate-pulse bg-cream-200" />
            <div className="h-24 w-full animate-pulse bg-cream-200" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-luxury py-20">
        <EmptyState
          icon={PackageSearch}
          title="Product not found"
          description="The product you're looking for doesn't exist or has been removed."
          actionLabel="Continue Shopping"
          onAction={() => (window.location.href = '/')}
        />
      </div>
    );
  }

  const handleAddToCart = () => {
    const variantString = product.variants
      ?.map((v: { name: string; options: string[] }) => selectedVariants[v.name] ?? v.options[0])
      .join(' / ');
    addItem(product, quantity, variantString);
    trackEvent('add_to_cart', product.id, { quantity, variant: variantString });
    toast.success(`${product.name} added to cart`);
  };

  const relatedProducts = allProducts
    ?.filter((p: Product) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b border-cream-300">
        <div className="container-luxury flex items-center gap-2 py-4 text-xs text-charcoal-500">
          <Link href="/" className="hover:text-charcoal-800">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            href={`/category/${product.category}`}
            className="capitalize hover:text-charcoal-800"
          >
            {product.category.replace(/-/g, ' ')}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-charcoal-800">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <section className="container-luxury py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Gallery */}
          <ProductGallery images={product.images} alt={product.name} />

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-wider text-charcoal-400">
              {product.category.replace(/-/g, ' ')}
            </p>
            <h1 className="mt-2 font-serif text-3xl text-charcoal-800 md:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <p className="text-2xl font-medium text-charcoal-800">
                {formatCurrency(product.price)}
              </p>
              {hasDiscount && (
                <p className="text-lg text-charcoal-400 line-through">
                  {formatCurrency(product.compareAtPrice!)}
                </p>
              )}
            </div>

            <p className="mt-6 text-base leading-relaxed text-charcoal-600">
              {product.description}
            </p>

            {/* Scent Notes */}
            {product.scentNotes && (
              <div className="mt-8 space-y-3 border-t border-cream-300 pt-6">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-charcoal-500">
                    Scent Notes
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-charcoal-400">Top</p>
                    <p className="mt-1 text-sm text-charcoal-700">
                      {product.scentNotes.top.join(', ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-charcoal-400">Heart</p>
                    <p className="mt-1 text-sm text-charcoal-700">
                      {product.scentNotes.heart.join(', ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-charcoal-400">Base</p>
                    <p className="mt-1 text-sm text-charcoal-700">
                      {product.scentNotes.base.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Skin Type */}
            {product.skinType && (
              <div className="mt-6 border-t border-cream-300 pt-6">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-charcoal-500">
                  Skin Type
                </h3>
                <p className="mt-1 text-sm text-charcoal-700">
                  {product.skinType}
                </p>
              </div>
            )}

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mt-8 space-y-4 border-t border-cream-300 pt-6">
                {product.variants.map((variant: { name: string; options: string[] }) => (
                  <div key={variant.name}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-charcoal-500">
                      {variant.name}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {variant.options.map((option) => (
                        <button
                          key={option}
                          onClick={() =>
                            setSelectedVariants((prev) => ({
                              ...prev,
                              [variant.name]: option,
                            }))
                          }
                          className={cn(
                            'border px-4 py-2 text-sm transition-colors',
                            (selectedVariants[variant.name] ?? variant.options[0]) === option
                              ? 'border-charcoal-800 bg-charcoal-800 text-cream-100'
                              : 'border-cream-300 text-charcoal-700 hover:border-charcoal-400',
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="mt-8 flex items-center gap-4 border-t border-cream-300 pt-6">
              <div className="flex items-center border border-cream-300">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-charcoal-600 transition-colors hover:text-charcoal-900"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 text-sm font-medium text-charcoal-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-charcoal-600 transition-colors hover:text-charcoal-900"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex flex-1 items-center justify-center gap-2 bg-charcoal-800 py-3 text-sm font-medium tracking-wide text-cream-100 transition-colors hover:bg-charcoal-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingBag className="h-4 w-4" />
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>

              <WishlistButton productId={product.id} size="lg" />
            </div>

            {/* Stock info */}
            <p className="mt-4 text-xs text-charcoal-500">
              {product.stock > 0
                ? `${product.stock} in stock`
                : 'Currently unavailable'}
            </p>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="container-luxury py-16">
          <h2 className="mb-8 font-serif text-3xl text-charcoal-800">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p: Product) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
