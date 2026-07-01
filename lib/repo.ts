import { connectDB, isDbConfigured } from '@/lib/mongodb';
import { Product as ProductModel, Category as CategoryModel } from '@/lib/models';
import {
  products as staticProducts,
  categories as staticCategories,
  type Product,
  type Category,
} from '@/lib/data';

const FALLBACK_PRODUCT_IMG = '/images/products/product-1.jpeg';
const FALLBACK_CATEGORY_IMG = '/images/categories/category-1.jpg';

/* -------------------------------------------------------------------------- */
/*  Mapping helpers: Mongo documents -> storefront shapes (lib/data types)     */
/* -------------------------------------------------------------------------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCategory(doc: any): Category {
  return {
    slug: doc.slug,
    title: doc.title,
    image: doc.image || doc.longImage || FALLBACK_CATEGORY_IMG,
    description: doc.description || '',
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProduct(doc: any, index: number, catSlugById: Map<string, string>): Product {
  const images: string[] =
    Array.isArray(doc.images) && doc.images.length ? doc.images : [FALLBACK_PRODUCT_IMG];
  return {
    id: index + 1,
    slug: doc.slug,
    title: doc.title,
    category: (doc.categoryId && catSlugById.get(String(doc.categoryId))) || '',
    image: images[0],
    images,
    featured: Boolean(doc.feature),
    sale: Boolean(doc.sale),
    description: doc.description || '',
    features: Array.isArray(doc.features) ? doc.features : [],
    material: doc.material || '',
    finish: doc.finish || '',
  };
}

/* -------------------------------------------------------------------------- */
/*  Public data access                                                         */
/* -------------------------------------------------------------------------- */

export async function getCategories(): Promise<Category[]> {
  if (!isDbConfigured()) return staticCategories;
  try {
    await connectDB();
    const docs = await CategoryModel.find().sort({ createdAt: 1 }).lean();
    if (!docs.length) return staticCategories;
    return docs.map(mapCategory);
  } catch (err) {
    console.error('getCategories fallback:', err);
    return staticCategories;
  }
}

export async function getProducts(): Promise<Product[]> {
  if (!isDbConfigured()) return staticProducts;
  try {
    await connectDB();
    const [prodDocs, catDocs] = await Promise.all([
      ProductModel.find().sort({ createdAt: -1 }).lean(),
      CategoryModel.find().lean(),
    ]);
    if (!prodDocs.length) return staticProducts;
    const catSlugById = new Map<string, string>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catDocs.forEach((c: any) => catSlugById.set(String(c._id), c.slug));
    return prodDocs.map((d, i) => mapProduct(d, i, catSlugById));
  } catch (err) {
    console.error('getProducts fallback:', err);
    return staticProducts;
  }
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const all = await getProducts();
  const featured = all.filter((p) => p.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export async function getLatestProducts(limit = 4): Promise<Product[]> {
  const all = await getProducts();
  return all.slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug);
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const all = await getCategories();
  return all.find((c) => c.slug === slug);
}

export async function getProductsByCategory(catSlug: string): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.category === catSlug);
}
