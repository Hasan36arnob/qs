'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { fetchFeaturedProducts, fetchProducts } from '@/lib/data/products';
import { CATEGORIES } from '@/lib/constants';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductCard } from '@/components/product/ProductCard';
import type { Product } from '@/types';

export default function HomePage() {
  const { data: featured, isLoading: featuredLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: fetchFeaturedProducts,
  });

  const { data: allProducts, isLoading: allLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-charcoal-800">
        <img
          src="https://images.pexels.com/photos/11705153/pexels-photo-11705153.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="QASVANI luxury attar collection"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/40 to-charcoal-900/30" />
        <div className="container-luxury relative flex h-full flex-col items-center justify-center text-center">
          <p className="mb-2 font-serif text-2xl font-bold tracking-[0.2em] text-gold-300 md:text-3xl">
            QASVANI
          </p>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-cream-200/70">
            Luxury Lifestyle Collection
          </p>
          <h1 className="font-serif text-5xl font-bold leading-tight text-cream-100 md:text-7xl">
            The Art of
            <br />
            Living Well
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-200/80 md:text-lg">
            A curated collection of refined essentials — from signature scents
            to timeless apparel. Crafted for those who appreciate quiet luxury.
          </p>
          <Link
            href="/category/perfume-attor"
            className="mt-8 inline-flex items-center gap-2 border border-cream-100 px-8 py-3 text-sm font-medium tracking-wide text-cream-100 transition-all hover:bg-cream-100 hover:text-charcoal-900"
          >
            Explore Collection
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="container-luxury py-20">
        <div className="mb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-charcoal-400">
            Explore
          </p>
          <h2 className="mt-2 font-serif text-4xl text-charcoal-800">
            Shop by Category
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.slice(0, 3).map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              className="group relative aspect-[4/5] overflow-hidden bg-cream-200"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-2xl text-cream-100">
                  {cat.name}
                </h3>
                <p className="mt-1 text-sm text-cream-200/80">
                  {cat.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-gold-300">
                  Discover
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {CATEGORIES.slice(3).map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              className="group relative aspect-[16/9] overflow-hidden bg-cream-200"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-2xl text-cream-100">
                  {cat.name}
                </h3>
                <p className="mt-1 text-sm text-cream-200/80">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-luxury py-20">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-charcoal-400">
              Curated
            </p>
            <h2 className="mt-2 font-serif text-4xl text-charcoal-800">
              Featured Products
            </h2>
          </div>
          <Link
            href="/category/perfume-attor"
            className="hidden items-center gap-1 text-sm font-medium text-charcoal-600 transition-colors hover:text-charcoal-900 sm:flex"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {featuredLoading ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-cream-200" />
                <div className="mt-3 h-4 w-3/4 bg-cream-200" />
                <div className="mt-2 h-4 w-1/2 bg-cream-200" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {featured?.slice(0, 4).map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Editorial Banner */}
      <section className="container-luxury py-20">
        <div className="relative overflow-hidden bg-cream-200">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center p-12 md:p-20">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-600">
                The Signature Scent
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-charcoal-800 md:text-5xl">
                Oud Royale
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal-600">
                An opulent composition of rare Cambodian oud, Bulgarian rose,
                and warm amber. A scent that commands presence and lingers with
                quiet authority.
              </p>
              <Link
                href="/product/oud-royale-eau-de-parfum"
                className="mt-8 inline-flex w-fit items-center gap-2 border border-charcoal-800 px-6 py-3 text-sm font-medium tracking-wide text-charcoal-800 transition-colors hover:bg-charcoal-800 hover:text-cream-100"
              >
                Discover the Scent
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="aspect-square md:aspect-auto">
              <img
                src="https://images.unsplash.com/photo-1700665053090-e64274eeba84?fm=jpg&q=80&w=800&h=800&auto=format&fit=crop"
                alt="Oud Royale perfume"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container-luxury py-20">
        <div className="mb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-charcoal-400">
            Just In
          </p>
          <h2 className="mt-2 font-serif text-4xl text-charcoal-800">
            New Arrivals
          </h2>
        </div>

        {allLoading ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-cream-200" />
                <div className="mt-3 h-4 w-3/4 bg-cream-200" />
                <div className="mt-2 h-4 w-1/2 bg-cream-200" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {allProducts
              ?.slice(-4)
              .reverse()
              .map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="bg-charcoal-800 py-20">
        <div className="container-luxury text-center">
          <h2 className="font-serif text-3xl text-cream-100 md:text-4xl">
            Join the QASVANI Circle
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream-200/70">
            Be the first to discover new collections, private events, and
            exclusive offers.
          </p>
          <form className="mx-auto mt-8 flex max-w-md gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 border border-charcoal-600 bg-charcoal-700 px-4 py-3 text-sm text-cream-100 placeholder:text-charcoal-400 focus:border-gold-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gold-400 px-6 py-3 text-sm font-medium tracking-wide text-charcoal-900 transition-colors hover:bg-gold-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
