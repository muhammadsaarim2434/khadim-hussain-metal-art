import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/data';
import { getCategory } from '@/lib/data';

export default function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={`${product.title} – Khadim Hussain Metal Art, Lahore`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.sale && (
          <Badge className="absolute left-3 top-3">Sale</Badge>
        )}
        <span className="absolute right-3 top-3 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-gold text-ink opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Eye className="h-4 w-4" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        {category && (
          <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-600">
            {category.title}
          </span>
        )}
        <h3 className="mt-1 font-serif text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-gold-600">
          {product.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink">
          View Detail
          <ArrowUpRight className="h-4 w-4 text-gold-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
