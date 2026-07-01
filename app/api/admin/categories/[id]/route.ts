import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Category, Product } from '@/lib/models';
import { requireAdmin } from '@/lib/api-auth';
import { saveUpload } from '@/lib/upload';
import { slugify } from '@/lib/slug';

export const dynamic = 'force-dynamic';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { res } = await requireAdmin();
  if (res) return res;
  try {
    await connectDB();
    const fd = await request.formData();
    const title = String(fd.get('title') || '').trim();
    const description = String(fd.get('description') || '');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const update: any = { title, description };

    const slugInput = String(fd.get('slug') || '').trim();
    if (slugInput) update.slug = slugify(slugInput);

    const imageFile = fd.get('image');
    if (imageFile instanceof File && imageFile.size > 0) {
      update.image = await saveUpload(imageFile, 'categories');
    }
    const longFile = fd.get('longImage');
    if (longFile instanceof File && longFile.size > 0) {
      update.longImage = await saveUpload(longFile, 'categories');
    }

    await Category.findByIdAndUpdate(params.id, update);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Update category error:', err);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const { res } = await requireAdmin();
  if (res) return res;
  await connectDB();
  await Category.findByIdAndDelete(params.id);
  await Product.updateMany({ categoryId: params.id }, { $unset: { categoryId: '' } });
  return NextResponse.json({ ok: true });
}
