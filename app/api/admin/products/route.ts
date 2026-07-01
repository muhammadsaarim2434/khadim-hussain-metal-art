import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/lib/models';
import { requireAdmin } from '@/lib/api-auth';
import { parseProductForm } from '@/lib/product-form';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { res } = await requireAdmin();
  if (res) return res;

  await connectDB();
  const products = await Product.find()
    .populate('categoryId', 'title')
    .sort({ createdAt: -1 })
    .lean();
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const { res } = await requireAdmin();
  if (res) return res;

  try {
    await connectDB();
    const formData = await request.formData();
    const data = await parseProductForm(formData);
    if (!data.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    const product = await Product.create(data);
    return NextResponse.json({ ok: true, id: String(product._id) });
  } catch (err) {
    console.error('Create product error:', err);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
