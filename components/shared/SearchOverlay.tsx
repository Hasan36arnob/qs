'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { useUIStore } from '@/lib/stores/ui-store';
import { useDebounce } from '@/lib/hooks/use-debounce';
import { searchProducts } from '@/lib/data/products';
import { CATEGORIES } from '@/lib/constants';
import type { Product } from '@/types';
import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils';

export function SearchOverlay() {
  const { searchOpen, setSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) {
      setQuery('');
      setResults([]);
    }
  }, [searchOpen]);

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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearch(false);
    };
    if (searchOpen) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [searchOpen, setSearch]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[80] transition-all duration-300',
        searchOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <div
        className="absolute inset-0 bg-cream-100"
        onClick={() => setSearch(false)}
      >
        <div
          className="mx-auto mt-20 max-w-3xl px-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search input */}
          <div className="flex items-center gap-4 border-b-2 border-charcoal-800 pb-4">
            <Search className="h-6 w-6 text-charcoal-600" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, categories..."
              className="flex-1 bg-transparent font-serif text-2xl text-charcoal-800 placeholder:text-cream-400 focus:outline-none"
            />
            <button
              onClick={() => setSearch(false)}
              aria-label="Close search"
              className="text-charcoal-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Results */}
          <div className="mt-6 max-h-[60vh] overflow-y-auto">
            {loading && (
              <p className="text-sm text-charcoal-500">Searching...</p>
            )}
            {!loading && query.trim().length >= 2 && results.length === 0 && (
              <p className="text-sm text-charcoal-500">
                No results found for &ldquo;{query}&rdquo;
              </p>
            )}
            {!loading && results.length > 0 && (
              <div className="space-y-2">
                {results.slice(0, 8).map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => setSearch(false)}
                    className="flex items-center gap-4 p-2 transition-colors hover:bg-cream-200"
                  >
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden bg-cream-200">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-charcoal-800">
                        {product.name}
                      </p>
                      <p className="text-xs text-charcoal-500 capitalize">
                        {product.category.replace(/-/g, ' ')}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-charcoal-800">
                      {formatCurrency(product.price)}
                    </p>
                  </Link>
                ))}
              </div>
            )}
            {query.trim().length < 2 && (
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-charcoal-400">
                  Categories
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.id}`}
                      onClick={() => setSearch(false)}
                      className="p-3 text-sm text-charcoal-700 transition-colors hover:bg-cream-200"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
