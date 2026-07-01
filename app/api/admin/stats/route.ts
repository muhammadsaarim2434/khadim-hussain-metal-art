import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Product, Category, SubCategory, Region, Banner, Order } from '@/lib/models';
import { requireAdmin } from '@/lib/api-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { res } = await requireAdmin();
  if (res) return res;

  await connectDB();
  const [products, categories, subcategories, regions, banners, orders, recent] =
    await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      SubCategory.countDocuments(),
      Region.countDocuments(),
      Banner.countDocuments(),
      Order.countDocuments(),
      Order.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

  return NextResponse.json({
    counts: { products, categories, subcategories, regions, banners, orders },
    recentOrders: recent,
  });
}
