import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, Phone, ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductGallery from '@/components/ProductGallery';
import WhatsappInquiry from '@/components/WhatsappInquiry';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import { company } from '@/lib/data';
import {
  getProducts,
  getProductBySlug,
  getCategoryBySlug,
  getProductsByCategory,
} from '@/lib/repo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.title} – Custom Metal Art`,
    description: product.description,
    openGraph: { images: [product.image] },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const category = await getCategoryBySlug(product.category);
  const [inCategory, allProducts] = await Promise.all([
    getProductsByCategory(product.category),
    getProducts(),
  ]);
  const related = inCategory.filter((p) => p.slug !== product.slug).slice(0, 3);
  const fallback = allProducts.filter((p) => p.slug !== product.slug).slice(0, 3);
  const relatedList = related.length ? related : fallback;

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/40">
        <div className="container-x flex items-center gap-2 py-4 text-sm text-muted-foreground">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-gold-600">
            <Home className="h-3.5 w-3.5" /> Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/shop" className="hover:text-gold-600">
            Shop
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-ink">{product.title}</span>
        </div>
      </div>

      <section className="py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <ProductGallery images={product.images} alt={product.title} />

          <div>
            {category && (
              <Link href={`/shop?category=${category.slug}`}>
                <Badge variant="soft">{category.title}</Badge>
              </Link>
            )}
            <h1 className="mt-4 font-serif text-3xl font-bold leading-tight md:text-4xl">
              {product.title}
            </h1>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Material
                </p>
                <p className="mt-1 font-medium text-ink">{product.material}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Finish
                </p>
                <p className="mt-1 font-medium text-ink">{product.finish}</p>
              </div>
            </div>

            <ul className="mt-8 space-y-3">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-ink">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gold/15 text-gold-600">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-gold/30 bg-gold/5 p-6">
              <p className="font-serif text-lg font-semibold text-ink">
                Interested in this piece?
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Every product is made to order. Contact us for a custom quote based
                on your size, finish and quantity.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/contact">Request a Quote</Link>
                </Button>
                <WhatsappInquiry productTitle={product.title} />
                <Button asChild variant="outline">
                  <a href={`tel:${company.phone}`}>
                    <Phone className="h-4 w-4" /> Call Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="container-x">
          <Reveal className="text-center">
            <span className="eyebrow">You May Also Like</span>
            <h2 className="mt-3 font-serif text-3xl font-bold">Related Products</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedList.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
