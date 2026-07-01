'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/ProductCard';
import { cn } from '@/lib/utils';
import { products, categories } from '@/lib/data';

export default function ShopClient({
  initialCategory = 'all',
}: {
  initialCategory?: string;
}) {
  const [active, setActive] = useState(initialCategory);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const inCat = active === 'all' || p.category === active;
      const inSearch =
        query.trim() === '' ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      return inCat && inSearch;
    });
  }, [active, query]);

  const tabs = [{ slug: 'all', title: 'All' }, ...categories];

  return (
    <div className="container-x py-16 md:py-20">
      {/* Search */}
      <div className="mx-auto mb-8 max-w-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gates, railings, furniture…"
            className="pl-11"
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="mb-12 flex flex-wrap justify-center gap-2">
        {tabs.map((t) => (
          <button
            key={t.slug}
            onClick={() => setActive(t.slug)}
            className={cn(
              'rounded-full border px-5 py-2 text-sm font-medium uppercase tracking-wide transition-colors',
              active === t.slug
                ? 'border-gold bg-gold text-ink'
                : 'border-border bg-transparent text-ink hover:border-gold hover:text-gold-600'
            )}
          >
            {t.title}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-muted-foreground">
          No products match your search. Try a different keyword or category.
        </p>
      )}
    </div>
  );
}
