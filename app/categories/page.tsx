import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import CategoryCard from '@/components/CategoryCard';
import { getCategories } from '@/lib/repo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Product Categories – Metal Art & Aluminum',
  description:
    'Browse all Khadim Hussain Metal Art product categories — main gates, railings, doors, aluminum furniture, grills, windows and decorative metal art.',
};

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <>
      <PageHeader
        title="Product Categories"
        crumb="Categories"
        image="/images/categories/category-6.jpg"
      />
      <section className="py-20 md:py-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Explore</span>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
              Our Metal Art Product Categories
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every category is fully customizable — tell us your size, style and
              finish and we craft it to order.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.05}>
                <CategoryCard category={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
