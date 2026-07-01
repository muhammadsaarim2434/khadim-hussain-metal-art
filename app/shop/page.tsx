import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ShopClient from '@/components/ShopClient';
import { getProducts, getCategories } from '@/lib/repo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Shop – Aluminum Furniture, Gates, Railings & Grills',
  description:
    'Browse aluminum outdoor furniture, custom metal main gates, iron railings, grills and decorative metal art by Khadim Hussain Metal Art, Lahore.',
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <>
      <PageHeader title="Our Products" crumb="Shop" image="/images/banners/banner-4.jpg" />
      <ShopClient
        initialCategory={searchParams.category ?? 'all'}
        products={products}
        categories={categories}
      />
    </>
  );
}
