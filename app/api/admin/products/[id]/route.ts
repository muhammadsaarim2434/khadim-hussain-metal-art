import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/lib/models';
import { requireAdmin } from '@/lib/api-auth';
import { parseProductForm } from '@/lib/product-form';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { res } = await requireAdmin();
  if (res) return res;

  await connectDB();
  const product = await Product.findById(params.id).lean();
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ product });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { res } = await requireAdmin();
  if (res) return res;

  try {
    await connectDB();
    const formData = await request.formData();
    const data = await parseProductForm(formData);
    await Product.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Update product error:', err);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const { res } = await requireAdmin();
  if (res) return res;

  await connectDB();
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
