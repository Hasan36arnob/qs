'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchProductsByCategory } from '@/lib/data/products';
import { CATEGORIES } from '@/lib/constants';
import { ProductGrid } from '@/components/product/ProductGrid';
import { EmptyState } from '@/components/shared/EmptyState';
import { PackageSearch } from 'lucide-react';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const category = CATEGORIES.find((c) => c.id === slug);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', slug],
    queryFn: () => fetchProductsByCategory(slug),
    enabled: !!slug,
  });

  if (!category) {
    return (
      <div className="container-luxury py-20">
        <EmptyState
          icon={PackageSearch}
          title="Category not found"
          description="The category you're looking for doesn't exist."
          actionLabel="Back to Home"
          onAction={() => (window.location.href = '/')}
        />
      </div>
    );
  }

  return (
    <div>
      {/* Banner */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden bg-cream-200">
        <img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent" />
        <div className="container-luxury relative flex h-full flex-col items-center justify-center text-center">
          <h1 className="font-serif text-4xl text-cream-100 md:text-5xl">
            {category.name}
          </h1>
          <p className="mt-3 max-w-md text-sm text-cream-200/80">
            {category.description}
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="container-luxury py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-cream-200" />
                <div className="mt-3 h-4 w-3/4 bg-cream-200" />
                <div className="mt-2 h-4 w-1/2 bg-cream-200" />
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <>
            <p className="mb-8 text-sm text-charcoal-500">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
            <ProductGrid products={products} />
          </>
        ) : (
          <EmptyState
            icon={PackageSearch}
            title="No products yet"
            description="We're curating new pieces for this collection. Check back soon."
          />
        )}
      </section>
    </div>
  );
}
