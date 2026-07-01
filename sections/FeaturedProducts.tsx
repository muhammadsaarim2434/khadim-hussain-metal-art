import Reveal from '@/components/Reveal';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const list = featured.length ? featured : products.slice(0, 4);

  return (
    <section className="bg-muted/50 py-20 md:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Handpicked</span>
          <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
            Our Featured Metal Art &amp; Aluminum Products
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
