import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Category } from '@/lib/data';

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group relative block overflow-hidden rounded-lg"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={category.image}
          alt={`${category.title} – Metal Art Category`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-serif text-xl font-semibold text-white">
          {category.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-white/70">
          {category.description}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gold">
          Explore
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
