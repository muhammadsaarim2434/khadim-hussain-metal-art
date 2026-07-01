import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Reveal from '@/components/Reveal';
import CategoryCard from '@/components/CategoryCard';
import { categories as staticCategories, type Category } from '@/lib/data';

export default function CategoriesSection({ categories = staticCategories }: { categories?: Category[] }) {
  return (
    <section className="bg-muted/50 py-20 md:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">What We Make</span>
          <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
            Our Metal Art Product Categories
          </h2>
          <p className="mt-4 text-muted-foreground">
            From bold main gates to elegant aluminum furniture — explore our full
            range of handcrafted metal work.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.05}>
              <CategoryCard category={c} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link href="/categories">
              View All Categories <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
