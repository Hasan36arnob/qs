'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search as SearchIcon, PackageSearch } from 'lucide-react';
import { useDebounce } from '@/lib/hooks/use-debounce';
import { searchProducts } from '@/lib/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { EmptyState } from '@/components/shared/EmptyState';
import type { Product } from '@/types';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    searchProducts(debouncedQuery).then((r) => {
      setResults(r);
      setLoading(false);
    });
  }, [debouncedQuery]);

  return (
    <div className="container-luxury py-12">
      <h1 className="mb-8 font-serif text-4xl text-charcoal-800">Search</h1>

      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3 border-b-2 border-charcoal-800 pb-3">
          <SearchIcon className="h-5 w-5 text-charcoal-600" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            autoFocus
            className="flex-1 bg-transparent font-serif text-xl text-charcoal-800 placeholder:text-cream-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-12">
        {loading && (
          <p className="text-center text-sm text-charcoal-500">Searching...</p>
        )}
        {!loading && query.trim().length >= 2 && results.length === 0 && (
          <EmptyState
            icon={PackageSearch}
            title="No results found"
            description={`No products match "${query}". Try a different search term.`}
          />
        )}
        {!loading && query.trim().length < 2 && (
          <p className="text-center text-sm text-charcoal-500">
            Start typing to search our collection
          </p>
        )}
        {!loading && results.length > 0 && (
          <>
            <p className="mb-6 text-sm text-charcoal-500">
              {results.length} results for &ldquo;{query}&rdquo;
            </p>
            <ProductGrid products={results} />
          </>
        )}
      </div>
    </div>
  );
}
