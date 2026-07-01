import Hero from '@/sections/Hero';
import Marquee from '@/components/Marquee';
import AboutIntro from '@/sections/AboutIntro';
import CategoriesSection from '@/sections/CategoriesSection';
import WhyChoose from '@/sections/WhyChoose';
import FeaturedProducts from '@/sections/FeaturedProducts';
import CtaBanner from '@/sections/CtaBanner';
import LatestProducts from '@/sections/LatestProducts';
import StatsBar from '@/sections/StatsBar';

export default function HomePage() {
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
      <CategoriesSection />
      <WhyChoose />
      <FeaturedProducts />
      <CtaBanner />
      <LatestProducts />
      <StatsBar />
    </>
  );
}
