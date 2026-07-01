import Hero from '@/sections/Hero';
import Marquee from '@/components/Marquee';
import AboutIntro from '@/sections/AboutIntro';
import CategoriesSection from '@/sections/CategoriesSection';
import WhyChoose from '@/sections/WhyChoose';
import FeaturedProducts from '@/sections/FeaturedProducts';
import CtaBanner from '@/sections/CtaBanner';
import LatestProducts from '@/sections/LatestProducts';
import StatsBar from '@/sections/StatsBar';
import { getProducts, getCategories } from '@/lib/repo';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <>
      <Hero />
      <Marquee
        items={[
          'Main Gates',
          'Aluminum Furniture',
          'Iron Railings',
          'Window Grills',
          'Decorative Metal Art',
          'Custom Doors',
        ]}
      />
      <AboutIntro />
      <CategoriesSection categories={categories} />
      <WhyChoose />
      <FeaturedProducts products={products} />
      <CtaBanner />
      <LatestProducts products={products} />
      <StatsBar />
    </>
  );
}
