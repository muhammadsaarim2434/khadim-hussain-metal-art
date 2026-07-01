import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Reveal from '@/components/Reveal';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';

export default function LatestProducts() {
  const latest = [...products].slice(-6).reverse();

  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Fresh from the Workshop</span>
          <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
            Our Latest Aluminum &amp; Metal Art Products
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild>
            <Link href="/shop">
              Show More Products <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
